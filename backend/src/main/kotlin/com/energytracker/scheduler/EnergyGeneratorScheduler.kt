package com.energytracker.scheduler

import com.energytracker.model.EnergyGenerator
import com.energytracker.repository.EnergyGeneratorRepository
import java.io.BufferedReader
import java.io.InputStreamReader
import java.math.BigDecimal
import java.net.URL
import java.nio.charset.StandardCharsets
import org.slf4j.LoggerFactory
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class EnergyGeneratorScheduler(private val repository: EnergyGeneratorRepository) {
    private val logger = LoggerFactory.getLogger(EnergyGeneratorScheduler::class.java)
    private val csvUrl =
            "https://dadosabertos.aneel.gov.br/dataset/57e4b8b5-a5db-40e6-9901-27ca629d0477/resource/4a615df8-4c25-48fa-bbea-873a36a79518/download/ralie-usina.csv"
    private val batchSize = 1000

    /** Tarefa agendada para baixar e processar o CSV diariamente às 3h da manhã. */
    @Scheduled(cron = "0 0 3 * * ?")
    @Transactional
    fun fetchAndProcessCsv() {
        val startTime = System.currentTimeMillis()
        logger.info("📥 Iniciando download e processamento do CSV...")

        try {
            URL(csvUrl).openStream().use { inputStream ->
                BufferedReader(InputStreamReader(inputStream, StandardCharsets.ISO_8859_1)).use {
                        reader ->
                    val header = reader.readLine()?.split(";")?.map { it.trim() } ?: return
                    val batch = mutableListOf<EnergyGenerator>()

                    reader.lineSequence().forEach { line ->
                        parseCsvLine(line, header)?.let { batch.add(it) }
                        if (batch.size >= batchSize) {
                            saveBatch(batch)
                            batch.clear()
                        }
                    }

                    if (batch.isNotEmpty()) {
                        saveBatch(batch)
                    }
                }
            }

            val totalTime = (System.currentTimeMillis() - startTime) / 1000
            logger.info("Processamento do CSV concluído em ${totalTime}s")
        } catch (e: Exception) {
            logger.error("Erro ao processar o CSV: ${e.message}", e)
        }
    }

    /** Salva um lote de registros EnergyGenerator no banco de dados. */
    private fun saveBatch(batch: List<EnergyGenerator>) {
        try {
            repository.saveAll(batch)
            logger.info("${batch.size} registros salvos com sucesso.")
        } catch (e: Exception) {
            logger.warn("Falha ao salvar o lote, tentando salvar individualmente: ${e.message}")
            batch.forEach { generator ->
                try {
                    repository.save(generator)
                } catch (ex: Exception) {
                    logger.error("Falha ao salvar registro: ${generator.name} - ${ex.message}", ex)
                }
            }
        }
    }

    /** Converte uma linha do CSV em um objeto EnergyGenerator. */
    private fun parseCsvLine(line: String, header: List<String>): EnergyGenerator? {
        if (line.isBlank()) return null

        val columns = line.split(";").map { it.trim() }
        if (columns.size != header.size) return null

        val row = header.zip(columns).toMap()

        return try {
            EnergyGenerator(
                    name = row["NomEmpreendimento"] ?: "Desconhecido",
                    state = row["SigUFPrincipal"] ?: "N/A",
                    fuelType = row["DscOrigemCombustivel"] ?: "N/A",
                    generationType = row["SigTipoGeracao"] ?: "N/A",
                    powerKw = parseBigDecimal(row["MdaPotenciaOutorgadaKw"]),
                    companyName = row["NomEmpresaConexao"] ?: "N/A",
                    connectionVoltage = parseBigDecimal(row["MdaTensaoConexao"]),
                    connectionName = row["NomConexao"] ?: "N/A",
                    status = row["DscSituacaoObra"] ?: "N/A"
            )
        } catch (e: Exception) {
            logger.warn("Erro ao processar linha: ${e.message}")
            null
        }
    }

    /** Converte uma String para BigDecimal, tratando valores nulos e separadores de milhar. */
    private fun parseBigDecimal(value: String?): BigDecimal {
        return value?.replace(",", ".")?.toBigDecimalOrNull() ?: BigDecimal.ZERO
    }
}

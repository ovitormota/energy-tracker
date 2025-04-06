package com.energytracker.controller

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import com.energytracker.service.EnergyGeneratorService
import com.energytracker.model.EnergyGenerator
import com.energytracker.scheduler.EnergyGeneratorScheduler

@RestController
@RequestMapping("/energy-generators")
class EnergyGeneratorResource(
    private val service: EnergyGeneratorService, 
    private val scheduler: EnergyGeneratorScheduler
) {

    /**
     * Endpoint para criar um novo gerador de energia no banco de dados.
     * @param energyGenerator Objeto recebido no corpo da requisição.
     * @return O gerador salvo com ID gerado.
     */
    @PostMapping
    fun create(@RequestBody energyGenerator: EnergyGenerator): ResponseEntity<EnergyGenerator> {
        val saved = service.save(energyGenerator)
        return ResponseEntity.ok(saved)
    }

    /**
     * Endpoint para listar todos os geradores de energia cadastrados.
     * @return Lista de todos os geradores armazenados no banco de dados.
     */
    @GetMapping
    fun getAll(): ResponseEntity<List<EnergyGenerator>> {
        val list = service.findAll()
        return ResponseEntity.ok(list)
    }

    /**
     * Endpoint para iniciar manualmente o processamento do CSV.
     * @return Mensagem informando que o processamento foi iniciado.
     */
    @GetMapping("/fetch")
    fun fetchDataManually(): String {
        scheduler.fetchAndProcessCsv()
        return "✅ Processamento iniciado!"
    }

    /**
     * Endpoint para buscar os 5 maiores geradores de energia.
     * @return Lista contendo os 5 geradores com maior potência (powerKw).
     */
    @GetMapping("/top5")
    fun getTop5Generators(): ResponseEntity<List<EnergyGenerator>> {
        val top5 = service.findTop5Generators()
        return ResponseEntity.ok(top5)
    }
}

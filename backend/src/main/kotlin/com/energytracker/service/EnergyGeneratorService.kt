package com.energytracker.service

import org.springframework.stereotype.Service
import com.energytracker.repository.EnergyGeneratorRepository
import com.energytracker.model.EnergyGenerator

@Service
class EnergyGeneratorService(private val repository: EnergyGeneratorRepository) {

    /**
     * Salva um novo gerador de energia no banco de dados.
     * @param energyGenerator Objeto a ser salvo.
     * @return O objeto persistido.
     */
    fun save(energyGenerator: EnergyGenerator): EnergyGenerator {
        return repository.save(energyGenerator)
    }

    /**
     * Recupera todos os geradores de energia cadastrados.
     * @return Lista contendo todos os geradores de energia.
     */
    fun findAll(): List<EnergyGenerator> {
        return repository.findAll()
    }

    /**
     * Obtém os 5 maiores geradores de energia, ordenados pela maior potência (powerKw).
     * @return Lista contendo os 5 maiores geradores de energia.
     */
    fun findTop5Generators(): List<EnergyGenerator> {
        return repository.findTop5ByOrderByPowerKwDesc()
    }
}

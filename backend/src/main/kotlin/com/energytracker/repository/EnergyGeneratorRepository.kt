package com.energytracker.repository

import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID
import com.energytracker.model.EnergyGenerator

interface EnergyGeneratorRepository : JpaRepository<EnergyGenerator, UUID> {

    /**
     * Consulta os 5 maiores geradores de energia ordenados por potência (powerKw) em ordem decrescente.
     * @return Lista contendo os 5 geradores com maior potência.
     */
    fun findTop5ByOrderByPowerKwDesc(): List<EnergyGenerator>
}

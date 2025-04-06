package com.energytracker.model

import jakarta.persistence.*
import org.hibernate.annotations.Type
import java.math.BigDecimal
import java.util.*
import java.time.Instant

@Entity
@Table(name = "energy_generator")
data class EnergyGenerator(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    val id: Long = 0,

    @Column(nullable = false, length = 255)
    val name: String,

    @Column(nullable = false, length = 10)
    val state: String,

    @Column(nullable = false, length = 100)
    val fuelType: String,

    @Column(nullable = false, length = 50)
    val generationType: String,

    @Column(nullable = false, precision = 10, scale = 2)
    val powerKw: BigDecimal,

    @Column(nullable = false, length = 255)
    val companyName: String,

    @Column(precision = 10, scale = 2)
    val connectionVoltage: BigDecimal? = null,

    @Column(length = 255)
    val connectionName: String? = null,

    @Column(length = 100)
    val status: String? = null,
)

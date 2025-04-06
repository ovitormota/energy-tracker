package com.energytracker

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.scheduling.annotation.EnableScheduling

@SpringBootApplication
@EnableScheduling
class EnergytrackerApplication

fun main(args: Array<String>) {
	runApplication<EnergytrackerApplication>(*args)
}

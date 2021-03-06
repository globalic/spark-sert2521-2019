package me.andrewda

import io.ktor.application.Application
import io.ktor.application.call
import io.ktor.application.install
import io.ktor.auth.Authentication
import io.ktor.auth.jwt.jwt
import io.ktor.features.CallLogging
import io.ktor.features.CORS
import io.ktor.features.ContentNegotiation
import io.ktor.features.StatusPages
import io.ktor.gson.gson
import io.ktor.http.HttpMethod
import io.ktor.http.HttpStatusCode
import io.ktor.response.respond
import io.ktor.routing.get
import io.ktor.routing.route
import io.ktor.routing.routing
import me.andrewda.authentication.JwtConfig
import me.andrewda.constants.Routes
import me.andrewda.controllers.UserPrincipal
import me.andrewda.handlers.*
import me.andrewda.utils.Database
import me.andrewda.utils.ExceptionWithStatus
import me.andrewda.utils.Status
import org.slf4j.event.Level

fun Application.main() {
    Database.init()

    install(Authentication) {
        jwt {
            verifier(JwtConfig.verifier)
            validate {
                it.payload.getClaim("id").asInt()?.let { id ->
                    UserPrincipal(id)
                }
            }
        }
    }

    install(CallLogging) {
        level = Level.INFO
    }

    install(CORS) {
        anyHost()

        header("Authorization")

        method(HttpMethod.Patch)
        method(HttpMethod.Delete)
    }

    install(StatusPages) {
        val errorCodes = HttpStatusCode.allStatusCodes.filter { it.value >= 400 }.toTypedArray()
        status(*errorCodes) {
            call.respond(Status.fromHttpStatusCode(it))
        }

        exception<ExceptionWithStatus> { cause ->
            call.respond(cause.status, Status(
                cause.status.value,
                cause.message ?: cause.status.description,
                false
            ))
        }
    }

    install(ContentNegotiation) {
        gson {
            setPrettyPrinting()
            enableComplexMapKeySerialization()
            excludeFieldsWithoutExposeAnnotation()
            serializeNulls()
        }
    }

    routing {
        route(Routes.API) {
            auth()
            user()
            person()
            item()
            request()
            payment()

            test()

            // Route any unspecified API requests to 404
            get("{...}") {
                call.respond(HttpStatusCode.NotFound)
            }
        }

        frontend()
    }
}

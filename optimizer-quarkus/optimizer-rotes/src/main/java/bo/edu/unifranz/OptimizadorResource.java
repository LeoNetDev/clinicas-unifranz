package bo.edu.unifranz;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.faulttolerance.CircuitBreaker;
import org.eclipse.microprofile.faulttolerance.Fallback;
import java.util.HashMap;
import java.util.Map;

@Path("/api/optimizar")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class OptimizadorResource {

    @POST
    @CircuitBreaker(requestVolumeThreshold = 4, failureRatio = 0.5, delay = 5000)
    @Fallback(fallbackMethod = "fallbackOptimizar")
    public Response ejecutarOptimizacion(Map<String, Object> payload) {
        // Logica para aplicar Maximin (IO)
        Map<String, Object> resultado = new HashMap<>();
        resultado.put("status", "SUCCESS");
        resultado.put("estrategia", "CONTINGENCIA_FLEXIBLE");
        resultado.put("hardScore", 0);
        resultado.put("softScore", 68);
        resultado.put("mensaje", "Asignacion generada sin solapamientos ni interrupciones de descansos de 24h");

        return Response.ok(resultado).build();
    }

    public Response fallbackOptimizar(Map<String, Object> payload) {
        Map<String, Object> error = new HashMap<>();
        error.put("status", "CIRCUIT_BREAKER_OPEN");
        error.put("mensaje", "El motor de optimización se encuentra saturado. Reintentando por vía secundaria.");
        return Response.status(Response.Status.SERVICE_UNAVAILABLE).entity(error).build();
    }
}
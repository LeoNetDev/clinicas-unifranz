# Rotes Clínicos — UNIFRANZ

Prototipo de interfaz para organizar internos, servicios clínicos y rotaciones de la Clínica UNIFRANZ.

## Qué incluye esta versión

- Dashboard adaptable a escritorio y móvil.
- Fecha y hora actuales.
- Vistas de internos, servicios, rotaciones y pronóstico hospitalario.
- Formularios de demostración para probar la interfaz.
- Backend Quarkus existente conservado.

**Importante:** los internos, capacidades, estados y probabilidades del dashboard son datos ficticios de demostración. Los formularios todavía no persisten información en PostgreSQL y el pronóstico no es un modelo predictivo real.

## Ejecutar la aplicación

Requisitos: Java 21 y conexión a Internet la primera vez para que Maven descargue dependencias.

En una terminal, entra a `optimizer-quarkus` y ejecuta:

### Windows PowerShell

```powershell
cd optimizer-quarkus
.\mvnw.cmd quarkus:dev
```

### Linux / macOS

```bash
cd optimizer-quarkus
./mvnw quarkus:dev
```

Abre `http://localhost:8081/`.

## PostgreSQL opcional

Desde la carpeta raíz del repositorio, configura una contraseña local en `.env` (puedes copiar `.env.example` y cambiar la contraseña) y ejecuta:

```bash
docker compose up -d
```

No uses contraseñas reales ni reutilizadas en repositorios públicos.

## Próximos pasos

1. Confirmar los servicios y cargos reales con coordinación de la clínica.
2. Diseñar el modelo de datos y conectar Quarkus con PostgreSQL.
3. Implementar CRUD persistente de internos, servicios, cargos y rotaciones.
4. Implementar reglas de validación de cupos, turnos y solapamientos.
5. Integrar datos hospitalarios autorizados y validar un modelo de pronóstico.

# Propuesta Conceptual: Módulo de Pacientes y Turnos

## 1. Modelado de Datos (Entidades)

Para que el frontend pueda gestionar la asignación de turnos, necesitamos definir dos entidades principales con sus datos mínimos e indispensables:

### Entidad: Paciente
Representa a la persona que solicita atención médica.
```typescript
interface Paciente {
  id: string; // UUID autogenerado
  dni: string; // Documento de identidad
  nombre: string;
  apellido: string;
  fechaNacimiento: string; // Formato YYYY-MM-DD
  telefono: string; // Contacto principal
  email: string;
}
interface Turno {
  id: string; // UUID autogenerado
  pacienteId: string; // Relación con el Paciente
  medicoId: string; // Relación con el Profesional
  fecha: string; // Formato YYYY-MM-DD
  hora: string; // Formato HH:MM
  estado: 'Pendiente' | 'Confirmado' | 'Cancelado';
}
{
  "dni": "35123456",
  "nombre": "Ana",
  "apellido": "García",
  "fechaNacimiento": "1990-05-15",
  "telefono": "1122334455",
  "email": "ana.garcia@email.com"
}
{
  "pacienteId": "uuid-del-paciente",
  "medicoId": "uuid-del-medico",
  "fecha": "2026-10-20",
  "hora": "10:30"
}
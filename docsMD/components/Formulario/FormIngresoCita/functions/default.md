[**app_psicologia v1.0.0**](../../../../README.md)

***

[app_psicologia](../../../../modules.md) / [components/Formulario/FormIngresoCita](../README.md) / default

# Function: default()

> **default**(`__namedParameters`): `Element`

Descripción:
Este componente permite al usuario ingresar o editar una cita para un paciente. Si se proporciona un citaId, 
se cargan los datos de la cita existente para su edición; si no, se trata de la creación de una nueva cita.

## Parameters

### \_\_namedParameters

`Props`

## Returns

`Element`

## Props

citaId?: (opcional) ID de la cita a editar. Si no se proporciona, se asume que se está creando una nueva cita.
## Funcionalidades:
- Permite seleccionar un paciente de la lista de pacientes.
- Permite seleccionar la fecha y la hora de la cita mediante un selector de fecha y hora.
- Valida que se haya seleccionado un paciente antes de enviar el formulario.
- Si citaId está presente, actualiza la cita; si no, crea una nueva cita.
Muestra un mensaje de éxito al agendar la cita.
## Estados:
- pacienteId: ID del paciente seleccionado.
- pacienteNombre: Nombre del paciente seleccionado.
- pacienteApellido: Apellido del paciente seleccionado.
- date: Fecha y hora seleccionada para la cita.
- mode: Modo del selector de fecha/hora.
- show: Controla la visibilidad del selector de fecha/hora.
- error: Mensaje de error en caso de no haber seleccionado un paciente.

## Example

```ts
<FormIngresoCita citaId="123" />
```

## Defined in

[components/Formulario/FormIngresoCita.tsx:36](https://github.com/XxtbmfxX/app_psicologia/blob/da762f4f9225edbb02c8e13dfe2f9bc7ae75eef5/components/Formulario/FormIngresoCita.tsx#L36)

[**app_psicologia v1.0.0**](../../../../README.md)

***

[app_psicologia](../../../../modules.md) / [components/mostrar/FilaArchivado](../README.md) / default

# Function: default()

> **default**(`__namedParameters`): `Element`

## Descripción:
Este componente muestra información de un paciente archivado,
permitiendo devolverlo a la lista de pacientes activos.
Se utiliza en una lista de pacientes archivados.

## Propiedades:

- id: Identificador único del paciente (string).
- nombre: Nombre del paciente (string).
- apellido: Apellido del paciente (string).
- rut: RUT del paciente (string).
## Lógica:

Se utiliza el hook usePacientes para acceder a la función devolverPacienteArchivado,
que mueve al paciente de vuelta a la lista de pacientes activos.
Un estado loading controla la visualización de un indicador de carga mientras se procesa la devolución.
Muestra un botón para devolver el paciente y, mientras se procesa, un indicador de carga (ActivityIndicator).
Funciones:

handleDevolver: Llama a la función devolverPacienteArchivado para restaurar al paciente y muestra una alerta de éxito.

## Parameters

### \_\_namedParameters

`Props`

## Returns

`Element`

## Defined in

[components/mostrar/FilaArchivado.tsx:38](https://github.com/XxtbmfxX/app_psicologia/blob/da762f4f9225edbb02c8e13dfe2f9bc7ae75eef5/components/mostrar/FilaArchivado.tsx#L38)

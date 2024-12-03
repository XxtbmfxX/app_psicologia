[**app_psicologia v1.0.0**](../../../../README.md)

***

[app_psicologia](../../../../modules.md) / [components/mostrar/FilaTranscripciones](../README.md) / default

# Function: default()

> **default**(`__namedParameters`): `Element`

# FilaTranscripciones
## Descripción:
Este componente muestra la información de una transcripción de audio. Permite visualizar el estado de la transcripción y obtener el texto si está disponible. También incluye la opción de eliminar la transcripción.

## Propiedades:
- transcripcion: Objeto de tipo Transcripcion que contiene los datos de la transcripción.

## Lógica:

Se usa el hook useSpeechToText para interactuar con la API de transcripción (obtener y eliminar transcripciones).
Muestra el estado de la transcripción (por ejemplo, "queued", "processing", "completed").
El texto de la transcripción se obtiene al presionar un botón que activa la función obtenerTranscripcionAPI.

## Funciones:

handleEliminar: Elimina la transcripción después de mostrar una alerta de confirmación.
handleGetTranscripcion: Obtiene el texto de la transcripción desde la API.
getColorByStatus: Retorna un color según el estado de la transcripción.

## Parameters

### \_\_namedParameters

`Props`

## Returns

`Element`

## Defined in

[components/mostrar/FilaTranscripciones.tsx:33](https://github.com/XxtbmfxX/app_psicologia/blob/da762f4f9225edbb02c8e13dfe2f9bc7ae75eef5/components/mostrar/FilaTranscripciones.tsx#L33)

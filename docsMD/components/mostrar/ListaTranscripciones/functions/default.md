[**app_psicologia v1.0.0**](../../../../README.md)

***

[app_psicologia](../../../../modules.md) / [components/mostrar/ListaTranscripciones](../README.md) / default

# Function: default()

> **default**(`__namedParameters`): `Element`

# ListaTranscripciones
## Descripción:
Este componente lista las transcripciones disponibles para un paciente, permitiendo actualizar la lista mediante un "pull-to-refresh". Si no hay transcripciones, no muestra nada en particular. Si hay transcripciones, se renderizan con un componente FilaTranscripciones.

# Lógica:

- Utiliza el hook useSpeechToText para acceder a las transcripciones desde el contexto SpeechToTextContext.
- Permite la actualización de las transcripciones mediante un "pull-to-refresh" usando el FlatList y la función onRefresh, que activa la recarga de las transcripciones al llamar a cargarTranscripciones.
- Cada transcripción se muestra con un componente FilaTranscripciones, que recibe la transcripción como propiedad.

## Propiedades:

- nombrePaciente: Este parámetro es opcional y permite filtrar las transcripciones por nombre del paciente, aunque no se está utilizando en el código de la versión actual.

## Parameters

### \_\_namedParameters

#### __namedParameters.nombrePaciente

`string`

## Returns

`Element`

## Defined in

[components/mostrar/ListaTranscripciones.tsx:22](https://github.com/XxtbmfxX/app_psicologia/blob/da762f4f9225edbb02c8e13dfe2f9bc7ae75eef5/components/mostrar/ListaTranscripciones.tsx#L22)

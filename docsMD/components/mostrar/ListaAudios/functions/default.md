[**app_psicologia v1.0.0**](../../../../README.md)

***

[app_psicologia](../../../../modules.md) / [components/mostrar/ListaAudios](../README.md) / default

# Function: default()

> **default**(`__namedParameters`): `Element`

# ListaAudios
## Descripción:
Este componente muestra una lista de audios filtrados por el nombre de un paciente. Utiliza el contexto de AudioContext para obtener la lista de audios disponibles y filtra aquellos que corresponden al paciente especificado.

## Propiedades:

- nombrePaciente: Nombre del paciente a filtrar los audios (opcional, por defecto es "pedro").

## Lógica:

- Usa el hook useAudioContext para acceder a la lista de audios (audioFiles).
- Filtra los audios que comienzan con el nombre del paciente (por ejemplo, "pedro_").
- Si no hay audios filtrados, muestra un mensaje indicando que no hay audios disponibles para el paciente.
- Si hay audios, utiliza un FlatList para renderizar una lista de componentes FilaAudio.

## Parameters

### \_\_namedParameters

#### __namedParameters.nombrePaciente

`string` = `"pedro"`

## Returns

`Element`

## Defined in

[components/mostrar/ListaAudios.tsx:22](https://github.com/XxtbmfxX/app_psicologia/blob/da762f4f9225edbb02c8e13dfe2f9bc7ae75eef5/components/mostrar/ListaAudios.tsx#L22)

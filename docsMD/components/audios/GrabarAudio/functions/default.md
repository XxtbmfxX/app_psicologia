[**app_psicologia v1.0.0**](../../../../README.md)

***

[app_psicologia](../../../../modules.md) / [components/audios/GrabarAudio](../README.md) / default

# Function: default()

> **default**(`__namedParameters`): `Element`

Componente para grabar audio con Expo Audio.

Función principal:
- Permite iniciar y detener grabaciones de audio.
- Guarda las grabaciones usando un contexto de audio (`AudioContext`).
- Asigna un nombre a las grabaciones basado en el nombre del paciente y la fecha actual.

Dependencias externas:
- `Audio` de `expo-av`: Manejo de grabaciones de audio (https://docs.expo.dev/versions/latest/sdk/audio/).
- `useAudioContext`: Contexto para gestionar y almacenar audios en la aplicación (ver documentación del contexto).

Props:
- `nombrePaciente` (opcional): Nombre del paciente asociado con la grabación. Por defecto, `"pedro"`.

## Parameters

### \_\_namedParameters

#### __namedParameters.nombrePaciente

`string` = `"pedro"`

## Returns

`Element`

## Component

## Defined in

[components/audios/GrabarAudio.tsx:23](https://github.com/XxtbmfxX/app_psicologia/blob/da762f4f9225edbb02c8e13dfe2f9bc7ae75eef5/components/audios/GrabarAudio.tsx#L23)

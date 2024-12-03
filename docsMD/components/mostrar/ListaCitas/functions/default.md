[**app_psicologia v1.0.0**](../../../../README.md)

***

[app_psicologia](../../../../modules.md) / [components/mostrar/ListaCitas](../README.md) / default

# Function: default()

> **default**(): `Element`

# ListaCitas
## Descripción:
Este componente lista todas las citas del usuario, mostrando una lista con animaciones de entrada y salida. Si no hay citas, muestra un mensaje indicando que no hay citas disponibles.

## Lógica:

- Usa el hook useCitas para acceder a las citas filtradas.
- Si la lista de citas está vacía, muestra un mensaje con un emoji de desaprobación.
- Si hay citas, utiliza un FlatList para renderizar cada cita con un componente FilaCita y animaciones de entrada (SlideInLeft) y salida (SlideOutRight).
- Se utiliza la librería react-native-reanimated para gestionar las animaciones de los elementos de la lista.

## Returns

`Element`

## Defined in

[components/mostrar/ListaCitas.tsx:20](https://github.com/XxtbmfxX/app_psicologia/blob/da762f4f9225edbb02c8e13dfe2f9bc7ae75eef5/components/mostrar/ListaCitas.tsx#L20)

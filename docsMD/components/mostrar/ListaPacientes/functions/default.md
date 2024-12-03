[**app_psicologia v1.0.0**](../../../../README.md)

***

[app_psicologia](../../../../modules.md) / [components/mostrar/ListaPacientes](../README.md) / default

# Function: default()

> **default**(): `Element`

# ListaPacientes
## Descripción:
Este componente muestra la lista de pacientes filtrados con animaciones de entrada y salida. Si no hay pacientes disponibles, muestra un mensaje indicando que no hay pacientes.

## Lógica:

- Utiliza el hook usePacientes para obtener la lista de pacientes filtrados desde el contexto PacienteContext.
- Si la lista de pacientes está vacía, muestra un mensaje con un emoji de desaprobación.
- Si hay pacientes, usa un FlatList para renderizar la lista, mostrando un componente FilaPaciente con animaciones de entrada (FadeIn) y salida (FadeOut) proporcionadas por react-native-reanimated.

## Returns

`Element`

## Defined in

[components/mostrar/ListaPacientes.tsx:19](https://github.com/XxtbmfxX/app_psicologia/blob/da762f4f9225edbb02c8e13dfe2f9bc7ae75eef5/components/mostrar/ListaPacientes.tsx#L19)

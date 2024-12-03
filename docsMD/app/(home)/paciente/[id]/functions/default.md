[**app_psicologia v1.0.0**](../../../../../README.md)

***

[app_psicologia](../../../../../modules.md) / [app/(home)/paciente/\[id\]](../README.md) / default

# Function: default()

> **default**(): `Element`

Componente `PacienteDetails`.

Función principal:
- Muestra los detalles de un paciente utilizando el ID obtenido desde las rutas.
- Si no se encuentra el paciente, muestra un mensaje indicando el error.

Dependencias externas:
- `useLocalSearchParams` de `expo-router` para obtener los parámetros de la URL.
- `usePacientes` de `PacienteContext` para acceder a la lista de pacientes.
- `SafeAreaView` para manejar las áreas seguras (ver: https://github.com/th3rdwave/react-native-safe-area-context).
- `FichaPaciente` para mostrar los detalles del paciente (componente reutilizable).

## Returns

`Element`

Detalles de un paciente o un mensaje de error.

## Component

## Defined in

[app/(home)/paciente/\[id\].tsx:25](https://github.com/XxtbmfxX/app_psicologia/blob/da762f4f9225edbb02c8e13dfe2f9bc7ae75eef5/app/(home)/paciente/[id].tsx#L25)

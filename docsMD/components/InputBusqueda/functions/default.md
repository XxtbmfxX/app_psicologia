[**app_psicologia v1.0.0**](../../../README.md)

***

[app_psicologia](../../../modules.md) / [components/InputBusqueda](../README.md) / default

# Function: default()

> **default**(): `Element`

Campo de entrada para buscar pacientes.

Función principal:
- Permite al usuario escribir un término de búsqueda.
- Actualiza un filtro de búsqueda en el contexto de pacientes (`PacienteContext`).

Dependencias externas:
- `usePacientes`: Contexto para gestionar pacientes y sus filtros de búsqueda.
- `TextInput` de React Native: Entrada de texto (https://reactnative.dev/docs/textinput).

Estado interno:
- `busqueda`: Guarda el texto ingresado en el campo de búsqueda.

## Returns

`Element`

## Component

## Example

```ts
<InputBusqueda />
```

## Defined in

[components/InputBusqueda.tsx:23](https://github.com/XxtbmfxX/app_psicologia/blob/da762f4f9225edbb02c8e13dfe2f9bc7ae75eef5/components/InputBusqueda.tsx#L23)

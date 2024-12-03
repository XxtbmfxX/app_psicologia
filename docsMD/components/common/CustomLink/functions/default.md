[**app_psicologia v1.0.0**](../../../../README.md)

***

[app_psicologia](../../../../modules.md) / [components/common/CustomLink](../README.md) / default

# Function: default()

> **default**(`__namedParameters`): `Element`

Componente de enlace personalizado para navegación en la aplicación.

Función principal:
- Renderiza un enlace estilizado que redirige a la ruta especificada.
- Basado en el componente `Link` de `expo-router`.

Dependencias externas:
- `Href` y `Link` de `expo-router`: Navegación basada en rutas (https://expo.github.io/router/docs/link).

Props:
- `ruta`: La ruta a la que redirige el enlace.
- `titulo`: El texto que se muestra en el enlace.

## Parameters

### \_\_namedParameters

`Props`

## Returns

`Element`

## Component

## Example

```ts
<CustomLink ruta="/home" titulo="Volver al inicio" />
```

## Defined in

[components/common/CustomLink.tsx:29](https://github.com/XxtbmfxX/app_psicologia/blob/da762f4f9225edbb02c8e13dfe2f9bc7ae75eef5/components/common/CustomLink.tsx#L29)

[**app_psicologia v1.0.0**](../../../../README.md)

***

[app_psicologia](../../../../modules.md) / [components/common/CustomPressable](../README.md) / default

# Function: default()

> **default**(`props`, `deprecatedLegacyContext`?): `ReactNode`

Botón animado y personalizable con `Animated` y `Pressable`.

Función principal:
- Renderiza un botón que incluye animación al presionarlo (efecto de escala).
- Permite personalización de colores, texto y tamaño de fuente.

Dependencias externas:
- `Animated` de React Native: Manejo de animaciones (https://reactnative.dev/docs/animated).
- `Pressable` de React Native: Manejo de interacciones táctiles (https://reactnative.dev/docs/pressable).

Props:
- `onPress`: Función que se ejecuta al presionar el botón.
- `title`: Texto del botón.
- `bgColor` (opcional): Clase de Tailwind para el color de fondo. Por defecto, `"bg-blue-500"`.
- `textColor` (opcional): Clase de Tailwind para el color del texto. Por defecto, `"text-white"`.
- `fontSize` (opcional): Clase de Tailwind para el tamaño del texto. Por defecto, `"text-lg"`.

## Parameters

### props

`BotonProps`

### deprecatedLegacyContext?

`any`

**Deprecated**

**See**

[React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods)

## Returns

`ReactNode`

## Component

## Example

```ts
<CustomPressable
  onPress={() => alert('¡Hola!')}
  title="Presióname"
  bgColor="bg-red-500"
  textColor="text-black"
/>
```

## Defined in

[components/common/CustomPressable.tsx:42](https://github.com/XxtbmfxX/app_psicologia/blob/da762f4f9225edbb02c8e13dfe2f9bc7ae75eef5/components/common/CustomPressable.tsx#L42)

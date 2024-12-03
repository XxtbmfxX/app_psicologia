[**app_psicologia v1.0.0**](../../../../README.md)

***

[app_psicologia](../../../../modules.md) / [components/Formulario/InputField](../README.md) / default

# Function: default()

> **default**(`props`, `deprecatedLegacyContext`?): `ReactNode`

Componente InputField
## Descripción:
Componente reutilizable para un campo de entrada en formularios.
Permite personalizar la entrada con un placeholder, 
un valor seguro para contraseñas y manejo de errores.

## Parameters

### props

`InputFieldProps`

### deprecatedLegacyContext?

`any`

**Deprecated**

**See**

[React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods)

## Returns

`ReactNode`

## Params

- name: Nombre del campo que se utilizará en el formulario.
- control: Controlador de react-hook-form para manejar el valor del campo.
- placeholder: Texto que se muestra cuando el campo está vacío.
- secureTextEntry?: (opcional) Si se establece a true, el campo se utilizará para contraseñas (oculta el texto).
- error?: (opcional) Mensaje de error a mostrar debajo del campo si hay un error de validación.

## Example

```ts
<InputField
  name="email"
  control={control}
  placeholder="Correo electrónico"
  error={errors.email?.message}
/>
```

## Defined in

[components/Formulario/InputField.tsx:36](https://github.com/XxtbmfxX/app_psicologia/blob/da762f4f9225edbb02c8e13dfe2f9bc7ae75eef5/components/Formulario/InputField.tsx#L36)

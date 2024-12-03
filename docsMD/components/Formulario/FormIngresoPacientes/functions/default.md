[**app_psicologia v1.0.0**](../../../../README.md)

***

[app_psicologia](../../../../modules.md) / [components/Formulario/FormIngresoPacientes](../README.md) / default

# Function: default()

> **default**(`__namedParameters`): `Element`

Componente FormIngresoPaciente
Descripción:
Formulario para ingresar o editar los datos de un paciente, incluyendo su nombre, teléfono, apellido y RUT. Si se proporciona un id, se cargan los datos del paciente para su edición; si no, se trata de la creación de un nuevo paciente.

## Parameters

### \_\_namedParameters

#### __namedParameters.id

`null` \| `string`

## Returns

`Element`

## Props

id?: (opcional) ID del paciente a editar. Si no se proporciona, se asume que se está creando un nuevo paciente.
## Funcionalidades:
- Permite al usuario ingresar o editar los datos del paciente.
- Valida que todos los campos sean correctos antes de enviar el formulario.
- Si id está presente, actualiza los datos del paciente; si no, crea un nuevo paciente.
Muestra un mensaje de éxito al guardar los cambios.
## Estados:
- loading: Indica si se están cargando los datos del paciente.

## Example

```ts
<FormIngresoPaciente id="123" />
```

## Defined in

[components/Formulario/FormIngresoPacientes.tsx:35](https://github.com/XxtbmfxX/app_psicologia/blob/da762f4f9225edbb02c8e13dfe2f9bc7ae75eef5/components/Formulario/FormIngresoPacientes.tsx#L35)

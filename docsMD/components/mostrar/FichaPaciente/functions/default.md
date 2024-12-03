[**app_psicologia v1.0.0**](../../../../README.md)

***

[app_psicologia](../../../../modules.md) / [components/mostrar/FichaPaciente](../README.md) / default

# Function: default()

> **default**(`props`): `Element`

Componente que muestra los detalles de un paciente, incluyendo nombre, apellido, RUT, teléfono,
y botones para ver grabaciones, transcripciones, archivar o modificar los datos del paciente.

## Parameters

### props

`Props`

Propiedades del componente.

## Returns

`Element`

- Un componente con los detalles del paciente y acciones disponibles.

## Throws

- Si hay un problema al archivar o modificar los datos del paciente, se muestra un mensaje de alerta.

## Example

```ts
<FichaPaciente paciente={pacienteData} />
```

## Defined in

[components/mostrar/FichaPaciente.tsx:24](https://github.com/XxtbmfxX/app_psicologia/blob/da762f4f9225edbb02c8e13dfe2f9bc7ae75eef5/components/mostrar/FichaPaciente.tsx#L24)

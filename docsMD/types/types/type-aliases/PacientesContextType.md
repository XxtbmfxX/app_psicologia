[**app_psicologia v1.0.0**](../../../README.md)

***

[app_psicologia](../../../modules.md) / [types/types](../README.md) / PacientesContextType

# Type Alias: PacientesContextType

> **PacientesContextType**: `object`

## Type declaration

### actualizarPaciente()

> **actualizarPaciente**: (`id`, `data`) => `Promise`\<`void`\>

#### Parameters

##### id

`string`

##### data

`any`

#### Returns

`Promise`\<`void`\>

### agregarPaciente()

> **agregarPaciente**: (`data`) => `Promise`\<`void`\>

#### Parameters

##### data

`Omit`\<[`Paciente`](Paciente.md), `"id"`\>

#### Returns

`Promise`\<`void`\>

### archivarPaciente()

> **archivarPaciente**: (`pacienteId`) => `Promise`\<`void`\>

#### Parameters

##### pacienteId

`string`

#### Returns

`Promise`\<`void`\>

### devolverPacienteArchivado()

> **devolverPacienteArchivado**: (`pacienteId`) => `Promise`\<`void`\>

#### Parameters

##### pacienteId

`string`

#### Returns

`Promise`\<`void`\>

### obtenerPacientePorId()

> **obtenerPacientePorId**: (`id`) => `Promise`\<`null` \| `any`\>

#### Parameters

##### id

`string`

#### Returns

`Promise`\<`null` \| `any`\>

### pacientes

> **pacientes**: [`Paciente`](Paciente.md)[]

### pacientesArchivados

> **pacientesArchivados**: [`Paciente`](Paciente.md)[]

### pacientesFiltrados

> **pacientesFiltrados**: [`Paciente`](Paciente.md)[]

### setFiltroBusqueda

> **setFiltroBusqueda**: `Dispatch`\<`SetStateAction`\<`string`\>\>

## Defined in

[types/types.d.ts:12](https://github.com/XxtbmfxX/app_psicologia/blob/da762f4f9225edbb02c8e13dfe2f9bc7ae75eef5/types/types.d.ts#L12)

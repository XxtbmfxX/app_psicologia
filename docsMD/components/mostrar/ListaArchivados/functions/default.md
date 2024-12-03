[**app_psicologia v1.0.0**](../../../../README.md)

***

[app_psicologia](../../../../modules.md) / [components/mostrar/ListaArchivados](../README.md) / default

# Function: default()

> **default**(): `Element`

# ListaArchivados
## Descripción:
Este componente lista todos los pacientes archivados en un formato de lista usando FlatList. Si no hay pacientes archivados, muestra un mensaje indicando que no hay datos.

# Lógica:

- Usa el hook usePacientes para obtener la lista de pacientes archivados.
- Si la lista está vacía, muestra un mensaje indicando que no hay pacientes archivados.
- Si hay pacientes archivados, usa un FlatList para renderizar una lista de componentes FilaArchivado.

## Returns

`Element`

## Defined in

[components/mostrar/ListaArchivados.tsx:20](https://github.com/XxtbmfxX/app_psicologia/blob/da762f4f9225edbb02c8e13dfe2f9bc7ae75eef5/components/mostrar/ListaArchivados.tsx#L20)

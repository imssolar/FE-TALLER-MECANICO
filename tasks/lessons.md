# Lecciones aprendidas — taller-mecanico-fe

Registro de errores cometidos y lecciones aprendidas durante el desarrollo.
Se actualiza después de cada corrección para evitar repetir el mismo error.

---

## 2026-03-10

### Error: shadcn instaló el componente Tabs en una ruta incorrecta
- **Qué pasó**: Al ejecutar `npx shadcn@latest add tabs`, el componente se instaló en una carpeta literal `@/components/ui/tabs.tsx` en vez de `src/components/ui/tabs.tsx`.
- **Síntoma**: `Failed to resolve import '@/components/ui/tabs'` al levantar Vite.
- **Fix**: Mover manualmente el archivo a `src/components/ui/tabs.tsx` y reiniciar Vite para limpiar caché.
- **Regla**: Después de instalar cualquier componente con `shadcn`, verificar que el archivo esté en `src/components/ui/` y no en una ruta literal con `@/`.

---

### Error: Frontend tipaba con objetos anidados cuando el backend retornaba DTO plano
- **Qué pasó**: La interfaz `OrdenTrabajo` tenía `terminal: Terminal | null`, `bus: Bus | null`, cuando el backend ya retornaba campos planos como `idTerminal`, `patenteB`, `nombreCompletoConductor`.
- **Síntoma**: La tabla mostraba `undefined` o celdas vacías al intentar acceder a `ot.terminal?.terminal`.
- **Fix**: Actualizar la interfaz TypeScript para que refleje exactamente la estructura del `ResponseDto` del backend.
- **Regla**: Siempre leer el `ResponseDto` del backend antes de definir los tipos en el frontend. Los tipos deben ser un espejo exacto de lo que retorna la API.

---

### Error: cleanFormData generaba conflictos de tipos con TypeScript
- **Qué pasó**: La función `cleanFormData<T>` intentaba limpiar campos del formulario antes de enviar, pero el tipado genérico causaba errores de TypeScript con los DTOs.
- **Fix**: Eliminar `cleanFormData` y usar campos opcionales (`?`) directamente en los DTOs. Si el campo es vacío, el backend lo ignora con PATCH.
- **Regla**: Preferir campos opcionales en los DTOs en lugar de funciones de limpieza. Menos código, misma funcionalidad.

---

### Error: Tabla de Órdenes de Trabajo mostraba el ID del terminal en vez del nombre
- **Qué pasó**: `OrdenTrabajoResponseDto` solo incluía `idTerminal` pero no `nombreTerminal`. La tabla mostraba el número `3` en vez de "Maipú".
- **Fix**: Agregar `private String nombreTerminal` al DTO del backend y mapearlo en el service. Actualizar el tipo frontend para incluir `nombreTerminal: string`.
- **Regla**: Al implementar una tabla, revisar que cada columna con una relación ManyToOne exponga el campo de nombre legible (no solo el ID) en el ResponseDto del backend.

---

### Error: Archivos creados con Write no aparecían en git status ni en disco
- **Qué pasó**: Se usó la herramienta Write para crear archivos pero no quedaron guardados en disco. Git no los detectaba como untracked.
- **Síntoma**: `git status` solo mostraba Sidebar.tsx como modificado. `ls` confirmó que los archivos no existían.
- **Fix**: Recrear todos los archivos desde cero con Write.
- **Regla**: Después de crear archivos nuevos, verificar con `git status` que aparezcan como `untracked` antes de continuar. Si no aparecen, recrearlos.

---

### Error: Componente de página sin tipo de retorno explícito bloqueado por code review
- **Qué pasó**: `export default function OrdenesTrabajoProg()` sin tipo de retorno fue bloqueado por AGENTS.md (exige tipo de retorno en funciones exportadas).
- **Fix**: Agregar `import { type ReactElement } from "react"` y declarar `: ReactElement` como tipo de retorno.
- **Regla**: Todos los componentes de página exportados deben declarar `: ReactElement` como tipo de retorno. Usar named import `{ type ReactElement }`, nunca `import * as React`.

---

## Plantilla para nuevas lecciones

```
### Error: [título corto]
- **Qué pasó**: [descripción del error]
- **Síntoma**: [qué se veía en el browser o consola]
- **Fix**: [cómo se resolvió]
- **Regla**: [regla para no repetirlo]
```

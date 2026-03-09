Reglas de Code Review — taller-mecanico-fe
Modo de revisión: MODERADO — solo bloquear commits por violaciones serias que afecten
la correctitud, mantenibilidad o consistencia del equipo. Ignorar detalles de estilo menores.

TypeScript

BLOCK: Usar el tipo any. Siempre definir una interfaz o tipo apropiado.
BLOCK: Funciones y hooks exportados sin tipo de retorno.
ALLOW: Inferencia implícita menor en variables locales es aceptable.


React

BLOCK: Componentes de clase. Solo se permiten componentes funcionales con hooks.
BLOCK: Lógica de negocio dentro del JSX o directamente en el cuerpo del componente — extraer a un custom hook.
BLOCK: import * as React — usar imports con nombre: import { useState, useEffect } from 'react'.
BLOCK: Usar useEffect para sincronizar estado que puede ser derivado — calcularlo directamente.
ALLOW: Handlers inline para casos simples (ej. onClick={() => setOpen(false)}).



Arquitectura y Estructura

Cada dominio sigue el patrón: types/ → services/ → hooks/ → pages/
Hooks en src/hooks/{dominio}/use{Dominio}s.ts — nunca co-locados con la página
Services en src/services/{dominio}.service.ts — siempre usan el api centralizado y API_ENDPOINTS
Types en src/types/{dominio}.ts — incluyen interfaz principal, DTOs (Create/Update) y enums con labels
Separación de responsabilidades

BLOCK: Lógica de negocio directamente en componentes de página — extraer a un custom hook
BLOCK: Llamadas HTTP fuera de la capa de services
BLOCK: Estado de servidor (fetching/caching) sin React Query
Los hooks manejan: queries, mutations, formularios, filtros, estado de diálogos
Las páginas solo consumen el hook y renderizan UI


Manejo de errores

Usar getErrorMessage() de src/utils/get-error-message.ts en todos los onError de mutations
Nunca usar mensajes genéricos como toast.error("Error al crear") — siempre mostrar el mensaje del backend
Formularios

Usar react-hook-form con register para inputs nativos
Usar Controller para componentes Radix <Select>
Enums del backend se representan como union types con objetos LABELS para los textos en español
Campos opcionales se limpian con cleanFormData() antes de enviar (strings vacíos → undefined)
Testing (SDD)

Specs al lado del archivo fuente: archivo.spec.ts
Capa 1: Utils → specs sin mocks
Capa 2: Services → mock de api (axios instance)
Capa 3: Hooks → mock de services, wrapper con createWrapper() de src/test/test-utils.tsx
Usar vi.mock() para módulos, vi.mocked() para tipado


Git y Commits

Conventional commits: feat|fix|refactor|chore(scope): descripción
Un commit por archivo cuando hay cambios en múltiples capas
PRs siempre hacia staging, nunca directo a main
Limpiar ramas locales y remotas después de merge
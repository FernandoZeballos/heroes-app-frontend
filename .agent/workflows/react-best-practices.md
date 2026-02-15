---
description: Checklist de buenas prácticas de React y TypeScript
---

1. **Componentes Funcionales**: Verificar que se usen componentes funcionales y Hooks en lugar de componentes de clase.
2. **Tipado Estricto (TypeScript)**:
   - Evitar el uso de `any`.
   - Definir interfaces o types para las Props de los componentes.
   - Usar `React.FC` o definir el tipo de retorno explícitamente si es necesario.
3. **Estructura de Archivos**:
   - Usar "Barrel Files" (index.ts) para exportaciones más limpias si es apropiado.
   - Separar lógica compleja en Custom Hooks (`useSomething`).
4. **Imports**:
   - Preferir imports absolutos (si están configurados en tsconfig) o mantener un orden limpio.
5. **Estilos**:
   - Verificar que no se usen estilos en línea (inline styles) excesivos.
   - Preferir CSS Modules, Styled Components o Tailwind según el proyecto.
6. **Variables de Entorno**:
   - Asegurarse de usar `import.meta.env` (Vite) o `process.env` (Next.js/CRA) correctamente.
7. **Performance**:
   - Identificar renders innecesarios.
   - Usar `useMemo` y `useCallback` solo cuando sea necesario para optimización.

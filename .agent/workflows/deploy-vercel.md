---
description: Despliegue automático a Vercel con validaciones previas
---

1. **Revisar Instalación**: Verificar si Vercel CLI está instalado con `vercel --version`.
   - Si no, ejecutar: `npm i -g vercel`.
2. **Validar Env**: Comprobar que existe `.env` o las variables de entorno necesarias.
3. **Build**: Ejecutar `npm run build` para asegurar que el proyecto compila correctamente.
4. **Deploy**:
   - `vercel` para despliegues de preview.
   - `vercel --prod` para producción.
5. **Verificación**: Comprobar URL de despliegue y estado.

# ✅ CHECKLIST DE PRUEBA - ADMIN PANEL

Usa este checklist para verificar que todo está funcionando correctamente.

---

## 📋 BEFORE YOU START

- [ ] El servidor está corriendo (`npm start`)
- [ ] No hay errores en la terminal
- [ ] Puedes ver: `Servidor corriendo en: http://localhost:3000`

---

## 🧪 PRUEBA 1: ACCESO AL ADMIN

**Acción:** Abre http://localhost:3000/admin en tu navegador

**✓ Deberías ver:**
- [ ] Una pantalla gris/oscura
- [ ] Un menú a la izquierda con estos items:
  - Empresa (con icono ⚙️)
  - Servicios
  - Galería
  - Comentarios
  - Contactos
  - Usuarios
  - Estadísticas
- [ ] Un botón "← Volver al sitio" en la parte inferior del menú
- [ ] El header dice "Administración de Empresa"

**❌ Si no ves esto:** El servidor no está corriendo. Abre terminal en la carpeta del proyecto y ejecuta `npm start`

---

## 🧪 PRUEBA 2: SECCIÓN EMPRESA (Logo)

**Acción:** Click en "Empresa" en el menú izquierdo

**✓ Deberías ver:**
- [ ] El formulario carga correctamente
- [ ] Hay 6 campos de texto:
  1. Nombre de la Empresa
  2. Teléfono
  3. Email
  4. Ubicación
  5. WhatsApp
  6. Logo de la Empresa (tipo file input)
- [ ] Un botón "Guardar Cambios" al final
- [ ] El header cambió a "Información de la Empresa"

**Acción:** Hace click en "Elegir archivo" bajo Logo

**✓ Deberías ver:**
- [ ] Se abre una ventana para seleccionar archivos
- [ ] Puedes ver archivos de tu computadora

**❌ Si no pasa nada:** Intenta hacer click directamente en el texto "Elegir archivo"

---

## 🧪 PRUEBA 3: SECCIÓN GALERÍA (Lo más importante)

**Acción:** Click en "Galería" en el menú izquierdo

**✓ Deberías ver:**
- [ ] El header cambió a "Galería de Fotos y Videos"
- [ ] Una sección que dice "Subir Fotos/Videos"
- [ ] Un botón que dice "Selecciona Archivos" (o "Choose Files")
- [ ] Un dropdown gris que dice "Selecciona categoría"
- [ ] Un botón gris que dice "Subir Archivos" (inactivo por ahora)
- [ ] Una sección abajo que dice "Galería" (vacía si no has subido nada)

**Acción:** Click en "Selecciona Archivos"

**✓ Deberías ver:**
- [ ] Se abre una ventana para seleccionar archivos
- [ ] Puedes ver archivos .jpg, .png, .mp4, etc. en tu computadora

**Acción:** Selecciona 1-3 archivos de imagen (JPG o PNG)

**✓ Después de seleccionar:**
- [ ] Los nombres de los archivos aparecen en un area de texto o abajo del botón
- [ ] El botón "Subir Archivos" ahora está de color (no gris)

**Acción:** Click en el dropdown "Selecciona categoría"

**✓ Deberías ver:**
- [ ] Se abre un menú con 3 opciones:
  1. Bodas
  2. Corporativo
  3. Cumpleaños

**Acción:** Selecciona "Bodas" (u otra categoría)

**✓ Deberías ver:**
- [ ] El dropdown ahora dice "Bodas"
- [ ] El botón "Subir Archivos" sigue activo (de color)

**Acción:** Click en "Subir Archivos"

**✓ Deberías ver:**
- [ ] Un mensaje de éxito: "✓ Archivos subidos correctamente"
- [ ] Las fotos aparecen en la sección "Galería" abajo
- [ ] Cada foto muestra la categoría (Bodas)

---

## 🧪 PRUEBA 4: VERIFICAR FOTOS EN LA WEB

**Acción:** Abre http://localhost:3000 (la página principal)

**✓ Deberías ver:**
- [ ] Tu sitio normal cargó
- [ ] Hay una sección "Galería" en la página
- [ ] Las fotos que acabas de subir están aquí

**Acción:** Busca la sección de "Bodas" en la galería

**✓ Deberías ver:**
- [ ] Las fotos que subiste aparecen en la categoría "Bodas"
- [ ] Se ven claramente las imágenes

---

## 🧪 PRUEBA 5: OTRAS SECCIONES

**Acción:** Click en "Servicios"

**✓ Deberías ver:**
- [ ] Un botón "+ Nuevo Servicio"
- [ ] Una lista de servicios (probablemente vacía)

**Acción:** Click en "Comentarios"

**✓ Deberías ver:**
- [ ] Una lista de comentarios/testimonios
- [ ] Opciones para aprobar/rechazar

**Acción:** Click en "Contactos"

**✓ Deberías ver:**
- [ ] Una lista de mensajes recibidos
- [ ] Cada mensaje muestra nombre, email, teléfono, mensaje

**Acción:** Click en "Usuarios"

**✓ Deberías ver:**
- [ ] Una lista de usuarios admin
- [ ] Información de permisos

**Acción:** Click en "Estadísticas"

**✓ Deberías ver:**
- [ ] Gráficos o números de visitantes
- [ ] Información de vista de galería

---

## 🧪 PRUEBA 6: FLUJO COMPLETO (Repetir)

Repite este flujo 2-3 veces para asegurarte que funciona bien:

1. [ ] Abre http://localhost:3000/admin
2. [ ] Click en "Galería"
3. [ ] Click en "Selecciona Archivos"
4. [ ] Selecciona 2-3 fotos diferentes
5. [ ] Elige una categoría diferente (Corporativo o Cumpleaños)
6. [ ] Click en "Subir Archivos"
7. [ ] Espera el mensaje de éxito
8. [ ] Abre http://localhost:3000
9. [ ] Verifica que las fotos aparecen en la categoría correcta

---

## ⚠️ PROBLEMAS COMUNES Y SOLUCIONES

### Problema: "Archivo no encontrado" o error 404

**Solución:**
```bash
# Reinicia el servidor
Ctrl+C (para parar)
npm start (para iniciar)
```

### Problema: Las fotos no aparecen después de subir

**Solución:**
1. Espera 3-5 segundos
2. Recarga la página principal: Ctrl+R (Windows) o Cmd+R (Mac)
3. Busca la sección de galería

### Problema: El botón "Subir Archivos" sigue gris

**Solución:**
1. Verifica que seleccionaste categoría en el dropdown
2. Verifica que los archivos están seleccionados
3. Abre la consola (F12) y busca errores en rojo

### Problema: "El servidor no responde"

**Solución:**
1. Abre terminal en la carpeta del proyecto
2. Presiona Ctrl+C para parar el servidor
3. Ejecuta: `npm start`
4. Espera a que aparezca: "Servidor corriendo en: http://localhost:3000"

### Problema: Archivos muy grandes

**Solución:**
- Los archivos no deben ser más de 2-5 MB
- Usa un compresor de imágenes antes de subir
- Recomendación: 800x600px máximo para web

---

## 🎯 RESUMEN DE URLS CLAVE

```
Sitio Principal:     http://localhost:3000
Admin Panel:         http://localhost:3000/admin
Galería:             http://localhost:3000#galeria (en la página principal)
```

---

## ✨ CUANDO TODO FUNCIONA

Si pasaste todos los checkmarks ✓, **¡Todo funciona perfectamente!**

**Próximo paso:**
- Desplegar a producción (Netlify) con GUIA_DEPLOY_WEB.md
- O seguir personalizando el sitio

**¿Necesitas ayuda?** Abre un archivo de texto, escribe qué pasó exactamente y dime qué error viste.

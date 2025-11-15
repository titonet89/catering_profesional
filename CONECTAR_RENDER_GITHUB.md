# 🔗 CONECTAR RENDER CON GITHUB - PASO A PASO

**Tiempo:** 5 minutos

Tu código ya está en GitHub. Ahora vamos a conectarlo con Render para que se despliegue automáticamente.

---

## PASO 1: Accede a Render

1. Ve a: https://render.com
2. Inicia sesión con tu cuenta (neptor089@gmail.com)
3. Click en **"Dashboard"** (si no estás en el dashboard)

---

## PASO 2: Crea un nuevo Web Service

1. Click en el botón **"New +"** (arriba a la izquierda)
2. Selecciona **"Web Service"**

---

## PASO 3: Conecta tu repositorio GitHub

1. Se abre una pantalla que dice "Connect a repository"
2. Click en **"Connect Repository"**
3. Busca tu repositorio: **`catering_profesional`**
4. Click en **"Connect"** (botón a la derecha del repositorio)

---

## PASO 4: Configura el Web Service

Completa el formulario:

```
Name:                   catering-profesional
Environment:            Node
Build Command:          npm install
Start Command:          node server.js
Region:                 Virginia (USA)
Branch:                 main
```

---

## PASO 5: Agrega Variables de Entorno

Baja en la página y busca la sección **"Environment"**

Click en **"Add Environment Variable"** y agrega:

### Variable 1:
```
Key:    MONGODB_URI
Value:  mongodb+srv://neptor89:Arminmeiwes24@cluster0.yfjodag.mongodb.net/catering?retryWrites=true&w=majority
```

### Variable 2:
```
Key:    NODE_ENV
Value:  production
```

### Variable 3:
```
Key:    PORT
Value:  3000
```

### Variable 4:
```
Key:    EMPRESA_NOMBRE
Value:  Catering Profesional
```

### Variable 5:
```
Key:    EMPRESA_TELEFONO
Value:  +54 9 388 123-4567
```

### Variable 6:
```
Key:    EMPRESA_EMAIL
Value:  contacto@cateringprofesional.com.ar
```

### Variable 7:
```
Key:    EMPRESA_UBICACION
Value:  San Salvador de Jujuy, Jujuy
```

### Variable 8:
```
Key:    EMPRESA_WHATSAPP
Value:  +549388123567
```

---

## PASO 6: Crea el Web Service

1. Baja hasta el final de la página
2. Click en **"Create Web Service"** (botón azul)
3. Render va a:
   - Clonar tu repositorio
   - Instalar dependencias
   - Iniciar el servidor
   - Compilar la aplicación

**Esto puede tardar 5-10 minutos. Espera a que termine.**

---

## PASO 7: Espera el deployment

Verás un log en vivo con el progreso:

```
Building...
⏳ Installing dependencies
⏳ Building application
✓ Server started
✓ Listening on port 3000
```

Cuando termine, verás tu URL pública en la parte superior:

```
https://catering-profesional-xxxx.onrender.com
```

---

## ✅ CUANDO ESTÉ LISTO

1. Copy la URL pública
2. Abre en tu navegador
3. ¡Tu web está online!

---

## 🎯 PRÓXIMO PASO

**Sigue estos pasos 1-7 en Render ahora.**

Cuando el deployment termine, avísame aquí con:

```
"Deployment completado. URL: https://..."
```

**Y verificaremos que todo funciona!** 🚀

---

## ⚠️ NOTAS

- Si hay errores en el build, verás logs rojos
- Pueden ser errores de MongoDB, Node, o dependencias
- Si pasa, avísame con el error exacto

- El primer deployment tarda más (5-10 min)
- Los siguientes son más rápidos (2-3 min)

- Tu web estará en: https://catering-profesional-xxxx.onrender.com

---

**¿Vamos a Render?** 🚀

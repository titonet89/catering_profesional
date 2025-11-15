# 🗄️ CREAR BASE DE DATOS MONGODB - PASO A PASO

**Tiempo total:** 5 minutos

---

## PASO 1: Accede a MongoDB Atlas

1. Ve a: https://www.mongodb.com/cloud/atlas
2. Click en **"Sign In"** (arriba a la derecha)
3. Ingresa con tu email: `neptor089@gmail.com` y tu contraseña
4. ¡Deberías estar adentro!

---

## PASO 2: Busca o crea tu Cluster (Base de Datos)

En MongoDB Atlas, busca en el menú izquierdo:

**Opción A: Si ya tienes un cluster**
1. Click en **"Deployment"** → **"Databases"**
2. Deberías ver un cluster (ej: "Cluster0")
3. Si está en verde = está listo
4. Continúa al PASO 3

**Opción B: Si NO tienes cluster aún**
1. Click en **"Deployment"** → **"Databases"**
2. Click en **"Create"** (botón azul)
3. Selecciona **"M0 Free"** (verde, GRATIS)
4. Selecciona tu región (ej: Virginia para Sudamérica)
5. Click **"Create Deployment"**
6. Espera a que diga "Ready" (2-3 minutos)

---

## PASO 3: Crea un Usuario de Base de Datos

En MongoDB, necesitas un usuario para conectarte:

1. En el cluster, busca **"Security"** en el menú izquierdo
2. Click en **"Database Access"**
3. Click en **"Add New Database User"** (botón verde)

4. Completa:
   ```
   Username:        admin
   Password:        MiPassword123! (o lo que quieras - ANÓTALO)
   Confirm:         Repite la contraseña
   ```

5. En "Built-in Role", selecciona:
   ```
   ☑ readWriteAnyDatabase
   ```

6. Click **"Add User"**

✅ **Usuario creado!**

---

## PASO 4: Configura IP Whitelist

Para que Render pueda conectarse a tu MongoDB:

1. En el menú izquierdo, busca **"Security"**
2. Click en **"Network Access"**
3. Click en **"Add IP Address"** (botón verde)
4. Una ventana emergente aparece
5. Click en **"Allow Access from Anywhere"**
6. Click **"Confirm"**

✅ **Render podrá conectarse!**

---

## PASO 5: Obtén la URL de Conexión

1. En el menú izquierdo, click en **"Deployment"** → **"Databases"**
2. Busca tu cluster (ej: "Cluster0")
3. Click en el botón **"Connect"** (gris)
4. Se abre un modal
5. Click en **"Drivers"**
6. En "Select your language", elige **"Node.js"**
7. Verás algo como:

```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```

---

## PASO 6: Personaliza la URL

Necesitas reemplazar en esa URL:

```
ORIGINAL:
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

PERSONALIZADA:
mongodb+srv://admin:MiPassword123!@cluster0.xxxxx.mongodb.net/catering?retryWrites=true&w=majority
```

**Cambios:**
- `<username>` → `admin` (el usuario que creaste)
- `<password>` → `MiPassword123!` (la contraseña que pusiste)
- `myFirstDatabase` → `catering` (nombre de tu BD)

**RESULTADO FINAL:**
```
mongodb+srv://admin:MiPassword123!@cluster0.abc123xyz.mongodb.net/catering?retryWrites=true&w=majority
```

---

## PASO 7: Copia la URL final

Una vez personalizada, **copia la URL completa**.

Debe verse así:
```
mongodb+srv://admin:TUCONTRASEÑA@cluster0.xxxxx.mongodb.net/catering?retryWrites=true&w=majority
```

✅ **¡LISTO! Ahora tienes tu URL de MongoDB.**

---

## 🎯 PRÓXIMO PASO

Una vez tengas la URL, pégala aquí así:

```
MongoDB URL: mongodb+srv://admin:TUCONTRASEÑA@cluster0.xxxxx.mongodb.net/catering?retryWrites=true&w=majority
```

Y yo hago el resto del deployment automáticamente en 5 minutos.

---

## 📝 RESUMEN DE DATOS QUE NECESITAMOS

```
✅ GitHub Username:        titonet89
✅ GitHub Email:           neptor089@gmail.com
🟡 MongoDB URL:            [AQUÍ PEGAS LA URL]
✅ Render Email:           neptor089@gmail.com
```

---

## ⚠️ IMPORTANTE

- La URL debe tener tu contraseña adentro
- Reemplaza `<username>` y `<password>` con valores reales
- Cambiar `myFirstDatabase` a `catering`
- No dejes valores entre `< >`

---

**¿Comenzamos?** Sigue los 7 pasos arriba. 🚀

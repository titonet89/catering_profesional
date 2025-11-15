# 🔗 OBTÉN TU URL DE MONGODB - PASO A PASO

**Tiempo:** 2 minutos

---

## PASO 1: Accede a MongoDB Atlas

1. Ve a: https://www.mongodb.com/cloud/atlas
2. Click en **"Sign In"** (arriba a la derecha)
3. Ingresa con tu cuenta (email y contraseña)
4. Deberías estar dentro de MongoDB Atlas

---

## PASO 2: Ve a "Databases"

En la interfaz de MongoDB:
1. Busca en el menú izquierdo: **"Deployment"** o **"Clusters"**
2. Click en **"Database"** o **"Databases"**
3. Deberías ver tus clusters listados

---

## PASO 3: Busca tu cluster

Deberías ver algo como:
```
Cluster0  (o M0, o el nombre que pusiste)
Status: Ready
```

Click en ese cluster.

---

## PASO 4: Obtén la URL de conexión

1. Busca un botón **"Connect"** (gris, en el cluster)
2. Click en **"Connect"**
3. Se abre un modal con opciones
4. Selecciona **"Drivers"** (si no está seleccionado)
5. En "Select your language": Elige **"Node.js"**

---

## PASO 5: Copia la URL

Deberías ver algo como:

```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```

**IMPORTANTE:** Reemplaza:
- `<username>` → con tu usuario MongoDB (ej: `admin`)
- `<password>` → con tu contraseña MongoDB
- `myFirstDatabase` → con `catering`

**RESULTADO FINAL debe ser algo como:**
```
mongodb+srv://admin:MiPassword123@cluster0.abc123.mongodb.net/catering
```

---

## PASO 6: Si no sabes tu usuario/contraseña de MongoDB

Si olvidaste el usuario/contraseña:

1. En MongoDB Atlas, va a **"Security"** → **"Database Access"**
2. Busca tu usuario (probablemente "admin")
3. Si no existe, click **"Add New Database User"**
4. Crea usuario:
   - Username: `admin`
   - Password: `Algo_Seguro_123` (cópialo)
   - Click **"Create User"**

Luego vuelve a PASO 4 y obtén la URL usando ese usuario/password.

---

## ✅ CUANDO TENGAS LA URL

Debe verse así:
```
mongodb+srv://admin:TUCONTRASEÑA@cluster0.xxxxx.mongodb.net/catering
```

Pégala aquí en el siguiente mensaje. 👇

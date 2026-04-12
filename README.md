# JL Diseño & Construcción — Sitio Web

Sitio web profesional de múltiples páginas para **JL Diseño & Construcción**, empresa constructora con sede en Mérida, Yucatán, dirigida por el **Ing. Jorge Lizama Villegas**.

---

## ¿Qué es este proyecto?

Este es un sitio web completo desarrollado en HTML5, CSS3 y JavaScript puro (sin frameworks ni herramientas de compilación). Está diseñado para presentar los servicios, proyectos y datos de contacto de la empresa de manera profesional y moderna.

El sitio consta de 5 páginas:
- **Inicio** (`index.html`) — Página principal con resumen de todos los servicios
- **Nosotros** (`nosotros.html`) — Historia, fundador y valores de la empresa
- **Servicios** (`servicios.html`) — Descripción detallada de los 3 servicios principales
- **Portafolio** (`portafolio.html`) — Galería de proyectos realizados con filtros por categoría
- **Contacto** (`contacto.html`) — Formulario de contacto, información y mapa de Mérida

---

## ¿Cómo ver la página?

**No se necesita ningún servidor, instalación ni programa especial.**

1. Descarga o descomprime la carpeta del proyecto en tu computadora.
2. Abre la carpeta `jl-construccion/`.
3. Haz doble clic en el archivo **`index.html`**.
4. El sitio se abrirá en tu navegador predeterminado (Chrome, Firefox, Edge, Safari).

> **Recomendación:** Usa Google Chrome o Microsoft Edge para la mejor experiencia visual.

---

## Estructura de archivos

```
jl-construccion/
├── index.html          → Página de inicio (landing page)
├── nosotros.html       → Página "Sobre nosotros"
├── servicios.html      → Página de servicios detallados
├── portafolio.html     → Galería de proyectos con filtros
├── contacto.html       → Formulario de contacto y mapa
├── css/
│   └── styles.css      → Todos los estilos visuales del sitio
├── js/
│   └── main.js         → JavaScript: menú, animaciones, formulario, filtros
├── img/
│   └── logo.png        → Aquí colocarás tu logotipo (reemplaza este archivo)
└── README.md           → Este archivo de instrucciones
```

---

## ¿Cómo personalizar el sitio?

### 1. Cambiar el logotipo

Reemplaza el archivo `img/logo.png` con tu logo real. Asegúrate de:
- Que el archivo se llame exactamente `logo.png`
- Que sea de fondo transparente (formato PNG recomendado)
- Que tenga al menos 200px de ancho para buena calidad

### 2. Reemplazar las imágenes del portafolio y servicios

Actualmente el sitio usa imágenes de Unsplash (requiere conexión a internet). Para usar tus propias fotos:

1. Copia tus imágenes a la carpeta `img/`
2. Abre cada archivo `.html` en un editor de texto (Bloc de notas, Visual Studio Code, etc.)
3. Busca las líneas que contienen `src="https://images.unsplash.com/..."`
4. Reemplaza esa URL por la ruta a tu imagen, por ejemplo: `src="img/mi-proyecto.jpg"`

### 3. Cambiar el texto de las páginas

1. Abre cualquier archivo `.html` con un editor de texto
2. Busca el texto que deseas cambiar
3. Edítalo directamente
4. Guarda el archivo y recarga la página en el navegador

Los textos de descripción, nombre de la empresa, eslogan y contenido de cada sección pueden editarse libremente en los archivos HTML.

### 4. Cambiar el número de teléfono

Busca y reemplaza en todos los archivos `.html` las siguientes ocurrencias:
- `+52 999 123 4567` → tu número de teléfono con formato
- `+529991234567` → tu número sin espacios (para los enlaces `tel:` y WhatsApp)

También actualiza en `css/styles.css` si hubiera referencias.

### 5. Cambiar el correo electrónico

Busca en todos los archivos `.html`:
- `contacto@jlconstruccion.com` → reemplaza con tu correo real

### 6. Cambiar la dirección

Busca en los archivos `.html`:
- `Calle 20 #123, Col. García Ginerés, Mérida, Yucatán, México` → reemplaza con tu dirección real

### 7. Cambiar el número de WhatsApp

En todos los archivos `.html`, busca:
```
https://wa.me/529991234567
```
Y reemplaza `529991234567` con tu número en formato internacional (código de país + número, sin espacios ni guiones). Ejemplo para México: `529991234567`.

### 8. Cambiar el mapa de Google Maps

En el archivo `contacto.html`, busca la etiqueta `<iframe src="https://www.google.com/maps/embed?...">` y sigue estos pasos:

1. Ve a [Google Maps](https://maps.google.com) y busca tu dirección exacta
2. Haz clic en el botón **"Compartir"**
3. Selecciona la pestaña **"Insertar un mapa"**
4. Copia el código `<iframe ...>` que te muestra Google
5. Reemplaza el `<iframe>` existente en `contacto.html` con el nuevo código

### 9. Cambiar los colores del sitio

Abre `css/styles.css` y busca la sección `:root` al inicio del archivo. Ahí encontrarás las variables de color:

```css
:root {
  --primary: #1B3A5C;        /* Azul marino principal */
  --accent: #D4841A;         /* Dorado/naranja — botones y destacados */
  /* ... */
}
```

Cambia los valores hexadecimales por los colores de tu marca.

### 10. Agregar o quitar proyectos del portafolio

En `portafolio.html` encontrarás los bloques de proyectos con esta estructura:

```html
<article class="portfolio-card" data-category="construccion">
  <div class="portfolio-card-image">
    <img src="img/mi-proyecto.jpg" alt="Descripción del proyecto" />
  </div>
  <div class="portfolio-card-body">
    <h4>Nombre del Proyecto</h4>
    <span class="category-tag">Construcción</span>
  </div>
</article>
```

El atributo `data-category` debe ser uno de: `construccion`, `remodelacion`, o `diseno`.

---

## ¿Cómo publicar la página en internet?

Tienes varias opciones gratuitas o de bajo costo para publicar este sitio:

### Opción 1 — Netlify Drop (la más fácil, gratuita)
1. Ve a [netlify.com/drop](https://app.netlify.com/drop)
2. Arrastra y suelta la carpeta `jl-construccion/` completa en la pantalla
3. En segundos tendrás una URL pública como `https://nombre-aleatorio.netlify.app`
4. Puedes comprar y conectar tu dominio propio (`www.jlconstruccion.com`) desde el panel de Netlify

### Opción 2 — GitHub Pages (gratuita)
1. Crea una cuenta en [github.com](https://github.com)
2. Crea un repositorio nuevo y sube todos los archivos
3. En la configuración del repositorio, activa "GitHub Pages"
4. Obtendrás una URL pública gratuita

### Opción 3 — Hosting tradicional (recomendado para dominio propio)
Contrata un servicio de hosting web como:
- **Hostinger** — económico y fácil de usar
- **GoDaddy** — con registro de dominio incluido
- **SiteGround** — de alta calidad

Simplemente sube todos los archivos de la carpeta `jl-construccion/` al directorio `public_html` de tu hosting mediante FTP o el administrador de archivos del panel de control.

---

## Soporte técnico

Para modificaciones más avanzadas o si necesitas agregar funcionalidad adicional (como envío real del formulario por correo, galería con lightbox, etc.), se recomienda contratar a un desarrollador web.

---

*Sitio web desarrollado con HTML5, CSS3 y JavaScript puro.*

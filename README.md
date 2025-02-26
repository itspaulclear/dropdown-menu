# Documentación Menú Desplegable

## Índice

1. [Guía de usuario](#1-guía-de-usuario)
2. [Instalación](#2-instalación)
3. [Funcionamiento](#3-funcionamiento)
4. [Métodos](#4-métodos)
5. [Interfaces de navegación](#5-interfaces-de-navegación)

---

## 1. Guía de usuario

Esta biblioteca de JavaScript facilita la creación de un menú desplegable minimalista con múltiples funcionalidades personalizables.

## 2. Instalación

1. **Descarga** el archivo `dropdown.js`.

2. **Colócalo** en la carpeta `/js` dentro del proyecto.

3. **Incorpora** en el HTML un nuevo script para importarlo:

   ```html
   <script src="js/dropdown.js"></script>
   ```

4. **Descarga** el archivo `estilos.css`.

5. **Colócalo** en la carpeta `/css` dentro del proyecto.

6. **Incorpora** en el HTML un nuevo link para importarlo:

   ```html
   <link rel="stylesheet" href="css/estilos.css">
   ```

## 3. Funcionamiento

Para generar una instancia de `DropDownMenu`, se deberá crear un objeto de esta clase en donde se especificarán aquellos parámetros genéricos que se deseen personalizar.

```javascript
const navbar = new NavigationBar({
  containerId: "navBar",
  menuWidth: '300px',
  menuItems: [
    { text: 'Inicio' },
    { text: 'Acerca de' },
    { text: 'Contacto' }
  ]
});
```

En caso de que estos campos no se detallen, se emplearán ciertos valores establecidos por defecto en el archivo CSS.

```javascript
constructor(options = {}) {
  this.containerId = options.containerId;
  this.backgroundColor = options.backgroundColor || 'var(--nav-background-color)';
  this.backdropFilter = options.backdropFilter || 'var(--nav-backdrop-filter)';
  this.fontFamily = options.fontFamily || 'var(--font-family)';
  this.fontSize = options.fontSize || 'var(--font-size)';
  this.menuWidth = options.menuWidth || 'var(--menu-width)';
  this.menuHeight = options.menuHeight || 'var(--menu-height)';
  this.outlineColor = options.outlineColor || 'var(--nav-outline-color)';
  this.tooltipColor = options.tooltipColor || 'var(--nav-tooltip-color)';
  this.menuItems = options.menuItems || [];

  if (this.containerId && document.getElementById(this.containerId)) {
    this.initialize();
  } else {
    console.warn(`Elemento con id '${this.containerId}' no encontrado en el DOM.`);
  }
}
```

Crea un elemento en el DOM con el `containerId` pertinente.

```html
<div id="navBar"></div>
```

## 4. Métodos

### `initialize()`

Se utiliza para arrancar el componente que integra todas las funcionalidades del `navBar`.

### `positionOutlineBox(item)`

Facilita el desplazamiento del rectángulo auxiliar.

### `createTooltip(item)`

Genera el tooltip necesario sobre cada elemento.

### `contractMenu()`

Contrae el menú al pulsar sobre las flechas colocadas en los laterales para mejorar la visibilidad del contenido.

### `toggleColorMode()`

Se cambia el modo de visualización entre día-noche.

### `createMenuIcon()`

Se genera un menú lateral desplegable con transiciones de desplazamiento y de selección.

## 5. Interfaces de navegación

### Barra de navegación

- Se incluye un tooltip para aclarar información complementaria de cada sección.
- Un cuadro de selección auxiliar desplazable entre las diversas secciones.
- Unas flechas laterales para contraer el menú facilitando la lectura del contenido.

### Menú lateral desplegable

- Se muestran las distintas secciones en formato horizontal.
- El apartado queda tachado cuando se selecciona, creando cierta sensación de dinamismo en el usuario.

# Guía de Estilo y Componentes Reutilizables — Los Intrusos

Esta guía te ayudará a mantener una línea gráfica coherente en todas las vistas del proyecto.

---

## 1. Paleta de Colores
- **Fondo principal:** #181818
- **Acentos:** #39FF14 (verde lima), #FF005C (rosa neón)
- **Textos:** #FFFFFF, #CCCCCC
- **Glassmorphism:** rgba(24,24,24,0.7) para fondos de tarjetas y modales

---

## 2. Tipografía
- **Títulos:** `Creepster`, cursiva, tamaño grande, sombra de texto para efecto "glitch".
- **Textos y botones:** `Montserrat`, sans-serif.

---

## 3. Iconografía
- Usa **Font Awesome** para todos los íconos de botones y acciones.
- Ejemplo: `<i class="fas fa-image"></i>`, `<i class="fas fa-calendar-alt"></i>`

---

## 4. Componentes Reutilizables

### Botón principal
```html
<a href="#" class="cta-button"><i class="fas fa-calendar-alt"></i> Acción</a>
```
**CSS:**
```css
.cta-button {
  background: var(--verde-lima);
  color: #181818;
  border-radius: 6px;
  padding: 0.7em 2em;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  box-shadow: 0 2px 16px #39ff1422;
  transition: background 0.2s, color 0.2s;
}
.cta-button:hover, .cta-button:focus {
  background: #fff;
  color: var(--verde-lima);
}
```

### Tarjeta de evento o álbum
```html
<div class="card glass fade-in">
  <img src="https://via.placeholder.com/300x300?text=Album" alt="Portada" />
  <h3 class="card-title">Título</h3>
  <div class="card-meta">2024</div>
  <a href="#" class="cta-button">Escuchar</a>
</div>
```
**CSS:**
```css
.glass {
  background: rgba(24,24,24,0.7);
  border-radius: 16px;
  box-shadow: 0 4px 32px #000a;
  backdrop-filter: blur(10px);
  border: 1.5px solid #39FF14;
}
.card-title {
  font-family: 'Creepster', cursive;
  font-size: 2em;
  color: #fff;
  text-shadow: 2px 2px 8px #39FF14;
}
```

### Modal
```html
<div class="modal glass">
  <div class="modal-content">
    <span class="close-button">&times;</span>
    <h3 id="modal-event-name"></h3>
    <img id="flyer-image" src="" alt="Flyer del Evento">
  </div>
</div>
```

---

## 5. Imágenes
- Usa imágenes cuadradas o proporcionales y con bordes redondeados.
- Si la imagen es de ejemplo: `https://via.placeholder.com/300x300?text=Ejemplo`
- Si es real, aplica filtro CSS:
```css
img.band-image, img.album-cover {
  filter: grayscale(0.07) contrast(1.1);
  border-radius: 12px;
}
```

---

## 6. Efectos Visuales
- Usa `.fade-in`, `.glitch`, `.glass` y `.noise` en todos los bloques principales.
- Los botones `.flyer-btn` y `.cta-button` deben tener animaciones de hover/focus.

---

## 7. Accesibilidad
- Todos los botones e imágenes deben tener `alt` y `aria-label` descriptivos.
- Usa roles y etiquetas semánticas (`<main>`, `<nav>`, `<section>`, `<footer>`).

---

## 8. Ejemplo de Bloque Unificado
```html
<section class="glass fade-in">
  <h2 class="card-title">Próximo Evento</h2>
  <img src="https://via.placeholder.com/400x600?text=Flyer" alt="Flyer del Evento" />
  <p class="card-meta">15/04/2025 - Garage Underground</p>
  <a href="#" class="cta-button"><i class="fas fa-ticket-alt"></i> Entradas</a>
</section>
```

---

## 9. Utilidades CSS
```css
.fade-in { animation: fadeIn 1s ease; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

.noise {
  background: url('intrusos_2/img/noise.png');
  opacity: 0.08;
  pointer-events: none;
}
```

---

**Sigue esta guía para mantener la coherencia visual y de experiencia en todas las vistas del proyecto.**

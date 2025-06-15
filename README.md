# Estuidio de react

Este proyecto es una recopilación de los conceptos aprendidos en clase.

Esta plantilla proporciona una configuración mínima para que React funcione en Vite con HMR y algunas reglas de ESLint.

Actualmente, hay dos complementos oficiales disponibles:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) utiliza [Babel](https://babeljs.io/) para Fast Refresh.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) utiliza [SWC](https://swc.rs/) para Fast Refresh.

## Ampliando la configuración de ESLint

Si estás desarrollando una aplicación de producción, recomendamos usar TypeScript con reglas de lint conscientes de tipos habilitadas. Consulta la [plantilla de TS](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) para obtener información sobre cómo integrar TypeScript y [`typescript-eslint`](https://typescript-eslint.io) en tu proyecto.

## Temas estudió

### Actualización - 10 de mayo

El sábado 10 de mayo se estudió el consumo de API. Se añadió el componente correspondiente para realizar llamadas y manejar datos provenientes de servicios externos.

### Actualización - 11 de mayo

El domingo 11 de mayo, durante de desarrollo de los puntos 1 y 2 (actividad/taller sobre Hooks), se hizo un repaso de los Hooks (useEffet y useState), consulta de a una api (con clave), queda pendiente (useContext), aún no se comprende la forma de implementar.

_nota:_ La consulta (get) se hizo mediante la librería axios.

Se pudo implementar el Hook useContext para cambiar el tema de la web.

---

## Componentes implementados

- **Conversor de Divisas:** Permite convertir entre diferentes monedas usando la API de Frankfurter. Incluye manejo de errores, estados de carga y pruebas automatizadas.
- **Buscador de Usuarios de GitHub:** Permite buscar usuarios de GitHub por nombre, mostrando avatar y enlace al perfil. Incluye debounce, manejo de estados y pruebas automatizadas.
- **Buscador de Películas (TMDB):** Permite buscar películas usando la API de TMDB, mostrando título, póster, fecha de estreno, valoración y descripción. Incluye manejo de errores, estados de carga y pruebas automatizadas.

## Pruebas automatizadas

Se implementaron pruebas unitarias para los componentes principales usando Vitest y Testing Library, cubriendo los flujos de búsqueda, conversión y manejo de errores en cada componente.

## 🙌 Agradecimientos

Quiero expresar un especial agradecimiento al profesor Walner Palacios por su entrega, dedicación y compromiso con la docencia.

Su acompañamiento durante el proceso de aprendizaje fue fundamental, no solo por los conocimientos compartidos, sino por su disposición constante a resolver dudas y motivar a los estudiantes a dar lo mejor de sí mismos.

Gracias profe por su vocación y por guiarnos en este camino del desarrollo web.

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/views/**/*.handlebars',  // Archivos de plantilla Handlebars
    './src/public/**/*.html',       // Archivos HTML
    './src/public/js/**/*.js',      // Archivos JS, si es necesario
    // Puedes agregar más rutas si lo necesitas
    ],
  theme: {
    extend: {},
  },
  plugins: [],
}
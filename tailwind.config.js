const plugin = require('tailwindcss/plugin')

module.exports = {
  mode: 'jit',
  content: ["./resources/**/*.{jsx,edge,js}"],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function({ addVariant }) {
      addVariant('err', '.-is-errored')
    })
  ],
}

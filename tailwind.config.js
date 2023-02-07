module.exports = {
  // tailwind 应用范围
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      fontSize: {
        xs: ['0.25rem', '0,35rem'],
        sm: ['0.25rem', '0,35rem'],
        base: ['0.25rem', '0,35rem'],
        lg: ['0.25rem', '0,35rem'],
        xl: ['0.25rem', '0,35rem']
      },
      boxShadow: {
        'l-white': '-10px 0 10px white'
      }
    }
  },
  plugins: []
}

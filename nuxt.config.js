export default {
  ssr: false,
  target: 'static',
  components: true,
  loadingIndicator: {
    name: 'pulse',
    color: '#D1D5DB',
    background: '#EFE9E1'
  },
  head: {
    title: 'Birds of Amsterdam',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://api.mapbox.com/mapbox-gl-js/v1.10.0/mapbox-gl.css', },
    ]
  },
  env: {
    mapboxToken: process.env.MAPBOX_TOKEN
  },
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],
}

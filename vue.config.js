module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      '/api': {
         target: 'https://radiant-river-90328.herokuapp.com',
      }
    }
  }
}

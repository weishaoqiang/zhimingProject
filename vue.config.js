const glob = require('glob')
const path = require('path')

function getEntry(url) {
  let entrys = {}
  glob.sync(url).forEach(item => {
    // splice(-3)取数组后三项
    let urlArr = item.split('/').splice(-3)
    entrys[urlArr[1]] = {
      entry: 'src/pages/' + urlArr[1] + '/' + 'index.js',
      template: 'src/pages/' + urlArr[1] + '/' + 'index.html',
      filename: urlArr[1] + '.html',
      inject: true
    }
  })
  return entrys
}
let pages = getEntry('./src/pages/**?/*.html')

module.exports = {
  lintOnSave: true,
  chainWebpack: config => {
    config.resolve.alias.set('assets', path.resolve('src/assets'))
  },
  pages
}

const path = require('path')
const fs = require('fs-extra')
const swig = require('swig')

function getPath(p) {
  return path.resolve(__dirname, './templates', p)
}

module.exports = (config) => {
  const paths = [
    'public',
    'src',
    'webpack',
    '.babelrc',
    'dev-server.js'
  ]

  if (config.eslint) {
    paths.push('.eslintrc')
  }

  if (config.taobao) {
    paths.push('.npmrc')
  }

  paths.forEach((p) => {
    fs.copySync(getPath(p), p)
  })

  if (config.rctui) return

  if (config.loaders.indexOf('sass') >= 0) {
    fs.copySync(getPath('tpls/login.scss'), 'src/styles/login.scss')
  } else if (config.loaders.indexOf('less') >= 0) {
    fs.copySync(getPath('tpls/login.less'), 'src/styles/login.less')
  } else {
    fs.copySync(getPath('tpls/login.css'), 'src/styles/login.css')
  }

  const template = swig.compileFile(getPath('tpls/Login.js.tpl'))
  const tpl = template(config)

  fs.outputFileSync('./src/components/Login.js', tpl)
}
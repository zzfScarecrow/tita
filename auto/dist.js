const path = require('path')
function resolve(pathname) {
  return path.resolve(__dirname, pathname)
}

const dist = function(conf, target) {
  const { type, tplName } = conf
  const tplPath = `${target}/page/${type}`
  const widgetPath = `${target}/src/widget/${tplName}`
  return {
    output: [
      {
        tpl: resolve(`./template/${type}/tita.tpl`),
        realPath: `${tplPath}/${tplName}.tpl`
      },
      {
        tpl: resolve(`./template/${type}/${type}.jsx`),
        realPath: `${widgetPath}/${type}.jsx`
      },
      {
        tpl: resolve(`./template/common/App.js`),
        realPath: `${widgetPath}/App.js`
      },
      {
        tpl: resolve(`./template/common/index.js`),
        realPath: `${widgetPath}/Pages/index.js`
      },
      {
        tpl: resolve(`./template/common/index.less`),
        realPath: `${widgetPath}/Pages/index.less`
      },
      {
        tpl: resolve(`./template/common/HomePage.jsx`),
        realPath: `${widgetPath}/Pages/HomePage.jsx`
      },
      {
        tpl: resolve(`./template/common/AnotherPage.jsx`),
        realPath: `${widgetPath}/Pages/AnotherPage.jsx`
      }
    ]
  }
}
module.exports = { dist }

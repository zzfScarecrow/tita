const resolve = require('../myUtils').resolve
const insertObject = require('../myUtils').insertObject
const insertArray = require('../myUtils').insertArray
const util = require('util')
const fs = require('fs')

const dist = function({ target, tplName }) {
  const templatePath = `template/auditRedux`
  const tplPath = `${target}/page/audit`
  const apiModulesPath = `${target}/src/api/modules`
  const widgetPath = `${target}/src/widget/${tplName}`
  return {
    output: [
      {
        tpl: resolve(`${templatePath}/audit.tpl`),
        realPath: `${tplPath}/${tplName}.tpl`
      },
      {
        tpl: resolve(`${templatePath}/audit.jsx`),
        realPath: `${widgetPath}/audit.jsx`
      },
      {
        tpl: resolve(`${templatePath}/App.js`),
        realPath: `${widgetPath}/App.js`
      },
      {
        tpl: resolve(`${templatePath}/index.js`),
        realPath: `${widgetPath}/Pages/index.js`
      },
      {
        tpl: resolve(`${templatePath}/index.less`),
        realPath: `${widgetPath}/Pages/index.less`
      },
      {
        tpl: resolve(`${templatePath}/HomePage.jsx`),
        realPath: `${widgetPath}/Pages/HomePage.jsx`
      },
      {
        tpl: resolve(`${templatePath}/AnotherPage.jsx`),
        realPath: `${widgetPath}/Pages/AnotherPage.jsx`
      },
      {
        tpl: resolve(`${templatePath}/reducer.js`),
        realPath: `${widgetPath}/reducers/${tplName}.jsx`
      },
      {
        tpl: resolve(`${templatePath}/reducerIndex.js`),
        realPath: `${widgetPath}/reducers/index.js`
      },
      {
        tpl: resolve(`${templatePath}/saga.js`),
        realPath: `${widgetPath}/sagas/${tplName}.js`
      },
      {
        tpl: resolve(`${templatePath}/sagaIndex.js`),
        realPath: `${widgetPath}/sagas/index.js`
      },
      {
        tpl: resolve(`${templatePath}/service.js`),
        realPath: `${widgetPath}/service.js`
      },
      {
        tpl: resolve(`${templatePath}/api.js`),
        realPath: `${apiModulesPath}/${tplName}.js`
      }
    ],
    insertEntry: function() {
      const entryConfPath = `${target}/build/webpack.entry.js`
      const entryConf = require(entryConfPath)
      let entryStr = ''
      const insertion = [
        {
          key: `widget.${tplName}`,
          value: `./src/widget/${tplName}/audit.jsx`
        }
      ]
      insertObject(entryConf, insertion)
      entryStr = `module.exports = ${util.inspect(entryConf)}`
      fs.writeFileSync(entryConfPath, entryStr, err => {
        err && console.log(chalk.red(err))
      })
    },
    insertPostProcessor: function() {
      const filePath = `${target}/fis-conf/postprocessor.js`
      const fileConf = require(filePath)
      const obj = {
        pagePath: `page/audit/${tplName}.tpl`,
        bundleName: `widget.${tplName}.js`,
        blockName: '',
        valid: true
      }
      insertArray(fileConf, [obj])
      let fileStr = `const postProcessor = ${util.inspect(
        fileConf
      )} \n module.exports = postProcessor`
      fs.writeFileSync(filePath, fileStr, err => {
        err && console.log(chalk.red(err))
      })
    }
  }
}

module.exports = dist

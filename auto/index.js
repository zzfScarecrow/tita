const path = require('path')
const yaml = require('js-yaml')
const fs = require('fs')
const program = require('commander')
const exists = require('fs').existsSync
const chalk = require('chalk')
const inquirer = require('inquirer')
const ejs = require('ejs')
const shelljs = require('shelljs')
const util = require('util')
const dist = require('./dist').dist

function resolve(pathname) {
  return path.resolve(__dirname, pathname)
}

function run(conf, target) {
  // console.log(dist(conf.type))
  const { type, tplName } = conf
  const url = dist(conf, target)
  const widgetPath = `${target}/src/widget`
  const { output } = url

  console.log('------------- Making widget folder start -------------')

  shelljs.mkdir(`${widgetPath}/${conf.tplName}`)

  console.log(`making ${widgetPath}/${conf.tplName}`)

  shelljs.mkdir(`${widgetPath}/${conf.tplName}/Pages`)

  console.log(`making ${widgetPath}/${conf.tplName}/Pages`)
  console.log('------------- Making widget folder end -------------')

  output.forEach(o => {
    // targetPath
    console.log(`Rendering ${o.realPath}`)
    ejs.renderFile(o.tpl, conf, { delimiter: '$' }, function(err, renderStr) {
      // console.log('RenderStr: ', renderStr)
      fs.writeFile(o.realPath, renderStr, err => {
        err && console.log(chalk.red(err))
      })
    })
  })

  console.log('Writing webpack.entry.js...')
  const entryConfPath = `${target}/build/webpack.entry.js`
  const entryConf = require(`${target}/build/webpack.entry.js`)
  !entryConf[`widget.${conf.tplName}`] &&
    (entryConf[`widget.${conf.tplName}`] = `./src/widget/${conf.tplName}/${
      conf.type
    }.jsx`)
  const entryStr = `module.exports = ${util.inspect(entryConf)}`
  fs.writeFileSync(entryConfPath, entryStr, err => {
    err && console.log(chalk.red(err))
  })
  console.log('Write webpack.entry.js done...')

  console.log('Writing postprocessor.js...')
  const ppcsPath = `${target}/fis-conf/postprocessor.js`
  const ppcsConf = require(ppcsPath)
  const obj = {
    pagePath: `page/${type}/${tplName}.tpl`,
    bundleName: `widget.${tplName}.js`,
    blockName: type === 'audit' ? '' : 'requireSrc',
    valid: true
  }
  let isRepeat = false
  ppcsConf.forEach(v => {
    if (util.isDeepStrictEqual(v, obj)) {
      isRepeat = true
    }
  })
  if (!isRepeat) ppcsConf.push(obj)
  // console.log('ppcsConf: ', ppcsConf)
  const ppcsStr = `const postProcessor = ${util.inspect(
    ppcsConf
  )} \n module.exports = postProcessor`
  fs.writeFileSync(ppcsPath, ppcsStr, err => {
    err && console.log(chalk.red(err))
  })
  console.log('Writing postprocessor.js done...')
}

module.exports = {
  start: function(file) {
    if (file) config = resolve(file)
    console.log('config: ', config)
    console.log('crm: ', program.crm)
    console.log('audit: ', program.audit)
    var type = program.crm ? 'crm' : 'audit'
    var conf = {}
    try {
      conf = yaml.safeLoad(fs.readFileSync(config, 'utf8'))
      conf.type = type
    } catch (e) {
      return console.log(chalk.red('       Error: ', e.stack))
    }
    const { target, tplName } = conf
    console.log('Conf: ', conf)
    var tplPath = `${target}/page/${type}/${tplName}.tpl`
    console.log('TPLPath: ', tplPath)
    if (exists(tplPath)) {
      inquirer
        .prompt([
          {
            type: 'confirm',
            message: `${tplPath} exists, are you sure you want to overwrite the file?`,
            name: 'ok'
          }
        ])
        .then(answers => {
          if (answers.ok) {
            run(conf, target)
          }
        })
    } else {
      run(conf, target)
    }
  }
}

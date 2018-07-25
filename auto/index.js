const yaml = require('js-yaml')
const fs = require('fs')
const exists = require('fs').existsSync
const chalk = require('chalk')
const inquirer = require('inquirer')
const ejs = require('ejs')
const resolve = require('./myUtils').resolve
const shelljs = require('shelljs')
const ora = require('ora')

const spinner = ora('Generating project....')
// spinner.start()

function Tita(options) {
  this.options = options
  this.project = options.project || 'audit'
  this.target = options.target
  this.tplName = options.tplName
  this.barrier = options.barrier || ''
}

Tita.prototype.projectExists = function() {
  if (this.barrier) {
    return exists(this.barrier)
  }
  return false
}

Tita.prototype.generateOutputFile = function() {
  spinner.start()
  const distFunc = require(`./dist/${this.project}.js`)
  const { output, ...rest } = distFunc(this.options)
  /* invoke the rest functions, usually set some configuration */
  for (let name in rest) {
    if (rest.hasOwnProperty(name)) {
      if (typeof rest[name] === 'function') {
        const func = rest[name]
        func()
      }
    }
  }

  output.forEach(o => {
    ejs.renderFile(o.tpl, this.options, { delimiter: '$' }, function(
      err,
      renderStr
    ) {
      err && console.log(chalk.red(err))
      let fatherDir = ''
      let pathArr = o.realPath.split('/')
      pathArr.pop()
      fatherDir = pathArr.join('/')

      if (!exists(fatherDir)) {
        shelljs.mkdir('-p', fatherDir)
      }
      if (!exists(o.realPath)) {
        shelljs.touch(o.realPath)
      }

      fs.writeFileSync(o.realPath, renderStr, err => {
        spinner.stop()
        err && console.log(chalk.red(err))
      })
    })
  })
  spinner.stop()
}

Tita.prototype.run = function() {
  const isExists = this.projectExists()
  if (isExists) {
    inquirer
      .prompt([
        {
          type: 'confirm',
          message: `Project exists, are you sure you want to overwrite the file?`,
          name: 'ok'
        }
      ])
      .then(answers => {
        if (answers.ok) {
          this.generateOutputFile()
        }
      })
  } else {
    this.generateOutputFile()
  }
}

module.exports = {
  start: function(file) {
    if (file) config = resolve(file)
    var titaOptions = yaml.safeLoad(fs.readFileSync(config, 'utf8'))
    var tita = new Tita(titaOptions)
    tita.run()
  }
}

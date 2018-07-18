const path = require('path')
const util = require('util')

function resolve(pathname) {
  return path.resolve(__dirname, pathname)
}

/* 
  insertion: [{key, value}]
 */
function insertObject(source, insertion) {
  insertion.forEach(({ key, value }) => {
    source[key] = value
  })
}

function insertArray(source, insertion) {
  insertion.forEach(obj => {
    let isRepeat = false
    source.forEach(sourceObj => {
      if (util.isDeepStrictEqual(sourceObj, obj)) {
        isRepeat = true
      }
    })
    if (!isRepeat) {
      source.push(obj)
    }
  })
}

module.exports = {
  resolve,
  insertObject,
  insertArray
}

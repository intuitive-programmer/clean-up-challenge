const fs = require('fs')

const extractData = path => {
  const data = fs.readFileSync(path)

  return data.toString()
}

const cleanUpData = extractData('./input001.txt')

console.log(cleanUpData)

module.exports = {
  extractData
}
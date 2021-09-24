require('babel-register');
const fs = require('fs');

const readFile = (file) => {
  fs.readFile(file, 'utf-8', (err, data) => {
    if(err){
        //console.error(err)
    }else {
        console.log("dd",data)
    }
  })
}

const writeFile = (file, content) => {
  fs.writeFile(file, content,'utf-8', (err) => err ? console.error(err) : '')
  readFile(file)
}

readFile('infos.txt')
writeFile('infos.txt', "Hello World!")




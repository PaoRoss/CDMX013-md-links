const fs = require('fs')
const process = require('process')
const path = require('path')

const  inputFilePath = process.argv[2];
const  fileExtension = path.extname(inputFilePath);
const fileContent = fs.readFileSync(inputFilePath, 'utf8');
console.log(fileContent)

console.log('La ruta del archivo es: ', inputFilePath)
console.log('El archivo tiene extensión', fileExtension)


const regex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(\w)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?(\w)/g;
let matches;
const arrayLinks = [];

if(fileExtension !== '.md'){
console.log('No es un archivo Markdown')
} else {
    while ((matches = regex.exec(fileContent)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (matches.index === regex.lastIndex) {
            regex.lastIndex++;
        }
    
        arrayLinks.push(matches[0])
        //console.log('----------', arrayLinks)
    }
}

console.log(arrayLinks.sort())
console.log(arrayLinks.length)

/*module.exports = {
    readContent
}*/
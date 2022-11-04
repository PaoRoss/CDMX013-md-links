const fs = require('fs')
const process = require('process')
const path = require('path');

const  inputFilePath = process.argv[2];
const  fileExtension = path.extname(inputFilePath);
const fileContent = fs.readFileSync(inputFilePath, 'utf8');
console.log(fileContent)

console.log('La ruta del archivo es: ', inputFilePath)
console.log('El archivo tiene extensión', fileExtension)

const extractLinks = () => {
    const regex = /(https?):\/\/(\w+:{0,1}\w*)?(\S+)(\w)(:[0-9]+)?([\w#!:.?+=&%@!\-\/])?/g;
    const arrayLinks = [];

        if(fileExtension !== '.md'){
            console.log('No es un archivo Markdown')
            } else {
                const matchLinks = fileContent.match(regex);
                console.log(matchLinks);

                matchLinks.map(link => {
                    let objprueba = {
                        href: link,
                        path: inputFilePath,
                        text: link[0]
                    }
                    arrayLinks.push(objprueba)
            })
            console.log(arrayLinks)
            return arrayLinks;
        }
        
}
extractLinks();

const responsePromise = () => {
        fetch('https://docs.npmjs.com/getting-started/publishing-npm-packages')
        .then(response =>  {
            let objectArr = {
                href: response.url,
                status: response.status,
                message: response.statusText
            }
        console.log('holappp',objectArr);
        }).catch(error =>  console.log('hola',error))
    }
responsePromise();

module.exports = {
    extractLinks,
    responsePromise
}
const fs = require('fs')
const process = require('process')
const path = require('path');

const  inputFilePath = process.argv[2];
const  fileExtension = path.extname(inputFilePath);
const fileContent = fs.readFileSync(inputFilePath, 'utf8');
console.log(fileContent)

console.log('The file path is: ', inputFilePath)
console.log('The file extension is: ', fileExtension)

const extractLinks = () => {
    const regex = /(https?):\/\/(\w+:{0,1}\w*)?(\S+)(\w)(:[0-9]+)?([\w#!:.?+=&%@!\-\/])?/g;
    const arrayLinks = [];

        if(fileExtension !== '.md'){
            console.log('This is not a Markdown file')
            } else {
                const matchLinks = fileContent.match(regex);
                console.log(matchLinks);

                matchLinks.forEach(link => {
                    let objectForLinks = {
                        href: link,
                        path: inputFilePath,
                        text: 'lo que esta dentro de <a>'
                    }
                    arrayLinks.push(objectForLinks)
            })
            console.log(arrayLinks)
            return arrayLinks;
        }
        
}
extractLinks();

const validateLinks = () => {
        fetch('https://nodejs.org/api/path.htmlllllllll')
        .then(response =>  {
            let objectArr = {
                href: response.url,
                status: response.status,
                message: response.statusText
            }
        console.log('holappp',objectArr);
        }).catch(error =>  console.log('hola',error))
    }
    validateLinks();

module.exports = {
    extractLinks,
    validateLinks
}
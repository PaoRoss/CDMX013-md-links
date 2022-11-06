const fs = require('fs')
const process = require('process')
const path = require('path');

const inputFilePath = process.argv[2];
const fileExtension = path.extname(inputFilePath);
console.log('The file path is: ', inputFilePath)
console.log('The file extension is: ', fileExtension)


const extractLinks = () => {
    const fileContent = fs.readFileSync(inputFilePath, 'utf8');
    console.log(fileContent)

    const regex = /\[(.+)\]\(https?:\/\/([a-zA-Z0-9_])?(\S+)(\w)/g;

    const matchLinks = fileContent.match(regex);
    console.log(matchLinks);
    const links = matchLinks.filter(link => link.includes('http'));
    console.log(links);
    const description = [];
    const arrayLinks = [];

    links.forEach(link => {
        arrayLinks.push(link.split(']('));
    });
    arrayLinks.forEach(link => {
        const object = {
            href: link[1],
            text: link[0].replace('[', ''),
            file: inputFilePath
        }
        description.push(object);
        console.log(description)
    })
    return description;
}

const validateLinks = (link) => {
    fetch('https://www.youtube.com/watch?v=Lub5qOmY4JQ')
        .then(response => {
            let objectArr = {
                href: response.url,
                file: inputFilePath,
                status: response.status,
                statusText: response.statusText
            }
            console.log('holappp', objectArr);
        }).catch(error => console.log('hola', error))
}

module.exports = {
    extractLinks,
    validateLinks
}
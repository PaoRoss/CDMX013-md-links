const fs = require('fs');
//const process = require('process')
const path = require('path');



const fileExtension = (filePath) => path.extname(filePath);
//console.log('The file path is: ', inputFilePath)
//console.log('The file extension is: ', fileExtension)

const extractLinks = (path) => {
    const fileContent = fs.readFileSync(path, 'utf8');
    //console.log(fileContent)

    const regex = /\[(.+)\]\(https?:\/\/([a-zA-Z0-9_])?(\S+)(\w)/g;

    const matchLinks = fileContent.match(regex);
    //console.log(matchLinks);
    const links = matchLinks.filter(link => link.includes('http'));
    //console.log(links);
    const description = [];
    const arrayLinks = [];

    links.forEach(link => {
        arrayLinks.push(link.split(']('));
    });
    arrayLinks.forEach(link => {
        const objectforLinks = {
            href: link[1],
            text: link[0].replace('[', ''),
            file: path
        }
        description.push(objectforLinks);
        return objectforLinks
    })
    //console.log(description)
    return description;
}

const validateLinks = (objectforLinks) => {
    
     let request = fetch(objectforLinks.href);
       let validateLinkObject = request.then(response => {
        if(response.status === 200){
            
            let validateLinkObject = {
                ...objectforLinks,
                status: response.status,
                statusText: 'ok'
            }
            return validateLinkObject
        } else {
            let validateLinkObject = {
                ...objectforLinks,
                status: response.status,
                statusText: 'fail'
            }
            return validateLinkObject
        }
        }).catch(error => { 
            let validateLinkObject = {
                ...objectforLinks,
                status: error.cause.errno,
                statusText: 'fail'
            }
            return validateLinkObject
            })
        return validateLinkObject
}

const obtainStats = (links) => {

const totalLinks = links.map((link) => link);
 

const uniqueLinks = [...new Set(links.map((link) => link.href))]

const stats = {
    total: totalLinks.length,
    unique: uniqueLinks.length,
}
    return stats
}

const statsAndValidate = (links) => {
    const statsLinks = obtainStats(links);
    const filterBrokenLink = links.filter(link => link.status !== 200);
    let result = {
        total: links.length,
        unique: statsLinks.unique,
        broken: filterBrokenLink.length
    }
    return result
}

module.exports = {
    fileExtension,
    extractLinks,
    validateLinks,
    obtainStats,
    statsAndValidate
}
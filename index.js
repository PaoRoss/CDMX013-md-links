
const {extractLinks, fileExtension, validateLinks, obtainStats, statsAndValidate} = require('./getValidateLinks.js');
const process = require('process');


const inputFilePath = process.argv[2];
//console.log('The input file is: ', inputFilePath)

const mdLinks = (path, options) => {
    const fileExt = fileExtension(path)

    return new Promise((resolve, reject) => {
        if (fileExt === '.md'){
            if(options.validate === true && options.stats === false){
                let arrayDescriptions = extractLinks(path); // array of objects with links without fetch
                let requestArray = arrayDescriptions.map(element => validateLinks(element));
                let allRequest = Promise.all(requestArray)
                resolve(allRequest)

            }else if(options.stats === true && options.validate === false){
                let arrayDescriptions = extractLinks(path); // array of objects with links without fetch
                let stats = obtainStats(arrayDescriptions);
                resolve(stats)
                
            } else if(options.validate === true && options.stats === true){
                let arrayDescriptions = extractLinks(path); // array of objects with links without fetch
                let requestArray = arrayDescriptions.map(element => validateLinks(element));
                let allRequest = Promise.all(requestArray)
                let getResult = allRequest.then((resolve) => statsAndValidate(resolve))
                resolve(getResult)

            } else {
                let arrayDescriptions = extractLinks(path); // array of objects with links without fetch
                resolve(arrayDescriptions)
            }

        } else {
            reject('Error: this is not a .md file!')
        }

        
    })
    
}
//const result = mdLinks(inputFilePath);

//extractLinks();
//validateLinks();
module.exports = {
    mdLinks
}
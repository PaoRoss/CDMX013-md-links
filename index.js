
const {extractLinks, fileExtension, validateLinks, obtainStats} = require('./getValidateLinks.js');
const process = require('process');


const inputFilePath = process.argv[2];
//console.log('The input file is: ', inputFilePath)

const mdLinks = (path, options) => {
    const fileExt = fileExtension(path)
    //console.log(fileExtension(path))
    if(fileExt !== '.md'){
        console.log('This is not a .md file')
    } 
    if (fileExt === '.md'){
            let allLinks = extractLinks(path);
            let prueba = allLinks.map(link => validateLinks(link));
            //console.log(prueba)
            obtainStats(prueba);


        }

        
}
mdLinks(inputFilePath);
//extractLinks();
//validateLinks();
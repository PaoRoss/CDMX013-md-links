const fs = require('fs');
const path = require('path');
const nameFile = "./README.md"

    


const fileContents = () => {
    let fileExtension = path.extname(nameFile);
    // Returns: '.md'
    fs.readFile(nameFile, 'utf8', (error, datos) => {
        if (error) throw error;
        console.log("The content are: ", datos);
    });

    console.log("The file extension is", fileExtension);
    
}

const directoryContent = () => {
    fs.readdir('C:/Users/Paola Rosano/documents/developer/labo', function (err, archivos) {
    if (err) {
    onError(err);
    return;
    }
    console.log('the contents of the directory are:', archivos);
    });
}

module.exports = {
    fileContents,
    directoryContent
}

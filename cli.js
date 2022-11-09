#!/usr/bin/env node

const process = require('process')

// Grab provided args
const [,, ...args] = process.argv;
const {mdLinks} = require('./index.js')

const inputFilePath = process.argv[2];
const options = {validate:[,, ...args].includes('--validate'), stats:[,, ...args].includes('--stats')}

const result = mdLinks(inputFilePath, options);
//console.log('hola', result)

result.then((response) => {
    console.log(response, 'Correct assessment!!!!')
}).catch((error) => {
    console.log(error, 'Enter only absolute routes')
}).finally(()=> {
    console.log('The program has ended!')
})
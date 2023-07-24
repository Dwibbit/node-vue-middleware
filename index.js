const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5000;

/**
 * Files to read from: 
 * 'Template.vue' is the Vue template file to be converted into HTML (change this string to the filename of other Vue temlpate files to be converted)
 * 'template.html' has the skeleton script for building the html file
 * 'output.html' is the complete file with Vue rendering implemented
 */
const templateFile = 'Template.vue';
const templateHtmlFile = 'template.html';
const outputHtmlFile = 'output.html';
let fileWritten = false;

/**
 * For reading from Vue template file until HTML conversion and file output
 * 'path' library required because files are saved in ./vue-files folder
 * 
 * File manipulation will read both Vue and HTML template files, and write into new HTML file in the fs.writeFile method
 * This function will open the browser and run the new output HTML file for rendering
 */
fs.readFile(path.join(__dirname, 'vue_files', templateFile), 'utf8', (err, vueContent) => {
    if (err) {
        console.error('Unable to load file ' + templateFile + ' from ' + path.join(__dirname, 'vue_files', templateFile) + "\n" + err);
        return;
    }

    // Get html template skeleton
    fs.readFile(path.join(__dirname, 'vue_files', templateHtmlFile), 'utf8', (err, htmlTemplatecontent) => {
        if (err) {
            console.error('Unable to load file ' + templateHtmlFile + ' from ' + path.join(__dirname, 'vue_files', templateHtmlFile) + "\n" + err);
            return;
        }

        // Get new file content from convertFunction with Vue Template & html skeleton as parameters
        const convertedContent = convertFunction(vueContent, htmlTemplatecontent);

        // Write converted file into outputHtmlFile file
        fs.writeFile(path.join(__dirname, 'vue_files', outputHtmlFile), convertedContent, 'utf8', (err) => {
            if (err) {
                console.error('unable to write to file ' + outputHtmlFile);
                return;
            }
            console.log('Wrote to file ' + outputHtmlFile);
            fileWritten = true;  
            // Open browser and load url
            import('open').then((open) => {open.default(`http://localhost:${port}/`)});
        })
    });
});

/**
 * Displays file on localhost http request
 * Will display File Error if file doesn't load
 */
app.get('/', (req, res) => {
    // Get requrest will only run if the file is written
    if(fileWritten)
        res.sendFile(path.join(__dirname, 'vue_files', outputHtmlFile));
    else
        res.sendStatus(404).send("File Error");
});

/**
 * Listening on current port for running server
 */
app.listen(port, () => {
    console.log('server running on port: ' + port);
})

/**
 * Conversion will find specific strings in Vue Template and separate them
 * Vue Template Syntax will be put into the HTML skeleton file by replacing these strings 
 * 
 * @param {string} toConvert - String to convert and separate according to Vue Temlpate syntax
 * @param {string}  toInput - HTML file to input converted Vue Template syntax into
 * @returns {string} - The converted string to create into new HTML file
 */
const convertFunction = (toConvert, toInput) => {

    const startTemplate = "<template>";
    const endTemplate = "</template>";
    const template = findString(toConvert, startTemplate, endTemplate);

    const startScript = "export default";
    const endScript = "</script>";
    const script = findString(toConvert, startScript, endScript);

    const startStyle = "<style>";
    const endStyle = "</style>";
    const style = findString(toConvert, startStyle, endStyle);

    const newInput = toInput.replace("/* style */", style).replace("<!-- template -->", template).replace("// script", script);

    return newInput;
}

/**
 * Function to find strings in the middle of the start and end texts
 * 
 * @param {string} text - Whole text to be extracted from
 * @param {string}  start - Start token of text to find
 * @param {string}  end - End token of text to find
 * @returns {string} - The string in the middle of start and end
 */
const findString = (text, start, end) => {
    let startIndex = text.indexOf(start);
    if (startIndex === -1) return '';
    startIndex = startIndex + start.length;
    let endIndex = text.indexOf(end, startIndex);
    return text.slice(startIndex, endIndex);
}
const express = require('express');
const app = express();
const port = 5000;

const path = require('path');
const fs = require('fs');
const templateFile = 'Template.vue';
const templateHtmlFile = 'template.html';
const outputHtmlFile = 'output.html';
let fileWritten = false;

fs.readFile(path.join(__dirname, 'vue_files', templateFile), 'utf8', (err, vueContent) => {
    if (err) {
        console.error('Unable to load file ' + templateFile + ' from ' + path.join(__dirname, 'vue_files', templateFile) + "\n" + err);
        return;
    }

    fs.readFile(path.join(__dirname, 'vue_files', templateHtmlFile), 'utf8', (err, htmlTemplatecontent) => {
        if (err) {
            console.error('Unable to load file ' + templateHtmlFile + ' from ' + path.join(__dirname, 'vue_files', templateHtmlFile) + "\n" + err);
            return;
        }

        const convertedContent = convertFunction(vueContent, htmlTemplatecontent);

        fs.writeFile(path.join(__dirname, 'vue_files', outputHtmlFile), convertedContent, 'utf8', (err) => {
            if (err) {
                console.error('unable to write to file ' + outputHtmlFile);
                return;
            }
            console.log('Wrote to file ' + outputHtmlFile);
            fileWritten = true;  
            import('open').then((open) => {open.default(`http://localhost:${port}/`)});
        })
    });
});

app.get('/', (req, res) => {
    if(fileWritten)
        res.sendFile(path.join(__dirname, 'vue_files', outputHtmlFile));
    else
        res.sendStatus(404).send("File Error");
});

app.listen(port, () => {
    console.log('server running on port: ' + port);
})

const convertFunction = (toConvert, toInput) => {

    const startTemplate = "<template>";
    const endTemplate = "</template>";
    const template = findRegex(toConvert, startTemplate, endTemplate);

    const startScript = "export default";
    const endScript = "</script>";
    const script = findRegex(toConvert, startScript, endScript);

    const startStyle = "<style>";
    const endStyle = "</style>";
    const style = findRegex(toConvert, startStyle, endStyle);

    const newInput = toInput.replace("/* style */", style).replace("<!-- template -->", template).replace("// script", script);

    return newInput;
}

const findRegex = (text, start, end) => {
    let startIndex = text.indexOf(start);
    if (startIndex === -1) return '';
    startIndex = startIndex + start.length;
    let endIndex = text.indexOf(end, startIndex);
    return text.slice(startIndex, endIndex);
}
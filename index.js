const express = require('express');
const app = express();
const port = 5000;

const path = require('path');
const fs = require('fs');

const templateFile = 'Template.vue';

app.use(express.static(path.join(__dirname, 'vue_files')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'vue_files', 'index.html'));
});

app.listen(port, () => {
    console.log('server running on port: ' + port);
})
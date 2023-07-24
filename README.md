# Node Express Project for Vue Template Rendering

This project was created with with Node & Express.

## To run the project

The project directory has a folder 'vue_files' containing two template files. You may replace the Template.vue file into the local Vue template file to be rendered in the application.
After modifying the Template.vue file, the project can be ran with
### `npm start`
The browser should open on your localhost with the HTML file rendering through Vue as implemented in the template.html file

# Software Documentation

This is a Node project using the Express library, and also implementing libraries for file manipulation like 'path' and 'fs'.
An HTML skeleton template exists into which the Vue Template will be input into during conversion of the middleware.
The skeleton includes a module <script> importing Vue's createApp from its npm library web address. This will then construct the createApp with the script that will be input through the conversion. The app will then mount through the 'app' id which a <div id="app"> exists in the <body>.

In the Vue Template (Template.Vue) file, the syntax for <template> <script> and <style> will be extrated in the middleware through string manipulation. The content of these tags will replace comments in the HTML template file in which each section belongs.
The extracted <style> will be input into the <style> tag in the <head> tag
The extracted <template> will be input into the <div id="app> tag
The extracted <script> will be input into the content of the imported createApp

Currently the scripts can run with form validation from Vue's built in form, and custom validation methods

After the extraction is successful, the new HTML format will be written into the outputHtmlFile 'output.html' which will generate after a successful run of conversion.
If the file writes successfully, the browser should open and display the new 'output.html' file which is properly converted, displayed, and interactable.

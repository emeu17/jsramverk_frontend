[![Build Status](https://app.travis-ci.com/emeu17/jsramverk_frontend.svg?branch=main)](https://app.travis-ci.com/emeu17/jsramverk_frontend)

# Jsramverk

This project was created during the course Jsramverk, autumn 2021

## Kmom01

Created a basic react app containing a Trix editor.

## Kmom02

Now possible to create new documents or update existing documents.

Added router and routes for first page, editor and list of all documents. Connected the frontend react-application to my backend express-API, which in turn is connected to a MongoDB. See my other github repository ***Javascript-backend*** for the API code.

# Kmom03

Adding tests using Jest. Three functional tests of use-cases for my application:

1. First page renderes correctly with Welcome-text. Ie the page contains the text "Welcome". *Home.test.js*

2. User should from home page be able to click on a link to go to an overview of all documents (when the link "List documents" is clicked that page should be rendered - check that the text "List of documents" is shown on the page). *App.test.js*

3. When the user is on the /editor-page the "Save"-link should be rendered in the navbar/toolbar. But the save-link should not appear when the user is on the /list-page. *Toolbar.test.js*

## Kmom04

Added sockets, creating the possibility to edit the same document from multiple clients.

## Kmom05

Added authentication - registering and logging in users. Need to login to see documents.

## Kmom06

GraphQL added backend. When logged in the users documents and the users information is retrieved using GraphQL.

## Project

When editing a document, its possible to save/print a copy of the document. It's also possible
to send an invite to an email to edit a document. The specified email is then added as an allowed user (editor) of
the document in question and an email is sent backend.
Mailgun is used backend in order to send emails. 


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

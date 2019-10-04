# CS 180 Starter Project

This starter project is intended to give you some very basic
familiarity with a web application built on [Firebase](https://firebase.google.com/)
and [React](https://reactjs.org/) (with a bit of [NodeJS](https://nodejs.org/en/)).
We provide most of the code
for a simple movie search web app; you need to get it running and add
a bit of functionality, following the steps below.  The amount of coding
you need to do for this project is quite small, but our real hope is
that going through the steps and *also reading the code* will be a helpful
kickstart for your team projects.

## Installations and data import

First, download the `React-StarterProject.zip` file from iLearn and unzip it.  This zip contains the stub web application code that you will complete.  This document is included in the zip as the README.md file.

#### Node.js

Install NodeJS on your System from https://nodejs.org.  Please install
the LTS version, `10.16.3`.  Then, `cd` into the root directory of the
project (the directory created by unzipping
`React-StarterProject.zip`) and run `npm install`.  This will download
and install the open-source libraries the project depends on (its
"dependencies") into a `node_modules` folder.

#### Create Firebase Project
Login to your Google account (or create one if you don't have one).
Goto : https://console.firebase.google.com and create a Firebase
Project by clicking "Add project" or "Create project" and following the
prompts.  Use of Google Analytics is unnecessary.

Once you have created the project, create the
[Realtime Database](https://firebase.google.com/docs/database/) that
will be used to store and query the IMDB data. First, click the
"Develop" menu on the left and choose "Database."  Scroll down on the
page until you see "Or choose Realtime Database," and click the
"Create database" button.  In the "Security rules for Realtime
Database" prompt, choose "Start in test mode" and click "Enable".

#### Update firebase.js for your Firebase app

Now we will update `src/firebase.js` to contain the appropriate
information and credentials for the database we just created.Go back
to the Project Overview for your project.  You should see a message
"Get started by adding Firebase to your app" near the top.  Click the
web app icon, shown below:

![Web app icon](web-app-icon.png?raw=true)

You'll have to give your app a name and then click "Register app."  (There
is no need to set up Firebase Hosting.)  Once you click "Register app,"
you should see some JavaScript code for adding Firebase to your web
app.  Copy the section of the script inside the second `<script>`
tag.  It should look like the following (with `"XXXXXX"` replaced with real values):

```javascript
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "XXXXXX",
    authDomain: "XXXXXX",
    databaseURL: "XXXXXX",
    projectId: "XXXXXX",
    storageBucket: "",
    messagingSenderId: "XXXXXX",
    appId: "XXXXXX"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
```

Paste this code into the `src/firebase.js` file at the point indicated.

#### Import the provided IMDB data provided as JSON to Firebase.

Download the IMDB data from this link and unzip somewhere *outside your project directory*:

https://www.cs.ucr.edu/~manu/imdb_data.zip

To import the data into Firebase, use the following NPM package:

https://github.com/FirebaseExtended/firebase-import

The above page describes how to install the tool, obtain a private key
for your Firebase account, and then import JSON files using the
`firebase-import` command.  The `--database_url` parameter value to
use appears in the JavaScript code that you copy-pasted in the previous step.

The JSON files to be imported are `ratings.json` and `title_basics_2000_2020.json` from the zip file. **Note: You will need to import the JSON files separately.**  Also note that importing `ratings.json` will take several minutes.

Use following collection names while importing to Firebase (these are
the values to pass as `--path` when running `firebase-import`):

***title_basics_2000_2020.json -> /title_basics***

***ratings.json -> /title_ratings***

The structure of `title_basics_2000_2020.json` looks like
```JS
[
	{
		endYear: "\\N",
		genres: "Action,Adventure,Romance",
		isAdult: 0,
		originalTitle: "Alita: Battle Angel",
		primaryTitle: "Alita: Battle Angel",
		runtimeMinutes:"122",
		startYear: "2019",
		tconst: "tt0437086",
		titleType: "movie"
	}
]

```
And structure of `ratings.json` looks like
```JS
{
  "tt0437086":
	{
		averageRating: "7.9",
		numVotes: "397",
		tconst: "tt0437086"
	},
  ...
}
```
Note that the `ratings.json` data uses IMDB IDs as the keys, to make
lookups easy and fast.

Once you're done running the `firebase-import` commands, you should be
able to see all the data under the Database view on the Firebase web
console for the project.

**Tip**: To speed up movie search, you can tell Firebase to add a
[database index](https://en.wikipedia.org/wiki/Database_index) on the
`originalTitle` field in the `title_basics` data.  Without the index,
search is performed by downloading all movie data to the browser and
filtering it there, which can be slow.  To add the index, you modify
the Rules for the Database you created (go to "Develop -> Database" in
the Firebase console, and then click "Rules").  With an index, your
rules will look like the following:
```json
{
  "rules": {
    ".read": true,
    ".write": true,
    "title_basics": {
      ".indexOn": "originalTitle"
    }
  }
}
```

### Get API Key for The Movie DB

Now we'll create an API key for The Movie DB, to query their APIs for
movie art work and cast information.  Create an account on
https://www.themoviedb.org/ and create an API key by going to
https://www.themoviedb.org/settings/api (the address and phone number
information they ask for is not validated).  Once you get the API Key
(you want the value for "API Key (v3 auth)"), Open
`src/themoviedb.js` and replace value of `themoviedbAPIKey` variable
value (`"YOUR_API_KEY"`) with the API key.

#### Debugging

To see error and log messages printed from JavaScript code running in
the browser, you need to open the Developer or JavaScript Console.
E.g., in Chrome, go to "View -> Developer -> JavaScript Console".
Viewing these messages can be helpful for debugging.

**Optional**: Install The ReactJS developer tools
[for Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi/related?hl=en)
or
[for Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/).
These tools can make understanding and debugging the web app UI easier.

## Run Project

If you have completed the previous steps successully, you should be
able to locally run the app and use it from a browser.  Execute `npm
start`.  It will compile the code (from
[React's JSX](https://reactjs.org/docs/introducing-jsx.html) to
regular JavaScript), start a local web server, and open up a browser (this can
take several seconds).  In the Search field Enter "Alita", and press
Submit.  It will fetch the results from your Firebase database and
display them, and a success message will also appear.  Click on any search
result and details page will open up.  All the "Todo" texts on the
details page are your tasks to complete.

Note that the search is case sensitive (usually movie titles are
capitalized) and only searches for a prefix match of the movie title
(so searching for a word in the middle of a movie title won't
succeed).

## Programming Tasks

Complete the following programming tasks.  For these tasks, partial
solutions are commented out in the relevant source files.  You will
need to uncomment these solutions and complete them.

1. Show a failure message when a search fails to find any movies or
   errors out.  This requires modifying `src/App.js` to provide an
   implementation of the `handleFailedClose` callback and manage the
   `failedOpen` state variable.  Search for three appearances
   of `Todo` in the source file, uncomment, and complete the code as
   directed.

2. Show Movie data on Movie Details page.  Once you click on a search
   results it shows **Todo** text placeholders. You need to need
   assign values to variables in Firebase callback, after the details
   are retrieved from the server.  Search for the two instances of
   `Todo2` in `src/MovieDetails.js` and complete the required code.

3. Show Movie cast memebers on Movie Details page.  This requires
   completing the two `Todo3` items, one in `src/themoviedb.js` and
   one in `src/MovieDetails.js`.  You can see the API details here:
   https://developers.themoviedb.org/3/movies/get-movie-credits

## Turn In Your Project

When you are ready to turn in your project, do so with the following steps.

1. In the root directory of the project, either delete the
   `node_modules` directory or move it somewhere else on your file
   system.  If you delete `node_modules` you can restore it after
   turning in your project by running `npm install` again.

2. Create a `.zip` file of your completed project directory.  This
   `.zip` file should be less than 1MB.  Make sure the downloaded IMDB
   data is not included in the zip.

3. Upload the zip file to iLearn, and rename it to `yourStudentId.zip`
   (something like `86xxxxxx.zip`).

## Additional Reading

Below, we have collected some additional readings that could be useful for this project and for the remainder of the quarter for your group projects.

1. JavaScript
   * Good tutorial: https://www.digitalocean.com/community/tutorial_series/how-to-code-in-javascript
   * Tutorial with exercises: https://www.learn-js.org/
   * Complete documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript
2. Firebase
    * NodeJS Getting started: [https://github.com/firebase/quickstart-nodejs](https://github.com/firebase/quickstart-nodejs)
    * JS Getting started: [https://github.com/firebase/quickstart-js](https://github.com/firebase/quickstart-js)
    * JS SDK: [https://firebase.google.com/docs/reference/js/](https://firebase.google.com/docs/reference/js/)
    * NodeJS SDK: [https://firebase.google.com/docs/reference/node/](https://firebase.google.com/docs/reference/node/)
3. React
    * Getting started: [https://reactjs.org/docs/getting-started.html](https://reactjs.org/docs/getting-started.html)
    * Create React App: [https://github.com/facebook/create-react-app](https://github.com/facebook/create-react-app)
4. Firebase+React (Nice getting started) : [https://css-tricks.com/intro-firebase-react/](https://css-tricks.com/intro-firebase-react/)
5. AJAX Requests in React [https://daveceddia.com/ajax-requests-in-react/](https://daveceddia.com/ajax-requests-in-react/)
6. Material UI with React: [https://material-ui.com](https://material-ui.com)
7. Import to Firebase: npm package [https://github.com/FirebaseExtended/firebase-import](https://github.com/FirebaseExtended/firebase-import)
8. IMDB dataset: [https://www.imdb.com/interfaces/](https://www.imdb.com/interfaces/)
9. The Movie DB API: [https://developers.themoviedb.org/3/getting-started/introduction](https://developers.themoviedb.org/3/getting-started/introduction)
    * Search by IMDB id, return Artwork:  [https://developers.themoviedb.org/3/find/find-by-id](https://developers.themoviedb.org/3/find/find-by-id)
    * Cast and Crew: [https://developers.themoviedb.org/3/movies/get-movie-credits](https://developers.themoviedb.org/3/movies/get-movie-credits)

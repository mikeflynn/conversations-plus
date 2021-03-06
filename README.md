Conversations + 
==================

Conversations + takes that boring crap you talk about and displays pictures about the stuff you mention automatically to make you more interesting. It's like how TV news works, only you don't have to wear a tie!

## Getting Started
The quickest and easiest way to get started is to go to: https://mikeflynn.github.io/conversations-plus/ Conversations + is ready to go once you grant the browser access to use your microphone. Say: "Coolio" and he will appear! ...that's actually all that version does, but I can't for the life of me think of anything else you would need. (Actually, there's a few more triggers! Check the addons.js file for the list.)

## Customization
The link above is great if you talk about Coolio a lot (and who doesn't), but if for some reason you don't (maybe a Tone Loc fan?) you can clone this repo and run your own version locally.

Steps to get it running:

1. Clone this repo to your computer.
2. Install Node.js: https://github.com/joyent/node/wiki/installing-node.js-via-package-manager
3. `cd` to the project directory and run `npm start`
4. Open Chrome and go to: https://localhost:8000
5. Say stuff.

To customize the voice actions:

1. Create a new javscript file, say addons.js and modify htdocs/index.html to include that script right after build/app.js (bottom of the page).
2. In that script you'll call `ConversationsPlus.addMatcher(regex, function)` as many times as you need with the regex to match the incoming text and the function to run when a match happens.

  ```javascript
  ConversationsPlus.addMatcher("2pac|tupac", function() { console.log("California Love!"); }); 
  ```

3. There is a single helper function you have access to that takes an image url and loads it on as the background of the page: `this.setBg('https://i.imgur.com/N1mYFE6.gif');`

  ```javascript
  ConversationsPlus.addMatcher("full\\s*house", function() {
    this.setBg('https://i.imgur.com/N1mYFE6.gif');
  }); 
  ```

4. You can do pretty much anything you want in your callback function, but note that because SSL is a requirement you Chrome won't like it if you try to load any non-secure elements.

## Technical Details
There are two parts to this: A Node.js web server with included self-signed keys to get SSL up and running, and a ReactJS web application that handles the speech recoginition and displaying the results.

Aside from a few tricks to keep the Speech API to keep listening to you, the main requirement is the SSL (which is why I went to the trouble of adding the web server and hosting the example on GitHub Pages). SSL allows you to only have to authorize the use of the microphone once rather than having to reauthorize every time I restart the speech API (which is a lot).

* http://updates.html5rocks.com/2013/01/Voice-Driven-Web-Apps-Introduction-to-the-Web-Speech-API
* http://facebook.github.io/react/
* http://nodejs.org/api/
* http://en.wikipedia.org/wiki/Coolio

## Questions, Comments, etc...
You can leave a GitHub issue or pull request of course, but for direct questions I'm [@thatmikeflynn](https://twitter.com/thatmikeflynn) on Twitter.

## Security Issues

Q: If I turn this on will the NSA be recording everything I say?

A: Yes. Especially if you mention any known terrorist keywords like "Coolio".

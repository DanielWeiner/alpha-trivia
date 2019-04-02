# Alpha Trivia Take-Home

A simple single-page application that pulls trivia questions from [Open 
Trivia DB](https://opentdb.com/) and presents them to the user. The
application state is stored in `localStorage`, including the high score.

Written in [TypeScript](https://www.typescriptlang.org/), using 
[React](https://reactjs.org/) as the front-end framework, and
[Material UI](https://material-ui.com/) as the UI framework. Uses
[Webpack](https://webpack.js.org/) for compilation. 

## Installing
In order for this app to be built, Node.js is required.

1. Install [Node.js](https://nodejs.org).
2. Run `npm install` in the project directory.

## Building
This app is written in TypeScript, and must be compiled to JavaScript.

* Run `npm run build` to build the app.

OR

* Run `npm run watch` to run webpack in watch mode, compiling on any
change to the source code.


## Post-Mortem
Given more time, I'd have written some tests to verify that every part
of the application works. I also would have made it look a bit nicer -- 
I don't think it looks terrible, but it's pretty bare-bones.

In terms of features, I could see a version of this where the user could
choose the topic, difficulty, and number of questions, since that's 
supported by the trivia API. It could be useful to persist the results 
of previous rounds and view them. Adding a timer to each question might 
make it more fun.

If this were to have a back-end, I could see this as a great way to do 
bar trivia. Players get some sort of access code for a trivia game, and 
the host would manage when rounds starts. Players would answer the
the questions using this front-end, and their answers and scores would 
be sent to a back-end, and that information is available to the trivia
host. I'd actually prefer this over the common pen-and-paper method at
most trivia bars.
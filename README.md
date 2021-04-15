# Side-scrolling game

## Getting Started

### Quick Start
```
// on the root of this project
//install webpack locally, and install the webpack-cli (the tool used to run webpack on the command line
$ npm install webpack webpack-cli --save-dev

// To bundle the lodash dependency with index.js, we'll need to install the library locally:
$ npm install --save lodash
 
// Then start webpack through cli
$ npx webpack
```

## Note: 
With that said, let's run npx webpack, which will take our script at src/index.js as the entry point, and will generate dist/main.js as the output. The npx command, which ships with Node 8.2/npm 5.2.0 or higher, runs the webpack binary (./node_modules/.bin/webpack) of the webpack package we installed in the beginning:

## Last steps:
  1. Run apache server to avoid browser's cors policies
  2. Start index.html

## Used technologies
* PixiJS Framework
* HTML5 
* CSS3
* JavaScript Ecmascript 6
* Webpack

Number Formatter
=========

Utility to connect and query on distributed mysql grid.

## Installation

  `npm install @tchvan/node-mysql`

## Usage

    var numFormatter = require('@tchvan/node-mysql');

    var formattedNum = numFormatter(35666);
  
  
  Output should be `35,666`


## Tests

  `npm test`

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.

[![Build Status](https://travis-ci.org/tchvan/node-mysql.svg?branch=master)](https://travis-ci.org/tchvan/node-mysql)
[![Coverage Status](https://coveralls.io/repos/github/tchvan/node-mysql/badge.svg?branch=master)](https://coveralls.io/github/tchvan/node-mysql?branch=master)
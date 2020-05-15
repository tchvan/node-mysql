'use strict';

const Util = require('../components/Utilities')

for (let i = 0; i < 20; i++)console.log()
console.warn("========= " + Util.DateTime.getCurrentDateTime() + " =========")

require('./UnitTest/string')()
require('./UnitTest/uuid')()

require('./test_DB_Creator')()
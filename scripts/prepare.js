const generateFrameworkIndices = require('./generateFrameworkIndices'),
      compileFramework = require('./compileFramework')
      // fs = require('fs')

function prepare () {
  /* Index all */
  generateFrameworkIndices('vue')

  /* Compile */
  compileFramework('vue')
}

prepare()

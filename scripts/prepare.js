const generateFrameworkIndices = require('./generateFrameworkIndices'),
      generatePropsInterfaces = require('./generatePropsInterfaces')
      compileFramework = require('./compileFramework')
      // fs = require('fs')

function prepare () {
  /* Index all */
  generateFrameworkIndices('vue')

  /* Props Interfaces */
  generatePropsInterfaces('vue')

  /* Compile */
  compileFramework('vue')
}

prepare()

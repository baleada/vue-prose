const generateIndex = require('./generateIndex'),
      generateFrameworkIndices = require('./generateFrameworkIndices'),
      generatePropsInterfaces = require('./generatePropsInterfaces')
      compileFramework = require('./compileFramework')
      // fs = require('fs')

function prepare () {
  /* Index all */
  generateIndex('./src/vue/util')
  generateIndex('./src/vue/stubs')
  generateFrameworkIndices('vue')

  /* Props Interfaces */
  generatePropsInterfaces('vue')

  /* Compile */
  compileFramework('vue')
}

prepare()

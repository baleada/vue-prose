const presets = [
        [
          '@babel/preset-env',
          {
            targets: '> 0.5%, not dead',
            modules: false, // Modules should not be transformed so that compilers can treeshake
            exclude: [
              '@babel/plugin-transform-regenerator',
            ],
          },
        ],
      ],
      plugins = [
        'module:fast-async',
      ]

module.exports = { presets, plugins }

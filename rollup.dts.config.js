const dts = require('rollup-plugin-dts').default;

// only pack dts files
module.exports = [
  {
    input: './src/main.ts',
    output: [{ file: './dist/main.d.ts', format: 'es' }],
    plugins: [
      dts({
        respectExternal: true,
      }),
    ],
    external: [],
  },
];

import path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import globals from 'rollup-plugin-node-globals';
import polyfill from 'rollup-plugin-polyfill-node';
import pkg from './package.json';

const input = './src/index.ts';
const external = [...Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies })];

export default [
  // browser-friendly UMD build
  {
    input,
    external: ['axios'],
    plugins: [
      typescript(),
      json(), // so Rollup can import json files
      resolve({ preferBuiltins: false }), // so Rollup can find dependencies
      commonjs(), // so Rollup can convert dependencies to an ES module
      globals(), // insert node globals including so code that works with browserify
      polyfill(), // node built-in modules pollyfill for browser
    ],
    output: {
      name: 'jsonRpc',
      dir: path.dirname(pkg.browser),
      format: 'umd',
      sourcemap: true,
      globals: { axios: 'axios' },
    },
  },
  // CommonJS (for Node)
  {
    input,
    external,
    plugins: [typescript()],
    output: { dir: path.dirname(pkg.main), format: 'cjs', sourcemap: true },
  },
  // ES module (for bundlers) build.
  {
    input,
    external,
    plugins: [typescript()],
    output: { dir: path.dirname(pkg.module), format: 'es', sourcemap: true },
  },
];

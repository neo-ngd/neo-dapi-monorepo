import path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import pkg from './package.json';

const input = './src/index.ts';
const external = [...Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies })];

export default [
  // browser-friendly UMD build
  {
    input,
    external,
    plugins: [
      typescript(),
      json(), // so Rollup can import json files
      nodePolyfills(), // node built-in modules pollyfill for browser
      resolve({ preferBuiltins: false }), // so Rollup can find dependencies
      commonjs(), // so Rollup can convert dependencies to an ES module
    ],
    output: {
      name: 'neoDapiWallet',
      dir: path.dirname(pkg.browser),
      format: 'umd',
      sourcemap: true,
    },
  },
  // CommonJS (for Node)
  {
    input,
    external,
    plugins: [typescript(), json()],
    output: { dir: path.dirname(pkg.main), format: 'cjs', sourcemap: true },
  },
  // ES module (for bundlers) build.
  {
    input,
    external,
    plugins: [typescript(), json()],
    output: { dir: path.dirname(pkg.module), format: 'es', sourcemap: true },
  },
];

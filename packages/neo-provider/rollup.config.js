import path from 'path';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

const input = './src/index.ts';
const external = [...Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies })];

export default [
  // browser-friendly UMD build
  {
    input,
    external,
    plugins: [typescript()],
    output: { name: 'neoProvider', dir: path.dirname(pkg.browser), format: 'umd', sourcemap: true },
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

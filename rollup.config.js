import cleaner from 'rollup-plugin-cleaner';
import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from "rollup-plugin-terser";
export default {
  input: './index.ts',
  output: {
    // name:pkg.name,
    file: pkg.main,
    format: 'cjs',
    exports: 'named',
    globals: {
      'codemirror': 'CodeMirror',
    },
  },
  external: ['codemirror'],
  plugins: [
    // resolve({
    //   // preferBuiltins: false
    //   // browser: true,
    //   node:true
    // }),
    commonjs(),
    typescript({
      typescript: require('typescript'),
      objectHashIgnoreUnknownHack: true
    }), // so Rollup can convert TypeScript to JavaScript
    cleaner({
      targets: [
        './lib/'
      ]
    }),
    // terser()
  ]
}
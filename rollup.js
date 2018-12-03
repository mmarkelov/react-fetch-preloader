import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';

export default {
  input: './src/index.js',
  output: {
    file: './lib/prod.js',
    format: 'cjs',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    resolve(),
    commonjs(),
    uglify(),
  ],
  external: ['react'],
};

import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';

const extensions = ['.js', '.ts']

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
  },
  plugins: [
    typescript(),
    babel({
      extensions,
      exclude: 'node_modules/**',
    }),
    resolve(),
    commonjs(),
  ]
};

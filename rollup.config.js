import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
  },
  plugins: [resolve(), typescript({lib: ["es5", "es6", "dom"], target: "es5"})]
};

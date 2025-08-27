// rollup.config.js
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.jsx', // Your main JSX file
  output: {
    file: 'dist/bundle.js', // Output bundled file
    format: 'esm', // Or 'cjs', 'umd', etc.
    sourcemap: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**', // Exclude node_modules from Babel transformation
    }),
  ],
};

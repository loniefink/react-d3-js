// rollup.config.js
import replace from '@rollup/plugin-replace';

export default {
  // ...
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'), // or 'development'
      preventAssignment: true // Recommended for newer versions
    }),
    // ... other plugins like commonjs, babel
  ]
};

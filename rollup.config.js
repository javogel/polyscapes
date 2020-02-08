import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';

const config = {
	input: './src/index.js',
	output: [
		{
			file: './public/build/index.js',
            format: 'cjs'
		},
	],
	plugins: [
      resolve({
        browser: true,
        modulesOnly: true
      }),
      babel({
        exclude: 'node_modules/**',
      })],
};

export default config;
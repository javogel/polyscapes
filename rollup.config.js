import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
// import livereload from 'rollup-plugin-livereload'

const config = {
	input: './src/audioscape-1.js',
	output: [
		{
			file: './public/build/audioscape-1.js',
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
import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
// import postcss from 'rollup-plugin-postcss-modules'
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import url from 'rollup-plugin-url';
import svgr from '@svgr/rollup';
import json from '@rollup/plugin-json';

import pkg from './package.json';

export default {
    input: 'src/index.tsx',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            exports: 'named',
            sourcemap: true,
        },
        {
            file: pkg.module,
            format: 'es',
            exports: 'named',
            sourcemap: true,
        },
    ],
    plugins: [
        external([
            'react',
            'react-dom',
            '@material-ui/core',
            '@material-ui/icons',
            '@material-ui/lab',
            '@material-ui/pickers',
            '@material-ui/styles',
            'i18next',
            'material-ui-popup-state',
            'prop-types',
            'react',
            'react-dom',
            'react-i18next',
        ]),
        postcss({
            modules: true,
        }),
        url(),
        svgr(),
        resolve({
            browser: true,
        }),
        typescript({
            rollupCommonJSResolveHack: true,
            clean: true,
        }),
        commonjs({
            include: 'node_modules/**',
            exclude: [ 'node_modules/@material-ui/**'],
            namedExports: {
                'node_modules/react-is/index.js': [
                    'isValidElementType',
                    'isContextConsumer'
                ]
            }
        }),
        json(),
    ],
};

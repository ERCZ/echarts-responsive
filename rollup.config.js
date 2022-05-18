import dts from "rollup-plugin-dts";
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';

/**
 * @type {import('rollup').RollupOptions}
 */
const config = [
    {
        input: 'src/index.ts',
        output: [
            {
                file: 'lib/index.js',
                name: 'ResponsiveECharts',
                format: 'umd',
                sourcemap: true,
                globals: {

                }
            },
            {
                file: 'lib/index.esm.js',
                format: 'es',
                sourcemap: true
            }
        ],
        plugins: [typescript(), resolve()],
    },
    {
        input: 'src/index.ts',
        output: {
            file: 'lib/index.d.ts',
            format: 'es'
        },
        plugins: [dts()]
    }
];

export default config;
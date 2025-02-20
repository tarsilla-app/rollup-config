import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-swc';
import terser from '@rollup/plugin-terser';
import { eslintCheck } from '@tarsilla/rollup-plugin-eslint-check';
import { typeCheck } from '@tarsilla/rollup-plugin-type-check';
import { dts } from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

function build({ folder = '' } = {}) {
  return [
    {
      input: `src/${folder}index.ts`,
      output: [
        {
          file: `lib/${folder}index.cjs`,
          format: 'cjs',
          sourcemap: true,
          exports: 'auto',
        },
        {
          file: `lib/${folder}index.mjs`,
          format: 'esm',
          sourcemap: true,
          exports: 'auto',
        },
      ],
      plugins: [
        peerDepsExternal({ includeDependencies: true }),
        nodeResolve({ extensions: ['.ts'] }),
        commonjs(),
        eslintCheck(),
        typeCheck(),
        typescript({
          jsc: {
            parser: {
              syntax: 'typescript',
              tsx: true,
            },
          },
        }),
        terser(),
      ],
    },
    {
      input: `./src/${folder}index.ts`,
      output: [{ file: `./lib/${folder}index.d.ts`, format: 'esm' }],
      plugins: [dts()],
    },
  ];
}

export default [...build(), ...build({ folder: 'library/' }), ...build({ folder: 'react/' })];

import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-swc';
import terser from '@rollup/plugin-terser';
import { eslintCheck } from '@tarsilla/rollup-plugin-eslint-check';
import { typeCheck } from '@tarsilla/rollup-plugin-type-check';
import { RollupOptions } from 'rollup';
import { dts } from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

type RollupLibraryConfigOptions = {
  folder?: string;
  extensions?: string[];
  external?: string[];
};

function rollupLibraryConfig({
  folder = '',
  extensions = ['.js', '.ts', '.json'],
  external,
}: RollupLibraryConfigOptions = {}): RollupOptions[] {
  const _folder = folder.trim().length > 0 ? `${folder}/` : folder;
  return [
    {
      input: `src/${_folder}index.ts`,
      output: [
        {
          file: `lib/${_folder}index.cjs`,
          format: 'cjs',
          sourcemap: true,
          exports: 'auto',
        },
        {
          file: `lib/${_folder}index.mjs`,
          format: 'esm',
          sourcemap: true,
          exports: 'auto',
        },
      ],
      external,
      plugins: [
        peerDepsExternal({ includeDependencies: true }),
        nodeResolve({ extensions }),
        commonjs(),
        typeCheck(),
        eslintCheck(),
        typescript({
          jsc: {
            parser: {
              syntax: 'typescript',
            },
          },
        }),
        terser(),
      ],
    },
    {
      input: `./src/${_folder}index.ts`,
      output: [{ file: `./lib/${_folder}index.d.ts`, format: 'esm' }],
      external,
      plugins: [dts()],
    },
  ];
}

export { rollupLibraryConfig, type RollupLibraryConfigOptions };

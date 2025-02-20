declare module '@rollup/plugin-swc' {
  import { Options } from '@rollup/plugin-swc';
  import { Plugin } from 'rollup';
  const plugin: (options?: Options) => Plugin;
  export default plugin;
}

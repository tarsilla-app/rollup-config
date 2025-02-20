declare module '@rollup/plugin-commonjs' {
  import { Plugin } from 'rollup';
  const plugin: () => Plugin;
  export default plugin;
}

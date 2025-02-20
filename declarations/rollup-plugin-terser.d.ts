declare module '@rollup/plugin-terser' {
  import { Plugin } from 'rollup';
  const plugin: () => Plugin;
  export default plugin;
}

declare module 'rollup-plugin-postcss' {
  import { Plugin } from 'rollup';
  const plugin: () => Plugin;
  export default plugin;
}

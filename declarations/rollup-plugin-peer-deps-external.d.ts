declare module 'rollup-plugin-peer-deps-external' {
  import { Plugin } from 'rollup';
  const plugin: (options: { includeDependencies: boolean }) => Plugin;
  export default plugin;
}

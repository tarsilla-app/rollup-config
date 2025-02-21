declare module '@rollup/plugin-inject' {
  import { Plugin } from 'rollup';
  const plugin: (options: Record<string, string>) => Plugin;
  export default plugin;
}

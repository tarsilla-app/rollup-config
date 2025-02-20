import { eslintLibraryConfig } from '@tarsilla/eslint-config/library';

const config = eslintLibraryConfig({
  ignores: ['**/.vscode/', '**/node_modules/', '**/lib/'],
});

export default config;

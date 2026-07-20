const ignores = [
  '.next/**',
  'node_modules/**',
  'next-env.d.ts',
  'tsconfig.tsbuildinfo',
]

export default [
  { ignores },
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
]

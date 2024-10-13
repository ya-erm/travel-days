/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: 'node',
  // globalSetup: './jest.globalSetup.ts',
  transform: {
    '^.+.tsx?$': ['ts-jest', { tsconfig: './tsconfig.jest.json' }],
  },
};

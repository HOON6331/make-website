import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // 프로젝트 코딩 규칙: any 타입 사용 금지 (PRD 2.1)
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  // Prettier와 충돌하는 포맷 규칙 비활성화 — 반드시 마지막에 위치
  prettier,
]);

export default eslintConfig;

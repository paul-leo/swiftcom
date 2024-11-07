import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const production = !process.env.ROLLUP_WATCH;

export default [
  // Web 应用配置
  {
    input: 'src/main/index.ts',
    output: {
      file: 'dist/main.js',
      format: 'es',
      sourcemap: !production
    },
    plugins: [
      resolve({
        browser: true,
      }),
      typescript({
        sourceMap: !production,
        inlineSources: !production
      })
    ]
  },
  // Service Worker 配置
  {
    input: 'src/worker/index.ts',
    
    output: {
      name: 'swifcom',
      file: 'dist/worker.js',
      format: 'es',
      sourcemap: !production,
    },
    plugins: [
      typescript({
        sourceMap: !production,
        inlineSources: !production
      })
    ]
  }
];
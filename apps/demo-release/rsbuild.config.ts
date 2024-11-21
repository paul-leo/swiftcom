import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

// export default defineConfig({
//     dev: {
//         writeToDisk: true,
//     },
//     source: {
//         entry({ target }) {
//             if (target === 'service-worker') {
//                 return {
//                     index: './src/sw.ts',
//                 };
//             }
//             if (target === 'web') {
//                 return {
//                     index: './src/index.tsx',
//                 };
//             }
//         },
//     },
//     output: {
//         targets: ['service-worker', 'web'],
//     },
//     plugins: [pluginReact()],
// });

export default defineConfig({
  dev: {
    writeToDisk: true,
  },
  environments: {
    web: {
      plugins: [pluginReact()],
      source: {
        entry: {
          index: './src/index.tsx',
        },
      },
      output: {
        target: 'web',
      }
    },
    webworker: {
      
      source: {
        entry: {
          index: './src/sw.ts',
        },
      },
      output: {
        filename: {
          js: 'sw.js',
        },
        distPath: {
          root: 'dist/',
          'js': '',
        },
        target: 'web-worker',
      }
    },
  }
  // source: {
  //   entry({ target }) {
  //     if (target === 'webworker') {
  //       return {
  //         index: './src/sw.ts',
  //       };
  //     }
  //     if (target === 'web') {
  //       return {
  //         index: './src/index.tsx',
  //       };
  //     }
  //   },
  // },
  // dev: {
  //   writeToDisk: true,
  // },
  // server: {
  //   port: 9004,
  //   publicDir: {
  //     name: 'dist/',
  //   },
  // },
  // plugins: [pluginReact()],
  // output: {
  //   targets: ['webworker', 'web'],
  // },
});

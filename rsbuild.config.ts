import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  server: {
    port: 3002,
  },
  dev: {
    // It is necessary to configure assetPrefix, and in the production environment, you need to configure output.assetPrefix
    assetPrefix: true,
  },
  tools: {
    rspack: {
      experiments: {
        css: true,
      },
      module: {
        rules: [
          {
            test: /\.css$/,
            use: [
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: {
                      tailwindcss: {},
                      autoprefixer: {},
                    },
                  },
                },
              },
            ],
            type: 'javascript/auto',
          },
        ],
      },
      output: {
        // You need to set a unique value that is not equal to other applications
        uniqueName: 'federation_provider',
      },
      plugins: [
        new ModuleFederationPlugin({
          name: 'federation_provider',
          exposes: {
            './DataRangePicker': './src/components/data-range-picker.tsx',
          },
          shared: [
            'react',
            'react-dom',
            'date-fns',
            'react',
            'react-date-range',
            'react-dom',
          ],
        }),
      ],
    },
  },
});

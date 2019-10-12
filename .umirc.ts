import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: false,
        dva: false,
        dynamicImport: false,
        title: 'koh-check',
        dll: false,
        pwa: {},

        routes: {
          exclude: [/components\//],
        },
        hardSource: false,
      },
    ],
  ],
};

export default config;

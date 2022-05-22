import {defineConfig} from '@umijs/max';

export default defineConfig({
    npmClient: 'pnpm',
    model: {},
    antd: {},
    request: {},
    initialState: {},
    mock: {
        include: ['src/pages/**/_mock.ts'],
    },
    layout: {
        // https://umijs.org/zh-CN/plugins/plugin-layout
        locale: false,
        siderWidth: 208,
    },
    proxy: {
        '/api': {
            'target': 'http://localhost:8080',
            'changeOrigin': true,
        },
    },
})


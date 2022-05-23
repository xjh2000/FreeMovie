import {DotChartOutlined, HomeOutlined} from '@ant-design/icons';
import React from 'react';

export default {
    route: {
        path: '/',
        routes: [
            {
                path: '/',
                name: '主页',
                icon: <HomeOutlined/>,
            },
            {
                path: '/docs',
                name: '文档',
                icon: <DotChartOutlined/>,
            }

        ],
    },
};
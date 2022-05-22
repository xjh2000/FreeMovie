import mockjs from 'mockjs';

export default {
    '/api/users': [
        { id: 1, name: 'foo' },
        { id: 2, name: 'bar' }
    ],
    '/api/users/1': { id: 1, name: 'foo' },

    'GET /api/users': mockjs.mock({
        'list|100': [{ name: '@city', 'value|1-100': 50, 'type|0-2': 1 }],
    }),
}
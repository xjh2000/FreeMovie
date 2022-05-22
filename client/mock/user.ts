import mockjs from 'mockjs';

export default {

    '/api/user': [
        {id: 1, name: 'foo'},
        {id: 2, name: 'bar'}
    ],
    '/api/user/1': {id: 1, name: 'foo'},

    'GET /api/user': mockjs.mock({
        'list|100': [{name: '@city', 'value|1-100': 50, 'type|0-2': 1}],
    }),
}
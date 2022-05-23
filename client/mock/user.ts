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

    'POST /api/user/register': async (req: any, res: any) => {
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve({success: true});
            }, 1000);
        });
        return res.json({success: true, message: '注册成功'});
        // return res.json({success: false, message: '注册人满了'});
    },

    'POST /api/user/login': async (req: any, res: any) => {
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve({success: true});
            }, 1000);
        });
        return res.json({
            success: true,
            message: '登录成功',
            currentAuthority: 'admin',
        });
        // return res.json({success: false, message: '注册人满了'});
    }
}
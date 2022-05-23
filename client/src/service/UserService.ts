export async function digestPasswd(passwd: string): Promise<string> {
    return await window.crypto.subtle.digest({name: "SHA-256"}, new TextEncoder().encode(passwd)).then(function (buffer) {
        return new TextDecoder().decode(buffer);
    });
}

/**
 * 对原始密码进行sha-256摘要处理，向服务器发送请求
 * @param body 注册的用户信息
 * @param options 请求配置 - 暂时不用
 */
export async function register(body: API.RegisterParams, options?: { [key: string]: any }) {

    let {username, password} = body;
    // 密码的摘要
    password = await digestPasswd(password);

    const response = await fetch('/api/user/register', {
        method: 'POST',
        body: JSON.stringify({username, password}),
    });

    return new Promise<API.RegisterResult>((resolve, reject) => {
        response.json().then(
            (res) => {
                if (res.success) {
                    resolve(res);
                } else {
                    reject(new Error(res.message));
                }
            }
        ).catch(() => {
            reject(new Error('连接不上服务器'));
        });
    });
}


/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
    let {username, password} = body;
    // 密码的摘要
    password = await window.crypto.subtle.digest({name: "SHA-256"}, new TextEncoder().encode(body.password)).then(function (buffer) {
        return new TextDecoder().decode(buffer);
    });

    const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({username, password}),
    });

    return new Promise<API.LoginResult>((resolve, reject) => {
        response.json().then(
            (res) => {
                if (res.success) {
                    resolve(res);
                } else {
                    reject(new Error(res.message));
                }
            }
        ).catch(() => {
            reject(new Error('连接不上服务器'));
        });
    });

}
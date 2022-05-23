import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProFormCheckbox, ProFormText,} from '@ant-design/pro-components';
import {Button, message, Space} from 'antd';
import React from 'react';
import styles from './index.less';
import logo from '/src/assets/logo.svg';
import {Link, useDispatch} from "@@/exports";
import {useRequest} from "ahooks";
import {digestPasswd, login} from "@/service/UserService";
import {history} from "umi";

const Login: React.FC = () => {

    const dispatch = useDispatch();

    const {runAsync: loginRun, loading} = useRequest(login, {
        manual: true,
        onSuccess: async (data, [body]) => {

            message.success(data.message);
            const passwd = await digestPasswd(body.password as string);
            let user = {
                ...body,
                currentAuthority: data.currentAuthority,
                password: passwd,
            }

            if (body.autoLogin) {
                localStorage.setItem('user', JSON.stringify({...user}));
            } else {
                localStorage.removeItem('user');
            }

            dispatch({type: 'user/set', payload: {...user}});
            history.back();
            return;
        },
        onError: (error) => {
            message.error(error.message);
        },
    });


    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <LoginForm
                    logo={logo}
                    title="Free Movie"
                    subTitle="开启您的视频之旅"
                    initialValues={{
                        autoLogin: true,
                    }}
                    onFinish={async (values) => {
                        await loginRun(values as API.LoginParams);
                    }}
                    submitter={{
                        // 完全自定义整个区域
                        render: (props, _) => {
                            return [
                                <Button loading={loading} block type="primary" key="submit"
                                        onClick={() => props.form?.submit?.()}>
                                    登录
                                </Button>,
                            ];
                        },
                    }}
                >
                    <ProFormText
                        name="username"
                        fieldProps={{
                            size: 'large',
                            prefix: <UserOutlined className={styles.prefixIcon}/>,
                        }}
                        placeholder={'用户名: admin or user'}
                        rules={[
                            {
                                required: true,
                                message: (
                                    "请输入用户名!"
                                ),
                            },
                        ]}
                    />
                    <ProFormText.Password
                        name="password"
                        fieldProps={{
                            size: 'large',
                            prefix: <LockOutlined className={styles.prefixIcon}/>,
                        }}
                        placeholder={'密码: ant.design'}
                        rules={[
                            {
                                required: true,
                                message: (
                                    "请输入密码！"
                                ),
                            },
                        ]}
                    />


                    <div
                        style={{
                            marginBottom: 24,
                        }}
                    >
                        <ProFormCheckbox noStyle name="autoLogin">
                            自动登录
                        </ProFormCheckbox>
                        <div
                            style={{
                                float: 'right',
                            }}
                        >
                            <Space>
                                {/*<a>*/}
                                {/*    忘记密码*/}
                                {/*</a>*/}
                                <Link to="/user/register">
                                    注册账户
                                </Link>
                            </Space>
                        </div>
                    </div>
                </LoginForm>
            </div>
        </div>
    );
};

export default Login;
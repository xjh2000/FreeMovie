import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProFormText,} from '@ant-design/pro-components';
import {Button, message, Space} from 'antd';
import React, {useEffect} from 'react';
import styles from './index.less';
import logo from '/src/assets/logo.svg';
import {Link, useSelector} from "@@/exports";
import {register} from "@/service/UserService";
import {useRequest} from "ahooks";
import {history} from "umi";


const Register: React.FC = () => {

    // 防止登录页面回退到注册页面
    const user = useSelector((state: any) => state.user);
    useEffect(() => {
        console.log(user);
        if (user?.username !== '') {
            history.push('/');
        }
    }, [user]);

    const {runAsync: registerRun, loading} = useRequest(register, {
        manual: true,
        onSuccess: (data) => {
            message.success(data.message);
            history.push('/user/login');
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
                    initialValues={{}}
                    onFinish={async (values) => {
                        await registerRun(values as API.RegisterParams);
                    }}
                    actions={
                        <Space>
                            <Link to="/user/login">
                                <span>已有账户？</span>
                            </Link>
                        </Space>
                    }
                    submitter={{
                        // 完全自定义整个区域
                        render: (props, _) => {
                            return [
                                <Button loading={loading} block type="primary" key="submit"
                                        onClick={() => props.form?.submit?.()}>
                                    注册
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
                        placeholder={'用户名'}
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
                        placeholder={'密码'}
                        rules={[
                            {
                                required: true,
                                message: (
                                    "请输入密码！"
                                ),
                            },
                        ]}
                    />
                    <ProFormText.Password
                        name="confirm"
                        dependencies={['password']}
                        fieldProps={{
                            size: 'large',
                            prefix: <LockOutlined className={styles.prefixIcon}/>,
                        }}
                        placeholder={'确认密码'}
                        rules={[
                            {
                                required: true,
                                message: '请确认密码！',
                            },
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('密码不一致'));
                                },
                            }),
                        ]}
                    />
                </LoginForm>
            </div>
        </div>
    );
};

export default Register;
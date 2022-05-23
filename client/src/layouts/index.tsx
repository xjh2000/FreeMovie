import React, {useEffect, useState} from 'react';
import {Link, Outlet, useDispatch, useLocation} from "@@/exports";
import {useLocalStorageState, useMount} from "ahooks";
import ProLayout, {MenuDataItem, ProSettings, SettingDrawer} from '@ant-design/pro-layout';
import logo from '../assets/logo.svg';
import userRout from "@/layouts/userRout";
import RightContent from "@/components/Rightcontent";

export default function Layout() {
    // 自动登录
    const dispatch = useDispatch();
    const [user, _] = useLocalStorageState('user');
    useMount(() => {
        if (user) {
            dispatch({type: 'user/set', payload: user});
        }
    });


    // 导航栏的显示配置
    const location = useLocation();
    const [show, setShow] = useState(true);
    useEffect(() => {
        if (location.pathname.startsWith('/user')) {
            setShow(false);
        } else {
            setShow(true);
        }
    }, [location]);


    const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
        fixSiderbar: true,
        navTheme: "realDark",
        layout: "side",
        contentWidth: "Fluid",
        headerHeight: 48,
        primaryColor: "#1890ff",
        splitMenus: false,
        fixedHeader: false

    });

    return (
        <div>
            {show ? (
                <div
                    id="pro-layout"
                    style={{
                        height: '100vh',
                    }}>
                    <ProLayout
                        {...userRout}
                        location={location}
                        title='Free Movie'
                        logo={logo}
                        menuItemRender={(menuItemProps: MenuDataItem) => {
                            return (
                                <div>
                                    {menuItemProps.icon}
                                    <span>
                                        <Link to={menuItemProps.path as string}>
                                             {menuItemProps.name}
                                        </Link>
                                    </span>
                                </div>
                            );

                        }}
                        rightContentRender={() => {
                            return <RightContent/>
                        }}
                        {...settings}
                    >
                        <Outlet/>
                    </ProLayout>
                    <SettingDrawer
                        pathname={location.pathname}
                        enableDarkTheme
                        getContainer={() => document.getElementById('pro-layout')}
                        settings={settings}
                        onSettingChange={(changeSetting) => {
                            setSetting(changeSetting);
                        }}
                        disableUrlParams={false}
                    />
                </div>
            ) : (<Outlet/>)}
        </div>
    );
}

import React, { useState } from 'react';
import {HomeOutlined, ToolOutlined } from '@ant-design/icons';
import type { MenuProps, ThemeConfig } from 'antd';
import { ConfigProvider, Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: (<a href='/'>Home</a>),
    key: 'home',
    icon: <HomeOutlined/>,
  },
  {
    label: 'Tools',
    key: 'tools',
    icon: <ToolOutlined />,
    children: [
      {
        type: 'group',
        label: 'tool list',
        children: [
          { label: (<a href='/reface'>face swap</a>), key: 'reface' },
        ],
      },
    ],
  },
];
interface navProps {
  page: string
}
const Navigation = (props: navProps) => {
  const [current, setCurrent] = useState(props.page);

  const onClick: MenuProps['onClick'] = (e) => {
    //console.log('click ', e);
    setCurrent(e.key);
  };

  return<Menu
    className='bg-transparent'
    onClick={onClick}
    selectedKeys={[current]}
    mode="horizontal"
    items={items}
    theme='dark'
  />
};

export default Navigation;
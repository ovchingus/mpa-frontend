import * as React from 'react';
import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { sidebarRoutes } from '../../constants';
import './Sidebar.css';

export const SideBar = () => {
    return (
        <aside className={'Sidebar'}>
            <Menu pointing vertical>
                {sidebarRoutes.map(route => (
                    <NavLink to={route.path} key={route.name} activeClassName={'Sidebar-Link_active'}>
                        <Menu.Item as={'li'}
                            name={route.name}
                        />
                    </NavLink>
                ))}
            </Menu>
        </aside>
    );
};

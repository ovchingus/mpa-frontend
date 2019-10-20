import React from 'react';
import { Menu } from 'semantic-ui-react';
import { headerRoutes } from '../../constants';
import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <Menu attached="top">
            {headerRoutes.filter(route => route.name).map(route => (
                <Link to={route.path} key={route.name}>
                    <Menu.Item as={'li'}
                        name={route.name}
                    />
                </Link>
            ))}
        </Menu>
    );
};

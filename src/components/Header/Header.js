import React from 'react';
import { Menu } from 'semantic-ui-react';
import { headerRoutes } from '../../constants';
import { Link } from 'react-router-dom';

export class Header extends React.PureComponent {
    state = { activeItem: '' };

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render () {
        const { activeItem } = this.state;

        return (
            <Menu attached="top">
                {headerRoutes.filter(route => route.name).map(route => (
                    <Link to={route.path} key={route.name}>
                        <Menu.Item as={'li'}
                            name={route.name}
                            active={activeItem === route.name}
                            onClick={this.handleItemClick}
                        />
                    </Link>
                ))}
            </Menu>
        );
    }
}

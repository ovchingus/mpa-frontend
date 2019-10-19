import * as React from 'react';
import { Menu } from 'semantic-ui-react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import { sidebarRoutes } from '../../constants';

export default class SideBar extends React.PureComponent {
    state = { activeItem: 'states' };

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render () {
        const { activeItem } = this.state;

        return (
            <aside className={'Sidebar'}>
                <Menu pointing vertical>
                    {sidebarRoutes.map(route => (
                        <Link to={route.path} key={route.name}>
                            <Menu.Item  as={'li'}
                                name={route.name}
                                active={activeItem === route.name}
                                onClick={this.handleItemClick}
                            />
                        </Link>
                    ))}
                </Menu>
            </aside>
        );
    }
}

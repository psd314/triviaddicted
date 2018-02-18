import React, {Component} from 'react';
import NavItems from '../NavItems/NavItems';
import './NavBar.css';

class NavBar extends Component {
    render() {
        return (
            <nav className="NavBar">
                <i className="fas fa-bars fa-2x MobileNav" onClick={this.props.clicked}></i>
                <NavItems styleClasses="DesktopNav"/>
            </nav>
        );
    }
}

export default NavBar;
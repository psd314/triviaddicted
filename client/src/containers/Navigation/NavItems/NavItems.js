import React from 'react';
import './NavItems.css';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../../store/actions/actionCreators';

const navItems = (props) => {
    
    const handleLogout = () => {
        if (props.drawerStatus) {
            props.closeDrawer();
        }
        props.logout();
    }

    let loginLink = "";
    if (props.isAuthenticated) {
        loginLink = <Link onClick={() => handleLogout()} to="/authentication">Logout</Link>;
    } else {
        loginLink = <Link onClick={props.drawerStatus ? () => props.closeDrawer() : null} to="/authentication">Login/Sign Up</Link>;
    }

    return (
        <ul className={props.styleClasses}>
            <li><Link onClick={props.drawerStatus ? () => props.closeDrawer() : null} to="/">Home</Link></li>
            <li>{loginLink}</li>
            <li><Link onClick={props.drawerStatus ? () => props.closeDrawer() : null} to="/play">Play</Link></li>
            <li><Link onClick={props.drawerStatus ? () => props.closeDrawer() : null} to="/settings">Profile &amp; Settings</Link></li>
        </ul>
    );
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.isAuthenticated
	};
};

export default connect(mapStateToProps, { logout })(navItems);
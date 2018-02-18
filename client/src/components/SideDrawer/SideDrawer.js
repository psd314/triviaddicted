import React from 'react';
import './SideDrawer.css';
import NavItems from '../../containers/Navigation/NavItems/NavItems';

const sideDrawer = (props) => {
    return (props.show
        ? <div className="SideDrawer">
                <NavItems styleClasses="SideDrawerNav"/>
                {/* <i className="far fa-times-circle fa-3x" onClick={props.clicked}></i> */}
            </div>
        : <div className="SideDrawer CloseSideDrawer">
            <NavItems styleClasses="SideDrawerNav"/>
            {/* <i className="far fa-times-circle fa-3x" onClick={props.clicked}></i> */}
        </div>);
}

export default sideDrawer;
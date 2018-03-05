import React from "react";
import "./SideDrawer.css";
import NavItems from "../../containers/Navigation/NavItems/NavItems";

const sideDrawer = props => {
	return (
		<div className={["SideDrawer", props.drawerStatus ? "" : "CloseSideDrawer"].join(' ')}>
			<NavItems
				drawerStatus={props.drawerStatus}
				closeDrawer={props.closeDrawer}
				styleClasses="SideDrawerNav"
			/>
			<i className="far fa-times-circle fa-3x" onClick={props.clicked} />
		</div>
	);
	// return (props.show
	//     ? <div className="SideDrawer">
	//             <NavItems drawerStatus={props.drawerStatus} closeDrawer={props.closeDrawer} styleClasses="SideDrawerNav"/>
	//             <i className="far fa-times-circle fa-3x" onClick={props.clicked}></i>
	//         </div>
	//     : <div className="SideDrawer CloseSideDrawer">
	//         <NavItems drawerStatus={props.drawerStatus} closeDrawer={props.closeDrawer} styleClasses="SideDrawerNav"/>
	//         <i className="far fa-times-circle fa-3x" onClick={props.clicked}></i>
	//     </div>);
};

export default sideDrawer;

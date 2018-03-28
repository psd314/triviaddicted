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
};

export default sideDrawer;

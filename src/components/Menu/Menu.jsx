import React from "react";
import Drawer from "@material-ui/core/Drawer";
import CancelIcon from "@material-ui/icons/Cancel";
import List from "@material-ui/core/List";
import { ListItem, ListItemText } from "@material-ui/core";

const Menu = ({
	peekState: { peekStatus, setPeekStatus },
	menuState: { menuStatus, setMenuStatus },
}) => {
	return (
		<Drawer open={menuStatus}>
			<CancelIcon
				onClick={() => {
					setMenuStatus(!menuStatus);
				}}
			/>
			<List>
				<ListItem
					button
					onClick={() => {
						setPeekStatus(!peekStatus);
						setMenuStatus(!menuStatus);
					}}>
					<ListItemText primary={"Saved Strapped-Bales"} />
				</ListItem>
			</List>
		</Drawer>
	);
};

export default Menu;

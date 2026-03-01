"use client";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import styles from "./Navbar.module.css";
import { useUser } from "@auth0/nextjs-auth0/client";
import { cardColorChoices } from "../../dogGroups";

export default function Navbar(props) {
	const { selectedCardColor, onCardColorChange } = props;
	const user = useUser();

	return (
		<>
			<div className={styles["menu"]}>
				<div className={styles["handle"]}>
					<ExpandLessIcon />
				</div>
				<div className={styles["colorSelectContainer"]}>
					<label htmlFor="card-color-select">Card color</label>
					<select
						id="card-color-select"
						value={selectedCardColor || ""}
						onChange={(event) => onCardColorChange?.(event.target.value)}
					>
						<option value="">By breed group</option>
						{cardColorChoices.map((colorChoice) => (
							<option key={colorChoice.key} value={colorChoice.value}>
								{colorChoice.label}
							</option>
						))}
					</select>
				</div>
				<div className={styles["loginLink"]}>
					Welcome, {user.user?.email}
					<a href="/api/auth/login">Sign in</a>
				</div>
			</div>
		</>
	);
}

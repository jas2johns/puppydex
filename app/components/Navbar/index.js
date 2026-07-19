"use client";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import styles from "./Navbar.module.css";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useState } from "react";

export default function Navbar() {
	const user = useUser();
	const [isExpanded, setIsExpanded] = useState(false);
	const drawerId = "account-drawer-panel";
	const isSignedIn = Boolean(user.user);

	return (
		<footer className={styles.footer}>
			<div
				id={drawerId}
				className={`${styles.panel} ${isExpanded ? styles.expanded : ""}`}
				aria-hidden={!isExpanded}
			>
				<div className={styles.panelContent}>
					<h2>Welcome</h2>
					{isSignedIn ? (
						<p>{user.user.email}</p>
					) : (
						<>
							<p>Sign in to access your PuppyDex account.</p>
							<a
								className={styles.signInLink}
								href="/api/auth/login"
								tabIndex={isExpanded ? 0 : -1}
							>
								Sign in
							</a>
						</>
					)}
				</div>
			</div>
			<button
				type="button"
				className={styles.toggle}
				onClick={() => setIsExpanded((expanded) => !expanded)}
				aria-expanded={isExpanded}
				aria-controls={drawerId}
				aria-label={`${isExpanded ? "Collapse" : "Expand"} ${
					isSignedIn ? "account" : "sign in"
				} drawer`}
			>
				<span>{isSignedIn ? "Account" : "Sign in"}</span>
				<ExpandLessIcon
					className={`${styles.chevron} ${
						isExpanded ? styles.chevronExpanded : ""
					}`}
				/>
			</button>
		</footer>
	);
}

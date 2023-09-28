"use client";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Navbar() {
	const user = useUser();
	return (
		<>
			<div className={styles["menu"]}>
				<div className={styles["handle"]}>
					<ExpandLessIcon
						onClick={() => {
							console.log("alert");
						}}
					/>
				</div>
				<div>
					HI, {user.user?.email}
					<a href="/api/auth/login">Auth0</a>
				</div>
			</div>
		</>
	);
}

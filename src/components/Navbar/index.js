import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
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
					<Link href="#">Auth0</Link>
				</div>
			</div>
		</>
	);
}

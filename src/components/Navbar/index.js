import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
	return (
		<motion.div 
			className={styles["menu"]}		
			animate={{ y: -100 }}
			transition={{ delay: 1 }}
		>
			<div>
				<ExpandLessIcon onClick={() => { console.log('alert') }} />
			</div>
			<Link href="#">
			Auth0
			</Link>
		</motion.div>
	);
}

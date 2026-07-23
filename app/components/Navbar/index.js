"use client";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import styles from "./Navbar.module.css";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
	const user = useUser();
	const [isExpanded, setIsExpanded] = useState(false);
	const footerRef = useRef(null);
	const menuRef = useRef(null);
	const toggleRef = useRef(null);
	const drawerId = "account-drawer-panel";
	const isSignedIn = Boolean(user.user);
	const displayName = user.user?.name || user.user?.email;

	const focusMenuItem = (index) => {
		window.requestAnimationFrame(() => {
			const menuItems = Array.from(
				menuRef.current?.querySelectorAll("a") || []
			);

			menuItems[index]?.focus();
		});
	};

	useEffect(() => {
		if (!isExpanded) {
			return;
		}

		const handlePointerDown = (event) => {
			if (!footerRef.current?.contains(event.target)) {
				setIsExpanded(false);
			}
		};

		const handleKeyDown = (event) => {
			if (event.key === "Escape") {
				setIsExpanded(false);
				toggleRef.current?.focus();
			}
		};

		document.addEventListener("pointerdown", handlePointerDown);
		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("pointerdown", handlePointerDown);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isExpanded]);

	const handleMenuKeyDown = (event) => {
		if (event.key !== "ArrowDown" && event.key !== "ArrowUp") {
			return;
		}

		const menuItems = Array.from(
			menuRef.current?.querySelectorAll("a") || []
		);

		if (menuItems.length === 0) {
			return;
		}

		event.preventDefault();

		const activeIndex = menuItems.indexOf(document.activeElement);
		const nextIndex =
			event.key === "ArrowDown"
				? (activeIndex + 1) % menuItems.length
				: (activeIndex - 1 + menuItems.length) % menuItems.length;

		menuItems[nextIndex].focus();
	};

	const handleToggleKeyDown = (event) => {
		if (
			!isSignedIn ||
			(event.key !== "ArrowDown" && event.key !== "ArrowUp")
		) {
			return;
		}

		event.preventDefault();
		setIsExpanded(true);
		focusMenuItem(event.key === "ArrowDown" ? 0 : 1);
	};

	return (
		<footer className={styles.footer} ref={footerRef}>
			<div
				id={drawerId}
				className={`${styles.panel} ${isExpanded ? styles.expanded : ""}`}
				aria-hidden={!isExpanded}
			>
				<div
					className={styles.panelContent}
					ref={menuRef}
					onKeyDown={handleMenuKeyDown}
				>
					<h2>Welcome</h2>
					{isSignedIn ? (
						<div className={styles.accountMenu}>
							<p className={styles.userIdentity}>{displayName}</p>
							<a
								className={styles.menuItem}
								href="/favorites"
								tabIndex={isExpanded ? 0 : -1}
							>
								Favorites
							</a>
							<a
								className={styles.menuItem}
								href="/api/auth/logout"
								tabIndex={isExpanded ? 0 : -1}
							>
								Sign Out
							</a>
						</div>
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
				ref={toggleRef}
				onClick={() => setIsExpanded((expanded) => !expanded)}
				onKeyDown={handleToggleKeyDown}
				aria-expanded={isExpanded}
				aria-controls={drawerId}
				aria-haspopup={isSignedIn ? "menu" : undefined}
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

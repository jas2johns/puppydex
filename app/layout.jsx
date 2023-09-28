import "./styles/globals.css";
// app/layout.jsx
import { UserProvider } from "@auth0/nextjs-auth0/client";

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<UserProvider>
				<body>{children}</body>
			</UserProvider>
		</html>
	);
}

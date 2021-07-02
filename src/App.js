import { withAuthenticator } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import { useState, useEffect } from "react";
import "./App.css";
import MainApp from "./container/MainApp";

function App() {
	const [username, setUsername] = useState();
	useEffect(() => {
		Auth.currentAuthenticatedUser().then(data => {
			setUsername(data.username);
		});
	}, []);
	return (
		<>
			{!username && <p>Loading.......</p>}
			{username && <MainApp username={username} />}
		</>
	);
}

export default withAuthenticator(App);

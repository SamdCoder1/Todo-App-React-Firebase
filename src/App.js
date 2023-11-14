import { auth } from "./firebase";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [user] = useAuthState(auth); //destructure user using react-firebase-hooks
  return (
    <div>
      {!user ? <LoginPage /> : <HomePage />}  {/*if no user, then login page, otherwise homepage */}
    </div>
  );
}

export default App;

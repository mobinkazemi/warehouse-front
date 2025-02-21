import { TOKEN_KEY_ENUM } from "../../shared/enums/token.enum";
import { LoggedInContent } from "./functions/viewFunctions/logged_in";
import { contentOfNotLoggedIn } from "./functions/viewFunctions/on_not_logged_in";
import "./HomePage.css";

const loggedIn = !!localStorage.getItem(TOKEN_KEY_ENUM.ACCESS);
const HomePage = () => {
  return <>{loggedIn ? LoggedInContent() : contentOfNotLoggedIn()}</>;
};

export default HomePage;

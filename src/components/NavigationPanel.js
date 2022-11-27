import { useNavigate, NavLink } from "react-router-dom";
import { RiLogoutBoxRFill } from "react-icons/ri";
import Logo from "./Logo";
import { navigationOptions } from "../constants/navigationOptions";
import signOutImage from "../assets/signOutImage.png";
import "../styles/navigationPanel.css";

const NavigationPanel = () => {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.clear();
    navigate("/Login");
  };
  return (
    <div className="navigation-panel">
      <Logo />
      <div className="options-container">
        <ul>
          {navigationOptions.map((option,ind) => {
            return (
              <li key={ind} className="">
                <NavLink
                  to={option.path}
                  className={({ isActive }) =>
                    isActive
                      ? "link-active center-container"
                      : "link center-container"
                  }
                  children={({ isActive }) => {
                    if (isActive) {
                      return (
                        <>
                          <div className="active-mark active"></div>
                          <span>{option.name}</span>
                        </>
                      );
                    } else {
                      return (
                        <>
                          <div className="active-mark inactive"></div>
                          <span>{option.name}</span>
                        </>
                      );
                    }
                  }}
                ></NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="sign-out-container">
        {/* <RiLogoutBoxRFill className="icon" /> */}
        <button className="sign-out" onClick={signOut}>
          Sign out
        </button>
      </div>
    </div>
  );
};

export default NavigationPanel;

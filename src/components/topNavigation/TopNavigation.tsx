import React from "react";
import "./topNavigationStyle.css";
import { useNavigate } from "react-router-dom";
import { ROUTES_ENUM } from "../../shared/enums/routes.enum";
import { LogoutOutlined } from "@ant-design/icons";
import { TOKEN_KEY_ENUM } from "../../shared/enums/token.enum";
import { Tooltip } from "antd";
import { ROLE_LOCAL_STORAGE_ENUM } from "../../shared/enums/localStorageRoleKey.enum";

const TopNavigation: React.FC = () => {
  const navigator = useNavigate();
  const logout = () => {
    localStorage.removeItem(TOKEN_KEY_ENUM.ACCESS);
    localStorage.removeItem(ROLE_LOCAL_STORAGE_ENUM.ROLE);

    navigator(ROUTES_ENUM.LOGIN);
  };
  return (
    <div className="top-navigation-root">
      <div className="top-navigation">
        <div className="top-navigation-home-section">
          <img
            className="top-navigation-home-section-icon"
            src="/douranLogo.png"
            onClick={() => navigator(ROUTES_ENUM.HOME)}
          />
        </div>
        <div className="top-navigation-exit-button">
          {localStorage.getItem(TOKEN_KEY_ENUM.ACCESS) ? (
            <Tooltip title="خروج">
              <LogoutOutlined
                className="top-navigation-exit-section-icon"
                onClick={logout}
              />
            </Tooltip>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;

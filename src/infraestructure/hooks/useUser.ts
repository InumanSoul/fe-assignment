import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/constants";

export const useUser = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("client_token");
    localStorage.removeItem("user");
    navigate(ROUTES.LOGIN);
  }

  const userData = JSON.parse(localStorage.getItem("user") || "{}");

  const user = {
    first_name: userData.first_name,
    date_joined: userData.date_joined
  }

  return {
    handleLogout,
    user
  }
}
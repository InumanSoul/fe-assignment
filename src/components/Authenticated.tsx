import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { ROUTES } from "../utils/constants";

const Authenticated = (WrappedComponent: React.FC) => {
  const ComponentAuth = () => {
    const navigate = useNavigate();

    useEffect(() => {
      const accessToken = localStorage.getItem("access_token");
      const clientToken = localStorage.getItem("client_token");

      if (!accessToken || !clientToken) {
        navigate(ROUTES.LOGIN);
      }
    }, [navigate]);

    return <WrappedComponent />;
  }
  
  return ComponentAuth;
}

export default Authenticated;
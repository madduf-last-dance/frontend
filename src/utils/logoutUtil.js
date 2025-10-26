import { useNavigate } from "react-router-dom";
import { message } from "antd";

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('role');
  localStorage.removeItem('token');
};

export const useLogout = () => {
  const navigate = useNavigate();
  return () => {
    logout();
    navigate("/", { replace: true });
    message.success('Successfully logged out!');
    };
};

import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth storage
    localStorage.removeItem("token");
    localStorage.removeItem("referral_code");
    localStorage.removeItem("role");

    // Redirect to login
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="btn btn-outline btn-error flex items-center gap-2"
    >
      <LogOut className="w-5 h-5" />
      Logout
    </button>
  );
}

export default LogoutButton;

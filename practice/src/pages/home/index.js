import { useState } from "react";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import TodoWrapper from "../../components/TodoWrapper";
import { useNavigate } from "react-router-dom";
import AxiosClient from "../../services/AxiosClient";

function Home() {
  const navigate = useNavigate();
  const [showLogoutConfirmationDialog, setShowLogoutConfirmationDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogout = async () => {
    console.log("logout called");
    setLoading(true);
    const token = sessionStorage.getItem("authToken");
    console.log(token);
    if (!token) {
      console.error("No token found, cannot logout.");
      alert("You are not logged out.");
      setLoading(false);
      return;
    }
    try {
      await AxiosClient.patch(
        "/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      sessionStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {showLogoutConfirmationDialog && (
        <ConfirmationDialog
          title="Confirm Logout"
          message="Are you sure you want to logout?"
          primaryBtnTitle="Logout"
          secondaryBtnTitle="Cancel"
          closeModal={() => {
            setShowLogoutConfirmationDialog(false);
          }}
          confirmAction={() => {
            onLogout();
          }}
          disabled={loading}
        />
      )}

      <div style={{ position: "absolute", right: "50px" }}>
        <button
          style={{
            padding: "10px",
            width: "150px",
            cursor: "pointer",
            color: "red",
          }}
          onClick={() => {
            setShowLogoutConfirmationDialog(true);
          }}
        >
          Logout
        </button>
      </div>
      <TodoWrapper />

    </div>
  );
}

export default Home;

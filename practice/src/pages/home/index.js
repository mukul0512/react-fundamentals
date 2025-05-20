import { useState } from "react";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import TodoWrapper from "../../components/TodoWrapper";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const onLogout = () => {
    console.log("logout called");
    sessionStorage.clear();
    navigate("/");
  };
  const [showLogoutConfirmationDialog, setShowLogoutConfirmationDialog] =
    useState(false);
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

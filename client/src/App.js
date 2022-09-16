import "./App.css";
import Auth from "./pages/Authentication/Auth";
import Home from "./pages/home/Home";

import { Navigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Profile from "./compenents/LeftSide/profile/Profile";
import ProfileDetails from "./compenents/Profilepg/ProfileDetails";
import ProfilePg from "./pages/profile/ProfilePg";
import Chat from "./pages/Chat/Chat";
import Conversation from "./compenents/Conversation/Conversation";

function App() {
  const user = useSelector((state) => state.AuthReducer.authData);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="home" /> : <Navigate to="auth" />}
        />
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="../auth" />}
        />
        <Route
          path="/auth"
          element={user ? <Navigate to="../home" /> : <Auth />}
        />

        <Route
          path="/profile/:id"
          element={user ? <ProfilePg /> : <Navigate to="../auth" />}
        />
        <Route
          path="/chat"
          element={user ? <Chat /> : <Navigate to="../auth" />}
        />
      </Routes>
    </div>
  );
}

export default App;

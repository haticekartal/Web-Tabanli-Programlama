import { useState } from "react";
import "./App.css";
import { LoginPage } from "./pages/LoginPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ItemForm } from "./pages/ItemForm";
import { ItemsBox } from "./pages/ItemsBox";

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [userName, setUserName] = useState("");
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <LoginPage setLoggedIn={setLoggedIn} setUserName={setUserName} />
          }
        />
        {loggedIn && (
          <>
            <Route path="/item" element={<ItemForm userName={userName} />} />
            <Route path="/itembox" element={<ItemsBox />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;

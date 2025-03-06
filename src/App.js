import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Search from "./pages/Search";
import AddPostOrAddStory from "./pages/AddPostOrAddStory";
import MyStory from "./pages/MyStory";
import PrivateRoutes from "./utils/PrivateRoutes";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/AddPostOrAddStory"
            element={<AddPostOrAddStory />}
          ></Route>
          <Route
            path="/"
            element={
              <PrivateRoutes>
                <Home />
              </PrivateRoutes>
            }
          ></Route>
          <Route
            path="/MyStory"
            element={
              <PrivateRoutes>
                <MyStory />
              </PrivateRoutes>
            }
          ></Route>
          <Route
            path="/Search"
            element={
              <PrivateRoutes>
                <Search />
              </PrivateRoutes>
            }
          ></Route>
          <Route path="/Login" element={<Login />}></Route>

          <Route path="*" element={<Navigate to="/Login" />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

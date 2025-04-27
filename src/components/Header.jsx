import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentUserLogout } from "../features/currentUser/currentUserSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("Logout");
    dispatch(setCurrentUserLogout());
    navigate("/Login");
  };
  return (
    <>
      <Dropdown as={NavItem}>
        <Dropdown.Toggle as={NavLink}>
          <small className="text-muted">
            <i>SugarGram</i>
          </small>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default Header;

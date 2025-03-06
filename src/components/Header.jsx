import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";

const Header = () => {
  return (
    <>
      <Dropdown as={NavItem}>
        <Dropdown.Toggle as={NavLink}>
          <small className="text-muted">
            <i>SugarGram</i>
          </small>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>Following</Dropdown.Item>
          <Dropdown.Item>Favorite</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default Header;

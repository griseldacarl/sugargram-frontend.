import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { FaHome } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { MdAddAPhoto } from "react-icons/md";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";

const Footer = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };
  const handleSearchClick = () => {
    navigate("/Search");
  };
  const handleAddPostClick = () => {
    navigate("/AddPostOrAddStory");
  };
  const handleMyStoryClick = () => {
    navigate("/MyStory");
  };
  return (
    <>
      <div className="w-100 fixed-bottom bg-dark">
        <Stack gap={0}>
          <ButtonGroup size="lg" aria-label="Basic example">
            <Button variant="dark" onClick={handleHomeClick}>
              <FaHome />
            </Button>
            <Button variant="dark" onClick={handleSearchClick}>
              <IoSearchSharp />
            </Button>
            <Button variant="dark" onClick={handleAddPostClick}>
              <MdAddAPhoto />
            </Button>
            <Button variant="dark" onClick={handleMyStoryClick}>
              <IoPersonCircleOutline />
            </Button>
          </ButtonGroup>
        </Stack>
      </div>
    </>
  );
};

export default Footer;

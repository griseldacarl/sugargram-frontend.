import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";

const Story = ({ storyID, userID, userImage, userDisplayName }) => {
  return (
    <>
      <Card style={{ width: "8rem", borderColor: "white" }}>
        <Card.Body>
          <Card.Title>{userDisplayName}</Card.Title>
          <Card.Img
            className="rounded-circle"
            variant="top"
            src={userImage}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        </Card.Body>
      </Card>
    </>
  );
};

Story.prototype = {
  storyID: PropTypes.string,
  userImage: PropTypes.string,
  userID: PropTypes.string,
  userDisplayName: PropTypes.string,
};
export default Story;

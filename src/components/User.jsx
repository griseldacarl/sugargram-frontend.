import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
const User = ({
  userID,
  userDisplayName,
  userActivity,
  userAge,
  userEmail,
  userFirstName,
  userLastName,
  userHeight,
  userGender,
  userNotes,
  userImage,
}) => {
  return (
    <>
      <Card style={{ width: "15rem" }}>
        <Card.Img variant="top" src={userImage} />
        <Card.Body>
          <Card.Title>{userFirstName}</Card.Title>
          <Card.Text>
            {userDisplayName || "No Display Name Providered"} |{" "}
            {userAge || "No Age Available"} | {userEmail}
          </Card.Text>
          <Button variant="dark">Follow</Button>
        </Card.Body>
      </Card>
    </>
  );
};

User.prototype = {
  userID: PropTypes.string,
  userActivity: PropTypes.string,
  userAge: PropTypes.number,
  userEmail: PropTypes.string,
  userFirstName: PropTypes.string,
  userLastName: PropTypes.string,
  userHeight: PropTypes.string,
  userGender: PropTypes.string,
  userNotes: PropTypes.string,
  userImage: PropTypes.string,
};
export default User;

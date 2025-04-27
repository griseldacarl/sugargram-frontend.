import PropTypes from "prop-types";
import User from "./User";
import ListGroup from "react-bootstrap/ListGroup";

const UserList = ({ users }) => {
  const userToDisplay = users.map((item, i) => (
    <ListGroup.Item key={item.userid} style={{ borderColor: "white" }}>
      <User
        userID={item.userid}
        userActivity={item.activity}
        userAge={item.age}
        userDisplayName={item.displayName}
        userEmail={item.email}
        userFirstName={item.firstname}
        userGender={item.gender}
        userHeight={item.height}
        userLastName={item.lastname}
        userNotes={item.notes}
        userImage={item.imagepath}
      />
    </ListGroup.Item>
  ));
  return (
    <>
      <ListGroup>{userToDisplay}</ListGroup>
    </>
  );
};

UserList.prototype = {
  users: PropTypes.array,
};

export default UserList;

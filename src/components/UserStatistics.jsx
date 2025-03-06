import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";

const UserStatistics = ({ postsCount, followersCount, followingCount }) => {
  return (
    <>
      <ListGroup horizontal>
        <ListGroup.Item style={{ borderColor: "white" }}>
          {" "}
          <Card style={{ width: "100%", borderColor: "white" }}>
            <ListGroup variant="flush">
              <ListGroup.Item>{postsCount}</ListGroup.Item>
              <ListGroup.Item>posts</ListGroup.Item>
            </ListGroup>
          </Card>
        </ListGroup.Item>
        <ListGroup.Item style={{ borderColor: "white" }}>
          {" "}
          <Card style={{ width: "100%", borderColor: "white" }}>
            <ListGroup variant="flush">
              <ListGroup.Item>{followersCount}</ListGroup.Item>
              <ListGroup.Item>followers</ListGroup.Item>
            </ListGroup>
          </Card>
        </ListGroup.Item>
        <ListGroup.Item style={{ borderColor: "white" }}>
          {" "}
          <Card style={{ width: "100%", borderColor: "white" }}>
            <ListGroup variant="flush">
              <ListGroup.Item>{followingCount}</ListGroup.Item>
              <ListGroup.Item>following</ListGroup.Item>
            </ListGroup>
          </Card>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

UserStatistics.prototype = {
  postsCount: PropTypes.number,
  followersCount: PropTypes.number,
  followingCount: PropTypes.number,
};
export default UserStatistics;

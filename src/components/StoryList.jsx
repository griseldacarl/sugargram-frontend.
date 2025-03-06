import Story from "./Story";
import ListGroup from "react-bootstrap/ListGroup";

const StoryList = () => {
  const default_image_path =
    window.location.origin + "/defaults/user-large-solid.png";
  const storiesForMe = [
    {
      storyid: "111111",
      userImage: default_image_path,
      userDisplayName: "Carl Mitchell",
      userid: "111111",
    },
    {
      storyid: "222222",
      userImage: default_image_path,
      userDisplayName: "Carl Mitchell 2",
      userid: "222222",
    },
    {
      storyid: "333333",
      userImage: default_image_path,
      userDisplayName: "William Mitchell",
      userid: "333333",
    },
    {
      storyid: "44444",
      userImage: default_image_path,
      userDisplayName: "Griselda Mitchell",
      userid: "444444",
    },
  ];

  let displayStoriesForMe = storiesForMe.map((item, i) => (
    <ListGroup.Item key={item.storyid} style={{ borderColor: "white" }}>
      <Story
        storyID={item.storyid}
        userDisplayName={item.userDisplayName}
        userImage={item.userImage}
        userID={item.userid}
      />
    </ListGroup.Item>
  ));

  return (
    <>
      <ListGroup className="overflow-auto" horizontal>
        {displayStoriesForMe}
      </ListGroup>
    </>
  );
};

export default StoryList;

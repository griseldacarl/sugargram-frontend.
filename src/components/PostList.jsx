import ListGroup from "react-bootstrap/ListGroup";
import Post from "./Post";
import PropTypes from "prop-types";
const PostList = ({ posts, isOkToListPost, isOkToSeePostOptions }) => {
  const default_image_path =
    window.location.origin + "/defaults/user-large-solid.png";
  const default_video_path =
    window.location.origin + "/defaults/SampleVideo.mp4";
  let displayPostsForMe = posts?.map((item, i) => (
    <ListGroup.Item key={item.postID}>
      {" "}
      <Post
        postID={item.postID}
        postImage={item.postImage}
        postVideo={item.postVideo}
        isPostImage={item.isPostImage}
        userDisplayName={item.userDisplayName}
        userID={item.userID}
        userMessage={item.userMessage}
        displayOptions={isOkToSeePostOptions}
      />
    </ListGroup.Item>
  ));
  const postsForMe = [
    {
      postID: "11111",
      postImage: default_image_path,
      postVideo: default_video_path,
      isPostImage: false,
      userID: "11111",
      userIDMessage: "Who is this!!",
      userDisplayName: "William Mitchell",
    },
    {
      postID: "2222",
      postImage: default_image_path,
      postVideo: default_video_path,
      isPostImage: true,
      userID: "22222",
      userMessage: "I love this guy!!",
      userDisplayName: "Carl Mitchell",
    },

    {
      postID: "3333",
      postImage: default_image_path,
      postVideo: default_video_path,
      isPostImage: false,
      userID: "33333",
      userMessage: "I love this guy!!",
      userDisplayName: "Griselda Mitchell",
    },

    {
      postID: "44444",
      postImage: default_image_path,
      postVideo: default_video_path,
      isPostImage: true,
      userID: "44444",
      userMessage: "What a cute picture!!",
      userDisplayName: "Alredo Mendez",
    },

    {
      postID: "55555",
      postImage: default_image_path,
      postVideo: default_video_path,
      isPostImage: false,
      userID: "55555",
      userMessage: "Check out this Picture!!",
      userDisplayName: "Griselda Mitchell",
    },

    {
      postID: "66666",
      postImage: default_image_path,
      postVideo: default_video_path,
      isPostImage: false,
      userID: "66666",
      userMessage: "I love this guy!!",
      userDisplayName: "Alredo Mendez",
    },
  ];
  return (
    <>
      {isOkToListPost && <ListGroup>{displayPostsForMe}</ListGroup>}
      {!isOkToListPost && (
        <ListGroup>
          {postsForMe.map((item) => (
            <ListGroup.Item key={item.postID}>
              {" "}
              <Post
                postID={item.postID}
                postImage={item.postImage}
                postVideo={item.postVideo}
                isPostImage={item.isPostImage}
                userDisplayName={item.userDisplayName}
                userID={item.userID}
                userMessage={item.userMessage}
              />
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  );
};

PostList.prototype = {
  posts: PropTypes.array,
  isOkToListPost: PropTypes.bool,
};

export default PostList;

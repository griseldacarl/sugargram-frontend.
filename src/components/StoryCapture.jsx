import React, { useState, useRef } from "react";
import { Button, Form, Card } from "react-bootstrap";
import { FaVideo } from "react-icons/fa";
function StoryCapture() {
  const [videoSrc, setVideoSrc] = useState(null);
  const videoRef = useRef(null);

  const handleCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoSrc(URL.createObjectURL(file));
    }
  };

  const clearVideo = () => {
    setVideoSrc(null);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card bg="dark" text="light" style={{ width: "18rem" }}>
        <Card.Body>
          <Form.Group className="mb-3">
            <Form.Label>
              <FaVideo /> Share Your Diabetic Story!
            </Form.Label>
            <Form.Control
              type="file"
              accept="video/*"
              capture="user"
              onChange={handleCapture}
            />
          </Form.Group>
          <h6> Videos will be clipped to 5 seconds!</h6>

          {videoSrc && (
            <div>
              <video
                ref={videoRef}
                src={videoSrc}
                controls
                style={{ width: "100%" }}
              />
              <Button variant="danger" className="mt-2" onClick={clearVideo}>
                Clear Video
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default StoryCapture;

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRef } from "react";
import { setCurrentUser } from "../features/currentUser/currentUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFetchUsersQuery } from "../features/api/databaseApi";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const emailForLogin = useRef(null);
  const passwordForLogin = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: users, isSuccess: isUsersSuccess } = useFetchUsersQuery();

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      emailForLogin.current.value.toLowerCase().trim(),
      passwordForLogin.current.value.toLowerCase().trim()
    )
      .then((userCredential) => {
        const user = userCredential.user;
        if (isUsersSuccess) {
          let thisUser = users.filter((usr) => usr.email === user.email)[0];

          dispatch(
            setCurrentUser({
              id: thisUser.userid,
              email: thisUser.email,
              name: thisUser.displayName,
              token: user.token,
              isAuthenticated: true,
              activity: thisUser.activity,
              age: thisUser.age,
              displayName: thisUser?.displayName,
              firstname: thisUser?.firstname,
              gender: thisUser?.gender,
              height: thisUser?.height,
              lastname: thisUser?.lastname,
              notes: thisUser?.notes,
              image: thisUser?.image,
            })
          );
          navigate("/");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.errorMessage;
      });
  };
  return (
    <>
      <Card>
        <Card.Header className="bg-dark text-white">Login</Card.Header>
        <Card.Body>
          <Card.Title>Login To SugarGram</Card.Title>

          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Email
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  ref={emailForLogin}
                  type="text"
                  placeholder="Please give me your email"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Password
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  ref={passwordForLogin}
                  type="password"
                  placeholder="Please give me your password"
                />
              </Col>
            </Form.Group>
          </Form>
        </Card.Body>
        <Button variant="dark" onClick={handleLogin}>
          Login
        </Button>
      </Card>
    </>
  );
};

export default Login;

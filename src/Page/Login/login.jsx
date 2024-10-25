import Form from "react-bootstrap/Form";
import { useRef } from "react";
import { verifyUser } from "../../data/users";
import "./login.css";

function Login({ setToken, setRole }) {
  const userRef = useRef();
  const passwordRef = useRef();

  return (
    <div className="login-container">
      <br />
      <Form.Label htmlFor="username">Username</Form.Label>
 
      <Form.Control
        type="" // Corrected input type
        id="Username"
        className="input"
        placeholder="Enter username"
        style={{ textAlign: "center" }}
        ref={userRef} // Properly assigning the ref
      />
      <br />
      <Form.Label htmlFor="Password">Password</Form.Label>

      <Form.Control
        type="password"
        id="Password"
        placeholder="Enter Password"
        className="input"
        style={{ textAlign: "center" }}
        ref={passwordRef} // Properly assigning the ref
      />
      <br />
      <button
        className="btn btn-success mt-3"
        onClick={() => {
          const user = userRef.current.value.trim();
          const password = passwordRef.current.value.trim();
          const userInfo = verifyUser(user, password);

          // Clear input fields
          userRef.current.value = "";
          passwordRef.current.value = "";

          // Handle authentication result
          if (userInfo === null) {
            alert("Wrong username or password");
            userRef.current.focus();
          } else {
            setToken(userInfo.token);
            setRole(userInfo.role);
          }
        }}
      >
        Login
      </button>
    </div>
  );
}

export default Login;

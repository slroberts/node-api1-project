import React, {useState} from "react";
import {axiosWithAuth} from "./utils/axiosWithAuth";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

//layout
import {Container, Row, Col, Navbar} from "react-bootstrap";
import {useForm} from "./utils/hooks/useForm";

const App = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser, handleChange] = useForm({
    name: "",
    bio: "",
  });

  const fetchUsers = () => {
    axiosWithAuth()
      .get("/api/users")
      .then((res) => {
        setUsers(res.data);
        console.log("SR get request", res.data);
      })
      .catch((err) => {});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosWithAuth()
      .post("/api/users", newUser)
      .then((res) => {
        console.log("SR post request", res.data);
        fetchUsers();
      })
      .catch((err) => {});

    setNewUser({
      name: "",
      bio: "",
    });
  };

  return (
    <>
      <Container>
        <Row>
          <Navbar
            expand="lg"
            variant="light"
            bg="none"
            style={{marginBottom: "1rem"}}
          >
            <Navbar.Brand>User form used with user API</Navbar.Brand>
          </Navbar>
        </Row>
        <Row>
          <Col lg="4">
            <UserForm
              newUser={newUser}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </Col>
          <Col>
            <UserList users={users} fetchUsers={fetchUsers} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;

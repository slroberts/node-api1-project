import React, {useState} from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";
import {Card, Modal, Form, Button} from "react-bootstrap";

const UserCard = ({user, fetchUsers}) => {
  const [userToUpdate, setUserToUpdate] = useState({
    name: user.name,
    bio: user.bio,
  });

  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (e) => {
    e.persist();
    setUserToUpdate({
      ...userToUpdate,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = () => {
    axiosWithAuth()
      .delete(`/api/users/${user.id}`, userToUpdate)
      .then((res) => {
        console.log(user.id);
        fetchUsers();
      })
      .catch((err) => console.error(err.message));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosWithAuth()
      .put(`/api/users/${user.id}`, userToUpdate)
      .then((res) => {
        console.log(user.id);
        setUserToUpdate(userToUpdate);
        fetchUsers();
      })
      .catch();

    setModalOpen(false);
  };

  return (
    <>
      <Card border="dark">
        <Card.Body>
          <Card.Title>{user.name}</Card.Title>
          <Card.Text>{user.bio}</Card.Text>
          <Card.Text onClick={() => setModalOpen(true)}>Edit</Card.Text>
          <Card.Text onClick={handleDelete}>Delete</Card.Text>
        </Card.Body>
      </Card>
      <Modal
        size="lg"
        show={modalOpen}
        onHide={() => setModalOpen(false)}
        aria-labelledby="update-user-modal-vcenter"
        centered
      >
        <Modal.Body>
          <Form onSubmit={handleSubmit} style={{marginBottom: "2rem"}}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                as="input"
                type="text"
                name="name"
                value={userToUpdate.name}
                onChange={handleChange}
                placeholder="John / Jane Doe"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                name="bio"
                value={userToUpdate.bio}
                onChange={handleChange}
                placeholder="Something about you"
              />
            </Form.Group>

            <Button type="submit">Update User</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserCard;

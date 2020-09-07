import React from "react";

import {Form, Button} from "react-bootstrap";

const UserForm = ({newUser, handleChange, handleSubmit}) => {
  return (
    <>
      <h4>Add User</h4>
      <Form onSubmit={handleSubmit} style={{marginBottom: "2rem"}}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            as="input"
            type="text"
            name="name"
            value={newUser.name}
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
            value={newUser.bio}
            onChange={handleChange}
            placeholder="Something about you"
          />
        </Form.Group>

        <Button type="submit">Add User</Button>
      </Form>
    </>
  );
};

export default UserForm;

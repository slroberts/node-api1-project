import React from "react";
import UserCard from "./UserCard";
import {Row, Col} from "react-bootstrap";

const UserList = ({users, fetchUsers}) => {
  return (
    <Row>
      {users.map((user) => (
        <Col key={user.id} lg="4" style={{marginBottom: "2rem"}}>
          <UserCard user={user} fetchUsers={fetchUsers} />
        </Col>
      ))}
    </Row>
  );
};

export default UserList;

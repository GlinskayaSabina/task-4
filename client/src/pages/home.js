import { observer } from "mobx-react-lite";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import ToolBar from "../components/ToolBar";
import { Context } from "..";
import { deleteUsers as deleteUsersApi, changeStatus } from "../http/userAPI";
import { useHistory } from "react-router-dom";

const Home = observer(() => {
  const { user } = useContext(Context);

  const history = useHistory();

  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const loadUsers = async () => {
    fetch("http://localhost:5000/api/users/home")
      .then((res) => res.json())
      .then((res) => {
        setUsers(res);
      });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const selectAll = useCallback(() => {
    if (selectedUsers.length !== users.length)
      setSelectedUsers(users.map((user) => user.id));
    else setSelectedUsers([]);
  }, [selectedUsers.length, users]);

  const deleteUsers = async () => {
    if (!selectedUsers.length) return;

    const response = await deleteUsersApi(selectedUsers);

    const { data, status } = response;

    if (status === 301) {
      const { instruction } = data;
      if (instruction === "logout") {
        window.localStorage.clear();
        user && user.setIsAuth(false);
      }
    } else {
      await loadUsers();
    }
  };
  const blockOrUnblock = async (newStatus) => {
    if (!selectedUsers.length || !newStatus) return;

    const response = await changeStatus(selectedUsers, newStatus);

    const { data, status } = response;

    if (status === 301) {
      const { instruction } = data;
      if (instruction === "logout") {
        window.localStorage.clear();
        user && user.setIsAuth(false);
      }
    } else {
      await loadUsers();
    }
  };

  const logout = () => {
    window.localStorage.clear();
    user.setIsAuth(false);
    user.setUser({});
    history.push("/");
  };

  return (
    <>
      <ToolBar
        selectAll={selectAll}
        deleteUsers={deleteUsers}
        blockOrUnblock={blockOrUnblock}
        logout={logout}
      />
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th></th>
              <th>id</th>
              <th>Name</th>
              <th>email</th>
              <th>registration date</th>
              <th>last login date</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr
                  key={user.id}
                  className={`${!user.status ? "blocked" : ""}`}
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={(event) => {
                        const { checked } = event.target;

                        setSelectedUsers((prev) => {
                          let result = prev;
                          if (checked && !prev.includes(user.id)) {
                            return [...prev, user.id];
                          } else if (!checked && prev.includes(user.id)) {
                            return result.filter(
                              (userId) => userId !== user.id
                            );
                          }
                        });
                      }}
                    />
                  </td>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.registration_date).toDateString()}</td>
                  <td>{new Date(user.last_login_date).toDateString()}</td>
                  <td>{user.status.toString()}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
});

export default Home;

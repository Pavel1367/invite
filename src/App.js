import React, { useState, useEffect } from "react";
import "./index.scss";
import { Success } from "./components/Success";
import { UserList } from "./components/Users/UserList";


function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [invites, setInvites] = useState([]);
  const [success, setSuccess] = useState(false);

  const guestCounter = invites.length

  useEffect(() => {
    fetch("https://reqres.in/api/users")
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const onClickInvite = (userId) => {
    invites.includes(userId)
      ? setInvites((prev) => prev.filter((id) => id !== userId))
      : setInvites((prev) => [...prev, userId]);
  };

  const onClickSendInvites = (invites) =>{
    setSuccess(true)
  }

  return (
    <div className="App">
      {success ? (
        <Success setSuccess={setSuccess} guestCounter={guestCounter} />
      ) : (
        <UserList
       
        onClickSendInvites={onClickSendInvites}
          onClickInvite={onClickInvite}
          invites={invites}
          setInvites={setInvites}
          searchValue={searchValue}
          setValue={setSearchValue}
          items={users}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export default App;

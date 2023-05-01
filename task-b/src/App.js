import { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [userProfiles, setUserProfiles] = useState([]);

  async function handleSearchClick() {
    if(username.length){
      const response = await fetch(
        `https://api.github.com/search/users?q=${username}`
        );
        const data = await response.json();
        setUserProfiles(data.items);
    }
    else{
      setUserProfiles([])
    }
  }

  function handleInputChange(event) {
    setUsername(event.target.value);
  }

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={handleInputChange}
      />
      <button onClick={handleSearchClick}>Search</button>
      <div className="user-profiles">
        {userProfiles.map((user) => (
          <div key={user.id} className="user-profile">
            <img src={user.avatar_url} />
            <a href={user.html_url} target="_blank" rel="noreferrer">
              {user.login}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

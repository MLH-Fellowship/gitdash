import { hasDisplayNone } from "@chakra-ui/utils";
import { useState } from "react";
import axios from "axios";

export default function github() {

  // Defined the useState functions 
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [repos, setRepos] = useState([])

  // Handle Submit function 
  function handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault()
    searchRepos()
  }

  function searchRepos() {
    setLoading(true)
    axios({
      method: "get", 
      url: `https:api.github.com/users/${username}/repos`,
    }).then(res => {
      setLoading(false); 
      setRepos(res.data); 
    }); 
  }

  // Function to render the repos 
  
  function renderRepo(repo) {
    return (
      <div className="row" key={repo.id}>
        <h2>
          {repo.name}
        </h2>
      </div>  
    )
  }
  
  return (
    <div>
      <div>
        <form action="">
          <input 
            style={{backgroundColor:"black"}} 
            type="text"
            value={username}
            placeholder="Github Username"
            onChange={e => setUsername(e.target.value)} 
          />
          <button 
            className="getData"
            onClick={handleSubmit}
          >
          {loading ? "Searching..." : "Search"} 
          </button>
        </form> 
      </div>
      <div className="results">
        {repos.map(renderRepo)}
      </div>
    </div>
  )
}


import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const[ repositories, setRepositories] = useState([]);

    useEffect(()=>{
        api.get('/repositories').then(response => {
            const data = response.data;
           setRepositories(response.data);
          });
     },[]);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "Desafio ReactJS",
      url: "https://github.com/josepholiveira",
      techs:["abc",'dfg']
    });
    const repository = response.data;
    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
     await api.delete(`repository/${id}`);

     setRepositories(repositories.filter (
       repository => repositories.id !== id
     ));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (<li  key={repository.id}> {repository.title}
          
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        ))} 
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

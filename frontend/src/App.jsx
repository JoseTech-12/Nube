import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    fetch("/api/getItems")
      .then(res => res.json())
      .then(data => setItems(data));
  }, [items]);

  const handleRegistrar = () => {
    fetch("/api/createItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id, nombre })
    })
      .then(res => res.json())
      .then(data => {
        setItems([...items, data]);
        setId("");
        setNombre("");
      });
  };


  return (
    <div>
     
      <h1>Usuarios</h1>
       <div className="button">
        <input 
          type="number" 
          placeholder="id" 
          value={id} 
          onChange={(e) => setId(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Nombre" 
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)} 
        />
        <button onClick={handleRegistrar} className="button"
        >Registrar</button>
      </div>
      {items.map(item => (
        <div key={item.id}>
          <p>{item.id}: {item.nombre}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/api/getItems")
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  return (
    <div>
      <h1>Items</h1>
      {items.map(item => (
        <div key={item.id}>{item.id}</div>
      ))}
    </div>
  );
}

export default App;
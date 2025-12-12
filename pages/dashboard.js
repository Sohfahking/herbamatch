import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [kits, setKits] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/kits") // Replace with auth later
      .then(res => setKits(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Your Kits</h1>
      {kits.map(kit => (
        <div key={kit._id}>
          <h3>{kit.name}</h3>
          <p>Herbs: {kit.herbs.map(h => h.name).join(", ")}</p>
          <p>Total Price: ${kit.totalPrice}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;

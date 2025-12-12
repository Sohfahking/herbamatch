import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Herbs() {
  const [herbs, setHerbs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/herbs")
      .then(res => setHerbs(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Herbs</h1>
      <ul>
        {herbs.map(herb => (
          <li key={herb._id}>
            <Link to={`/herbs/${herb._id}`}>{herb.name}</Link> - ${herb.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Herbs;

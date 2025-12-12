import { useEffect, useState } from "react";

export default function HerbList() {
  const [herbs, setHerbs] = useState([]);

  useEffect(() => {
    fetch("https://your-railway-url.up.railway.app/api/herbs")
      .then((res) => res.json())
      .then((data) => setHerbs(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Herbs (Loaded from MongoDB)</h2>

      {herbs.length === 0 ? (
        <p>Loading herbs...</p>
      ) : (
        <ul>
          {herbs.map((herb) => (
            <li key={herb._id}>
              <strong>{herb.name}</strong> – {herb.properties}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function HerbDetail() {
  const { id } = useParams();
  const [herb, setHerb] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/herbs/${id}`)
      .then(res => setHerb(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!herb) return <div>Loading...</div>;

  return (
    <div>
      <h2>{herb.name}</h2>
      <p>{herb.description}</p>
      <p>Properties: {herb.properties.join(", ")}</p>
      <p>Price: ${herb.price}</p>
      <img src={herb.imageUrl} alt={herb.name} width={150} />
    </div>
  );
}

export default HerbDetail;

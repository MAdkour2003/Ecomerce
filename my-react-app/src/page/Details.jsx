import { useParams } from "react-router-dom";

function Details() {
  const { id } = useParams();

  return (
    <div>
      <h1>Details Page</h1>
      <p>Item price: {id}</p>
    </div>
  );
}

export default Details;

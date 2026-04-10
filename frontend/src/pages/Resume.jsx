import { useParams } from "react-router-dom";

const Resume = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Resume Page</h1>
      <p>ID: {id}</p>
    </div>
  );
};

export default Resume;
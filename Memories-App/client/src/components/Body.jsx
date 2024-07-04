import Form from "./Form";
import Posts from "./Posts";
import { useState } from "react";
const Body = () => {
  const [updatedPost, setUpdatedPost] = useState(false);

  const handleFormSubmit = () => {
    setUpdatedPost((prev) => !prev); // Toggle the state to trigger Posts update
  };
  return (
    <div className="flex justify-between m-4">
      <Posts updatedPost={updatedPost} />
      <Form onFormSubmit={handleFormSubmit} />
    </div>
  );
};

export default Body;

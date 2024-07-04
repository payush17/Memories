import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Form = ({ onFormSubmit }) => {
  const formData = {
    creator: "",
    title: "",
    message: "",
    selectedFile: null,
  };
  const [post, setPost] = useState(formData);

  const handleChange = (e) => {
    if (e.target.name === "selectedFile") {
      const file = e.target.files[0];
      setPost((prevPost) => ({
        ...prevPost,
        selectedFile: file,
      }));
    } else {
      const { name, value } = e.target;
      setPost((prevPost) => ({
        ...prevPost,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = new FormData();
    postData.append("creator", post.creator);
    postData.append("title", post.title);
    postData.append("message", post.message);
    postData.append("selectedFile", post.selectedFile);

    try {
      const res = await axios.post("http://localhost:8000/posts/", postData);
      toast.success("Post created successfully", { position: "top-right" });
      console.log(res);
      onFormSubmit(); // Call the callback function to update posts
      setPost({
        creator: "",
        title: "",
        message: "",
        selectedFile: null,
      });
      document.getElementById("imageInput").value = "";
    } catch (err) {
      console.error(err);
      toast.error("Error creating post");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-4 rounded-lg shadow-lg my-5 h-1/2">
      <h1 className="text-2xl font-bold mb-4 text-center">Creating a Memory</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="creator"
            className="block text-sm font-medium text-gray-700"
          >
            Creator
          </label>
          <input
            type="text"
            name="creator"
            value={post.creator}
            onChange={handleChange}
            placeholder="Enter creator's name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            placeholder="Enter title"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Message
          </label>
          <textarea
            name="message"
            value={post.message}
            onChange={handleChange}
            rows="4"
            placeholder="Enter your message"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="imageInput"
            className="block text-sm font-medium text-gray-700"
          >
            Upload Image
          </label>
          <input
            type="file"
            onChange={handleChange}
            id="imageInput"
            name="selectedFile"
            accept="image/*"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;

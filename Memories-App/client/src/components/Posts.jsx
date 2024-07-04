import axios from "axios";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

const Posts = ({ updatedPost }) => {
  const [allPost, setAllPost] = useState([]);

  const getPost = async () => {
    const response = await axios.get("http://localhost:8000/posts/");
    setAllPost(response.data);
  };

  useEffect(() => {
    getPost();
  }, [updatedPost]);

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/posts/${id}`);
      setAllPost(allPost.filter((item) => item._id !== id)); // Use item._id to compare
      console.log("Deleted successfully");
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-200 py-5 px-10 my-5 ">
      <div className="max-w-4xl  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allPost.map((post) => (
          <div
            className="bg-white overflow-hidden shadow-md rounded-lg relative"
            key={post._id}
          >
            <div className="absolute top-1 left-1 text-white px-2 py-1 rounded-tr-lg rounded-bl-lg bg-blue-500">
              <span className="text-sm font-semibold">{post.creator}</span>
            </div>
            <img
              src={post.selectedFile}
              alt="image"
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <h1 className="text-xl font-bold mb-2">{post.title}</h1>
              <p className="text-gray-700">{post.message}</p>
              <div className="flex justify-between mt-7 text-gray-500">
                {/* <p className="mr-2">Likes: {post.likes}</p> */}
                <MdDelete
                  className="cursor-pointer"
                  onClick={() => deleteHandler(post._id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;

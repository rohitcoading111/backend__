import React from "react";
import { Link } from "react-router-dom";

const CreatePost = () => {

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        alert("Post published successfully!");
        e.target.reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page">

      <nav className="navbar">
        <h2>Postly</h2>

        <div className="nav-buttons">
          <Link to="/" className="nav-btn active">
            Create Post
          </Link>

          <Link to="/feed-post" className="nav-btn">
            Feed
          </Link>
        </div>
      </nav>

      <main className="create-container">

        <div className="create-card">

          <h1>Create a Post</h1>
          <p className="subtitle">
            Share something with the community
          </p>

          <form onSubmit={handleSubmit}>

            <label>Choose Image</label>

            <input
              type="file"
              name="image"
              accept="image/*"
              required
            />

            <label>Caption</label>

            <textarea
              name="caption"
              placeholder="What's on your mind?"
              required
            />

            <button type="submit" className="publish-btn">
              Publish Post
            </button>

          </form>

        </div>

      </main>

    </div>
  );
};

export default CreatePost;
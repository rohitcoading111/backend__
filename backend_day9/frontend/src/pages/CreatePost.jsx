import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const CreatePost = () => {

  const location = useLocation();
  const post = location.state?.post;

  const [caption, setCaption] = useState("");

  useEffect(() => {
    if (post) {
      setCaption(post.caption);
    }
  }, [post]);

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  try {
    let response;

    if (post) {
      // Update existing post
      response = await fetch(`http://localhost:3000/posts/${post._id}`, {
        method: "PUT",
        body: formData
      });
    } else {
      // Create new post
      response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        body: formData
      });
    }

    const data = await response.json();

    console.log(data);

    if (response.ok) {
      alert(post ? "Post updated successfully!" : "Post published successfully!");
      e.target.reset();
      setCaption("");
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

          <h1>{post ? "Update Post" : "Create a Post"}</h1>

          <p className="subtitle">
            {post
              ? "Edit your existing post"
              : "Share something with the community"}
          </p>

          <form onSubmit={handleSubmit}>

            <label>Choose Image</label>

            <input
              type="file"
              name="image"
              accept="image/*"
              required={!post}
            />

            <label>Caption</label>

            <textarea
              name="caption"
              placeholder="What's on your mind?"
              required
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />

            <button type="submit" className="publish-btn">
              {post ? "Update Post" : "Publish Post"}
            </button>

          </form>

        </div>

      </main>

    </div>
  );
};

export default CreatePost;
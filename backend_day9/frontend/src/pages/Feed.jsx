import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Feed = () => {

  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleUpdate = (post) => {
    setSelectedPost(post);
  };

  useEffect(() => {

    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/posts");
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();

  }, []);

  return (
    <div className="page">

      <nav className="navbar">

        <h2>Postly</h2>

        <div className="nav-buttons">

          <Link to="/" className="nav-btn">
            Create Post
          </Link>

          <Link to="/feed-post" className="nav-btn active">
            Feed
          </Link>

        </div>

      </nav>

      <main className="feed-container">

        <div className="feed-header">
          <h1>Latest Posts</h1>
          <p>See what people are sharing</p>
        </div>

        <section className="feed-section">

          {posts.length > 0 ? (

            posts.map((post) => (

              <article key={post._id} className="post-card">

                <img
                  src={post.image}
                  alt={post.caption}
                  className="post-image"
                />

                <div className="post-content">
                  <p>{post.caption}</p>
                </div>

                <Link
                 to="/"
                 state={{ post }}
                 className="update-btn"
                 >
                  Update
                </Link>
              </article>

            ))

          ) : (

            <div className="empty-state">
              <h2>No posts yet</h2>
              <p>Be the first one to create a post.</p>

              <Link to="/" className="publish-btn">
                Create First Post
              </Link>
            </div>

          )}

        </section>

      </main>

    </div>
  );
};

export default Feed;
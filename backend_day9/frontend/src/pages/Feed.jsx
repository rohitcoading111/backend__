import React, { useState } from 'react';

const Feed = () => {

  const [posts, setPosts] = useState([]); 

  return (
    <div className="feed-container">
      <section className="feed-section">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="post-card">
              <div className="image-wrapper">
                <img src={post.image} alt={post.caption || "Feed afbeelding"} />
              </div>
              <div className="post-content">
                <p className="post-caption">{post.caption}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-posts">Nog geen berichten geplaatst.</p>
        )}
      </section>
    </div>
  );
};

export default Feed;

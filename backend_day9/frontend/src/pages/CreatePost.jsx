import React from 'react'

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
    } catch (error) {
        console.log(error);
    }
};

  return (
    <div>
      <section className='create-post-section'>
          <h1>Create post </h1>
          <form onSubmit={handleSubmit}>
            <input type="file" name='image' accept='image/*' />
            <input type="text" name="caption" placeholder='enter caption' required />
            <button type='submit'>Publish Post</button>
          </form>
      </section>
    </div>
  )
}

export default CreatePost

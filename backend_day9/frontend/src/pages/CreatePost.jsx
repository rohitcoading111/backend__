import React from 'react'

const CreatePost = () => {
  return (
    <div>
      <section className='create-post-section'>
          <h1>Create post </h1>
          <form>
            <input type="file" name='image' accept='image/*' />
            <input type="text" name="caption" placeholder='enter caption' required />
            <button type='submit'>Publish Post</button>
          </form>
      </section>
    </div>
  )
}

export default CreatePost

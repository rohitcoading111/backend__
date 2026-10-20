function Register() {
  return (
    <div>
      <h1>Create your account</h1>

      <form>
        <div>
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Create a password"
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
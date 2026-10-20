function Login() {
  return (
    <div>
      <h1>Login to LMS</h1>

      <form>
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
            placeholder="Enter your password"
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
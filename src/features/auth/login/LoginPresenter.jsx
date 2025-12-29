const LoginPresenter = ({
  email,
  password,
  loading,
  error,
  onChange,
  onSubmit,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="max-w-md mx-auto mt-24 space-y-4"
    >
      <h1 className="text-2xl font-semibold">Login</h1>

      {error && <p className="text-red-500">{error}</p>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={onChange}
        className="input"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={onChange}
        className="input"
        required
      />

      <button
        disabled={loading}
        className="btn-primary w-full"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginPresenter;

import { useSelector } from "react-redux";

const Navbar = () => {
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );

  return (
    <header className="h-16 bg-navbar border-b border-border px-6 flex items-center justify-between">
      {/* Left */}
      <div className="text-sm text-muted">
        Welcome to your collaborative workspace
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <>
            <button className="btn-secondary">Refresh</button>
            <button className="btn-primary">Profile</button>
          </>
        ) : (
          <>
            <button className="btn-secondary">Log In</button>
            <button className="btn-primary">Sign Up</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;

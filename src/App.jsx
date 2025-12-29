import { useSelector } from "react-redux";

const App = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <div>
      <h1>TaskForge</h1>
      <pre>{JSON.stringify(auth, null, 2)}</pre>
    </div>
  );
};

export default App;

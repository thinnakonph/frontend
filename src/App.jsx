
import useAuth from "./Hooks/userAuth";
import Rout from "./Routers/AppRouters";


function App() {
  const { loading } = useAuth();
  if (loading) {
    return <p className="text-4xl">Loading..</p>;
  }

  return (
     <div>
      <Rout/>
    </div>

   
  );
}

export default App;

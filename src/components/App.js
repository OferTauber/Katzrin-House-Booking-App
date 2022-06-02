import Login from './login/login';
import { useGlobalContext } from '../utils/context';
import Main from './main/main/main';

function App() {
  const { user } = useGlobalContext();

  if (!user.name) return <Login />;

  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;

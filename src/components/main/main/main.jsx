// import { useGlobalContext } from '../../../utils/context';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from '../navbar/navbar';
import Calander from '../calander/calander';
import Blog from './blog';
import Info from '../info/info';
import './main.css';

export default function Main() {
  // const { user } = useGlobalContext();
  return (
    <div className="main">
      <BrowserRouter>
        <Navbar />

        <Route exact path="/" component={Calander} />
        <Route exact path="/blog" component={Blog} />
        <Route exact path="/info" component={Info} />
      </BrowserRouter>
    </div>
  );
}

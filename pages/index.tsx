import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Navigation from '../pages/Navigation';
import About from '../pages/About';
import Main from '../pages/Main';
import '../styles/Navigation.module.css';


const Home: NextPage = () => {
  
    return (
    <div className="App">
      <Navigation />
      <Main />
      <About />
    </div>
  
    );
  }
  
  export default Home;
  
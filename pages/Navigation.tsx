import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Navigation.module.css'; 
import "nes.css/css/nes.min.css";

const Home: NextPage = () => {

    return (
      <div className={styles.header}>
        <div className={styles.logo}/>
          <div className={styles.toggle}></div>
            <ul className={styles.navigation}>
              <li><a className="nes-btn" href="#">Home</a></li>
              <li><a className="nes-btn" href="#">About</a></li>
              <li><a className="nes-btn" href="#">Schedule</a></li>
              <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          // Note: If your app doesn't use authentication, you
          // can remove all 'authenticationStatus' checks
          const ready = mounted && authenticationStatus !== 'loading';
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus ||
              authenticationStatus === 'authenticated');
  
          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                'style': {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <button 
                    onClick={openConnectModal} 
                    type="button"
                    className="nes-btn is-primary">
                      Connect
                    </button>
                  );
                }
  
                return (
                  <div style={{ display: 'flex', gap: 12 }}>
  
  
                    <button 
                    onClick={openAccountModal} 
                    type="button"
                    className="nes-btn is-success">
                      Connected
                    </button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
            </ul>
      </div>
  
    );
  }
  
  export default Home;
  
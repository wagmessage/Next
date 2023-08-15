import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Navigation.module.css'; 
import "nes.css/css/nes.min.css";
import React, { useEffect, useState } from 'react';

const Home: NextPage = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  useEffect(() => {
    const toggleMenu = document.querySelector(`.${styles.toggle}`);
    const navigation = document.querySelector(`.${styles.navigation}`);

    const handleToggleMenu = () => {
      setIsMenuActive(prevMenuActive => !prevMenuActive);
    };

    toggleMenu?.addEventListener('click', handleToggleMenu);

    return () => {
      toggleMenu?.removeEventListener('click', handleToggleMenu);
    };
  }, []);

  return (
    <div className={styles.header}>
      <div className={styles.logo}>빵빵아</div>
      <div className={`${styles.toggle} ${isMenuActive ? styles.active : ''}`} />
      <ul className={`${styles.navigation} ${isMenuActive ? styles.active : ''}`}>
              <li className={styles.li}><a className={`${styles.a} nes-btn`} href="#">Home</a></li>
              <li className={styles.li}><a className={`${styles.a} nes-btn`} href="#">About</a></li>
              <li className={styles.li}><a className={`${styles.a} nes-btn`} href="#">Schedule</a></li>
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
                    className={`${styles.button} nes-btn is-primary`}>
                      Connect
                    </button>
                  );
                }
  
                return (
                  <div style={{ display: 'flex', gap: 12 }}>
  
  
                    <button 
                    onClick={openAccountModal} 
                    type="button"
                    className={`${styles.button} nes-btn is-success`}>
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
  
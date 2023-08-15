import React, { useEffect, useState } from 'react';
import SaveSnailz from './SaveSnailz.json';
import type { NextPage } from 'next';

import { parseEther } from 'viem';

import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

import styles from '../styles/Main.module.css';

const Main: NextPage = () => {
  const [mounted, setMounted] = useState<number>(0); // 초기값을 숫자로 설정
  useEffect(() => setMounted(1), []); // 초기값을 1로 설정 (나중에 필요에 따라 수정)

  const [totalMinted, setTotalMinted] = React.useState(0);
  const { isConnected } = useAccount();

  function calculateValue(mounted: number): number { // 인자와 반환값의 타입 명시
    return 0.0029 * mounted;
  }
  
  const calculatedValue = calculateValue(mounted);

  const { config: contractWriteConfig } = usePrepareContractWrite({
    address: '0x67a3a6F7aB0EB8CC4dDb6624c2FBa8146593fd47',
    abi: SaveSnailz.abi,
    functionName: 'mint',
    value: parseEther(calculatedValue.toString()),
    args: [mounted]
  });

  const {
    data: mintData,
    write: mint,
    isLoading: isMintLoading,
    isSuccess: isMintStarted,
    error: mintError,
  } = useContractWrite(contractWriteConfig);

  const { data: totalSupplyData } = useContractRead({
    address: '0x67a3a6F7aB0EB8CC4dDb6624c2FBa8146593fd47',
    abi: SaveSnailz.abi,
    functionName: 'totalSupply',
    watch: true,
  });

  
  const {
    data: txData,
    isSuccess: txSuccess,
    error: txError,
  } = useWaitForTransaction({
    hash: mintData?.hash,
  });

  React.useEffect(() => {
    if (totalSupplyData) {
      const numericTotalSupply = Number(totalSupplyData);
      setTotalMinted(numericTotalSupply);
    }
  }, [totalSupplyData]);

  const totalSum = (0.0029 * mounted).toFixed(4);

  const isMinted = txSuccess;

  const handleDecrement = () => {
    if (mounted <= 1) return;
    setMounted(mounted -1);
};

const handleIncrement = () => {
    if (mounted >= 10) return;
    setMounted(mounted +1);
};

useEffect(() => {
  const handleScroll = () => {
    let value = window.scrollY;

    const stars = document.getElementById('stars');
    const stars2 = document.getElementById('stars2');
    const moon = document.getElementById('moon');
    const rock = document.getElementById('rock');
    const masjid = document.getElementById('masjid');
    const sen = document.getElementById('sen');

    if (stars) {
      stars.style.bottom = value * 0.05 + '%';
    }

    if (stars2) {
      stars2.style.bottom = value * 0.05 + '%';
    }

    if (moon) {
      moon.style.bottom = value * -0.5 + 'px';
    }

    if (rock) {
      rock.style.bottom = value * -0.75 + 'px';
    }

    if (masjid) {
      masjid.style.bottom = value * -0.15 + 'px';
    }

    if (sen) {
      sen.style.right = -100 + value * 0.5 + '%';
      sen.style.top = 50 + value * 0.1 + '%';
    }
  };

  window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);


  return (
  <section className={styles.section}>
    <img src="/images/stars.png" id="stars" alt="stars" className={styles.img}/>
    <img src="/images/stars2.png" id="stars2" alt="stars2" className={`${styles.img} ${styles.stars2}`}/>
    <img src="/images/moon.png" id="moon" alt="moon" className={styles.img}/>
    <img src="/images/rock.png" id="rock" alt="rock" className={styles.img}/>
    <img src="/images/masjid.png" id="masjid" alt="masjid" className={`${styles.img} ${styles.masjid}`}/>
    
   
    <h2 id="sen"className={styles.sen}>옥지얌</h2>
    <img src="/images/bottom.png" id="bottom" alt="bottom" className={styles.img}/>
    <img src="/images/lamp.png" id="lamp" alt="lamp" className={`${styles.img} ${styles.lamp}`}/>
    
    {mounted && isConnected && !isMinted && (
      <div className={styles.container}>
        <div
          id="btn"
          className={`${styles.btn} nes-btn is-error`}
          onClick={() => mint?.()}
        >  
      Mint Now
      </div>
      <div className={`${styles.supply} nes-btn is-disabled`}>{Number(totalMinted)} minted so far!</div>
      <div className={`${styles.sum} nes-btn is-disabled`}>{Number(totalSum)} Ξ </div>
      <div className={`${styles.minus} nes-btn is-warning`} onClick={handleDecrement} >-</div>
      <input readOnly id="name_field" className={`${styles.input} nes-input`} type="number" value={mounted} />
      <div className={`${styles.plus} nes-btn is-warning`} onClick={handleIncrement} >+</div>
    </div>
    )}
    
  </section>
  );
}
export default Main;

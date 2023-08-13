import React, { useEffect, useState } from 'react';
import SaveSnailz from './SaveSnailz.json';
import type { NextPage } from 'next';

import { formatEther, parseEther } from 'viem';

import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

import styles from '../styles/Main.module.css';
import '../styles/Main.module.css';

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

//useEffect(() => {
//  const handleScroll = () => {
//    let value = window.scrollY; // 스크롤 값으로 설정
//
//    let starsElement = document.getElementById('stars');
//    let stars2Element = document.getElementById('stars2');
//    let moonElement = document.getElementById('moon');
//    let rockElement = document.getElementById('rock');
//    let masjidElement = document.getElementById('masjid');
//    let textElement = document.getElementById('text');
//
//
//    starsElement.style.bottom = value * 0.05 + '%';
//    stars2Element.style.bottom = value * 0.05 + '%';
//    moonElement.style.bottom = value * -0.5 + 'px';
//    rockElement.style.bottom = value * -0.75 + 'px';
//    masjidElement.style.bottom = value * -0.15 + 'px';
//    textElement.style.right = -100 + value * 0.5 + '%';
//    textElement.style.top = 50 + value * 0.1 + '%';
//
//  };
//
//  window.addEventListener('scroll', handleScroll);
//
//  return () => {
//    window.removeEventListener('scroll', handleScroll);
//  };
//}, []);

  return (
  <section className={styles.section}>
    <img src="/images/stars.png" id="stars" alt="stars" className={styles.img}/>
    <img src="/images/stars2.png" id="stars2" alt="stars2" className={styles.img}/>
    <img src="/images/moon.png" id="moon" alt="moon" className={styles.img}/>
    <img src="/images/rock.png" id="rock" alt="rock" className={styles.img}/>
    <img src="/images/masjid.png" id="masjid" alt="masjid" className={styles.img}/>
    
   
    <h2 id="text">Stupid Lee Seo-yong</h2>
    <img src="/images/bottom.png" id="bottom" alt="bottom" className={styles.img}/>
    <img src="/images/lamp.png" id="lamp" alt="lamp" className={styles.img}/>
    
    {mounted && isConnected && !isMinted && (
      <div className={styles.container}>
        
        <div
          id="btn"
          className={`${styles.btn} nes-btn is-error`}
          onClick={() => mint?.()}
        >  
      Mint Now
      </div>
      <div className="nes-btn is-disabled supply" id="supply">{Number(totalMinted)} minted so far!</div>
      <div className="nes-btn is-disabled sum" id="sum">{Number(totalSum)} Ξ </div>
      <div className="nes-btn is-warning minus" id="minus" onClick={handleDecrement} >-</div>
      <input readOnly id="name_field" className="nes-input input" type="number" value={mounted} />
      <div className="nes-btn is-warning plus" id="plus" onClick={handleIncrement} >+</div>
    </div>
    )}
    
  </section>
  );
}
export default Main;

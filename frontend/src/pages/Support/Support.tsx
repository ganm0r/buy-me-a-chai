import React, { useState, useEffect } from 'react';
import styled from "styled-components";

import { ethers } from 'ethers';
import ABI from '../../utils/BuyMeAChai.json';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';

interface SupportProps {
  creatorName: string;
}

const StyledP = styled.p`
  color: black;
  font-size: 32px;
  font-weight: 800;
  line-height: 36px;
  margin: 0;
  padding: 0;
`;

const Support = ({ creatorName }: SupportProps) => {
  const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
  const contractABI = ABI.abi;

  const [account, setAccount] = useState('');
  const [chais, setChais] = useState<Array<{ address: string; timestamp: Date; message: string; name: string }>>([]);
  const [formData, setFormData] = useState({
    name: '',
    message: '',
  });

  const { name, message } = formData;

  const onChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const isWalletConnected = async () => {
    try {
      const { ethereum } = window;
      const accounts = await ethereum.request({ method: 'eth_accounts' });

      console.log('accounts: ', accounts);

      if (accounts.length > 0) {
        const account = accounts[0];
        console.log('[wallet connection] successful: ', account);
      } else {
        console.log('[wallet connection] failed!');
      }
    } catch (error) {
      console.error('[wallet connection] ', error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log('please install MetaMask');
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      setAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const buyChai = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, 'any');
        const signer = provider.getSigner();
        const buyMeAChai = new ethers.Contract(contractAddress, contractABI, signer);

        console.log('buying chai...');

        const buyChai = await buyMeAChai.buyChai(name ? name : 'Anonymous', message ? message : 'Enjoy your Chai!', {
          value: ethers.utils.parseEther('10'),
        });

        await buyChai.wait();

        console.log('mined: ', buyChai.hash);
        console.log('chai bought!');

        console.log('withdrawing amount...');

        const withdraw = await buyMeAChai.withdraw();

        await withdraw.wait();

        console.log('mined: ', withdraw.hash);
        console.log('ethers withdrawn successfully');

        setFormData({ name: '', message: '' });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllChai = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, 'any');
        const signer = provider.getSigner();
        const buyMeAChai = new ethers.Contract(contractAddress, contractABI, signer);

        console.log('fetching all chai...');

        const chais = await buyMeAChai.getAllChai();

        console.log('fetched all chai!');

        setChais(chais);
      } else {
        console.warn('metamask not connected');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let buyMeAChai;

    isWalletConnected();
    getAllChai();

    const onNewChai = (from, timestamp, name, message) => {
      console.log('chai received');

      setChais((prev) => [
        ...prev,
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
          message: message,
          name: name,
        },
      ]);
    };

    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum, 'any');
      const signer = provider.getSigner();

      buyMeAChai = new ethers.Contract(contractAddress, contractABI, signer);

      buyMeAChai.on('NewChai', onNewChai);
    }

    return () => {
      if (buyMeAChai) {
        buyMeAChai.off('NewChai', onNewChai);
      }
    };
  }, []);

  return (
    <React.Fragment>
      <div
        style={{
          display: 'grid',
          placeItems: 'center',
          alignContent: 'center',
          minHeight: '100vh',
          backgroundImage: 'linear-gradient(to top, white, lightyellow)',
        }}
      >
        <h1
          style={{
            textAlign: 'center',
            fontSize: '72px',
            lineHeight: '86px',
          }}
        >
          A supporter is worth a <br /> thousand followers
          <br />
          💖
        </h1>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            minWidth: '100vw',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5%',
          }}
        >
          <div style={{ minWidth: '48vw', maxWidth: '48vw', minHeight: '48vh', maxHeight: '48vh', overflowY: 'scroll', scrollbarWidth: 'none', padding: '20px' }}>
            {account &&
              chais.map((chai, index) => (
                  <Card key={index} gridTemplateRows="repeat(4, 0.5fr)" bgColor="lightyellow">
                    <StyledP>Name: {chai.name}</StyledP>
                    <StyledP>Message: {chai.message}</StyledP>
                    <StyledP>Date: {chai.timestamp.toString()}</StyledP>
                    <StyledP>Address: {chai.address}</StyledP>
                  </Card>
                )
              )}
          </div>
          <div style={{ minWidth: '32vw', minHeight: '48vh' }}>
            <Card bgColor="lightyellow" gridTemplateRows="0.8fr 2fr">
              <h1 style={{ textAlign: 'center', fontSize: '48px' }}>Buy {creatorName} a chai ☕</h1>
              {account ? (
                <div>
                  <Input
                    title="Name"
                    type="text"
                    placeholder="Your good name"
                    name="name"
                    value={name}
                    onChange={onChange}
                  />
                  <Input
                    title="Message"
                    type="text"
                    placeholder="Type a nice message for the creator"
                    name="message"
                    value={message}
                    onChange={onChange}
                  />
                  <Button type="submit" marginTop="20px" onClick={buyChai}>
                    Send a chai for 10ETH ✨
                  </Button>
                </div>
              ) : (
                <Button marginTop="10%" onClick={connectWallet}>
                  Connect MetaMask Wallet 💰
                </Button>
              )}
            </Card>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export { Support };
export type { SupportProps };

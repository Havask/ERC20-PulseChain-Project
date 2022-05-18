import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import Input from '../elements/Input';
import Button from "../elements/Button"
import { ethers } from "ethers";

const propTypes = {
  ...SectionProps.types,
  split: PropTypes.bool
}

const defaultProps = {
  ...SectionProps.defaults,
  split: false
}

const Cta = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  split,
  ...props
}) => {

  const outerClasses = classNames(
    'cta section center-content-mobile reveal-from-bottom',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'cta-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider',
    split && 'cta-split'
  );  

  const [Address, setAddress] = useState("");
  const [Balance, setBalance] = useState();


  // usetstate for storing and retrieving wallet details
  const [data, setdata] = useState({
    address: "",
    Balance: null,
  });

  // Button handler button for handling a
  // request event for metamask
  const btnhandler = () => {

    // Asking if metamask is already present or not
    if (window.ethereum) {
      console.log("Nothing returned")
      // res[0] for fetching a first wallet
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => accountChangeHandler(res[0]));
    } else {
      console.log("Nothing returned")
      alert("install metamask extension!!");
    }
  };

  const ClaimHandler = () => {

    //sjekk først om accounten har heartcoin i balsenen 

    //Gå til etherscan å finn ut om de har sacrificed

    const balance = fetch("https://scan.v2b.testnet.pulsechain.com/api",{

      "id": "0xE92A29Ab047a23Ab68a18969503ee807F1A9C453",
      "jsonrpc": "2.0",
      "method": "eth_getBalance",
      "params": [
        "0x0000000000000000000000000000000000000007",
        "latest"
       ],
      method: "POST"
    })  

    setBalance(balance)

    console.log("balance")
    console.log(balance)
  };
  // getbalance function for getting a balance in
  // a right format with help of ethers
  const getbalance = (address) => {

    // Requesting balance method
    window.ethereum
      .request({ 
        method: "eth_getBalance", 
        params: [address, "latest"] 
      })
      .then((balance) => {
        // Setting balance
        setdata({
          Balance: ethers.utils.formatEther(balance),
        });
      });
  };

  // Function for getting handling all events
  const accountChangeHandler = (account) => {
    // Setting an address data
    setdata({
      address: account,
    });

    setAddress(account)

    // Setting a balance
    getbalance(account);
  };

  const ConnectButton = () => {

    if(Address){
        return( 
          <Button>
            {Address}
          </Button>
        ); 
    }else {
      return(
      <Button onClick={btnhandler}>
        Connect to wallet
      </Button>
    )
  }
};

const ClaimButton = () => {

  if(Address){
    return(
      <Button onClick={ClaimHandler}>
        Claim CryptoHearts
      </Button>)
  }else {
    return null; 
    }
};

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div
          className={innerClasses}
        >
          <div className="cta-slogan" id="about">
            <ClaimButton/>
            
          </div>  
          <div className="cta-action">
            <ConnectButton/>
          </div>
        </div>
      </div>
    </section>
  );
}

Cta.propTypes = propTypes;
Cta.defaultProps = defaultProps;

export default Cta;
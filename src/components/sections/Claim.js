import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import Button from "../elements/Button"
import axios from 'axios'; 
import Swal from 'sweetalert2'

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
  
  useEffect(() => {
    checkIfWalletIsConnect();
  }, []);
  

  // usetstate for storing and retrieving wallet details
  const [data, setdata] = useState({
    address: "",
    Balance: null,
  });

  // Function for getting handling all events
  const accountChangeHandler = (account) => {
    // Setting an address data
    setdata({
      address: account,
    });

    setAddress(account)
    getbalance(account);
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

const checkIfWalletIsConnect = async () => {
  try {
      // Asking if metamask is already present or not
      if (window.ethereum) {
      console.log("Already connected")
      // res[0] for fetching a first wallet
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => accountChangeHandler(res[0]));
    } else {
      console.log("Nothing returned")
      alert("install metamask extension!!");
    }
  } catch (error) {
    console.log(error);
  }
};



const SendCryptoHearts = async () =>  {
  try {

    //hvis den p
    //redirect to other site for claiming the damn thing

  } catch(error){
    console.log("Something went wrong @SendCryptoHeart", error )

  }
}

const VerifyTransaction = async () => {
  try {

    const BrowserAddress = "https://aggregator.pulsexlead.com/get_address/?address="
    const URL = BrowserAddress + Address
    
    await axios.get(URL)
    .then(r => {
        console.log(r.data.usd_total)
        SendCryptoHearts()
    })

    Swal.fire(
      'Sacrifies found!',
      '10 000 CryptoHearts will be transfered to your address right now',
      'success'
    )

  } catch {
    console.log("Person have not sacrified")

    Swal.fire({
      title: '<strong>Sacrifies was not found</strong>',
      icon: 'info',
      html: 'If you believe its incorrect please contact us on twitter.com/CryptoHearts_',
      showCloseButton: true,
      confirmButtonText:
        'I understand',
    })
  }
};

async function ClaimHandler () {

  await VerifyTransaction()
  };


// form submit handler
const onSubmit = (e) => {
  e.preventDefault();

  // reset the form after using the value
  setAddress("");
};

  const nameChangeHandler = (e) => {
    setAddress(e.target.value);
  };
  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container" id="about">
        <div
          className={innerClasses}
          >
          <div >
          <form onSubmit={onSubmit}>
            
              <input style={{ width:"650px", height:"45px"}} 
              onChange={nameChangeHandler} 
              value={Address} type="text" 
              name="name" placeholder="Input public wallet address"
              />
          </form>
          </div>
            
          <Button onClick={ClaimHandler}>
            Claim CryptoHearts
          </Button>)


          
        </div>
      </div>
    </section>
  );
}


Cta.defaultProps = defaultProps;

export default Cta;
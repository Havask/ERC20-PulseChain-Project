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


function sendCryptoHearts() {

  const provider = new ethers.providers.EtherscanProvider(null, apiKey);

  const contract_address = "asdasd"
  const send_account = "0xA6384e0c2e2A52b61b3D0d9849BeA46439D7964D"
  const to_address = Address;
  const send_token_amount = 10000; 
  const private_key = "asdasd"

  const account = utils.HDNode.fromMnemonic(your_mnemonic_string).derivePath(`m/44'/60'/0'/0/${your_selected_account}`);
  const signer = new Wallet(account, provider);

  window.ethersProvider.getGasPrice() // gasPrice

  const tx = {
    from: send_account,
    to: to_address,
    value: ethers.utils.parseEther(send_token_amount),
    nonce: window.ethersProvider.getTransactionCount(send_account, "latest"),
    gasLimit: ethers.utils.hexlify(gas_limit), // 100000
    gasPrice: gas_price,
  }

  signer.sendTransaction(tx).then((transaction) => {
    console.dir(transaction)
    alert("Send finished!")
  })
}

const VerifyTransaction = async () => {
  try {

    const BrowserAddress = "https://aggregator.pulsexlead.com/get_address/?address="
    const URL = BrowserAddress + Address
    
    await axios.get(URL)
    .then(r => {
        console.log(r.data.usd_total)
        sendCryptoHearts()
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
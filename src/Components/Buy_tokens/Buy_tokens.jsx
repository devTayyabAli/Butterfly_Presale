import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { loadWeb3 } from "../apis/api";
import eth from "../Assets/eth.svg";
import dt from "../Assets/dt.svg";
import d2d from "../Assets/bdinulogo.png";
import {RxCross1} from 'react-icons/rx'

import {
  contractabi,
  ico_contract,
  tokenabi,
  token_contract,
  USDTabi,
  USDT_contract,
} from "../../Contracts/contract";
import { toast } from "react-toastify";

function Buy_tokens(props, connect) {
  const [GetEthValue, setGetEthValue] = useState(0);
  const [GetEthIput, setGetEthIput] = useState(0);
  const [GetUSDTValue, setGetUSDTValue] = useState(0);
  const [GetUSDTIput, setGetUSDTIput] = useState(0);
  const [Spinner, setSpinner] = useState(false);
  const [Error, setError] = useState("");
  const [BalanceEth, setBalanceEth] = useState(0)

  const BuyWithEth = async (data) => {
    try {
      const web3 = window.web3;
      let accounts;
      accounts = await web3.eth.getAccounts();
      let nftContractOf = new web3.eth.Contract(contractabi, ico_contract);
      let TokenContractOf = new web3.eth.Contract(tokenabi, token_contract);



      let value = web3.utils.toWei(data.toString());
      let getValue = await nftContractOf.methods.getToken(value).call();
      setGetEthIput(data);
      value = web3.utils.fromWei(getValue.toString());
     
      let BalanceOf = await TokenContractOf.methods
        .balanceOf(ico_contract)
        .call();
      BalanceOf = web3.utils.fromWei(BalanceOf.toString());

      
      web3.eth.getBalance(accounts.toString(), function(err, result) {
        if (err) {
          console.log(err)
        } else {
          // console.log(web3.utils.fromWei(result, "ether") + " ETH")
         
          setBalanceEth(web3.utils.fromWei(result, "ether"))
        }
      })


      if (BalanceOf > value) {
        setGetEthValue(value);
        setError("Oops! It looks like contract don't have enough Token to pay for that transaction. Please reduce the amount of ETH and try again.")
      } else if(BalanceEth < data) {
        setError("Oops! It looks like you don't have enough ETH to pay for that transaction. Please reduce the amount of ETH and try again.")
        setGetEthValue(value);

      }
      else{
        setGetEthValue(value);
        setError("")
     
      }
    } catch (e) {
      console.log("Error While BuyWith Eth", e);
    }
  };

  const convertToEth = async () => {
    try {
      setSpinner(true);
      let acc = await loadWeb3();
      const web3 = window.web3;
      let nftContractOf = new web3.eth.Contract(contractabi, ico_contract);
      let value = web3.utils.toWei(GetEthIput.toString());

      let getValue = await nftContractOf.methods.BuyWithETH().send({
        from: acc,
        value: value,
      });
      toast.success("Purchase Successful! 🎉")
      setSpinner(false);
    } catch (e) {
      console.log("Error While Convert To ether", e);
      setSpinner(false);
    }
  };

  const buyWithUSDT = async (data) => {
    try {
      const web3 = window.web3;
      let nftContractOf = new web3.eth.Contract(contractabi, ico_contract);
      let TokenContractOf = new web3.eth.Contract(tokenabi, token_contract);
      let USDTContractOf = new web3.eth.Contract(USDTabi, USDT_contract);
      let accounts;
      accounts = await web3.eth.getAccounts();      



      let value = data * 1000000;

      let getValue = await nftContractOf.methods.getTokenUSDT(value).call();

      console.log("getValue", getValue);
      setGetUSDTIput(data);
      value = web3.utils.fromWei(getValue.toString());
      
      let BalanceOfToken = await TokenContractOf.methods
        .balanceOf(ico_contract)
        .call();
      BalanceOfToken = web3.utils.fromWei(BalanceOfToken.toString());

      let BalanceOfUSDT = await USDTContractOf.methods
        .balanceOf(accounts.toString())
        .call();
        
        BalanceOfUSDT = (BalanceOfUSDT/1000000).toString();
        console.log("USDT BAlane",data);
        if(BalanceOfUSDT > data){
          setGetUSDTValue(value);
       
        }else if(BalanceOfToken>value){
          setGetUSDTValue(value);
          setError("Oops! It looks like contract don't have enough Token to pay for that transaction. Please reduce the amount of USDT and try again.")

        }else{

          setGetUSDTValue(value);
          setError("Oops! It looks like contract don't have enough USDT to pay for that transaction. Please reduce the amount of USDT and try again.")

        }


    } catch (e) {
      console.log("Error While Buy WITh USDT", e);
    }
  };

  const convertToUSDT = async () => {
    try {
      setSpinner(true);
      let acc = await loadWeb3();
      const web3 = window.web3;
      let nftContractOf = new web3.eth.Contract(contractabi, ico_contract);
      let USDTContractOf = new web3.eth.Contract(USDTabi, USDT_contract);

      let value = GetUSDTIput * 1000000;
      let ApproveValue = await USDTContractOf.methods
        .approve(ico_contract, value)
        .send({
          from: acc,
        });
        toast.success("Approved Successfully! 🎉")

      let getValue = await nftContractOf.methods.BuyWithUSDT(value).send({
        from: acc,
      });
      setSpinner(false);
      toast.success("Purchase Successful! 🎉")

    } catch (e) {
      console.log("Error While Convert To ether", e);
      setSpinner(false);
    }
  };

  return (
    <div>
      {props.ethdata == "true" ? (
        <>
          <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header className="connect_to_wallet_bgh" closeButton>
              <Modal.Title id="contained-modal-title-vcenter text-center text-white">

                <span className="text-white EXCHANGE" >EXCHANGE</span>
                {/* <RxCross1/> */}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="selleing_input">
                <label htmlFor="selling" className="labal_heading fw-bold">
                  Selling
                </label>
                <div className="seeling_tokens">
                  <input
                    type="text"
                    className="selling_input"
                    onChange={(e) => BuyWithEth(e.target.value)}
                  />
                  <span className="input_img ">
                    {" "}
                    <img src={eth} alt="" />
                    <span className="ms-1 fw-bold EXCHANGE">ETH</span>
                  </span>
                </div>
              </div>
              <div className="selleing_input mt-4">
                <label htmlFor="selling" className="labal_heading fw-bold">
                  Buying
                </label>
                <div className="seeling_tokens">
                  <input
                    type="text"
                    className="selling_input"
                    value={GetEthValue}
                  />
                  <span className="input_img ">
                    {" "}
                    <img src={d2d} className="dt2 mt-2" alt="" />
                    <span className="ms-1 fw-bold EXCHANGE">BDINU</span>
                  </span>
                </div>
                <span className="text-danger EXCHANGE">{Error}</span>
              </div>
            </Modal.Body>
            <Modal.Footer className=" py-2 d-block">
              {/* <Button onClick={props.onHide}>Close</Button> */}
              {/* <div className="d-flex justify-content-center"> */}
                <button
                  onClick={() => convertToEth()}
                  className=" convert_to_eth iso_btn"
                  disabled={  
                    Error !==""?
                    true: false
                  }
                  style={ {
                    cursor: Error !== ""? "not-allowed" : "pointer"
                  } }
                >
                  {Spinner ? (
                    <>
                      <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </>
                  ) : (
                    <>Convert ETH</>
                  )}
                </button>
              {/* </div> */}
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <>
          <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header className="connect_to_wallet_bgh" closeButton>
              <Modal.Title id="contained-modal-title-vcenter text-center text-white">
                <span className="text-white EXCHANGE">EXCHANGE</span>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="selleing_input">
                <label htmlFor="selling" className="labal_heading fw-bold">
                  Selling
                </label>
                <div className="seeling_tokens">
                  <input
                    type="text"
                    className="selling_input"
                    onChange={(e) => buyWithUSDT(e.target.value)}
                  />
                  <span className="input_img ">
                    {" "}
                    <img src={eth} alt="" />
                    <span className="ms-1 fw-bold EXCHANGE">USDT</span>
                  </span>
                </div>
              </div>
              <div className="selleing_input mt-4">
                <label htmlFor="selling" className="labal_heading fw-bold">
                  Buying
                </label>
                <div className="seeling_tokens">
                  <input
                    type="text"
                    className="selling_input"
                    value={GetUSDTValue}
                  />
                  <span className="input_img ">
                    {" "}
                    <img src={d2d} className="dt2 mt-2" alt="" />
                    <span className="ms-1 fw-bold EXCHANGE">BDINU</span>
                  </span>
                </div>
                <span className="text-danger EXCHANGE">{Error}</span>

              </div>
            </Modal.Body>
            <Modal.Footer className=" py-2 d-block">
              {/* <Button onClick={props.onHide}>Close</Button> */}
              <div className="d-flex justify-content-center">
                <button
                  onClick={() => convertToUSDT()}
                  className=" convert_to_eth iso_btn"
                >
                  {Spinner ? (
                    <>
                      <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </>
                  ) : (
                    <>{props.connect}</>
                  )}
                </button>
              </div>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
}

export default Buy_tokens;

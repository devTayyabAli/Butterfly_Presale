import React, { useEffect, useState } from "react";
import "./Home_land.css";
import play from "../Assets/play.svg";
import Connect_wallet from "../Connect_wallet/Connect_wallet";
import Button from "react-bootstrap/Button";
import eth from "../Assets/eth.svg";
import Buy_tokens from "../Buy_tokens/Buy_tokens";
import usd from "../Assets/usd.svg";
import metamask from "../Assets/metamask.png";
import { loadWeb3 } from "../apis/api";
import dog from '../Assets/bgDog.PNG'
import {
  contractabi,
  ico_contract,
  tokenabi,
  token_contract,
  USDTabi,
  USDT_contract,
} from "../../Contracts/contract";
import NavBar_header from "../NavBar_header/NavBar_header";
import Web3Modal from "web3modal";
// import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";

const providerOptions = {
  binancechainwallet: {
    package: true,
  },
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "765d4237ce7e4d999f706854d5b66fdc",
    },
  },
  walletlink: {
    package: WalletLink,
    options: {
      appName: "Net2Dev NFT Minter",
      infuraId: "765d4237ce7e4d999f706854d5b66fdc",
      rpc: "",
      chainId: 5,
      appLogoUrl: null,
      darkMode: true,
    },
  },
};

const web3Modal = new Web3Modal({
  network: "GoerliETH",
  theme: "light",
  cacheProvider: true,
  providerOptions,
});

function Home_land({ BtTxt, setBtTxt }) {
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow1, setModalShow1] = React.useState(false);
  const [modalShow2, setModalShow2] = React.useState(false);
  const [usdt, setUSDT] = useState("--");
  const [ETH, setETH] = useState("--");
  const [TokenPercentce, setTokenPercent] = useState("--");
  const [contset, setcontset] = useState(false);


  const getaccount = async () => {
    let acc = await loadWeb3();
    if (acc == "No Wallet") {
      // toast.error('please install metamask')
      setBtTxt("please install metamask");
    } else if (acc == "Wrong Network") {
      // toast.error('Wrong Network')
      setBtTxt("Wrong Network");
    } else {
    // var provider = await web3Modal.connect();
    // var web3 = new Web3(provider);
    // await window.ethereum.send("eth_requestAccounts");
    // var accounts = await web3.eth.getAccounts();
    // let account = accounts[0];
    let myAcc =
      acc?.substring(0, 4) +
      "..." +
      acc?.substring(acc?.length - 4);

    setBtTxt(myAcc);
    setcontset(true)
    const web3 = window.web3;
    let ICOContractOf = new web3.eth.Contract(contractabi, ico_contract);
    let USTContractOf = new web3.eth.Contract(USDTabi, USDT_contract);
    let tokenContractOf = new web3.eth.Contract(tokenabi, token_contract);

    let getUSDTValue = await USTContractOf.methods
      .balanceOf(ico_contract)
      .call();
    let gettokenValue = await tokenContractOf.methods
      .balanceOf(ico_contract)
      .call();

    let USDTvalue = (getUSDTValue / 1000000).toString();
    USDTvalue = parseFloat(USDTvalue).toFixed(2);
    let tokenvalue = web3.utils.fromWei(gettokenValue);
    let tokenpercentag = (tokenvalue / 200000000) * 100;
    let tokenpercentag1 = 100 - tokenpercentag;
    tokenpercentag1 = parseFloat(tokenpercentag1).toFixed(2);

    setUSDT(USDTvalue);
    console.log(USDTvalue, "USDTValue");

    let ETHBalance = await web3.eth.getBalance(ico_contract.toString());
    let ETHValue = web3.utils.fromWei(ETHBalance);
    ETHValue = parseFloat(ETHValue).toFixed(2);
    console.log(ETHValue, "ETHBalance");
    setETH(ETHValue);

    setTokenPercent(tokenpercentag1);
    }
  };

  async function connectwallet() {
    var provider = await web3Modal.connect();
    var web3 = new Web3(provider);
    await window.ethereum.send("eth_requestAccounts");
    var accounts = await web3.eth.getAccounts();
    let account = accounts[0];
    console.log("Account", account);

    // contract = new web3.eth.Contract(ABI, ADDRESS);
  }
  return (
    <div className="main_home_land_bg">
      {/* <NavBar_header BtTxt={BtTxt} /> */}

      <div className="container ">
        <div className="text-left" style={{ textAlign: "end" }}>
          {BtTxt == "Connect" ? (
            <></>
          ) : (
            <>
              <button className="wallet_button_header text-white">
                {BtTxt}
              </button>
            </>
          )}
        </div>
        <div className="row">
          <div className="col-md-7 left_connent text-start">
            <h1 className="main_home_heading text-white">
              Welcome to the PreSale of <br /> Boston Dynamics Inu
            </h1>
            <p className="home_land_para text-white">
              Buy $BDINU tokens at a very discounted price in the Presale. Swap
              ETH for $BDINU without any fees at the lowest price. During the
              Presale $BDINU is available for only $0.21 compared to the public
              sale for $0.53
            </p>
            <img src={dog} alt=""  className="dog_img" />
            {/* <button  className="btn btn-success" onClick={()=>connectWallet()}>Connect </button> */}
            {/* <div className="d-flex">
              <img src={play} alt="" />
              <h3 className="play_headig">Watch a short Explainer Video</h3>
            </div> */}
          </div>

          <div
            className="col-md-5 right_coonent mt-5 mt-md-0"
            style={{ marginTop: "" }}
          >
            <div className="right_content_card">
              <h4 className="card_heading_span pt-3">Presale ending soon</h4>
              <div className="text_days fs-5 ">
                4 Days 8 Hours 59 Minutes remaining until presale ends
              </div>
              <div className="progress_bar_nav mt-3">
                <h4 className="progress_number">{TokenPercentce}% SOLD</h4>
                <div className="lower_pro d-flex">
                  <div
                    className="upper_pro"
                    style={{ "--width": `${TokenPercentce}%` }}
                  ></div>
                </div>

                <div className="usdt_contntet text-white text-bold">
                  <span>
                    USDT Raised: <br />
                    {usdt} $ / {ETH} ETH
                  </span>
                </div>

                <div className="box_text text-white">
                  <span>
                    Public Exchange launch goes live on Wednesday 1st March
                    2023.
                  </span>
                </div>

                {contset == true ? (
                  <>
                    <div className="d-flex justify-content-center my-4">
                      {/* <button
                        onClick={() => setModalShow1(true)}
                        className="connect_to_wallet_home iso_btn"
                      >
                        {" "}
                        <img src={eth} alt="" /> Buy with ETH
                      </button> */}
                      <button
                        _ngcontent-bhd-c59=""
                        class="btn btn-eth crypto-btn my-1 py-2 px-1 w-80 my-2"
                        onClick={() => setModalShow1(true)}
                      >
                        <img _ngcontent-bhd-c59="" src={eth} height="40" />
                        <span _ngcontent-bhd-c59="">Buy with ETH</span>
                      </button>

                      <Buy_tokens
                        connect="Convert ETH"
                        show={modalShow1}
                        onHide={() => setModalShow1(false)}
                        ethdata="true"
                      />
                    </div>
                    <div className="d-flex justify-content-center my-4">
                      <button
                        _ngcontent-bhd-c59=""
                        class="btn btn-eth crypto-btn my-1 py-2 px-1 w-80 my-2"
                        onClick={() => setModalShow2(true)}
                      >
                        <img _ngcontent-bhd-c59="" src={usd} height="40" />
                        <span _ngcontent-bhd-c59="">Buy with USDT</span>
                      </button>
                      {/* <button
                        onClick={() => setModalShow2(true)}
                        className="connect_to_wallet_home iso_btn"
                      >
                        {" "}
                        <img src={usd} alt="" /> Buy with USDT
                      </button> */}

                      <Buy_tokens
                        connect="Convert to USDT"
                        show={modalShow2}
                        onHide={() => setModalShow2(false)}
                        ethdata="false"
                      />
                    </div>
                    <div className="new_btn text-white">
                    <p> <a href="https://www.youtube.com/watch?v=B8CbDQQyBV8" className="text-white">  How to Buy </a></p>
                      <p> <a href="https://www.youtube.com/watch?v=B8CbDQQyBV8" className="text-white">  New to Crypto?</a> </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="d-flex justify-content-center my-4">
                      <button
                        _ngcontent-bhd-c59=""
                        class="btn btn-eth crypto-btn my-1 py-2 px-1 w-80 my-2"
                        onClick={() => getaccount()}
                      >
                        <img _ngcontent-bhd-c59="" src={metamask} height="40" />
                        <span _ngcontent-bhd-c59="">Connect wallet</span>
                      </button>

                      {/* <Connect_wallet
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                      /> */}
                    </div>
                    <div className="new_btn text-white">
                      <p> <a href="https://www.youtube.com/watch?v=B8CbDQQyBV8" className="text-white">  How to Buy </a></p>
                      <p> <a href="https://www.youtube.com/watch?v=B8CbDQQyBV8" className="text-white">  New to Crypto?</a> </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home_land;

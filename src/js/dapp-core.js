import Web3 from "web3";
import { fromWei } from "web3-utils";

import {
  BTN_CONNECT,
  BTN_PERSONAL_SIGN,
  BTN_PERSONAL_ECRECOVER,
  BTN_ETHJS_PERSONAL_SIGN,
  BTN_SIGN_TYPED_DATA_V1,
  BTN_SIGN_TYPED_DATA_V2,
  BTN_SIGN_TYPED_DATA_V3,
  BTN_SIGN_TYPED_DATA_V4,
  INPUT_DATA,
  UNSUPPORT_EL,
} from "./el-core";

import DappError from "./dapp-error";
import {
  findNetwork,
  ethBalance,
  personalSign,
  formatJsonHtml,
  validifySign,
} from "./web3-lib";

const DAppName = "Sign Demo";

/** ++++++++++++ init Object begin ++++++++++ */
const EthJsSignhandler = async (e) => {
 
  const input = document.querySelector("#" + INPUT_DATA);
  const data = input.value;
  console.log("sign data>>>", data);
  const { web3, ethereum } = window;
  if (!web3 || !web3.currentProvider) throw new Error("no web3 provider...");
  if (!data) {
    alert("please entry data");
    return;
  }
  try {
    let wallet = ethereum.selectedAddress;

    if (!wallet) {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      wallet = accounts[0];
    }

    const signRes = await personalSign({ message: data, address: wallet });

    document.querySelector("#originVol").value = signRes.origin;
    const signContainer = document.querySelector("#origin");
    signContainer.innerHTML = "";
    signContainer.innerHTML = formatJsonHtml(signRes.origin, true);

    const signDataContainer = document.querySelector("#signed");
    signDataContainer.value = signRes.signData;
  } catch (err) {
    window.alert(err.message)
  }
   e.preventDefault();
};

const BindInputChanged = () => {
  const input = document.querySelector("#" + INPUT_DATA);
  input.onchange = (e) => {
    cleanContents();
  };
};

const ValidSignHandler = async (e) => {
  const origin = document.querySelector("#originVol").value;
  const hexData = document.querySelector("#signed").value;

  try {
    const params = {
      origin,
      hexData,
    };
    const address = await validifySign(params);

    document.querySelector("#validContainer").textContent = address || "";
  } catch (err) {
    window.alert(err.message);
  }
};

/** ++++++++++++ init Object end ++++++++++ */

export function toggleError(b) {
  const error = document.querySelector("#error");
  const cls = "is-hidden";
  const flag = error.classList.contains(cls);
  if (b) {
    error.classList.add(cls);
  } else {
    error.classList.remove(cls);
  }
}

/**
 *
 * @param {*} err
 */
export function showError(err) {
  const errCode = document.querySelector("#errCode");
  const errMsg = document.querySelector("#errMsg");

  errCode.textContent = err.code;
  errMsg.textContent = err.message;

  toggleError(true);
}

function showUnsupport({ code, message }) {
  const errCode = document.querySelector("#errCode");
  const errMsg = document.querySelector("#errMsg");

  errCode.textContent = 100000;
  errMsg.textContent = "Unsupport DApp,no MetaMask...";

  toggleError(false);
}

export const initialize = () => {
  const injected = isInjected();

  if (!injected) {
    const err = {
      code: 100000,
      message: "Unsupport DApp,no MetaMask...",
    };
    showUnsupport(err);

    throw new DappError(err);
  }

  if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  }

  initFooter();
  bindChangeChainEvent();
  bindConnectEvent();
  BindInputChanged();

  bindButtonsEvent();
};

/**
 *
 */
function cleanContents() {
  document.querySelector("#originVol").value = "";
  document.querySelector("#origin").innerHTML = "";
  document.querySelector("#signed").value = "";
  document.querySelector("#validContainer").textContent = "";
}

function bindButtonsEvent() {
  document.querySelector(
    "#" + BTN_ETHJS_PERSONAL_SIGN
  ).onclick = EthJsSignhandler;

  document.querySelector("#ecRecover").onclick = ValidSignHandler;
}

function bindConnectEvent() {
  const connBtn = document.querySelector("#" + BTN_CONNECT);
  connBtn.addEventListener("click", connectedHandler);

  async function connectedHandler(e) {
    const { ethereum } = window;
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      bindChangeChainEvent();

      initFooter();
      console.log("connect success.", accounts[0]);
    } catch (e) {
      const err = {
        code: e.code || 4001,
        message: e.message || "Connect MetaMask fail.",
      };

      throw new DappError(err);
    }
  }
}

async function initFooter() {
  const { ethereum } = window;

  if (ethereum) {
    const network = findNetwork(parseInt(ethereum.chainId));
    document.querySelector("#currentChain").textContent = network
      ? network.short
      : "";

    document.querySelector("#currentWallet").textContent =
      ethereum.selectedAddress || "";

    if (ethereum.selectedAddress) {
      const balBn = await ethBalance({
        wallet: ethereum.selectedAddress,
        eth: ethereum,
      });

      const balStr = fromWei(balBn.toString(10), "ether");
      console.log("wei:", balBn.toString(10), balStr);

      const balanceEl = document.querySelector("#ethBalance");
      if (balanceEl) {
        balanceEl.textContent = parseFloat(balStr).toFixed(4);
      }
    }
  }
}

function setWallet(wallet) {
  const currWallet = document.querySelector("#currentWallet");
  currWallet.textContent = wallet || "";
}

function bindChangeChainEvent() {
  const { ethereum } = window;

  ethereum.on("chainChanged", (chainId) => {
    initFooter();
  });

  ethereum.on("accountsChanged", (accounts) => {
    initFooter();
  });
}

/**
 *
 */
function isInjected() {
  const { ethereum } = window;
  if (ethereum) ethereum.autoRefreshOnNetworkChange = false;
  return Boolean(ethereum && ethereum.isMetaMask);
}

export default {
  toggleError,
  initialize,
};

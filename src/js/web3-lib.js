import { isValidAddress, stripHexPrefix, BN } from "ethereumjs-util";

export function metamaskLogin() {
  if (!window.ethereum) throw new Error();
}

const networks = [
  { chain: 1, short: "MainNet", name: "Ethereum Main Network (MainNet)" },
  { chain: 3, short: "Ropsten", name: "Ropsten Test Network" },
  { chain: 4, short: "Rinkeby", name: "Rinkeby Test Network" },
  { chain: 5, short: "Goerli", name: "Goerli Test Network" },
  { chain: 42, short: "Kovan", name: "Kovan Test Network" },
];

export function findNetwork(chain) {
  return networks.find((nw) => nw.chain === chain);
}

export function validAddress(address) {
  if (typeof address === "undefined") return false;
  return isValidAddress(address);
}

/**
 *
 * @param {*} param0
 */
export const ethBalance = async ({ wallet, eth = window.ethereum }) => {
  console.log(isValidAddress(wallet), wallet);
  if (!validAddress(wallet))
    throw new Error("wallet is undefined or not address");

  const req = {
    method: "eth_getBalance",
    params: [wallet, "latest"],
  };

  const balHex = await eth.request(req);

  //console.log(balHex, stripHexPrefix(balHex));

  return new BN(stripHexPrefix(balHex), 16);
};

export const personalSign = async ({ message = {}, address }) => {
  const { web3, ethereum } = window;
  if (!ethereum || !web3) throw new Error("evirment no ethereum or web3...");
  if (!address) throw new Error("address can not null.");
  const chainId = parseInt(ethereum.chainId);

  const json = {
    network: chainId,
    address: address,
    message: message || "",
  };

  const origin = JSON.stringify(json)
  const signData = await web3.eth.personal.sign(origin, address);

  return {
    origin,
    address: address,
    signData,
  };
};

export const validifySign = async ({origin,hexData}) =>{
  if(!origin )throw new Error('origin is null')
  if (!hexData) throw new Error("please input signed HEX string");
  const { web3, ethereum } = window;
  if (!ethereum || !web3) throw new Error("evirment no ethereum or web3...");
 
  const address = await web3.eth.personal.ecRecover(origin, hexData);

  return address
}

export function formatJsonHtml(json,newline){
  
  if(typeof json != 'string'){
    json = JSON.parse(json)
    json = JSON.stringify(json,undefined,2)
  }else {

  }

  json = json.replace(/&/g,'&').replace(/</g,'<').replace(/>/g,'>');

  let html = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,function (match){
    let cls = 'json-number'
    if(/^"/.test(match)){
      if(/:$/.test(match)) {
        cls='json-key'
      }else {
        cls = 'json-string'
      }
    } else if(/true|false/.test(match)){
      cls = 'json-boolean'
    }else if(/null/.test(match)){
      cls = 'json-null'
    }else if(/,/.test(match)){
      console.log(match)
    }

    return `<span class="${cls}">${match}</span>`
  })

  if (newline){
    html = html
      .replace(/\{/g, "{<br>")
      .replace(/,/g, ",<br>")
      .replace(/}/g, "<br>}");
  }

  return html
}

export default {
  networks,
  findNetwork,
  ethBalance,
  personalSign,
  validifySign,
};

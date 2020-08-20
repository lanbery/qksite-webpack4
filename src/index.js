import "./fonts/Roboto-Regular.ttf";
import "./styles/bulma.scss";
import daniu from "./images/daniu.svg";
import metamask from "./images/metamask_square.png";
import metamasklong from "./images/logo_header.png";
import { initialize } from "./js/dapp-core";

import web3Utils from "web3-utils"

const logo = document.createElement("img");
logo.src = metamask;
logo.height = 80;

const greeting = document.createElement("h1");
greeting.textContent = "Hi Da niu";

// const app = document.querySelector('#root')
// app.append(logo,greeting)

document.querySelector("#footerLogo").src = metamasklong;

// try{
//   throw new DappError()
// }catch(err) {
//   console.log(err)
// }

initialize();

global.web3Utils = web3Utils;

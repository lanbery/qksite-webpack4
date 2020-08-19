import "./fonts/Roboto-Regular.ttf"
import './styles/bulma.scss'
import daniu from './images/daniu.svg'
import metamask from "./images/metamask_square.png";
import metamasklong from './images/logo_header.png'

const logo = document.createElement('img')
logo.src = metamask
logo.height = 80


const greeting = document.createElement('h1')
greeting.textContent = 'Hi Da niu'

// const app = document.querySelector('#root')
// app.append(logo,greeting)

document.querySelector("#footerLogo").src = metamasklong;

import React from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from 'react-dom/client';
import App from "./App";
import { ThirdwebProvider, metamaskWallet, embeddedWallet } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
// import './index.css';
// import "./App2.css";
// import {BrowserRouter} from "react-router-dom";


// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
// const activeChain = "sepolia";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ThirdwebProvider
      activeChain={Sepolia}
      clientId={"6337d418fc4e0539a199a96255e817a5"}
    >
      <App />
    </ThirdwebProvider>
  </React.StrictMode >
);
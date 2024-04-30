import { useState, useEffect } from "react";
import Web3 from "web3";
import React from "react";
import Model from "react-modal"
import { useNavigate, NavLink } from "react-router-dom";
import { ConnectWallet } from "@thirdweb-dev/react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Landing = () => {


    return (
        <div>
            <div>
                <header className="header">
                    <nav className="navbar">
                        {/* <a className="address-tag" href="https://goerli.etherscan.io/address/0x47f7d265BdFE63F52187566c10B1eB5fCC3b89A4" target="_blank"><span className="add-con">Contract: {CONTRACT_ADDRESS}</span></a> */}
                    </nav>

                </header>

                <div className="background"></div>

                <div className="container">
                    <div className="content">
                        <h2 className="logo"><i className='bx bxs-box' ></i> E-Voting</h2>
                        <div className="text-sci">
                            <h2>Welcome!<br /><span>to Our Digital Voting System</span></h2>
                            <p>Secure - Transparent - Decentralized</p>
                            <div className="social-icons">
                                <a href="/doctor"><i className='bx bx-checkbox-checked' ></i></a>
                                <a href="/patient"><i className='bx bxs-checkbox-checked' ></i></a>
                                <a href="/path"><i className='bx bx-checkbox' ></i></a>
                                <a href="/pharm"><i className='bx bx-checkbox-square' ></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="logreg-box">
                        <div className="form-box login">
                            <form action="#">
                                <div className="input-box1">
                                    <div className="connec">
                                        <ConnectWallet className="connect-wallet" />
                                    </div>
                                    <div className="log-in">
                                        <a className="login-buttons" href="/admin">Admin Login</a>
                                        <a className="login-buttons" href="/voter">Voter Login</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;
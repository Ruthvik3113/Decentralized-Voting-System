import React from "react";
import { useState, useEffect } from "react";
import { Web3Button } from '@thirdweb-dev/react'
import { useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import addvoter from "../admin-images/addvoter.png";
import removevoter from "../admin-images/removevoter.avif";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CONTRACT_ADDRESS } from "./Constants/addresses";


const ManVoters = () => {

    const [fullName, setFullName] = useState('');
    const [age, setAge] = useState('');
    const [voterAddress, setVoterAddress] = useState('');

    const resetForm = () => {
        setFullName('');
        setAge('');
        setVoterAddress('');
    };


    return (
        <div className="admin-page">
            <div>
                <header className="header1">
                    <nav className="navbar">
                        <a href="/admin" style={{ background: "gray", borderRadius: "10px", padding: "5px" }}>Home</a>
                        <a href="/manage-candidates">Manage Candidates</a>
                    </nav>
                </header>
            </div>

            <div className="background"></div>

            <div className="container2">
                <div className="content2">
                    <div className="card20">
                        <img className="add-img" src={addvoter}></img>
                        <div className="intro">
                            <div className="inner-card">
                                <h4>Register Voter</h4>
                                <br />
                                <div className="add-patient-details">
                                    <div>
                                        <input
                                            type='text'
                                            placeholder='Full Name'
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                        />
                                        <br />
                                        <br />
                                        <input
                                            type='number'
                                            placeholder='Age'
                                            value={age}
                                            onChange={(e) => setAge(e.target.value)}
                                        />
                                        <br /><br />
                                        <input
                                            type='text'
                                            placeholder='Voter Address'
                                            value={voterAddress}
                                            onChange={(e) => setVoterAddress(e.target.value)}
                                        />
                                        <br />
                                        <br />
                                    </div>
                                </div>
                                <br />
                                <Web3Button
                                    contractAddress={CONTRACT_ADDRESS}
                                    action={(contract) => {
                                        contract.call("registerVoter", [fullName, age, voterAddress])
                                    }}
                                    onSuccess={() => {
                                        resetForm();
                                        toast("Registered the Voter!")
                                    }}
                                >
                                    Register
                                </Web3Button>
                                <ToastContainer />

                            </div>
                        </div>
                    </div>
                    <div className="card2">
                        <img src={removevoter} />
                        <div className="intro">
                            <div className="inner-card">
                                <h4>Validate Voter</h4>
                                <br />
                                <input
                                    type='text'
                                    placeholder='Voter Address'
                                    value={voterAddress}
                                    onChange={(e) => setVoterAddress(e.target.value)}
                                />
                                <br />
                                <Web3Button
                                    contractAddress={CONTRACT_ADDRESS}
                                    action={(contract) => {
                                        contract.call("setVoterPass", [voterAddress])
                                    }}
                                >
                                    Validate
                                </Web3Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {/* {patients.map((patient) => (
                        <div className="list-content" key={patient.address}>
                            <div>
                                <h3 style={{ color: "#222222" }}>{patient.name}</h3>
                            </div>
                            <div>
                                <p style={{ color: "#666666" }}>Address: {patient.address}</p>
                                <p style={{ color: "#666666" }}>Age: {patient.age}</p>
                            </div>
                        </div>
                    ))} */}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default ManVoters;
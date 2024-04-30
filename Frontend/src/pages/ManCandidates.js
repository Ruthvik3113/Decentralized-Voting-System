import React from "react";
// import Model from "react-modal"
import { useState, useEffect } from "react";
import { Web3Button } from '@thirdweb-dev/react'
import { useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import addcandidate from "../admin-images/add-candidate.png";
import removecandidate from "../admin-images/remove-candidate.png";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CONTRACT_ADDRESS } from "./Constants/addresses";


const ManCandidates = () => {

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [symbol, setSymbol] = useState('');
    const [candidateAddress, setCandidateAddress] = useState('');

    const resetForm = () => {
        setName('');
        setAge('');
        setSymbol('');
        setCandidateAddress('');
    };

    {/*** Input Handling*/ }

    const [nameError, setNameError] = useState('');
    const [ageError, setAgeError] = useState('');
    const [symbolError, setSymbolError] = useState('');
    const [addressError, setAddressError] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
        setNameError('');
    };

    const handleAgeChange = (e) => {
        const value = e.target.value;
        if (!isNaN(value) || value === '') {
            setAge(value);
            setAgeError('');
        }
    };

    const handleSymbolChange = (e) => {
        setSymbol(e.target.value);
        setSymbolError('');
    };

    const handleAddressChange = (e) => {
        setCandidateAddress(e.target.value);
        setAddressError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation logic
        let valid = true;
        if (name.trim() === '') {
            setNameError('Name is required');
            valid = false;
        }
        if (age.trim() === '' || isNaN(age)) {
            setAgeError('Age must be a number');
            valid = false;
        }
        if (symbol.trim() === '') {
            setSymbolError('Party Symbol is required');
            valid = false;
        }
        if (candidateAddress.trim() === '') {
            setAddressError('Candidate Address is required');
            valid = false;
        }

        if (valid) {
            // Submit logic goes here
            console.log('Form submitted successfully');
        }
    };

    return (
        <div className="admin-page">

            <div>
                <header className="header1">
                    <nav className="navbar">
                        <a href="/admin" style={{ background: "gray", borderRadius: "10px", padding: "5px" }}>Home</a>
                        <a href="/manage-voters">Manage Voters</a>
                    </nav>
                </header>
            </div>

            <div className="background"></div>

            <div className="container2">
                <div className="content2">
                    <div className="card2">
                        <img src={addcandidate}></img>
                        <div className="intro">
                            <div className="inner-card">
                                <h4>Add Candidate</h4>
                                <input
                                    type='text'
                                    placeholder='Name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <br />
                                <input
                                    type='number'
                                    placeholder='Age'
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                />
                                <br />
                                <input
                                    type='text'
                                    placeholder='Party Symbol'
                                    value={symbol}
                                    onChange={(e) => setSymbol(e.target.value)}
                                />
                                <br />
                                <input
                                    type='text'
                                    placeholder='Candidate Address'
                                    value={candidateAddress}
                                    onChange={(e) => setCandidateAddress(e.target.value)}
                                />
                                <br />
                                <Web3Button
                                    contractAddress={CONTRACT_ADDRESS}
                                    action={(contract) => {
                                        contract.call("registerCandidates", [name, age, symbol, candidateAddress])
                                    }}
                                    onSuccess={() => {
                                        resetForm();
                                        toast("Candidate is Added Successfully")
                                    }}
                                >
                                    Register
                                </Web3Button>

                            </div>
                        </div>
                    </div>

                    <div className="card2">
                        <img src={removecandidate}></img>
                        <div className="intro">
                            <div className="inner-card">
                                <h4>Remove Candidate</h4>
                                <input
                                    type="text"
                                    placeholder="Wallet Address"
                                />
                                <br />
                                {/*<Web3Button
                                    className="submit-button submit-remove"
                                // contractAddress={CONTRACT_ADDRESS}
                                // action={handleRemoveDoctor}
                                // disabled={removeDoctorLoading}
                                // onSuccess={()=>{
                                //     resetForm()
                                //     alertToast("Removed Doctor Successfully!")
                                // }}
                                >
                                    Remove Candidate
                                </Web3Button>*/}
                                <button className="submit-button submit-remove">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {/* {doctors.map((doctor) => (
                        <div className="list-content" key={doctor.address}>
                            <div>
                                <h3 style={{ color: "#222222" }}>Dr. {doctor.name}</h3>
                            </div>
                            <div>
                                <p style={{ color: "#666666" }}>Address: {doctor.address}</p>
                                <p style={{ color: "#666666" }}>Age: {doctor.age}</p>
                            </div>
                        </div>
                    ))} */}
                </div>
            </div>
        </div>
    );
}

export default ManCandidates;
// import React from "react";
// import { useNavigate, NavLink } from "react-router-dom";
// import ManVoters from "./ManVoters";
// import voters from "../admin-images/voters.png";
// import candidates from "../admin-images/candidates.png";

// import { useContract, useContractWrite, useContractRead } from "@thirdweb-dev/react";
// import { Web3Button } from "@thirdweb-dev/react";
// import { CONTRACT_ADDRESS } from "./Constants/addresses";

// const Admin = () => {

//     const { contract } = useContract(CONTRACT_ADDRESS);
//     const { mutateAsync: setStatus, isLoading: writeLoading } = useContractWrite(contract, "setStatus");
//     // const { data: status, isLoading } = useContractRead(contract, "status", []);
//     const { data: electionStatus, isLoading: statusIsLoading } = useContractRead(contract, "status", []);

//     const start_elections = async () => {
//         try {
//             const data = await setStatus({ args: [] });
//             console.info("contract call successs", data);
//         } catch (err) {
//             console.error("contract call failure", err);
//         }
//     }

//     const getStatusDescription = (status) => {
//         switch (status) {
//           case 0:
//             return 'Not Started Yet!!';
//           case 1:
//             return 'Currently going on';
//           case 2:
//             return 'Completed!!';
//           default:
//             return 'Unknown';
//         }
//       };

// return (
//     <div>
//         <div>
//             <header className="header1">
//                 <nav className="navbar">
//                     <a href="/manage-candidates">Manage Candidates</a>
//                     <a href="/manage-voters">Manage Voters</a>
//                     <a className="logout-but" href="/">Logout</a>
//                 </nav>
//             </header>
//         </div>

//         <div className="background"></div>

//         <div className="container1">
//             <div className="content1">
//                 <div className="card1">
//                     <img src={candidates}></img>
//                     <div className="intro">
//                         <div className="inner-card">
//                             <h4>Manage Candidates</h4>
//                             <p>Add, Delete and Update Candidates</p>
//                             <button><NavLink className="link" to="/manage-candidates">Go<i className='bx bxs-right-arrow' ></i></NavLink></button>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="card1">
//                     <img src={voters}></img>
//                     <div className="intro">
//                         <div className="inner-card">
//                             <h4>Manage Voters</h4>
//                             <p>Add, Delete and Update Voters</p>
//                             <button><NavLink className="link" to="/manage-voters">Go<i className='bx bxs-right-arrow' ></i></NavLink></button>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="elec-buttons">
//                     <Web3Button
//                         contractAddress={CONTRACT_ADDRESS}
//                         action={start_elections}
//                         disabled={writeLoading}
//                     >
//                         Toggle Status
//                     </Web3Button>

//                     <button className="close-button">Election Status: {statusIsLoading ? 'Loading...' : getStatusDescription(electionStatus)}</button>
//                 </div>
//             </div>
//         </div>
//     </div>
// );
// };

// export default Admin;

import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import ManVoters from "./ManVoters";
import voters from "../admin-images/voters.png";
import candidates from "../admin-images/candidates.png";
import Confetti from "react-confetti";
import {
  useContract,
  useContractWrite,
  useContractRead,
} from "@thirdweb-dev/react";
import { Web3Button } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "./Constants/addresses";

const Admin = () => {
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { mutateAsync: setStatus, isLoading: writeLoading } = useContractWrite(
    contract,
    "setStatus"
  );
  const { data: electionStatus, isLoading: statusIsLoading } = useContractRead(
    contract,
    "status",
    []
  );

  const { data: resultData, isLoading: resultIsLoading } = useContractRead(
    contract,
    "result",
    []
  );

  const [showModal, setShowModal] = useState(false);

  const start_elections = async () => {
    try {
      const data = await setStatus({ args: [] });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const getStatusDescription = (status) => {
    switch (status) {
      case 0:
        return "Not Started Yet!!";
      case 1:
        return "Currently going on";
      case 2:
        return "Completed!!";
      default:
        return "Unknown";
    }
  };

  const openModal = () => {
    setShowModal(true);
    document.body.classList.add("active-modal");
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.classList.remove("active-modal");
  };

  return (
    <div>
      <div>
        <header className="header1">
          <nav className="navbar">
            <a href="/manage-candidates">Manage Candidates</a>
            <a href="/manage-voters">Manage Voters</a>
            <a className="logout-but" href="/">
              Logout
            </a>
          </nav>
        </header>
      </div>

      <div className="background"></div>

      <div className="container1">
        <div className="content1">
          <div className="card1">
            <img src={candidates}></img>
            <div className="intro">
              <div className="inner-card">
                <h4>Manage Candidates</h4>
                <p>Add, Delete and Update Candidates</p>
                <button>
                  <NavLink className="link" to="/manage-candidates">
                    Go<i className="bx bxs-right-arrow"></i>
                  </NavLink>
                </button>
              </div>
            </div>
          </div>
          <div className="card1">
            <img src={voters}></img>
            <div className="intro">
              <div className="inner-card">
                <h4>Manage Voters</h4>
                <p>Add, Delete and Update Voters</p>
                <button>
                  <NavLink className="link" to="/manage-voters">
                    Go<i className="bx bxs-right-arrow"></i>
                  </NavLink>
                </button>
              </div>
            </div>
          </div>
          <div className="elec-buttons">
            <Web3Button
              contractAddress={CONTRACT_ADDRESS}
              action={start_elections}
              disabled={writeLoading}
            >
              Toggle Status
            </Web3Button>

            <button className="close-button">
              Election Status:{" "}
              {statusIsLoading
                ? "Loading..."
                : getStatusDescription(electionStatus)}
            </button>

            {/* Button to open modal */}
            <button
              className="btn-modal"
              onClick={openModal}
              style={{
                padding: "10px 10px",
                display: "block",
                margin: "10px auto 0",
                fontSize: "18px",
              }}
            >
              Check Results
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(0,0,0,0.5)",
            padding: "10px",
            borderRadius: "5px",
            zIndex: 9999
          }}
          onClick={closeModal}
        >
          <div
            style={{
              background: "#ffffff",
              padding: "20px",
              borderRadius: "5px",
              textAlign: "center",
              position: "relative"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            
            <p style={{ fontSize: "18px" }}>{resultIsLoading ? 'Loading...' : resultData}</p>
            <Web3Button
              contractAddress= {CONTRACT_ADDRESS}
              action={(contract) => {
                contract.call("resetCampaign", [])
              }}
              style={{
                padding: "8px 16px",
                background: "#007bff",
                color: "#ffffff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "10px"
              }}
            >
              Reset Campaign
            </Web3Button>
            <button
              style={{
                padding: "8px 16px",
                background: "#ff0000",
                color: "#ffffff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "10px"
              }}
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <button
        style={{
          padding: "10px 10px",
          background: "#007bff",
          color: "#ffffff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
        onClick={openModal}
      >
        Check Results
      </button>
      {showModal && <Confetti />}

    </div>
  );
};

export default Admin;

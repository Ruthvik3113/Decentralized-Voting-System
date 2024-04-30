// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// // import { Web3Button } from "@thirdweb-dev/react";
// import { useContract, useContractRead } from "@thirdweb-dev/react";
// import { CONTRACT_ADDRESS } from "./Constants/addresses";
// import { Web3Button } from "@thirdweb-dev/react";

// const PatientList = () => {

//   const { contract } = useContract(CONTRACT_ADDRESS);
//   const { data, isLoading } = useContractRead(
//     contract,
//     "getCandidatesList",
//     []
//   );


//   const parseCandidateList = (candidateList) => {
//     // Split the candidateList string by newline character
//     const candidatesLines = candidateList.split("\n");

//     // Initialize an array to store parsed candidate objects
//     const candidatesArray = [];

//     // Iterate over each line in the candidateList
//     candidatesLines.forEach((candidateLine) => {
//       // Trim any leading or trailing whitespace
//       candidateLine = candidateLine.trim();

//       // Skip empty lines
//       if (candidateLine === "") return;

//       // Split the line by comma to separate name, symbol, and address
//       const [name, symbol, address] = candidateLine.split(", ");

//       // Create a candidate object with name, symbol, and address
//       const candidate = {
//         name: name.trim(),
//         symbol: symbol.trim(),
//         candidateAddress: address.trim(), // Address is already in hexadecimal format
//       };

//       // Push the candidate object to the candidatesArray
//       candidatesArray.push(candidate);
//     });

//     return candidatesArray;
//   };

//   return (
//     <div className="patient-list">
//       <div>
//         <header className="header2">
//           <nav className="navbar">
//             <a
//               href="/voter"
//               style={{
//                 background: "gray",
//                 borderRadius: "10px",
//                 padding: "5px",
//               }}
//             >
//               Home
//             </a>
//             <a
//               href="/"
//               style={{
//                 background: "gray",
//                 borderRadius: "10px",
//                 padding: "5px",
//               }}
//             >
//               Logout
//             </a>
//           </nav>
//         </header>
//       </div>

//       <div className="background"></div>

//       <div className="container2">
//         <div className="welcome-doc-div">
//           <h3 className="welcome-doc">
//             Welcome Voter! Use your power, Change the world you live in!
//           </h3>
//         </div>
//         <h3 className="patient-list-title">Candidates List </h3>
//         <div
//           className="candidates-grid-container"
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             backgroundColor: "#6a6a6b",
//             minHeight: "100vh",
//             borderRadius: "30px",
//           }}
//         >
//           <div
//             className="candidates-grid"
//             style={{
//               width: "80%",
//               maxWidth: "1200px",
//               padding: "20px",
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               borderRadius: "10px",
//             }}
//           >
//             <h2 style={{ color: "#ffffff" }}>Registered Candidates</h2>
//             {isLoading ? (
//               <p>Loading...</p>
//             ) : (
//               parseCandidateList(data).map((candidate, index) => (
//                 <div
//                   key={index}
//                   className="candidate-card"
//                   style={{
//                     width: "100%",
//                     border: "1px solid #ccc",
//                     borderRadius: "8px",
//                     boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
//                     padding: "30px",
//                     backgroundColor: "#fff",
//                     marginBottom: "20px",
//                   }}
//                 >
//                   <h3
//                     style={{
//                       margin: "0",
//                       color: "#333",
//                       fontSize: "1.5rem",
//                       fontWeight: "bold",
//                       marginBottom: "10px",
//                     }}
//                   >
//                     Name: {candidate.name}
//                   </h3>
//                   <div
//                     style={{
//                       fontSize: "2rem",
//                       color: "#666",
//                       marginTop: "10px",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     Symbol: {candidate.symbol}
//                   </div>

//                   <Web3Button
//                     contractAddress={CONTRACT_ADDRESS}
//                     action={(candidateAddress) => {
//                       console.log(candidateAddress);
//                       contract.call("vote", [candidate.candidateAddress]);
//                     }}
//                   >
//                     Vote
//                   </Web3Button>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//         <div className="content2"></div>
//       </div>
//     </div>
//   );
// };

// export default PatientList;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "./Constants/addresses";
import { Web3Button } from "@thirdweb-dev/react";

const PatientList = () => {
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data, isLoading } = useContractRead(
    contract,
    "getCandidatesList",
    []
  );

  const [searchQuery, setSearchQuery] = useState(""); // State to hold search query

  const parseCandidateList = (candidateList) => {
    // Check if candidateList is undefined or null
    if (!candidateList) return [];

    // Split the candidateList string by newline character
    const candidatesLines = candidateList.split("\n");

    // Initialize an array to store parsed candidate objects
    const candidatesArray = [];

    // Iterate over each line in the candidateList
    candidatesLines.forEach((candidateLine) => {
      // Trim any leading or trailing whitespace
      candidateLine = candidateLine.trim();

      // Skip empty lines
      if (candidateLine === "") return;

      // Split the line by comma to separate name, symbol, and address
      const [name, symbol, address] = candidateLine.split(", ");

      // Create a candidate object with name, symbol, and address
      const candidate = {
        name: name.trim(),
        symbol: symbol.trim(),
        candidateAddress: address.trim(), // Address is already in hexadecimal format
      };

      // Push the candidate object to the candidatesArray
      candidatesArray.push(candidate);
    });

    return candidatesArray;
  };

  // Filter candidates based on search query
  const filteredCandidates = parseCandidateList(data).filter((candidate) =>
    candidate.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    console.log("Data:", data);
  }, [data]);


  return (
    <div className="patient-list">
      <div>
        <header className="header2">
          <nav className="navbar">
            <a
              href="/voter"
              style={{
                background: "gray",
                borderRadius: "10px",
                padding: "5px",
              }}
            >
              Home
            </a>
            <a
              href="/"
              style={{
                background: "gray",
                borderRadius: "10px",
                padding: "5px",
              }}
            >
              Logout
            </a>
          </nav>
        </header>
      </div>

      <div className="background"></div>

      <div className="container2">
        <div className="welcome-doc-div">
          <h3 className="welcome-doc">
            Welcome Voter! Use your power, Change the world you live in!
          </h3>
        </div>
        <h3 className="patient-list-title">
          <input
            type="text"
            placeholder="Search candidates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </h3>
        <div
          className="candidates-grid-container"
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#6a6a6b",
            minHeight: "100vh",
            borderRadius: "30px",
          }}
        >
          <div
            className="candidates-grid"
            style={{
              width: "80%",
              maxWidth: "1200px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "10px",
            }}
          >
            <h2 style={{ color: "#ffffff" }}>Registered Candidates</h2>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              filteredCandidates.map((candidate, index) => (
                <div
                  key={index}
                  className="candidate-card"
                  style={{
                    width: "100%",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                    padding: "30px",
                    backgroundColor: "#fff",
                    marginBottom: "20px",
                  }}
                >
                  <h3
                    style={{
                      margin: "0",
                      color: "#333",
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      marginBottom: "10px",
                    }}
                  >
                    Name: {candidate.name}
                  </h3>
                  <div
                    style={{
                      fontSize: "2rem",
                      color: "#666",
                      marginTop: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    Symbol: {candidate.symbol}
                  </div>

                  <Web3Button
                    contractAddress={CONTRACT_ADDRESS}
                    action={(candidateAddress) => {
                      console.log(candidateAddress);
                      contract.call("vote", [candidate.candidateAddress]);
                    }}
                  >
                    Vote
                  </Web3Button>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="content2"></div>
      </div>
    </div>
  );
};

export default PatientList;

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract VotingSmartContract2 {
    // address public contractOwner; declared 2 admins
    address[] public candidatesList;
    address[] public votersList; // Add votersList array
    mapping(address => uint) public votesReceived; 
    address public winner;
    uint public winnerVotes;

    enum VotingStatus { NotStarted, Running, Completed }
    VotingStatus public status;

    mapping(address => bool) public registeredVoters; 
    mapping(address => bool) public hasVoted; 
    struct Candidate {
        string name;
        uint age;
        string symbol;
        address candidateAddress;
    }

    mapping(address => Candidate) public candidateInfo;
    struct Voter {
        string name;
        uint age;
        bool hasValidVoterPass; 
        bool hasVoted;
        address voterAddress;
    }

    mapping(address => Voter) public voterInfo; 
    
    address private admin1;
    address private admin2;
    address private admin3;
    uint public totalVoters;

    constructor() {
        admin1 = 0x4c8b12BCAF4EA660279d81E038C196c5bf8C0d3f;
        admin2 = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;
        admin3 = 0xE7271d962e2F8e6c5C19b1a2fB0e77c6057c3812;
        // contractOwner = msg.sender || admin1 || admin2;
        totalVoters = 0;
    }

    modifier OnlyOwner { 
        require(msg.sender == admin1 || msg.sender == admin2, "You ain't the owner, dude");
        _;
    }

    function setStatus() OnlyOwner public {
        if (status == VotingStatus.Running) {
            status = VotingStatus.Completed;
        } else {
            status = VotingStatus.Running;
        }
    }
    function registerCandidates(string memory _name, uint _age, string memory _symbol, address _candidate) OnlyOwner public {
        require(!isCandidateRegistered(_candidate), "Candidate with this address is already registered");
        candidatesList.push(_candidate);
        candidateInfo[_candidate] = Candidate(_name, _age, _symbol, _candidate);
    }
    function isCandidateRegistered(address _candidate) internal view returns (bool) {
        return candidateInfo[_candidate].candidateAddress != address(0);
    }

    function removeCandidate(address _candidate) public OnlyOwner {
    require(isCandidateRegistered(_candidate), "Candidate with this address is not registered");
    // Remove the candidate from the list
    for (uint i = 0; i < candidatesList.length; i++) {
        if (candidatesList[i] == _candidate) {
            delete candidatesList[i];
            break;
        }
    }
    // Remove candidate's information
    delete candidateInfo[_candidate];
}


    function registerVoter(string memory _name, uint _age, address _voter) OnlyOwner public {
        require(!isVoterRegistered(_voter), "Voter with this address is already registered");
        registeredVoters[_voter] = false;
        voterInfo[_voter] = Voter(_name, _age, false, false, _voter);
        votersList.push(_voter); // Add the voter to the votersList array
    }

    function isVoterRegistered(address _voter) internal view returns (bool) {
        return voterInfo[_voter].voterAddress != address(0);
    }
   //get list of candidates
    function getCandidatesList() public view returns (string memory) {
        string memory candidateList;
        for (uint i = 0; i < candidatesList.length; i++) {
            address candidateAddress = candidatesList[i];
            Candidate memory candidate = candidateInfo[candidateAddress];
            
            // Encode candidate information including the address as hexadecimal
            string memory candidateInfoString = string(abi.encodePacked(candidate.name, ", ", candidate.symbol, ", ", toHexString(candidate.candidateAddress)));
            
            candidateList = string(abi.encodePacked(candidateList, candidateInfoString, "\n"));
        }
        return candidateList;
    }
    function setVoterPass(address _voter) public OnlyOwner {
        // require(registeredVoters[_voter], "Voter is not registered");
        require(voterInfo[_voter].voterAddress != address(0), "Voter is not registered");
        // Set the voter pass to true
        registeredVoters[_voter] = true;
        voterInfo[_voter].hasValidVoterPass = true;
    }
    function vote(address _candidate) public {
        require(validateCandidate(_candidate), "Not a valid Candidate");
        require(status == VotingStatus.Running, "Voting is not started");
        require(registeredVoters[msg.sender], "You are not a registered voter");
        require(!hasVoted[msg.sender], "You have already voted");
        votesReceived[_candidate] = votesReceived[_candidate] + 1;
        hasVoted[msg.sender] = true;
        voterInfo[msg.sender].hasVoted = true;
        totalVoters = totalVoters + 1;
    }
    function validateCandidate(address _candidate) view public returns(bool) {
        for (uint i = 0; i < candidatesList.length; i++ ) {
            if (candidatesList[i] == _candidate) {
                return true;
            }
        }
        return false;
    }
    function voteCounts(address _candidate) public view returns(uint){
        require(validateCandidate(_candidate), "Not a valid Candidate");
        require(status == VotingStatus.Completed, "Voting must be completed to get vote counts");
        return votesReceived[_candidate];
    }
    function result() public view returns (string memory) {
        require(status == VotingStatus.Completed, "Voting isn't completed yet!");

        uint currentWinnerVotes = 0;
        uint numWinners = 0;
        address[] memory winners = new address[](candidatesList.length);

        for(uint i = 0; i < candidatesList.length; i++) {
            if (votesReceived[candidatesList[i]] > currentWinnerVotes) {
                currentWinnerVotes = votesReceived[candidatesList[i]];
                numWinners = 1;
                winners[0] = candidatesList[i];
            } else if (votesReceived[candidatesList[i]] == currentWinnerVotes) {
                winners[numWinners] = candidatesList[i];
                numWinners++;
            }
        }

        if (numWinners == 1) {
            return string(abi.encodePacked("Winner: ", candidateInfo[winners[0]].name, ", Votes: ", toString(currentWinnerVotes)));
        } else {
            string memory tiedCandidates;
            for(uint i = 0; i < numWinners; i++) {
                tiedCandidates = string(abi.encodePacked(tiedCandidates, candidateInfo[winners[i]].name, ", "));
            }
            return string(abi.encodePacked("Result ended in a tie between ", tiedCandidates, "with ", toString(currentWinnerVotes), " votes each."));
        }
    }


    function toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

// Function to convert address to a hexadecimal string
    function toHexString(address _addr) public pure returns (string memory) {
        bytes memory addr = new bytes(20);
        for (uint i = 0; i < 20; i++) {
            addr[i] = bytes1(uint8(uint160(_addr) / (2**(8*(19 - i)))));
        }
        return string(abi.encodePacked("0x", toAsciiString(addr)));
    }


    // Function to convert bytes to a readable string
    function toAsciiString(bytes memory _bytes) public pure returns (string memory) {
        bytes memory alphabet = "0123456789abcdef";
        bytes memory str = new bytes(2 * _bytes.length);
        for (uint i = 0; i < _bytes.length; i++) {
            str[2*i] = alphabet[uint(uint8(_bytes[i] >> 4))];
            str[2*i + 1] = alphabet[uint(uint8(_bytes[i] & 0x0f))];
        }
        return string(str);
    }


    function resetCampaign() public OnlyOwner {
        require(status == VotingStatus.Completed, "Cannot reset campaign until voting is completed");

        // Reset candidate-related data
        for(uint i = 0; i < candidatesList.length; i++) {
            delete candidateInfo[candidatesList[i]];
            delete votesReceived[candidatesList[i]]; // Delete votes received for each candidate
        }
        delete candidatesList;

        // Reset votes and winner-related data
        winner = address(0);
        winnerVotes = 0;

        // Reset voter-related data
        for(uint i = 0; i < votersList.length; i++) {
            delete voterInfo[votersList[i]];
            delete registeredVoters[votersList[i]]; // Delete registered status for each voter
        }
        delete votersList;
        totalVoters = 0;

        // Reset voting status
        status = VotingStatus.NotStarted;
    }



}
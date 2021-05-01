pragma solidity ^0.5.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/token/ERC721/ERC721Full.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/drafts/Counters.sol";

contract BlockSkillz is ERC721Full, Ownable {

    using Counters for Counters.Counter;

    Counters.Counter certification_ids;

    struct Certification {
        address owner;
        string institution_name;
        string certification;
        string signature;
        string uri;
    }

    // Track institutions that can award certifications
    mapping(address => bool) institutions;
    // Track certifications
    mapping(uint => Certification) public certifications;

    event CertificationAward(
        address owner
        , address institution
        , string institution_name
        , string certification
        , string signature
        , string reference_uri
    );
    event InstitutionAdded(address institution, string institution_name);
    event InstitutionRemoved(address institution);
    
    // Only institutions that have been added to the list can award certifications
    modifier onlyInstitution() {
        require(institutions[msg.sender], "You do not have permission to award certifications!");
        _;
    }
    
    function addInstitution(address institution, string memory institution_name) public onlyOwner {
        institutions[institution] = true;
        
        emit InstitutionAdded(institution, institution_name);
    }
    
    function removeInstitution(address institution) public onlyOwner {
        institutions[institution] = false;
        
        emit InstitutionRemoved(institution);
    }

    function awardCertification(
        address owner
        , string memory institution_name
        , string memory certification
        , string memory signature
        , string memory reference_uri
    ) public onlyInstitution {
        certification_ids.increment();
        uint token_id = certification_ids.current();
        
        _mint(owner, token_id);
        _setTokenURI(token_id, reference_uri);
        
        certifications[token_id] = Certification(owner, institution_name, certification, signature, reference_uri);
        
        emit CertificationAward(owner, msg.sender, institution_name, certification, signature, reference_uri);
    }

}
pragma solidity ^0.5.5;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/token/ERC721/ERC721Full.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/drafts/Counters.sol";

contract BlockSkillz is ERC721Full, Ownable {

    constructor() ERC721Full("BlockSkillz", "BSZ") public {
        admins[msg.sender] = true;
    }

    using Counters for Counters.Counter;

    Counters.Counter certification_ids;

    struct Certification {
        string institution_name;
        string certification;
        string signature;
        string uri;
        uint expirationInMs;
    }


    // Track admins who can add institutions
    mapping(address => bool) admins;

    event AdminAdded(address admin, string admin_name);
    event AdminRemoved(address admin);
    
    // Track institutions that can award certifications
    mapping(address => bool) institutions;
    // Track certifications
    mapping(uint => Certification) public certifications;

    event CertificationAward(
        string institution_name
        , string certification
        , string signature
        , string token_uri
        , uint expirationInMs
    );
    event InstitutionAdded(address institution, string institution_name);
    event InstitutionRemoved(address institution);
    
    
        // Admins are whitelisted for adding institutions
    modifier onlyAdmin() {
        require(admins[msg.sender], "You do not have permission to add institutions!");
        _;
        
    }
    
    function addAdmin(address admin, string memory admin_name) public onlyAdmin {
        admins[admin] = true;
        
        emit AdminAdded(admin, admin_name);
    }
    
    function removeAdmin(address admin) public onlyAdmin {
        admins[admin] = false;
        
        emit AdminRemoved(admin);
    
    }
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

    function institution() public view returns(bool) {
        return institutions[msg.sender];
    }

    function awardCertification(
        address owner
        , string memory institution_name
        , string memory certification
        , string memory signature
        , string memory token_uri
        , uint expirationInMs
    ) public onlyInstitution returns (uint) {
        certification_ids.increment();
        uint token_id = certification_ids.current();
        
        _mint(owner, token_id);
        _setTokenURI(token_id, token_uri);
        
        certifications[token_id] = Certification(institution_name, certification, signature, token_uri, expirationInMs);
        
        emit CertificationAward(institution_name, certification, signature, token_uri, expirationInMs);
        
        return token_id;
    }

}

# BlockSkillz

## Team Members
- Kelly Domico
- Bryn Lloyd-Davies
- Michael Garcia

## Description

This dApp lets you track your diplomas, certifications, endorsed skills and work history on the blockchain. Employers and other users can use this dApp to verify your qualifications.

## Objectives

1. Create a smart contract to allow academic institutions to mint certificates/diplomas as NFTs.
2. Add functionality to the contract to expand/limit "owner" institutions that are allowed to mint NFTs.
3. Build a friendly user interface to interact with the smart contracts.
4. Demo the dApp end-to-end using our class as an example.

**Nice to Have**
1. Users can book a 1:1 time slot with other users to get help, to bounce ideas, for mentorship or just to chat.

## Data Sources

- OpenZeppelin

## How It Works

![BlockSkillz flow](images/BlockSkillz_Flow.png)

## Rough Breakdown of Tasks

1. Figure out creating certificates for institutions (i.e. public keys). Look at letsencrypt or self-signed certs. These are the keys that users will use to verify the authenticity of the certificate/diploma.
2. Create a private certificate authority where institutions can generate keys.
3. Draft an outline of features/functions to implement in the smart contract.
4. Create the smart contract.
    a. Add institution to a list of allowable minters.
    b. Add mint NFT functionality.
    c. Additional functions TBD.
5. Deploy the contract to the Ropsten or test network.
6. Create the UI/dApp that will interact with the smart contract.
7. Create a demo for the final presentation.
8. Extra: Figure out how to get transaction history in dApp so users can view their certificates/diplomas and verify authenticity.
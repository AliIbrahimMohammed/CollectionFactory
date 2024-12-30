# Collection Factory Project

This repository provides a smart contract framework to dynamically create and manage NFT collections on Ethereum. The project consists of two main components: a `Collection` contract for individual NFT collections and a `CollectionFactory` contract for creating and managing these collections.

---

## Features

- **Dynamic Collection Creation**: Deploy new NFT collections using the `CollectionFactory`.
- **Upgradeable Collection Contracts**: Uses OpenZeppelin's proxy pattern for upgradeability.
- **Royalty Support**: Each collection supports royalty payments via the ERC2981 standard.
- **Enumerable NFTs**: Full support for enumerable NFTs (ERC721Enumerable).
- **Ownership Control**: Only the owner can mint NFTs in their collection.

---

## Prerequisites

- Node.js (v16 or later)
- Hardhat
- NPM/Yarn

---

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-repo/collection-factory.git
   cd collection-factory
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

---

## Compilation

To compile the smart contracts, run:

```bash
npx hardhat compile
```

---

## Testing

Run the test suite to ensure everything works as expected:

```bash
npx hardhat test
```

---

## Deployment

### Local Deployment on Hardhat Network

1. **Start the Hardhat network**:

   ```bash
   npx hardhat node
   ```

2. **Deploy contracts**:

   ```bash
   npx hardhat run scripts/deploy.js --network localhost
   ```

### Deployment Output

After deployment, you should see the addresses of the `Collection` and `CollectionFactory` contracts in your console. Example:

```bash
Deploying contracts with the account: 0xYourAddress
Collection contract deployed to: 0xCollectionContractAddress
CollectionFactory contract deployed to: 0xFactoryContractAddress
```

---

## Usage

### Interacting with the Contracts

You can interact with the contracts via Hardhat console or using scripts. For example, in the Hardhat console:

1. **Start the console**:

   ```bash
   npx hardhat console --network localhost
   ```

2. **Interact with the factory contract**:

   ```javascript
   const factory = await ethers.getContractAt("CollectionFactory", "0xFactoryContractAddress");

   // Create a new collection
   await factory.createCollection("MyCollection", "MYC", 500); // 5% royalty
   ```

3. **Get the deployed collections**:

   ```javascript
   const collections = await factory.getCollections();
   console.log(collections);
   ```

---

## Smart Contracts

### Collection.sol

A basic NFT contract with:

- Enumerable NFTs (ERC721Enumerable)
- Royalty support (ERC2981)
- Ownership controls for minting

### CollectionFactory.sol

A factory contract for:

- Deploying new `Collection` contracts
- Managing deployed collections
- Ensuring unique ownership per collection

---

## Testing Details

### Run Tests

```bash
npx hardhat test
```

Example output:

```bash
  CollectionFactory
    ✔ should deploy the factory and set the implementation address
    ✔ should create a new collection
    ✔ should allow minting in a created collection
    ✔ should prevent duplicate collections by the same owner

  4 passing (2s)
```

---

## Future Enhancements

- Add more detailed metadata management for collections.
- Support multiple royalty recipients.
- Integrate with a frontend for easy user interaction.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.
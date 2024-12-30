async function main() {
    // Get the deployer's wallet from the Hardhat network
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    // Deploy the Collection contract (this is the implementation contract)
    const Collection = await ethers.getContractFactory("Collection");
    const collection = await Collection.deploy();
    await collection.deployed(); // Ensure the contract is fully deployed
    console.log("Collection contract deployed to:", collection.address);
  
    // Deploy the CollectionFactory contract
    const CollectionFactory = await ethers.getContractFactory("CollectionFactory");
    const factory = await CollectionFactory.deploy();
    await factory.deployed(); // Ensure the contract is fully deployed
    console.log("CollectionFactory contract deployed to:", factory.address);
  
    // After deploying, the addresses will be returned
    return { collection, factory };
  }
  
  // Run the deploy script
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  
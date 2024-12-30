const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("CollectionFactory", function () {
    let factory, collectionImplementation, owner, addr1, addr2;
    const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

    beforeEach(async () => {
        [owner, addr1, addr2] = await ethers.getSigners();

        const CollectionFactory = await ethers.getContractFactory("CollectionFactory");
        factory = await CollectionFactory.deploy();

        collectionImplementation = await factory.collectionImplementation();
    });

    it("should deploy the factory and set the implementation address", async () => {
        expect(collectionImplementation).to.be.properAddress;
    });

    it("should create a new collection", async () => {
        const name = "TestCollection";
        const symbol = "TST";
        const royaltyFee = 500; // 5%

        await factory.connect(addr1).createCollection(name, symbol, royaltyFee);

        const collections = await factory.getCollections();
        expect(collections.length).to.equal(1);

        const collectionAddress = collections[0];
        expect(collectionAddress).to.be.properAddress;

        const Collection = await ethers.getContractAt("Collection", collectionAddress);

        const collectionName = await Collection.name();
        const collectionSymbol = await Collection.symbol();
        const defaultRoyalty = await Collection.royaltyInfo(0, 10000); // Check 10,000 as a base value for royalty

        expect(collectionName).to.equal(name);
        expect(collectionSymbol).to.equal(symbol);
        expect(defaultRoyalty[1]).to.equal(500); // Royalty fee of 5% from 10,000
    });

    it("should allow minting in a created collection", async () => {
        const name = "MintableCollection";
        const symbol = "MINT";
        const royaltyFee = 300; // 3%

        await factory.connect(owner).createCollection(name, symbol, royaltyFee);

        const collections = await factory.getCollections();
        const collectionAddress = collections[0];

        const Collection = await ethers.getContractAt("Collection", collectionAddress);

        await Collection.connect(owner).mint(addr1.address, 1);

        const ownerOfToken = await Collection.ownerOf(1);
        expect(ownerOfToken).to.equal(addr1.address);
    });

    it("should create multiple collections by different owners", async () => {
        const name1 = "CollectionOne";
        const symbol1 = "COL1";
        const royaltyFee1 = 400; // 4%

        const name2 = "CollectionTwo";
        const symbol2 = "COL2";
        const royaltyFee2 = 600; // 6%

        await factory.connect(addr1).createCollection(name1, symbol1, royaltyFee1);
        await factory.connect(addr2).createCollection(name2, symbol2, royaltyFee2);

        const collections = await factory.getCollections();
        expect(collections.length).to.equal(2);

        const collectionAddr1 = collections[0];
        const collectionAddr2 = collections[1];

        const Collection1 = await ethers.getContractAt("Collection", collectionAddr1);
        const Collection2 = await ethers.getContractAt("Collection", collectionAddr2);

        const nameFromContract1 = await Collection1.name();
        const nameFromContract2 = await Collection2.name();

        expect(nameFromContract1).to.equal(name1);
        expect(nameFromContract2).to.equal(name2);
    });

    it("should return address(0) if no collection exists for the owner", async () => {
        const collectionAddress = await factory.getCollectionByOwner(addr1.address);
        expect(collectionAddress).to.equal(ADDRESS_ZERO);
    });



    it("should set the correct royalty fee during collection creation", async () => {
        const name = "RoyaltyCollection";
        const symbol = "ROY";
        const royaltyFee = 500; // 5%

        await factory.connect(owner).createCollection(name, symbol, royaltyFee);

        const collections = await factory.getCollections();
        const collectionAddress = collections[0];

        const Collection = await ethers.getContractAt("Collection", collectionAddress);

        // Verify royalty fee
        const royaltyInfo = await Collection.royaltyInfo(0, 10000); // Check with 10,000 as the base value
        expect(royaltyInfo[1]).to.equal(500); // 5% royalty fee
    });
});

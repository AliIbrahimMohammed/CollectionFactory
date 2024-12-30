// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "./Collection.sol";

contract CollectionFactory {
    address public immutable collectionImplementation;
    address[] public collections;

    event CollectionCreated(address indexed owner, address collectionAddress);

    constructor() {
        collectionImplementation = address(new Collection());
    }

    function createCollection(string memory name, string memory symbol, uint96 royaltyFee) external {
        address clone = Clones.clone(collectionImplementation);
        Collection(clone).initialize(name, symbol, msg.sender, royaltyFee);
        collections.push(clone);
        emit CollectionCreated(msg.sender, clone);
    }

    function getCollections() external view returns (address[] memory) {
        return collections;
    }

    function getCollectionByOwner(address owner) external view returns (address) {
        for (uint256 i = 0; i < collections.length; i++) {
            if (Collection(collections[i]).owner() == owner) {
                return collections[i];
            }
        }
        return address(0);
    }    
}

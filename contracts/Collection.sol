// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/common/ERC2981Upgradeable.sol";

contract Collection is Initializable, ERC721EnumerableUpgradeable, OwnableUpgradeable, ERC2981Upgradeable {
    function initialize(
        string memory name,
        string memory symbol,
        address owner,
        uint96 royaltyFee
    ) external initializer {
        __ERC721_init(name, symbol);        
        __ERC721Enumerable_init();         
        __ERC2981_init();                  
        _transferOwnership(owner);        
        _setDefaultRoyalty(owner, royaltyFee);
    }

    function mint(address to, uint256 tokenId) external onlyOwner {
        _safeMint(to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721EnumerableUpgradeable, ERC2981Upgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

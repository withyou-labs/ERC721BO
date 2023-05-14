// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "../ERC721BO.sol";

contract AccessControlMock is ERC721BO, AccessControl{
    constructor() ERC721BO("AccessControlMock", "ACM"){
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721BO, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}


// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./InfinityPromotion.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title InfinityPromotionFactory
 * @dev Factory contract for creating and managing InfinityPromotion instances
 */
contract InfinityPromotionFactory is Ownable(msg.sender) {
    // Array to store all deployed promotion contracts
    address[] public deployedPromotions;
    
    // Mapping from promotion address to creator address
    mapping(address => address) public promotionToCreator;
    
    // Events
    event PromotionCreated(
        address indexed promotionAddress,
        address indexed creator,
        string name,
        string symbol,
        uint256 maxTokens,
        uint256 duration
    );
    
    /**
     * @dev Creates a new InfinityPromotion contract
     * @param name Name of the NFT collection
     * @param symbol Symbol of the NFT collection
     * @param maxTokens Maximum number of tokens that can be minted
     * @param duration Duration of the promotion in seconds
     * @param baseURI Base URI for token metadata
     * @return address Address of the newly created promotion contract
     */
    function createPromotion(
        string memory name,
        string memory symbol,
        uint256 maxTokens,
        uint256 duration,
        string memory baseURI
    ) external returns (address) {
        InfinityPromotion newPromotion = new InfinityPromotion(
            name,
            symbol,
            maxTokens,
            duration,
            baseURI
        );
        
        address promotionAddress = address(newPromotion);
        deployedPromotions.push(promotionAddress);
        promotionToCreator[promotionAddress] = msg.sender;
        
        // Transfer ownership of the promotion contract to the creator
        newPromotion.transferOwnership(msg.sender);
        
        emit PromotionCreated(
            promotionAddress,
            msg.sender,
            name,
            symbol,
            maxTokens,
            duration
        );
        
        return promotionAddress;
    }
    
    /**
     * @dev Returns the number of deployed promotion contracts
     */
    function getDeployedPromotionsCount() external view returns (uint256) {
        return deployedPromotions.length;
    }
    
    /**
     * @dev Returns the creator of a specific promotion contract
     * @param promotionAddress Address of the promotion contract
     */
    function getPromotionCreator(address promotionAddress) external view returns (address) {
        return promotionToCreator[promotionAddress];
    }
    
    /**
     * @dev Returns all deployed promotion contracts
     */
    function getAllDeployedPromotions() external view returns (address[] memory) {
        return deployedPromotions;
    }
}
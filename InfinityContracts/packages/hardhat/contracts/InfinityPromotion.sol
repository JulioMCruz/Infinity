// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title InfinityPromotion
 * @dev NFT-based taco promotion system for redeeming free tacos
 */
contract InfinityPromotion is ERC721, Pausable, Ownable {
    using Counters for Counters.Counter;

    // Token ID counter
    Counters.Counter private _tokenIdCounter;

    // Maximum number of tokens that can be minted
    uint256 public immutable MAX_TOKENS;
    
    // Promotion expiration timestamp
    uint256 public expirationTime;
    
    // Base URI for token metadata
    string private _baseTokenURI;

    // Mapping to track redeemed tokens
    mapping(uint256 => bool) public isRedeemed;

    // Events
    event TokenClaimed(address indexed user, uint256 tokenId);
    event TokenRedeemed(address indexed user, uint256 tokenId);
    event PromotionExpired(uint256 timestamp);

    /**
     * @dev Constructor
     * @param name Name of the NFT collection
     * @param symbol Symbol of the NFT collection
     * @param maxTokens Maximum number of tokens that can be minted
     * @param duration Duration of the promotion in seconds
     * @param baseURI Base URI for token metadata
     */
    constructor(
        string memory name,
        string memory symbol,
        uint256 maxTokens,
        uint256 duration,
        string memory baseURI
    ) ERC721(name, symbol) {
        MAX_TOKENS = maxTokens;
        expirationTime = block.timestamp + duration;
        _baseTokenURI = baseURI;
    }

    /**
     * @dev Modifier to check if promotion is active
     */
    modifier promotionActive() {
        require(block.timestamp < expirationTime, "Promotion has expired");
        require(!paused(), "Promotion is paused");
        _;
    }

    /**
     * @dev Claims a token for the caller
     * @return tokenId The ID of the claimed token
     */
    function claimToken() external promotionActive returns (uint256) {
        require(_tokenIdCounter.current() < MAX_TOKENS, "All tokens have been claimed");
        
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        
        emit TokenClaimed(msg.sender, tokenId);
        return tokenId;
    }

    /**
     * @dev Redeems a token for a free taco
     * @param tokenId The ID of the token to redeem
     */
    function redeemToken(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "Not token owner");
        require(!isRedeemed[tokenId], "Token already redeemed");
        
        isRedeemed[tokenId] = true;
        emit TokenRedeemed(msg.sender, tokenId);
    }

    /**
     * @dev Returns whether a token has been redeemed
     * @param tokenId The ID of the token to check
     */
    function isTokenRedeemed(uint256 tokenId) external view returns (bool) {
        return isRedeemed[tokenId];
    }

    /**
     * @dev Returns the total number of tokens minted
     */
    function totalMinted() external view returns (uint256) {
        return _tokenIdCounter.current();
    }

    /**
     * @dev Returns the number of tokens remaining
     */
    function remainingTokens() external view returns (uint256) {
        return MAX_TOKENS - _tokenIdCounter.current();
    }

    /**
     * @dev Sets the base URI for token metadata
     * @param baseURI New base URI
     */
    function setBaseURI(string memory baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
    }

    /**
     * @dev Returns the base URI for token metadata
     */
    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    /**
     * @dev Pauses the promotion
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @dev Unpauses the promotion
     */
    function unpause() external onlyOwner {
        _unpause();
    }

    /**
     * @dev Extends the promotion duration
     * @param extension Additional time in seconds
     */
    function extendPromotion(uint256 extension) external onlyOwner {
        expirationTime += extension;
    }
}

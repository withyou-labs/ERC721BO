# Solidity API

## Bits

Collection of functions related to bits.

### popCount

```solidity
function popCount(uint256 flags) internal pure returns (uint256)
```

Returns the number of bits set to true in the given `value`.

### indexOf

```solidity
function indexOf(uint256 flags, uint256 n) internal pure returns (uint256 rank)
```

Returns the index of the given `value` counting from the right, with the `n`th bit set to true.


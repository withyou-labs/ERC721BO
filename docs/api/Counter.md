# Solidity API

## Counter

Library for counter with initial value of non zero.

### Minted

```solidity
struct Minted {
  uint256 _inner;
}
```

### initialize

```solidity
function initialize(struct Counter.Minted minted) internal
```

Save `type(uint256).max` to save on gas costs for the first mint.
Zero to non-zero gas costs are less than zero to non-zero.

### increment

```solidity
function increment(struct Counter.Minted minted, uint256 count) internal
```

Add `count` to the internal value.

### current

```solidity
function current(struct Counter.Minted minted) internal view returns (uint256)
```

Returns the internal value.


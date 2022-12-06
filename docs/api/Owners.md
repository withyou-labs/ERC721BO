# Solidity API

## Owners

Library for owner list using delayed initialization mechanism.

### AddressSet

```solidity
struct AddressSet {
  mapping(uint256 => uint256) _inner;
}
```

### ownerOf

```solidity
function ownerOf(struct Owners.AddressSet set, uint256 tokenId) internal view returns (address)
```

Returns the owner of `tokenId`.

### mint

```solidity
function mint(struct Owners.AddressSet set, address owner, uint256 from, uint256 count) internal
```

Set `from` to `from + count` as tokens owned by the `owner`.

### overwrite

```solidity
function overwrite(struct Owners.AddressSet set, uint256 tokenId, address owner) internal
```

Change the owner of `tokenId` to `owner`.

### pack

```solidity
function pack(address owner, uint256 count) private pure returns (uint256)
```

Returns the value of `owner` and `count` packed into a uint256 value.

### unpack

```solidity
function unpack(uint256 packed) private pure returns (address owner, uint256 count)
```

Returns `owner` and `count` from `packed`.

### unpackAddress

```solidity
function unpackAddress(uint256 packed) private pure returns (address)
```

Returns owner address from `packed`.


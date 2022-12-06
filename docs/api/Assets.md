# Solidity API

## Assets

Library for ownership flag table.

### Pages

```solidity
struct Pages {
  mapping(uint256 => uint256) _inner;
}
```

### getPageKeyBy

```solidity
function getPageKeyBy(uint256 pageNo, address owner) internal pure returns (uint256)
```

Returns page key by `pageNo` and `owner`.

### page

```solidity
function page(struct Assets.Pages pages, address owner, uint256 pageNo) internal view returns (uint256)
```

Returns ownership flags by `owner` and `pageNo`.

### exists

```solidity
function exists(struct Assets.Pages pages, address owner, uint256 tokenId) internal view returns (bool)
```

Returns whether the `owner` owns the `tokenId`.
Returns true if owned, false otherwise.

### transfer

```solidity
function transfer(struct Assets.Pages pages, address from, address to, uint256 tokenId) internal
```

Set the ownership flag of the `tokenId` of `from` to false and the ownership flag of `to` to true.

### set

```solidity
function set(struct Assets.Pages pages, address owner, uint256 tokenId) internal
```

Set the ownership flag of the `tokenId` of `owner` to true.

### setRange

```solidity
function setRange(struct Assets.Pages pages, address owner, uint256 from, uint256 count) internal
```

Override the ownership flag of `owner` from `from` to `from` + `count` with true.

### unset

```solidity
function unset(struct Assets.Pages pages, address owner, uint256 tokenId) internal
```

Set the ownership flag of the `tokenId` of `owner` to false.

### unsetRange

```solidity
function unsetRange(struct Assets.Pages pages, address owner, uint256 from, uint256 count) internal
```

Override the ownership flag of `owner` from `from` to `from` + `count` with false.


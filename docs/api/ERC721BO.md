# Solidity API

## ERC721BO

### DEFAULT_MAX_TOKEN_COUNT

```solidity
uint256 DEFAULT_MAX_TOKEN_COUNT
```

### BURN_ADDRESS

```solidity
address BURN_ADDRESS
```

### _name

```solidity
string _name
```

Token name.

### _symbol

```solidity
string _symbol
```

Token symbol.

### _totalMints

```solidity
struct Counter.Minted _totalMints
```

Total minted tokens count.
This counter is incremented on each token minting.
It is used to generate new token ids.
Initialized with `type(uint256).max` to reduce gas cost for first `SSTORE`.

### _owners

```solidity
struct Owners.AddressSet _owners
```

Used to store token owners.
Store multiple owners in bulk with a lazy initialization mechanism.

### _assets

```solidity
struct Assets.Pages _assets
```

Stores the ownership flag table for each owner.
`uint256` as one page, 256 ownerships can be stored on a single page.

### _tokenApprovals

```solidity
mapping(uint256 => address) _tokenApprovals
```

### _operatorApprovals

```solidity
mapping(address => mapping(address => bool)) _operatorApprovals
```

### constructor

```solidity
constructor(string name_, string symbol_) internal
```

Initializes the contract by setting a `name` and a `symbol` to the token collection.

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId) public view virtual returns (bool)
```

Returns true if this contract implements the interface defined by `interfaceId`. See the corresponding
https://eips.ethereum.org/EIPS/eip-165 to learn more about how these ids are created.
This function call must use less than 30 000 gas.

### balanceOf

```solidity
function balanceOf(address owner) public view virtual returns (uint256)
```

Returns the number of tokens in ``owner``'s account.

### ownerOf

```solidity
function ownerOf(uint256 tokenId) public view virtual returns (address)
```

Returns the owner of the `tokenId` token.

Requirements:

- `tokenId` must exist.

### name

```solidity
function name() public view virtual returns (string)
```

Returns the token collection name.

### symbol

```solidity
function symbol() public view virtual returns (string)
```

Returns the token collection symbol.

### tokenURI

```solidity
function tokenURI(uint256 tokenId) public view virtual returns (string)
```

Returns the Uniform Resource Identifier (URI) for `tokenId` token.

### _baseURI

```solidity
function _baseURI() internal view virtual returns (string)
```

Base URI for computing tokenURI. If set, the resulting URI for each
token will be the concatenation of the `baseURI` and the `tokenId`. Empty
by default, can be overridden in child contracts.

### approve

```solidity
function approve(address to, uint256 tokenId) public virtual
```

Gives permission to `to` to transfer `tokenId` token to another account.
The approval is cleared when the token is transferred.

Only a single account can be approved at a time, so approving the zero address clears previous approvals.

Requirements:

- The caller must own the token or be an approved operator.
- `tokenId` must exist.

Emits an `Approval` event of ERC721.

### getApproved

```solidity
function getApproved(uint256 tokenId) public view virtual returns (address)
```

Returns the account approved for `tokenId` token.

Requirements:

- `tokenId` must exist.

### setApprovalForAll

```solidity
function setApprovalForAll(address operator, bool approved) public virtual
```

Approve or remove `operator` as an operator for the caller.
Operators can call transferFrom or safeTransferFrom for any token owned by the caller.

Requirements:

- The `operator` cannot be the caller.

Emits an `ApprovalForAll` event of ERC721.

### isApprovedForAll

```solidity
function isApprovedForAll(address owner, address operator) public view virtual returns (bool)
```

Returns if the `operator` is allowed to manage all of the assets of `owner`.

See setApprovalForAll

### transferFrom

```solidity
function transferFrom(address from, address to, uint256 tokenId) public virtual
```

Transfers `tokenId` token from `from` to `to`.

WARNING: Usage of this method is discouraged, use safeTransferFrom whenever possible.

Requirements:

- `from` cannot be the zero address.
- `to` cannot be the zero address.
- `tokenId` token must be owned by `from`.
- If the caller is not `from`, it must be approved to move this token by either approve or setApprovalForAll.

Emits an `Transfer` event of ERC721.

### safeTransferFrom

```solidity
function safeTransferFrom(address from, address to, uint256 tokenId) public virtual
```

Safely transfers `tokenId` token from `from` to `to`, checking first that contract recipients
are aware of the ERC721 protocol to prevent tokens from being forever locked.

Requirements:

- `from` cannot be the zero address.
- `to` cannot be the zero address.
- `tokenId` token must exist and be owned by `from`.
- If the caller is not `from`, it must have been allowed to move this token by either approve or setApprovalForAll.
- If `to` refers to a smart contract, it must implement IERC721Receiver.onERC721Received, which is called upon a safe transfer.

Emits an `Transfer` event of ERC721.

### safeTransferFrom

```solidity
function safeTransferFrom(address from, address to, uint256 tokenId, bytes _data) public virtual
```

Safely transfers `tokenId` token from `from` to `to`.

Requirements:

- `from` cannot be the zero address.
- `to` cannot be the zero address.
- `tokenId` token must exist and be owned by `from`.
- If the caller is not `from`, it must be approved to move this token by either approve or setApprovalForAll.
- If `to` refers to a smart contract, it must implement IERC721Receiver.onERC721Received, which is called upon a safe transfer.

Emits an `Transfer` event of ERC721.

### totalSupply

```solidity
function totalSupply() public view returns (uint256)
```

Returns the total amount of tokens stored by the contract.

### totalBurnt

```solidity
function totalBurnt() public view virtual returns (uint256)
```

Returns the total amount of burnt token by the contract.

### totalMinted

```solidity
function totalMinted() public view virtual returns (uint256)
```

Returns the total amount of minted token by the contract.

### tokenOfOwnerByIndex

```solidity
function tokenOfOwnerByIndex(address owner, uint256 index) public view virtual returns (uint256)
```

Returns a token ID owned by `owner` at a given `index` of its token list.
Use along with balanceOf to enumerate all of ``owner``'s tokens.

### tokenByIndex

```solidity
function tokenByIndex(uint256 index) public view virtual returns (uint256)
```

Returns a token ID at a given `index` of all the tokens stored by the contract.
Use along with totalSupply to enumerate all tokens.

### _safeTransfer

```solidity
function _safeTransfer(address from, address to, uint256 tokenId, bytes _data) internal virtual
```

Safely transfers `tokenId` token from `from` to `to`, checking first that contract recipients
are aware of the ERC721 protocol to prevent tokens from being forever locked.

`data` is additional data, it has no specified format and it is sent in call to `to`.

This internal function is equivalent to safeTransferFrom, and can be used to e.g.
implement alternative mechanisms to perform token transfer, such as signature-based.

Requirements:

- `from` cannot be the zero address.
- `to` cannot be the zero address.
- `tokenId` token must exist and be owned by `from`.
- If `to` refers to a smart contract, it must implement IERC721Receiver.onERC721Received, which is called upon a safe transfer.

Emits an `Transfer` event of ERC721.

### _exists

```solidity
function _exists(uint256 tokenId) internal view virtual returns (bool)
```

Returns whether `tokenId` exists.

Tokens can be managed by their owner or approved accounts via approve or setApprovalForAll.

Tokens start existing when they are minted (`_mint`),
and stop existing when they are burned (`_burn`).

### _isApprovedOrOwner

```solidity
function _isApprovedOrOwner(address spender, uint256 tokenId) internal view virtual returns (bool)
```

Returns whether `spender` is allowed to manage `tokenId`.

Requirements:

- `tokenId` must exist.

### _safeMint

```solidity
function _safeMint(address to, uint256 quantity) internal virtual
```

### _safeMint

```solidity
function _safeMint(address to, uint256 quantity, bytes _data) internal virtual
```

Same as `_safeMint`, with an additional `data` parameter which is
forwarded in IERC721Receiver.onERC721Received to contract recipients.

### _safeReMint

```solidity
function _safeReMint(address to, uint256 tokenId) internal virtual
```

Safely re-mints `tokenId` and transfers it to `to`.

Requirements:

- `tokenId` must not exist.
- If `to` refers to a smart contract, it must implement IERC721Receiver.onERC721Received, which is called upon a safe transfer.

Emits an `Transfer` event of ERC721.

### _safeReMint

```solidity
function _safeReMint(address to, uint256 tokenId, bytes _data) internal virtual
```

Same as `_safeReMint`, with an additional `data` parameter which is
forwarded in IERC721Receiver.onERC721Received to contract recipients.

### _mint

```solidity
function _mint(address to, uint256 quantity) internal virtual
```

Batch mints `count` tokens and transfers it to `to`.

WARNING: Usage of this method is discouraged, use _safeMint whenever possible

Requirements:

- `to` cannot be the zero address.
- `quantity` mints count.

Emits an `Transfer` event of ERC721.

### _mint

```solidity
function _mint(address to, uint256 start, uint256 quantity) internal virtual
```

Batch mints `start` to `count` tokens and transfers it to `to`.

WARNING: Usage of this method is discouraged, use _safeMint whenever possible

Requirements:

- `to` cannot be the zero address.
- `start` number to start mints.
- `quantity` mints count.

Emits an `Transfer` event of ERC721.

### _remint

```solidity
function _remint(address to, uint256 tokenId) internal virtual
```

Re-mints `tokenId` and transfers it to `to`.
The approval is cleared when the token is burned.

WARNING: Usage of this method is discouraged, use _safeReMint whenever possible

Requirements:

- `to` cannot be the zero address.
- `tokenId` must not exist and burnt.

Emits an `Transfer` event of ERC721.

### _burn

```solidity
function _burn(uint256 tokenId) internal virtual
```

Destroys `tokenId`.
The approval is cleared when the token is burned.

Requirements:

- `tokenId` must exist.

Emits an `Transfer` event of ERC721.

### _transfer

```solidity
function _transfer(address from, address to, uint256 tokenId) internal virtual
```

Transfers `tokenId` from `from` to `to`.
 As opposed to transferFrom, this imposes no restrictions on msg.sender.

Requirements:

- `to` cannot be the zero address.
- `tokenId` token must be owned by `from`.

Emits an `Transfer` event of ERC721.

### _clearApprove

```solidity
function _clearApprove(address from, uint256 tokenId) internal virtual
```

Approval for `tokenId` from `from` to zero address.

Emits an `Approval` event of ERC721.

### _approve

```solidity
function _approve(address owner, address to, uint256 tokenId) internal virtual
```

Approve `to` to operate on `tokenId` of `owner`

Emits an `Approval` event of ERC721.

### _setApprovalForAll

```solidity
function _setApprovalForAll(address owner, address operator, bool approved) internal virtual
```

Approve `operator` to operate on all of `owner` tokens

Emits an `ApprovalForAll` event of ERC721.

### _balanceOf

```solidity
function _balanceOf(address owner) internal view returns (uint256)
```

Returns the number of tokens in the `owner`'s account.
Note that no validation of the specified address is performed.

### _getMaxTokenCount

```solidity
function _getMaxTokenCount() internal pure returns (uint256)
```

Returns the maximum of tokens that can be stored by the contract.

### _checkOnERC721Received

```solidity
function _checkOnERC721Received(address from, address to, uint256 tokenId, bytes _data) private returns (bool)
```

Internal function to invoke IERC721Receiver.onERC721Received on a target address.
The call is not executed if the target address is not a contract.

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | address | address representing the previous owner of the given token ID |
| to | address | target address that will receive the tokens |
| tokenId | uint256 | uint256 ID of the token to be transferred |
| _data | bytes | bytes optional data to send along with the call |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool whether the call correctly returned the expected magic value |

### _beforeTokenTransfer

```solidity
function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal virtual
```

Hook that is called before any token transfer. This includes minting
and burning.

Calling conditions:

- When `from` and `to` are both non-zero, ``from``'s `tokenId` will be
transferred to `to`.
- When `from` is zero, `tokenId` will be minted for `to`.
- When `to` is zero, ``from``'s `tokenId` will be burned.
- `from` and `to` are never both zero.

To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].

### _beforeTokenMint

```solidity
function _beforeTokenMint(address from, address to, uint256 start, uint256 quantity) internal virtual
```

### _afterTokenTransfer

```solidity
function _afterTokenTransfer(address from, address to, uint256 tokenId) internal virtual
```

Hook that is called after any transfer of tokens. This includes
minting and burning.

Calling conditions:

- when `from` and `to` are both non-zero.
- `from` and `to` are never both zero.

To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].

### _afterTokenMint

```solidity
function _afterTokenMint(address from, address to, uint256 start, uint256 quantity) internal virtual
```


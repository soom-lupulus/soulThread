// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.28;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SoulBadge is ERC721, Ownable {
    // 所有的sbt数量
    uint256 private _tokenIdCounter = 0;
    // 当前八字的sbt数量
    mapping(address => uint) baziTokenId;
    // 存储元数据【tokenId --> data】
    mapping(uint256 => SoulData) public soulData;
    // 用户地址到tokenId的映射
    mapping(address => uint256) userToSoulTokenId;
    // 有几个相同的八字【bazi-->sameBaziNum】
    mapping(string => uint256) baziToSameCnt;
    // 基础元数据URI
    string private baseTokenURI;
    // 限制选择100年
    uint256 private constant mintDateLimit = 100 * 365.25 * 24 * 60 * 60;

    event SoulBadgeMint(address indexed owner, uint256 tokenId, string bazi);
    event CidUpdated(uint256 tokenId, string cid);

    error NonTransferError(string msg);

    struct SoulData {
        string bazi; // 八字
        int32 gender; // 性别：0，1
        int32 longitude; // 经度 * 1000000
        int32 latitude; // 纬度 * 1000000（精确到小数点后6位）
        uint256 birthDate; // 出生日期（Unix时间戳）
        uint256 baziNum; // 当前八字id
        string cid; // IPFS CID
    }

    constructor() ERC721("SoulBaZi", "SBZT") Ownable(msg.sender) {}

    function getTokenIdCounter() public view returns (uint256) {
        return _tokenIdCounter;
    }

    // 铸造灵魂徽章
    function mintSoulBadge(
        string calldata _bazi,
        int32 _gender,
        int32 _longitude,
        int32 _latitude,
        uint256 _birthDate,
        string calldata cid
    ) external {
        require(balanceOf(msg.sender) == 0, "You already have a SoulBadge");
        require(
            _gender == 0 || _gender == 1,
            "Invalid gender (1=male, 0=female)"
        );
        require(
            _birthDate > 0 && _birthDate < block.timestamp,
            "Invalid birth date"
        );
        // 100 年前
        // require(
        //     _birthDate > block.timestamp - mintDateLimit,
        //     "Birth date must be in 100 years"
        // );

        // 验证经纬度在合理范围内
        require(
            _latitude >= -90000000 && _latitude <= 90000000,
            "Invalid latitude"
        );
        require(
            _longitude >= -180000000 && _longitude <= 180000000,
            "Invalid longitude"
        );

        uint256 currentTokenId = ++_tokenIdCounter; // 总数
        uint256 currentBaziId = ++baziToSameCnt[_bazi]; // 相同八字数量
        soulData[currentTokenId] = SoulData({
            bazi: _bazi,
            gender: _gender,
            longitude: _longitude,
            latitude: _latitude,
            birthDate: _birthDate,
            baziNum: currentBaziId,
            cid: cid
        });
        userToSoulTokenId[msg.sender] = currentTokenId;
        _safeMint(msg.sender, currentTokenId);
        emit SoulBadgeMint(msg.sender, currentTokenId, _bazi);
    }

    // 找相同八字对应的id
    function sameBaziCnt(string calldata bazi) public view returns (uint256) {
        return baziToSameCnt[bazi];
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        return string(abi.encodePacked(baseTokenURI, soulData[tokenId].cid));
    }

    function setBaseURI(string memory newBaseURI) external onlyOwner {
        baseTokenURI = newBaseURI;
    }

    // 禁用转移
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {}

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) public virtual override {}

    function updateCID(
        uint256 tokenId,
        string memory newCID
    ) external onlyOwner {
        // 检查tokenId
        soulData[tokenId].cid = newCID;
        emit CidUpdated(tokenId, newCID);
    }
}

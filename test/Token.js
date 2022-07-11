const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token contract", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    // Signer는 ethers.js에서 Ethereum account를 표시하는 객체
    // contract와 다른 account에 transaction을 보낼 때 사용
    const [owner] = await ethers.getSigners();

    // ContractFactory는 ethers.js에서 새로운 smart contract를 deploy하는 abstraction
    const Token = await ethers.getContractFactory("Token");

    // ContractFactory의 instance에 deploy()를 호출하면 deployment를 실행하고 Contract로 resolve하는 Promise 객체를 리턴
    const hardhatToken = await Token.deploy();

    // 한 번 contract가 deployed되면 hardhatToken으로 contract 메소드를 호출 가능함. balanceOf() 메서드 이용
    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    // smart contract function 호출하기 위해 Contract instance를 다시 사용하는 경우. totalSupply()는 공급량을 return하기 때문에 ownerBalance를 체크할 수 있음
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });
});

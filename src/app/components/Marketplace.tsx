import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import marketplaceABI from '../../../artifacts/contracts/marketplace.sol/IFBmarketplace.json';
import Web3Modal from 'web3modal'

const contractABI = marketplaceABI.abi;
// Address of the deployed contract (replace with your contract's address)
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function getProvider() {
      //const RPC_URL = 'https://otter.bordel.wtf/erigon';
      return new ethers.providers.JsonRpcProvider();
  }

export const getContract = async (): Promise<ethers.Contract | undefined> => {
  if (typeof window.ethereum !== "undefined") {

    await window.ethereum.request({ method: "eth_requestAccounts" });
    // Create a new instance of a provider connected to the Ethereum network
    const provider = getProvider();

    // Get the signer (the account that will sign the transactions)
    const signer = provider.getSigner();

    // Create a new instance of the contract
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    return contract;
  } else {
    console.error("Ethereum object not found, install MetaMask.");
    return undefined;
  }
};

// Function to add a product
export const addProduct = async (name: string, price: ethers.BigNumber) => {
  try {
    const contract = await getContract();
    if (contract) {
      const transaction = await contract.addProduct(name, price);
      await transaction.wait();
      console.log("Product added:", transaction);
    }
  } catch (error) {
    console.error("Error adding product:", error);
  }
};

// Function to purchase a product
export const purchaseProduct = async (id: number, price: ethers.BigNumber) => {
  try {
    const contract = await getContract();
    if (contract) {
      const transaction = await contract.purchaseProduct(id, { value: price });
      await transaction.wait();
      console.log("Product purchased:", transaction);
    }
  } catch (error) {
    console.error("Error purchasing product:", error);
  }
};

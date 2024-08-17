"use client";
import React, { useState } from "react";
import { ethers } from "ethers";
import { addProduct, purchaseProduct } from "./components/Marketplace";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [sellprice, setsellPrice] = useState<string>("");
  const [buyprice, setbuyPrice] = useState<string>("");


  const [productId, setProductId] = useState<string>("");

  const handleAddProduct = async () => {
    if (!name || !sellprice) {
      console.error("Name and price are required.");
      return;
    }
    const priceInWei = ethers.utils.parseEther(sellprice);
    await addProduct(name, priceInWei);
  };

  const handlePurchaseProduct = async () => {
    const priceInWei = ethers.utils.parseEther(buyprice);
    const id = parseInt(productId);
    await purchaseProduct(id, priceInWei);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Marketplace</h1>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Add Product</h2>
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 mb-3 text-gray-700 border rounded-lg focus:outline-none focus:border-cyan-500"
            />
            <input
              type="text"
              placeholder="Product Price (in ETH)"
              value={sellprice}
              onChange={(e) => setsellPrice(e.target.value)}
              className="w-full px-3 py-2 mb-3 text-gray-700 border rounded-lg focus:outline-none focus:border-cyan-500"
            />
            <button 
              onClick={handleAddProduct}
              className="w-full bg-cyan-500 text-white py-2 rounded-lg hover:bg-cyan-600 transition duration-300"
            >
              Add Product
            </button>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Purchase Product</h2>
            <input
              type="text"
              placeholder="Product ID"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="w-full px-3 py-2 mb-3 text-gray-700 border rounded-lg focus:outline-none focus:border-cyan-500"
            />
            <input
              type="text"
              placeholder="Product Price (in ETH)"
              value={buyprice}
              onChange={(e) => setbuyPrice(e.target.value)}
              className="w-full px-3 py-2 mb-3 text-gray-700 border rounded-lg focus:outline-none focus:border-cyan-500"
            />
            <button 
              onClick={handlePurchaseProduct}
              className="w-full bg-cyan-500 text-white py-2 rounded-lg hover:bg-cyan-600 transition duration-300"
            >
              Purchase Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
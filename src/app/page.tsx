// pages/index.tsx
"use client";
import React, { useState } from "react";
import { ethers } from "ethers";
import { addProduct, purchaseProduct } from "./components/Marketplace";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [productId, setProductId] = useState<string>("");

  const handleAddProduct = async () => {
    if (!name || !price) {
      console.error("Name and price are required.");
      return;
    }
    const priceInWei = ethers.utils.parseEther(price);
    await addProduct(name, priceInWei);
  };

  const handlePurchaseProduct = async () => {
    const priceInWei = ethers.utils.parseEther(price);
    const id = parseInt(productId);
    await purchaseProduct(id, priceInWei);
  };

  return (
    <div>
      <h1>Marketplace</h1>

      <div>
        <h2>Add Product</h2>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Product Price (in ETH)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      <div>
        <h2>Purchase Product</h2>
        <input
          type="text"
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Product Price (in ETH)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button onClick={handlePurchaseProduct}>Purchase Product</button>
      </div>
    </div>
  );
}

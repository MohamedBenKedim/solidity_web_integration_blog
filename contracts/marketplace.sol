// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract IFBmarketplace {
    // Structure to represent a product
    struct Product {
        uint256 id;
        string name;
        uint256 price;
        address payable seller;
        bool isForSale;
    }

    // Mapping to store all the products
    mapping(uint256 => Product) public products;

    // Counter to keep track of product IDs
    uint256 public productCounter;

    // Event for when a new product is added
    event ProductAdded(uint256 id, string name, uint256 price, address seller);

    // Event for when a product is purchased
    event ProductPurchased(uint256 id, address buyer);

    // Function to add a new product to the marketplace
    function addProduct(string memory _name, uint256 _price) public {
        uint256 id = productCounter;
        Product memory newProduct = Product(id, _name, _price, payable(msg.sender), true);
        products[id] = newProduct;
        productCounter++;
        emit ProductAdded(id, _name, _price, msg.sender);
    }

    // Function to purchase a product
    function purchaseProduct(uint256 _id) public payable {
        Product storage product = products[_id];
        require(product.isForSale, "Product is not for sale");
        require(msg.value >= product.price, "Insufficient payment");
        product.seller.transfer(product.price);
        product.isForSale = false;
        emit ProductPurchased(_id, msg.sender);
    }
}

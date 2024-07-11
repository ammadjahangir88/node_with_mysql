const db = require("../config/db");

// Get all products
const getProducts = async (req, resp) => {
    try {
        const [data] = await db.query('SELECT * FROM Products');
        if (!data.length) {
            return resp.status(404).send({
                success: false,
                message: "No Records Found"
            });
        }
        resp.status(200).send({
            success: true,
            message: "All Products records",
            data
        });
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            message: "Error in Get All Products API",
            error
        });
    }
};

// Create a new product
const createProduct = async (req, resp) => {
    const { name, price, description } = req.body;
    try {
        const [result] = await db.query('INSERT INTO Products (name, price, description) VALUES (?, ?, ?)', [name, price, description]);
        resp.status(201).send({
            success: true,
            message: "Product Created Successfully",
            productId: result.insertId
        });
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            message: "Error in Create Product API",
            error
        });
    }
};

// Update a product
const updateProduct = async (req, resp) => {
    const { id } = req.params;
    const { name, price, description } = req.body;
    try {
        const [result] = await db.query('UPDATE Products SET name = ?, price = ?, description = ? WHERE id = ?', [name, price, description, id]);
        if (result.affectedRows === 0) {
            return resp.status(404).send({
                success: false,
                message: "Product Not Found"
            });
        }
        resp.status(200).send({
            success: true,
            message: "Product Updated Successfully"
        });
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            message: "Error in Update Product API",
            error
        });
    }
};

// Delete a product
const deleteProduct = async (req, resp) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM Products WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return resp.status(404).send({
                success: false,
                message: "Product Not Found"
            });
        }
        resp.status(200).send({
            success: true,
            message: "Product Deleted Successfully"
        });
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            message: "Error in Delete Product API",
            error
        });
    }
};

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };

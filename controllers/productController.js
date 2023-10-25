const fs = require('fs');
const productModel = require('../models/productModel');
const slugify = require('slugify');

//Create a product
const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        //validation
        switch (true) {
            case !name:
                return res.status(200).send({ error: 'Name is required' })
            case !description:
                return res.status(200).send({ error: 'Description is required' })
            case !price:
                return res.status(200).send({ error: 'Price is required' })
            case !category:
                return res.status(200).send({ error: 'Category is required' })
            case !quantity:
                return res.status(200).send({ error: 'Quantity is required' })
            case photo && photo.size > 1000000:
                return res.status(200).send({ error: 'Photo is required and Size should be less than 1mb' })
        }

        const product = new productModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();
        res.status(201).send({
            success: true,
            message: 'Product Created Successfully',
            product
        })

    } catch (error) {
        console.log(error);
        res.status(200).send({
            success: true,
            message: 'Error in Creating Product',
            error
        })
    }
}

//Update a product
const updateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        const { id } = req.params;
        //validation
        switch (true) {
            case !name:
                return res.status(200).send({ error: 'Name is required' })
            case !description:
                return res.status(200).send({ error: 'Description is required' })
            case !price:
                return res.status(200).send({ error: 'Price is required' })
            case !category:
                return res.status(200).send({ error: 'Category is required' })
            case !quantity:
                return res.status(200).send({ error: 'Quantity is required' })
            case photo && photo.size > 1000000:
                return res.status(200).send({ error: 'Photo is required and Size should be less than 1mb' })
        }

        const product = await productModel.findByIdAndUpdate(
            id,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();
        res.status(201).send({
            success: true,
            message: 'Product Updated Successfully',
            product
        })

    } catch (error) {
        console.log(error);
        res.status(200).send({
            success: true,
            message: 'Error in Updating Product',
            error
        })
    }
}

//Get all Products
const getProductController = async (req, res) => {
    try {
        const products = await productModel.find({}).select("-photo").limit(10).sort({ createdAt: -1 }).populate('category');
        res.status(200).send({
            success: true,
            message: 'All Products',
            count: products.length,
            products
        })
    } catch (error) {
        console.log(error)
        res.status(200).send({
            success: false,
            message: 'Error in getting all Products',
            error
        })
    }
}

//get Single Product
const getSingleProductController = async (req, res) => {
    try {
        const { slug } = req.params;
        const product = await productModel.findOne({ slug }).select("-photo").populate('category');
        res.status(200).send({
            success: true,
            message: 'Product retrived successfully',
            product
        })
    } catch (error) {
        console.log(error);
        res.status(200).send({
            success: false,
            message: 'Error getting single product',
            error
        })
    }
}

//get Photo
const productPhotoController = async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productModel.findById(pid).select("photo");
        if (product.photo.data) {
            res.set('Content-type', product.photo.contentType);
            return res.status(200).send(product.photo.data)
        }
    } catch (error) {
        console.log(error);
        res.status(200).send({
            success: false,
            message: 'Error getting product photo',
            error
        })
    }
}

//Delete Product
const deleteProductController = async (req, res) => {
    try {
        const { id } = req.params;
        await productModel.findByIdAndDelete(id).select("-photo");
        res.status(200).send({
            success: true,
            message: 'Product deleted Successfully',
        })
    } catch (error) {
        console.log(error);
        res.status(200).send({
            success: false,
            message: 'Error deleting product',
            error
        })
    }
}

module.exports = {
    createProductController, getProductController, updateProductController,
    getSingleProductController, productPhotoController, deleteProductController
}
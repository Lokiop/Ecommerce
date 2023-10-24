const { default: slugify } = require("slugify");
const categoryModel = require("../models/categoryModel");
const { findById } = require("../models/userModel");

const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(200).send({
                message: 'Category Name is Required'
            })
        }

        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: 'Given category already exists'
            })
        }

        const category = await new categoryModel({ name, slug: slugify(name) }).save();
        res.status(201).send({
            success: true,
            message: 'New Category Created',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(200).send({
            success: false,
            message: 'Error in Category',
            error
        })
    }
}

const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(200).send({
                message: 'Category Name is Required'
            })
        }

        const { id } = req.params;
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });
        res.status(200).send({
            success: true,
            message: 'Category Updated Successfully',
            category
        })
    } catch (error) {
        console.log(error);
        res.status(200).send({
            success: false,
            message: 'Error in updating Category',
            error
        })
    }
}

//Get all categories
const categoryController = async (req, res) => {
    try {
        const categories = await categoryModel.find({});
        res.status(200).send({
            success: true,
            message: "All Categories List",
            categories,
        })
    } catch (error) {
        console.log(error);
        res.status(200).send({
            success: false,
            message: 'Error while getting all Categories',
            error
        })
    }
}

//Get Single Category
const singleCategoryController = async (req, res) => {
    try {
        const { slug } = req.params;
        const category = await categoryModel.findOne({ slug })
        res.status(200).send({
            success: true,
            message: 'Single Category Successfully retrived',
            category
        })
    } catch (error) {
        console.log(error);
        res.status(200).send({
            success: false,
            message: 'Error while getting single Category',
            error
        })
    }
}

//delete a Category
const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: 'Category deleted Successfully',
            category
        })
    } catch (error) {
        console.log(error);
        res.status(200).send({
            success: false,
            message: 'Error while Deleting a Category',
            error
        })
    }
}

module.exports = {
    createCategoryController, updateCategoryController, categoryController,
    singleCategoryController, deleteCategoryController
};
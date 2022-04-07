const express = require("express")
const {createNewBlog, getAllBlogs, updateBlog, deleteBlog}=require("../controllers/blog")
const router = express.Router()

router.post("/", createNewBlog)
router.get("/", getAllBlogs)
router.patch("/:id", updateBlog)
router.delete("/:id", deleteBlog)
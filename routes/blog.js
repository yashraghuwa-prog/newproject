const { Router } = require("express");
const multer = require("multer");
const path = require("path");

const Blog = require("../models/blog");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve("./public/uploads/"));
    },

    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    },
});

const upload = multer({ storage: storage });

const router = Router();

router.get("/add-new", (req, res) => {
    return res.render("addBlog", {
        user: req.user,
    });
});

router.get('/:id',async(req,res)=>{
    const blog= await Blog.findById(req.params.id)
    return res.render('blog',{
        user:req.user,
        blog,
    });
})

router.post("/", upload.single("coverImage"), async (req, res) => {

    const { title, body } = req.body;

    if (!req.file) {
        return res.status(400).send("No image uploaded");
    }

    const blog = await Blog.create({
        body,
        title,
        createdBy: req.user._id,
        coverImageUrl: `/uploads/${req.file.filename}`,
    });

    return res.redirect("/");
});

module.exports = router;
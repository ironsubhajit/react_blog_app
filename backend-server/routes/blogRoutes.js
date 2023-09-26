const express = require("express");
const Blog = require("../models/blog");
const router = express.Router();
// const verifyToken = require("../routes/verifyLoginToken");
// const { blogLoginValidation } = require("../validation");

// GET ALL THE BLOGS
router.get("/list", async (req, res) => {
  try {
    // console.log(`Request Body-header -blog-route: ${JSON.stringify(req.headers)}`);
    console.log(`fetching blogs list...`);
    const blogList = await Blog.find();
    console.log(`blog list fetched.`);
    return res.status(200).send(JSON.stringify(blogList));
  } catch (err) {
    console.log(`Error-log: ${err}`);
    return res.status(404).send(JSON.stringify({ message: `${err}` }));
  }
});

// FETCH SPECIFIC BLOG BY ID
router.get("/:blogID/view", async (req, res) => {
  try {
    console.log(`fetch blogID: ${req?.params?.blogID} blog's result...`);
    const blog = await Blog?.findOne({ _id: req?.params?.blogID });
    console.log(`fetched: ${JSON.stringify(blog)}`);

    if (blog == null) throw new Error("Bad request ! Invalid Blog !"); // did not find blog

    return res.status(200).send(JSON.stringify(blog));
  } catch (err) {
    console.log(`Error-log: ${err}`);
    return res.status(404).send(JSON.stringify({ message: `${err}` }));
  }
});

// ADD NEW BLOG DETAILS
router.post("/add", async (req, res) => {
  try {
    const blog = new Blog({
      title: req?.body?.title,
      imageUrl: req?.body?.imageUrl,
      category: req?.body?.category,
      content: req?.body?.content,
      likes: Number(req?.body?.likes),
      userId: req?.body?.userId,
    });
    const saveBlog = await blog.save();
    res.json(saveBlog);
  } catch (err) {
    res.status(404).send({ message: err?.message });
  }
});

// UPDATE SPECIFIC BLOG DETAIL
router.patch("/:blogId/edit", async (req, res) => {
  try {
    console.log(`req body: ${req?.body}`);
    console.log(`get blog id from parameter : ${req?.params?.blogId}`);
    const blog = await Blog.updateOne(
      { _id: req?.params?.blogId },
      {
        $set: {
          title: req?.body?.title,
          imageUrl: req?.body?.imageUrl,
          category: req?.body?.category,
          content: req?.body?.content,
        },
      }
    );
    console.log(`updated blog: ${blog}`);
    return res.json(blog);
  } catch (err) {
    return res.json({ message: err });
  }
});

// UPDATE SPECIFIC BLOG LIKE
router.patch("/:blogId/update/like", async (req, res) => {
  try {
    console.log(`get blog id from parameter : ${req?.body?.blogId}`);
    console.log(`get blog like from parameter : ${req?.body?.like}`);
    let blog = await Blog?.findOne({ _id: req?.params?.blogId });
    console.log(`fetched: ${JSON.stringify(blog)}`);

    if (blog == null) throw new Error("Bad request ! Invalid Blog !"); // did not find blog

    let currentLikeCount = blog?.likes;
    
    if (req?.body?.like){
      currentLikeCount += 1
    } else {
      currentLikeCount -= 1
    }
    

    blog = await Blog.updateOne(
      { _id: req?.params?.blogId },
      {
        $set: {
          likes: Number(currentLikeCount),
        },
      }
    );
    console.log(`updated blog: ${blog}`);
    return res.json(blog);
  } catch (err) {
    return res.json({ message: err });
  }
});

// DELETE A BLOG
router.delete("/:blogId/remove", async (req, res) => {
  try {
    const blog = await Blog.find({ _id: req?.params?.blogId });
    const status = await Blog.deleteOne({ _id: req?.params?.blogId });
    console.log(`----- Blog deleted: ${JSON.stringify(blog)} -----`);
    return res.json(status);
  } catch (err) {
    return res.json({ message: err });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();

//Index/Home Page
router.get(`/`, (req, res)=>{
    res.render(`index`);
})

module.exports = router;
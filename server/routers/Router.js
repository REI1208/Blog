const express = require("express")
const router = express.Router()

const { genid, query } = require("../db/DbUtils")

router.get("/test", async (req, res) => {
    const out = await query("SELECT * FROM `admin`")
    res.send({
        id: genid.NextId(),
        out
    });
});

module.exports = router
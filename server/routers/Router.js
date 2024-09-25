const express = require("express")
const router = express.Router()

const { genid, query } = require("../db/DbUtils")

router.get("/test", async (req, res) => {
    // db.query("SELECT * FROM `admin`", (err, rows) => {  // 使用 db.query 代替 db.all
    //     if (err) {
    //         console.error("Database query error:", err);
    //         res.status(500).send({ error: "Database query failed" });
    //         return;
    //     }

    // });
    const out = await query("SELECT * FROM `admin`")
    res.send({
        id: genid.NextId(),
        out
    });
});

module.exports = router
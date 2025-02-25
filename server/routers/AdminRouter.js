const express = require("express")
const router = express.Router()
const { v4: uuidv4 } = require("uuid")
const { genid, query } = require("../db/DbUtils")

router.post("/login", async (req, res) => {

    let { account, password } = req.body;

    try {
        let rows = await query("select * from `admin` where account = ? AND password = ?", [account, password])
        if (rows.length > 0) {

            let login_token = uuidv4()
            let update_token_sql = "UPDATE `admin` SET `token` = ? where `id` = ?"

            await query(update_token_sql, [login_token, rows[0].id])

            let admin_info = rows[0]
            admin_info.token = login_token
            admin_info.password = ""

            res.send({
                code: 200,
                msg: "login success",
                data: admin_info
            })
        } else {
            res.send({
                code: 500,
                msg: "login fail"
            })
        }
    } catch (error) {
        // console.log("Login error:", err)
        res.send({
            code: 500,
            msg: "login err"
        })
    }


});

module.exports = router
const express = require("express")
const router = express.Router()
const path = require("path")
const fs = require("fs")
const { genid, query } = require("../db/DbUtils")

router.post("/rich_editor_upload", async (req, res) => {
    if (!req.files) {
        res.send({
            "errno": 1,
            message: "something wrong with rich_editor_upload"
        })
        return
    }
    let files = req.files
    let ret_file = []

    for (let file of files) {
        //获取文件后缀名
        let file_text = file.originalname.substring(file.originalname.lastIndexOf(".") + 1)
        //随机文件名
        let file_name = genid.NextId() + "." + file_text
        //修改名字+移动文件
        fs.renameSync(
            process.cwd() + "/public/upload/temp/" + file.filename,
            process.cwd() + "/public/upload/" + file_name
        )
        ret_file.push("/upload/" + file_name)

    }
    res.send({
        "errno": 0,
        "data": {
            "url": ret_file[0]
        }

    })
});

module.exports = router
const express = require("express")
const router = express.Router()
const { genid, query } = require("../db/DbUtils")
//列表接口
router.get("/list", async (req, res) => {

    const search_sql = "SELECT * FROM `category`"

    try {
        let rows = await query(search_sql)
        res.send({
            code: 200,
            msg: "查询列表成功",
            rows
        })
    } catch (error) {
        res.send({
            code: 500,
            msg: "查询列表失败"
        })
    }
});
//删除接口
router.delete("/_token/delete", async (req, res) => {

    let id = req.query.id
    const delete_sql = "DELETE FROM `category` WHERE `id` = ?"
    try {
        let rows = await query(delete_sql, [id]);
        res.send({
            code: 200,
            msg: "删除成功"
        })
    } catch (error) {
        res.send({
            code: 500,
            msg: "删除失败"
        })
    }

});
//修改接口
router.put("/_token/update", async (req, res) => {
    let { id, name } = req.body
    const update_sql = "UPDATE `category` SET `name` = ? WHERE `id` = ?"
    try {
        let rows = await query(update_sql, [name, id])
        res.send({
            code: 200,
            msg: "修改成功"
        })
    } catch (error) {
        res.send({
            code: 500,
            msg: "修改失败"
        })
    }
});
//添加接口
router.post("/_token/add", async (req, res) => {

    let { name } = req.body
    const insert_sql = "INSERT INTO `category` (`id`,`name`) VALUES (?,?)"

    try {
        let rows = await query(insert_sql, [genid.NextId(), name])
        res.send({
            code: 200,
            msg: "添加成功"
        })
    } catch (error) {
        res.send({
            code: 500,
            msg: "添加失败"
        })
    }

});

module.exports = router
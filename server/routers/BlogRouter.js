const express = require("express")
const router = express.Router()
const { genid, query } = require("../db/DbUtils")
//单篇查询接口
router.get("/detail", async (req, res) => {
    let { id } = req.query
    let detali_sql = "SELECT * FROM `blog` WHERE `id` = ? "

    try {
        let rows = await query(detali_sql, [id])
        res.send({
            code: 200,
            msg: "查询单篇成功",
            rows
        })
    } catch (error) {
        res.send({
            code: 500,
            msg: "查询单篇失败",
            error: error.message
        })
    }
})



//查询接口
router.get("/search", async (req, res) => {

    let { keyword, categoryId, page, pageSize } = req.query

    page = parseInt(page) || 1;
    pageSize = parseInt(pageSize) || 10;
    categoryId = parseInt(categoryId) || 0;
    keyword = keyword == null ? "1" : keyword;

    let params = []
    let where_sqls = []
    if (categoryId != 0) {
        where_sqls.push(" `category_id` = ? ")
        params.push(categoryId)
    }

    if (keyword != "1") {
        where_sqls.push(" (`title` LIKE ? OR `content` LIKE ?) ")
        params.push("%" + keyword + "%")
        params.push("%" + keyword + "%")
    }

    let whereSqlStr = ""
    if (where_sqls.length > 0) {
        whereSqlStr = " WHERE " + where_sqls.join(" AND ")
    }

    //分页数据查询
    let searchSql = " SELECT `id`,`category_id`,`create_time`,`title`,SUBSTRING(`content`,1,50) AS `content` FROM `blog` " + whereSqlStr + " ORDER BY `create_time` DESC LIMIT ?,? "
    let searchSqlPararms = params.concat((page - 1) * pageSize, pageSize)

    //总数查询
    let searchCountSql = " SELECT count(*) AS `count` FROM `blog` " + whereSqlStr;
    let searchCountPararms = params
    console.log(searchSql)
    try {
        let searchResult = await query(searchSql, searchSqlPararms)
        let countResult = await query(searchCountSql, searchCountPararms)
        console.log("searchResult:", searchResult);
        console.log("countResult:", countResult);
        res.send({
            code: 200,
            msg: "查询列表成功",
            keyword,
            categoryId,
            page,
            pageSize,
            rows: searchResult,
            count: countResult[0].count
        })
    } catch (error) {
        res.send({
            code: 500,
            msg: "查询列表失败",
            error: error.message
        })
    }
});
//删除接口
router.delete("/_token/delete", async (req, res) => {

    let id = req.query.id
    const delete_sql = "DELETE FROM `blog` WHERE `id` = ?"
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
router.post("/_token/update", async (req, res) => {
    let { id, title, categoryId, content } = req.body

    const update_sql = "UPDATE `blog` SET `title` = ?,`content` = ?,`category_id`=? WHERE `id` = ?"
    let params = [title, content, categoryId, id]

    try {
        await query(update_sql, params)
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
    let { title, categoryId, content } = req.body
    let id = genid.NextId()
    let create_time = new Date().getTime();

    const insert_sql = "INSERT INTO `blog` (`id`,`title`,`category_id`,`content`,`create_time`) VALUES (?,?,?,?,?)"
    let params = [id, title, categoryId, content, create_time]

    try {
        await query(insert_sql, params)
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
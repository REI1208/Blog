//引入express
const express = require("express")
const multer = require("multer")
const path = require("path")
const port = 3001
const { query } = require("./db/DbUtils")
//实例创建
const app = express();


//开放跨域请求
app.use(function (req, res, next) {
    //允许的跨域域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的Header类型
    res.header("Access-Control-Allow-Headers", "*");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method == "OPTIONS") res.sendStatus(200);//让options尝试请求快速结束
    else next()
})

//引入JSON
app.use(express.json())
const update = multer({
    dest: "./public/upload/temp"
})
app.use(update.any())
app.use(express.static(path.join(__dirname, "public")))


//自定义检验登录中间件
const ADMIN_TOKEN_PATH = "/_token"
app.all("*", async (req, res, next) => {
    if (req.path.indexOf(ADMIN_TOKEN_PATH) > -1) {
        let { token } = req.headers
        console.log(token)

        let admin_token_sql = "SELECT * FROM `admin` WHERE `token` = ?"
        try {
            let adminResult = await query(admin_token_sql, [token]);
            if (adminResult.length === 0) {
                // 如果 token 不存在，返回未登录响应
                return res.status(403).send({
                    code: 403,
                    msg: "请先登录"
                });
            }
            // 如果 token 验证通过，继续处理请求
            next();
        } catch (error) {
            // 捕获错误并返回服务器错误响应
            return res.status(500).send({
                code: 500,
                msg: "服务器错误，请稍后再试",
                error: error.message
            });
        }
    } else {
        // 如果路径不包含 ADMIN_TOKEN_PATH，继续处理请求
        next();
    }
})




//路由注册
app.use("/test", require("./routers/Router"))
app.use("/admin", require("./routers/AdminRouter"))
app.use("/category", require("./routers/CategoryRouter"))
app.use("/blog", require("./routers/BlogRouter"))
app.use("/upload", require("./routers/UploadRouter"))



app.get("/", (req, res) => {
    res.send("helloword");
})

app.listen(port, () => {
    console.log(`服务器正在端口 ${port} 运行`);
});
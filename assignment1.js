// Written by : Rahmatullah Beekun
// Student ID : 133830208

const HTTP_PORT = process.env.port || 3000;
const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const app = express();
const readline = require("linebyline");
const rl = readline("./imagelist.txt");
let playerListArray = new Array();

app.engine(".hbs", exphbs.engine({
    extname: ".hbs",
    defaultLayout: false,
    layoutsDir: path.join(__dirname)
}));
app.set("view engine", ".hbs");
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('gallery_pictures'));
app.use(express.static('./'));

rl.on("line", (line, lineCount, byteCount) => {
    playerListArray.push(line.slice(0,(line.length - 4)));
})
.on("error", (err) =>{
    console.error(err);
});

app.get("/", (req,res) => {
    let someData = {
        playerList : playerListArray,
        input : "Manchester United Football Club"
    }
    res.render('view', {data: someData});
});

app.post("/", (req, res) => {
    i = req.body.rdioPlayer;
    if (i == undefined){
        i = "Manchester United Football Club"
    }
    let someData = {
        playerList : playerListArray,
        input : i
    }
    res.render('view', {data : someData});
});

const server = app.listen(HTTP_PORT, () => {
    console.log(`Listening on port ${HTTP_PORT}`);
});
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const db = mysql.createConnection({
    host: "127.0.0.1",
    user:"root",
    password:"",
    database:"user"
});

if(db){
    console.log("Connected to db")
}else{
    console.log("errror")
}
 
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/api/get", (req,res)=>{
    const sqlGet = "SELECT * FROM contact_db";
    db.query(sqlGet, (error, result) =>{
        res.send(result);
    });
});

app.post("/api/post", (req,res) => {
    const {name, email, contact} = req.body;
    const sqlInsert = "INSERT INTO contact_db(name, email, contact) VALUES (?,?,?)";
    db.query(sqlInsert, [name,email,contact], (error,result)=>{
        if(error){
            console.log(error);
        }
        // res.send(result);
    });
});


app.delete("/api/remove/:id", (req,res) => {
    const {id} = req.params;
    const sqlRemove = "DELETE FROM contact_db where id= ?";
    db.query(sqlRemove, id, (error,result)=>{
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

app.get("/api/get/:id", (req,res)=>{
    const {id} = req.params;
    const sqlGet = "SELECT * FROM contact_db WHERE id=?";
    db.query(sqlGet, id, (error, result) =>{
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/api/update/:id", (req,res)=>{
    const {id} = req.params;
    const {name,email,contact} = req.body;
    const sqlUpdate = "UPDATE contact_db SET name=?, email=?, contact=? WHERE id=?";
    db.query(sqlUpdate, [name,email,contact,id], (error, result) =>{
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

app.get("/", (req,res)=>{
    // const sqlInsert = "INSERT INTO contact_db(name, email, contact) VALUES ('prasad', 'prasad@gmail.com', 9232290923)";
    // db.query(sqlInsert, (error, result) =>{
    //     console.log("error", error);
    //     console.log("result",result);
    //     res.send("Hello Express");
    // });
});

app.listen(5000, () =>{
    console.log("Server is running on port 5000");
})
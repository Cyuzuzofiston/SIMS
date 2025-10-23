const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const port = 2000
const app = express()
const ExcelJS = require('exceljs')

const path = require("path");

// After your routes:
app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


app.use(cors())
app.use(express.json())


app.listen(port, () => {
    console.log("Server is running on http://localhost:" + port)
})

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'sims'
})
db.connect((err)=>{
    if(err){
        console.log("Error connecting to mysql database")
    }
    else{
        console.log("Connected to mysql database")
    }
})


app.get('/download-stockoutreport', async (req, res) => {

        db.query('SELECT * FROM stockout', async (err, results) => {
            if (err) return res.status(500).json({ error: err });

            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Report');

            // Define header row
            worksheet.columns = [
                { header: 'Name', key: 'name', width: 10 },
                { header: 'StockoutQuantity', key: 'stockoutquantity', width: 20 },
                { header: 'StockOutUnitPrice', key: 'stockoutunitprice', width: 15 },
                { header: 'StockOutTotalPrice', key: 'stockouttotalprice', width: 15 },
                {header: 'StockOutDate', key: 'stockoutdate', width:15}
                // Add more columns based on your table
            ];

            // Add data
            results.forEach(row => worksheet.addRow(row));

            // Set response headers
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=report.xlsx');

            // Send Excel file
            await workbook.xlsx.write(res);
            res.end();
        });
  
});




app.get('/download-stockinreport', async (req, res) => {

        db.query('SELECT * FROM stockin', async (err, results) => {
            if (err) return res.status(500).json({ error: err });

            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Report');

            // Define header row
            worksheet.columns = [
                { header: 'Name', key: 'name', width: 10 },
                { header: 'StockinQuantity', key: 'stockinquantity', width: 20 },
                
                {header: 'StockInDate', key: 'stockindate', width:15}
                // Add more columns based on your table
            ];

            // Add data
            results.forEach(row => worksheet.addRow(row));

            // Set response headers
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=report.xlsx');

            // Send Excel file
            await workbook.xlsx.write(res);
            res.end();
        });
  
});



app.get('/download-sparepartreport', async (req, res) => {

        db.query('SELECT * FROM stockout', async (err, results) => {
            if (err) return res.status(500).json({ error: err });

            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Report');

            // Define header row
            worksheet.columns = [
                { header: 'Name', key: 'name', width: 10 },
                { header: 'Category', key: 'category', width: 20 },
                { header: 'Quantity', key: 'quantity', width: 15 },
                { header: 'UnitPrice', key: 'unitprice', width: 15 },
                {header: 'TotalPrice', key: 'totalprice', width:15},
                {header: 'Status', key: 'status', width:15}
                // Add more columns based on your table
            ];

            // Add data
            results.forEach(row => worksheet.addRow(row));

            // Set response headers
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=report.xlsx');

            // Send Excel file
            await workbook.xlsx.write(res);
            res.end();
        });
  
});



app.get("/", (req, res)=>{
    res.json("WELCOME TO BACKEND")
})

//MEMBERS ROUTES
app.post("/createmember", (req, res) => {
    const {username} = req.body
    const usernamecheck = "SELECT * FROM user WHERE username = ?";
    db.query(usernamecheck, [username], (err, result) => {
        if (err) {
            console.log("Failed to add this member", err)
        }
        else {
            if (result.length > 0) {
                res.send({ message: "Username Alredy Taken" })
            }
            else {
                const {username, password} = req.body
                const sql = "INSERT INTO user (username, password) VALUES(?,?)";
                db.query(sql, [username,password], (err, result) => {
                    if (err) {
                        console.log("Failed to register this user", err)
                        res.status(500).send(err)
                    }
                    else {
                        res.send(result)
                    }
                })
            }
        }
    })
}
)

//LOGIN route

app.post('/login', (req, res) => {
    const { username, password } = req.body
    const sql = "SELECT * FROM user WHERE username=? AND password=?";
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            console.log("Failed to login")
        }
        else {
            if (result.length > 0) {
                res.send({ message: "Logged in successfully" })
            }
            else {
                res.send({ message: "Incorrect Username or password" })
            }
        }
    })
})






//Spare parts Routes

app.post('/addsparepart', (req, res)=>{
    const {name, category, quantity, unitprice, totalprice, status} = req.body
    const sql = "INSERT INTO sparepart(name, category, quantity, unitprice, totalprice, status) VALUES(?,?,?,?,?,?)";
    db.query(sql, [name, category, quantity, unitprice, totalprice, status], (err,result)=>{
        if(err){
            console.log("Error adding a spare part", err)
        }
        else{   
            res.send(result)
        }
    })
})
//get all spare parts
app.get("/getallspareparts", (req, res)=>{
    const sql = "SELECT * FROM sparepart";
    db.query(sql, (err,result)=>{
      if(err){
        console.log("Error getting all spare parts", err)
      }
      else{
        res.send(result)
      }
    })
})
//get all spare parts with not available status
app.get("/getsp", (req, res)=>{
    const sql = "SELECT * FROM sparepart WHERE status = 'Not available'";
    db.query(sql, (err,result)=>{
      if(err){
        console.log("Error getting all spare parts", err)
      }
      else{
        res.send(result)
      }
    })
})

//add stock in
app.post('/addstockin', (req, res)=>{
    const {name, stockinquantity} = req.body
    const sql = "INSERT INTO stockin (name, stockinquantity) VALUES(?,?)";
    db.query(sql, [name, stockinquantity], (err, result)=>{
        if(err){
            console.log("Error addin stockin", err)
        }
        else{
            res.send(result)
        }
    })
})
//get stockin
app.get('/getstockin', (req, res)=>{
    const sql = "SELECT sp.name, si.stockinquantity AS quantity, si.stockindate FROM sparepart sp JOIN stockin si ON sp.name = si.name WHERE sp.status = 'Available'";
    db.query(sql, (err, result)=>{
        if(err){
            console.log("Error getting spare parts", err)
        }
        else{
            res.send(result)
        }
    })
})
//add stockout
app.post('/addstockout', (req, res)=>{
    const {name,stockoutquantity,stockoutunitprice,stockouttotalprice} = req.body
    const sql = "INSERT INTO stockout(name ,stockoutquantity,stockoutunitprice,stockouttotalprice) VALUES(?,?,?,?)";
    db.query(sql, [name, stockoutquantity, stockoutunitprice, stockouttotalprice], (err, result)=>{
        if(err){
            console.log("Failed to add stockout", err)
        }
        else{
            res.send(result)
        }
    })
})
//get all stockout
app.get('/getallstockout', (req, res)=>{
    const sql = "SELECT * FROM stockout"
      db.query(sql, (err, result)=>{
        if(err){
            console.log("Failed to fetch all stock outs", err)
        }
        else{
            res.send(result)
        }
      })
})
//GET STOCK OUT BY ID
app.get('/getstockout/:id', (req, res)=>{
    const {id} = req.params
    const sql = "SELECT * FROM stockout WHERE id=?"
    db.query(sql, [id], (err, result)=>{
        if(err){
            console.log('Error getting this stockout', err)
        }
        else{
            res.send(result[0])
        }
    })
})



//delete stockout
app.delete("/delete/:id", (req, res)=>{
    const {id} = req.params
    const sql = "DELETE FROM stockout WHERE id=?";
    db.query(sql, [id], (err, result)=>{
        if(err){
            console.log("Error deleting stockout", err)
        }
        else{
            res.send(result)
        }
    })
})

app.put("/updatestockout/:id", (req, res) => {
  const { id } = req.params;
  const { name, stockoutquantity, stockoutunitprice, stockouttotalprice } = req.body;
  const sql = "UPDATE stockout SET name=?, stockoutquantity=?, stockoutunitprice=?, stockouttotalprice=? WHERE id=?";
  db.query(sql, [name, stockoutquantity, stockoutunitprice, stockouttotalprice, id], (err, result) => {
    if (err) {
      console.log("Error updating stockout", err);
      res.status(500).send("Failed to update");
    } else {
      res.send(result);
    }
  });
});

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const User = require("../usermodel");

const app = express();



const PORT = 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..")));

// MongoDB Connection
require("dotenv").config();


mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("✅ MongoDB Connected Successfully");
})
.catch((err) => {
    console.log("❌ MongoDB Connection Failed");
    console.error(err);
});



// Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/signup.html", (req, res) => {
    res.sendFile(path.join(__dirname, "signup.html"));
});

app.get("/login.html", (req, res) => {
    res.sendFile(path.join(__dirname, "login.html"));
});

app.get("/test", (req, res) => {
    res.send("TEST PAGE WORKING");
});

app.get("/hello", (req, res) => {
    res.send("HELLO WORKING");
});

/// Home

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "home.html"));
});

// Hello Test
app.get("/hello", (req, res) => {
  res.send("HELLO WORKING");
});

// Test
app.get("/test", (req, res) => {
  res.send("TEST PAGE WORKING");
});

// Signup Page

app.post("/login", async (req, res) => {
    try {
        const { email, password, role } = req.body;

        const user = await User.findOne({
            email,
            password,
            role
        });

        if (!user) {
            return res.json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        res.json({
            success: true,
            user
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});
pp.get("/signup.html", (req, res) => {
  res.sendFile(path.join(__dirname, "signup.html"));
});
app.post("/flood-assessment", async (req, res) => {

    try {

        const { email, score, total } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        user.score = score;
        user.total = total;

        await user.save();

        res.json({
            success: true,
            message: "Assessment Saved Successfully"
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }

});
app.get("/certificate.html", (req, res) => {
    res.sendFile(path.join(__dirname, "certificate.html"));
});

// Login Page
app.get("/login.html", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});
app.get("/students", async (req, res) => {

    const users = await User.find({ role: "student" });

    let html = `
    <!DOCTYPE html>
    <html>
    <head>
    <title>Students</title>

    <style>

    body{
        font-family:Arial;
        background:#f4f4f4;
        padding:30px;
    }

    table{
        width:100%;
        border-collapse:collapse;
        background:white;
    }

    th,td{
        border:1px solid #ddd;
        padding:12px;
        text-align:center;
    }

    th{
        background:#007bff;
        color:white;
    }

    h2{
        text-align:center;
    }

    </style>

    </head>
    <body>

    <h2>Student Assessment Report</h2>

    <table>

    <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Score</th>
        <th>Total</th>
        <th>Percentage</th>
    </tr>
    `;

    users.forEach(user => {

        let percent = 0;

        if(user.total > 0){
            percent = (user.score / user.total) * 100;
        }

        html += `
        <tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>${user.score}</td>
            <td>${user.total}</td>
            <td>${percent}%</td>
        </tr>
        `;
    });

    html += `
    </table>

    </body>
    </html>
    `;

    res.send(html);

});

// Start Server
app.listen(3001, () => {
  console.log("Server running on port 3001");
});
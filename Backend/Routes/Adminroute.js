import express from 'express'
import con from '../utils/db.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import multer from "multer";
import path from "path"

const router = express.Router()

router.post('/adminlogin', (req, res) => {
    const sql = "SELECT * from `admin` where email = ? and password = ?"
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query error" });
        if (result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign(
                { role: "admin", email: email, id:result[0].id },
                "jwt_secret_key",
                { expiresIn: '1d' }
            );
            res.cookie('token', token)
            return res.json({ loginStatus: true });
        } else {
            return res.json({ loginStatus: false, Error: "wrong email or password" })
        }
    })
});
router.get('/category', (req, res) => {
    const sql = 'SELECT * FROM category';
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.post('/add_category', (req, res) => {
    const sql = "INSERT INTO category (`name`) VALUES (?)"
    con.query(sql, [req.body.category], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true })
    })
})

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,'public/Images')
    },
    filename:(req, file, cb) =>{
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage:storage
})
router.post('/add_users', upload.single('image'), (req, res) => {
    const sql = "INSERT INTO users (`name`, `email`, `password`, `address`, `phone`, `image`, `category_id`) VALUES (?)"
    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        const values = [
           req.body.name,
           req.body.email,
           hash,
           req.body.address, 
           req.body.phone,
           req.file.filename,
           req.body.category_id
        ]
        con.query(sql,[values],(err,result) =>{
            if (err) return res.json({ Status: false, Error: err })
            return res.json({ Status: true })
        })
    })
})

router.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.get('/users/:id',(req,res)=>{
    const id = req.params.id;
    const sql = 'SELECT * FROM users WHERE id =?';
    con.query(sql,[id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })   
})
router.put('/edit_users/:id', (req,res) =>{
    const id = req.params.id;
    const sql = `UPDATE users set name = ?, email = ?, phone = ?, address =?, category_id =? Where id =?`
    const values = [
        req.body.name,
        req.body.email,
        req.body.phone,
        req.body.address, 
        req.body.category_id
     ]
    con.query(sql,[...values, id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err })
        return res.json({ Status: true, Result: result })
    })  
})
router.delete('/delete_users/:id',(req, res) => {
    const id =  req.params.id;
    const sql = "delete from users where id = ?"
    con.query(sql,[id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err })
        return res.json({ Status: true, Result: result }) 
    })  
})
router.get('/admin_count',(req, res) =>{
    const sql = "select count(id) as admin from admin";
    con.query(sql,(err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err })
        return res.json({ Status: true, Result: result }) 
    })  
})
router.get('/users_count',(req, res) =>{
    const sql = "select count(id) as users from users";
    con.query(sql,(err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err })
        return res.json({ Status: true, Result: result }) 
    })  
})
//admin list
// router.get('/admin_records', (req,res) =>{
//     const sql = "select * from admin"
//     con.query(sql,(err, result) => {
//         if (err) return res.json({ Status: false, Error: "Query Error" + err })
//         return res.json({ Status: true, Result: result }) 
//     })  
// })

router.get('/logout',(req, res) =>{
    res.clearCookie('token')
    return res.json({Status:true})
})
export { router as adminRouter }
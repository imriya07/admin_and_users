import express from 'express'
import con from '../utils/db.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const salt = 10;
const router = express.Router()
router.post('/userslogin', (req, res) => {
    const sql = "SELECT * from users where email = ?";
    con.query(sql, [req.body.email], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query error" });
        if (result.length > 0) {
            bcrypt.compare(req.body.password, result[0].password, (err, response) => {
                if (err) return res.json({ loginStatus: false, Error: "Wrong password" });
                if (response) {
                    const email = result[0].email;
                    const token = jwt.sign(
                        { role: "users", email: email,id:result[0].id },
                        "jwt_secret_key",
                        { expiresIn: '1d' }
                    );
                    res.cookie('token', token)
                    return res.json({ loginStatus: true, id:result[0].id });
                }
            })
        } else {
            return res.json({ loginStatus: false, Error: "wrong email or password" })
        }
    })
});
router.get('/detail/:id',(req, res) =>{
    const id = req.params.id;
    const sql = "SELECT  * FROM users where id = ?"
    con.query(sql,[id],(err, result) =>{
        if(err) return res.json({Status:false});
        return res.json(result)
    })
})
router.get('/logout',(req, res) =>{
    res.clearCookie('token')
    return res.json({Status:true})
})
// const storage = multer.diskStorage({
//     destination:(req,file,cb) => {
//         cb(null,'public/Images')
//     },
//     filename:(req, file, cb) =>{
//         cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
//     }
// })
// const upload = multer({
//     storage:storage
// })
router.post('/register', (req, res) => {
    const sql = "INSERT INTO users (`name`, `email`, `password`) VALUES (?)"
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        const values = [
           req.body.name,
           req.body.email,
           hash,
        //    req.body.address, 
        //    req.body.phone,
        //    req.file.filename,
        //    req.body.category_id
        ]
        con.query(sql,[values],(err,result) =>{
            if (err) return res.json({ Status: false, Error: err })
            return res.json({ Status: true })
        })
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
export { router as usersRouter }
import  express  from "express";
import cors from 'cors';
import { adminRouter } from "./Routes/Adminroute.js";
import { usersRouter } from "./Routes/usersroute.js"; 
import pkg from 'jsonwebtoken';
import cookieParser from "cookie-parser";
const  app = express()
const { Jwt } = pkg;
app.use(cors({
    origin:["http://localhost:5173"],
    methods:['GET','POST','PUT','DELETE'],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use('/auth',adminRouter)
app.use('/users',usersRouter)
app.use(express.static('Public'))
const verifyUser = (req, res, next) => {
    const token = req.cookies.tokan;
    if(token){
        Jwt.verify(token,"jwt_secret_key",(err,decoded) =>{
            if(err) return res.json({Status:false, Error:"Wrong Token"})
            req.id = decoded.id;
        req.role = decoded.role;
        next()
        })
    }else{
        return res.json({Status: false, Error: "Not authenticated"})
    }
}
app.get('/verify',verifyUser,(req,res) =>{
    return res.json({Status:true, role: req.role, id: req.id})
} );

app.get("/",(req,res)=>{
    res.send("hello world")
});
app.listen(8080,() =>{
    console.log("server is running")
})
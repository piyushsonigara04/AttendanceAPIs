const Teacher = require("../Models/TeacherModel")


exports.login = async (req,res)=>{
    try {
        const {username,password} = req.body;

        //user is registered or not 
        const user = await Teacher.findOne({username,password});

        if(user){
            return res.status(200).json({
                status:"Success",
                message:"Logged In Successfully!!",
                data:user
            })
        }
        else{
            return res.status(400).json({
                message:"Invalid username or password"
            })
        }
    } catch (error) {
        res.status(400).json({
            status:"Error",
            message:error.message
        })
    }
}


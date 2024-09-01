const Teacher = require("../Models/TeacherModel");

exports.signup = async (req,res)=>{
    try {
        const {name,prn,username,password,subjects} = req.body;

        const teacher = new Teacher({
            name,prn,username,password,subjects
        })

        const user = await Teacher.findOne({prn});

        if(user){
            return res.status(400).json({message:"Teacher already exists"})
        }else{
            const savedTeacher = await teacher.save();

            return res.status(200).json({
                status:"Success",
                message:"Teacher created successfully",
                data:savedTeacher
            })
        }
    } catch (error) {
        res.status(400).json({
            status:"Error",
            message:error.message
        })
    }
}
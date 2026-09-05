const Student = require("../models/Student");

const createStudent = async(req,res) => {
    try {
        const {name, email, course, semester} = req.body;
        console.log(req.body);

        if(!name || !email || !course || !semester){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const student = await Student.create({
            name,
            email,
            course,
            semester,
        });

        res.status(201).json({
            sucess: true,
            message: "Student created Sucessfully",
            student,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to create Student",
        });
    }
};

module.exports = {
    createStudent,
};
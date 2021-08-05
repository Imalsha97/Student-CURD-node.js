const router = require("express").Router();
//import the models
let Student = require("../models/Student");

//create router
//http://localhost:8070/student/add
router.route("/add").post((req,res) => {
    //body
    // frontend ekeinsert krpu data gannawa

    const name = req.body.name;
    const age = Number(req.body.age);
    const gender = req.body.gender;
    const address = req.body.address;

    const  newStudent = new  Student({
        name ,
        age,
        gender,
        address
    })

    //new student object eka data base ekta ywnwawa
    //add the promise
    newStudent.save().then(() => {
        //success uno body eka execute wenwa
        //ywanne json format eken
        res.json("Student Added")
    }).catch((err)=>{
        console.log(err);
    })
} )

//get mothod
//json format
router.route("/").get((req,res)=>{
    //uda hada gaththa student
    Student.find().then((students)=>{

        res.json(students)
    }).catch((err)=>{
        console.log(err)
    })
})

//update method
//http//localhost:8070/student/update/ghhhhhhhhhhh44455
//:id is compulsaray
//async anith kenage  function eka iwra wenkn backend ekee anith fubtion krnwa
router.route("/update/:id").put(async (req,res) => {
    //fetch the id
    let userId = req.params.id;
    //parameter eke id value eka fetch krnna
    //d structure
    const {name,age,gender,address} = req.body;
    const updateStudent = {
        name,
        age,
        gender,
        address
    }
    //Student model  //update krnn one id eka,update krnn one values(updateStudent)
    //await = crash wen na  anith eka update wenkn nawathila innwa,
    const update = await Student.findByIdAndUpdate(userId,updateStudent).then(() =>{
        //status code 200 succsss
    res.status(200).send({status:"User updated"})
    }).catch((err) =>{
        console.log(err);
        res.status(500).status({status:"Error with updating data",error:err.message});
    })
    


})
//http//localhost:8070/student/delete/ghhhhhhhhhhh44455
router.route("/delete/:id").delete(async (req,res) => {
    let userId = req.params.id;
    await Student.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status:"User Deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status:"Error with delete user",error:err.message});
    })
})

//fetch one user
router.route("/get/:id").get(async (req,res) => {
    let userId = req.params.id;
    const user = await Student.findById(userId)
    .then((student)=>{
        res.status(200).send({status:"User feched",user:student})
    }).catch(() => {
        console.log(err.message);
        res.status(500).send({status:"error with get user",error:err.message});
    })
})

module.exports = router;
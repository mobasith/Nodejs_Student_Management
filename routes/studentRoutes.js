//similar to controller class

const express = require('express')
const router =  express.Router();
const Student = require('../models/Student');

//1. Fetch all students [GET]
router.get('/', async (req,res)=>{
    try{
        const students = await Student.find();
        res.status(200).json(students);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});

//2. Add a new Student [POST]
router.post('/', async (req, res) =>{
    const{ studentId, name, branch, email, phone }=req.body;

    const newStudent = new Student({
        studentId,
        name,
        branch,
        email,
        phone,
    });

    try{
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (err){
        res.status(400).json({ message : err.message});
    }
});

// 3. Fetch student by ID [GET]
router.get('/:id', async (req, res) => {
    try {
      const student = await Student.findOne({ studentId: req.params.id });
      if (!student) return res.status(404).json({ message: 'Student not found' });
      res.status(200).json(student);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // 4. Update student details [PUT]
  router.put('/:id', async (req, res) => {
    const { name } = req.body;
  
    try {
      const updatedStudent = await Student.findOneAndUpdate(
        { studentId: req.params.id },
        { name, branch, email , phone },
        { new: true }
      );
  
      if (!updatedStudent) return res.status(404).json({ message: 'Student not found' });
      res.status(200).json(updatedStudent);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // 5. Delete student [DELETE]
  router.delete('/:id', async (req, res) => {
    try {
      const deletedStudent = await Student.findOneAndDelete({ studentId: req.params.id });
  
      if (!deletedStudent) return res.status(404).json({ message: 'Student not found' });
      res.status(200).json({ message: 'Student deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  

module.exports=router;
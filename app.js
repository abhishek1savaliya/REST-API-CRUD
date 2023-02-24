const express = require("express");
const conn = require('./db/conn');
const student = require('./models/students');
const app = express();

const port = process.env.PORT || 8000;

app.use(express.json());

// app.post('/students',(req,res)=>{
//   console.log(req.body)
//   const user = new student(req.body);
//   user.save()
//   .then(()=>{
//     res.status(201).send(user);
 
//   })
//   .catch((e)=>{
//     res.status(400).send(e)
//   })

// })


app.post("/students",async (req,res)=>{
  try{
    const user = new student(req.body);
    const createUser = await user.save();
    res.status(201).send(createUser);
  }
  catch(e){
    res.status(400).send(e)
  }

})

app.get("/students",async(req,res)=>{
             try{
               const studentData = await student.find();
               res.send(studentData);

             }
             catch(e){
                   res.send(e);
             }
})
app.get("/students/:id",async(req,res)=>{
    try{
      const _id = req.params.id;
        const studentData = await student.findById(_id);
     
        //  or res.send(await student.findById(_id));
          if(!studentData){
            return res.status(404).send();
          }
          else{
            res.send(studentData);
          }
             
        

             }
             catch(e){
                   res.status(404).send(e);
             }
})


app.delete('/students/:id',async(req,res)=>{
  try{
     const id = req.params.id;
     const deleteStudent = await student.findByIdAndDelete(id);
     console.log(deleteStudent);
     res.send(deleteStudent);
  }
  catch(e){
    res.status(400).send(e);
  }
})


app.patch('/students/:id',async (req,res)=>{
  try{
       
        const updateStudent = await student.findByIdAndUpdate(req.params.id,req.body,{
          new:true
        });
         res.send(updateStudent);
  }
  catch(e){
    res.status(400).send();
  }
})

app.listen(port,()=>{
  console.log(`Server is running on PORT ${port}`);
})
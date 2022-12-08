const config = require('config')
const Joi = require('joi');
const morgan = require('morgan')

const express = require('express');
const app = express();
const cors = require('cors')

// console.log('application Name' + config.get('name'))
// console.log('mail server' + config.get('mail.host'))
// console.log('mail password' + config.get('mail.password'))
// console.log("nodeEnv: " ,process.env.NODE_ENV)
// console.log("app:",app.get('env'))
app.use(express.json());


app.use(morgan('tiny'))
app.use(cors()) 
const  list=[
    {
        mail:"bidzishviligiorgi7@gmail.com",
        pn:"12001034395",
        name:"giorgi",
        surname:"bidzishvili",
        birthDate:"15/05/2012",
      category:"VIP User",
      status:"active"

    },
    {
        mail:"chkadua@gmail.com",
        pn:"17054305678",
        name:"nata",
        surname:"chkadua",
        birthDate:"23/10/2013",
        category:"user_2",
        status:"status1"
        
    },
    {
        mail:"ckhadadze@gmail.com",
        pn:"19086243187",
        name:"vinme",
        surname:"chkadua",
        birthDate:"17/12/2014",
        category:"user_4",
        status:"Blocked"
        
    },
    {
        mail:"z_chichua@gmail.com",
        pn:"01027077710",
        name:"zura",
        surname:"chichua",
      birthDate:"19/01/2015",
      category:"user_3",
      status:"Suspended"

    },
    {
        mail:"z_chichua@gmail.com",
        pn:"44524560724",
        name:"zura",
        surname:"chichua",
        birthDate:"19/01/2016",
        category:"user_3",
        status:"active"
        
    },
    {
        mail:"z_chichua@gmail.com",
        pn:"44344322452",
        name:"zura",
        surname:"chichua",
        birthDate:"19/01/2017",
        category:"user_1",
        status:"Blocked"

    },
    {
        mail:"z_chichua@gmail.com",
        pn:"14545670012",
        name:"zura",
        surname:"chichua",
        birthDate:"19/01/2018",
        category:"user_2",
        status:"Suspended"
        
    },
]
const categories = [
    {user:"VIP User"},
    {user:"Idle User"},
    {user:"Standart User"},
    {user:"User_1"},
    {user:"User_2"},
    {user:"User_3"},
    {user:"User_4"},
]
statusArr=[
    {status:'Active'},
    {status:'Blocked'},
    {status:'Suspended'},
    {status:'status1'},
    {status:'status1'},
    {status:'status1'},
    {status:'status2'},
    {status:'status3'},
    {status:'status4'}
  ]


app.get('/categories',(req,res)=>{
    res.send(categories)
});
app.post('/categories',(req,res)=>{
    const result = req.body
    console.log("result:",result);
    categories.push(result)
    res.send(categories)
});
app.put("/categories",(req,res)=>{
    console.log(req.body,  categories[req.body.id])
    categories[req.body.id] = {user:req.body.user};
 res.send(categories)
})
app.delete("/delete/categories/:id",(req,res)=>{
    console.log(req.body,  categories[req.params.id])
    categories.splice(req.body.id,1)
    // categories[req.body.id] = {user:req.body.user};
 res.send(categories)
})
app.get('/status',(req,res)=>{
    res.send(statusArr)
});
app.post('/status',(req,res)=>{
    const result = req.body
    console.log("result:",result);
    statusArr.push(result)
    console.log(statusArr)
    res.send(statusArr)
});
app.put("/status",(req,res)=>{
    console.log(req.body,  statusArr[req.body.id])
    statusArr[req.body.id] = {status:req.body.status};
 res.send(statusArr)
})
app.delete("/delete/status/:id",(req,res)=>{
    console.log(req.body,  statusArr[req.params.id])
    statusArr.splice(req.body.id,1)
    // statusArr[req.body.id] = {user:req.body.user};
 res.send(statusArr)
})
app.get('/getList',(req,res)=>{
    console.log({statusArr,categories})
    res.send(list)
});
app.get('/dialog',(req,res)=>{
    console.log({statusArr,categories})
    res.send(list)
});
app.get('/getList/arrays',(req,res)=>{
    // console.log({statusArr,categories})
    res.send({statusArr,categories})
});
app.get('/details',(req,res)=>{
    res.send(list)
});
app.post('/details',(req,res)=>{
    const result = req.body
    console.log("result:",result);
    list.push(result)
    res.send(list)
});





app.get('/dialog',(req,res)=>{
    res.send(list)
});
app.post('/dialog',(req,res)=>{
    const result = req.body
    console.log("result:",result);
    list.push(result)
    res.send(list)
});

app.put('/dialog',(req,res)=>{
    list[req.body.id]=req.body.data
    console.log("$$$",req.body.id,req.body,list[req.body.id],list)
    res.send(list)
});
// ///
// app.put("/status",(req,res)=>{
//     console.log(req.body,  statusArr[req.body.id])
//     statusArr[req.body.id] = {status:req.body.status};
//  res.send(statusArr)
// })
// ///
app.delete("/delete/details/:id",(req,res)=>{
    console.log(req.body,  list[req.params.id])
    list.splice(req.params.id,1)
    // statusArr[req.body.id] = {user:req.body.user};
 res.send(list)
})




// /api/cources/1
app.get('/api/courses/:id',(req,res)=>{
   const course = courses.find((c)=>c.id===parseInt(req.params.id))
   if(!course){
   return res.status(404).send("the course with the given id was not found")
   }
   res.send(course)
});

app.post('/api/courses',(req,res)=>{
    
   const result = validateCourse(req.body)
    console.log(result);

    if(result.error){
        return res.status(400).send(result.error.details[0].message)
        
    }
    const course = {
        id:courses.length + 1,
        name:req.body.name
    }
    courses.push(course);
    res.send(course);
});


app.put("/api/courses/:id",(req,res)=>{
    const course = courses.find((c)=>c.id===parseInt(req.params.id))
    if(!course){
     return res.status(404).send("the course with the given ID was not found")
    }
   const result = validateCourse(req.body)
   const {error} = result
   if(error){
    return res.status(400).send(error.details[0].message)
    
}
   course.name = req.body.name;
   res.send(course);
});

app.delete("/api/courses/:id",(req,res)=>{
    const course = courses.find((c)=>c.id===parseInt(req.params.id))
    if(!course){
      return  res.status(404).send("the course with given ID was not found")
    }
    let index = courses.indexOf(course);
    courses.splice(index,1);
    res.send(course)
})


function validateCourse(course){
    const schema = {
        name:Joi.string().min(3).required()
    }
    return Joi.validate(course,schema);
};

const port = process.env.PORT || 3000
app.listen(port,()=>console.log(`listening on port ${port}...`))
var express = require('express');
var router = express.Router();
const knex = require("../db/knex")

/* GET home page. */
router.get('/', function(req, res) {
  knex("todo").select().orderBy("priority").orderBy("done").then(todos=>{
    res.render('todos', {title:"Todos",todos});
  })
  
});
router.get('/new', (req,res)=>{
  res.render('newTodo')
})

router.get("/:id",(req,res)=>{
  const id = req.params.id
  if(typeof id!="undefined"){
    knex("todo").select().where("id",id).first().then(todo=>{
      res.render("TodoView",{title:"Todo Detail",todo})
    })
  }else{
    res.status(404).render('error',{
      message:"Invalid ID",
      status:404
    })
  }
})

router.get("/:id/delete",(req,res)=>{
  const id = req.params.id
  if(typeof id!="undefined"){
    knex("todo").select().where("id",id).first().then(todo=>{
      res.render("DeleteTodo",{title:"Delete Todo",todo})
    })
  }else{
    res.status(404).render('error',{
      message:"Invalid ID",
      status:404
    })
  }
})


router.get("/:id/edit",(req,res)=>{
  const id = req.params.id
  if(typeof id!="undefined"){
    knex("todo").select().where("id",id).first().then(todo=>{
      res.render("editTodo",{title:"Edit Todo",todo})
    })
  }else{
    res.status(404).render('error',{
      message:"Invalid ID",
      status:404
    })
  }
})




function validTodo(todo){
  return typeof todo.title =="string" && 
  todo.title.trim() !="" && 
  typeof todo.priority != "undefined" && 
  !isNaN(Number(todo.priority))
}

router.post('/', (req,res)=>{
  if(validTodo(req.body)){
    const todo = {
      title : req.body.title,
      description: req.body.description,
      priority : req.body.priority,
      date:new Date()
    }
    knex("todo").insert(todo,"id").then(ids =>{
      const id = ids[0]
      res.redirect(`/todos/${id}`)
    })
  }else{
    res.status(500).render('error',{
      title:"Error",
      message:"Invalid Todo",
      status:500
    })
  }
})

router.post("/:id",(req,res)=>{
  if(validTodo(req.body)){
    const todo = {
      title : req.body.title,
      description: req.body.description,
      priority : req.body.priority,
      done: req.body.done
    }
    knex("todo").where("id",req.params.id).update(todo,"id").then(ids =>{
      const id = ids[0]
      res.redirect(`/todos/${id}`)
    })
  }else{
    res.status(500).render('error',{
      title:"Error",
      message:"Invalid Todo",
      status:500
    })
  }
})

router.post("/:id/delete",(req,res)=>{
  const id = req.params.id
  if(typeof id!="undefined"){
    knex("todo").where("id",id).del().then(res.redirect("/todos"))
  }else{
    res.status(404).render('error',{
      message:"Invalid ID",
      status:404
    })
  }
})

module.exports = router;

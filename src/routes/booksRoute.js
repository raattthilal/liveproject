const express=require('express');
const booksRouter=new express.Router();



//Database Mongoose Import and connect
const booksModel=require('./booksSchema');

booksRouter.route("/")
.get((req,res)=>{
        async function getBooks(){
try{
    const books1=await booksModel.find();
    res.render('books',{title:"Project List",books:books1});
}catch(e){}  
    }
    getBooks();
});



booksRouter.route("/")
.post((req,res)=>{
  
    async function insertBook(){
        try{
            
            let booksCount=await booksModel.countDocuments();
            const book=new booksModel({
                "id": 100+booksCount,
                "name": req.body.name,
                "author":req.body.author,
                "src":req.body.src 
            });
            
            await book.save();
           
        }catch(e){}
    } insertBook();
    // console.log(req.body);
     res.send("ghghgg");
});

booksRouter.route('/:id')
.delete((req,res)=>{
   async function deleteBook(){
       try{
    await booksModel.deleteOne({id:req.params.id});
    res.send("Success");
       }catch(e){}
   }
   deleteBook();
});

booksRouter.route("/:id")
.put((req,res)=>{
    async function updateBook(){
        try{
            await booksModel.updateOne({id:req.params.id},
                {
                  $set:{  "name":req.body.name,
                          "author":req.body.author,
                          "src":req.body.src
                         }
               })
            res.send(req.params.id);
        }catch(e){}
        
    }updateBook();
});

module.exports=booksRouter;
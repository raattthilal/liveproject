const express=require('express');
const path=require('path');
const app=new express();
const booksRouter=require('./src/routes/booksRoute');
// const booksRouter=require('./src/routes/booksRoute');

app.use(express.static(path.join(__dirname,'public')));
app.set('views','./src/views');
app.set('view engine','ejs');
app.use(express.json());
app.use('/books',booksRouter);


const booksModel=require('./src/routes/booksSchema');

app.get("/",(req,res)=>{
    async function getBooks(){
        try{
            const books1=await booksModel.find();
    //res.sendFile(path.join(__dirname,'index.html'));
    res.render('index',{title:"Project Lists",books:books1});
}catch(e){}  
}
getBooks();
});

app.get('/addbook',(req,res)=>{
    res.render('addbook',{title:"Add New Projects"});
});


app.get('/editbook/:id',(req,res)=>{
    async function getBook(){
        try{
            const book=await booksModel.findOne({id:req.params.id});
            res.render('editbook',{title:"Edit Book",book:book})
        }catch(e){}
    }
getBook();
});


app.listen(3000,()=>console.log("Server Listening on port 3000"));
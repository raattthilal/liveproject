const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/liveProj')
.then(()=>{console.log("Database connection successful")})
.catch(err=>{console.log("Database connection error",err)});

const BooksSchema=mongoose.Schema({

    "id": Number,
    "name": String,
    "author":String,
    "src":String
});

const booksModel=mongoose.model('projects',BooksSchema);
module.exports=booksModel;
    
    
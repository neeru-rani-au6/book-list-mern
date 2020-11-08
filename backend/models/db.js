const mongoose = require('mongoose');
// mongodb connection

const init = async () => {
    try {
        await mongoose.connect('mongodb+srv://neeru:neeru@cluster0-6qdoa.mongodb.net/bookList?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
        console.log('connected to mongodb');
    } catch (error) {
        console.log("error in mongodb connnection");
        console.log(error);
    }
}

init();
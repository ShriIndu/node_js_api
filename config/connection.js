
const { default: mongoose } = require("mongoose");


const connectDb = async()=>{
    try {
        const connect = await mongoose.connect("mongodb+srv://indushridhar16:U920I0qKBrFqcMb3@cluster0.ctbo5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log(" Database connected: " , connect.connection.host, connect.connection.name);
    } catch (error) {
        console.log(error);
        process.exit(1); 
    }
}

module.exports  = connectDb;
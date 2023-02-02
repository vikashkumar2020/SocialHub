import mongoose from "mongoose";

export default () => {
    const connect = () => {
        mongoose.connect('mongodb://localhost:27017/socialhub-backend')
        .then(()=>{
            console.log('success db connect')
        })
        .catch(
            (error)=>{
                console.log("error",error);
                return process.exit(1);
            }
        )
    };
    connect();

    mongoose.connection.on('disconnected',connect);
}
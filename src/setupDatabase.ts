import mongoose from "mongoose";
import {config} from "./config"

export default () => {
    const connect = () => {
        mongoose.connect(`${config.DATABASE_URL}`)
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
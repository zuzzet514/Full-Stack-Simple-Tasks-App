import express from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import routes from './routes/index.js';

// .env config
dotenv.config();

// server config
const app = express()
const port = 3000

// Middleware to parse JSON
app.use(express.json());

// routes config
app.use('/api', routes);

try {
    app.get('/', (req, res) => {
        res.send('Hello World!')
    })

    app.listen(port, () => {
        console.log(`App listening on port ${port}`)
    })

// mongoose config
    await mongoose.connect(process.env.DB_URI).then(()=> {
        console.log('Successfully connected to MongoDB')
    }).catch((e) => {
        console.error('Couldnt connect to MongoDB :C')
    })

} catch (e) {
    console.error('Something went wrong with the server :(', e);
    process.exit(1);
}




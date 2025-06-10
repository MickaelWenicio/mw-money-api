import app from './index';
import { connectDB } from './config/db';

const port = process.env.PORT;

app.listen(port, async () => {
    connectDB();
    console.log(`Api running on: ${port}`);
});
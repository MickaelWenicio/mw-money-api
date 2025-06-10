import app from './index';

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Api running on: ${port}`)
});
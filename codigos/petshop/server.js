const app = require('./src/config/app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Petshop is on http://localhost:${port}`)
})


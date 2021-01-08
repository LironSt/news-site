const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');


const app = express();

const newsRoutes = require('./api/news/news.routes');



app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

app.use(bodyParser.json());


const hostname = '127.0.0.1';
const port = process.env.PORT || 3030;

const http = require('http').createServer(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('public'));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true,
    };
    app.use(cors(corsOptions));
}



app.use('/api/news', newsRoutes);

if (process.env.NODE_ENV === 'production') {
    //To make browserRouter client routing to work
    app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });
}

http.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

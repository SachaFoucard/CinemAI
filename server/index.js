require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 8000 ;

const server = express();
server.use(express.json());
server.use(cors());

server.use('/api',require('./Routes/users.route'))
server.use('/api/comments',require('./Routes/comment.route'))


server.listen(PORT, () => console.log(`http://localhost:${PORT}`));
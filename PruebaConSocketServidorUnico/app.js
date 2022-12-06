const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const {personaControllers} = require('./Controllers/personasControllers')
const server = http.createServer(app);
const cookieParser = require('cookie-parser');
const { Server } = require("socket.io");

const io = new Server(server,{
  cors : "http://localhost:5500"
});


// swagger
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerSpec = {
    definition : {
      openapi : '3.0.0',
      info : {
        title: 'prueba swagger',
        version : '1.0.0'
      },
      servers : [
        {
          url : 'http://localhost:3000'
        }
      ]
    },
    apis:[`${path.join(__dirname,'./Controllers/*.js')}`]
}





// middlewares
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec))) 
app.use(cookieParser());
app.use(express.json());
app.use('/recursos',personaControllers); 





app.get('/hola', (req, res) => {
  res.send("bueno");
});

app.get('/segundo',(req,res)=>{
  res.send('segundoEnd')
})

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('messages',{
    id : 1 ,
    name : "Isaias",
    apellido : "Romano"})
});

app.get('/', (req,res)=>{
  res.send('Bienvenido a la Api');
})

server.listen(3000, () => {
  console.log('listening on *:3000');
});
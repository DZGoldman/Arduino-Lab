const five = require("johnny-five");
const board = new five.Board();
const morse = require('morse');
const express  = require('express');
const app      = express();
const blink = require('./blink.js')
var led;

board.on("ready", () => {
  led = new five.Led(11);
})
var bodyParser = require('body-parser');
// app.use(express.bodyParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(  express.static(__dirname+'/public'));

app.get('/', (req,res)=>{
    res.sendFile(__dirname+'/public/index.html')
})

app.post('/',(req,res)=>{
  const text = req.body.text
  blink(morse.encode(text), 0, led)
})



app.listen(3000, ()=> {
   console.log("listening on Port 3000")
});

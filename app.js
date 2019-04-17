const five = require("johnny-five");
const board = new five.Board();
const morse = require('morse');
const express  = require('express');
const app      = express();
const blink = require('./blink.js')
const cors = require('cors')
const {handleError} = require('./lib/middleware.js')
const Led = five.Led
let ledMap = {}
let led;

let lightsInOrder = ['yellow', 'red', 'white','green']

board.on("ready", () => {
  
  led =  new Led(13)
  ledMap['yellow'] =  new Led(11)
  ledMap['red']= new Led(9)
  ledMap['white']= new Led(6)
  ledMap['green']=  new Led(4)

})

const getJSON  = ()=>{
  return lightsInOrder.map((key)=>{
    return {color: key, isOn: ledMap[key].isOn}
  })
}
var bodyParser = require('body-parser');
// app.use(express.bodyParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));



app.use(cors())

app.use(  express.static(__dirname+'/public'));

app.get('/', (req,res)=>{
    res.sendFile(__dirname+'/public/index.html')
})

app.post('/morse', (req,res)=>{
  const text = req.body.text
  console.log(text);
  // TODO: santize?
  blink(morse.encode(text), 0, led)
  console.log('????');
  
  res.end('success!');

})

app.post('/on', (req, res)=>{
  const color = req.body.color;
  ledMap[color].on()
  


})

app.post('/off', (req, res)=>{
  const color = req.body.color;
  ledMap[color].off()

})

app.get('/state', (req, res)=>{
  res.json(getJSON())
})

app.listen(3000, ()=> {
   console.log("listening on Port 3000")
});

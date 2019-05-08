const five = require("johnny-five");
const board = new five.Board();
const morse = require('morse');
const express  = require('express');
const app      = express();
const blink = require('./blink.js')
const cors = require('cors')
const {handleError} = require('./lib/middleware.js')
const { exec } = require('child_process');


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
  if (!Object.keys(ledMap).length) return []
  return lightsInOrder.map((key)=>{
    return {color: key, isOn: ledMap[key].isOn}
  })
}
var bodyParser = require('body-parser');
// app.use(express.bodyParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));



app.use(cors({credentials: true, origin: true}))

// app.use(  express.static(__dirname+'/public'));
app.use(  express.static(__dirname+'/client/build'));

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

app.post('/speak', (req,res)=>{

  exec("say '" + req.body.text.replace(/[^\w\s]/gi, '') + "'")
  
  res.end('success!');

})


app.post('/on', (req, res)=>{
  console.log('on');
  
  const color = req.body.color;    
  ledMap[color].on()
  res.json({success: true, color})

})

app.post('/off', (req, res)=>{
  const color = req.body.color;
  ledMap[color].off()
  res.json({success: true, color})

})

app.get('/state', (req, res)=>{
  res.json(getJSON())
})
const port = 8080
app.listen(port, ()=> {
   console.log("listening on Port " + port)
});

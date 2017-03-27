const five = require("johnny-five");
const board = new five.Board();
const morse = require('morse');
const express  = require('express');
const app      = express();
const unit = 500


var bodyParser = require('body-parser');
// app.use(express.bodyParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

board.on("ready", () => {
  var led = new five.Led(11);
  // blink(morse.encode('SOS'), 0, led)
})

app.use(  express.static(__dirname+'/public'));

app.get('/', (req,res)=>{
    res.sendFile(__dirname+'/public/index.html')
})

app.post('/',(req,res)=>{
  req.body.text
})
app.listen(3000, ()=> {
   console.log("listening on Port 3000")
});

const blink = (letters, currentIndex, led) => {
    if (currentIndex >= letters.length) return
    switch (letters[currentIndex]) {
        case '.':
            led.on()
            setTimeout(() => {
                led.off()
                setTimeout(() => blink(letters, currentIndex + 1, led), unit)
            }, unit)
            break;
        case '-':
            led.on()
            setTimeout(() => {
                led.off()
                setTimeout(() => blink(letters, currentIndex + 1, led), unit)
            }, unit*3)
            break;
        case ' ':
            setTimeout(() => {
                blink(letters, currentIndex + 1, led)
            }, unit*2)
            break
        default:
          console.log('ERROR');
    }
}

const unit = 250

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

module.exports = blink

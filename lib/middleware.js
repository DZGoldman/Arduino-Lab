 const handleError = (req, res, next) => {
    try{
        console.log('trying!');
        
        next()
    } catch (e) {
        console.log('caught error');
        
        res.status(500).send(e.message);
    }
}

module.exports = {
    handleError
}
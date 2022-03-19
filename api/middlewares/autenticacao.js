module.exports = {
    local: (req, res, next) => {
        console.log('Passou!')
        next()
    }
}
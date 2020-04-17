module.exports = (req, res, next) => {
    console.log(`Method: ${req.method}` + '\n' + `Url: ${req. url}` + `\n` + `Time: ${new Date().toISOString()}`)
    next()
}
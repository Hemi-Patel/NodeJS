module.exports.FlashMSG = (req, res, next)=>{
    res.locals.flash = {
        'success': req.flash('success')
    }
    next()
}
const multer = require('multer');
console.log("Here :")
var storage = multer.diskStorage({
    destination : function ( req , file , cb ){
        cb(null, 'public/upload/lots/')
    },
    filename : function (req, file , cb){
        var ext = file.originalname.substr(file.originalname.lastIndexOf('.'));
        
        cb(null, file.fieldname + '-' + Date.now() + ext)
    }
})
console.log("storage:",storage)

module.exports = store = multer({ storage : storage })
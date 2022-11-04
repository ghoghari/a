
// require mongo db models
const Product          = require('../model/Product');
const ProductImage         = require('../model/ProductImage');

// Get all Products 
exports.getAll = (req, res, next) =>{
        Product.find({},(error, userData) => {
            if(error) {
                res.json({response : false, message : Constant.MESSAGE.INVALID_SECTION , error : error})
            } else {
                res.json({response : true, message : Message.PRODUCT.PRODUCT_SUCCESS, data : userData})
            }
        })
}

// Create New product
exports.create = (req, res, next) => {
        console.log("Request :",req)
		
        const name = req.body.name;
        const description = req.body.description;
        const price = req.body.price;
        const stock = req.body.stock;
        const product_data = {
                name: name,
                description: description,
                price: price,
                stock: stock,
        };
        Product.countDocuments({name : {$eq : name}}, async (error, data) => {
                if(error) {
                        res.json({response : false, errors : error});
                    } else {
                        if(data === 1) {
                            res.json({response : false, errors : error, message: Message.PRODUCT.PRODUCT_ADD_FAIL});
                        } else {
                                Product.create(product_data, (errors, datas) => {
                                        if(errors) {
                                                res.json({response : false, errors : errors});
                                        } else {
                                                res.json({
                                                response: true,
                                                data: datas,
                                                message:Message.PRODUCT.PRODUCT_ADD_SUCCESS,
                                                })
                                        }
                                })
                        }
                    }
        });
}



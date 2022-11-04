const bcrypt        = require("bcryptjs");

// require mongo db models
const User          = require('../model/User');
const Role          = require('../model/Role');
const Country       = require("../model/Country");

// Get all customers 
exports.getAll = (req, res, next) =>{
    User.find({role : {$eq : 'Customer'}},(error, userData) => {
        if(error) {
            res.json({response : false, message : Constant.MESSAGE.INVALID_SECTION , error : error})
        } else {
            res.json({response : true, message : Message.CUSTOMER.CUSTOMER_SUCCESS, data : userData})
        }
    })
}

// Create New customers
exports.create = (req, res, next) => {
    if(req.body.roleType == "Customer") {
        const email = req.body.email;
        const mobile_no = req.body.mobile_no;
        const name = req.body.name;
        const role = req.body.roleType;
        const user_status = req.body.status;
        const address_data = {
            address1: req.body.address1,
            address2: req.body.address2,
            state: req.body.state,
            city: req.body.city,
            zipcode: req.body.zipcode,
            country: req.body.country
        };
        User.countDocuments({email : {$eq : email}}, async (error, data) => {
            if(error) {
                res.json({response : false, errors : error});
            } else {
                if(data === 1) {
                    res.json({response : false, errors : error, message: Message.CUSTOMER.CUSTOMER_ADD_FAIL});
                } else {
                    let userData = {
                        name:name,
                        email:email,
                        role:role,
                        user_status:user_status,
                        mobile_no:mobile_no,
                        address: address_data,
                    }
                    User.create(userData, (errors, datas) => {
                        if(errors) {
                            res.json({response : false, errors : errors});
                        } else {
                            res.json({
                                response: true,
                                data: datas,
                                message:Message.CUSTOMER.CUSTOMER_ADD_SUCCESS,
                            })
                        }
                    })
                }
            }
        });
    } else {
        const email = req.body.email;
        const name = req.body.name;
        const user_status = req.body.status;
        const mobile_no = req.body.mobile_no;
        const role = req.body.role;
        User.countDocuments({email : {$eq : email}}, async (error, data) => {
            if(error) {
                res.json({response : false, errors : error});
            } else {
                if(data === 1) {
                   res.json({response : false, errors : error, message: Message.STAFF.STAFF_ADD_FAIL});
                } else {
                    const salt = await bcrypt.genSalt(10);
                    var encryptedPass = await bcrypt.hash(req.body.password, salt);
                    let userData = {
                        name:name,
                        email:email,
                        role:role,
                        password:encryptedPass,
                        user_status:user_status,
                        mobile_no:mobile_no,
                    }
                    User.create(userData, (errors, datas) => {
                        if(errors) {
                            res.json({response : false, errors : errors});
                        } else {
                            res.json({
                                response: true,
                                message: Message.STAFF.STAFF_ADD_SUCCESS,
                            })
                        }
                    })
                }
            }
        });
    }
}

// Get Customer Details
exports.getById = (req, res, next) =>{
    User.find({_id : {$eq : req.params.id}}).select(["-password"]).then (usersData => {
        if (usersData.length == 0) {
            res.json({response : false, message : Constant.MESSAGE.INVALID_SECTION , data : []})
        } else {
           if(usersData[0].role == 'Customer')
            {
                var arr = []
                var countryData = []
                let billingAddressArr = usersData[0].address;
                arr = arr.concat(usersData, billingAddressArr)
                countryData.push(arr[1].country)
                Country.find( { iso2: { $in: countryData } }, function (err, countryList) {
                    if(err){
                        res.json({response : false, message : Constant.MESSAGE.INVALID_SECTION , data : []})
                    } else {
                        delete usersData[0].address[0]
                        countryList.forEach(cData => {
                        if(arr[1].country == cData.iso2){
                            arr[1].bCountry = cData.name
                        }
                        });
                        res.json({response : true, message : Message.CUSTOMER.CUSTOMER_BY_ID_SUCCESS, data : arr})
                }
                });
            }
           else
           {
                res.json({response : true, message : Message.STAFF.STAFF_BY_ID_SUCCESS, data : usersData})
           }
        }    
    });
}

// Update Customers
exports.update = (req, res, next) => {
    const _id = req.params.id;
    if(req.body.roleType == "Customer") {
        const email = req.body.email;
        User.countDocuments({_id : {$eq : _id}}, (error, count) => {
            if(error) {
                res.json({response : false, errors : error});
            } else {
                if(count === 1) {
                    const address_data = {
                        address1: req.body.address1,
                        address2: req.body.address2,
                        state: req.body.state,
                        city: req.body.city,
                        zipcode: req.body.zipcode,
                        country: req.body.country
                    };
                    let customerData = {
                        name : req.body.name,
                        user_status : req.body.user_status,
                        role : req.body.roleType,
                        email : req.body.email,
                        mobile_no : req.body.mobile_no,
                        address: address_data
                    }
                    User.findOneAndUpdate({_id : {$eq : _id}}, {$set : customerData}, (err, data) => {
                        if(err) {
                            res.json({response : false, errors : err, message : Constant.MESSAGE.INVALID_SECTION});
                        } else {
                            res.json({response : true, message : Message.CUSTOMER.CUSTOMER_UPDATE_SUCCESS, data : customerData})
                        }
                    });
                } else {
                    res.json({response:false, errors : error, message: Message.CUSTOMER.CUSTOMER_ADD_FAIL});
                }
            }
        })
    } else {
        const email = req.body.email;
        User.countDocuments({_id : {$eq : _id}}, async(error, count) => {
            if(error) {
                res.json({response : false, errors : error});
            } else {
                if(count === 1) {                   
                    let userData = {
                        name : req.body.name,
                        user_status : req.body.user_status,
                        role : req.body.role,
                        email : req.body.email,
                        mobile_no : req.body.mobile_no,
                    }
                    if (req.body.password && req.body.password !== "" ) {
                        const salt = await bcrypt.genSalt(10);
                        var encryptedPass = await bcrypt.hash(req.body.password, salt);
                        userData.password = encryptedPass;
                    }
                    User.findOneAndUpdate({_id : {$eq : _id}}, {$set : userData}, (err, data) => {
                        if(err) {
                            res.json({response : false, errors : err, message : Constant.MESSAGE.INVALID_SECTION});
                        } else {
                            if(userData.password) {
                                delete userData.password;
                            }
                            res.json({response : true, message : Message.STAFF.STAFF_UPDATE_SUCCESS, data : userData})
                        }
                    });
                } else {
                    res.json({response:false, errors : error, message: Constant.MESSAGE.INVALID_SECTION});
                }
            }
        })
    }
}

// Delete customer
exports.delete = (req, res, next) => {
    const id = req.params.id;
    User.find({_id : {$eq : id}}).then (usersData => {
        console.log("Details :",usersData)
        User.deleteOne({_id : {$eq : id}}, (err, data) => {
            if(err) {
                res.json({response : false, errors : err,  message : Constant.MESSAGE.INVALID_SECTION});
            } else {
                if(usersData[0].role == 'Customer')
                {
                    res.json({response : true, message : Message.CUSTOMER.CUSTOMER_DELETE_SUCCESS});
                }
                else
                {
                    res.json({response : true, message : Message.STAFF.STAFF_DELETE_SUCCESS});
                }
            }
        })
    });
}

// Import Customers 
exports.importCustomers = (req, res, next) => {
    var usersArr = [];
    var usersEmail = [];
    var dataArr = [];
    req.body.users.forEach(users => {
        const address_data = {
            address1: users.address1,
            address2: users.address2,
            state: users.state,
            city: users.city,
            zipcode: users.zipcode,
            country: users.country
        };
        let userData = {
            name : users.name,
            user_status : users.user_status,
            role : "Customer",
            email : users.email,
            mobile_no : users.mobile_no,
            address: address_data
        }
        usersEmail.push(users.email)
        usersArr.push(userData);
    });
    User.find( { email: { $in: usersEmail } }, function (err, userList) {
        if(err) {
            res.json({response : false, message : Constant.MESSAGE.INVALID_SECTION})
        } else {
            if(userList.length > 0){
                userList.forEach(listData => {
                    dataArr.push(listData.email);
                });
                res.json({response : false, data: dataArr, message: "Imported users email is already exists. Please try agian with new data!!"});
            }
            else{
                User.insertMany(usersArr, (errors, datas) => {
                    if(errors) {
                        res.json({response : false, errors : errors});
                    } else {
                        res.json({
                            response: true,
                            message: Message.CUSTOMER.CUSTOMER_IMPORTED_SUCCESS,
                        })
                    }
                });
            }
        }
    });
}

// Get All Staff 
exports.getAllStaff = (req, res, next) =>{
    Role.find((error,data) => {
        var roleData = []
        data.forEach(ele => {
            if(ele.role_name != "Customer"){
                roleData.push(ele.role_name)
            }
        })
        User.find( { role: { $in: roleData } }, function (err, userList) {
            if(err) {
                res.json({response : false, message : Constant.MESSAGE.INVALID_SECTION})
            } else {
                res.json({response : true, message : Message.STAFF.STAFF_SUCCESS, data : userList})
            }
        });
    })
}

exports.getAllCountries = (req, res, next) =>{
    Country.find().collation({locale: "en" }).sort({name:'asc'}).exec(function(err, results) {
        if (results == null) {
            res.json({response : false, message : 'No data found.'})
        } else {
            if(err) {
                res.json({response : false, error: err, message : 'Some error is facing, Please try again.'})
            } else {
                res.json({response : true, message : 'Successfully get Country data.', data : results})
            }
        }
    });
}
// New Changes End



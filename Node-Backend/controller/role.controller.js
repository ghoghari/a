var slugify = require('slugify');

// require mongo db models

let Role = require('../model/Role');
let Module = require('../model/Module');
let User = require('../model/User')
let RoleAuth = require('../model/RoleAuth');

// Get All Roles
exports.getAll = (req, res, next) => {
    Role.find((error, data) => {
        if (error) {
            res.json({response : false, message : Constant.MESSAGE.INVALID_SECTION , error : error})
        } else {
            res.json({response : true, message : Message.ROLE.ROLE_SUCCESS, data : data})
        }
    }).sort( { createdAt: -1 } )
    
}

// Create New Role
exports.create = (req, res, next) => {
    var slug = roleSlug(req.body.role_name)
    Role.count({$and : [{role_name : {$eq : req.body.role_name}}, {role_slug : {$eq : slug}}]}, (error, count) => {
        if(error) {
            res.json({response : false, message : Constant.MESSAGE.INVALID_SECTION , error : error})
        } else {
            if(count === 0) {
                const roleData = {
                    role_name : req.body.role_name,
                    role_slug : slug,
                    role_status : req.body.role_status
                }
                Role.create(roleData, (error, data) => {
                    if(error) {
                        res.json({response : false, message : Constant.MESSAGE.INVALID_SECTION , error : error})
                    } else {
                        let roleAuth = {
                            role_slug : slug,
                            status : true,
                            sub_module : []
                        }
                        RoleAuth.create(roleAuth, (error, roleAuthResp) => {
                            if(error) {
                                res.json({response : false, message : Constant.MESSAGE.INVALID_SECTION , error : error})
                            } else {
                                res.json({response : true, message : Message.ROLE.ROLE_ADD_SUCCESS, data : data})
                            }
                        })
                    }
                })
            } else {
                res.json({response : false, message : Message.ROLE.ROLE_ADD_FAIL, error : error})
            }
        }
    })
}

// Get Role Details
exports.getbyId = (req, res, next) => {
    Role.find({_id : {$eq : req.params.id}}, (error, data) => {
        if (error) {
            res.json({response : false, message : Constant.MESSAGE.INVALID_SECTION , error : error})
        } else {
            res.json({response : true, message : Message.ROLE.ROLE_BY_ID_SUCCESS, data : data[0]})
        }
    })
}

// Update New Roles
exports.update = (req, res, next) => {
    var slug = roleSlug(req.body.role_name)
    const roleData = {
        role_name : req.body.role_name,
        role_slug : slug,
        role_status : req.body.role_status
    }
    Role.count({_id : {$eq : req.params.id}}, (err, count) => {
        if(err) {
            return next(err);
        } else {
            if(count === 1) {
                Role.findOneAndUpdate({_id : {$eq : req.params.id}}, {$set : roleData}, (error, data) => {
                    if (error) {
                        return next(error)
                    } else {
                        res.json({response : true, message : Message.ROLE.ROLE_UPDATE_SUCCESS, data : roleData})
                    }
                })
            } else {
                res.json({response : false, errors : Constant.MESSAGE.INVALID_SECTION});
            }
        }
    });
}

// Delete Roles
exports.delete = (req, res) => {
    Role.count({_id : {$eq : req.params.id}}, (err, count) => {
        if(err) {
            res.json({response : false, error: err, message : Constant.MESSAGE.INVALID_SECTION})
            // return next(err);
        } else {
            if(count === 1) {
                Role.find({_id : {$eq : req.params.id}}, (error, data) => {
                    if(error) {
                        res.json({response : false, error: error, message : Constant.MESSAGE.INVALID_SECTION})
                    } else {
                        User.countDocuments({role : {$eq : data[0].role_name}}, (error, userCount)=> {
                            if(error) {
                                res.json({response : false, error: error, message : Constant.MESSAGE.INVALID_SECTION})
                                // return next(error)
                            } else {
                                if(userCount === 0) {
                                    Role.findOneAndDelete({_id: {$eq : req.params.id}}, (error, data) => {
                                        if (error) {
                                            res.json({response : false, error: error, message : Constant.MESSAGE.INVALID_SECTION})
                                            // return next(error)
                                        } else {
                                            res.json({response : true, message : Message.ROLE.ROLE_DELETE_SUCCESS});
                                        }
                                    })
                                } else {
                                    res.json({response : false, message :  Message.ROLE.ROLE_ALREADY_ASSIGNED_FAIL});
                                }
                            }
                        })  
                    }
                })
            } else {
                res.json({response : false, errors : Constant.MESSAGE.INVALID_SECTION});
            }
        }
    })
}


exports.getAllModule = (req, res, next) => {
    Module.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json({response : true, message : "Successfully get all the role ", data : data})
        }
    }).sort( { createdAt: -1 } )
}

function roleSlug(name)
{
    return slugify(name, {
        replacement: '-',  
        remove: undefined, 
        lower: true,      
        strict: false,     
        locale: 'vi'      
      });
}
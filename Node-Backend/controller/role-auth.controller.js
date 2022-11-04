// require mongo db models
const RoleAuth  = require('../model/RoleAuth');
const Role = require('../model/Role');
const Module = require('../model/Module');
const User = require('../model/User');

exports.create = (req, res, next) => {
    const sub_module = req.body.operation_id;
    Role.find({_id : {$eq : req.body.role_id}}, (error, roledata) => {
        if(error) {
            return next(error)
        } else {
            if(roledata) {
                RoleAuth.find({role_slug : roledata[0].role_slug}, (error, result) => {
                    if(error) {
                        return next(error)
                    } else {
                        if(result[0] && result[0]._id) {
                            RoleAuth.findOneAndDelete({role_slug : {$eq : roledata[0].role_slug}}, (error, data) => {
                                if(error) {
                                    return next(error)
                                } else {
                                    const role_auth = {
                                        role_slug : roledata[0].role_slug,
                                        sub_module : sub_module,
                                        status : true
                                    } 
                                    RoleAuth.create(role_auth, (error, data) => {
                                        if(error) {
                                            return next(error)
                                        } else {
                                            res.json({response:true, message: "Permission has been applied successfully.", data : data});
                                        }
                                    })                                    
                                }
                            })

                        } else {
                            const role_auth = {
                                role_slug : roledata[0].role_slug,
                                sub_module : sub_module,
                                status : true
                            } 
                            RoleAuth.create(role_auth, (error, data) => {
                                if(error) {
                                    return next(error)
                                } else {
                                    res.json({response:true, message: "Successfully apply the permission ", data : data});
                                }
                            })  
                        }
                    }
                })
            } else {
                res.json({response: false, errors:  "This role can't exist."})
            }
        }
    })
}

exports.getAll = (req, res) => {
    const role_slug = req.params.id;
    
    Role.find({_id : {$eq : role_slug}}, (error, data) => {
        RoleAuth.countDocuments({role_slug : {$eq : data[0].role_slug}}, (error, count) => {
            if(error) {
                return next(error)
            } else {
                if(count === 1) {
                    RoleAuth.find({role_slug : {$eq : data[0].role_slug}}, (error, data) => {
                        if(error) {
                            return next(error)
                        } else {
                            res.json({response:true, message:"Successfully get the all permission ", data : data[0]});
                        }
                    })
                } else {
                    res.json({response: false, errors:  "This role can't permission to apply."})
                }
            }
        })
    })
}
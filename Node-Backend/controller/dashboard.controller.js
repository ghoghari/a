const User = require("../model/User");
const Role = require("../model/Role");

exports.dashboard = (req, res, next) => {
    Role.countDocuments({},(error, roleCount) => {
        if (error) {
            return next(error)
        } else {
            User.countDocuments({role : {$eq : 'Customer'}},(error, userCount) => {
                if (error) {
                    return next(error)
                } else {
                    Role.countDocuments({},(error, roleCount) => {
                        if (error) {
                            return next(error)
                        } else {
                            Role.find((error,data) => {
                                var roleData = []
                                data.forEach(ele => {
                                    if(ele.role_name != "Customer"){
                                        roleData.push(ele.role_name)
                                    }
                                })
                                User.countDocuments({ role: {$in: roleData}},(error, AdminCount) => {
                                    if (error) {
                                        return next(error)
                                    } else {
                                        const dashboardData = {
                                            countAll: {
                                                usercount: userCount,
                                                rolecount: roleCount,
                                                admincount:AdminCount,
                                            }
                                        }
                                        res.json({ response: true, data: dashboardData, message: "Successfully get the Data !" })
                                    }
                                });
                            })
                        }
                    })
                }
            })
        }
    })
}
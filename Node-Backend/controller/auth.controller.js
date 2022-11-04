const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

// require mongo db models
const User = require("../model/User");
const Role = require("../model/Role");
const Operation = require("../model/Operation");
const RoleAuth = require("../model/RoleAuth");
const Module = require("../model/Module");
const MailTemplate = require('../model/MailTemplate');
const MailSetting = require('../model/MailSetting');

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: { $eq: email }, role: { $ne: "Customer" } }, (error, user_details) => {
	console.log("user_details",user_details);
        if (error) {
            return next(error);
        } else {
            if (user_details) {
                if (user_details.user_status === true) {
                    bcrypt.compare(password, user_details.password).then((match) => {
                        if (match) {
							console.log("debug 3 role ",user_details.role)
                            Role.findOne({ role_slug: { $eq: user_details.role } }, (err, roleRes) => {
								console.log("debug 2",roleRes)
                                if (err) {
                                    return next(err);
                                } else {
                                    RoleAuth.find(
                                        {
                                            role_slug: {
                                                $eq: roleRes.role_slug,
                                            },
                                        },
                                        (error, data) => {
                                            if (error) {
                                                return next(error);
                                            } else {
                                                let newPermissionArr = Array();
                                                if (user_details.user_permission.length <= 0) {
                                                    if (data.length > 0) {
                                                        data[0].sub_module.map(
                                                            function (el) {
                                                                newPermissionArr.push(
                                                                    el
                                                                );
                                                            }
                                                        );
                                                    }
                                                } else {
                                                    user_details.user_permission.map(
                                                        function (el) {
                                                            newPermissionArr.push(
                                                                el
                                                            );
                                                        }
                                                    );
                                                }
                                                Module.find({}, (error, data) => {
                                                    if (error) {
                                                        return next(error);
                                                    } else {
                                                        Operation.find({}, (error, opdata) => {
                                                            if (error) {
                                                                return next(error);
                                                            } else {
                                                                var newDataArr = Array();
                                                                opdata.forEach((opelements) => {
                                                                    newPermissionArr.forEach((parmelements) => {
                                                                        if (parmelements.id == opelements.mode_id) {
                                                                            newDataArr.push(opelements.sub_module_name);
                                                                        }
                                                                    })
                                                                })
                                                                const payload = { user: user_details.email, _id: user_details._id };
                                                                const secret = "loginJWTTokenBaseVerification";
                                                                const token = jwt.sign(
                                                                    payload,
                                                                    secret
                                                                );
                                                                const userData = {
                                                                    _id: user_details._id,
                                                                    name: user_details.name,
                                                                    email: user_details.email,
                                                                    permission: newDataArr,
                                                                    role: user_details.role,
                                                                    mobile_no: user_details.mobile_no,
                                                                    token: token,
                                                                };
                                                                res.json({
                                                                    response: true,
                                                                    data: userData,
                                                                    message:
                                                                        `User has been logged in successfully. His role is ${user_details.role}`,
                                                                    token: token,
                                                                });
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                }
                            });
                        } else {
                            res.json({
                                response: false,
                                message: "Please enter valid password.",
                            });
                        }
                    })
                        .catch((err) => {
                            res.json({
                                response: false,
                                message: "Please enter valid password.",
                            });
                        });
                } else {
                    res.json({
                        response: false,
                        message: "Your account is blocked.",
                    });
                }
            } else {
                res.json({
                    response: false,
                    message: "Invalid email or password.",
                });
            }
        }
    });
};

exports.logout = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    jwt.destroy(token);
    res.json({ response: true, message: "Successfully logout." });
};

exports.get_profile = (req, res, next) => {
    const email = req.body.email;

    User.findOne({ email: { $eq: email } }, (error, admin) => {
        if (error) {
            return next(error);
        } else {
            if (admin) {
                const userData = {
                    name: admin.name,
                    email: admin.email,
                    role: admin.role,
                    _id: admin._id,
                    mobile_no: admin.mobile_no
                };
                res.json({
                    response: true,
                    data: userData,
                    message:
                        "Profile details has been retrieved successfully.",
                });
            } else {
                res.json({
                    response: false,
                    message: "Please enter valid email address.",
                });
            }
        }
    });
}
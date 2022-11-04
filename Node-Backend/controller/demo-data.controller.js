var slugify = require("slugify");
const bcrypt = require("bcryptjs");

const User = require("../model/User");
const Role = require("../model/Role");
const Role_Auths = require("../model/RoleAuth");
const Module = require("../model/Module");
const operations = require("../model/Operation");
const Country = require("../model/Country");
const MailTemplate = require('../model/MailTemplate');
const MailSetting = require('../model/MailSetting');

function generate_slug(slug) {
    var create_slug = slugify(slug, {
        replacement: "-",
        remove: undefined,
        lower: true,
        strict: false,
        locale: "vi",
    });

    return create_slug;
}

exports.demo_data = (req, res, next) => {

	// Uncomment Script 1 and run it first


	
	// Script 1 - Create module, operation, role, role-auth collections in mongoDB
	
	var role = "Admin";
    var role_slug = generate_slug(role);
    
    var role_1 = "Staff";
    var role_slug_1 = generate_slug(role_1);
    
    var role_2 = "Customer";
    var role_slug_2 = generate_slug(role_2);
    Role.countDocuments({ role_slug: { $eq: role_slug } }, (error, count) => {
        if (error) {
            return next(error);
        } else {
            if (count >= 1) {
                res.send({response: false, message: "Already exist the data in database "});
            } else {
                let role_data = [
                    {
                        role_name : role,
                        role_slug : role_slug,
                        role_status: true
                    },
                    {
                        role_name : role_1,
                        role_slug : role_slug_1,
                        role_status: true
                    },
                    {
                        role_name : role_2,
                        role_slug : role_slug_2,
                        role_status: true
                    },
                ];
                Role.create(role_data, (error, result) => {
                    if (error) {
                        return next(error);
                    } else {
                        const module = [
                            {
                                module_name: "Customer",
                                module_slug: "customer",
                                sub_module: [
                                    {
                                        sub_module_id: 1,
                                        sub_module_name: "Add Customer",
                                        sub_slug: "add-customer",
                                    },
                                    {
                                        sub_module_id: 2,
                                        sub_module_name: "Edit Customer",
                                        sub_slug: "edit-customer",
                                    },
                                    {
                                        sub_module_id: 3,
                                        sub_module_name: "View Customer",
                                        sub_slug: "view-customer",
                                    },
                                    {
                                        sub_module_id: 4,
                                        sub_module_name: "Delete Customer",
                                        sub_slug: "delete-customer",
                                    },
                                ],
                                status: true,
                                module_id: 1,
                            },
                            {
                                module_name: "Staff",
                                module_slug: "staff",
                                sub_module: [
                                    {
                                        sub_module_id: 5,
                                        sub_module_name: "Add Staff",
                                        sub_slug: "add-staff",
                                    },
                                    {
                                        sub_module_id: 6,
                                        sub_module_name: "Edit Staff",
                                        sub_slug: "edit-staff",
                                    },
                                    {
                                        sub_module_id: 7,
                                        sub_module_name: "View Staff",
                                        sub_slug: "view-staff",
                                    },
                                    {
                                        sub_module_id: 8,
                                        sub_module_name: "Delete Staff",
                                        sub_slug: "delete-staff",
                                    },
                                ],
                                status: true,
                                module_id: 2,
                            },
                            {
                                module_name: "Role",
                                module_slug: "role",
                                sub_module: [
                                    {
                                        sub_module_id: 9,
                                        sub_module_name: "Add Role",
                                        sub_slug: "add-role",
                                    },
                                    {
                                        sub_module_id: 10,
                                        sub_module_name: "Edit Role",
                                        sub_slug: "edit-role",
                                    },
                                    {
                                        sub_module_id: 11,
                                        sub_module_name: "View Role",
                                        sub_slug: "view-role",
                                    },
                                    {
                                        sub_module_id: 12,
                                        sub_module_name: "Delete Role",
                                        sub_slug: "delete-role",
                                    },
                                    {
                                        sub_module_id: 13,
                                        sub_module_name: "View Permission",
                                        sub_slug: "view-permission",
                                    },
                                ],
                                status: true,
                                module_id: 3,
                            },
                        ];
                        Module.create(module, (error, module_data) => {
                            if (error) {
                                return next(error);
                            } else {
                                const ope = [
                                    {
                                        mode_id: 1,
                                        module_id: 1,
                                        sub_module_name: "Add Customer",
                                        sub_slug: "ADD CUSTOMER",
                                    },
                                    {
                                        mode_id: 2,
                                        module_id: 1,
                                        sub_module_name: "Edit Customer",
                                        sub_slug: "EDIT CUSTOMER",
                                    },
                                    {
                                        mode_id: 3,
                                        module_id: 1,
                                        sub_module_name: "View Customer",
                                        sub_slug: "View CUSTOMER",
                                    },
                                    {
                                        mode_id: 4,
                                        module_id: 1,
                                        sub_module_name: "Delete Customer",
                                        sub_slug: "DELETE CUSTOMER",
                                    },
                                    {
                                        mode_id: 5,
                                        module_id: 2,
                                        sub_module_name: "Add Staff",
                                        sub_slug: "ADD STAFF",
                                    },
                                    {
                                        mode_id: 6,
                                        module_id: 2,
                                        sub_module_name: "Edit Staff",
                                        sub_slug: "EDIT STAFF",
                                    },
                                    {
                                        mode_id: 7,
                                        module_id: 2,
                                        sub_module_name: "View Staff",
                                        sub_slug: "VIEW STAFF",
                                    },
                                    {
                                        mode_id: 8,
                                        module_id: 2,
                                        sub_module_name: "Delete Staff",
                                        sub_slug: "DELETE STAFF",
                                    },
                                    {
                                        mode_id: 9,
                                        module_id: 3,
                                        sub_module_name: "Add Role",
                                        sub_slug: "ADD ROLE",
                                    },
                                    {
                                        mode_id: 10,
                                        module_id: 3,
                                        sub_module_name: "Edit Role",
                                        sub_slug: "EDIT ROLE",
                                    },
                                    {
                                        mode_id: 11,
                                        module_id: 3,
                                        sub_module_name: "Delete Role",
                                        sub_slug: "DELETE ROLE",
                                    },
                                    {
                                        mode_id: 12,
                                        module_id: 3,
                                        sub_module_name: "View Role",
                                        sub_slug: "VIEW ROLE",
                                    },
                                    {
                                        mode_id: 13,
                                        module_id: 3,
                                        sub_module_name: "View Permission",
                                        sub_slug: "VIEW PERMISSION",
                                    },
                                ];
                                operations.create(ope, (error, module_data11) => {
                                    const sub_module = Array();
                                    module.forEach((element) => {
                                        element.sub_module.forEach((ele) => {
                                            let newData = {
                                                module_id: element.module_id,
                                                id: ele.sub_module_id
                                            }
                                            sub_module.push(newData);
                                        });
                                    });
                                    const role_auth = [
                                        {
                                            role_slug: role_slug,
                                            sub_module: sub_module,
                                            status: true,
                                        },
                                        {
                                            role_slug: role_slug_1,
                                            sub_module: [],
                                            status: true,
                                        },
                                        {
                                            role_slug: role_slug_2,
                                            sub_module: [],
                                            status: true,
                                        }
                                    ];
                                    Role_Auths.create(role_auth, (error, role_datas) => {
                                        if (error) {
                                            return next(error);
                                        } else {
                                            res.json({
                                                response: true,
                                                message:
                                                    "Successfully Added the Data in Database",
                                            });
                                        }
                                    });
                                })
                            }
                        });
                    }
                });
            }
        }
    });
	

	




	// Uncomment below code (script 2) and run after script 1 run, it will create user, mail-template, mail-setting
    /**===================================================================================================*/
    
	/* 
	
	// Script 2 - Add admin user 
    
	const user_name = "Admin";
	const user_slug = generate_slug(
		user_name
	);
	const password = "123456";
	// //
	bcrypt.hash(
		password,
		saltRounds,
		function (err_pwd, hash) {
			if (err_pwd) {
				return next(err_pwd);
			} else {
				const UserData = {
					name: user_name,
					email: "admin@yopmail.com",
					password: hash,
					user_slug: user_slug,
					role: "admin",
					user_status: true,
				};
				User.create(
					UserData,
					(
						error,
						userdata
					) => {
						if (error) {
							return next(
								error
							);
						} else {

							const mailData = [{
								template_name: "Forgot Password",
								subject: "Forgot Password",
								description: "<p>Forgot Password</p>\n\n<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%\">\n\t<tbody>\n\t\t<tr>\n\t\t\t<td>\n\t\t\t<table border=\"0\" cellpadding=\"30\" cellspacing=\"0\" style=\"width:600px\">\n\t\t\t\t<tbody>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td style=\"background-color:#ffffff; border-color:#dce1e5; border-style:solid; border-width:1px\">\n\t\t\t\t\t\t<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%\">\n\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<td style=\"vertical-align:top\">\n\t\t\t\t\t\t\t\t\t<h2>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span className=\"marker\">{{subject}}</span></h2>\n\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<td style=\"border-bottom:1px solid #dce1e5; border-top:1px solid #dce1e5; vertical-align:top\">\n\t\t\t\t\t\t\t\t\t<p><strong>&nbsp; &nbsp;Username:</strong> {{user_name}}</p>\n\n\t\t\t\t\t\t\t\t\t<p><strong>&nbsp; &nbsp;E-mail:</strong> {{email}}</p>\n\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<td style=\"vertical-align:top\">\n\t\t\t\t\t\t\t\t\t<p><br />\n\t\t\t\t\t\t\t\t\t&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ...... Forgot Password Link is Below .......</p>\n\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<td style=\"vertical-align:top\">\n\t\t\t\t\t\t\t\t\t<h3>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;<a href=\"{{link}}\">Change my password</a></h3>\n\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t</table>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t</tr>\n\t\t\t\t</tbody>\n\t\t\t</table>\n\t\t\t</td>\n\t\t</tr>\n\t</tbody>\n</table>\n",
								status: true,
								slug: "forgot-password",
							},
								{
									template_name: "Active User",
									subject: "User Activation",
									description: `<p>User Activation</p><table align="center" border="0" cellpadding="0" cellspacing="0" style="width:100%"><tbody><tr><td><table border="0" cellpadding="30" cellspacing="0" style="width:600px"><tbody><tr><td style="background-color:#ffffff; border-color:#dce1e5; border-style:solid; border-width:1px"><table border="0" cellpadding="0" cellspacing="0" style="width:100%">
								<tbody><tr><td style="vertical-align:top"><h2>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span className="marker">{{subject}}</span></h2></td></tr>
								<tr><td style="border-bottom:1px solid #dce1e5; border-top:1px solid #dce1e5; vertical-align:top"><p><strong>&nbsp; &nbsp;Username:</strong> {{user_name}}</p><p><strong>&nbsp; &nbsp;E-mail:</strong> {{email}}</p></td></tr>
								<tr><td style="vertical-align:top"><p><br />&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ...... User Activation Link is Below .......</p></td></tr>
									<tr><td style="vertical-align:top"><h3>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;<a href="{{link}}">User Activation</a></h3></td></tr>
								</tbody></table></td></tr></tbody></table></td></tr></tbody></table>
	`,
									status: true,
									slug: "active-user",
								}
							]

							MailTemplate.create(mailData, (error, result) => {
								if (error) {
									return next(
										error
									);
								} else {

									const mailSetting = {
										service: "gmail",
										host: "",
										port: "587",
										secure: false,
										email: "vpn.testings@gmail.com",
										password: "glodctsgsefqheiw",
										mail_slug: "mail_configration"
									}

									MailSetting.create(mailSetting, (error, mailSeting) => {
										if (error) {
											res.json({
												response: false,
												message:
													"Something is worg please try again"
											})
										} else {
												res.json({
													response: true,
													message:
														"Successfully Added the Data in Database",
												});
										}
									})

								}
							})
						}
					}
				);
			}
		}
	);
	
	*/
};
const express = require('express');
const app = express();
const { userValidation, validate, editUserValidation, validateUserToken,roleValidation } = require('../../middleware/validation');
const JwtVerify = require('../../middleware/jwtToken');

const route = express.Router();

//load controllers
const UserController = require('../../controller/users.controller');
const RoleController = require('../../controller/role.controller');
const AuthController = require('../../controller/auth.controller');
const RoleAuthController = require('../../controller/role-auth.controller');
const DashboardController = require('../../controller/dashboard.controller')
const SettingController = require('../../controller/setting.controller')
const ProductController = require('../../controller/product.controller');

// Authetication 
route.post('/login', validate, AuthController.login);
route.get('/logout', JwtVerify.validateToken, AuthController.logout);
route.get('/get_profile', JwtVerify.validateToken, validate, AuthController.get_profile);
route.post('/register', userValidation(), validate, UserController.create);

// Dashboard 
route.get('/dashboard', JwtVerify.validateToken, DashboardController.dashboard);

// Country
route.get('/countries', JwtVerify.validateToken,UserController.getAllCountries);

// Customers
route.get('/customers', JwtVerify.validateToken,UserController.getAll);
route.get('/customers/:id', JwtVerify.validateToken,UserController.getById);
route.post('/customers', JwtVerify.validateToken,userValidation(), validate, UserController.create);
route.put('/customers/:id', JwtVerify.validateToken,editUserValidation(), validate, UserController.update);
route.delete('/customers/:id', JwtVerify.validateToken,UserController.delete);
route.post('/importCustomers', JwtVerify.validateToken, UserController.importCustomers);

// Staff
route.get('/staffs', JwtVerify.validateToken,UserController.getAllStaff);

//Role
route.get('/roles', JwtVerify.validateToken,RoleController.getAll);
route.get('/roles/:id', JwtVerify.validateToken,RoleController.getbyId);
route.post('/roles', JwtVerify.validateToken,roleValidation(), validate, RoleController.create);
route.put('/roles/:id', JwtVerify.validateToken,roleValidation(), validate, RoleController.update);
route.delete('/roles/:id', JwtVerify.validateToken,RoleController.delete);
route.get('/getAllModules', JwtVerify.validateToken,RoleController.getAllModule);

//Role Auth
route.post('/permission', JwtVerify.validateToken,RoleAuthController.create);
route.get('/permission/:id', JwtVerify.validateToken,RoleAuthController.getAll);

//Setting Auth
route.get('/settings', JwtVerify.validateToken,SettingController.getAll);
route.put('/settings/:id', JwtVerify.validateToken, SettingController.update);

//Products
route.get('/products', JwtVerify.validateToken,ProductController.getAll);

// route.get('/roles/:id', JwtVerify.validateToken,RoleController.getbyId);
route.post('/products', JwtVerify.validateToken, ProductController.create);
// route.put('/roles/:id', JwtVerify.validateToken,roleValidation(), validate, RoleController.update);
// route.delete('/roles/:id', JwtVerify.validateToken,RoleController.delete);
// route.get('/getAllModules', JwtVerify.validateToken,RoleController.getAllModule);

module.exports = route;
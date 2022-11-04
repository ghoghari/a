const { param, body, validationResult } = require('express-validator')

exports.roleValidation = () => {
  return [
    body('role_name').notEmpty().withMessage('Role Name is required !'),
    body('role_status').notEmpty().withMessage('Role Status is required !')
  ]
}

exports.settingValidation = () => {
  return [
    body('deliveryFee').notEmpty().withMessage('Delivery fee is required !'),
    body('serviceFeee').notEmpty().withMessage('Service fee is required !')
  ]
}

exports.userValidation = () => {
  return [
    body('name').notEmpty().withMessage('Name is required!'),
    body('email').notEmpty().withMessage('Email is required!'),
    body('status').notEmpty().withMessage('Status is required!'),
  ]
}
exports.validateUserToken = () => {
  return [
    body('token').notEmpty().withMessage('Token is required!')
  ]
}

exports.editUserValidation = () => {
  return [
    body('name').notEmpty().withMessage('Name is required!'),
    body('role').notEmpty().withMessage('Role is required!'),
    body('user_status').notEmpty().withMessage('Status is required!'),
  ]
}

exports.user_permission = () => {
  return [
    body('user_slug').notEmpty().withMessage('Slug is required!'),
  ]
}

exports.forgotPassword = () => {
  return [
    body('email').notEmpty().withMessage('Email is required!'),
  ]
}

exports.recoverPassword = () => {
  return [
    body('password').notEmpty().withMessage('Password is required!'),
    body('confirm_password').notEmpty().withMessage('Confirm Password is required!')
  ]
}

exports.cmsValidation = () => {
  return [
    body('title').notEmpty().withMessage('The title field is require.'),
    body('description').notEmpty().withMessage('The descripation field is require.'),
  ]
}


exports.validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
  
    return res.status(422).json({
      errors: extractedErrors,
    })
}
const router = require('express').Router()
const userController = require('../controllers/user')
const { body } = require('express-validator')
const validation = require('../handlers/validation')
const tokenHandler = require('../handlers/tokenHandler')
const User = require('../models/user')

router.post(
  '/signup',
  body('username').isLength({ min: 4 }).withMessage(
    'tên đăng nhập phải từ 4 ký tự trở lên'
  ),
  body('password').isLength({ min: 6 }).withMessage(
    'mật khẩu phải từ 6 ký tự trở lên'
  ),
  body('confirmPassword').isLength({ min: 6 }).withMessage(
    'mật khẩu phải từ 6 ký tự trở lên'
  ),
  body('username').custom(value => {
    return User.findOne({ username: value }).then(user => {
      if (user) {
        return Promise.reject('tên đăng nhập đã được sử dụng')
      }
    })
  }),
  validation.validate,
  userController.register
)

router.post(
  '/login',
  body('username').isLength({ min: 4 }).withMessage(
    'tên đăng nhập phải từ 4 ký tự trở lên'
  ),
  body('password').isLength({ min: 6 }).withMessage(
    'mật khẩu phải từ 6 ký tự trở lên'
  ),
  validation.validate,
  userController.login
)

router.post(
  '/verify-token',
  tokenHandler.verifyToken,
  (req, res) => {
    res.status(200).json({ user: req.user })
  }
)

module.exports = router
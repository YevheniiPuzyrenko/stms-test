/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _encryptPassword = __webpack_require__(3);

var _encryptPassword2 = _interopRequireDefault(_encryptPassword);

var _point = __webpack_require__(13);

var _point2 = _interopRequireDefault(_point);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userSchema = new _mongoose2.default.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  },
  nameCoords: {
    x: {
      type: Number
    },
    y: {
      type: Number
    }
  },
  imageCoords: {
    x: {
      type: Number
    },
    y: {
      type: Number
    }
  }
});
userSchema.pre('save', function (next) {
  var currentDate = new Date();
  this.password = (0, _encryptPassword2.default)(this.password);
  this.updated_at = currentDate;

  if (!this.created_at) {
    this.created_at = currentDate;
  }

  next();
});

var User = _mongoose2.default.model('User', userSchema);

exports.default = User;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = encryptPassword;

var _crypto = __webpack_require__(12);

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function encryptPassword(password) {
  var cipher = _crypto2.default.createCipher('aes-128-cbc', 'myawesomesecret');

  var encryptedPassword = cipher.update(password, 'utf8', 'hex');
  encryptedPassword += cipher.final('hex');
  return encryptedPassword;
}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(6);
module.exports = __webpack_require__(7);


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _app = __webpack_require__(8);

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app2.default.listen(3000);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koa = __webpack_require__(9);

var _koa2 = _interopRequireDefault(_koa);

var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _koaBodyparser = __webpack_require__(10);

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _user = __webpack_require__(11);

var _user2 = _interopRequireDefault(_user);

var _auth = __webpack_require__(15);

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.connect('mongodb://localhost:27017/stms');

var app = new _koa2.default();
app.use((0, _koaBodyparser2.default)());
app.use(_user2.default.routes());
app.use(_auth2.default.routes());
exports.default = app;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("koa-bodyparser");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koaRouter = __webpack_require__(1);

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _user = __webpack_require__(2);

var _user2 = _interopRequireDefault(_user);

var _jwtCheck = __webpack_require__(14);

var _jwtCheck2 = _interopRequireDefault(_jwtCheck);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

var userRouter = new _koaRouter2.default();
var userGetFields = 'username nameCoords imageCoords';
userRouter.delete('/users', _jwtCheck2.default, function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(ctx) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _user2.default.remove();

          case 2:
            ctx.body = 'Success';

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
userRouter.get('/users', _jwtCheck2.default, function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(ctx) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _user2.default.find({});

          case 2:
            ctx.body = _context2.sent;

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}());
userRouter.get('/user/:username', _jwtCheck2.default, function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(ctx) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _user2.default.find({
              username: ctx.params.username
            }, userGetFields);

          case 3:
            ctx.body = _context3.sent;
            _context3.next = 10;
            break;

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3["catch"](0);
            ctx.status = 404;
            ctx.body = 'Not found';

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this, [[0, 6]]);
  }));

  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
}());
userRouter.post('/user', function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(ctx, next) {
    var newUser, eJson;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            newUser = new _user2.default(_extends({}, ctx.request.body));
            _context4.next = 4;
            return newUser.save();

          case 4:
            ctx.status = 201;
            ctx.body = newUser;
            _context4.next = 15;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](0);
            eJson = _context4.t0.toJSON();

            if (eJson.code === 11000) {
              ctx.status = 400;
              ctx.body = 'This user already exists';
            }

            ;

            if (eJson.errors) {
              ctx.status = 400;
              ctx.body = "Fields ".concat(Object.keys(eJson.errors).join(', '), " are required");
            }

            ;

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this, [[0, 8]]);
  }));

  return function (_x4, _x5) {
    return _ref4.apply(this, arguments);
  };
}());
userRouter.put('/user/:username/coords', _jwtCheck2.default, function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(ctx) {
    var username, _ctx$request$body, nameCoords, imageCoords, some;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            username = ctx.params.username.username;
            _ctx$request$body = ctx.request.body, nameCoords = _ctx$request$body.nameCoords, imageCoords = _ctx$request$body.imageCoords;

            if (!(!imageCoords || !nameCoords)) {
              _context5.next = 6;
              break;
            }

            ctx.status = 400;
            ctx.body = 'Please provide both image and name coordinates';
            return _context5.abrupt("return");

          case 6:
            ;
            _context5.prev = 7;
            imageCoords = JSON.parse(imageCoords);
            nameCoords = JSON.parse(nameCoords);
            _context5.next = 17;
            break;

          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5["catch"](7);
            ctx.status = 400;
            ctx.body = 'Please provide valid both image and name coordinates';
            return _context5.abrupt("return");

          case 17:
            ;
            _context5.prev = 18;
            _context5.next = 21;
            return _user2.default.findOne({
              username: 'val2354111'
            });

          case 21:
            some = _context5.sent;
            _context5.next = 24;
            return some.update({
              nameCoords: nameCoords,
              imageCoords: imageCoords
            });

          case 24:
            _context5.next = 31;
            break;

          case 26:
            _context5.prev = 26;
            _context5.t1 = _context5["catch"](18);
            ctx.body = 'Bad request';
            ctx.status = 400;
            return _context5.abrupt("return");

          case 31:
            ;
            ctx.body = 'User successfully updated!';

          case 33:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this, [[7, 12], [18, 26]]);
  }));

  return function (_x6) {
    return _ref5.apply(this, arguments);
  };
}());
exports.default = userRouter;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PointSchema = new _mongoose2.default.Schema({
  x: {
    type: Number,
    required: true
  },
  y: {
    type: Number,
    required: true
  }
});
exports.default = PointSchema;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var authMiddleware = function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(ctx, next) {
    var token;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = ctx.request.headers.authorization;

            if (token) {
              _context.next = 6;
              break;
            }

            console.log('no token');
            ctx.status = 401;
            ctx.body = 'Auth token is missing!';
            return _context.abrupt("return");

          case 6:
            ;
            _context.prev = 7;
            _context.next = 10;
            return jwt.verify(token, 'jellyPanda');

          case 10:
            _context.next = 17;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](7);
            ctx.body = 'Your token is incorrect or expired. Please sign in.';
            ctx.status = 401;
            return _context.abrupt("return");

          case 17:
            ;
            return _context.abrupt("return", next());

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[7, 12]]);
  }));

  return function authMiddleware(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _jsonwebtoken = __webpack_require__(4);

var jwt = _interopRequireWildcard(_jsonwebtoken);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

exports.default = authMiddleware;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koaRouter = __webpack_require__(1);

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _jsonwebtoken = __webpack_require__(4);

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _encryptPassword = __webpack_require__(3);

var _encryptPassword2 = _interopRequireDefault(_encryptPassword);

var _user = __webpack_require__(2);

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

var authRouter = new _koaRouter2.default();
authRouter.post('/login', function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(ctx) {
    var _ctx$request$body, username, password, user, token;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ctx$request$body = ctx.request.body, username = _ctx$request$body.username, password = _ctx$request$body.password;
            _context.next = 3;
            return _user2.default.findOne({
              username: username
            });

          case 3:
            user = _context.sent;

            if (user) {
              _context.next = 8;
              break;
            }

            ctx.status = 404;
            ctx.body = 'Such user does not exist!';
            return _context.abrupt("return");

          case 8:
            ;

            if (!((0, _encryptPassword2.default)(password) !== user.password)) {
              _context.next = 13;
              break;
            }

            ctx.status = 400;
            ctx.body = 'Login/Password doesn\'t match!';
            return _context.abrupt("return");

          case 13:
            ;
            token = _jsonwebtoken2.default.sign({
              username: username
            }, 'jellyPanda', {
              expiresIn: '24h'
            });
            ctx.body = {
              token: token
            };

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
exports.default = authRouter;

/***/ })
/******/ ]);
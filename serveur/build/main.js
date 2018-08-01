require('source-map-support/register')
module.exports =
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("joi");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(12);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(5);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

__webpack_require__(6);

var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _volleyball = __webpack_require__(7);

var _volleyball2 = _interopRequireDefault(_volleyball);

var _api = __webpack_require__(8);

var _cors = __webpack_require__(21);

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _process$env = process.env,
    PORT = _process$env.PORT,
    DBurl = _process$env.DBurl;

var app = (0, _express2.default)();

_mongoose2.default.connect(DBurl);
var db = _mongoose2.default.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("[MongoDB]:ça marche ici");
});

app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: true }));
app.use(_volleyball2.default);
app.use((0, _cors2.default)());
app.use('/api', _api.restRouter);

app.use(function (req, res, next) {
  var error = new Error("Not found");
  error.message = "route invalide";
  error.status = 404;
  next(error);
});

app.use(function (error, req, res, next) {
  res.status(error.status || 500);
  return res.json({
    error: {
      msg: error.message
    }
  });
});

app.listen(PORT, function () {
  console.log("L'app marche sur le port: " + PORT);
});

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("dotenv/config");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("volleyball");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.restRouter = undefined;

var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

var _articlesRoute = __webpack_require__(9);

var _adminRoute = __webpack_require__(16);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var restRouter = exports.restRouter = _express2.default.Router();

restRouter.use('/articles', _articlesRoute.articleRouter);
restRouter.use('/admin', _adminRoute.adminRouter);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.articleRouter = undefined;

var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

var _passport = __webpack_require__(10);

var _passport2 = _interopRequireDefault(_passport);

var _articles = __webpack_require__(11);

var _articles2 = _interopRequireDefault(_articles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var articleRouter = exports.articleRouter = _express2.default.Router();

articleRouter.route('/') // creer un bloc de routes
.post(_articles2.default.create).get(_articles2.default.findAll);
articleRouter.route('/:id').get(_articles2.default.findOne).put(_articles2.default.update).delete(_articles2.default.delete);

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(3);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _joi = __webpack_require__(2);

var _joi2 = _interopRequireDefault(_joi);

var _articlesModel = __webpack_require__(14);

var _articlesModel2 = _interopRequireDefault(_articlesModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
  create: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
      var schema, _Joi$validate, value, error, article;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              schema = _joi2.default.object().keys({ //cree un obj et lui donne les keys du model
                titre: _joi2.default.string().required(),
                date: _joi2.default.date(),
                texte: _joi2.default.string().required(),
                isPublished: _joi2.default.boolean(),
                image: _joi2.default.string()
              });
              _Joi$validate = _joi2.default.validate(req.body, schema), value = _Joi$validate.value, error = _Joi$validate.error;

              if (!(error && error.details)) {
                _context.next = 5;
                break;
              }

              return _context.abrupt('return', res.status(400).json(error));

            case 5:
              _context.next = 7;
              return _articlesModel2.default.create(Object.assign({}, value));

            case 7:
              article = _context.sent;
              return _context.abrupt('return', res.json(article));

            case 11:
              _context.prev = 11;
              _context.t0 = _context['catch'](0);

              console.log(_context.t0);
              return _context.abrupt('return', res.status(500).send(_context.t0));

            case 15:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 11]]);
    }));

    function create(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return create;
  }(),
  findAll: function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
      var articles;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _articlesModel2.default.find({});

            case 3:
              articles = _context2.sent;

              if (articles) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt('return', res.status(404).json({ err: 'could not find article' }));

            case 6:
              res.json(articles);
              _context2.next = 13;
              break;

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2['catch'](0);

              console.error(_context2.t0);
              return _context2.abrupt('return', res.status(500).send(_context2.t0));

            case 13:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[0, 9]]);
    }));

    function findAll(_x3, _x4) {
      return _ref2.apply(this, arguments);
    }

    return findAll;
  }(),
  findOne: function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
      var id, article;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              id = req.params.id;
              _context3.next = 4;
              return _articlesModel2.default.findById(id);

            case 4:
              article = _context3.sent;

              if (article) {
                _context3.next = 7;
                break;
              }

              return _context3.abrupt('return', res.status(404).json({ err: 'could not find article' }));

            case 7:
              return _context3.abrupt('return', res.json(article));

            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3['catch'](0);

              console.error(_context3.t0);
              return _context3.abrupt('return', res.status(500).send(_context3.t0));

            case 14:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this, [[0, 10]]);
    }));

    function findOne(_x5, _x6) {
      return _ref3.apply(this, arguments);
    }

    return findOne;
  }(),
  update: function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
      var id, schema, _Joi$validate2, value, error, article;

      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              id = req.params.id;
              schema = _joi2.default.object().keys({ //cree un obj et lui donne les keys du model
                titre: _joi2.default.string().required(),
                date: _joi2.default.date(),
                texte: _joi2.default.string().required(),
                isPublished: _joi2.default.boolean(),
                image: _joi2.default.string()
              });
              _Joi$validate2 = _joi2.default.validate(req.body, schema), value = _Joi$validate2.value, error = _Joi$validate2.error;

              if (!(error && error.details)) {
                _context4.next = 6;
                break;
              }

              return _context4.abrupt('return', res.status(400).json(error));

            case 6:
              _context4.next = 8;
              return _articlesModel2.default.findOneAndUpdate({ _id: id }, value, { new: true });

            case 8:
              article = _context4.sent;

              if (article) {
                _context4.next = 11;
                break;
              }

              return _context4.abrupt('return', res.status(404).json({ err: 'could not find article' }));

            case 11:
              return _context4.abrupt('return', res.json(article));

            case 14:
              _context4.prev = 14;
              _context4.t0 = _context4['catch'](0);

              console.error(_context4.t0);
              return _context4.abrupt('return', res.status(500).send(_context4.t0));

            case 18:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this, [[0, 14]]);
    }));

    function update(_x7, _x8) {
      return _ref4.apply(this, arguments);
    }

    return update;
  }(),
  delete: function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
      var id, article;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              id = req.params.id;
              _context5.next = 4;
              return _articlesModel2.default.findByIdAndRemove(id);

            case 4:
              article = _context5.sent;

              if (article) {
                _context5.next = 7;
                break;
              }

              return _context5.abrupt('return', res.status(404).json({ err: 'no article found' }));

            case 7:
              return _context5.abrupt('return', res.json({ message: "article deleted" }));

            case 10:
              _context5.prev = 10;
              _context5.t0 = _context5['catch'](0);

              console.error(_context5.t0);
              return _context5.abrupt('return', res.status(500).send(_context5.t0));

            case 14:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this, [[0, 10]]);
    }));

    function _delete(_x9, _x10) {
      return _ref5.apply(this, arguments);
    }

    return _delete;
  }()
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(13);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 13 */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = __webpack_require__(15);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;


var articleSchema = new Schema({
  titre: { type: String, required: true },
  date: { type: Date, default: Date.now },
  texte: { type: String, required: true },
  isPublished: Boolean,
  image: String
});

exports.default = _mongoose2.default.model('Article', articleSchema);

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("mongoose-paginate");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adminRouter = undefined;

var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

var _admin = __webpack_require__(17);

var _admin2 = _interopRequireDefault(_admin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var adminRouter = exports.adminRouter = _express2.default.Router();

adminRouter.post('/signup', _admin2.default.signup);
adminRouter.post('/login', _admin2.default.login);
adminRouter.get('/', _admin2.default.findAll);
adminRouter.route('/:id').put(_admin2.default.update).delete(_admin2.default.delete);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = __webpack_require__(3);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _adminModel = __webpack_require__(18);

var _adminModel2 = _interopRequireDefault(_adminModel);

var _admin = __webpack_require__(19);

var _admin2 = _interopRequireDefault(_admin);

var _joi = __webpack_require__(2);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
    signup: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
            var _adminService$validat, _value, error, encryptedPass, admin;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;
                            _adminService$validat = _admin2.default.validateSignup(req.body), _value = _adminService$validat.value, error = _adminService$validat.error;

                            if (!error) {
                                _context.next = 4;
                                break;
                            }

                            return _context.abrupt('return', res.status(400).json(error));

                        case 4:
                            encryptedPass = _admin2.default.encryptedPass(_value.password);
                            _context.next = 7;
                            return _adminModel2.default.create({
                                firstname: _value.firstname,
                                lastname: _value.lastname,
                                email: _value.email,
                                password: encryptedPass
                            });

                        case 7:
                            admin = _context.sent;
                            return _context.abrupt('return', res.json({ success: true }));

                        case 11:
                            _context.prev = 11;
                            _context.t0 = _context['catch'](0);

                            console.error(_context.t0);
                            return _context.abrupt('return', res.status(500).send(_context.t0));

                        case 15:
                            return _context.abrupt('return', res.json(value));

                        case 16:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this, [[0, 11]]);
        }));

        function signup(_x, _x2) {
            return _ref.apply(this, arguments);
        }

        return signup;
    }(),
    login: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
            var _adminService$validat2, _value2, error, admin, authenticated;

            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.prev = 0;
                            _adminService$validat2 = _admin2.default.validateLogin(req.body), _value2 = _adminService$validat2.value, error = _adminService$validat2.error;

                            if (!error) {
                                _context2.next = 4;
                                break;
                            }

                            return _context2.abrupt('return', res.status(400).json(error));

                        case 4:
                            _context2.next = 6;
                            return _adminModel2.default.findOne({ email: _value2.email });

                        case 6:
                            admin = _context2.sent;

                            if (admin) {
                                _context2.next = 9;
                                break;
                            }

                            return _context2.abrupt('return', res.status(401).json({ err: "not authorized" }));

                        case 9:
                            authenticated = _admin2.default.comparePassword(_value2.password, admin.password);

                            if (authenticated) {
                                _context2.next = 12;
                                break;
                            }

                            return _context2.abrupt('return', res.status(401).json({ err: "not auhtorized" }));

                        case 12:
                            return _context2.abrupt('return', res.json({ success: true }));

                        case 15:
                            _context2.prev = 15;
                            _context2.t0 = _context2['catch'](0);

                            console.error(_context2.t0);
                            return _context2.abrupt('return', res.status(500).send(_context2.t0));

                        case 19:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this, [[0, 15]]);
        }));

        function login(_x3, _x4) {
            return _ref2.apply(this, arguments);
        }

        return login;
    }(),
    authenticated: function authenticated(req, res) {
        return res.json(req.admin);
    },
    findAll: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
            var admin;
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.prev = 0;
                            _context3.next = 3;
                            return _adminModel2.default.find({});

                        case 3:
                            admin = _context3.sent;

                            if (admin) {
                                _context3.next = 6;
                                break;
                            }

                            return _context3.abrupt('return', res.status(404).json({ err: 'could not find article' }));

                        case 6:
                            res.json(admin);
                            _context3.next = 13;
                            break;

                        case 9:
                            _context3.prev = 9;
                            _context3.t0 = _context3['catch'](0);

                            console.error(_context3.t0);
                            return _context3.abrupt('return', res.status(500).send(_context3.t0));

                        case 13:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, this, [[0, 9]]);
        }));

        function findAll(_x5, _x6) {
            return _ref3.apply(this, arguments);
        }

        return findAll;
    }(),
    update: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
            var id, schema, _Joi$validate, _value3, error, admin;

            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.prev = 0;
                            id = req.params.id; //le password n'est pas crypté à son changement

                            schema = _joi2.default.object().keys({
                                firstname: _joi2.default.string().required(),
                                lastname: _joi2.default.string().required(),
                                email: _joi2.default.string().email().required(),
                                password: _joi2.default.string().required()
                            });
                            _Joi$validate = _joi2.default.validate(req.body, schema), _value3 = _Joi$validate.value, error = _Joi$validate.error;

                            if (!(error && error.details)) {
                                _context4.next = 6;
                                break;
                            }

                            return _context4.abrupt('return', res.status(400).json(error));

                        case 6:
                            _context4.next = 8;
                            return _adminModel2.default.findByIdAndUpdate({
                                _id: id
                            }, _value3, {
                                new: true
                            });

                        case 8:
                            admin = _context4.sent;

                            if (admin) {
                                _context4.next = 11;
                                break;
                            }

                            return _context4.abrupt('return', res.status(404).json({
                                err: 'could not find a customer'
                            }));

                        case 11:
                            return _context4.abrupt('return', res.json(admin));

                        case 14:
                            _context4.prev = 14;
                            _context4.t0 = _context4['catch'](0);

                            console.error(_context4.t0);
                            return _context4.abrupt('return', res.status(500).send(_context4.t0));

                        case 18:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, this, [[0, 14]]);
        }));

        function update(_x7, _x8) {
            return _ref4.apply(this, arguments);
        }

        return update;
    }(),
    delete: function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
            var id, admin;
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.prev = 0;
                            id = req.params.id;
                            _context5.next = 4;
                            return _adminModel2.default.findByIdAndRemove({
                                _id: id
                            });

                        case 4:
                            admin = _context5.sent;

                            if (admin) {
                                _context5.next = 7;
                                break;
                            }

                            return _context5.abrupt('return', res.status(404).json({
                                err: 'no customer found'
                            }));

                        case 7:
                            return _context5.abrupt('return', res.json({
                                msg: 'customer deleted'
                            }));

                        case 10:
                            _context5.prev = 10;
                            _context5.t0 = _context5['catch'](0);

                            console.error(_context5.t0);
                            return _context5.abrupt('return', res.status(500).send(_context5.t0));

                        case 14:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, this, [[0, 10]]);
        }));

        function _delete(_x9, _x10) {
            return _ref5.apply(this, arguments);
        }

        return _delete;
    }()
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;


var adminSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

exports.default = _mongoose2.default.model('Admin', adminSchema);

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = __webpack_require__(2);

var _joi2 = _interopRequireDefault(_joi);

var _bcryptjs = __webpack_require__(20);

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  encryptedPass: function encryptedPass(randomText) {
    var salt = _bcryptjs2.default.genSaltSync(10);
    return _bcryptjs2.default.hashSync(randomText, salt);
  },
  comparePassword: function comparePassword(randomText, encryptedPass) {
    return _bcryptjs2.default.compareSync(randomText, encryptedPass);
  },
  validateSignup: function validateSignup(body) {
    var schema = _joi2.default.object().keys({
      firstname: _joi2.default.string().required(),
      lastname: _joi2.default.string().required(),
      email: _joi2.default.string().email().required(),
      password: _joi2.default.string().required()
    });

    var _Joi$validate = _joi2.default.validate(body, schema),
        value = _Joi$validate.value,
        error = _Joi$validate.error;

    if (error && error.details) {
      return { error: error };
    }
    return { value: value };
  },
  validateLogin: function validateLogin(body) {
    var schema = _joi2.default.object().keys({
      email: _joi2.default.string().email().required(),
      password: _joi2.default.string().required()
    });

    var _Joi$validate2 = _joi2.default.validate(body, schema),
        value = _Joi$validate2.value,
        error = _Joi$validate2.error;

    if (error && error.details) {
      return { error: error };
    }
    return { value: value };
  }
};

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("bcryptjs");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ })
/******/ ]);
//# sourceMappingURL=main.map
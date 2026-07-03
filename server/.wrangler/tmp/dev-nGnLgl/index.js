var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// .wrangler/tmp/bundle-8B5er1/checked-fetch.js
function checkURL(request, init2) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init2) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
var urls;
var init_checked_fetch = __esm({
  ".wrangler/tmp/bundle-8B5er1/checked-fetch.js"() {
    "use strict";
    urls = /* @__PURE__ */ new Set();
    __name(checkURL, "checkURL");
    globalThis.fetch = new Proxy(globalThis.fetch, {
      apply(target, thisArg, argArray) {
        const [request, init2] = argArray;
        checkURL(request, init2);
        return Reflect.apply(target, thisArg, argArray);
      }
    });
  }
});

// wrangler-modules-watch:wrangler:modules-watch
var init_wrangler_modules_watch = __esm({
  "wrangler-modules-watch:wrangler:modules-watch"() {
    init_checked_fetch();
    init_modules_watch_stub();
  }
});

// ../node_modules/.pnpm/wrangler@4.106.0_@cloudflare+workers-types@4.20260702.1/node_modules/wrangler/templates/modules-watch-stub.js
var init_modules_watch_stub = __esm({
  "../node_modules/.pnpm/wrangler@4.106.0_@cloudflare+workers-types@4.20260702.1/node_modules/wrangler/templates/modules-watch-stub.js"() {
    init_wrangler_modules_watch();
  }
});

// ../node_modules/.pnpm/@prisma+client-runtime-utils@7.8.0/node_modules/@prisma/client-runtime-utils/dist/index.js
var require_dist2 = __commonJS({
  "../node_modules/.pnpm/@prisma+client-runtime-utils@7.8.0/node_modules/@prisma/client-runtime-utils/dist/index.js"(exports, module) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    var __defProp4 = Object.defineProperty;
    var __getOwnPropDesc3 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames3 = Object.getOwnPropertyNames;
    var __hasOwnProp3 = Object.prototype.hasOwnProperty;
    var __export3 = /* @__PURE__ */ __name((target, all) => {
      for (var name2 in all)
        __defProp4(target, name2, { get: all[name2], enumerable: true });
    }, "__export");
    var __copyProps3 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames3(from))
          if (!__hasOwnProp3.call(to, key) && key !== except)
            __defProp4(to, key, { get: /* @__PURE__ */ __name(() => from[key], "get"), enumerable: !(desc = __getOwnPropDesc3(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS = /* @__PURE__ */ __name((mod2) => __copyProps3(__defProp4({}, "__esModule", { value: true }), mod2), "__toCommonJS");
    var index_exports = {};
    __export3(index_exports, {
      AnyNull: /* @__PURE__ */ __name(() => AnyNull2, "AnyNull"),
      AnyNullClass: /* @__PURE__ */ __name(() => AnyNullClass, "AnyNullClass"),
      DbNull: /* @__PURE__ */ __name(() => DbNull2, "DbNull"),
      DbNullClass: /* @__PURE__ */ __name(() => DbNullClass, "DbNullClass"),
      Decimal: /* @__PURE__ */ __name(() => Decimal2, "Decimal"),
      JsonNull: /* @__PURE__ */ __name(() => JsonNull2, "JsonNull"),
      JsonNullClass: /* @__PURE__ */ __name(() => JsonNullClass, "JsonNullClass"),
      NullTypes: /* @__PURE__ */ __name(() => NullTypes2, "NullTypes"),
      ObjectEnumValue: /* @__PURE__ */ __name(() => ObjectEnumValue2, "ObjectEnumValue"),
      PrismaClientInitializationError: /* @__PURE__ */ __name(() => PrismaClientInitializationError2, "PrismaClientInitializationError"),
      PrismaClientKnownRequestError: /* @__PURE__ */ __name(() => PrismaClientKnownRequestError2, "PrismaClientKnownRequestError"),
      PrismaClientRustError: /* @__PURE__ */ __name(() => PrismaClientRustError, "PrismaClientRustError"),
      PrismaClientRustPanicError: /* @__PURE__ */ __name(() => PrismaClientRustPanicError2, "PrismaClientRustPanicError"),
      PrismaClientUnknownRequestError: /* @__PURE__ */ __name(() => PrismaClientUnknownRequestError2, "PrismaClientUnknownRequestError"),
      PrismaClientValidationError: /* @__PURE__ */ __name(() => PrismaClientValidationError2, "PrismaClientValidationError"),
      Sql: /* @__PURE__ */ __name(() => Sql2, "Sql"),
      empty: /* @__PURE__ */ __name(() => empty2, "empty"),
      hasBatchIndex: /* @__PURE__ */ __name(() => hasBatchIndex, "hasBatchIndex"),
      isAnyNull: /* @__PURE__ */ __name(() => isAnyNull2, "isAnyNull"),
      isDbNull: /* @__PURE__ */ __name(() => isDbNull2, "isDbNull"),
      isJsonNull: /* @__PURE__ */ __name(() => isJsonNull2, "isJsonNull"),
      isObjectEnumValue: /* @__PURE__ */ __name(() => isObjectEnumValue2, "isObjectEnumValue"),
      join: /* @__PURE__ */ __name(() => join2, "join"),
      raw: /* @__PURE__ */ __name(() => raw3, "raw"),
      sql: /* @__PURE__ */ __name(() => sql, "sql")
    });
    module.exports = __toCommonJS(index_exports);
    function hasBatchIndex(value) {
      return typeof value["batchRequestIdx"] === "number";
    }
    __name(hasBatchIndex, "hasBatchIndex");
    function setClassName(classObject, name2) {
      Object.defineProperty(classObject, "name", {
        value: name2,
        configurable: true
      });
    }
    __name(setClassName, "setClassName");
    var PrismaClientInitializationError2 = class _PrismaClientInitializationError extends Error {
      static {
        __name(this, "_PrismaClientInitializationError");
      }
      clientVersion;
      errorCode;
      retryable;
      constructor(message, clientVersion, errorCode) {
        super(message);
        this.name = "PrismaClientInitializationError";
        this.clientVersion = clientVersion;
        this.errorCode = errorCode;
        Error.captureStackTrace(_PrismaClientInitializationError);
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientInitializationError";
      }
    };
    setClassName(PrismaClientInitializationError2, "PrismaClientInitializationError");
    var PrismaClientKnownRequestError2 = class extends Error {
      static {
        __name(this, "PrismaClientKnownRequestError");
      }
      code;
      meta;
      clientVersion;
      batchRequestIdx;
      constructor(message, { code, clientVersion, meta, batchRequestIdx }) {
        super(message);
        this.name = "PrismaClientKnownRequestError";
        this.code = code;
        this.clientVersion = clientVersion;
        this.meta = meta;
        Object.defineProperty(this, "batchRequestIdx", {
          value: batchRequestIdx,
          enumerable: false,
          writable: true
        });
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientKnownRequestError";
      }
    };
    setClassName(PrismaClientKnownRequestError2, "PrismaClientKnownRequestError");
    function getBacktrace(log3) {
      if (log3.fields?.message) {
        let str = log3.fields?.message;
        if (log3.fields?.file) {
          str += ` in ${log3.fields.file}`;
          if (log3.fields?.line) {
            str += `:${log3.fields.line}`;
          }
          if (log3.fields?.column) {
            str += `:${log3.fields.column}`;
          }
        }
        if (log3.fields?.reason) {
          str += `
${log3.fields?.reason}`;
        }
        return str;
      }
      return "Unknown error";
    }
    __name(getBacktrace, "getBacktrace");
    function isPanic(err) {
      return err.fields?.message === "PANIC";
    }
    __name(isPanic, "isPanic");
    var PrismaClientRustError = class extends Error {
      static {
        __name(this, "PrismaClientRustError");
      }
      clientVersion;
      _isPanic;
      constructor({ clientVersion, error }) {
        const backtrace = getBacktrace(error);
        super(backtrace ?? "Unknown error");
        this._isPanic = isPanic(error);
        this.clientVersion = clientVersion;
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientRustError";
      }
      isPanic() {
        return this._isPanic;
      }
    };
    setClassName(PrismaClientRustError, "PrismaClientRustError");
    var PrismaClientRustPanicError2 = class extends Error {
      static {
        __name(this, "PrismaClientRustPanicError");
      }
      clientVersion;
      constructor(message, clientVersion) {
        super(message);
        this.name = "PrismaClientRustPanicError";
        this.clientVersion = clientVersion;
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientRustPanicError";
      }
    };
    setClassName(PrismaClientRustPanicError2, "PrismaClientRustPanicError");
    var PrismaClientUnknownRequestError2 = class extends Error {
      static {
        __name(this, "PrismaClientUnknownRequestError");
      }
      clientVersion;
      batchRequestIdx;
      constructor(message, { clientVersion, batchRequestIdx }) {
        super(message);
        this.name = "PrismaClientUnknownRequestError";
        this.clientVersion = clientVersion;
        Object.defineProperty(this, "batchRequestIdx", {
          value: batchRequestIdx,
          writable: true,
          enumerable: false
        });
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientUnknownRequestError";
      }
    };
    setClassName(PrismaClientUnknownRequestError2, "PrismaClientUnknownRequestError");
    var PrismaClientValidationError2 = class extends Error {
      static {
        __name(this, "PrismaClientValidationError");
      }
      name = "PrismaClientValidationError";
      clientVersion;
      constructor(message, { clientVersion }) {
        super(message);
        this.clientVersion = clientVersion;
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientValidationError";
      }
    };
    setClassName(PrismaClientValidationError2, "PrismaClientValidationError");
    var secret = /* @__PURE__ */ Symbol();
    var PRISMA_OBJECT_ENUM_VALUE = /* @__PURE__ */ Symbol.for("prisma.objectEnumValue");
    var ObjectEnumValue2 = class {
      static {
        __name(this, "ObjectEnumValue");
      }
      [PRISMA_OBJECT_ENUM_VALUE] = true;
      #representation;
      constructor(arg) {
        if (arg === secret) {
          this.#representation = `Prisma.${this._getName()}`;
        } else {
          this.#representation = `new Prisma.${this._getNamespace()}.${this._getName()}()`;
        }
      }
      _getName() {
        return this.constructor.name;
      }
      toString() {
        return this.#representation;
      }
    };
    function setClassName2(classObject, name2) {
      Object.defineProperty(classObject, "name", {
        value: name2,
        configurable: true
      });
    }
    __name(setClassName2, "setClassName2");
    var NullTypesEnumValue = class extends ObjectEnumValue2 {
      static {
        __name(this, "NullTypesEnumValue");
      }
      _getNamespace() {
        return "NullTypes";
      }
    };
    var DbNullClass = class extends NullTypesEnumValue {
      static {
        __name(this, "DbNullClass");
      }
      // Phantom private property to prevent structural type equality
      // eslint-disable-next-line no-unused-private-class-members
      #_brand_DbNull;
    };
    setClassName2(DbNullClass, "DbNull");
    var JsonNullClass = class extends NullTypesEnumValue {
      static {
        __name(this, "JsonNullClass");
      }
      // Phantom private property to prevent structural type equality
      // eslint-disable-next-line no-unused-private-class-members
      #_brand_JsonNull;
    };
    setClassName2(JsonNullClass, "JsonNull");
    var AnyNullClass = class extends NullTypesEnumValue {
      static {
        __name(this, "AnyNullClass");
      }
      // Phantom private property to prevent structural type equality
      // eslint-disable-next-line no-unused-private-class-members
      #_brand_AnyNull;
    };
    setClassName2(AnyNullClass, "AnyNull");
    var NullTypes2 = {
      DbNull: DbNullClass,
      JsonNull: JsonNullClass,
      AnyNull: AnyNullClass
    };
    var DbNull2 = new DbNullClass(secret);
    var JsonNull2 = new JsonNullClass(secret);
    var AnyNull2 = new AnyNullClass(secret);
    function isObjectEnumValue2(value) {
      return typeof value === "object" && value !== null && value[PRISMA_OBJECT_ENUM_VALUE] === true;
    }
    __name(isObjectEnumValue2, "isObjectEnumValue");
    function isDbNull2(value) {
      return value === DbNull2;
    }
    __name(isDbNull2, "isDbNull");
    function isJsonNull2(value) {
      return value === JsonNull2;
    }
    __name(isJsonNull2, "isJsonNull");
    function isAnyNull2(value) {
      return value === AnyNull2;
    }
    __name(isAnyNull2, "isAnyNull");
    var EXP_LIMIT = 9e15;
    var MAX_DIGITS = 1e9;
    var NUMERALS = "0123456789abcdef";
    var LN10 = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058";
    var PI = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789";
    var DEFAULTS = {
      // These values must be integers within the stated ranges (inclusive).
      // Most of these values can be changed at run-time using the `Decimal.config` method.
      // The maximum number of significant digits of the result of a calculation or base conversion.
      // E.g. `Decimal.config({ precision: 20 });`
      precision: 20,
      // 1 to MAX_DIGITS
      // The rounding mode used when rounding to `precision`.
      //
      // ROUND_UP         0 Away from zero.
      // ROUND_DOWN       1 Towards zero.
      // ROUND_CEIL       2 Towards +Infinity.
      // ROUND_FLOOR      3 Towards -Infinity.
      // ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
      // ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
      // ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
      // ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
      // ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
      //
      // E.g.
      // `Decimal.rounding = 4;`
      // `Decimal.rounding = Decimal.ROUND_HALF_UP;`
      rounding: 4,
      // 0 to 8
      // The modulo mode used when calculating the modulus: a mod n.
      // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
      // The remainder (r) is calculated as: r = a - n * q.
      //
      // UP         0 The remainder is positive if the dividend is negative, else is negative.
      // DOWN       1 The remainder has the same sign as the dividend (JavaScript %).
      // FLOOR      3 The remainder has the same sign as the divisor (Python %).
      // HALF_EVEN  6 The IEEE 754 remainder function.
      // EUCLID     9 Euclidian division. q = sign(n) * floor(a / abs(n)). Always positive.
      //
      // Truncated division (1), floored division (3), the IEEE 754 remainder (6), and Euclidian
      // division (9) are commonly used for the modulus operation. The other rounding modes can also
      // be used, but they may not give useful results.
      modulo: 1,
      // 0 to 9
      // The exponent value at and beneath which `toString` returns exponential notation.
      // JavaScript numbers: -7
      toExpNeg: -7,
      // 0 to -EXP_LIMIT
      // The exponent value at and above which `toString` returns exponential notation.
      // JavaScript numbers: 21
      toExpPos: 21,
      // 0 to EXP_LIMIT
      // The minimum exponent value, beneath which underflow to zero occurs.
      // JavaScript numbers: -324  (5e-324)
      minE: -EXP_LIMIT,
      // -1 to -EXP_LIMIT
      // The maximum exponent value, above which overflow to Infinity occurs.
      // JavaScript numbers: 308  (1.7976931348623157e+308)
      maxE: EXP_LIMIT,
      // 1 to EXP_LIMIT
      // Whether to use cryptographically-secure random number generation, if available.
      crypto: false
      // true/false
    };
    var inexact;
    var quadrant;
    var external = true;
    var decimalError = "[DecimalError] ";
    var invalidArgument = decimalError + "Invalid argument: ";
    var precisionLimitExceeded = decimalError + "Precision limit exceeded";
    var cryptoUnavailable = decimalError + "crypto unavailable";
    var tag = "[object Decimal]";
    var mathfloor = Math.floor;
    var mathpow = Math.pow;
    var isBinary = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i;
    var isHex = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i;
    var isOctal = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i;
    var isDecimal = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
    var BASE = 1e7;
    var LOG_BASE = 7;
    var MAX_SAFE_INTEGER = 9007199254740991;
    var LN10_PRECISION = LN10.length - 1;
    var PI_PRECISION = PI.length - 1;
    var P2 = { toStringTag: tag };
    P2.absoluteValue = P2.abs = function() {
      var x = new this.constructor(this);
      if (x.s < 0) x.s = 1;
      return finalise(x);
    };
    P2.ceil = function() {
      return finalise(new this.constructor(this), this.e + 1, 2);
    };
    P2.clampedTo = P2.clamp = function(min2, max2) {
      var k, x = this, Ctor = x.constructor;
      min2 = new Ctor(min2);
      max2 = new Ctor(max2);
      if (!min2.s || !max2.s) return new Ctor(NaN);
      if (min2.gt(max2)) throw Error(invalidArgument + max2);
      k = x.cmp(min2);
      return k < 0 ? min2 : x.cmp(max2) > 0 ? max2 : new Ctor(x);
    };
    P2.comparedTo = P2.cmp = function(y) {
      var i, j, xdL, ydL, x = this, xd = x.d, yd = (y = new x.constructor(y)).d, xs = x.s, ys = y.s;
      if (!xd || !yd) {
        return !xs || !ys ? NaN : xs !== ys ? xs : xd === yd ? 0 : !xd ^ xs < 0 ? 1 : -1;
      }
      if (!xd[0] || !yd[0]) return xd[0] ? xs : yd[0] ? -ys : 0;
      if (xs !== ys) return xs;
      if (x.e !== y.e) return x.e > y.e ^ xs < 0 ? 1 : -1;
      xdL = xd.length;
      ydL = yd.length;
      for (i = 0, j = xdL < ydL ? xdL : ydL; i < j; ++i) {
        if (xd[i] !== yd[i]) return xd[i] > yd[i] ^ xs < 0 ? 1 : -1;
      }
      return xdL === ydL ? 0 : xdL > ydL ^ xs < 0 ? 1 : -1;
    };
    P2.cosine = P2.cos = function() {
      var pr, rm, x = this, Ctor = x.constructor;
      if (!x.d) return new Ctor(NaN);
      if (!x.d[0]) return new Ctor(1);
      pr = Ctor.precision;
      rm = Ctor.rounding;
      Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
      Ctor.rounding = 1;
      x = cosine(Ctor, toLessThanHalfPi(Ctor, x));
      Ctor.precision = pr;
      Ctor.rounding = rm;
      return finalise(quadrant == 2 || quadrant == 3 ? x.neg() : x, pr, rm, true);
    };
    P2.cubeRoot = P2.cbrt = function() {
      var e, m, n, r, rep, s2, sd, t, t3, t3plusx, x = this, Ctor = x.constructor;
      if (!x.isFinite() || x.isZero()) return new Ctor(x);
      external = false;
      s2 = x.s * mathpow(x.s * x, 1 / 3);
      if (!s2 || Math.abs(s2) == 1 / 0) {
        n = digitsToString(x.d);
        e = x.e;
        if (s2 = (e - n.length + 1) % 3) n += s2 == 1 || s2 == -2 ? "0" : "00";
        s2 = mathpow(n, 1 / 3);
        e = mathfloor((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2));
        if (s2 == 1 / 0) {
          n = "5e" + e;
        } else {
          n = s2.toExponential();
          n = n.slice(0, n.indexOf("e") + 1) + e;
        }
        r = new Ctor(n);
        r.s = x.s;
      } else {
        r = new Ctor(s2.toString());
      }
      sd = (e = Ctor.precision) + 3;
      for (; ; ) {
        t = r;
        t3 = t.times(t).times(t);
        t3plusx = t3.plus(x);
        r = divide(t3plusx.plus(x).times(t), t3plusx.plus(t3), sd + 2, 1);
        if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
          n = n.slice(sd - 3, sd + 1);
          if (n == "9999" || !rep && n == "4999") {
            if (!rep) {
              finalise(t, e + 1, 0);
              if (t.times(t).times(t).eq(x)) {
                r = t;
                break;
              }
            }
            sd += 4;
            rep = 1;
          } else {
            if (!+n || !+n.slice(1) && n.charAt(0) == "5") {
              finalise(r, e + 1, 1);
              m = !r.times(r).times(r).eq(x);
            }
            break;
          }
        }
      }
      external = true;
      return finalise(r, e, Ctor.rounding, m);
    };
    P2.decimalPlaces = P2.dp = function() {
      var w, d = this.d, n = NaN;
      if (d) {
        w = d.length - 1;
        n = (w - mathfloor(this.e / LOG_BASE)) * LOG_BASE;
        w = d[w];
        if (w) for (; w % 10 == 0; w /= 10) n--;
        if (n < 0) n = 0;
      }
      return n;
    };
    P2.dividedBy = P2.div = function(y) {
      return divide(this, new this.constructor(y));
    };
    P2.dividedToIntegerBy = P2.divToInt = function(y) {
      var x = this, Ctor = x.constructor;
      return finalise(divide(x, new Ctor(y), 0, 1, 1), Ctor.precision, Ctor.rounding);
    };
    P2.equals = P2.eq = function(y) {
      return this.cmp(y) === 0;
    };
    P2.floor = function() {
      return finalise(new this.constructor(this), this.e + 1, 3);
    };
    P2.greaterThan = P2.gt = function(y) {
      return this.cmp(y) > 0;
    };
    P2.greaterThanOrEqualTo = P2.gte = function(y) {
      var k = this.cmp(y);
      return k == 1 || k === 0;
    };
    P2.hyperbolicCosine = P2.cosh = function() {
      var k, n, pr, rm, len, x = this, Ctor = x.constructor, one = new Ctor(1);
      if (!x.isFinite()) return new Ctor(x.s ? 1 / 0 : NaN);
      if (x.isZero()) return one;
      pr = Ctor.precision;
      rm = Ctor.rounding;
      Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
      Ctor.rounding = 1;
      len = x.d.length;
      if (len < 32) {
        k = Math.ceil(len / 3);
        n = (1 / tinyPow(4, k)).toString();
      } else {
        k = 16;
        n = "2.3283064365386962890625e-10";
      }
      x = taylorSeries(Ctor, 1, x.times(n), new Ctor(1), true);
      var cosh2_x, i = k, d8 = new Ctor(8);
      for (; i--; ) {
        cosh2_x = x.times(x);
        x = one.minus(cosh2_x.times(d8.minus(cosh2_x.times(d8))));
      }
      return finalise(x, Ctor.precision = pr, Ctor.rounding = rm, true);
    };
    P2.hyperbolicSine = P2.sinh = function() {
      var k, pr, rm, len, x = this, Ctor = x.constructor;
      if (!x.isFinite() || x.isZero()) return new Ctor(x);
      pr = Ctor.precision;
      rm = Ctor.rounding;
      Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
      Ctor.rounding = 1;
      len = x.d.length;
      if (len < 3) {
        x = taylorSeries(Ctor, 2, x, x, true);
      } else {
        k = 1.4 * Math.sqrt(len);
        k = k > 16 ? 16 : k | 0;
        x = x.times(1 / tinyPow(5, k));
        x = taylorSeries(Ctor, 2, x, x, true);
        var sinh2_x, d5 = new Ctor(5), d16 = new Ctor(16), d20 = new Ctor(20);
        for (; k--; ) {
          sinh2_x = x.times(x);
          x = x.times(d5.plus(sinh2_x.times(d16.times(sinh2_x).plus(d20))));
        }
      }
      Ctor.precision = pr;
      Ctor.rounding = rm;
      return finalise(x, pr, rm, true);
    };
    P2.hyperbolicTangent = P2.tanh = function() {
      var pr, rm, x = this, Ctor = x.constructor;
      if (!x.isFinite()) return new Ctor(x.s);
      if (x.isZero()) return new Ctor(x);
      pr = Ctor.precision;
      rm = Ctor.rounding;
      Ctor.precision = pr + 7;
      Ctor.rounding = 1;
      return divide(x.sinh(), x.cosh(), Ctor.precision = pr, Ctor.rounding = rm);
    };
    P2.inverseCosine = P2.acos = function() {
      var x = this, Ctor = x.constructor, k = x.abs().cmp(1), pr = Ctor.precision, rm = Ctor.rounding;
      if (k !== -1) {
        return k === 0 ? x.isNeg() ? getPi(Ctor, pr, rm) : new Ctor(0) : new Ctor(NaN);
      }
      if (x.isZero()) return getPi(Ctor, pr + 4, rm).times(0.5);
      Ctor.precision = pr + 6;
      Ctor.rounding = 1;
      x = new Ctor(1).minus(x).div(x.plus(1)).sqrt().atan();
      Ctor.precision = pr;
      Ctor.rounding = rm;
      return x.times(2);
    };
    P2.inverseHyperbolicCosine = P2.acosh = function() {
      var pr, rm, x = this, Ctor = x.constructor;
      if (x.lte(1)) return new Ctor(x.eq(1) ? 0 : NaN);
      if (!x.isFinite()) return new Ctor(x);
      pr = Ctor.precision;
      rm = Ctor.rounding;
      Ctor.precision = pr + Math.max(Math.abs(x.e), x.sd()) + 4;
      Ctor.rounding = 1;
      external = false;
      x = x.times(x).minus(1).sqrt().plus(x);
      external = true;
      Ctor.precision = pr;
      Ctor.rounding = rm;
      return x.ln();
    };
    P2.inverseHyperbolicSine = P2.asinh = function() {
      var pr, rm, x = this, Ctor = x.constructor;
      if (!x.isFinite() || x.isZero()) return new Ctor(x);
      pr = Ctor.precision;
      rm = Ctor.rounding;
      Ctor.precision = pr + 2 * Math.max(Math.abs(x.e), x.sd()) + 6;
      Ctor.rounding = 1;
      external = false;
      x = x.times(x).plus(1).sqrt().plus(x);
      external = true;
      Ctor.precision = pr;
      Ctor.rounding = rm;
      return x.ln();
    };
    P2.inverseHyperbolicTangent = P2.atanh = function() {
      var pr, rm, wpr, xsd, x = this, Ctor = x.constructor;
      if (!x.isFinite()) return new Ctor(NaN);
      if (x.e >= 0) return new Ctor(x.abs().eq(1) ? x.s / 0 : x.isZero() ? x : NaN);
      pr = Ctor.precision;
      rm = Ctor.rounding;
      xsd = x.sd();
      if (Math.max(xsd, pr) < 2 * -x.e - 1) return finalise(new Ctor(x), pr, rm, true);
      Ctor.precision = wpr = xsd - x.e;
      x = divide(x.plus(1), new Ctor(1).minus(x), wpr + pr, 1);
      Ctor.precision = pr + 4;
      Ctor.rounding = 1;
      x = x.ln();
      Ctor.precision = pr;
      Ctor.rounding = rm;
      return x.times(0.5);
    };
    P2.inverseSine = P2.asin = function() {
      var halfPi, k, pr, rm, x = this, Ctor = x.constructor;
      if (x.isZero()) return new Ctor(x);
      k = x.abs().cmp(1);
      pr = Ctor.precision;
      rm = Ctor.rounding;
      if (k !== -1) {
        if (k === 0) {
          halfPi = getPi(Ctor, pr + 4, rm).times(0.5);
          halfPi.s = x.s;
          return halfPi;
        }
        return new Ctor(NaN);
      }
      Ctor.precision = pr + 6;
      Ctor.rounding = 1;
      x = x.div(new Ctor(1).minus(x.times(x)).sqrt().plus(1)).atan();
      Ctor.precision = pr;
      Ctor.rounding = rm;
      return x.times(2);
    };
    P2.inverseTangent = P2.atan = function() {
      var i, j, k, n, px, t, r, wpr, x2, x = this, Ctor = x.constructor, pr = Ctor.precision, rm = Ctor.rounding;
      if (!x.isFinite()) {
        if (!x.s) return new Ctor(NaN);
        if (pr + 4 <= PI_PRECISION) {
          r = getPi(Ctor, pr + 4, rm).times(0.5);
          r.s = x.s;
          return r;
        }
      } else if (x.isZero()) {
        return new Ctor(x);
      } else if (x.abs().eq(1) && pr + 4 <= PI_PRECISION) {
        r = getPi(Ctor, pr + 4, rm).times(0.25);
        r.s = x.s;
        return r;
      }
      Ctor.precision = wpr = pr + 10;
      Ctor.rounding = 1;
      k = Math.min(28, wpr / LOG_BASE + 2 | 0);
      for (i = k; i; --i) x = x.div(x.times(x).plus(1).sqrt().plus(1));
      external = false;
      j = Math.ceil(wpr / LOG_BASE);
      n = 1;
      x2 = x.times(x);
      r = new Ctor(x);
      px = x;
      for (; i !== -1; ) {
        px = px.times(x2);
        t = r.minus(px.div(n += 2));
        px = px.times(x2);
        r = t.plus(px.div(n += 2));
        if (r.d[j] !== void 0) for (i = j; r.d[i] === t.d[i] && i--; ) ;
      }
      if (k) r = r.times(2 << k - 1);
      external = true;
      return finalise(r, Ctor.precision = pr, Ctor.rounding = rm, true);
    };
    P2.isFinite = function() {
      return !!this.d;
    };
    P2.isInteger = P2.isInt = function() {
      return !!this.d && mathfloor(this.e / LOG_BASE) > this.d.length - 2;
    };
    P2.isNaN = function() {
      return !this.s;
    };
    P2.isNegative = P2.isNeg = function() {
      return this.s < 0;
    };
    P2.isPositive = P2.isPos = function() {
      return this.s > 0;
    };
    P2.isZero = function() {
      return !!this.d && this.d[0] === 0;
    };
    P2.lessThan = P2.lt = function(y) {
      return this.cmp(y) < 0;
    };
    P2.lessThanOrEqualTo = P2.lte = function(y) {
      return this.cmp(y) < 1;
    };
    P2.logarithm = P2.log = function(base) {
      var isBase10, d, denominator, k, inf, num, sd, r, arg = this, Ctor = arg.constructor, pr = Ctor.precision, rm = Ctor.rounding, guard = 5;
      if (base == null) {
        base = new Ctor(10);
        isBase10 = true;
      } else {
        base = new Ctor(base);
        d = base.d;
        if (base.s < 0 || !d || !d[0] || base.eq(1)) return new Ctor(NaN);
        isBase10 = base.eq(10);
      }
      d = arg.d;
      if (arg.s < 0 || !d || !d[0] || arg.eq(1)) {
        return new Ctor(d && !d[0] ? -1 / 0 : arg.s != 1 ? NaN : d ? 0 : 1 / 0);
      }
      if (isBase10) {
        if (d.length > 1) {
          inf = true;
        } else {
          for (k = d[0]; k % 10 === 0; ) k /= 10;
          inf = k !== 1;
        }
      }
      external = false;
      sd = pr + guard;
      num = naturalLogarithm(arg, sd);
      denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);
      r = divide(num, denominator, sd, 1);
      if (checkRoundingDigits(r.d, k = pr, rm)) {
        do {
          sd += 10;
          num = naturalLogarithm(arg, sd);
          denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);
          r = divide(num, denominator, sd, 1);
          if (!inf) {
            if (+digitsToString(r.d).slice(k + 1, k + 15) + 1 == 1e14) {
              r = finalise(r, pr + 1, 0);
            }
            break;
          }
        } while (checkRoundingDigits(r.d, k += 10, rm));
      }
      external = true;
      return finalise(r, pr, rm);
    };
    P2.minus = P2.sub = function(y) {
      var d, e, i, j, k, len, pr, rm, xd, xe, xLTy, yd, x = this, Ctor = x.constructor;
      y = new Ctor(y);
      if (!x.d || !y.d) {
        if (!x.s || !y.s) y = new Ctor(NaN);
        else if (x.d) y.s = -y.s;
        else y = new Ctor(y.d || x.s !== y.s ? x : NaN);
        return y;
      }
      if (x.s != y.s) {
        y.s = -y.s;
        return x.plus(y);
      }
      xd = x.d;
      yd = y.d;
      pr = Ctor.precision;
      rm = Ctor.rounding;
      if (!xd[0] || !yd[0]) {
        if (yd[0]) y.s = -y.s;
        else if (xd[0]) y = new Ctor(x);
        else return new Ctor(rm === 3 ? -0 : 0);
        return external ? finalise(y, pr, rm) : y;
      }
      e = mathfloor(y.e / LOG_BASE);
      xe = mathfloor(x.e / LOG_BASE);
      xd = xd.slice();
      k = xe - e;
      if (k) {
        xLTy = k < 0;
        if (xLTy) {
          d = xd;
          k = -k;
          len = yd.length;
        } else {
          d = yd;
          e = xe;
          len = xd.length;
        }
        i = Math.max(Math.ceil(pr / LOG_BASE), len) + 2;
        if (k > i) {
          k = i;
          d.length = 1;
        }
        d.reverse();
        for (i = k; i--; ) d.push(0);
        d.reverse();
      } else {
        i = xd.length;
        len = yd.length;
        xLTy = i < len;
        if (xLTy) len = i;
        for (i = 0; i < len; i++) {
          if (xd[i] != yd[i]) {
            xLTy = xd[i] < yd[i];
            break;
          }
        }
        k = 0;
      }
      if (xLTy) {
        d = xd;
        xd = yd;
        yd = d;
        y.s = -y.s;
      }
      len = xd.length;
      for (i = yd.length - len; i > 0; --i) xd[len++] = 0;
      for (i = yd.length; i > k; ) {
        if (xd[--i] < yd[i]) {
          for (j = i; j && xd[--j] === 0; ) xd[j] = BASE - 1;
          --xd[j];
          xd[i] += BASE;
        }
        xd[i] -= yd[i];
      }
      for (; xd[--len] === 0; ) xd.pop();
      for (; xd[0] === 0; xd.shift()) --e;
      if (!xd[0]) return new Ctor(rm === 3 ? -0 : 0);
      y.d = xd;
      y.e = getBase10Exponent(xd, e);
      return external ? finalise(y, pr, rm) : y;
    };
    P2.modulo = P2.mod = function(y) {
      var q, x = this, Ctor = x.constructor;
      y = new Ctor(y);
      if (!x.d || !y.s || y.d && !y.d[0]) return new Ctor(NaN);
      if (!y.d || x.d && !x.d[0]) {
        return finalise(new Ctor(x), Ctor.precision, Ctor.rounding);
      }
      external = false;
      if (Ctor.modulo == 9) {
        q = divide(x, y.abs(), 0, 3, 1);
        q.s *= y.s;
      } else {
        q = divide(x, y, 0, Ctor.modulo, 1);
      }
      q = q.times(y);
      external = true;
      return x.minus(q);
    };
    P2.naturalExponential = P2.exp = function() {
      return naturalExponential(this);
    };
    P2.naturalLogarithm = P2.ln = function() {
      return naturalLogarithm(this);
    };
    P2.negated = P2.neg = function() {
      var x = new this.constructor(this);
      x.s = -x.s;
      return finalise(x);
    };
    P2.plus = P2.add = function(y) {
      var carry, d, e, i, k, len, pr, rm, xd, yd, x = this, Ctor = x.constructor;
      y = new Ctor(y);
      if (!x.d || !y.d) {
        if (!x.s || !y.s) y = new Ctor(NaN);
        else if (!x.d) y = new Ctor(y.d || x.s === y.s ? x : NaN);
        return y;
      }
      if (x.s != y.s) {
        y.s = -y.s;
        return x.minus(y);
      }
      xd = x.d;
      yd = y.d;
      pr = Ctor.precision;
      rm = Ctor.rounding;
      if (!xd[0] || !yd[0]) {
        if (!yd[0]) y = new Ctor(x);
        return external ? finalise(y, pr, rm) : y;
      }
      k = mathfloor(x.e / LOG_BASE);
      e = mathfloor(y.e / LOG_BASE);
      xd = xd.slice();
      i = k - e;
      if (i) {
        if (i < 0) {
          d = xd;
          i = -i;
          len = yd.length;
        } else {
          d = yd;
          e = k;
          len = xd.length;
        }
        k = Math.ceil(pr / LOG_BASE);
        len = k > len ? k + 1 : len + 1;
        if (i > len) {
          i = len;
          d.length = 1;
        }
        d.reverse();
        for (; i--; ) d.push(0);
        d.reverse();
      }
      len = xd.length;
      i = yd.length;
      if (len - i < 0) {
        i = len;
        d = yd;
        yd = xd;
        xd = d;
      }
      for (carry = 0; i; ) {
        carry = (xd[--i] = xd[i] + yd[i] + carry) / BASE | 0;
        xd[i] %= BASE;
      }
      if (carry) {
        xd.unshift(carry);
        ++e;
      }
      for (len = xd.length; xd[--len] == 0; ) xd.pop();
      y.d = xd;
      y.e = getBase10Exponent(xd, e);
      return external ? finalise(y, pr, rm) : y;
    };
    P2.precision = P2.sd = function(z) {
      var k, x = this;
      if (z !== void 0 && z !== !!z && z !== 1 && z !== 0) throw Error(invalidArgument + z);
      if (x.d) {
        k = getPrecision(x.d);
        if (z && x.e + 1 > k) k = x.e + 1;
      } else {
        k = NaN;
      }
      return k;
    };
    P2.round = function() {
      var x = this, Ctor = x.constructor;
      return finalise(new Ctor(x), x.e + 1, Ctor.rounding);
    };
    P2.sine = P2.sin = function() {
      var pr, rm, x = this, Ctor = x.constructor;
      if (!x.isFinite()) return new Ctor(NaN);
      if (x.isZero()) return new Ctor(x);
      pr = Ctor.precision;
      rm = Ctor.rounding;
      Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
      Ctor.rounding = 1;
      x = sine(Ctor, toLessThanHalfPi(Ctor, x));
      Ctor.precision = pr;
      Ctor.rounding = rm;
      return finalise(quadrant > 2 ? x.neg() : x, pr, rm, true);
    };
    P2.squareRoot = P2.sqrt = function() {
      var m, n, sd, r, rep, t, x = this, d = x.d, e = x.e, s2 = x.s, Ctor = x.constructor;
      if (s2 !== 1 || !d || !d[0]) {
        return new Ctor(!s2 || s2 < 0 && (!d || d[0]) ? NaN : d ? x : 1 / 0);
      }
      external = false;
      s2 = Math.sqrt(+x);
      if (s2 == 0 || s2 == 1 / 0) {
        n = digitsToString(d);
        if ((n.length + e) % 2 == 0) n += "0";
        s2 = Math.sqrt(n);
        e = mathfloor((e + 1) / 2) - (e < 0 || e % 2);
        if (s2 == 1 / 0) {
          n = "5e" + e;
        } else {
          n = s2.toExponential();
          n = n.slice(0, n.indexOf("e") + 1) + e;
        }
        r = new Ctor(n);
      } else {
        r = new Ctor(s2.toString());
      }
      sd = (e = Ctor.precision) + 3;
      for (; ; ) {
        t = r;
        r = t.plus(divide(x, t, sd + 2, 1)).times(0.5);
        if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
          n = n.slice(sd - 3, sd + 1);
          if (n == "9999" || !rep && n == "4999") {
            if (!rep) {
              finalise(t, e + 1, 0);
              if (t.times(t).eq(x)) {
                r = t;
                break;
              }
            }
            sd += 4;
            rep = 1;
          } else {
            if (!+n || !+n.slice(1) && n.charAt(0) == "5") {
              finalise(r, e + 1, 1);
              m = !r.times(r).eq(x);
            }
            break;
          }
        }
      }
      external = true;
      return finalise(r, e, Ctor.rounding, m);
    };
    P2.tangent = P2.tan = function() {
      var pr, rm, x = this, Ctor = x.constructor;
      if (!x.isFinite()) return new Ctor(NaN);
      if (x.isZero()) return new Ctor(x);
      pr = Ctor.precision;
      rm = Ctor.rounding;
      Ctor.precision = pr + 10;
      Ctor.rounding = 1;
      x = x.sin();
      x.s = 1;
      x = divide(x, new Ctor(1).minus(x.times(x)).sqrt(), pr + 10, 0);
      Ctor.precision = pr;
      Ctor.rounding = rm;
      return finalise(quadrant == 2 || quadrant == 4 ? x.neg() : x, pr, rm, true);
    };
    P2.times = P2.mul = function(y) {
      var carry, e, i, k, r, rL, t, xdL, ydL, x = this, Ctor = x.constructor, xd = x.d, yd = (y = new Ctor(y)).d;
      y.s *= x.s;
      if (!xd || !xd[0] || !yd || !yd[0]) {
        return new Ctor(!y.s || xd && !xd[0] && !yd || yd && !yd[0] && !xd ? NaN : !xd || !yd ? y.s / 0 : y.s * 0);
      }
      e = mathfloor(x.e / LOG_BASE) + mathfloor(y.e / LOG_BASE);
      xdL = xd.length;
      ydL = yd.length;
      if (xdL < ydL) {
        r = xd;
        xd = yd;
        yd = r;
        rL = xdL;
        xdL = ydL;
        ydL = rL;
      }
      r = [];
      rL = xdL + ydL;
      for (i = rL; i--; ) r.push(0);
      for (i = ydL; --i >= 0; ) {
        carry = 0;
        for (k = xdL + i; k > i; ) {
          t = r[k] + yd[i] * xd[k - i - 1] + carry;
          r[k--] = t % BASE | 0;
          carry = t / BASE | 0;
        }
        r[k] = (r[k] + carry) % BASE | 0;
      }
      for (; !r[--rL]; ) r.pop();
      if (carry) ++e;
      else r.shift();
      y.d = r;
      y.e = getBase10Exponent(r, e);
      return external ? finalise(y, Ctor.precision, Ctor.rounding) : y;
    };
    P2.toBinary = function(sd, rm) {
      return toStringBinary(this, 2, sd, rm);
    };
    P2.toDecimalPlaces = P2.toDP = function(dp, rm) {
      var x = this, Ctor = x.constructor;
      x = new Ctor(x);
      if (dp === void 0) return x;
      checkInt32(dp, 0, MAX_DIGITS);
      if (rm === void 0) rm = Ctor.rounding;
      else checkInt32(rm, 0, 8);
      return finalise(x, dp + x.e + 1, rm);
    };
    P2.toExponential = function(dp, rm) {
      var str, x = this, Ctor = x.constructor;
      if (dp === void 0) {
        str = finiteToString(x, true);
      } else {
        checkInt32(dp, 0, MAX_DIGITS);
        if (rm === void 0) rm = Ctor.rounding;
        else checkInt32(rm, 0, 8);
        x = finalise(new Ctor(x), dp + 1, rm);
        str = finiteToString(x, true, dp + 1);
      }
      return x.isNeg() && !x.isZero() ? "-" + str : str;
    };
    P2.toFixed = function(dp, rm) {
      var str, y, x = this, Ctor = x.constructor;
      if (dp === void 0) {
        str = finiteToString(x);
      } else {
        checkInt32(dp, 0, MAX_DIGITS);
        if (rm === void 0) rm = Ctor.rounding;
        else checkInt32(rm, 0, 8);
        y = finalise(new Ctor(x), dp + x.e + 1, rm);
        str = finiteToString(y, false, dp + y.e + 1);
      }
      return x.isNeg() && !x.isZero() ? "-" + str : str;
    };
    P2.toFraction = function(maxD) {
      var d, d0, d1, d2, e, k, n, n0, n1, pr, q, r, x = this, xd = x.d, Ctor = x.constructor;
      if (!xd) return new Ctor(x);
      n1 = d0 = new Ctor(1);
      d1 = n0 = new Ctor(0);
      d = new Ctor(d1);
      e = d.e = getPrecision(xd) - x.e - 1;
      k = e % LOG_BASE;
      d.d[0] = mathpow(10, k < 0 ? LOG_BASE + k : k);
      if (maxD == null) {
        maxD = e > 0 ? d : n1;
      } else {
        n = new Ctor(maxD);
        if (!n.isInt() || n.lt(n1)) throw Error(invalidArgument + n);
        maxD = n.gt(d) ? e > 0 ? d : n1 : n;
      }
      external = false;
      n = new Ctor(digitsToString(xd));
      pr = Ctor.precision;
      Ctor.precision = e = xd.length * LOG_BASE * 2;
      for (; ; ) {
        q = divide(n, d, 0, 1, 1);
        d2 = d0.plus(q.times(d1));
        if (d2.cmp(maxD) == 1) break;
        d0 = d1;
        d1 = d2;
        d2 = n1;
        n1 = n0.plus(q.times(d2));
        n0 = d2;
        d2 = d;
        d = n.minus(q.times(d2));
        n = d2;
      }
      d2 = divide(maxD.minus(d0), d1, 0, 1, 1);
      n0 = n0.plus(d2.times(n1));
      d0 = d0.plus(d2.times(d1));
      n0.s = n1.s = x.s;
      r = divide(n1, d1, e, 1).minus(x).abs().cmp(divide(n0, d0, e, 1).minus(x).abs()) < 1 ? [n1, d1] : [n0, d0];
      Ctor.precision = pr;
      external = true;
      return r;
    };
    P2.toHexadecimal = P2.toHex = function(sd, rm) {
      return toStringBinary(this, 16, sd, rm);
    };
    P2.toNearest = function(y, rm) {
      var x = this, Ctor = x.constructor;
      x = new Ctor(x);
      if (y == null) {
        if (!x.d) return x;
        y = new Ctor(1);
        rm = Ctor.rounding;
      } else {
        y = new Ctor(y);
        if (rm === void 0) {
          rm = Ctor.rounding;
        } else {
          checkInt32(rm, 0, 8);
        }
        if (!x.d) return y.s ? x : y;
        if (!y.d) {
          if (y.s) y.s = x.s;
          return y;
        }
      }
      if (y.d[0]) {
        external = false;
        x = divide(x, y, 0, rm, 1).times(y);
        external = true;
        finalise(x);
      } else {
        y.s = x.s;
        x = y;
      }
      return x;
    };
    P2.toNumber = function() {
      return +this;
    };
    P2.toOctal = function(sd, rm) {
      return toStringBinary(this, 8, sd, rm);
    };
    P2.toPower = P2.pow = function(y) {
      var e, k, pr, r, rm, s2, x = this, Ctor = x.constructor, yn = +(y = new Ctor(y));
      if (!x.d || !y.d || !x.d[0] || !y.d[0]) return new Ctor(mathpow(+x, yn));
      x = new Ctor(x);
      if (x.eq(1)) return x;
      pr = Ctor.precision;
      rm = Ctor.rounding;
      if (y.eq(1)) return finalise(x, pr, rm);
      e = mathfloor(y.e / LOG_BASE);
      if (e >= y.d.length - 1 && (k = yn < 0 ? -yn : yn) <= MAX_SAFE_INTEGER) {
        r = intPow(Ctor, x, k, pr);
        return y.s < 0 ? new Ctor(1).div(r) : finalise(r, pr, rm);
      }
      s2 = x.s;
      if (s2 < 0) {
        if (e < y.d.length - 1) return new Ctor(NaN);
        if ((y.d[e] & 1) == 0) s2 = 1;
        if (x.e == 0 && x.d[0] == 1 && x.d.length == 1) {
          x.s = s2;
          return x;
        }
      }
      k = mathpow(+x, yn);
      e = k == 0 || !isFinite(k) ? mathfloor(yn * (Math.log("0." + digitsToString(x.d)) / Math.LN10 + x.e + 1)) : new Ctor(k + "").e;
      if (e > Ctor.maxE + 1 || e < Ctor.minE - 1) return new Ctor(e > 0 ? s2 / 0 : 0);
      external = false;
      Ctor.rounding = x.s = 1;
      k = Math.min(12, (e + "").length);
      r = naturalExponential(y.times(naturalLogarithm(x, pr + k)), pr);
      if (r.d) {
        r = finalise(r, pr + 5, 1);
        if (checkRoundingDigits(r.d, pr, rm)) {
          e = pr + 10;
          r = finalise(naturalExponential(y.times(naturalLogarithm(x, e + k)), e), e + 5, 1);
          if (+digitsToString(r.d).slice(pr + 1, pr + 15) + 1 == 1e14) {
            r = finalise(r, pr + 1, 0);
          }
        }
      }
      r.s = s2;
      external = true;
      Ctor.rounding = rm;
      return finalise(r, pr, rm);
    };
    P2.toPrecision = function(sd, rm) {
      var str, x = this, Ctor = x.constructor;
      if (sd === void 0) {
        str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
      } else {
        checkInt32(sd, 1, MAX_DIGITS);
        if (rm === void 0) rm = Ctor.rounding;
        else checkInt32(rm, 0, 8);
        x = finalise(new Ctor(x), sd, rm);
        str = finiteToString(x, sd <= x.e || x.e <= Ctor.toExpNeg, sd);
      }
      return x.isNeg() && !x.isZero() ? "-" + str : str;
    };
    P2.toSignificantDigits = P2.toSD = function(sd, rm) {
      var x = this, Ctor = x.constructor;
      if (sd === void 0) {
        sd = Ctor.precision;
        rm = Ctor.rounding;
      } else {
        checkInt32(sd, 1, MAX_DIGITS);
        if (rm === void 0) rm = Ctor.rounding;
        else checkInt32(rm, 0, 8);
      }
      return finalise(new Ctor(x), sd, rm);
    };
    P2.toString = function() {
      var x = this, Ctor = x.constructor, str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
      return x.isNeg() && !x.isZero() ? "-" + str : str;
    };
    P2.truncated = P2.trunc = function() {
      return finalise(new this.constructor(this), this.e + 1, 1);
    };
    P2.valueOf = P2.toJSON = function() {
      var x = this, Ctor = x.constructor, str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
      return x.isNeg() ? "-" + str : str;
    };
    function digitsToString(d) {
      var i, k, ws, indexOfLastWord = d.length - 1, str = "", w = d[0];
      if (indexOfLastWord > 0) {
        str += w;
        for (i = 1; i < indexOfLastWord; i++) {
          ws = d[i] + "";
          k = LOG_BASE - ws.length;
          if (k) str += getZeroString(k);
          str += ws;
        }
        w = d[i];
        ws = w + "";
        k = LOG_BASE - ws.length;
        if (k) str += getZeroString(k);
      } else if (w === 0) {
        return "0";
      }
      for (; w % 10 === 0; ) w /= 10;
      return str + w;
    }
    __name(digitsToString, "digitsToString");
    function checkInt32(i, min2, max2) {
      if (i !== ~~i || i < min2 || i > max2) {
        throw Error(invalidArgument + i);
      }
    }
    __name(checkInt32, "checkInt32");
    function checkRoundingDigits(d, i, rm, repeating) {
      var di, k, r, rd;
      for (k = d[0]; k >= 10; k /= 10) --i;
      if (--i < 0) {
        i += LOG_BASE;
        di = 0;
      } else {
        di = Math.ceil((i + 1) / LOG_BASE);
        i %= LOG_BASE;
      }
      k = mathpow(10, LOG_BASE - i);
      rd = d[di] % k | 0;
      if (repeating == null) {
        if (i < 3) {
          if (i == 0) rd = rd / 100 | 0;
          else if (i == 1) rd = rd / 10 | 0;
          r = rm < 4 && rd == 99999 || rm > 3 && rd == 49999 || rd == 5e4 || rd == 0;
        } else {
          r = (rm < 4 && rd + 1 == k || rm > 3 && rd + 1 == k / 2) && (d[di + 1] / k / 100 | 0) == mathpow(10, i - 2) - 1 || (rd == k / 2 || rd == 0) && (d[di + 1] / k / 100 | 0) == 0;
        }
      } else {
        if (i < 4) {
          if (i == 0) rd = rd / 1e3 | 0;
          else if (i == 1) rd = rd / 100 | 0;
          else if (i == 2) rd = rd / 10 | 0;
          r = (repeating || rm < 4) && rd == 9999 || !repeating && rm > 3 && rd == 4999;
        } else {
          r = ((repeating || rm < 4) && rd + 1 == k || !repeating && rm > 3 && rd + 1 == k / 2) && (d[di + 1] / k / 1e3 | 0) == mathpow(10, i - 3) - 1;
        }
      }
      return r;
    }
    __name(checkRoundingDigits, "checkRoundingDigits");
    function convertBase(str, baseIn, baseOut) {
      var j, arr = [0], arrL, i = 0, strL = str.length;
      for (; i < strL; ) {
        for (arrL = arr.length; arrL--; ) arr[arrL] *= baseIn;
        arr[0] += NUMERALS.indexOf(str.charAt(i++));
        for (j = 0; j < arr.length; j++) {
          if (arr[j] > baseOut - 1) {
            if (arr[j + 1] === void 0) arr[j + 1] = 0;
            arr[j + 1] += arr[j] / baseOut | 0;
            arr[j] %= baseOut;
          }
        }
      }
      return arr.reverse();
    }
    __name(convertBase, "convertBase");
    function cosine(Ctor, x) {
      var k, len, y;
      if (x.isZero()) return x;
      len = x.d.length;
      if (len < 32) {
        k = Math.ceil(len / 3);
        y = (1 / tinyPow(4, k)).toString();
      } else {
        k = 16;
        y = "2.3283064365386962890625e-10";
      }
      Ctor.precision += k;
      x = taylorSeries(Ctor, 1, x.times(y), new Ctor(1));
      for (var i = k; i--; ) {
        var cos2x = x.times(x);
        x = cos2x.times(cos2x).minus(cos2x).times(8).plus(1);
      }
      Ctor.precision -= k;
      return x;
    }
    __name(cosine, "cosine");
    var divide = /* @__PURE__ */ (function() {
      function multiplyInteger(x, k, base) {
        var temp, carry = 0, i = x.length;
        for (x = x.slice(); i--; ) {
          temp = x[i] * k + carry;
          x[i] = temp % base | 0;
          carry = temp / base | 0;
        }
        if (carry) x.unshift(carry);
        return x;
      }
      __name(multiplyInteger, "multiplyInteger");
      function compare(a, b, aL, bL) {
        var i, r;
        if (aL != bL) {
          r = aL > bL ? 1 : -1;
        } else {
          for (i = r = 0; i < aL; i++) {
            if (a[i] != b[i]) {
              r = a[i] > b[i] ? 1 : -1;
              break;
            }
          }
        }
        return r;
      }
      __name(compare, "compare");
      function subtract(a, b, aL, base) {
        var i = 0;
        for (; aL--; ) {
          a[aL] -= i;
          i = a[aL] < b[aL] ? 1 : 0;
          a[aL] = i * base + a[aL] - b[aL];
        }
        for (; !a[0] && a.length > 1; ) a.shift();
      }
      __name(subtract, "subtract");
      return function(x, y, pr, rm, dp, base) {
        var cmp, e, i, k, logBase, more, prod, prodL, q, qd, rem, remL, rem0, sd, t, xi, xL, yd0, yL, yz, Ctor = x.constructor, sign2 = x.s == y.s ? 1 : -1, xd = x.d, yd = y.d;
        if (!xd || !xd[0] || !yd || !yd[0]) {
          return new Ctor(
            // Return NaN if either NaN, or both Infinity or 0.
            !x.s || !y.s || (xd ? yd && xd[0] == yd[0] : !yd) ? NaN : (
              // Return ±0 if x is 0 or y is ±Infinity, or return ±Infinity as y is 0.
              xd && xd[0] == 0 || !yd ? sign2 * 0 : sign2 / 0
            )
          );
        }
        if (base) {
          logBase = 1;
          e = x.e - y.e;
        } else {
          base = BASE;
          logBase = LOG_BASE;
          e = mathfloor(x.e / logBase) - mathfloor(y.e / logBase);
        }
        yL = yd.length;
        xL = xd.length;
        q = new Ctor(sign2);
        qd = q.d = [];
        for (i = 0; yd[i] == (xd[i] || 0); i++) ;
        if (yd[i] > (xd[i] || 0)) e--;
        if (pr == null) {
          sd = pr = Ctor.precision;
          rm = Ctor.rounding;
        } else if (dp) {
          sd = pr + (x.e - y.e) + 1;
        } else {
          sd = pr;
        }
        if (sd < 0) {
          qd.push(1);
          more = true;
        } else {
          sd = sd / logBase + 2 | 0;
          i = 0;
          if (yL == 1) {
            k = 0;
            yd = yd[0];
            sd++;
            for (; (i < xL || k) && sd--; i++) {
              t = k * base + (xd[i] || 0);
              qd[i] = t / yd | 0;
              k = t % yd | 0;
            }
            more = k || i < xL;
          } else {
            k = base / (yd[0] + 1) | 0;
            if (k > 1) {
              yd = multiplyInteger(yd, k, base);
              xd = multiplyInteger(xd, k, base);
              yL = yd.length;
              xL = xd.length;
            }
            xi = yL;
            rem = xd.slice(0, yL);
            remL = rem.length;
            for (; remL < yL; ) rem[remL++] = 0;
            yz = yd.slice();
            yz.unshift(0);
            yd0 = yd[0];
            if (yd[1] >= base / 2) ++yd0;
            do {
              k = 0;
              cmp = compare(yd, rem, yL, remL);
              if (cmp < 0) {
                rem0 = rem[0];
                if (yL != remL) rem0 = rem0 * base + (rem[1] || 0);
                k = rem0 / yd0 | 0;
                if (k > 1) {
                  if (k >= base) k = base - 1;
                  prod = multiplyInteger(yd, k, base);
                  prodL = prod.length;
                  remL = rem.length;
                  cmp = compare(prod, rem, prodL, remL);
                  if (cmp == 1) {
                    k--;
                    subtract(prod, yL < prodL ? yz : yd, prodL, base);
                  }
                } else {
                  if (k == 0) cmp = k = 1;
                  prod = yd.slice();
                }
                prodL = prod.length;
                if (prodL < remL) prod.unshift(0);
                subtract(rem, prod, remL, base);
                if (cmp == -1) {
                  remL = rem.length;
                  cmp = compare(yd, rem, yL, remL);
                  if (cmp < 1) {
                    k++;
                    subtract(rem, yL < remL ? yz : yd, remL, base);
                  }
                }
                remL = rem.length;
              } else if (cmp === 0) {
                k++;
                rem = [0];
              }
              qd[i++] = k;
              if (cmp && rem[0]) {
                rem[remL++] = xd[xi] || 0;
              } else {
                rem = [xd[xi]];
                remL = 1;
              }
            } while ((xi++ < xL || rem[0] !== void 0) && sd--);
            more = rem[0] !== void 0;
          }
          if (!qd[0]) qd.shift();
        }
        if (logBase == 1) {
          q.e = e;
          inexact = more;
        } else {
          for (i = 1, k = qd[0]; k >= 10; k /= 10) i++;
          q.e = i + e * logBase - 1;
          finalise(q, dp ? pr + q.e + 1 : pr, rm, more);
        }
        return q;
      };
    })();
    function finalise(x, sd, rm, isTruncated) {
      var digits, i, j, k, rd, roundUp, w, xd, xdi, Ctor = x.constructor;
      out: if (sd != null) {
        xd = x.d;
        if (!xd) return x;
        for (digits = 1, k = xd[0]; k >= 10; k /= 10) digits++;
        i = sd - digits;
        if (i < 0) {
          i += LOG_BASE;
          j = sd;
          w = xd[xdi = 0];
          rd = w / mathpow(10, digits - j - 1) % 10 | 0;
        } else {
          xdi = Math.ceil((i + 1) / LOG_BASE);
          k = xd.length;
          if (xdi >= k) {
            if (isTruncated) {
              for (; k++ <= xdi; ) xd.push(0);
              w = rd = 0;
              digits = 1;
              i %= LOG_BASE;
              j = i - LOG_BASE + 1;
            } else {
              break out;
            }
          } else {
            w = k = xd[xdi];
            for (digits = 1; k >= 10; k /= 10) digits++;
            i %= LOG_BASE;
            j = i - LOG_BASE + digits;
            rd = j < 0 ? 0 : w / mathpow(10, digits - j - 1) % 10 | 0;
          }
        }
        isTruncated = isTruncated || sd < 0 || xd[xdi + 1] !== void 0 || (j < 0 ? w : w % mathpow(10, digits - j - 1));
        roundUp = rm < 4 ? (rd || isTruncated) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || isTruncated || rm == 6 && // Check whether the digit to the left of the rounding digit is odd.
        (i > 0 ? j > 0 ? w / mathpow(10, digits - j) : 0 : xd[xdi - 1]) % 10 & 1 || rm == (x.s < 0 ? 8 : 7));
        if (sd < 1 || !xd[0]) {
          xd.length = 0;
          if (roundUp) {
            sd -= x.e + 1;
            xd[0] = mathpow(10, (LOG_BASE - sd % LOG_BASE) % LOG_BASE);
            x.e = -sd || 0;
          } else {
            xd[0] = x.e = 0;
          }
          return x;
        }
        if (i == 0) {
          xd.length = xdi;
          k = 1;
          xdi--;
        } else {
          xd.length = xdi + 1;
          k = mathpow(10, LOG_BASE - i);
          xd[xdi] = j > 0 ? (w / mathpow(10, digits - j) % mathpow(10, j) | 0) * k : 0;
        }
        if (roundUp) {
          for (; ; ) {
            if (xdi == 0) {
              for (i = 1, j = xd[0]; j >= 10; j /= 10) i++;
              j = xd[0] += k;
              for (k = 1; j >= 10; j /= 10) k++;
              if (i != k) {
                x.e++;
                if (xd[0] == BASE) xd[0] = 1;
              }
              break;
            } else {
              xd[xdi] += k;
              if (xd[xdi] != BASE) break;
              xd[xdi--] = 0;
              k = 1;
            }
          }
        }
        for (i = xd.length; xd[--i] === 0; ) xd.pop();
      }
      if (external) {
        if (x.e > Ctor.maxE) {
          x.d = null;
          x.e = NaN;
        } else if (x.e < Ctor.minE) {
          x.e = 0;
          x.d = [0];
        }
      }
      return x;
    }
    __name(finalise, "finalise");
    function finiteToString(x, isExp, sd) {
      if (!x.isFinite()) return nonFiniteToString(x);
      var k, e = x.e, str = digitsToString(x.d), len = str.length;
      if (isExp) {
        if (sd && (k = sd - len) > 0) {
          str = str.charAt(0) + "." + str.slice(1) + getZeroString(k);
        } else if (len > 1) {
          str = str.charAt(0) + "." + str.slice(1);
        }
        str = str + (x.e < 0 ? "e" : "e+") + x.e;
      } else if (e < 0) {
        str = "0." + getZeroString(-e - 1) + str;
        if (sd && (k = sd - len) > 0) str += getZeroString(k);
      } else if (e >= len) {
        str += getZeroString(e + 1 - len);
        if (sd && (k = sd - e - 1) > 0) str = str + "." + getZeroString(k);
      } else {
        if ((k = e + 1) < len) str = str.slice(0, k) + "." + str.slice(k);
        if (sd && (k = sd - len) > 0) {
          if (e + 1 === len) str += ".";
          str += getZeroString(k);
        }
      }
      return str;
    }
    __name(finiteToString, "finiteToString");
    function getBase10Exponent(digits, e) {
      var w = digits[0];
      for (e *= LOG_BASE; w >= 10; w /= 10) e++;
      return e;
    }
    __name(getBase10Exponent, "getBase10Exponent");
    function getLn10(Ctor, sd, pr) {
      if (sd > LN10_PRECISION) {
        external = true;
        if (pr) Ctor.precision = pr;
        throw Error(precisionLimitExceeded);
      }
      return finalise(new Ctor(LN10), sd, 1, true);
    }
    __name(getLn10, "getLn10");
    function getPi(Ctor, sd, rm) {
      if (sd > PI_PRECISION) throw Error(precisionLimitExceeded);
      return finalise(new Ctor(PI), sd, rm, true);
    }
    __name(getPi, "getPi");
    function getPrecision(digits) {
      var w = digits.length - 1, len = w * LOG_BASE + 1;
      w = digits[w];
      if (w) {
        for (; w % 10 == 0; w /= 10) len--;
        for (w = digits[0]; w >= 10; w /= 10) len++;
      }
      return len;
    }
    __name(getPrecision, "getPrecision");
    function getZeroString(k) {
      var zs = "";
      for (; k--; ) zs += "0";
      return zs;
    }
    __name(getZeroString, "getZeroString");
    function intPow(Ctor, x, n, pr) {
      var isTruncated, r = new Ctor(1), k = Math.ceil(pr / LOG_BASE + 4);
      external = false;
      for (; ; ) {
        if (n % 2) {
          r = r.times(x);
          if (truncate(r.d, k)) isTruncated = true;
        }
        n = mathfloor(n / 2);
        if (n === 0) {
          n = r.d.length - 1;
          if (isTruncated && r.d[n] === 0) ++r.d[n];
          break;
        }
        x = x.times(x);
        truncate(x.d, k);
      }
      external = true;
      return r;
    }
    __name(intPow, "intPow");
    function isOdd(n) {
      return n.d[n.d.length - 1] & 1;
    }
    __name(isOdd, "isOdd");
    function maxOrMin(Ctor, args, n) {
      var k, y, x = new Ctor(args[0]), i = 0;
      for (; ++i < args.length; ) {
        y = new Ctor(args[i]);
        if (!y.s) {
          x = y;
          break;
        }
        k = x.cmp(y);
        if (k === n || k === 0 && x.s === n) {
          x = y;
        }
      }
      return x;
    }
    __name(maxOrMin, "maxOrMin");
    function naturalExponential(x, sd) {
      var denominator, guard, j, pow2, sum2, t, wpr, rep = 0, i = 0, k = 0, Ctor = x.constructor, rm = Ctor.rounding, pr = Ctor.precision;
      if (!x.d || !x.d[0] || x.e > 17) {
        return new Ctor(x.d ? !x.d[0] ? 1 : x.s < 0 ? 0 : 1 / 0 : x.s ? x.s < 0 ? 0 : x : 0 / 0);
      }
      if (sd == null) {
        external = false;
        wpr = pr;
      } else {
        wpr = sd;
      }
      t = new Ctor(0.03125);
      while (x.e > -2) {
        x = x.times(t);
        k += 5;
      }
      guard = Math.log(mathpow(2, k)) / Math.LN10 * 2 + 5 | 0;
      wpr += guard;
      denominator = pow2 = sum2 = new Ctor(1);
      Ctor.precision = wpr;
      for (; ; ) {
        pow2 = finalise(pow2.times(x), wpr, 1);
        denominator = denominator.times(++i);
        t = sum2.plus(divide(pow2, denominator, wpr, 1));
        if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum2.d).slice(0, wpr)) {
          j = k;
          while (j--) sum2 = finalise(sum2.times(sum2), wpr, 1);
          if (sd == null) {
            if (rep < 3 && checkRoundingDigits(sum2.d, wpr - guard, rm, rep)) {
              Ctor.precision = wpr += 10;
              denominator = pow2 = t = new Ctor(1);
              i = 0;
              rep++;
            } else {
              return finalise(sum2, Ctor.precision = pr, rm, external = true);
            }
          } else {
            Ctor.precision = pr;
            return sum2;
          }
        }
        sum2 = t;
      }
    }
    __name(naturalExponential, "naturalExponential");
    function naturalLogarithm(y, sd) {
      var c, c0, denominator, e, numerator, rep, sum2, t, wpr, x1, x2, n = 1, guard = 10, x = y, xd = x.d, Ctor = x.constructor, rm = Ctor.rounding, pr = Ctor.precision;
      if (x.s < 0 || !xd || !xd[0] || !x.e && xd[0] == 1 && xd.length == 1) {
        return new Ctor(xd && !xd[0] ? -1 / 0 : x.s != 1 ? NaN : xd ? 0 : x);
      }
      if (sd == null) {
        external = false;
        wpr = pr;
      } else {
        wpr = sd;
      }
      Ctor.precision = wpr += guard;
      c = digitsToString(xd);
      c0 = c.charAt(0);
      if (Math.abs(e = x.e) < 15e14) {
        while (c0 < 7 && c0 != 1 || c0 == 1 && c.charAt(1) > 3) {
          x = x.times(y);
          c = digitsToString(x.d);
          c0 = c.charAt(0);
          n++;
        }
        e = x.e;
        if (c0 > 1) {
          x = new Ctor("0." + c);
          e++;
        } else {
          x = new Ctor(c0 + "." + c.slice(1));
        }
      } else {
        t = getLn10(Ctor, wpr + 2, pr).times(e + "");
        x = naturalLogarithm(new Ctor(c0 + "." + c.slice(1)), wpr - guard).plus(t);
        Ctor.precision = pr;
        return sd == null ? finalise(x, pr, rm, external = true) : x;
      }
      x1 = x;
      sum2 = numerator = x = divide(x.minus(1), x.plus(1), wpr, 1);
      x2 = finalise(x.times(x), wpr, 1);
      denominator = 3;
      for (; ; ) {
        numerator = finalise(numerator.times(x2), wpr, 1);
        t = sum2.plus(divide(numerator, new Ctor(denominator), wpr, 1));
        if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum2.d).slice(0, wpr)) {
          sum2 = sum2.times(2);
          if (e !== 0) sum2 = sum2.plus(getLn10(Ctor, wpr + 2, pr).times(e + ""));
          sum2 = divide(sum2, new Ctor(n), wpr, 1);
          if (sd == null) {
            if (checkRoundingDigits(sum2.d, wpr - guard, rm, rep)) {
              Ctor.precision = wpr += guard;
              t = numerator = x = divide(x1.minus(1), x1.plus(1), wpr, 1);
              x2 = finalise(x.times(x), wpr, 1);
              denominator = rep = 1;
            } else {
              return finalise(sum2, Ctor.precision = pr, rm, external = true);
            }
          } else {
            Ctor.precision = pr;
            return sum2;
          }
        }
        sum2 = t;
        denominator += 2;
      }
    }
    __name(naturalLogarithm, "naturalLogarithm");
    function nonFiniteToString(x) {
      return String(x.s * x.s / 0);
    }
    __name(nonFiniteToString, "nonFiniteToString");
    function parseDecimal(x, str) {
      var e, i, len;
      if ((e = str.indexOf(".")) > -1) str = str.replace(".", "");
      if ((i = str.search(/e/i)) > 0) {
        if (e < 0) e = i;
        e += +str.slice(i + 1);
        str = str.substring(0, i);
      } else if (e < 0) {
        e = str.length;
      }
      for (i = 0; str.charCodeAt(i) === 48; i++) ;
      for (len = str.length; str.charCodeAt(len - 1) === 48; --len) ;
      str = str.slice(i, len);
      if (str) {
        len -= i;
        x.e = e = e - i - 1;
        x.d = [];
        i = (e + 1) % LOG_BASE;
        if (e < 0) i += LOG_BASE;
        if (i < len) {
          if (i) x.d.push(+str.slice(0, i));
          for (len -= LOG_BASE; i < len; ) x.d.push(+str.slice(i, i += LOG_BASE));
          str = str.slice(i);
          i = LOG_BASE - str.length;
        } else {
          i -= len;
        }
        for (; i--; ) str += "0";
        x.d.push(+str);
        if (external) {
          if (x.e > x.constructor.maxE) {
            x.d = null;
            x.e = NaN;
          } else if (x.e < x.constructor.minE) {
            x.e = 0;
            x.d = [0];
          }
        }
      } else {
        x.e = 0;
        x.d = [0];
      }
      return x;
    }
    __name(parseDecimal, "parseDecimal");
    function parseOther(x, str) {
      var base, Ctor, divisor, i, isFloat, len, p, xd, xe;
      if (str.indexOf("_") > -1) {
        str = str.replace(/(\d)_(?=\d)/g, "$1");
        if (isDecimal.test(str)) return parseDecimal(x, str);
      } else if (str === "Infinity" || str === "NaN") {
        if (!+str) x.s = NaN;
        x.e = NaN;
        x.d = null;
        return x;
      }
      if (isHex.test(str)) {
        base = 16;
        str = str.toLowerCase();
      } else if (isBinary.test(str)) {
        base = 2;
      } else if (isOctal.test(str)) {
        base = 8;
      } else {
        throw Error(invalidArgument + str);
      }
      i = str.search(/p/i);
      if (i > 0) {
        p = +str.slice(i + 1);
        str = str.substring(2, i);
      } else {
        str = str.slice(2);
      }
      i = str.indexOf(".");
      isFloat = i >= 0;
      Ctor = x.constructor;
      if (isFloat) {
        str = str.replace(".", "");
        len = str.length;
        i = len - i;
        divisor = intPow(Ctor, new Ctor(base), i, i * 2);
      }
      xd = convertBase(str, base, BASE);
      xe = xd.length - 1;
      for (i = xe; xd[i] === 0; --i) xd.pop();
      if (i < 0) return new Ctor(x.s * 0);
      x.e = getBase10Exponent(xd, xe);
      x.d = xd;
      external = false;
      if (isFloat) x = divide(x, divisor, len * 4);
      if (p) x = x.times(Math.abs(p) < 54 ? mathpow(2, p) : Decimal2.pow(2, p));
      external = true;
      return x;
    }
    __name(parseOther, "parseOther");
    function sine(Ctor, x) {
      var k, len = x.d.length;
      if (len < 3) {
        return x.isZero() ? x : taylorSeries(Ctor, 2, x, x);
      }
      k = 1.4 * Math.sqrt(len);
      k = k > 16 ? 16 : k | 0;
      x = x.times(1 / tinyPow(5, k));
      x = taylorSeries(Ctor, 2, x, x);
      var sin2_x, d5 = new Ctor(5), d16 = new Ctor(16), d20 = new Ctor(20);
      for (; k--; ) {
        sin2_x = x.times(x);
        x = x.times(d5.plus(sin2_x.times(d16.times(sin2_x).minus(d20))));
      }
      return x;
    }
    __name(sine, "sine");
    function taylorSeries(Ctor, n, x, y, isHyperbolic) {
      var j, t, u, x2, i = 1, pr = Ctor.precision, k = Math.ceil(pr / LOG_BASE);
      external = false;
      x2 = x.times(x);
      u = new Ctor(y);
      for (; ; ) {
        t = divide(u.times(x2), new Ctor(n++ * n++), pr, 1);
        u = isHyperbolic ? y.plus(t) : y.minus(t);
        y = divide(t.times(x2), new Ctor(n++ * n++), pr, 1);
        t = u.plus(y);
        if (t.d[k] !== void 0) {
          for (j = k; t.d[j] === u.d[j] && j--; ) ;
          if (j == -1) break;
        }
        j = u;
        u = y;
        y = t;
        t = j;
        i++;
      }
      external = true;
      t.d.length = k + 1;
      return t;
    }
    __name(taylorSeries, "taylorSeries");
    function tinyPow(b, e) {
      var n = b;
      while (--e) n *= b;
      return n;
    }
    __name(tinyPow, "tinyPow");
    function toLessThanHalfPi(Ctor, x) {
      var t, isNeg = x.s < 0, pi = getPi(Ctor, Ctor.precision, 1), halfPi = pi.times(0.5);
      x = x.abs();
      if (x.lte(halfPi)) {
        quadrant = isNeg ? 4 : 1;
        return x;
      }
      t = x.divToInt(pi);
      if (t.isZero()) {
        quadrant = isNeg ? 3 : 2;
      } else {
        x = x.minus(t.times(pi));
        if (x.lte(halfPi)) {
          quadrant = isOdd(t) ? isNeg ? 2 : 3 : isNeg ? 4 : 1;
          return x;
        }
        quadrant = isOdd(t) ? isNeg ? 1 : 4 : isNeg ? 3 : 2;
      }
      return x.minus(pi).abs();
    }
    __name(toLessThanHalfPi, "toLessThanHalfPi");
    function toStringBinary(x, baseOut, sd, rm) {
      var base, e, i, k, len, roundUp, str, xd, y, Ctor = x.constructor, isExp = sd !== void 0;
      if (isExp) {
        checkInt32(sd, 1, MAX_DIGITS);
        if (rm === void 0) rm = Ctor.rounding;
        else checkInt32(rm, 0, 8);
      } else {
        sd = Ctor.precision;
        rm = Ctor.rounding;
      }
      if (!x.isFinite()) {
        str = nonFiniteToString(x);
      } else {
        str = finiteToString(x);
        i = str.indexOf(".");
        if (isExp) {
          base = 2;
          if (baseOut == 16) {
            sd = sd * 4 - 3;
          } else if (baseOut == 8) {
            sd = sd * 3 - 2;
          }
        } else {
          base = baseOut;
        }
        if (i >= 0) {
          str = str.replace(".", "");
          y = new Ctor(1);
          y.e = str.length - i;
          y.d = convertBase(finiteToString(y), 10, base);
          y.e = y.d.length;
        }
        xd = convertBase(str, 10, base);
        e = len = xd.length;
        for (; xd[--len] == 0; ) xd.pop();
        if (!xd[0]) {
          str = isExp ? "0p+0" : "0";
        } else {
          if (i < 0) {
            e--;
          } else {
            x = new Ctor(x);
            x.d = xd;
            x.e = e;
            x = divide(x, y, sd, rm, 0, base);
            xd = x.d;
            e = x.e;
            roundUp = inexact;
          }
          i = xd[sd];
          k = base / 2;
          roundUp = roundUp || xd[sd + 1] !== void 0;
          roundUp = rm < 4 ? (i !== void 0 || roundUp) && (rm === 0 || rm === (x.s < 0 ? 3 : 2)) : i > k || i === k && (rm === 4 || roundUp || rm === 6 && xd[sd - 1] & 1 || rm === (x.s < 0 ? 8 : 7));
          xd.length = sd;
          if (roundUp) {
            for (; ++xd[--sd] > base - 1; ) {
              xd[sd] = 0;
              if (!sd) {
                ++e;
                xd.unshift(1);
              }
            }
          }
          for (len = xd.length; !xd[len - 1]; --len) ;
          for (i = 0, str = ""; i < len; i++) str += NUMERALS.charAt(xd[i]);
          if (isExp) {
            if (len > 1) {
              if (baseOut == 16 || baseOut == 8) {
                i = baseOut == 16 ? 4 : 3;
                for (--len; len % i; len++) str += "0";
                xd = convertBase(str, base, baseOut);
                for (len = xd.length; !xd[len - 1]; --len) ;
                for (i = 1, str = "1."; i < len; i++) str += NUMERALS.charAt(xd[i]);
              } else {
                str = str.charAt(0) + "." + str.slice(1);
              }
            }
            str = str + (e < 0 ? "p" : "p+") + e;
          } else if (e < 0) {
            for (; ++e; ) str = "0" + str;
            str = "0." + str;
          } else {
            if (++e > len) for (e -= len; e--; ) str += "0";
            else if (e < len) str = str.slice(0, e) + "." + str.slice(e);
          }
        }
        str = (baseOut == 16 ? "0x" : baseOut == 2 ? "0b" : baseOut == 8 ? "0o" : "") + str;
      }
      return x.s < 0 ? "-" + str : str;
    }
    __name(toStringBinary, "toStringBinary");
    function truncate(arr, len) {
      if (arr.length > len) {
        arr.length = len;
        return true;
      }
    }
    __name(truncate, "truncate");
    function abs(x) {
      return new this(x).abs();
    }
    __name(abs, "abs");
    function acos(x) {
      return new this(x).acos();
    }
    __name(acos, "acos");
    function acosh(x) {
      return new this(x).acosh();
    }
    __name(acosh, "acosh");
    function add(x, y) {
      return new this(x).plus(y);
    }
    __name(add, "add");
    function asin(x) {
      return new this(x).asin();
    }
    __name(asin, "asin");
    function asinh(x) {
      return new this(x).asinh();
    }
    __name(asinh, "asinh");
    function atan(x) {
      return new this(x).atan();
    }
    __name(atan, "atan");
    function atanh(x) {
      return new this(x).atanh();
    }
    __name(atanh, "atanh");
    function atan2(y, x) {
      y = new this(y);
      x = new this(x);
      var r, pr = this.precision, rm = this.rounding, wpr = pr + 4;
      if (!y.s || !x.s) {
        r = new this(NaN);
      } else if (!y.d && !x.d) {
        r = getPi(this, wpr, 1).times(x.s > 0 ? 0.25 : 0.75);
        r.s = y.s;
      } else if (!x.d || y.isZero()) {
        r = x.s < 0 ? getPi(this, pr, rm) : new this(0);
        r.s = y.s;
      } else if (!y.d || x.isZero()) {
        r = getPi(this, wpr, 1).times(0.5);
        r.s = y.s;
      } else if (x.s < 0) {
        this.precision = wpr;
        this.rounding = 1;
        r = this.atan(divide(y, x, wpr, 1));
        x = getPi(this, wpr, 1);
        this.precision = pr;
        this.rounding = rm;
        r = y.s < 0 ? r.minus(x) : r.plus(x);
      } else {
        r = this.atan(divide(y, x, wpr, 1));
      }
      return r;
    }
    __name(atan2, "atan2");
    function cbrt(x) {
      return new this(x).cbrt();
    }
    __name(cbrt, "cbrt");
    function ceil(x) {
      return finalise(x = new this(x), x.e + 1, 2);
    }
    __name(ceil, "ceil");
    function clamp(x, min2, max2) {
      return new this(x).clamp(min2, max2);
    }
    __name(clamp, "clamp");
    function config(obj) {
      if (!obj || typeof obj !== "object") throw Error(decimalError + "Object expected");
      var i, p, v, useDefaults = obj.defaults === true, ps = [
        "precision",
        1,
        MAX_DIGITS,
        "rounding",
        0,
        8,
        "toExpNeg",
        -EXP_LIMIT,
        0,
        "toExpPos",
        0,
        EXP_LIMIT,
        "maxE",
        0,
        EXP_LIMIT,
        "minE",
        -EXP_LIMIT,
        0,
        "modulo",
        0,
        9
      ];
      for (i = 0; i < ps.length; i += 3) {
        if (p = ps[i], useDefaults) this[p] = DEFAULTS[p];
        if ((v = obj[p]) !== void 0) {
          if (mathfloor(v) === v && v >= ps[i + 1] && v <= ps[i + 2]) this[p] = v;
          else throw Error(invalidArgument + p + ": " + v);
        }
      }
      if (p = "crypto", useDefaults) this[p] = DEFAULTS[p];
      if ((v = obj[p]) !== void 0) {
        if (v === true || v === false || v === 0 || v === 1) {
          if (v) {
            if (typeof crypto != "undefined" && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
              this[p] = true;
            } else {
              throw Error(cryptoUnavailable);
            }
          } else {
            this[p] = false;
          }
        } else {
          throw Error(invalidArgument + p + ": " + v);
        }
      }
      return this;
    }
    __name(config, "config");
    function cos(x) {
      return new this(x).cos();
    }
    __name(cos, "cos");
    function cosh(x) {
      return new this(x).cosh();
    }
    __name(cosh, "cosh");
    function clone(obj) {
      var i, p, ps;
      function Decimal22(v) {
        var e, i2, t, x = this;
        if (!(x instanceof Decimal22)) return new Decimal22(v);
        x.constructor = Decimal22;
        if (isDecimalInstance(v)) {
          x.s = v.s;
          if (external) {
            if (!v.d || v.e > Decimal22.maxE) {
              x.e = NaN;
              x.d = null;
            } else if (v.e < Decimal22.minE) {
              x.e = 0;
              x.d = [0];
            } else {
              x.e = v.e;
              x.d = v.d.slice();
            }
          } else {
            x.e = v.e;
            x.d = v.d ? v.d.slice() : v.d;
          }
          return;
        }
        t = typeof v;
        if (t === "number") {
          if (v === 0) {
            x.s = 1 / v < 0 ? -1 : 1;
            x.e = 0;
            x.d = [0];
            return;
          }
          if (v < 0) {
            v = -v;
            x.s = -1;
          } else {
            x.s = 1;
          }
          if (v === ~~v && v < 1e7) {
            for (e = 0, i2 = v; i2 >= 10; i2 /= 10) e++;
            if (external) {
              if (e > Decimal22.maxE) {
                x.e = NaN;
                x.d = null;
              } else if (e < Decimal22.minE) {
                x.e = 0;
                x.d = [0];
              } else {
                x.e = e;
                x.d = [v];
              }
            } else {
              x.e = e;
              x.d = [v];
            }
            return;
          }
          if (v * 0 !== 0) {
            if (!v) x.s = NaN;
            x.e = NaN;
            x.d = null;
            return;
          }
          return parseDecimal(x, v.toString());
        }
        if (t === "string") {
          if ((i2 = v.charCodeAt(0)) === 45) {
            v = v.slice(1);
            x.s = -1;
          } else {
            if (i2 === 43) v = v.slice(1);
            x.s = 1;
          }
          return isDecimal.test(v) ? parseDecimal(x, v) : parseOther(x, v);
        }
        if (t === "bigint") {
          if (v < 0) {
            v = -v;
            x.s = -1;
          } else {
            x.s = 1;
          }
          return parseDecimal(x, v.toString());
        }
        throw Error(invalidArgument + v);
      }
      __name(Decimal22, "Decimal2");
      Decimal22.prototype = P2;
      Decimal22.ROUND_UP = 0;
      Decimal22.ROUND_DOWN = 1;
      Decimal22.ROUND_CEIL = 2;
      Decimal22.ROUND_FLOOR = 3;
      Decimal22.ROUND_HALF_UP = 4;
      Decimal22.ROUND_HALF_DOWN = 5;
      Decimal22.ROUND_HALF_EVEN = 6;
      Decimal22.ROUND_HALF_CEIL = 7;
      Decimal22.ROUND_HALF_FLOOR = 8;
      Decimal22.EUCLID = 9;
      Decimal22.config = Decimal22.set = config;
      Decimal22.clone = clone;
      Decimal22.isDecimal = isDecimalInstance;
      Decimal22.abs = abs;
      Decimal22.acos = acos;
      Decimal22.acosh = acosh;
      Decimal22.add = add;
      Decimal22.asin = asin;
      Decimal22.asinh = asinh;
      Decimal22.atan = atan;
      Decimal22.atanh = atanh;
      Decimal22.atan2 = atan2;
      Decimal22.cbrt = cbrt;
      Decimal22.ceil = ceil;
      Decimal22.clamp = clamp;
      Decimal22.cos = cos;
      Decimal22.cosh = cosh;
      Decimal22.div = div;
      Decimal22.exp = exp;
      Decimal22.floor = floor;
      Decimal22.hypot = hypot;
      Decimal22.ln = ln;
      Decimal22.log = log;
      Decimal22.log10 = log10;
      Decimal22.log2 = log2;
      Decimal22.max = max;
      Decimal22.min = min;
      Decimal22.mod = mod;
      Decimal22.mul = mul;
      Decimal22.pow = pow;
      Decimal22.random = random;
      Decimal22.round = round;
      Decimal22.sign = sign;
      Decimal22.sin = sin;
      Decimal22.sinh = sinh;
      Decimal22.sqrt = sqrt;
      Decimal22.sub = sub;
      Decimal22.sum = sum;
      Decimal22.tan = tan;
      Decimal22.tanh = tanh;
      Decimal22.trunc = trunc;
      if (obj === void 0) obj = {};
      if (obj) {
        if (obj.defaults !== true) {
          ps = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"];
          for (i = 0; i < ps.length; ) if (!obj.hasOwnProperty(p = ps[i++])) obj[p] = this[p];
        }
      }
      Decimal22.config(obj);
      return Decimal22;
    }
    __name(clone, "clone");
    function div(x, y) {
      return new this(x).div(y);
    }
    __name(div, "div");
    function exp(x) {
      return new this(x).exp();
    }
    __name(exp, "exp");
    function floor(x) {
      return finalise(x = new this(x), x.e + 1, 3);
    }
    __name(floor, "floor");
    function hypot() {
      var i, n, t = new this(0);
      external = false;
      for (i = 0; i < arguments.length; ) {
        n = new this(arguments[i++]);
        if (!n.d) {
          if (n.s) {
            external = true;
            return new this(1 / 0);
          }
          t = n;
        } else if (t.d) {
          t = t.plus(n.times(n));
        }
      }
      external = true;
      return t.sqrt();
    }
    __name(hypot, "hypot");
    function isDecimalInstance(obj) {
      return obj instanceof Decimal2 || obj && obj.toStringTag === tag || false;
    }
    __name(isDecimalInstance, "isDecimalInstance");
    function ln(x) {
      return new this(x).ln();
    }
    __name(ln, "ln");
    function log(x, y) {
      return new this(x).log(y);
    }
    __name(log, "log");
    function log2(x) {
      return new this(x).log(2);
    }
    __name(log2, "log2");
    function log10(x) {
      return new this(x).log(10);
    }
    __name(log10, "log10");
    function max() {
      return maxOrMin(this, arguments, -1);
    }
    __name(max, "max");
    function min() {
      return maxOrMin(this, arguments, 1);
    }
    __name(min, "min");
    function mod(x, y) {
      return new this(x).mod(y);
    }
    __name(mod, "mod");
    function mul(x, y) {
      return new this(x).mul(y);
    }
    __name(mul, "mul");
    function pow(x, y) {
      return new this(x).pow(y);
    }
    __name(pow, "pow");
    function random(sd) {
      var d, e, k, n, i = 0, r = new this(1), rd = [];
      if (sd === void 0) sd = this.precision;
      else checkInt32(sd, 1, MAX_DIGITS);
      k = Math.ceil(sd / LOG_BASE);
      if (!this.crypto) {
        for (; i < k; ) rd[i++] = Math.random() * 1e7 | 0;
      } else if (crypto.getRandomValues) {
        d = crypto.getRandomValues(new Uint32Array(k));
        for (; i < k; ) {
          n = d[i];
          if (n >= 429e7) {
            d[i] = crypto.getRandomValues(new Uint32Array(1))[0];
          } else {
            rd[i++] = n % 1e7;
          }
        }
      } else if (crypto.randomBytes) {
        d = crypto.randomBytes(k *= 4);
        for (; i < k; ) {
          n = d[i] + (d[i + 1] << 8) + (d[i + 2] << 16) + ((d[i + 3] & 127) << 24);
          if (n >= 214e7) {
            crypto.randomBytes(4).copy(d, i);
          } else {
            rd.push(n % 1e7);
            i += 4;
          }
        }
        i = k / 4;
      } else {
        throw Error(cryptoUnavailable);
      }
      k = rd[--i];
      sd %= LOG_BASE;
      if (k && sd) {
        n = mathpow(10, LOG_BASE - sd);
        rd[i] = (k / n | 0) * n;
      }
      for (; rd[i] === 0; i--) rd.pop();
      if (i < 0) {
        e = 0;
        rd = [0];
      } else {
        e = -1;
        for (; rd[0] === 0; e -= LOG_BASE) rd.shift();
        for (k = 1, n = rd[0]; n >= 10; n /= 10) k++;
        if (k < LOG_BASE) e -= LOG_BASE - k;
      }
      r.e = e;
      r.d = rd;
      return r;
    }
    __name(random, "random");
    function round(x) {
      return finalise(x = new this(x), x.e + 1, this.rounding);
    }
    __name(round, "round");
    function sign(x) {
      x = new this(x);
      return x.d ? x.d[0] ? x.s : 0 * x.s : x.s || NaN;
    }
    __name(sign, "sign");
    function sin(x) {
      return new this(x).sin();
    }
    __name(sin, "sin");
    function sinh(x) {
      return new this(x).sinh();
    }
    __name(sinh, "sinh");
    function sqrt(x) {
      return new this(x).sqrt();
    }
    __name(sqrt, "sqrt");
    function sub(x, y) {
      return new this(x).sub(y);
    }
    __name(sub, "sub");
    function sum() {
      var i = 0, args = arguments, x = new this(args[i]);
      external = false;
      for (; x.s && ++i < args.length; ) x = x.plus(args[i]);
      external = true;
      return finalise(x, this.precision, this.rounding);
    }
    __name(sum, "sum");
    function tan(x) {
      return new this(x).tan();
    }
    __name(tan, "tan");
    function tanh(x) {
      return new this(x).tanh();
    }
    __name(tanh, "tanh");
    function trunc(x) {
      return finalise(x = new this(x), x.e + 1, 1);
    }
    __name(trunc, "trunc");
    P2[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = P2.toString;
    P2[Symbol.toStringTag] = "Decimal";
    var Decimal2 = P2.constructor = clone(DEFAULTS);
    LN10 = new Decimal2(LN10);
    PI = new Decimal2(PI);
    var Sql2 = class _Sql {
      static {
        __name(this, "_Sql");
      }
      constructor(rawStrings, rawValues) {
        if (rawStrings.length - 1 !== rawValues.length) {
          if (rawStrings.length === 0) {
            throw new TypeError("Expected at least 1 string");
          }
          throw new TypeError(`Expected ${rawStrings.length} strings to have ${rawStrings.length - 1} values`);
        }
        const valuesLength = rawValues.reduce((len, value) => len + (value instanceof _Sql ? value.values.length : 1), 0);
        this.values = new Array(valuesLength);
        this.strings = new Array(valuesLength + 1);
        this.strings[0] = rawStrings[0];
        let i = 0, pos = 0;
        while (i < rawValues.length) {
          const child = rawValues[i++];
          const rawString = rawStrings[i];
          if (child instanceof _Sql) {
            this.strings[pos] += child.strings[0];
            let childIndex = 0;
            while (childIndex < child.values.length) {
              this.values[pos++] = child.values[childIndex++];
              this.strings[pos] = child.strings[childIndex];
            }
            this.strings[pos] += rawString;
          } else {
            this.values[pos++] = child;
            this.strings[pos] = rawString;
          }
        }
      }
      get sql() {
        const len = this.strings.length;
        let i = 1;
        let value = this.strings[0];
        while (i < len)
          value += `?${this.strings[i++]}`;
        return value;
      }
      get statement() {
        const len = this.strings.length;
        let i = 1;
        let value = this.strings[0];
        while (i < len)
          value += `:${i}${this.strings[i++]}`;
        return value;
      }
      get text() {
        const len = this.strings.length;
        let i = 1;
        let value = this.strings[0];
        while (i < len)
          value += `$${i}${this.strings[i++]}`;
        return value;
      }
      inspect() {
        return {
          sql: this.sql,
          statement: this.statement,
          text: this.text,
          values: this.values
        };
      }
    };
    function join2(values, separator = ",", prefix = "", suffix = "") {
      if (values.length === 0) {
        throw new TypeError("Expected `join([])` to be called with an array of multiple elements, but got an empty array");
      }
      return new Sql2([prefix, ...Array(values.length - 1).fill(separator), suffix], values);
    }
    __name(join2, "join");
    function raw3(value) {
      return new Sql2([value], []);
    }
    __name(raw3, "raw");
    var empty2 = raw3("");
    function sql(strings, ...values) {
      return new Sql2(strings, values);
    }
    __name(sql, "sql");
  }
});

// ../node_modules/.pnpm/@prisma+client@7.8.0_prisma_e898b9d9c438e592d89244ea5c805b9f/node_modules/@prisma/client/runtime/wasm-compiler-edge.js
var require_wasm_compiler_edge = __commonJS({
  "../node_modules/.pnpm/@prisma+client@7.8.0_prisma_e898b9d9c438e592d89244ea5c805b9f/node_modules/@prisma/client/runtime/wasm-compiler-edge.js"(exports, module) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    var Vl = Object.create;
    var hr = Object.defineProperty;
    var Ul = Object.getOwnPropertyDescriptor;
    var ql = Object.getOwnPropertyNames;
    var Bl = Object.getPrototypeOf;
    var jl = Object.prototype.hasOwnProperty;
    var xe = /* @__PURE__ */ __name((e, t) => () => (e && (t = e(e = 0)), t), "xe");
    var ue = /* @__PURE__ */ __name((e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), "ue");
    var st = /* @__PURE__ */ __name((e, t) => {
      for (var r in t) hr(e, r, { get: t[r], enumerable: true });
    }, "st");
    var Yi = /* @__PURE__ */ __name((e, t, r, n) => {
      if (t && typeof t == "object" || typeof t == "function") for (let i of ql(t)) !jl.call(e, i) && i !== r && hr(e, i, { get: /* @__PURE__ */ __name(() => t[i], "get"), enumerable: !(n = Ul(t, i)) || n.enumerable });
      return e;
    }, "Yi");
    var Je = /* @__PURE__ */ __name((e, t, r) => (r = e != null ? Vl(Bl(e)) : {}, Yi(t || !e || !e.__esModule ? hr(r, "default", { value: e, enumerable: true }) : r, e)), "Je");
    var Xi = /* @__PURE__ */ __name((e) => Yi(hr({}, "__esModule", { value: true }), e), "Xi");
    function Rn(e, t) {
      if (t = t.toLowerCase(), t === "utf8" || t === "utf-8") return new h(Gl.encode(e));
      if (t === "base64" || t === "base64url") return e = e.replace(/-/g, "+").replace(/_/g, "/"), e = e.replace(/[^A-Za-z0-9+/]/g, ""), new h([...atob(e)].map((r) => r.charCodeAt(0)));
      if (t === "binary" || t === "ascii" || t === "latin1" || t === "latin-1") return new h([...e].map((r) => r.charCodeAt(0)));
      if (t === "ucs2" || t === "ucs-2" || t === "utf16le" || t === "utf-16le") {
        let r = new h(e.length * 2), n = new DataView(r.buffer);
        for (let i = 0; i < e.length; i++) n.setUint16(i * 2, e.charCodeAt(i), true);
        return r;
      }
      if (t === "hex") {
        let r = new h(e.length / 2);
        for (let n = 0, i = 0; i < e.length; i += 2, n++) r[n] = parseInt(e.slice(i, i + 2), 16);
        return r;
      }
      to(`encoding "${t}"`);
    }
    __name(Rn, "Rn");
    function Ql(e) {
      let r = Object.getOwnPropertyNames(DataView.prototype).filter((a) => a.startsWith("get") || a.startsWith("set")), n = r.map((a) => a.replace("get", "read").replace("set", "write")), i = /* @__PURE__ */ __name((a, m) => function(f = 0) {
        return G(f, "offset"), se(f, "offset"), W2(f, "offset", this.length - 1), new DataView(this.buffer)[r[a]](f, m);
      }, "i"), o = /* @__PURE__ */ __name((a, m) => function(f, T = 0) {
        let S = r[a].match(/set(\w+\d+)/)[1].toLowerCase(), v = Hl[S];
        return G(T, "offset"), se(T, "offset"), W2(T, "offset", this.length - 1), Jl(f, "value", v[0], v[1]), new DataView(this.buffer)[r[a]](T, f, m), T + parseInt(r[a].match(/\d+/)[0]) / 8;
      }, "o"), s2 = /* @__PURE__ */ __name((a) => {
        a.forEach((m) => {
          m.includes("Uint") && (e[m.replace("Uint", "UInt")] = e[m]), m.includes("Float64") && (e[m.replace("Float64", "Double")] = e[m]), m.includes("Float32") && (e[m.replace("Float32", "Float")] = e[m]);
        });
      }, "s");
      n.forEach((a, m) => {
        a.startsWith("read") && (e[a] = i(m, false), e[a + "LE"] = i(m, true), e[a + "BE"] = i(m, false)), a.startsWith("write") && (e[a] = o(m, false), e[a + "LE"] = o(m, true), e[a + "BE"] = o(m, false)), s2([a, a + "LE", a + "BE"]);
      });
    }
    __name(Ql, "Ql");
    function to(e) {
      throw new Error(`Buffer polyfill does not implement "${e}"`);
    }
    __name(to, "to");
    function wr(e, t) {
      if (!(e instanceof Uint8Array)) throw new TypeError(`The "${t}" argument must be an instance of Buffer or Uint8Array`);
    }
    __name(wr, "wr");
    function W2(e, t, r = Kl + 1) {
      if (e < 0 || e > r) {
        let n = new RangeError(`The value of "${t}" is out of range. It must be >= 0 && <= ${r}. Received ${e}`);
        throw n.code = "ERR_OUT_OF_RANGE", n;
      }
    }
    __name(W2, "W");
    function G(e, t) {
      if (typeof e != "number") {
        let r = new TypeError(`The "${t}" argument must be of type number. Received type ${typeof e}.`);
        throw r.code = "ERR_INVALID_ARG_TYPE", r;
      }
    }
    __name(G, "G");
    function se(e, t) {
      if (!Number.isInteger(e) || Number.isNaN(e)) {
        let r = new RangeError(`The value of "${t}" is out of range. It must be an integer. Received ${e}`);
        throw r.code = "ERR_OUT_OF_RANGE", r;
      }
    }
    __name(se, "se");
    function Jl(e, t, r, n) {
      if (e < r || e > n) {
        let i = new RangeError(`The value of "${t}" is out of range. It must be >= ${r} and <= ${n}. Received ${e}`);
        throw i.code = "ERR_OUT_OF_RANGE", i;
      }
    }
    __name(Jl, "Jl");
    function eo(e, t) {
      if (typeof e != "string") {
        let r = new TypeError(`The "${t}" argument must be of type string. Received type ${typeof e}`);
        throw r.code = "ERR_INVALID_ARG_TYPE", r;
      }
    }
    __name(eo, "eo");
    function Zl(e, t = "utf8") {
      return h.from(e, t);
    }
    __name(Zl, "Zl");
    var h;
    var Hl;
    var Gl;
    var zl;
    var Wl;
    var Kl;
    var g;
    var In;
    var u = xe(() => {
      "use strict";
      h = class e extends Uint8Array {
        static {
          __name(this, "e");
        }
        _isBuffer = true;
        get offset() {
          return this.byteOffset;
        }
        static alloc(t, r = 0, n = "utf8") {
          return eo(n, "encoding"), e.allocUnsafe(t).fill(r, n);
        }
        static allocUnsafe(t) {
          return e.from(t);
        }
        static allocUnsafeSlow(t) {
          return e.from(t);
        }
        static isBuffer(t) {
          return t && !!t._isBuffer;
        }
        static byteLength(t, r = "utf8") {
          if (typeof t == "string") return Rn(t, r).byteLength;
          if (t && t.byteLength) return t.byteLength;
          let n = new TypeError('The "string" argument must be of type string or an instance of Buffer or ArrayBuffer.');
          throw n.code = "ERR_INVALID_ARG_TYPE", n;
        }
        static isEncoding(t) {
          return Wl.includes(t);
        }
        static compare(t, r) {
          wr(t, "buff1"), wr(r, "buff2");
          for (let n = 0; n < t.length; n++) {
            if (t[n] < r[n]) return -1;
            if (t[n] > r[n]) return 1;
          }
          return t.length === r.length ? 0 : t.length > r.length ? 1 : -1;
        }
        static from(t, r = "utf8") {
          if (t && typeof t == "object" && t.type === "Buffer") return new e(t.data);
          if (typeof t == "number") return new e(new Uint8Array(t));
          if (typeof t == "string") return Rn(t, r);
          if (ArrayBuffer.isView(t)) {
            let { byteOffset: n, byteLength: i, buffer: o } = t;
            return "map" in t && typeof t.map == "function" ? new e(t.map((s2) => s2 % 256), n, i) : new e(o, n, i);
          }
          if (t && typeof t == "object" && ("length" in t || "byteLength" in t || "buffer" in t)) return new e(t);
          throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
        }
        static concat(t, r) {
          if (t.length === 0) return e.alloc(0);
          let n = [].concat(...t.map((o) => [...o])), i = e.alloc(r !== void 0 ? r : n.length);
          return i.set(r !== void 0 ? n.slice(0, r) : n), i;
        }
        slice(t = 0, r = this.length) {
          return this.subarray(t, r);
        }
        subarray(t = 0, r = this.length) {
          return Object.setPrototypeOf(super.subarray(t, r), e.prototype);
        }
        reverse() {
          return super.reverse(), this;
        }
        readIntBE(t, r) {
          G(t, "offset"), se(t, "offset"), W2(t, "offset", this.length - 1), G(r, "byteLength"), se(r, "byteLength");
          let n = new DataView(this.buffer, t, r), i = 0;
          for (let o = 0; o < r; o++) i = i * 256 + n.getUint8(o);
          return n.getUint8(0) & 128 && (i -= Math.pow(256, r)), i;
        }
        readIntLE(t, r) {
          G(t, "offset"), se(t, "offset"), W2(t, "offset", this.length - 1), G(r, "byteLength"), se(r, "byteLength");
          let n = new DataView(this.buffer, t, r), i = 0;
          for (let o = 0; o < r; o++) i += n.getUint8(o) * Math.pow(256, o);
          return n.getUint8(r - 1) & 128 && (i -= Math.pow(256, r)), i;
        }
        readUIntBE(t, r) {
          G(t, "offset"), se(t, "offset"), W2(t, "offset", this.length - 1), G(r, "byteLength"), se(r, "byteLength");
          let n = new DataView(this.buffer, t, r), i = 0;
          for (let o = 0; o < r; o++) i = i * 256 + n.getUint8(o);
          return i;
        }
        readUintBE(t, r) {
          return this.readUIntBE(t, r);
        }
        readUIntLE(t, r) {
          G(t, "offset"), se(t, "offset"), W2(t, "offset", this.length - 1), G(r, "byteLength"), se(r, "byteLength");
          let n = new DataView(this.buffer, t, r), i = 0;
          for (let o = 0; o < r; o++) i += n.getUint8(o) * Math.pow(256, o);
          return i;
        }
        readUintLE(t, r) {
          return this.readUIntLE(t, r);
        }
        writeIntBE(t, r, n) {
          return t = t < 0 ? t + Math.pow(256, n) : t, this.writeUIntBE(t, r, n);
        }
        writeIntLE(t, r, n) {
          return t = t < 0 ? t + Math.pow(256, n) : t, this.writeUIntLE(t, r, n);
        }
        writeUIntBE(t, r, n) {
          G(r, "offset"), se(r, "offset"), W2(r, "offset", this.length - 1), G(n, "byteLength"), se(n, "byteLength");
          let i = new DataView(this.buffer, r, n);
          for (let o = n - 1; o >= 0; o--) i.setUint8(o, t & 255), t = t / 256;
          return r + n;
        }
        writeUintBE(t, r, n) {
          return this.writeUIntBE(t, r, n);
        }
        writeUIntLE(t, r, n) {
          G(r, "offset"), se(r, "offset"), W2(r, "offset", this.length - 1), G(n, "byteLength"), se(n, "byteLength");
          let i = new DataView(this.buffer, r, n);
          for (let o = 0; o < n; o++) i.setUint8(o, t & 255), t = t / 256;
          return r + n;
        }
        writeUintLE(t, r, n) {
          return this.writeUIntLE(t, r, n);
        }
        toJSON() {
          return { type: "Buffer", data: Array.from(this) };
        }
        swap16() {
          let t = new DataView(this.buffer, this.byteOffset, this.byteLength);
          for (let r = 0; r < this.length; r += 2) t.setUint16(r, t.getUint16(r, true), false);
          return this;
        }
        swap32() {
          let t = new DataView(this.buffer, this.byteOffset, this.byteLength);
          for (let r = 0; r < this.length; r += 4) t.setUint32(r, t.getUint32(r, true), false);
          return this;
        }
        swap64() {
          let t = new DataView(this.buffer, this.byteOffset, this.byteLength);
          for (let r = 0; r < this.length; r += 8) t.setBigUint64(r, t.getBigUint64(r, true), false);
          return this;
        }
        compare(t, r = 0, n = t.length, i = 0, o = this.length) {
          return wr(t, "target"), G(r, "targetStart"), G(n, "targetEnd"), G(i, "sourceStart"), G(o, "sourceEnd"), W2(r, "targetStart"), W2(n, "targetEnd", t.length), W2(i, "sourceStart"), W2(o, "sourceEnd", this.length), e.compare(this.slice(i, o), t.slice(r, n));
        }
        equals(t) {
          return wr(t, "otherBuffer"), this.length === t.length && this.every((r, n) => r === t[n]);
        }
        copy(t, r = 0, n = 0, i = this.length) {
          W2(r, "targetStart"), W2(n, "sourceStart", this.length), W2(i, "sourceEnd"), r >>>= 0, n >>>= 0, i >>>= 0;
          let o = 0;
          for (; n < i && !(this[n] === void 0 || t[r] === void 0); ) t[r] = this[n], o++, n++, r++;
          return o;
        }
        write(t, r, n, i = "utf8") {
          let o = typeof r == "string" ? 0 : r ?? 0, s2 = typeof n == "string" ? this.length - o : n ?? this.length - o;
          return i = typeof r == "string" ? r : typeof n == "string" ? n : i, G(o, "offset"), G(s2, "length"), W2(o, "offset", this.length), W2(s2, "length", this.length), (i === "ucs2" || i === "ucs-2" || i === "utf16le" || i === "utf-16le") && (s2 = s2 - s2 % 2), Rn(t, i).copy(this, o, 0, s2);
        }
        fill(t = 0, r = 0, n = this.length, i = "utf-8") {
          let o = typeof r == "string" ? 0 : r, s2 = typeof n == "string" ? this.length : n;
          if (i = typeof r == "string" ? r : typeof n == "string" ? n : i, t = e.from(typeof t == "number" ? [t] : t ?? [], i), eo(i, "encoding"), W2(o, "offset", this.length), W2(s2, "end", this.length), t.length !== 0) for (let a = o; a < s2; a += t.length) super.set(t.slice(0, t.length + a >= this.length ? this.length - a : t.length), a);
          return this;
        }
        includes(t, r = null, n = "utf-8") {
          return this.indexOf(t, r, n) !== -1;
        }
        lastIndexOf(t, r = null, n = "utf-8") {
          return this.indexOf(t, r, n, true);
        }
        indexOf(t, r = null, n = "utf-8", i = false) {
          let o = i ? this.findLastIndex.bind(this) : this.findIndex.bind(this);
          n = typeof r == "string" ? r : n;
          let s2 = e.from(typeof t == "number" ? [t] : t, n), a = typeof r == "string" ? 0 : r;
          return a = typeof r == "number" ? a : null, a = Number.isNaN(a) ? null : a, a ??= i ? this.length : 0, a = a < 0 ? this.length + a : a, s2.length === 0 && i === false ? a >= this.length ? this.length : a : s2.length === 0 && i === true ? (a >= this.length ? this.length : a) || this.length : o((m, f) => (i ? f <= a : f >= a) && this[f] === s2[0] && s2.every((S, v) => this[f + v] === S));
        }
        toString(t = "utf8", r = 0, n = this.length) {
          if (r = r < 0 ? 0 : r, t = t.toString().toLowerCase(), n <= 0) return "";
          if (t === "utf8" || t === "utf-8") return zl.decode(this.slice(r, n));
          if (t === "base64" || t === "base64url") {
            let i = btoa(this.reduce((o, s2) => o + In(s2), ""));
            return t === "base64url" ? i.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "") : i;
          }
          if (t === "binary" || t === "ascii" || t === "latin1" || t === "latin-1") return this.slice(r, n).reduce((i, o) => i + In(o & (t === "ascii" ? 127 : 255)), "");
          if (t === "ucs2" || t === "ucs-2" || t === "utf16le" || t === "utf-16le") {
            let i = new DataView(this.buffer.slice(r, n));
            return Array.from({ length: i.byteLength / 2 }, (o, s2) => s2 * 2 + 1 < i.byteLength ? In(i.getUint16(s2 * 2, true)) : "").join("");
          }
          if (t === "hex") return this.slice(r, n).reduce((i, o) => i + o.toString(16).padStart(2, "0"), "");
          to(`encoding "${t}"`);
        }
        toLocaleString() {
          return this.toString();
        }
        inspect() {
          return `<Buffer ${this.toString("hex").match(/.{1,2}/g).join(" ")}>`;
        }
      };
      Hl = { int8: [-128, 127], int16: [-32768, 32767], int32: [-2147483648, 2147483647], uint8: [0, 255], uint16: [0, 65535], uint32: [0, 4294967295], float32: [-1 / 0, 1 / 0], float64: [-1 / 0, 1 / 0], bigint64: [-0x8000000000000000n, 0x7fffffffffffffffn], biguint64: [0n, 0xffffffffffffffffn] }, Gl = new TextEncoder(), zl = new TextDecoder(), Wl = ["utf8", "utf-8", "hex", "base64", "ascii", "binary", "base64url", "ucs2", "ucs-2", "utf16le", "utf-16le", "latin1", "latin-1"], Kl = 4294967295;
      Ql(h.prototype);
      g = new Proxy(Zl, { construct(e, [t, r]) {
        return h.from(t, r);
      }, get(e, t) {
        return h[t];
      } }), In = String.fromCodePoint;
    });
    var y;
    var x;
    var l = xe(() => {
      "use strict";
      y = { nextTick: /* @__PURE__ */ __name((e, ...t) => {
        setTimeout(() => {
          e(...t);
        }, 0);
      }, "nextTick"), env: {}, version: "", cwd: /* @__PURE__ */ __name(() => "/", "cwd"), stderr: {}, argv: ["/bin/node"], pid: 1e4 }, { cwd: x } = y;
    });
    var w;
    var c = xe(() => {
      "use strict";
      w = globalThis.performance ?? (() => {
        let e = Date.now();
        return { now: /* @__PURE__ */ __name(() => Date.now() - e, "now") };
      })();
    });
    var b;
    var p = xe(() => {
      "use strict";
      b = /* @__PURE__ */ __name(() => {
      }, "b");
      b.prototype = b;
    });
    function oo(e, t) {
      var r, n, i, o, s2, a, m, f, T = e.constructor, S = T.precision;
      if (!e.s || !t.s) return t.s || (t = new T(e)), Q ? _2(t, S) : t;
      if (m = e.d, f = t.d, s2 = e.e, i = t.e, m = m.slice(), o = s2 - i, o) {
        for (o < 0 ? (n = m, o = -o, a = f.length) : (n = f, i = s2, a = m.length), s2 = Math.ceil(S / U2), a = s2 > a ? s2 + 1 : a + 1, o > a && (o = a, n.length = 1), n.reverse(); o--; ) n.push(0);
        n.reverse();
      }
      for (a = m.length, o = f.length, a - o < 0 && (o = a, n = f, f = m, m = n), r = 0; o; ) r = (m[--o] = m[o] + f[o] + r) / K | 0, m[o] %= K;
      for (r && (m.unshift(r), ++i), a = m.length; m[--a] == 0; ) m.pop();
      return t.d = m, t.e = i, Q ? _2(t, S) : t;
    }
    __name(oo, "oo");
    function Te(e, t, r) {
      if (e !== ~~e || e < t || e > r) throw Error(Ge + e);
    }
    __name(Te, "Te");
    function Ee(e) {
      var t, r, n, i = e.length - 1, o = "", s2 = e[0];
      if (i > 0) {
        for (o += s2, t = 1; t < i; t++) n = e[t] + "", r = U2 - n.length, r && (o += _e(r)), o += n;
        s2 = e[t], n = s2 + "", r = U2 - n.length, r && (o += _e(r));
      } else if (s2 === 0) return "0";
      for (; s2 % 10 === 0; ) s2 /= 10;
      return o + s2;
    }
    __name(Ee, "Ee");
    function so(e, t) {
      var r, n, i, o, s2, a, m = 0, f = 0, T = e.constructor, S = T.precision;
      if (z(e) > 16) throw Error(On + z(e));
      if (!e.s) return new T(le);
      for (t == null ? (Q = false, a = S) : a = t, s2 = new T(0.03125); e.abs().gte(0.1); ) e = e.times(s2), f += 5;
      for (n = Math.log(He(2, f)) / Math.LN10 * 2 + 5 | 0, a += n, r = i = o = new T(le), T.precision = a; ; ) {
        if (i = _2(i.times(e), a), r = r.times(++m), s2 = o.plus(Oe(i, r, a)), Ee(s2.d).slice(0, a) === Ee(o.d).slice(0, a)) {
          for (; f--; ) o = _2(o.times(o), a);
          return T.precision = S, t == null ? (Q = true, _2(o, S)) : o;
        }
        o = s2;
      }
    }
    __name(so, "so");
    function z(e) {
      for (var t = e.e * U2, r = e.d[0]; r >= 10; r /= 10) t++;
      return t;
    }
    __name(z, "z");
    function kn(e, t, r) {
      if (t > e.LN10.sd()) throw Q = true, r && (e.precision = r), Error(pe + "LN10 precision limit exceeded");
      return _2(new e(e.LN10), t);
    }
    __name(kn, "kn");
    function _e(e) {
      for (var t = ""; e--; ) t += "0";
      return t;
    }
    __name(_e, "_e");
    function Mt(e, t) {
      var r, n, i, o, s2, a, m, f, T, S = 1, v = 10, A = e, N = A.d, R = A.constructor, I2 = R.precision;
      if (A.s < 1) throw Error(pe + (A.s ? "NaN" : "-Infinity"));
      if (A.eq(le)) return new R(0);
      if (t == null ? (Q = false, f = I2) : f = t, A.eq(10)) return t == null && (Q = true), kn(R, f);
      if (f += v, R.precision = f, r = Ee(N), n = r.charAt(0), o = z(A), Math.abs(o) < 15e14) {
        for (; n < 7 && n != 1 || n == 1 && r.charAt(1) > 3; ) A = A.times(e), r = Ee(A.d), n = r.charAt(0), S++;
        o = z(A), n > 1 ? (A = new R("0." + r), o++) : A = new R(n + "." + r.slice(1));
      } else return m = kn(R, f + 2, I2).times(o + ""), A = Mt(new R(n + "." + r.slice(1)), f - v).plus(m), R.precision = I2, t == null ? (Q = true, _2(A, I2)) : A;
      for (a = s2 = A = Oe(A.minus(le), A.plus(le), f), T = _2(A.times(A), f), i = 3; ; ) {
        if (s2 = _2(s2.times(T), f), m = a.plus(Oe(s2, new R(i), f)), Ee(m.d).slice(0, f) === Ee(a.d).slice(0, f)) return a = a.times(2), o !== 0 && (a = a.plus(kn(R, f + 2, I2).times(o + ""))), a = Oe(a, new R(S), f), R.precision = I2, t == null ? (Q = true, _2(a, I2)) : a;
        a = m, i += 2;
      }
    }
    __name(Mt, "Mt");
    function ro(e, t) {
      var r, n, i;
      for ((r = t.indexOf(".")) > -1 && (t = t.replace(".", "")), (n = t.search(/e/i)) > 0 ? (r < 0 && (r = n), r += +t.slice(n + 1), t = t.substring(0, n)) : r < 0 && (r = t.length), n = 0; t.charCodeAt(n) === 48; ) ++n;
      for (i = t.length; t.charCodeAt(i - 1) === 48; ) --i;
      if (t = t.slice(n, i), t) {
        if (i -= n, r = r - n - 1, e.e = ut(r / U2), e.d = [], n = (r + 1) % U2, r < 0 && (n += U2), n < i) {
          for (n && e.d.push(+t.slice(0, n)), i -= U2; n < i; ) e.d.push(+t.slice(n, n += U2));
          t = t.slice(n), n = U2 - t.length;
        } else n -= i;
        for (; n--; ) t += "0";
        if (e.d.push(+t), Q && (e.e > br || e.e < -br)) throw Error(On + r);
      } else e.s = 0, e.e = 0, e.d = [0];
      return e;
    }
    __name(ro, "ro");
    function _2(e, t, r) {
      var n, i, o, s2, a, m, f, T, S = e.d;
      for (s2 = 1, o = S[0]; o >= 10; o /= 10) s2++;
      if (n = t - s2, n < 0) n += U2, i = t, f = S[T = 0];
      else {
        if (T = Math.ceil((n + 1) / U2), o = S.length, T >= o) return e;
        for (f = o = S[T], s2 = 1; o >= 10; o /= 10) s2++;
        n %= U2, i = n - U2 + s2;
      }
      if (r !== void 0 && (o = He(10, s2 - i - 1), a = f / o % 10 | 0, m = t < 0 || S[T + 1] !== void 0 || f % o, m = r < 4 ? (a || m) && (r == 0 || r == (e.s < 0 ? 3 : 2)) : a > 5 || a == 5 && (r == 4 || m || r == 6 && (n > 0 ? i > 0 ? f / He(10, s2 - i) : 0 : S[T - 1]) % 10 & 1 || r == (e.s < 0 ? 8 : 7))), t < 1 || !S[0]) return m ? (o = z(e), S.length = 1, t = t - o - 1, S[0] = He(10, (U2 - t % U2) % U2), e.e = ut(-t / U2) || 0) : (S.length = 1, S[0] = e.e = e.s = 0), e;
      if (n == 0 ? (S.length = T, o = 1, T--) : (S.length = T + 1, o = He(10, U2 - n), S[T] = i > 0 ? (f / He(10, s2 - i) % He(10, i) | 0) * o : 0), m) for (; ; ) if (T == 0) {
        (S[0] += o) == K && (S[0] = 1, ++e.e);
        break;
      } else {
        if (S[T] += o, S[T] != K) break;
        S[T--] = 0, o = 1;
      }
      for (n = S.length; S[--n] === 0; ) S.pop();
      if (Q && (e.e > br || e.e < -br)) throw Error(On + z(e));
      return e;
    }
    __name(_2, "_");
    function ao(e, t) {
      var r, n, i, o, s2, a, m, f, T, S, v = e.constructor, A = v.precision;
      if (!e.s || !t.s) return t.s ? t.s = -t.s : t = new v(e), Q ? _2(t, A) : t;
      if (m = e.d, S = t.d, n = t.e, f = e.e, m = m.slice(), s2 = f - n, s2) {
        for (T = s2 < 0, T ? (r = m, s2 = -s2, a = S.length) : (r = S, n = f, a = m.length), i = Math.max(Math.ceil(A / U2), a) + 2, s2 > i && (s2 = i, r.length = 1), r.reverse(), i = s2; i--; ) r.push(0);
        r.reverse();
      } else {
        for (i = m.length, a = S.length, T = i < a, T && (a = i), i = 0; i < a; i++) if (m[i] != S[i]) {
          T = m[i] < S[i];
          break;
        }
        s2 = 0;
      }
      for (T && (r = m, m = S, S = r, t.s = -t.s), a = m.length, i = S.length - a; i > 0; --i) m[a++] = 0;
      for (i = S.length; i > s2; ) {
        if (m[--i] < S[i]) {
          for (o = i; o && m[--o] === 0; ) m[o] = K - 1;
          --m[o], m[i] += K;
        }
        m[i] -= S[i];
      }
      for (; m[--a] === 0; ) m.pop();
      for (; m[0] === 0; m.shift()) --n;
      return m[0] ? (t.d = m, t.e = n, Q ? _2(t, A) : t) : new v(0);
    }
    __name(ao, "ao");
    function ze(e, t, r) {
      var n, i = z(e), o = Ee(e.d), s2 = o.length;
      return t ? (r && (n = r - s2) > 0 ? o = o.charAt(0) + "." + o.slice(1) + _e(n) : s2 > 1 && (o = o.charAt(0) + "." + o.slice(1)), o = o + (i < 0 ? "e" : "e+") + i) : i < 0 ? (o = "0." + _e(-i - 1) + o, r && (n = r - s2) > 0 && (o += _e(n))) : i >= s2 ? (o += _e(i + 1 - s2), r && (n = r - i - 1) > 0 && (o = o + "." + _e(n))) : ((n = i + 1) < s2 && (o = o.slice(0, n) + "." + o.slice(n)), r && (n = r - s2) > 0 && (i + 1 === s2 && (o += "."), o += _e(n))), e.s < 0 ? "-" + o : o;
    }
    __name(ze, "ze");
    function no(e, t) {
      if (e.length > t) return e.length = t, true;
    }
    __name(no, "no");
    function uo(e) {
      var t, r, n;
      function i(o) {
        var s2 = this;
        if (!(s2 instanceof i)) return new i(o);
        if (s2.constructor = i, o instanceof i) {
          s2.s = o.s, s2.e = o.e, s2.d = (o = o.d) ? o.slice() : o;
          return;
        }
        if (typeof o == "number") {
          if (o * 0 !== 0) throw Error(Ge + o);
          if (o > 0) s2.s = 1;
          else if (o < 0) o = -o, s2.s = -1;
          else {
            s2.s = 0, s2.e = 0, s2.d = [0];
            return;
          }
          if (o === ~~o && o < 1e7) {
            s2.e = 0, s2.d = [o];
            return;
          }
          return ro(s2, o.toString());
        } else if (typeof o != "string") throw Error(Ge + o);
        if (o.charCodeAt(0) === 45 ? (o = o.slice(1), s2.s = -1) : s2.s = 1, Xl.test(o)) ro(s2, o);
        else throw Error(Ge + o);
      }
      __name(i, "i");
      if (i.prototype = C, i.ROUND_UP = 0, i.ROUND_DOWN = 1, i.ROUND_CEIL = 2, i.ROUND_FLOOR = 3, i.ROUND_HALF_UP = 4, i.ROUND_HALF_DOWN = 5, i.ROUND_HALF_EVEN = 6, i.ROUND_HALF_CEIL = 7, i.ROUND_HALF_FLOOR = 8, i.clone = uo, i.config = i.set = ec, e === void 0 && (e = {}), e) for (n = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], t = 0; t < n.length; ) e.hasOwnProperty(r = n[t++]) || (e[r] = this[r]);
      return i.config(e), i;
    }
    __name(uo, "uo");
    function ec(e) {
      if (!e || typeof e != "object") throw Error(pe + "Object expected");
      var t, r, n, i = ["precision", 1, at, "rounding", 0, 8, "toExpNeg", -1 / 0, 0, "toExpPos", 0, 1 / 0];
      for (t = 0; t < i.length; t += 3) if ((n = e[r = i[t]]) !== void 0) if (ut(n) === n && n >= i[t + 1] && n <= i[t + 2]) this[r] = n;
      else throw Error(Ge + r + ": " + n);
      if ((n = e[r = "LN10"]) !== void 0) if (n == Math.LN10) this[r] = new this(n);
      else throw Error(Ge + r + ": " + n);
      return this;
    }
    __name(ec, "ec");
    var at;
    var Yl;
    var lo;
    var Q;
    var pe;
    var Ge;
    var On;
    var ut;
    var He;
    var Xl;
    var le;
    var K;
    var U2;
    var io;
    var br;
    var C;
    var Oe;
    var lo;
    var co = xe(() => {
      "use strict";
      u();
      l();
      c();
      p();
      d();
      at = 1e9, Yl = { precision: 20, rounding: 4, toExpNeg: -7, toExpPos: 21, LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286" }, Q = true, pe = "[DecimalError] ", Ge = pe + "Invalid argument: ", On = pe + "Exponent out of range: ", ut = Math.floor, He = Math.pow, Xl = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, K = 1e7, U2 = 7, io = 9007199254740991, br = ut(io / U2), C = {};
      C.absoluteValue = C.abs = function() {
        var e = new this.constructor(this);
        return e.s && (e.s = 1), e;
      };
      C.comparedTo = C.cmp = function(e) {
        var t, r, n, i, o = this;
        if (e = new o.constructor(e), o.s !== e.s) return o.s || -e.s;
        if (o.e !== e.e) return o.e > e.e ^ o.s < 0 ? 1 : -1;
        for (n = o.d.length, i = e.d.length, t = 0, r = n < i ? n : i; t < r; ++t) if (o.d[t] !== e.d[t]) return o.d[t] > e.d[t] ^ o.s < 0 ? 1 : -1;
        return n === i ? 0 : n > i ^ o.s < 0 ? 1 : -1;
      };
      C.decimalPlaces = C.dp = function() {
        var e = this, t = e.d.length - 1, r = (t - e.e) * U2;
        if (t = e.d[t], t) for (; t % 10 == 0; t /= 10) r--;
        return r < 0 ? 0 : r;
      };
      C.dividedBy = C.div = function(e) {
        return Oe(this, new this.constructor(e));
      };
      C.dividedToIntegerBy = C.idiv = function(e) {
        var t = this, r = t.constructor;
        return _2(Oe(t, new r(e), 0, 1), r.precision);
      };
      C.equals = C.eq = function(e) {
        return !this.cmp(e);
      };
      C.exponent = function() {
        return z(this);
      };
      C.greaterThan = C.gt = function(e) {
        return this.cmp(e) > 0;
      };
      C.greaterThanOrEqualTo = C.gte = function(e) {
        return this.cmp(e) >= 0;
      };
      C.isInteger = C.isint = function() {
        return this.e > this.d.length - 2;
      };
      C.isNegative = C.isneg = function() {
        return this.s < 0;
      };
      C.isPositive = C.ispos = function() {
        return this.s > 0;
      };
      C.isZero = function() {
        return this.s === 0;
      };
      C.lessThan = C.lt = function(e) {
        return this.cmp(e) < 0;
      };
      C.lessThanOrEqualTo = C.lte = function(e) {
        return this.cmp(e) < 1;
      };
      C.logarithm = C.log = function(e) {
        var t, r = this, n = r.constructor, i = n.precision, o = i + 5;
        if (e === void 0) e = new n(10);
        else if (e = new n(e), e.s < 1 || e.eq(le)) throw Error(pe + "NaN");
        if (r.s < 1) throw Error(pe + (r.s ? "NaN" : "-Infinity"));
        return r.eq(le) ? new n(0) : (Q = false, t = Oe(Mt(r, o), Mt(e, o), o), Q = true, _2(t, i));
      };
      C.minus = C.sub = function(e) {
        var t = this;
        return e = new t.constructor(e), t.s == e.s ? ao(t, e) : oo(t, (e.s = -e.s, e));
      };
      C.modulo = C.mod = function(e) {
        var t, r = this, n = r.constructor, i = n.precision;
        if (e = new n(e), !e.s) throw Error(pe + "NaN");
        return r.s ? (Q = false, t = Oe(r, e, 0, 1).times(e), Q = true, r.minus(t)) : _2(new n(r), i);
      };
      C.naturalExponential = C.exp = function() {
        return so(this);
      };
      C.naturalLogarithm = C.ln = function() {
        return Mt(this);
      };
      C.negated = C.neg = function() {
        var e = new this.constructor(this);
        return e.s = -e.s || 0, e;
      };
      C.plus = C.add = function(e) {
        var t = this;
        return e = new t.constructor(e), t.s == e.s ? oo(t, e) : ao(t, (e.s = -e.s, e));
      };
      C.precision = C.sd = function(e) {
        var t, r, n, i = this;
        if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(Ge + e);
        if (t = z(i) + 1, n = i.d.length - 1, r = n * U2 + 1, n = i.d[n], n) {
          for (; n % 10 == 0; n /= 10) r--;
          for (n = i.d[0]; n >= 10; n /= 10) r++;
        }
        return e && t > r ? t : r;
      };
      C.squareRoot = C.sqrt = function() {
        var e, t, r, n, i, o, s2, a = this, m = a.constructor;
        if (a.s < 1) {
          if (!a.s) return new m(0);
          throw Error(pe + "NaN");
        }
        for (e = z(a), Q = false, i = Math.sqrt(+a), i == 0 || i == 1 / 0 ? (t = Ee(a.d), (t.length + e) % 2 == 0 && (t += "0"), i = Math.sqrt(t), e = ut((e + 1) / 2) - (e < 0 || e % 2), i == 1 / 0 ? t = "5e" + e : (t = i.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + e), n = new m(t)) : n = new m(i.toString()), r = m.precision, i = s2 = r + 3; ; ) if (o = n, n = o.plus(Oe(a, o, s2 + 2)).times(0.5), Ee(o.d).slice(0, s2) === (t = Ee(n.d)).slice(0, s2)) {
          if (t = t.slice(s2 - 3, s2 + 1), i == s2 && t == "4999") {
            if (_2(o, r + 1, 0), o.times(o).eq(a)) {
              n = o;
              break;
            }
          } else if (t != "9999") break;
          s2 += 4;
        }
        return Q = true, _2(n, r);
      };
      C.times = C.mul = function(e) {
        var t, r, n, i, o, s2, a, m, f, T = this, S = T.constructor, v = T.d, A = (e = new S(e)).d;
        if (!T.s || !e.s) return new S(0);
        for (e.s *= T.s, r = T.e + e.e, m = v.length, f = A.length, m < f && (o = v, v = A, A = o, s2 = m, m = f, f = s2), o = [], s2 = m + f, n = s2; n--; ) o.push(0);
        for (n = f; --n >= 0; ) {
          for (t = 0, i = m + n; i > n; ) a = o[i] + A[n] * v[i - n - 1] + t, o[i--] = a % K | 0, t = a / K | 0;
          o[i] = (o[i] + t) % K | 0;
        }
        for (; !o[--s2]; ) o.pop();
        return t ? ++r : o.shift(), e.d = o, e.e = r, Q ? _2(e, S.precision) : e;
      };
      C.toDecimalPlaces = C.todp = function(e, t) {
        var r = this, n = r.constructor;
        return r = new n(r), e === void 0 ? r : (Te(e, 0, at), t === void 0 ? t = n.rounding : Te(t, 0, 8), _2(r, e + z(r) + 1, t));
      };
      C.toExponential = function(e, t) {
        var r, n = this, i = n.constructor;
        return e === void 0 ? r = ze(n, true) : (Te(e, 0, at), t === void 0 ? t = i.rounding : Te(t, 0, 8), n = _2(new i(n), e + 1, t), r = ze(n, true, e + 1)), r;
      };
      C.toFixed = function(e, t) {
        var r, n, i = this, o = i.constructor;
        return e === void 0 ? ze(i) : (Te(e, 0, at), t === void 0 ? t = o.rounding : Te(t, 0, 8), n = _2(new o(i), e + z(i) + 1, t), r = ze(n.abs(), false, e + z(n) + 1), i.isneg() && !i.isZero() ? "-" + r : r);
      };
      C.toInteger = C.toint = function() {
        var e = this, t = e.constructor;
        return _2(new t(e), z(e) + 1, t.rounding);
      };
      C.toNumber = function() {
        return +this;
      };
      C.toPower = C.pow = function(e) {
        var t, r, n, i, o, s2, a = this, m = a.constructor, f = 12, T = +(e = new m(e));
        if (!e.s) return new m(le);
        if (a = new m(a), !a.s) {
          if (e.s < 1) throw Error(pe + "Infinity");
          return a;
        }
        if (a.eq(le)) return a;
        if (n = m.precision, e.eq(le)) return _2(a, n);
        if (t = e.e, r = e.d.length - 1, s2 = t >= r, o = a.s, s2) {
          if ((r = T < 0 ? -T : T) <= io) {
            for (i = new m(le), t = Math.ceil(n / U2 + 4), Q = false; r % 2 && (i = i.times(a), no(i.d, t)), r = ut(r / 2), r !== 0; ) a = a.times(a), no(a.d, t);
            return Q = true, e.s < 0 ? new m(le).div(i) : _2(i, n);
          }
        } else if (o < 0) throw Error(pe + "NaN");
        return o = o < 0 && e.d[Math.max(t, r)] & 1 ? -1 : 1, a.s = 1, Q = false, i = e.times(Mt(a, n + f)), Q = true, i = so(i), i.s = o, i;
      };
      C.toPrecision = function(e, t) {
        var r, n, i = this, o = i.constructor;
        return e === void 0 ? (r = z(i), n = ze(i, r <= o.toExpNeg || r >= o.toExpPos)) : (Te(e, 1, at), t === void 0 ? t = o.rounding : Te(t, 0, 8), i = _2(new o(i), e, t), r = z(i), n = ze(i, e <= r || r <= o.toExpNeg, e)), n;
      };
      C.toSignificantDigits = C.tosd = function(e, t) {
        var r = this, n = r.constructor;
        return e === void 0 ? (e = n.precision, t = n.rounding) : (Te(e, 1, at), t === void 0 ? t = n.rounding : Te(t, 0, 8)), _2(new n(r), e, t);
      };
      C.toString = C.valueOf = C.val = C.toJSON = C[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = function() {
        var e = this, t = z(e), r = e.constructor;
        return ze(e, t <= r.toExpNeg || t >= r.toExpPos);
      };
      Oe = /* @__PURE__ */ (function() {
        function e(n, i) {
          var o, s2 = 0, a = n.length;
          for (n = n.slice(); a--; ) o = n[a] * i + s2, n[a] = o % K | 0, s2 = o / K | 0;
          return s2 && n.unshift(s2), n;
        }
        __name(e, "e");
        function t(n, i, o, s2) {
          var a, m;
          if (o != s2) m = o > s2 ? 1 : -1;
          else for (a = m = 0; a < o; a++) if (n[a] != i[a]) {
            m = n[a] > i[a] ? 1 : -1;
            break;
          }
          return m;
        }
        __name(t, "t");
        function r(n, i, o) {
          for (var s2 = 0; o--; ) n[o] -= s2, s2 = n[o] < i[o] ? 1 : 0, n[o] = s2 * K + n[o] - i[o];
          for (; !n[0] && n.length > 1; ) n.shift();
        }
        __name(r, "r");
        return function(n, i, o, s2) {
          var a, m, f, T, S, v, A, N, R, I2, J, j, $3, oe, Qe, Cn, ge, gr, yr = n.constructor, $l = n.s == i.s ? 1 : -1, be = n.d, H2 = i.d;
          if (!n.s) return new yr(n);
          if (!i.s) throw Error(pe + "Division by zero");
          for (m = n.e - i.e, ge = H2.length, Qe = be.length, A = new yr($l), N = A.d = [], f = 0; H2[f] == (be[f] || 0); ) ++f;
          if (H2[f] > (be[f] || 0) && --m, o == null ? j = o = yr.precision : s2 ? j = o + (z(n) - z(i)) + 1 : j = o, j < 0) return new yr(0);
          if (j = j / U2 + 2 | 0, f = 0, ge == 1) for (T = 0, H2 = H2[0], j++; (f < Qe || T) && j--; f++) $3 = T * K + (be[f] || 0), N[f] = $3 / H2 | 0, T = $3 % H2 | 0;
          else {
            for (T = K / (H2[0] + 1) | 0, T > 1 && (H2 = e(H2, T), be = e(be, T), ge = H2.length, Qe = be.length), oe = ge, R = be.slice(0, ge), I2 = R.length; I2 < ge; ) R[I2++] = 0;
            gr = H2.slice(), gr.unshift(0), Cn = H2[0], H2[1] >= K / 2 && ++Cn;
            do
              T = 0, a = t(H2, R, ge, I2), a < 0 ? (J = R[0], ge != I2 && (J = J * K + (R[1] || 0)), T = J / Cn | 0, T > 1 ? (T >= K && (T = K - 1), S = e(H2, T), v = S.length, I2 = R.length, a = t(S, R, v, I2), a == 1 && (T--, r(S, ge < v ? gr : H2, v))) : (T == 0 && (a = T = 1), S = H2.slice()), v = S.length, v < I2 && S.unshift(0), r(R, S, I2), a == -1 && (I2 = R.length, a = t(H2, R, ge, I2), a < 1 && (T++, r(R, ge < I2 ? gr : H2, I2))), I2 = R.length) : a === 0 && (T++, R = [0]), N[f++] = T, a && R[0] ? R[I2++] = be[oe] || 0 : (R = [be[oe]], I2 = 1);
            while ((oe++ < Qe || R[0] !== void 0) && j--);
          }
          return N[0] || N.shift(), A.e = m, _2(A, s2 ? o + z(A) + 1 : o);
        };
      })();
      lo = uo(Yl);
      le = new lo(1);
    });
    var d = xe(() => {
      "use strict";
      co();
    });
    var Fn = {};
    st(Fn, { Hash: /* @__PURE__ */ __name(() => $t, "Hash"), createHash: /* @__PURE__ */ __name(() => ko, "createHash"), default: /* @__PURE__ */ __name(() => ct, "default"), randomFillSync: /* @__PURE__ */ __name(() => Sr, "randomFillSync"), randomUUID: /* @__PURE__ */ __name(() => Pr, "randomUUID"), webcrypto: /* @__PURE__ */ __name(() => Vt, "webcrypto") });
    function Pr() {
      return globalThis.crypto.randomUUID();
    }
    __name(Pr, "Pr");
    function Sr(e, t, r) {
      return t !== void 0 && (r !== void 0 ? e = e.subarray(t, t + r) : e = e.subarray(t)), globalThis.crypto.getRandomValues(e);
    }
    __name(Sr, "Sr");
    function ko(e) {
      return new $t(e);
    }
    __name(ko, "ko");
    var Vt;
    var $t;
    var ct;
    var We = xe(() => {
      "use strict";
      u();
      l();
      c();
      p();
      d();
      Vt = globalThis.crypto;
      $t = class {
        static {
          __name(this, "$t");
        }
        #e = [];
        #t;
        constructor(t) {
          this.#t = t;
        }
        update(t) {
          this.#e.push(t);
        }
        async digest() {
          let t = new Uint8Array(this.#e.reduce((i, o) => i + o.length, 0)), r = 0;
          for (let i of this.#e) t.set(i, r), r += i.length;
          let n = await globalThis.crypto.subtle.digest(this.#t, t);
          return new Uint8Array(n);
        }
      }, ct = { webcrypto: Vt, randomUUID: Pr, randomFillSync: Sr, createHash: ko, Hash: $t };
    });
    var Oo = ue(() => {
      "use strict";
      u();
      l();
      c();
      p();
      d();
    });
    var No = ue((Ky, sc) => {
      sc.exports = { name: "@prisma/engines-version", version: "7.8.0-6.3c6e192761c0362d496ed980de936e2f3cebcd3a", main: "index.js", types: "index.d.ts", license: "Apache-2.0", author: "Tim Suchanek <suchanek@prisma.io>", prisma: { enginesVersion: "3c6e192761c0362d496ed980de936e2f3cebcd3a" }, repository: { type: "git", url: "https://github.com/prisma/engines-wrapper.git", directory: "packages/engines-version" }, devDependencies: { "@types/node": "18.19.76", typescript: "4.9.5" }, files: ["index.js", "index.d.ts"], scripts: { build: "tsc -d" } };
    });
    var Do = ue((vr) => {
      "use strict";
      u();
      l();
      c();
      p();
      d();
      Object.defineProperty(vr, "__esModule", { value: true });
      vr.enginesVersion = void 0;
      vr.enginesVersion = No().prisma.enginesVersion;
    });
    var Fo = ue((lh, _o) => {
      "use strict";
      u();
      l();
      c();
      p();
      d();
      _o.exports = (e, t = 1, r) => {
        if (r = { indent: " ", includeEmptyLines: false, ...r }, typeof e != "string") throw new TypeError(`Expected \`input\` to be a \`string\`, got \`${typeof e}\``);
        if (typeof t != "number") throw new TypeError(`Expected \`count\` to be a \`number\`, got \`${typeof t}\``);
        if (typeof r.indent != "string") throw new TypeError(`Expected \`options.indent\` to be a \`string\`, got \`${typeof r.indent}\``);
        if (t === 0) return e;
        let n = r.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
        return e.replace(n, r.indent.repeat(t));
      };
    });
    var Vo = ue((Mh, Cr) => {
      "use strict";
      u();
      l();
      c();
      p();
      d();
      Cr.exports = (e = {}) => {
        let t;
        if (e.repoUrl) t = e.repoUrl;
        else if (e.user && e.repo) t = `https://github.com/${e.user}/${e.repo}`;
        else throw new Error("You need to specify either the `repoUrl` option or both the `user` and `repo` options");
        let r = new URL(`${t}/issues/new`), n = ["body", "title", "labels", "template", "milestone", "assignee", "projects"];
        for (let i of n) {
          let o = e[i];
          if (o !== void 0) {
            if (i === "labels" || i === "projects") {
              if (!Array.isArray(o)) throw new TypeError(`The \`${i}\` option should be an array`);
              o = o.join(",");
            }
            r.searchParams.set(i, o);
          }
        }
        return r.toString();
      };
      Cr.exports.default = Cr.exports;
    });
    var Qn = ue((Tb, Bo) => {
      "use strict";
      u();
      l();
      c();
      p();
      d();
      Bo.exports = /* @__PURE__ */ (function() {
        function e(t, r, n, i, o) {
          return t < r || n < r ? t > n ? n + 1 : t + 1 : i === o ? r : r + 1;
        }
        __name(e, "e");
        return function(t, r) {
          if (t === r) return 0;
          if (t.length > r.length) {
            var n = t;
            t = r, r = n;
          }
          for (var i = t.length, o = r.length; i > 0 && t.charCodeAt(i - 1) === r.charCodeAt(o - 1); ) i--, o--;
          for (var s2 = 0; s2 < i && t.charCodeAt(s2) === r.charCodeAt(s2); ) s2++;
          if (i -= s2, o -= s2, i === 0 || o < 3) return o;
          var a = 0, m, f, T, S, v, A, N, R, I2, J, j, $3, oe = [];
          for (m = 0; m < i; m++) oe.push(m + 1), oe.push(t.charCodeAt(s2 + m));
          for (var Qe = oe.length - 1; a < o - 3; ) for (I2 = r.charCodeAt(s2 + (f = a)), J = r.charCodeAt(s2 + (T = a + 1)), j = r.charCodeAt(s2 + (S = a + 2)), $3 = r.charCodeAt(s2 + (v = a + 3)), A = a += 4, m = 0; m < Qe; m += 2) N = oe[m], R = oe[m + 1], f = e(N, f, T, I2, R), T = e(f, T, S, J, R), S = e(T, S, v, j, R), A = e(S, v, A, $3, R), oe[m] = A, v = S, S = T, T = f, f = N;
          for (; a < o; ) for (I2 = r.charCodeAt(s2 + (f = a)), A = ++a, m = 0; m < Qe; m += 2) N = oe[m], oe[m] = A = e(N, f, A, I2, oe[m + 1]), f = N;
          return A;
        };
      })();
    });
    var Go = xe(() => {
      "use strict";
      u();
      l();
      c();
      p();
      d();
    });
    var zo = xe(() => {
      "use strict";
      u();
      l();
      c();
      p();
      d();
    });
    var Jr;
    var xs = xe(() => {
      "use strict";
      u();
      l();
      c();
      p();
      d();
      Jr = class {
        static {
          __name(this, "Jr");
        }
        events = {};
        on(t, r) {
          return this.events[t] || (this.events[t] = []), this.events[t].push(r), this;
        }
        emit(t, ...r) {
          return this.events[t] ? (this.events[t].forEach((n) => {
            n(...r);
          }), true) : false;
        }
      };
    });
    var ci = ue((Xe) => {
      "use strict";
      u();
      l();
      c();
      p();
      d();
      Object.defineProperty(Xe, "__esModule", { value: true });
      Xe.anumber = li;
      Xe.abytes = da;
      Xe.ahash = Jp;
      Xe.aexists = Hp;
      Xe.aoutput = Gp;
      function li(e) {
        if (!Number.isSafeInteger(e) || e < 0) throw new Error("positive integer expected, got " + e);
      }
      __name(li, "li");
      function Qp(e) {
        return e instanceof Uint8Array || ArrayBuffer.isView(e) && e.constructor.name === "Uint8Array";
      }
      __name(Qp, "Qp");
      function da(e, ...t) {
        if (!Qp(e)) throw new Error("Uint8Array expected");
        if (t.length > 0 && !t.includes(e.length)) throw new Error("Uint8Array expected of length " + t + ", got length=" + e.length);
      }
      __name(da, "da");
      function Jp(e) {
        if (typeof e != "function" || typeof e.create != "function") throw new Error("Hash should be wrapped by utils.wrapConstructor");
        li(e.outputLen), li(e.blockLen);
      }
      __name(Jp, "Jp");
      function Hp(e, t = true) {
        if (e.destroyed) throw new Error("Hash instance has been destroyed");
        if (t && e.finished) throw new Error("Hash#digest() has already been called");
      }
      __name(Hp, "Hp");
      function Gp(e, t) {
        da(e);
        let r = t.outputLen;
        if (e.length < r) throw new Error("digestInto() expects output buffer of length at least " + r);
      }
      __name(Gp, "Gp");
    });
    var Ma = ue((O) => {
      "use strict";
      u();
      l();
      c();
      p();
      d();
      Object.defineProperty(O, "__esModule", { value: true });
      O.add5L = O.add5H = O.add4H = O.add4L = O.add3H = O.add3L = O.rotlBL = O.rotlBH = O.rotlSL = O.rotlSH = O.rotr32L = O.rotr32H = O.rotrBL = O.rotrBH = O.rotrSL = O.rotrSH = O.shrSL = O.shrSH = O.toBig = void 0;
      O.fromBig = di;
      O.split = ma;
      O.add = Ca;
      var en = BigInt(2 ** 32 - 1), pi = BigInt(32);
      function di(e, t = false) {
        return t ? { h: Number(e & en), l: Number(e >> pi & en) } : { h: Number(e >> pi & en) | 0, l: Number(e & en) | 0 };
      }
      __name(di, "di");
      function ma(e, t = false) {
        let r = new Uint32Array(e.length), n = new Uint32Array(e.length);
        for (let i = 0; i < e.length; i++) {
          let { h: o, l: s2 } = di(e[i], t);
          [r[i], n[i]] = [o, s2];
        }
        return [r, n];
      }
      __name(ma, "ma");
      var fa = /* @__PURE__ */ __name((e, t) => BigInt(e >>> 0) << pi | BigInt(t >>> 0), "fa");
      O.toBig = fa;
      var ga = /* @__PURE__ */ __name((e, t, r) => e >>> r, "ga");
      O.shrSH = ga;
      var ya = /* @__PURE__ */ __name((e, t, r) => e << 32 - r | t >>> r, "ya");
      O.shrSL = ya;
      var ha = /* @__PURE__ */ __name((e, t, r) => e >>> r | t << 32 - r, "ha");
      O.rotrSH = ha;
      var wa = /* @__PURE__ */ __name((e, t, r) => e << 32 - r | t >>> r, "wa");
      O.rotrSL = wa;
      var ba = /* @__PURE__ */ __name((e, t, r) => e << 64 - r | t >>> r - 32, "ba");
      O.rotrBH = ba;
      var xa = /* @__PURE__ */ __name((e, t, r) => e >>> r - 32 | t << 64 - r, "xa");
      O.rotrBL = xa;
      var Ea = /* @__PURE__ */ __name((e, t) => t, "Ea");
      O.rotr32H = Ea;
      var Ta = /* @__PURE__ */ __name((e, t) => e, "Ta");
      O.rotr32L = Ta;
      var Pa = /* @__PURE__ */ __name((e, t, r) => e << r | t >>> 32 - r, "Pa");
      O.rotlSH = Pa;
      var Sa = /* @__PURE__ */ __name((e, t, r) => t << r | e >>> 32 - r, "Sa");
      O.rotlSL = Sa;
      var va = /* @__PURE__ */ __name((e, t, r) => t << r - 32 | e >>> 64 - r, "va");
      O.rotlBH = va;
      var Aa = /* @__PURE__ */ __name((e, t, r) => e << r - 32 | t >>> 64 - r, "Aa");
      O.rotlBL = Aa;
      function Ca(e, t, r, n) {
        let i = (t >>> 0) + (n >>> 0);
        return { h: e + r + (i / 2 ** 32 | 0) | 0, l: i | 0 };
      }
      __name(Ca, "Ca");
      var Ra = /* @__PURE__ */ __name((e, t, r) => (e >>> 0) + (t >>> 0) + (r >>> 0), "Ra");
      O.add3L = Ra;
      var Ia = /* @__PURE__ */ __name((e, t, r, n) => t + r + n + (e / 2 ** 32 | 0) | 0, "Ia");
      O.add3H = Ia;
      var ka = /* @__PURE__ */ __name((e, t, r, n) => (e >>> 0) + (t >>> 0) + (r >>> 0) + (n >>> 0), "ka");
      O.add4L = ka;
      var Oa = /* @__PURE__ */ __name((e, t, r, n, i) => t + r + n + i + (e / 2 ** 32 | 0) | 0, "Oa");
      O.add4H = Oa;
      var Na = /* @__PURE__ */ __name((e, t, r, n, i) => (e >>> 0) + (t >>> 0) + (r >>> 0) + (n >>> 0) + (i >>> 0), "Na");
      O.add5L = Na;
      var Da = /* @__PURE__ */ __name((e, t, r, n, i, o) => t + r + n + i + o + (e / 2 ** 32 | 0) | 0, "Da");
      O.add5H = Da;
      var zp = { fromBig: di, split: ma, toBig: fa, shrSH: ga, shrSL: ya, rotrSH: ha, rotrSL: wa, rotrBH: ba, rotrBL: xa, rotr32H: Ea, rotr32L: Ta, rotlSH: Pa, rotlSL: Sa, rotlBH: va, rotlBL: Aa, add: Ca, add3L: Ra, add3H: Ia, add4L: ka, add4H: Oa, add5H: Da, add5L: Na };
      O.default = zp;
    });
    var La = ue((tn) => {
      "use strict";
      u();
      l();
      c();
      p();
      d();
      Object.defineProperty(tn, "__esModule", { value: true });
      tn.crypto = void 0;
      var Ue = (We(), Xi(Fn));
      tn.crypto = Ue && typeof Ue == "object" && "webcrypto" in Ue ? Ue.webcrypto : Ue && typeof Ue == "object" && "randomBytes" in Ue ? Ue : void 0;
    });
    var $a = ue((M) => {
      "use strict";
      u();
      l();
      c();
      p();
      d();
      Object.defineProperty(M, "__esModule", { value: true });
      M.Hash = M.nextTick = M.byteSwapIfBE = M.isLE = void 0;
      M.isBytes = Wp;
      M.u8 = Kp;
      M.u32 = Zp;
      M.createView = Yp;
      M.rotr = Xp;
      M.rotl = ed;
      M.byteSwap = gi;
      M.byteSwap32 = td;
      M.bytesToHex = nd;
      M.hexToBytes = id;
      M.asyncLoop = sd;
      M.utf8ToBytes = Fa;
      M.toBytes = rn;
      M.concatBytes = ad;
      M.checkOpts = ud;
      M.wrapConstructor = ld;
      M.wrapConstructorWithOpts = cd;
      M.wrapXOFConstructorWithOpts = pd;
      M.randomBytes = dd;
      var At = La(), fi = ci();
      function Wp(e) {
        return e instanceof Uint8Array || ArrayBuffer.isView(e) && e.constructor.name === "Uint8Array";
      }
      __name(Wp, "Wp");
      function Kp(e) {
        return new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
      }
      __name(Kp, "Kp");
      function Zp(e) {
        return new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4));
      }
      __name(Zp, "Zp");
      function Yp(e) {
        return new DataView(e.buffer, e.byteOffset, e.byteLength);
      }
      __name(Yp, "Yp");
      function Xp(e, t) {
        return e << 32 - t | e >>> t;
      }
      __name(Xp, "Xp");
      function ed(e, t) {
        return e << t | e >>> 32 - t >>> 0;
      }
      __name(ed, "ed");
      M.isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
      function gi(e) {
        return e << 24 & 4278190080 | e << 8 & 16711680 | e >>> 8 & 65280 | e >>> 24 & 255;
      }
      __name(gi, "gi");
      M.byteSwapIfBE = M.isLE ? (e) => e : (e) => gi(e);
      function td(e) {
        for (let t = 0; t < e.length; t++) e[t] = gi(e[t]);
      }
      __name(td, "td");
      var rd = Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
      function nd(e) {
        (0, fi.abytes)(e);
        let t = "";
        for (let r = 0; r < e.length; r++) t += rd[e[r]];
        return t;
      }
      __name(nd, "nd");
      var De = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
      function _a(e) {
        if (e >= De._0 && e <= De._9) return e - De._0;
        if (e >= De.A && e <= De.F) return e - (De.A - 10);
        if (e >= De.a && e <= De.f) return e - (De.a - 10);
      }
      __name(_a, "_a");
      function id(e) {
        if (typeof e != "string") throw new Error("hex string expected, got " + typeof e);
        let t = e.length, r = t / 2;
        if (t % 2) throw new Error("hex string expected, got unpadded hex of length " + t);
        let n = new Uint8Array(r);
        for (let i = 0, o = 0; i < r; i++, o += 2) {
          let s2 = _a(e.charCodeAt(o)), a = _a(e.charCodeAt(o + 1));
          if (s2 === void 0 || a === void 0) {
            let m = e[o] + e[o + 1];
            throw new Error('hex string expected, got non-hex character "' + m + '" at index ' + o);
          }
          n[i] = s2 * 16 + a;
        }
        return n;
      }
      __name(id, "id");
      var od = /* @__PURE__ */ __name(async () => {
      }, "od");
      M.nextTick = od;
      async function sd(e, t, r) {
        let n = Date.now();
        for (let i = 0; i < e; i++) {
          r(i);
          let o = Date.now() - n;
          o >= 0 && o < t || (await (0, M.nextTick)(), n += o);
        }
      }
      __name(sd, "sd");
      function Fa(e) {
        if (typeof e != "string") throw new Error("utf8ToBytes expected string, got " + typeof e);
        return new Uint8Array(new TextEncoder().encode(e));
      }
      __name(Fa, "Fa");
      function rn(e) {
        return typeof e == "string" && (e = Fa(e)), (0, fi.abytes)(e), e;
      }
      __name(rn, "rn");
      function ad(...e) {
        let t = 0;
        for (let n = 0; n < e.length; n++) {
          let i = e[n];
          (0, fi.abytes)(i), t += i.length;
        }
        let r = new Uint8Array(t);
        for (let n = 0, i = 0; n < e.length; n++) {
          let o = e[n];
          r.set(o, i), i += o.length;
        }
        return r;
      }
      __name(ad, "ad");
      var mi = class {
        static {
          __name(this, "mi");
        }
        clone() {
          return this._cloneInto();
        }
      };
      M.Hash = mi;
      function ud(e, t) {
        if (t !== void 0 && {}.toString.call(t) !== "[object Object]") throw new Error("Options should be object or undefined");
        return Object.assign(e, t);
      }
      __name(ud, "ud");
      function ld(e) {
        let t = /* @__PURE__ */ __name((n) => e().update(rn(n)).digest(), "t"), r = e();
        return t.outputLen = r.outputLen, t.blockLen = r.blockLen, t.create = () => e(), t;
      }
      __name(ld, "ld");
      function cd(e) {
        let t = /* @__PURE__ */ __name((n, i) => e(i).update(rn(n)).digest(), "t"), r = e({});
        return t.outputLen = r.outputLen, t.blockLen = r.blockLen, t.create = (n) => e(n), t;
      }
      __name(cd, "cd");
      function pd(e) {
        let t = /* @__PURE__ */ __name((n, i) => e(i).update(rn(n)).digest(), "t"), r = e({});
        return t.outputLen = r.outputLen, t.blockLen = r.blockLen, t.create = (n) => e(n), t;
      }
      __name(pd, "pd");
      function dd(e = 32) {
        if (At.crypto && typeof At.crypto.getRandomValues == "function") return At.crypto.getRandomValues(new Uint8Array(e));
        if (At.crypto && typeof At.crypto.randomBytes == "function") return At.crypto.randomBytes(e);
        throw new Error("crypto.getRandomValues must be defined");
      }
      __name(dd, "dd");
    });
    var Ha = ue((B) => {
      "use strict";
      u();
      l();
      c();
      p();
      d();
      Object.defineProperty(B, "__esModule", { value: true });
      B.shake256 = B.shake128 = B.keccak_512 = B.keccak_384 = B.keccak_256 = B.keccak_224 = B.sha3_512 = B.sha3_384 = B.sha3_256 = B.sha3_224 = B.Keccak = void 0;
      B.keccakP = Qa;
      var Ct = ci(), nr = Ma(), Me = $a(), qa = [], Ba = [], ja = [], md = BigInt(0), rr = BigInt(1), fd = BigInt(2), gd = BigInt(7), yd = BigInt(256), hd = BigInt(113);
      for (let e = 0, t = rr, r = 1, n = 0; e < 24; e++) {
        [r, n] = [n, (2 * r + 3 * n) % 5], qa.push(2 * (5 * n + r)), Ba.push((e + 1) * (e + 2) / 2 % 64);
        let i = md;
        for (let o = 0; o < 7; o++) t = (t << rr ^ (t >> gd) * hd) % yd, t & fd && (i ^= rr << (rr << BigInt(o)) - rr);
        ja.push(i);
      }
      var [wd, bd] = (0, nr.split)(ja, true), Va = /* @__PURE__ */ __name((e, t, r) => r > 32 ? (0, nr.rotlBH)(e, t, r) : (0, nr.rotlSH)(e, t, r), "Va"), Ua = /* @__PURE__ */ __name((e, t, r) => r > 32 ? (0, nr.rotlBL)(e, t, r) : (0, nr.rotlSL)(e, t, r), "Ua");
      function Qa(e, t = 24) {
        let r = new Uint32Array(10);
        for (let n = 24 - t; n < 24; n++) {
          for (let s2 = 0; s2 < 10; s2++) r[s2] = e[s2] ^ e[s2 + 10] ^ e[s2 + 20] ^ e[s2 + 30] ^ e[s2 + 40];
          for (let s2 = 0; s2 < 10; s2 += 2) {
            let a = (s2 + 8) % 10, m = (s2 + 2) % 10, f = r[m], T = r[m + 1], S = Va(f, T, 1) ^ r[a], v = Ua(f, T, 1) ^ r[a + 1];
            for (let A = 0; A < 50; A += 10) e[s2 + A] ^= S, e[s2 + A + 1] ^= v;
          }
          let i = e[2], o = e[3];
          for (let s2 = 0; s2 < 24; s2++) {
            let a = Ba[s2], m = Va(i, o, a), f = Ua(i, o, a), T = qa[s2];
            i = e[T], o = e[T + 1], e[T] = m, e[T + 1] = f;
          }
          for (let s2 = 0; s2 < 50; s2 += 10) {
            for (let a = 0; a < 10; a++) r[a] = e[s2 + a];
            for (let a = 0; a < 10; a++) e[s2 + a] ^= ~r[(a + 2) % 10] & r[(a + 4) % 10];
          }
          e[0] ^= wd[n], e[1] ^= bd[n];
        }
        r.fill(0);
      }
      __name(Qa, "Qa");
      var ir = class e extends Me.Hash {
        static {
          __name(this, "e");
        }
        constructor(t, r, n, i = false, o = 24) {
          if (super(), this.blockLen = t, this.suffix = r, this.outputLen = n, this.enableXOF = i, this.rounds = o, this.pos = 0, this.posOut = 0, this.finished = false, this.destroyed = false, (0, Ct.anumber)(n), 0 >= this.blockLen || this.blockLen >= 200) throw new Error("Sha3 supports only keccak-f1600 function");
          this.state = new Uint8Array(200), this.state32 = (0, Me.u32)(this.state);
        }
        keccak() {
          Me.isLE || (0, Me.byteSwap32)(this.state32), Qa(this.state32, this.rounds), Me.isLE || (0, Me.byteSwap32)(this.state32), this.posOut = 0, this.pos = 0;
        }
        update(t) {
          (0, Ct.aexists)(this);
          let { blockLen: r, state: n } = this;
          t = (0, Me.toBytes)(t);
          let i = t.length;
          for (let o = 0; o < i; ) {
            let s2 = Math.min(r - this.pos, i - o);
            for (let a = 0; a < s2; a++) n[this.pos++] ^= t[o++];
            this.pos === r && this.keccak();
          }
          return this;
        }
        finish() {
          if (this.finished) return;
          this.finished = true;
          let { state: t, suffix: r, pos: n, blockLen: i } = this;
          t[n] ^= r, (r & 128) !== 0 && n === i - 1 && this.keccak(), t[i - 1] ^= 128, this.keccak();
        }
        writeInto(t) {
          (0, Ct.aexists)(this, false), (0, Ct.abytes)(t), this.finish();
          let r = this.state, { blockLen: n } = this;
          for (let i = 0, o = t.length; i < o; ) {
            this.posOut >= n && this.keccak();
            let s2 = Math.min(n - this.posOut, o - i);
            t.set(r.subarray(this.posOut, this.posOut + s2), i), this.posOut += s2, i += s2;
          }
          return t;
        }
        xofInto(t) {
          if (!this.enableXOF) throw new Error("XOF is not possible for this instance");
          return this.writeInto(t);
        }
        xof(t) {
          return (0, Ct.anumber)(t), this.xofInto(new Uint8Array(t));
        }
        digestInto(t) {
          if ((0, Ct.aoutput)(t, this), this.finished) throw new Error("digest() was already called");
          return this.writeInto(t), this.destroy(), t;
        }
        digest() {
          return this.digestInto(new Uint8Array(this.outputLen));
        }
        destroy() {
          this.destroyed = true, this.state.fill(0);
        }
        _cloneInto(t) {
          let { blockLen: r, suffix: n, outputLen: i, rounds: o, enableXOF: s2 } = this;
          return t || (t = new e(r, n, i, s2, o)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = o, t.suffix = n, t.outputLen = i, t.enableXOF = s2, t.destroyed = this.destroyed, t;
        }
      };
      B.Keccak = ir;
      var qe = /* @__PURE__ */ __name((e, t, r) => (0, Me.wrapConstructor)(() => new ir(t, e, r)), "qe");
      B.sha3_224 = qe(6, 144, 224 / 8);
      B.sha3_256 = qe(6, 136, 256 / 8);
      B.sha3_384 = qe(6, 104, 384 / 8);
      B.sha3_512 = qe(6, 72, 512 / 8);
      B.keccak_224 = qe(1, 144, 224 / 8);
      B.keccak_256 = qe(1, 136, 256 / 8);
      B.keccak_384 = qe(1, 104, 384 / 8);
      B.keccak_512 = qe(1, 72, 512 / 8);
      var Ja = /* @__PURE__ */ __name((e, t, r) => (0, Me.wrapXOFConstructorWithOpts)((n = {}) => new ir(t, e, n.dkLen === void 0 ? r : n.dkLen, true)), "Ja");
      B.shake128 = Ja(31, 168, 128 / 8);
      B.shake256 = Ja(31, 136, 256 / 8);
    });
    var eu = ue((Yk, Be) => {
      "use strict";
      u();
      l();
      c();
      p();
      d();
      var { sha3_512: xd } = Ha(), za = 24, or = 32, yi = /* @__PURE__ */ __name((e = 4, t = Math.random) => {
        let r = "";
        for (; r.length < e; ) r = r + Math.floor(t() * 36).toString(36);
        return r;
      }, "yi");
      function Wa(e) {
        let t = 8n, r = 0n;
        for (let n of e.values()) {
          let i = BigInt(n);
          r = (r << t) + i;
        }
        return r;
      }
      __name(Wa, "Wa");
      var Ka = /* @__PURE__ */ __name((e = "") => Wa(xd(e)).toString(36).slice(1), "Ka"), Ga = Array.from({ length: 26 }, (e, t) => String.fromCharCode(t + 97)), Ed = /* @__PURE__ */ __name((e) => Ga[Math.floor(e() * Ga.length)], "Ed"), Za = /* @__PURE__ */ __name(({ globalObj: e = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : {}, random: t = Math.random } = {}) => {
        let r = Object.keys(e).toString(), n = r.length ? r + yi(or, t) : yi(or, t);
        return Ka(n).substring(0, or);
      }, "Za"), Ya = /* @__PURE__ */ __name((e) => () => e++, "Ya"), Td = 476782367, Xa = /* @__PURE__ */ __name(({ random: e = Math.random, counter: t = Ya(Math.floor(e() * Td)), length: r = za, fingerprint: n = Za({ random: e }) } = {}) => function() {
        let o = Ed(e), s2 = Date.now().toString(36), a = t().toString(36), m = yi(r, e), f = `${s2 + m + a + n}`;
        return `${o + Ka(f).substring(1, r)}`;
      }, "Xa"), Pd = Xa(), Sd = /* @__PURE__ */ __name((e, { minLength: t = 2, maxLength: r = or } = {}) => {
        let n = e.length, i = /^[0-9a-z]+$/;
        try {
          if (typeof e == "string" && n >= t && n <= r && i.test(e)) return true;
        } finally {
        }
        return false;
      }, "Sd");
      Be.exports.getConstants = () => ({ defaultLength: za, bigLength: or });
      Be.exports.init = Xa;
      Be.exports.createId = Pd;
      Be.exports.bufToBigInt = Wa;
      Be.exports.createCounter = Ya;
      Be.exports.createFingerprint = Za;
      Be.exports.isCuid = Sd;
    });
    var tu = ue((iO, sr) => {
      "use strict";
      u();
      l();
      c();
      p();
      d();
      var { createId: vd, init: Ad, getConstants: Cd, isCuid: Rd } = eu();
      sr.exports.createId = vd;
      sr.exports.init = Ad;
      sr.exports.getConstants = Cd;
      sr.exports.isCuid = Rd;
    });
    var sf = {};
    st(sf, { AnyNull: /* @__PURE__ */ __name(() => Y.AnyNull, "AnyNull"), DMMF: /* @__PURE__ */ __name(() => Qt, "DMMF"), DbNull: /* @__PURE__ */ __name(() => Y.DbNull, "DbNull"), Debug: /* @__PURE__ */ __name(() => ne, "Debug"), Decimal: /* @__PURE__ */ __name(() => Fl.Decimal, "Decimal"), Extensions: /* @__PURE__ */ __name(() => Nn, "Extensions"), JsonNull: /* @__PURE__ */ __name(() => Y.JsonNull, "JsonNull"), NullTypes: /* @__PURE__ */ __name(() => Y.NullTypes, "NullTypes"), ObjectEnumValue: /* @__PURE__ */ __name(() => Y.ObjectEnumValue, "ObjectEnumValue"), PrismaClientInitializationError: /* @__PURE__ */ __name(() => D2.PrismaClientInitializationError, "PrismaClientInitializationError"), PrismaClientKnownRequestError: /* @__PURE__ */ __name(() => D2.PrismaClientKnownRequestError, "PrismaClientKnownRequestError"), PrismaClientRustPanicError: /* @__PURE__ */ __name(() => D2.PrismaClientRustPanicError, "PrismaClientRustPanicError"), PrismaClientUnknownRequestError: /* @__PURE__ */ __name(() => D2.PrismaClientUnknownRequestError, "PrismaClientUnknownRequestError"), PrismaClientValidationError: /* @__PURE__ */ __name(() => D2.PrismaClientValidationError, "PrismaClientValidationError"), Public: /* @__PURE__ */ __name(() => Dn, "Public"), Sql: /* @__PURE__ */ __name(() => ke.Sql, "Sql"), createParam: /* @__PURE__ */ __name(() => ds, "createParam"), defineDmmfProperty: /* @__PURE__ */ __name(() => ws, "defineDmmfProperty"), deserializeJsonObject: /* @__PURE__ */ __name(() => we, "deserializeJsonObject"), deserializeRawResult: /* @__PURE__ */ __name(() => vn, "deserializeRawResult"), dmmfToRuntimeDataModel: /* @__PURE__ */ __name(() => yo, "dmmfToRuntimeDataModel"), empty: /* @__PURE__ */ __name(() => ke.empty, "empty"), getPrismaClient: /* @__PURE__ */ __name(() => Ml, "getPrismaClient"), getRuntime: /* @__PURE__ */ __name(() => _l, "getRuntime"), isAnyNull: /* @__PURE__ */ __name(() => Y.isAnyNull, "isAnyNull"), isDbNull: /* @__PURE__ */ __name(() => Y.isDbNull, "isDbNull"), isJsonNull: /* @__PURE__ */ __name(() => Y.isJsonNull, "isJsonNull"), isObjectEnumValue: /* @__PURE__ */ __name(() => Y.isObjectEnumValue, "isObjectEnumValue"), join: /* @__PURE__ */ __name(() => ke.join, "join"), makeStrictEnum: /* @__PURE__ */ __name(() => Ll, "makeStrictEnum"), makeTypedQueryFactory: /* @__PURE__ */ __name(() => bs, "makeTypedQueryFactory"), raw: /* @__PURE__ */ __name(() => ke.raw, "raw"), serializeJsonQuery: /* @__PURE__ */ __name(() => Br, "serializeJsonQuery"), skip: /* @__PURE__ */ __name(() => qr, "skip"), sqltag: /* @__PURE__ */ __name(() => ke.sql, "sqltag"), warnOnce: /* @__PURE__ */ __name(() => jn, "warnOnce") });
    module.exports = Xi(sf);
    u();
    l();
    c();
    p();
    d();
    var Nn = {};
    st(Nn, { defineExtension: /* @__PURE__ */ __name(() => po, "defineExtension"), getExtensionContext: /* @__PURE__ */ __name(() => mo, "getExtensionContext") });
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    function po(e) {
      return typeof e == "function" ? e : (t) => t.$extends(e);
    }
    __name(po, "po");
    u();
    l();
    c();
    p();
    d();
    function mo(e) {
      return e;
    }
    __name(mo, "mo");
    var Dn = {};
    st(Dn, { validator: /* @__PURE__ */ __name(() => fo, "validator") });
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    function fo(...e) {
      return (t) => t;
    }
    __name(fo, "fo");
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    var Pe = class {
      static {
        __name(this, "Pe");
      }
      _map = /* @__PURE__ */ new Map();
      get(t) {
        return this._map.get(t)?.value;
      }
      set(t, r) {
        this._map.set(t, { value: r });
      }
      getOrCreate(t, r) {
        let n = this._map.get(t);
        if (n) return n.value;
        let i = r();
        return this.set(t, i), i;
      }
    };
    u();
    l();
    c();
    p();
    d();
    function Fe(e) {
      return e.substring(0, 1).toLowerCase() + e.substring(1);
    }
    __name(Fe, "Fe");
    u();
    l();
    c();
    p();
    d();
    function go(e, t) {
      let r = {};
      for (let n of e) {
        let i = n[t];
        r[i] = n;
      }
      return r;
    }
    __name(go, "go");
    u();
    l();
    c();
    p();
    d();
    function Lt(e) {
      let t;
      return { get() {
        return t || (t = { value: e() }), t.value;
      } };
    }
    __name(Lt, "Lt");
    u();
    l();
    c();
    p();
    d();
    function yo(e) {
      return { models: Mn(e.models), enums: Mn(e.enums), types: Mn(e.types) };
    }
    __name(yo, "yo");
    function Mn(e) {
      let t = {};
      for (let { name: r, ...n } of e) t[r] = n;
      return t;
    }
    __name(Mn, "Mn");
    var fs = require_dist2();
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    var Ln;
    var ho;
    var wo;
    var bo;
    var xo = true;
    typeof y < "u" && ({ FORCE_COLOR: Ln, NODE_DISABLE_COLORS: ho, NO_COLOR: wo, TERM: bo } = y.env || {}, xo = y.stdout && y.stdout.isTTY);
    var tc = { enabled: !ho && wo == null && bo !== "dumb" && (Ln != null && Ln !== "0" || xo) };
    function V(e, t) {
      let r = new RegExp(`\\x1b\\[${t}m`, "g"), n = `\x1B[${e}m`, i = `\x1B[${t}m`;
      return function(o) {
        return !tc.enabled || o == null ? o : n + (~("" + o).indexOf(i) ? o.replace(r, i + n) : o) + i;
      };
    }
    __name(V, "V");
    var Gg = V(0, 0);
    var xr = V(1, 22);
    var Er = V(2, 22);
    var zg = V(3, 23);
    var Tr = V(4, 24);
    var Wg = V(7, 27);
    var Kg = V(8, 28);
    var Zg = V(9, 29);
    var Yg = V(30, 39);
    var lt = V(31, 39);
    var Eo = V(32, 39);
    var To = V(33, 39);
    var Po = V(34, 39);
    var Xg = V(35, 39);
    var So = V(36, 39);
    var ey = V(37, 39);
    var vo = V(90, 39);
    var ty = V(90, 39);
    var ry = V(40, 49);
    var ny = V(41, 49);
    var iy = V(42, 49);
    var oy = V(43, 49);
    var sy = V(44, 49);
    var ay = V(45, 49);
    var uy = V(46, 49);
    var ly = V(47, 49);
    u();
    l();
    c();
    p();
    d();
    var rc = 100;
    var Ao = ["green", "yellow", "blue", "magenta", "cyan", "red"];
    var _t = [];
    var Co = Date.now();
    var nc = 0;
    var _n = typeof y < "u" ? y.env : {};
    globalThis.DEBUG ??= _n.DEBUG ?? "";
    globalThis.DEBUG_COLORS ??= _n.DEBUG_COLORS ? _n.DEBUG_COLORS === "true" : true;
    var Ft = { enable(e) {
      typeof e == "string" && (globalThis.DEBUG = e);
    }, disable() {
      let e = globalThis.DEBUG;
      return globalThis.DEBUG = "", e;
    }, enabled(e) {
      let t = globalThis.DEBUG.split(",").map((i) => i.replace(/[.+?^${}()|[\]\\]/g, "\\$&")), r = t.some((i) => i === "" || i[0] === "-" ? false : e.match(RegExp(i.split("*").join(".*") + "$"))), n = t.some((i) => i === "" || i[0] !== "-" ? false : e.match(RegExp(i.slice(1).split("*").join(".*") + "$")));
      return r && !n;
    }, log: /* @__PURE__ */ __name((...e) => {
      let [t, r, ...n] = e;
      (console.warn ?? console.log)(`${t} ${r}`, ...n);
    }, "log"), formatters: {} };
    function ic(e) {
      let t = { color: Ao[nc++ % Ao.length], enabled: Ft.enabled(e), namespace: e, log: Ft.log, extend: /* @__PURE__ */ __name(() => {
      }, "extend") }, r = /* @__PURE__ */ __name((...n) => {
        let { enabled: i, namespace: o, color: s2, log: a } = t;
        if (n.length !== 0 && _t.push([o, ...n]), _t.length > rc && _t.shift(), Ft.enabled(o) || i) {
          let m = n.map((T) => typeof T == "string" ? T : oc(T)), f = `+${Date.now() - Co}ms`;
          Co = Date.now(), a(o, ...m, f);
        }
      }, "r");
      return new Proxy(r, { get: /* @__PURE__ */ __name((n, i) => t[i], "get"), set: /* @__PURE__ */ __name((n, i, o) => t[i] = o, "set") });
    }
    __name(ic, "ic");
    var ne = new Proxy(ic, { get: /* @__PURE__ */ __name((e, t) => Ft[t], "get"), set: /* @__PURE__ */ __name((e, t, r) => Ft[t] = r, "set") });
    function oc(e, t = 2) {
      let r = /* @__PURE__ */ new Set();
      return JSON.stringify(e, (n, i) => {
        if (typeof i == "object" && i !== null) {
          if (r.has(i)) return "[Circular *]";
          r.add(i);
        } else if (typeof i == "bigint") return i.toString();
        return i;
      }, t);
    }
    __name(oc, "oc");
    function Ro(e = 7500) {
      let t = _t.map(([r, ...n]) => `${r} ${n.map((i) => typeof i == "string" ? i : JSON.stringify(i)).join(" ")}`).join(`
`);
      return t.length < e ? t : t.slice(-e);
    }
    __name(Ro, "Ro");
    function Io() {
      _t.length = 0;
    }
    __name(Io, "Io");
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    function Ne(e, t) {
      throw new Error(t);
    }
    __name(Ne, "Ne");
    u();
    l();
    c();
    p();
    d();
    var Mo = "prisma+postgres";
    var Ar = `${Mo}:`;
    function Lo(e) {
      return e?.toString().startsWith(`${Ar}//`) ?? false;
    }
    __name(Lo, "Lo");
    function $n(e) {
      if (!Lo(e)) return false;
      let { host: t } = new URL(e);
      return t.includes("localhost") || t.includes("127.0.0.1") || t.includes("[::1]");
    }
    __name($n, "$n");
    var qt = {};
    st(qt, { error: /* @__PURE__ */ __name(() => lc, "error"), info: /* @__PURE__ */ __name(() => uc, "info"), log: /* @__PURE__ */ __name(() => ac, "log"), query: /* @__PURE__ */ __name(() => cc, "query"), should: /* @__PURE__ */ __name(() => $o, "should"), tags: /* @__PURE__ */ __name(() => Ut, "tags"), warn: /* @__PURE__ */ __name(() => Vn, "warn") });
    u();
    l();
    c();
    p();
    d();
    var Ut = { error: lt("prisma:error"), warn: To("prisma:warn"), info: So("prisma:info"), query: Po("prisma:query") };
    var $o = { warn: /* @__PURE__ */ __name(() => !y.env.PRISMA_DISABLE_WARNINGS, "warn") };
    function ac(...e) {
      console.log(...e);
    }
    __name(ac, "ac");
    function Vn(e, ...t) {
      $o.warn() && console.warn(`${Ut.warn} ${e}`, ...t);
    }
    __name(Vn, "Vn");
    function uc(e, ...t) {
      console.info(`${Ut.info} ${e}`, ...t);
    }
    __name(uc, "uc");
    function lc(e, ...t) {
      console.error(`${Ut.error} ${e}`, ...t);
    }
    __name(lc, "lc");
    function cc(e, ...t) {
      console.log(`${Ut.query} ${e}`, ...t);
    }
    __name(cc, "cc");
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    function Un({ onlyFirst: e = false } = {}) {
      let r = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?(?:\\u0007|\\u001B\\u005C|\\u009C))", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"].join("|");
      return new RegExp(r, e ? void 0 : "g");
    }
    __name(Un, "Un");
    var pc = Un();
    function pt(e) {
      if (typeof e != "string") throw new TypeError(`Expected a \`string\`, got \`${typeof e}\``);
      return e.replace(pc, "");
    }
    __name(pt, "pt");
    u();
    l();
    c();
    p();
    d();
    function qn(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }
    __name(qn, "qn");
    u();
    l();
    c();
    p();
    d();
    function Rr(e, t) {
      let r = {};
      for (let n of Object.keys(e)) r[n] = t(e[n], n);
      return r;
    }
    __name(Rr, "Rr");
    u();
    l();
    c();
    p();
    d();
    function Bn(e, t) {
      if (e.length === 0) return;
      let r = e[0];
      for (let n = 1; n < e.length; n++) t(r, e[n]) < 0 && (r = e[n]);
      return r;
    }
    __name(Bn, "Bn");
    u();
    l();
    c();
    p();
    d();
    function Bt(e, t) {
      Object.defineProperty(e, "name", { value: t, configurable: true });
    }
    __name(Bt, "Bt");
    u();
    l();
    c();
    p();
    d();
    var Uo = /* @__PURE__ */ new Set();
    var jn = /* @__PURE__ */ __name((e, t, ...r) => {
      Uo.has(e) || (Uo.add(e), Vn(t, ...r));
    }, "jn");
    u();
    l();
    c();
    p();
    d();
    function dt(e) {
      return e instanceof Date || Object.prototype.toString.call(e) === "[object Date]";
    }
    __name(dt, "dt");
    function Ir(e) {
      return e.toString() !== "Invalid Date";
    }
    __name(Ir, "Ir");
    u();
    l();
    c();
    p();
    d();
    var qo = require_dist2();
    function mt(e) {
      return qo.Decimal.isDecimal(e) ? true : e !== null && typeof e == "object" && typeof e.s == "number" && typeof e.e == "number" && typeof e.toFixed == "function" && Array.isArray(e.d);
    }
    __name(mt, "mt");
    u();
    l();
    c();
    p();
    d();
    var ss = require_dist2();
    u();
    l();
    c();
    p();
    d();
    var Qt = {};
    st(Qt, { ModelAction: /* @__PURE__ */ __name(() => jt, "ModelAction"), datamodelEnumToSchemaEnum: /* @__PURE__ */ __name(() => dc, "datamodelEnumToSchemaEnum") });
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    function dc(e) {
      return { name: e.name, values: e.values.map((t) => t.name) };
    }
    __name(dc, "dc");
    u();
    l();
    c();
    p();
    d();
    var jt = (($3) => ($3.findUnique = "findUnique", $3.findUniqueOrThrow = "findUniqueOrThrow", $3.findFirst = "findFirst", $3.findFirstOrThrow = "findFirstOrThrow", $3.findMany = "findMany", $3.create = "create", $3.createMany = "createMany", $3.createManyAndReturn = "createManyAndReturn", $3.update = "update", $3.updateMany = "updateMany", $3.updateManyAndReturn = "updateManyAndReturn", $3.upsert = "upsert", $3.delete = "delete", $3.deleteMany = "deleteMany", $3.groupBy = "groupBy", $3.count = "count", $3.aggregate = "aggregate", $3.findRaw = "findRaw", $3.aggregateRaw = "aggregateRaw", $3))(jt || {});
    var mc = Je(Fo());
    var fc = { red: lt, gray: vo, dim: Er, bold: xr, underline: Tr, highlightSource: /* @__PURE__ */ __name((e) => e.highlight(), "highlightSource") };
    var gc = { red: /* @__PURE__ */ __name((e) => e, "red"), gray: /* @__PURE__ */ __name((e) => e, "gray"), dim: /* @__PURE__ */ __name((e) => e, "dim"), bold: /* @__PURE__ */ __name((e) => e, "bold"), underline: /* @__PURE__ */ __name((e) => e, "underline"), highlightSource: /* @__PURE__ */ __name((e) => e, "highlightSource") };
    function yc({ message: e, originalMethod: t, isPanic: r, callArguments: n }) {
      return { functionName: `prisma.${t}()`, message: e, isPanic: r ?? false, callArguments: n };
    }
    __name(yc, "yc");
    function hc({ functionName: e, location: t, message: r, isPanic: n, contextLines: i, callArguments: o }, s2) {
      let a = [""], m = t ? " in" : ":";
      if (n ? (a.push(s2.red(`Oops, an unknown error occurred! This is ${s2.bold("on us")}, you did nothing wrong.`)), a.push(s2.red(`It occurred in the ${s2.bold(`\`${e}\``)} invocation${m}`))) : a.push(s2.red(`Invalid ${s2.bold(`\`${e}\``)} invocation${m}`)), t && a.push(s2.underline(wc(t))), i) {
        a.push("");
        let f = [i.toString()];
        o && (f.push(o), f.push(s2.dim(")"))), a.push(f.join("")), o && a.push("");
      } else a.push(""), o && a.push(o), a.push("");
      return a.push(r), a.join(`
`);
    }
    __name(hc, "hc");
    function wc(e) {
      let t = [e.fileName];
      return e.lineNumber && t.push(String(e.lineNumber)), e.columnNumber && t.push(String(e.columnNumber)), t.join(":");
    }
    __name(wc, "wc");
    function kr(e) {
      let t = e.showColors ? fc : gc, r;
      return typeof $getTemplateParameters < "u" ? r = $getTemplateParameters(e, t) : r = yc(e), hc(r, t);
    }
    __name(kr, "kr");
    u();
    l();
    c();
    p();
    d();
    var Ko = Je(Qn());
    u();
    l();
    c();
    p();
    d();
    function Jo(e, t, r) {
      let n = Ho(e), i = bc(n), o = Ec(i);
      o ? Or(o, t, r) : t.addErrorMessage(() => "Unknown error");
    }
    __name(Jo, "Jo");
    function Ho(e) {
      return e.errors.flatMap((t) => t.kind === "Union" ? Ho(t) : [t]);
    }
    __name(Ho, "Ho");
    function bc(e) {
      let t = /* @__PURE__ */ new Map(), r = [];
      for (let n of e) {
        if (n.kind !== "InvalidArgumentType") {
          r.push(n);
          continue;
        }
        let i = `${n.selectionPath.join(".")}:${n.argumentPath.join(".")}`, o = t.get(i);
        o ? t.set(i, { ...n, argument: { ...n.argument, typeNames: xc(o.argument.typeNames, n.argument.typeNames) } }) : t.set(i, n);
      }
      return r.push(...t.values()), r;
    }
    __name(bc, "bc");
    function xc(e, t) {
      return [...new Set(e.concat(t))];
    }
    __name(xc, "xc");
    function Ec(e) {
      return Bn(e, (t, r) => {
        let n = jo(t), i = jo(r);
        return n !== i ? n - i : Qo(t) - Qo(r);
      });
    }
    __name(Ec, "Ec");
    function jo(e) {
      let t = 0;
      return Array.isArray(e.selectionPath) && (t += e.selectionPath.length), Array.isArray(e.argumentPath) && (t += e.argumentPath.length), t;
    }
    __name(jo, "jo");
    function Qo(e) {
      switch (e.kind) {
        case "InvalidArgumentValue":
        case "ValueTooLarge":
          return 20;
        case "InvalidArgumentType":
          return 10;
        case "RequiredArgumentMissing":
          return -10;
        default:
          return 0;
      }
    }
    __name(Qo, "Qo");
    u();
    l();
    c();
    p();
    d();
    var ce = class {
      static {
        __name(this, "ce");
      }
      constructor(t, r) {
        this.name = t;
        this.value = r;
      }
      isRequired = false;
      makeRequired() {
        return this.isRequired = true, this;
      }
      write(t) {
        let { colors: { green: r } } = t.context;
        t.addMarginSymbol(r(this.isRequired ? "+" : "?")), t.write(r(this.name)), this.isRequired || t.write(r("?")), t.write(r(": ")), typeof this.value == "string" ? t.write(r(this.value)) : t.write(this.value);
      }
    };
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    zo();
    u();
    l();
    c();
    p();
    d();
    var ft = class {
      static {
        __name(this, "ft");
      }
      constructor(t = 0, r) {
        this.context = r;
        this.currentIndent = t;
      }
      lines = [];
      currentLine = "";
      currentIndent = 0;
      marginSymbol;
      afterNextNewLineCallback;
      write(t) {
        return typeof t == "string" ? this.currentLine += t : t.write(this), this;
      }
      writeJoined(t, r, n = (i, o) => o.write(i)) {
        let i = r.length - 1;
        for (let o = 0; o < r.length; o++) n(r[o], this), o !== i && this.write(t);
        return this;
      }
      writeLine(t) {
        return this.write(t).newLine();
      }
      newLine() {
        this.lines.push(this.indentedCurrentLine()), this.currentLine = "", this.marginSymbol = void 0;
        let t = this.afterNextNewLineCallback;
        return this.afterNextNewLineCallback = void 0, t?.(), this;
      }
      withIndent(t) {
        return this.indent(), t(this), this.unindent(), this;
      }
      afterNextNewline(t) {
        return this.afterNextNewLineCallback = t, this;
      }
      indent() {
        return this.currentIndent++, this;
      }
      unindent() {
        return this.currentIndent > 0 && this.currentIndent--, this;
      }
      addMarginSymbol(t) {
        return this.marginSymbol = t, this;
      }
      toString() {
        return this.lines.concat(this.indentedCurrentLine()).join(`
`);
      }
      getCurrentLineLength() {
        return this.currentLine.length;
      }
      indentedCurrentLine() {
        let t = this.currentLine.padStart(this.currentLine.length + 2 * this.currentIndent);
        return this.marginSymbol ? this.marginSymbol + t.slice(1) : t;
      }
    };
    Go();
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    var Nr = class {
      static {
        __name(this, "Nr");
      }
      constructor(t) {
        this.value = t;
      }
      write(t) {
        t.write(this.value);
      }
      markAsError() {
        this.value.markAsError();
      }
    };
    u();
    l();
    c();
    p();
    d();
    var Dr = /* @__PURE__ */ __name((e) => e, "Dr");
    var Mr = { bold: Dr, red: Dr, green: Dr, dim: Dr, enabled: false };
    var Wo = { bold: xr, red: lt, green: Eo, dim: Er, enabled: true };
    var gt = { write(e) {
      e.writeLine(",");
    } };
    u();
    l();
    c();
    p();
    d();
    var Se = class {
      static {
        __name(this, "Se");
      }
      constructor(t) {
        this.contents = t;
      }
      isUnderlined = false;
      color = /* @__PURE__ */ __name((t) => t, "color");
      underline() {
        return this.isUnderlined = true, this;
      }
      setColor(t) {
        return this.color = t, this;
      }
      write(t) {
        let r = t.getCurrentLineLength();
        t.write(this.color(this.contents)), this.isUnderlined && t.afterNextNewline(() => {
          t.write(" ".repeat(r)).writeLine(this.color("~".repeat(this.contents.length)));
        });
      }
    };
    u();
    l();
    c();
    p();
    d();
    var $e = class {
      static {
        __name(this, "$e");
      }
      hasError = false;
      markAsError() {
        return this.hasError = true, this;
      }
    };
    var yt = class extends $e {
      static {
        __name(this, "yt");
      }
      items = [];
      addItem(t) {
        return this.items.push(new Nr(t)), this;
      }
      getField(t) {
        return this.items[t];
      }
      getPrintWidth() {
        return this.items.length === 0 ? 2 : Math.max(...this.items.map((r) => r.value.getPrintWidth())) + 2;
      }
      write(t) {
        if (this.items.length === 0) {
          this.writeEmpty(t);
          return;
        }
        this.writeWithItems(t);
      }
      writeEmpty(t) {
        let r = new Se("[]");
        this.hasError && r.setColor(t.context.colors.red).underline(), t.write(r);
      }
      writeWithItems(t) {
        let { colors: r } = t.context;
        t.writeLine("[").withIndent(() => t.writeJoined(gt, this.items).newLine()).write("]"), this.hasError && t.afterNextNewline(() => {
          t.writeLine(r.red("~".repeat(this.getPrintWidth())));
        });
      }
      asObject() {
      }
    };
    var ht = class e extends $e {
      static {
        __name(this, "e");
      }
      fields = {};
      suggestions = [];
      addField(t) {
        this.fields[t.name] = t;
      }
      addSuggestion(t) {
        this.suggestions.push(t);
      }
      getField(t) {
        return this.fields[t];
      }
      getDeepField(t) {
        let [r, ...n] = t, i = this.getField(r);
        if (!i) return;
        let o = i;
        for (let s2 of n) {
          let a;
          if (o.value instanceof e ? a = o.value.getField(s2) : o.value instanceof yt && (a = o.value.getField(Number(s2))), !a) return;
          o = a;
        }
        return o;
      }
      getDeepFieldValue(t) {
        return t.length === 0 ? this : this.getDeepField(t)?.value;
      }
      hasField(t) {
        return !!this.getField(t);
      }
      removeAllFields() {
        this.fields = {};
      }
      removeField(t) {
        delete this.fields[t];
      }
      getFields() {
        return this.fields;
      }
      isEmpty() {
        return Object.keys(this.fields).length === 0;
      }
      getFieldValue(t) {
        return this.getField(t)?.value;
      }
      getDeepSubSelectionValue(t) {
        let r = this;
        for (let n of t) {
          if (!(r instanceof e)) return;
          let i = r.getSubSelectionValue(n);
          if (!i) return;
          r = i;
        }
        return r;
      }
      getDeepSelectionParent(t) {
        let r = this.getSelectionParent();
        if (!r) return;
        let n = r;
        for (let i of t) {
          let o = n.value.getFieldValue(i);
          if (!o || !(o instanceof e)) return;
          let s2 = o.getSelectionParent();
          if (!s2) return;
          n = s2;
        }
        return n;
      }
      getSelectionParent() {
        let t = this.getField("select")?.value.asObject();
        if (t) return { kind: "select", value: t };
        let r = this.getField("include")?.value.asObject();
        if (r) return { kind: "include", value: r };
      }
      getSubSelectionValue(t) {
        return this.getSelectionParent()?.value.fields[t].value;
      }
      getPrintWidth() {
        let t = Object.values(this.fields);
        return t.length == 0 ? 2 : Math.max(...t.map((n) => n.getPrintWidth())) + 2;
      }
      write(t) {
        let r = Object.values(this.fields);
        if (r.length === 0 && this.suggestions.length === 0) {
          this.writeEmpty(t);
          return;
        }
        this.writeWithContents(t, r);
      }
      asObject() {
        return this;
      }
      writeEmpty(t) {
        let r = new Se("{}");
        this.hasError && r.setColor(t.context.colors.red).underline(), t.write(r);
      }
      writeWithContents(t, r) {
        t.writeLine("{").withIndent(() => {
          t.writeJoined(gt, [...r, ...this.suggestions]).newLine();
        }), t.write("}"), this.hasError && t.afterNextNewline(() => {
          t.writeLine(t.context.colors.red("~".repeat(this.getPrintWidth())));
        });
      }
    };
    u();
    l();
    c();
    p();
    d();
    var Z = class extends $e {
      static {
        __name(this, "Z");
      }
      constructor(r) {
        super();
        this.text = r;
      }
      getPrintWidth() {
        return this.text.length;
      }
      write(r) {
        let n = new Se(this.text);
        this.hasError && n.underline().setColor(r.context.colors.red), r.write(n);
      }
      asObject() {
      }
    };
    u();
    l();
    c();
    p();
    d();
    var Jt = class {
      static {
        __name(this, "Jt");
      }
      fields = [];
      addField(t, r) {
        return this.fields.push({ write(n) {
          let { green: i, dim: o } = n.context.colors;
          n.write(i(o(`${t}: ${r}`))).addMarginSymbol(i(o("+")));
        } }), this;
      }
      write(t) {
        let { colors: { green: r } } = t.context;
        t.writeLine(r("{")).withIndent(() => {
          t.writeJoined(gt, this.fields).newLine();
        }).write(r("}")).addMarginSymbol(r("+"));
      }
    };
    function Or(e, t, r) {
      switch (e.kind) {
        case "MutuallyExclusiveFields":
          Tc(e, t);
          break;
        case "IncludeOnScalar":
          Pc(e, t);
          break;
        case "EmptySelection":
          Sc(e, t, r);
          break;
        case "UnknownSelectionField":
          Rc(e, t);
          break;
        case "InvalidSelectionValue":
          Ic(e, t);
          break;
        case "UnknownArgument":
          kc(e, t);
          break;
        case "UnknownInputField":
          Oc(e, t);
          break;
        case "RequiredArgumentMissing":
          Nc(e, t);
          break;
        case "InvalidArgumentType":
          Dc(e, t);
          break;
        case "InvalidArgumentValue":
          Mc(e, t);
          break;
        case "ValueTooLarge":
          Lc(e, t);
          break;
        case "SomeFieldsMissing":
          _c(e, t);
          break;
        case "TooManyFieldsGiven":
          Fc(e, t);
          break;
        case "Union":
          Jo(e, t, r);
          break;
        default:
          throw new Error("not implemented: " + e.kind);
      }
    }
    __name(Or, "Or");
    function Tc(e, t) {
      let r = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      r && (r.getField(e.firstField)?.markAsError(), r.getField(e.secondField)?.markAsError()), t.addErrorMessage((n) => `Please ${n.bold("either")} use ${n.green(`\`${e.firstField}\``)} or ${n.green(`\`${e.secondField}\``)}, but ${n.red("not both")} at the same time.`);
    }
    __name(Tc, "Tc");
    function Pc(e, t) {
      let [r, n] = wt(e.selectionPath), i = e.outputType, o = t.arguments.getDeepSelectionParent(r)?.value;
      if (o && (o.getField(n)?.markAsError(), i)) for (let s2 of i.fields) s2.isRelation && o.addSuggestion(new ce(s2.name, "true"));
      t.addErrorMessage((s2) => {
        let a = `Invalid scalar field ${s2.red(`\`${n}\``)} for ${s2.bold("include")} statement`;
        return i ? a += ` on model ${s2.bold(i.name)}. ${Ht(s2)}` : a += ".", a += `
Note that ${s2.bold("include")} statements only accept relation fields.`, a;
      });
    }
    __name(Pc, "Pc");
    function Sc(e, t, r) {
      let n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      if (n) {
        let i = n.getField("omit")?.value.asObject();
        if (i) {
          vc(e, t, i);
          return;
        }
        if (n.hasField("select")) {
          Ac(e, t);
          return;
        }
      }
      if (r?.[Fe(e.outputType.name)]) {
        Cc(e, t);
        return;
      }
      t.addErrorMessage(() => `Unknown field at "${e.selectionPath.join(".")} selection"`);
    }
    __name(Sc, "Sc");
    function vc(e, t, r) {
      r.removeAllFields();
      for (let n of e.outputType.fields) r.addSuggestion(new ce(n.name, "false"));
      t.addErrorMessage((n) => `The ${n.red("omit")} statement includes every field of the model ${n.bold(e.outputType.name)}. At least one field must be included in the result`);
    }
    __name(vc, "vc");
    function Ac(e, t) {
      let r = e.outputType, n = t.arguments.getDeepSelectionParent(e.selectionPath)?.value, i = n?.isEmpty() ?? false;
      n && (n.removeAllFields(), Xo(n, r)), t.addErrorMessage((o) => i ? `The ${o.red("`select`")} statement for type ${o.bold(r.name)} must not be empty. ${Ht(o)}` : `The ${o.red("`select`")} statement for type ${o.bold(r.name)} needs ${o.bold("at least one truthy value")}.`);
    }
    __name(Ac, "Ac");
    function Cc(e, t) {
      let r = new Jt();
      for (let i of e.outputType.fields) i.isRelation || r.addField(i.name, "false");
      let n = new ce("omit", r).makeRequired();
      if (e.selectionPath.length === 0) t.arguments.addSuggestion(n);
      else {
        let [i, o] = wt(e.selectionPath), a = t.arguments.getDeepSelectionParent(i)?.value.asObject()?.getField(o);
        if (a) {
          let m = a?.value.asObject() ?? new ht();
          m.addSuggestion(n), a.value = m;
        }
      }
      t.addErrorMessage((i) => `The global ${i.red("omit")} configuration excludes every field of the model ${i.bold(e.outputType.name)}. At least one field must be included in the result`);
    }
    __name(Cc, "Cc");
    function Rc(e, t) {
      let r = es(e.selectionPath, t);
      if (r.parentKind !== "unknown") {
        r.field.markAsError();
        let n = r.parent;
        switch (r.parentKind) {
          case "select":
            Xo(n, e.outputType);
            break;
          case "include":
            $c(n, e.outputType);
            break;
          case "omit":
            Vc(n, e.outputType);
            break;
        }
      }
      t.addErrorMessage((n) => {
        let i = [`Unknown field ${n.red(`\`${r.fieldName}\``)}`];
        return r.parentKind !== "unknown" && i.push(`for ${n.bold(r.parentKind)} statement`), i.push(`on model ${n.bold(`\`${e.outputType.name}\``)}.`), i.push(Ht(n)), i.join(" ");
      });
    }
    __name(Rc, "Rc");
    function Ic(e, t) {
      let r = es(e.selectionPath, t);
      r.parentKind !== "unknown" && r.field.value.markAsError(), t.addErrorMessage((n) => `Invalid value for selection field \`${n.red(r.fieldName)}\`: ${e.underlyingError}`);
    }
    __name(Ic, "Ic");
    function kc(e, t) {
      let r = e.argumentPath[0], n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      n && (n.getField(r)?.markAsError(), Uc(n, e.arguments)), t.addErrorMessage((i) => Zo(i, r, e.arguments.map((o) => o.name)));
    }
    __name(kc, "kc");
    function Oc(e, t) {
      let [r, n] = wt(e.argumentPath), i = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      if (i) {
        i.getDeepField(e.argumentPath)?.markAsError();
        let o = i.getDeepFieldValue(r)?.asObject();
        o && ts(o, e.inputType);
      }
      t.addErrorMessage((o) => Zo(o, n, e.inputType.fields.map((s2) => s2.name)));
    }
    __name(Oc, "Oc");
    function Zo(e, t, r) {
      let n = [`Unknown argument \`${e.red(t)}\`.`], i = Bc(t, r);
      return i && n.push(`Did you mean \`${e.green(i)}\`?`), r.length > 0 && n.push(Ht(e)), n.join(" ");
    }
    __name(Zo, "Zo");
    function Nc(e, t) {
      let r;
      t.addErrorMessage((m) => r?.value instanceof Z && r.value.text === "null" ? `Argument \`${m.green(o)}\` must not be ${m.red("null")}.` : `Argument \`${m.green(o)}\` is missing.`);
      let n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      if (!n) return;
      let [i, o] = wt(e.argumentPath), s2 = new Jt(), a = n.getDeepFieldValue(i)?.asObject();
      if (a) {
        if (r = a.getField(o), r && a.removeField(o), e.inputTypes.length === 1 && e.inputTypes[0].kind === "object") {
          for (let m of e.inputTypes[0].fields) s2.addField(m.name, m.typeNames.join(" | "));
          a.addSuggestion(new ce(o, s2).makeRequired());
        } else {
          let m = e.inputTypes.map(Yo).join(" | ");
          a.addSuggestion(new ce(o, m).makeRequired());
        }
        if (e.dependentArgumentPath) {
          n.getDeepField(e.dependentArgumentPath)?.markAsError();
          let [, m] = wt(e.dependentArgumentPath);
          t.addErrorMessage((f) => `Argument \`${f.green(o)}\` is required because argument \`${f.green(m)}\` was provided.`);
        }
      }
    }
    __name(Nc, "Nc");
    function Yo(e) {
      return e.kind === "list" ? `${Yo(e.elementType)}[]` : e.name;
    }
    __name(Yo, "Yo");
    function Dc(e, t) {
      let r = e.argument.name, n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      n && n.getDeepFieldValue(e.argumentPath)?.markAsError(), t.addErrorMessage((i) => {
        let o = Lr("or", e.argument.typeNames.map((s2) => i.green(s2)));
        return `Argument \`${i.bold(r)}\`: Invalid value provided. Expected ${o}, provided ${i.red(e.inferredType)}.`;
      });
    }
    __name(Dc, "Dc");
    function Mc(e, t) {
      let r = e.argument.name, n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      n && n.getDeepFieldValue(e.argumentPath)?.markAsError(), t.addErrorMessage((i) => {
        let o = [`Invalid value for argument \`${i.bold(r)}\``];
        if (e.underlyingError && o.push(`: ${e.underlyingError}`), o.push("."), e.argument.typeNames.length > 0) {
          let s2 = Lr("or", e.argument.typeNames.map((a) => i.green(a)));
          o.push(` Expected ${s2}.`);
        }
        return o.join("");
      });
    }
    __name(Mc, "Mc");
    function Lc(e, t) {
      let r = e.argument.name, n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject(), i;
      if (n) {
        let s2 = n.getDeepField(e.argumentPath)?.value;
        s2?.markAsError(), s2 instanceof Z && (i = s2.text);
      }
      t.addErrorMessage((o) => {
        let s2 = ["Unable to fit value"];
        return i && s2.push(o.red(i)), s2.push(`into a 64-bit signed integer for field \`${o.bold(r)}\``), s2.join(" ");
      });
    }
    __name(Lc, "Lc");
    function _c(e, t) {
      let r = e.argumentPath[e.argumentPath.length - 1], n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      if (n) {
        let i = n.getDeepFieldValue(e.argumentPath)?.asObject();
        i && ts(i, e.inputType);
      }
      t.addErrorMessage((i) => {
        let o = [`Argument \`${i.bold(r)}\` of type ${i.bold(e.inputType.name)} needs`];
        return e.constraints.minFieldCount === 1 ? e.constraints.requiredFields ? o.push(`${i.green("at least one of")} ${Lr("or", e.constraints.requiredFields.map((s2) => `\`${i.bold(s2)}\``))} arguments.`) : o.push(`${i.green("at least one")} argument.`) : o.push(`${i.green(`at least ${e.constraints.minFieldCount}`)} arguments.`), o.push(Ht(i)), o.join(" ");
      });
    }
    __name(_c, "_c");
    function Fc(e, t) {
      let r = e.argumentPath[e.argumentPath.length - 1], n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject(), i = [];
      if (n) {
        let o = n.getDeepFieldValue(e.argumentPath)?.asObject();
        o && (o.markAsError(), i = Object.keys(o.getFields()));
      }
      t.addErrorMessage((o) => {
        let s2 = [`Argument \`${o.bold(r)}\` of type ${o.bold(e.inputType.name)} needs`];
        return e.constraints.minFieldCount === 1 && e.constraints.maxFieldCount == 1 ? s2.push(`${o.green("exactly one")} argument,`) : e.constraints.maxFieldCount == 1 ? s2.push(`${o.green("at most one")} argument,`) : s2.push(`${o.green(`at most ${e.constraints.maxFieldCount}`)} arguments,`), s2.push(`but you provided ${Lr("and", i.map((a) => o.red(a)))}. Please choose`), e.constraints.maxFieldCount === 1 ? s2.push("one.") : s2.push(`${e.constraints.maxFieldCount}.`), s2.join(" ");
      });
    }
    __name(Fc, "Fc");
    function Xo(e, t) {
      for (let r of t.fields) e.hasField(r.name) || e.addSuggestion(new ce(r.name, "true"));
    }
    __name(Xo, "Xo");
    function $c(e, t) {
      for (let r of t.fields) r.isRelation && !e.hasField(r.name) && e.addSuggestion(new ce(r.name, "true"));
    }
    __name($c, "$c");
    function Vc(e, t) {
      for (let r of t.fields) !e.hasField(r.name) && !r.isRelation && e.addSuggestion(new ce(r.name, "true"));
    }
    __name(Vc, "Vc");
    function Uc(e, t) {
      for (let r of t) e.hasField(r.name) || e.addSuggestion(new ce(r.name, r.typeNames.join(" | ")));
    }
    __name(Uc, "Uc");
    function es(e, t) {
      let [r, n] = wt(e), i = t.arguments.getDeepSubSelectionValue(r)?.asObject();
      if (!i) return { parentKind: "unknown", fieldName: n };
      let o = i.getFieldValue("select")?.asObject(), s2 = i.getFieldValue("include")?.asObject(), a = i.getFieldValue("omit")?.asObject(), m = o?.getField(n);
      return o && m ? { parentKind: "select", parent: o, field: m, fieldName: n } : (m = s2?.getField(n), s2 && m ? { parentKind: "include", field: m, parent: s2, fieldName: n } : (m = a?.getField(n), a && m ? { parentKind: "omit", field: m, parent: a, fieldName: n } : { parentKind: "unknown", fieldName: n }));
    }
    __name(es, "es");
    function ts(e, t) {
      if (t.kind === "object") for (let r of t.fields) e.hasField(r.name) || e.addSuggestion(new ce(r.name, r.typeNames.join(" | ")));
    }
    __name(ts, "ts");
    function wt(e) {
      let t = [...e], r = t.pop();
      if (!r) throw new Error("unexpected empty path");
      return [t, r];
    }
    __name(wt, "wt");
    function Ht({ green: e, enabled: t }) {
      return "Available options are " + (t ? `listed in ${e("green")}` : "marked with ?") + ".";
    }
    __name(Ht, "Ht");
    function Lr(e, t) {
      if (t.length === 1) return t[0];
      let r = [...t], n = r.pop();
      return `${r.join(", ")} ${e} ${n}`;
    }
    __name(Lr, "Lr");
    var qc = 3;
    function Bc(e, t) {
      let r = 1 / 0, n;
      for (let i of t) {
        let o = (0, Ko.default)(e, i);
        o > qc || o < r && (r = o, n = i);
      }
      return n;
    }
    __name(Bc, "Bc");
    u();
    l();
    c();
    p();
    d();
    var ns = require_dist2();
    u();
    l();
    c();
    p();
    d();
    var Gt = class {
      static {
        __name(this, "Gt");
      }
      modelName;
      name;
      typeName;
      isList;
      isEnum;
      constructor(t, r, n, i, o) {
        this.modelName = t, this.name = r, this.typeName = n, this.isList = i, this.isEnum = o;
      }
      _toGraphQLInputType() {
        let t = this.isList ? "List" : "", r = this.isEnum ? "Enum" : "";
        return `${t}${r}${this.typeName}FieldRefInput<${this.modelName}>`;
      }
    };
    function bt(e) {
      return e instanceof Gt;
    }
    __name(bt, "bt");
    u();
    l();
    c();
    p();
    d();
    var rs = ": ";
    var _r = class {
      static {
        __name(this, "_r");
      }
      constructor(t, r) {
        this.name = t;
        this.value = r;
      }
      hasError = false;
      markAsError() {
        this.hasError = true;
      }
      getPrintWidth() {
        return this.name.length + this.value.getPrintWidth() + rs.length;
      }
      write(t) {
        let r = new Se(this.name);
        this.hasError && r.underline().setColor(t.context.colors.red), t.write(r).write(rs).write(this.value);
      }
    };
    var Hn = class {
      static {
        __name(this, "Hn");
      }
      arguments;
      errorMessages = [];
      constructor(t) {
        this.arguments = t;
      }
      write(t) {
        t.write(this.arguments);
      }
      addErrorMessage(t) {
        this.errorMessages.push(t);
      }
      renderAllMessages(t) {
        return this.errorMessages.map((r) => r(t)).join(`
`);
      }
    };
    function xt(e) {
      return new Hn(is(e));
    }
    __name(xt, "xt");
    function is(e) {
      let t = new ht();
      for (let [r, n] of Object.entries(e)) {
        let i = new _r(r, os(n));
        t.addField(i);
      }
      return t;
    }
    __name(is, "is");
    function os(e) {
      if (typeof e == "string") return new Z(JSON.stringify(e));
      if (typeof e == "number" || typeof e == "boolean") return new Z(String(e));
      if (typeof e == "bigint") return new Z(`${e}n`);
      if (e === null) return new Z("null");
      if (e === void 0) return new Z("undefined");
      if (mt(e)) return new Z(`new Prisma.Decimal("${e.toFixed()}")`);
      if (e instanceof Uint8Array) return g.isBuffer(e) ? new Z(`Buffer.alloc(${e.byteLength})`) : new Z(`new Uint8Array(${e.byteLength})`);
      if (e instanceof Date) {
        let t = Ir(e) ? e.toISOString() : "Invalid Date";
        return new Z(`new Date("${t}")`);
      }
      return (0, ns.isObjectEnumValue)(e) ? new Z(`Prisma.${e._getName()}`) : bt(e) ? new Z(`prisma.${Fe(e.modelName)}.$fields.${e.name}`) : Array.isArray(e) ? jc(e) : typeof e == "object" ? is(e) : new Z(Object.prototype.toString.call(e));
    }
    __name(os, "os");
    function jc(e) {
      let t = new yt();
      for (let r of e) t.addItem(os(r));
      return t;
    }
    __name(jc, "jc");
    function Fr(e, t) {
      let r = t === "pretty" ? Wo : Mr, n = e.renderAllMessages(r), i = new ft(0, { colors: r }).write(e).toString();
      return { message: n, args: i };
    }
    __name(Fr, "Fr");
    function $r({ args: e, errors: t, errorFormat: r, callsite: n, originalMethod: i, clientVersion: o, globalOmit: s2 }) {
      let a = xt(e);
      for (let S of t) Or(S, a, s2);
      let { message: m, args: f } = Fr(a, r), T = kr({ message: m, callsite: n, originalMethod: i, showColors: r === "pretty", callArguments: f });
      throw new ss.PrismaClientValidationError(T, { clientVersion: o });
    }
    __name($r, "$r");
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    function ve(e) {
      return e.replace(/^./, (t) => t.toLowerCase());
    }
    __name(ve, "ve");
    u();
    l();
    c();
    p();
    d();
    function us(e, t, r) {
      let n = ve(r);
      return !t.result || !(t.result.$allModels || t.result[n]) ? e : Qc({ ...e, ...as(t.name, e, t.result.$allModels), ...as(t.name, e, t.result[n]) });
    }
    __name(us, "us");
    function Qc(e) {
      let t = new Pe(), r = /* @__PURE__ */ __name((n, i) => t.getOrCreate(n, () => i.has(n) ? [n] : (i.add(n), e[n] ? e[n].needs.flatMap((o) => r(o, i)) : [n])), "r");
      return Rr(e, (n) => ({ ...n, needs: r(n.name, /* @__PURE__ */ new Set()) }));
    }
    __name(Qc, "Qc");
    function as(e, t, r) {
      return r ? Rr(r, ({ needs: n, compute: i }, o) => ({ name: o, needs: n ? Object.keys(n).filter((s2) => n[s2]) : [], compute: Jc(t, o, i) })) : {};
    }
    __name(as, "as");
    function Jc(e, t, r) {
      let n = e?.[t]?.compute;
      return n ? (i) => r({ ...i, [t]: n(i) }) : r;
    }
    __name(Jc, "Jc");
    function ls(e, t) {
      if (!t) return e;
      let r = { ...e };
      for (let n of Object.values(t)) if (e[n.name]) for (let i of n.needs) r[i] = true;
      return r;
    }
    __name(ls, "ls");
    function cs(e, t) {
      if (!t) return e;
      let r = { ...e };
      for (let n of Object.values(t)) if (!e[n.name]) for (let i of n.needs) delete r[i];
      return r;
    }
    __name(cs, "cs");
    var Vr = class {
      static {
        __name(this, "Vr");
      }
      constructor(t, r) {
        this.extension = t;
        this.previous = r;
      }
      computedFieldsCache = new Pe();
      modelExtensionsCache = new Pe();
      queryCallbacksCache = new Pe();
      clientExtensions = Lt(() => this.extension.client ? { ...this.previous?.getAllClientExtensions(), ...this.extension.client } : this.previous?.getAllClientExtensions());
      batchCallbacks = Lt(() => {
        let t = this.previous?.getAllBatchQueryCallbacks() ?? [], r = this.extension.query?.$__internalBatch;
        return r ? t.concat(r) : t;
      });
      getAllComputedFields(t) {
        return this.computedFieldsCache.getOrCreate(t, () => us(this.previous?.getAllComputedFields(t), this.extension, t));
      }
      getAllClientExtensions() {
        return this.clientExtensions.get();
      }
      getAllModelExtensions(t) {
        return this.modelExtensionsCache.getOrCreate(t, () => {
          let r = ve(t);
          return !this.extension.model || !(this.extension.model[r] || this.extension.model.$allModels) ? this.previous?.getAllModelExtensions(t) : { ...this.previous?.getAllModelExtensions(t), ...this.extension.model.$allModels, ...this.extension.model[r] };
        });
      }
      getAllQueryCallbacks(t, r) {
        return this.queryCallbacksCache.getOrCreate(`${t}:${r}`, () => {
          let n = this.previous?.getAllQueryCallbacks(t, r) ?? [], i = [], o = this.extension.query;
          return !o || !(o[t] || o.$allModels || o[r] || o.$allOperations) ? n : (o[t] !== void 0 && (o[t][r] !== void 0 && i.push(o[t][r]), o[t].$allOperations !== void 0 && i.push(o[t].$allOperations)), t !== "$none" && o.$allModels !== void 0 && (o.$allModels[r] !== void 0 && i.push(o.$allModels[r]), o.$allModels.$allOperations !== void 0 && i.push(o.$allModels.$allOperations)), o[r] !== void 0 && i.push(o[r]), o.$allOperations !== void 0 && i.push(o.$allOperations), n.concat(i));
        });
      }
      getAllBatchQueryCallbacks() {
        return this.batchCallbacks.get();
      }
    };
    var Et = class e {
      static {
        __name(this, "e");
      }
      constructor(t) {
        this.head = t;
      }
      static empty() {
        return new e();
      }
      static single(t) {
        return new e(new Vr(t));
      }
      isEmpty() {
        return this.head === void 0;
      }
      append(t) {
        return new e(new Vr(t, this.head));
      }
      getAllComputedFields(t) {
        return this.head?.getAllComputedFields(t);
      }
      getAllClientExtensions() {
        return this.head?.getAllClientExtensions();
      }
      getAllModelExtensions(t) {
        return this.head?.getAllModelExtensions(t);
      }
      getAllQueryCallbacks(t, r) {
        return this.head?.getAllQueryCallbacks(t, r) ?? [];
      }
      getAllBatchQueryCallbacks() {
        return this.head?.getAllBatchQueryCallbacks() ?? [];
      }
    };
    u();
    l();
    c();
    p();
    d();
    var Ur = class {
      static {
        __name(this, "Ur");
      }
      constructor(t) {
        this.name = t;
      }
    };
    function ps(e) {
      return e instanceof Ur;
    }
    __name(ps, "ps");
    function ds(e) {
      return new Ur(e);
    }
    __name(ds, "ds");
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    var ms = /* @__PURE__ */ Symbol();
    var zt = class {
      static {
        __name(this, "zt");
      }
      constructor(t) {
        if (t !== ms) throw new Error("Skip instance can not be constructed directly");
      }
      ifUndefined(t) {
        return t === void 0 ? qr : t;
      }
    };
    var qr = new zt(ms);
    function de(e) {
      return e instanceof zt;
    }
    __name(de, "de");
    var Hc = { findUnique: "findUnique", findUniqueOrThrow: "findUniqueOrThrow", findFirst: "findFirst", findFirstOrThrow: "findFirstOrThrow", findMany: "findMany", count: "aggregate", create: "createOne", createMany: "createMany", createManyAndReturn: "createManyAndReturn", update: "updateOne", updateMany: "updateMany", updateManyAndReturn: "updateManyAndReturn", upsert: "upsertOne", delete: "deleteOne", deleteMany: "deleteMany", executeRaw: "executeRaw", queryRaw: "queryRaw", aggregate: "aggregate", groupBy: "groupBy", runCommandRaw: "runCommandRaw", findRaw: "findRaw", aggregateRaw: "aggregateRaw" };
    var gs = "explicitly `undefined` values are not allowed";
    function Br({ modelName: e, action: t, args: r, runtimeDataModel: n, extensions: i = Et.empty(), callsite: o, clientMethod: s2, errorFormat: a, clientVersion: m, previewFeatures: f, globalOmit: T, wrapRawValues: S }) {
      let v = new Gn({ runtimeDataModel: n, modelName: e, action: t, rootArgs: r, callsite: o, extensions: i, selectionPath: [], argumentPath: [], originalMethod: s2, errorFormat: a, clientVersion: m, previewFeatures: f, globalOmit: T, wrapRawValues: S });
      return { modelName: e, action: Hc[t], query: Wt(r, v) };
    }
    __name(Br, "Br");
    function Wt({ select: e, include: t, ...r } = {}, n) {
      let i = r.omit;
      return delete r.omit, { arguments: hs(r, n), selection: Gc(e, t, i, n) };
    }
    __name(Wt, "Wt");
    function Gc(e, t, r, n) {
      return e ? (t ? n.throwValidationError({ kind: "MutuallyExclusiveFields", firstField: "include", secondField: "select", selectionPath: n.getSelectionPath() }) : r && n.throwValidationError({ kind: "MutuallyExclusiveFields", firstField: "omit", secondField: "select", selectionPath: n.getSelectionPath() }), Zc(e, n)) : zc(n, t, r);
    }
    __name(Gc, "Gc");
    function zc(e, t, r) {
      let n = {};
      return e.modelOrType && !e.isRawAction() && (n.$composites = true, n.$scalars = true), t && Wc(n, t, e), Kc(n, r, e), n;
    }
    __name(zc, "zc");
    function Wc(e, t, r) {
      for (let [n, i] of Object.entries(t)) {
        if (de(i)) continue;
        let o = r.nestSelection(n);
        if (zn(i, o), i === false || i === void 0) {
          e[n] = false;
          continue;
        }
        let s2 = r.findField(n);
        if (s2 && s2.kind !== "object" && r.throwValidationError({ kind: "IncludeOnScalar", selectionPath: r.getSelectionPath().concat(n), outputType: r.getOutputTypeDescription() }), s2) {
          e[n] = Wt(i === true ? {} : i, o);
          continue;
        }
        if (i === true) {
          e[n] = true;
          continue;
        }
        e[n] = Wt(i, o);
      }
    }
    __name(Wc, "Wc");
    function Kc(e, t, r) {
      let n = r.getComputedFields(), i = { ...r.getGlobalOmit(), ...t }, o = cs(i, n);
      for (let [s2, a] of Object.entries(o)) {
        if (de(a)) continue;
        zn(a, r.nestSelection(s2));
        let m = r.findField(s2);
        n?.[s2] && !m || (e[s2] = !a);
      }
    }
    __name(Kc, "Kc");
    function Zc(e, t) {
      let r = {}, n = t.getComputedFields(), i = ls(e, n);
      for (let [o, s2] of Object.entries(i)) {
        if (de(s2)) continue;
        let a = t.nestSelection(o);
        zn(s2, a);
        let m = t.findField(o);
        if (!(n?.[o] && !m)) {
          if (s2 === false || s2 === void 0 || de(s2)) {
            r[o] = false;
            continue;
          }
          if (s2 === true) {
            m?.kind === "object" ? r[o] = Wt({}, a) : r[o] = true;
            continue;
          }
          r[o] = Wt(s2, a);
        }
      }
      return r;
    }
    __name(Zc, "Zc");
    function ys(e, t) {
      if (e === null) return null;
      if (typeof e == "string" || typeof e == "number" || typeof e == "boolean") return e;
      if (typeof e == "bigint") return { $type: "BigInt", value: String(e) };
      if (dt(e)) {
        if (Ir(e)) return { $type: "DateTime", value: e.toISOString() };
        t.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: t.getSelectionPath(), argumentPath: t.getArgumentPath(), argument: { name: t.getArgumentName(), typeNames: ["Date"] }, underlyingError: "Provided Date object is invalid" });
      }
      if (ps(e)) return { $type: "Param", value: e.name };
      if (bt(e)) return { $type: "FieldRef", value: { _ref: e.name, _container: e.modelName } };
      if (Array.isArray(e)) return Yc(e, t);
      if (ArrayBuffer.isView(e)) {
        let { buffer: r, byteOffset: n, byteLength: i } = e;
        return { $type: "Bytes", value: g.from(r, n, i).toString("base64") };
      }
      if (Xc(e)) return e.values;
      if (mt(e)) return { $type: "Decimal", value: e.toFixed() };
      if ((0, fs.isObjectEnumValue)(e)) {
        let r = e._getName();
        if (r !== "DbNull" && r !== "JsonNull" && r !== "AnyNull") throw new Error(`Invalid ObjectEnumValue: expected DbNull, JsonNull, or AnyNull, got ${r}`);
        return { $type: "Enum", value: r };
      }
      if (ep(e)) return e.toJSON();
      if (typeof e == "object") return hs(e, t);
      t.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: t.getSelectionPath(), argumentPath: t.getArgumentPath(), argument: { name: t.getArgumentName(), typeNames: [] }, underlyingError: `We could not serialize ${Object.prototype.toString.call(e)} value. Serialize the object to JSON or implement a ".toJSON()" method on it` });
    }
    __name(ys, "ys");
    function hs(e, t) {
      if (t.shouldWrapRawValues() && e.$type) return { $type: "Raw", value: e };
      let r = {};
      for (let n in e) {
        let i = e[n], o = t.nestArgument(n);
        de(i) || (i !== void 0 ? r[n] = ys(i, o) : t.isPreviewFeatureOn("strictUndefinedChecks") && t.throwValidationError({ kind: "InvalidArgumentValue", argumentPath: o.getArgumentPath(), selectionPath: t.getSelectionPath(), argument: { name: t.getArgumentName(), typeNames: [] }, underlyingError: gs }));
      }
      return r;
    }
    __name(hs, "hs");
    function Yc(e, t) {
      let r = [];
      for (let n = 0; n < e.length; n++) {
        let i = t.nestArgument(String(n)), o = e[n];
        if (o === void 0 || de(o)) {
          let s2 = o === void 0 ? "undefined" : "Prisma.skip";
          t.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: i.getSelectionPath(), argumentPath: i.getArgumentPath(), argument: { name: `${t.getArgumentName()}[${n}]`, typeNames: [] }, underlyingError: `Can not use \`${s2}\` value within array. Use \`null\` or filter out \`${s2}\` values` });
        }
        r.push(ys(o, i));
      }
      return r;
    }
    __name(Yc, "Yc");
    function Xc(e) {
      return typeof e == "object" && e !== null && e.__prismaRawParameters__ === true;
    }
    __name(Xc, "Xc");
    function ep(e) {
      return typeof e == "object" && e !== null && typeof e.toJSON == "function";
    }
    __name(ep, "ep");
    function zn(e, t) {
      e === void 0 && t.isPreviewFeatureOn("strictUndefinedChecks") && t.throwValidationError({ kind: "InvalidSelectionValue", selectionPath: t.getSelectionPath(), underlyingError: gs });
    }
    __name(zn, "zn");
    var Gn = class e {
      static {
        __name(this, "e");
      }
      constructor(t) {
        this.params = t;
        this.params.modelName && (this.modelOrType = this.params.runtimeDataModel.models[this.params.modelName] ?? this.params.runtimeDataModel.types[this.params.modelName]);
      }
      modelOrType;
      throwValidationError(t) {
        $r({ errors: [t], originalMethod: this.params.originalMethod, args: this.params.rootArgs ?? {}, callsite: this.params.callsite, errorFormat: this.params.errorFormat, clientVersion: this.params.clientVersion, globalOmit: this.params.globalOmit });
      }
      getSelectionPath() {
        return this.params.selectionPath;
      }
      getArgumentPath() {
        return this.params.argumentPath;
      }
      getArgumentName() {
        return this.params.argumentPath[this.params.argumentPath.length - 1];
      }
      getOutputTypeDescription() {
        if (!(!this.params.modelName || !this.modelOrType)) return { name: this.params.modelName, fields: this.modelOrType.fields.map((t) => ({ name: t.name, typeName: "boolean", isRelation: t.kind === "object" })) };
      }
      isRawAction() {
        return ["executeRaw", "queryRaw", "runCommandRaw", "findRaw", "aggregateRaw"].includes(this.params.action);
      }
      isPreviewFeatureOn(t) {
        return this.params.previewFeatures.includes(t);
      }
      shouldWrapRawValues() {
        return this.params.wrapRawValues ?? true;
      }
      getComputedFields() {
        if (this.params.modelName) return this.params.extensions.getAllComputedFields(this.params.modelName);
      }
      findField(t) {
        return this.modelOrType?.fields.find((r) => r.name === t);
      }
      nestSelection(t) {
        let r = this.findField(t), n = r?.kind === "object" ? r.type : void 0;
        return new e({ ...this.params, modelName: n, selectionPath: this.params.selectionPath.concat(t) });
      }
      getGlobalOmit() {
        return this.params.modelName && this.shouldApplyGlobalOmit() ? this.params.globalOmit?.[Fe(this.params.modelName)] ?? {} : {};
      }
      shouldApplyGlobalOmit() {
        switch (this.params.action) {
          case "findFirst":
          case "findFirstOrThrow":
          case "findUniqueOrThrow":
          case "findMany":
          case "upsert":
          case "findUnique":
          case "createManyAndReturn":
          case "create":
          case "update":
          case "updateManyAndReturn":
          case "delete":
            return true;
          case "executeRaw":
          case "aggregateRaw":
          case "runCommandRaw":
          case "findRaw":
          case "createMany":
          case "deleteMany":
          case "groupBy":
          case "updateMany":
          case "count":
          case "aggregate":
          case "queryRaw":
            return false;
          default:
            Ne(this.params.action, "Unknown action");
        }
      }
      nestArgument(t) {
        return new e({ ...this.params, argumentPath: this.params.argumentPath.concat(t) });
      }
    };
    u();
    l();
    c();
    p();
    d();
    function ws(e, t) {
      let r = Lt(() => tp(t));
      Object.defineProperty(e, "dmmf", { get: /* @__PURE__ */ __name(() => r.get(), "get") });
    }
    __name(ws, "ws");
    function tp(e) {
      throw new Error("Prisma.dmmf is not available when running in edge runtimes.");
    }
    __name(tp, "tp");
    u();
    l();
    c();
    p();
    d();
    var Kn = /* @__PURE__ */ new WeakMap();
    var jr = "$$PrismaTypedSql";
    var Kt = class {
      static {
        __name(this, "Kt");
      }
      constructor(t, r) {
        Kn.set(this, { sql: t, values: r }), Object.defineProperty(this, jr, { value: jr });
      }
      get sql() {
        return Kn.get(this).sql;
      }
      get values() {
        return Kn.get(this).values;
      }
    };
    function bs(e) {
      return (...t) => new Kt(e, t);
    }
    __name(bs, "bs");
    function Qr(e) {
      return e != null && e[jr] === jr;
    }
    __name(Qr, "Qr");
    u();
    l();
    c();
    p();
    d();
    var Nl = require_dist2();
    u();
    l();
    c();
    p();
    d();
    xs();
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    function Zt(e) {
      return { getKeys() {
        return Object.keys(e);
      }, getPropertyValue(t) {
        return e[t];
      } };
    }
    __name(Zt, "Zt");
    u();
    l();
    c();
    p();
    d();
    function ie(e, t) {
      return { getKeys() {
        return [e];
      }, getPropertyValue() {
        return t();
      } };
    }
    __name(ie, "ie");
    u();
    l();
    c();
    p();
    d();
    function Ke(e) {
      let t = new Pe();
      return { getKeys() {
        return e.getKeys();
      }, getPropertyValue(r) {
        return t.getOrCreate(r, () => e.getPropertyValue(r));
      }, getPropertyDescriptor(r) {
        return e.getPropertyDescriptor?.(r);
      } };
    }
    __name(Ke, "Ke");
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    var Hr = { enumerable: true, configurable: true, writable: true };
    function Gr(e) {
      let t = new Set(e);
      return { getPrototypeOf: /* @__PURE__ */ __name(() => Object.prototype, "getPrototypeOf"), getOwnPropertyDescriptor: /* @__PURE__ */ __name(() => Hr, "getOwnPropertyDescriptor"), has: /* @__PURE__ */ __name((r, n) => t.has(n), "has"), set: /* @__PURE__ */ __name((r, n, i) => t.add(n) && Reflect.set(r, n, i), "set"), ownKeys: /* @__PURE__ */ __name(() => [...t], "ownKeys") };
    }
    __name(Gr, "Gr");
    var Es = /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom");
    function ye(e, t) {
      let r = rp(t), n = /* @__PURE__ */ new Set(), i = new Proxy(e, { get(o, s2) {
        if (n.has(s2)) return o[s2];
        let a = r.get(s2);
        return a ? a.getPropertyValue(s2) : o[s2];
      }, has(o, s2) {
        if (n.has(s2)) return true;
        let a = r.get(s2);
        return a ? a.has?.(s2) ?? true : Reflect.has(o, s2);
      }, ownKeys(o) {
        let s2 = Ts(Reflect.ownKeys(o), r), a = Ts(Array.from(r.keys()), r);
        return [.../* @__PURE__ */ new Set([...s2, ...a, ...n])];
      }, set(o, s2, a) {
        return r.get(s2)?.getPropertyDescriptor?.(s2)?.writable === false ? false : (n.add(s2), Reflect.set(o, s2, a));
      }, getOwnPropertyDescriptor(o, s2) {
        let a = Reflect.getOwnPropertyDescriptor(o, s2);
        if (a && !a.configurable) return a;
        let m = r.get(s2);
        return m ? m.getPropertyDescriptor ? { ...Hr, ...m?.getPropertyDescriptor(s2) } : Hr : a;
      }, defineProperty(o, s2, a) {
        return n.add(s2), Reflect.defineProperty(o, s2, a);
      }, getPrototypeOf: /* @__PURE__ */ __name(() => Object.prototype, "getPrototypeOf") });
      return i[Es] = function() {
        let o = { ...this };
        return delete o[Es], o;
      }, i;
    }
    __name(ye, "ye");
    function rp(e) {
      let t = /* @__PURE__ */ new Map();
      for (let r of e) {
        let n = r.getKeys();
        for (let i of n) t.set(i, r);
      }
      return t;
    }
    __name(rp, "rp");
    function Ts(e, t) {
      return e.filter((r) => t.get(r)?.has?.(r) ?? true);
    }
    __name(Ts, "Ts");
    u();
    l();
    c();
    p();
    d();
    function Tt(e) {
      return { getKeys() {
        return e;
      }, has() {
        return false;
      }, getPropertyValue() {
      } };
    }
    __name(Tt, "Tt");
    u();
    l();
    c();
    p();
    d();
    function Ps(e) {
      if (e === void 0) return "";
      let t = xt(e);
      return new ft(0, { colors: Mr }).write(t).toString();
    }
    __name(Ps, "Ps");
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    var Zn = class {
      static {
        __name(this, "Zn");
      }
      getLocation() {
        return null;
      }
    };
    function Ve(e) {
      return typeof $EnabledCallSite == "function" && e !== "minimal" ? new $EnabledCallSite() : new Zn();
    }
    __name(Ve, "Ve");
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    var Ss = { _avg: true, _count: true, _sum: true, _min: true, _max: true };
    function Pt(e = {}) {
      let t = ip(e);
      return Object.entries(t).reduce((n, [i, o]) => (Ss[i] !== void 0 ? n.select[i] = { select: o } : n[i] = o, n), { select: {} });
    }
    __name(Pt, "Pt");
    function ip(e = {}) {
      return typeof e._count == "boolean" ? { ...e, _count: { _all: e._count } } : e;
    }
    __name(ip, "ip");
    function zr(e = {}) {
      return (t) => (typeof e._count == "boolean" && (t._count = t._count._all), t);
    }
    __name(zr, "zr");
    function vs(e, t) {
      let r = zr(e);
      return t({ action: "aggregate", unpacker: r, argsMapper: Pt })(e);
    }
    __name(vs, "vs");
    u();
    l();
    c();
    p();
    d();
    function op(e = {}) {
      let { select: t, ...r } = e;
      return typeof t == "object" ? Pt({ ...r, _count: t }) : Pt({ ...r, _count: { _all: true } });
    }
    __name(op, "op");
    function sp(e = {}) {
      return typeof e.select == "object" ? (t) => zr(e)(t)._count : (t) => zr(e)(t)._count._all;
    }
    __name(sp, "sp");
    function As(e, t) {
      return t({ action: "count", unpacker: sp(e), argsMapper: op })(e);
    }
    __name(As, "As");
    u();
    l();
    c();
    p();
    d();
    function ap(e = {}) {
      let t = Pt(e);
      if (Array.isArray(t.by)) for (let r of t.by) typeof r == "string" && (t.select[r] = true);
      else typeof t.by == "string" && (t.select[t.by] = true);
      return t;
    }
    __name(ap, "ap");
    function up(e = {}) {
      return (t) => (typeof e?._count == "boolean" && t.forEach((r) => {
        r._count = r._count._all;
      }), t);
    }
    __name(up, "up");
    function Cs(e, t) {
      return t({ action: "groupBy", unpacker: up(e), argsMapper: ap })(e);
    }
    __name(Cs, "Cs");
    function Rs(e, t, r) {
      if (t === "aggregate") return (n) => vs(n, r);
      if (t === "count") return (n) => As(n, r);
      if (t === "groupBy") return (n) => Cs(n, r);
    }
    __name(Rs, "Rs");
    u();
    l();
    c();
    p();
    d();
    function Is(e, t) {
      let r = t.fields.filter((i) => !i.relationName), n = go(r, "name");
      return new Proxy({}, { get(i, o) {
        if (o in i || typeof o == "symbol") return i[o];
        let s2 = n[o];
        if (s2) return new Gt(e, o, s2.type, s2.isList, s2.kind === "enum");
      }, ...Gr(Object.keys(n)) });
    }
    __name(Is, "Is");
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    var ks = /* @__PURE__ */ __name((e) => Array.isArray(e) ? e : e.split("."), "ks");
    var Yn = /* @__PURE__ */ __name((e, t) => ks(t).reduce((r, n) => r && r[n], e), "Yn");
    var Os = /* @__PURE__ */ __name((e, t, r) => ks(t).reduceRight((n, i, o, s2) => Object.assign({}, Yn(e, s2.slice(0, o)), { [i]: n }), r), "Os");
    function lp(e, t) {
      return e === void 0 || t === void 0 ? [] : [...t, "select", e];
    }
    __name(lp, "lp");
    function cp(e, t, r) {
      return t === void 0 ? e ?? {} : Os(t, r, e || true);
    }
    __name(cp, "cp");
    function Xn(e, t, r, n, i, o) {
      let a = e._runtimeDataModel.models[t].fields.reduce((m, f) => ({ ...m, [f.name]: f }), {});
      return (m) => {
        let f = Ve(e._errorFormat), T = lp(n, i), S = cp(m, o, T), v = r({ dataPath: T, callsite: f })(S), A = pp(e, t);
        return new Proxy(v, { get(N, R) {
          if (!A.includes(R)) return N[R];
          let J = [a[R].type, r, R], j = [T, S];
          return Xn(e, ...J, ...j);
        }, ...Gr([...A, ...Object.getOwnPropertyNames(v)]) });
      };
    }
    __name(Xn, "Xn");
    function pp(e, t) {
      return e._runtimeDataModel.models[t].fields.filter((r) => r.kind === "object").map((r) => r.name);
    }
    __name(pp, "pp");
    var dp = ["findUnique", "findUniqueOrThrow", "findFirst", "findFirstOrThrow", "create", "update", "upsert", "delete"];
    var mp = ["aggregate", "count", "groupBy"];
    function ei(e, t) {
      let r = e._extensions.getAllModelExtensions(t) ?? {}, n = [fp(e, t), yp(e, t), Zt(r), ie("name", () => t), ie("$name", () => t), ie("$parent", () => e._appliedParent)];
      return ye({}, n);
    }
    __name(ei, "ei");
    function fp(e, t) {
      let r = ve(t), n = Object.keys(jt).concat("count");
      return { getKeys() {
        return n;
      }, getPropertyValue(i) {
        let o = i, s2 = /* @__PURE__ */ __name((a) => (m) => {
          let f = Ve(e._errorFormat);
          return e._createPrismaPromise((T) => {
            let S = { args: m, dataPath: [], action: o, model: t, clientMethod: `${r}.${i}`, jsModelName: r, transaction: T, callsite: f };
            return e._request({ ...S, ...a });
          }, { action: o, args: m, model: t });
        }, "s");
        return dp.includes(o) ? Xn(e, t, s2) : gp(i) ? Rs(e, i, s2) : s2({});
      } };
    }
    __name(fp, "fp");
    function gp(e) {
      return mp.includes(e);
    }
    __name(gp, "gp");
    function yp(e, t) {
      return Ke(ie("fields", () => {
        let r = e._runtimeDataModel.models[t];
        return Is(t, r);
      }));
    }
    __name(yp, "yp");
    u();
    l();
    c();
    p();
    d();
    function Ns(e) {
      return e.replace(/^./, (t) => t.toUpperCase());
    }
    __name(Ns, "Ns");
    var ti = /* @__PURE__ */ Symbol();
    function Yt(e) {
      let t = [hp(e), wp(e), ie(ti, () => e), ie("$parent", () => e._appliedParent)], r = e._extensions.getAllClientExtensions();
      return r && t.push(Zt(r)), ye(e, t);
    }
    __name(Yt, "Yt");
    function hp(e) {
      let t = Object.getPrototypeOf(e._originalClient), r = [...new Set(Object.getOwnPropertyNames(t))];
      return { getKeys() {
        return r;
      }, getPropertyValue(n) {
        return e[n];
      } };
    }
    __name(hp, "hp");
    function wp(e) {
      let t = Object.keys(e._runtimeDataModel.models), r = t.map(ve), n = [...new Set(t.concat(r))];
      return Ke({ getKeys() {
        return n;
      }, getPropertyValue(i) {
        let o = Ns(i);
        if (e._runtimeDataModel.models[o] !== void 0) return ei(e, o);
        if (e._runtimeDataModel.models[i] !== void 0) return ei(e, i);
      }, getPropertyDescriptor(i) {
        if (!r.includes(i)) return { enumerable: false };
      } });
    }
    __name(wp, "wp");
    function Ds(e) {
      return e[ti] ? e[ti] : e;
    }
    __name(Ds, "Ds");
    function Ms(e) {
      if (typeof e == "function") return e(this);
      let t = Object.create(this._originalClient, { _extensions: { value: this._extensions.append(e) }, _appliedParent: { value: this, configurable: true }, $on: { value: void 0 } });
      return Yt(t);
    }
    __name(Ms, "Ms");
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    function Ls({ result: e, modelName: t, select: r, omit: n, extensions: i }) {
      let o = i.getAllComputedFields(t);
      if (!o) return e;
      let s2 = [], a = [];
      for (let m of Object.values(o)) {
        if (n) {
          if (n[m.name]) continue;
          let f = m.needs.filter((T) => n[T]);
          f.length > 0 && a.push(Tt(f));
        } else if (r) {
          if (!r[m.name]) continue;
          let f = m.needs.filter((T) => !r[T]);
          f.length > 0 && a.push(Tt(f));
        }
        bp(e, m.needs) && s2.push(xp(m, ye(e, s2)));
      }
      return s2.length > 0 || a.length > 0 ? ye(e, [...s2, ...a]) : e;
    }
    __name(Ls, "Ls");
    function bp(e, t) {
      return t.every((r) => qn(e, r));
    }
    __name(bp, "bp");
    function xp(e, t) {
      return Ke(ie(e.name, () => e.compute(t)));
    }
    __name(xp, "xp");
    u();
    l();
    c();
    p();
    d();
    function Wr({ visitor: e, result: t, args: r, runtimeDataModel: n, modelName: i }) {
      if (Array.isArray(t)) {
        for (let s2 = 0; s2 < t.length; s2++) t[s2] = Wr({ result: t[s2], args: r, modelName: i, runtimeDataModel: n, visitor: e });
        return t;
      }
      let o = e(t, i, r) ?? t;
      return r.include && _s({ includeOrSelect: r.include, result: o, parentModelName: i, runtimeDataModel: n, visitor: e }), r.select && _s({ includeOrSelect: r.select, result: o, parentModelName: i, runtimeDataModel: n, visitor: e }), o;
    }
    __name(Wr, "Wr");
    function _s({ includeOrSelect: e, result: t, parentModelName: r, runtimeDataModel: n, visitor: i }) {
      for (let [o, s2] of Object.entries(e)) {
        if (!s2 || t[o] == null || de(s2)) continue;
        let m = n.models[r].fields.find((T) => T.name === o);
        if (!m || m.kind !== "object" || !m.relationName) continue;
        let f = typeof s2 == "object" ? s2 : {};
        t[o] = Wr({ visitor: i, result: t[o], args: f, modelName: m.type, runtimeDataModel: n });
      }
    }
    __name(_s, "_s");
    function Fs({ result: e, modelName: t, args: r, extensions: n, runtimeDataModel: i, globalOmit: o }) {
      return n.isEmpty() || e == null || typeof e != "object" || !i.models[t] ? e : Wr({ result: e, args: r ?? {}, modelName: t, runtimeDataModel: i, visitor: /* @__PURE__ */ __name((a, m, f) => {
        let T = ve(m);
        return Ls({ result: a, modelName: T, select: f.select, omit: f.select ? void 0 : { ...o?.[T], ...f.omit }, extensions: n });
      }, "visitor") });
    }
    __name(Fs, "Fs");
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    var Ze = require_dist2();
    u();
    l();
    c();
    p();
    d();
    var Ep = ["$connect", "$disconnect", "$on", "$use", "$extends"];
    var $s = Ep;
    function Vs(e) {
      if (e instanceof Ze.Sql) return Tp(e);
      if (Qr(e)) return Pp(e);
      if (Array.isArray(e)) {
        let r = [e[0]];
        for (let n = 1; n < e.length; n++) r[n] = Xt(e[n]);
        return r;
      }
      let t = {};
      for (let r in e) t[r] = Xt(e[r]);
      return t;
    }
    __name(Vs, "Vs");
    function Tp(e) {
      return new Ze.Sql(e.strings, e.values);
    }
    __name(Tp, "Tp");
    function Pp(e) {
      return new Kt(e.sql, e.values);
    }
    __name(Pp, "Pp");
    function Xt(e) {
      if (typeof e != "object" || e == null || (0, Ze.isObjectEnumValue)(e) || bt(e) || de(e)) return e;
      if (mt(e)) return new Ze.Decimal(e.toFixed());
      if (dt(e)) return /* @__PURE__ */ new Date(+e);
      if (ArrayBuffer.isView(e)) return e.slice(0);
      if (Array.isArray(e)) {
        let t = e.length, r;
        for (r = Array(t); t--; ) r[t] = Xt(e[t]);
        return r;
      }
      if (typeof e == "object") {
        let t = {};
        for (let r in e) r === "__proto__" ? Object.defineProperty(t, r, { value: Xt(e[r]), configurable: true, enumerable: true, writable: true }) : t[r] = Xt(e[r]);
        return t;
      }
      Ne(e, "Unknown value");
    }
    __name(Xt, "Xt");
    function qs(e, t, r, n = 0) {
      return e._createPrismaPromise((i) => {
        let o = t.customDataProxyFetch;
        return "transaction" in t && i !== void 0 && (t.transaction?.kind === "batch" && t.transaction.lock.then(), t.transaction = i), n === r.length ? e._executeRequest(t) : r[n]({ model: t.model, operation: t.model ? t.action : t.clientMethod, args: Vs(t.args ?? {}), __internalParams: t, query: /* @__PURE__ */ __name((s2, a = t) => {
          let m = a.customDataProxyFetch;
          return a.customDataProxyFetch = Js(o, m), a.args = s2, qs(e, a, r, n + 1);
        }, "query") });
      });
    }
    __name(qs, "qs");
    function Bs(e, t) {
      let { jsModelName: r, action: n, clientMethod: i } = t, o = r ? n : i;
      if (e._extensions.isEmpty()) return e._executeRequest(t);
      let s2 = e._extensions.getAllQueryCallbacks(r ?? "$none", o);
      return qs(e, t, s2);
    }
    __name(Bs, "Bs");
    function js(e) {
      return (t) => {
        let r = { requests: t }, n = t[0].extensions.getAllBatchQueryCallbacks();
        return n.length ? Qs(r, n, 0, e) : e(r);
      };
    }
    __name(js, "js");
    function Qs(e, t, r, n) {
      if (r === t.length) return n(e);
      let i = e.customDataProxyFetch, o = e.requests[0].transaction;
      return t[r]({ args: { queries: e.requests.map((s2) => ({ model: s2.modelName, operation: s2.action, args: s2.args })), transaction: o ? { isolationLevel: o.kind === "batch" ? o.isolationLevel : void 0 } : void 0 }, __internalParams: e, query(s2, a = e) {
        let m = a.customDataProxyFetch;
        return a.customDataProxyFetch = Js(i, m), Qs(a, t, r + 1, n);
      } });
    }
    __name(Qs, "Qs");
    var Us = /* @__PURE__ */ __name((e) => e, "Us");
    function Js(e = Us, t = Us) {
      return (r) => e(t(r));
    }
    __name(Js, "Js");
    u();
    l();
    c();
    p();
    d();
    function Gs({ dataPath: e, modelName: t, args: r, runtimeDataModel: n }) {
      let i = { modelName: t, args: r ?? {} }, o = Sp(e);
      if (!o || o.length === 0) return i;
      let s2 = t, a = r ?? {};
      for (let m of o) {
        let f = n.models[s2];
        if (!f) return i;
        let T = f.fields.find((S) => S.name === m);
        if (!T) throw new Error(`Could not resolve relation field "${m}" on model "${s2}" from dataPath "${e.join(".")}"`);
        if (T.kind !== "object" || !T.relationName) return i;
        s2 = T.type, a = vp(a, m);
      }
      return { modelName: s2, args: a };
    }
    __name(Gs, "Gs");
    function Sp(e) {
      let t = [];
      for (let r = 0; r < e.length; r += 2) {
        let n = e[r], i = e[r + 1];
        if (n !== "select" && n !== "include" || i === void 0) return;
        t.push(i);
      }
      return t;
    }
    __name(Sp, "Sp");
    function vp(e, t) {
      let r = e.select?.[t];
      if (Hs(r)) return r;
      let n = e.include?.[t];
      return Hs(n) ? n : {};
    }
    __name(vp, "vp");
    function Hs(e) {
      return !!e && typeof e == "object" && !Array.isArray(e);
    }
    __name(Hs, "Hs");
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    var Xs = require_dist2();
    u();
    l();
    c();
    p();
    d();
    var er = require_dist2();
    function L2(e, t) {
      throw new Error(t);
    }
    __name(L2, "L");
    function ri(e, t) {
      return e === t || e !== null && t !== null && typeof e == "object" && typeof t == "object" && Object.keys(e).length === Object.keys(t).length && Object.keys(e).every((r) => ri(e[r], t[r]));
    }
    __name(ri, "ri");
    function St(e, t) {
      let r = Object.keys(e), n = Object.keys(t);
      return (r.length < n.length ? r : n).every((o) => {
        if (typeof e[o] == typeof t[o] && typeof e[o] != "object") return e[o] === t[o];
        if (er.Decimal.isDecimal(e[o]) || er.Decimal.isDecimal(t[o])) {
          let s2 = zs(e[o]), a = zs(t[o]);
          return s2 && a && s2.equals(a);
        } else if (e[o] instanceof Uint8Array || t[o] instanceof Uint8Array) {
          let s2 = Ws(e[o]), a = Ws(t[o]);
          return s2 && a && s2.equals(a);
        } else {
          if (e[o] instanceof Date || t[o] instanceof Date) return Ks(e[o])?.getTime() === Ks(t[o])?.getTime();
          if (typeof e[o] == "bigint" || typeof t[o] == "bigint") return Zs(e[o]) === Zs(t[o]);
          if (typeof e[o] == "number" || typeof t[o] == "number") return Ys(e[o]) === Ys(t[o]);
        }
        return ri(e[o], t[o]);
      });
    }
    __name(St, "St");
    function zs(e) {
      return er.Decimal.isDecimal(e) ? e : typeof e == "number" || typeof e == "string" ? new er.Decimal(e) : void 0;
    }
    __name(zs, "zs");
    function Ws(e) {
      return g.isBuffer(e) ? e : e instanceof Uint8Array ? g.from(e.buffer, e.byteOffset, e.byteLength) : typeof e == "string" ? g.from(e, "base64") : void 0;
    }
    __name(Ws, "Ws");
    function Ks(e) {
      return e instanceof Date ? e : typeof e == "string" || typeof e == "number" ? new Date(e) : void 0;
    }
    __name(Ks, "Ks");
    function Zs(e) {
      return typeof e == "bigint" ? e : typeof e == "number" || typeof e == "string" ? BigInt(e) : void 0;
    }
    __name(Zs, "Zs");
    function Ys(e) {
      return typeof e == "number" ? e : typeof e == "string" ? Number(e) : void 0;
    }
    __name(Ys, "Ys");
    function he(e) {
      return JSON.stringify(e, (t, r) => typeof r == "bigint" ? r.toString() : ArrayBuffer.isView(r) ? g.from(r.buffer, r.byteOffset, r.byteLength).toString("base64") : r);
    }
    __name(he, "he");
    function Ap(e) {
      return e !== null && typeof e == "object" && typeof e.$type == "string";
    }
    __name(Ap, "Ap");
    function Cp(e, t) {
      let r = {};
      for (let n of Object.keys(e)) r[n] = t(e[n], n);
      return r;
    }
    __name(Cp, "Cp");
    function we(e) {
      return e === null ? e : Array.isArray(e) ? e.map(we) : typeof e == "object" ? Ap(e) ? Rp(e) : e.constructor !== null && e.constructor.name !== "Object" ? e : Cp(e, we) : e;
    }
    __name(we, "we");
    function Rp({ $type: e, value: t }) {
      switch (e) {
        case "BigInt":
          return BigInt(t);
        case "Bytes": {
          let { buffer: r, byteOffset: n, byteLength: i } = g.from(t, "base64");
          return new Uint8Array(r, n, i);
        }
        case "DateTime":
          return new Date(t);
        case "Decimal":
          return new Xs.Decimal(t);
        case "Json":
          return JSON.parse(t);
        case "Raw":
          return t;
        case "FieldRef":
          throw new Error("FieldRef tagged values cannot be deserialized to JavaScript values");
        case "Enum":
          return t;
        default:
          L2(t, "Unknown tagged value");
      }
    }
    __name(Rp, "Rp");
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    function Kr(e) {
      return e.name === "DriverAdapterError" && typeof e.cause == "object";
    }
    __name(Kr, "Kr");
    u();
    l();
    c();
    p();
    d();
    var k = { Int32: 0, Int64: 1, Float: 2, Double: 3, Numeric: 4, Boolean: 5, Character: 6, Text: 7, Date: 8, Time: 9, DateTime: 10, Json: 11, Enum: 12, Bytes: 13, Set: 14, Uuid: 15, Int32Array: 64, Int64Array: 65, FloatArray: 66, DoubleArray: 67, NumericArray: 68, BooleanArray: 69, CharacterArray: 70, TextArray: 71, DateArray: 72, TimeArray: 73, DateTimeArray: 74, JsonArray: 75, EnumArray: 76, BytesArray: 77, UuidArray: 78, UnknownNumber: 128 };
    var X = class extends Error {
      static {
        __name(this, "X");
      }
      name = "UserFacingError";
      code;
      meta;
      constructor(t, r, n) {
        super(t), this.code = r, this.meta = n ?? {};
      }
      toQueryResponseErrorObject() {
        return { error: this.message, user_facing_error: { is_panic: false, message: this.message, meta: this.meta, error_code: this.code } };
      }
    };
    function vt(e) {
      if (!Kr(e)) throw e;
      let t = Ip(e), r = ea(e);
      throw !t || !r ? e : new X(r, t, { driverAdapterError: e });
    }
    __name(vt, "vt");
    function ii(e) {
      throw Kr(e) ? new X(`Raw query failed. Code: \`${e.cause.originalCode ?? "N/A"}\`. Message: \`${e.cause.originalMessage ?? ea(e)}\``, "P2010", { driverAdapterError: e }) : e;
    }
    __name(ii, "ii");
    function Ip(e) {
      switch (e.cause.kind) {
        case "AuthenticationFailed":
          return "P1000";
        case "DatabaseNotReachable":
          return "P1001";
        case "DatabaseDoesNotExist":
          return "P1003";
        case "SocketTimeout":
          return "P1008";
        case "DatabaseAlreadyExists":
          return "P1009";
        case "DatabaseAccessDenied":
          return "P1010";
        case "TlsConnectionError":
          return "P1011";
        case "ConnectionClosed":
          return "P1017";
        case "TransactionAlreadyClosed":
          return "P1018";
        case "LengthMismatch":
          return "P2000";
        case "UniqueConstraintViolation":
          return "P2002";
        case "ForeignKeyConstraintViolation":
          return "P2003";
        case "InvalidInputValue":
          return "P2007";
        case "UnsupportedNativeDataType":
          return "P2010";
        case "NullConstraintViolation":
          return "P2011";
        case "ValueOutOfRange":
          return "P2020";
        case "TableDoesNotExist":
          return "P2021";
        case "ColumnNotFound":
          return "P2022";
        case "InvalidIsolationLevel":
        case "InconsistentColumnData":
          return "P2023";
        case "MissingFullTextSearchIndex":
          return "P2030";
        case "TransactionWriteConflict":
          return "P2034";
        case "GenericJs":
          return "P2036";
        case "TooManyConnections":
          return "P2037";
        case "postgres":
        case "sqlite":
        case "mysql":
        case "mssql":
          return;
        default:
          L2(e.cause, `Unknown error: ${he(e.cause)}`);
      }
    }
    __name(Ip, "Ip");
    function ea(e) {
      switch (e.cause.kind) {
        case "AuthenticationFailed":
          return `Authentication failed against the database server, the provided database credentials for \`${e.cause.user ?? "(not available)"}\` are not valid`;
        case "DatabaseNotReachable": {
          let t = e.cause.host && e.cause.port ? `${e.cause.host}:${e.cause.port}` : e.cause.host;
          return `Can't reach database server${t ? ` at ${t}` : ""}`;
        }
        case "DatabaseDoesNotExist":
          return `Database \`${e.cause.db ?? "(not available)"}\` does not exist on the database server`;
        case "SocketTimeout":
          return "Operation has timed out";
        case "DatabaseAlreadyExists":
          return `Database \`${e.cause.db ?? "(not available)"}\` already exists on the database server`;
        case "DatabaseAccessDenied":
          return `User was denied access on the database \`${e.cause.db ?? "(not available)"}\``;
        case "TlsConnectionError":
          return `Error opening a TLS connection: ${e.cause.reason}`;
        case "ConnectionClosed":
          return "Server has closed the connection.";
        case "TransactionAlreadyClosed":
          return e.cause.cause;
        case "LengthMismatch":
          return `The provided value for the column is too long for the column's type. Column: ${e.cause.column ?? "(not available)"}`;
        case "UniqueConstraintViolation":
          return `Unique constraint failed on the ${ni(e.cause.constraint)}`;
        case "ForeignKeyConstraintViolation":
          return `Foreign key constraint violated on the ${ni(e.cause.constraint)}`;
        case "UnsupportedNativeDataType":
          return `Failed to deserialize column of type '${e.cause.type}'. If you're using $queryRaw and this column is explicitly marked as \`Unsupported\` in your Prisma schema, try casting this column to any supported Prisma type such as \`String\`.`;
        case "NullConstraintViolation":
          return `Null constraint violation on the ${ni(e.cause.constraint)}`;
        case "ValueOutOfRange":
          return `Value out of range for the type: ${e.cause.cause}`;
        case "TableDoesNotExist":
          return `The table \`${e.cause.table ?? "(not available)"}\` does not exist in the current database.`;
        case "ColumnNotFound":
          return `The column \`${e.cause.column ?? "(not available)"}\` does not exist in the current database.`;
        case "InvalidIsolationLevel":
          return `Error in connector: Conversion error: ${e.cause.level}`;
        case "InconsistentColumnData":
          return `Inconsistent column data: ${e.cause.cause}`;
        case "MissingFullTextSearchIndex":
          return "Cannot find a fulltext index to use for the native search, try adding a @@fulltext([Fields...]) to your schema";
        case "TransactionWriteConflict":
          return "Transaction failed due to a write conflict or a deadlock. Please retry your transaction";
        case "GenericJs":
          return `Error in external connector (id ${e.cause.id})`;
        case "TooManyConnections":
          return `Too many database connections opened: ${e.cause.cause}`;
        case "InvalidInputValue":
          return `Invalid input value: ${e.cause.message}`;
        case "sqlite":
        case "postgres":
        case "mysql":
        case "mssql":
          return;
        default:
          L2(e.cause, `Unknown error: ${he(e.cause)}`);
      }
    }
    __name(ea, "ea");
    function ni(e) {
      return e && "fields" in e ? `fields: (${e.fields.map((t) => `\`${t}\``).join(", ")})` : e && "index" in e ? `constraint: \`${e.index}\`` : e && "foreignKey" in e ? "foreign key" : "(not available)";
    }
    __name(ni, "ni");
    function kp(e) {
      if (typeof e != "object" || e === null) return false;
      let t = e;
      return "$type" in t && t.$type === "Param" || "prisma__type" in t && t.prisma__type === "param";
    }
    __name(kp, "kp");
    function Op(e) {
      return "prisma__type" in e ? e.prisma__value?.name : e.value.name;
    }
    __name(Op, "Op");
    function Np(e, t) {
      let r = {};
      for (let [n, i] of Object.entries(e)) if (r[n] = i, kp(i)) {
        let o = Op(i);
        o && o in t && (r[n] = t[o]);
      }
      return r;
    }
    __name(Np, "Np");
    function ta(e, t, r = {}) {
      let n = e.map((o) => t.keys.reduce((s2, a) => (s2[a] = we(o[a]), s2), {})), i = new Set(t.nestedSelection);
      return t.arguments.map((o) => {
        let s2 = Np(o, r), a = n.findIndex((m) => St(m, s2));
        if (a === -1) return t.expectNonEmpty ? new X("An operation failed because it depends on one or more records that were required but not found", "P2025") : null;
        {
          let m = Object.entries(e[a]).filter(([f]) => i.has(f));
          return Object.fromEntries(m);
        }
      });
    }
    __name(ta, "ta");
    u();
    l();
    c();
    p();
    d();
    var ia = require_dist2();
    var q = class extends X {
      static {
        __name(this, "q");
      }
      name = "DataMapperError";
      constructor(t, r) {
        super(t, "P2023", r);
      }
    };
    var ra = /* @__PURE__ */ new WeakMap();
    function Dp(e) {
      let t = ra.get(e);
      return t || (t = Object.entries(e), ra.set(e, t)), t;
    }
    __name(Dp, "Dp");
    function oa(e, t, r) {
      switch (t.type) {
        case "affectedRows":
          if (typeof e != "number") throw new q(`Expected an affected rows count, got: ${typeof e} (${e})`);
          return { count: e };
        case "object":
          return si(e, t.fields, r, t.skipNulls);
        case "field":
          return oi(e, "<result>", t.fieldType, r);
        default:
          L2(t, `Invalid data mapping type: '${t.type}'`);
      }
    }
    __name(oa, "oa");
    function si(e, t, r, n) {
      if (e === null) return null;
      if (Array.isArray(e)) {
        let i = e;
        return n && (i = i.filter((o) => o !== null)), i.map((o) => na(o, t, r));
      }
      if (typeof e == "object") return na(e, t, r);
      if (typeof e == "string") {
        let i;
        try {
          i = JSON.parse(e);
        } catch (o) {
          throw new q("Expected an array or object, got a string that is not valid JSON", { cause: o });
        }
        return si(i, t, r, n);
      }
      throw new q(`Expected an array or an object, got: ${typeof e}`);
    }
    __name(si, "si");
    function na(e, t, r) {
      if (typeof e != "object") throw new q(`Expected an object, but got '${typeof e}'`);
      let n = {};
      for (let [i, o] of Dp(t)) switch (o.type) {
        case "affectedRows":
          throw new q(`Unexpected 'AffectedRows' node in data mapping for field '${i}'`);
        case "object": {
          let { serializedName: s2, fields: a, skipNulls: m } = o;
          if (s2 !== null && !Object.hasOwn(e, s2)) throw new q(`Missing data field (Object): '${i}'; node: ${JSON.stringify(o)}; data: ${JSON.stringify(e)}`);
          let f = s2 !== null ? e[s2] : e;
          n[i] = si(f, a, r, m);
          break;
        }
        case "field":
          {
            let s2 = o.dbName;
            if (Object.hasOwn(e, s2)) n[i] = Mp(e[s2], s2, o.fieldType, r);
            else throw new q(`Missing data field (Value): '${s2}'; node: ${JSON.stringify(o)}; data: ${JSON.stringify(e)}`);
          }
          break;
        default:
          L2(o, `DataMapper: Invalid data mapping node type: '${o.type}'`);
      }
      return n;
    }
    __name(na, "na");
    function Mp(e, t, r, n) {
      return e === null ? r.arity === "list" ? [] : null : r.arity === "list" ? e.map((o, s2) => oi(o, `${t}[${s2}]`, r, n)) : oi(e, t, r, n);
    }
    __name(Mp, "Mp");
    function oi(e, t, r, n) {
      switch (r.type) {
        case "unsupported":
          return e;
        case "string": {
          if (typeof e != "string") throw new q(`Expected a string in column '${t}', got ${typeof e}: ${e}`);
          return e;
        }
        case "int":
          switch (typeof e) {
            case "number":
              return Math.trunc(e);
            case "string": {
              let i = Math.trunc(Number(e));
              if (Number.isNaN(i) || !Number.isFinite(i)) throw new q(`Expected an integer in column '${t}', got string: ${e}`);
              if (!Number.isSafeInteger(i)) throw new q(`Integer value in column '${t}' is too large to represent as a JavaScript number without loss of precision, got: ${e}. Consider using BigInt type.`);
              return i;
            }
            default:
              throw new q(`Expected an integer in column '${t}', got ${typeof e}: ${e}`);
          }
        case "bigint": {
          if (typeof e != "number" && typeof e != "string") throw new q(`Expected a bigint in column '${t}', got ${typeof e}: ${e}`);
          return { $type: "BigInt", value: e };
        }
        case "float": {
          if (typeof e == "number") return e;
          if (typeof e == "string") {
            let i = Number(e);
            if (Number.isNaN(i) && !/^[-+]?nan$/.test(e.toLowerCase())) throw new q(`Expected a float in column '${t}', got string: ${e}`);
            return i;
          }
          throw new q(`Expected a float in column '${t}', got ${typeof e}: ${e}`);
        }
        case "boolean": {
          if (typeof e == "boolean") return e;
          if (typeof e == "number") return e === 1;
          if (typeof e == "string") {
            if (e === "true" || e === "TRUE" || e === "1") return true;
            if (e === "false" || e === "FALSE" || e === "0") return false;
            throw new q(`Expected a boolean in column '${t}', got ${typeof e}: ${e}`);
          }
          if (Array.isArray(e) || e instanceof Uint8Array) {
            for (let i of e) if (i !== 0) return true;
            return false;
          }
          throw new q(`Expected a boolean in column '${t}', got ${typeof e}: ${e}`);
        }
        case "decimal":
          if (typeof e != "number" && typeof e != "string" && !ia.Decimal.isDecimal(e)) throw new q(`Expected a decimal in column '${t}', got ${typeof e}: ${e}`);
          return { $type: "Decimal", value: e };
        case "datetime": {
          if (typeof e == "string") return { $type: "DateTime", value: _p(e) };
          if (typeof e == "number" || e instanceof Date) return { $type: "DateTime", value: e };
          throw new q(`Expected a date in column '${t}', got ${typeof e}: ${e}`);
        }
        case "object":
          return { $type: "Json", value: he(e) };
        case "json":
          return { $type: "Json", value: `${e}` };
        case "bytes": {
          switch (r.encoding) {
            case "base64":
              if (typeof e != "string") throw new q(`Expected a base64-encoded byte array in column '${t}', got ${typeof e}: ${e}`);
              return { $type: "Bytes", value: e };
            case "hex":
              if (typeof e != "string" || !e.startsWith("\\x")) throw new q(`Expected a hex-encoded byte array in column '${t}', got ${typeof e}: ${e}`);
              return { $type: "Bytes", value: g.from(e.slice(2), "hex").toString("base64") };
            case "array":
              if (Array.isArray(e)) return { $type: "Bytes", value: g.from(e).toString("base64") };
              if (e instanceof Uint8Array) return { $type: "Bytes", value: g.from(e).toString("base64") };
              throw new q(`Expected a byte array in column '${t}', got ${typeof e}: ${e}`);
            default:
              L2(r.encoding, `DataMapper: Unknown bytes encoding: ${r.encoding}`);
          }
          break;
        }
        case "enum": {
          let i = n[r.name];
          if (i === void 0) throw new q(`Unknown enum '${r.name}'`);
          let o = i[`${e}`];
          if (o === void 0) throw new q(`Value '${e}' not found in enum '${r.name}'`);
          return o;
        }
        default:
          L2(r, `DataMapper: Unknown result type: ${r.type}`);
      }
    }
    __name(oi, "oi");
    var Lp = /\d{2}:\d{2}:\d{2}(?:\.\d+)?(Z|[+-]\d{2}(:?\d{2})?)?$/;
    function _p(e) {
      let t = Lp.exec(e);
      if (t === null) return `${e}T00:00:00Z`;
      let r = e, [n, i, o] = t;
      if (i !== void 0 && i !== "Z" && o === void 0 ? r = `${e}:00` : i === void 0 && (r = `${e}Z`), n.length === e.length) return `1970-01-01T${r}`;
      let s2 = t.index - 1;
      return r[s2] === " " && (r = `${r.slice(0, s2)}T${r.slice(s2 + 1)}`), r;
    }
    __name(_p, "_p");
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    function me(e) {
      if (typeof e != "object") return e;
      var t, r, n = Object.prototype.toString.call(e);
      if (n === "[object Object]") {
        if (e.constructor !== Object && typeof e.constructor == "function") {
          r = new e.constructor();
          for (t in e) e.hasOwnProperty(t) && r[t] !== e[t] && (r[t] = me(e[t]));
        } else {
          r = {};
          for (t in e) t === "__proto__" ? Object.defineProperty(r, t, { value: me(e[t]), configurable: true, enumerable: true, writable: true }) : r[t] = me(e[t]);
        }
        return r;
      }
      if (n === "[object Array]") {
        for (t = e.length, r = Array(t); t--; ) r[t] = me(e[t]);
        return r;
      }
      return n === "[object Set]" ? (r = /* @__PURE__ */ new Set(), e.forEach(function(i) {
        r.add(me(i));
      }), r) : n === "[object Map]" ? (r = /* @__PURE__ */ new Map(), e.forEach(function(i, o) {
        r.set(me(o), me(i));
      }), r) : n === "[object Date]" ? /* @__PURE__ */ new Date(+e) : n === "[object RegExp]" ? (r = new RegExp(e.source, e.flags), r.lastIndex = e.lastIndex, r) : n === "[object DataView]" ? new e.constructor(me(e.buffer)) : n === "[object ArrayBuffer]" ? e.slice(0) : n.slice(-6) === "Array]" ? new e.constructor(e) : e;
    }
    __name(me, "me");
    u();
    l();
    c();
    p();
    d();
    function Fp(e) {
      let t = Object.entries(e);
      return t.length === 0 ? "" : (t.sort(([n], [i]) => n.localeCompare(i)), `/*${t.map(([n, i]) => {
        let o = encodeURIComponent(n), s2 = encodeURIComponent(i).replace(/'/g, "\\'");
        return `${o}='${s2}'`;
      }).join(",")}*/`);
    }
    __name(Fp, "Fp");
    function Zr(e, t) {
      let r = {};
      for (let n of e) {
        let i = n(me(t));
        for (let [o, s2] of Object.entries(i)) s2 !== void 0 && (r[o] = s2);
      }
      return r;
    }
    __name(Zr, "Zr");
    function sa(e, t) {
      let r = Zr(e, t);
      return Fp(r);
    }
    __name(sa, "sa");
    function aa(e, t) {
      return t ? `${e} ${t}` : e;
    }
    __name(aa, "aa");
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    var tr;
    (function(e) {
      e[e.INTERNAL = 0] = "INTERNAL", e[e.SERVER = 1] = "SERVER", e[e.CLIENT = 2] = "CLIENT", e[e.PRODUCER = 3] = "PRODUCER", e[e.CONSUMER = 4] = "CONSUMER";
    })(tr || (tr = {}));
    function $p(e) {
      switch (e) {
        case "postgresql":
        case "postgres":
        case "prisma+postgres":
          return "postgresql";
        case "sqlserver":
          return "mssql";
        case "mysql":
        case "sqlite":
        case "cockroachdb":
        case "mongodb":
          return e;
        default:
          L2(e, `Unknown provider: ${e}`);
      }
    }
    __name($p, "$p");
    async function Yr({ query: e, tracingHelper: t, provider: r, onQuery: n, execute: i }) {
      let o = n === void 0 ? i : async () => {
        let s2 = /* @__PURE__ */ new Date(), a = w.now(), m = await i(), f = w.now();
        return n({ timestamp: s2, duration: f - a, query: e.sql, params: e.args }), m;
      };
      return t.isEnabled() ? await t.runInChildSpan({ name: "db_query", kind: tr.CLIENT, attributes: { "db.query.text": e.sql, "db.system.name": $p(r) } }, o) : o();
    }
    __name(Yr, "Yr");
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    function Ye(e, t) {
      var r = "000000000" + e;
      return r.substr(r.length - t);
    }
    __name(Ye, "Ye");
    var ua = Je(Oo(), 1);
    function Vp() {
      try {
        return ua.default.hostname();
      } catch {
        return y.env._CLUSTER_NETWORK_NAME_ || y.env.COMPUTERNAME || "hostname";
      }
    }
    __name(Vp, "Vp");
    var la = 2;
    var Up = Ye(y.pid.toString(36), la);
    var ca = Vp();
    var qp = ca.length;
    var Bp = Ye(ca.split("").reduce(function(e, t) {
      return +e + t.charCodeAt(0);
    }, +qp + 36).toString(36), la);
    function ai() {
      return Up + Bp;
    }
    __name(ai, "ai");
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    function Xr(e) {
      return typeof e == "string" && /^c[a-z0-9]{20,32}$/.test(e);
    }
    __name(Xr, "Xr");
    function ui(e) {
      let n = Math.pow(36, 4), i = 0;
      function o() {
        return Ye((Math.random() * n << 0).toString(36), 4);
      }
      __name(o, "o");
      function s2() {
        return i = i < n ? i : 0, i++, i - 1;
      }
      __name(s2, "s");
      function a() {
        var m = "c", f = (/* @__PURE__ */ new Date()).getTime().toString(36), T = Ye(s2().toString(36), 4), S = e(), v = o() + o();
        return m + f + T + S + v;
      }
      __name(a, "a");
      return a.fingerprint = e, a.isCuid = Xr, a;
    }
    __name(ui, "ui");
    var jp = ui(ai);
    var pa = jp;
    var uu = Je(tu());
    u();
    l();
    c();
    p();
    d();
    We();
    u();
    l();
    c();
    p();
    d();
    var ru = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
    var Id = 128;
    var et;
    var Rt;
    function kd(e) {
      !et || et.length < e ? (et = g.allocUnsafe(e * Id), Vt.getRandomValues(et), Rt = 0) : Rt + e > et.length && (Vt.getRandomValues(et), Rt = 0), Rt += e;
    }
    __name(kd, "kd");
    function hi(e = 21) {
      kd(e |= 0);
      let t = "";
      for (let r = Rt - e; r < Rt; r++) t += ru[et[r] & 63];
      return t;
    }
    __name(hi, "hi");
    u();
    l();
    c();
    p();
    d();
    We();
    var iu = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
    var ar = 32;
    var Od = 16;
    var ou = 10;
    var nu = 281474976710655;
    var tt;
    (function(e) {
      e.Base32IncorrectEncoding = "B32_ENC_INVALID", e.DecodeTimeInvalidCharacter = "DEC_TIME_CHAR", e.DecodeTimeValueMalformed = "DEC_TIME_MALFORMED", e.EncodeTimeNegative = "ENC_TIME_NEG", e.EncodeTimeSizeExceeded = "ENC_TIME_SIZE_EXCEED", e.EncodeTimeValueMalformed = "ENC_TIME_MALFORMED", e.PRNGDetectFailure = "PRNG_DETECT", e.ULIDInvalid = "ULID_INVALID", e.Unexpected = "UNEXPECTED", e.UUIDInvalid = "UUID_INVALID";
    })(tt || (tt = {}));
    var rt = class extends Error {
      static {
        __name(this, "rt");
      }
      constructor(t, r) {
        super(`${r} (${t})`), this.name = "ULIDError", this.code = t;
      }
    };
    function Nd(e) {
      let t = Math.floor(e() * ar);
      return t === ar && (t = ar - 1), iu.charAt(t);
    }
    __name(Nd, "Nd");
    function Dd(e) {
      let t = Md(), r = t && (t.crypto || t.msCrypto) || (typeof ct < "u" ? ct : null);
      if (typeof r?.getRandomValues == "function") return () => {
        let n = new Uint8Array(1);
        return r.getRandomValues(n), n[0] / 255;
      };
      if (typeof r?.randomBytes == "function") return () => r.randomBytes(1).readUInt8() / 255;
      if (ct?.randomBytes) return () => ct.randomBytes(1).readUInt8() / 255;
      throw new rt(tt.PRNGDetectFailure, "Failed to find a reliable PRNG");
    }
    __name(Dd, "Dd");
    function Md() {
      return Fd() ? self : typeof window < "u" ? window : typeof globalThis < "u" || typeof globalThis < "u" ? globalThis : null;
    }
    __name(Md, "Md");
    function Ld(e, t) {
      let r = "";
      for (; e > 0; e--) r = Nd(t) + r;
      return r;
    }
    __name(Ld, "Ld");
    function _d(e, t = ou) {
      if (isNaN(e)) throw new rt(tt.EncodeTimeValueMalformed, `Time must be a number: ${e}`);
      if (e > nu) throw new rt(tt.EncodeTimeSizeExceeded, `Cannot encode a time larger than ${nu}: ${e}`);
      if (e < 0) throw new rt(tt.EncodeTimeNegative, `Time must be positive: ${e}`);
      if (Number.isInteger(e) === false) throw new rt(tt.EncodeTimeValueMalformed, `Time must be an integer: ${e}`);
      let r, n = "";
      for (let i = t; i > 0; i--) r = e % ar, n = iu.charAt(r) + n, e = (e - r) / ar;
      return n;
    }
    __name(_d, "_d");
    function Fd() {
      return typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope;
    }
    __name(Fd, "Fd");
    function su(e, t) {
      let r = t || Dd(), n = !e || isNaN(e) ? Date.now() : e;
      return _d(n, ou) + Ld(Od, r);
    }
    __name(su, "su");
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    var ee = [];
    for (let e = 0; e < 256; ++e) ee.push((e + 256).toString(16).slice(1));
    function nn(e, t = 0) {
      return (ee[e[t + 0]] + ee[e[t + 1]] + ee[e[t + 2]] + ee[e[t + 3]] + "-" + ee[e[t + 4]] + ee[e[t + 5]] + "-" + ee[e[t + 6]] + ee[e[t + 7]] + "-" + ee[e[t + 8]] + ee[e[t + 9]] + "-" + ee[e[t + 10]] + ee[e[t + 11]] + ee[e[t + 12]] + ee[e[t + 13]] + ee[e[t + 14]] + ee[e[t + 15]]).toLowerCase();
    }
    __name(nn, "nn");
    u();
    l();
    c();
    p();
    d();
    We();
    var sn = new Uint8Array(256);
    var on = sn.length;
    function It() {
      return on > sn.length - 16 && (Sr(sn), on = 0), sn.slice(on, on += 16);
    }
    __name(It, "It");
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    We();
    var wi = { randomUUID: Pr };
    function $d(e, t, r) {
      if (wi.randomUUID && !t && !e) return wi.randomUUID();
      e = e || {};
      let n = e.random ?? e.rng?.() ?? It();
      if (n.length < 16) throw new Error("Random bytes length must be >= 16");
      if (n[6] = n[6] & 15 | 64, n[8] = n[8] & 63 | 128, t) {
        if (r = r || 0, r < 0 || r + 16 > t.length) throw new RangeError(`UUID byte range ${r}:${r + 15} is out of buffer bounds`);
        for (let i = 0; i < 16; ++i) t[r + i] = n[i];
        return t;
      }
      return nn(n);
    }
    __name($d, "$d");
    var bi = $d;
    u();
    l();
    c();
    p();
    d();
    var xi = {};
    function Vd(e, t, r) {
      let n;
      if (e) n = au(e.random ?? e.rng?.() ?? It(), e.msecs, e.seq, t, r);
      else {
        let i = Date.now(), o = It();
        Ud(xi, i, o), n = au(o, xi.msecs, xi.seq, t, r);
      }
      return t ?? nn(n);
    }
    __name(Vd, "Vd");
    function Ud(e, t, r) {
      return e.msecs ??= -1 / 0, e.seq ??= 0, t > e.msecs ? (e.seq = r[6] << 23 | r[7] << 16 | r[8] << 8 | r[9], e.msecs = t) : (e.seq = e.seq + 1 | 0, e.seq === 0 && e.msecs++), e;
    }
    __name(Ud, "Ud");
    function au(e, t, r, n, i = 0) {
      if (e.length < 16) throw new Error("Random bytes length must be >= 16");
      if (!n) n = new Uint8Array(16), i = 0;
      else if (i < 0 || i + 16 > n.length) throw new RangeError(`UUID byte range ${i}:${i + 15} is out of buffer bounds`);
      return t ??= Date.now(), r ??= e[6] * 127 << 24 | e[7] << 16 | e[8] << 8 | e[9], n[i++] = t / 1099511627776 & 255, n[i++] = t / 4294967296 & 255, n[i++] = t / 16777216 & 255, n[i++] = t / 65536 & 255, n[i++] = t / 256 & 255, n[i++] = t & 255, n[i++] = 112 | r >>> 28 & 15, n[i++] = r >>> 20 & 255, n[i++] = 128 | r >>> 14 & 63, n[i++] = r >>> 6 & 255, n[i++] = r << 2 & 255 | e[10] & 3, n[i++] = e[11], n[i++] = e[12], n[i++] = e[13], n[i++] = e[14], n[i++] = e[15], n;
    }
    __name(au, "au");
    var Ei = Vd;
    var an = class {
      static {
        __name(this, "an");
      }
      #e = {};
      constructor() {
        this.register("uuid", new Pi()), this.register("cuid", new Si()), this.register("ulid", new vi()), this.register("nanoid", new Ai()), this.register("product", new Ci());
      }
      snapshot() {
        return Object.create(this.#e, { now: { value: new Ti() } });
      }
      register(t, r) {
        this.#e[t] = r;
      }
    };
    var Ti = class {
      static {
        __name(this, "Ti");
      }
      #e;
      generate() {
        return this.#e === void 0 && (this.#e = /* @__PURE__ */ new Date()), this.#e.toISOString();
      }
    };
    var Pi = class {
      static {
        __name(this, "Pi");
      }
      generate(t) {
        if (t === 4) return bi();
        if (t === 7) return Ei();
        throw new Error("Invalid UUID generator arguments");
      }
    };
    var Si = class {
      static {
        __name(this, "Si");
      }
      generate(t) {
        if (t === 1) return pa();
        if (t === 2) return (0, uu.createId)();
        throw new Error("Invalid CUID generator arguments");
      }
    };
    var vi = class {
      static {
        __name(this, "vi");
      }
      generate() {
        return su();
      }
    };
    var Ai = class {
      static {
        __name(this, "Ai");
      }
      generate(t) {
        if (typeof t == "number") return hi(t);
        if (t === void 0) return hi();
        throw new Error("Invalid Nanoid generator arguments");
      }
    };
    var Ci = class {
      static {
        __name(this, "Ci");
      }
      generate(t, r) {
        if (t === void 0 || r === void 0) throw new Error("Invalid Product generator arguments");
        return Array.isArray(t) && Array.isArray(r) ? t.flatMap((n) => r.map((i) => [n, i])) : Array.isArray(t) ? t.map((n) => [n, r]) : Array.isArray(r) ? r.map((n) => [t, n]) : [[t, r]];
      }
    };
    u();
    l();
    c();
    p();
    d();
    function un(e, t) {
      return e == null ? e : typeof e == "string" ? un(JSON.parse(e), t) : Array.isArray(e) ? Bd(e, t) : qd(e, t);
    }
    __name(un, "un");
    function qd(e, t) {
      if (t.pagination) {
        let { skip: r, take: n, cursor: i } = t.pagination;
        if (r !== null && r > 0 || n === 0 || i !== null && !St(e, i)) return null;
      }
      return cu(e, t.nested);
    }
    __name(qd, "qd");
    function cu(e, t) {
      for (let [r, n] of Object.entries(t)) e[r] = un(e[r], n);
      return e;
    }
    __name(cu, "cu");
    function Bd(e, t) {
      if (t.distinct !== null) {
        let r = t.linkingFields !== null ? [...t.distinct, ...t.linkingFields] : t.distinct;
        e = jd(e, r);
      }
      return t.pagination && (e = Qd(e, t.pagination, t.linkingFields)), t.reverse && e.reverse(), Object.keys(t.nested).length === 0 ? e : e.map((r) => cu(r, t.nested));
    }
    __name(Bd, "Bd");
    function jd(e, t) {
      let r = /* @__PURE__ */ new Set(), n = [];
      for (let i of e) {
        let o = kt(i, t);
        r.has(o) || (r.add(o), n.push(i));
      }
      return n;
    }
    __name(jd, "jd");
    function Qd(e, t, r) {
      if (r === null) return lu(e, t);
      let n = /* @__PURE__ */ new Map();
      for (let o of e) {
        let s2 = kt(o, r);
        n.has(s2) || n.set(s2, []), n.get(s2).push(o);
      }
      let i = Array.from(n.entries());
      return i.sort(([o], [s2]) => o < s2 ? -1 : o > s2 ? 1 : 0), i.flatMap(([, o]) => lu(o, t));
    }
    __name(Qd, "Qd");
    function lu(e, { cursor: t, skip: r, take: n }) {
      let i = t !== null ? e.findIndex((a) => St(a, t)) : 0;
      if (i === -1) return [];
      let o = i + (r ?? 0), s2 = n !== null ? o + n : e.length;
      return e.slice(o, s2);
    }
    __name(lu, "lu");
    function kt(e, t, r) {
      let n = t.map((i, o) => r?.[o] ? e[i] !== null ? r[o](e[i]) : null : e[i]);
      return JSON.stringify(n);
    }
    __name(kt, "kt");
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    function Ri(e) {
      return typeof e == "object" && e !== null && e.prisma__type === "param";
    }
    __name(Ri, "Ri");
    function Ii(e) {
      return typeof e == "object" && e !== null && e.prisma__type === "generatorCall";
    }
    __name(Ii, "Ii");
    function Ni(e, t, r, n) {
      let i = e.args.map((o) => fe(o, t, r));
      switch (e.type) {
        case "rawSql":
          return [Gd(e.sql, i, e.argTypes)];
        case "templateSql":
          return (e.chunkable ? Wd(e.fragments, i, n) : [i]).map((s2) => {
            let a = Jd(e.fragments, e.placeholderFormat, s2, e.argTypes);
            if (n !== void 0 && a.args.length > n) throw new X("The query parameter limit supported by your database is exceeded.", "P2029");
            return a;
          });
        default:
          L2(e.type, "Invalid query type");
      }
    }
    __name(Ni, "Ni");
    function fe(e, t, r) {
      for (; zd(e); ) if (Ri(e)) {
        let n = t[e.prisma__value.name];
        if (n === void 0) throw new Error(`Missing value for query variable ${e.prisma__value.name}`);
        e.prisma__value.type === "DateTime" && typeof n == "string" ? e = new Date(n) : e = n;
      } else if (Ii(e)) {
        let { name: n, args: i } = e.prisma__value, o = r[n];
        if (!o) throw new Error(`Encountered an unknown generator '${n}'`);
        e = o.generate(...i.map((s2) => fe(s2, t, r)));
      } else L2(e, `Unexpected unevaluated value type: ${e}`);
      return Array.isArray(e) && (e = e.map((n) => fe(n, t, r))), e;
    }
    __name(fe, "fe");
    function Jd(e, t, r, n) {
      let i = "", o = { placeholderNumber: 1 }, s2 = [], a = [];
      for (let m of Oi(e, r, n)) {
        if (i += Hd(m, t, o), m.type === "stringChunk") continue;
        let f = s2.length, T = s2.push(...pu(m)) - f;
        if (m.argType.arity === "tuple") {
          if (T % m.argType.elements.length !== 0) throw new Error(`Malformed query template. Expected the number of parameters to match the tuple arity, but got ${T} parameters for a tuple of arity ${m.argType.elements.length}.`);
          for (let S = 0; S < T / m.argType.elements.length; S++) a.push(...m.argType.elements);
        } else for (let S = 0; S < T; S++) a.push(m.argType);
      }
      return { sql: i, args: s2, argTypes: a };
    }
    __name(Jd, "Jd");
    function Hd(e, t, r) {
      let n = e.type;
      switch (n) {
        case "parameter":
          return ki(t, r.placeholderNumber++);
        case "stringChunk":
          return e.chunk;
        case "parameterTuple":
          return `(${e.value.length == 0 ? "NULL" : e.value.map(() => {
            let o = ki(t, r.placeholderNumber++);
            return `${e.itemPrefix}${o}${e.itemSuffix}`;
          }).join(e.itemSeparator)})`;
        case "parameterTupleList":
          return e.value.map((i) => {
            let o = i.map(() => ki(t, r.placeholderNumber++)).join(e.itemSeparator);
            return `${e.itemPrefix}${o}${e.itemSuffix}`;
          }).join(e.groupSeparator);
        default:
          L2(n, "Invalid fragment type");
      }
    }
    __name(Hd, "Hd");
    function ki(e, t) {
      return e.hasNumbering ? `${e.prefix}${t}` : e.prefix;
    }
    __name(ki, "ki");
    function Gd(e, t, r) {
      return { sql: e, args: t, argTypes: r };
    }
    __name(Gd, "Gd");
    function zd(e) {
      return Ri(e) || Ii(e);
    }
    __name(zd, "zd");
    function* Oi(e, t, r) {
      let n = 0;
      for (let i of e) switch (i.type) {
        case "parameter": {
          if (n >= t.length) throw new Error(`Malformed query template. Fragments attempt to read over ${t.length} parameters.`);
          yield { ...i, value: t[n], argType: r?.[n] }, n++;
          break;
        }
        case "stringChunk": {
          yield i;
          break;
        }
        case "parameterTuple": {
          if (n >= t.length) throw new Error(`Malformed query template. Fragments attempt to read over ${t.length} parameters.`);
          let o = t[n];
          yield { ...i, value: Array.isArray(o) ? o : [o], argType: r?.[n] }, n++;
          break;
        }
        case "parameterTupleList": {
          if (n >= t.length) throw new Error(`Malformed query template. Fragments attempt to read over ${t.length} parameters.`);
          let o = t[n];
          if (!Array.isArray(o)) throw new Error("Malformed query template. Tuple list expected.");
          if (o.length === 0) throw new Error("Malformed query template. Tuple list cannot be empty.");
          for (let s2 of o) if (!Array.isArray(s2)) throw new Error("Malformed query template. Tuple expected.");
          yield { ...i, value: o, argType: r?.[n] }, n++;
          break;
        }
      }
    }
    __name(Oi, "Oi");
    function* pu(e) {
      switch (e.type) {
        case "parameter":
          yield e.value;
          break;
        case "stringChunk":
          break;
        case "parameterTuple":
          yield* e.value;
          break;
        case "parameterTupleList":
          for (let t of e.value) yield* t;
          break;
      }
    }
    __name(pu, "pu");
    function Wd(e, t, r) {
      let n = 0, i = 0;
      for (let s2 of Oi(e, t, void 0)) {
        let a = 0;
        for (let m of pu(s2)) a++;
        i = Math.max(i, a), n += a;
      }
      let o = [[]];
      for (let s2 of Oi(e, t, void 0)) switch (s2.type) {
        case "parameter": {
          for (let a of o) a.push(s2.value);
          break;
        }
        case "stringChunk":
          break;
        case "parameterTuple": {
          let a = s2.value.length, m = [];
          if (r && o.length === 1 && a === i && n > r && n - a < r) {
            let f = r - (n - a);
            m = Kd(s2.value, f);
          } else m = [s2.value];
          o = o.flatMap((f) => m.map((T) => [...f, T]));
          break;
        }
        case "parameterTupleList": {
          let a = s2.value.reduce((S, v) => S + v.length, 0), m = [], f = [], T = 0;
          for (let S of s2.value) r && o.length === 1 && a === i && f.length > 0 && n - a + T + S.length > r && (m.push(f), f = [], T = 0), f.push(S), T += S.length;
          f.length > 0 && m.push(f), o = o.flatMap((S) => m.map((v) => [...S, v]));
          break;
        }
      }
      return o;
    }
    __name(Wd, "Wd");
    function Kd(e, t) {
      let r = [];
      for (let n = 0; n < e.length; n += t) r.push(e.slice(n, n + t));
      return r;
    }
    __name(Kd, "Kd");
    u();
    l();
    c();
    p();
    d();
    function du(e) {
      return e.rows.map((t) => t.reduce((r, n, i) => (r[e.columnNames[i]] = n, r), {}));
    }
    __name(du, "du");
    function mu(e) {
      return { columns: e.columnNames, types: e.columnTypes.map((t) => Zd(t)), rows: e.rows.map((t) => t.map((r, n) => ur(r, e.columnTypes[n]))) };
    }
    __name(mu, "mu");
    function ur(e, t) {
      if (e === null) return null;
      switch (t) {
        case k.Int32:
          switch (typeof e) {
            case "number":
              return Math.trunc(e);
            case "string":
              return Math.trunc(Number(e));
            default:
              throw new Error(`Cannot serialize value of type ${typeof e} as Int32`);
          }
        case k.Int32Array:
          if (!Array.isArray(e)) throw new Error(`Cannot serialize value of type ${typeof e} as Int32Array`);
          return e.map((r) => ur(r, k.Int32));
        case k.Int64:
          switch (typeof e) {
            case "number":
              return BigInt(Math.trunc(e));
            case "string":
              return e;
            default:
              throw new Error(`Cannot serialize value of type ${typeof e} as Int64`);
          }
        case k.Int64Array:
          if (!Array.isArray(e)) throw new Error(`Cannot serialize value of type ${typeof e} as Int64Array`);
          return e.map((r) => ur(r, k.Int64));
        case k.Json:
          switch (typeof e) {
            case "string":
              return JSON.parse(e);
            default:
              throw new Error(`Cannot serialize value of type ${typeof e} as Json`);
          }
        case k.JsonArray:
          if (!Array.isArray(e)) throw new Error(`Cannot serialize value of type ${typeof e} as JsonArray`);
          return e.map((r) => ur(r, k.Json));
        case k.Boolean:
          switch (typeof e) {
            case "boolean":
              return e;
            case "string":
              return e === "true" || e === "1";
            case "number":
              return e === 1;
            default:
              throw new Error(`Cannot serialize value of type ${typeof e} as Boolean`);
          }
        case k.BooleanArray:
          if (!Array.isArray(e)) throw new Error(`Cannot serialize value of type ${typeof e} as BooleanArray`);
          return e.map((r) => ur(r, k.Boolean));
        default:
          return e;
      }
    }
    __name(ur, "ur");
    function Zd(e) {
      switch (e) {
        case k.Int32:
          return "int";
        case k.Int64:
          return "bigint";
        case k.Float:
          return "float";
        case k.Double:
          return "double";
        case k.Text:
          return "string";
        case k.Enum:
          return "enum";
        case k.Bytes:
          return "bytes";
        case k.Boolean:
          return "bool";
        case k.Character:
          return "char";
        case k.Numeric:
          return "decimal";
        case k.Json:
          return "json";
        case k.Uuid:
          return "uuid";
        case k.DateTime:
          return "datetime";
        case k.Date:
          return "date";
        case k.Time:
          return "time";
        case k.Int32Array:
          return "int-array";
        case k.Int64Array:
          return "bigint-array";
        case k.FloatArray:
          return "float-array";
        case k.DoubleArray:
          return "double-array";
        case k.TextArray:
          return "string-array";
        case k.EnumArray:
          return "string-array";
        case k.BytesArray:
          return "bytes-array";
        case k.BooleanArray:
          return "bool-array";
        case k.CharacterArray:
          return "char-array";
        case k.NumericArray:
          return "decimal-array";
        case k.JsonArray:
          return "json-array";
        case k.UuidArray:
          return "uuid-array";
        case k.DateTimeArray:
          return "datetime-array";
        case k.DateArray:
          return "date-array";
        case k.TimeArray:
          return "time-array";
        case k.UnknownNumber:
          return "unknown";
        case k.Set:
          return "string";
        default:
          L2(e, `Unexpected column type: ${e}`);
      }
    }
    __name(Zd, "Zd");
    u();
    l();
    c();
    p();
    d();
    function fu(e, t, r) {
      if (!t.every((n) => Di(e, n))) {
        let n = Yd(e, r), i = Xd(r);
        throw new X(n, i, r.context);
      }
    }
    __name(fu, "fu");
    function Di(e, t) {
      switch (t.type) {
        case "rowCountEq":
          return Array.isArray(e) ? e.length === t.args : e === null ? t.args === 0 : t.args === 1;
        case "rowCountNeq":
          return Array.isArray(e) ? e.length !== t.args : e === null ? t.args !== 0 : t.args !== 1;
        case "affectedRowCountEq":
          return e === t.args;
        case "never":
          return false;
        default:
          L2(t, `Unknown rule type: ${t.type}`);
      }
    }
    __name(Di, "Di");
    function Yd(e, t) {
      switch (t.errorIdentifier) {
        case "RELATION_VIOLATION":
          return `The change you are trying to make would violate the required relation '${t.context.relation}' between the \`${t.context.modelA}\` and \`${t.context.modelB}\` models.`;
        case "MISSING_RECORD":
          return `An operation failed because it depends on one or more records that were required but not found. No record was found for ${t.context.operation}.`;
        case "MISSING_RELATED_RECORD": {
          let r = t.context.neededFor ? ` (needed to ${t.context.neededFor})` : "";
          return `An operation failed because it depends on one or more records that were required but not found. No '${t.context.model}' record${r} was found for ${t.context.operation} on ${t.context.relationType} relation '${t.context.relation}'.`;
        }
        case "INCOMPLETE_CONNECT_INPUT":
          return `An operation failed because it depends on one or more records that were required but not found. Expected ${t.context.expectedRows} records to be connected, found only ${Array.isArray(e) ? e.length : e}.`;
        case "INCOMPLETE_CONNECT_OUTPUT":
          return `The required connected records were not found. Expected ${t.context.expectedRows} records to be connected after connect operation on ${t.context.relationType} relation '${t.context.relation}', found ${Array.isArray(e) ? e.length : e}.`;
        case "RECORDS_NOT_CONNECTED":
          return `The records for relation \`${t.context.relation}\` between the \`${t.context.parent}\` and \`${t.context.child}\` models are not connected.`;
        default:
          L2(t, `Unknown error identifier: ${t}`);
      }
    }
    __name(Yd, "Yd");
    function Xd(e) {
      switch (e.errorIdentifier) {
        case "RELATION_VIOLATION":
          return "P2014";
        case "RECORDS_NOT_CONNECTED":
          return "P2017";
        case "INCOMPLETE_CONNECT_OUTPUT":
          return "P2018";
        case "MISSING_RECORD":
        case "MISSING_RELATED_RECORD":
        case "INCOMPLETE_CONNECT_INPUT":
          return "P2025";
        default:
          L2(e, `Unknown error identifier: ${e}`);
      }
    }
    __name(Xd, "Xd");
    var lr = class e {
      static {
        __name(this, "e");
      }
      #e;
      #t = new an();
      #r;
      #n;
      #i;
      #o;
      #s;
      constructor({ onQuery: t, tracingHelper: r, serializer: n, rawSerializer: i, provider: o, connectionInfo: s2 }) {
        this.#e = t, this.#r = r, this.#n = n, this.#i = i ?? n, this.#o = o, this.#s = s2;
      }
      static forSql(t) {
        return new e({ onQuery: t.onQuery, tracingHelper: t.tracingHelper, serializer: du, rawSerializer: mu, provider: t.provider, connectionInfo: t.connectionInfo });
      }
      async run(t, r) {
        let { value: n } = await this.interpretNode(t, { ...r, generators: this.#t.snapshot() }).catch((i) => vt(i));
        return n;
      }
      async interpretNode(t, r) {
        switch (t.type) {
          case "value":
            return { value: fe(t.args, r.scope, r.generators) };
          case "seq": {
            let n;
            for (let i of t.args) n = await this.interpretNode(i, r);
            return n ?? { value: void 0 };
          }
          case "get":
            return { value: r.scope[t.args.name] };
          case "let": {
            let n = Object.create(r.scope);
            for (let i of t.args.bindings) {
              let { value: o } = await this.interpretNode(i.expr, { ...r, scope: n });
              n[i.name] = o;
            }
            return this.interpretNode(t.args.expr, { ...r, scope: n });
          }
          case "getFirstNonEmpty": {
            for (let n of t.args.names) {
              let i = r.scope[n];
              if (!gu(i)) return { value: i };
            }
            return { value: [] };
          }
          case "concat": {
            let n = await Promise.all(t.args.map((i) => this.interpretNode(i, r).then((o) => o.value)));
            return { value: n.length > 0 ? n.reduce((i, o) => i.concat(Mi(o)), []) : [] };
          }
          case "sum": {
            let n = await Promise.all(t.args.map((i) => this.interpretNode(i, r).then((o) => o.value)));
            return { value: n.length > 0 ? n.reduce((i, o) => Ae(i) + Ae(o)) : 0 };
          }
          case "execute": {
            let n = Ni(t.args, r.scope, r.generators, this.#a()), i = 0;
            for (let o of n) {
              let s2 = yu(o, r.sqlCommenter);
              i += await this.#l(s2, r.queryable, () => r.queryable.executeRaw(Li(s2)).catch((a) => t.args.type === "rawSql" ? ii(a) : vt(a)));
            }
            return { value: i };
          }
          case "query": {
            let n = Ni(t.args, r.scope, r.generators, this.#a()), i;
            for (let o of n) {
              let s2 = yu(o, r.sqlCommenter), a = await this.#l(s2, r.queryable, () => r.queryable.queryRaw(Li(s2)).catch((m) => t.args.type === "rawSql" ? ii(m) : vt(m)));
              i === void 0 ? i = a : (i.rows.push(...a.rows), i.lastInsertId = a.lastInsertId);
            }
            return { value: t.args.type === "rawSql" ? this.#i(i) : this.#n(i), lastInsertId: i?.lastInsertId };
          }
          case "reverse": {
            let { value: n, lastInsertId: i } = await this.interpretNode(t.args, r);
            return { value: Array.isArray(n) ? n.reverse() : n, lastInsertId: i };
          }
          case "unique": {
            let { value: n, lastInsertId: i } = await this.interpretNode(t.args, r);
            if (!Array.isArray(n)) return { value: n, lastInsertId: i };
            if (n.length > 1) throw new Error(`Expected zero or one element, got ${n.length}`);
            return { value: n[0] ?? null, lastInsertId: i };
          }
          case "required": {
            let { value: n, lastInsertId: i } = await this.interpretNode(t.args, r);
            if (gu(n)) throw new Error("Required value is empty");
            return { value: n, lastInsertId: i };
          }
          case "mapField": {
            let { value: n, lastInsertId: i } = await this.interpretNode(t.args.records, r);
            return { value: hu(n, t.args.field), lastInsertId: i };
          }
          case "join": {
            let { value: n, lastInsertId: i } = await this.interpretNode(t.args.parent, r);
            if (n === null) return { value: null, lastInsertId: i };
            let o = await Promise.all(t.args.children.map(async (s2) => ({ joinExpr: s2, childRecords: (await this.interpretNode(s2.child, r)).value })));
            return { value: em(n, o, t.args.canAssumeStrictEquality), lastInsertId: i };
          }
          case "transaction": {
            if (!r.transactionManager.enabled) return this.interpretNode(t.args, r);
            let n = r.transactionManager.manager, i = await n.startInternalTransaction(), o = await n.getTransaction(i, "query");
            try {
              let s2 = await this.interpretNode(t.args, { ...r, queryable: o });
              return await n.commitTransaction(i.id), s2;
            } catch (s2) {
              throw await n.rollbackTransaction(i.id), s2;
            }
          }
          case "dataMap": {
            let { value: n, lastInsertId: i } = await this.interpretNode(t.args.expr, r);
            return { value: oa(n, t.args.structure, t.args.enums), lastInsertId: i };
          }
          case "validate": {
            let { value: n, lastInsertId: i } = await this.interpretNode(t.args.expr, r);
            return fu(n, t.args.rules, t.args), { value: n, lastInsertId: i };
          }
          case "if": {
            let { value: n } = await this.interpretNode(t.args.value, r);
            return Di(n, t.args.rule) ? await this.interpretNode(t.args.then, r) : await this.interpretNode(t.args.else, r);
          }
          case "unit":
            return { value: void 0 };
          case "diff": {
            let { value: n } = await this.interpretNode(t.args.from, r), { value: i } = await this.interpretNode(t.args.to, r), o = /* @__PURE__ */ __name((a) => a !== null ? kt(cr(a), t.args.fields) : null, "o"), s2 = new Set(Mi(i).map(o));
            return { value: Mi(n).filter((a) => !s2.has(o(a))) };
          }
          case "process": {
            let { value: n, lastInsertId: i } = await this.interpretNode(t.args.expr, r), o = Li(t.args.operations);
            return wu(o, r.scope, r.generators), { value: un(n, o), lastInsertId: i };
          }
          case "initializeRecord": {
            let { lastInsertId: n } = await this.interpretNode(t.args.expr, r), i = {};
            for (let [o, s2] of Object.entries(t.args.fields)) i[o] = rm(s2, n, r.scope, r.generators);
            return { value: i, lastInsertId: n };
          }
          case "mapRecord": {
            let { value: n, lastInsertId: i } = await this.interpretNode(t.args.expr, r), o = n === null ? {} : cr(n);
            for (let [s2, a] of Object.entries(t.args.fields)) o[s2] = nm(a, o[s2], r.scope, r.generators);
            return { value: o, lastInsertId: i };
          }
          default:
            L2(t, `Unexpected node type: ${t.type}`);
        }
      }
      #a() {
        return this.#s?.maxBindValues !== void 0 ? this.#s.maxBindValues : this.#u();
      }
      #u() {
        if (this.#o !== void 0) switch (this.#o) {
          case "cockroachdb":
          case "postgres":
          case "postgresql":
          case "prisma+postgres":
            return 32766;
          case "mysql":
            return 65535;
          case "sqlite":
            return 999;
          case "sqlserver":
            return 2098;
          case "mongodb":
            return;
          default:
            L2(this.#o, `Unexpected provider: ${this.#o}`);
        }
      }
      #l(t, r, n) {
        return Yr({ query: t, execute: n, provider: this.#o ?? r.provider, tracingHelper: this.#r, onQuery: this.#e });
      }
    };
    function gu(e) {
      return Array.isArray(e) ? e.length === 0 : e == null;
    }
    __name(gu, "gu");
    function Mi(e) {
      return Array.isArray(e) ? e : [e];
    }
    __name(Mi, "Mi");
    function Ae(e) {
      if (typeof e == "number") return e;
      if (typeof e == "string") return Number(e);
      throw new Error(`Expected number, got ${typeof e}`);
    }
    __name(Ae, "Ae");
    function cr(e) {
      if (typeof e == "object" && e !== null) return e;
      throw new Error(`Expected object, got ${typeof e}`);
    }
    __name(cr, "cr");
    function hu(e, t) {
      return Array.isArray(e) ? e.map((r) => hu(r, t)) : typeof e == "object" && e !== null ? e[t] ?? null : e;
    }
    __name(hu, "hu");
    function em(e, t, r) {
      for (let { joinExpr: n, childRecords: i } of t) {
        let o = n.on.map(([T]) => T), s2 = n.on.map(([, T]) => T), a = {}, m = Array.isArray(e) ? e : [e];
        for (let T of m) {
          let S = cr(T), v = kt(S, o);
          a[v] || (a[v] = []), a[v].push(S), n.isRelationUnique ? S[n.parentField] = null : S[n.parentField] = [];
        }
        let f = r ? void 0 : tm(m, o);
        for (let T of Array.isArray(i) ? i : [i]) {
          if (T === null) continue;
          let S = kt(cr(T), s2, f);
          for (let v of a[S] ?? []) n.isRelationUnique ? v[n.parentField] = T : v[n.parentField].push(T);
        }
      }
      return e;
    }
    __name(em, "em");
    function tm(e, t) {
      function r(o) {
        switch (o) {
          case "number":
            return Number;
          case "string":
            return String;
          case "boolean":
            return Boolean;
          case "bigint":
            return BigInt;
          default:
            return;
        }
      }
      __name(r, "r");
      let n = Array.from({ length: t.length }), i = 0;
      for (let o of e) {
        let s2 = cr(o);
        for (let [a, m] of t.entries()) if (s2[m] !== null && n[a] === void 0) {
          let f = r(typeof s2[m]);
          f !== void 0 && (n[a] = f), i++;
        }
        if (i === t.length) break;
      }
      return n;
    }
    __name(tm, "tm");
    function rm(e, t, r, n) {
      switch (e.type) {
        case "value":
          return fe(e.value, r, n);
        case "lastInsertId":
          return t;
        default:
          L2(e, `Unexpected field initializer type: ${e.type}`);
      }
    }
    __name(rm, "rm");
    function nm(e, t, r, n) {
      switch (e.type) {
        case "set":
          return fe(e.value, r, n);
        case "add":
          return Ae(t) + Ae(fe(e.value, r, n));
        case "subtract":
          return Ae(t) - Ae(fe(e.value, r, n));
        case "multiply":
          return Ae(t) * Ae(fe(e.value, r, n));
        case "divide": {
          let i = Ae(t), o = Ae(fe(e.value, r, n));
          return o === 0 ? null : i / o;
        }
        default:
          L2(e, `Unexpected field operation type: ${e.type}`);
      }
    }
    __name(nm, "nm");
    function yu(e, t) {
      if (!t || t.plugins.length === 0) return e;
      let r = sa(t.plugins, { query: t.queryInfo, sql: e.sql });
      return r ? { ...e, sql: aa(e.sql, r) } : e;
    }
    __name(yu, "yu");
    function wu(e, t, r) {
      let n = e.pagination?.cursor;
      if (n) for (let [i, o] of Object.entries(n)) n[i] = fe(o, t, r);
      for (let i of Object.values(e.nested)) wu(i, t, r);
    }
    __name(wu, "wu");
    function Li(e) {
      return me(e);
    }
    __name(Li, "Li");
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    function bu(e) {
      return new _i(e).deserialize();
    }
    __name(bu, "bu");
    function im(e) {
      return g.from(e, "base64url");
    }
    __name(im, "im");
    var _i = class {
      static {
        __name(this, "_i");
      }
      #e;
      #t;
      #r = 0;
      constructor(t) {
        this.#e = t;
        let r = im(t.graph);
        this.#t = new DataView(r.buffer, r.byteOffset, r.byteLength);
      }
      deserialize() {
        let { inputNodeCount: t, outputNodeCount: r, rootCount: n } = this.#a(), i = this.#u(t), o = this.#l(r), s2 = this.#p(n);
        return { strings: this.#e.strings, inputNodes: i, outputNodes: o, roots: s2 };
      }
      #n() {
        let t = 0, r = 0, n;
        do
          n = this.#t.getUint8(this.#r++), t |= (n & 127) << r, r += 7;
        while (n >= 128);
        return t;
      }
      #i() {
        let t = this.#n();
        return t === 0 ? void 0 : t - 1;
      }
      #o() {
        let t = this.#t.getUint8(this.#r);
        return this.#r += 1, t;
      }
      #s() {
        let t = this.#t.getUint16(this.#r, true);
        return this.#r += 2, t;
      }
      #a() {
        let t = this.#n(), r = this.#n(), n = this.#n();
        return { inputNodeCount: t, outputNodeCount: r, rootCount: n };
      }
      #u(t) {
        let r = [];
        for (let n = 0; n < t; n++) {
          let i = this.#n(), o = {};
          for (let s2 = 0; s2 < i; s2++) {
            let a = this.#n(), m = this.#s(), f = this.#i(), T = this.#i(), v = { flags: this.#o() };
            m !== 0 && (v.scalarMask = m), f !== void 0 && (v.childNodeId = f), T !== void 0 && (v.enumNameIndex = T), o[a] = v;
          }
          r.push({ edges: o });
        }
        return r;
      }
      #l(t) {
        let r = [];
        for (let n = 0; n < t; n++) {
          let i = this.#n(), o = {};
          for (let s2 = 0; s2 < i; s2++) {
            let a = this.#n(), m = this.#i(), f = this.#i(), T = {};
            m !== void 0 && (T.argsNodeId = m), f !== void 0 && (T.outputNodeId = f), o[a] = T;
          }
          r.push({ edges: o });
        }
        return r;
      }
      #p(t) {
        let r = {};
        for (let n = 0; n < t; n++) {
          let i = this.#n(), o = this.#i(), s2 = this.#i(), a = this.#e.strings[i], m = {};
          o !== void 0 && (m.argsNodeId = o), s2 !== void 0 && (m.outputNodeId = s2), r[a] = m;
        }
        return r;
      }
    };
    var pr = class e {
      static {
        __name(this, "e");
      }
      #e;
      #t;
      #r;
      constructor(t, r) {
        this.#e = t, this.#r = r, this.#t = /* @__PURE__ */ new Map();
        for (let n = 0; n < t.strings.length; n++) this.#t.set(t.strings[n], n);
      }
      static deserialize(t, r) {
        let n = bu(t);
        return new e(n, r);
      }
      static fromData(t, r) {
        return new e(t, r);
      }
      root(t) {
        let r = this.#e.roots[t];
        if (r) return { argsNodeId: r.argsNodeId, outputNodeId: r.outputNodeId };
      }
      inputNode(t) {
        if (!(t === void 0 || t < 0 || t >= this.#e.inputNodes.length)) return { id: t };
      }
      outputNode(t) {
        if (!(t === void 0 || t < 0 || t >= this.#e.outputNodes.length)) return { id: t };
      }
      inputEdge(t, r) {
        if (!t) return;
        let n = this.#e.inputNodes[t.id];
        if (!n) return;
        let i = this.#t.get(r);
        if (i === void 0) return;
        let o = n.edges[i];
        if (o) return { flags: o.flags, childNodeId: o.childNodeId, scalarMask: o.scalarMask ?? 0, enumNameIndex: o.enumNameIndex };
      }
      outputEdge(t, r) {
        if (!t) return;
        let n = this.#e.outputNodes[t.id];
        if (!n) return;
        let i = this.#t.get(r);
        if (i === void 0) return;
        let o = n.edges[i];
        if (o) return { argsNodeId: o.argsNodeId, outputNodeId: o.outputNodeId };
      }
      enumValues(t) {
        if (t?.enumNameIndex === void 0) return;
        let r = this.#e.strings[t.enumNameIndex];
        if (r) return this.#r(r);
      }
      getString(t) {
        return this.#e.strings[t];
      }
    };
    var Ce = { ParamScalar: 1, ParamEnum: 2, ParamListScalar: 4, ParamListEnum: 8, ListObject: 16, Object: 32 };
    var te = { String: 1, Int: 2, BigInt: 4, Float: 8, Decimal: 16, Boolean: 32, DateTime: 64, Json: 128, Bytes: 256 };
    function Re(e, t) {
      return (e.flags & t) !== 0;
    }
    __name(Re, "Re");
    function je(e) {
      return e.scalarMask;
    }
    __name(je, "je");
    u();
    l();
    c();
    p();
    d();
    var om = /* @__PURE__ */ new Set(["DateTime", "Decimal", "BigInt", "Bytes", "Json", "Raw"]);
    function ln(e) {
      if (e == null) return { kind: "null" };
      if (typeof e == "string") return { kind: "primitive", value: e };
      if (typeof e == "number") return { kind: "primitive", value: e };
      if (typeof e == "boolean") return { kind: "primitive", value: e };
      if (Array.isArray(e)) return { kind: "array", items: e };
      if (typeof e == "object") {
        let t = e;
        if ("$type" in t && typeof t.$type == "string") {
          let r = t.$type;
          return om.has(r) ? { kind: "taggedScalar", tag: r, value: t.value } : { kind: "structural", value: t.value };
        }
        return { kind: "object", entries: t };
      }
      return { kind: "structural", value: e };
    }
    __name(ln, "ln");
    function xu(e) {
      return typeof e == "object" && e !== null && !Array.isArray(e) && !("$type" in e);
    }
    __name(xu, "xu");
    function Eu(e) {
      return typeof e == "object" && e !== null && "$type" in e && typeof e.$type == "string";
    }
    __name(Eu, "Eu");
    function Fi(e, t) {
      let r = new cn(t), n = e.modelName ? `${e.modelName}.${e.action}` : e.action, i = t.root(n);
      return { parameterizedQuery: { ...e, query: r.parameterizeFieldSelection(e.query, i?.argsNodeId, i?.outputNodeId) }, placeholderValues: r.getPlaceholderValues() };
    }
    __name(Fi, "Fi");
    function $i(e, t) {
      let r = new cn(t), n = [];
      for (let i = 0; i < e.batch.length; i++) {
        let o = e.batch[i], s2 = o.modelName ? `${o.modelName}.${o.action}` : o.action, a = t.root(s2);
        n.push({ ...o, query: r.parameterizeFieldSelection(o.query, a?.argsNodeId, a?.outputNodeId) });
      }
      return { parameterizedBatch: { ...e, batch: n }, placeholderValues: r.getPlaceholderValues() };
    }
    __name($i, "$i");
    var cn = class {
      static {
        __name(this, "cn");
      }
      #e;
      #t = /* @__PURE__ */ new Map();
      #r = /* @__PURE__ */ new Map();
      #n = 1;
      constructor(t) {
        this.#e = t;
      }
      getPlaceholderValues() {
        return Object.fromEntries(this.#t);
      }
      #i(t, r) {
        let n = am(t, r), i = this.#r.get(n);
        if (i !== void 0) return Tu(i, r);
        let o = `%${this.#n++}`;
        return this.#r.set(n, o), this.#t.set(o, t), Tu(o, r);
      }
      parameterizeFieldSelection(t, r, n) {
        let i = this.#e.inputNode(r), o = this.#e.outputNode(n), s2 = { ...t };
        return t.arguments && t.arguments.$type !== "Raw" && (s2.arguments = this.#o(t.arguments, i)), t.selection && (s2.selection = this.#c(t.selection, o)), s2;
      }
      #o(t, r) {
        if (!r) return t;
        let n = {};
        for (let [i, o] of Object.entries(t)) {
          let s2 = this.#e.inputEdge(r, i);
          s2 ? n[i] = this.#s(o, s2) : n[i] = o;
        }
        return n;
      }
      #s(t, r) {
        let n = ln(t);
        switch (n.kind) {
          case "null":
            return t;
          case "structural":
            return t;
          case "primitive":
            return this.#a(n.value, r);
          case "taggedScalar":
            return this.#u(t, n.tag, r);
          case "array":
            return this.#l(n.items, t, r);
          case "object":
            return this.#p(n.entries, r);
          default:
            throw new Error(`Unknown value kind ${n.kind}`);
        }
      }
      #a(t, r) {
        if (Re(r, Ce.ParamEnum) && r.enumNameIndex !== void 0 && typeof t == "string") {
          let o = this.#e.enumValues(r);
          if (o && Object.hasOwn(o, t)) {
            let s2 = { type: "Enum" };
            return this.#i(o[t], s2);
          }
        }
        if (!Re(r, Ce.ParamScalar)) return t;
        let n = je(r);
        if (n === 0) return t;
        let i = Vi(t);
        return Su(i, n) ? (n & te.Json && (t = JSON.stringify(t)), this.#i(t, i)) : t;
      }
      #u(t, r, n) {
        if (!Re(n, Ce.ParamScalar)) return t;
        let i = je(n);
        if (i === 0 || !Au(r, i)) return t;
        let o = vu(t.$type), s2 = Cu(t);
        return this.#i(s2, o);
      }
      #l(t, r, n) {
        if (Re(n, Ce.ParamScalar) && je(n) & te.Json) {
          let i = he(we(t)), o = { type: "Json" };
          return this.#i(i, o);
        }
        if (Re(n, Ce.ParamEnum)) {
          let i = this.#e.enumValues(n);
          if (i && t.every((o) => typeof o == "string" && Object.hasOwn(i, o))) {
            let o = { type: "List", inner: { type: "Enum" } };
            return this.#i(t, o);
          }
        }
        if (Re(n, Ce.ParamListScalar) && t.every((o) => dm(o, n)) && t.length > 0) {
          let o = t.map((m) => mm(m)), a = { type: "List", inner: cm(t) };
          return this.#i(o, a);
        }
        if (Re(n, Ce.ListObject)) {
          let i = this.#e.inputNode(n.childNodeId);
          if (i) return t.map((o) => xu(o) ? this.#o(o, i) : o);
        }
        return r;
      }
      #p(t, r) {
        if (Re(r, Ce.Object)) {
          let i = this.#e.inputNode(r.childNodeId);
          if (i) return this.#o(t, i);
        }
        if (je(r) & te.Json) {
          let i = he(we(t)), o = { type: "Json" };
          return this.#i(i, o);
        }
        return t;
      }
      #c(t, r) {
        if (!t || !r) return t;
        let n = {};
        for (let [i, o] of Object.entries(t)) {
          if (i === "$scalars" || i === "$composites" || typeof o == "boolean") {
            n[i] = o;
            continue;
          }
          let s2 = this.#e.outputEdge(r, i);
          if (s2) {
            let a = o, m = this.#e.inputNode(s2.argsNodeId), f = this.#e.outputNode(s2.outputNodeId), T = { selection: a.selection ? this.#c(a.selection, f) : {} };
            a.arguments && (T.arguments = this.#o(a.arguments, m)), n[i] = T;
          } else n[i] = o;
        }
        return n;
      }
    };
    function Tu(e, t) {
      return { $type: "Param", value: { name: e, ...t } };
    }
    __name(Tu, "Tu");
    function Pu(e) {
      return e.type === "List" ? `List<${Pu(e.inner)}>` : e.type;
    }
    __name(Pu, "Pu");
    function sm(e) {
      return ArrayBuffer.isView(e) ? g.from(e.buffer, e.byteOffset, e.byteLength).toString("base64") : JSON.stringify(e);
    }
    __name(sm, "sm");
    function am(e, t) {
      let r = Pu(t), n = sm(e);
      return `${r}:${n}`;
    }
    __name(am, "am");
    var um = 2 ** 31 - 1;
    var lm = -(2 ** 31);
    function Vi(e) {
      switch (typeof e) {
        case "boolean":
          return { type: "Boolean" };
        case "number":
          return Number.isInteger(e) ? lm <= e && e <= um ? { type: "Int" } : { type: "BigInt" } : { type: "Float" };
        case "string":
          return { type: "String" };
        default:
          throw new Error("unreachable");
      }
    }
    __name(Vi, "Vi");
    function Su({ type: e }, t) {
      switch (e) {
        case "Boolean":
          return (t & te.Boolean) !== 0;
        case "Int":
          return (t & (te.Int | te.BigInt | te.Float)) !== 0;
        case "BigInt":
          return (t & te.BigInt) !== 0;
        case "Float":
          return (t & te.Float) !== 0;
        case "String":
          return (t & te.String) !== 0;
        default:
          return false;
      }
    }
    __name(Su, "Su");
    function vu(e) {
      switch (e) {
        case "BigInt":
        case "Bytes":
        case "DateTime":
        case "Json":
          return { type: e };
        case "Decimal":
          return { type: "Float" };
        default:
          return;
      }
    }
    __name(vu, "vu");
    function cm(e) {
      let t = { type: "Any" };
      for (let r of e) {
        let n = ln(r), i;
        switch (n.kind) {
          case "primitive":
            i = Vi(n.value);
            break;
          case "taggedScalar":
            i = vu(n.tag) ?? { type: "Any" };
            break;
          default:
            return { type: "Any" };
        }
        t = pm(t, i);
      }
      return t;
    }
    __name(cm, "cm");
    function pm(e, t) {
      if (e.type === "Any") return t;
      if (t.type === "Any" || e.type === t.type) return e;
      let r = { Int: 0, BigInt: 1, Float: 2 }, n = r[e.type], i = r[t.type];
      return n !== void 0 && i !== void 0 ? n >= i ? e : t : { type: "Any" };
    }
    __name(pm, "pm");
    function Au(e, t) {
      switch (e) {
        case "DateTime":
          return (t & te.DateTime) !== 0;
        case "Decimal":
          return (t & te.Decimal) !== 0;
        case "BigInt":
          return (t & te.BigInt) !== 0;
        case "Bytes":
          return (t & te.Bytes) !== 0;
        case "Json":
          return (t & te.Json) !== 0;
        default:
          return false;
      }
    }
    __name(Au, "Au");
    function dm(e, t) {
      let r = ln(e);
      switch (r.kind) {
        case "structural":
          return false;
        case "null":
          return false;
        case "primitive": {
          let n = Vi(r.value), i = je(t);
          return i !== 0 && Su(n, i);
        }
        case "taggedScalar": {
          let n = je(t);
          return n !== 0 && Au(r.tag, n);
        }
        default:
          return false;
      }
    }
    __name(dm, "dm");
    function mm(e) {
      return Eu(e) ? Cu(e) : e;
    }
    __name(mm, "mm");
    function Cu(e) {
      return e.value;
    }
    __name(Cu, "Cu");
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    async function fm() {
      return globalThis.crypto ?? await Promise.resolve().then(() => (We(), Fn));
    }
    __name(fm, "fm");
    async function Ru() {
      return (await fm()).randomUUID();
    }
    __name(Ru, "Ru");
    u();
    l();
    c();
    p();
    d();
    async function Iu(e, t) {
      return new Promise((r) => {
        e.addEventListener(t, r, { once: true });
      });
    }
    __name(Iu, "Iu");
    u();
    l();
    c();
    p();
    d();
    var ae = class extends X {
      static {
        __name(this, "ae");
      }
      name = "TransactionManagerError";
      constructor(t, r) {
        super("Transaction API error: " + t, "P2028", r);
      }
    };
    var nt = class extends ae {
      static {
        __name(this, "nt");
      }
      constructor() {
        super("Transaction not found. Transaction ID is invalid, refers to an old closed transaction Prisma doesn't have information about anymore, or was obtained before disconnecting.");
      }
    };
    var pn = class extends ae {
      static {
        __name(this, "pn");
      }
      constructor(t) {
        super(`Transaction already closed: A ${t} cannot be executed on a committed transaction.`);
      }
    };
    var dn = class extends ae {
      static {
        __name(this, "dn");
      }
      constructor(t) {
        super(`Transaction already closed: A ${t} cannot be executed on a transaction that was rolled back.`);
      }
    };
    var mn = class extends ae {
      static {
        __name(this, "mn");
      }
      constructor() {
        super("Unable to start a transaction in the given time.");
      }
    };
    var fn = class extends ae {
      static {
        __name(this, "fn");
      }
      constructor(t, { timeout: r, timeTaken: n }) {
        super(`A ${t} cannot be executed on an expired transaction. The timeout for this transaction was ${r} ms, however ${n} ms passed since the start of the transaction. Consider increasing the interactive transaction timeout or doing less work in the transaction.`, { operation: t, timeout: r, timeTaken: n });
      }
    };
    var Ie = class extends ae {
      static {
        __name(this, "Ie");
      }
      constructor(t) {
        super(`Internal Consistency Error: ${t}`);
      }
    };
    var gn = class extends ae {
      static {
        __name(this, "gn");
      }
      constructor(t) {
        super(`Invalid isolation level: ${t}`, { isolationLevel: t });
      }
    };
    var gm = 100;
    var Ot = ne("prisma:client:transactionManager");
    var ym = /* @__PURE__ */ __name(() => ({ sql: "COMMIT", args: [], argTypes: [] }), "ym");
    var hm = /* @__PURE__ */ __name(() => ({ sql: "ROLLBACK", args: [], argTypes: [] }), "hm");
    var wm = /* @__PURE__ */ __name(() => ({ sql: '-- Implicit "COMMIT" query via underlying driver', args: [], argTypes: [] }), "wm");
    var bm = /* @__PURE__ */ __name(() => ({ sql: '-- Implicit "ROLLBACK" query via underlying driver', args: [], argTypes: [] }), "bm");
    var dr = class {
      static {
        __name(this, "dr");
      }
      transactions = /* @__PURE__ */ new Map();
      closedTransactions = [];
      driverAdapter;
      transactionOptions;
      tracingHelper;
      #e;
      #t;
      constructor({ driverAdapter: t, transactionOptions: r, tracingHelper: n, onQuery: i, provider: o }) {
        this.driverAdapter = t, this.transactionOptions = r, this.tracingHelper = n, this.#e = i, this.#t = o;
      }
      async startInternalTransaction(t) {
        let r = t !== void 0 ? this.#m(t) : {};
        return await this.tracingHelper.runInChildSpan("start_transaction", () => this.#r(r));
      }
      async startTransaction(t) {
        let r = t !== void 0 ? this.#m(t) : this.transactionOptions;
        return await this.tracingHelper.runInChildSpan("start_transaction", () => this.#r(r));
      }
      async #r(t) {
        if (t.newTxId) return await this.#p(t.newTxId, "start", async (s2) => {
          if (s2.status !== "running") throw new Ie(`Transaction in invalid state ${s2.status} when starting a nested transaction.`);
          if (!s2.transaction) throw new Ie("Transaction missing underlying driver transaction when starting a nested transaction.");
          s2.depth += 1;
          let a = this.#i(s2);
          s2.savepoints.push(a);
          try {
            await this.#o(s2.transaction)(a);
          } catch (m) {
            throw s2.depth -= 1, s2.savepoints.pop(), m;
          }
          return { id: s2.id };
        });
        let r = { id: await Ru(), status: "waiting", timer: void 0, timeout: t.timeout, startedAt: Date.now(), transaction: void 0, operationQueue: Promise.resolve(), depth: 1, savepoints: [], savepointCounter: 0 }, n = new AbortController(), i = ku(() => n.abort(), t.maxWait);
        i?.unref?.();
        let o = this.driverAdapter.startTransaction(t.isolationLevel).catch(vt);
        switch (r.transaction = await Promise.race([o.finally(() => clearTimeout(i)), Iu(n.signal, "abort").then(() => {
        })]), this.transactions.set(r.id, r), r.status) {
          case "waiting":
            if (n.signal.aborted) throw o.then((s2) => s2.rollback()).catch((s2) => Ot("error in discarded transaction:", s2)), await this.#d(r, "timed_out"), new mn();
            return r.status = "running", r.timer = this.#l(r.id, t.timeout), { id: r.id };
          case "timed_out":
          case "running":
          case "committed":
          case "rolled_back":
            throw new Ie(`Transaction in invalid state ${r.status} although it just finished startup.`);
          default:
            L2(r.status, "Unknown transaction status.");
        }
      }
      async commitTransaction(t) {
        return await this.tracingHelper.runInChildSpan("commit_transaction", async () => {
          await this.#p(t, "commit", async (r) => {
            if (r.depth > 1) {
              if (!r.transaction) throw new nt();
              let n = r.savepoints.at(-1);
              if (!n) throw new Ie(`Missing savepoint for nested commit. Depth: ${r.depth}, transactionId: ${r.id}`);
              try {
                await this.#a(r.transaction, n);
              } finally {
                r.savepoints.pop(), r.depth -= 1;
              }
              return;
            }
            await this.#d(r, "committed");
          });
        });
      }
      async rollbackTransaction(t) {
        return await this.tracingHelper.runInChildSpan("rollback_transaction", async () => {
          await this.#p(t, "rollback", async (r) => {
            if (r.depth > 1) {
              if (!r.transaction) throw new nt();
              let n = r.savepoints.at(-1);
              if (!n) throw new Ie(`Missing savepoint for nested rollback. Depth: ${r.depth}, transactionId: ${r.id}`);
              try {
                await this.#s(r.transaction)(n), await this.#a(r.transaction, n);
              } finally {
                r.savepoints.pop(), r.depth -= 1;
              }
              return;
            }
            await this.#d(r, "rolled_back");
          });
        });
      }
      async getTransaction(t, r) {
        let n = this.#n(t.id, r);
        if (n.status === "closing" && (await n.closing, n = this.#n(t.id, r)), !n.transaction) throw new nt();
        return n.transaction;
      }
      #n(t, r) {
        let n = this.transactions.get(t);
        if (!n) {
          let i = this.closedTransactions.find((o) => o.id === t);
          if (i) switch (Ot("Transaction already closed.", { transactionId: t, status: i.status }), i.status) {
            case "closing":
            case "waiting":
            case "running":
              throw new Ie("Active transaction found in closed transactions list.");
            case "committed":
              throw new pn(r);
            case "rolled_back":
              throw new dn(r);
            case "timed_out":
              throw new fn(r, { timeout: i.timeout, timeTaken: Date.now() - i.startedAt });
          }
          else throw Ot("Transaction not found.", t), new nt();
        }
        if (["committed", "rolled_back", "timed_out"].includes(n.status)) throw new Ie("Closed transaction found in active transactions map.");
        return n;
      }
      async cancelAllTransactions() {
        await Promise.allSettled([...this.transactions.values()].map((t) => this.#c(t, async () => {
          let r = this.transactions.get(t.id);
          r && await this.#d(r, "rolled_back");
        })));
      }
      #i(t) {
        return `prisma_sp_${t.savepointCounter++}`;
      }
      #o(t) {
        if (t.createSavepoint) return t.createSavepoint.bind(t);
        throw new ae(`Nested transactions are not supported by adapter "${t.adapterName}" (${t.provider}): createSavepoint is not implemented.`);
      }
      #s(t) {
        if (t.rollbackToSavepoint) return t.rollbackToSavepoint.bind(t);
        throw new ae(`Nested transactions are not supported by adapter "${t.adapterName}" (${t.provider}): rollbackToSavepoint is not implemented.`);
      }
      async #a(t, r) {
        t.releaseSavepoint && await t.releaseSavepoint(r);
      }
      #u(t) {
        Ot("Transaction already committed or rolled back when timeout happened.", t);
      }
      #l(t, r) {
        let n = Date.now(), i = ku(async () => {
          Ot("Transaction timed out.", { transactionId: t, timeoutStartedAt: n, timeout: r });
          let o = this.transactions.get(t);
          if (!o) {
            this.#u(t);
            return;
          }
          await this.#c(o, async () => {
            let s2 = this.transactions.get(t);
            s2 && ["running", "waiting"].includes(s2.status) ? await this.#d(s2, "timed_out") : this.#u(t);
          });
        }, r);
        return i?.unref?.(), i;
      }
      async #p(t, r, n) {
        let i = this.#n(t, r);
        return await this.#c(i, async () => {
          let o = this.#n(t, r);
          return await n(o);
        });
      }
      async #c(t, r) {
        let n = t.operationQueue, i;
        t.operationQueue = new Promise((o) => {
          i = o;
        }), await n;
        try {
          return await r();
        } finally {
          i();
        }
      }
      async #d(t, r) {
        let n = /* @__PURE__ */ __name(async () => {
          Ot("Closing transaction.", { transactionId: t.id, status: r });
          try {
            if (t.transaction && r === "committed") if (t.transaction.options.usePhantomQuery) await this.#f(wm(), t.transaction, () => t.transaction.commit());
            else {
              let i = ym();
              await this.#f(i, t.transaction, () => t.transaction.executeRaw(i)).then(() => t.transaction.commit(), (o) => {
                let s2 = /* @__PURE__ */ __name(() => Promise.reject(o), "s");
                return t.transaction.rollback().then(s2, s2);
              });
            }
            else if (t.transaction) if (t.transaction.options.usePhantomQuery) await this.#f(bm(), t.transaction, () => t.transaction.rollback());
            else {
              let i = hm();
              try {
                await this.#f(i, t.transaction, () => t.transaction.executeRaw(i));
              } finally {
                await t.transaction.rollback();
              }
            }
          } finally {
            t.status = r, clearTimeout(t.timer), t.timer = void 0, this.transactions.delete(t.id), this.closedTransactions.push(t), this.closedTransactions.length > gm && this.closedTransactions.shift();
          }
        }, "n");
        t.status === "closing" ? (await t.closing, this.#n(t.id, r === "committed" ? "commit" : "rollback")) : await Object.assign(t, { status: "closing", reason: r, closing: n() }).closing;
      }
      #m(t) {
        if (!t.timeout) throw new ae("timeout is required");
        if (!t.maxWait) throw new ae("maxWait is required");
        if (t.isolationLevel === "SNAPSHOT") throw new gn(t.isolationLevel);
        return { ...t, timeout: t.timeout, maxWait: t.maxWait };
      }
      #f(t, r, n) {
        return Yr({ query: t, execute: n, provider: this.#t ?? r.provider, tracingHelper: this.tracingHelper, onQuery: this.#e });
      }
    };
    function ku(e, t) {
      return t !== void 0 ? setTimeout(e, t) : void 0;
    }
    __name(ku, "ku");
    var re2 = require_dist2();
    var yn = "7.8.0";
    u();
    l();
    c();
    p();
    d();
    var Ou = { bigint: "bigint", date: "datetime", decimal: "decimal", bytes: "bytes" };
    function Du(e) {
      let t;
      try {
        t = JSON.parse(e);
      } catch (i) {
        throw new Error(`Received invalid serialized parameters: ${i.message}`);
      }
      if (!Array.isArray(t)) throw new Error("Received invalid serialized parameters: expected an array");
      let r = t.map((i) => Mu(i)), n = t.map((i) => Em(i));
      return { args: r, argTypes: n };
    }
    __name(Du, "Du");
    function Mu(e) {
      if (Array.isArray(e)) return e.map((t) => Mu(t));
      if (typeof e == "object" && e !== null && "prisma__value" in e) {
        if (!("prisma__type" in e)) throw new Error("Invalid serialized parameter, prisma__type should be present when prisma__value is present");
        return `${e.prisma__value}`;
      }
      return typeof e == "object" && e !== null ? JSON.stringify(e) : e;
    }
    __name(Mu, "Mu");
    function Em(e) {
      return Array.isArray(e) ? { scalarType: e.length > 0 ? Nu(e[0]) : "unknown", arity: "list" } : { scalarType: Nu(e), arity: "scalar" };
    }
    __name(Em, "Em");
    function Nu(e) {
      return typeof e == "object" && e !== null && "prisma__type" in e && typeof e.prisma__type == "string" && e.prisma__type in Ou ? Ou[e.prisma__type] : typeof e == "number" ? "decimal" : typeof e == "string" ? "string" : "unknown";
    }
    __name(Nu, "Nu");
    u();
    l();
    c();
    p();
    d();
    function Lu(e, t) {
      return { batch: e, transaction: t?.kind === "batch" ? { isolationLevel: t.options.isolationLevel } : void 0 };
    }
    __name(Lu, "Lu");
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    function _u(e) {
      return e ? e.replace(/".*"/g, '"X"').replace(/[\s:\[]([+-]?([0-9]*[.])?[0-9]+)/g, (t) => `${t[0]}5`) : "";
    }
    __name(_u, "_u");
    u();
    l();
    c();
    p();
    d();
    function Fu(e) {
      return e.split(`
`).map((t) => t.replace(/^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)\s*/, "").replace(/\+\d+\s*ms$/, "")).join(`
`);
    }
    __name(Fu, "Fu");
    u();
    l();
    c();
    p();
    d();
    var $u = Je(Vo());
    function Vu({ title: e, user: t = "prisma", repo: r = "prisma", template: n = "bug_report.yml", body: i }) {
      return (0, $u.default)({ user: t, repo: r, template: n, title: e, body: i });
    }
    __name(Vu, "Vu");
    function Uu({ version: e, binaryTarget: t, title: r, description: n, engineVersion: i, database: o, query: s2 }) {
      let a = Ro(6e3 - (s2?.length ?? 0)), m = Fu(pt(a)), f = n ? `# Description
\`\`\`
${n}
\`\`\`` : "", T = pt(`Hi Prisma Team! My Prisma Client just crashed. This is the report:
## Versions

| Name            | Version            |
|-----------------|--------------------|
| Node            | ${y.version?.padEnd(19)}| 
| OS              | ${t?.padEnd(19)}|
| Prisma Client   | ${e?.padEnd(19)}|
| Query Engine    | ${i?.padEnd(19)}|
| Database        | ${o?.padEnd(19)}|

${f}

## Logs
\`\`\`
${m}
\`\`\`

## Client Snippet
\`\`\`ts
// PLEASE FILL YOUR CODE SNIPPET HERE
\`\`\`

## Schema
\`\`\`prisma
// PLEASE ADD YOUR SCHEMA HERE IF POSSIBLE
\`\`\`

## Prisma Engine Query
\`\`\`
${s2 ? _u(s2) : ""}
\`\`\`
`), S = Vu({ title: r, body: T });
      return `${r}

This is a non-recoverable error which probably happens when the Prisma Query Engine has a panic.

${Tr(S)}

If you want the Prisma team to look into it, please open the link above \u{1F64F}
To increase the chance of success, please post your schema and a snippet of
how you used Prisma Client in the issue. 
`;
    }
    __name(Uu, "Uu");
    u();
    l();
    c();
    p();
    d();
    var hn = class e {
      static {
        __name(this, "e");
      }
      #e;
      #t;
      #r;
      #n;
      #i;
      constructor(t, r, n) {
        this.#e = t, this.#t = r, this.#r = n, this.#n = r.getConnectionInfo?.(), this.#i = lr.forSql({ onQuery: this.#e.onQuery, tracingHelper: this.#e.tracingHelper, provider: this.#e.provider, connectionInfo: this.#n });
      }
      static async connect(t) {
        let r, n;
        try {
          r = await t.driverAdapterFactory.connect(), n = new dr({ driverAdapter: r, transactionOptions: t.transactionOptions, tracingHelper: t.tracingHelper, onQuery: t.onQuery, provider: t.provider });
        } catch (i) {
          throw await r?.dispose(), i;
        }
        return new e(t, r, n);
      }
      getConnectionInfo() {
        let t = this.#n ?? { supportsRelationJoins: false };
        return Promise.resolve({ provider: this.#t.provider, connectionInfo: t });
      }
      async execute({ plan: t, placeholderValues: r, transaction: n, batchIndex: i, queryInfo: o }) {
        let s2 = n ? await this.#r.getTransaction(n, i !== void 0 ? "batch query" : "query") : this.#t;
        return await this.#i.run(t, { queryable: s2, transactionManager: n ? { enabled: false } : { enabled: true, manager: this.#r }, scope: r, sqlCommenter: this.#e.sqlCommenters && { plugins: this.#e.sqlCommenters, queryInfo: o } });
      }
      async startTransaction(t) {
        return { ...await this.#r.startTransaction(t), payload: void 0 };
      }
      async commitTransaction(t) {
        await this.#r.commitTransaction(t.id);
      }
      async rollbackTransaction(t) {
        await this.#r.rollbackTransaction(t.id);
      }
      async disconnect() {
        try {
          await this.#r.cancelAllTransactions();
        } finally {
          await this.#t.dispose();
        }
      }
      apiKey() {
        return null;
      }
    };
    u();
    l();
    c();
    p();
    d();
    var wn = class {
      static {
        __name(this, "wn");
      }
      #e;
      #t;
      #r;
      constructor(t = 1e3) {
        this.#e = /* @__PURE__ */ new Map(), this.#t = /* @__PURE__ */ new Map(), this.#r = t;
      }
      getSingle(t) {
        let r = this.#e.get(t);
        return r && (this.#e.delete(t), this.#e.set(t, r)), r;
      }
      setSingle(t, r) {
        if (this.#e.has(t)) {
          this.#e.delete(t), this.#e.set(t, r);
          return;
        }
        if (this.#e.size >= this.#r) {
          let n = this.#e.keys().next().value;
          n !== void 0 && this.#e.delete(n);
        }
        this.#e.set(t, r);
      }
      getBatch(t) {
        let r = this.#t.get(t);
        return r && (this.#t.delete(t), this.#t.set(t, r)), r;
      }
      setBatch(t, r) {
        if (this.#t.has(t)) {
          this.#t.delete(t), this.#t.set(t, r);
          return;
        }
        if (this.#t.size >= this.#r) {
          let n = this.#t.keys().next().value;
          n !== void 0 && this.#t.delete(n);
        }
        this.#t.set(t, r);
      }
      clear() {
        this.#e.clear(), this.#t.clear();
      }
      get size() {
        return this.#e.size + this.#t.size;
      }
      get singleCacheSize() {
        return this.#e.size;
      }
      get batchCacheSize() {
        return this.#t.size;
      }
    };
    u();
    l();
    c();
    p();
    d();
    var Hu = require_dist2();
    u();
    l();
    c();
    p();
    d();
    var bn = /^[\u0009\u0020-\u007E\u0080-\u00FF]+$/;
    function qu(e, t, r) {
      let n = r || {}, i = n.encode || encodeURIComponent;
      if (typeof i != "function") throw new TypeError("option encode is invalid");
      if (!bn.test(e)) throw new TypeError("argument name is invalid");
      let o = i(t);
      if (o && !bn.test(o)) throw new TypeError("argument val is invalid");
      let s2 = e + "=" + o;
      if (n.maxAge !== void 0 && n.maxAge !== null) {
        let a = n.maxAge - 0;
        if (Number.isNaN(a) || !Number.isFinite(a)) throw new TypeError("option maxAge is invalid");
        s2 += "; Max-Age=" + Math.floor(a);
      }
      if (n.domain) {
        if (!bn.test(n.domain)) throw new TypeError("option domain is invalid");
        s2 += "; Domain=" + n.domain;
      }
      if (n.path) {
        if (!bn.test(n.path)) throw new TypeError("option path is invalid");
        s2 += "; Path=" + n.path;
      }
      if (n.expires) {
        if (!Tm(n.expires) || Number.isNaN(n.expires.valueOf())) throw new TypeError("option expires is invalid");
        s2 += "; Expires=" + n.expires.toUTCString();
      }
      if (n.httpOnly && (s2 += "; HttpOnly"), n.secure && (s2 += "; Secure"), n.priority) switch (typeof n.priority == "string" ? n.priority.toLowerCase() : n.priority) {
        case "low": {
          s2 += "; Priority=Low";
          break;
        }
        case "medium": {
          s2 += "; Priority=Medium";
          break;
        }
        case "high": {
          s2 += "; Priority=High";
          break;
        }
        default:
          throw new TypeError("option priority is invalid");
      }
      if (n.sameSite) switch (typeof n.sameSite == "string" ? n.sameSite.toLowerCase() : n.sameSite) {
        case true: {
          s2 += "; SameSite=Strict";
          break;
        }
        case "lax": {
          s2 += "; SameSite=Lax";
          break;
        }
        case "strict": {
          s2 += "; SameSite=Strict";
          break;
        }
        case "none": {
          s2 += "; SameSite=None";
          break;
        }
        default:
          throw new TypeError("option sameSite is invalid");
      }
      return n.partitioned && (s2 += "; Partitioned"), s2;
    }
    __name(qu, "qu");
    function Tm(e) {
      return Object.prototype.toString.call(e) === "[object Date]" || e instanceof Date;
    }
    __name(Tm, "Tm");
    function Bu(e, t) {
      let r = (e || "").split(";").filter((m) => typeof m == "string" && !!m.trim()), n = r.shift() || "", i = Pm(n), o = i.name, s2 = i.value;
      try {
        s2 = t?.decode === false ? s2 : (t?.decode || decodeURIComponent)(s2);
      } catch {
      }
      let a = { name: o, value: s2 };
      for (let m of r) {
        let f = m.split("="), T = (f.shift() || "").trimStart().toLowerCase(), S = f.join("=");
        switch (T) {
          case "expires": {
            a.expires = new Date(S);
            break;
          }
          case "max-age": {
            a.maxAge = Number.parseInt(S, 10);
            break;
          }
          case "secure": {
            a.secure = true;
            break;
          }
          case "httponly": {
            a.httpOnly = true;
            break;
          }
          case "samesite": {
            a.sameSite = S;
            break;
          }
          default:
            a[T] = S;
        }
      }
      return a;
    }
    __name(Bu, "Bu");
    function Pm(e) {
      let t = "", r = "", n = e.split("=");
      return n.length > 1 ? (t = n.shift(), r = n.join("=")) : r = e, { name: t, value: r };
    }
    __name(Pm, "Pm");
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    var xn = class extends Error {
      static {
        __name(this, "xn");
      }
      clientVersion;
      cause;
      constructor(t, r) {
        super(t), this.clientVersion = r.clientVersion, this.cause = r.cause;
      }
      get [Symbol.toStringTag]() {
        return this.name;
      }
    };
    var En = class extends xn {
      static {
        __name(this, "En");
      }
      isRetryable;
      constructor(t, r) {
        super(t, r), this.isRetryable = r.isRetryable ?? true;
      }
    };
    u();
    l();
    c();
    p();
    d();
    function ju(e, t) {
      return { ...e, isRetryable: t };
    }
    __name(ju, "ju");
    var it = class extends En {
      static {
        __name(this, "it");
      }
      name = "InvalidDatasourceError";
      code = "P6001";
      constructor(t, r) {
        super(t, ju(r, false));
      }
    };
    Bt(it, "InvalidDatasourceError");
    function Qu(e) {
      let t = { clientVersion: e.clientVersion }, r;
      try {
        r = new URL(e.accelerateUrl);
      } catch (m) {
        let f = m.message;
        throw new it(`Error validating \`accelerateUrl\`, the URL cannot be parsed, reason: ${f}`, t);
      }
      let { protocol: n, searchParams: i } = r;
      if (n !== "prisma:" && n !== Ar) throw new it("Error validating `accelerateUrl`: the URL must start with the protocol `prisma://` or `prisma+postgres://`", t);
      let o = i.get("api_key");
      if (o === null || o.length < 1) throw new it("Error validating `accelerateUrl`: the URL must contain a valid API key", t);
      let s2 = $n(r) ? "http:" : "https:";
      y.env.TEST_CLIENT_ENGINE_REMOTE_EXECUTOR && r.searchParams.has("use_http") && (s2 = "http:");
      let a = new URL(r.href.replace(n, s2));
      return { apiKey: o, url: a };
    }
    __name(Qu, "Qu");
    u();
    l();
    c();
    p();
    d();
    var Ju = Je(Do());
    var Tn = class {
      static {
        __name(this, "Tn");
      }
      apiKey;
      tracingHelper;
      logLevel;
      logQueries;
      engineHash;
      constructor({ apiKey: t, tracingHelper: r, logLevel: n, logQueries: i, engineHash: o }) {
        this.apiKey = t, this.tracingHelper = r, this.logLevel = n, this.logQueries = i, this.engineHash = o;
      }
      build({ traceparent: t, transactionId: r } = {}) {
        let n = { Accept: "application/json", Authorization: `Bearer ${this.apiKey}`, "Content-Type": "application/json", "Prisma-Engine-Hash": this.engineHash, "Prisma-Engine-Version": Ju.enginesVersion };
        this.tracingHelper.isEnabled() && (n.traceparent = t ?? this.tracingHelper.getTraceParent()), r && (n["X-Transaction-Id"] = r);
        let i = this.#e();
        return i.length > 0 && (n["X-Capture-Telemetry"] = i.join(", ")), n;
      }
      #e() {
        let t = [];
        return this.tracingHelper.isEnabled() && t.push("tracing"), this.logLevel && t.push(this.logLevel), this.logQueries && t.push("query"), t;
      }
    };
    u();
    l();
    c();
    p();
    d();
    function Sm(e) {
      return e[0] * 1e3 + e[1] / 1e6;
    }
    __name(Sm, "Sm");
    function Ui(e) {
      return new Date(Sm(e));
    }
    __name(Ui, "Ui");
    var Gu = ne("prisma:client:clientEngine:remoteExecutor");
    var Pn = class {
      static {
        __name(this, "Pn");
      }
      #e;
      #t;
      #r;
      #n;
      #i;
      #o;
      constructor(t) {
        this.#e = t.clientVersion, this.#n = t.logEmitter, this.#i = t.tracingHelper, this.#o = t.sqlCommenters;
        let { url: r, apiKey: n } = Qu({ clientVersion: t.clientVersion, accelerateUrl: t.accelerateUrl });
        this.#r = new qi(r), this.#t = new Tn({ apiKey: n, engineHash: t.clientVersion, logLevel: t.logLevel, logQueries: t.logQueries, tracingHelper: t.tracingHelper });
      }
      async getConnectionInfo() {
        return await this.#s({ path: "/connection-info", method: "GET" });
      }
      async execute({ plan: t, placeholderValues: r, batchIndex: n, model: i, operation: o, transaction: s2, customFetch: a, queryInfo: m }) {
        let f = m && this.#o?.length ? Zr(this.#o, { query: m }) : void 0;
        return (await this.#s({ path: s2 ? `/transaction/${s2.id}/query` : "/query", method: "POST", body: { model: i, operation: o, plan: t, params: r, comments: f && Object.keys(f).length > 0 ? f : void 0 }, batchRequestIdx: n, fetch: a })).data;
      }
      async startTransaction(t) {
        return { ...await this.#s({ path: "/transaction/start", method: "POST", body: t }), payload: void 0 };
      }
      async commitTransaction(t) {
        await this.#s({ path: `/transaction/${t.id}/commit`, method: "POST" });
      }
      async rollbackTransaction(t) {
        await this.#s({ path: `/transaction/${t.id}/rollback`, method: "POST" });
      }
      disconnect() {
        return Promise.resolve();
      }
      apiKey() {
        return this.#t.apiKey;
      }
      async #s({ path: t, method: r, body: n, fetch: i = globalThis.fetch, batchRequestIdx: o }) {
        let s2 = await this.#r.request({ method: r, path: t, headers: this.#t.build(), body: n, fetch: i });
        s2.ok || await this.#a(s2, o);
        let a = await s2.json();
        return typeof a.extensions == "object" && a.extensions !== null && this.#u(a.extensions), a;
      }
      async #a(t, r) {
        let n = t.headers.get("Prisma-Error-Code"), i = await t.text(), o, s2 = i;
        try {
          o = JSON.parse(i);
        } catch {
          o = {};
        }
        typeof o.code == "string" && (n = o.code), typeof o.error == "string" ? s2 = o.error : typeof o.message == "string" ? s2 = o.message : typeof o.InvalidRequestError == "object" && o.InvalidRequestError !== null && typeof o.InvalidRequestError.reason == "string" && (s2 = o.InvalidRequestError.reason), s2 = s2 || `HTTP ${t.status}: ${t.statusText}`;
        let a = typeof o.meta == "object" && o.meta !== null ? o.meta : o;
        throw new Hu.PrismaClientKnownRequestError(s2, { clientVersion: this.#e, code: n ?? "P6000", batchRequestIdx: r, meta: a });
      }
      #u(t) {
        if (t.logs) for (let r of t.logs) this.#l(r);
        t.spans && this.#i.dispatchEngineSpans(t.spans);
      }
      #l(t) {
        switch (t.level) {
          case "debug":
          case "trace":
            Gu(t);
            break;
          case "error":
          case "warn":
          case "info": {
            this.#n.emit(t.level, { timestamp: Ui(t.timestamp), message: t.attributes.message ?? "", target: t.target ?? "RemoteExecutor" });
            break;
          }
          case "query": {
            this.#n.emit("query", { query: t.attributes.query ?? "", timestamp: Ui(t.timestamp), duration: t.attributes.duration_ms ?? 0, params: t.attributes.params ?? "", target: t.target ?? "RemoteExecutor" });
            break;
          }
          default:
            throw new Error(`Unexpected log level: ${t.level}`);
        }
      }
    };
    var qi = class {
      static {
        __name(this, "qi");
      }
      #e;
      #t;
      #r;
      constructor(t) {
        this.#e = t, this.#t = /* @__PURE__ */ new Map();
      }
      async request({ method: t, path: r, headers: n, body: i, fetch: o }) {
        let s2 = new URL(r, this.#e), a = this.#n(s2);
        a && (n.Cookie = a), this.#r && (n["Accelerate-Query-Engine-Jwt"] = this.#r);
        let m = await o(s2.href, { method: t, body: i !== void 0 ? JSON.stringify(i) : void 0, headers: n });
        return Gu(t, s2, m.status, m.statusText), this.#r = m.headers.get("Accelerate-Query-Engine-Jwt") ?? void 0, this.#i(s2, m), m;
      }
      #n(t) {
        let r = [], n = /* @__PURE__ */ new Date();
        for (let [i, o] of this.#t) {
          if (o.expires && o.expires < n) {
            this.#t.delete(i);
            continue;
          }
          let s2 = o.domain ?? t.hostname, a = o.path ?? "/";
          t.hostname.endsWith(s2) && t.pathname.startsWith(a) && r.push(qu(o.name, o.value));
        }
        return r.length > 0 ? r.join("; ") : void 0;
      }
      #i(t, r) {
        let n = r.headers.getSetCookie?.() || [];
        if (n.length === 0) {
          let i = r.headers.get("Set-Cookie");
          i && n.push(i);
        }
        for (let i of n) {
          let o = Bu(i), s2 = o.domain ?? t.hostname, a = o.path ?? "/", m = `${s2}:${a}:${o.name}`;
          this.#t.set(m, { name: o.name, value: o.value, domain: s2, path: a, expires: o.expires });
        }
      }
    };
    u();
    l();
    c();
    p();
    d();
    var ji = require_dist2();
    var Bi = {};
    var zu = { async loadQueryCompiler(e) {
      let { clientVersion: t, compilerWasm: r } = e;
      if (r === void 0) throw new ji.PrismaClientInitializationError("WASM query compiler was unexpectedly `undefined`", t);
      let n;
      return e.activeProvider === void 0 || Bi[e.activeProvider] === void 0 ? (n = (async () => {
        let i = await r.getRuntime(), o = await r.getQueryCompilerWasmModule();
        if (o == null) throw new ji.PrismaClientInitializationError("The loaded wasm module was unexpectedly `undefined` or `null` once loaded", t);
        let s2 = { [r.importName]: i }, a = new WebAssembly.Instance(o, s2), m = a.exports.__wbindgen_start;
        return i.__wbg_set_wasm(a.exports), m(), i.QueryCompiler;
      })(), e.activeProvider !== void 0 && (Bi[e.activeProvider] = n)) : n = Bi[e.activeProvider], await n;
    } };
    var vm = "P2038";
    var Le = ne("prisma:client:clientEngine");
    var Yu = globalThis;
    Yu.PRISMA_WASM_PANIC_REGISTRY = { set_message(e) {
      throw new re2.PrismaClientRustPanicError(e, yn);
    } };
    var mr = class {
      static {
        __name(this, "mr");
      }
      name = "ClientEngine";
      #e;
      #t = { type: "disconnected" };
      #r;
      #n;
      #i;
      #o;
      config;
      datamodel;
      logEmitter;
      logQueries;
      logLevel;
      tracingHelper;
      #s;
      constructor(t, r) {
        if (t.accelerateUrl !== void 0) this.#n = { remote: true, accelerateUrl: t.accelerateUrl };
        else if (t.adapter) this.#n = { remote: false, driverAdapterFactory: t.adapter }, Le("Using driver adapter: %O", t.adapter);
        else throw new re2.PrismaClientInitializationError("Missing configured driver adapter. Engine type `client` requires an active driver adapter. Please check your PrismaClient initialization code.", t.clientVersion, vm);
        this.#r = r ?? zu, this.config = t, this.logQueries = t.logQueries ?? false, this.logLevel = t.logLevel ?? "error", this.logEmitter = t.logEmitter, this.datamodel = t.inlineSchema, this.tracingHelper = t.tracingHelper, this.#i = t.queryPlanCacheMaxSize === 0 ? void 0 : new wn(t.queryPlanCacheMaxSize), this.#o = pr.deserialize(t.parameterizationSchema, (n) => {
          if (!Object.hasOwn(t.runtimeDataModel.enums, n)) return;
          let i = {};
          for (let o of t.runtimeDataModel.enums[n].values) i[o.name] = o.dbName ?? o.name;
          return i;
        }), t.enableDebugLogs && (this.logLevel = "debug"), this.logQueries && (this.#s = (n) => {
          this.logEmitter.emit("query", { ...n, params: he(n.params), target: "ClientEngine" });
        });
      }
      async #a() {
        switch (this.#t.type) {
          case "disconnected": {
            let t = this.tracingHelper.runInChildSpan("connect", async () => {
              let r, n;
              try {
                r = await this.#u(), n = await this.#l(r);
              } catch (o) {
                throw this.#t = { type: "disconnected" }, n?.free(), await r?.disconnect(), o;
              }
              let i = { executor: r, queryCompiler: n };
              return this.#t = { type: "connected", engine: i }, i;
            });
            return this.#t = { type: "connecting", promise: t }, await t;
          }
          case "connecting":
            return await this.#t.promise;
          case "connected":
            return this.#t.engine;
          case "disconnecting":
            return await this.#t.promise, await this.#a();
        }
      }
      async #u() {
        return this.#n.remote ? new Pn({ clientVersion: this.config.clientVersion, accelerateUrl: this.#n.accelerateUrl, logEmitter: this.logEmitter, logLevel: this.logLevel, logQueries: this.logQueries, tracingHelper: this.tracingHelper, sqlCommenters: this.config.sqlCommenters }) : await hn.connect({ driverAdapterFactory: this.#n.driverAdapterFactory, tracingHelper: this.tracingHelper, transactionOptions: { ...this.config.transactionOptions, isolationLevel: this.#y(this.config.transactionOptions.isolationLevel) }, onQuery: this.#s, provider: this.config.activeProvider, sqlCommenters: this.config.sqlCommenters });
      }
      async #l(t) {
        let r = this.#e;
        r === void 0 && (r = await this.#r.loadQueryCompiler(this.config), this.#e = r);
        let { provider: n, connectionInfo: i } = await t.getConnectionInfo();
        try {
          return this.#m(() => new r({ datamodel: this.datamodel, provider: n, connectionInfo: i }), void 0, false);
        } catch (o) {
          throw this.#p(o);
        }
      }
      #p(t) {
        if (t instanceof re2.PrismaClientRustPanicError) return t;
        try {
          let r = JSON.parse(t.message);
          return new re2.PrismaClientInitializationError(r.message, this.config.clientVersion, r.error_code);
        } catch {
          return t;
        }
      }
      #c(t, r) {
        if (t instanceof re2.PrismaClientInitializationError) return t;
        if (t.code === "GenericFailure" && t.message?.startsWith("PANIC:")) return new re2.PrismaClientRustPanicError(Wu(this, t.message, r), this.config.clientVersion);
        if (t instanceof X) return new re2.PrismaClientKnownRequestError(t.message, { code: t.code, meta: t.meta, clientVersion: this.config.clientVersion });
        try {
          let n = JSON.parse(t);
          return new re2.PrismaClientUnknownRequestError(`${n.message}
${n.backtrace}`, { clientVersion: this.config.clientVersion });
        } catch {
          return t;
        }
      }
      #d(t) {
        return t instanceof re2.PrismaClientRustPanicError ? t : typeof t.message == "string" && typeof t.code == "string" ? new re2.PrismaClientKnownRequestError(t.message, { code: t.code, meta: t.meta, clientVersion: this.config.clientVersion }) : typeof t.message == "string" ? new re2.PrismaClientUnknownRequestError(t.message, { clientVersion: this.config.clientVersion }) : t;
      }
      #m(t, r, n = true) {
        let i = Yu.PRISMA_WASM_PANIC_REGISTRY.set_message, o;
        globalThis.PRISMA_WASM_PANIC_REGISTRY.set_message = (s2) => {
          o = s2;
        };
        try {
          return t();
        } finally {
          if (globalThis.PRISMA_WASM_PANIC_REGISTRY.set_message = i, o) throw this.#e = void 0, n && this.stop().catch((s2) => Le("failed to disconnect:", s2)), new re2.PrismaClientRustPanicError(Wu(this, o, r), this.config.clientVersion);
        }
      }
      onBeforeExit() {
        throw new Error('"beforeExit" hook is not applicable to the client engine, it is only relevant and implemented for the binary engine. Please add your event listener to the `process` object directly instead.');
      }
      async start() {
        await this.#a();
      }
      async stop() {
        switch (this.#t.type) {
          case "disconnected":
            return;
          case "connecting":
            return await this.#t.promise, await this.stop();
          case "connected": {
            let t = this.#t.engine, r = this.tracingHelper.runInChildSpan("disconnect", async () => {
              try {
                await t.executor.disconnect(), t.queryCompiler.free();
              } finally {
                this.#t = { type: "disconnected" };
              }
            });
            return this.#t = { type: "disconnecting", promise: r }, await r;
          }
          case "disconnecting":
            return await this.#t.promise;
        }
      }
      version() {
        return "unknown";
      }
      async transaction(t, r, n) {
        let i, { executor: o } = await this.#a();
        try {
          if (t === "start") {
            let s2 = n;
            i = await o.startTransaction({ ...s2, isolationLevel: this.#y(s2.isolationLevel) });
          } else if (t === "commit") {
            let s2 = n;
            await o.commitTransaction(s2);
          } else if (t === "rollback") {
            let s2 = n;
            await o.rollbackTransaction(s2);
          } else Ne(t, "Invalid transaction action.");
        } catch (s2) {
          throw this.#c(s2);
        }
        return i ? { id: i.id, payload: void 0 } : void 0;
      }
      async request(t, { interactiveTransaction: r, customDataProxyFetch: n }) {
        Le("sending request");
        let { executor: i, queryCompiler: o } = await this.#a().catch((m) => {
          throw this.#c(m, JSON.stringify(t));
        }), s2, a = {};
        if (Ku(t)) s2 = Zu(t);
        else {
          let { parameterizedQuery: m, placeholderValues: f } = Fi(t, this.#o), T = JSON.stringify(m);
          a = f;
          let S = t.action !== "createMany" && t.action !== "createManyAndReturn", v = S ? this.#i?.getSingle(T) : void 0;
          v ? (Le("query plan cache hit"), s2 = v) : (Le("query plan cache miss"), s2 = this.#f(m, T, o), S && this.#i?.setSingle(T, s2));
        }
        try {
          Le("query plan created", s2);
          let m = await i.execute({ plan: s2, model: t.modelName, operation: t.action, placeholderValues: a, transaction: r, batchIndex: void 0, customFetch: n?.(globalThis.fetch), queryInfo: { type: "single", modelName: t.modelName, action: t.action, query: t.query } });
          return Le("query plan executed"), { data: { [t.action]: m } };
        } catch (m) {
          throw this.#c(m, JSON.stringify(t));
        }
      }
      async requestBatch(t, { transaction: r, customDataProxyFetch: n }) {
        if (t.length === 0) return [];
        let i = t[0].action, o = t[0].modelName, s2 = Lu(t, r), a = JSON.stringify(s2), { executor: m, queryCompiler: f } = await this.#a().catch((A) => {
          throw this.#c(A, a);
        }), T = o === void 0, S, v = {};
        if (T) S = this.#g(t, a, f);
        else {
          let { parameterizedBatch: A, placeholderValues: N } = $i(s2, this.#o), R = JSON.stringify(A);
          v = N;
          let I2 = this.#i?.getBatch(R);
          if (I2) Le("batch query plan cache hit"), S = I2;
          else {
            Le("batch query plan cache miss");
            try {
              S = this.#g(A.batch, R, f), this.#i?.setBatch(R, S);
            } catch (J) {
              throw this.#d(J);
            }
          }
        }
        try {
          let A;
          switch (r?.kind === "itx" && (A = r.options), S.type) {
            case "multi": {
              if (r?.kind !== "itx") {
                let I2 = r?.options, J = { maxWait: I2?.maxWait ?? this.config.transactionOptions.maxWait, timeout: I2?.timeout ?? this.config.transactionOptions.timeout, isolationLevel: I2?.isolationLevel ?? this.config.transactionOptions.isolationLevel };
                A = await this.transaction("start", {}, J);
              }
              let N = [], R = false;
              for (let [I2, J] of S.plans.entries()) try {
                let j = await m.execute({ plan: J, placeholderValues: v, model: t[I2].modelName, operation: t[I2].action, batchIndex: I2, transaction: A, customFetch: n?.(globalThis.fetch), queryInfo: { type: "single", ...t[I2] } });
                N.push({ data: { [t[I2].action]: j } });
              } catch (j) {
                N.push(j), R = true;
                break;
              }
              return A !== void 0 && r?.kind !== "itx" && (R ? await this.transaction("rollback", {}, A) : await this.transaction("commit", {}, A)), N;
            }
            case "compacted": {
              if (!t.every((I2) => I2.action === i && I2.modelName === o)) {
                let I2 = t.map((j) => j.action).join(", "), J = t.map((j) => j.modelName).join(", ");
                throw new Error(`Internal error: All queries in a compacted batch must have the same action and model name, but received actions: [${I2}] and model names: [${J}]. This indicates a bug in the client. Please report this issue to the Prisma team with your query details.`);
              }
              if (o === void 0) throw new Error("Internal error: A compacted batch cannot contain raw queries. This indicates a bug in the client. Please report this issue to the Prisma team with your query details.");
              let N = await m.execute({ plan: S.plan, placeholderValues: v, model: o, operation: i, batchIndex: void 0, transaction: A, customFetch: n?.(globalThis.fetch), queryInfo: { type: "compacted", action: i, modelName: o, queries: t } });
              return ta(N, S, v).map((I2) => ({ data: { [i]: I2 } }));
            }
          }
        } catch (A) {
          throw this.#c(A, a);
        }
      }
      async apiKey() {
        let { executor: t } = await this.#a();
        return t.apiKey();
      }
      #f(t, r, n) {
        try {
          return this.#m(() => this.#h({ queries: [t], execute: /* @__PURE__ */ __name(() => n.compile(r), "execute") }));
        } catch (i) {
          throw this.#d(i);
        }
      }
      #g(t, r, n) {
        if (t.every(Ku)) return { type: "multi", plans: t.map((i) => Zu(i)) };
        try {
          return this.#m(() => this.#h({ queries: t, execute: /* @__PURE__ */ __name(() => n.compileBatch(r), "execute") }));
        } catch (i) {
          throw this.#d(i);
        }
      }
      #y(t) {
        switch (t) {
          case void 0:
            return;
          case "ReadUncommitted":
            return "READ UNCOMMITTED";
          case "ReadCommitted":
            return "READ COMMITTED";
          case "RepeatableRead":
            return "REPEATABLE READ";
          case "Serializable":
            return "SERIALIZABLE";
          case "Snapshot":
            return "SNAPSHOT";
          default:
            throw new re2.PrismaClientKnownRequestError(`Inconsistent column data: Conversion failed: Invalid isolation level \`${t}\``, { code: "P2023", clientVersion: this.config.clientVersion, meta: { providedIsolationLevel: t } });
        }
      }
      #h({ queries: t, execute: r }) {
        return this.tracingHelper.runInChildSpan({ name: "compile", attributes: { models: t.map((n) => n.modelName).filter((n) => n !== void 0), actions: t.map((n) => n.action) } }, r);
      }
    };
    function Wu(e, t, r) {
      return Uu({ binaryTarget: void 0, title: t, version: e.config.clientVersion, engineVersion: "unknown", database: e.config.activeProvider, query: r });
    }
    __name(Wu, "Wu");
    function Ku(e) {
      return e.action === "queryRaw" || e.action === "executeRaw";
    }
    __name(Ku, "Ku");
    function Zu(e) {
      let t = e.query.arguments.query, { args: r, argTypes: n } = Du(e.query.arguments.parameters);
      return { type: e.action === "queryRaw" ? "query" : "execute", args: { type: "rawSql", sql: t, args: r, argTypes: n } };
    }
    __name(Zu, "Zu");
    function Xu(e) {
      return new mr(e);
    }
    __name(Xu, "Xu");
    u();
    l();
    c();
    p();
    d();
    var el = /* @__PURE__ */ __name((e) => ({ command: e }), "el");
    u();
    l();
    c();
    p();
    d();
    var ul = require_dist2();
    u();
    l();
    c();
    p();
    d();
    var tl = /* @__PURE__ */ __name((e) => e.strings.reduce((t, r, n) => `${t}@P${n}${r}`), "tl");
    u();
    l();
    c();
    p();
    d();
    var il = require_dist2();
    function Nt(e) {
      try {
        return rl(e, "fast");
      } catch {
        return rl(e, "slow");
      }
    }
    __name(Nt, "Nt");
    function rl(e, t) {
      return JSON.stringify(e.map((r) => ol(r, t)));
    }
    __name(rl, "rl");
    function ol(e, t) {
      if (Array.isArray(e)) return e.map((r) => ol(r, t));
      if (typeof e == "bigint") return { prisma__type: "bigint", prisma__value: e.toString() };
      if (dt(e)) return { prisma__type: "date", prisma__value: e.toJSON() };
      if (il.Decimal.isDecimal(e)) return { prisma__type: "decimal", prisma__value: e.toJSON() };
      if (g.isBuffer(e)) return { prisma__type: "bytes", prisma__value: e.toString("base64") };
      if (Am(e)) return { prisma__type: "bytes", prisma__value: g.from(e).toString("base64") };
      if (ArrayBuffer.isView(e)) {
        let { buffer: r, byteOffset: n, byteLength: i } = e;
        return { prisma__type: "bytes", prisma__value: g.from(r, n, i).toString("base64") };
      }
      return typeof e == "object" && t === "slow" ? sl(e) : e;
    }
    __name(ol, "ol");
    function Am(e) {
      return e instanceof ArrayBuffer || e instanceof SharedArrayBuffer ? true : typeof e == "object" && e !== null ? e[Symbol.toStringTag] === "ArrayBuffer" || e[Symbol.toStringTag] === "SharedArrayBuffer" : false;
    }
    __name(Am, "Am");
    function sl(e) {
      if (typeof e != "object" || e === null) return e;
      if (typeof e.toJSON == "function") return e.toJSON();
      if (Array.isArray(e)) return e.map(nl);
      let t = {};
      for (let r of Object.keys(e)) t[r] = nl(e[r]);
      return t;
    }
    __name(sl, "sl");
    function nl(e) {
      return typeof e == "bigint" ? e.toString() : sl(e);
    }
    __name(nl, "nl");
    var Cm = /^(\s*alter\s)/i;
    var al = ne("prisma:client");
    function Qi(e, t, r, n) {
      if (!(e !== "postgresql" && e !== "cockroachdb") && r.length > 0 && Cm.exec(t)) throw new Error(`Running ALTER using ${n} is not supported
Using the example below you can still execute your query with Prisma, but please note that it is vulnerable to SQL injection attacks and requires you to take care of input sanitization.

Example:
  await prisma.$executeRawUnsafe(\`ALTER USER prisma WITH PASSWORD '\${password}'\`)

More Information: https://pris.ly/d/execute-raw
`);
    }
    __name(Qi, "Qi");
    var Ji = /* @__PURE__ */ __name(({ clientMethod: e, activeProvider: t }) => (r) => {
      let n = "", i;
      if (Qr(r)) n = r.sql, i = { values: Nt(r.values), __prismaRawParameters__: true };
      else if (Array.isArray(r)) {
        let [o, ...s2] = r;
        n = o, i = { values: Nt(s2 || []), __prismaRawParameters__: true };
      } else switch (t) {
        case "sqlite":
        case "mysql": {
          n = r.sql, i = { values: Nt(r.values), __prismaRawParameters__: true };
          break;
        }
        case "cockroachdb":
        case "postgresql":
        case "postgres": {
          n = r.text, i = { values: Nt(r.values), __prismaRawParameters__: true };
          break;
        }
        case "sqlserver": {
          n = tl(r), i = { values: Nt(r.values), __prismaRawParameters__: true };
          break;
        }
        default:
          throw new Error(`The ${t} provider does not support ${e}`);
      }
      return i?.values ? al(`prisma.${e}(${n}, ${i.values})`) : al(`prisma.${e}(${n})`), { query: n, parameters: i };
    }, "Ji");
    var ll = { requestArgsToMiddlewareArgs(e) {
      return [e.strings, ...e.values];
    }, middlewareArgsToRequestArgs(e) {
      let [t, ...r] = e;
      return new ul.Sql(t, r);
    } };
    var cl = { requestArgsToMiddlewareArgs(e) {
      return [e];
    }, middlewareArgsToRequestArgs(e) {
      return e[0];
    } };
    u();
    l();
    c();
    p();
    d();
    function Hi(e) {
      return function(r, n) {
        let i, o = /* @__PURE__ */ __name((s2 = e) => {
          try {
            return s2 === void 0 || s2?.kind === "itx" ? i ??= pl(r(s2)) : pl(r(s2));
          } catch (a) {
            return Promise.reject(a);
          }
        }, "o");
        return { get spec() {
          return n;
        }, then(s2, a) {
          return o().then(s2, a);
        }, catch(s2) {
          return o().catch(s2);
        }, finally(s2) {
          return o().finally(s2);
        }, requestTransaction(s2) {
          let a = o(s2);
          return a.requestTransaction ? a.requestTransaction(s2) : a;
        }, [Symbol.toStringTag]: "PrismaPromise" };
      };
    }
    __name(Hi, "Hi");
    function pl(e) {
      return typeof e.then == "function" ? e : Promise.resolve(e);
    }
    __name(pl, "pl");
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    u();
    l();
    c();
    p();
    d();
    var dl = { name: "@prisma/instrumentation-contract", version: "7.8.0", description: "Shared types and utilities for Prisma instrumentation", main: "dist/index.js", module: "dist/index.mjs", types: "dist/index.d.ts", exports: { ".": { require: { types: "./dist/index.d.ts", default: "./dist/index.js" }, import: { types: "./dist/index.d.mts", default: "./dist/index.mjs" } } }, license: "Apache-2.0", homepage: "https://www.prisma.io", repository: { type: "git", url: "https://github.com/prisma/prisma.git", directory: "packages/instrumentation-contract" }, bugs: "https://github.com/prisma/prisma/issues", scripts: { dev: "DEV=true tsx helpers/build.ts", build: "tsx helpers/build.ts", prepublishOnly: "pnpm run build", test: "vitest run" }, files: ["dist"], sideEffects: false, devDependencies: { "@opentelemetry/api": "1.9.0" }, peerDependencies: { "@opentelemetry/api": "^1.8" } };
    var Im = dl.version.split(".")[0];
    var km = "PRISMA_INSTRUMENTATION";
    var Om = `V${Im}_PRISMA_INSTRUMENTATION`;
    var ml = globalThis;
    function fl() {
      let e = ml[Om];
      return e?.helper ? e.helper : ml[km]?.helper;
    }
    __name(fl, "fl");
    var Nm = { isEnabled() {
      return false;
    }, getTraceParent() {
      return "00-10-10-00";
    }, dispatchEngineSpans() {
    }, getActiveContext() {
    }, runInChildSpan(e, t) {
      return t();
    } };
    var Gi = class {
      static {
        __name(this, "Gi");
      }
      isEnabled() {
        return this.getTracingHelper().isEnabled();
      }
      getTraceParent(t) {
        return this.getTracingHelper().getTraceParent(t);
      }
      dispatchEngineSpans(t) {
        return this.getTracingHelper().dispatchEngineSpans(t);
      }
      getActiveContext() {
        return this.getTracingHelper().getActiveContext();
      }
      runInChildSpan(t, r) {
        return this.getTracingHelper().runInChildSpan(t, r);
      }
      getTracingHelper() {
        return fl() ?? Nm;
      }
    };
    function gl() {
      return new Gi();
    }
    __name(gl, "gl");
    u();
    l();
    c();
    p();
    d();
    function yl(e, t = () => {
    }) {
      let r, n = new Promise((i) => r = i);
      return { then(i) {
        return --e === 0 && r(t()), i?.(n);
      } };
    }
    __name(yl, "yl");
    u();
    l();
    c();
    p();
    d();
    function hl(e) {
      return typeof e == "string" ? e : e.reduce((t, r) => {
        let n = typeof r == "string" ? r : r.level;
        return n === "query" ? t : t && (r === "info" || t === "info") ? "info" : n;
      }, void 0);
    }
    __name(hl, "hl");
    u();
    l();
    c();
    p();
    d();
    var bl = require_dist2();
    u();
    l();
    c();
    p();
    d();
    function Wi(e) {
      if (e.action !== "findUnique" && e.action !== "findUniqueOrThrow") return;
      let t = [];
      return e.modelName && t.push(e.modelName), e.query.arguments && t.push(zi(e.query.arguments)), t.push(zi(e.query.selection)), t.join("");
    }
    __name(Wi, "Wi");
    function zi(e) {
      return `(${Object.keys(e).sort().map((r) => {
        let n = e[r];
        return typeof n == "object" && n !== null ? `(${r} ${zi(n)})` : r;
      }).join(" ")})`;
    }
    __name(zi, "zi");
    u();
    l();
    c();
    p();
    d();
    var Dm = { aggregate: false, aggregateRaw: false, createMany: true, createManyAndReturn: true, createOne: true, deleteMany: true, deleteOne: true, executeRaw: true, findFirst: false, findFirstOrThrow: false, findMany: false, findRaw: false, findUnique: false, findUniqueOrThrow: false, groupBy: false, queryRaw: false, runCommandRaw: true, updateMany: true, updateManyAndReturn: true, updateOne: true, upsertOne: true };
    function Ki(e) {
      return Dm[e];
    }
    __name(Ki, "Ki");
    u();
    l();
    c();
    p();
    d();
    var Sn = class {
      static {
        __name(this, "Sn");
      }
      constructor(t) {
        this.options = t;
        this.batches = {};
      }
      batches;
      tickActive = false;
      request(t) {
        let r = this.options.batchBy(t);
        return r ? (this.batches[r] || (this.batches[r] = [], this.tickActive || (this.tickActive = true, y.nextTick(() => {
          this.dispatchBatches(), this.tickActive = false;
        }))), new Promise((n, i) => {
          this.batches[r].push({ request: t, resolve: n, reject: i });
        })) : this.options.singleLoader(t);
      }
      dispatchBatches() {
        for (let t in this.batches) {
          let r = this.batches[t];
          delete this.batches[t], r.length === 1 ? this.options.singleLoader(r[0].request).then((n) => {
            n instanceof Error ? r[0].reject(n) : r[0].resolve(n);
          }).catch((n) => {
            r[0].reject(n);
          }) : (r.sort((n, i) => this.options.batchOrder(n.request, i.request)), this.options.batchLoader(r.map((n) => n.request)).then((n) => {
            if (n instanceof Error) for (let i = 0; i < r.length; i++) r[i].reject(n);
            else for (let i = 0; i < r.length; i++) {
              let o = n[i];
              o instanceof Error ? r[i].reject(o) : r[i].resolve(o);
            }
          }).catch((n) => {
            for (let i = 0; i < r.length; i++) r[i].reject(n);
          }));
        }
      }
      get [Symbol.toStringTag]() {
        return "DataLoader";
      }
    };
    u();
    l();
    c();
    p();
    d();
    var wl = require_dist2();
    function ot(e, t) {
      if (t === null) return t;
      switch (e) {
        case "bigint":
          return BigInt(t);
        case "bytes": {
          let { buffer: r, byteOffset: n, byteLength: i } = g.from(t, "base64");
          return new Uint8Array(r, n, i);
        }
        case "decimal":
          return new wl.Decimal(t);
        case "datetime":
        case "date":
          return new Date(t);
        case "time":
          return /* @__PURE__ */ new Date(`1970-01-01T${t}Z`);
        case "bigint-array":
          return t.map((r) => ot("bigint", r));
        case "bytes-array":
          return t.map((r) => ot("bytes", r));
        case "decimal-array":
          return t.map((r) => ot("decimal", r));
        case "datetime-array":
          return t.map((r) => ot("datetime", r));
        case "date-array":
          return t.map((r) => ot("date", r));
        case "time-array":
          return t.map((r) => ot("time", r));
        default:
          return t;
      }
    }
    __name(ot, "ot");
    function vn(e) {
      let t = [], r = Mm(e);
      for (let n = 0; n < e.rows.length; n++) {
        let i = e.rows[n], o = { ...r };
        for (let s2 = 0; s2 < i.length; s2++) o[e.columns[s2]] = ot(e.types[s2], i[s2]);
        t.push(o);
      }
      return t;
    }
    __name(vn, "vn");
    function Mm(e) {
      let t = {};
      for (let r = 0; r < e.columns.length; r++) t[e.columns[r]] = null;
      return t;
    }
    __name(Mm, "Mm");
    var Lm = ne("prisma:client:request_handler");
    var An = class {
      static {
        __name(this, "An");
      }
      client;
      dataloader;
      logEmitter;
      constructor(t, r) {
        this.logEmitter = r, this.client = t, this.dataloader = new Sn({ batchLoader: js(async ({ requests: n, customDataProxyFetch: i }) => {
          let { transaction: o, otelParentCtx: s2 } = n[0], a = n.map((S) => S.protocolQuery), m = this.client._tracingHelper.getTraceParent(s2), f = n.some((S) => Ki(S.protocolQuery.action));
          return (await this.client._engine.requestBatch(a, { traceparent: m, transaction: _m(o), containsWrite: f, customDataProxyFetch: i })).map((S, v) => {
            if (S instanceof Error) return S;
            try {
              return this.mapQueryEngineResult(n[v], S);
            } catch (A) {
              return A;
            }
          });
        }), singleLoader: /* @__PURE__ */ __name(async (n) => {
          let i = n.transaction?.kind === "itx" ? xl(n.transaction) : void 0, o = await this.client._engine.request(n.protocolQuery, { traceparent: this.client._tracingHelper.getTraceParent(), interactiveTransaction: i, isWrite: Ki(n.protocolQuery.action), customDataProxyFetch: n.customDataProxyFetch });
          return this.mapQueryEngineResult(n, o);
        }, "singleLoader"), batchBy: /* @__PURE__ */ __name((n) => {
          if (n.transaction?.kind === "itx") {
            let i = Wi(n.protocolQuery);
            return `itx-${n.transaction.id}${i ? `-${i}` : ""}`;
          }
          return n.transaction?.id ? `transaction-${n.transaction.id}` : Wi(n.protocolQuery);
        }, "batchBy"), batchOrder(n, i) {
          return n.transaction?.kind === "batch" && i.transaction?.kind === "batch" ? n.transaction.index - i.transaction.index : 0;
        } });
      }
      async request(t) {
        try {
          return await this.dataloader.request(t);
        } catch (r) {
          let { clientMethod: n, callsite: i, transaction: o, args: s2, modelName: a } = t;
          this.handleAndLogRequestError({ error: r, clientMethod: n, callsite: i, transaction: o, args: s2, modelName: a, globalOmit: t.globalOmit });
        }
      }
      mapQueryEngineResult({ dataPath: t, unpacker: r }, n) {
        let i = n?.data, o = this.unpack(i, t, r);
        return y.env.PRISMA_CLIENT_GET_TIME ? { data: o } : o;
      }
      handleAndLogRequestError(t) {
        try {
          this.handleRequestError(t);
        } catch (r) {
          throw this.logEmitter && this.logEmitter.emit("error", { message: r.message, target: t.clientMethod, timestamp: /* @__PURE__ */ new Date() }), r;
        }
      }
      handleRequestError({ error: t, clientMethod: r, callsite: n, transaction: i, args: o, modelName: s2, globalOmit: a }) {
        if (Lm(t), Fm(t, i)) throw t;
        if (t instanceof D2.PrismaClientKnownRequestError && $m(t)) {
          let f = El(t.meta);
          $r({ args: o, errors: [f], callsite: n, errorFormat: this.client._errorFormat, originalMethod: r, clientVersion: this.client._clientVersion, globalOmit: a });
        }
        let m = t.message;
        if (n && (m = kr({ callsite: n, originalMethod: r, isPanic: t.isPanic, showColors: this.client._errorFormat === "pretty", message: m })), m = this.sanitizeMessage(m), t.code) {
          let f = s2 ? { modelName: s2, ...t.meta } : t.meta;
          throw new D2.PrismaClientKnownRequestError(m, { code: t.code, clientVersion: this.client._clientVersion, meta: f, batchRequestIdx: t.batchRequestIdx });
        } else {
          if (t.isPanic) throw new D2.PrismaClientRustPanicError(m, this.client._clientVersion);
          if (t instanceof D2.PrismaClientUnknownRequestError) throw new D2.PrismaClientUnknownRequestError(m, { clientVersion: this.client._clientVersion, batchRequestIdx: t.batchRequestIdx });
          if (t instanceof D2.PrismaClientInitializationError) throw new D2.PrismaClientInitializationError(m, this.client._clientVersion);
          if (t instanceof D2.PrismaClientRustPanicError) throw new D2.PrismaClientRustPanicError(m, this.client._clientVersion);
        }
        throw t.clientVersion = this.client._clientVersion, t;
      }
      sanitizeMessage(t) {
        return this.client._errorFormat && this.client._errorFormat !== "pretty" ? pt(t) : t;
      }
      unpack(t, r, n) {
        if (!t || (t.data && (t = t.data), !t)) return t;
        let i = Object.keys(t)[0], o = Object.values(t)[0], s2 = r.filter((f) => f !== "select" && f !== "include"), a = Yn(o, s2), m = i === "queryRaw" ? vn(a) : we(a);
        return n ? n(m) : m;
      }
      get [Symbol.toStringTag]() {
        return "RequestHandler";
      }
    };
    function _m(e) {
      if (e) {
        if (e.kind === "batch") return { kind: "batch", options: { isolationLevel: e.isolationLevel, maxWait: e.maxWait, timeout: e.timeout } };
        if (e.kind === "itx") return { kind: "itx", options: xl(e) };
        Ne(e, "Unknown transaction kind");
      }
    }
    __name(_m, "_m");
    function xl(e) {
      return { id: e.id, payload: e.payload };
    }
    __name(xl, "xl");
    function Fm(e, t) {
      return (0, bl.hasBatchIndex)(e) && t?.kind === "batch" && e.batchRequestIdx !== t.index;
    }
    __name(Fm, "Fm");
    function $m(e) {
      return e.code === "P2009" || e.code === "P2012";
    }
    __name($m, "$m");
    function El(e) {
      if (e.kind === "Union") return { kind: "Union", errors: e.errors.map(El) };
      if (Array.isArray(e.selectionPath)) {
        let [, ...t] = e.selectionPath;
        return { ...e, selectionPath: t };
      }
      return e;
    }
    __name(El, "El");
    u();
    l();
    c();
    p();
    d();
    var Zi = yn;
    u();
    l();
    c();
    p();
    d();
    var Al = Je(Qn());
    u();
    l();
    c();
    p();
    d();
    var F2 = class extends Error {
      static {
        __name(this, "F");
      }
      constructor(t) {
        super(t + `
Read more at https://pris.ly/d/client-constructor`), this.name = "PrismaClientConstructorValidationError";
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientConstructorValidationError";
      }
    };
    Bt(F2, "PrismaClientConstructorValidationError");
    var Tl = ["errorFormat", "adapter", "accelerateUrl", "log", "transactionOptions", "omit", "comments", "queryPlanCacheMaxSize", "__internal"];
    var Pl = ["pretty", "colorless", "minimal"];
    var Sl = ["info", "query", "warn", "error"];
    var Vm = { adapter: /* @__PURE__ */ __name(() => {
    }, "adapter"), accelerateUrl: /* @__PURE__ */ __name((e) => {
      if (e !== void 0) {
        if (typeof e != "string") throw new F2(`Invalid value ${JSON.stringify(e)} for "accelerateUrl" provided to PrismaClient constructor.`);
        if (e.trim().length === 0) throw new F2('"accelerateUrl" provided to PrismaClient constructor must be a non-empty string.');
      }
    }, "accelerateUrl"), errorFormat: /* @__PURE__ */ __name((e) => {
      if (e) {
        if (typeof e != "string") throw new F2(`Invalid value ${JSON.stringify(e)} for "errorFormat" provided to PrismaClient constructor.`);
        if (!Pl.includes(e)) {
          let t = fr(e, Pl);
          throw new F2(`Invalid errorFormat ${e} provided to PrismaClient constructor.${t}`);
        }
      }
    }, "errorFormat"), log: /* @__PURE__ */ __name((e) => {
      if (!e) return;
      if (!Array.isArray(e)) throw new F2(`Invalid value ${JSON.stringify(e)} for "log" provided to PrismaClient constructor.`);
      function t(r) {
        if (typeof r == "string" && !Sl.includes(r)) {
          let n = fr(r, Sl);
          throw new F2(`Invalid log level "${r}" provided to PrismaClient constructor.${n}`);
        }
      }
      __name(t, "t");
      for (let r of e) {
        t(r);
        let n = { level: t, emit: /* @__PURE__ */ __name((i) => {
          let o = ["stdout", "event"];
          if (!o.includes(i)) {
            let s2 = fr(i, o);
            throw new F2(`Invalid value ${JSON.stringify(i)} for "emit" in logLevel provided to PrismaClient constructor.${s2}`);
          }
        }, "emit") };
        if (r && typeof r == "object") for (let [i, o] of Object.entries(r)) if (n[i]) n[i](o);
        else throw new F2(`Invalid property ${i} for "log" provided to PrismaClient constructor`);
      }
    }, "log"), transactionOptions: /* @__PURE__ */ __name((e) => {
      if (!e) return;
      let t = e.maxWait;
      if (t != null && t <= 0) throw new F2(`Invalid value ${t} for maxWait in "transactionOptions" provided to PrismaClient constructor. maxWait needs to be greater than 0`);
      let r = e.timeout;
      if (r != null && r <= 0) throw new F2(`Invalid value ${r} for timeout in "transactionOptions" provided to PrismaClient constructor. timeout needs to be greater than 0`);
    }, "transactionOptions"), omit: /* @__PURE__ */ __name((e, t) => {
      if (typeof e != "object") throw new F2('"omit" option is expected to be an object.');
      if (e === null) throw new F2('"omit" option can not be `null`');
      let r = [];
      for (let [n, i] of Object.entries(e)) {
        let o = Bm(n, t.runtimeDataModel);
        if (!o) {
          r.push({ kind: "UnknownModel", modelKey: n });
          continue;
        }
        for (let [s2, a] of Object.entries(i)) {
          let m = o.fields.find((f) => f.name === s2);
          if (!m) {
            r.push({ kind: "UnknownField", modelKey: n, fieldName: s2 });
            continue;
          }
          if (m.relationName) {
            r.push({ kind: "RelationInOmit", modelKey: n, fieldName: s2 });
            continue;
          }
          typeof a != "boolean" && r.push({ kind: "InvalidFieldValue", modelKey: n, fieldName: s2 });
        }
      }
      if (r.length > 0) throw new F2(jm(e, r));
    }, "omit"), queryPlanCacheMaxSize: /* @__PURE__ */ __name((e) => {
      if (e !== void 0) {
        if (typeof e != "number") throw new F2(`Invalid value ${JSON.stringify(e)} for "queryPlanCacheMaxSize" provided to PrismaClient constructor. Expected a number.`);
        if (!Number.isInteger(e)) throw new F2(`Invalid value ${e} for "queryPlanCacheMaxSize" provided to PrismaClient constructor. Expected an integer.`);
        if (e < 0) throw new F2(`Invalid value ${e} for "queryPlanCacheMaxSize" provided to PrismaClient constructor. Cache size needs to be greater or equal to 0.`);
      }
    }, "queryPlanCacheMaxSize"), comments: /* @__PURE__ */ __name((e) => {
      if (e !== void 0) {
        if (!Array.isArray(e)) throw new F2(`Invalid value ${JSON.stringify(e)} for "comments" provided to PrismaClient constructor. Expected an array of SQL commenter plugins.`);
        for (let t = 0; t < e.length; t++) if (typeof e[t] != "function") throw new F2(`Invalid value at index ${t} for "comments" provided to PrismaClient constructor. Each plugin must be a function.`);
      }
    }, "comments"), __internal: /* @__PURE__ */ __name((e) => {
      if (!e) return;
      let t = ["debug", "engine", "configOverride"];
      if (typeof e != "object") throw new F2(`Invalid value ${JSON.stringify(e)} for "__internal" to PrismaClient constructor`);
      for (let [r] of Object.entries(e)) if (!t.includes(r)) {
        let n = fr(r, t);
        throw new F2(`Invalid property ${JSON.stringify(r)} for "__internal" provided to PrismaClient constructor.${n}`);
      }
    }, "__internal") };
    function Um(e) {
      let t = e.adapter !== void 0, r = e.accelerateUrl !== void 0;
      if (t && r) throw new F2('The "adapter" and "accelerateUrl" options are mutually exclusive. Please provide only one of them.');
      if (!t && !r) throw new F2('Using engine type "client" requires either "adapter" or "accelerateUrl" to be provided to PrismaClient constructor.');
    }
    __name(Um, "Um");
    function Cl(e, t) {
      for (let [r, n] of Object.entries(e)) {
        if (!Tl.includes(r)) {
          let i = fr(r, Tl);
          throw new F2(`Unknown property ${r} provided to PrismaClient constructor.${i}`);
        }
        Vm[r](n, t);
      }
      Um(e);
    }
    __name(Cl, "Cl");
    function fr(e, t) {
      if (t.length === 0 || typeof e != "string") return "";
      let r = qm(e, t);
      return r ? ` Did you mean "${r}"?` : "";
    }
    __name(fr, "fr");
    function qm(e, t) {
      if (t.length === 0) return null;
      let r = t.map((i) => ({ value: i, distance: (0, Al.default)(e, i) }));
      r.sort((i, o) => i.distance < o.distance ? -1 : 1);
      let n = r[0];
      return n.distance < 3 ? n.value : null;
    }
    __name(qm, "qm");
    function Bm(e, t) {
      return vl(t.models, e) ?? vl(t.types, e);
    }
    __name(Bm, "Bm");
    function vl(e, t) {
      let r = Object.keys(e).find((n) => Fe(n) === t);
      if (r) return e[r];
    }
    __name(vl, "vl");
    function jm(e, t) {
      let r = xt(e);
      for (let o of t) switch (o.kind) {
        case "UnknownModel":
          r.arguments.getField(o.modelKey)?.markAsError(), r.addErrorMessage(() => `Unknown model name: ${o.modelKey}.`);
          break;
        case "UnknownField":
          r.arguments.getDeepField([o.modelKey, o.fieldName])?.markAsError(), r.addErrorMessage(() => `Model "${o.modelKey}" does not have a field named "${o.fieldName}".`);
          break;
        case "RelationInOmit":
          r.arguments.getDeepField([o.modelKey, o.fieldName])?.markAsError(), r.addErrorMessage(() => 'Relations are already excluded by default and can not be specified in "omit".');
          break;
        case "InvalidFieldValue":
          r.arguments.getDeepFieldValue([o.modelKey, o.fieldName])?.markAsError(), r.addErrorMessage(() => "Omit field option value must be a boolean.");
          break;
      }
      let { message: n, args: i } = Fr(r, "colorless");
      return `Error validating "omit" option:

${i}

${n}`;
    }
    __name(jm, "jm");
    u();
    l();
    c();
    p();
    d();
    var Rl = require_dist2();
    function Il(e) {
      return e.length === 0 ? Promise.resolve([]) : new Promise((t, r) => {
        let n = new Array(e.length), i = null, o = false, s2 = 0, a = /* @__PURE__ */ __name(() => {
          o || (s2++, s2 === e.length && (o = true, i ? r(i) : t(n)));
        }, "a"), m = /* @__PURE__ */ __name((f) => {
          o || (o = true, r(f));
        }, "m");
        for (let f = 0; f < e.length; f++) e[f].then((T) => {
          n[f] = T, a();
        }, (T) => {
          if (!(0, Rl.hasBatchIndex)(T)) {
            m(T);
            return;
          }
          T.batchRequestIdx === f ? m(T) : (i || (i = T), a());
        });
      });
    }
    __name(Il, "Il");
    var Dt = ne("prisma:client");
    typeof globalThis == "object" && (globalThis.NODE_CLIENT = true);
    var Qm = { requestArgsToMiddlewareArgs: /* @__PURE__ */ __name((e) => e, "requestArgsToMiddlewareArgs"), middlewareArgsToRequestArgs: /* @__PURE__ */ __name((e) => e, "middlewareArgsToRequestArgs") };
    var Dl = /* @__PURE__ */ Symbol.for("prisma.client.transaction.scope_context");
    function kl(e) {
      let r = e[Dl];
      if (r === void 0) return { kind: "top-level" };
      if (Jm(r)) return r;
      throw new Error("Internal error: inconsistent transaction scope context.");
    }
    __name(kl, "kl");
    function Jm(e) {
      if (typeof e != "object" || e === null) return false;
      let t = e;
      return t.kind === "nested" && typeof t.txId == "string" && typeof t.scopeId == "string" && Hm(t.scopeState);
    }
    __name(Jm, "Jm");
    function Hm(e) {
      return typeof e != "object" || e === null ? false : Array.isArray(e.stack);
    }
    __name(Hm, "Hm");
    function Gm() {
      return typeof globalThis.crypto?.randomUUID == "function" ? globalThis.crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    }
    __name(Gm, "Gm");
    var zm = { id: 0, nextId() {
      return ++this.id;
    } };
    function Ml(e) {
      class t {
        static {
          __name(this, "t");
        }
        _originalClient = this;
        _runtimeDataModel;
        _requestHandler;
        _connectionPromise;
        _disconnectionPromise;
        _engineConfig;
        _accelerateEngineConfig;
        _clientVersion;
        _errorFormat;
        _tracingHelper;
        _previewFeatures;
        _activeProvider;
        _globalOmit;
        _extensions;
        _engine;
        _appliedParent;
        _createPrismaPromise = Hi();
        constructor(n) {
          if (!n) throw new D2.PrismaClientInitializationError("`PrismaClient` needs to be constructed with a non-empty, valid `PrismaClientOptions`:\n\n```\nnew PrismaClient({\n  ...\n})\n```\n\nor\n\n```\nconstructor() {\n  super({ ... });\n}\n```\n          ", Zi);
          e = n.__internal?.configOverride?.(e) ?? e, Cl(n, e);
          let i = new Jr().on("error", () => {
          });
          this._extensions = Et.empty(), this._previewFeatures = e.previewFeatures, this._clientVersion = e.clientVersion ?? Zi, this._activeProvider = e.activeProvider, this._globalOmit = n?.omit, this._tracingHelper = gl();
          let o;
          if (n.adapter) {
            o = n.adapter;
            let s2 = e.activeProvider === "postgresql" || e.activeProvider === "cockroachdb" ? "postgres" : e.activeProvider;
            if (o.provider !== s2) throw new D2.PrismaClientInitializationError(`The Driver Adapter \`${o.adapterName}\`, based on \`${o.provider}\`, is not compatible with the provider \`${s2}\` specified in the Prisma schema.`, this._clientVersion);
          }
          try {
            let s2 = n ?? {}, m = (s2.__internal ?? {}).debug === true;
            if (m && ne.enable("prisma:client"), s2.errorFormat ? this._errorFormat = s2.errorFormat : y.env.NODE_ENV === "production" ? this._errorFormat = "minimal" : y.env.NO_COLOR ? this._errorFormat = "colorless" : this._errorFormat = "colorless", this._runtimeDataModel = e.runtimeDataModel, this._engineConfig = { enableDebugLogs: m, logLevel: s2.log && hl(s2.log), logQueries: s2.log && !!(typeof s2.log == "string" ? s2.log === "query" : s2.log.find((f) => typeof f == "string" ? f === "query" : f.level === "query")), compilerWasm: e.compilerWasm, clientVersion: e.clientVersion, previewFeatures: this._previewFeatures, activeProvider: e.activeProvider, inlineSchema: e.inlineSchema, tracingHelper: this._tracingHelper, transactionOptions: { maxWait: s2.transactionOptions?.maxWait ?? 2e3, timeout: s2.transactionOptions?.timeout ?? 5e3, isolationLevel: s2.transactionOptions?.isolationLevel }, logEmitter: i, adapter: o, accelerateUrl: s2.accelerateUrl, sqlCommenters: s2.comments, parameterizationSchema: e.parameterizationSchema, runtimeDataModel: e.runtimeDataModel, queryPlanCacheMaxSize: n.queryPlanCacheMaxSize }, this._accelerateEngineConfig = Object.create(this._engineConfig), this._accelerateEngineConfig.accelerateUtils = { resolveDatasourceUrl: /* @__PURE__ */ __name(() => {
              if (s2.accelerateUrl) return s2.accelerateUrl;
              throw new D2.PrismaClientInitializationError(`\`accelerateUrl\` is required when using \`@prisma/extension-accelerate\`:

new PrismaClient({
  accelerateUrl: "prisma://...",
}).$extends(withAccelerate())
`, e.clientVersion);
            }, "resolveDatasourceUrl") }, Dt("clientVersion", e.clientVersion), this._engine = Xu(this._engineConfig), this._requestHandler = new An(this, i), s2.log) for (let f of s2.log) {
              let T = typeof f == "string" ? f : f.emit === "stdout" ? f.level : null;
              T && this.$on(T, (S) => {
                qt.log(`${qt.tags[T] ?? ""}`, S.message || S.query);
              });
            }
          } catch (s2) {
            throw s2.clientVersion = this._clientVersion, s2;
          }
          return this._appliedParent = Yt(this);
        }
        get [Symbol.toStringTag]() {
          return "PrismaClient";
        }
        $on(n, i) {
          return n === "beforeExit" ? this._engine.onBeforeExit(i) : n && this._engineConfig.logEmitter.on(n, i), this;
        }
        $connect() {
          try {
            return this._engine.start();
          } catch (n) {
            throw n.clientVersion = this._clientVersion, n;
          }
        }
        async $disconnect() {
          try {
            await this._engine.stop();
          } catch (n) {
            throw n.clientVersion = this._clientVersion, n;
          } finally {
            Io();
          }
        }
        $executeRawInternal(n, i, o, s2) {
          let a = this._activeProvider;
          return this._request({ action: "executeRaw", args: o, transaction: n, clientMethod: i, argsMapper: Ji({ clientMethod: i, activeProvider: a }), callsite: Ve(this._errorFormat), dataPath: [], middlewareArgsMapper: s2 });
        }
        $executeRaw(n, ...i) {
          return this._createPrismaPromise((o) => {
            if (n.raw !== void 0 || n.sql !== void 0) {
              let [s2, a] = Ol(n, i);
              return Qi(this._activeProvider, s2.text, s2.values, Array.isArray(n) ? "prisma.$executeRaw`<SQL>`" : "prisma.$executeRaw(sql`<SQL>`)"), this.$executeRawInternal(o, "$executeRaw", s2, a);
            }
            throw new D2.PrismaClientValidationError("`$executeRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#executeraw\n", { clientVersion: this._clientVersion });
          });
        }
        $executeRawUnsafe(n, ...i) {
          return this._createPrismaPromise((o) => (Qi(this._activeProvider, n, i, "prisma.$executeRawUnsafe(<SQL>, [...values])"), this.$executeRawInternal(o, "$executeRawUnsafe", [n, ...i])));
        }
        $runCommandRaw(n) {
          if (e.activeProvider !== "mongodb") throw new D2.PrismaClientValidationError(`The ${e.activeProvider} provider does not support $runCommandRaw. Use the mongodb provider.`, { clientVersion: this._clientVersion });
          return this._createPrismaPromise((i) => this._request({ args: n, clientMethod: "$runCommandRaw", dataPath: [], action: "runCommandRaw", argsMapper: el, callsite: Ve(this._errorFormat), transaction: i }));
        }
        async $queryRawInternal(n, i, o, s2) {
          let a = this._activeProvider;
          return this._request({ action: "queryRaw", args: o, transaction: n, clientMethod: i, argsMapper: Ji({ clientMethod: i, activeProvider: a }), callsite: Ve(this._errorFormat), dataPath: [], middlewareArgsMapper: s2 });
        }
        $queryRaw(n, ...i) {
          return this._createPrismaPromise((o) => {
            if (n.raw !== void 0 || n.sql !== void 0) return this.$queryRawInternal(o, "$queryRaw", ...Ol(n, i));
            throw new D2.PrismaClientValidationError("`$queryRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#queryraw\n", { clientVersion: this._clientVersion });
          });
        }
        $queryRawTyped(n) {
          return this._createPrismaPromise((i) => {
            if (!this._hasPreviewFlag("typedSql")) throw new D2.PrismaClientValidationError("`typedSql` preview feature must be enabled in order to access $queryRawTyped API", { clientVersion: this._clientVersion });
            return this.$queryRawInternal(i, "$queryRawTyped", n);
          });
        }
        $queryRawUnsafe(n, ...i) {
          return this._createPrismaPromise((o) => this.$queryRawInternal(o, "$queryRawUnsafe", [n, ...i]));
        }
        _transactionWithArray({ promises: n, options: i }) {
          let o = zm.nextId(), s2 = yl(n.length), a = n.map((m, f) => {
            if (m?.[Symbol.toStringTag] !== "PrismaPromise") throw new Error("All elements of the array need to be Prisma Client promises. Hint: Please make sure you are not awaiting the Prisma client calls you intended to pass in the $transaction function.");
            let T = i?.isolationLevel ?? this._engineConfig.transactionOptions.isolationLevel, S = { kind: "batch", id: o, index: f, isolationLevel: T, maxWait: i?.maxWait ?? this._engineConfig.transactionOptions.maxWait, timeout: i?.timeout ?? this._engineConfig.transactionOptions.timeout, lock: s2 };
            return m.requestTransaction?.(S) ?? m;
          });
          return Il(a);
        }
        async _transactionWithCallback({ callback: n, options: i = {} }) {
          let o = kl(this), s2 = o.kind === "nested", a = s2 ? o.scopeState : { stack: [] }, m = a.stack, f = Gm();
          if (s2) {
            if (m.at(-1) !== o.scopeId) throw new Error("Concurrent nested transactions are not supported");
            i.newTxId = o.txId;
          }
          m.push(f);
          let T = { traceparent: this._tracingHelper.getTraceParent() }, S = { maxWait: i?.maxWait ?? this._engineConfig.transactionOptions.maxWait, timeout: i?.timeout ?? this._engineConfig.transactionOptions.timeout, isolationLevel: i?.isolationLevel ?? this._engineConfig.transactionOptions.isolationLevel, newTxId: i.newTxId }, v;
          try {
            v = await this._engine.transaction("start", T, S);
          } catch (N) {
            throw m.at(-1) === f && m.pop(), N;
          }
          let A;
          try {
            let N = { kind: "itx", ...v };
            if (A = await n(this._createItxClient(N, f, a)), s2) {
              if (m.at(-1) !== f) throw new Error("Nested transactions must be closed in reverse order of creation.");
            } else if (m.length !== 1) throw new Error("Cannot close transaction while a nested transaction is still active.");
            await this._engine.transaction("commit", T, v);
          } catch (N) {
            let I2 = m.at(-1) !== f ? Math.max(1, m.length) : 1;
            for (let J = 0; J < I2; J++) await this._engine.transaction("rollback", T, v).catch((j) => {
              Dt("rollback attempt %d/%d failed: %O", J + 1, I2, j);
            });
            throw N;
          } finally {
            m.at(-1) === f ? m.pop() : m.length = 0;
          }
          return A;
        }
        _createItxClient(n, i, o) {
          let s2 = { kind: "nested", txId: n.id, scopeId: i, scopeState: o };
          return ye(Yt(ye(Ds(this), [ie("_appliedParent", () => this._appliedParent._createItxClient(n, i, o)), ie("_createPrismaPromise", () => Hi(n)), ie(Dl, () => s2)])), [Tt($s)]);
        }
        $transaction(n, i) {
          let o;
          typeof n == "function" ? this._engineConfig.adapter?.adapterName === "@prisma/adapter-d1" ? o = /* @__PURE__ */ __name(() => {
            throw new Error("Cloudflare D1 does not support interactive transactions. We recommend you to refactor your queries with that limitation in mind, and use batch transactions with `prisma.$transactions([])` where applicable.");
          }, "o") : e.activeProvider === "mongodb" && kl(this).kind === "nested" ? o = /* @__PURE__ */ __name(() => {
            throw new D2.PrismaClientValidationError(`The ${e.activeProvider} provider does not support nested transactions`, { clientVersion: this._clientVersion });
          }, "o") : o = /* @__PURE__ */ __name(() => this._transactionWithCallback({ callback: n, options: i }), "o") : o = /* @__PURE__ */ __name(() => this._transactionWithArray({ promises: n, options: i }), "o");
          let s2 = { name: "transaction", attributes: { method: "$transaction" } };
          return this._tracingHelper.runInChildSpan(s2, o);
        }
        _request(n) {
          n.otelParentCtx = this._tracingHelper.getActiveContext();
          let i = n.middlewareArgsMapper ?? Qm, o = { args: i.requestArgsToMiddlewareArgs(n.args), dataPath: n.dataPath, runInTransaction: !!n.transaction, action: n.action, model: n.model }, s2 = { operation: { name: "operation", attributes: { method: o.action, model: o.model, name: o.model ? `${o.model}.${o.action}` : o.action } } }, a = /* @__PURE__ */ __name(async (m) => {
            let { runInTransaction: f, args: T, ...S } = m, v = { ...n, ...S };
            T && (v.args = i.middlewareArgsToRequestArgs(T)), n.transaction !== void 0 && f === false && delete v.transaction;
            let A = await Bs(this, v);
            if (!v.model) return A;
            let N = Gs({ dataPath: v.dataPath, modelName: v.model, args: v.args, runtimeDataModel: this._runtimeDataModel });
            return Fs({ result: A, modelName: N.modelName, args: N.args, extensions: this._extensions, runtimeDataModel: this._runtimeDataModel, globalOmit: this._globalOmit });
          }, "a");
          return this._tracingHelper.runInChildSpan(s2.operation, () => a(o));
        }
        async _executeRequest({ args: n, clientMethod: i, dataPath: o, callsite: s2, action: a, model: m, argsMapper: f, transaction: T, unpacker: S, otelParentCtx: v, customDataProxyFetch: A }) {
          try {
            n = f ? f(n) : n;
            let N = { name: "serialize" }, R = this._tracingHelper.runInChildSpan(N, () => Br({ modelName: m, runtimeDataModel: this._runtimeDataModel, action: a, args: n, clientMethod: i, callsite: s2, extensions: this._extensions, errorFormat: this._errorFormat, clientVersion: this._clientVersion, previewFeatures: this._previewFeatures, globalOmit: this._globalOmit }));
            return ne.enabled("prisma:client") && (Dt("Prisma Client call:"), Dt(`prisma.${i}(${Ps(n)})`), Dt("Generated request:"), Dt(JSON.stringify(R, null, 2) + `
`)), T?.kind === "batch" && await T.lock, this._requestHandler.request({ protocolQuery: R, modelName: m, action: a, clientMethod: i, dataPath: o, callsite: s2, args: n, extensions: this._extensions, transaction: T, unpacker: S, otelParentCtx: v, otelChildCtx: this._tracingHelper.getActiveContext(), globalOmit: this._globalOmit, customDataProxyFetch: A });
          } catch (N) {
            throw N.clientVersion = this._clientVersion, N;
          }
        }
        _hasPreviewFlag(n) {
          return !!this._engineConfig.previewFeatures?.includes(n);
        }
        $extends = Ms;
      }
      return t;
    }
    __name(Ml, "Ml");
    function Ol(e, t) {
      return Wm(e) ? [new Nl.Sql(e, t), ll] : [e, cl];
    }
    __name(Ol, "Ol");
    function Wm(e) {
      return Array.isArray(e) && Array.isArray(e.raw);
    }
    __name(Wm, "Wm");
    u();
    l();
    c();
    p();
    d();
    var Km = /* @__PURE__ */ new Set(["toJSON", "$$typeof", "asymmetricMatch", Symbol.iterator, Symbol.toStringTag, Symbol.isConcatSpreadable, Symbol.toPrimitive]);
    function Ll(e) {
      return new Proxy(e, { get(t, r) {
        if (r in t) return t[r];
        if (!Km.has(r)) throw new TypeError(`Invalid enum value: ${String(r)}`);
      } });
    }
    __name(Ll, "Ll");
    u();
    l();
    c();
    p();
    d();
    var Zm = /* @__PURE__ */ __name(() => globalThis.process?.release?.name === "node", "Zm");
    var Ym = /* @__PURE__ */ __name(() => !!globalThis.Bun || !!globalThis.process?.versions?.bun, "Ym");
    var Xm = /* @__PURE__ */ __name(() => !!globalThis.Deno, "Xm");
    var ef = /* @__PURE__ */ __name(() => typeof globalThis.Netlify == "object", "ef");
    var tf = /* @__PURE__ */ __name(() => typeof globalThis.EdgeRuntime == "object", "tf");
    var rf = /* @__PURE__ */ __name(() => globalThis.navigator?.userAgent === "Cloudflare-Workers", "rf");
    function nf() {
      return [[ef, "netlify"], [tf, "edge-light"], [rf, "workerd"], [Xm, "deno"], [Ym, "bun"], [Zm, "node"]].flatMap((r) => r[0]() ? [r[1]] : []).at(0) ?? "";
    }
    __name(nf, "nf");
    var of = { node: "Node.js", workerd: "Cloudflare Workers", deno: "Deno and Deno Deploy", netlify: "Netlify Edge Functions", "edge-light": "Edge Runtime (Vercel Edge Functions, Vercel Edge Middleware, Next.js (Pages Router) Edge API Routes, Next.js (App Router) Edge Route Handlers or Next.js Middleware)" };
    function _l() {
      let e = nf();
      return { id: e, prettyName: of[e] || e, isEdge: ["workerd", "deno", "netlify", "edge-light"].includes(e) };
    }
    __name(_l, "_l");
    var D2 = require_dist2();
    var ke = require_dist2();
    var Y = require_dist2();
    var Fl = require_dist2();
  }
});

// ../node_modules/.pnpm/@prisma+client@7.8.0_prisma_e898b9d9c438e592d89244ea5c805b9f/node_modules/.prisma/client/query_compiler_fast_bg.js
var require_query_compiler_fast_bg = __commonJS({
  "../node_modules/.pnpm/@prisma+client@7.8.0_prisma_e898b9d9c438e592d89244ea5c805b9f/node_modules/.prisma/client/query_compiler_fast_bg.js"(exports, module) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    var h = Object.defineProperty;
    var T = Object.getOwnPropertyDescriptor;
    var M = Object.getOwnPropertyNames;
    var j = Object.prototype.hasOwnProperty;
    var D2 = /* @__PURE__ */ __name((e, t) => {
      for (var n in t) h(e, n, { get: t[n], enumerable: true });
    }, "D");
    var O = /* @__PURE__ */ __name((e, t, n, _2) => {
      if (t && typeof t == "object" || typeof t == "function") for (let r of M(t)) !j.call(e, r) && r !== n && h(e, r, { get: /* @__PURE__ */ __name(() => t[r], "get"), enumerable: !(_2 = T(t, r)) || _2.enumerable });
      return e;
    }, "O");
    var B = /* @__PURE__ */ __name((e) => O(h({}, "__esModule", { value: true }), e), "B");
    var xe = {};
    D2(xe, { QueryCompiler: /* @__PURE__ */ __name(() => F2, "QueryCompiler"), __wbg_Error_e83987f665cf5504: /* @__PURE__ */ __name(() => q, "__wbg_Error_e83987f665cf5504"), __wbg_Number_bb48ca12f395cd08: /* @__PURE__ */ __name(() => C, "__wbg_Number_bb48ca12f395cd08"), __wbg_String_8f0eb39a4a4c2f66: /* @__PURE__ */ __name(() => k, "__wbg_String_8f0eb39a4a4c2f66"), __wbg___wbindgen_boolean_get_6d5a1ee65bab5f68: /* @__PURE__ */ __name(() => W2, "__wbg___wbindgen_boolean_get_6d5a1ee65bab5f68"), __wbg___wbindgen_debug_string_df47ffb5e35e6763: /* @__PURE__ */ __name(() => V, "__wbg___wbindgen_debug_string_df47ffb5e35e6763"), __wbg___wbindgen_in_bb933bd9e1b3bc0f: /* @__PURE__ */ __name(() => z, "__wbg___wbindgen_in_bb933bd9e1b3bc0f"), __wbg___wbindgen_is_object_c818261d21f283a4: /* @__PURE__ */ __name(() => L2, "__wbg___wbindgen_is_object_c818261d21f283a4"), __wbg___wbindgen_is_string_fbb76cb2940daafd: /* @__PURE__ */ __name(() => P2, "__wbg___wbindgen_is_string_fbb76cb2940daafd"), __wbg___wbindgen_is_undefined_2d472862bd29a478: /* @__PURE__ */ __name(() => Q, "__wbg___wbindgen_is_undefined_2d472862bd29a478"), __wbg___wbindgen_jsval_loose_eq_b664b38a2f582147: /* @__PURE__ */ __name(() => Y, "__wbg___wbindgen_jsval_loose_eq_b664b38a2f582147"), __wbg___wbindgen_number_get_a20bf9b85341449d: /* @__PURE__ */ __name(() => G, "__wbg___wbindgen_number_get_a20bf9b85341449d"), __wbg___wbindgen_string_get_e4f06c90489ad01b: /* @__PURE__ */ __name(() => J, "__wbg___wbindgen_string_get_e4f06c90489ad01b"), __wbg___wbindgen_throw_b855445ff6a94295: /* @__PURE__ */ __name(() => X, "__wbg___wbindgen_throw_b855445ff6a94295"), __wbg_entries_e171b586f8f6bdbf: /* @__PURE__ */ __name(() => H2, "__wbg_entries_e171b586f8f6bdbf"), __wbg_getTime_14776bfb48a1bff9: /* @__PURE__ */ __name(() => K, "__wbg_getTime_14776bfb48a1bff9"), __wbg_get_7bed016f185add81: /* @__PURE__ */ __name(() => Z, "__wbg_get_7bed016f185add81"), __wbg_get_with_ref_key_1dc361bd10053bfe: /* @__PURE__ */ __name(() => v, "__wbg_get_with_ref_key_1dc361bd10053bfe"), __wbg_instanceof_ArrayBuffer_70beb1189ca63b38: /* @__PURE__ */ __name(() => ee, "__wbg_instanceof_ArrayBuffer_70beb1189ca63b38"), __wbg_instanceof_Uint8Array_20c8e73002f7af98: /* @__PURE__ */ __name(() => te, "__wbg_instanceof_Uint8Array_20c8e73002f7af98"), __wbg_isSafeInteger_d216eda7911dde36: /* @__PURE__ */ __name(() => ne, "__wbg_isSafeInteger_d216eda7911dde36"), __wbg_length_69bca3cb64fc8748: /* @__PURE__ */ __name(() => re2, "__wbg_length_69bca3cb64fc8748"), __wbg_length_cdd215e10d9dd507: /* @__PURE__ */ __name(() => _e, "__wbg_length_cdd215e10d9dd507"), __wbg_new_0_f9740686d739025c: /* @__PURE__ */ __name(() => oe, "__wbg_new_0_f9740686d739025c"), __wbg_new_1acc0b6eea89d040: /* @__PURE__ */ __name(() => ce, "__wbg_new_1acc0b6eea89d040"), __wbg_new_5a79be3ab53b8aa5: /* @__PURE__ */ __name(() => ie, "__wbg_new_5a79be3ab53b8aa5"), __wbg_new_68651c719dcda04e: /* @__PURE__ */ __name(() => se, "__wbg_new_68651c719dcda04e"), __wbg_new_e17d9f43105b08be: /* @__PURE__ */ __name(() => ue, "__wbg_new_e17d9f43105b08be"), __wbg_prototypesetcall_2a6620b6922694b2: /* @__PURE__ */ __name(() => fe, "__wbg_prototypesetcall_2a6620b6922694b2"), __wbg_set_3f1d0b984ed272ed: /* @__PURE__ */ __name(() => be, "__wbg_set_3f1d0b984ed272ed"), __wbg_set_907fb406c34a251d: /* @__PURE__ */ __name(() => de, "__wbg_set_907fb406c34a251d"), __wbg_set_c213c871859d6500: /* @__PURE__ */ __name(() => ae, "__wbg_set_c213c871859d6500"), __wbg_set_message_82ae475bb413aa5c: /* @__PURE__ */ __name(() => ge, "__wbg_set_message_82ae475bb413aa5c"), __wbg_set_wasm: /* @__PURE__ */ __name(() => N, "__wbg_set_wasm"), __wbindgen_cast_2241b6af4c4b2941: /* @__PURE__ */ __name(() => le, "__wbindgen_cast_2241b6af4c4b2941"), __wbindgen_cast_4625c577ab2ec9ee: /* @__PURE__ */ __name(() => we, "__wbindgen_cast_4625c577ab2ec9ee"), __wbindgen_cast_9ae0607507abb057: /* @__PURE__ */ __name(() => pe, "__wbindgen_cast_9ae0607507abb057"), __wbindgen_cast_d6cd19b81560fd6e: /* @__PURE__ */ __name(() => ye, "__wbindgen_cast_d6cd19b81560fd6e"), __wbindgen_init_externref_table: /* @__PURE__ */ __name(() => me, "__wbindgen_init_externref_table") });
    module.exports = B(xe);
    var A = /* @__PURE__ */ __name(() => {
    }, "A");
    A.prototype = A;
    var o;
    function N(e) {
      o = e;
    }
    __name(N, "N");
    var p = null;
    function a() {
      return (p === null || p.byteLength === 0) && (p = new Uint8Array(o.memory.buffer)), p;
    }
    __name(a, "a");
    var y = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
    y.decode();
    var U2 = 2146435072;
    var S = 0;
    function R(e, t) {
      return S += t, S >= U2 && (y = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true }), y.decode(), S = t), y.decode(a().subarray(e, e + t));
    }
    __name(R, "R");
    function m(e, t) {
      return e = e >>> 0, R(e, t);
    }
    __name(m, "m");
    var f = 0;
    var g = new TextEncoder();
    "encodeInto" in g || (g.encodeInto = function(e, t) {
      const n = g.encode(e);
      return t.set(n), { read: e.length, written: n.length };
    });
    function l(e, t, n) {
      if (n === void 0) {
        const i = g.encode(e), d = t(i.length, 1) >>> 0;
        return a().subarray(d, d + i.length).set(i), f = i.length, d;
      }
      let _2 = e.length, r = t(_2, 1) >>> 0;
      const s2 = a();
      let c = 0;
      for (; c < _2; c++) {
        const i = e.charCodeAt(c);
        if (i > 127) break;
        s2[r + c] = i;
      }
      if (c !== _2) {
        c !== 0 && (e = e.slice(c)), r = n(r, _2, _2 = c + e.length * 3, 1) >>> 0;
        const i = a().subarray(r + c, r + _2), d = g.encodeInto(e, i);
        c += d.written, r = n(r, _2, c, 1) >>> 0;
      }
      return f = c, r;
    }
    __name(l, "l");
    var b = null;
    function u() {
      return (b === null || b.buffer.detached === true || b.buffer.detached === void 0 && b.buffer !== o.memory.buffer) && (b = new DataView(o.memory.buffer)), b;
    }
    __name(u, "u");
    function x(e) {
      return e == null;
    }
    __name(x, "x");
    function I2(e) {
      const t = typeof e;
      if (t == "number" || t == "boolean" || e == null) return `${e}`;
      if (t == "string") return `"${e}"`;
      if (t == "symbol") {
        const r = e.description;
        return r == null ? "Symbol" : `Symbol(${r})`;
      }
      if (t == "function") {
        const r = e.name;
        return typeof r == "string" && r.length > 0 ? `Function(${r})` : "Function";
      }
      if (Array.isArray(e)) {
        const r = e.length;
        let s2 = "[";
        r > 0 && (s2 += I2(e[0]));
        for (let c = 1; c < r; c++) s2 += ", " + I2(e[c]);
        return s2 += "]", s2;
      }
      const n = /\[object ([^\]]+)\]/.exec(toString.call(e));
      let _2;
      if (n && n.length > 1) _2 = n[1];
      else return toString.call(e);
      if (_2 == "Object") try {
        return "Object(" + JSON.stringify(e) + ")";
      } catch {
        return "Object";
      }
      return e instanceof Error ? `${e.name}: ${e.message}
${e.stack}` : _2;
    }
    __name(I2, "I");
    function $3(e, t) {
      return e = e >>> 0, a().subarray(e / 1, e / 1 + t);
    }
    __name($3, "$");
    function w(e) {
      const t = o.__wbindgen_externrefs.get(e);
      return o.__externref_table_dealloc(e), t;
    }
    __name(w, "w");
    var E = typeof FinalizationRegistry > "u" ? { register: /* @__PURE__ */ __name(() => {
    }, "register"), unregister: /* @__PURE__ */ __name(() => {
    }, "unregister") } : new FinalizationRegistry((e) => o.__wbg_querycompiler_free(e >>> 0, 1));
    var F2 = class {
      static {
        __name(this, "F");
      }
      __destroy_into_raw() {
        const t = this.__wbg_ptr;
        return this.__wbg_ptr = 0, E.unregister(this), t;
      }
      free() {
        const t = this.__destroy_into_raw();
        o.__wbg_querycompiler_free(t, 0);
      }
      compileBatch(t) {
        const n = l(t, o.__wbindgen_malloc, o.__wbindgen_realloc), _2 = f, r = o.querycompiler_compileBatch(this.__wbg_ptr, n, _2);
        if (r[2]) throw w(r[1]);
        return w(r[0]);
      }
      constructor(t) {
        const n = o.querycompiler_new(t);
        if (n[2]) throw w(n[1]);
        return this.__wbg_ptr = n[0] >>> 0, E.register(this, this.__wbg_ptr, this), this;
      }
      compile(t) {
        const n = l(t, o.__wbindgen_malloc, o.__wbindgen_realloc), _2 = f, r = o.querycompiler_compile(this.__wbg_ptr, n, _2);
        if (r[2]) throw w(r[1]);
        return w(r[0]);
      }
    };
    Symbol.dispose && (F2.prototype[Symbol.dispose] = F2.prototype.free);
    function q(e, t) {
      return Error(m(e, t));
    }
    __name(q, "q");
    function C(e) {
      return Number(e);
    }
    __name(C, "C");
    function k(e, t) {
      const n = String(t), _2 = l(n, o.__wbindgen_malloc, o.__wbindgen_realloc), r = f;
      u().setInt32(e + 4 * 1, r, true), u().setInt32(e + 4 * 0, _2, true);
    }
    __name(k, "k");
    function W2(e) {
      const t = e, n = typeof t == "boolean" ? t : void 0;
      return x(n) ? 16777215 : n ? 1 : 0;
    }
    __name(W2, "W");
    function V(e, t) {
      const n = I2(t), _2 = l(n, o.__wbindgen_malloc, o.__wbindgen_realloc), r = f;
      u().setInt32(e + 4 * 1, r, true), u().setInt32(e + 4 * 0, _2, true);
    }
    __name(V, "V");
    function z(e, t) {
      return e in t;
    }
    __name(z, "z");
    function L2(e) {
      const t = e;
      return typeof t == "object" && t !== null;
    }
    __name(L2, "L");
    function P2(e) {
      return typeof e == "string";
    }
    __name(P2, "P");
    function Q(e) {
      return e === void 0;
    }
    __name(Q, "Q");
    function Y(e, t) {
      return e == t;
    }
    __name(Y, "Y");
    function G(e, t) {
      const n = t, _2 = typeof n == "number" ? n : void 0;
      u().setFloat64(e + 8 * 1, x(_2) ? 0 : _2, true), u().setInt32(e + 4 * 0, !x(_2), true);
    }
    __name(G, "G");
    function J(e, t) {
      const n = t, _2 = typeof n == "string" ? n : void 0;
      var r = x(_2) ? 0 : l(_2, o.__wbindgen_malloc, o.__wbindgen_realloc), s2 = f;
      u().setInt32(e + 4 * 1, s2, true), u().setInt32(e + 4 * 0, r, true);
    }
    __name(J, "J");
    function X(e, t) {
      throw new Error(m(e, t));
    }
    __name(X, "X");
    function H2(e) {
      return Object.entries(e);
    }
    __name(H2, "H");
    function K(e) {
      return e.getTime();
    }
    __name(K, "K");
    function Z(e, t) {
      return e[t >>> 0];
    }
    __name(Z, "Z");
    function v(e, t) {
      return e[t];
    }
    __name(v, "v");
    function ee(e) {
      let t;
      try {
        t = e instanceof ArrayBuffer;
      } catch {
        t = false;
      }
      return t;
    }
    __name(ee, "ee");
    function te(e) {
      let t;
      try {
        t = e instanceof Uint8Array;
      } catch {
        t = false;
      }
      return t;
    }
    __name(te, "te");
    function ne(e) {
      return Number.isSafeInteger(e);
    }
    __name(ne, "ne");
    function re2(e) {
      return e.length;
    }
    __name(re2, "re");
    function _e(e) {
      return e.length;
    }
    __name(_e, "_e");
    function oe() {
      return /* @__PURE__ */ new Date();
    }
    __name(oe, "oe");
    function ce() {
      return new Object();
    }
    __name(ce, "ce");
    function ie(e) {
      return new Uint8Array(e);
    }
    __name(ie, "ie");
    function se() {
      return /* @__PURE__ */ new Map();
    }
    __name(se, "se");
    function ue() {
      return new Array();
    }
    __name(ue, "ue");
    function fe(e, t, n) {
      Uint8Array.prototype.set.call($3(e, t), n);
    }
    __name(fe, "fe");
    function be(e, t, n) {
      e[t] = n;
    }
    __name(be, "be");
    function de(e, t, n) {
      return e.set(t, n);
    }
    __name(de, "de");
    function ae(e, t, n) {
      e[t >>> 0] = n;
    }
    __name(ae, "ae");
    function ge(e, t) {
      global.PRISMA_WASM_PANIC_REGISTRY.set_message(m(e, t));
    }
    __name(ge, "ge");
    function le(e, t) {
      return m(e, t);
    }
    __name(le, "le");
    function we(e) {
      return BigInt.asUintN(64, e);
    }
    __name(we, "we");
    function pe(e) {
      return e;
    }
    __name(pe, "pe");
    function ye(e) {
      return e;
    }
    __name(ye, "ye");
    function me() {
      const e = o.__wbindgen_externrefs, t = e.grow(4);
      e.set(0, void 0), e.set(t + 0, void 0), e.set(t + 1, null), e.set(t + 2, true), e.set(t + 3, false);
    }
    __name(me, "me");
  }
});

// ../node_modules/.pnpm/@prisma+client@7.8.0_prisma_e898b9d9c438e592d89244ea5c805b9f/node_modules/.prisma/client/wasm-worker-loader.mjs
var wasm_worker_loader_exports = {};
__export(wasm_worker_loader_exports, {
  default: () => wasm_worker_loader_default
});
var wasm_worker_loader_default;
var init_wasm_worker_loader = __esm({
  "../node_modules/.pnpm/@prisma+client@7.8.0_prisma_e898b9d9c438e592d89244ea5c805b9f/node_modules/.prisma/client/wasm-worker-loader.mjs"() {
    init_checked_fetch();
    init_modules_watch_stub();
    wasm_worker_loader_default = import("./4f1bacf80560ee05dd0586252c978a99136885ec-query_compiler_fast_bg.wasm");
  }
});

// ../node_modules/.pnpm/@prisma+client@7.8.0_prisma_e898b9d9c438e592d89244ea5c805b9f/node_modules/.prisma/client/edge.js
var require_edge = __commonJS({
  "../node_modules/.pnpm/@prisma+client@7.8.0_prisma_e898b9d9c438e592d89244ea5c805b9f/node_modules/.prisma/client/edge.js"(exports) {
    init_checked_fetch();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var {
      PrismaClientKnownRequestError: PrismaClientKnownRequestError2,
      PrismaClientUnknownRequestError: PrismaClientUnknownRequestError2,
      PrismaClientRustPanicError: PrismaClientRustPanicError2,
      PrismaClientInitializationError: PrismaClientInitializationError2,
      PrismaClientValidationError: PrismaClientValidationError2,
      getPrismaClient: getPrismaClient2,
      sqltag: sqltag2,
      empty: empty2,
      join: join2,
      raw: raw3,
      skip: skip2,
      Decimal: Decimal2,
      Debug: Debug3,
      DbNull: DbNull2,
      JsonNull: JsonNull2,
      AnyNull: AnyNull2,
      NullTypes: NullTypes2,
      makeStrictEnum: makeStrictEnum2,
      Extensions: Extensions2,
      warnOnce: warnOnce2,
      defineDmmfProperty: defineDmmfProperty2,
      Public: Public2,
      getRuntime: getRuntime2,
      createParam: createParam2
    } = require_wasm_compiler_edge();
    var Prisma = {};
    exports.Prisma = Prisma;
    exports.$Enums = {};
    Prisma.prismaVersion = {
      client: "7.8.0",
      engine: "3c6e192761c0362d496ed980de936e2f3cebcd3a"
    };
    Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError2;
    Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError2;
    Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError2;
    Prisma.PrismaClientInitializationError = PrismaClientInitializationError2;
    Prisma.PrismaClientValidationError = PrismaClientValidationError2;
    Prisma.Decimal = Decimal2;
    Prisma.sql = sqltag2;
    Prisma.empty = empty2;
    Prisma.join = join2;
    Prisma.raw = raw3;
    Prisma.validator = Public2.validator;
    Prisma.getExtensionContext = Extensions2.getExtensionContext;
    Prisma.defineExtension = Extensions2.defineExtension;
    Prisma.DbNull = DbNull2;
    Prisma.JsonNull = JsonNull2;
    Prisma.AnyNull = AnyNull2;
    Prisma.NullTypes = NullTypes2;
    exports.Prisma.TransactionIsolationLevel = makeStrictEnum2({
      ReadUncommitted: "ReadUncommitted",
      ReadCommitted: "ReadCommitted",
      RepeatableRead: "RepeatableRead",
      Serializable: "Serializable"
    });
    exports.Prisma.TeamConfigScalarFieldEnum = {
      id: "id",
      user_id: "user_id",
      team_config: "team_config",
      created_at: "created_at",
      updated_at: "updated_at"
    };
    exports.Prisma.MenuConfigScalarFieldEnum = {
      id: "id",
      user_id: "user_id",
      menu_config: "menu_config",
      created_at: "created_at",
      updated_at: "updated_at"
    };
    exports.Prisma.PageConfigScalarFieldEnum = {
      id: "id",
      user_id: "user_id",
      title: "title",
      page_config: "page_config",
      created_at: "created_at",
      updated_at: "updated_at"
    };
    exports.Prisma.AiChatSessionScalarFieldEnum = {
      id: "id",
      user_id: "user_id",
      title: "title",
      created_at: "created_at",
      updated_at: "updated_at"
    };
    exports.Prisma.AiChatMessageScalarFieldEnum = {
      id: "id",
      session_id: "session_id",
      role: "role",
      content: "content",
      config_data: "config_data",
      status: "status",
      created_at: "created_at"
    };
    exports.Prisma.SortOrder = {
      asc: "asc",
      desc: "desc"
    };
    exports.Prisma.JsonNullValueInput = {
      JsonNull: Prisma.JsonNull
    };
    exports.Prisma.NullableJsonNullValueInput = {
      DbNull: Prisma.DbNull,
      JsonNull: Prisma.JsonNull
    };
    exports.Prisma.JsonNullValueFilter = {
      DbNull: Prisma.DbNull,
      JsonNull: Prisma.JsonNull,
      AnyNull: Prisma.AnyNull
    };
    exports.Prisma.QueryMode = {
      default: "default",
      insensitive: "insensitive"
    };
    exports.Prisma.TeamConfigOrderByRelevanceFieldEnum = {
      id: "id",
      user_id: "user_id"
    };
    exports.Prisma.MenuConfigOrderByRelevanceFieldEnum = {
      id: "id",
      user_id: "user_id"
    };
    exports.Prisma.PageConfigOrderByRelevanceFieldEnum = {
      id: "id",
      user_id: "user_id",
      title: "title"
    };
    exports.Prisma.AiChatSessionOrderByRelevanceFieldEnum = {
      id: "id",
      user_id: "user_id",
      title: "title"
    };
    exports.Prisma.NullsOrder = {
      first: "first",
      last: "last"
    };
    exports.Prisma.AiChatMessageOrderByRelevanceFieldEnum = {
      id: "id",
      session_id: "session_id",
      role: "role",
      content: "content",
      status: "status"
    };
    exports.Prisma.ModelName = {
      TeamConfig: "TeamConfig",
      MenuConfig: "MenuConfig",
      PageConfig: "PageConfig",
      AiChatSession: "AiChatSession",
      AiChatMessage: "AiChatMessage"
    };
    var config = {
      "previewFeatures": [
        "driverAdapters"
      ],
      "clientVersion": "7.8.0",
      "engineVersion": "3c6e192761c0362d496ed980de936e2f3cebcd3a",
      "activeProvider": "mysql",
      "inlineSchema": 'generator client {\n  provider        = "prisma-client-js"\n  previewFeatures = ["driverAdapters"]\n}\n\ndatasource db {\n  provider = "mysql"\n}\n\nmodel TeamConfig {\n  id          String   @id @default(uuid())\n  user_id     String   @unique\n  team_config Json     @default("[{\\"id\\":\\"team-default\\",\\"logo\\":\\"IconMosaic\\",\\"name\\":\\"AIGen-UI\\",\\"role\\":\\"online\\",\\"permissions\\":[\\"read\\"]}]")\n  created_at  DateTime @default(now())\n  updated_at  DateTime @updatedAt\n\n  @@map("team_configs")\n}\n\nmodel MenuConfig {\n  id          String   @id @default(uuid())\n  user_id     String   @unique\n  menu_config Json     @default("{\\"items\\":[{\\"type\\":\\"text-button\\",\\"label\\":\\"\u6743\u9650\u7533\u8BF7\\"},{\\"type\\":\\"dropdown\\",\\"label\\":\\"\u8BED\u8A00\\",\\"options\\":[\\"\u4E2D\u6587\\",\\"English\\"]}]}")\n  created_at  DateTime @default(now())\n  updated_at  DateTime @updatedAt\n\n  @@map("menu_configs")\n}\n\nmodel PageConfig {\n  id          String   @id @default(uuid())\n  user_id     String\n  title       String\n  page_config Json\n  created_at  DateTime @default(now())\n  updated_at  DateTime @updatedAt\n\n  @@map("page_configs")\n}\n\nmodel AiChatSession {\n  id         String          @id @default(uuid())\n  user_id    String\n  title      String          @default("New Chat")\n  created_at DateTime        @default(now())\n  updated_at DateTime        @updatedAt\n  messages   AiChatMessage[]\n\n  @@map("ai_chat_sessions")\n}\n\nmodel AiChatMessage {\n  id          String        @id @default(uuid())\n  session_id  String\n  session     AiChatSession @relation(fields: [session_id], references: [id], onDelete: Cascade)\n  role        String\n  content     String?       @db.Text\n  config_data Json?\n  status      String?       @default("complete")\n  created_at  DateTime      @default(now())\n\n  @@map("ai_chat_messages")\n}\n'
    };
    config.runtimeDataModel = JSON.parse('{"models":{"TeamConfig":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"user_id","kind":"scalar","type":"String"},{"name":"team_config","kind":"scalar","type":"Json"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"}],"dbName":"team_configs"},"MenuConfig":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"user_id","kind":"scalar","type":"String"},{"name":"menu_config","kind":"scalar","type":"Json"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"}],"dbName":"menu_configs"},"PageConfig":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"user_id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"page_config","kind":"scalar","type":"Json"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"}],"dbName":"page_configs"},"AiChatSession":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"user_id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"},{"name":"messages","kind":"object","type":"AiChatMessage","relationName":"AiChatMessageToAiChatSession"}],"dbName":"ai_chat_sessions"},"AiChatMessage":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"session_id","kind":"scalar","type":"String"},{"name":"session","kind":"object","type":"AiChatSession","relationName":"AiChatMessageToAiChatSession"},{"name":"role","kind":"scalar","type":"String"},{"name":"content","kind":"scalar","type":"String"},{"name":"config_data","kind":"scalar","type":"Json"},{"name":"status","kind":"scalar","type":"String"},{"name":"created_at","kind":"scalar","type":"DateTime"}],"dbName":"ai_chat_messages"}},"enums":{},"types":{}}');
    defineDmmfProperty2(exports.Prisma, config.runtimeDataModel);
    config.parameterizationSchema = {
      strings: JSON.parse('["where","TeamConfig.findUnique","TeamConfig.findUniqueOrThrow","orderBy","cursor","TeamConfig.findFirst","TeamConfig.findFirstOrThrow","TeamConfig.findMany","data","TeamConfig.createOne","TeamConfig.createMany","TeamConfig.updateOne","TeamConfig.updateMany","create","update","TeamConfig.upsertOne","TeamConfig.deleteOne","TeamConfig.deleteMany","having","_count","_min","_max","TeamConfig.groupBy","TeamConfig.aggregate","MenuConfig.findUnique","MenuConfig.findUniqueOrThrow","MenuConfig.findFirst","MenuConfig.findFirstOrThrow","MenuConfig.findMany","MenuConfig.createOne","MenuConfig.createMany","MenuConfig.updateOne","MenuConfig.updateMany","MenuConfig.upsertOne","MenuConfig.deleteOne","MenuConfig.deleteMany","MenuConfig.groupBy","MenuConfig.aggregate","PageConfig.findUnique","PageConfig.findUniqueOrThrow","PageConfig.findFirst","PageConfig.findFirstOrThrow","PageConfig.findMany","PageConfig.createOne","PageConfig.createMany","PageConfig.updateOne","PageConfig.updateMany","PageConfig.upsertOne","PageConfig.deleteOne","PageConfig.deleteMany","PageConfig.groupBy","PageConfig.aggregate","session","messages","AiChatSession.findUnique","AiChatSession.findUniqueOrThrow","AiChatSession.findFirst","AiChatSession.findFirstOrThrow","AiChatSession.findMany","AiChatSession.createOne","AiChatSession.createMany","AiChatSession.updateOne","AiChatSession.updateMany","AiChatSession.upsertOne","AiChatSession.deleteOne","AiChatSession.deleteMany","AiChatSession.groupBy","AiChatSession.aggregate","AiChatMessage.findUnique","AiChatMessage.findUniqueOrThrow","AiChatMessage.findFirst","AiChatMessage.findFirstOrThrow","AiChatMessage.findMany","AiChatMessage.createOne","AiChatMessage.createMany","AiChatMessage.updateOne","AiChatMessage.updateMany","AiChatMessage.upsertOne","AiChatMessage.deleteOne","AiChatMessage.deleteMany","AiChatMessage.groupBy","AiChatMessage.aggregate","AND","OR","NOT","id","session_id","role","content","config_data","status","created_at","equals","in","notIn","lt","lte","gt","gte","not","string_contains","string_starts_with","string_ends_with","array_starts_with","array_ends_with","array_contains","contains","startsWith","endsWith","search","user_id","title","updated_at","every","some","none","page_config","menu_config","team_config","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","_relevance"]'),
      graph: "xQEgRghSAACVAQAwUwAABAAQVAAAlQEAMFUBAAAAAVtAAIcBACFuAQAAAAFwQACHAQAhdgAAkQEAIAEAAAABACABAAAAAQAgCFIAAJUBADBTAAAEABBUAACVAQAwVQEAhgEAIVtAAIcBACFuAQCGAQAhcEAAhwEAIXYAAJEBACABggEAAL8BACADAAAABAAgAwAABQAwBAAAAQAgAwAAAAQAIAMAAAUAMAQAAAEAIAMAAAAEACADAAAFADAEAAABACAFVQEAAAABW0AAAAABbgEAAAABcEAAAAABdoAAAAABAQgAAAkAIAVVAQAAAAFbQAAAAAFuAQAAAAFwQAAAAAF2gAAAAAEBCAAACwAwBVUBAJoBACFbQACcAQAhbgEAmgEAIXBAAJwBACF2gAAAAAECAAAAAQAgCAAADQAgBVUBAJoBACFbQACcAQAhbgEAmgEAIXBAAJwBACF2gAAAAAECAAAABAAgCAAADwAgAwAAAAEAIA0AAAkAIA4AAA0AIAEAAAABACABAAAABAAgAxMAALwBACAUAAC-AQAgFQAAvQEAIAhSAACUAQAwUwAAFQAQVAAAlAEAMFUBAHcAIVtAAHoAIW4BAHcAIXBAAHoAIXYAAI4BACADAAAABAAgAwAAFAAwEgAAFQAgAwAAAAQAIAMAAAUAMAQAAAEAIAhSAACTAQAwUwAAGwAQVAAAkwEAMFUBAAAAAVtAAIcBACFuAQAAAAFwQACHAQAhdQAAkQEAIAEAAAAYACABAAAAGAAgCFIAAJMBADBTAAAbABBUAACTAQAwVQEAhgEAIVtAAIcBACFuAQCGAQAhcEAAhwEAIXUAAJEBACABggEAALsBACADAAAAGwAgAwAAHAAwBAAAGAAgAwAAABsAIAMAABwAMAQAABgAIAMAAAAbACADAAAcADAEAAAYACAFVQEAAAABW0AAAAABbgEAAAABcEAAAAABdYAAAAABAQgAACAAIAVVAQAAAAFbQAAAAAFuAQAAAAFwQAAAAAF1gAAAAAEBCAAAIgAwBVUBAJoBACFbQACcAQAhbgEAmgEAIXBAAJwBACF1gAAAAAECAAAAGAAgCAAAJAAgBVUBAJoBACFbQACcAQAhbgEAmgEAIXBAAJwBACF1gAAAAAECAAAAGwAgCAAAJgAgAwAAABgAIA0AACAAIA4AACQAIAEAAAAYACABAAAAGwAgAxMAALgBACAUAAC6AQAgFQAAuQEAIAhSAACSAQAwUwAALAAQVAAAkgEAMFUBAHcAIVtAAHoAIW4BAHcAIXBAAHoAIXUAAI4BACADAAAAGwAgAwAAKwAwEgAALAAgAwAAABsAIAMAABwAMAQAABgAIAlSAACQAQAwUwAAMgAQVAAAkAEAMFUBAAAAAVtAAIcBACFuAQCGAQAhbwEAhgEAIXBAAIcBACF0AACRAQAgAQAAAC8AIAEAAAAvACAJUgAAkAEAMFMAADIAEFQAAJABADBVAQCGAQAhW0AAhwEAIW4BAIYBACFvAQCGAQAhcEAAhwEAIXQAAJEBACABggEAALcBACADAAAAMgAgAwAAMwAwBAAALwAgAwAAADIAIAMAADMAMAQAAC8AIAMAAAAyACADAAAzADAEAAAvACAGVQEAAAABW0AAAAABbgEAAAABbwEAAAABcEAAAAABdIAAAAABAQgAADcAIAZVAQAAAAFbQAAAAAFuAQAAAAFvAQAAAAFwQAAAAAF0gAAAAAEBCAAAOQAwBlUBAJoBACFbQACcAQAhbgEAmgEAIW8BAJoBACFwQACcAQAhdIAAAAABAgAAAC8AIAgAADsAIAZVAQCaAQAhW0AAnAEAIW4BAJoBACFvAQCaAQAhcEAAnAEAIXSAAAAAAQIAAAAyACAIAAA9ACADAAAALwAgDQAANwAgDgAAOwAgAQAAAC8AIAEAAAAyACADEwAAtAEAIBQAALYBACAVAAC1AQAgCVIAAI0BADBTAABDABBUAACNAQAwVQEAdwAhW0AAegAhbgEAdwAhbwEAdwAhcEAAegAhdAAAjgEAIAMAAAAyACADAABCADASAABDACADAAAAMgAgAwAAMwAwBAAALwAgCTUAAIgBACBSAACFAQAwUwAATgAQVAAAhQEAMFUBAAAAAVtAAIcBACFuAQCGAQAhbwEAhgEAIXBAAIcBACEBAAAARgAgCzQAAIwBACBSAACJAQAwUwAASAAQVAAAiQEAMFUBAIYBACFWAQCGAQAhVwEAhgEAIVgBAIoBACFZAACLAQAgWgEAigEAIVtAAIcBACEFNAAAsgEAIFgAAJYBACBZAACWAQAgWgAAlgEAIIIBAACzAQAgCzQAAIwBACBSAACJAQAwUwAASAAQVAAAiQEAMFUBAAAAAVYBAIYBACFXAQCGAQAhWAEAigEAIVkAAIsBACBaAQCKAQAhW0AAhwEAIQMAAABIACADAABJADAEAABKACABAAAASAAgAQAAAEYAIAk1AACIAQAgUgAAhQEAMFMAAE4AEFQAAIUBADBVAQCGAQAhW0AAhwEAIW4BAIYBACFvAQCGAQAhcEAAhwEAIQI1AACwAQAgggEAALEBACADAAAATgAgAwAATwAwBAAARgAgAwAAAE4AIAMAAE8AMAQAAEYAIAMAAABOACADAABPADAEAABGACAGNQAArwEAIFUBAAAAAVtAAAAAAW4BAAAAAW8BAAAAAXBAAAAAAQEIAABTACAFVQEAAAABW0AAAAABbgEAAAABbwEAAAABcEAAAAABAQgAAFUAMAY1AACiAQAgVQEAmgEAIVtAAJwBACFuAQCaAQAhbwEAmgEAIXBAAJwBACECAAAARgAgCAAAVwAgBVUBAJoBACFbQACcAQAhbgEAmgEAIW8BAJoBACFwQACcAQAhAgAAAE4AIAgAAFkAIAMAAABGACANAABTACAOAABXACABAAAARgAgAQAAAE4AIAMTAACfAQAgFAAAoQEAIBUAAKABACAIUgAAhAEAMFMAAF8AEFQAAIQBADBVAQB3ACFbQAB6ACFuAQB3ACFvAQB3ACFwQAB6ACEDAAAATgAgAwAAXgAwEgAAXwAgAwAAAE4AIAMAAE8AMAQAAEYAIAEAAABKACABAAAASgAgAwAAAEgAIAMAAEkAMAQAAEoAIAMAAABIACADAABJADAEAABKACADAAAASAAgAwAASQAwBAAASgAgCDQAAJ4BACBVAQAAAAFWAQAAAAFXAQAAAAFYAQAAAAFZgAAAAAFaAQAAAAFbQAAAAAEBCAAAZwAgB1UBAAAAAVYBAAAAAVcBAAAAAVgBAAAAAVmAAAAAAVoBAAAAAVtAAAAAAQEIAABpADAINAAAnQEAIFUBAJoBACFWAQCaAQAhVwEAmgEAIVgBAJsBACFZgAAAAAFaAQCbAQAhW0AAnAEAIQIAAABKACAIAABrACAHVQEAmgEAIVYBAJoBACFXAQCaAQAhWAEAmwEAIVmAAAAAAVoBAJsBACFbQACcAQAhAgAAAEgAIAgAAG0AIAMAAABKACANAABnACAOAABrACABAAAASgAgAQAAAEgAIAYTAACXAQAgFAAAmQEAIBUAAJgBACBYAACWAQAgWQAAlgEAIFoAAJYBACAKUgAAdgAwUwAAcwAQVAAAdgAwVQEAdwAhVgEAdwAhVwEAdwAhWAEAeAAhWQAAeQAgWgEAeAAhW0AAegAhAwAAAEgAIAMAAHIAMBIAAHMAIAMAAABIACADAABJADAEAABKACAKUgAAdgAwUwAAcwAQVAAAdgAwVQEAdwAhVgEAdwAhVwEAdwAhWAEAeAAhWQAAeQAgWgEAeAAhW0AAegAhDxMAAHwAIBQAAIMBACAVAACDAQAgXAEAAAABXQEAAAAEXgEAAAAEXwEAAAABYAEAAAABYQEAAAABYgEAAAABYwEAggEAIWoBAAAAAWsBAAAAAWwBAAAAAW0BAAAAAQ8TAAB-ACAUAACBAQAgFQAAgQEAIFwBAAAAAV0BAAAABV4BAAAABV8BAAAAAWABAAAAAWEBAAAAAWIBAAAAAWMBAIABACFqAQAAAAFrAQAAAAFsAQAAAAFtAQAAAAEPEwAAfgAgFAAAfwAgFQAAfwAgXIAAAAABX4AAAAABYIAAAAABYYAAAAABYoAAAAABY4AAAAABZAEAAAABZQEAAAABZgEAAAABZ4AAAAABaIAAAAABaYAAAAABCxMAAHwAIBQAAH0AIBUAAH0AIFxAAAAAAV1AAAAABF5AAAAABF9AAAAAAWBAAAAAAWFAAAAAAWJAAAAAAWNAAHsAIQsTAAB8ACAUAAB9ACAVAAB9ACBcQAAAAAFdQAAAAAReQAAAAARfQAAAAAFgQAAAAAFhQAAAAAFiQAAAAAFjQAB7ACEIXAIAAAABXQIAAAAEXgIAAAAEXwIAAAABYAIAAAABYQIAAAABYgIAAAABYwIAfAAhCFxAAAAAAV1AAAAABF5AAAAABF9AAAAAAWBAAAAAAWFAAAAAAWJAAAAAAWNAAH0AIQhcAgAAAAFdAgAAAAVeAgAAAAVfAgAAAAFgAgAAAAFhAgAAAAFiAgAAAAFjAgB-ACEMXIAAAAABX4AAAAABYIAAAAABYYAAAAABYoAAAAABY4AAAAABZAEAAAABZQEAAAABZgEAAAABZ4AAAAABaIAAAAABaYAAAAABDxMAAH4AIBQAAIEBACAVAACBAQAgXAEAAAABXQEAAAAFXgEAAAAFXwEAAAABYAEAAAABYQEAAAABYgEAAAABYwEAgAEAIWoBAAAAAWsBAAAAAWwBAAAAAW0BAAAAAQxcAQAAAAFdAQAAAAVeAQAAAAVfAQAAAAFgAQAAAAFhAQAAAAFiAQAAAAFjAQCBAQAhagEAAAABawEAAAABbAEAAAABbQEAAAABDxMAAHwAIBQAAIMBACAVAACDAQAgXAEAAAABXQEAAAAEXgEAAAAEXwEAAAABYAEAAAABYQEAAAABYgEAAAABYwEAggEAIWoBAAAAAWsBAAAAAWwBAAAAAW0BAAAAAQxcAQAAAAFdAQAAAAReAQAAAARfAQAAAAFgAQAAAAFhAQAAAAFiAQAAAAFjAQCDAQAhagEAAAABawEAAAABbAEAAAABbQEAAAABCFIAAIQBADBTAABfABBUAACEAQAwVQEAdwAhW0AAegAhbgEAdwAhbwEAdwAhcEAAegAhCTUAAIgBACBSAACFAQAwUwAATgAQVAAAhQEAMFUBAIYBACFbQACHAQAhbgEAhgEAIW8BAIYBACFwQACHAQAhDFwBAAAAAV0BAAAABF4BAAAABF8BAAAAAWABAAAAAWEBAAAAAWIBAAAAAWMBAIMBACFqAQAAAAFrAQAAAAFsAQAAAAFtAQAAAAEIXEAAAAABXUAAAAAEXkAAAAAEX0AAAAABYEAAAAABYUAAAAABYkAAAAABY0AAfQAhA3EAAEgAIHIAAEgAIHMAAEgAIAs0AACMAQAgUgAAiQEAMFMAAEgAEFQAAIkBADBVAQCGAQAhVgEAhgEAIVcBAIYBACFYAQCKAQAhWQAAiwEAIFoBAIoBACFbQACHAQAhDFwBAAAAAV0BAAAABV4BAAAABV8BAAAAAWABAAAAAWEBAAAAAWIBAAAAAWMBAIEBACFqAQAAAAFrAQAAAAFsAQAAAAFtAQAAAAEMXIAAAAABX4AAAAABYIAAAAABYYAAAAABYoAAAAABY4AAAAABZAEAAAABZQEAAAABZgEAAAABZ4AAAAABaIAAAAABaYAAAAABCzUAAIgBACBSAACFAQAwUwAATgAQVAAAhQEAMFUBAIYBACFbQACHAQAhbgEAhgEAIW8BAIYBACFwQACHAQAhdwAATgAgeAAATgAgCVIAAI0BADBTAABDABBUAACNAQAwVQEAdwAhW0AAegAhbgEAdwAhbwEAdwAhcEAAegAhdAAAjgEAIA8TAAB8ACAUAACPAQAgFQAAjwEAIFyAAAAAAV-AAAAAAWCAAAAAAWGAAAAAAWKAAAAAAWOAAAAAAWQBAAAAAWUBAAAAAWYBAAAAAWeAAAAAAWiAAAAAAWmAAAAAAQxcgAAAAAFfgAAAAAFggAAAAAFhgAAAAAFigAAAAAFjgAAAAAFkAQAAAAFlAQAAAAFmAQAAAAFngAAAAAFogAAAAAFpgAAAAAEJUgAAkAEAMFMAADIAEFQAAJABADBVAQCGAQAhW0AAhwEAIW4BAIYBACFvAQCGAQAhcEAAhwEAIXQAAJEBACAMXIAAAAABX4AAAAABYIAAAAABYYAAAAABYoAAAAABY4AAAAABZAEAAAABZQEAAAABZgEAAAABZ4AAAAABaIAAAAABaYAAAAABCFIAAJIBADBTAAAsABBUAACSAQAwVQEAdwAhW0AAegAhbgEAdwAhcEAAegAhdQAAjgEAIAhSAACTAQAwUwAAGwAQVAAAkwEAMFUBAIYBACFbQACHAQAhbgEAhgEAIXBAAIcBACF1AACRAQAgCFIAAJQBADBTAAAVABBUAACUAQAwVQEAdwAhW0AAegAhbgEAdwAhcEAAegAhdgAAjgEAIAhSAACVAQAwUwAABAAQVAAAlQEAMFUBAIYBACFbQACHAQAhbgEAhgEAIXBAAIcBACF2AACRAQAgAAAAAAF8AQAAAAEBfAEAAAABAXxAAAAAAQUNAADBAQAgDgAAxAEAIHkAAMIBACB6AADDAQAgfwAARgAgAw0AAMEBACB5AADCAQAgfwAARgAgAAAACw0AAKMBADAOAACoAQAweQAApAEAMHoAAKUBADB7AACmAQAgfAAApwEAMH0AAKcBADB-AACnAQAwfwAApwEAMIABAACpAQAwgQEAAKoBADAGVQEAAAABVwEAAAABWAEAAAABWYAAAAABWgEAAAABW0AAAAABAgAAAEoAIA0AAK4BACADAAAASgAgDQAArgEAIA4AAK0BACABCAAAwAEAMAs0AACMAQAgUgAAiQEAMFMAAEgAEFQAAIkBADBVAQAAAAFWAQCGAQAhVwEAhgEAIVgBAIoBACFZAACLAQAgWgEAigEAIVtAAIcBACECAAAASgAgCAAArQEAIAIAAACrAQAgCAAArAEAIApSAACqAQAwUwAAqwEAEFQAAKoBADBVAQCGAQAhVgEAhgEAIVcBAIYBACFYAQCKAQAhWQAAiwEAIFoBAIoBACFbQACHAQAhClIAAKoBADBTAACrAQAQVAAAqgEAMFUBAIYBACFWAQCGAQAhVwEAhgEAIVgBAIoBACFZAACLAQAgWgEAigEAIVtAAIcBACEGVQEAmgEAIVcBAJoBACFYAQCbAQAhWYAAAAABWgEAmwEAIVtAAJwBACEGVQEAmgEAIVcBAJoBACFYAQCbAQAhWYAAAAABWgEAmwEAIVtAAJwBACEGVQEAAAABVwEAAAABWAEAAAABWYAAAAABWgEAAAABW0AAAAABBA0AAKMBADB5AACkAQAwewAApgEAIH8AAKcBADAAAW0BAAAAAQI1AACwAQAgggEAALEBACABbQEAAAABAAAAAW0BAAAAAQAAAAFtAQAAAAEAAAABbQEAAAABBlUBAAAAAVcBAAAAAVgBAAAAAVmAAAAAAVoBAAAAAVtAAAAAAQVVAQAAAAFbQAAAAAFuAQAAAAFvAQAAAAFwQAAAAAECAAAARgAgDQAAwQEAIAMAAABOACANAADBAQAgDgAAxQEAIAcAAABOACAIAADFAQAgVQEAmgEAIVtAAJwBACFuAQCaAQAhbwEAmgEAIXBAAJwBACEFVQEAmgEAIVtAAJwBACFuAQCaAQAhbwEAmgEAIXBAAJwBACEAAAMTAAQUAAUVAAYAAAADEwAEFAAFFQAGAAMTAAoUAAsVAAwAAAADEwAKFAALFQAMAAMTABAUABEVABIAAAADEwAQFAARFQASAhMAFjVLFQE0ABQBNUwAAxMAGBQAGRUAGgAAAAMTABgUABkVABoDEwAdFAAeFQAfAAAAAxMAHRQAHhUAHwECAQIDAQUGAQYHAQcIAQkKAQoMAgsOAQwQAg8RARASARETAhYWAxcXBxgZCBkaCBodCBseCBwfCB0hCB4jAh8lCCAnAiEoCCIpCCMqAiQtCSUuDSYwDicxDig0Dik1Dio2Dis4Diw6Ai08Di4-Ai8_DjBADjFBAjJEDzNFEzZHFDdNFDhQFDlRFDpSFDtUFDxWAj1YFD5aAj9bFEBcFEFdAkJgF0NhG0RiFUVjFUZkFUdlFUhmFUloFUpqAktsFUxuAk1vFU5wFU9xAlB0HFF1IA"
    };
    config.compilerWasm = {
      getRuntime: /* @__PURE__ */ __name(async () => require_query_compiler_fast_bg(), "getRuntime"),
      getQueryCompilerWasmModule: /* @__PURE__ */ __name(async () => {
        const loader = (await Promise.resolve().then(() => (init_wasm_worker_loader(), wasm_worker_loader_exports))).default;
        const compiler = (await loader).default;
        return compiler;
      }, "getQueryCompilerWasmModule"),
      importName: "./query_compiler_fast_bg.js"
    };
    if (typeof globalThis !== "undefined" && globalThis["DEBUG"] || typeof process !== "undefined" && process.env && process.env.DEBUG || void 0) {
      Debug3.enable(typeof globalThis !== "undefined" && globalThis["DEBUG"] || typeof process !== "undefined" && process.env && process.env.DEBUG || void 0);
    }
    var PrismaClient2 = getPrismaClient2(config);
    exports.PrismaClient = PrismaClient2;
    Object.assign(exports, Prisma);
  }
});

// ../node_modules/.pnpm/@prisma+client@7.8.0_prisma_e898b9d9c438e592d89244ea5c805b9f/node_modules/.prisma/client/default.js
var require_default = __commonJS({
  "../node_modules/.pnpm/@prisma+client@7.8.0_prisma_e898b9d9c438e592d89244ea5c805b9f/node_modules/.prisma/client/default.js"(exports, module) {
    init_checked_fetch();
    init_modules_watch_stub();
    module.exports = { ...require_edge() };
  }
});

// ../node_modules/.pnpm/@prisma+client@7.8.0_prisma_e898b9d9c438e592d89244ea5c805b9f/node_modules/@prisma/client/default.js
var require_default2 = __commonJS({
  "../node_modules/.pnpm/@prisma+client@7.8.0_prisma_e898b9d9c438e592d89244ea5c805b9f/node_modules/@prisma/client/default.js"(exports, module) {
    init_checked_fetch();
    init_modules_watch_stub();
    module.exports = {
      ...require_default()
    };
  }
});

// .wrangler/tmp/bundle-8B5er1/middleware-loader.entry.ts
init_checked_fetch();
init_modules_watch_stub();

// .wrangler/tmp/bundle-8B5er1/middleware-insertion-facade.js
init_checked_fetch();
init_modules_watch_stub();

// src/index.ts
init_checked_fetch();
init_modules_watch_stub();

// ../node_modules/.pnpm/hono@4.12.27/node_modules/hono/dist/index.js
init_checked_fetch();
init_modules_watch_stub();

// ../node_modules/.pnpm/hono@4.12.27/node_modules/hono/dist/hono.js
init_checked_fetch();
init_modules_watch_stub();

// ../node_modules/.pnpm/hono@4.12.27/node_modules/hono/dist/hono-base.js
init_checked_fetch();
init_modules_watch_stub();

// ../node_modules/.pnpm/hono@4.12.27/node_modules/hono/dist/compose.js
init_checked_fetch();
init_modules_watch_stub();
var compose = /* @__PURE__ */ __name((middleware, onError, onNotFound) => {
  return (context, next) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i) {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }
      index = i;
      let res;
      let isError = false;
      let handler;
      if (middleware[i]) {
        handler = middleware[i][0][0];
        context.req.routeIndex = i;
      } else {
        handler = i === middleware.length && next || void 0;
      }
      if (handler) {
        try {
          res = await handler(context, () => dispatch(i + 1));
        } catch (err) {
          if (err instanceof Error && onError) {
            context.error = err;
            res = await onError(err, context);
            isError = true;
          } else {
            throw err;
          }
        }
      } else {
        if (context.finalized === false && onNotFound) {
          res = await onNotFound(context);
        }
      }
      if (res && (context.finalized === false || isError)) {
        context.res = res;
      }
      return context;
    }
    __name(dispatch, "dispatch");
  };
}, "compose");

// ../node_modules/.pnpm/hono@4.12.27/node_modules/hono/dist/context.js
init_checked_fetch();
init_modules_watch_stub();

// ../node_modules/.pnpm/hono@4.12.27/node_modules/hono/dist/request.js
init_checked_fetch();
init_modules_watch_stub();

// ../node_modules/.pnpm/hono@4.12.27/node_modules/hono/dist/http-exception.js
init_checked_fetch();
init_modules_watch_stub();

// ../node_modules/.pnpm/hono@4.12.27/node_modules/hono/dist/request/constants.js
init_checked_fetch();
init_modules_watch_stub();
var GET_MATCH_RESULT = /* @__PURE__ */ Symbol();

// ../node_modules/.pnpm/hono@4.12.27/node_modules/hono/dist/utils/body.js
init_checked_fetch();
init_modules_watch_stub();
var parseBody = /* @__PURE__ */ __name(async (request, options = /* @__PURE__ */ Object.create(null)) => {
  const { all = false, dot = false } = options;
  const headers = request instanceof HonoRequest ? request.raw.headers : request.headers;
  const contentType = headers.get("Content-Type");
  if (contentType?.startsWith("multipart/form-data") || contentType?.startsWith("application/x-www-form-urlencoded")) {
    return parseFormData(request, { all, dot });
  }
  return {};
}, "parseBody");
async function parseFormData(request, options) {
  const formData = await request.formData();
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
__name(parseFormData, "parseFormData");
function convertFormDataToBodyData(formData, options) {
  const form = /* @__PURE__ */ Object.create(null);
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith("[]");
    if (!shouldParseAllValues) {
      form[key] = value;
    } else {
      handleParsingAllValues(form, key, value);
    }
  });
  if (options.dot) {
    Object.entries(form).forEach(([key, value]) => {
      const shouldParseDotValues = key.includes(".");
      if (shouldParseDotValues) {
        handleParsingNestedValues(form, key, value);
        delete form[key];
      }
    });
  }
  return form;
}
__name(convertFormDataToBodyData, "convertFormDataToBodyData");
var handleParsingAllValues = /* @__PURE__ */ __name((form, key, value) => {
  if (form[key] !== void 0) {
    if (Array.isArray(form[key])) {
      ;
      form[key].push(value);
    } else {
      form[key] = [form[key], value];
    }
  } else {
    if (!key.endsWith("[]")) {
      form[key] = value;
    } else {
      form[key] = [value];
    }
  }
}, "handleParsingAllValues");
var handleParsingNestedValues = /* @__PURE__ */ __name((form, key, value) => {
  if (/(?:^|\.)__proto__\./.test(key)) {
    return;
  }
  let nestedForm = form;
  const keys = key.split(".");
  keys.forEach((key2, index) => {
    if (index === keys.length - 1) {
      nestedForm[key2] = value;
    } else {
      if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
        nestedForm[key2] = /* @__PURE__ */ Object.create(null);
      }
      nestedForm = nestedForm[key2];
    }
  });
}, "handleParsingNestedValues");

// ../node_modules/.pnpm/hono@4.12.27/node_modules/hono/dist/utils/url.js
init_checked_fetch();
init_modules_watch_stub();
var splitPath = /* @__PURE__ */ __name((path) => {
  const paths = path.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
  return paths;
}, "splitPath");
var splitRoutingPath = /* @__PURE__ */ __name((routePath) => {
  const { groups, path } = extractGroupsFromPath(routePath);
  const paths = splitPath(path);
  return replaceGroupMarks(paths, groups);
}, "splitRoutingPath");
var extractGroupsFromPath = /* @__PURE__ */ __name((path) => {
  const groups = [];
  path = path.replace(/\{[^}]+\}/g, (match3, index) => {
    const mark = `@${index}`;
    groups.push([mark, match3]);
    return mark;
  });
  return { groups, path };
}, "extractGroupsFromPath");
var replaceGroupMarks = /* @__PURE__ */ __name((paths, groups) => {
  for (let i = groups.length - 1; i >= 0; i--) {
    const [mark] = groups[i];
    for (let j = paths.length - 1; j >= 0; j--) {
      if (paths[j].includes(mark)) {
        paths[j] = paths[j].replace(mark, groups[i][1]);
        break;
      }
    }
  }
  return paths;
}, "replaceGroupMarks");
var patternCache = {};
var getPattern = /* @__PURE__ */ __name((label, next) => {
  if (label === "*") {
    return "*";
  }
  const match3 = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match3) {
    const cacheKey = `${label}#${next}`;
    if (!patternCache[cacheKey]) {
      if (match3[2]) {
        patternCache[cacheKey] = next && next[0] !== ":" && next[0] !== "*" ? [cacheKey, match3[1], new RegExp(`^${match3[2]}(?=/${next})`)] : [label, match3[1], new RegExp(`^${match3[2]}$`)];
      } else {
        patternCache[cacheKey] = [label, match3[1], true];
      }
    }
    return patternCache[cacheKey];
  }
  return null;
}, "getPattern");
var tryDecode = /* @__PURE__ */ __name((str, decoder) => {
  try {
    return decoder(str);
  } catch {
    return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match3) => {
      try {
        return decoder(match3);
      } catch {
        return match3;
      }
    });
  }
}, "tryDecode");
var tryDecodeURI = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURI), "tryDecodeURI");
var getPath = /* @__PURE__ */ __name((request) => {
  const url = request.url;
  const start = url.indexOf("/", url.indexOf(":") + 4);
  let i = start;
  for (; i < url.length; i++) {
    const charCode = url.charCodeAt(i);
    if (charCode === 37) {
      const queryIndex = url.indexOf("?", i);
      const hashIndex = url.indexOf("#", i);
      const end = queryIndex === -1 ? hashIndex === -1 ? void 0 : hashIndex : hashIndex === -1 ? queryIndex : Math.min(queryIndex, hashIndex);
      const path = url.slice(start, end);
      return tryDecodeURI(path.includes("%25") ? path.replace(/%25/g, "%2525") : path);
    } else if (charCode === 63 || charCode === 35) {
      break;
    }
  }
  return url.slice(start, i);
}, "getPath");
var getPathNoStrict = /* @__PURE__ */ __name((request) => {
  const result = getPath(request);
  return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
}, "getPathNoStrict");
var mergePath = /* @__PURE__ */ __name((base, sub, ...rest) => {
  if (rest.length) {
    sub = mergePath(sub, ...rest);
  }
  return `${base?.[0] === "/" ? "" : "/"}${base}${sub === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub?.[0] === "/" ? sub.slice(1) : sub}`}`;
}, "mergePath");
var checkOptionalParameter = /* @__PURE__ */ __name((path) => {
  if (path.charCodeAt(path.length - 1) !== 63 || !path.includes(":")) {
    return null;
  }
  const segments = path.split("/");
  const results = [];
  let basePath32 = "";
  segments.forEach((segment) => {
    if (segment !== "" && !/\:/.test(segment)) {
      basePath32 += "/" + segment;
    } else if (/\:/.test(segment)) {
      if (/\?/.test(segment)) {
        if (results.length === 0 && basePath32 === "") {
          results.push("/");
        } else {
          results.push(basePath32);
        }
        const optionalSegment = segment.replace("?", "");
        basePath32 += "/" + optionalSegment;
        results.push(basePath32);
      } else {
        basePath32 += "/" + segment;
      }
    }
  });
  return results.filter((v, i, a) => a.indexOf(v) === i);
}, "checkOptionalParameter");
var _decodeURI = /* @__PURE__ */ __name((value) => {
  if (!/[%+]/.test(value)) {
    return value;
  }
  if (value.indexOf("+") !== -1) {
    value = value.replace(/\+/g, " ");
  }
  return value.indexOf("%") !== -1 ? tryDecode(value, decodeURIComponent_) : value;
}, "_decodeURI");
var _getQueryParam = /* @__PURE__ */ __name((url, key, multiple) => {
  let encoded;
  if (!multiple && key && !/[%+]/.test(key)) {
    let keyIndex2 = url.indexOf("?", 8);
    if (keyIndex2 === -1) {
      return void 0;
    }
    if (!url.startsWith(key, keyIndex2 + 1)) {
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
        return "";
      }
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) {
      return void 0;
    }
  }
  const results = {};
  encoded ??= /[%+]/.test(url);
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
      valueIndex = -1;
    }
    let name2 = url.slice(
      keyIndex + 1,
      valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
    );
    if (encoded) {
      name2 = _decodeURI(name2);
    }
    keyIndex = nextKeyIndex;
    if (name2 === "") {
      continue;
    }
    let value;
    if (valueIndex === -1) {
      value = "";
    } else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
      if (encoded) {
        value = _decodeURI(value);
      }
    }
    if (multiple) {
      if (!(results[name2] && Array.isArray(results[name2]))) {
        results[name2] = [];
      }
      ;
      results[name2].push(value);
    } else {
      results[name2] ??= value;
    }
  }
  return key ? results[key] : results;
}, "_getQueryParam");
var getQueryParam = _getQueryParam;
var getQueryParams = /* @__PURE__ */ __name((url, key) => {
  return _getQueryParam(url, key, true);
}, "getQueryParams");
var decodeURIComponent_ = decodeURIComponent;

// ../node_modules/.pnpm/hono@4.12.27/node_modules/hono/dist/request.js
var tryDecodeURIComponent = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURIComponent_), "tryDecodeURIComponent");
var HonoRequest = class {
  static {
    __name(this, "HonoRequest");
  }
  /**
   * `.raw` can get the raw Request object.
   *
   * @see {@link https://hono.dev/docs/api/request#raw}
   *
   * @example
   * ```ts
   * // For Cloudflare Workers
   * app.post('/', async (c) => {
   *   const metadata = c.req.raw.cf?.hostMetadata?
   *   ...
   * })
   * ```
   */
  raw;
  #validatedData;
  // Short name of validatedData
  #matchResult;
  routeIndex = 0;
  /**
   * `.path` can get the pathname of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#path}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const pathname = c.req.path // `/about/me`
   * })
   * ```
   */
  path;
  bodyCache = {};
  constructor(request, path = "/", matchResult = [[]]) {
    this.raw = request;
    this.path = path;
    this.#matchResult = matchResult;
    this.#validatedData = {};
  }
  param(key) {
    return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
  }
  #getDecodedParam(key) {
    const paramKey = this.#matchResult[0][this.routeIndex][1][key];
    const param = this.#getParamValue(paramKey);
    return param && /\%/.test(param) ? tryDecodeURIComponent(param) : param;
  }
  #getAllDecodedParams() {
    const decoded = {};
    const keys = Object.keys(this.#matchResult[0][this.routeIndex][1]);
    for (const key of keys) {
      const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
      if (value !== void 0) {
        decoded[key] = /\%/.test(value) ? tryDecodeURIComponent(value) : value;
      }
    }
    return decoded;
  }
  #getParamValue(paramKey) {
    return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
  }
  query(key) {
    return getQueryParam(this.url, key);
  }
  queries(key) {
    return getQueryParams(this.url, key);
  }
  header(name2) {
    if (name2) {
      return this.raw.headers.get(name2) ?? void 0;
    }
    const headerData = {};
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  async parseBody(options) {
    return parseBody(this, options);
  }
  #cachedBody = /* @__PURE__ */ __name((key) => {
    const { bodyCache, raw: raw3 } = this;
    const cachedBody = bodyCache[key];
    if (cachedBody) {
      return cachedBody;
    }
    const anyCachedKey = Object.keys(bodyCache)[0];
    if (anyCachedKey) {
      return bodyCache[anyCachedKey].then((body) => {
        if (anyCachedKey === "json") {
          body = JSON.stringify(body);
        }
        return new Response(body)[key]();
      });
    }
    return bodyCache[key] = raw3[key]();
  }, "#cachedBody");
  /**
   * `.json()` can parse Request body of type `application/json`
   *
   * @see {@link https://hono.dev/docs/api/request#json}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.json()
   * })
   * ```
   */
  json() {
    return this.#cachedBody("text").then((text) => JSON.parse(text));
  }
  /**
   * `.text()` can parse Request body of type `text/plain`
   *
   * @see {@link https://hono.dev/docs/api/request#text}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.text()
   * })
   * ```
   */
  text() {
    return this.#cachedBody("text");
  }
  /**
   * `.arrayBuffer()` parse Request body as an `ArrayBuffer`
   *
   * @see {@link https://hono.dev/docs/api/request#arraybuffer}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.arrayBuffer()
   * })
   * ```
   */
  arrayBuffer() {
    return this.#cachedBody("arrayBuffer");
  }
  /**
   * `.bytes()` parses the request body as a `Uint8Array`.
   *
   * @see {@link https://hono.dev/docs/api/request#bytes}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.bytes()
   * })
   * ```
   */
  bytes() {
    return this.#cachedBody("arrayBuffer").then((buffer) => new Uint8Array(buffer));
  }
  /**
   * Parses the request body as a `Blob`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.blob();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#blob
   */
  blob() {
    return this.#cachedBody("blob");
  }
  /**
   * Parses the request body as `FormData`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.formData();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#formdata
   */
  formData() {
    return this.#cachedBody("formData");
  }
  /**
   * Adds validated data to the request.
   *
   * @param target - The target of the validation.
   * @param data - The validated data to add.
   */
  addValidatedData(target, data) {
    this.#validatedData[target] = data;
  }
  valid(target) {
    return this.#validatedData[target];
  }
  /**
   * `.url()` can get the request url strings.
   *
   * @see {@link https://hono.dev/docs/api/request#url}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const url = c.req.url // `http://localhost:8787/about/me`
   *   ...
   * })
   * ```
   */
  get url() {
    return this.raw.url;
  }
  /**
   * `.method()` can get the method name of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#method}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const method = c.req.method // `GET`
   * })
   * ```
   */
  get method() {
    return this.raw.method;
  }
  get [GET_MATCH_RESULT]() {
    return this.#matchResult;
  }
  /**
   * `.matchedRoutes()` can return a matched route in the handler
   *
   * @deprecated
   *
   * Use matchedRoutes helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#matchedroutes}
   *
   * @example
   * ```ts
   * app.use('*', async function logger(c, next) {
   *   await next()
   *   c.req.matchedRoutes.forEach(({ handler, method, path }, i) => {
   *     const name = handler.name || (handler.length < 2 ? '[handler]' : '[middleware]')
   *     console.log(
   *       method,
   *       ' ',
   *       path,
   *       ' '.repeat(Math.max(10 - path.length, 0)),
   *       name,
   *       i === c.req.routeIndex ? '<- respond from here' : ''
   *     )
   *   })
   * })
   * ```
   */
  get matchedRoutes() {
    return this.#matchResult[0].map(([[, route]]) => route);
  }
  /**
   * `routePath()` can retrieve the path registered within the handler
   *
   * @deprecated
   *
   * Use routePath helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#routepath}
   *
   * @example
   * ```ts
   * app.get('/posts/:id', (c) => {
   *   return c.json({ path: c.req.routePath })
   * })
   * ```
   */
  get routePath() {
    return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
  }
};

// ../node_modules/.pnpm/hono@4.12.27/node_modules/hono/dist/utils/html.js
init_checked_fetch();
init_modules_watch_stub();
var HtmlEscapedCallbackPhase = {
  Stringify: 1,
  BeforeStream: 2,
  Stream: 3
};
var raw2 = /* @__PURE__ */ __name((value, callbacks) => {
  const escapedString = new String(value);
  escapedString.isEscaped = true;
  escapedString.callbacks = callbacks;
  return escapedString;
}, "raw");
var resolveCallback = /* @__PURE__ */ __name(async (str, phase, preserveCallbacks, context, buffer) => {
  if (typeof str === "object" && !(str instanceof String)) {
    if (!(str instanceof Promise)) {
      str = str.toString();
    }
    if (str instanceof Promise) {
      str = await str;
    }
  }
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return Promise.resolve(str);
  }
  if (buffer) {
    buffer[0] += str;
  } else {
    buffer = [str];
  }
  const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context }))).then(
    (res) => Promise.all(
      res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context, buffer))
    ).then(() => buffer[0])
  );
  if (preserveCallbacks) {
    return raw2(await resStr, callbacks);
  } else {
    return resStr;
  }
}, "resolveCallback");

// ../node_modules/.pnpm/hono@4.12.27/node_modules/hono/dist/context.js
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var setDefaultContentType = /* @__PURE__ */ __name((contentType, headers) => {
  return {
    "Content-Type": contentType,
    ...headers
  };
}, "setDefaultContentType");
var createResponseInstance = /* @__PURE__ */ __name((body, init2) => new Response(body, init2), "createResponseInstance");
var Context = class {
  static {
    __name(this, "Context");
  }
  #rawRequest;
  #req;
  /**
   * `.env` can get bindings (environment variables, secrets, KV namespaces, D1 database, R2 bucket etc.) in Cloudflare Workers.
   *
   * @see {@link https://hono.dev/docs/api/context#env}
   *
   * @example
   * ```ts
   * // Environment object for Cloudflare Workers
   * app.get('*', async c => {
   *   const counter = c.env.COUNTER
   * })
   * ```
   */
  env = {};
  #var;
  finalized = false;
  /**
   * `.error` can get the error object from the middleware if the Handler throws an error.
   *
   * @see {@link https://hono.dev/docs/api/context#error}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   await next()
   *   if (c.error) {
   *     // do something...
   *   }
   * })
   * ```
   */
  error;
  #status;
  #executionCtx;
  #res;
  #layout;
  #renderer;
  #notFoundHandler;
  #preparedHeaders;
  #matchResult;
  #path;
  /**
   * Creates an instance of the Context class.
   *
   * @param req - The Request object.
   * @param options - Optional configuration options for the context.
   */
  constructor(req, options) {
    this.#rawRequest = req;
    if (options) {
      this.#executionCtx = options.executionCtx;
      this.env = options.env;
      this.#notFoundHandler = options.notFoundHandler;
      this.#path = options.path;
      this.#matchResult = options.matchResult;
    }
  }
  /**
   * `.req` is the instance of {@link HonoRequest}.
   */
  get req() {
    this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
    return this.#req;
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#event}
   * The FetchEvent associated with the current request.
   *
   * @throws Will throw an error if the context does not have a FetchEvent.
   */
  get event() {
    if (this.#executionCtx && "respondWith" in this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no FetchEvent");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#executionctx}
   * The ExecutionContext associated with the current request.
   *
   * @throws Will throw an error if the context does not have an ExecutionContext.
   */
  get executionCtx() {
    if (this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no ExecutionContext");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#res}
   * The Response object for the current request.
   */
  get res() {
    return this.#res ||= createResponseInstance(null, {
      headers: this.#preparedHeaders ??= new Headers()
    });
  }
  /**
   * Sets the Response object for the current request.
   *
   * @param _res - The Response object to set.
   */
  set res(_res) {
    if (this.#res && _res) {
      _res = createResponseInstance(_res.body, _res);
      for (const [k, v] of this.#res.headers.entries()) {
        if (k === "content-type") {
          continue;
        }
        if (k === "set-cookie") {
          const cookies = this.#res.headers.getSetCookie();
          _res.headers.delete("set-cookie");
          for (const cookie of cookies) {
            _res.headers.append("set-cookie", cookie);
          }
        } else {
          _res.headers.set(k, v);
        }
      }
    }
    this.#res = _res;
    this.finalized = true;
  }
  /**
   * `.render()` can create a response within a layout.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   return c.render('Hello!')
   * })
   * ```
   */
  render = /* @__PURE__ */ __name((...args) => {
    this.#renderer ??= (content) => this.html(content);
    return this.#renderer(...args);
  }, "render");
  /**
   * Sets the layout for the response.
   *
   * @param layout - The layout to set.
   * @returns The layout function.
   */
  setLayout = /* @__PURE__ */ __name((layout) => this.#layout = layout, "setLayout");
  /**
   * Gets the current layout for the response.
   *
   * @returns The current layout function.
   */
  getLayout = /* @__PURE__ */ __name(() => this.#layout, "getLayout");
  /**
   * `.setRenderer()` can set the layout in the custom middleware.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```tsx
   * app.use('*', async (c, next) => {
   *   c.setRenderer((content) => {
   *     return c.html(
   *       <html>
   *         <body>
   *           <p>{content}</p>
   *         </body>
   *       </html>
   *     )
   *   })
   *   await next()
   * })
   * ```
   */
  setRenderer = /* @__PURE__ */ __name((renderer) => {
    this.#renderer = renderer;
  }, "setRenderer");
  /**
   * `.header()` can set headers.
   *
   * @see {@link https://hono.dev/docs/api/context#header}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  header = /* @__PURE__ */ __name((name2, value, options) => {
    if (this.finalized) {
      this.#res = createResponseInstance(this.#res.body, this.#res);
    }
    const headers = this.#res ? this.#res.headers : this.#preparedHeaders ??= new Headers();
    if (value === void 0) {
      headers.delete(name2);
    } else if (options?.append) {
      headers.append(name2, value);
    } else {
      headers.set(name2, value);
    }
  }, "header");
  status = /* @__PURE__ */ __name((status) => {
    this.#status = status;
  }, "status");
  /**
   * `.set()` can set the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   c.set('message', 'Hono is hot!!')
   *   await next()
   * })
   * ```
   */
  set = /* @__PURE__ */ __name((key, value) => {
    this.#var ??= /* @__PURE__ */ new Map();
    this.#var.set(key, value);
  }, "set");
  /**
   * `.get()` can use the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   const message = c.get('message')
   *   return c.text(`The message is "${message}"`)
   * })
   * ```
   */
  get = /* @__PURE__ */ __name((key) => {
    return this.#var ? this.#var.get(key) : void 0;
  }, "get");
  /**
   * `.var` can access the value of a variable.
   *
   * @see {@link https://hono.dev/docs/api/context#var}
   *
   * @example
   * ```ts
   * const result = c.var.client.oneMethod()
   * ```
   */
  // c.var.propName is a read-only
  get var() {
    if (!this.#var) {
      return {};
    }
    return Object.fromEntries(this.#var);
  }
  #newResponse(data, arg, headers) {
    const responseHeaders = this.#res ? new Headers(this.#res.headers) : this.#preparedHeaders ?? new Headers();
    if (typeof arg === "object" && "headers" in arg) {
      const argHeaders = arg.headers instanceof Headers ? arg.headers : new Headers(arg.headers);
      for (const [key, value] of argHeaders) {
        if (key.toLowerCase() === "set-cookie") {
          responseHeaders.append(key, value);
        } else {
          responseHeaders.set(key, value);
        }
      }
    }
    if (headers) {
      for (const [k, v] of Object.entries(headers)) {
        if (typeof v === "string") {
          responseHeaders.set(k, v);
        } else {
          responseHeaders.delete(k);
          for (const v2 of v) {
            responseHeaders.append(k, v2);
          }
        }
      }
    }
    const status = typeof arg === "number" ? arg : arg?.status ?? this.#status;
    return createResponseInstance(data, { status, headers: responseHeaders });
  }
  newResponse = /* @__PURE__ */ __name((...args) => this.#newResponse(...args), "newResponse");
  /**
   * `.body()` can return the HTTP response.
   * You can set headers with `.header()` and set HTTP status code with `.status`.
   * This can also be set in `.text()`, `.json()` and so on.
   *
   * @see {@link https://hono.dev/docs/api/context#body}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *   // Set HTTP status code
   *   c.status(201)
   *
   *   // Return the response body
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  body = /* @__PURE__ */ __name((data, arg, headers) => this.#newResponse(data, arg, headers), "body");
  /**
   * `.text()` can render text as `Content-Type:text/plain`.
   *
   * @see {@link https://hono.dev/docs/api/context#text}
   *
   * @example
   * ```ts
   * app.get('/say', (c) => {
   *   return c.text('Hello!')
   * })
   * ```
   */
  text = /* @__PURE__ */ __name((text, arg, headers) => {
    return !this.#preparedHeaders && !this.#status && !arg && !headers && !this.finalized ? new Response(text) : this.#newResponse(
      text,
      arg,
      setDefaultContentType(TEXT_PLAIN, headers)
    );
  }, "text");
  /**
   * `.json()` can render JSON as `Content-Type:application/json`.
   *
   * @see {@link https://hono.dev/docs/api/context#json}
   *
   * @example
   * ```ts
   * app.get('/api', (c) => {
   *   return c.json({ message: 'Hello!' })
   * })
   * ```
   */
  json = /* @__PURE__ */ __name((object, arg, headers) => {
    return this.#newResponse(
      JSON.stringify(object),
      arg,
      setDefaultContentType("application/json", headers)
    );
  }, "json");
  html = /* @__PURE__ */ __name((html, arg, headers) => {
    const res = /* @__PURE__ */ __name((html2) => this.#newResponse(html2, arg, setDefaultContentType("text/html; charset=UTF-8", headers)), "res");
    return typeof html === "object" ? resolveCallback(html, HtmlEscapedCallbackPhase.Stringify, false, {}).then(res) : res(html);
  }, "html");
  /**
   * `.redirect()` can Redirect, default status code is 302.
   *
   * @see {@link https://hono.dev/docs/api/context#redirect}
   *
   * @example
   * ```ts
   * app.get('/redirect', (c) => {
   *   return c.redirect('/')
   * })
   * app.get('/redirect-permanently', (c) => {
   *   return c.redirect('/', 301)
   * })
   * ```
   */
  redirect = /* @__PURE__ */ __name((location, status) => {
    const locationString = String(location);
    this.header(
      "Location",
      // Multibyes should be encoded
      // eslint-disable-next-line no-control-regex
      !/[^\x00-\xFF]/.test(locationString) ? locationString : encodeURI(locationString)
    );
    return this.newResponse(null, status ?? 302);
  }, "redirect");
  /**
   * `.notFound()` can return the Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/context#notfound}
   *
   * @example
   * ```ts
   * app.get('/notfound', (c) => {
   *   return c.notFound()
   * })
   * ```
   */
  notFound = /* @__PURE__ */ __name(() => {
    this.#notFoundHandler ??= () => createResponseInstance();
    return this.#notFoundHandler(this);
  }, "notFound");
};

// ../node_modules/.pnpm/hono@4.12.27/node_modules/hono/dist/router.js
init_checked_fetch();
init_modules_watch_stub();
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch"];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = class extends Error {
  static {
    __name(this, "UnsupportedPathError");
  }
};

// ../node_modules/.pnpm/hono@4.12.27/node_modules/hono/dist/utils/constants.js
init_checked_fetch();
init_modules_watch_stub();
var COMPOSED_HANDLER = "__COMPOSED_HANDLER";

// ../node_modules/.pnpm/hono@4.12.27/node_modules/hono/dist/hono-base.js
var notFoundHandler = /* @__PURE__ */ __name((c) => {
  return c.text("404 Not Found", 404);
}, "notFoundHandler");
var errorHandler = /* @__PURE__ */ __name((err, c) => {
  if ("getResponse" in err) {
    const res = err.getResponse();
    return c.newResponse(res.body, res);
  }
  console.error(err);
  return c.text("Internal Server Error", 500);
}, "errorHandler");
var Hono = class _Hono {
  static {
    __name(this, "_Hono");
  }
  get;
  post;
  put;
  delete;
  options;
  patch;
  all;
  on;
  use;
  /*
    This class is like an abstract class and does not have a router.
    To use it, inherit the class and implement router in the constructor.
  */
  router;
  getPath;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  _basePath = "/";
  #path = "/";
  routes = [];
  constructor(options = {}) {
    const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
    allMethods.forEach((method) => {
      this[method] = (args1, ...args) => {
        if (typeof args1 === "string") {
          this.#path = args1;
        } else {
          this.#addRoute(method, this.#path, args1);
        }
        args.forEach((handler) => {
          this.#addRoute(method, this.#path, handler);
        });
        return this;
      };
    });
    this.on = (method, path, ...handlers) => {
      for (const p of [path].flat()) {
        this.#path = p;
        for (const m of [method].flat()) {
          handlers.map((handler) => {
            this.#addRoute(m.toUpperCase(), this.#path, handler);
          });
        }
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") {
        this.#path = arg1;
      } else {
        this.#path = "*";
        handlers.unshift(arg1);
      }
      handlers.forEach((handler) => {
        this.#addRoute(METHOD_NAME_ALL, this.#path, handler);
      });
      return this;
    };
    const { strict, ...optionsWithoutStrict } = options;
    Object.assign(this, optionsWithoutStrict);
    this.getPath = strict ?? true ? options.getPath ?? getPath : getPathNoStrict;
  }
  #clone() {
    const clone = new _Hono({
      router: this.router,
      getPath: this.getPath
    });
    clone.errorHandler = this.errorHandler;
    clone.#notFoundHandler = this.#notFoundHandler;
    clone.routes = this.routes;
    return clone;
  }
  #notFoundHandler = notFoundHandler;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  errorHandler = errorHandler;
  /**
   * `.route()` allows grouping other Hono instance in routes.
   *
   * @see {@link https://hono.dev/docs/api/routing#grouping}
   *
   * @param {string} path - base Path
   * @param {Hono} app - other Hono instance
   * @returns {Hono} routed Hono instance
   *
   * @example
   * ```ts
   * const app = new Hono()
   * const app2 = new Hono()
   *
   * app2.get("/user", (c) => c.text("user"))
   * app.route("/api", app2) // GET /api/user
   * ```
   */
  route(path, app2) {
    const subApp = this.basePath(path);
    app2.routes.map((r) => {
      let handler;
      if (app2.errorHandler === errorHandler) {
        handler = r.handler;
      } else {
        handler = /* @__PURE__ */ __name(async (c, next) => (await compose([], app2.errorHandler)(c, () => r.handler(c, next))).res, "handler");
        handler[COMPOSED_HANDLER] = r.handler;
      }
      subApp.#addRoute(r.method, r.path, handler, r.basePath);
    });
    return this;
  }
  /**
   * `.basePath()` allows base paths to be specified.
   *
   * @see {@link https://hono.dev/docs/api/routing#base-path}
   *
   * @param {string} path - base Path
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * const api = new Hono().basePath('/api')
   * ```
   */
  basePath(path) {
    const subApp = this.#clone();
    subApp._basePath = mergePath(this._basePath, path);
    return subApp;
  }
  /**
   * `.onError()` handles an error and returns a customized Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#error-handling}
   *
   * @param {ErrorHandler} handler - request Handler for error
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.onError((err, c) => {
   *   console.error(`${err}`)
   *   return c.text('Custom Error Message', 500)
   * })
   * ```
   */
  onError = /* @__PURE__ */ __name((handler) => {
    this.errorHandler = handler;
    return this;
  }, "onError");
  /**
   * `.notFound()` allows you to customize a Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#not-found}
   *
   * @param {NotFoundHandler} handler - request handler for not-found
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.notFound((c) => {
   *   return c.text('Custom 404 Message', 404)
   * })
   * ```
   */
  notFound = /* @__PURE__ */ __name((handler) => {
    this.#notFoundHandler = handler;
    return this;
  }, "notFound");
  /**
   * `.mount()` allows you to mount applications built with other frameworks into your Hono application.
   *
   * @see {@link https://hono.dev/docs/api/hono#mount}
   *
   * @param {string} path - base Path
   * @param {Function} applicationHandler - other Request Handler
   * @param {MountOptions} [options] - options of `.mount()`
   * @returns {Hono} mounted Hono instance
   *
   * @example
   * ```ts
   * import { Router as IttyRouter } from 'itty-router'
   * import { Hono } from 'hono'
   * // Create itty-router application
   * const ittyRouter = IttyRouter()
   * // GET /itty-router/hello
   * ittyRouter.get('/hello', () => new Response('Hello from itty-router'))
   *
   * const app = new Hono()
   * app.mount('/itty-router', ittyRouter.handle)
   * ```
   *
   * @example
   * ```ts
   * const app = new Hono()
   * // Send the request to another application without modification.
   * app.mount('/app', anotherApp, {
   *   replaceRequest: (req) => req,
   * })
   * ```
   */
  mount(path, applicationHandler, options) {
    let replaceRequest;
    let optionHandler;
    if (options) {
      if (typeof options === "function") {
        optionHandler = options;
      } else {
        optionHandler = options.optionHandler;
        if (options.replaceRequest === false) {
          replaceRequest = /* @__PURE__ */ __name((request) => request, "replaceRequest");
        } else {
          replaceRequest = options.replaceRequest;
        }
      }
    }
    const getOptions = optionHandler ? (c) => {
      const options2 = optionHandler(c);
      return Array.isArray(options2) ? options2 : [options2];
    } : (c) => {
      let executionContext = void 0;
      try {
        executionContext = c.executionCtx;
      } catch {
      }
      return [c.env, executionContext];
    };
    replaceRequest ||= (() => {
      const mergedPath = mergePath(this._basePath, path);
      const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
      return (request) => {
        const url = new URL(request.url);
        url.pathname = this.getPath(request).slice(pathPrefixLength) || "/";
        return new Request(url, request);
      };
    })();
    const handler = /* @__PURE__ */ __name(async (c, next) => {
      const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
      if (res) {
        return res;
      }
      await next();
    }, "handler");
    this.#addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler);
    return this;
  }
  #addRoute(method, path, handler, baseRoutePath) {
    method = method.toUpperCase();
    path = mergePath(this._basePath, path);
    const r = {
      basePath: baseRoutePath !== void 0 ? mergePath(this._basePath, baseRoutePath) : this._basePath,
      path,
      method,
      handler
    };
    this.router.add(method, path, [handler, r]);
    this.routes.push(r);
  }
  #handleError(err, c) {
    if (err instanceof Error) {
      return this.errorHandler(err, c);
    }
    throw err;
  }
  #dispatch(request, executionCtx, env2, method) {
    if (method === "HEAD") {
      return (async () => new Response(null, await this.#dispatch(request, executionCtx, env2, "GET")))();
    }
    const path = this.getPath(request, { env: env2 });
    const matchResult = this.router.match(method, path);
    const c = new Context(request, {
      path,
      matchResult,
      env: env2,
      executionCtx,
      notFoundHandler: this.#notFoundHandler
    });
    if (matchResult[0].length === 1) {
      let res;
      try {
        res = matchResult[0][0][0][0](c, async () => {
          c.res = await this.#notFoundHandler(c);
        });
      } catch (err) {
        return this.#handleError(err, c);
      }
      return res instanceof Promise ? res.then(
        (resolved) => resolved || (c.finalized ? c.res : this.#notFoundHandler(c))
      ).catch((err) => this.#handleError(err, c)) : res ?? this.#notFoundHandler(c);
    }
    const composed = compose(matchResult[0], this.errorHandler, this.#notFoundHandler);
    return (async () => {
      try {
        const context = await composed(c);
        if (!context.finalized) {
          throw new Error(
            "Context is not finalized. Did you forget to return a Response object or `await next()`?"
          );
        }
        return context.res;
      } catch (err) {
        return this.#handleError(err, c);
      }
    })();
  }
  /**
   * `.fetch()` will be entry point of your app.
   *
   * @see {@link https://hono.dev/docs/api/hono#fetch}
   *
   * @param {Request} request - request Object of request
   * @param {Env} Env - env Object
   * @param {ExecutionContext} - context of execution
   * @returns {Response | Promise<Response>} response of request
   *
   */
  fetch = /* @__PURE__ */ __name((request, ...rest) => {
    return this.#dispatch(request, rest[1], rest[0], request.method);
  }, "fetch");
  /**
   * `.request()` is a useful method for testing.
   * You can pass a URL or pathname to send a GET request.
   * app will return a Response object.
   * ```ts
   * test('GET /hello is ok', async () => {
   *   const res = await app.request('/hello')
   *   expect(res.status).toBe(200)
   * })
   * ```
   * @see https://hono.dev/docs/api/hono#request
   */
  request = /* @__PURE__ */ __name((input, requestInit, Env, executionCtx) => {
    if (input instanceof Request) {
      return this.fetch(requestInit ? new Request(input, requestInit) : input, Env, executionCtx);
    }
    input = input.toString();
    return this.fetch(
      new Request(
        /^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`,
        requestInit
      ),
      Env,
      executionCtx
    );
  }, "request");
  /**
   * `.fire()` automatically adds a global fetch event listener.
   * This can be useful for environments that adhere to the Service Worker API, such as non-ES module Cloudflare Workers.
   * @deprecated
   * Use `fire` from `hono/service-worker` instead.
   * ```ts
   * import { Hono } from 'hono'
   * import { fire } from 'hono/service-worker'
   *
   * const app = new Hono()
   * // ...
   * fire(app)
   * ```
   * @see https://hono.dev/docs/api/hono#fire
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
   * @see https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/
   */
  fire = /* @__PURE__ */ __name(() => {
    addEventListener("fetch", (event) => {
      event.respondWith(this.#dispatch(event.request, event, void 0, event.request.method));
    });
  }, "fire");
};

// ../node_modules/.pnpm/hono@4.12.27/node_modules/hono/dist/router/reg-exp-router/index.js
init_checked_fetch();
init_modules_watch_stub();

// ../node_modules/.pnpm/hono@4.12.27/node_modules/hono/dist/router/reg-exp-router/router.js
init_checked_fetch();
init_modules_watch_stub();

// ../node_modules/.pnpm/hono@4.12.27/node_modules/hono/dist/router/reg-exp-router/matcher.js
init_checked_fetch();
init_modules_watch_stub();
var emptyParam = [];
function match(method, path) {
  const matchers = this.buildAllMatchers();
  const match22 = /* @__PURE__ */ __name(((method2, path2) => {
    const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
    const staticMatch = matcher[2][path2];
    if (staticMatch) {
      return staticMatch;
    }
    const match3 = path2.match(matcher[0]);
    if (!match3) {
      return [[], emptyParam];
    }
    const index = match3.indexOf("", 1);
    return [matcher[1][index], match3];
  }), "match2");
  this.match = match22;
  return match22(method, path);
}
__name(match, "match");

// ../node_modules/.pnpm/hono@4.12.27/node_modules/hono/dist/router/reg-exp-router/node.js
init_checked_fetch();
init_modules_watch_stub();
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = /* @__PURE__ */ Symbol();
var regExpMetaChars = new Set(".\\+*[^]$()");
function compareKey(a, b) {
  if (a.length === 1) {
    return b.length === 1 ? a < b ? -1 : 1 : -1;
  }
  if (b.length === 1) {
    return 1;
  }
  if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
    return 1;
  } else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a.length === b.length ? a < b ? -1 : 1 : b.length - a.length;
}
__name(compareKey, "compareKey");
var Node = class _Node {
  static {
    __name(this, "_Node");
  }
  #index;
  #varIndex;
  #children = /* @__PURE__ */ Object.create(null);
  insert(tokens, index, paramMap, context, pathErrorCheckOnly) {
    if (tokens.length === 0) {
      if (this.#index !== void 0) {
        throw PATH_ERROR;
      }
      if (pathErrorCheckOnly) {
        return;
      }
      this.#index = index;
      return;
    }
    const [token, ...restTokens] = tokens;
    const pattern = token === "*" ? restTokens.length === 0 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let node;
    if (pattern) {
      const name2 = pattern[1];
      let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
      if (name2 && pattern[2]) {
        if (regexpStr === ".*") {
          throw PATH_ERROR;
        }
        regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
        if (/\((?!\?:)/.test(regexpStr)) {
          throw PATH_ERROR;
        }
      }
      node = this.#children[regexpStr];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[regexpStr] = new _Node();
        if (name2 !== "") {
          node.#varIndex = context.varIndex++;
        }
      }
      if (!pathErrorCheckOnly && name2 !== "") {
        paramMap.push([name2, node.#varIndex]);
      }
    } else {
      node = this.#children[token];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[token] = new _Node();
      }
    }
    node.insert(restTokens, index, paramMap, context, pathErrorCheckOnly);
  }
  buildRegExpStr() {
    const childKeys = Object.keys(this.#children).sort(compareKey);
    const strList = childKeys.map((k) => {
      const c = this.#children[k];
      return (typeof c.#varIndex === "number" ? `(${k})@${c.#varIndex}` : regExpMetaChars.has(k) ? `\\${k}` : k) + c.buildRegExpStr();
    });
    if (typeof this.#index === "number") {
      strList.unshift(`#${this.#index}`);
    }
    if (strList.length === 0) {
      return "";
    }
    if (strList.length === 1) {
      return strList[0];
    }
    return "(?:" + strList.join("|") + ")";
  }
};

// ../node_modules/.pnpm/hono@4.12.27/node_modules/hono/dist/router/reg-exp-router/trie.js
init_checked_fetch();
init_modules_watch_stub();
var Trie = class {
  static {
    __name(this, "Trie");
  }
  #context = { varIndex: 0 };
  #root = new Node();
  insert(path, index, pathErrorCheckOnly) {
    const paramAssoc = [];
    const groups = [];
    for (let i = 0; ; ) {
      let replaced = false;
      path = path.replace(/\{[^}]+\}/g, (m) => {
        const mark = `@\\${i}`;
        groups[i] = [mark, m];
        i++;
        replaced = true;
        return mark;
      });
      if (!replaced) {
        break;
      }
    }
    const tokens = path.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = groups.length - 1; i >= 0; i--) {
      const [mark] = groups[i];
      for (let j = tokens.length - 1; j >= 0; j--) {
        if (tokens[j].indexOf(mark) !== -1) {
          tokens[j] = tokens[j].replace(mark, groups[i][1]);
          break;
        }
      }
    }
    this.#root.insert(tokens, index, paramAssoc, this.#context, pathErrorCheckOnly);
    return paramAssoc;
  }
  buildRegExp() {
    let regexp = this.#root.buildRegExpStr();
    if (regexp === "") {
      return [/^$/, [], []];
    }
    let captureIndex = 0;
    const indexReplacementMap = [];
    const paramReplacementMap = [];
    regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_2, handlerIndex, paramIndex) => {
      if (handlerIndex !== void 0) {
        indexReplacementMap[++captureIndex] = Number(handlerIndex);
        return "$()";
      }
      if (paramIndex !== void 0) {
        paramReplacementMap[Number(paramIndex)] = ++captureIndex;
        return "";
      }
      return "";
    });
    return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
  }
};

// ../node_modules/.pnpm/hono@4.12.27/node_modules/hono/dist/router/reg-exp-router/router.js
var nullMatcher = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
function buildWildcardRegExp(path) {
  return wildcardRegExpCache[path] ??= new RegExp(
    path === "*" ? "" : `^${path.replace(
      /\/\*$|([.\\+*[^\]$()])/g,
      (_2, metaChar) => metaChar ? `\\${metaChar}` : "(?:|/.*)"
    )}$`
  );
}
__name(buildWildcardRegExp, "buildWildcardRegExp");
function clearWildcardRegExpCache() {
  wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
}
__name(clearWildcardRegExpCache, "clearWildcardRegExpCache");
function buildMatcherFromPreprocessedRoutes(routes) {
  const trie = new Trie();
  const handlerData = [];
  if (routes.length === 0) {
    return nullMatcher;
  }
  const routesWithStaticPathFlag = routes.map(
    (route) => [!/\*|\/:/.test(route[0]), ...route]
  ).sort(
    ([isStaticA, pathA], [isStaticB, pathB]) => isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length
  );
  const staticMap = /* @__PURE__ */ Object.create(null);
  for (let i = 0, j = -1, len = routesWithStaticPathFlag.length; i < len; i++) {
    const [pathErrorCheckOnly, path, handlers] = routesWithStaticPathFlag[i];
    if (pathErrorCheckOnly) {
      staticMap[path] = [handlers.map(([h]) => [h, /* @__PURE__ */ Object.create(null)]), emptyParam];
    } else {
      j++;
    }
    let paramAssoc;
    try {
      paramAssoc = trie.insert(path, j, pathErrorCheckOnly);
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path) : e;
    }
    if (pathErrorCheckOnly) {
      continue;
    }
    handlerData[j] = handlers.map(([h, paramCount]) => {
      const paramIndexMap = /* @__PURE__ */ Object.create(null);
      paramCount -= 1;
      for (; paramCount >= 0; paramCount--) {
        const [key, value] = paramAssoc[paramCount];
        paramIndexMap[key] = value;
      }
      return [h, paramIndexMap];
    });
  }
  const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
  for (let i = 0, len = handlerData.length; i < len; i++) {
    for (let j = 0, len2 = handlerData[i].length; j < len2; j++) {
      const map = handlerData[i][j]?.[1];
      if (!map) {
        continue;
      }
      const keys = Object.keys(map);
      for (let k = 0, len3 = keys.length; k < len3; k++) {
        map[keys[k]] = paramReplacementMap[map[keys[k]]];
      }
    }
  }
  const handlerMap = [];
  for (const i in indexReplacementMap) {
    handlerMap[i] = handlerData[indexReplacementMap[i]];
  }
  return [regexp, handlerMap, staticMap];
}
__name(buildMatcherFromPreprocessedRoutes, "buildMatcherFromPreprocessedRoutes");
function findMiddleware(middleware, path) {
  if (!middleware) {
    return void 0;
  }
  for (const k of Object.keys(middleware).sort((a, b) => b.length - a.length)) {
    if (buildWildcardRegExp(k).test(path)) {
      return [...middleware[k]];
    }
  }
  return void 0;
}
__name(findMiddleware, "findMiddleware");
var RegExpRouter = class {
  static {
    __name(this, "RegExpRouter");
  }
  name = "RegExpRouter";
  #middleware;
  #routes;
  constructor() {
    this.#middleware = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
    this.#routes = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
  }
  add(method, path, handler) {
    const middleware = this.#middleware;
    const routes = this.#routes;
    if (!middleware || !routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    if (!middleware[method]) {
      ;
      [middleware, routes].forEach((handlerMap) => {
        handlerMap[method] = /* @__PURE__ */ Object.create(null);
        Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p) => {
          handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
        });
      });
    }
    if (path === "/*") {
      path = "*";
    }
    const paramCount = (path.match(/\/:/g) || []).length;
    if (/\*$/.test(path)) {
      const re2 = buildWildcardRegExp(path);
      if (method === METHOD_NAME_ALL) {
        Object.keys(middleware).forEach((m) => {
          middleware[m][path] ||= findMiddleware(middleware[m], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
        });
      } else {
        middleware[method][path] ||= findMiddleware(middleware[method], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
      }
      Object.keys(middleware).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(middleware[m]).forEach((p) => {
            re2.test(p) && middleware[m][p].push([handler, paramCount]);
          });
        }
      });
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(routes[m]).forEach(
            (p) => re2.test(p) && routes[m][p].push([handler, paramCount])
          );
        }
      });
      return;
    }
    const paths = checkOptionalParameter(path) || [path];
    for (let i = 0, len = paths.length; i < len; i++) {
      const path2 = paths[i];
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          routes[m][path2] ||= [
            ...findMiddleware(middleware[m], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || []
          ];
          routes[m][path2].push([handler, paramCount - len + i + 1]);
        }
      });
    }
  }
  match = match;
  buildAllMatchers() {
    const matchers = /* @__PURE__ */ Object.create(null);
    Object.keys(this.#routes).concat(Object.keys(this.#middleware)).forEach((method) => {
      matchers[method] ||= this.#buildMatcher(method);
    });
    this.#middleware = this.#routes = void 0;
    clearWildcardRegExpCache();
    return matchers;
  }
  #buildMatcher(method) {
    const routes = [];
    let hasOwnRoute = method === METHOD_NAME_ALL;
    [this.#middleware, this.#routes].forEach((r) => {
      const ownRoute = r[method] ? Object.keys(r[method]).map((path) => [path, r[method][path]]) : [];
      if (ownRoute.length !== 0) {
        hasOwnRoute ||= true;
        routes.push(...ownRoute);
      } else if (method !== METHOD_NAME_ALL) {
        routes.push(
          ...Object.keys(r[METHOD_NAME_ALL]).map((path) => [path, r[METHOD_NAME_ALL][path]])
        );
      }
    });
    if (!hasOwnRoute) {
      return null;
    } else {
      return buildMatcherFromPreprocessedRoutes(routes);
    }
  }
};

// ../node_modules/.pnpm/hono@4.12.27/node_modules/hono/dist/router/reg-exp-router/prepared-router.js
init_checked_fetch();
init_modules_watch_stub();

// ../node_modules/.pnpm/hono@4.12.27/node_modules/hono/dist/router/smart-router/index.js
init_checked_fetch();
init_modules_watch_stub();

// ../node_modules/.pnpm/hono@4.12.27/node_modules/hono/dist/router/smart-router/router.js
init_checked_fetch();
init_modules_watch_stub();
var SmartRouter = class {
  static {
    __name(this, "SmartRouter");
  }
  name = "SmartRouter";
  #routers = [];
  #routes = [];
  constructor(init2) {
    this.#routers = init2.routers;
  }
  add(method, path, handler) {
    if (!this.#routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    this.#routes.push([method, path, handler]);
  }
  match(method, path) {
    if (!this.#routes) {
      throw new Error("Fatal error");
    }
    const routers = this.#routers;
    const routes = this.#routes;
    const len = routers.length;
    let i = 0;
    let res;
    for (; i < len; i++) {
      const router = routers[i];
      try {
        for (let i2 = 0, len2 = routes.length; i2 < len2; i2++) {
          router.add(...routes[i2]);
        }
        res = router.match(method, path);
      } catch (e) {
        if (e instanceof UnsupportedPathError) {
          continue;
        }
        throw e;
      }
      this.match = router.match.bind(router);
      this.#routers = [router];
      this.#routes = void 0;
      break;
    }
    if (i === len) {
      throw new Error("Fatal error");
    }
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res;
  }
  get activeRouter() {
    if (this.#routes || this.#routers.length !== 1) {
      throw new Error("No active router has been determined yet.");
    }
    return this.#routers[0];
  }
};

// ../node_modules/.pnpm/hono@4.12.27/node_modules/hono/dist/router/trie-router/index.js
init_checked_fetch();
init_modules_watch_stub();

// ../node_modules/.pnpm/hono@4.12.27/node_modules/hono/dist/router/trie-router/router.js
init_checked_fetch();
init_modules_watch_stub();

// ../node_modules/.pnpm/hono@4.12.27/node_modules/hono/dist/router/trie-router/node.js
init_checked_fetch();
init_modules_watch_stub();
var emptyParams = /* @__PURE__ */ Object.create(null);
var hasChildren = /* @__PURE__ */ __name((children) => {
  for (const _2 in children) {
    return true;
  }
  return false;
}, "hasChildren");
var Node2 = class _Node2 {
  static {
    __name(this, "_Node");
  }
  #methods;
  #children;
  #patterns;
  #order = 0;
  #params = emptyParams;
  constructor(method, handler, children) {
    this.#children = children || /* @__PURE__ */ Object.create(null);
    this.#methods = [];
    if (method && handler) {
      const m = /* @__PURE__ */ Object.create(null);
      m[method] = { handler, possibleKeys: [], score: 0 };
      this.#methods = [m];
    }
    this.#patterns = [];
  }
  insert(method, path, handler) {
    this.#order = ++this.#order;
    let curNode = this;
    const parts = splitRoutingPath(path);
    const possibleKeys = [];
    for (let i = 0, len = parts.length; i < len; i++) {
      const p = parts[i];
      const nextP = parts[i + 1];
      const pattern = getPattern(p, nextP);
      const key = Array.isArray(pattern) ? pattern[0] : p;
      if (key in curNode.#children) {
        curNode = curNode.#children[key];
        if (pattern) {
          possibleKeys.push(pattern[1]);
        }
        continue;
      }
      curNode.#children[key] = new _Node2();
      if (pattern) {
        curNode.#patterns.push(pattern);
        possibleKeys.push(pattern[1]);
      }
      curNode = curNode.#children[key];
    }
    curNode.#methods.push({
      [method]: {
        handler,
        possibleKeys: possibleKeys.filter((v, i, a) => a.indexOf(v) === i),
        score: this.#order
      }
    });
    return curNode;
  }
  #pushHandlerSets(handlerSets, node, method, nodeParams, params) {
    for (let i = 0, len = node.#methods.length; i < len; i++) {
      const m = node.#methods[i];
      const handlerSet = m[method] || m[METHOD_NAME_ALL];
      const processedSet = {};
      if (handlerSet !== void 0) {
        handlerSet.params = /* @__PURE__ */ Object.create(null);
        handlerSets.push(handlerSet);
        if (nodeParams !== emptyParams || params && params !== emptyParams) {
          for (let i2 = 0, len2 = handlerSet.possibleKeys.length; i2 < len2; i2++) {
            const key = handlerSet.possibleKeys[i2];
            const processed = processedSet[handlerSet.score];
            handlerSet.params[key] = params?.[key] && !processed ? params[key] : nodeParams[key] ?? params?.[key];
            processedSet[handlerSet.score] = true;
          }
        }
      }
    }
  }
  search(method, path) {
    const handlerSets = [];
    this.#params = emptyParams;
    const curNode = this;
    let curNodes = [curNode];
    const parts = splitPath(path);
    const curNodesQueue = [];
    const len = parts.length;
    let partOffsets = null;
    for (let i = 0; i < len; i++) {
      const part = parts[i];
      const isLast = i === len - 1;
      const tempNodes = [];
      for (let j = 0, len2 = curNodes.length; j < len2; j++) {
        const node = curNodes[j];
        const nextNode = node.#children[part];
        if (nextNode) {
          nextNode.#params = node.#params;
          if (isLast) {
            if (nextNode.#children["*"]) {
              this.#pushHandlerSets(handlerSets, nextNode.#children["*"], method, node.#params);
            }
            this.#pushHandlerSets(handlerSets, nextNode, method, node.#params);
          } else {
            tempNodes.push(nextNode);
          }
        }
        for (let k = 0, len3 = node.#patterns.length; k < len3; k++) {
          const pattern = node.#patterns[k];
          const params = node.#params === emptyParams ? {} : { ...node.#params };
          if (pattern === "*") {
            const astNode = node.#children["*"];
            if (astNode) {
              this.#pushHandlerSets(handlerSets, astNode, method, node.#params);
              astNode.#params = params;
              tempNodes.push(astNode);
            }
            continue;
          }
          const [key, name2, matcher] = pattern;
          if (!part && !(matcher instanceof RegExp)) {
            continue;
          }
          const child = node.#children[key];
          if (matcher instanceof RegExp) {
            if (partOffsets === null) {
              partOffsets = new Array(len);
              let offset = path[0] === "/" ? 1 : 0;
              for (let p = 0; p < len; p++) {
                partOffsets[p] = offset;
                offset += parts[p].length + 1;
              }
            }
            const restPathString = path.substring(partOffsets[i]);
            const m = matcher.exec(restPathString);
            if (m) {
              params[name2] = m[0];
              this.#pushHandlerSets(handlerSets, child, method, node.#params, params);
              if (hasChildren(child.#children)) {
                child.#params = params;
                const componentCount = m[0].match(/\//)?.length ?? 0;
                const targetCurNodes = curNodesQueue[componentCount] ||= [];
                targetCurNodes.push(child);
              }
              continue;
            }
          }
          if (matcher === true || matcher.test(part)) {
            params[name2] = part;
            if (isLast) {
              this.#pushHandlerSets(handlerSets, child, method, params, node.#params);
              if (child.#children["*"]) {
                this.#pushHandlerSets(
                  handlerSets,
                  child.#children["*"],
                  method,
                  params,
                  node.#params
                );
              }
            } else {
              child.#params = params;
              tempNodes.push(child);
            }
          }
        }
      }
      const shifted = curNodesQueue.shift();
      curNodes = shifted ? tempNodes.concat(shifted) : tempNodes;
    }
    if (handlerSets.length > 1) {
      handlerSets.sort((a, b) => {
        return a.score - b.score;
      });
    }
    return [handlerSets.map(({ handler, params }) => [handler, params])];
  }
};

// ../node_modules/.pnpm/hono@4.12.27/node_modules/hono/dist/router/trie-router/router.js
var TrieRouter = class {
  static {
    __name(this, "TrieRouter");
  }
  name = "TrieRouter";
  #node;
  constructor() {
    this.#node = new Node2();
  }
  add(method, path, handler) {
    const results = checkOptionalParameter(path);
    if (results) {
      for (let i = 0, len = results.length; i < len; i++) {
        this.#node.insert(method, results[i], handler);
      }
      return;
    }
    this.#node.insert(method, path, handler);
  }
  match(method, path) {
    return this.#node.search(method, path);
  }
};

// ../node_modules/.pnpm/hono@4.12.27/node_modules/hono/dist/hono.js
var Hono2 = class extends Hono {
  static {
    __name(this, "Hono");
  }
  /**
   * Creates an instance of the Hono class.
   *
   * @param options - Optional configuration options for the Hono instance.
   */
  constructor(options = {}) {
    super(options);
    this.router = options.router ?? new SmartRouter({
      routers: [new RegExpRouter(), new TrieRouter()]
    });
  }
};

// ../node_modules/.pnpm/@hono+clerk-auth@3.1.1_hono_90411af05946f3763f2d8d9eb5624f70/node_modules/@hono/clerk-auth/dist/index.js
init_checked_fetch();
init_modules_watch_stub();

// ../node_modules/.pnpm/@clerk+backend@2.33.5_react_830d22ab28c28b4fa4a78ec6de1291b4/node_modules/@clerk/backend/dist/index.mjs
init_checked_fetch();
init_modules_watch_stub();

// ../node_modules/.pnpm/@clerk+backend@2.33.5_react_830d22ab28c28b4fa4a78ec6de1291b4/node_modules/@clerk/backend/dist/chunk-UOT6YP2O.mjs
init_checked_fetch();
init_modules_watch_stub();

// ../node_modules/.pnpm/@clerk+backend@2.33.5_react_830d22ab28c28b4fa4a78ec6de1291b4/node_modules/@clerk/backend/dist/chunk-YBVFDYDR.mjs
init_checked_fetch();
init_modules_watch_stub();

// ../node_modules/.pnpm/@clerk+shared@3.47.7_react-_361d9ae56ed1f0380cf01c93b510a0f3/node_modules/@clerk/shared/dist/runtime/deprecated.mjs
init_checked_fetch();
init_modules_watch_stub();

// ../node_modules/.pnpm/@clerk+shared@3.47.7_react-_361d9ae56ed1f0380cf01c93b510a0f3/node_modules/@clerk/shared/dist/runtime/runtimeEnvironment-BB2sO-19.mjs
init_checked_fetch();
init_modules_watch_stub();
var isTestEnvironment = /* @__PURE__ */ __name(() => {
  try {
    return false;
  } catch {
  }
  return false;
}, "isTestEnvironment");
var isProductionEnvironment = /* @__PURE__ */ __name(() => {
  try {
    return false;
  } catch {
  }
  return false;
}, "isProductionEnvironment");

// ../node_modules/.pnpm/@clerk+shared@3.47.7_react-_361d9ae56ed1f0380cf01c93b510a0f3/node_modules/@clerk/shared/dist/runtime/deprecated-BqlFbLHj.mjs
init_checked_fetch();
init_modules_watch_stub();
var displayedWarnings = /* @__PURE__ */ new Set();
var deprecated = /* @__PURE__ */ __name((fnName, warning, key) => {
  const hideWarning = isTestEnvironment() || isProductionEnvironment();
  const messageId = key ?? fnName;
  if (displayedWarnings.has(messageId) || hideWarning) return;
  displayedWarnings.add(messageId);
  console.warn(`Clerk - DEPRECATION WARNING: "${fnName}" is deprecated and will be removed in the next major release.
${warning}`);
}, "deprecated");

// ../node_modules/.pnpm/@clerk+shared@3.47.7_react-_361d9ae56ed1f0380cf01c93b510a0f3/node_modules/@clerk/shared/dist/runtime/keys.mjs
init_checked_fetch();
init_modules_watch_stub();

// ../node_modules/.pnpm/@clerk+shared@3.47.7_react-_361d9ae56ed1f0380cf01c93b510a0f3/node_modules/@clerk/shared/dist/runtime/constants-ByUssRbE.mjs
init_checked_fetch();
init_modules_watch_stub();
var LEGACY_DEV_INSTANCE_SUFFIXES = [
  ".lcl.dev",
  ".lclstage.dev",
  ".lclclerk.com"
];
var CURRENT_DEV_INSTANCE_SUFFIXES = [
  ".accounts.dev",
  ".accountsstage.dev",
  ".accounts.lclclerk.com"
];
var DEV_OR_STAGING_SUFFIXES = [
  ".lcl.dev",
  ".stg.dev",
  ".lclstage.dev",
  ".stgstage.dev",
  ".dev.lclclerk.com",
  ".stg.lclclerk.com",
  ".accounts.lclclerk.com",
  "accountsstage.dev",
  "accounts.dev"
];

// ../node_modules/.pnpm/@clerk+shared@3.47.7_react-_361d9ae56ed1f0380cf01c93b510a0f3/node_modules/@clerk/shared/dist/runtime/isomorphicAtob-DybBXGFR.mjs
init_checked_fetch();
init_modules_watch_stub();
var isomorphicAtob = /* @__PURE__ */ __name((data) => {
  if (typeof atob !== "undefined" && typeof atob === "function") return atob(data);
  else if (typeof global !== "undefined" && global.Buffer) return new global.Buffer(data, "base64").toString();
  return data;
}, "isomorphicAtob");

// ../node_modules/.pnpm/@clerk+shared@3.47.7_react-_361d9ae56ed1f0380cf01c93b510a0f3/node_modules/@clerk/shared/dist/runtime/isomorphicBtoa-Dr7WubZv.mjs
init_checked_fetch();
init_modules_watch_stub();
var isomorphicBtoa = /* @__PURE__ */ __name((data) => {
  if (typeof btoa !== "undefined" && typeof btoa === "function") return btoa(data);
  else if (typeof global !== "undefined" && global.Buffer) return new global.Buffer(data).toString("base64");
  return data;
}, "isomorphicBtoa");

// ../node_modules/.pnpm/@clerk+shared@3.47.7_react-_361d9ae56ed1f0380cf01c93b510a0f3/node_modules/@clerk/shared/dist/runtime/keys-YNv6yjKk.mjs
init_checked_fetch();
init_modules_watch_stub();
var PUBLISHABLE_KEY_LIVE_PREFIX = "pk_live_";
var PUBLISHABLE_KEY_TEST_PREFIX = "pk_test_";
function isValidDecodedPublishableKey(decoded) {
  if (!decoded.endsWith("$")) return false;
  const withoutTrailing = decoded.slice(0, -1);
  if (withoutTrailing.includes("$")) return false;
  return withoutTrailing.includes(".");
}
__name(isValidDecodedPublishableKey, "isValidDecodedPublishableKey");
function parsePublishableKey(key, options = {}) {
  key = key || "";
  if (!key || !isPublishableKey(key)) {
    if (options.fatal && !key) throw new Error("Publishable key is missing. Ensure that your publishable key is correctly configured. Double-check your environment configuration for your keys, or access them here: https://dashboard.clerk.com/last-active?path=api-keys");
    if (options.fatal && !isPublishableKey(key)) throw new Error("Publishable key not valid.");
    return null;
  }
  const instanceType = key.startsWith(PUBLISHABLE_KEY_LIVE_PREFIX) ? "production" : "development";
  let decodedFrontendApi;
  try {
    decodedFrontendApi = isomorphicAtob(key.split("_")[2]);
  } catch {
    if (options.fatal) throw new Error("Publishable key not valid: Failed to decode key.");
    return null;
  }
  if (!isValidDecodedPublishableKey(decodedFrontendApi)) {
    if (options.fatal) throw new Error("Publishable key not valid: Decoded key has invalid format.");
    return null;
  }
  let frontendApi = decodedFrontendApi.slice(0, -1);
  if (options.proxyUrl) frontendApi = options.proxyUrl;
  else if (instanceType !== "development" && options.domain && options.isSatellite) frontendApi = `clerk.${options.domain}`;
  return {
    instanceType,
    frontendApi
  };
}
__name(parsePublishableKey, "parsePublishableKey");
function isPublishableKey(key = "") {
  try {
    if (!(key.startsWith(PUBLISHABLE_KEY_LIVE_PREFIX) || key.startsWith(PUBLISHABLE_KEY_TEST_PREFIX))) return false;
    const parts = key.split("_");
    if (parts.length !== 3) return false;
    const encodedPart = parts[2];
    if (!encodedPart) return false;
    return isValidDecodedPublishableKey(isomorphicAtob(encodedPart));
  } catch {
    return false;
  }
}
__name(isPublishableKey, "isPublishableKey");
function createDevOrStagingUrlCache() {
  const devOrStagingUrlCache = /* @__PURE__ */ new Map();
  return { isDevOrStagingUrl: /* @__PURE__ */ __name((url) => {
    if (!url) return false;
    const hostname = typeof url === "string" ? url : url.hostname;
    let res = devOrStagingUrlCache.get(hostname);
    if (res === void 0) {
      res = DEV_OR_STAGING_SUFFIXES.some((s2) => hostname.endsWith(s2));
      devOrStagingUrlCache.set(hostname, res);
    }
    return res;
  }, "isDevOrStagingUrl") };
}
__name(createDevOrStagingUrlCache, "createDevOrStagingUrlCache");
function isDevelopmentFromSecretKey(apiKey) {
  return apiKey.startsWith("test_") || apiKey.startsWith("sk_test_");
}
__name(isDevelopmentFromSecretKey, "isDevelopmentFromSecretKey");
async function getCookieSuffix(publishableKey, subtle = globalThis.crypto.subtle) {
  const data = new TextEncoder().encode(publishableKey);
  const digest = await subtle.digest("sha-1", data);
  return isomorphicBtoa(String.fromCharCode(...new Uint8Array(digest))).replace(/\+/gi, "-").replace(/\//gi, "_").substring(0, 8);
}
__name(getCookieSuffix, "getCookieSuffix");
var getSuffixedCookieName = /* @__PURE__ */ __name((cookieName, cookieSuffix) => {
  return `${cookieName}_${cookieSuffix}`;
}, "getSuffixedCookieName");

// ../node_modules/.pnpm/@clerk+shared@3.47.7_react-_361d9ae56ed1f0380cf01c93b510a0f3/node_modules/@clerk/shared/dist/runtime/retry.mjs
init_checked_fetch();
init_modules_watch_stub();

// ../node_modules/.pnpm/@clerk+shared@3.47.7_react-_361d9ae56ed1f0380cf01c93b510a0f3/node_modules/@clerk/shared/dist/runtime/retry-DAlTROH9.mjs
init_checked_fetch();
init_modules_watch_stub();
var defaultOptions = {
  initialDelay: 125,
  maxDelayBetweenRetries: 0,
  factor: 2,
  shouldRetry: /* @__PURE__ */ __name((_2, iteration) => iteration < 5, "shouldRetry"),
  retryImmediately: false,
  jitter: true
};
var RETRY_IMMEDIATELY_DELAY = 100;
var sleep = /* @__PURE__ */ __name(async (ms) => new Promise((s2) => setTimeout(s2, ms)), "sleep");
var applyJitter = /* @__PURE__ */ __name((delay, jitter) => {
  return jitter ? delay * (1 + Math.random()) : delay;
}, "applyJitter");
var createExponentialDelayAsyncFn = /* @__PURE__ */ __name((opts) => {
  let timesCalled = 0;
  const calculateDelayInMs = /* @__PURE__ */ __name(() => {
    const constant = opts.initialDelay;
    const base = opts.factor;
    let delay = constant * Math.pow(base, timesCalled);
    delay = applyJitter(delay, opts.jitter);
    return Math.min(opts.maxDelayBetweenRetries || delay, delay);
  }, "calculateDelayInMs");
  return async () => {
    await sleep(calculateDelayInMs());
    timesCalled++;
  };
}, "createExponentialDelayAsyncFn");
var retry = /* @__PURE__ */ __name(async (callback, options = {}) => {
  let iterations = 0;
  const { shouldRetry, initialDelay, maxDelayBetweenRetries, factor, retryImmediately, jitter, onBeforeRetry } = {
    ...defaultOptions,
    ...options
  };
  const delay = createExponentialDelayAsyncFn({
    initialDelay,
    maxDelayBetweenRetries,
    factor,
    jitter
  });
  while (true) try {
    return await callback();
  } catch (e) {
    iterations++;
    if (!shouldRetry(e, iterations)) throw e;
    if (onBeforeRetry) await onBeforeRetry(iterations);
    if (retryImmediately && iterations === 1) await sleep(applyJitter(RETRY_IMMEDIATELY_DELAY, jitter));
    else await delay();
  }
}, "retry");

// ../node_modules/.pnpm/@clerk+shared@3.47.7_react-_361d9ae56ed1f0380cf01c93b510a0f3/node_modules/@clerk/shared/dist/runtime/url.mjs
init_checked_fetch();
init_modules_watch_stub();

// ../node_modules/.pnpm/@clerk+shared@3.47.7_react-_361d9ae56ed1f0380cf01c93b510a0f3/node_modules/@clerk/shared/dist/runtime/instance-Cze6Nv61.mjs
init_checked_fetch();
init_modules_watch_stub();

// ../node_modules/.pnpm/@clerk+shared@3.47.7_react-_361d9ae56ed1f0380cf01c93b510a0f3/node_modules/@clerk/shared/dist/runtime/url-Cdy8w8vK.mjs
init_checked_fetch();
init_modules_watch_stub();
function isLegacyDevAccountPortalOrigin(host) {
  return LEGACY_DEV_INSTANCE_SUFFIXES.some((legacyDevSuffix) => {
    return host.startsWith("accounts.") && host.endsWith(legacyDevSuffix);
  });
}
__name(isLegacyDevAccountPortalOrigin, "isLegacyDevAccountPortalOrigin");
function isCurrentDevAccountPortalOrigin(host) {
  return CURRENT_DEV_INSTANCE_SUFFIXES.some((currentDevSuffix) => {
    return host.endsWith(currentDevSuffix) && !host.endsWith(".clerk" + currentDevSuffix);
  });
}
__name(isCurrentDevAccountPortalOrigin, "isCurrentDevAccountPortalOrigin");

// ../node_modules/.pnpm/@clerk+shared@3.47.7_react-_361d9ae56ed1f0380cf01c93b510a0f3/node_modules/@clerk/shared/dist/runtime/error.mjs
init_checked_fetch();
init_modules_watch_stub();

// ../node_modules/.pnpm/@clerk+shared@3.47.7_react-_361d9ae56ed1f0380cf01c93b510a0f3/node_modules/@clerk/shared/dist/runtime/error-Dl9xmUf3.mjs
init_checked_fetch();
init_modules_watch_stub();
function createErrorTypeGuard(ErrorClass) {
  function typeGuard(error) {
    const target = error ?? this;
    if (!target) throw new TypeError(`${ErrorClass.kind || ErrorClass.name} type guard requires an error object`);
    if (ErrorClass.kind && typeof target === "object" && target !== null && "constructor" in target) {
      if (target.constructor?.kind === ErrorClass.kind) return true;
    }
    return target instanceof ErrorClass;
  }
  __name(typeGuard, "typeGuard");
  return typeGuard;
}
__name(createErrorTypeGuard, "createErrorTypeGuard");
var ClerkAPIError = class {
  static {
    __name(this, "ClerkAPIError");
  }
  static kind = "ClerkApiError";
  code;
  message;
  longMessage;
  meta;
  constructor(json) {
    const parsedError = {
      code: json.code,
      message: json.message,
      longMessage: json.long_message,
      meta: {
        paramName: json.meta?.param_name,
        sessionId: json.meta?.session_id,
        emailAddresses: json.meta?.email_addresses,
        identifiers: json.meta?.identifiers,
        zxcvbn: json.meta?.zxcvbn,
        plan: json.meta?.plan,
        isPlanUpgradePossible: json.meta?.is_plan_upgrade_possible
      }
    };
    this.code = parsedError.code;
    this.message = parsedError.message;
    this.longMessage = parsedError.longMessage;
    this.meta = parsedError.meta;
  }
};
var isClerkAPIError = createErrorTypeGuard(ClerkAPIError);
function parseError(error) {
  return new ClerkAPIError(error);
}
__name(parseError, "parseError");
var ClerkError = class ClerkError2 extends Error {
  static {
    __name(this, "ClerkError");
  }
  static kind = "ClerkError";
  clerkError = true;
  code;
  longMessage;
  docsUrl;
  cause;
  get name() {
    return this.constructor.name;
  }
  constructor(opts) {
    super(new.target.formatMessage(new.target.kind, opts.message, opts.code, opts.docsUrl), { cause: opts.cause });
    Object.setPrototypeOf(this, ClerkError2.prototype);
    this.code = opts.code;
    this.docsUrl = opts.docsUrl;
    this.longMessage = opts.longMessage;
    this.cause = opts.cause;
  }
  toString() {
    return `[${this.name}]
Message:${this.message}`;
  }
  static formatMessage(name2, msg, code, docsUrl) {
    const prefix = "Clerk:";
    const regex = new RegExp(prefix.replace(" ", "\\s*"), "i");
    msg = msg.replace(regex, "");
    msg = `${prefix} ${msg.trim()}

(code="${code}")

`;
    if (docsUrl) msg += `

Docs: ${docsUrl}`;
    return msg;
  }
};
var ClerkAPIResponseError = class ClerkAPIResponseError2 extends ClerkError {
  static {
    __name(this, "ClerkAPIResponseError");
  }
  static kind = "ClerkAPIResponseError";
  status;
  clerkTraceId;
  retryAfter;
  errors;
  constructor(message, options) {
    const { data: errorsJson, status, clerkTraceId, retryAfter } = options;
    super({
      ...options,
      message,
      code: "api_response_error"
    });
    Object.setPrototypeOf(this, ClerkAPIResponseError2.prototype);
    this.status = status;
    this.clerkTraceId = clerkTraceId;
    this.retryAfter = retryAfter;
    this.errors = (errorsJson || []).map((e) => new ClerkAPIError(e));
  }
  toString() {
    let message = `[${this.name}]
Message:${this.message}
Status:${this.status}
Serialized errors: ${this.errors.map((e) => JSON.stringify(e))}`;
    if (this.clerkTraceId) message += `
Clerk Trace ID: ${this.clerkTraceId}`;
    return message;
  }
  static formatMessage(name2, msg, _2, __) {
    return msg;
  }
};
var isClerkAPIResponseError = createErrorTypeGuard(ClerkAPIResponseError);
var DefaultMessages = Object.freeze({
  InvalidProxyUrlErrorMessage: `The proxyUrl passed to Clerk is invalid. The expected value for proxyUrl is an absolute URL or a relative path with a leading '/'. (key={{url}})`,
  InvalidPublishableKeyErrorMessage: `The publishableKey passed to Clerk is invalid. You can get your Publishable key at https://dashboard.clerk.com/last-active?path=api-keys. (key={{key}})`,
  MissingPublishableKeyErrorMessage: `Missing publishableKey. You can get your key at https://dashboard.clerk.com/last-active?path=api-keys.`,
  MissingSecretKeyErrorMessage: `Missing secretKey. You can get your key at https://dashboard.clerk.com/last-active?path=api-keys.`,
  MissingClerkProvider: `{{source}} can only be used within the <ClerkProvider /> component. Learn more: https://clerk.com/docs/components/clerk-provider`
});
function buildErrorThrower({ packageName, customMessages }) {
  let pkg = packageName;
  function buildMessage(rawMessage, replacements) {
    if (!replacements) return `${pkg}: ${rawMessage}`;
    let msg = rawMessage;
    const matches2 = rawMessage.matchAll(/{{([a-zA-Z0-9-_]+)}}/g);
    for (const match3 of matches2) {
      const replacement2 = (replacements[match3[1]] || "").toString();
      msg = msg.replace(`{{${match3[1]}}}`, replacement2);
    }
    return `${pkg}: ${msg}`;
  }
  __name(buildMessage, "buildMessage");
  const messages = {
    ...DefaultMessages,
    ...customMessages
  };
  return {
    setPackageName({ packageName: packageName$1 }) {
      if (typeof packageName$1 === "string") pkg = packageName$1;
      return this;
    },
    setMessages({ customMessages: customMessages$1 }) {
      Object.assign(messages, customMessages$1 || {});
      return this;
    },
    throwInvalidPublishableKeyError(params) {
      throw new Error(buildMessage(messages.InvalidPublishableKeyErrorMessage, params));
    },
    throwInvalidProxyUrl(params) {
      throw new Error(buildMessage(messages.InvalidProxyUrlErrorMessage, params));
    },
    throwMissingPublishableKeyError() {
      throw new Error(buildMessage(messages.MissingPublishableKeyErrorMessage));
    },
    throwMissingSecretKeyError() {
      throw new Error(buildMessage(messages.MissingSecretKeyErrorMessage));
    },
    throwMissingClerkProviderError(params) {
      throw new Error(buildMessage(messages.MissingClerkProvider, params));
    },
    throw(message) {
      throw new Error(buildMessage(message));
    }
  };
}
__name(buildErrorThrower, "buildErrorThrower");
var ClerkRuntimeError = class ClerkRuntimeError2 extends ClerkError {
  static {
    __name(this, "ClerkRuntimeError");
  }
  static kind = "ClerkRuntimeError";
  /**
  * @deprecated Use `clerkError` property instead. This property is maintained for backward compatibility.
  */
  clerkRuntimeError = true;
  constructor(message, options) {
    super({
      ...options,
      message
    });
    Object.setPrototypeOf(this, ClerkRuntimeError2.prototype);
  }
};
var isClerkRuntimeError = createErrorTypeGuard(ClerkRuntimeError);

// ../node_modules/.pnpm/@clerk+backend@2.33.5_react_830d22ab28c28b4fa4a78ec6de1291b4/node_modules/@clerk/backend/dist/chunk-YBVFDYDR.mjs
var errorThrower = buildErrorThrower({ packageName: "@clerk/backend" });
var { isDevOrStagingUrl } = createDevOrStagingUrlCache();

// ../node_modules/.pnpm/@clerk+backend@2.33.5_react_830d22ab28c28b4fa4a78ec6de1291b4/node_modules/@clerk/backend/dist/chunk-KDNHJOF3.mjs
init_checked_fetch();
init_modules_watch_stub();

// ../node_modules/.pnpm/@clerk+backend@2.33.5_react_830d22ab28c28b4fa4a78ec6de1291b4/node_modules/@clerk/backend/dist/chunk-I4B6KCGC.mjs
init_checked_fetch();
init_modules_watch_stub();
var TokenVerificationErrorCode = {
  InvalidSecretKey: "clerk_key_invalid"
};
var TokenVerificationErrorReason = {
  TokenExpired: "token-expired",
  TokenInvalid: "token-invalid",
  TokenInvalidAlgorithm: "token-invalid-algorithm",
  TokenInvalidAuthorizedParties: "token-invalid-authorized-parties",
  TokenInvalidSignature: "token-invalid-signature",
  TokenNotActiveYet: "token-not-active-yet",
  TokenIatInTheFuture: "token-iat-in-the-future",
  TokenVerificationFailed: "token-verification-failed",
  InvalidSecretKey: "secret-key-invalid",
  LocalJWKMissing: "jwk-local-missing",
  RemoteJWKFailedToLoad: "jwk-remote-failed-to-load",
  RemoteJWKInvalid: "jwk-remote-invalid",
  RemoteJWKMissing: "jwk-remote-missing",
  JWKFailedToResolve: "jwk-failed-to-resolve",
  JWKKidMismatch: "jwk-kid-mismatch"
};
var TokenVerificationErrorAction = {
  ContactSupport: "Contact support@clerk.com",
  EnsureClerkJWT: "Make sure that this is a valid Clerk-generated JWT.",
  SetClerkJWTKey: "Set the CLERK_JWT_KEY environment variable.",
  SetClerkSecretKey: "Set the CLERK_SECRET_KEY environment variable.",
  EnsureClockSync: "Make sure your system clock is in sync (e.g. turn off and on automatic time synchronization)."
};
var TokenVerificationError = class _TokenVerificationError extends Error {
  static {
    __name(this, "_TokenVerificationError");
  }
  constructor({
    action,
    message,
    reason
  }) {
    super(message);
    Object.setPrototypeOf(this, _TokenVerificationError.prototype);
    this.reason = reason;
    this.message = message;
    this.action = action;
  }
  getFullMessage() {
    return `${[this.message, this.action].filter((m) => m).join(" ")} (reason=${this.reason}, token-carrier=${this.tokenCarrier})`;
  }
};
var MachineTokenVerificationErrorCode = {
  TokenInvalid: "token-invalid",
  InvalidSecretKey: "secret-key-invalid",
  UnexpectedError: "unexpected-error",
  TokenVerificationFailed: "token-verification-failed"
};
var _MachineTokenVerificationError = class _MachineTokenVerificationError2 extends ClerkError {
  static {
    __name(this, "_MachineTokenVerificationError");
  }
  constructor({
    message,
    code,
    status,
    action
  }) {
    super({ message, code });
    Object.setPrototypeOf(this, _MachineTokenVerificationError2.prototype);
    this.status = status;
    this.action = action;
  }
  // Keep message unformatted, matching ClerkAPIResponseError's approach
  static formatMessage(_name, msg, _code, _docsUrl) {
    return msg;
  }
  getFullMessage() {
    return `${this.message} (code=${this.code}, status=${this.status || "n/a"})`;
  }
};
_MachineTokenVerificationError.kind = "MachineTokenVerificationError";
var MachineTokenVerificationError = _MachineTokenVerificationError;

// ../node_modules/.pnpm/@clerk+backend@2.33.5_react_830d22ab28c28b4fa4a78ec6de1291b4/node_modules/@clerk/backend/dist/runtime/browser/crypto.mjs
init_checked_fetch();
init_modules_watch_stub();
var webcrypto = crypto;

// ../node_modules/.pnpm/@clerk+shared@3.47.7_react-_361d9ae56ed1f0380cf01c93b510a0f3/node_modules/@clerk/shared/dist/runtime/isomorphicAtob.mjs
init_checked_fetch();
init_modules_watch_stub();

// ../node_modules/.pnpm/@clerk+backend@2.33.5_react_830d22ab28c28b4fa4a78ec6de1291b4/node_modules/@clerk/backend/dist/chunk-KDNHJOF3.mjs
var globalFetch = fetch.bind(globalThis);
var runtime = {
  crypto: webcrypto,
  get fetch() {
    return false ? fetch : globalFetch;
  },
  AbortController: globalThis.AbortController,
  Blob: globalThis.Blob,
  FormData: globalThis.FormData,
  Headers: globalThis.Headers,
  Request: globalThis.Request,
  Response: globalThis.Response
};
var base64url = {
  parse(string, opts) {
    return parse(string, base64UrlEncoding, opts);
  },
  stringify(data, opts) {
    return stringify(data, base64UrlEncoding, opts);
  }
};
var base64UrlEncoding = {
  chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bits: 6
};
function parse(string, encoding, opts = {}) {
  if (!encoding.codes) {
    encoding.codes = {};
    for (let i = 0; i < encoding.chars.length; ++i) {
      encoding.codes[encoding.chars[i]] = i;
    }
  }
  if (!opts.loose && string.length * encoding.bits & 7) {
    throw new SyntaxError("Invalid padding");
  }
  let end = string.length;
  while (string[end - 1] === "=") {
    --end;
    if (!opts.loose && !((string.length - end) * encoding.bits & 7)) {
      throw new SyntaxError("Invalid padding");
    }
  }
  const out = new (opts.out ?? Uint8Array)(end * encoding.bits / 8 | 0);
  let bits = 0;
  let buffer = 0;
  let written = 0;
  for (let i = 0; i < end; ++i) {
    const value = encoding.codes[string[i]];
    if (value === void 0) {
      throw new SyntaxError("Invalid character " + string[i]);
    }
    buffer = buffer << encoding.bits | value;
    bits += encoding.bits;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer >> bits;
    }
  }
  if (bits >= encoding.bits || 255 & buffer << 8 - bits) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
}
__name(parse, "parse");
function stringify(data, encoding, opts = {}) {
  const { pad = true } = opts;
  const mask = (1 << encoding.bits) - 1;
  let out = "";
  let bits = 0;
  let buffer = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer = buffer << 8 | 255 & data[i];
    bits += 8;
    while (bits > encoding.bits) {
      bits -= encoding.bits;
      out += encoding.chars[mask & buffer >> bits];
    }
  }
  if (bits) {
    out += encoding.chars[mask & buffer << encoding.bits - bits];
  }
  if (pad) {
    while (out.length * encoding.bits & 7) {
      out += "=";
    }
  }
  return out;
}
__name(stringify, "stringify");
var algToHash = {
  RS256: "SHA-256",
  RS384: "SHA-384",
  RS512: "SHA-512"
};
var RSA_ALGORITHM_NAME = "RSASSA-PKCS1-v1_5";
var jwksAlgToCryptoAlg = {
  RS256: RSA_ALGORITHM_NAME,
  RS384: RSA_ALGORITHM_NAME,
  RS512: RSA_ALGORITHM_NAME
};
var algs = Object.keys(algToHash);
function getCryptoAlgorithm(algorithmName) {
  const hash = algToHash[algorithmName];
  const name2 = jwksAlgToCryptoAlg[algorithmName];
  if (!hash || !name2) {
    throw new Error(`Unsupported algorithm ${algorithmName}, expected one of ${algs.join(",")}.`);
  }
  return {
    hash: { name: algToHash[algorithmName] },
    name: jwksAlgToCryptoAlg[algorithmName]
  };
}
__name(getCryptoAlgorithm, "getCryptoAlgorithm");
var isArrayString = /* @__PURE__ */ __name((s2) => {
  return Array.isArray(s2) && s2.length > 0 && s2.every((a) => typeof a === "string");
}, "isArrayString");
var assertAudienceClaim = /* @__PURE__ */ __name((aud, audience) => {
  const audienceList = [audience].flat().filter((a) => !!a);
  const audList = [aud].flat().filter((a) => !!a);
  const shouldVerifyAudience = audienceList.length > 0 && audList.length > 0;
  if (!shouldVerifyAudience) {
    return;
  }
  if (typeof aud === "string") {
    if (!audienceList.includes(aud)) {
      throw new TokenVerificationError({
        action: TokenVerificationErrorAction.EnsureClerkJWT,
        reason: TokenVerificationErrorReason.TokenVerificationFailed,
        message: `Invalid JWT audience claim (aud) ${JSON.stringify(aud)}. Is not included in "${JSON.stringify(
          audienceList
        )}".`
      });
    }
  } else if (isArrayString(aud)) {
    if (!aud.some((a) => audienceList.includes(a))) {
      throw new TokenVerificationError({
        action: TokenVerificationErrorAction.EnsureClerkJWT,
        reason: TokenVerificationErrorReason.TokenVerificationFailed,
        message: `Invalid JWT audience claim array (aud) ${JSON.stringify(aud)}. Is not included in "${JSON.stringify(
          audienceList
        )}".`
      });
    }
  }
}, "assertAudienceClaim");
var assertHeaderType = /* @__PURE__ */ __name((typ, allowedTypes = "JWT") => {
  if (typeof typ === "undefined") {
    return;
  }
  const allowed = Array.isArray(allowedTypes) ? allowedTypes : [allowedTypes];
  if (!allowed.includes(typ)) {
    throw new TokenVerificationError({
      action: TokenVerificationErrorAction.EnsureClerkJWT,
      reason: TokenVerificationErrorReason.TokenInvalid,
      message: `Invalid JWT type ${JSON.stringify(typ)}. Expected "${allowed.join(", ")}".`
    });
  }
}, "assertHeaderType");
var assertHeaderAlgorithm = /* @__PURE__ */ __name((alg) => {
  if (!algs.includes(alg)) {
    throw new TokenVerificationError({
      action: TokenVerificationErrorAction.EnsureClerkJWT,
      reason: TokenVerificationErrorReason.TokenInvalidAlgorithm,
      message: `Invalid JWT algorithm ${JSON.stringify(alg)}. Supported: ${algs}.`
    });
  }
}, "assertHeaderAlgorithm");
var assertSubClaim = /* @__PURE__ */ __name((sub) => {
  if (typeof sub !== "string") {
    throw new TokenVerificationError({
      action: TokenVerificationErrorAction.EnsureClerkJWT,
      reason: TokenVerificationErrorReason.TokenVerificationFailed,
      message: `Subject claim (sub) is required and must be a string. Received ${JSON.stringify(sub)}.`
    });
  }
}, "assertSubClaim");
var assertAuthorizedPartiesClaim = /* @__PURE__ */ __name((azp, authorizedParties) => {
  if (!azp || !authorizedParties || authorizedParties.length === 0) {
    return;
  }
  if (!authorizedParties.includes(azp)) {
    throw new TokenVerificationError({
      reason: TokenVerificationErrorReason.TokenInvalidAuthorizedParties,
      message: `Invalid JWT Authorized party claim (azp) ${JSON.stringify(azp)}. Expected "${authorizedParties}".`
    });
  }
}, "assertAuthorizedPartiesClaim");
var assertExpirationClaim = /* @__PURE__ */ __name((exp, clockSkewInMs) => {
  if (typeof exp !== "number") {
    throw new TokenVerificationError({
      action: TokenVerificationErrorAction.EnsureClerkJWT,
      reason: TokenVerificationErrorReason.TokenVerificationFailed,
      message: `Invalid JWT expiry date claim (exp) ${JSON.stringify(exp)}. Expected number.`
    });
  }
  const currentDate = new Date(Date.now());
  const expiryDate = /* @__PURE__ */ new Date(0);
  expiryDate.setUTCSeconds(exp);
  const expired = expiryDate.getTime() <= currentDate.getTime() - clockSkewInMs;
  if (expired) {
    throw new TokenVerificationError({
      reason: TokenVerificationErrorReason.TokenExpired,
      message: `JWT is expired. Expiry date: ${expiryDate.toUTCString()}, Current date: ${currentDate.toUTCString()}.`
    });
  }
}, "assertExpirationClaim");
var assertActivationClaim = /* @__PURE__ */ __name((nbf, clockSkewInMs) => {
  if (typeof nbf === "undefined") {
    return;
  }
  if (typeof nbf !== "number") {
    throw new TokenVerificationError({
      action: TokenVerificationErrorAction.EnsureClerkJWT,
      reason: TokenVerificationErrorReason.TokenVerificationFailed,
      message: `Invalid JWT not before date claim (nbf) ${JSON.stringify(nbf)}. Expected number.`
    });
  }
  const currentDate = new Date(Date.now());
  const notBeforeDate = /* @__PURE__ */ new Date(0);
  notBeforeDate.setUTCSeconds(nbf);
  const early = notBeforeDate.getTime() > currentDate.getTime() + clockSkewInMs;
  if (early) {
    throw new TokenVerificationError({
      reason: TokenVerificationErrorReason.TokenNotActiveYet,
      message: `JWT cannot be used prior to not before date claim (nbf). Not before date: ${notBeforeDate.toUTCString()}; Current date: ${currentDate.toUTCString()};`
    });
  }
}, "assertActivationClaim");
var assertIssuedAtClaim = /* @__PURE__ */ __name((iat, clockSkewInMs) => {
  if (typeof iat === "undefined") {
    return;
  }
  if (typeof iat !== "number") {
    throw new TokenVerificationError({
      action: TokenVerificationErrorAction.EnsureClerkJWT,
      reason: TokenVerificationErrorReason.TokenVerificationFailed,
      message: `Invalid JWT issued at date claim (iat) ${JSON.stringify(iat)}. Expected number.`
    });
  }
  const currentDate = new Date(Date.now());
  const issuedAtDate = /* @__PURE__ */ new Date(0);
  issuedAtDate.setUTCSeconds(iat);
  const postIssued = issuedAtDate.getTime() > currentDate.getTime() + clockSkewInMs;
  if (postIssued) {
    throw new TokenVerificationError({
      reason: TokenVerificationErrorReason.TokenIatInTheFuture,
      message: `JWT issued at date claim (iat) is in the future. Issued at date: ${issuedAtDate.toUTCString()}; Current date: ${currentDate.toUTCString()};`
    });
  }
}, "assertIssuedAtClaim");
function pemToBuffer(secret) {
  const trimmed = secret.replace(/-----BEGIN.*?-----/g, "").replace(/-----END.*?-----/g, "").replace(/\s/g, "");
  const decoded = isomorphicAtob(trimmed);
  const buffer = new ArrayBuffer(decoded.length);
  const bufView = new Uint8Array(buffer);
  for (let i = 0, strLen = decoded.length; i < strLen; i++) {
    bufView[i] = decoded.charCodeAt(i);
  }
  return bufView;
}
__name(pemToBuffer, "pemToBuffer");
function importKey(key, algorithm, keyUsage) {
  if (typeof key === "object") {
    return runtime.crypto.subtle.importKey("jwk", key, algorithm, false, [keyUsage]);
  }
  const keyData = pemToBuffer(key);
  const format2 = keyUsage === "sign" ? "pkcs8" : "spki";
  return runtime.crypto.subtle.importKey(format2, keyData, algorithm, false, [keyUsage]);
}
__name(importKey, "importKey");
var DEFAULT_CLOCK_SKEW_IN_MS = 5 * 1e3;
async function hasValidSignature(jwt, key) {
  const { header, signature, raw: raw3 } = jwt;
  const encoder = new TextEncoder();
  const data = encoder.encode([raw3.header, raw3.payload].join("."));
  const algorithm = getCryptoAlgorithm(header.alg);
  try {
    const cryptoKey = await importKey(key, algorithm, "verify");
    const verified = await runtime.crypto.subtle.verify(algorithm.name, cryptoKey, signature, data);
    return { data: verified };
  } catch (error) {
    return {
      errors: [
        new TokenVerificationError({
          reason: TokenVerificationErrorReason.TokenInvalidSignature,
          message: error?.message
        })
      ]
    };
  }
}
__name(hasValidSignature, "hasValidSignature");
function decodeJwt(token) {
  const tokenParts = (token || "").toString().split(".");
  if (tokenParts.length !== 3) {
    return {
      errors: [
        new TokenVerificationError({
          reason: TokenVerificationErrorReason.TokenInvalid,
          message: `Invalid JWT form. A JWT consists of three parts separated by dots.`
        })
      ]
    };
  }
  const [rawHeader, rawPayload, rawSignature] = tokenParts;
  const decoder = new TextDecoder();
  const header = JSON.parse(decoder.decode(base64url.parse(rawHeader, { loose: true })));
  const payload = JSON.parse(decoder.decode(base64url.parse(rawPayload, { loose: true })));
  const signature = base64url.parse(rawSignature, { loose: true });
  const data = {
    header,
    payload,
    signature,
    raw: {
      header: rawHeader,
      payload: rawPayload,
      signature: rawSignature,
      text: token
    }
  };
  return { data };
}
__name(decodeJwt, "decodeJwt");
async function verifyJwt(token, options) {
  const { audience, authorizedParties, clockSkewInMs, key, headerType } = options;
  const clockSkew = clockSkewInMs || DEFAULT_CLOCK_SKEW_IN_MS;
  const { data: decoded, errors } = decodeJwt(token);
  if (errors) {
    return { errors };
  }
  const { header, payload } = decoded;
  try {
    const { typ, alg } = header;
    assertHeaderType(typ, headerType);
    assertHeaderAlgorithm(alg);
    const { azp, sub, aud, iat, exp, nbf } = payload;
    assertSubClaim(sub);
    assertAudienceClaim([aud], [audience]);
    assertAuthorizedPartiesClaim(azp, authorizedParties);
    assertExpirationClaim(exp, clockSkew);
    assertActivationClaim(nbf, clockSkew);
    assertIssuedAtClaim(iat, clockSkew);
  } catch (err) {
    return { errors: [err] };
  }
  const { data: signatureValid, errors: signatureErrors } = await hasValidSignature(decoded, key);
  if (signatureErrors) {
    return {
      errors: [
        new TokenVerificationError({
          action: TokenVerificationErrorAction.EnsureClerkJWT,
          reason: TokenVerificationErrorReason.TokenVerificationFailed,
          message: `Error verifying JWT signature. ${signatureErrors[0]}`
        })
      ]
    };
  }
  if (!signatureValid) {
    return {
      errors: [
        new TokenVerificationError({
          reason: TokenVerificationErrorReason.TokenInvalidSignature,
          message: "JWT signature is invalid."
        })
      ]
    };
  }
  return { data: payload };
}
__name(verifyJwt, "verifyJwt");

// ../node_modules/.pnpm/@clerk+backend@2.33.5_react_830d22ab28c28b4fa4a78ec6de1291b4/node_modules/@clerk/backend/dist/chunk-TOROEX6P.mjs
init_checked_fetch();
init_modules_watch_stub();
var __create2 = Object.create;
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames2 = Object.getOwnPropertyNames;
var __getProtoOf2 = Object.getPrototypeOf;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __typeError = /* @__PURE__ */ __name((msg) => {
  throw TypeError(msg);
}, "__typeError");
var __commonJS2 = /* @__PURE__ */ __name((cb, mod) => /* @__PURE__ */ __name(function __require() {
  return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
}, "__require"), "__commonJS");
var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames2(from))
      if (!__hasOwnProp2.call(to, key) && key !== except)
        __defProp2(to, key, { get: /* @__PURE__ */ __name(() => from[key], "get"), enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
  }
  return to;
}, "__copyProps");
var __toESM2 = /* @__PURE__ */ __name((mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
  mod
)), "__toESM");
var __accessCheck = /* @__PURE__ */ __name((obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg), "__accessCheck");
var __privateGet = /* @__PURE__ */ __name((obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj)), "__privateGet");
var __privateAdd = /* @__PURE__ */ __name((obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value), "__privateAdd");
var __privateSet = /* @__PURE__ */ __name((obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value), "__privateSet");
var __privateMethod = /* @__PURE__ */ __name((obj, member, method) => (__accessCheck(obj, member, "access private method"), method), "__privateMethod");

// ../node_modules/.pnpm/@clerk+shared@3.47.7_react-_361d9ae56ed1f0380cf01c93b510a0f3/node_modules/@clerk/shared/dist/runtime/buildAccountsBaseUrl.mjs
init_checked_fetch();
init_modules_watch_stub();
function buildAccountsBaseUrl(frontendApi) {
  if (!frontendApi) return "";
  return `https://${frontendApi.replace(/clerk\.accountsstage\./, "accountsstage.").replace(/clerk\.accounts\.|clerk\./, "accounts.")}`;
}
__name(buildAccountsBaseUrl, "buildAccountsBaseUrl");

// ../node_modules/.pnpm/@clerk+shared@3.47.7_react-_361d9ae56ed1f0380cf01c93b510a0f3/node_modules/@clerk/shared/dist/runtime/authorization.mjs
init_checked_fetch();
init_modules_watch_stub();

// ../node_modules/.pnpm/@clerk+shared@3.47.7_react-_361d9ae56ed1f0380cf01c93b510a0f3/node_modules/@clerk/shared/dist/runtime/authorization-CV9xGlIX.mjs
init_checked_fetch();
init_modules_watch_stub();
var TYPES_TO_OBJECTS = {
  strict_mfa: {
    afterMinutes: 10,
    level: "multi_factor"
  },
  strict: {
    afterMinutes: 10,
    level: "second_factor"
  },
  moderate: {
    afterMinutes: 60,
    level: "second_factor"
  },
  lax: {
    afterMinutes: 1440,
    level: "second_factor"
  }
};
var ALLOWED_LEVELS = /* @__PURE__ */ new Set([
  "first_factor",
  "second_factor",
  "multi_factor"
]);
var ALLOWED_TYPES = /* @__PURE__ */ new Set([
  "strict_mfa",
  "strict",
  "moderate",
  "lax"
]);
var isValidMaxAge = /* @__PURE__ */ __name((maxAge) => typeof maxAge === "number" && maxAge > 0, "isValidMaxAge");
var isValidLevel = /* @__PURE__ */ __name((level) => ALLOWED_LEVELS.has(level), "isValidLevel");
var isValidVerificationType = /* @__PURE__ */ __name((type) => ALLOWED_TYPES.has(type), "isValidVerificationType");
var isValidFactorAge = /* @__PURE__ */ __name((x) => typeof x === "number" && Number.isFinite(x) && (x === -1 || x >= 0), "isValidFactorAge");
var prefixWithOrg = /* @__PURE__ */ __name((value) => value.replace(/^(org:)*/, "org:"), "prefixWithOrg");
var checkOrgAuthorization = /* @__PURE__ */ __name((params, options) => {
  const { orgId, orgRole, orgPermissions } = options;
  const roleAsked = params.role !== void 0;
  const permissionAsked = params.permission !== void 0;
  if (!roleAsked && !permissionAsked) return "skip";
  if (roleAsked && typeof params.role !== "string") return "fail";
  if (permissionAsked && typeof params.permission !== "string") return "fail";
  if (!orgId) return "fail";
  if (roleAsked) {
    if (typeof orgRole !== "string" || !orgRole) return "fail";
    if (prefixWithOrg(orgRole) !== prefixWithOrg(params.role)) return "fail";
  }
  if (permissionAsked) {
    if (!Array.isArray(orgPermissions)) return "fail";
    if (!orgPermissions.includes(prefixWithOrg(params.permission))) return "fail";
  }
  return "pass";
}, "checkOrgAuthorization");
var checkForFeatureOrPlan = /* @__PURE__ */ __name((claim, featureOrPlan) => {
  const { org: orgFeatures, user: userFeatures } = splitByScope(claim);
  const [scope, _id] = featureOrPlan.split(":");
  const id = _id || scope;
  if (scope === "org") return orgFeatures.includes(id);
  else if (scope === "user") return userFeatures.includes(id);
  else return [...orgFeatures, ...userFeatures].includes(id);
}, "checkForFeatureOrPlan");
var checkBillingAuthorization = /* @__PURE__ */ __name((params, options) => {
  const { features, plans } = options;
  const featureAsked = params.feature !== void 0;
  const planAsked = params.plan !== void 0;
  if (!featureAsked && !planAsked) return "skip";
  if (featureAsked && typeof params.feature !== "string") return "fail";
  if (planAsked && typeof params.plan !== "string") return "fail";
  if (featureAsked) {
    if (typeof features !== "string" || !features) return "fail";
    try {
      if (!checkForFeatureOrPlan(features, params.feature)) return "fail";
    } catch {
      return "fail";
    }
  }
  if (planAsked) {
    if (typeof plans !== "string" || !plans) return "fail";
    try {
      if (!checkForFeatureOrPlan(plans, params.plan)) return "fail";
    } catch {
      return "fail";
    }
  }
  return "pass";
}, "checkBillingAuthorization");
var splitByScope = /* @__PURE__ */ __name((fea) => {
  const features = fea ? fea.split(",").map((f) => f.trim()) : [];
  return {
    org: features.filter((f) => f.split(":")[0].includes("o")).map((f) => f.split(":")[1]),
    user: features.filter((f) => f.split(":")[0].includes("u")).map((f) => f.split(":")[1])
  };
}, "splitByScope");
var validateReverificationConfig = /* @__PURE__ */ __name((config) => {
  if (!config) return false;
  const convertConfigToObject = /* @__PURE__ */ __name((config$1) => {
    if (typeof config$1 === "string") return TYPES_TO_OBJECTS[config$1];
    return config$1;
  }, "convertConfigToObject");
  const isValidStringValue = typeof config === "string" && isValidVerificationType(config);
  const isValidObjectValue = typeof config === "object" && isValidLevel(config.level) && isValidMaxAge(config.afterMinutes);
  if (isValidStringValue || isValidObjectValue) return convertConfigToObject.bind(null, config);
  return false;
}, "validateReverificationConfig");
var checkReverificationAuthorization = /* @__PURE__ */ __name((params, { factorVerificationAge }) => {
  if (params.reverification === void 0) return "skip";
  if (!factorVerificationAge) return "fail";
  if (!Array.isArray(factorVerificationAge) || factorVerificationAge.length !== 2 || !isValidFactorAge(factorVerificationAge[0]) || !isValidFactorAge(factorVerificationAge[1])) return "fail";
  const getConfig = validateReverificationConfig(params.reverification);
  if (!getConfig) return "fail";
  const { level, afterMinutes } = getConfig();
  const [factor1Age, factor2Age] = factorVerificationAge;
  if (factor1Age === -1 && factor2Age === -1) return "fail";
  const factor1FreshEnough = factor1Age !== -1 && afterMinutes > factor1Age;
  const factor2FreshEnough = factor2Age !== -1 && afterMinutes > factor2Age;
  switch (level) {
    case "first_factor":
      return factor1FreshEnough ? "pass" : "fail";
    case "second_factor":
      if (factor2Age === -1) return factor1FreshEnough ? "pass" : "fail";
      if (factor1Age === -1) return factor2FreshEnough ? "pass" : "fail";
      return factor2FreshEnough ? "pass" : "fail";
    case "multi_factor":
      if (factor2Age === -1) return factor1FreshEnough ? "pass" : "fail";
      if (factor1Age === -1) return "fail";
      return factor1FreshEnough && factor2FreshEnough ? "pass" : "fail";
  }
}, "checkReverificationAuthorization");
var combine = /* @__PURE__ */ __name((results) => results.some((r) => r === "pass") && results.every((r) => r === "pass" || r === "skip"), "combine");
var createCheckAuthorization = /* @__PURE__ */ __name((options) => {
  return (params) => {
    if (!options.userId) return false;
    return combine([
      checkOrgAuthorization(params, options),
      checkBillingAuthorization(params, options),
      checkReverificationAuthorization(params, options)
    ]);
  };
}, "createCheckAuthorization");

// ../node_modules/.pnpm/@clerk+shared@3.47.7_react-_361d9ae56ed1f0380cf01c93b510a0f3/node_modules/@clerk/shared/dist/runtime/jwtPayloadParser.mjs
init_checked_fetch();
init_modules_watch_stub();
var parsePermissions = /* @__PURE__ */ __name(({ per, fpm }) => {
  if (!per || !fpm) return {
    permissions: [],
    featurePermissionMap: []
  };
  const permissions = per.split(",").map((p) => p.trim());
  return {
    permissions,
    featurePermissionMap: fpm.split(",").map((permission) => Number.parseInt(permission.trim(), 10)).map((permission) => permission.toString(2).padStart(permissions.length, "0").split("").map((bit) => Number.parseInt(bit, 10)).reverse()).filter(Boolean)
  };
}, "parsePermissions");
function buildOrgPermissions({ features, permissions, featurePermissionMap }) {
  if (!features || !permissions || !featurePermissionMap) return [];
  const orgPermissions = [];
  for (let featureIndex = 0; featureIndex < features.length; featureIndex++) {
    const feature = features[featureIndex];
    if (featureIndex >= featurePermissionMap.length) continue;
    const permissionBits = featurePermissionMap[featureIndex];
    if (!permissionBits) continue;
    for (let permIndex = 0; permIndex < permissionBits.length; permIndex++) if (permissionBits[permIndex] === 1) orgPermissions.push(`org:${feature}:${permissions[permIndex]}`);
  }
  return orgPermissions;
}
__name(buildOrgPermissions, "buildOrgPermissions");
var __experimental_JWTPayloadToAuthObjectProperties = /* @__PURE__ */ __name((claims) => {
  let orgId;
  let orgRole;
  let orgSlug;
  let orgPermissions;
  const factorVerificationAge = claims.fva ?? null;
  const sessionStatus = claims.sts ?? null;
  switch (claims.v) {
    case 2:
      if (claims.o) {
        orgId = claims.o?.id;
        orgSlug = claims.o?.slg;
        if (claims.o?.rol) orgRole = `org:${claims.o?.rol}`;
        const { org } = splitByScope(claims.fea);
        const { permissions, featurePermissionMap } = parsePermissions({
          per: claims.o?.per,
          fpm: claims.o?.fpm
        });
        orgPermissions = buildOrgPermissions({
          features: org,
          featurePermissionMap,
          permissions
        });
      }
      break;
    default:
      orgId = claims.org_id;
      orgRole = claims.org_role;
      orgSlug = claims.org_slug;
      orgPermissions = claims.org_permissions;
      break;
  }
  return {
    sessionClaims: claims,
    sessionId: claims.sid,
    sessionStatus,
    actor: claims.act,
    userId: claims.sub,
    orgId,
    orgRole,
    orgSlug,
    orgPermissions,
    factorVerificationAge
  };
}, "__experimental_JWTPayloadToAuthObjectProperties");

// ../node_modules/.pnpm/@clerk+shared@3.47.7_react-_361d9ae56ed1f0380cf01c93b510a0f3/node_modules/@clerk/shared/dist/runtime/pathToRegexp.mjs
init_checked_fetch();
init_modules_watch_stub();

// ../node_modules/.pnpm/@clerk+shared@3.47.7_react-_361d9ae56ed1f0380cf01c93b510a0f3/node_modules/@clerk/shared/dist/runtime/pathToRegexp-Bu45OrlU.mjs
init_checked_fetch();
init_modules_watch_stub();
function _(r) {
  for (var n = [], e = 0; e < r.length; ) {
    var a = r[e];
    if (a === "*" || a === "+" || a === "?") {
      n.push({
        type: "MODIFIER",
        index: e,
        value: r[e++]
      });
      continue;
    }
    if (a === "\\") {
      n.push({
        type: "ESCAPED_CHAR",
        index: e++,
        value: r[e++]
      });
      continue;
    }
    if (a === "{") {
      n.push({
        type: "OPEN",
        index: e,
        value: r[e++]
      });
      continue;
    }
    if (a === "}") {
      n.push({
        type: "CLOSE",
        index: e,
        value: r[e++]
      });
      continue;
    }
    if (a === ":") {
      for (var u = "", t = e + 1; t < r.length; ) {
        var c = r.charCodeAt(t);
        if (c >= 48 && c <= 57 || c >= 65 && c <= 90 || c >= 97 && c <= 122 || c === 95) {
          u += r[t++];
          continue;
        }
        break;
      }
      if (!u) throw new TypeError("Missing parameter name at ".concat(e));
      n.push({
        type: "NAME",
        index: e,
        value: u
      }), e = t;
      continue;
    }
    if (a === "(") {
      var o = 1, m = "", t = e + 1;
      if (r[t] === "?") throw new TypeError('Pattern cannot start with "?" at '.concat(t));
      for (; t < r.length; ) {
        if (r[t] === "\\") {
          m += r[t++] + r[t++];
          continue;
        }
        if (r[t] === ")") {
          if (o--, o === 0) {
            t++;
            break;
          }
        } else if (r[t] === "(" && (o++, r[t + 1] !== "?")) throw new TypeError("Capturing groups are not allowed at ".concat(t));
        m += r[t++];
      }
      if (o) throw new TypeError("Unbalanced pattern at ".concat(e));
      if (!m) throw new TypeError("Missing pattern at ".concat(e));
      n.push({
        type: "PATTERN",
        index: e,
        value: m
      }), e = t;
      continue;
    }
    n.push({
      type: "CHAR",
      index: e,
      value: r[e++]
    });
  }
  return n.push({
    type: "END",
    index: e,
    value: ""
  }), n;
}
__name(_, "_");
function F(r, n) {
  n === void 0 && (n = {});
  for (var e = _(r), a = n.prefixes, u = a === void 0 ? "./" : a, t = n.delimiter, c = t === void 0 ? "/#?" : t, o = [], m = 0, h = 0, p = "", f = function(l) {
    if (h < e.length && e[h].type === l) return e[h++].value;
  }, w = function(l) {
    var v = f(l);
    if (v !== void 0) return v;
    var E = e[h], N = E.type, S = E.index;
    throw new TypeError("Unexpected ".concat(N, " at ").concat(S, ", expected ").concat(l));
  }, d = function() {
    for (var l = "", v; v = f("CHAR") || f("ESCAPED_CHAR"); ) l += v;
    return l;
  }, M = function(l) {
    for (var v = 0, E = c; v < E.length; v++) {
      var N = E[v];
      if (l.indexOf(N) > -1) return true;
    }
    return false;
  }, A = function(l) {
    var v = o[o.length - 1], E = l || (v && typeof v == "string" ? v : "");
    if (v && !E) throw new TypeError('Must have text between two parameters, missing text after "'.concat(v.name, '"'));
    return !E || M(E) ? "[^".concat(s(c), "]+?") : "(?:(?!".concat(s(E), ")[^").concat(s(c), "])+?");
  }; h < e.length; ) {
    var T = f("CHAR"), x = f("NAME"), C = f("PATTERN");
    if (x || C) {
      var g = T || "";
      u.indexOf(g) === -1 && (p += g, g = ""), p && (o.push(p), p = ""), o.push({
        name: x || m++,
        prefix: g,
        suffix: "",
        pattern: C || A(g),
        modifier: f("MODIFIER") || ""
      });
      continue;
    }
    var i = T || f("ESCAPED_CHAR");
    if (i) {
      p += i;
      continue;
    }
    p && (o.push(p), p = "");
    if (f("OPEN")) {
      var g = d(), y = f("NAME") || "", O = f("PATTERN") || "", b = d();
      w("CLOSE"), o.push({
        name: y || (O ? m++ : ""),
        pattern: y && !O ? A(g) : O,
        prefix: g,
        suffix: b,
        modifier: f("MODIFIER") || ""
      });
      continue;
    }
    w("END");
  }
  return o;
}
__name(F, "F");
function H(r, n) {
  var e = [];
  return I(P(r, e, n), e, n);
}
__name(H, "H");
function I(r, n, e) {
  e === void 0 && (e = {});
  var a = e.decode, u = a === void 0 ? function(t) {
    return t;
  } : a;
  return function(t) {
    var c = r.exec(t);
    if (!c) return false;
    for (var o = c[0], m = c.index, h = /* @__PURE__ */ Object.create(null), p = function(w) {
      if (c[w] === void 0) return "continue";
      var d = n[w - 1];
      d.modifier === "*" || d.modifier === "+" ? h[d.name] = c[w].split(d.prefix + d.suffix).map(function(M) {
        return u(M, d);
      }) : h[d.name] = u(c[w], d);
    }, f = 1; f < c.length; f++) p(f);
    return {
      path: o,
      index: m,
      params: h
    };
  };
}
__name(I, "I");
function s(r) {
  return r.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(s, "s");
function D(r) {
  return r && r.sensitive ? "" : "i";
}
__name(D, "D");
function $(r, n) {
  if (!n) return r;
  for (var e = /\((?:\?<(.*?)>)?(?!\?)/g, a = 0, u = e.exec(r.source); u; ) n.push({
    name: u[1] || a++,
    prefix: "",
    suffix: "",
    modifier: "",
    pattern: ""
  }), u = e.exec(r.source);
  return r;
}
__name($, "$");
function W(r, n, e) {
  var a = r.map(function(u) {
    return P(u, n, e).source;
  });
  return new RegExp("(?:".concat(a.join("|"), ")"), D(e));
}
__name(W, "W");
function L(r, n, e) {
  return U(F(r, e), n, e);
}
__name(L, "L");
function U(r, n, e) {
  e === void 0 && (e = {});
  for (var a = e.strict, u = a === void 0 ? false : a, t = e.start, c = t === void 0 ? true : t, o = e.end, m = o === void 0 ? true : o, h = e.encode, p = h === void 0 ? function(v) {
    return v;
  } : h, f = e.delimiter, w = f === void 0 ? "/#?" : f, d = e.endsWith, M = d === void 0 ? "" : d, A = "[".concat(s(M), "]|$"), T = "[".concat(s(w), "]"), x = c ? "^" : "", C = 0, g = r; C < g.length; C++) {
    var i = g[C];
    if (typeof i == "string") x += s(p(i));
    else {
      var R = s(p(i.prefix)), y = s(p(i.suffix));
      if (i.pattern) if (n && n.push(i), R || y) if (i.modifier === "+" || i.modifier === "*") {
        var O = i.modifier === "*" ? "?" : "";
        x += "(?:".concat(R, "((?:").concat(i.pattern, ")(?:").concat(y).concat(R, "(?:").concat(i.pattern, "))*)").concat(y, ")").concat(O);
      } else x += "(?:".concat(R, "(").concat(i.pattern, ")").concat(y, ")").concat(i.modifier);
      else {
        if (i.modifier === "+" || i.modifier === "*") throw new TypeError('Can not repeat "'.concat(i.name, '" without a prefix and suffix'));
        x += "(".concat(i.pattern, ")").concat(i.modifier);
      }
      else x += "(?:".concat(R).concat(y, ")").concat(i.modifier);
    }
  }
  if (m) u || (x += "".concat(T, "?")), x += e.endsWith ? "(?=".concat(A, ")") : "$";
  else {
    var b = r[r.length - 1], l = typeof b == "string" ? T.indexOf(b[b.length - 1]) > -1 : b === void 0;
    u || (x += "(?:".concat(T, "(?=").concat(A, "))?")), l || (x += "(?=".concat(T, "|").concat(A, ")"));
  }
  return new RegExp(x, D(e));
}
__name(U, "U");
function P(r, n, e) {
  return r instanceof RegExp ? $(r, n) : Array.isArray(r) ? W(r, n, e) : L(r, n, e);
}
__name(P, "P");
function match2(str, options) {
  try {
    return H(str, options);
  } catch (e) {
    throw new Error(`Invalid path and options: Consult the documentation of path-to-regexp here: https://github.com/pillarjs/path-to-regexp/tree/6.x
${e.message}`);
  }
}
__name(match2, "match");

// ../node_modules/.pnpm/@clerk+shared@3.47.7_react-_361d9ae56ed1f0380cf01c93b510a0f3/node_modules/@clerk/shared/dist/runtime/authorization-errors.mjs
init_checked_fetch();
init_modules_watch_stub();

// ../node_modules/.pnpm/@clerk+shared@3.47.7_react-_361d9ae56ed1f0380cf01c93b510a0f3/node_modules/@clerk/shared/dist/runtime/authorization-errors-CS1pNy8i.mjs
init_checked_fetch();
init_modules_watch_stub();

// ../node_modules/.pnpm/@clerk+backend@2.33.5_react_830d22ab28c28b4fa4a78ec6de1291b4/node_modules/@clerk/backend/dist/chunk-UOT6YP2O.mjs
var require_dist = __commonJS2({
  "../../node_modules/.pnpm/cookie@1.0.2/node_modules/cookie/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parse = parse22;
    exports.serialize = serialize;
    var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
    var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
    var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    var __toString = Object.prototype.toString;
    var NullObject = /* @__PURE__ */ (() => {
      const C = /* @__PURE__ */ __name(function() {
      }, "C");
      C.prototype = /* @__PURE__ */ Object.create(null);
      return C;
    })();
    function parse22(str, options) {
      const obj = new NullObject();
      const len = str.length;
      if (len < 2)
        return obj;
      const dec = options?.decode || decode;
      let index = 0;
      do {
        const eqIdx = str.indexOf("=", index);
        if (eqIdx === -1)
          break;
        const colonIdx = str.indexOf(";", index);
        const endIdx = colonIdx === -1 ? len : colonIdx;
        if (eqIdx > endIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        const keyStartIdx = startIndex(str, index, eqIdx);
        const keyEndIdx = endIndex(str, eqIdx, keyStartIdx);
        const key = str.slice(keyStartIdx, keyEndIdx);
        if (obj[key] === void 0) {
          let valStartIdx = startIndex(str, eqIdx + 1, endIdx);
          let valEndIdx = endIndex(str, endIdx, valStartIdx);
          const value = dec(str.slice(valStartIdx, valEndIdx));
          obj[key] = value;
        }
        index = endIdx + 1;
      } while (index < len);
      return obj;
    }
    __name(parse22, "parse2");
    function startIndex(str, index, max) {
      do {
        const code = str.charCodeAt(index);
        if (code !== 32 && code !== 9)
          return index;
      } while (++index < max);
      return max;
    }
    __name(startIndex, "startIndex");
    function endIndex(str, index, min) {
      while (index > min) {
        const code = str.charCodeAt(--index);
        if (code !== 32 && code !== 9)
          return index + 1;
      }
      return min;
    }
    __name(endIndex, "endIndex");
    function serialize(name2, val, options) {
      const enc = options?.encode || encodeURIComponent;
      if (!cookieNameRegExp.test(name2)) {
        throw new TypeError(`argument name is invalid: ${name2}`);
      }
      const value = enc(val);
      if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${val}`);
      }
      let str = name2 + "=" + value;
      if (!options)
        return str;
      if (options.maxAge !== void 0) {
        if (!Number.isInteger(options.maxAge)) {
          throw new TypeError(`option maxAge is invalid: ${options.maxAge}`);
        }
        str += "; Max-Age=" + options.maxAge;
      }
      if (options.domain) {
        if (!domainValueRegExp.test(options.domain)) {
          throw new TypeError(`option domain is invalid: ${options.domain}`);
        }
        str += "; Domain=" + options.domain;
      }
      if (options.path) {
        if (!pathValueRegExp.test(options.path)) {
          throw new TypeError(`option path is invalid: ${options.path}`);
        }
        str += "; Path=" + options.path;
      }
      if (options.expires) {
        if (!isDate(options.expires) || !Number.isFinite(options.expires.valueOf())) {
          throw new TypeError(`option expires is invalid: ${options.expires}`);
        }
        str += "; Expires=" + options.expires.toUTCString();
      }
      if (options.httpOnly) {
        str += "; HttpOnly";
      }
      if (options.secure) {
        str += "; Secure";
      }
      if (options.partitioned) {
        str += "; Partitioned";
      }
      if (options.priority) {
        const priority = typeof options.priority === "string" ? options.priority.toLowerCase() : void 0;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError(`option priority is invalid: ${options.priority}`);
        }
      }
      if (options.sameSite) {
        const sameSite = typeof options.sameSite === "string" ? options.sameSite.toLowerCase() : options.sameSite;
        switch (sameSite) {
          case true:
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError(`option sameSite is invalid: ${options.sameSite}`);
        }
      }
      return str;
    }
    __name(serialize, "serialize");
    function decode(str) {
      if (str.indexOf("%") === -1)
        return str;
      try {
        return decodeURIComponent(str);
      } catch (e) {
        return str;
      }
    }
    __name(decode, "decode");
    function isDate(val) {
      return __toString.call(val) === "[object Date]";
    }
    __name(isDate, "isDate");
  }
});
var API_URL = "https://api.clerk.com";
var API_VERSION = "v1";
var USER_AGENT = `${"@clerk/backend"}@${"2.33.5"}`;
var MAX_CACHE_LAST_UPDATED_AT_SECONDS = 5 * 60;
var SUPPORTED_BAPI_VERSION = "2025-11-10";
var Attributes = {
  AuthToken: "__clerkAuthToken",
  AuthSignature: "__clerkAuthSignature",
  AuthStatus: "__clerkAuthStatus",
  AuthReason: "__clerkAuthReason",
  AuthMessage: "__clerkAuthMessage",
  ClerkUrl: "__clerkUrl"
};
var Cookies = {
  Session: "__session",
  Refresh: "__refresh",
  ClientUat: "__client_uat",
  Handshake: "__clerk_handshake",
  DevBrowser: "__clerk_db_jwt",
  RedirectCount: "__clerk_redirect_count",
  HandshakeNonce: "__clerk_handshake_nonce"
};
var QueryParameters = {
  ClerkSynced: "__clerk_synced",
  SuffixedCookies: "suffixed_cookies",
  ClerkRedirectUrl: "__clerk_redirect_url",
  // use the reference to Cookies to indicate that it's the same value
  DevBrowser: Cookies.DevBrowser,
  Handshake: Cookies.Handshake,
  HandshakeHelp: "__clerk_help",
  LegacyDevBrowser: "__dev_session",
  HandshakeReason: "__clerk_hs_reason",
  HandshakeNonce: Cookies.HandshakeNonce,
  HandshakeFormat: "format",
  Session: "__session"
};
var Headers2 = {
  Accept: "accept",
  AuthMessage: "x-clerk-auth-message",
  Authorization: "authorization",
  AuthReason: "x-clerk-auth-reason",
  AuthSignature: "x-clerk-auth-signature",
  AuthStatus: "x-clerk-auth-status",
  AuthToken: "x-clerk-auth-token",
  CacheControl: "cache-control",
  ClerkRedirectTo: "x-clerk-redirect-to",
  ClerkRequestData: "x-clerk-request-data",
  ClerkUrl: "x-clerk-clerk-url",
  CloudFrontForwardedProto: "cloudfront-forwarded-proto",
  ContentType: "content-type",
  ContentSecurityPolicy: "content-security-policy",
  ContentSecurityPolicyReportOnly: "content-security-policy-report-only",
  EnableDebug: "x-clerk-debug",
  ForwardedHost: "x-forwarded-host",
  ForwardedPort: "x-forwarded-port",
  ForwardedProto: "x-forwarded-proto",
  Host: "host",
  Location: "location",
  Nonce: "x-nonce",
  Origin: "origin",
  Referrer: "referer",
  SecFetchDest: "sec-fetch-dest",
  SecFetchSite: "sec-fetch-site",
  UserAgent: "user-agent",
  ReportingEndpoints: "reporting-endpoints"
};
var ContentTypes = {
  Json: "application/json"
};
var constants = {
  Attributes,
  Cookies,
  Headers: Headers2,
  ContentTypes,
  QueryParameters
};
function mergePreDefinedOptions(preDefinedOptions, options) {
  return Object.keys(preDefinedOptions).reduce(
    (obj, key) => {
      return { ...obj, [key]: options[key] || obj[key] };
    },
    { ...preDefinedOptions }
  );
}
__name(mergePreDefinedOptions, "mergePreDefinedOptions");
function assertValidSecretKey(val) {
  if (!val || typeof val !== "string") {
    throw Error("Missing Clerk Secret Key. Go to https://dashboard.clerk.com and get your key for your instance.");
  }
}
__name(assertValidSecretKey, "assertValidSecretKey");
function assertValidPublishableKey(val) {
  parsePublishableKey(val, { fatal: true });
}
__name(assertValidPublishableKey, "assertValidPublishableKey");
var TokenType = {
  SessionToken: "session_token",
  ApiKey: "api_key",
  M2MToken: "m2m_token",
  OAuthToken: "oauth_token"
};
var AuthenticateContext = class {
  static {
    __name(this, "AuthenticateContext");
  }
  constructor(cookieSuffix, clerkRequest, options) {
    this.cookieSuffix = cookieSuffix;
    this.clerkRequest = clerkRequest;
    this.originalFrontendApi = "";
    if (options.acceptsToken === TokenType.M2MToken || options.acceptsToken === TokenType.ApiKey) {
      this.initHeaderValues();
    } else {
      this.initPublishableKeyValues(options);
      this.initHeaderValues();
      this.initCookieValues();
      this.initHandshakeValues();
    }
    Object.assign(this, options);
    this.clerkUrl = this.clerkRequest.clerkUrl;
  }
  /**
   * Retrieves the session token from either the cookie or the header.
   *
   * @returns {string | undefined} The session token if available, otherwise undefined.
   */
  get sessionToken() {
    return this.sessionTokenInCookie || this.tokenInHeader;
  }
  usesSuffixedCookies() {
    const suffixedClientUat = this.getSuffixedCookie(constants.Cookies.ClientUat);
    const clientUat = this.getCookie(constants.Cookies.ClientUat);
    const suffixedSession = this.getSuffixedCookie(constants.Cookies.Session) || "";
    const session = this.getCookie(constants.Cookies.Session) || "";
    if (session && !this.tokenHasIssuer(session)) {
      return false;
    }
    if (session && !this.tokenBelongsToInstance(session)) {
      return true;
    }
    if (!suffixedClientUat && !suffixedSession) {
      return false;
    }
    const { data: sessionData } = decodeJwt(session);
    const sessionIat = sessionData?.payload.iat || 0;
    const { data: suffixedSessionData } = decodeJwt(suffixedSession);
    const suffixedSessionIat = suffixedSessionData?.payload.iat || 0;
    if (suffixedClientUat !== "0" && clientUat !== "0" && sessionIat > suffixedSessionIat) {
      return false;
    }
    if (suffixedClientUat === "0" && clientUat !== "0") {
      return false;
    }
    if (this.instanceType !== "production") {
      const isSuffixedSessionExpired = this.sessionExpired(suffixedSessionData);
      if (suffixedClientUat !== "0" && clientUat === "0" && isSuffixedSessionExpired) {
        return false;
      }
    }
    if (!suffixedClientUat && suffixedSession) {
      return false;
    }
    return true;
  }
  /**
   * Determines if the request came from a different origin based on the referrer header.
   * Used for cross-origin detection in multi-domain authentication flows.
   *
   * @returns {boolean} True if referrer exists and is from a different origin, false otherwise.
   */
  isCrossOriginReferrer() {
    if (!this.referrer || !this.clerkUrl.origin) {
      return false;
    }
    try {
      const referrerOrigin = new URL(this.referrer).origin;
      return referrerOrigin !== this.clerkUrl.origin;
    } catch {
      return false;
    }
  }
  /**
   * Determines if the referrer URL is from a Clerk domain (accounts portal or FAPI).
   * This includes both development and production account portal domains, as well as FAPI domains
   * used for redirect-based authentication flows.
   *
   * @returns {boolean} True if the referrer is from a Clerk accounts portal or FAPI domain, false otherwise
   */
  isKnownClerkReferrer() {
    if (!this.referrer) {
      return false;
    }
    try {
      const referrerOrigin = new URL(this.referrer);
      const referrerHost = referrerOrigin.hostname;
      if (this.frontendApi) {
        const fapiHost = this.frontendApi.startsWith("http") ? new URL(this.frontendApi).hostname : this.frontendApi;
        if (referrerHost === fapiHost) {
          return true;
        }
      }
      if (isLegacyDevAccountPortalOrigin(referrerHost) || isCurrentDevAccountPortalOrigin(referrerHost)) {
        return true;
      }
      const expectedAccountsUrl = buildAccountsBaseUrl(this.frontendApi);
      if (expectedAccountsUrl) {
        const expectedAccountsOrigin = new URL(expectedAccountsUrl).origin;
        if (referrerOrigin.origin === expectedAccountsOrigin) {
          return true;
        }
      }
      if (referrerHost.startsWith("accounts.")) {
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }
  initPublishableKeyValues(options) {
    assertValidPublishableKey(options.publishableKey);
    this.publishableKey = options.publishableKey;
    const originalPk = parsePublishableKey(this.publishableKey, {
      fatal: true,
      domain: options.domain,
      isSatellite: options.isSatellite
    });
    this.originalFrontendApi = originalPk.frontendApi;
    const pk = parsePublishableKey(this.publishableKey, {
      fatal: true,
      proxyUrl: options.proxyUrl,
      domain: options.domain,
      isSatellite: options.isSatellite
    });
    this.instanceType = pk.instanceType;
    this.frontendApi = pk.frontendApi;
  }
  initHeaderValues() {
    this.tokenInHeader = this.parseAuthorizationHeader(this.getHeader(constants.Headers.Authorization));
    this.origin = this.getHeader(constants.Headers.Origin);
    this.host = this.getHeader(constants.Headers.Host);
    this.forwardedHost = this.getHeader(constants.Headers.ForwardedHost);
    this.forwardedProto = this.getHeader(constants.Headers.CloudFrontForwardedProto) || this.getHeader(constants.Headers.ForwardedProto);
    this.referrer = this.getHeader(constants.Headers.Referrer);
    this.userAgent = this.getHeader(constants.Headers.UserAgent);
    this.secFetchDest = this.getHeader(constants.Headers.SecFetchDest);
    this.accept = this.getHeader(constants.Headers.Accept);
  }
  initCookieValues() {
    this.sessionTokenInCookie = this.getSuffixedOrUnSuffixedCookie(constants.Cookies.Session);
    this.refreshTokenInCookie = this.getSuffixedCookie(constants.Cookies.Refresh);
    this.clientUat = Number.parseInt(this.getSuffixedOrUnSuffixedCookie(constants.Cookies.ClientUat) || "") || 0;
  }
  initHandshakeValues() {
    this.devBrowserToken = this.getQueryParam(constants.QueryParameters.DevBrowser) || this.getSuffixedOrUnSuffixedCookie(constants.Cookies.DevBrowser);
    this.handshakeToken = this.getQueryParam(constants.QueryParameters.Handshake) || this.getCookie(constants.Cookies.Handshake);
    this.handshakeRedirectLoopCounter = Number(this.getCookie(constants.Cookies.RedirectCount)) || 0;
    this.handshakeNonce = this.getQueryParam(constants.QueryParameters.HandshakeNonce) || this.getCookie(constants.Cookies.HandshakeNonce);
  }
  getQueryParam(name2) {
    return this.clerkRequest.clerkUrl.searchParams.get(name2);
  }
  getHeader(name2) {
    return this.clerkRequest.headers.get(name2) || void 0;
  }
  getCookie(name2) {
    return this.clerkRequest.cookies.get(name2) || void 0;
  }
  getSuffixedCookie(name2) {
    return this.getCookie(getSuffixedCookieName(name2, this.cookieSuffix)) || void 0;
  }
  getSuffixedOrUnSuffixedCookie(cookieName) {
    if (this.usesSuffixedCookies()) {
      return this.getSuffixedCookie(cookieName);
    }
    return this.getCookie(cookieName);
  }
  parseAuthorizationHeader(authorizationHeader) {
    if (!authorizationHeader) {
      return void 0;
    }
    const [scheme, token] = authorizationHeader.split(" ", 2);
    if (!token) {
      return scheme;
    }
    if (scheme === "Bearer") {
      return token;
    }
    return void 0;
  }
  tokenHasIssuer(token) {
    const { data, errors } = decodeJwt(token);
    if (errors) {
      return false;
    }
    return !!data.payload.iss;
  }
  tokenBelongsToInstance(token) {
    if (!token) {
      return false;
    }
    const { data, errors } = decodeJwt(token);
    if (errors) {
      return false;
    }
    const tokenIssuer = data.payload.iss.replace(/https?:\/\//gi, "");
    return this.originalFrontendApi === tokenIssuer;
  }
  sessionExpired(jwt) {
    return !!jwt && jwt?.payload.exp <= Date.now() / 1e3 >> 0;
  }
};
var createAuthenticateContext = /* @__PURE__ */ __name(async (clerkRequest, options) => {
  const cookieSuffix = options.publishableKey ? await getCookieSuffix(options.publishableKey, runtime.crypto.subtle) : "";
  return new AuthenticateContext(cookieSuffix, clerkRequest, options);
}, "createAuthenticateContext");
var SEPARATOR = "/";
var MULTIPLE_SEPARATOR_REGEX = new RegExp("(?<!:)" + SEPARATOR + "{1,}", "g");
function joinPaths(...args) {
  return args.filter((p) => p).join(SEPARATOR).replace(MULTIPLE_SEPARATOR_REGEX, SEPARATOR);
}
__name(joinPaths, "joinPaths");
var AbstractAPI = class {
  static {
    __name(this, "AbstractAPI");
  }
  constructor(request) {
    this.request = request;
  }
  requireId(id) {
    if (!id) {
      throw new Error("A valid resource ID is required.");
    }
  }
};
var basePath = "/actor_tokens";
var ActorTokenAPI = class extends AbstractAPI {
  static {
    __name(this, "ActorTokenAPI");
  }
  async create(params) {
    return this.request({
      method: "POST",
      path: basePath,
      bodyParams: params
    });
  }
  async revoke(actorTokenId) {
    this.requireId(actorTokenId);
    return this.request({
      method: "POST",
      path: joinPaths(basePath, actorTokenId, "revoke")
    });
  }
};
var basePath2 = "/agents/tasks";
var AgentTaskAPI = class extends AbstractAPI {
  static {
    __name(this, "AgentTaskAPI");
  }
  /**
   * @experimental This is an experimental API for the Agent Tokens feature that is available under a private beta, and the API is subject to change. It is advised to [pin](https://clerk.com/docs/pinning) the SDK version and the clerk-js version to avoid breaking changes.
   */
  async create(params) {
    return this.request({
      method: "POST",
      path: basePath2,
      bodyParams: params,
      options: {
        deepSnakecaseBodyParamKeys: true
      }
    });
  }
  async revoke(agentTaskId) {
    this.requireId(agentTaskId);
    return this.request({
      method: "POST",
      path: joinPaths(basePath2, agentTaskId, "revoke")
    });
  }
};
var basePath3 = "/accountless_applications";
var AccountlessApplicationAPI = class extends AbstractAPI {
  static {
    __name(this, "AccountlessApplicationAPI");
  }
  async createAccountlessApplication(params) {
    const headerParams = params?.requestHeaders ? Object.fromEntries(params.requestHeaders.entries()) : void 0;
    return this.request({
      method: "POST",
      path: basePath3,
      headerParams
    });
  }
  async completeAccountlessApplicationOnboarding(params) {
    const headerParams = params?.requestHeaders ? Object.fromEntries(params.requestHeaders.entries()) : void 0;
    return this.request({
      method: "POST",
      path: joinPaths(basePath3, "complete"),
      headerParams
    });
  }
};
var basePath4 = "/allowlist_identifiers";
var AllowlistIdentifierAPI = class extends AbstractAPI {
  static {
    __name(this, "AllowlistIdentifierAPI");
  }
  async getAllowlistIdentifierList(params = {}) {
    return this.request({
      method: "GET",
      path: basePath4,
      queryParams: { ...params, paginated: true }
    });
  }
  async createAllowlistIdentifier(params) {
    return this.request({
      method: "POST",
      path: basePath4,
      bodyParams: params
    });
  }
  async deleteAllowlistIdentifier(allowlistIdentifierId) {
    this.requireId(allowlistIdentifierId);
    return this.request({
      method: "DELETE",
      path: joinPaths(basePath4, allowlistIdentifierId)
    });
  }
};
var basePath5 = "/api_keys";
var APIKeysAPI = class extends AbstractAPI {
  static {
    __name(this, "APIKeysAPI");
  }
  async list(queryParams) {
    return this.request({
      method: "GET",
      path: basePath5,
      queryParams
    });
  }
  async create(params) {
    return this.request({
      method: "POST",
      path: basePath5,
      bodyParams: params
    });
  }
  async get(apiKeyId) {
    this.requireId(apiKeyId);
    return this.request({
      method: "GET",
      path: joinPaths(basePath5, apiKeyId)
    });
  }
  async update(params) {
    const { apiKeyId, ...bodyParams } = params;
    this.requireId(apiKeyId);
    return this.request({
      method: "PATCH",
      path: joinPaths(basePath5, apiKeyId),
      bodyParams
    });
  }
  async delete(apiKeyId) {
    this.requireId(apiKeyId);
    return this.request({
      method: "DELETE",
      path: joinPaths(basePath5, apiKeyId)
    });
  }
  async revoke(params) {
    const { apiKeyId, revocationReason = null } = params;
    this.requireId(apiKeyId);
    return this.request({
      method: "POST",
      path: joinPaths(basePath5, apiKeyId, "revoke"),
      bodyParams: { revocationReason }
    });
  }
  async getSecret(apiKeyId) {
    this.requireId(apiKeyId);
    return this.request({
      method: "GET",
      path: joinPaths(basePath5, apiKeyId, "secret")
    });
  }
  async verify(secret) {
    return this.request({
      method: "POST",
      path: joinPaths(basePath5, "verify"),
      bodyParams: { secret }
    });
  }
  /**
   * @deprecated Use `verify()` instead. This method will be removed in the next major release.
   */
  async verifySecret(secret) {
    deprecated("apiKeys.verifySecret()", "Use `apiKeys.verify()` instead.");
    return this.verify(secret);
  }
};
var basePath6 = "/beta_features";
var BetaFeaturesAPI = class extends AbstractAPI {
  static {
    __name(this, "BetaFeaturesAPI");
  }
  /**
   * Change the domain of a production instance.
   *
   * Changing the domain requires updating the DNS records accordingly, deploying new SSL certificates,
   * updating your Social Connection's redirect URLs and setting the new keys in your code.
   *
   * @remarks
   * WARNING: Changing your domain will invalidate all current user sessions (i.e. users will be logged out).
   *          Also, while your application is being deployed, a small downtime is expected to occur.
   */
  async changeDomain(params) {
    return this.request({
      method: "POST",
      path: joinPaths(basePath6, "change_domain"),
      bodyParams: params
    });
  }
};
var basePath7 = "/blocklist_identifiers";
var BlocklistIdentifierAPI = class extends AbstractAPI {
  static {
    __name(this, "BlocklistIdentifierAPI");
  }
  async getBlocklistIdentifierList(params = {}) {
    return this.request({
      method: "GET",
      path: basePath7,
      queryParams: params
    });
  }
  async createBlocklistIdentifier(params) {
    return this.request({
      method: "POST",
      path: basePath7,
      bodyParams: params
    });
  }
  async deleteBlocklistIdentifier(blocklistIdentifierId) {
    this.requireId(blocklistIdentifierId);
    return this.request({
      method: "DELETE",
      path: joinPaths(basePath7, blocklistIdentifierId)
    });
  }
};
var basePath8 = "/clients";
var ClientAPI = class extends AbstractAPI {
  static {
    __name(this, "ClientAPI");
  }
  async getClientList(params = {}) {
    return this.request({
      method: "GET",
      path: basePath8,
      queryParams: { ...params, paginated: true }
    });
  }
  async getClient(clientId) {
    this.requireId(clientId);
    return this.request({
      method: "GET",
      path: joinPaths(basePath8, clientId)
    });
  }
  verifyClient(token) {
    return this.request({
      method: "POST",
      path: joinPaths(basePath8, "verify"),
      bodyParams: { token }
    });
  }
  async getHandshakePayload(queryParams) {
    return this.request({
      method: "GET",
      path: joinPaths(basePath8, "handshake_payload"),
      queryParams
    });
  }
};
var basePath9 = "/domains";
var DomainAPI = class extends AbstractAPI {
  static {
    __name(this, "DomainAPI");
  }
  async list() {
    return this.request({
      method: "GET",
      path: basePath9
    });
  }
  async add(params) {
    return this.request({
      method: "POST",
      path: basePath9,
      bodyParams: params
    });
  }
  async update(params) {
    const { domainId, ...bodyParams } = params;
    this.requireId(domainId);
    return this.request({
      method: "PATCH",
      path: joinPaths(basePath9, domainId),
      bodyParams
    });
  }
  /**
   * Deletes a satellite domain for the instance.
   * It is currently not possible to delete the instance's primary domain.
   */
  async delete(satelliteDomainId) {
    return this.deleteDomain(satelliteDomainId);
  }
  /**
   * @deprecated Use `delete` instead
   */
  async deleteDomain(satelliteDomainId) {
    this.requireId(satelliteDomainId);
    return this.request({
      method: "DELETE",
      path: joinPaths(basePath9, satelliteDomainId)
    });
  }
};
var basePath10 = "/email_addresses";
var EmailAddressAPI = class extends AbstractAPI {
  static {
    __name(this, "EmailAddressAPI");
  }
  async getEmailAddress(emailAddressId) {
    this.requireId(emailAddressId);
    return this.request({
      method: "GET",
      path: joinPaths(basePath10, emailAddressId)
    });
  }
  async createEmailAddress(params) {
    return this.request({
      method: "POST",
      path: basePath10,
      bodyParams: params
    });
  }
  async updateEmailAddress(emailAddressId, params = {}) {
    this.requireId(emailAddressId);
    return this.request({
      method: "PATCH",
      path: joinPaths(basePath10, emailAddressId),
      bodyParams: params
    });
  }
  async deleteEmailAddress(emailAddressId) {
    this.requireId(emailAddressId);
    return this.request({
      method: "DELETE",
      path: joinPaths(basePath10, emailAddressId)
    });
  }
};
var basePath11 = "/oauth_applications/access_tokens";
var IdPOAuthAccessTokenApi = class extends AbstractAPI {
  static {
    __name(this, "IdPOAuthAccessTokenApi");
  }
  async verify(accessToken) {
    return this.request({
      method: "POST",
      path: joinPaths(basePath11, "verify"),
      bodyParams: { access_token: accessToken }
    });
  }
  /**
   * @deprecated Use `verify()` instead. This method will be removed in the next major release.
   */
  async verifyAccessToken(accessToken) {
    deprecated("idPOAuthAccessToken.verifyAccessToken()", "Use `idPOAuthAccessToken.verify()` instead.");
    return this.verify(accessToken);
  }
};
var basePath12 = "/instance";
var InstanceAPI = class extends AbstractAPI {
  static {
    __name(this, "InstanceAPI");
  }
  async get() {
    return this.request({
      method: "GET",
      path: basePath12
    });
  }
  async update(params) {
    return this.request({
      method: "PATCH",
      path: basePath12,
      bodyParams: params
    });
  }
  async updateRestrictions(params) {
    return this.request({
      method: "PATCH",
      path: joinPaths(basePath12, "restrictions"),
      bodyParams: params
    });
  }
  async updateOrganizationSettings(params) {
    return this.request({
      method: "PATCH",
      path: joinPaths(basePath12, "organization_settings"),
      bodyParams: params
    });
  }
};
var basePath13 = "/invitations";
var InvitationAPI = class extends AbstractAPI {
  static {
    __name(this, "InvitationAPI");
  }
  async getInvitationList(params = {}) {
    return this.request({
      method: "GET",
      path: basePath13,
      queryParams: { ...params, paginated: true }
    });
  }
  async createInvitation(params) {
    return this.request({
      method: "POST",
      path: basePath13,
      bodyParams: params
    });
  }
  async createInvitationBulk(params) {
    return this.request({
      method: "POST",
      path: joinPaths(basePath13, "bulk"),
      bodyParams: params
    });
  }
  async revokeInvitation(invitationId) {
    this.requireId(invitationId);
    return this.request({
      method: "POST",
      path: joinPaths(basePath13, invitationId, "revoke")
    });
  }
};
var basePath14 = "/machines";
var MachineApi = class extends AbstractAPI {
  static {
    __name(this, "MachineApi");
  }
  async get(machineId) {
    this.requireId(machineId);
    return this.request({
      method: "GET",
      path: joinPaths(basePath14, machineId)
    });
  }
  async list(queryParams = {}) {
    return this.request({
      method: "GET",
      path: basePath14,
      queryParams
    });
  }
  async create(bodyParams) {
    return this.request({
      method: "POST",
      path: basePath14,
      bodyParams
    });
  }
  async update(params) {
    const { machineId, ...bodyParams } = params;
    this.requireId(machineId);
    return this.request({
      method: "PATCH",
      path: joinPaths(basePath14, machineId),
      bodyParams
    });
  }
  async delete(machineId) {
    this.requireId(machineId);
    return this.request({
      method: "DELETE",
      path: joinPaths(basePath14, machineId)
    });
  }
  async getSecretKey(machineId) {
    this.requireId(machineId);
    return this.request({
      method: "GET",
      path: joinPaths(basePath14, machineId, "secret_key")
    });
  }
  async rotateSecretKey(params) {
    const { machineId, previousTokenTtl } = params;
    this.requireId(machineId);
    return this.request({
      method: "POST",
      path: joinPaths(basePath14, machineId, "secret_key", "rotate"),
      bodyParams: {
        previousTokenTtl
      }
    });
  }
  /**
   * Creates a new machine scope, allowing the specified machine to access another machine.
   *
   * @param machineId - The ID of the machine that will have access to another machine.
   * @param toMachineId - The ID of the machine that will be scoped to the current machine.
   */
  async createScope(machineId, toMachineId) {
    this.requireId(machineId);
    return this.request({
      method: "POST",
      path: joinPaths(basePath14, machineId, "scopes"),
      bodyParams: {
        toMachineId
      }
    });
  }
  /**
   * Deletes a machine scope, removing access from one machine to another.
   *
   * @param machineId - The ID of the machine that has access to another machine.
   * @param otherMachineId - The ID of the machine that is being accessed.
   */
  async deleteScope(machineId, otherMachineId) {
    this.requireId(machineId);
    return this.request({
      method: "DELETE",
      path: joinPaths(basePath14, machineId, "scopes", otherMachineId)
    });
  }
};
var IdPOAuthAccessToken = class _IdPOAuthAccessToken {
  static {
    __name(this, "_IdPOAuthAccessToken");
  }
  constructor(id, clientId, type, subject, scopes, revoked, revocationReason, expired, expiration, createdAt, updatedAt) {
    this.id = id;
    this.clientId = clientId;
    this.type = type;
    this.subject = subject;
    this.scopes = scopes;
    this.revoked = revoked;
    this.revocationReason = revocationReason;
    this.expired = expired;
    this.expiration = expiration;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  static fromJSON(data) {
    return new _IdPOAuthAccessToken(
      data.id,
      data.client_id,
      data.type,
      data.subject,
      data.scopes,
      data.revoked,
      data.revocation_reason,
      data.expired,
      data.expiration,
      data.created_at,
      data.updated_at
    );
  }
  /**
   * Creates an IdPOAuthAccessToken from a JWT payload.
   * Maps standard JWT claims and OAuth-specific fields to token properties.
   */
  static fromJwtPayload(payload, clockSkewInMs = 5e3) {
    const oauthPayload = payload;
    return new _IdPOAuthAccessToken(
      oauthPayload.jti ?? "",
      oauthPayload.client_id ?? "",
      "oauth_token",
      payload.sub,
      oauthPayload.scp ?? oauthPayload.scope?.split(" ") ?? [],
      false,
      null,
      payload.exp * 1e3 <= Date.now() - clockSkewInMs,
      payload.exp,
      payload.iat,
      payload.iat
    );
  }
};
var M2MToken = class _M2MToken {
  static {
    __name(this, "_M2MToken");
  }
  constructor(id, subject, scopes, claims, revoked, revocationReason, expired, expiration, createdAt, updatedAt, token) {
    this.id = id;
    this.subject = subject;
    this.scopes = scopes;
    this.claims = claims;
    this.revoked = revoked;
    this.revocationReason = revocationReason;
    this.expired = expired;
    this.expiration = expiration;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.token = token;
  }
  static fromJSON(data) {
    return new _M2MToken(
      data.id,
      data.subject,
      data.scopes,
      data.claims,
      data.revoked,
      data.revocation_reason,
      data.expired,
      data.expiration,
      data.created_at,
      data.updated_at,
      data.token
    );
  }
  static fromJwtPayload(payload, clockSkewInMs = 5e3) {
    return new _M2MToken(
      payload.jti ?? "",
      // jti should always be present in Clerk-issued M2M JWTs
      payload.sub,
      payload.scopes?.split(" ") ?? payload.aud ?? [],
      null,
      false,
      null,
      payload.exp * 1e3 <= Date.now() - clockSkewInMs,
      payload.exp * 1e3,
      // milliseconds — expiration, converted from JWT exp claim
      payload.iat * 1e3,
      // milliseconds — createdAt, converted from JWT iat claim
      payload.iat * 1e3
      // milliseconds — updatedAt, no JWT equivalent; defaults to iat
    );
  }
};
var cache = {};
var lastUpdatedAt = 0;
function getFromCache(kid) {
  return cache[kid];
}
__name(getFromCache, "getFromCache");
function getCacheValues() {
  return Object.values(cache);
}
__name(getCacheValues, "getCacheValues");
function setInCache(cacheKey, jwk, shouldExpire = true) {
  cache[cacheKey] = jwk;
  lastUpdatedAt = shouldExpire ? Date.now() : -1;
}
__name(setInCache, "setInCache");
var PEM_HEADER = "-----BEGIN PUBLIC KEY-----";
var PEM_TRAILER = "-----END PUBLIC KEY-----";
var RSA_PREFIX = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA";
var RSA_SUFFIX = "IDAQAB";
function loadClerkJwkFromPem(params) {
  const { kid, pem } = params;
  const prefixedKid = `local-${kid}`;
  const cachedJwk = getFromCache(prefixedKid);
  if (cachedJwk) {
    return cachedJwk;
  }
  if (!pem) {
    throw new TokenVerificationError({
      action: TokenVerificationErrorAction.SetClerkJWTKey,
      message: "Missing local JWK.",
      reason: TokenVerificationErrorReason.LocalJWKMissing
    });
  }
  const modulus = pem.replace(/\r\n|\n|\r/g, "").replace(PEM_HEADER, "").replace(PEM_TRAILER, "").replace(RSA_PREFIX, "").replace(RSA_SUFFIX, "").replace(/\+/g, "-").replace(/\//g, "_");
  const jwk = { kid: prefixedKid, kty: "RSA", alg: "RS256", n: modulus, e: "AQAB" };
  setInCache(prefixedKid, jwk, false);
  return jwk;
}
__name(loadClerkJwkFromPem, "loadClerkJwkFromPem");
async function loadClerkJWKFromRemote(params) {
  const { secretKey, apiUrl = API_URL, apiVersion = API_VERSION, kid, skipJwksCache } = params;
  if (skipJwksCache || cacheHasExpired() || !getFromCache(kid)) {
    if (!secretKey) {
      throw new TokenVerificationError({
        action: TokenVerificationErrorAction.ContactSupport,
        message: "Failed to load JWKS from Clerk Backend or Frontend API.",
        reason: TokenVerificationErrorReason.RemoteJWKFailedToLoad
      });
    }
    const fetcher = /* @__PURE__ */ __name(() => fetchJWKSFromBAPI(apiUrl, secretKey, apiVersion), "fetcher");
    const { keys } = await retry(fetcher);
    if (!keys || !keys.length) {
      throw new TokenVerificationError({
        action: TokenVerificationErrorAction.ContactSupport,
        message: "The JWKS endpoint did not contain any signing keys. Contact support@clerk.com.",
        reason: TokenVerificationErrorReason.RemoteJWKFailedToLoad
      });
    }
    keys.forEach((key) => setInCache(key.kid, key));
  }
  const jwk = getFromCache(kid);
  if (!jwk) {
    const cacheValues = getCacheValues();
    const jwkKeys = cacheValues.map((jwk2) => jwk2.kid).sort().join(", ");
    throw new TokenVerificationError({
      action: `Go to your Dashboard and validate your secret and public keys are correct. ${TokenVerificationErrorAction.ContactSupport} if the issue persists.`,
      message: `Unable to find a signing key in JWKS that matches the kid='${kid}' of the provided session token. Please make sure that the __session cookie or the HTTP authorization header contain a Clerk-generated session JWT. The following kid is available: ${jwkKeys}`,
      reason: TokenVerificationErrorReason.JWKKidMismatch
    });
  }
  return jwk;
}
__name(loadClerkJWKFromRemote, "loadClerkJWKFromRemote");
async function fetchJWKSFromBAPI(apiUrl, key, apiVersion) {
  if (!key) {
    throw new TokenVerificationError({
      action: TokenVerificationErrorAction.SetClerkSecretKey,
      message: "Missing Clerk Secret Key or API Key. Go to https://dashboard.clerk.com and get your key for your instance.",
      reason: TokenVerificationErrorReason.RemoteJWKFailedToLoad
    });
  }
  const url = new URL(apiUrl);
  url.pathname = joinPaths(url.pathname, apiVersion, "/jwks");
  const response = await runtime.fetch(url.href, {
    headers: {
      Authorization: `Bearer ${key}`,
      "Clerk-API-Version": SUPPORTED_BAPI_VERSION,
      "Content-Type": "application/json",
      "User-Agent": USER_AGENT
    }
  });
  if (!response.ok) {
    const json = await response.json();
    const invalidSecretKeyError = getErrorObjectByCode(json?.errors, TokenVerificationErrorCode.InvalidSecretKey);
    if (invalidSecretKeyError) {
      const reason = TokenVerificationErrorReason.InvalidSecretKey;
      throw new TokenVerificationError({
        action: TokenVerificationErrorAction.ContactSupport,
        message: invalidSecretKeyError.message,
        reason
      });
    }
    throw new TokenVerificationError({
      action: TokenVerificationErrorAction.ContactSupport,
      message: `Error loading Clerk JWKS from ${url.href} with code=${response.status}`,
      reason: TokenVerificationErrorReason.RemoteJWKFailedToLoad
    });
  }
  return response.json();
}
__name(fetchJWKSFromBAPI, "fetchJWKSFromBAPI");
function cacheHasExpired() {
  if (lastUpdatedAt === -1) {
    return false;
  }
  const isExpired = Date.now() - lastUpdatedAt >= MAX_CACHE_LAST_UPDATED_AT_SECONDS * 1e3;
  if (isExpired) {
    cache = {};
  }
  return isExpired;
}
__name(cacheHasExpired, "cacheHasExpired");
var getErrorObjectByCode = /* @__PURE__ */ __name((errors, code) => {
  if (!errors) {
    return null;
  }
  return errors.find((err) => err.code === code);
}, "getErrorObjectByCode");
var M2M_TOKEN_PREFIX = "mt_";
var M2M_SUBJECT_PREFIX = "mch_";
var OAUTH_TOKEN_PREFIX = "oat_";
var API_KEY_PREFIX = "ak_";
var MACHINE_TOKEN_PREFIXES = [M2M_TOKEN_PREFIX, OAUTH_TOKEN_PREFIX, API_KEY_PREFIX];
var JwtFormatRegExp = /^[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+$/;
function isJwtFormat(token) {
  return JwtFormatRegExp.test(token);
}
__name(isJwtFormat, "isJwtFormat");
var OAUTH_ACCESS_TOKEN_TYPES = ["at+jwt", "application/at+jwt"];
function isOAuthJwt(token) {
  if (!isJwtFormat(token)) {
    return false;
  }
  try {
    const { data, errors } = decodeJwt(token);
    return !errors && !!data && OAUTH_ACCESS_TOKEN_TYPES.includes(data.header.typ);
  } catch {
    return false;
  }
}
__name(isOAuthJwt, "isOAuthJwt");
function isM2MJwt(token) {
  if (!isJwtFormat(token)) {
    return false;
  }
  try {
    const { data, errors } = decodeJwt(token);
    return !errors && !!data && typeof data.payload.sub === "string" && data.payload.sub.startsWith(M2M_SUBJECT_PREFIX);
  } catch {
    return false;
  }
}
__name(isM2MJwt, "isM2MJwt");
function isMachineJwt(token) {
  return isOAuthJwt(token) || isM2MJwt(token);
}
__name(isMachineJwt, "isMachineJwt");
function isMachineTokenByPrefix(token) {
  return MACHINE_TOKEN_PREFIXES.some((prefix) => token.startsWith(prefix));
}
__name(isMachineTokenByPrefix, "isMachineTokenByPrefix");
function isMachineToken(token) {
  return isMachineTokenByPrefix(token) || isOAuthJwt(token) || isM2MJwt(token);
}
__name(isMachineToken, "isMachineToken");
function getMachineTokenType(token) {
  if (token.startsWith(M2M_TOKEN_PREFIX) || isM2MJwt(token)) {
    return TokenType.M2MToken;
  }
  if (token.startsWith(OAUTH_TOKEN_PREFIX) || isOAuthJwt(token)) {
    return TokenType.OAuthToken;
  }
  if (token.startsWith(API_KEY_PREFIX)) {
    return TokenType.ApiKey;
  }
  throw new Error("Unknown machine token type");
}
__name(getMachineTokenType, "getMachineTokenType");
var isTokenTypeAccepted = /* @__PURE__ */ __name((tokenType, acceptsToken) => {
  if (!tokenType) {
    return false;
  }
  if (acceptsToken === "any") {
    return true;
  }
  const tokenTypes = Array.isArray(acceptsToken) ? acceptsToken : [acceptsToken];
  return tokenTypes.includes(tokenType);
}, "isTokenTypeAccepted");
var MACHINE_TOKEN_TYPES = /* @__PURE__ */ new Set([TokenType.ApiKey, TokenType.M2MToken, TokenType.OAuthToken]);
function isMachineTokenType(type) {
  return MACHINE_TOKEN_TYPES.has(type);
}
__name(isMachineTokenType, "isMachineTokenType");
async function resolveKeyAndVerifyJwt(token, kid, options, headerType) {
  try {
    let key;
    if (options.jwtKey) {
      key = loadClerkJwkFromPem({ kid, pem: options.jwtKey });
    } else if (options.secretKey) {
      key = await loadClerkJWKFromRemote({ ...options, kid });
    } else {
      return {
        error: new MachineTokenVerificationError({
          action: TokenVerificationErrorAction.SetClerkJWTKey,
          message: "Failed to resolve JWK during verification.",
          code: MachineTokenVerificationErrorCode.TokenVerificationFailed
        })
      };
    }
    const { data: payload, errors: verifyErrors } = await verifyJwt(token, {
      ...options,
      key,
      ...headerType ? { headerType } : {}
    });
    if (verifyErrors) {
      return {
        error: new MachineTokenVerificationError({
          code: MachineTokenVerificationErrorCode.TokenVerificationFailed,
          message: verifyErrors[0].message
        })
      };
    }
    return { payload };
  } catch (error) {
    return {
      error: new MachineTokenVerificationError({
        code: MachineTokenVerificationErrorCode.TokenVerificationFailed,
        message: error.message
      })
    };
  }
}
__name(resolveKeyAndVerifyJwt, "resolveKeyAndVerifyJwt");
async function verifyM2MJwt(token, decoded, options) {
  const result = await resolveKeyAndVerifyJwt(token, decoded.header.kid, options);
  if ("error" in result) {
    return { data: void 0, tokenType: TokenType.M2MToken, errors: [result.error] };
  }
  return {
    data: M2MToken.fromJwtPayload(result.payload, options.clockSkewInMs),
    tokenType: TokenType.M2MToken,
    errors: void 0
  };
}
__name(verifyM2MJwt, "verifyM2MJwt");
async function verifyOAuthJwt(token, decoded, options) {
  const result = await resolveKeyAndVerifyJwt(token, decoded.header.kid, options, OAUTH_ACCESS_TOKEN_TYPES);
  if ("error" in result) {
    return { data: void 0, tokenType: TokenType.OAuthToken, errors: [result.error] };
  }
  return {
    data: IdPOAuthAccessToken.fromJwtPayload(result.payload, options.clockSkewInMs),
    tokenType: TokenType.OAuthToken,
    errors: void 0
  };
}
__name(verifyOAuthJwt, "verifyOAuthJwt");
var basePath15 = "/m2m_tokens";
var _verifyOptions;
var _M2MTokenApi_instances;
var createRequestOptions_fn;
var verifyJwtFormat_fn;
var M2MTokenApi = class extends AbstractAPI {
  static {
    __name(this, "M2MTokenApi");
  }
  /**
   * @param verifyOptions - JWT verification options (secretKey, apiUrl, etc.).
   * Passed explicitly because BuildRequestOptions are captured inside the buildRequest closure
   * and are not accessible from the RequestFunction itself.
   */
  constructor(request, verifyOptions = {}) {
    super(request);
    __privateAdd(this, _M2MTokenApi_instances);
    __privateAdd(this, _verifyOptions);
    __privateSet(this, _verifyOptions, verifyOptions);
  }
  async list(queryParams) {
    return this.request({
      method: "GET",
      path: basePath15,
      queryParams
    });
  }
  async createToken(params) {
    const { claims = null, machineSecretKey, secondsUntilExpiration = null, tokenFormat = "opaque" } = params || {};
    const requestOptions = __privateMethod(this, _M2MTokenApi_instances, createRequestOptions_fn).call(this, {
      method: "POST",
      path: basePath15,
      bodyParams: {
        secondsUntilExpiration,
        claims,
        tokenFormat
      }
    }, machineSecretKey);
    return this.request(requestOptions);
  }
  async revokeToken(params) {
    const { m2mTokenId, revocationReason = null, machineSecretKey } = params;
    this.requireId(m2mTokenId);
    const requestOptions = __privateMethod(this, _M2MTokenApi_instances, createRequestOptions_fn).call(this, {
      method: "POST",
      path: joinPaths(basePath15, m2mTokenId, "revoke"),
      bodyParams: {
        revocationReason
      }
    }, machineSecretKey);
    return this.request(requestOptions);
  }
  async verify(params) {
    const { token, machineSecretKey } = params;
    if (isM2MJwt(token)) {
      return __privateMethod(this, _M2MTokenApi_instances, verifyJwtFormat_fn).call(this, token);
    }
    const requestOptions = __privateMethod(this, _M2MTokenApi_instances, createRequestOptions_fn).call(this, {
      method: "POST",
      path: joinPaths(basePath15, "verify"),
      bodyParams: { token }
    }, machineSecretKey);
    return this.request(requestOptions);
  }
  /**
   * @deprecated Use `verify()` instead. This method will be removed in the next major release.
   */
  async verifyToken(params) {
    deprecated("m2m.verifyToken()", "Use `m2m.verify()` instead.");
    return this.verify(params);
  }
};
_verifyOptions = /* @__PURE__ */ new WeakMap();
_M2MTokenApi_instances = /* @__PURE__ */ new WeakSet();
createRequestOptions_fn = /* @__PURE__ */ __name(function(options, machineSecretKey) {
  if (machineSecretKey) {
    return {
      ...options,
      headerParams: {
        ...options.headerParams,
        Authorization: `Bearer ${machineSecretKey}`
      }
    };
  }
  return options;
}, "createRequestOptions_fn");
verifyJwtFormat_fn = /* @__PURE__ */ __name(async function(token) {
  let decoded;
  try {
    const { data, errors } = decodeJwt(token);
    if (errors) {
      throw errors[0];
    }
    decoded = data;
  } catch (e) {
    throw new MachineTokenVerificationError({
      code: MachineTokenVerificationErrorCode.TokenInvalid,
      message: e.message
    });
  }
  const result = await verifyM2MJwt(token, decoded, __privateGet(this, _verifyOptions));
  if (result.errors) {
    throw result.errors[0];
  }
  return result.data;
}, "verifyJwtFormat_fn");
var basePath16 = "/jwks";
var JwksAPI = class extends AbstractAPI {
  static {
    __name(this, "JwksAPI");
  }
  async getJwks() {
    return this.request({
      method: "GET",
      path: basePath16
    });
  }
};
var basePath17 = "/jwt_templates";
var JwtTemplatesApi = class extends AbstractAPI {
  static {
    __name(this, "JwtTemplatesApi");
  }
  async list(params = {}) {
    return this.request({
      method: "GET",
      path: basePath17,
      queryParams: { ...params, paginated: true }
    });
  }
  async get(templateId) {
    this.requireId(templateId);
    return this.request({
      method: "GET",
      path: joinPaths(basePath17, templateId)
    });
  }
  async create(params) {
    return this.request({
      method: "POST",
      path: basePath17,
      bodyParams: params
    });
  }
  async update(params) {
    const { templateId, ...bodyParams } = params;
    this.requireId(templateId);
    return this.request({
      method: "PATCH",
      path: joinPaths(basePath17, templateId),
      bodyParams
    });
  }
  async delete(templateId) {
    this.requireId(templateId);
    return this.request({
      method: "DELETE",
      path: joinPaths(basePath17, templateId)
    });
  }
};
var basePath18 = "/organizations";
var OrganizationAPI = class extends AbstractAPI {
  static {
    __name(this, "OrganizationAPI");
  }
  async getOrganizationList(params) {
    return this.request({
      method: "GET",
      path: basePath18,
      queryParams: params
    });
  }
  async createOrganization(params) {
    return this.request({
      method: "POST",
      path: basePath18,
      bodyParams: params
    });
  }
  async getOrganization(params) {
    const { includeMembersCount } = params;
    const organizationIdOrSlug = "organizationId" in params ? params.organizationId : params.slug;
    this.requireId(organizationIdOrSlug);
    return this.request({
      method: "GET",
      path: joinPaths(basePath18, organizationIdOrSlug),
      queryParams: {
        includeMembersCount
      }
    });
  }
  async updateOrganization(organizationId, params) {
    this.requireId(organizationId);
    return this.request({
      method: "PATCH",
      path: joinPaths(basePath18, organizationId),
      bodyParams: params
    });
  }
  async updateOrganizationLogo(organizationId, params) {
    this.requireId(organizationId);
    const formData = new runtime.FormData();
    formData.append("file", params?.file);
    if (params?.uploaderUserId) {
      formData.append("uploader_user_id", params?.uploaderUserId);
    }
    return this.request({
      method: "PUT",
      path: joinPaths(basePath18, organizationId, "logo"),
      formData
    });
  }
  async deleteOrganizationLogo(organizationId) {
    this.requireId(organizationId);
    return this.request({
      method: "DELETE",
      path: joinPaths(basePath18, organizationId, "logo")
    });
  }
  async updateOrganizationMetadata(organizationId, params) {
    this.requireId(organizationId);
    return this.request({
      method: "PATCH",
      path: joinPaths(basePath18, organizationId, "metadata"),
      bodyParams: params
    });
  }
  async deleteOrganization(organizationId) {
    return this.request({
      method: "DELETE",
      path: joinPaths(basePath18, organizationId)
    });
  }
  async getOrganizationMembershipList(params) {
    const { organizationId, ...queryParams } = params;
    this.requireId(organizationId);
    return this.request({
      method: "GET",
      path: joinPaths(basePath18, organizationId, "memberships"),
      queryParams
    });
  }
  async getInstanceOrganizationMembershipList(params) {
    return this.request({
      method: "GET",
      path: "/organization_memberships",
      queryParams: params
    });
  }
  async createOrganizationMembership(params) {
    const { organizationId, ...bodyParams } = params;
    this.requireId(organizationId);
    return this.request({
      method: "POST",
      path: joinPaths(basePath18, organizationId, "memberships"),
      bodyParams
    });
  }
  async updateOrganizationMembership(params) {
    const { organizationId, userId, ...bodyParams } = params;
    this.requireId(organizationId);
    return this.request({
      method: "PATCH",
      path: joinPaths(basePath18, organizationId, "memberships", userId),
      bodyParams
    });
  }
  async updateOrganizationMembershipMetadata(params) {
    const { organizationId, userId, ...bodyParams } = params;
    return this.request({
      method: "PATCH",
      path: joinPaths(basePath18, organizationId, "memberships", userId, "metadata"),
      bodyParams
    });
  }
  async deleteOrganizationMembership(params) {
    const { organizationId, userId } = params;
    this.requireId(organizationId);
    return this.request({
      method: "DELETE",
      path: joinPaths(basePath18, organizationId, "memberships", userId)
    });
  }
  async getOrganizationInvitationList(params) {
    const { organizationId, ...queryParams } = params;
    this.requireId(organizationId);
    return this.request({
      method: "GET",
      path: joinPaths(basePath18, organizationId, "invitations"),
      queryParams
    });
  }
  async createOrganizationInvitation(params) {
    const { organizationId, ...bodyParams } = params;
    this.requireId(organizationId);
    return this.request({
      method: "POST",
      path: joinPaths(basePath18, organizationId, "invitations"),
      bodyParams
    });
  }
  async createOrganizationInvitationBulk(organizationId, params) {
    this.requireId(organizationId);
    return this.request({
      method: "POST",
      path: joinPaths(basePath18, organizationId, "invitations", "bulk"),
      bodyParams: params
    });
  }
  async getOrganizationInvitation(params) {
    const { organizationId, invitationId } = params;
    this.requireId(organizationId);
    this.requireId(invitationId);
    return this.request({
      method: "GET",
      path: joinPaths(basePath18, organizationId, "invitations", invitationId)
    });
  }
  async revokeOrganizationInvitation(params) {
    const { organizationId, invitationId, ...bodyParams } = params;
    this.requireId(organizationId);
    return this.request({
      method: "POST",
      path: joinPaths(basePath18, organizationId, "invitations", invitationId, "revoke"),
      bodyParams
    });
  }
  async getOrganizationDomainList(params) {
    const { organizationId, ...queryParams } = params;
    this.requireId(organizationId);
    return this.request({
      method: "GET",
      path: joinPaths(basePath18, organizationId, "domains"),
      queryParams
    });
  }
  async createOrganizationDomain(params) {
    const { organizationId, ...bodyParams } = params;
    this.requireId(organizationId);
    return this.request({
      method: "POST",
      path: joinPaths(basePath18, organizationId, "domains"),
      bodyParams: {
        ...bodyParams,
        verified: bodyParams.verified ?? true
      }
    });
  }
  async updateOrganizationDomain(params) {
    const { organizationId, domainId, ...bodyParams } = params;
    this.requireId(organizationId);
    this.requireId(domainId);
    return this.request({
      method: "PATCH",
      path: joinPaths(basePath18, organizationId, "domains", domainId),
      bodyParams
    });
  }
  async deleteOrganizationDomain(params) {
    const { organizationId, domainId } = params;
    this.requireId(organizationId);
    this.requireId(domainId);
    return this.request({
      method: "DELETE",
      path: joinPaths(basePath18, organizationId, "domains", domainId)
    });
  }
};
var basePath19 = "/oauth_applications";
var OAuthApplicationsApi = class extends AbstractAPI {
  static {
    __name(this, "OAuthApplicationsApi");
  }
  async list(params = {}) {
    return this.request({
      method: "GET",
      path: basePath19,
      queryParams: params
    });
  }
  async get(oauthApplicationId) {
    this.requireId(oauthApplicationId);
    return this.request({
      method: "GET",
      path: joinPaths(basePath19, oauthApplicationId)
    });
  }
  async create(params) {
    return this.request({
      method: "POST",
      path: basePath19,
      bodyParams: params
    });
  }
  async update(params) {
    const { oauthApplicationId, ...bodyParams } = params;
    this.requireId(oauthApplicationId);
    return this.request({
      method: "PATCH",
      path: joinPaths(basePath19, oauthApplicationId),
      bodyParams
    });
  }
  async delete(oauthApplicationId) {
    this.requireId(oauthApplicationId);
    return this.request({
      method: "DELETE",
      path: joinPaths(basePath19, oauthApplicationId)
    });
  }
  async rotateSecret(oauthApplicationId) {
    this.requireId(oauthApplicationId);
    return this.request({
      method: "POST",
      path: joinPaths(basePath19, oauthApplicationId, "rotate_secret")
    });
  }
};
var basePath20 = "/phone_numbers";
var PhoneNumberAPI = class extends AbstractAPI {
  static {
    __name(this, "PhoneNumberAPI");
  }
  async getPhoneNumber(phoneNumberId) {
    this.requireId(phoneNumberId);
    return this.request({
      method: "GET",
      path: joinPaths(basePath20, phoneNumberId)
    });
  }
  async createPhoneNumber(params) {
    return this.request({
      method: "POST",
      path: basePath20,
      bodyParams: params
    });
  }
  async updatePhoneNumber(phoneNumberId, params = {}) {
    this.requireId(phoneNumberId);
    return this.request({
      method: "PATCH",
      path: joinPaths(basePath20, phoneNumberId),
      bodyParams: params
    });
  }
  async deletePhoneNumber(phoneNumberId) {
    this.requireId(phoneNumberId);
    return this.request({
      method: "DELETE",
      path: joinPaths(basePath20, phoneNumberId)
    });
  }
};
var basePath21 = "/proxy_checks";
var ProxyCheckAPI = class extends AbstractAPI {
  static {
    __name(this, "ProxyCheckAPI");
  }
  async verify(params) {
    return this.request({
      method: "POST",
      path: basePath21,
      bodyParams: params
    });
  }
};
var basePath22 = "/redirect_urls";
var RedirectUrlAPI = class extends AbstractAPI {
  static {
    __name(this, "RedirectUrlAPI");
  }
  async getRedirectUrlList() {
    return this.request({
      method: "GET",
      path: basePath22,
      queryParams: { paginated: true }
    });
  }
  async getRedirectUrl(redirectUrlId) {
    this.requireId(redirectUrlId);
    return this.request({
      method: "GET",
      path: joinPaths(basePath22, redirectUrlId)
    });
  }
  async createRedirectUrl(params) {
    return this.request({
      method: "POST",
      path: basePath22,
      bodyParams: params
    });
  }
  async deleteRedirectUrl(redirectUrlId) {
    this.requireId(redirectUrlId);
    return this.request({
      method: "DELETE",
      path: joinPaths(basePath22, redirectUrlId)
    });
  }
};
var basePath23 = "/saml_connections";
var SamlConnectionAPI = class extends AbstractAPI {
  static {
    __name(this, "SamlConnectionAPI");
  }
  async getSamlConnectionList(params = {}) {
    return this.request({
      method: "GET",
      path: basePath23,
      queryParams: params
    });
  }
  async createSamlConnection(params) {
    return this.request({
      method: "POST",
      path: basePath23,
      bodyParams: params,
      options: {
        deepSnakecaseBodyParamKeys: true
      }
    });
  }
  async getSamlConnection(samlConnectionId) {
    this.requireId(samlConnectionId);
    return this.request({
      method: "GET",
      path: joinPaths(basePath23, samlConnectionId)
    });
  }
  async updateSamlConnection(samlConnectionId, params = {}) {
    this.requireId(samlConnectionId);
    return this.request({
      method: "PATCH",
      path: joinPaths(basePath23, samlConnectionId),
      bodyParams: params,
      options: {
        deepSnakecaseBodyParamKeys: true
      }
    });
  }
  async deleteSamlConnection(samlConnectionId) {
    this.requireId(samlConnectionId);
    return this.request({
      method: "DELETE",
      path: joinPaths(basePath23, samlConnectionId)
    });
  }
};
var basePath24 = "/sessions";
var SessionAPI = class extends AbstractAPI {
  static {
    __name(this, "SessionAPI");
  }
  async getSessionList(params = {}) {
    return this.request({
      method: "GET",
      path: basePath24,
      queryParams: { ...params, paginated: true }
    });
  }
  async getSession(sessionId) {
    this.requireId(sessionId);
    return this.request({
      method: "GET",
      path: joinPaths(basePath24, sessionId)
    });
  }
  async createSession(params) {
    return this.request({
      method: "POST",
      path: basePath24,
      bodyParams: params
    });
  }
  async revokeSession(sessionId) {
    this.requireId(sessionId);
    return this.request({
      method: "POST",
      path: joinPaths(basePath24, sessionId, "revoke")
    });
  }
  async verifySession(sessionId, token) {
    this.requireId(sessionId);
    return this.request({
      method: "POST",
      path: joinPaths(basePath24, sessionId, "verify"),
      bodyParams: { token }
    });
  }
  /**
   * Retrieves a session token or generates a JWT using a specified template.
   *
   * @param sessionId - The ID of the session for which to generate the token
   * @param template - Optional name of the JWT template configured in the Clerk Dashboard.
   * @param expiresInSeconds - Optional expiration time for the token in seconds.
   *   If not provided, uses the default expiration.
   *
   * @returns A promise that resolves to the generated token
   *
   * @throws {Error} When sessionId is invalid or empty
   */
  async getToken(sessionId, template, expiresInSeconds) {
    this.requireId(sessionId);
    const path = template ? joinPaths(basePath24, sessionId, "tokens", template) : joinPaths(basePath24, sessionId, "tokens");
    const requestOptions = {
      method: "POST",
      path
    };
    if (expiresInSeconds !== void 0) {
      requestOptions.bodyParams = { expires_in_seconds: expiresInSeconds };
    }
    return this.request(requestOptions);
  }
  async refreshSession(sessionId, params) {
    this.requireId(sessionId);
    const { suffixed_cookies, ...restParams } = params;
    return this.request({
      method: "POST",
      path: joinPaths(basePath24, sessionId, "refresh"),
      bodyParams: restParams,
      queryParams: { suffixed_cookies }
    });
  }
};
var basePath25 = "/sign_in_tokens";
var SignInTokenAPI = class extends AbstractAPI {
  static {
    __name(this, "SignInTokenAPI");
  }
  async createSignInToken(params) {
    return this.request({
      method: "POST",
      path: basePath25,
      bodyParams: params
    });
  }
  async revokeSignInToken(signInTokenId) {
    this.requireId(signInTokenId);
    return this.request({
      method: "POST",
      path: joinPaths(basePath25, signInTokenId, "revoke")
    });
  }
};
var basePath26 = "/sign_ups";
var SignUpAPI = class extends AbstractAPI {
  static {
    __name(this, "SignUpAPI");
  }
  async get(signUpAttemptId) {
    this.requireId(signUpAttemptId);
    return this.request({
      method: "GET",
      path: joinPaths(basePath26, signUpAttemptId)
    });
  }
  async update(params) {
    const { signUpAttemptId, ...bodyParams } = params;
    return this.request({
      method: "PATCH",
      path: joinPaths(basePath26, signUpAttemptId),
      bodyParams
    });
  }
};
var basePath27 = "/testing_tokens";
var TestingTokenAPI = class extends AbstractAPI {
  static {
    __name(this, "TestingTokenAPI");
  }
  async createTestingToken() {
    return this.request({
      method: "POST",
      path: basePath27
    });
  }
};
var basePath28 = "/users";
var UserAPI = class extends AbstractAPI {
  static {
    __name(this, "UserAPI");
  }
  async getUserList(params = {}) {
    const { limit, offset, orderBy, ...userCountParams } = params;
    const [data, totalCount] = await Promise.all([
      this.request({
        method: "GET",
        path: basePath28,
        queryParams: params
      }),
      this.getCount(userCountParams)
    ]);
    return { data, totalCount };
  }
  async getUser(userId) {
    this.requireId(userId);
    return this.request({
      method: "GET",
      path: joinPaths(basePath28, userId)
    });
  }
  async createUser(params) {
    return this.request({
      method: "POST",
      path: basePath28,
      bodyParams: params
    });
  }
  async updateUser(userId, params = {}) {
    this.requireId(userId);
    return this.request({
      method: "PATCH",
      path: joinPaths(basePath28, userId),
      bodyParams: params
    });
  }
  async updateUserProfileImage(userId, params) {
    this.requireId(userId);
    const formData = new runtime.FormData();
    formData.append("file", params?.file);
    return this.request({
      method: "POST",
      path: joinPaths(basePath28, userId, "profile_image"),
      formData
    });
  }
  async updateUserMetadata(userId, params) {
    this.requireId(userId);
    return this.request({
      method: "PATCH",
      path: joinPaths(basePath28, userId, "metadata"),
      bodyParams: params
    });
  }
  async deleteUser(userId) {
    this.requireId(userId);
    return this.request({
      method: "DELETE",
      path: joinPaths(basePath28, userId)
    });
  }
  async getCount(params = {}) {
    return this.request({
      method: "GET",
      path: joinPaths(basePath28, "count"),
      queryParams: params
    });
  }
  async getUserOauthAccessToken(userId, provider) {
    this.requireId(userId);
    const hasPrefix = provider.startsWith("oauth_");
    const _provider = hasPrefix ? provider : `oauth_${provider}`;
    if (hasPrefix) {
      deprecated(
        "getUserOauthAccessToken(userId, provider)",
        "Remove the `oauth_` prefix from the `provider` argument."
      );
    }
    return this.request({
      method: "GET",
      path: joinPaths(basePath28, userId, "oauth_access_tokens", _provider),
      queryParams: { paginated: true }
    });
  }
  async disableUserMFA(userId) {
    this.requireId(userId);
    return this.request({
      method: "DELETE",
      path: joinPaths(basePath28, userId, "mfa")
    });
  }
  async getOrganizationMembershipList(params) {
    const { userId, limit, offset } = params;
    this.requireId(userId);
    return this.request({
      method: "GET",
      path: joinPaths(basePath28, userId, "organization_memberships"),
      queryParams: { limit, offset }
    });
  }
  async getOrganizationInvitationList(params) {
    const { userId, ...queryParams } = params;
    this.requireId(userId);
    return this.request({
      method: "GET",
      path: joinPaths(basePath28, userId, "organization_invitations"),
      queryParams
    });
  }
  async verifyPassword(params) {
    const { userId, password } = params;
    this.requireId(userId);
    return this.request({
      method: "POST",
      path: joinPaths(basePath28, userId, "verify_password"),
      bodyParams: { password }
    });
  }
  async verifyTOTP(params) {
    const { userId, code } = params;
    this.requireId(userId);
    return this.request({
      method: "POST",
      path: joinPaths(basePath28, userId, "verify_totp"),
      bodyParams: { code }
    });
  }
  async banUser(userId) {
    this.requireId(userId);
    return this.request({
      method: "POST",
      path: joinPaths(basePath28, userId, "ban")
    });
  }
  async unbanUser(userId) {
    this.requireId(userId);
    return this.request({
      method: "POST",
      path: joinPaths(basePath28, userId, "unban")
    });
  }
  async lockUser(userId) {
    this.requireId(userId);
    return this.request({
      method: "POST",
      path: joinPaths(basePath28, userId, "lock")
    });
  }
  async unlockUser(userId) {
    this.requireId(userId);
    return this.request({
      method: "POST",
      path: joinPaths(basePath28, userId, "unlock")
    });
  }
  async deleteUserProfileImage(userId) {
    this.requireId(userId);
    return this.request({
      method: "DELETE",
      path: joinPaths(basePath28, userId, "profile_image")
    });
  }
  async deleteUserPasskey(params) {
    this.requireId(params.userId);
    this.requireId(params.passkeyIdentificationId);
    return this.request({
      method: "DELETE",
      path: joinPaths(basePath28, params.userId, "passkeys", params.passkeyIdentificationId)
    });
  }
  async deleteUserWeb3Wallet(params) {
    this.requireId(params.userId);
    this.requireId(params.web3WalletIdentificationId);
    return this.request({
      method: "DELETE",
      path: joinPaths(basePath28, params.userId, "web3_wallets", params.web3WalletIdentificationId)
    });
  }
  async deleteUserExternalAccount(params) {
    this.requireId(params.userId);
    this.requireId(params.externalAccountId);
    return this.request({
      method: "DELETE",
      path: joinPaths(basePath28, params.userId, "external_accounts", params.externalAccountId)
    });
  }
  async deleteUserBackupCodes(userId) {
    this.requireId(userId);
    return this.request({
      method: "DELETE",
      path: joinPaths(basePath28, userId, "backup_code")
    });
  }
  async deleteUserTOTP(userId) {
    this.requireId(userId);
    return this.request({
      method: "DELETE",
      path: joinPaths(basePath28, userId, "totp")
    });
  }
  async setPasswordCompromised(userId, params = {
    revokeAllSessions: false
  }) {
    this.requireId(userId);
    return this.request({
      method: "POST",
      path: joinPaths(basePath28, userId, "password", "set_compromised"),
      bodyParams: params
    });
  }
  async unsetPasswordCompromised(userId) {
    this.requireId(userId);
    return this.request({
      method: "POST",
      path: joinPaths(basePath28, userId, "password", "unset_compromised")
    });
  }
};
var basePath29 = "/waitlist_entries";
var WaitlistEntryAPI = class extends AbstractAPI {
  static {
    __name(this, "WaitlistEntryAPI");
  }
  /**
   * List waitlist entries.
   * @param params Optional parameters (e.g., `query`, `status`, `orderBy`).
   */
  async list(params = {}) {
    return this.request({
      method: "GET",
      path: basePath29,
      queryParams: params
    });
  }
  /**
   * Create a waitlist entry.
   * @param params The parameters for creating a waitlist entry.
   */
  async create(params) {
    return this.request({
      method: "POST",
      path: basePath29,
      bodyParams: params
    });
  }
  /**
   * Bulk create waitlist entries.
   * @param params An array of parameters for creating waitlist entries.
   */
  async createBulk(params) {
    return this.request({
      method: "POST",
      path: joinPaths(basePath29, "bulk"),
      bodyParams: params
    });
  }
  /**
   * Invite a waitlist entry.
   * @param id The waitlist entry ID.
   * @param params Optional parameters (e.g., `ignoreExisting`).
   */
  async invite(id, params = {}) {
    this.requireId(id);
    return this.request({
      method: "POST",
      path: joinPaths(basePath29, id, "invite"),
      bodyParams: params
    });
  }
  /**
   * Reject a waitlist entry.
   * @param id The waitlist entry ID.
   */
  async reject(id) {
    this.requireId(id);
    return this.request({
      method: "POST",
      path: joinPaths(basePath29, id, "reject")
    });
  }
  /**
   * Delete a waitlist entry.
   * @param id The waitlist entry ID.
   */
  async delete(id) {
    this.requireId(id);
    return this.request({
      method: "DELETE",
      path: joinPaths(basePath29, id)
    });
  }
};
var basePath30 = "/webhooks";
var WebhookAPI = class extends AbstractAPI {
  static {
    __name(this, "WebhookAPI");
  }
  async createSvixApp() {
    return this.request({
      method: "POST",
      path: joinPaths(basePath30, "svix")
    });
  }
  async generateSvixAuthURL() {
    return this.request({
      method: "POST",
      path: joinPaths(basePath30, "svix_url")
    });
  }
  async deleteSvixApp() {
    return this.request({
      method: "DELETE",
      path: joinPaths(basePath30, "svix")
    });
  }
};
var basePath31 = "/billing";
var organizationBasePath = "/organizations";
var userBasePath = "/users";
var BillingAPI = class extends AbstractAPI {
  static {
    __name(this, "BillingAPI");
  }
  /**
   * @experimental This is an experimental API for the Billing feature that is available under a public beta, and the API is subject to change. It is advised to [pin](https://clerk.com/docs/pinning) the SDK version and the clerk-js version to avoid breaking changes.
   */
  async getPlanList(params) {
    return this.request({
      method: "GET",
      path: joinPaths(basePath31, "plans"),
      queryParams: params
    });
  }
  /**
   * @experimental This is an experimental API for the Billing feature that is available under a public beta, and the API is subject to change. It is advised to [pin](https://clerk.com/docs/pinning) the SDK version and the clerk-js version to avoid breaking changes.
   */
  async cancelSubscriptionItem(subscriptionItemId, params) {
    this.requireId(subscriptionItemId);
    return this.request({
      method: "DELETE",
      path: joinPaths(basePath31, "subscription_items", subscriptionItemId),
      queryParams: params
    });
  }
  /**
   * @experimental This is an experimental API for the Billing feature that is available under a public beta, and the API is subject to change. It is advised to [pin](https://clerk.com/docs/pinning) the SDK version and the clerk-js version to avoid breaking changes.
   */
  async extendSubscriptionItemFreeTrial(subscriptionItemId, params) {
    this.requireId(subscriptionItemId);
    return this.request({
      method: "POST",
      path: joinPaths("/billing", "subscription_items", subscriptionItemId, "extend_free_trial"),
      bodyParams: params
    });
  }
  /**
   * @experimental This is an experimental API for the Billing feature that is available under a public beta, and the API is subject to change. It is advised to [pin](https://clerk.com/docs/pinning) the SDK version and the clerk-js version to avoid breaking changes.
   */
  async getOrganizationBillingSubscription(organizationId) {
    this.requireId(organizationId);
    return this.request({
      method: "GET",
      path: joinPaths(organizationBasePath, organizationId, "billing", "subscription")
    });
  }
  /**
   * @experimental This is an experimental API for the Billing feature that is available under a public beta, and the API is subject to change. It is advised to [pin](https://clerk.com/docs/pinning) the SDK version and the clerk-js version to avoid breaking changes.
   */
  async getUserBillingSubscription(userId) {
    this.requireId(userId);
    return this.request({
      method: "GET",
      path: joinPaths(userBasePath, userId, "billing", "subscription")
    });
  }
};
var isObject = /* @__PURE__ */ __name((value) => typeof value === "object" && value !== null, "isObject");
var isObjectCustom = /* @__PURE__ */ __name((value) => isObject(value) && !(value instanceof RegExp) && !(value instanceof Error) && !(value instanceof Date) && !(globalThis.Blob && value instanceof globalThis.Blob), "isObjectCustom");
var mapObjectSkip = /* @__PURE__ */ Symbol("mapObjectSkip");
var _mapObject = /* @__PURE__ */ __name((object, mapper, options, isSeen = /* @__PURE__ */ new WeakMap()) => {
  options = {
    deep: false,
    target: {},
    ...options
  };
  if (isSeen.has(object)) {
    return isSeen.get(object);
  }
  isSeen.set(object, options.target);
  const { target } = options;
  delete options.target;
  const mapArray = /* @__PURE__ */ __name((array) => array.map((element) => isObjectCustom(element) ? _mapObject(element, mapper, options, isSeen) : element), "mapArray");
  if (Array.isArray(object)) {
    return mapArray(object);
  }
  for (const [key, value] of Object.entries(object)) {
    const mapResult = mapper(key, value, object);
    if (mapResult === mapObjectSkip) {
      continue;
    }
    let [newKey, newValue, { shouldRecurse = true } = {}] = mapResult;
    if (newKey === "__proto__") {
      continue;
    }
    if (options.deep && shouldRecurse && isObjectCustom(newValue)) {
      newValue = Array.isArray(newValue) ? mapArray(newValue) : _mapObject(newValue, mapper, options, isSeen);
    }
    target[newKey] = newValue;
  }
  return target;
}, "_mapObject");
function mapObject(object, mapper, options) {
  if (!isObject(object)) {
    throw new TypeError(`Expected an object, got \`${object}\` (${typeof object})`);
  }
  if (Array.isArray(object)) {
    throw new TypeError("Expected an object, got an array");
  }
  return _mapObject(object, mapper, options);
}
__name(mapObject, "mapObject");
var SPLIT_LOWER_UPPER_RE = /([\p{Ll}\d])(\p{Lu})/gu;
var SPLIT_UPPER_UPPER_RE = /(\p{Lu})([\p{Lu}][\p{Ll}])/gu;
var SPLIT_SEPARATE_NUMBER_RE = /(\d)\p{Ll}|(\p{L})\d/u;
var DEFAULT_STRIP_REGEXP = /[^\p{L}\d]+/giu;
var SPLIT_REPLACE_VALUE = "$1\0$2";
var DEFAULT_PREFIX_SUFFIX_CHARACTERS = "";
function split(value) {
  let result = value.trim();
  result = result.replace(SPLIT_LOWER_UPPER_RE, SPLIT_REPLACE_VALUE).replace(SPLIT_UPPER_UPPER_RE, SPLIT_REPLACE_VALUE);
  result = result.replace(DEFAULT_STRIP_REGEXP, "\0");
  let start = 0;
  let end = result.length;
  while (result.charAt(start) === "\0")
    start++;
  if (start === end)
    return [];
  while (result.charAt(end - 1) === "\0")
    end--;
  return result.slice(start, end).split(/\0/g);
}
__name(split, "split");
function splitSeparateNumbers(value) {
  const words = split(value);
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const match22 = SPLIT_SEPARATE_NUMBER_RE.exec(word);
    if (match22) {
      const offset = match22.index + (match22[1] ?? match22[2]).length;
      words.splice(i, 1, word.slice(0, offset), word.slice(offset));
    }
  }
  return words;
}
__name(splitSeparateNumbers, "splitSeparateNumbers");
function noCase(input, options) {
  const [prefix, words, suffix] = splitPrefixSuffix(input, options);
  return prefix + words.map(lowerFactory(options?.locale)).join(options?.delimiter ?? " ") + suffix;
}
__name(noCase, "noCase");
function snakeCase(input, options) {
  return noCase(input, { delimiter: "_", ...options });
}
__name(snakeCase, "snakeCase");
function lowerFactory(locale) {
  return locale === false ? (input) => input.toLowerCase() : (input) => input.toLocaleLowerCase(locale);
}
__name(lowerFactory, "lowerFactory");
function splitPrefixSuffix(input, options = {}) {
  const splitFn = options.split ?? (options.separateNumbers ? splitSeparateNumbers : split);
  const prefixCharacters = options.prefixCharacters ?? DEFAULT_PREFIX_SUFFIX_CHARACTERS;
  const suffixCharacters = options.suffixCharacters ?? DEFAULT_PREFIX_SUFFIX_CHARACTERS;
  let prefixIndex = 0;
  let suffixIndex = input.length;
  while (prefixIndex < input.length) {
    const char = input.charAt(prefixIndex);
    if (!prefixCharacters.includes(char))
      break;
    prefixIndex++;
  }
  while (suffixIndex > prefixIndex) {
    const index = suffixIndex - 1;
    const char = input.charAt(index);
    if (!suffixCharacters.includes(char))
      break;
    suffixIndex = index;
  }
  return [
    input.slice(0, prefixIndex),
    splitFn(input.slice(prefixIndex, suffixIndex)),
    input.slice(suffixIndex)
  ];
}
__name(splitPrefixSuffix, "splitPrefixSuffix");
var PlainObjectConstructor = {}.constructor;
function snakecaseKeys(obj, options) {
  if (Array.isArray(obj)) {
    if (obj.some((item) => item.constructor !== PlainObjectConstructor)) {
      throw new Error("obj must be array of plain objects");
    }
    options = { deep: true, exclude: [], parsingOptions: {}, ...options };
    const convertCase2 = options.snakeCase || ((key) => snakeCase(key, options.parsingOptions));
    return obj.map((item) => {
      return mapObject(item, (key, val) => {
        return [
          matches(options.exclude, key) ? key : convertCase2(key),
          val,
          mapperOptions(key, val, options)
        ];
      }, options);
    });
  } else {
    if (obj.constructor !== PlainObjectConstructor) {
      throw new Error("obj must be an plain object");
    }
  }
  options = { deep: true, exclude: [], parsingOptions: {}, ...options };
  const convertCase = options.snakeCase || ((key) => snakeCase(key, options.parsingOptions));
  return mapObject(obj, (key, val) => {
    return [
      matches(options.exclude, key) ? key : convertCase(key),
      val,
      mapperOptions(key, val, options)
    ];
  }, options);
}
__name(snakecaseKeys, "snakecaseKeys");
function matches(patterns, value) {
  return patterns.some((pattern) => {
    return typeof pattern === "string" ? pattern === value : pattern.test(value);
  });
}
__name(matches, "matches");
function mapperOptions(key, val, options) {
  return options.shouldRecurse ? { shouldRecurse: options.shouldRecurse(key, val) } : void 0;
}
__name(mapperOptions, "mapperOptions");
var snakecase_keys_default = snakecaseKeys;
var AccountlessApplication = class _AccountlessApplication {
  static {
    __name(this, "_AccountlessApplication");
  }
  constructor(publishableKey, secretKey, claimUrl, apiKeysUrl) {
    this.publishableKey = publishableKey;
    this.secretKey = secretKey;
    this.claimUrl = claimUrl;
    this.apiKeysUrl = apiKeysUrl;
  }
  static fromJSON(data) {
    return new _AccountlessApplication(data.publishable_key, data.secret_key, data.claim_url, data.api_keys_url);
  }
};
var AgentTask = class _AgentTask {
  static {
    __name(this, "_AgentTask");
  }
  constructor(agentId, taskId, url) {
    this.agentId = agentId;
    this.taskId = taskId;
    this.url = url;
  }
  /**
   * Creates a AgentTask instance from a JSON object.
   *
   * @param data - The JSON object containing agent task data
   * @returns A new AgentTask instance
   */
  static fromJSON(data) {
    return new _AgentTask(data.agent_id, data.task_id, data.url);
  }
};
var ActorToken = class _ActorToken {
  static {
    __name(this, "_ActorToken");
  }
  constructor(id, status, userId, actor, token, url, createdAt, updatedAt) {
    this.id = id;
    this.status = status;
    this.userId = userId;
    this.actor = actor;
    this.token = token;
    this.url = url;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  static fromJSON(data) {
    return new _ActorToken(
      data.id,
      data.status,
      data.user_id,
      data.actor,
      data.token,
      data.url,
      data.created_at,
      data.updated_at
    );
  }
};
var AllowlistIdentifier = class _AllowlistIdentifier {
  static {
    __name(this, "_AllowlistIdentifier");
  }
  constructor(id, identifier, identifierType, createdAt, updatedAt, instanceId, invitationId) {
    this.id = id;
    this.identifier = identifier;
    this.identifierType = identifierType;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.instanceId = instanceId;
    this.invitationId = invitationId;
  }
  static fromJSON(data) {
    return new _AllowlistIdentifier(
      data.id,
      data.identifier,
      data.identifier_type,
      data.created_at,
      data.updated_at,
      data.instance_id,
      data.invitation_id
    );
  }
};
var APIKey = class _APIKey {
  static {
    __name(this, "_APIKey");
  }
  constructor(id, type, name2, subject, scopes, claims, revoked, revocationReason, expired, expiration, createdBy, description, lastUsedAt, createdAt, updatedAt, secret) {
    this.id = id;
    this.type = type;
    this.name = name2;
    this.subject = subject;
    this.scopes = scopes;
    this.claims = claims;
    this.revoked = revoked;
    this.revocationReason = revocationReason;
    this.expired = expired;
    this.expiration = expiration;
    this.createdBy = createdBy;
    this.description = description;
    this.lastUsedAt = lastUsedAt;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.secret = secret;
  }
  static fromJSON(data) {
    return new _APIKey(
      data.id,
      data.type,
      data.name,
      data.subject,
      data.scopes,
      data.claims,
      data.revoked,
      data.revocation_reason,
      data.expired,
      data.expiration,
      data.created_by,
      data.description,
      data.last_used_at,
      data.created_at,
      data.updated_at,
      data.secret
    );
  }
};
var BlocklistIdentifier = class _BlocklistIdentifier {
  static {
    __name(this, "_BlocklistIdentifier");
  }
  constructor(id, identifier, identifierType, createdAt, updatedAt, instanceId) {
    this.id = id;
    this.identifier = identifier;
    this.identifierType = identifierType;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.instanceId = instanceId;
  }
  static fromJSON(data) {
    return new _BlocklistIdentifier(
      data.id,
      data.identifier,
      data.identifier_type,
      data.created_at,
      data.updated_at,
      data.instance_id
    );
  }
};
var SessionActivity = class _SessionActivity {
  static {
    __name(this, "_SessionActivity");
  }
  constructor(id, isMobile, ipAddress, city, country, browserVersion, browserName, deviceType) {
    this.id = id;
    this.isMobile = isMobile;
    this.ipAddress = ipAddress;
    this.city = city;
    this.country = country;
    this.browserVersion = browserVersion;
    this.browserName = browserName;
    this.deviceType = deviceType;
  }
  static fromJSON(data) {
    return new _SessionActivity(
      data.id,
      data.is_mobile,
      data.ip_address,
      data.city,
      data.country,
      data.browser_version,
      data.browser_name,
      data.device_type
    );
  }
};
var Session = class _Session {
  static {
    __name(this, "_Session");
  }
  constructor(id, clientId, userId, status, lastActiveAt, expireAt, abandonAt, createdAt, updatedAt, lastActiveOrganizationId, latestActivity, actor = null) {
    this.id = id;
    this.clientId = clientId;
    this.userId = userId;
    this.status = status;
    this.lastActiveAt = lastActiveAt;
    this.expireAt = expireAt;
    this.abandonAt = abandonAt;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.lastActiveOrganizationId = lastActiveOrganizationId;
    this.latestActivity = latestActivity;
    this.actor = actor;
  }
  static fromJSON(data) {
    return new _Session(
      data.id,
      data.client_id,
      data.user_id,
      data.status,
      data.last_active_at,
      data.expire_at,
      data.abandon_at,
      data.created_at,
      data.updated_at,
      data.last_active_organization_id,
      data.latest_activity && SessionActivity.fromJSON(data.latest_activity),
      data.actor
    );
  }
};
var Client = class _Client {
  static {
    __name(this, "_Client");
  }
  constructor(id, sessionIds, sessions, signInId, signUpId, lastActiveSessionId, lastAuthenticationStrategy, createdAt, updatedAt) {
    this.id = id;
    this.sessionIds = sessionIds;
    this.sessions = sessions;
    this.signInId = signInId;
    this.signUpId = signUpId;
    this.lastActiveSessionId = lastActiveSessionId;
    this.lastAuthenticationStrategy = lastAuthenticationStrategy;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  static fromJSON(data) {
    return new _Client(
      data.id,
      data.session_ids,
      data.sessions.map((x) => Session.fromJSON(x)),
      data.sign_in_id,
      data.sign_up_id,
      data.last_active_session_id,
      data.last_authentication_strategy,
      data.created_at,
      data.updated_at
    );
  }
};
var CnameTarget = class _CnameTarget {
  static {
    __name(this, "_CnameTarget");
  }
  constructor(host, value, required) {
    this.host = host;
    this.value = value;
    this.required = required;
  }
  static fromJSON(data) {
    return new _CnameTarget(data.host, data.value, data.required);
  }
};
var Cookies2 = class _Cookies {
  static {
    __name(this, "_Cookies");
  }
  constructor(cookies) {
    this.cookies = cookies;
  }
  static fromJSON(data) {
    return new _Cookies(data.cookies);
  }
};
var DeletedObject = class _DeletedObject {
  static {
    __name(this, "_DeletedObject");
  }
  constructor(object, id, slug, deleted) {
    this.object = object;
    this.id = id;
    this.slug = slug;
    this.deleted = deleted;
  }
  static fromJSON(data) {
    return new _DeletedObject(data.object, data.id || null, data.slug || null, data.deleted);
  }
};
var Domain = class _Domain {
  static {
    __name(this, "_Domain");
  }
  constructor(id, name2, isSatellite, frontendApiUrl, developmentOrigin, cnameTargets, accountsPortalUrl, proxyUrl) {
    this.id = id;
    this.name = name2;
    this.isSatellite = isSatellite;
    this.frontendApiUrl = frontendApiUrl;
    this.developmentOrigin = developmentOrigin;
    this.cnameTargets = cnameTargets;
    this.accountsPortalUrl = accountsPortalUrl;
    this.proxyUrl = proxyUrl;
  }
  static fromJSON(data) {
    return new _Domain(
      data.id,
      data.name,
      data.is_satellite,
      data.frontend_api_url,
      data.development_origin,
      data.cname_targets && data.cname_targets.map((x) => CnameTarget.fromJSON(x)),
      data.accounts_portal_url,
      data.proxy_url
    );
  }
};
var Email = class _Email {
  static {
    __name(this, "_Email");
  }
  constructor(id, fromEmailName, emailAddressId, toEmailAddress, subject, body, bodyPlain, status, slug, data, deliveredByClerk) {
    this.id = id;
    this.fromEmailName = fromEmailName;
    this.emailAddressId = emailAddressId;
    this.toEmailAddress = toEmailAddress;
    this.subject = subject;
    this.body = body;
    this.bodyPlain = bodyPlain;
    this.status = status;
    this.slug = slug;
    this.data = data;
    this.deliveredByClerk = deliveredByClerk;
  }
  static fromJSON(data) {
    return new _Email(
      data.id,
      data.from_email_name,
      data.email_address_id,
      data.to_email_address,
      data.subject,
      data.body,
      data.body_plain,
      data.status,
      data.slug,
      data.data,
      data.delivered_by_clerk
    );
  }
};
var IdentificationLink = class _IdentificationLink {
  static {
    __name(this, "_IdentificationLink");
  }
  constructor(id, type) {
    this.id = id;
    this.type = type;
  }
  static fromJSON(data) {
    return new _IdentificationLink(data.id, data.type);
  }
};
var Verification = class _Verification {
  static {
    __name(this, "_Verification");
  }
  constructor(status, strategy, externalVerificationRedirectURL = null, attempts = null, expireAt = null, nonce = null, message = null) {
    this.status = status;
    this.strategy = strategy;
    this.externalVerificationRedirectURL = externalVerificationRedirectURL;
    this.attempts = attempts;
    this.expireAt = expireAt;
    this.nonce = nonce;
    this.message = message;
  }
  static fromJSON(data) {
    return new _Verification(
      data.status,
      data.strategy,
      data.external_verification_redirect_url ? new URL(data.external_verification_redirect_url) : null,
      data.attempts,
      data.expire_at,
      data.nonce
    );
  }
};
var EmailAddress = class _EmailAddress {
  static {
    __name(this, "_EmailAddress");
  }
  constructor(id, emailAddress, verification, linkedTo) {
    this.id = id;
    this.emailAddress = emailAddress;
    this.verification = verification;
    this.linkedTo = linkedTo;
  }
  static fromJSON(data) {
    return new _EmailAddress(
      data.id,
      data.email_address,
      data.verification && Verification.fromJSON(data.verification),
      data.linked_to.map((link) => IdentificationLink.fromJSON(link))
    );
  }
};
var ExternalAccount = class _ExternalAccount {
  static {
    __name(this, "_ExternalAccount");
  }
  constructor(id, provider, providerUserId, identificationId, externalId, approvedScopes, emailAddress, firstName, lastName, imageUrl, username, phoneNumber, publicMetadata = {}, label, verification) {
    this.id = id;
    this.provider = provider;
    this.providerUserId = providerUserId;
    this.identificationId = identificationId;
    this.externalId = externalId;
    this.approvedScopes = approvedScopes;
    this.emailAddress = emailAddress;
    this.firstName = firstName;
    this.lastName = lastName;
    this.imageUrl = imageUrl;
    this.username = username;
    this.phoneNumber = phoneNumber;
    this.publicMetadata = publicMetadata;
    this.label = label;
    this.verification = verification;
  }
  static fromJSON(data) {
    return new _ExternalAccount(
      data.id,
      data.provider,
      data.provider_user_id,
      data.identification_id,
      data.provider_user_id,
      data.approved_scopes,
      data.email_address,
      data.first_name,
      data.last_name,
      data.image_url || "",
      data.username,
      data.phone_number,
      data.public_metadata,
      data.label,
      data.verification && Verification.fromJSON(data.verification)
    );
  }
};
var Instance = class _Instance {
  static {
    __name(this, "_Instance");
  }
  constructor(id, environmentType, allowedOrigins) {
    this.id = id;
    this.environmentType = environmentType;
    this.allowedOrigins = allowedOrigins;
  }
  static fromJSON(data) {
    return new _Instance(data.id, data.environment_type, data.allowed_origins);
  }
};
var InstanceRestrictions = class _InstanceRestrictions {
  static {
    __name(this, "_InstanceRestrictions");
  }
  constructor(allowlist, blocklist, blockEmailSubaddresses, blockDisposableEmailDomains, ignoreDotsForGmailAddresses) {
    this.allowlist = allowlist;
    this.blocklist = blocklist;
    this.blockEmailSubaddresses = blockEmailSubaddresses;
    this.blockDisposableEmailDomains = blockDisposableEmailDomains;
    this.ignoreDotsForGmailAddresses = ignoreDotsForGmailAddresses;
  }
  static fromJSON(data) {
    return new _InstanceRestrictions(
      data.allowlist,
      data.blocklist,
      data.block_email_subaddresses,
      data.block_disposable_email_domains,
      data.ignore_dots_for_gmail_addresses
    );
  }
};
var InstanceSettings = class _InstanceSettings {
  static {
    __name(this, "_InstanceSettings");
  }
  constructor(id, restrictedToAllowlist, fromEmailAddress, progressiveSignUp, enhancedEmailDeliverability) {
    this.id = id;
    this.restrictedToAllowlist = restrictedToAllowlist;
    this.fromEmailAddress = fromEmailAddress;
    this.progressiveSignUp = progressiveSignUp;
    this.enhancedEmailDeliverability = enhancedEmailDeliverability;
  }
  static fromJSON(data) {
    return new _InstanceSettings(
      data.id,
      data.restricted_to_allowlist,
      data.from_email_address,
      data.progressive_sign_up,
      data.enhanced_email_deliverability
    );
  }
};
var Invitation = class _Invitation {
  static {
    __name(this, "_Invitation");
  }
  constructor(id, emailAddress, publicMetadata, createdAt, updatedAt, status, url, revoked) {
    this.id = id;
    this.emailAddress = emailAddress;
    this.publicMetadata = publicMetadata;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.status = status;
    this.url = url;
    this.revoked = revoked;
    this._raw = null;
  }
  get raw() {
    return this._raw;
  }
  static fromJSON(data) {
    const res = new _Invitation(
      data.id,
      data.email_address,
      data.public_metadata,
      data.created_at,
      data.updated_at,
      data.status,
      data.url,
      data.revoked
    );
    res._raw = data;
    return res;
  }
};
var ObjectType = {
  AccountlessApplication: "accountless_application",
  ActorToken: "actor_token",
  AgentTask: "agent_task",
  AllowlistIdentifier: "allowlist_identifier",
  ApiKey: "api_key",
  BlocklistIdentifier: "blocklist_identifier",
  Client: "client",
  Cookies: "cookies",
  Domain: "domain",
  Email: "email",
  EmailAddress: "email_address",
  ExternalAccount: "external_account",
  FacebookAccount: "facebook_account",
  GoogleAccount: "google_account",
  Instance: "instance",
  InstanceRestrictions: "instance_restrictions",
  InstanceSettings: "instance_settings",
  Invitation: "invitation",
  Machine: "machine",
  MachineScope: "machine_scope",
  MachineSecretKey: "machine_secret_key",
  M2MToken: "machine_to_machine_token",
  JwtTemplate: "jwt_template",
  OauthAccessToken: "oauth_access_token",
  IdpOAuthAccessToken: "clerk_idp_oauth_access_token",
  OAuthApplication: "oauth_application",
  Organization: "organization",
  OrganizationDomain: "organization_domain",
  OrganizationInvitation: "organization_invitation",
  OrganizationMembership: "organization_membership",
  OrganizationSettings: "organization_settings",
  PhoneNumber: "phone_number",
  ProxyCheck: "proxy_check",
  RedirectUrl: "redirect_url",
  SamlAccount: "saml_account",
  SamlConnection: "saml_connection",
  Session: "session",
  SignInAttempt: "sign_in_attempt",
  SignInToken: "sign_in_token",
  SignUpAttempt: "sign_up_attempt",
  SmsMessage: "sms_message",
  User: "user",
  WaitlistEntry: "waitlist_entry",
  Web3Wallet: "web3_wallet",
  Token: "token",
  TotalCount: "total_count",
  TestingToken: "testing_token",
  Role: "role",
  Permission: "permission",
  BillingPayer: "commerce_payer",
  BillingPaymentAttempt: "commerce_payment_attempt",
  BillingSubscription: "commerce_subscription",
  BillingSubscriptionItem: "commerce_subscription_item",
  BillingPlan: "commerce_plan",
  Feature: "feature"
};
var Machine = class _Machine {
  static {
    __name(this, "_Machine");
  }
  constructor(id, name2, instanceId, createdAt, updatedAt, scopedMachines, defaultTokenTtl, secretKey) {
    this.id = id;
    this.name = name2;
    this.instanceId = instanceId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.scopedMachines = scopedMachines;
    this.defaultTokenTtl = defaultTokenTtl;
    this.secretKey = secretKey;
  }
  static fromJSON(data) {
    return new _Machine(
      data.id,
      data.name,
      data.instance_id,
      data.created_at,
      data.updated_at,
      data.scoped_machines.map(
        (m) => new _Machine(
          m.id,
          m.name,
          m.instance_id,
          m.created_at,
          m.updated_at,
          [],
          // Nested machines don't have scoped_machines
          m.default_token_ttl
        )
      ),
      data.default_token_ttl,
      data.secret_key
    );
  }
};
var MachineScope = class _MachineScope {
  static {
    __name(this, "_MachineScope");
  }
  constructor(fromMachineId, toMachineId, createdAt, deleted) {
    this.fromMachineId = fromMachineId;
    this.toMachineId = toMachineId;
    this.createdAt = createdAt;
    this.deleted = deleted;
  }
  static fromJSON(data) {
    return new _MachineScope(data.from_machine_id, data.to_machine_id, data.created_at, data.deleted);
  }
};
var MachineSecretKey = class _MachineSecretKey {
  static {
    __name(this, "_MachineSecretKey");
  }
  constructor(secret) {
    this.secret = secret;
  }
  static fromJSON(data) {
    return new _MachineSecretKey(data.secret);
  }
};
var JwtTemplate = class _JwtTemplate {
  static {
    __name(this, "_JwtTemplate");
  }
  constructor(id, name2, claims, lifetime, allowedClockSkew, customSigningKey, signingAlgorithm, createdAt, updatedAt) {
    this.id = id;
    this.name = name2;
    this.claims = claims;
    this.lifetime = lifetime;
    this.allowedClockSkew = allowedClockSkew;
    this.customSigningKey = customSigningKey;
    this.signingAlgorithm = signingAlgorithm;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  static fromJSON(data) {
    return new _JwtTemplate(
      data.id,
      data.name,
      data.claims,
      data.lifetime,
      data.allowed_clock_skew,
      data.custom_signing_key,
      data.signing_algorithm,
      data.created_at,
      data.updated_at
    );
  }
};
var OauthAccessToken = class _OauthAccessToken {
  static {
    __name(this, "_OauthAccessToken");
  }
  constructor(externalAccountId, provider, token, publicMetadata = {}, label, scopes, tokenSecret, expiresAt, idToken) {
    this.externalAccountId = externalAccountId;
    this.provider = provider;
    this.token = token;
    this.publicMetadata = publicMetadata;
    this.label = label;
    this.scopes = scopes;
    this.tokenSecret = tokenSecret;
    this.expiresAt = expiresAt;
    this.idToken = idToken;
  }
  static fromJSON(data) {
    return new _OauthAccessToken(
      data.external_account_id,
      data.provider,
      data.token,
      data.public_metadata,
      data.label || "",
      data.scopes,
      data.token_secret,
      data.expires_at,
      data.id_token
    );
  }
};
var OAuthApplication = class _OAuthApplication {
  static {
    __name(this, "_OAuthApplication");
  }
  constructor(id, instanceId, name2, clientId, clientUri, clientImageUrl, dynamicallyRegistered, consentScreenEnabled, pkceRequired, isPublic, scopes, redirectUris, authorizeUrl, tokenFetchUrl, userInfoUrl, discoveryUrl, tokenIntrospectionUrl, createdAt, updatedAt, clientSecret) {
    this.id = id;
    this.instanceId = instanceId;
    this.name = name2;
    this.clientId = clientId;
    this.clientUri = clientUri;
    this.clientImageUrl = clientImageUrl;
    this.dynamicallyRegistered = dynamicallyRegistered;
    this.consentScreenEnabled = consentScreenEnabled;
    this.pkceRequired = pkceRequired;
    this.isPublic = isPublic;
    this.scopes = scopes;
    this.redirectUris = redirectUris;
    this.authorizeUrl = authorizeUrl;
    this.tokenFetchUrl = tokenFetchUrl;
    this.userInfoUrl = userInfoUrl;
    this.discoveryUrl = discoveryUrl;
    this.tokenIntrospectionUrl = tokenIntrospectionUrl;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.clientSecret = clientSecret;
  }
  static fromJSON(data) {
    return new _OAuthApplication(
      data.id,
      data.instance_id,
      data.name,
      data.client_id,
      data.client_uri,
      data.client_image_url,
      data.dynamically_registered,
      data.consent_screen_enabled,
      data.pkce_required,
      data.public,
      data.scopes,
      data.redirect_uris,
      data.authorize_url,
      data.token_fetch_url,
      data.user_info_url,
      data.discovery_url,
      data.token_introspection_url,
      data.created_at,
      data.updated_at,
      data.client_secret
    );
  }
};
var Organization = class _Organization {
  static {
    __name(this, "_Organization");
  }
  constructor(id, name2, slug, imageUrl, hasImage, createdAt, updatedAt, publicMetadata = {}, privateMetadata = {}, maxAllowedMemberships, adminDeleteEnabled, membersCount, createdBy) {
    this.id = id;
    this.name = name2;
    this.slug = slug;
    this.imageUrl = imageUrl;
    this.hasImage = hasImage;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.publicMetadata = publicMetadata;
    this.privateMetadata = privateMetadata;
    this.maxAllowedMemberships = maxAllowedMemberships;
    this.adminDeleteEnabled = adminDeleteEnabled;
    this.membersCount = membersCount;
    this.createdBy = createdBy;
    this._raw = null;
  }
  get raw() {
    return this._raw;
  }
  static fromJSON(data) {
    const res = new _Organization(
      data.id,
      data.name,
      data.slug,
      data.image_url || "",
      data.has_image,
      data.created_at,
      data.updated_at,
      data.public_metadata,
      data.private_metadata,
      data.max_allowed_memberships,
      data.admin_delete_enabled,
      data.members_count,
      data.created_by
    );
    res._raw = data;
    return res;
  }
};
var OrganizationInvitation = class _OrganizationInvitation {
  static {
    __name(this, "_OrganizationInvitation");
  }
  constructor(id, emailAddress, role, roleName, organizationId, createdAt, updatedAt, expiresAt, url, status, publicMetadata = {}, privateMetadata = {}, publicOrganizationData) {
    this.id = id;
    this.emailAddress = emailAddress;
    this.role = role;
    this.roleName = roleName;
    this.organizationId = organizationId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.expiresAt = expiresAt;
    this.url = url;
    this.status = status;
    this.publicMetadata = publicMetadata;
    this.privateMetadata = privateMetadata;
    this.publicOrganizationData = publicOrganizationData;
    this._raw = null;
  }
  get raw() {
    return this._raw;
  }
  static fromJSON(data) {
    const res = new _OrganizationInvitation(
      data.id,
      data.email_address,
      data.role,
      data.role_name,
      data.organization_id,
      data.created_at,
      data.updated_at,
      data.expires_at,
      data.url,
      data.status,
      data.public_metadata,
      data.private_metadata,
      data.public_organization_data
    );
    res._raw = data;
    return res;
  }
};
var OrganizationMembership = class _OrganizationMembership {
  static {
    __name(this, "_OrganizationMembership");
  }
  constructor(id, role, permissions, publicMetadata = {}, privateMetadata = {}, createdAt, updatedAt, organization, publicUserData) {
    this.id = id;
    this.role = role;
    this.permissions = permissions;
    this.publicMetadata = publicMetadata;
    this.privateMetadata = privateMetadata;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.organization = organization;
    this.publicUserData = publicUserData;
    this._raw = null;
  }
  get raw() {
    return this._raw;
  }
  static fromJSON(data) {
    const res = new _OrganizationMembership(
      data.id,
      data.role,
      data.permissions,
      data.public_metadata,
      data.private_metadata,
      data.created_at,
      data.updated_at,
      Organization.fromJSON(data.organization),
      OrganizationMembershipPublicUserData.fromJSON(data.public_user_data)
    );
    res._raw = data;
    return res;
  }
};
var OrganizationMembershipPublicUserData = class _OrganizationMembershipPublicUserData {
  static {
    __name(this, "_OrganizationMembershipPublicUserData");
  }
  constructor(identifier, firstName, lastName, imageUrl, hasImage, userId) {
    this.identifier = identifier;
    this.firstName = firstName;
    this.lastName = lastName;
    this.imageUrl = imageUrl;
    this.hasImage = hasImage;
    this.userId = userId;
  }
  static fromJSON(data) {
    return new _OrganizationMembershipPublicUserData(
      data.identifier,
      data.first_name,
      data.last_name,
      data.image_url,
      data.has_image,
      data.user_id
    );
  }
};
var OrganizationSettings = class _OrganizationSettings {
  static {
    __name(this, "_OrganizationSettings");
  }
  constructor(enabled, maxAllowedMemberships, maxAllowedRoles, maxAllowedPermissions, creatorRole, adminDeleteEnabled, domainsEnabled, slugDisabled, domainsEnrollmentModes, domainsDefaultRole) {
    this.enabled = enabled;
    this.maxAllowedMemberships = maxAllowedMemberships;
    this.maxAllowedRoles = maxAllowedRoles;
    this.maxAllowedPermissions = maxAllowedPermissions;
    this.creatorRole = creatorRole;
    this.adminDeleteEnabled = adminDeleteEnabled;
    this.domainsEnabled = domainsEnabled;
    this.slugDisabled = slugDisabled;
    this.domainsEnrollmentModes = domainsEnrollmentModes;
    this.domainsDefaultRole = domainsDefaultRole;
  }
  static fromJSON(data) {
    return new _OrganizationSettings(
      data.enabled,
      data.max_allowed_memberships,
      data.max_allowed_roles,
      data.max_allowed_permissions,
      data.creator_role,
      data.admin_delete_enabled,
      data.domains_enabled,
      data.slug_disabled,
      data.domains_enrollment_modes,
      data.domains_default_role
    );
  }
};
var PhoneNumber = class _PhoneNumber {
  static {
    __name(this, "_PhoneNumber");
  }
  constructor(id, phoneNumber, reservedForSecondFactor, defaultSecondFactor, verification, linkedTo) {
    this.id = id;
    this.phoneNumber = phoneNumber;
    this.reservedForSecondFactor = reservedForSecondFactor;
    this.defaultSecondFactor = defaultSecondFactor;
    this.verification = verification;
    this.linkedTo = linkedTo;
  }
  static fromJSON(data) {
    return new _PhoneNumber(
      data.id,
      data.phone_number,
      data.reserved_for_second_factor,
      data.default_second_factor,
      data.verification && Verification.fromJSON(data.verification),
      data.linked_to.map((link) => IdentificationLink.fromJSON(link))
    );
  }
};
var ProxyCheck = class _ProxyCheck {
  static {
    __name(this, "_ProxyCheck");
  }
  constructor(id, domainId, lastRunAt, proxyUrl, successful, createdAt, updatedAt) {
    this.id = id;
    this.domainId = domainId;
    this.lastRunAt = lastRunAt;
    this.proxyUrl = proxyUrl;
    this.successful = successful;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  static fromJSON(data) {
    return new _ProxyCheck(
      data.id,
      data.domain_id,
      data.last_run_at,
      data.proxy_url,
      data.successful,
      data.created_at,
      data.updated_at
    );
  }
};
var RedirectUrl = class _RedirectUrl {
  static {
    __name(this, "_RedirectUrl");
  }
  constructor(id, url, createdAt, updatedAt) {
    this.id = id;
    this.url = url;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  static fromJSON(data) {
    return new _RedirectUrl(data.id, data.url, data.created_at, data.updated_at);
  }
};
var SamlConnection = class _SamlConnection {
  static {
    __name(this, "_SamlConnection");
  }
  constructor(id, name2, domain, organizationId, idpEntityId, idpSsoUrl, idpCertificate, idpMetadataUrl, idpMetadata, acsUrl, spEntityId, spMetadataUrl, active, provider, userCount, syncUserAttributes, allowSubdomains, allowIdpInitiated, createdAt, updatedAt, attributeMapping) {
    this.id = id;
    this.name = name2;
    this.domain = domain;
    this.organizationId = organizationId;
    this.idpEntityId = idpEntityId;
    this.idpSsoUrl = idpSsoUrl;
    this.idpCertificate = idpCertificate;
    this.idpMetadataUrl = idpMetadataUrl;
    this.idpMetadata = idpMetadata;
    this.acsUrl = acsUrl;
    this.spEntityId = spEntityId;
    this.spMetadataUrl = spMetadataUrl;
    this.active = active;
    this.provider = provider;
    this.userCount = userCount;
    this.syncUserAttributes = syncUserAttributes;
    this.allowSubdomains = allowSubdomains;
    this.allowIdpInitiated = allowIdpInitiated;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.attributeMapping = attributeMapping;
  }
  static fromJSON(data) {
    return new _SamlConnection(
      data.id,
      data.name,
      data.domain,
      data.organization_id,
      data.idp_entity_id,
      data.idp_sso_url,
      data.idp_certificate,
      data.idp_metadata_url,
      data.idp_metadata,
      data.acs_url,
      data.sp_entity_id,
      data.sp_metadata_url,
      data.active,
      data.provider,
      data.user_count,
      data.sync_user_attributes,
      data.allow_subdomains,
      data.allow_idp_initiated,
      data.created_at,
      data.updated_at,
      data.attribute_mapping && AttributeMapping.fromJSON(data.attribute_mapping)
    );
  }
};
var SamlAccountConnection = class _SamlAccountConnection {
  static {
    __name(this, "_SamlAccountConnection");
  }
  constructor(id, name2, domain, active, provider, syncUserAttributes, allowSubdomains, allowIdpInitiated, createdAt, updatedAt) {
    this.id = id;
    this.name = name2;
    this.domain = domain;
    this.active = active;
    this.provider = provider;
    this.syncUserAttributes = syncUserAttributes;
    this.allowSubdomains = allowSubdomains;
    this.allowIdpInitiated = allowIdpInitiated;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  static fromJSON(data) {
    return new _SamlAccountConnection(
      data.id,
      data.name,
      data.domain,
      data.active,
      data.provider,
      data.sync_user_attributes,
      data.allow_subdomains,
      data.allow_idp_initiated,
      data.created_at,
      data.updated_at
    );
  }
};
var AttributeMapping = class _AttributeMapping {
  static {
    __name(this, "_AttributeMapping");
  }
  constructor(userId, emailAddress, firstName, lastName) {
    this.userId = userId;
    this.emailAddress = emailAddress;
    this.firstName = firstName;
    this.lastName = lastName;
  }
  static fromJSON(data) {
    return new _AttributeMapping(data.user_id, data.email_address, data.first_name, data.last_name);
  }
};
var SamlAccount = class _SamlAccount {
  static {
    __name(this, "_SamlAccount");
  }
  constructor(id, provider, providerUserId, active, emailAddress, firstName, lastName, verification, samlConnection, lastAuthenticatedAt, enterpriseConnectionId) {
    this.id = id;
    this.provider = provider;
    this.providerUserId = providerUserId;
    this.active = active;
    this.emailAddress = emailAddress;
    this.firstName = firstName;
    this.lastName = lastName;
    this.verification = verification;
    this.samlConnection = samlConnection;
    this.lastAuthenticatedAt = lastAuthenticatedAt;
    this.enterpriseConnectionId = enterpriseConnectionId;
  }
  static fromJSON(data) {
    return new _SamlAccount(
      data.id,
      data.provider,
      data.provider_user_id,
      data.active,
      data.email_address,
      data.first_name,
      data.last_name,
      data.verification && Verification.fromJSON(data.verification),
      data.saml_connection && SamlAccountConnection.fromJSON(data.saml_connection),
      data.last_authenticated_at ?? null,
      data.enterprise_connection_id
    );
  }
};
var SignInToken = class _SignInToken {
  static {
    __name(this, "_SignInToken");
  }
  constructor(id, userId, token, status, url, createdAt, updatedAt) {
    this.id = id;
    this.userId = userId;
    this.token = token;
    this.status = status;
    this.url = url;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  static fromJSON(data) {
    return new _SignInToken(data.id, data.user_id, data.token, data.status, data.url, data.created_at, data.updated_at);
  }
};
var SignUpAttemptVerification = class _SignUpAttemptVerification {
  static {
    __name(this, "_SignUpAttemptVerification");
  }
  constructor(nextAction, supportedStrategies) {
    this.nextAction = nextAction;
    this.supportedStrategies = supportedStrategies;
  }
  static fromJSON(data) {
    return new _SignUpAttemptVerification(data.next_action, data.supported_strategies);
  }
};
var SignUpAttemptVerifications = class _SignUpAttemptVerifications {
  static {
    __name(this, "_SignUpAttemptVerifications");
  }
  constructor(emailAddress, phoneNumber, web3Wallet, externalAccount) {
    this.emailAddress = emailAddress;
    this.phoneNumber = phoneNumber;
    this.web3Wallet = web3Wallet;
    this.externalAccount = externalAccount;
  }
  static fromJSON(data) {
    return new _SignUpAttemptVerifications(
      data.email_address && SignUpAttemptVerification.fromJSON(data.email_address),
      data.phone_number && SignUpAttemptVerification.fromJSON(data.phone_number),
      data.web3_wallet && SignUpAttemptVerification.fromJSON(data.web3_wallet),
      data.external_account
    );
  }
};
var SignUpAttempt = class _SignUpAttempt {
  static {
    __name(this, "_SignUpAttempt");
  }
  constructor(id, status, requiredFields, optionalFields, missingFields, unverifiedFields, verifications, username, emailAddress, phoneNumber, web3Wallet, passwordEnabled, firstName, lastName, customAction, externalId, createdSessionId, createdUserId, abandonAt, legalAcceptedAt, publicMetadata, unsafeMetadata) {
    this.id = id;
    this.status = status;
    this.requiredFields = requiredFields;
    this.optionalFields = optionalFields;
    this.missingFields = missingFields;
    this.unverifiedFields = unverifiedFields;
    this.verifications = verifications;
    this.username = username;
    this.emailAddress = emailAddress;
    this.phoneNumber = phoneNumber;
    this.web3Wallet = web3Wallet;
    this.passwordEnabled = passwordEnabled;
    this.firstName = firstName;
    this.lastName = lastName;
    this.customAction = customAction;
    this.externalId = externalId;
    this.createdSessionId = createdSessionId;
    this.createdUserId = createdUserId;
    this.abandonAt = abandonAt;
    this.legalAcceptedAt = legalAcceptedAt;
    this.publicMetadata = publicMetadata;
    this.unsafeMetadata = unsafeMetadata;
  }
  static fromJSON(data) {
    return new _SignUpAttempt(
      data.id,
      data.status,
      data.required_fields,
      data.optional_fields,
      data.missing_fields,
      data.unverified_fields,
      data.verifications ? SignUpAttemptVerifications.fromJSON(data.verifications) : null,
      data.username,
      data.email_address,
      data.phone_number,
      data.web3_wallet,
      data.password_enabled,
      data.first_name,
      data.last_name,
      data.custom_action,
      data.external_id,
      data.created_session_id,
      data.created_user_id,
      data.abandon_at,
      data.legal_accepted_at,
      data.public_metadata,
      data.unsafe_metadata
    );
  }
};
var SMSMessage = class _SMSMessage {
  static {
    __name(this, "_SMSMessage");
  }
  constructor(id, fromPhoneNumber, toPhoneNumber, message, status, phoneNumberId, data) {
    this.id = id;
    this.fromPhoneNumber = fromPhoneNumber;
    this.toPhoneNumber = toPhoneNumber;
    this.message = message;
    this.status = status;
    this.phoneNumberId = phoneNumberId;
    this.data = data;
  }
  static fromJSON(data) {
    return new _SMSMessage(
      data.id,
      data.from_phone_number,
      data.to_phone_number,
      data.message,
      data.status,
      data.phone_number_id,
      data.data
    );
  }
};
var Token = class _Token {
  static {
    __name(this, "_Token");
  }
  constructor(jwt) {
    this.jwt = jwt;
  }
  static fromJSON(data) {
    return new _Token(data.jwt);
  }
};
var Web3Wallet = class _Web3Wallet {
  static {
    __name(this, "_Web3Wallet");
  }
  constructor(id, web3Wallet, verification) {
    this.id = id;
    this.web3Wallet = web3Wallet;
    this.verification = verification;
  }
  static fromJSON(data) {
    return new _Web3Wallet(data.id, data.web3_wallet, data.verification && Verification.fromJSON(data.verification));
  }
};
var User = class _User {
  static {
    __name(this, "_User");
  }
  constructor(id, passwordEnabled, totpEnabled, backupCodeEnabled, twoFactorEnabled, banned, locked, createdAt, updatedAt, imageUrl, hasImage, primaryEmailAddressId, primaryPhoneNumberId, primaryWeb3WalletId, lastSignInAt, externalId, username, firstName, lastName, publicMetadata = {}, privateMetadata = {}, unsafeMetadata = {}, emailAddresses = [], phoneNumbers = [], web3Wallets = [], externalAccounts = [], samlAccounts = [], lastActiveAt, createOrganizationEnabled, createOrganizationsLimit = null, deleteSelfEnabled, legalAcceptedAt, locale) {
    this.id = id;
    this.passwordEnabled = passwordEnabled;
    this.totpEnabled = totpEnabled;
    this.backupCodeEnabled = backupCodeEnabled;
    this.twoFactorEnabled = twoFactorEnabled;
    this.banned = banned;
    this.locked = locked;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.imageUrl = imageUrl;
    this.hasImage = hasImage;
    this.primaryEmailAddressId = primaryEmailAddressId;
    this.primaryPhoneNumberId = primaryPhoneNumberId;
    this.primaryWeb3WalletId = primaryWeb3WalletId;
    this.lastSignInAt = lastSignInAt;
    this.externalId = externalId;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.publicMetadata = publicMetadata;
    this.privateMetadata = privateMetadata;
    this.unsafeMetadata = unsafeMetadata;
    this.emailAddresses = emailAddresses;
    this.phoneNumbers = phoneNumbers;
    this.web3Wallets = web3Wallets;
    this.externalAccounts = externalAccounts;
    this.samlAccounts = samlAccounts;
    this.lastActiveAt = lastActiveAt;
    this.createOrganizationEnabled = createOrganizationEnabled;
    this.createOrganizationsLimit = createOrganizationsLimit;
    this.deleteSelfEnabled = deleteSelfEnabled;
    this.legalAcceptedAt = legalAcceptedAt;
    this.locale = locale;
    this._raw = null;
  }
  get raw() {
    return this._raw;
  }
  static fromJSON(data) {
    const res = new _User(
      data.id,
      data.password_enabled,
      data.totp_enabled,
      data.backup_code_enabled,
      data.two_factor_enabled,
      data.banned,
      data.locked,
      data.created_at,
      data.updated_at,
      data.image_url,
      data.has_image,
      data.primary_email_address_id,
      data.primary_phone_number_id,
      data.primary_web3_wallet_id,
      data.last_sign_in_at,
      data.external_id,
      data.username,
      data.first_name,
      data.last_name,
      data.public_metadata,
      data.private_metadata,
      data.unsafe_metadata,
      (data.email_addresses || []).map((x) => EmailAddress.fromJSON(x)),
      (data.phone_numbers || []).map((x) => PhoneNumber.fromJSON(x)),
      (data.web3_wallets || []).map((x) => Web3Wallet.fromJSON(x)),
      (data.external_accounts || []).map((x) => ExternalAccount.fromJSON(x)),
      (data.saml_accounts || []).map((x) => SamlAccount.fromJSON(x)),
      data.last_active_at,
      data.create_organization_enabled,
      data.create_organizations_limit,
      data.delete_self_enabled,
      data.legal_accepted_at,
      data.locale
    );
    res._raw = data;
    return res;
  }
  /**
   * The primary email address of the user.
   */
  get primaryEmailAddress() {
    return this.emailAddresses.find(({ id }) => id === this.primaryEmailAddressId) ?? null;
  }
  /**
   * The primary phone number of the user.
   */
  get primaryPhoneNumber() {
    return this.phoneNumbers.find(({ id }) => id === this.primaryPhoneNumberId) ?? null;
  }
  /**
   * The primary web3 wallet of the user.
   */
  get primaryWeb3Wallet() {
    return this.web3Wallets.find(({ id }) => id === this.primaryWeb3WalletId) ?? null;
  }
  /**
   * The full name of the user.
   */
  get fullName() {
    return [this.firstName, this.lastName].join(" ").trim() || null;
  }
};
var WaitlistEntry = class _WaitlistEntry {
  static {
    __name(this, "_WaitlistEntry");
  }
  constructor(id, emailAddress, status, invitation, createdAt, updatedAt, isLocked) {
    this.id = id;
    this.emailAddress = emailAddress;
    this.status = status;
    this.invitation = invitation;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isLocked = isLocked;
  }
  static fromJSON(data) {
    return new _WaitlistEntry(
      data.id,
      data.email_address,
      data.status,
      data.invitation && Invitation.fromJSON(data.invitation),
      data.created_at,
      data.updated_at,
      data.is_locked
    );
  }
};
var Feature = class _Feature {
  static {
    __name(this, "_Feature");
  }
  constructor(id, name2, description, slug, avatarUrl) {
    this.id = id;
    this.name = name2;
    this.description = description;
    this.slug = slug;
    this.avatarUrl = avatarUrl;
  }
  static fromJSON(data) {
    return new _Feature(data.id, data.name, data.description ?? null, data.slug, data.avatar_url ?? null);
  }
};
var BillingPlan = class _BillingPlan {
  static {
    __name(this, "_BillingPlan");
  }
  constructor(id, name2, slug, description, isDefault, isRecurring, hasBaseFee, publiclyVisible, fee, annualFee, annualMonthlyFee, forPayerType, features) {
    this.id = id;
    this.name = name2;
    this.slug = slug;
    this.description = description;
    this.isDefault = isDefault;
    this.isRecurring = isRecurring;
    this.hasBaseFee = hasBaseFee;
    this.publiclyVisible = publiclyVisible;
    this.fee = fee;
    this.annualFee = annualFee;
    this.annualMonthlyFee = annualMonthlyFee;
    this.forPayerType = forPayerType;
    this.features = features;
  }
  static fromJSON(data) {
    const formatAmountJSON = /* @__PURE__ */ __name((fee) => {
      return fee ? {
        amount: fee.amount,
        amountFormatted: fee.amount_formatted,
        currency: fee.currency,
        currencySymbol: fee.currency_symbol
      } : null;
    }, "formatAmountJSON");
    return new _BillingPlan(
      data.id,
      data.name,
      data.slug,
      data.description ?? null,
      data.is_default,
      data.is_recurring,
      data.has_base_fee,
      data.publicly_visible,
      formatAmountJSON(data.fee),
      formatAmountJSON(data.annual_fee),
      formatAmountJSON(data.annual_monthly_fee),
      data.for_payer_type,
      (data.features ?? []).map((feature) => Feature.fromJSON(feature))
    );
  }
};
var BillingSubscriptionItem = class _BillingSubscriptionItem {
  static {
    __name(this, "_BillingSubscriptionItem");
  }
  constructor(id, status, planPeriod, periodStart, nextPayment, amount, plan, planId, createdAt, updatedAt, periodEnd, canceledAt, pastDueAt, endedAt, payerId, isFreeTrial, lifetimePaid) {
    this.id = id;
    this.status = status;
    this.planPeriod = planPeriod;
    this.periodStart = periodStart;
    this.nextPayment = nextPayment;
    this.amount = amount;
    this.plan = plan;
    this.planId = planId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.periodEnd = periodEnd;
    this.canceledAt = canceledAt;
    this.pastDueAt = pastDueAt;
    this.endedAt = endedAt;
    this.payerId = payerId;
    this.isFreeTrial = isFreeTrial;
    this.lifetimePaid = lifetimePaid;
  }
  static fromJSON(data) {
    function formatAmountJSON(amount) {
      if (!amount) {
        return amount;
      }
      return {
        amount: amount.amount,
        amountFormatted: amount.amount_formatted,
        currency: amount.currency,
        currencySymbol: amount.currency_symbol
      };
    }
    __name(formatAmountJSON, "formatAmountJSON");
    return new _BillingSubscriptionItem(
      data.id,
      data.status,
      data.plan_period,
      data.period_start,
      data.next_payment,
      formatAmountJSON(data.amount) ?? void 0,
      data.plan ? BillingPlan.fromJSON(data.plan) : null,
      data.plan_id ?? null,
      data.created_at,
      data.updated_at,
      data.period_end,
      data.canceled_at,
      data.past_due_at,
      data.ended_at,
      data.payer_id,
      data.is_free_trial,
      formatAmountJSON(data.lifetime_paid) ?? void 0
    );
  }
};
var BillingSubscription = class _BillingSubscription {
  static {
    __name(this, "_BillingSubscription");
  }
  constructor(id, status, payerId, createdAt, updatedAt, activeAt, pastDueAt, subscriptionItems, nextPayment, eligibleForFreeTrial) {
    this.id = id;
    this.status = status;
    this.payerId = payerId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.activeAt = activeAt;
    this.pastDueAt = pastDueAt;
    this.subscriptionItems = subscriptionItems;
    this.nextPayment = nextPayment;
    this.eligibleForFreeTrial = eligibleForFreeTrial;
  }
  static fromJSON(data) {
    const nextPayment = data.next_payment ? {
      date: data.next_payment.date,
      amount: {
        amount: data.next_payment.amount.amount,
        amountFormatted: data.next_payment.amount.amount_formatted,
        currency: data.next_payment.amount.currency,
        currencySymbol: data.next_payment.amount.currency_symbol
      }
    } : null;
    return new _BillingSubscription(
      data.id,
      data.status,
      data.payer_id,
      data.created_at,
      data.updated_at,
      data.active_at ?? null,
      data.past_due_at ?? null,
      (data.subscription_items ?? []).map((item) => BillingSubscriptionItem.fromJSON(item)),
      nextPayment,
      data.eligible_for_free_trial ?? false
    );
  }
};
function deserialize(payload) {
  let data, totalCount;
  if (Array.isArray(payload)) {
    const data2 = payload.map((item) => jsonToObject(item));
    return { data: data2 };
  } else if (isM2MTokenResponse(payload)) {
    data = payload.m2m_tokens.map((item) => jsonToObject(item));
    totalCount = payload.total_count;
    return { data, totalCount };
  } else if (isPaginated(payload)) {
    data = payload.data.map((item) => jsonToObject(item));
    totalCount = payload.total_count;
    return { data, totalCount };
  } else {
    return { data: jsonToObject(payload) };
  }
}
__name(deserialize, "deserialize");
function isPaginated(payload) {
  if (!payload || typeof payload !== "object" || !("data" in payload)) {
    return false;
  }
  return Array.isArray(payload.data) && payload.data !== void 0;
}
__name(isPaginated, "isPaginated");
function isM2MTokenResponse(payload) {
  if (!payload || typeof payload !== "object" || !("m2m_tokens" in payload)) {
    return false;
  }
  return Array.isArray(payload.m2m_tokens);
}
__name(isM2MTokenResponse, "isM2MTokenResponse");
function getCount(item) {
  return item.total_count;
}
__name(getCount, "getCount");
function jsonToObject(item) {
  if (typeof item !== "string" && "object" in item && "deleted" in item) {
    return DeletedObject.fromJSON(item);
  }
  switch (item.object) {
    case ObjectType.AccountlessApplication:
      return AccountlessApplication.fromJSON(item);
    case ObjectType.ActorToken:
      return ActorToken.fromJSON(item);
    case ObjectType.AllowlistIdentifier:
      return AllowlistIdentifier.fromJSON(item);
    case ObjectType.ApiKey:
      return APIKey.fromJSON(item);
    case ObjectType.BlocklistIdentifier:
      return BlocklistIdentifier.fromJSON(item);
    case ObjectType.Client:
      return Client.fromJSON(item);
    case ObjectType.Cookies:
      return Cookies2.fromJSON(item);
    case ObjectType.Domain:
      return Domain.fromJSON(item);
    case ObjectType.EmailAddress:
      return EmailAddress.fromJSON(item);
    case ObjectType.Email:
      return Email.fromJSON(item);
    case ObjectType.IdpOAuthAccessToken:
      return IdPOAuthAccessToken.fromJSON(item);
    case ObjectType.Instance:
      return Instance.fromJSON(item);
    case ObjectType.InstanceRestrictions:
      return InstanceRestrictions.fromJSON(item);
    case ObjectType.InstanceSettings:
      return InstanceSettings.fromJSON(item);
    case ObjectType.Invitation:
      return Invitation.fromJSON(item);
    case ObjectType.JwtTemplate:
      return JwtTemplate.fromJSON(item);
    case ObjectType.Machine:
      return Machine.fromJSON(item);
    case ObjectType.MachineScope:
      return MachineScope.fromJSON(item);
    case ObjectType.MachineSecretKey:
      return MachineSecretKey.fromJSON(item);
    case ObjectType.M2MToken:
      return M2MToken.fromJSON(item);
    case ObjectType.OauthAccessToken:
      return OauthAccessToken.fromJSON(item);
    case ObjectType.OAuthApplication:
      return OAuthApplication.fromJSON(item);
    case ObjectType.Organization:
      return Organization.fromJSON(item);
    case ObjectType.OrganizationInvitation:
      return OrganizationInvitation.fromJSON(item);
    case ObjectType.OrganizationMembership:
      return OrganizationMembership.fromJSON(item);
    case ObjectType.OrganizationSettings:
      return OrganizationSettings.fromJSON(item);
    case ObjectType.PhoneNumber:
      return PhoneNumber.fromJSON(item);
    case ObjectType.ProxyCheck:
      return ProxyCheck.fromJSON(item);
    case ObjectType.RedirectUrl:
      return RedirectUrl.fromJSON(item);
    case ObjectType.SamlConnection:
      return SamlConnection.fromJSON(item);
    case ObjectType.SignInToken:
      return SignInToken.fromJSON(item);
    case ObjectType.AgentTask:
      return AgentTask.fromJSON(item);
    case ObjectType.SignUpAttempt:
      return SignUpAttempt.fromJSON(item);
    case ObjectType.Session:
      return Session.fromJSON(item);
    case ObjectType.SmsMessage:
      return SMSMessage.fromJSON(item);
    case ObjectType.Token:
      return Token.fromJSON(item);
    case ObjectType.TotalCount:
      return getCount(item);
    case ObjectType.User:
      return User.fromJSON(item);
    case ObjectType.WaitlistEntry:
      return WaitlistEntry.fromJSON(item);
    case ObjectType.BillingPlan:
      return BillingPlan.fromJSON(item);
    case ObjectType.BillingSubscription:
      return BillingSubscription.fromJSON(item);
    case ObjectType.BillingSubscriptionItem:
      return BillingSubscriptionItem.fromJSON(item);
    case ObjectType.Feature:
      return Feature.fromJSON(item);
    default:
      return item;
  }
}
__name(jsonToObject, "jsonToObject");
function buildRequest(options) {
  const requestFn = /* @__PURE__ */ __name(async (requestOptions) => {
    const {
      secretKey,
      machineSecretKey,
      useMachineSecretKey = false,
      requireSecretKey = true,
      apiUrl = API_URL,
      apiVersion = API_VERSION,
      userAgent = USER_AGENT,
      skipApiVersionInUrl = false
    } = options;
    const { path, method, queryParams, headerParams, bodyParams, formData, options: opts } = requestOptions;
    const { deepSnakecaseBodyParamKeys = false } = opts || {};
    if (requireSecretKey) {
      assertValidSecretKey(secretKey);
    }
    const url = skipApiVersionInUrl ? joinPaths(apiUrl, path) : joinPaths(apiUrl, apiVersion, path);
    const finalUrl = new URL(url);
    if (queryParams) {
      const snakecasedQueryParams = snakecase_keys_default({ ...queryParams });
      for (const [key, val] of Object.entries(snakecasedQueryParams)) {
        if (val) {
          [val].flat().forEach((v) => finalUrl.searchParams.append(key, v));
        }
      }
    }
    const headers = new Headers({
      "Clerk-API-Version": SUPPORTED_BAPI_VERSION,
      [constants.Headers.UserAgent]: userAgent,
      ...headerParams
    });
    const authorizationHeader = constants.Headers.Authorization;
    if (!headers.has(authorizationHeader)) {
      if (useMachineSecretKey && machineSecretKey) {
        headers.set(authorizationHeader, `Bearer ${machineSecretKey}`);
      } else if (secretKey) {
        headers.set(authorizationHeader, `Bearer ${secretKey}`);
      }
    }
    let res;
    try {
      if (formData) {
        res = await runtime.fetch(finalUrl.href, {
          method,
          headers,
          body: formData
        });
      } else {
        headers.set("Content-Type", "application/json");
        const buildBody = /* @__PURE__ */ __name(() => {
          const hasBody = method !== "GET" && bodyParams && Object.keys(bodyParams).length > 0;
          if (!hasBody) {
            return null;
          }
          const formatKeys = /* @__PURE__ */ __name((object) => snakecase_keys_default(object, { deep: deepSnakecaseBodyParamKeys }), "formatKeys");
          return {
            body: JSON.stringify(Array.isArray(bodyParams) ? bodyParams.map(formatKeys) : formatKeys(bodyParams))
          };
        }, "buildBody");
        res = await runtime.fetch(finalUrl.href, {
          method,
          headers,
          ...buildBody()
        });
      }
      const isJSONResponse = res?.headers && res.headers?.get(constants.Headers.ContentType) === constants.ContentTypes.Json;
      const responseBody = await (isJSONResponse ? res.json() : res.text());
      if (!res.ok) {
        return {
          data: null,
          errors: parseErrors2(responseBody),
          status: res?.status,
          statusText: res?.statusText,
          clerkTraceId: getTraceId(responseBody, res?.headers),
          retryAfter: getRetryAfter(res?.headers)
        };
      }
      return {
        ...deserialize(responseBody),
        errors: null
      };
    } catch (err) {
      if (err instanceof Error) {
        return {
          data: null,
          errors: [
            {
              code: "unexpected_error",
              message: err.message || "Unexpected error"
            }
          ],
          clerkTraceId: getTraceId(err, res?.headers)
        };
      }
      return {
        data: null,
        errors: parseErrors2(err),
        status: res?.status,
        statusText: res?.statusText,
        clerkTraceId: getTraceId(err, res?.headers),
        retryAfter: getRetryAfter(res?.headers)
      };
    }
  }, "requestFn");
  return withLegacyRequestReturn(requestFn);
}
__name(buildRequest, "buildRequest");
function getTraceId(data, headers) {
  if (data && typeof data === "object" && "clerk_trace_id" in data && typeof data.clerk_trace_id === "string") {
    return data.clerk_trace_id;
  }
  const cfRay = headers?.get("cf-ray");
  return cfRay || "";
}
__name(getTraceId, "getTraceId");
function getRetryAfter(headers) {
  const retryAfter = headers?.get("Retry-After");
  if (!retryAfter) {
    return;
  }
  const value = parseInt(retryAfter, 10);
  if (isNaN(value)) {
    return;
  }
  return value;
}
__name(getRetryAfter, "getRetryAfter");
function parseErrors2(data) {
  if (!!data && typeof data === "object" && "errors" in data) {
    const errors = data.errors;
    return errors.length > 0 ? errors.map(parseError) : [];
  }
  return [];
}
__name(parseErrors2, "parseErrors");
function withLegacyRequestReturn(cb) {
  return async (...args) => {
    const { data, errors, totalCount, status, statusText, clerkTraceId, retryAfter } = await cb(...args);
    if (errors) {
      const error = new ClerkAPIResponseError(statusText || "", {
        data: [],
        status,
        clerkTraceId,
        retryAfter
      });
      error.errors = errors;
      throw error;
    }
    if (typeof totalCount !== "undefined") {
      return { data, totalCount };
    }
    return data;
  };
}
__name(withLegacyRequestReturn, "withLegacyRequestReturn");
function createBackendApiClient(options) {
  const request = buildRequest(options);
  return {
    __experimental_accountlessApplications: new AccountlessApplicationAPI(
      buildRequest({ ...options, requireSecretKey: false })
    ),
    actorTokens: new ActorTokenAPI(request),
    /**
     * @experimental This is an experimental API for the Agent Tasks feature that is available under a private beta, and the API is subject to change. It is advised to [pin](https://clerk.com/docs/pinning) the SDK version and the clerk-js version to avoid breaking changes.
     */
    agentTasks: new AgentTaskAPI(request),
    allowlistIdentifiers: new AllowlistIdentifierAPI(request),
    apiKeys: new APIKeysAPI(
      buildRequest({
        ...options,
        skipApiVersionInUrl: true
      })
    ),
    betaFeatures: new BetaFeaturesAPI(request),
    blocklistIdentifiers: new BlocklistIdentifierAPI(request),
    /**
     * @experimental This is an experimental API for the Billing feature that is available under a public beta, and the API is subject to change. It is advised to [pin](https://clerk.com/docs/pinning) the SDK version and the clerk-js version to avoid breaking changes.
     */
    billing: new BillingAPI(request),
    clients: new ClientAPI(request),
    domains: new DomainAPI(request),
    emailAddresses: new EmailAddressAPI(request),
    idPOAuthAccessToken: new IdPOAuthAccessTokenApi(
      buildRequest({
        ...options,
        skipApiVersionInUrl: true
      })
    ),
    instance: new InstanceAPI(request),
    invitations: new InvitationAPI(request),
    jwks: new JwksAPI(request),
    jwtTemplates: new JwtTemplatesApi(request),
    machines: new MachineApi(request),
    m2m: new M2MTokenApi(
      buildRequest({
        ...options,
        skipApiVersionInUrl: true,
        requireSecretKey: false,
        useMachineSecretKey: true
      }),
      {
        secretKey: options.secretKey,
        apiUrl: options.apiUrl,
        jwtKey: options.jwtKey
      }
    ),
    oauthApplications: new OAuthApplicationsApi(request),
    organizations: new OrganizationAPI(request),
    phoneNumbers: new PhoneNumberAPI(request),
    proxyChecks: new ProxyCheckAPI(request),
    redirectUrls: new RedirectUrlAPI(request),
    samlConnections: new SamlConnectionAPI(request),
    sessions: new SessionAPI(request),
    signInTokens: new SignInTokenAPI(request),
    signUps: new SignUpAPI(request),
    testingTokens: new TestingTokenAPI(request),
    users: new UserAPI(request),
    waitlistEntries: new WaitlistEntryAPI(request),
    webhooks: new WebhookAPI(request)
  };
}
__name(createBackendApiClient, "createBackendApiClient");
var createDebug = /* @__PURE__ */ __name((data) => {
  return () => {
    const res = { ...data };
    res.secretKey = (res.secretKey || "").substring(0, 7);
    res.jwtKey = (res.jwtKey || "").substring(0, 7);
    return { ...res };
  };
}, "createDebug");
function signedInAuthObject(authenticateContext, sessionToken, sessionClaims) {
  const { actor, sessionId, sessionStatus, userId, orgId, orgRole, orgSlug, orgPermissions, factorVerificationAge } = __experimental_JWTPayloadToAuthObjectProperties(sessionClaims);
  const apiClient = createBackendApiClient(authenticateContext);
  const getToken = createGetToken({
    sessionId,
    sessionToken,
    fetcher: /* @__PURE__ */ __name(async (sessionId2, template, expiresInSeconds) => (await apiClient.sessions.getToken(sessionId2, template || "", expiresInSeconds)).jwt, "fetcher")
  });
  return {
    tokenType: TokenType.SessionToken,
    actor,
    sessionClaims,
    sessionId,
    sessionStatus,
    userId,
    orgId,
    orgRole,
    orgSlug,
    orgPermissions,
    factorVerificationAge,
    getToken,
    has: createCheckAuthorization({
      orgId,
      orgRole,
      orgPermissions,
      userId,
      factorVerificationAge,
      features: sessionClaims.fea || "",
      plans: sessionClaims.pla || ""
    }),
    debug: createDebug({ ...authenticateContext, sessionToken }),
    isAuthenticated: true
  };
}
__name(signedInAuthObject, "signedInAuthObject");
function signedOutAuthObject(debugData, initialSessionStatus) {
  return {
    tokenType: TokenType.SessionToken,
    sessionClaims: null,
    sessionId: null,
    sessionStatus: initialSessionStatus ?? null,
    userId: null,
    actor: null,
    orgId: null,
    orgRole: null,
    orgSlug: null,
    orgPermissions: null,
    factorVerificationAge: null,
    getToken: /* @__PURE__ */ __name(() => Promise.resolve(null), "getToken"),
    has: /* @__PURE__ */ __name(() => false, "has"),
    debug: createDebug(debugData),
    isAuthenticated: false
  };
}
__name(signedOutAuthObject, "signedOutAuthObject");
function authenticatedMachineObject(tokenType, token, verificationResult, debugData) {
  const baseObject = {
    id: verificationResult.id,
    subject: verificationResult.subject,
    getToken: /* @__PURE__ */ __name(() => Promise.resolve(token), "getToken"),
    has: /* @__PURE__ */ __name(() => false, "has"),
    debug: createDebug(debugData),
    isAuthenticated: true
  };
  switch (tokenType) {
    case TokenType.ApiKey: {
      const result = verificationResult;
      return {
        ...baseObject,
        tokenType,
        name: result.name,
        claims: result.claims,
        scopes: result.scopes,
        userId: result.subject.startsWith("user_") ? result.subject : null,
        orgId: result.subject.startsWith("org_") ? result.subject : null
      };
    }
    case TokenType.M2MToken: {
      const result = verificationResult;
      return {
        ...baseObject,
        tokenType,
        claims: result.claims,
        scopes: result.scopes,
        machineId: result.subject
      };
    }
    case TokenType.OAuthToken: {
      const result = verificationResult;
      return {
        ...baseObject,
        tokenType,
        scopes: result.scopes,
        userId: result.subject,
        clientId: result.clientId
      };
    }
    default:
      throw new Error(`Invalid token type: ${tokenType}`);
  }
}
__name(authenticatedMachineObject, "authenticatedMachineObject");
function unauthenticatedMachineObject(tokenType, debugData) {
  const baseObject = {
    id: null,
    subject: null,
    scopes: null,
    has: /* @__PURE__ */ __name(() => false, "has"),
    getToken: /* @__PURE__ */ __name(() => Promise.resolve(null), "getToken"),
    debug: createDebug(debugData),
    isAuthenticated: false
  };
  switch (tokenType) {
    case TokenType.ApiKey: {
      return {
        ...baseObject,
        tokenType,
        name: null,
        claims: null,
        scopes: null,
        userId: null,
        orgId: null
      };
    }
    case TokenType.M2MToken: {
      return {
        ...baseObject,
        tokenType,
        claims: null,
        scopes: null,
        machineId: null
      };
    }
    case TokenType.OAuthToken: {
      return {
        ...baseObject,
        tokenType,
        scopes: null,
        userId: null,
        clientId: null
      };
    }
    default:
      throw new Error(`Invalid token type: ${tokenType}`);
  }
}
__name(unauthenticatedMachineObject, "unauthenticatedMachineObject");
function invalidTokenAuthObject() {
  return {
    isAuthenticated: false,
    tokenType: null,
    getToken: /* @__PURE__ */ __name(() => Promise.resolve(null), "getToken"),
    has: /* @__PURE__ */ __name(() => false, "has"),
    debug: /* @__PURE__ */ __name(() => ({}), "debug")
  };
}
__name(invalidTokenAuthObject, "invalidTokenAuthObject");
var createGetToken = /* @__PURE__ */ __name((params) => {
  const { fetcher, sessionToken, sessionId } = params || {};
  return async (options = {}) => {
    if (!sessionId) {
      return null;
    }
    if (options.template || options.expiresInSeconds !== void 0) {
      return fetcher(sessionId, options.template, options.expiresInSeconds);
    }
    return sessionToken;
  };
}, "createGetToken");
var getAuthObjectForAcceptedToken = /* @__PURE__ */ __name(({
  authObject,
  acceptsToken = TokenType.SessionToken
}) => {
  if (acceptsToken === "any") {
    return authObject;
  }
  if (Array.isArray(acceptsToken)) {
    if (!isTokenTypeAccepted(authObject.tokenType, acceptsToken)) {
      return invalidTokenAuthObject();
    }
    return authObject;
  }
  if (!isTokenTypeAccepted(authObject.tokenType, acceptsToken)) {
    if (isMachineTokenType(acceptsToken)) {
      return unauthenticatedMachineObject(acceptsToken, authObject.debug);
    }
    return signedOutAuthObject(authObject.debug);
  }
  return authObject;
}, "getAuthObjectForAcceptedToken");
var AuthStatus = {
  SignedIn: "signed-in",
  SignedOut: "signed-out",
  Handshake: "handshake"
};
var AuthErrorReason = {
  ClientUATWithoutSessionToken: "client-uat-but-no-session-token",
  DevBrowserMissing: "dev-browser-missing",
  DevBrowserSync: "dev-browser-sync",
  PrimaryRespondsToSyncing: "primary-responds-to-syncing",
  PrimaryDomainCrossOriginSync: "primary-domain-cross-origin-sync",
  SatelliteCookieNeedsSyncing: "satellite-needs-syncing",
  SessionTokenAndUATMissing: "session-token-and-uat-missing",
  SessionTokenMissing: "session-token-missing",
  SessionTokenExpired: "session-token-expired",
  SessionTokenIATBeforeClientUAT: "session-token-iat-before-client-uat",
  SessionTokenNBF: "session-token-nbf",
  SessionTokenIatInTheFuture: "session-token-iat-in-the-future",
  SessionTokenWithoutClientUAT: "session-token-but-no-client-uat",
  ActiveOrganizationMismatch: "active-organization-mismatch",
  TokenTypeMismatch: "token-type-mismatch",
  UnexpectedError: "unexpected-error"
};
function signedIn(params) {
  const { authenticateContext, headers = new Headers(), token } = params;
  const toAuth = /* @__PURE__ */ __name((({ treatPendingAsSignedOut = true } = {}) => {
    if (params.tokenType === TokenType.SessionToken) {
      const { sessionClaims } = params;
      const authObject = signedInAuthObject(authenticateContext, token, sessionClaims);
      if (treatPendingAsSignedOut && authObject.sessionStatus === "pending") {
        return signedOutAuthObject(void 0, authObject.sessionStatus);
      }
      return authObject;
    }
    const { machineData } = params;
    return authenticatedMachineObject(params.tokenType, token, machineData, authenticateContext);
  }), "toAuth");
  return {
    status: AuthStatus.SignedIn,
    reason: null,
    message: null,
    proxyUrl: authenticateContext.proxyUrl || "",
    publishableKey: authenticateContext.publishableKey || "",
    isSatellite: authenticateContext.isSatellite || false,
    domain: authenticateContext.domain || "",
    signInUrl: authenticateContext.signInUrl || "",
    signUpUrl: authenticateContext.signUpUrl || "",
    afterSignInUrl: authenticateContext.afterSignInUrl || "",
    afterSignUpUrl: authenticateContext.afterSignUpUrl || "",
    isSignedIn: true,
    isAuthenticated: true,
    tokenType: params.tokenType,
    toAuth,
    headers,
    token
  };
}
__name(signedIn, "signedIn");
function signedOut(params) {
  const { authenticateContext, headers = new Headers(), reason, message = "", tokenType } = params;
  const toAuth = /* @__PURE__ */ __name((() => {
    if (tokenType === TokenType.SessionToken) {
      return signedOutAuthObject({ ...authenticateContext, status: AuthStatus.SignedOut, reason, message });
    }
    return unauthenticatedMachineObject(tokenType, { reason, message, headers });
  }), "toAuth");
  return withDebugHeaders({
    status: AuthStatus.SignedOut,
    reason,
    message,
    proxyUrl: authenticateContext.proxyUrl || "",
    publishableKey: authenticateContext.publishableKey || "",
    isSatellite: authenticateContext.isSatellite || false,
    domain: authenticateContext.domain || "",
    signInUrl: authenticateContext.signInUrl || "",
    signUpUrl: authenticateContext.signUpUrl || "",
    afterSignInUrl: authenticateContext.afterSignInUrl || "",
    afterSignUpUrl: authenticateContext.afterSignUpUrl || "",
    isSignedIn: false,
    isAuthenticated: false,
    tokenType,
    toAuth,
    headers,
    token: null
  });
}
__name(signedOut, "signedOut");
function handshake(authenticateContext, reason, message = "", headers) {
  return withDebugHeaders({
    status: AuthStatus.Handshake,
    reason,
    message,
    publishableKey: authenticateContext.publishableKey || "",
    isSatellite: authenticateContext.isSatellite || false,
    domain: authenticateContext.domain || "",
    proxyUrl: authenticateContext.proxyUrl || "",
    signInUrl: authenticateContext.signInUrl || "",
    signUpUrl: authenticateContext.signUpUrl || "",
    afterSignInUrl: authenticateContext.afterSignInUrl || "",
    afterSignUpUrl: authenticateContext.afterSignUpUrl || "",
    isSignedIn: false,
    isAuthenticated: false,
    tokenType: TokenType.SessionToken,
    toAuth: /* @__PURE__ */ __name(() => null, "toAuth"),
    headers,
    token: null
  });
}
__name(handshake, "handshake");
function signedOutInvalidToken() {
  const authObject = invalidTokenAuthObject();
  return withDebugHeaders({
    status: AuthStatus.SignedOut,
    reason: AuthErrorReason.TokenTypeMismatch,
    message: "",
    proxyUrl: "",
    publishableKey: "",
    isSatellite: false,
    domain: "",
    signInUrl: "",
    signUpUrl: "",
    afterSignInUrl: "",
    afterSignUpUrl: "",
    isSignedIn: false,
    isAuthenticated: false,
    tokenType: null,
    toAuth: /* @__PURE__ */ __name(() => authObject, "toAuth"),
    headers: new Headers(),
    token: null
  });
}
__name(signedOutInvalidToken, "signedOutInvalidToken");
var withDebugHeaders = /* @__PURE__ */ __name((requestState) => {
  const headers = new Headers(requestState.headers || {});
  if (requestState.message) {
    try {
      headers.set(constants.Headers.AuthMessage, requestState.message);
    } catch {
    }
  }
  if (requestState.reason) {
    try {
      headers.set(constants.Headers.AuthReason, requestState.reason);
    } catch {
    }
  }
  if (requestState.status) {
    try {
      headers.set(constants.Headers.AuthStatus, requestState.status);
    } catch {
    }
  }
  requestState.headers = headers;
  return requestState;
}, "withDebugHeaders");
var import_cookie = __toESM2(require_dist());
var ClerkUrl = class extends URL {
  static {
    __name(this, "ClerkUrl");
  }
  isCrossOrigin(other) {
    return this.origin !== new URL(other.toString()).origin;
  }
};
var createClerkUrl = /* @__PURE__ */ __name((...args) => {
  return new ClerkUrl(...args);
}, "createClerkUrl");
var ClerkRequest = class extends Request {
  static {
    __name(this, "ClerkRequest");
  }
  constructor(input, init2) {
    const url = typeof input !== "string" && "url" in input ? input.url : String(input);
    super(url, init2 || typeof input === "string" ? void 0 : input);
    this.clerkUrl = this.deriveUrlFromHeaders(this);
    this.cookies = this.parseCookies(this);
  }
  toJSON() {
    return {
      url: this.clerkUrl.href,
      method: this.method,
      headers: JSON.stringify(Object.fromEntries(this.headers)),
      clerkUrl: this.clerkUrl.toString(),
      cookies: JSON.stringify(Object.fromEntries(this.cookies))
    };
  }
  /**
   * Used to fix request.url using the x-forwarded-* headers
   * TODO add detailed description of the issues this solves
   */
  deriveUrlFromHeaders(req) {
    const initialUrl = new URL(req.url);
    const forwardedProto = req.headers.get(constants.Headers.ForwardedProto);
    const forwardedHost = req.headers.get(constants.Headers.ForwardedHost);
    const host = req.headers.get(constants.Headers.Host);
    const protocol = initialUrl.protocol;
    const resolvedHost = this.getFirstValueFromHeader(forwardedHost) ?? host;
    const resolvedProtocol = this.getFirstValueFromHeader(forwardedProto) ?? protocol?.replace(/[:/]/, "");
    const origin = resolvedHost && resolvedProtocol ? `${resolvedProtocol}://${resolvedHost}` : initialUrl.origin;
    if (origin === initialUrl.origin) {
      return createClerkUrl(initialUrl);
    }
    return createClerkUrl(initialUrl.pathname + initialUrl.search, origin);
  }
  getFirstValueFromHeader(value) {
    return value?.split(",")[0];
  }
  parseCookies(req) {
    const cookiesRecord = (0, import_cookie.parse)(this.decodeCookieValue(req.headers.get("cookie") || ""));
    return new Map(Object.entries(cookiesRecord));
  }
  decodeCookieValue(str) {
    return str ? str.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent) : str;
  }
};
var createClerkRequest = /* @__PURE__ */ __name((...args) => {
  const isClerkRequest = args[0] && typeof args[0] === "object" && "clerkUrl" in args[0] && "cookies" in args[0];
  return isClerkRequest ? args[0] : new ClerkRequest(...args);
}, "createClerkRequest");
var getCookieName = /* @__PURE__ */ __name((cookieDirective) => {
  return cookieDirective.split(";")[0]?.split("=")[0];
}, "getCookieName");
var getCookieValue = /* @__PURE__ */ __name((cookieDirective) => {
  return cookieDirective.split(";")[0]?.split("=")[1];
}, "getCookieValue");
async function verifyToken(token, options) {
  const { data: decodedResult, errors } = decodeJwt(token);
  if (errors) {
    return { errors };
  }
  const { header } = decodedResult;
  const { kid } = header;
  try {
    let key;
    if (options.jwtKey) {
      key = loadClerkJwkFromPem({ kid, pem: options.jwtKey });
    } else if (options.secretKey) {
      key = await loadClerkJWKFromRemote({ ...options, kid });
    } else {
      return {
        errors: [
          new TokenVerificationError({
            action: TokenVerificationErrorAction.SetClerkJWTKey,
            message: "Failed to resolve JWK during verification.",
            reason: TokenVerificationErrorReason.JWKFailedToResolve
          })
        ]
      };
    }
    return await verifyJwt(token, { ...options, key });
  } catch (error) {
    return { errors: [error] };
  }
}
__name(verifyToken, "verifyToken");
function handleClerkAPIError(tokenType, err, notFoundMessage) {
  if (isClerkAPIResponseError(err)) {
    let code;
    let message;
    switch (err.status) {
      case 401:
        code = MachineTokenVerificationErrorCode.InvalidSecretKey;
        message = err.errors[0]?.message || "Invalid secret key";
        break;
      case 404:
        code = MachineTokenVerificationErrorCode.TokenInvalid;
        message = notFoundMessage;
        break;
      default:
        code = MachineTokenVerificationErrorCode.UnexpectedError;
        message = "Unexpected error";
    }
    return {
      data: void 0,
      tokenType,
      errors: [
        new MachineTokenVerificationError({
          message,
          code,
          status: err.status
        })
      ]
    };
  }
  return {
    data: void 0,
    tokenType,
    errors: [
      new MachineTokenVerificationError({
        message: "Unexpected error",
        code: MachineTokenVerificationErrorCode.UnexpectedError,
        status: err.status
      })
    ]
  };
}
__name(handleClerkAPIError, "handleClerkAPIError");
async function verifyM2MToken(token, options) {
  try {
    const client = createBackendApiClient(options);
    const verifiedToken = await client.m2m.verify({ token });
    return { data: verifiedToken, tokenType: TokenType.M2MToken, errors: void 0 };
  } catch (err) {
    return handleClerkAPIError(TokenType.M2MToken, err, "Machine token not found");
  }
}
__name(verifyM2MToken, "verifyM2MToken");
async function verifyOAuthToken(accessToken, options) {
  try {
    const client = createBackendApiClient(options);
    const verifiedToken = await client.idPOAuthAccessToken.verify(accessToken);
    return { data: verifiedToken, tokenType: TokenType.OAuthToken, errors: void 0 };
  } catch (err) {
    return handleClerkAPIError(TokenType.OAuthToken, err, "OAuth token not found");
  }
}
__name(verifyOAuthToken, "verifyOAuthToken");
async function verifyAPIKey(secret, options) {
  try {
    const client = createBackendApiClient(options);
    const verifiedToken = await client.apiKeys.verify(secret);
    return { data: verifiedToken, tokenType: TokenType.ApiKey, errors: void 0 };
  } catch (err) {
    return handleClerkAPIError(TokenType.ApiKey, err, "API key not found");
  }
}
__name(verifyAPIKey, "verifyAPIKey");
async function verifyMachineAuthToken(token, options) {
  if (isJwtFormat(token)) {
    let decodedResult;
    try {
      const { data, errors: decodeErrors } = decodeJwt(token);
      if (decodeErrors) {
        throw decodeErrors[0];
      }
      decodedResult = data;
    } catch (e) {
      return {
        data: void 0,
        tokenType: TokenType.M2MToken,
        errors: [
          new MachineTokenVerificationError({
            code: MachineTokenVerificationErrorCode.TokenInvalid,
            message: e.message
          })
        ]
      };
    }
    if (decodedResult.payload.sub.startsWith(M2M_SUBJECT_PREFIX)) {
      return verifyM2MJwt(token, decodedResult, options);
    }
    if (OAUTH_ACCESS_TOKEN_TYPES.includes(decodedResult.header.typ)) {
      return verifyOAuthJwt(token, decodedResult, options);
    }
    return {
      data: void 0,
      tokenType: TokenType.OAuthToken,
      errors: [
        new MachineTokenVerificationError({
          code: MachineTokenVerificationErrorCode.TokenVerificationFailed,
          message: `Invalid JWT type: ${decodedResult.header.typ ?? "missing"}. Expected one of: ${OAUTH_ACCESS_TOKEN_TYPES.join(", ")} for OAuth, or sub starting with 'mch_' for M2M`
        })
      ]
    };
  }
  if (token.startsWith(M2M_TOKEN_PREFIX)) {
    return verifyM2MToken(token, options);
  }
  if (token.startsWith(OAUTH_TOKEN_PREFIX)) {
    return verifyOAuthToken(token, options);
  }
  if (token.startsWith(API_KEY_PREFIX)) {
    return verifyAPIKey(token, options);
  }
  throw new Error("Unknown machine token type");
}
__name(verifyMachineAuthToken, "verifyMachineAuthToken");
async function verifyHandshakeJwt(token, { key }) {
  const { data: decoded, errors } = decodeJwt(token);
  if (errors) {
    throw errors[0];
  }
  const { header, payload } = decoded;
  const { typ, alg } = header;
  assertHeaderType(typ);
  assertHeaderAlgorithm(alg);
  const { data: signatureValid, errors: signatureErrors } = await hasValidSignature(decoded, key);
  if (signatureErrors) {
    throw new TokenVerificationError({
      reason: TokenVerificationErrorReason.TokenVerificationFailed,
      message: `Error verifying handshake token. ${signatureErrors[0]}`
    });
  }
  if (!signatureValid) {
    throw new TokenVerificationError({
      reason: TokenVerificationErrorReason.TokenInvalidSignature,
      message: "Handshake signature is invalid."
    });
  }
  return payload;
}
__name(verifyHandshakeJwt, "verifyHandshakeJwt");
async function verifyHandshakeToken(token, options) {
  const { secretKey, apiUrl, apiVersion, jwksCacheTtlInMs, jwtKey, skipJwksCache } = options;
  const { data, errors } = decodeJwt(token);
  if (errors) {
    throw errors[0];
  }
  const { kid } = data.header;
  let key;
  if (jwtKey) {
    key = loadClerkJwkFromPem({ kid, pem: jwtKey });
  } else if (secretKey) {
    key = await loadClerkJWKFromRemote({ secretKey, apiUrl, apiVersion, kid, jwksCacheTtlInMs, skipJwksCache });
  } else {
    throw new TokenVerificationError({
      action: TokenVerificationErrorAction.SetClerkJWTKey,
      message: "Failed to resolve JWK during handshake verification.",
      reason: TokenVerificationErrorReason.JWKFailedToResolve
    });
  }
  return verifyHandshakeJwt(token, { key });
}
__name(verifyHandshakeToken, "verifyHandshakeToken");
var HandshakeService = class {
  static {
    __name(this, "HandshakeService");
  }
  constructor(authenticateContext, options, organizationMatcher) {
    this.authenticateContext = authenticateContext;
    this.options = options;
    this.organizationMatcher = organizationMatcher;
  }
  /**
   * Determines if a request is eligible for handshake based on its headers
   *
   * Currently, a request is only eligible for a handshake if we can say it's *probably* a request for a document, not a fetch or some other exotic request.
   * This heuristic should give us a reliable enough signal for browsers that support `Sec-Fetch-Dest` and for those that don't.
   *
   * @returns boolean indicating if the request is eligible for handshake
   */
  isRequestEligibleForHandshake() {
    const { accept, secFetchDest } = this.authenticateContext;
    if (secFetchDest === "document" || secFetchDest === "iframe") {
      return true;
    }
    if (!secFetchDest && accept?.startsWith("text/html")) {
      return true;
    }
    return false;
  }
  /**
   * Builds the redirect headers for a handshake request
   * @param reason - The reason for the handshake (e.g. 'session-token-expired')
   * @returns Headers object containing the Location header for redirect
   * @throws Error if clerkUrl is missing in authenticateContext
   */
  buildRedirectToHandshake(reason) {
    if (!this.authenticateContext?.clerkUrl) {
      throw new Error("Missing clerkUrl in authenticateContext");
    }
    const redirectUrl = this.removeDevBrowserFromURL(this.authenticateContext.clerkUrl);
    let baseUrl = this.authenticateContext.frontendApi.startsWith("http") ? this.authenticateContext.frontendApi : `https://${this.authenticateContext.frontendApi}`;
    baseUrl = baseUrl.replace(/\/+$/, "") + "/";
    const url = new URL("v1/client/handshake", baseUrl);
    url.searchParams.append("redirect_url", redirectUrl?.href || "");
    url.searchParams.append("__clerk_api_version", SUPPORTED_BAPI_VERSION);
    url.searchParams.append(
      constants.QueryParameters.SuffixedCookies,
      this.authenticateContext.usesSuffixedCookies().toString()
    );
    url.searchParams.append(constants.QueryParameters.HandshakeReason, reason);
    url.searchParams.append(constants.QueryParameters.HandshakeFormat, "nonce");
    if (this.authenticateContext.sessionToken) {
      url.searchParams.append(constants.QueryParameters.Session, this.authenticateContext.sessionToken);
    }
    if (this.authenticateContext.instanceType === "development" && this.authenticateContext.devBrowserToken) {
      url.searchParams.append(constants.QueryParameters.DevBrowser, this.authenticateContext.devBrowserToken);
    }
    const toActivate = this.getOrganizationSyncTarget(this.authenticateContext.clerkUrl, this.organizationMatcher);
    if (toActivate) {
      const params = this.getOrganizationSyncQueryParams(toActivate);
      params.forEach((value, key) => {
        url.searchParams.append(key, value);
      });
    }
    return new Headers({ [constants.Headers.Location]: url.href });
  }
  /**
   * Gets cookies from either a handshake nonce or a handshake token
   * @returns Promise resolving to string array of cookie directives
   */
  async getCookiesFromHandshake() {
    const cookiesToSet = [];
    if (this.authenticateContext.handshakeNonce) {
      try {
        const handshakePayload = await this.authenticateContext.apiClient?.clients.getHandshakePayload({
          nonce: this.authenticateContext.handshakeNonce
        });
        if (handshakePayload) {
          cookiesToSet.push(...handshakePayload.directives);
        }
      } catch (error) {
        console.error("Clerk: HandshakeService: error getting handshake payload:", error);
      }
    } else if (this.authenticateContext.handshakeToken) {
      const handshakePayload = await verifyHandshakeToken(
        this.authenticateContext.handshakeToken,
        this.authenticateContext
      );
      if (handshakePayload && Array.isArray(handshakePayload.handshake)) {
        cookiesToSet.push(...handshakePayload.handshake);
      }
    }
    return cookiesToSet;
  }
  /**
   * Resolves a handshake request by verifying the handshake token and setting appropriate cookies
   * @returns Promise resolving to either a SignedInState or SignedOutState
   * @throws Error if handshake verification fails or if there are issues with the session token
   */
  async resolveHandshake() {
    const headers = new Headers({
      "Access-Control-Allow-Origin": "null",
      "Access-Control-Allow-Credentials": "true"
    });
    const cookiesToSet = await this.getCookiesFromHandshake();
    let sessionToken = "";
    cookiesToSet.forEach((x) => {
      headers.append("Set-Cookie", x);
      if (getCookieName(x).startsWith(constants.Cookies.Session)) {
        sessionToken = getCookieValue(x);
      }
    });
    if (this.authenticateContext.instanceType === "development") {
      const newUrl = new URL(this.authenticateContext.clerkUrl);
      newUrl.searchParams.delete(constants.QueryParameters.Handshake);
      newUrl.searchParams.delete(constants.QueryParameters.HandshakeHelp);
      newUrl.searchParams.delete(constants.QueryParameters.DevBrowser);
      newUrl.searchParams.delete(constants.QueryParameters.HandshakeNonce);
      headers.append(constants.Headers.Location, newUrl.toString());
      headers.set(constants.Headers.CacheControl, "no-store");
    }
    if (sessionToken === "") {
      return signedOut({
        tokenType: TokenType.SessionToken,
        authenticateContext: this.authenticateContext,
        reason: AuthErrorReason.SessionTokenMissing,
        message: "",
        headers
      });
    }
    const { data, errors: [error] = [] } = await verifyToken(sessionToken, this.authenticateContext);
    if (data) {
      return signedIn({
        tokenType: TokenType.SessionToken,
        authenticateContext: this.authenticateContext,
        sessionClaims: data,
        headers,
        token: sessionToken
      });
    }
    if (this.authenticateContext.instanceType === "development" && (error?.reason === TokenVerificationErrorReason.TokenExpired || error?.reason === TokenVerificationErrorReason.TokenNotActiveYet || error?.reason === TokenVerificationErrorReason.TokenIatInTheFuture)) {
      const developmentError = new TokenVerificationError({
        action: error.action,
        message: error.message,
        reason: error.reason
      });
      developmentError.tokenCarrier = "cookie";
      console.error(
        `Clerk: Clock skew detected. This usually means that your system clock is inaccurate. Clerk will attempt to account for the clock skew in development.

To resolve this issue, make sure your system's clock is set to the correct time (e.g. turn off and on automatic time synchronization).

---

${developmentError.getFullMessage()}`
      );
      const { data: retryResult, errors: [retryError] = [] } = await verifyToken(sessionToken, {
        ...this.authenticateContext,
        clockSkewInMs: 864e5
      });
      if (retryResult) {
        return signedIn({
          tokenType: TokenType.SessionToken,
          authenticateContext: this.authenticateContext,
          sessionClaims: retryResult,
          headers,
          token: sessionToken
        });
      }
      throw new Error(retryError?.message || "Clerk: Handshake retry failed.");
    }
    throw new Error(error?.message || "Clerk: Handshake failed.");
  }
  /**
   * Handles handshake token verification errors in development mode
   * @param error - The TokenVerificationError that occurred
   * @throws Error with a descriptive message about the verification failure
   */
  handleTokenVerificationErrorInDevelopment(error) {
    if (error.reason === TokenVerificationErrorReason.TokenInvalidSignature) {
      const msg = `Clerk: Handshake token verification failed due to an invalid signature. If you have switched Clerk keys locally, clear your cookies and try again.`;
      throw new Error(msg);
    }
    throw new Error(`Clerk: Handshake token verification failed: ${error.getFullMessage()}.`);
  }
  /**
   * Checks if a redirect loop is detected and sets headers to track redirect count
   * @param headers - The Headers object to modify
   * @returns boolean indicating if a redirect loop was detected (true) or if the request can proceed (false)
   */
  checkAndTrackRedirectLoop(headers) {
    if (this.authenticateContext.handshakeRedirectLoopCounter === 3) {
      return true;
    }
    const newCounterValue = this.authenticateContext.handshakeRedirectLoopCounter + 1;
    const cookieName = constants.Cookies.RedirectCount;
    headers.append("Set-Cookie", `${cookieName}=${newCounterValue}; SameSite=Lax; HttpOnly; Max-Age=2`);
    return false;
  }
  removeDevBrowserFromURL(url) {
    const updatedURL = new URL(url);
    updatedURL.searchParams.delete(constants.QueryParameters.DevBrowser);
    updatedURL.searchParams.delete(constants.QueryParameters.LegacyDevBrowser);
    return updatedURL;
  }
  getOrganizationSyncTarget(url, matchers) {
    return matchers.findTarget(url);
  }
  getOrganizationSyncQueryParams(toActivate) {
    const ret = /* @__PURE__ */ new Map();
    if (toActivate.type === "personalAccount") {
      ret.set("organization_id", "");
    }
    if (toActivate.type === "organization") {
      if (toActivate.organizationId) {
        ret.set("organization_id", toActivate.organizationId);
      }
      if (toActivate.organizationSlug) {
        ret.set("organization_id", toActivate.organizationSlug);
      }
    }
    return ret;
  }
};
var OrganizationMatcher = class {
  static {
    __name(this, "OrganizationMatcher");
  }
  constructor(options) {
    this.organizationPattern = this.createMatcher(options?.organizationPatterns);
    this.personalAccountPattern = this.createMatcher(options?.personalAccountPatterns);
  }
  createMatcher(pattern) {
    if (!pattern) {
      return null;
    }
    try {
      return match2(pattern);
    } catch (e) {
      throw new Error(`Invalid pattern "${pattern}": ${e}`);
    }
  }
  findTarget(url) {
    const orgTarget = this.findOrganizationTarget(url);
    if (orgTarget) {
      return orgTarget;
    }
    return this.findPersonalAccountTarget(url);
  }
  findOrganizationTarget(url) {
    if (!this.organizationPattern) {
      return null;
    }
    try {
      const result = this.organizationPattern(url.pathname);
      if (!result || !("params" in result)) {
        return null;
      }
      const params = result.params;
      if (params.id) {
        return { type: "organization", organizationId: params.id };
      }
      if (params.slug) {
        return { type: "organization", organizationSlug: params.slug };
      }
      return null;
    } catch (e) {
      console.error("Failed to match organization pattern:", e);
      return null;
    }
  }
  findPersonalAccountTarget(url) {
    if (!this.personalAccountPattern) {
      return null;
    }
    try {
      const result = this.personalAccountPattern(url.pathname);
      return result ? { type: "personalAccount" } : null;
    } catch (e) {
      console.error("Failed to match personal account pattern:", e);
      return null;
    }
  }
};
var RefreshTokenErrorReason = {
  NonEligibleNoCookie: "non-eligible-no-refresh-cookie",
  NonEligibleNonGet: "non-eligible-non-get",
  InvalidSessionToken: "invalid-session-token",
  MissingApiClient: "missing-api-client",
  MissingSessionToken: "missing-session-token",
  MissingRefreshToken: "missing-refresh-token",
  ExpiredSessionTokenDecodeFailed: "expired-session-token-decode-failed",
  ExpiredSessionTokenMissingSidClaim: "expired-session-token-missing-sid-claim",
  FetchError: "fetch-error",
  UnexpectedSDKError: "unexpected-sdk-error",
  UnexpectedBAPIError: "unexpected-bapi-error"
};
function assertSignInUrlExists(signInUrl, key) {
  if (!signInUrl && isDevelopmentFromSecretKey(key)) {
    throw new Error(`Missing signInUrl. Pass a signInUrl for dev instances if an app is satellite`);
  }
}
__name(assertSignInUrlExists, "assertSignInUrlExists");
function assertProxyUrlOrDomain(proxyUrlOrDomain) {
  if (!proxyUrlOrDomain) {
    throw new Error(`Missing domain and proxyUrl. A satellite application needs to specify a domain or a proxyUrl`);
  }
}
__name(assertProxyUrlOrDomain, "assertProxyUrlOrDomain");
function assertSignInUrlFormatAndOrigin(_signInUrl, origin) {
  let signInUrl;
  try {
    signInUrl = new URL(_signInUrl);
  } catch {
    throw new Error(`The signInUrl needs to have a absolute url format.`);
  }
  if (signInUrl.origin === origin) {
    throw new Error(`The signInUrl needs to be on a different origin than your satellite application.`);
  }
}
__name(assertSignInUrlFormatAndOrigin, "assertSignInUrlFormatAndOrigin");
function assertMachineSecretOrSecretKey(authenticateContext) {
  if (!authenticateContext.machineSecretKey && !authenticateContext.secretKey) {
    throw new Error(
      "Machine token authentication requires either a Machine secret key or a Clerk secret key. Ensure a Clerk secret key or Machine secret key is set."
    );
  }
}
__name(assertMachineSecretOrSecretKey, "assertMachineSecretOrSecretKey");
function isRequestEligibleForRefresh(err, authenticateContext, request) {
  return err.reason === TokenVerificationErrorReason.TokenExpired && !!authenticateContext.refreshTokenInCookie && request.method === "GET";
}
__name(isRequestEligibleForRefresh, "isRequestEligibleForRefresh");
function checkTokenTypeMismatch(parsedTokenType, acceptsToken, authenticateContext) {
  const mismatch = !isTokenTypeAccepted(parsedTokenType, acceptsToken);
  if (mismatch) {
    const tokenTypeToReturn = typeof acceptsToken === "string" ? acceptsToken : parsedTokenType;
    return signedOut({
      tokenType: tokenTypeToReturn,
      authenticateContext,
      reason: AuthErrorReason.TokenTypeMismatch
    });
  }
  return null;
}
__name(checkTokenTypeMismatch, "checkTokenTypeMismatch");
function isTokenTypeInAcceptedArray(acceptsToken, authenticateContext) {
  let parsedTokenType = null;
  const { tokenInHeader } = authenticateContext;
  if (tokenInHeader) {
    if (isMachineToken(tokenInHeader)) {
      parsedTokenType = getMachineTokenType(tokenInHeader);
    } else {
      parsedTokenType = TokenType.SessionToken;
    }
  }
  const typeToCheck = parsedTokenType ?? TokenType.SessionToken;
  return isTokenTypeAccepted(typeToCheck, acceptsToken);
}
__name(isTokenTypeInAcceptedArray, "isTokenTypeInAcceptedArray");
var authenticateRequest = /* @__PURE__ */ __name((async (request, options) => {
  const authenticateContext = await createAuthenticateContext(createClerkRequest(request), options);
  const acceptsToken = options.acceptsToken ?? TokenType.SessionToken;
  if (acceptsToken !== TokenType.M2MToken) {
    assertValidSecretKey(authenticateContext.secretKey);
    if (authenticateContext.isSatellite) {
      assertSignInUrlExists(authenticateContext.signInUrl, authenticateContext.secretKey);
      if (authenticateContext.signInUrl && authenticateContext.origin) {
        assertSignInUrlFormatAndOrigin(authenticateContext.signInUrl, authenticateContext.origin);
      }
      assertProxyUrlOrDomain(authenticateContext.proxyUrl || authenticateContext.domain);
    }
  }
  if (acceptsToken === TokenType.M2MToken) {
    assertMachineSecretOrSecretKey(authenticateContext);
  }
  const organizationMatcher = new OrganizationMatcher(options.organizationSyncOptions);
  const handshakeService = new HandshakeService(
    authenticateContext,
    { organizationSyncOptions: options.organizationSyncOptions },
    organizationMatcher
  );
  async function refreshToken(authenticateContext2) {
    if (!options.apiClient) {
      return {
        data: null,
        error: {
          message: "An apiClient is needed to perform token refresh.",
          cause: { reason: RefreshTokenErrorReason.MissingApiClient }
        }
      };
    }
    const { sessionToken: expiredSessionToken, refreshTokenInCookie: refreshToken2 } = authenticateContext2;
    if (!expiredSessionToken) {
      return {
        data: null,
        error: {
          message: "Session token must be provided.",
          cause: { reason: RefreshTokenErrorReason.MissingSessionToken }
        }
      };
    }
    if (!refreshToken2) {
      return {
        data: null,
        error: {
          message: "Refresh token must be provided.",
          cause: { reason: RefreshTokenErrorReason.MissingRefreshToken }
        }
      };
    }
    const { data: decodeResult, errors: decodedErrors } = decodeJwt(expiredSessionToken);
    if (!decodeResult || decodedErrors) {
      return {
        data: null,
        error: {
          message: "Unable to decode the expired session token.",
          cause: { reason: RefreshTokenErrorReason.ExpiredSessionTokenDecodeFailed, errors: decodedErrors }
        }
      };
    }
    if (!decodeResult?.payload?.sid) {
      return {
        data: null,
        error: {
          message: "Expired session token is missing the `sid` claim.",
          cause: { reason: RefreshTokenErrorReason.ExpiredSessionTokenMissingSidClaim }
        }
      };
    }
    try {
      const response = await options.apiClient.sessions.refreshSession(decodeResult.payload.sid, {
        format: "cookie",
        suffixed_cookies: authenticateContext2.usesSuffixedCookies(),
        expired_token: expiredSessionToken || "",
        refresh_token: refreshToken2 || "",
        request_origin: authenticateContext2.clerkUrl.origin,
        // The refresh endpoint expects headers as Record<string, string[]>, so we need to transform it.
        request_headers: Object.fromEntries(Array.from(request.headers.entries()).map(([k, v]) => [k, [v]]))
      });
      return { data: response.cookies, error: null };
    } catch (err) {
      if (err?.errors?.length) {
        if (err.errors[0].code === "unexpected_error") {
          return {
            data: null,
            error: {
              message: `Fetch unexpected error`,
              cause: { reason: RefreshTokenErrorReason.FetchError, errors: err.errors }
            }
          };
        }
        return {
          data: null,
          error: {
            message: err.errors[0].code,
            cause: { reason: err.errors[0].code, errors: err.errors }
          }
        };
      } else {
        return {
          data: null,
          error: {
            message: `Unexpected Server/BAPI error`,
            cause: { reason: RefreshTokenErrorReason.UnexpectedBAPIError, errors: [err] }
          }
        };
      }
    }
  }
  __name(refreshToken, "refreshToken");
  async function attemptRefresh(authenticateContext2) {
    const { data: cookiesToSet, error } = await refreshToken(authenticateContext2);
    if (!cookiesToSet || cookiesToSet.length === 0) {
      return { data: null, error };
    }
    const headers = new Headers();
    let sessionToken = "";
    cookiesToSet.forEach((x) => {
      headers.append("Set-Cookie", x);
      if (getCookieName(x).startsWith(constants.Cookies.Session)) {
        sessionToken = getCookieValue(x);
      }
    });
    const { data: jwtPayload, errors } = await verifyToken(sessionToken, authenticateContext2);
    if (errors) {
      return {
        data: null,
        error: {
          message: `Clerk: unable to verify refreshed session token.`,
          cause: { reason: RefreshTokenErrorReason.InvalidSessionToken, errors }
        }
      };
    }
    return { data: { jwtPayload, sessionToken, headers }, error: null };
  }
  __name(attemptRefresh, "attemptRefresh");
  function handleMaybeHandshakeStatus(authenticateContext2, reason, message, headers) {
    if (!handshakeService.isRequestEligibleForHandshake()) {
      return signedOut({
        tokenType: TokenType.SessionToken,
        authenticateContext: authenticateContext2,
        reason,
        message
      });
    }
    const handshakeHeaders = headers ?? handshakeService.buildRedirectToHandshake(reason);
    if (handshakeHeaders.get(constants.Headers.Location)) {
      handshakeHeaders.set(constants.Headers.CacheControl, "no-store");
    }
    const isRedirectLoop = handshakeService.checkAndTrackRedirectLoop(handshakeHeaders);
    if (isRedirectLoop) {
      const msg = `Clerk: Refreshing the session token resulted in an infinite redirect loop. This usually means that your Clerk instance keys do not match - make sure to copy the correct publishable and secret keys from the Clerk dashboard.`;
      console.log(msg);
      return signedOut({
        tokenType: TokenType.SessionToken,
        authenticateContext: authenticateContext2,
        reason,
        message
      });
    }
    return handshake(authenticateContext2, reason, message, handshakeHeaders);
  }
  __name(handleMaybeHandshakeStatus, "handleMaybeHandshakeStatus");
  function handleMaybeOrganizationSyncHandshake(authenticateContext2, auth) {
    const organizationSyncTarget = organizationMatcher.findTarget(authenticateContext2.clerkUrl);
    if (!organizationSyncTarget) {
      return null;
    }
    let mustActivate = false;
    if (organizationSyncTarget.type === "organization") {
      if (organizationSyncTarget.organizationSlug && organizationSyncTarget.organizationSlug !== auth.orgSlug) {
        mustActivate = true;
      }
      if (organizationSyncTarget.organizationId && organizationSyncTarget.organizationId !== auth.orgId) {
        mustActivate = true;
      }
    }
    if (organizationSyncTarget.type === "personalAccount" && auth.orgId) {
      mustActivate = true;
    }
    if (!mustActivate) {
      return null;
    }
    if (authenticateContext2.handshakeRedirectLoopCounter >= 3) {
      console.warn(
        "Clerk: Organization activation handshake loop detected. This is likely due to an invalid organization ID or slug. Skipping organization activation."
      );
      return null;
    }
    const handshakeState = handleMaybeHandshakeStatus(
      authenticateContext2,
      AuthErrorReason.ActiveOrganizationMismatch,
      ""
    );
    if (handshakeState.status !== "handshake") {
      return null;
    }
    return handshakeState;
  }
  __name(handleMaybeOrganizationSyncHandshake, "handleMaybeOrganizationSyncHandshake");
  async function authenticateRequestWithTokenInHeader() {
    const { tokenInHeader } = authenticateContext;
    if (isMachineJwt(tokenInHeader)) {
      return signedOut({
        tokenType: TokenType.SessionToken,
        authenticateContext,
        reason: AuthErrorReason.TokenTypeMismatch,
        message: ""
      });
    }
    try {
      const { data, errors } = await verifyToken(tokenInHeader, authenticateContext);
      if (errors) {
        throw errors[0];
      }
      return signedIn({
        tokenType: TokenType.SessionToken,
        authenticateContext,
        sessionClaims: data,
        headers: new Headers(),
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        token: tokenInHeader
      });
    } catch (err) {
      return handleSessionTokenError(err, "header");
    }
  }
  __name(authenticateRequestWithTokenInHeader, "authenticateRequestWithTokenInHeader");
  async function authenticateRequestWithTokenInCookie() {
    const hasActiveClient = authenticateContext.clientUat;
    const hasSessionToken = !!authenticateContext.sessionTokenInCookie;
    const hasDevBrowserToken = !!authenticateContext.devBrowserToken;
    if (authenticateContext.handshakeNonce || authenticateContext.handshakeToken) {
      try {
        return await handshakeService.resolveHandshake();
      } catch (error) {
        if (error instanceof TokenVerificationError && authenticateContext.instanceType === "development") {
          handshakeService.handleTokenVerificationErrorInDevelopment(error);
        } else {
          console.error("Clerk: unable to resolve handshake:", error);
        }
      }
    }
    const isRequestEligibleForMultiDomainSync = authenticateContext.isSatellite && authenticateContext.secFetchDest === "document";
    if (authenticateContext.instanceType === "production" && isRequestEligibleForMultiDomainSync) {
      return handleMaybeHandshakeStatus(authenticateContext, AuthErrorReason.SatelliteCookieNeedsSyncing, "");
    }
    if (authenticateContext.instanceType === "development" && isRequestEligibleForMultiDomainSync && !authenticateContext.clerkUrl.searchParams.has(constants.QueryParameters.ClerkSynced)) {
      const redirectURL = new URL(authenticateContext.signInUrl);
      redirectURL.searchParams.append(
        constants.QueryParameters.ClerkRedirectUrl,
        authenticateContext.clerkUrl.toString()
      );
      const headers = new Headers({ [constants.Headers.Location]: redirectURL.toString() });
      return handleMaybeHandshakeStatus(authenticateContext, AuthErrorReason.SatelliteCookieNeedsSyncing, "", headers);
    }
    const redirectUrl = new URL(authenticateContext.clerkUrl).searchParams.get(
      constants.QueryParameters.ClerkRedirectUrl
    );
    if (authenticateContext.instanceType === "development" && !authenticateContext.isSatellite && redirectUrl) {
      const redirectBackToSatelliteUrl = new URL(redirectUrl);
      if (authenticateContext.devBrowserToken) {
        redirectBackToSatelliteUrl.searchParams.append(
          constants.QueryParameters.DevBrowser,
          authenticateContext.devBrowserToken
        );
      }
      redirectBackToSatelliteUrl.searchParams.append(constants.QueryParameters.ClerkSynced, "true");
      const headers = new Headers({ [constants.Headers.Location]: redirectBackToSatelliteUrl.toString() });
      return handleMaybeHandshakeStatus(authenticateContext, AuthErrorReason.PrimaryRespondsToSyncing, "", headers);
    }
    if (authenticateContext.instanceType === "development" && authenticateContext.clerkUrl.searchParams.has(constants.QueryParameters.DevBrowser)) {
      return handleMaybeHandshakeStatus(authenticateContext, AuthErrorReason.DevBrowserSync, "");
    }
    if (authenticateContext.instanceType === "development" && !hasDevBrowserToken) {
      return handleMaybeHandshakeStatus(authenticateContext, AuthErrorReason.DevBrowserMissing, "");
    }
    if (!hasActiveClient && !hasSessionToken) {
      return signedOut({
        tokenType: TokenType.SessionToken,
        authenticateContext,
        reason: AuthErrorReason.SessionTokenAndUATMissing
      });
    }
    if (!hasActiveClient && hasSessionToken) {
      return handleMaybeHandshakeStatus(authenticateContext, AuthErrorReason.SessionTokenWithoutClientUAT, "");
    }
    if (hasActiveClient && !hasSessionToken) {
      return handleMaybeHandshakeStatus(authenticateContext, AuthErrorReason.ClientUATWithoutSessionToken, "");
    }
    const { data: decodeResult, errors: decodedErrors } = decodeJwt(authenticateContext.sessionTokenInCookie);
    if (decodedErrors) {
      return handleSessionTokenError(decodedErrors[0], "cookie");
    }
    if (decodeResult.payload.iat < authenticateContext.clientUat) {
      return handleMaybeHandshakeStatus(authenticateContext, AuthErrorReason.SessionTokenIATBeforeClientUAT, "");
    }
    try {
      const { data, errors } = await verifyToken(authenticateContext.sessionTokenInCookie, authenticateContext);
      if (errors) {
        throw errors[0];
      }
      const signedInRequestState = signedIn({
        tokenType: TokenType.SessionToken,
        authenticateContext,
        sessionClaims: data,
        headers: new Headers(),
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        token: authenticateContext.sessionTokenInCookie
      });
      const shouldForceHandshakeForCrossDomain = !authenticateContext.isSatellite && // We're on primary
      authenticateContext.secFetchDest === "document" && // Document navigation
      authenticateContext.isCrossOriginReferrer() && // Came from different domain
      !authenticateContext.isKnownClerkReferrer() && // Not from Clerk accounts portal or FAPI
      authenticateContext.handshakeRedirectLoopCounter === 0;
      if (shouldForceHandshakeForCrossDomain) {
        return handleMaybeHandshakeStatus(
          authenticateContext,
          AuthErrorReason.PrimaryDomainCrossOriginSync,
          "Cross-origin request from satellite domain requires handshake"
        );
      }
      const authObject = signedInRequestState.toAuth();
      if (authObject.userId) {
        const handshakeRequestState = handleMaybeOrganizationSyncHandshake(authenticateContext, authObject);
        if (handshakeRequestState) {
          return handshakeRequestState;
        }
      }
      return signedInRequestState;
    } catch (err) {
      return handleSessionTokenError(err, "cookie");
    }
    return signedOut({
      tokenType: TokenType.SessionToken,
      authenticateContext,
      reason: AuthErrorReason.UnexpectedError
    });
  }
  __name(authenticateRequestWithTokenInCookie, "authenticateRequestWithTokenInCookie");
  async function handleSessionTokenError(err, tokenCarrier) {
    if (!(err instanceof TokenVerificationError)) {
      return signedOut({
        tokenType: TokenType.SessionToken,
        authenticateContext,
        reason: AuthErrorReason.UnexpectedError
      });
    }
    let refreshError;
    if (isRequestEligibleForRefresh(err, authenticateContext, request)) {
      const { data, error } = await attemptRefresh(authenticateContext);
      if (data) {
        return signedIn({
          tokenType: TokenType.SessionToken,
          authenticateContext,
          sessionClaims: data.jwtPayload,
          headers: data.headers,
          token: data.sessionToken
        });
      }
      if (error?.cause?.reason) {
        refreshError = error.cause.reason;
      } else {
        refreshError = RefreshTokenErrorReason.UnexpectedSDKError;
      }
    } else {
      if (request.method !== "GET") {
        refreshError = RefreshTokenErrorReason.NonEligibleNonGet;
      } else if (!authenticateContext.refreshTokenInCookie) {
        refreshError = RefreshTokenErrorReason.NonEligibleNoCookie;
      } else {
        refreshError = null;
      }
    }
    err.tokenCarrier = tokenCarrier;
    const reasonToHandshake = [
      TokenVerificationErrorReason.TokenExpired,
      TokenVerificationErrorReason.TokenNotActiveYet,
      TokenVerificationErrorReason.TokenIatInTheFuture
    ].includes(err.reason);
    if (reasonToHandshake) {
      return handleMaybeHandshakeStatus(
        authenticateContext,
        convertTokenVerificationErrorReasonToAuthErrorReason({ tokenError: err.reason, refreshError }),
        err.getFullMessage()
      );
    }
    return signedOut({
      tokenType: TokenType.SessionToken,
      authenticateContext,
      reason: err.reason,
      message: err.getFullMessage()
    });
  }
  __name(handleSessionTokenError, "handleSessionTokenError");
  function handleMachineError(tokenType, err) {
    if (!(err instanceof MachineTokenVerificationError)) {
      return signedOut({
        tokenType,
        authenticateContext,
        reason: AuthErrorReason.UnexpectedError
      });
    }
    return signedOut({
      tokenType,
      authenticateContext,
      reason: err.code,
      message: err.getFullMessage()
    });
  }
  __name(handleMachineError, "handleMachineError");
  async function authenticateMachineRequestWithTokenInHeader() {
    const { tokenInHeader } = authenticateContext;
    if (!tokenInHeader) {
      return handleSessionTokenError(new Error("Missing token in header"), "header");
    }
    if (!isMachineToken(tokenInHeader)) {
      return signedOut({
        tokenType: acceptsToken,
        authenticateContext,
        reason: AuthErrorReason.TokenTypeMismatch,
        message: ""
      });
    }
    const parsedTokenType = getMachineTokenType(tokenInHeader);
    const mismatchState = checkTokenTypeMismatch(parsedTokenType, acceptsToken, authenticateContext);
    if (mismatchState) {
      return mismatchState;
    }
    const { data, tokenType, errors } = await verifyMachineAuthToken(tokenInHeader, authenticateContext);
    if (errors) {
      return handleMachineError(tokenType, errors[0]);
    }
    return signedIn({
      tokenType,
      authenticateContext,
      machineData: data,
      token: tokenInHeader
    });
  }
  __name(authenticateMachineRequestWithTokenInHeader, "authenticateMachineRequestWithTokenInHeader");
  async function authenticateAnyRequestWithTokenInHeader() {
    const { tokenInHeader } = authenticateContext;
    if (!tokenInHeader) {
      return handleSessionTokenError(new Error("Missing token in header"), "header");
    }
    if (isMachineToken(tokenInHeader)) {
      const parsedTokenType = getMachineTokenType(tokenInHeader);
      const mismatchState = checkTokenTypeMismatch(parsedTokenType, acceptsToken, authenticateContext);
      if (mismatchState) {
        return mismatchState;
      }
      const { data: data2, tokenType, errors: errors2 } = await verifyMachineAuthToken(tokenInHeader, authenticateContext);
      if (errors2) {
        return handleMachineError(tokenType, errors2[0]);
      }
      return signedIn({
        tokenType,
        authenticateContext,
        machineData: data2,
        token: tokenInHeader
      });
    }
    const { data, errors } = await verifyToken(tokenInHeader, authenticateContext);
    if (errors) {
      return handleSessionTokenError(errors[0], "header");
    }
    return signedIn({
      tokenType: TokenType.SessionToken,
      authenticateContext,
      sessionClaims: data,
      token: tokenInHeader
    });
  }
  __name(authenticateAnyRequestWithTokenInHeader, "authenticateAnyRequestWithTokenInHeader");
  if (Array.isArray(acceptsToken)) {
    if (!isTokenTypeInAcceptedArray(acceptsToken, authenticateContext)) {
      return signedOutInvalidToken();
    }
  }
  if (authenticateContext.tokenInHeader) {
    if (acceptsToken === "any" || Array.isArray(acceptsToken)) {
      return authenticateAnyRequestWithTokenInHeader();
    }
    if (acceptsToken === TokenType.SessionToken) {
      return authenticateRequestWithTokenInHeader();
    }
    return authenticateMachineRequestWithTokenInHeader();
  }
  if (acceptsToken === TokenType.OAuthToken || acceptsToken === TokenType.ApiKey || acceptsToken === TokenType.M2MToken) {
    return signedOut({
      tokenType: acceptsToken,
      authenticateContext,
      reason: "No token in header"
    });
  }
  return authenticateRequestWithTokenInCookie();
}), "authenticateRequest");
var debugRequestState = /* @__PURE__ */ __name((params) => {
  const { isSignedIn, isAuthenticated, proxyUrl, reason, message, publishableKey, isSatellite, domain } = params;
  return { isSignedIn, isAuthenticated, proxyUrl, reason, message, publishableKey, isSatellite, domain };
}, "debugRequestState");
var convertTokenVerificationErrorReasonToAuthErrorReason = /* @__PURE__ */ __name(({
  tokenError,
  refreshError
}) => {
  switch (tokenError) {
    case TokenVerificationErrorReason.TokenExpired:
      return `${AuthErrorReason.SessionTokenExpired}-refresh-${refreshError}`;
    case TokenVerificationErrorReason.TokenNotActiveYet:
      return AuthErrorReason.SessionTokenNBF;
    case TokenVerificationErrorReason.TokenIatInTheFuture:
      return AuthErrorReason.SessionTokenIatInTheFuture;
    default:
      return AuthErrorReason.UnexpectedError;
  }
}, "convertTokenVerificationErrorReasonToAuthErrorReason");
var defaultOptions2 = {
  secretKey: "",
  machineSecretKey: "",
  jwtKey: "",
  apiUrl: void 0,
  apiVersion: void 0,
  proxyUrl: "",
  publishableKey: "",
  isSatellite: false,
  domain: "",
  audience: ""
};
function createAuthenticateRequest(params) {
  const buildTimeOptions = mergePreDefinedOptions(defaultOptions2, params.options);
  const apiClient = params.apiClient;
  const authenticateRequest2 = /* @__PURE__ */ __name((request, options = {}) => {
    const { apiUrl, apiVersion } = buildTimeOptions;
    const runTimeOptions = mergePreDefinedOptions(buildTimeOptions, options);
    return authenticateRequest(request, {
      ...options,
      ...runTimeOptions,
      // We should add all the omitted props from options here (eg apiUrl / apiVersion)
      // to avoid runtime options override them.
      apiUrl,
      apiVersion,
      apiClient
    });
  }, "authenticateRequest2");
  return {
    authenticateRequest: authenticateRequest2,
    debugRequestState
  };
}
__name(createAuthenticateRequest, "createAuthenticateRequest");

// ../node_modules/.pnpm/@clerk+backend@2.33.5_react_830d22ab28c28b4fa4a78ec6de1291b4/node_modules/@clerk/backend/dist/chunk-P263NW7Z.mjs
init_checked_fetch();
init_modules_watch_stub();
function withLegacyReturn(cb) {
  return async (...args) => {
    const { data, errors } = await cb(...args);
    if (errors) {
      throw errors[0];
    }
    return data;
  };
}
__name(withLegacyReturn, "withLegacyReturn");

// ../node_modules/.pnpm/@clerk+shared@3.47.7_react-_361d9ae56ed1f0380cf01c93b510a0f3/node_modules/@clerk/shared/dist/runtime/telemetry.mjs
init_checked_fetch();
init_modules_watch_stub();

// ../node_modules/.pnpm/@clerk+shared@3.47.7_react-_361d9ae56ed1f0380cf01c93b510a0f3/node_modules/@clerk/shared/dist/runtime/underscore-DjQrhefX.mjs
init_checked_fetch();
init_modules_watch_stub();
function snakeToCamel(str) {
  return str ? str.replace(/([-_][a-z])/g, (match3) => match3.toUpperCase().replace(/-|_/, "")) : "";
}
__name(snakeToCamel, "snakeToCamel");
function camelToSnake(str) {
  return str ? str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`) : "";
}
__name(camelToSnake, "camelToSnake");
var createDeepObjectTransformer = /* @__PURE__ */ __name((transform) => {
  const deepTransform = /* @__PURE__ */ __name((obj) => {
    if (!obj) return obj;
    if (Array.isArray(obj)) return obj.map((el) => {
      if (typeof el === "object" || Array.isArray(el)) return deepTransform(el);
      return el;
    });
    const copy = { ...obj };
    const keys = Object.keys(copy);
    for (const oldName of keys) {
      const newName = transform(oldName.toString());
      if (newName !== oldName) {
        copy[newName] = copy[oldName];
        delete copy[oldName];
      }
      if (typeof copy[newName] === "object") copy[newName] = deepTransform(copy[newName]);
    }
    return copy;
  }, "deepTransform");
  return deepTransform;
}, "createDeepObjectTransformer");
var deepCamelToSnake = createDeepObjectTransformer(camelToSnake);
var deepSnakeToCamel = createDeepObjectTransformer(snakeToCamel);
function isTruthy(value) {
  if (typeof value === `boolean`) return value;
  if (value === void 0 || value === null) return false;
  if (typeof value === `string`) {
    if (value.toLowerCase() === `true`) return true;
    if (value.toLowerCase() === `false`) return false;
  }
  const number = parseInt(value, 10);
  if (isNaN(number)) return false;
  if (number > 0) return true;
  return false;
}
__name(isTruthy, "isTruthy");

// ../node_modules/.pnpm/@clerk+shared@3.47.7_react-_361d9ae56ed1f0380cf01c93b510a0f3/node_modules/@clerk/shared/dist/runtime/telemetry-wqMDWlvR.mjs
init_checked_fetch();
init_modules_watch_stub();
var DEFAULT_CACHE_TTL_MS = 864e5;
var TelemetryEventThrottler = class {
  static {
    __name(this, "TelemetryEventThrottler");
  }
  #cache;
  #cacheTtl = DEFAULT_CACHE_TTL_MS;
  constructor(cache2) {
    this.#cache = cache2;
  }
  isEventThrottled(payload) {
    const now = Date.now();
    const key = this.#generateKey(payload);
    const entry = this.#cache.getItem(key);
    if (!entry) {
      this.#cache.setItem(key, now);
      return false;
    }
    if (now - entry > this.#cacheTtl) {
      this.#cache.setItem(key, now);
      return false;
    }
    return true;
  }
  /**
  * Generates a consistent unique key for telemetry events by sorting payload properties.
  * This ensures that payloads with identical content in different orders produce the same key.
  */
  #generateKey(event) {
    const { sk: _sk, pk: _pk, payload, ...rest } = event;
    const sanitizedEvent = {
      ...payload,
      ...rest
    };
    return JSON.stringify(Object.keys({
      ...payload,
      ...rest
    }).sort().map((key) => sanitizedEvent[key]));
  }
};
var LocalStorageThrottlerCache = class {
  static {
    __name(this, "LocalStorageThrottlerCache");
  }
  #storageKey = "clerk_telemetry_throttler";
  getItem(key) {
    return this.#getCache()[key];
  }
  setItem(key, value) {
    try {
      const cache2 = this.#getCache();
      cache2[key] = value;
      localStorage.setItem(this.#storageKey, JSON.stringify(cache2));
    } catch (err) {
      if (err instanceof DOMException && (err.name === "QuotaExceededError" || err.name === "NS_ERROR_DOM_QUOTA_REACHED") && localStorage.length > 0) localStorage.removeItem(this.#storageKey);
    }
  }
  removeItem(key) {
    try {
      const cache2 = this.#getCache();
      delete cache2[key];
      localStorage.setItem(this.#storageKey, JSON.stringify(cache2));
    } catch {
    }
  }
  #getCache() {
    try {
      const cacheString = localStorage.getItem(this.#storageKey);
      if (!cacheString) return {};
      return JSON.parse(cacheString);
    } catch {
      return {};
    }
  }
  static isSupported() {
    return typeof window !== "undefined" && !!window.localStorage;
  }
};
var InMemoryThrottlerCache = class {
  static {
    __name(this, "InMemoryThrottlerCache");
  }
  #cache = /* @__PURE__ */ new Map();
  #maxSize = 1e4;
  getItem(key) {
    if (this.#cache.size > this.#maxSize) {
      this.#cache.clear();
      return;
    }
    return this.#cache.get(key);
  }
  setItem(key, value) {
    this.#cache.set(key, value);
  }
  removeItem(key) {
    this.#cache.delete(key);
  }
};
function isWindowClerkWithMetadata(clerk) {
  return typeof clerk === "object" && clerk !== null && "constructor" in clerk && typeof clerk.constructor === "function";
}
__name(isWindowClerkWithMetadata, "isWindowClerkWithMetadata");
var VALID_LOG_LEVELS = /* @__PURE__ */ new Set([
  "error",
  "warn",
  "info",
  "debug",
  "trace"
]);
var DEFAULT_CONFIG = {
  samplingRate: 1,
  maxBufferSize: 5,
  endpoint: "https://clerk-telemetry.com"
};
var TelemetryCollector = class {
  static {
    __name(this, "TelemetryCollector");
  }
  #config;
  #eventThrottler;
  #metadata = {};
  #buffer = [];
  #pendingFlush = null;
  constructor(options) {
    this.#config = {
      maxBufferSize: options.maxBufferSize ?? DEFAULT_CONFIG.maxBufferSize,
      samplingRate: options.samplingRate ?? DEFAULT_CONFIG.samplingRate,
      perEventSampling: options.perEventSampling ?? true,
      disabled: options.disabled ?? false,
      debug: options.debug ?? false,
      endpoint: DEFAULT_CONFIG.endpoint
    };
    if (!options.clerkVersion && typeof window === "undefined") this.#metadata.clerkVersion = "";
    else this.#metadata.clerkVersion = options.clerkVersion ?? "";
    this.#metadata.sdk = options.sdk;
    this.#metadata.sdkVersion = options.sdkVersion;
    this.#metadata.publishableKey = options.publishableKey ?? "";
    const parsedKey = parsePublishableKey(options.publishableKey);
    if (parsedKey) this.#metadata.instanceType = parsedKey.instanceType;
    if (options.secretKey) this.#metadata.secretKey = options.secretKey.substring(0, 16);
    this.#eventThrottler = new TelemetryEventThrottler(LocalStorageThrottlerCache.isSupported() ? new LocalStorageThrottlerCache() : new InMemoryThrottlerCache());
  }
  get isEnabled() {
    if (this.#metadata.instanceType !== "development") return false;
    if (this.#config.disabled || typeof process !== "undefined" && process.env && isTruthy(process.env.CLERK_TELEMETRY_DISABLED)) return false;
    if (typeof window !== "undefined" && !!window?.navigator?.webdriver) return false;
    return true;
  }
  get isDebug() {
    return this.#config.debug || typeof process !== "undefined" && process.env && isTruthy(process.env.CLERK_TELEMETRY_DEBUG);
  }
  record(event) {
    try {
      const preparedPayload = this.#preparePayload(event.event, event.payload);
      this.#logEvent(preparedPayload.event, preparedPayload);
      if (!this.#shouldRecord(preparedPayload, event.eventSamplingRate)) return;
      this.#buffer.push({
        kind: "event",
        value: preparedPayload
      });
      this.#scheduleFlush();
    } catch (error) {
      console.error("[clerk/telemetry] Error recording telemetry event", error);
    }
  }
  /**
  * Records a telemetry log entry if logging is enabled and not in debug mode.
  *
  * @param entry - The telemetry log entry to record.
  */
  recordLog(entry) {
    try {
      if (!this.#shouldRecordLog(entry)) return;
      const levelIsValid = typeof entry?.level === "string" && VALID_LOG_LEVELS.has(entry.level);
      const messageIsValid = typeof entry?.message === "string" && entry.message.trim().length > 0;
      let normalizedTimestamp = null;
      const timestampInput = entry?.timestamp;
      if (typeof timestampInput === "number" || typeof timestampInput === "string") {
        const candidate = new Date(timestampInput);
        if (!Number.isNaN(candidate.getTime())) normalizedTimestamp = candidate;
      }
      if (!levelIsValid || !messageIsValid || normalizedTimestamp === null) {
        if (this.isDebug && typeof console !== "undefined") console.warn("[clerk/telemetry] Dropping invalid telemetry log entry", {
          levelIsValid,
          messageIsValid,
          timestampIsValid: normalizedTimestamp !== null
        });
        return;
      }
      const sdkMetadata = this.#getSDKMetadata();
      const logData = {
        sdk: sdkMetadata.name,
        sdkv: sdkMetadata.version,
        cv: this.#metadata.clerkVersion ?? "",
        lvl: entry.level,
        msg: entry.message,
        ts: normalizedTimestamp.toISOString(),
        pk: this.#metadata.publishableKey || null,
        payload: this.#sanitizeContext(entry.context)
      };
      this.#buffer.push({
        kind: "log",
        value: logData
      });
      this.#scheduleFlush();
    } catch (error) {
      console.error("[clerk/telemetry] Error recording telemetry log entry", error);
    }
  }
  #shouldRecord(preparedPayload, eventSamplingRate) {
    return this.isEnabled && !this.isDebug && this.#shouldBeSampled(preparedPayload, eventSamplingRate);
  }
  #shouldRecordLog(_entry) {
    return true;
  }
  #shouldBeSampled(preparedPayload, eventSamplingRate) {
    const randomSeed = Math.random();
    if (!(randomSeed <= this.#config.samplingRate && (this.#config.perEventSampling === false || typeof eventSamplingRate === "undefined" || randomSeed <= eventSamplingRate))) return false;
    return !this.#eventThrottler.isEventThrottled(preparedPayload);
  }
  #scheduleFlush() {
    if (typeof window === "undefined") {
      this.#flush();
      return;
    }
    if (this.#buffer.length >= this.#config.maxBufferSize) {
      if (this.#pendingFlush) if (typeof cancelIdleCallback !== "undefined") cancelIdleCallback(Number(this.#pendingFlush));
      else clearTimeout(Number(this.#pendingFlush));
      this.#flush();
      return;
    }
    if (this.#pendingFlush) return;
    if ("requestIdleCallback" in window) this.#pendingFlush = requestIdleCallback(() => {
      this.#flush();
      this.#pendingFlush = null;
    });
    else this.#pendingFlush = setTimeout(() => {
      this.#flush();
      this.#pendingFlush = null;
    }, 0);
  }
  #flush() {
    const itemsToSend = [...this.#buffer];
    this.#buffer = [];
    this.#pendingFlush = null;
    if (itemsToSend.length === 0) return;
    const eventsToSend = itemsToSend.filter((item) => item.kind === "event").map((item) => item.value);
    const logsToSend = itemsToSend.filter((item) => item.kind === "log").map((item) => item.value);
    if (eventsToSend.length > 0) {
      const eventsUrl = new URL("/v1/event", this.#config.endpoint);
      fetch(eventsUrl, {
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        method: "POST",
        body: JSON.stringify({ events: eventsToSend })
      }).catch(() => void 0);
    }
    if (logsToSend.length > 0) {
      const logsUrl = new URL("/v1/logs", this.#config.endpoint);
      fetch(logsUrl, {
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        method: "POST",
        body: JSON.stringify({ logs: logsToSend })
      }).catch(() => void 0);
    }
  }
  /**
  * If running in debug mode, log the event and its payload to the console.
  */
  #logEvent(event, payload) {
    if (!this.isDebug) return;
    if (typeof console.groupCollapsed !== "undefined") {
      console.groupCollapsed("[clerk/telemetry]", event);
      console.log(payload);
      console.groupEnd();
    } else console.log("[clerk/telemetry]", event, payload);
  }
  /**
  * If in browser, attempt to lazily grab the SDK metadata from the Clerk singleton, otherwise fallback to the initially passed in values.
  *
  * This is necessary because the sdkMetadata can be set by the host SDK after the TelemetryCollector is instantiated.
  */
  #getSDKMetadata() {
    const sdkMetadata = {
      name: this.#metadata.sdk,
      version: this.#metadata.sdkVersion
    };
    if (typeof window !== "undefined") {
      const windowWithClerk = window;
      if (windowWithClerk.Clerk) {
        const windowClerk = windowWithClerk.Clerk;
        if (isWindowClerkWithMetadata(windowClerk) && windowClerk.constructor.sdkMetadata) {
          const { name: name2, version } = windowClerk.constructor.sdkMetadata;
          if (name2 !== void 0) sdkMetadata.name = name2;
          if (version !== void 0) sdkMetadata.version = version;
        }
      }
    }
    return sdkMetadata;
  }
  /**
  * Append relevant metadata from the Clerk singleton to the event payload.
  */
  #preparePayload(event, payload) {
    const sdkMetadata = this.#getSDKMetadata();
    return {
      event,
      cv: this.#metadata.clerkVersion ?? "",
      it: this.#metadata.instanceType ?? "",
      sdk: sdkMetadata.name,
      sdkv: sdkMetadata.version,
      ...this.#metadata.publishableKey ? { pk: this.#metadata.publishableKey } : {},
      ...this.#metadata.secretKey ? { sk: this.#metadata.secretKey } : {},
      payload
    };
  }
  /**
  * Best-effort sanitization of the context payload. Returns a plain object with JSON-serializable
  * values or null when the input is missing or not serializable. Arrays are not accepted.
  */
  #sanitizeContext(context) {
    if (context === null || typeof context === "undefined") return null;
    if (typeof context !== "object") return null;
    try {
      const cleaned = JSON.parse(JSON.stringify(context));
      if (cleaned && typeof cleaned === "object" && !Array.isArray(cleaned)) return cleaned;
      return null;
    } catch {
      return null;
    }
  }
};

// ../node_modules/.pnpm/@clerk+backend@2.33.5_react_830d22ab28c28b4fa4a78ec6de1291b4/node_modules/@clerk/backend/dist/index.mjs
var verifyToken2 = withLegacyReturn(verifyToken);
function createClerkClient(options) {
  const opts = { ...options };
  const apiClient = createBackendApiClient(opts);
  const requestState = createAuthenticateRequest({ options: opts, apiClient });
  const telemetry = new TelemetryCollector({
    publishableKey: opts.publishableKey,
    secretKey: opts.secretKey,
    samplingRate: 0.1,
    ...opts.sdkMetadata ? { sdk: opts.sdkMetadata.name, sdkVersion: opts.sdkMetadata.version } : {},
    ...opts.telemetry || {}
  });
  return {
    ...apiClient,
    ...requestState,
    telemetry
  };
}
__name(createClerkClient, "createClerkClient");

// ../node_modules/.pnpm/@clerk+backend@2.33.5_react_830d22ab28c28b4fa4a78ec6de1291b4/node_modules/@clerk/backend/dist/internal.mjs
init_checked_fetch();
init_modules_watch_stub();

// ../node_modules/.pnpm/hono@4.12.27/node_modules/hono/dist/helper/adapter/index.js
init_checked_fetch();
init_modules_watch_stub();
var env = /* @__PURE__ */ __name((c, runtime2) => {
  const global2 = globalThis;
  const globalEnv = global2?.process?.env;
  runtime2 ??= getRuntimeKey();
  const runtimeEnvHandlers = {
    bun: /* @__PURE__ */ __name(() => globalEnv, "bun"),
    node: /* @__PURE__ */ __name(() => globalEnv, "node"),
    "edge-light": /* @__PURE__ */ __name(() => globalEnv, "edge-light"),
    deno: /* @__PURE__ */ __name(() => {
      return Deno.env.toObject();
    }, "deno"),
    workerd: /* @__PURE__ */ __name(() => c.env, "workerd"),
    // On Fastly Compute, you can use the ConfigStore to manage user-defined data.
    fastly: /* @__PURE__ */ __name(() => ({}), "fastly"),
    other: /* @__PURE__ */ __name(() => ({}), "other")
  };
  return runtimeEnvHandlers[runtime2]();
}, "env");
var knownUserAgents = {
  deno: "Deno",
  bun: "Bun",
  workerd: "Cloudflare-Workers",
  node: "Node.js"
};
var getRuntimeKey = /* @__PURE__ */ __name(() => {
  const global2 = globalThis;
  const userAgentSupported = typeof navigator !== "undefined" && true;
  if (userAgentSupported) {
    for (const [runtimeKey, userAgent] of Object.entries(knownUserAgents)) {
      if (checkUserAgentEquals(userAgent)) {
        return runtimeKey;
      }
    }
  }
  if (typeof global2?.EdgeRuntime === "string") {
    return "edge-light";
  }
  if (global2?.fastly !== void 0) {
    return "fastly";
  }
  if (global2?.process?.release?.name === "node") {
    return "node";
  }
  return "other";
}, "getRuntimeKey");
var checkUserAgentEquals = /* @__PURE__ */ __name((platform) => {
  const userAgent = "Cloudflare-Workers";
  return userAgent.startsWith(platform);
}, "checkUserAgentEquals");

// ../node_modules/.pnpm/@hono+clerk-auth@3.1.1_hono_90411af05946f3763f2d8d9eb5624f70/node_modules/@hono/clerk-auth/dist/index.js
var getAuth = /* @__PURE__ */ __name(((c, options) => {
  deprecated("@hono/clerk-auth", 'Use `@clerk/hono` instead.\n\n- import { clerkMiddleware, getAuth } from "@hono/clerk-auth"\n+ import { clerkMiddleware, getAuth } from "@clerk/hono"');
  return c.get("clerkAuth")(options);
}), "getAuth");
var clerkMiddleware = /* @__PURE__ */ __name((options) => {
  deprecated("@hono/clerk-auth", 'Use `@clerk/hono` instead.\n\n- import { clerkMiddleware, getAuth } from "@hono/clerk-auth"\n+ import { clerkMiddleware, getAuth } from "@clerk/hono"');
  return async (c, next) => {
    const clerkEnv = env(c);
    const { secretKey, publishableKey, apiUrl, apiVersion, ...rest } = options || {
      secretKey: clerkEnv.CLERK_SECRET_KEY || "",
      publishableKey: clerkEnv.CLERK_PUBLISHABLE_KEY || "",
      apiUrl: clerkEnv.CLERK_API_URL,
      apiVersion: clerkEnv.CLERK_API_VERSION
    };
    if (!secretKey) throw new Error("Missing Clerk Secret key");
    if (!publishableKey) throw new Error("Missing Clerk Publishable key");
    const clerkClient = createClerkClient({
      ...rest,
      apiUrl,
      apiVersion,
      secretKey,
      publishableKey
    });
    const requestState = await clerkClient.authenticateRequest(c.req.raw, {
      ...rest,
      secretKey,
      publishableKey,
      acceptsToken: "any"
    });
    if (requestState.headers) {
      requestState.headers.forEach((value, key) => {
        c.res.headers.append(key, value);
      });
      const locationHeader = requestState.headers.get("location");
      if (locationHeader) return c.redirect(locationHeader, 307);
      else if (requestState.status === "handshake") throw new Error("Clerk: unexpected handshake without redirect");
    }
    const authObjectFn = /* @__PURE__ */ __name(((options$1) => getAuthObjectForAcceptedToken({
      authObject: requestState.toAuth(options$1),
      acceptsToken: "any"
    })), "authObjectFn");
    c.set("clerkAuth", authObjectFn);
    c.set("clerk", clerkClient);
    await next();
  };
}, "clerkMiddleware");

// src/index.ts
var import_client = __toESM(require_default2(), 1);

// ../node_modules/.pnpm/@tidbcloud+prisma-adapter@6.17.0_@tidbcloud+serverless@0.3.0/node_modules/@tidbcloud/prisma-adapter/dist/index.mjs
init_checked_fetch();
init_modules_watch_stub();

// ../node_modules/.pnpm/@tidbcloud+serverless@0.3.0/node_modules/@tidbcloud/serverless/dist/index.js
init_checked_fetch();
init_modules_watch_stub();
function format(query, values) {
  return Array.isArray(values) ? replacePosition(query, values) : replaceNamed(query, values);
}
__name(format, "format");
function replacePosition(query, values) {
  let index = 0;
  return query.replace(/\?/g, (match3) => {
    return index < values.length ? sanitize(values[index++]) : match3;
  });
}
__name(replacePosition, "replacePosition");
function replaceNamed(query, values) {
  return query.replace(/:(\w+)/g, (match3, name2) => {
    return hasOwn(values, name2) ? sanitize(values[name2]) : match3;
  });
}
__name(replaceNamed, "replaceNamed");
function hasOwn(obj, name2) {
  return Object.prototype.hasOwnProperty.call(obj, name2);
}
__name(hasOwn, "hasOwn");
function sanitize(value) {
  if (value == null) {
    return "null";
  }
  if (["number", "bigint"].includes(typeof value)) {
    return String(value);
  }
  if (typeof value === "boolean") {
    return value ? "true" : "false";
  }
  if (value instanceof Uint8Array) {
    return uint8ArrayToHex(value);
  }
  if (typeof value === "string") {
    return quote(value);
  }
  if (Array.isArray(value)) {
    return value.map(sanitize).join(", ");
  }
  if (value instanceof Date) {
    return quote(value.toISOString().replace("Z", ""));
  }
  return quote(value.toString());
}
__name(sanitize, "sanitize");
function quote(text) {
  return `'${escape(text)}'`;
}
__name(quote, "quote");
var re = /[\0\b\n\r\t\x1a\\"']/g;
function escape(text) {
  return text.replace(re, replacement);
}
__name(escape, "escape");
function replacement(text) {
  switch (text) {
    case '"':
      return '\\"';
    case "'":
      return "\\'";
    case "\n":
      return "\\n";
    case "\r":
      return "\\r";
    case "	":
      return "\\t";
    case "\\":
      return "\\\\";
    case "\0":
      return "\\0";
    case "\b":
      return "\\b";
    case "":
      return "\\Z";
    default:
      return "";
  }
}
__name(replacement, "replacement");
function uint8ArrayToHex(uint8) {
  const digits = Array.from(uint8).map((i) => i.toString(16).padStart(2, "0"));
  return `0x${digits.join("")}`;
}
__name(uint8ArrayToHex, "uint8ArrayToHex");
function cast(field, value, decoder) {
  if (value === null) {
    return null;
  }
  if (decoder[field.type]) {
    return decoder[field.type](value);
  }
  switch (field.type) {
    // bool will be converted to TINYINT
    case "TINYINT":
    case "UNSIGNED TINYINT":
    case "SMALLINT":
    case "UNSIGNED SMALLINT":
    case "MEDIUMINT":
    case "UNSIGNED MEDIUMINT":
    case "INT":
    case "UNSIGNED INT":
    case "YEAR":
      return parseInt(value, 10);
    case "FLOAT":
    case "DOUBLE":
      return parseFloat(value);
    case "BIGINT":
    case "UNSIGNED BIGINT":
    case "DECIMAL":
    case "SET":
    case "ENUM":
    case "CHAR":
    case "VARCHAR":
    case "TEXT":
    case "MEDIUMTEXT":
    case "LONGTEXT":
    case "TINYTEXT":
    case "DATE":
    case "TIME":
    case "DATETIME":
    case "TIMESTAMP":
      return value;
    case "BLOB":
    case "TINYBLOB":
    case "MEDIUMBLOB":
    case "LONGBLOB":
    case "BINARY":
    case "VARBINARY":
    case "BIT":
      return hexToUint8Array(value);
    case "JSON":
      return JSON.parse(value);
    default:
      return value;
  }
}
__name(cast, "cast");
function hexToUint8Array(hexString) {
  const uint8Array = new Uint8Array(hexString.length / 2);
  for (let i = 0; i < hexString.length; i += 2) {
    uint8Array[i / 2] = parseInt(hexString.substring(i, i + 2), 16);
  }
  return uint8Array;
}
__name(hexToUint8Array, "hexToUint8Array");
var DatabaseError = class extends Error {
  static {
    __name(this, "DatabaseError");
  }
  constructor(message, status, details) {
    super(message);
    this.status = status;
    this.details = details;
  }
};
var Version = "0.3.0";
async function postQuery(config, body, session = "", isolationLevel = null, debug3, statefulAction) {
  let fetchCacheOption = { cache: "no-store" };
  try {
    new Request("x:", fetchCacheOption);
  } catch (err) {
    fetchCacheOption = {};
  }
  const requestId = generateUniqueId();
  if (debug3) {
    console.log(`[serverless-js debug] request id: ${requestId}`);
  }
  const url = new URL("/v1beta/sql", `https://http-${config.host}`);
  const auth = btoa(`${config.username}:${config.password}`);
  const { fetch: fetch2 } = config;
  const database = config.database ?? "";
  const headers = {
    "Content-Type": "application/json",
    "User-Agent": `serverless-js/${Version}`,
    Authorization: `Basic ${auth}`,
    "TiDB-Database": database,
    "TiDB-Session": session,
    "X-Debug-Trace-Id": requestId,
    "Accept-Encoding": "gzip"
  };
  if (isolationLevel) {
    headers["TiDB-Isolation-Level"] = isolationLevel;
  }
  if (statefulAction) {
    headers["TiDB-Stateful-Action"] = statefulAction;
  }
  const response = await fetch2(url.toString(), {
    method: "POST",
    body,
    headers,
    ...fetchCacheOption
  });
  if (debug3) {
    const traceId = response?.headers?.get("X-Debug-Trace-Id");
    console.log(`[serverless-js debug] response id: ${traceId}`);
    const contentEncoding = response?.headers?.get("Content-Encoding");
    console.log(`[serverless-js debug] Content-Encoding: ${contentEncoding}`);
  }
  if (response.ok) {
    const resp = await response.json();
    const session2 = response.headers.get("TiDB-Session");
    resp.session = session2 ?? "";
    return resp;
  } else {
    let error;
    try {
      const e = await response.json();
      error = new DatabaseError(e.message, response.status, e);
    } catch {
      error = new DatabaseError(response.statusText, response.status, null);
    }
    throw error;
  }
}
__name(postQuery, "postQuery");
function generateUniqueId() {
  const datetime = (/* @__PURE__ */ new Date()).toISOString().replace(/[^\d]/g, "").slice(0, 14);
  return `${datetime}${randomString(20)}`;
}
__name(generateUniqueId, "generateUniqueId");
function randomString(n) {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const l = characters.length;
  for (let i = 0; i < n; i++) {
    result += characters[Math.floor(Math.random() * l)];
  }
  return result;
}
__name(randomString, "randomString");
var defaultExecuteOptions = {};
var Tx = class {
  static {
    __name(this, "Tx");
  }
  constructor(conn) {
    this.conn = conn;
  }
  async execute(query, args = null, options = defaultExecuteOptions) {
    return this.conn.execute(query, args, options);
  }
  async commit() {
    return this.conn.execute("COMMIT");
  }
  async rollback() {
    return this.conn.execute("ROLLBACK");
  }
};
var Connection = class _Connection {
  static {
    __name(this, "_Connection");
  }
  constructor(config) {
    var _a;
    this.session = null;
    this.config = { ...config };
    if (typeof fetch !== "undefined") {
      (_a = this.config).fetch || (_a.fetch = fetch);
    }
    if (config.url) {
      const url = new URL(config.url);
      if (!this.config.username) {
        this.config.username = decodeURIComponent(url.username);
      }
      if (!this.config.password) {
        this.config.password = decodeURIComponent(url.password);
      }
      if (!this.config.host) {
        this.config.host = url.hostname;
      }
      if (!this.config.database) {
        this.config.database = decodeURIComponent(url.pathname.slice(1));
      }
    }
  }
  getConfig() {
    return this.config;
  }
  async begin(txOptions = {}) {
    const conn = new _Connection(this.config);
    const tx = new Tx(conn);
    await conn.execute("BEGIN", void 0, void 0, txOptions);
    return tx;
  }
  async persist() {
    const conn = new _Connection(this.config);
    await conn.execute("", null, defaultExecuteOptions, {}, "open");
    const stateful = new StatefulConnection(conn);
    return stateful;
  }
  async execute(query, args = null, options = defaultExecuteOptions, txOptions = {}, statefulAction) {
    const sql = args ? format(query, args) : query;
    const body = JSON.stringify({ query: sql });
    const debug3 = options.debug ?? this.config.debug ?? false;
    if (debug3) {
      console.log(`[serverless-js debug] sql: ${sql}`);
    }
    const resp = await postQuery(
      this.config,
      body,
      this.session ?? "",
      sql == "BEGIN" ? txOptions.isolation : null,
      debug3,
      statefulAction
    );
    this.session = resp?.session ?? null;
    if (this.session === null || this.session === "") {
      throw new DatabaseError("empty session, please try again", 500, null);
    }
    const arrayMode = options.arrayMode ?? this.config.arrayMode ?? false;
    const fullResult = options.fullResult ?? this.config.fullResult ?? false;
    const decoders = { ...this.config.decoders, ...options.decoders };
    const fields = resp?.types ?? [];
    const rows = resp ? parse2(fields, resp?.rows ?? [], cast, arrayMode, decoders) : [];
    if (fullResult) {
      const rowsAffected = resp?.rowsAffected ?? null;
      const lastInsertId = resp?.sLastInsertID ?? null;
      const typeByName = /* @__PURE__ */ __name((acc, { name: name2, type }) => ({ ...acc, [name2]: type }), "typeByName");
      const types = fields.reduce(typeByName, {});
      return {
        statement: sql,
        types,
        rows,
        rowsAffected,
        lastInsertId,
        rowCount: rows.length
      };
    }
    return rows;
  }
};
var StatefulConnection = class {
  static {
    __name(this, "StatefulConnection");
  }
  constructor(conn) {
    this.conn = conn;
  }
  async execute(query, args = null, options = defaultExecuteOptions) {
    return this.conn.execute(query, args, options);
  }
  async close() {
    await this.conn.execute("", null, defaultExecuteOptions, {}, "close");
  }
};
function parseArrayRow(fields, rawRow, cast2, decoders) {
  return fields.map((field, ix) => {
    return cast2(field, rawRow[ix], decoders);
  });
}
__name(parseArrayRow, "parseArrayRow");
function parseObjectRow(fields, rawRow, cast2, decoders) {
  return fields.reduce((acc, field, ix) => {
    acc[field.name] = cast2(field, rawRow[ix], decoders);
    return acc;
  }, {});
}
__name(parseObjectRow, "parseObjectRow");
function parse2(fields, rows, cast2, arrayMode, decode) {
  return rows.map((row) => arrayMode === true ? parseArrayRow(fields, row, cast2, decode) : parseObjectRow(fields, row, cast2, decode));
}
__name(parse2, "parse");

// ../node_modules/.pnpm/@prisma+driver-adapter-utils@6.17.0/node_modules/@prisma/driver-adapter-utils/dist/index.mjs
init_checked_fetch();
init_modules_watch_stub();

// ../node_modules/.pnpm/@prisma+debug@6.17.0/node_modules/@prisma/debug/dist/index.mjs
init_checked_fetch();
init_modules_watch_stub();
var __defProp3 = Object.defineProperty;
var __export2 = /* @__PURE__ */ __name((target, all) => {
  for (var name2 in all)
    __defProp3(target, name2, { get: all[name2], enumerable: true });
}, "__export");
var colors_exports = {};
__export2(colors_exports, {
  $: /* @__PURE__ */ __name(() => $2, "$"),
  bgBlack: /* @__PURE__ */ __name(() => bgBlack, "bgBlack"),
  bgBlue: /* @__PURE__ */ __name(() => bgBlue, "bgBlue"),
  bgCyan: /* @__PURE__ */ __name(() => bgCyan, "bgCyan"),
  bgGreen: /* @__PURE__ */ __name(() => bgGreen, "bgGreen"),
  bgMagenta: /* @__PURE__ */ __name(() => bgMagenta, "bgMagenta"),
  bgRed: /* @__PURE__ */ __name(() => bgRed, "bgRed"),
  bgWhite: /* @__PURE__ */ __name(() => bgWhite, "bgWhite"),
  bgYellow: /* @__PURE__ */ __name(() => bgYellow, "bgYellow"),
  black: /* @__PURE__ */ __name(() => black, "black"),
  blue: /* @__PURE__ */ __name(() => blue, "blue"),
  bold: /* @__PURE__ */ __name(() => bold, "bold"),
  cyan: /* @__PURE__ */ __name(() => cyan, "cyan"),
  dim: /* @__PURE__ */ __name(() => dim, "dim"),
  gray: /* @__PURE__ */ __name(() => gray, "gray"),
  green: /* @__PURE__ */ __name(() => green, "green"),
  grey: /* @__PURE__ */ __name(() => grey, "grey"),
  hidden: /* @__PURE__ */ __name(() => hidden, "hidden"),
  inverse: /* @__PURE__ */ __name(() => inverse, "inverse"),
  italic: /* @__PURE__ */ __name(() => italic, "italic"),
  magenta: /* @__PURE__ */ __name(() => magenta, "magenta"),
  red: /* @__PURE__ */ __name(() => red, "red"),
  reset: /* @__PURE__ */ __name(() => reset, "reset"),
  strikethrough: /* @__PURE__ */ __name(() => strikethrough, "strikethrough"),
  underline: /* @__PURE__ */ __name(() => underline, "underline"),
  white: /* @__PURE__ */ __name(() => white, "white"),
  yellow: /* @__PURE__ */ __name(() => yellow, "yellow")
});
var FORCE_COLOR;
var NODE_DISABLE_COLORS;
var NO_COLOR;
var TERM;
var isTTY = true;
if (typeof process !== "undefined") {
  ({ FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM } = process.env || {});
  isTTY = process.stdout && process.stdout.isTTY;
}
var $2 = {
  enabled: !NODE_DISABLE_COLORS && NO_COLOR == null && TERM !== "dumb" && (FORCE_COLOR != null && FORCE_COLOR !== "0" || isTTY)
};
function init(x, y) {
  let rgx = new RegExp(`\\x1b\\[${y}m`, "g");
  let open = `\x1B[${x}m`, close = `\x1B[${y}m`;
  return function(txt) {
    if (!$2.enabled || txt == null) return txt;
    return open + (!!~("" + txt).indexOf(close) ? txt.replace(rgx, close + open) : txt) + close;
  };
}
__name(init, "init");
var reset = init(0, 0);
var bold = init(1, 22);
var dim = init(2, 22);
var italic = init(3, 23);
var underline = init(4, 24);
var inverse = init(7, 27);
var hidden = init(8, 28);
var strikethrough = init(9, 29);
var black = init(30, 39);
var red = init(31, 39);
var green = init(32, 39);
var yellow = init(33, 39);
var blue = init(34, 39);
var magenta = init(35, 39);
var cyan = init(36, 39);
var white = init(37, 39);
var gray = init(90, 39);
var grey = init(90, 39);
var bgBlack = init(40, 49);
var bgRed = init(41, 49);
var bgGreen = init(42, 49);
var bgYellow = init(43, 49);
var bgBlue = init(44, 49);
var bgMagenta = init(45, 49);
var bgCyan = init(46, 49);
var bgWhite = init(47, 49);
var MAX_ARGS_HISTORY = 100;
var COLORS = ["green", "yellow", "blue", "magenta", "cyan", "red"];
var argsHistory = [];
var lastTimestamp = Date.now();
var lastColor = 0;
var processEnv = typeof process !== "undefined" ? process.env : {};
globalThis.DEBUG ??= processEnv.DEBUG ?? "";
globalThis.DEBUG_COLORS ??= processEnv.DEBUG_COLORS ? processEnv.DEBUG_COLORS === "true" : true;
var topProps = {
  enable(namespace) {
    if (typeof namespace === "string") {
      globalThis.DEBUG = namespace;
    }
  },
  disable() {
    const prev = globalThis.DEBUG;
    globalThis.DEBUG = "";
    return prev;
  },
  // this is the core logic to check if logging should happen or not
  enabled(namespace) {
    const listenedNamespaces = globalThis.DEBUG.split(",").map((s2) => {
      return s2.replace(/[.+?^${}()|[\]\\]/g, "\\$&");
    });
    const isListened = listenedNamespaces.some((listenedNamespace) => {
      if (listenedNamespace === "" || listenedNamespace[0] === "-") return false;
      return namespace.match(RegExp(listenedNamespace.split("*").join(".*") + "$"));
    });
    const isExcluded = listenedNamespaces.some((listenedNamespace) => {
      if (listenedNamespace === "" || listenedNamespace[0] !== "-") return false;
      return namespace.match(RegExp(listenedNamespace.slice(1).split("*").join(".*") + "$"));
    });
    return isListened && !isExcluded;
  },
  log: /* @__PURE__ */ __name((...args) => {
    const [namespace, format2, ...rest] = args;
    const logWithFormatting = console.warn ?? console.log;
    logWithFormatting(`${namespace} ${format2}`, ...rest);
  }, "log"),
  formatters: {}
  // not implemented
};
function debugCreate(namespace) {
  const instanceProps = {
    color: COLORS[lastColor++ % COLORS.length],
    enabled: topProps.enabled(namespace),
    namespace,
    log: topProps.log,
    extend: /* @__PURE__ */ __name(() => {
    }, "extend")
    // not implemented
  };
  const debugCall = /* @__PURE__ */ __name((...args) => {
    const { enabled, namespace: namespace2, color, log } = instanceProps;
    if (args.length !== 0) {
      argsHistory.push([namespace2, ...args]);
    }
    if (argsHistory.length > MAX_ARGS_HISTORY) {
      argsHistory.shift();
    }
    if (topProps.enabled(namespace2) || enabled) {
      const stringArgs = args.map((arg) => {
        if (typeof arg === "string") {
          return arg;
        }
        return safeStringify(arg);
      });
      const ms = `+${Date.now() - lastTimestamp}ms`;
      lastTimestamp = Date.now();
      if (globalThis.DEBUG_COLORS) {
        log(colors_exports[color](bold(namespace2)), ...stringArgs, colors_exports[color](ms));
      } else {
        log(namespace2, ...stringArgs, ms);
      }
    }
  }, "debugCall");
  return new Proxy(debugCall, {
    get: /* @__PURE__ */ __name((_2, prop) => instanceProps[prop], "get"),
    set: /* @__PURE__ */ __name((_2, prop, value) => instanceProps[prop] = value, "set")
  });
}
__name(debugCreate, "debugCreate");
var Debug2 = new Proxy(debugCreate, {
  get: /* @__PURE__ */ __name((_2, prop) => topProps[prop], "get"),
  set: /* @__PURE__ */ __name((_2, prop, value) => topProps[prop] = value, "set")
});
function safeStringify(value, indent = 2) {
  const cache2 = /* @__PURE__ */ new Set();
  return JSON.stringify(
    value,
    (key, value2) => {
      if (typeof value2 === "object" && value2 !== null) {
        if (cache2.has(value2)) {
          return `[Circular *]`;
        }
        cache2.add(value2);
      } else if (typeof value2 === "bigint") {
        return value2.toString();
      }
      return value2;
    },
    indent
  );
}
__name(safeStringify, "safeStringify");

// ../node_modules/.pnpm/@prisma+driver-adapter-utils@6.17.0/node_modules/@prisma/driver-adapter-utils/dist/index.mjs
var debug = Debug2("driver-adapter-utils");
var ColumnTypeEnum = {
  // Scalars
  Int32: 0,
  Int64: 1,
  Float: 2,
  Double: 3,
  Numeric: 4,
  Boolean: 5,
  Character: 6,
  Text: 7,
  Date: 8,
  Time: 9,
  DateTime: 10,
  Json: 11,
  Enum: 12,
  Bytes: 13,
  Set: 14,
  Uuid: 15,
  // Arrays
  Int32Array: 64,
  Int64Array: 65,
  FloatArray: 66,
  DoubleArray: 67,
  NumericArray: 68,
  BooleanArray: 69,
  CharacterArray: 70,
  TextArray: 71,
  DateArray: 72,
  TimeArray: 73,
  DateTimeArray: 74,
  JsonArray: 75,
  EnumArray: 76,
  BytesArray: 77,
  UuidArray: 78,
  // Custom
  UnknownNumber: 128
};
var mockAdapterErrors = {
  queryRaw: new Error("Not implemented: queryRaw"),
  executeRaw: new Error("Not implemented: executeRaw"),
  startTransaction: new Error("Not implemented: startTransaction"),
  executeScript: new Error("Not implemented: executeScript"),
  dispose: new Error("Not implemented: dispose")
};

// ../node_modules/.pnpm/@tidbcloud+prisma-adapter@6.17.0_@tidbcloud+serverless@0.3.0/node_modules/@tidbcloud/prisma-adapter/dist/index.mjs
function fieldToColumnType(field) {
  switch (field) {
    case "TINYINT":
    case "UNSIGNED TINYINT":
    case "SMALLINT":
    case "UNSIGNED SMALLINT":
    case "MEDIUMINT":
    case "UNSIGNED MEDIUMINT":
    case "INT":
    case "YEAR":
      return ColumnTypeEnum.Int32;
    case "UNSIGNED INT":
    case "BIGINT":
    case "UNSIGNED BIGINT":
      return ColumnTypeEnum.Int64;
    case "FLOAT":
      return ColumnTypeEnum.Float;
    case "DOUBLE":
      return ColumnTypeEnum.Double;
    case "TIMESTAMP":
    case "DATETIME":
      return ColumnTypeEnum.DateTime;
    case "DATE":
      return ColumnTypeEnum.Date;
    case "TIME":
      return ColumnTypeEnum.Time;
    case "DECIMAL":
      return ColumnTypeEnum.Numeric;
    case "CHAR":
    case "TINYTEXT":
    case "TEXT":
    case "MEDIUMTEXT":
    case "LONGTEXT":
    case "VARCHAR":
      return ColumnTypeEnum.Text;
    case "JSON":
      return ColumnTypeEnum.Json;
    case "TINYBLOB":
    case "BLOB":
    case "MEDIUMBLOB":
    case "LONGBLOB":
    case "BINARY":
    case "VARBINARY":
    case "BIT":
      return ColumnTypeEnum.Bytes;
    case "SET":
      return ColumnTypeEnum.Set;
    case "ENUM":
      return ColumnTypeEnum.Enum;
    case "NULL":
      return ColumnTypeEnum.Int32;
    default:
      throw new Error(`Unsupported column type: ${field}`);
  }
}
__name(fieldToColumnType, "fieldToColumnType");
var customDecoder = {
  BINARY: /* @__PURE__ */ __name((value) => Array.from(hexToUint8Array2(value)), "BINARY"),
  VARBINARY: /* @__PURE__ */ __name((value) => Array.from(hexToUint8Array2(value)), "VARBINARY"),
  BLOB: /* @__PURE__ */ __name((value) => Array.from(hexToUint8Array2(value)), "BLOB"),
  LONGBLOB: /* @__PURE__ */ __name((value) => Array.from(hexToUint8Array2(value)), "LONGBLOB"),
  TINYBLOB: /* @__PURE__ */ __name((value) => Array.from(hexToUint8Array2(value)), "TINYBLOB"),
  MEDIUMBLOB: /* @__PURE__ */ __name((value) => Array.from(hexToUint8Array2(value)), "MEDIUMBLOB"),
  BIT: /* @__PURE__ */ __name((value) => Array.from(hexToUint8Array2(value)), "BIT")
};
function hexToUint8Array2(hexString) {
  const uint8Array = new Uint8Array(hexString.length / 2);
  for (let i = 0; i < hexString.length; i += 2) {
    uint8Array[i / 2] = parseInt(hexString.substring(i, i + 2), 16);
  }
  return uint8Array;
}
__name(hexToUint8Array2, "hexToUint8Array");
function mapArg(arg, argType) {
  if (arg === null) {
    return null;
  }
  if (typeof arg === "string" && argType.scalarType === "bigint") {
    return BigInt(arg);
  }
  if (typeof arg === "string" && argType.scalarType === "datetime") {
    arg = new Date(arg);
  }
  if (arg instanceof Date) {
    switch (argType.dbType) {
      case "TIME":
      case "TIME2":
        return formatTime(arg);
      case "DATE":
      case "NEWDATE":
        return formatDate(arg);
      default:
        return formatDateTime(arg);
    }
  }
  if (typeof arg === "string" && argType.scalarType === "bytes") {
    return Buffer.from(arg, "base64");
  }
  if (Array.isArray(arg) && argType.scalarType === "bytes") {
    return Buffer.from(arg);
  }
  if (ArrayBuffer.isView(arg)) {
    return Buffer.from(arg.buffer, arg.byteOffset, arg.byteLength);
  }
  return arg;
}
__name(mapArg, "mapArg");
function formatDateTime(date) {
  const pad = /* @__PURE__ */ __name((n, z = 2) => String(n).padStart(z, "0"), "pad");
  const ms = date.getUTCMilliseconds();
  return date.getUTCFullYear() + "-" + pad(date.getUTCMonth() + 1) + "-" + pad(date.getUTCDate()) + " " + pad(date.getUTCHours()) + ":" + pad(date.getUTCMinutes()) + ":" + pad(date.getUTCSeconds()) + (ms ? "." + String(ms).padStart(3, "0") : "");
}
__name(formatDateTime, "formatDateTime");
function formatDate(date) {
  const pad = /* @__PURE__ */ __name((n, z = 2) => String(n).padStart(z, "0"), "pad");
  return date.getUTCFullYear() + "-" + pad(date.getUTCMonth() + 1) + "-" + pad(date.getUTCDate());
}
__name(formatDate, "formatDate");
function formatTime(date) {
  const pad = /* @__PURE__ */ __name((n, z = 2) => String(n).padStart(z, "0"), "pad");
  const ms = date.getUTCMilliseconds();
  return pad(date.getUTCHours()) + ":" + pad(date.getUTCMinutes()) + ":" + pad(date.getUTCSeconds()) + (ms ? "." + String(ms).padStart(3, "0") : "");
}
__name(formatTime, "formatTime");
var name = "@tidbcloud/prisma-adapter";
var debug2 = Debug2("prisma:driver-adapter:tidbcloud");
var defaultDatabase = "test";
var TiDBCloudQueryable = class {
  static {
    __name(this, "TiDBCloudQueryable");
  }
  constructor(client) {
    this.client = client;
  }
  provider = "mysql";
  adapterName = name;
  /**
   * Execute a query given as SQL, interpolating the given parameters.
   */
  async queryRaw(query) {
    const tag = "[js::query_raw]";
    debug2(`${tag} %O`, query);
    const result = await this.performIO(query);
    const fields = result.types;
    const rows = result.rows;
    const lastInsertId = result.lastInsertId?.toString();
    const columnNames = Object.keys(fields);
    const columnRawTypes = Object.values(fields);
    const resultSet = {
      columnNames,
      columnTypes: columnRawTypes.map(
        (field) => fieldToColumnType(field)
      ),
      rows,
      lastInsertId
    };
    return resultSet;
  }
  /**
   * Execute a query given as SQL, interpolating the given parameters and
   * returning the number of affected rows.
   * Note: Queryable expects a u64, but napi.rs only supports u32.
   */
  async executeRaw(query) {
    const tag = "[js::execute_raw]";
    debug2(`${tag} %O`, query);
    const result = await this.performIO(query);
    const rowsAffected = result.rowsAffected;
    return rowsAffected;
  }
  /**
   * Run a query against the database, returning the result set.
   * Should the query fail due to a connection error, the connection is
   * marked as unhealthy.
   */
  async performIO(query) {
    const { sql, args: values } = query;
    try {
      const result = await this.client.execute(
        sql,
        values.map((val, i) => mapArg(val, query.argTypes[i])),
        {
          arrayMode: true,
          fullResult: true,
          decoders: customDecoder
        }
      );
      return result;
    } catch (e) {
      const error = e;
      debug2("Error in performIO: %O", error);
      throw error;
    }
  }
};
var TiDBCloudTransaction = class extends TiDBCloudQueryable {
  static {
    __name(this, "TiDBCloudTransaction");
  }
  constructor(tx, options) {
    super(tx);
    this.options = options;
  }
  finished = false;
  async commit() {
    debug2(`[js::commit]`);
    this.finished = true;
    await this.client.commit();
    return Promise.resolve(void 0);
  }
  async rollback() {
    debug2(`[js::rollback]`);
    this.finished = true;
    await this.client.rollback();
    return Promise.resolve(void 0);
  }
  dispose() {
    if (!this.finished) {
      this.rollback().catch(console.error);
    }
    return void 0;
  }
};
var PrismaTiDBCloudAdapter = class extends TiDBCloudQueryable {
  static {
    __name(this, "PrismaTiDBCloudAdapter");
  }
  constructor(connect) {
    super(connect);
  }
  executeScript(_script) {
    throw new Error("Not implemented yet");
  }
  getConnectionInfo() {
    const config = this.client.getConfig();
    const dbName = config.database ? config.database : defaultDatabase;
    return {
      schemaName: dbName,
      supportsRelationJoins: true
    };
  }
  async startTransaction(isolationLevel) {
    const options = {
      usePhantomQuery: true
    };
    const tag = "[js::startTransaction]";
    debug2("%s option: %O", tag, options);
    const supportedLevels = ["READ COMMITTED", "REPEATABLE READ"];
    if (isolationLevel && !supportedLevels.includes(isolationLevel)) {
      throw new Error(
        `TiDBCloud prisma-adapter does not support the isolation level ${isolationLevel}`
      );
    }
    const tx = await this.client.begin({
      isolation: isolationLevel
    });
    return new TiDBCloudTransaction(tx, options);
  }
  async dispose() {
  }
};
var PrismaTiDBCloudAdapterFactory = class {
  static {
    __name(this, "PrismaTiDBCloudAdapterFactory");
  }
  constructor(config) {
    this.config = config;
  }
  provider = "mysql";
  adapterName = name;
  async connect() {
    return new PrismaTiDBCloudAdapter(new Connection(this.config));
  }
};

// ../node_modules/.pnpm/hono@4.12.27/node_modules/hono/dist/middleware/cors/index.js
init_checked_fetch();
init_modules_watch_stub();
var cors = /* @__PURE__ */ __name((options) => {
  const opts = {
    origin: "*",
    allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"],
    allowHeaders: [],
    exposeHeaders: [],
    ...options
  };
  const findAllowOrigin = ((optsOrigin) => {
    if (typeof optsOrigin === "string") {
      if (optsOrigin === "*") {
        return () => optsOrigin;
      } else {
        return (origin) => optsOrigin === origin ? origin : null;
      }
    } else if (typeof optsOrigin === "function") {
      return optsOrigin;
    } else {
      return (origin) => optsOrigin.includes(origin) ? origin : null;
    }
  })(opts.origin);
  const findAllowMethods = ((optsAllowMethods) => {
    if (typeof optsAllowMethods === "function") {
      return optsAllowMethods;
    } else if (Array.isArray(optsAllowMethods)) {
      return () => optsAllowMethods;
    } else {
      return () => [];
    }
  })(opts.allowMethods);
  return /* @__PURE__ */ __name(async function cors2(c, next) {
    function set(key, value) {
      c.res.headers.set(key, value);
    }
    __name(set, "set");
    const allowOrigin = await findAllowOrigin(c.req.header("origin") || "", c);
    if (allowOrigin) {
      set("Access-Control-Allow-Origin", allowOrigin);
    }
    if (opts.credentials) {
      set("Access-Control-Allow-Credentials", "true");
    }
    if (opts.exposeHeaders?.length) {
      set("Access-Control-Expose-Headers", opts.exposeHeaders.join(","));
    }
    if (c.req.method === "OPTIONS") {
      if (opts.origin !== "*") {
        set("Vary", "Origin");
      }
      if (opts.maxAge != null) {
        set("Access-Control-Max-Age", opts.maxAge.toString());
      }
      const allowMethods = await findAllowMethods(c.req.header("origin") || "", c);
      if (allowMethods.length) {
        set("Access-Control-Allow-Methods", allowMethods.join(","));
      }
      let headers = opts.allowHeaders;
      if (!headers?.length) {
        const requestHeaders = c.req.header("Access-Control-Request-Headers");
        if (requestHeaders) {
          headers = requestHeaders.split(/\s*,\s*/);
        }
      }
      if (headers?.length) {
        set("Access-Control-Allow-Headers", headers.join(","));
        c.res.headers.append("Vary", "Access-Control-Request-Headers");
      }
      c.res.headers.delete("Content-Length");
      c.res.headers.delete("Content-Type");
      return new Response(null, {
        headers: c.res.headers,
        status: 204,
        statusText: "No Content"
      });
    }
    await next();
    if (opts.origin !== "*") {
      c.header("Vary", "Origin", { append: true });
    }
  }, "cors2");
}, "cors");

// src/index.ts
var app = new Hono2();
app.onError((err, c) => {
  console.error("Global Error:", err);
  return c.json({ error: String(err), message: err.message, stack: err.stack }, 500);
});
app.use("*", cors({
  origin: "*",
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["POST", "GET", "OPTIONS", "DELETE", "PUT"],
  maxAge: 600
}));
app.use("*", async (c, next) => {
  const authHandler = clerkMiddleware({
    secretKey: c.env.CLERK_SECRET_KEY,
    publishableKey: c.env.CLERK_PUBLISHABLE_KEY
  });
  return authHandler(c, next);
});
app.use("*", async (c, next) => {
  const auth = getAuth(c);
  console.log("Path:", c.req.path);
  console.log("Auth Header:", c.req.header("authorization") ? "Present" : "Missing");
  console.log("User ID:", auth?.userId);
  await next();
});
var getPrisma = /* @__PURE__ */ __name((env2) => {
  const adapter = new PrismaTiDBCloudAdapterFactory({ url: env2.DATABASE_URL });
  return new import_client.PrismaClient({ adapter });
}, "getPrisma");
app.get("/api/health", (c) => {
  return c.json({ status: "ok", message: "Hono Backend is running on Cloudflare Workers" });
});
app.get("/api/db-test", async (c) => {
  try {
    const prisma = getPrisma(c.env);
    const count = await prisma.pageConfig.count();
    return c.json({ status: "ok", count });
  } catch (err) {
    console.error("DB Test Error:", err);
    return c.json({ error: String(err), stack: err.stack, details: err }, 500);
  }
});
app.get("/api/ai/sessions", async (c) => {
  const auth = getAuth(c);
  if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);
  const prisma = getPrisma(c.env);
  try {
    const sessions = await prisma.aiChatSession.findMany({
      where: { user_id: auth.userId },
      orderBy: { updated_at: "desc" }
    });
    return c.json({ data: sessions });
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});
app.post("/api/ai/sessions", async (c) => {
  const auth = getAuth(c);
  if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);
  const { title } = await c.req.json();
  const prisma = getPrisma(c.env);
  try {
    const session = await prisma.aiChatSession.create({
      data: { user_id: auth.userId, title: title || "New Chat" }
    });
    return c.json({ data: session });
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});
app.delete("/api/ai/sessions/:id", async (c) => {
  const auth = getAuth(c);
  if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);
  const sessionId = c.req.param("id");
  const prisma = getPrisma(c.env);
  try {
    await prisma.aiChatSession.delete({
      where: { id: sessionId, user_id: auth.userId }
    });
    return c.json({ success: true });
  } catch (error) {
    console.error("API Error DELETE /api/ai/sessions/:id:", error);
    return c.json({ error: error.message }, 500);
  }
});
app.get("/api/ai/sessions/:sessionId/messages", async (c) => {
  const auth = getAuth(c);
  if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);
  const sessionId = c.req.param("sessionId");
  const prisma = getPrisma(c.env);
  try {
    const session = await prisma.aiChatSession.findUnique({ where: { id: sessionId, user_id: auth.userId } });
    if (!session) return c.json({ error: "Session not found" }, 404);
    const messages = await prisma.aiChatMessage.findMany({
      where: { session_id: sessionId },
      orderBy: { created_at: "asc" }
    });
    return c.json({ data: messages });
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});
app.post("/api/ai/messages", async (c) => {
  const auth = getAuth(c);
  if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);
  const { session_id, role, content, config_data, status } = await c.req.json();
  const prisma = getPrisma(c.env);
  try {
    const session = await prisma.aiChatSession.findUnique({ where: { id: session_id, user_id: auth.userId } });
    if (!session) return c.json({ error: "Session not found" }, 404);
    const message = await prisma.aiChatMessage.create({
      data: {
        session_id,
        role,
        content,
        config_data,
        status
      }
    });
    await prisma.aiChatSession.update({
      where: { id: session_id },
      data: { updated_at: /* @__PURE__ */ new Date() }
    });
    return c.json({ data: message });
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});
app.get("/api/configs/team", async (c) => {
  const auth = getAuth(c);
  if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);
  const prisma = getPrisma(c.env);
  try {
    const config = await prisma.teamConfig.findUnique({ where: { user_id: auth.userId } });
    return c.json({ data: config });
  } catch (error) {
    console.error("API Error /team:", error);
    return c.json({ error: String(error) }, 500);
  }
});
app.post("/api/configs/team", async (c) => {
  const auth = getAuth(c);
  if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);
  const { team_config } = await c.req.json();
  const prisma = getPrisma(c.env);
  try {
    const config = await prisma.teamConfig.upsert({
      where: { user_id: auth.userId },
      update: { team_config },
      create: { user_id: auth.userId, team_config }
    });
    return c.json({ data: config });
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});
app.get("/api/configs/menu", async (c) => {
  const auth = getAuth(c);
  if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);
  const prisma = getPrisma(c.env);
  try {
    const config = await prisma.menuConfig.findUnique({ where: { user_id: auth.userId } });
    return c.json({ data: config });
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});
app.post("/api/configs/menu", async (c) => {
  const auth = getAuth(c);
  if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);
  const { menu_config } = await c.req.json();
  const prisma = getPrisma(c.env);
  try {
    const config = await prisma.menuConfig.upsert({
      where: { user_id: auth.userId },
      update: { menu_config },
      create: { user_id: auth.userId, menu_config }
    });
    return c.json({ data: config });
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});
app.get("/api/configs/pages", async (c) => {
  const auth = getAuth(c);
  if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);
  const prisma = getPrisma(c.env);
  try {
    const configs = await prisma.pageConfig.findMany({ where: { user_id: auth.userId } });
    return c.json({ data: configs });
  } catch (error) {
    console.error("API Error GET /pages:", error);
    return c.json({ error: String(error) }, 500);
  }
});
app.post("/api/configs/pages/sync", async (c) => {
  const auth = getAuth(c);
  if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);
  const { upsert = [], delete: delTitles = [], deleteAll = false } = await c.req.json();
  const prisma = getPrisma(c.env);
  try {
    if (deleteAll) {
      await prisma.pageConfig.deleteMany({
        where: { user_id: auth.userId }
      });
    }
    if (delTitles.length > 0) {
      await prisma.pageConfig.deleteMany({
        where: { user_id: auth.userId, title: { in: delTitles } }
      });
    }
    for (const item of upsert) {
      const existing = await prisma.pageConfig.findFirst({
        where: { user_id: auth.userId, title: item.title }
      });
      if (existing) {
        await prisma.pageConfig.update({
          where: { id: existing.id },
          data: { page_config: item.page_config }
        });
      } else {
        await prisma.pageConfig.create({
          data: { user_id: auth.userId, title: item.title, page_config: item.page_config }
        });
      }
    }
    return c.json({ success: true });
  } catch (error) {
  }
});
var src_default = app;

// ../node_modules/.pnpm/wrangler@4.106.0_@cloudflare+workers-types@4.20260702.1/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
init_checked_fetch();
init_modules_watch_stub();
var drainBody = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../node_modules/.pnpm/wrangler@4.106.0_@cloudflare+workers-types@4.20260702.1/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
init_checked_fetch();
init_modules_watch_stub();
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-8B5er1/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// ../node_modules/.pnpm/wrangler@4.106.0_@cloudflare+workers-types@4.20260702.1/node_modules/wrangler/templates/middleware/common.ts
init_checked_fetch();
init_modules_watch_stub();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env2, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env2, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env2, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env2, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-8B5er1/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  scheduledTime;
  cron;
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env2, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env2, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env2, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init2) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init2.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env2, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env2, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env2, ctx) => {
      this.env = env2;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init2) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init2.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
/*! Bundled license information:

@prisma/client-runtime-utils/dist/index.js:
  (*! Bundled license information:
  
  decimal.js/decimal.mjs:
    (*!
     *  decimal.js v10.5.0
     *  An arbitrary-precision Decimal type for JavaScript.
     *  https://github.com/MikeMcl/decimal.js
     *  Copyright (c) 2025 Michael Mclaughlin <M8ch88l@gmail.com>
     *  MIT Licence
     *)
  *)
*/
//# sourceMappingURL=index.js.map

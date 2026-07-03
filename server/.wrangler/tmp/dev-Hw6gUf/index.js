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

// .wrangler/tmp/bundle-OENzF1/checked-fetch.js
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
  ".wrangler/tmp/bundle-OENzF1/checked-fetch.js"() {
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

// ../node_modules/.pnpm/@prisma+client@6.19.3_prism_1d040ab5215f59f0e27ddee7f0cf082e/node_modules/@prisma/client/runtime/wasm-engine-edge.js
var require_wasm_engine_edge = __commonJS({
  "../node_modules/.pnpm/@prisma+client@6.19.3_prism_1d040ab5215f59f0e27ddee7f0cf082e/node_modules/@prisma/client/runtime/wasm-engine-edge.js"(exports, module) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    var Vs = Object.create;
    var nr = Object.defineProperty;
    var Bs = Object.getOwnPropertyDescriptor;
    var $s = Object.getOwnPropertyNames;
    var js = Object.getPrototypeOf;
    var Qs = Object.prototype.hasOwnProperty;
    var ae = /* @__PURE__ */ __name((t, e) => () => (t && (e = t(t = 0)), e), "ae");
    var yt = /* @__PURE__ */ __name((t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports), "yt");
    var ht = /* @__PURE__ */ __name((t, e) => {
      for (var r in e) nr(t, r, { get: e[r], enumerable: true });
    }, "ht");
    var Hn = /* @__PURE__ */ __name((t, e, r, n) => {
      if (e && typeof e == "object" || typeof e == "function") for (let i of $s(e)) !Qs.call(t, i) && i !== r && nr(t, i, { get: /* @__PURE__ */ __name(() => e[i], "get"), enumerable: !(n = Bs(e, i)) || n.enumerable });
      return t;
    }, "Hn");
    var bt = /* @__PURE__ */ __name((t, e, r) => (r = t != null ? Vs(js(t)) : {}, Hn(e || !t || !t.__esModule ? nr(r, "default", { value: t, enumerable: true }) : r, t)), "bt");
    var Gs = /* @__PURE__ */ __name((t) => Hn(nr({}, "__esModule", { value: true }), t), "Gs");
    function Kr(t, e) {
      if (e = e.toLowerCase(), e === "utf8" || e === "utf-8") return new y(Hs.encode(t));
      if (e === "base64" || e === "base64url") return t = t.replace(/-/g, "+").replace(/_/g, "/"), t = t.replace(/[^A-Za-z0-9+/]/g, ""), new y([...atob(t)].map((r) => r.charCodeAt(0)));
      if (e === "binary" || e === "ascii" || e === "latin1" || e === "latin-1") return new y([...t].map((r) => r.charCodeAt(0)));
      if (e === "ucs2" || e === "ucs-2" || e === "utf16le" || e === "utf-16le") {
        let r = new y(t.length * 2), n = new DataView(r.buffer);
        for (let i = 0; i < t.length; i++) n.setUint16(i * 2, t.charCodeAt(i), true);
        return r;
      }
      if (e === "hex") {
        let r = new y(t.length / 2);
        for (let n = 0, i = 0; i < t.length; i += 2, n++) r[n] = parseInt(t.slice(i, i + 2), 16);
        return r;
      }
      Yn(`encoding "${e}"`);
    }
    __name(Kr, "Kr");
    function Js(t) {
      let r = Object.getOwnPropertyNames(DataView.prototype).filter((a) => a.startsWith("get") || a.startsWith("set")), n = r.map((a) => a.replace("get", "read").replace("set", "write")), i = /* @__PURE__ */ __name((a, f) => function(v = 0) {
        return J(v, "offset"), re2(v, "offset"), K(v, "offset", this.length - 1), new DataView(this.buffer)[r[a]](v, f);
      }, "i"), o = /* @__PURE__ */ __name((a, f) => function(v, R = 0) {
        let A = r[a].match(/set(\w+\d+)/)[1].toLowerCase(), I2 = Ks[A];
        return J(R, "offset"), re2(R, "offset"), K(R, "offset", this.length - 1), Ws(v, "value", I2[0], I2[1]), new DataView(this.buffer)[r[a]](R, v, f), R + parseInt(r[a].match(/\d+/)[0]) / 8;
      }, "o"), s2 = /* @__PURE__ */ __name((a) => {
        a.forEach((f) => {
          f.includes("Uint") && (t[f.replace("Uint", "UInt")] = t[f]), f.includes("Float64") && (t[f.replace("Float64", "Double")] = t[f]), f.includes("Float32") && (t[f.replace("Float32", "Float")] = t[f]);
        });
      }, "s");
      n.forEach((a, f) => {
        a.startsWith("read") && (t[a] = i(f, false), t[a + "LE"] = i(f, true), t[a + "BE"] = i(f, false)), a.startsWith("write") && (t[a] = o(f, false), t[a + "LE"] = o(f, true), t[a + "BE"] = o(f, false)), s2([a, a + "LE", a + "BE"]);
      });
    }
    __name(Js, "Js");
    function Yn(t) {
      throw new Error(`Buffer polyfill does not implement "${t}"`);
    }
    __name(Yn, "Yn");
    function ir(t, e) {
      if (!(t instanceof Uint8Array)) throw new TypeError(`The "${e}" argument must be an instance of Buffer or Uint8Array`);
    }
    __name(ir, "ir");
    function K(t, e, r = Xs + 1) {
      if (t < 0 || t > r) {
        let n = new RangeError(`The value of "${e}" is out of range. It must be >= 0 && <= ${r}. Received ${t}`);
        throw n.code = "ERR_OUT_OF_RANGE", n;
      }
    }
    __name(K, "K");
    function J(t, e) {
      if (typeof t != "number") {
        let r = new TypeError(`The "${e}" argument must be of type number. Received type ${typeof t}.`);
        throw r.code = "ERR_INVALID_ARG_TYPE", r;
      }
    }
    __name(J, "J");
    function re2(t, e) {
      if (!Number.isInteger(t) || Number.isNaN(t)) {
        let r = new RangeError(`The value of "${e}" is out of range. It must be an integer. Received ${t}`);
        throw r.code = "ERR_OUT_OF_RANGE", r;
      }
    }
    __name(re2, "re");
    function Ws(t, e, r, n) {
      if (t < r || t > n) {
        let i = new RangeError(`The value of "${e}" is out of range. It must be >= ${r} and <= ${n}. Received ${t}`);
        throw i.code = "ERR_OUT_OF_RANGE", i;
      }
    }
    __name(Ws, "Ws");
    function zn(t, e) {
      if (typeof t != "string") {
        let r = new TypeError(`The "${e}" argument must be of type string. Received type ${typeof t}`);
        throw r.code = "ERR_INVALID_ARG_TYPE", r;
      }
    }
    __name(zn, "zn");
    function Zs(t, e = "utf8") {
      return y.from(t, e);
    }
    __name(Zs, "Zs");
    var y;
    var Ks;
    var Hs;
    var zs;
    var Ys;
    var Xs;
    var h;
    var Hr;
    var u = ae(() => {
      "use strict";
      y = class t extends Uint8Array {
        static {
          __name(this, "t");
        }
        _isBuffer = true;
        get offset() {
          return this.byteOffset;
        }
        static alloc(e, r = 0, n = "utf8") {
          return zn(n, "encoding"), t.allocUnsafe(e).fill(r, n);
        }
        static allocUnsafe(e) {
          return t.from(e);
        }
        static allocUnsafeSlow(e) {
          return t.from(e);
        }
        static isBuffer(e) {
          return e && !!e._isBuffer;
        }
        static byteLength(e, r = "utf8") {
          if (typeof e == "string") return Kr(e, r).byteLength;
          if (e && e.byteLength) return e.byteLength;
          let n = new TypeError('The "string" argument must be of type string or an instance of Buffer or ArrayBuffer.');
          throw n.code = "ERR_INVALID_ARG_TYPE", n;
        }
        static isEncoding(e) {
          return Ys.includes(e);
        }
        static compare(e, r) {
          ir(e, "buff1"), ir(r, "buff2");
          for (let n = 0; n < e.length; n++) {
            if (e[n] < r[n]) return -1;
            if (e[n] > r[n]) return 1;
          }
          return e.length === r.length ? 0 : e.length > r.length ? 1 : -1;
        }
        static from(e, r = "utf8") {
          if (e && typeof e == "object" && e.type === "Buffer") return new t(e.data);
          if (typeof e == "number") return new t(new Uint8Array(e));
          if (typeof e == "string") return Kr(e, r);
          if (ArrayBuffer.isView(e)) {
            let { byteOffset: n, byteLength: i, buffer: o } = e;
            return "map" in e && typeof e.map == "function" ? new t(e.map((s2) => s2 % 256), n, i) : new t(o, n, i);
          }
          if (e && typeof e == "object" && ("length" in e || "byteLength" in e || "buffer" in e)) return new t(e);
          throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
        }
        static concat(e, r) {
          if (e.length === 0) return t.alloc(0);
          let n = [].concat(...e.map((o) => [...o])), i = t.alloc(r !== void 0 ? r : n.length);
          return i.set(r !== void 0 ? n.slice(0, r) : n), i;
        }
        slice(e = 0, r = this.length) {
          return this.subarray(e, r);
        }
        subarray(e = 0, r = this.length) {
          return Object.setPrototypeOf(super.subarray(e, r), t.prototype);
        }
        reverse() {
          return super.reverse(), this;
        }
        readIntBE(e, r) {
          J(e, "offset"), re2(e, "offset"), K(e, "offset", this.length - 1), J(r, "byteLength"), re2(r, "byteLength");
          let n = new DataView(this.buffer, e, r), i = 0;
          for (let o = 0; o < r; o++) i = i * 256 + n.getUint8(o);
          return n.getUint8(0) & 128 && (i -= Math.pow(256, r)), i;
        }
        readIntLE(e, r) {
          J(e, "offset"), re2(e, "offset"), K(e, "offset", this.length - 1), J(r, "byteLength"), re2(r, "byteLength");
          let n = new DataView(this.buffer, e, r), i = 0;
          for (let o = 0; o < r; o++) i += n.getUint8(o) * Math.pow(256, o);
          return n.getUint8(r - 1) & 128 && (i -= Math.pow(256, r)), i;
        }
        readUIntBE(e, r) {
          J(e, "offset"), re2(e, "offset"), K(e, "offset", this.length - 1), J(r, "byteLength"), re2(r, "byteLength");
          let n = new DataView(this.buffer, e, r), i = 0;
          for (let o = 0; o < r; o++) i = i * 256 + n.getUint8(o);
          return i;
        }
        readUintBE(e, r) {
          return this.readUIntBE(e, r);
        }
        readUIntLE(e, r) {
          J(e, "offset"), re2(e, "offset"), K(e, "offset", this.length - 1), J(r, "byteLength"), re2(r, "byteLength");
          let n = new DataView(this.buffer, e, r), i = 0;
          for (let o = 0; o < r; o++) i += n.getUint8(o) * Math.pow(256, o);
          return i;
        }
        readUintLE(e, r) {
          return this.readUIntLE(e, r);
        }
        writeIntBE(e, r, n) {
          return e = e < 0 ? e + Math.pow(256, n) : e, this.writeUIntBE(e, r, n);
        }
        writeIntLE(e, r, n) {
          return e = e < 0 ? e + Math.pow(256, n) : e, this.writeUIntLE(e, r, n);
        }
        writeUIntBE(e, r, n) {
          J(r, "offset"), re2(r, "offset"), K(r, "offset", this.length - 1), J(n, "byteLength"), re2(n, "byteLength");
          let i = new DataView(this.buffer, r, n);
          for (let o = n - 1; o >= 0; o--) i.setUint8(o, e & 255), e = e / 256;
          return r + n;
        }
        writeUintBE(e, r, n) {
          return this.writeUIntBE(e, r, n);
        }
        writeUIntLE(e, r, n) {
          J(r, "offset"), re2(r, "offset"), K(r, "offset", this.length - 1), J(n, "byteLength"), re2(n, "byteLength");
          let i = new DataView(this.buffer, r, n);
          for (let o = 0; o < n; o++) i.setUint8(o, e & 255), e = e / 256;
          return r + n;
        }
        writeUintLE(e, r, n) {
          return this.writeUIntLE(e, r, n);
        }
        toJSON() {
          return { type: "Buffer", data: Array.from(this) };
        }
        swap16() {
          let e = new DataView(this.buffer, this.byteOffset, this.byteLength);
          for (let r = 0; r < this.length; r += 2) e.setUint16(r, e.getUint16(r, true), false);
          return this;
        }
        swap32() {
          let e = new DataView(this.buffer, this.byteOffset, this.byteLength);
          for (let r = 0; r < this.length; r += 4) e.setUint32(r, e.getUint32(r, true), false);
          return this;
        }
        swap64() {
          let e = new DataView(this.buffer, this.byteOffset, this.byteLength);
          for (let r = 0; r < this.length; r += 8) e.setBigUint64(r, e.getBigUint64(r, true), false);
          return this;
        }
        compare(e, r = 0, n = e.length, i = 0, o = this.length) {
          return ir(e, "target"), J(r, "targetStart"), J(n, "targetEnd"), J(i, "sourceStart"), J(o, "sourceEnd"), K(r, "targetStart"), K(n, "targetEnd", e.length), K(i, "sourceStart"), K(o, "sourceEnd", this.length), t.compare(this.slice(i, o), e.slice(r, n));
        }
        equals(e) {
          return ir(e, "otherBuffer"), this.length === e.length && this.every((r, n) => r === e[n]);
        }
        copy(e, r = 0, n = 0, i = this.length) {
          K(r, "targetStart"), K(n, "sourceStart", this.length), K(i, "sourceEnd"), r >>>= 0, n >>>= 0, i >>>= 0;
          let o = 0;
          for (; n < i && !(this[n] === void 0 || e[r] === void 0); ) e[r] = this[n], o++, n++, r++;
          return o;
        }
        write(e, r, n, i = "utf8") {
          let o = typeof r == "string" ? 0 : r ?? 0, s2 = typeof n == "string" ? this.length - o : n ?? this.length - o;
          return i = typeof r == "string" ? r : typeof n == "string" ? n : i, J(o, "offset"), J(s2, "length"), K(o, "offset", this.length), K(s2, "length", this.length), (i === "ucs2" || i === "ucs-2" || i === "utf16le" || i === "utf-16le") && (s2 = s2 - s2 % 2), Kr(e, i).copy(this, o, 0, s2);
        }
        fill(e = 0, r = 0, n = this.length, i = "utf-8") {
          let o = typeof r == "string" ? 0 : r, s2 = typeof n == "string" ? this.length : n;
          if (i = typeof r == "string" ? r : typeof n == "string" ? n : i, e = t.from(typeof e == "number" ? [e] : e ?? [], i), zn(i, "encoding"), K(o, "offset", this.length), K(s2, "end", this.length), e.length !== 0) for (let a = o; a < s2; a += e.length) super.set(e.slice(0, e.length + a >= this.length ? this.length - a : e.length), a);
          return this;
        }
        includes(e, r = null, n = "utf-8") {
          return this.indexOf(e, r, n) !== -1;
        }
        lastIndexOf(e, r = null, n = "utf-8") {
          return this.indexOf(e, r, n, true);
        }
        indexOf(e, r = null, n = "utf-8", i = false) {
          let o = i ? this.findLastIndex.bind(this) : this.findIndex.bind(this);
          n = typeof r == "string" ? r : n;
          let s2 = t.from(typeof e == "number" ? [e] : e, n), a = typeof r == "string" ? 0 : r;
          return a = typeof r == "number" ? a : null, a = Number.isNaN(a) ? null : a, a ??= i ? this.length : 0, a = a < 0 ? this.length + a : a, s2.length === 0 && i === false ? a >= this.length ? this.length : a : s2.length === 0 && i === true ? (a >= this.length ? this.length : a) || this.length : o((f, v) => (i ? v <= a : v >= a) && this[v] === s2[0] && s2.every((A, I2) => this[v + I2] === A));
        }
        toString(e = "utf8", r = 0, n = this.length) {
          if (r = r < 0 ? 0 : r, e = e.toString().toLowerCase(), n <= 0) return "";
          if (e === "utf8" || e === "utf-8") return zs.decode(this.slice(r, n));
          if (e === "base64" || e === "base64url") {
            let i = btoa(this.reduce((o, s2) => o + Hr(s2), ""));
            return e === "base64url" ? i.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "") : i;
          }
          if (e === "binary" || e === "ascii" || e === "latin1" || e === "latin-1") return this.slice(r, n).reduce((i, o) => i + Hr(o & (e === "ascii" ? 127 : 255)), "");
          if (e === "ucs2" || e === "ucs-2" || e === "utf16le" || e === "utf-16le") {
            let i = new DataView(this.buffer.slice(r, n));
            return Array.from({ length: i.byteLength / 2 }, (o, s2) => s2 * 2 + 1 < i.byteLength ? Hr(i.getUint16(s2 * 2, true)) : "").join("");
          }
          if (e === "hex") return this.slice(r, n).reduce((i, o) => i + o.toString(16).padStart(2, "0"), "");
          Yn(`encoding "${e}"`);
        }
        toLocaleString() {
          return this.toString();
        }
        inspect() {
          return `<Buffer ${this.toString("hex").match(/.{1,2}/g).join(" ")}>`;
        }
      };
      Ks = { int8: [-128, 127], int16: [-32768, 32767], int32: [-2147483648, 2147483647], uint8: [0, 255], uint16: [0, 65535], uint32: [0, 4294967295], float32: [-1 / 0, 1 / 0], float64: [-1 / 0, 1 / 0], bigint64: [-0x8000000000000000n, 0x7fffffffffffffffn], biguint64: [0n, 0xffffffffffffffffn] }, Hs = new TextEncoder(), zs = new TextDecoder(), Ys = ["utf8", "utf-8", "hex", "base64", "ascii", "binary", "base64url", "ucs2", "ucs-2", "utf16le", "utf-16le", "latin1", "latin-1"], Xs = 4294967295;
      Js(y.prototype);
      h = new Proxy(Zs, { construct(t, [e, r]) {
        return y.from(e, r);
      }, get(t, e) {
        return y[e];
      } }), Hr = String.fromCodePoint;
    });
    var g;
    var w;
    var c = ae(() => {
      "use strict";
      g = { nextTick: /* @__PURE__ */ __name((t, ...e) => {
        setTimeout(() => {
          t(...e);
        }, 0);
      }, "nextTick"), env: {}, version: "", cwd: /* @__PURE__ */ __name(() => "/", "cwd"), stderr: {}, argv: ["/bin/node"], pid: 1e4 }, { cwd: w } = g;
    });
    var x;
    var p = ae(() => {
      "use strict";
      x = globalThis.performance ?? (() => {
        let t = Date.now();
        return { now: /* @__PURE__ */ __name(() => Date.now() - t, "now") };
      })();
    });
    var E;
    var m = ae(() => {
      "use strict";
      E = /* @__PURE__ */ __name(() => {
      }, "E");
      E.prototype = E;
    });
    var b;
    var d = ae(() => {
      "use strict";
      b = class {
        static {
          __name(this, "b");
        }
        value;
        constructor(e) {
          this.value = e;
        }
        deref() {
          return this.value;
        }
      };
    });
    function ti(t, e) {
      var r, n, i, o, s2, a, f, v, R = t.constructor, A = R.precision;
      if (!t.s || !e.s) return e.s || (e = new R(t)), $3 ? N(e, A) : e;
      if (f = t.d, v = e.d, s2 = t.e, i = e.e, f = f.slice(), o = s2 - i, o) {
        for (o < 0 ? (n = f, o = -o, a = v.length) : (n = v, i = s2, a = f.length), s2 = Math.ceil(A / B), a = s2 > a ? s2 + 1 : a + 1, o > a && (o = a, n.length = 1), n.reverse(); o--; ) n.push(0);
        n.reverse();
      }
      for (a = f.length, o = v.length, a - o < 0 && (o = a, n = v, v = f, f = n), r = 0; o; ) r = (f[--o] = f[o] + v[o] + r) / H2 | 0, f[o] %= H2;
      for (r && (f.unshift(r), ++i), a = f.length; f[--a] == 0; ) f.pop();
      return e.d = f, e.e = i, $3 ? N(e, A) : e;
    }
    __name(ti, "ti");
    function de(t, e, r) {
      if (t !== ~~t || t < e || t > r) throw Error(_e + t);
    }
    __name(de, "de");
    function me(t) {
      var e, r, n, i = t.length - 1, o = "", s2 = t[0];
      if (i > 0) {
        for (o += s2, e = 1; e < i; e++) n = t[e] + "", r = B - n.length, r && (o += Ae(r)), o += n;
        s2 = t[e], n = s2 + "", r = B - n.length, r && (o += Ae(r));
      } else if (s2 === 0) return "0";
      for (; s2 % 10 === 0; ) s2 /= 10;
      return o + s2;
    }
    __name(me, "me");
    function ri(t, e) {
      var r, n, i, o, s2, a, f = 0, v = 0, R = t.constructor, A = R.precision;
      if (W2(t) > 16) throw Error(Yr + W2(t));
      if (!t.s) return new R(oe);
      for (e == null ? ($3 = false, a = A) : a = e, s2 = new R(0.03125); t.abs().gte(0.1); ) t = t.times(s2), v += 5;
      for (n = Math.log(ke(2, v)) / Math.LN10 * 2 + 5 | 0, a += n, r = i = o = new R(oe), R.precision = a; ; ) {
        if (i = N(i.times(t), a), r = r.times(++f), s2 = o.plus(we(i, r, a)), me(s2.d).slice(0, a) === me(o.d).slice(0, a)) {
          for (; v--; ) o = N(o.times(o), a);
          return R.precision = A, e == null ? ($3 = true, N(o, A)) : o;
        }
        o = s2;
      }
    }
    __name(ri, "ri");
    function W2(t) {
      for (var e = t.e * B, r = t.d[0]; r >= 10; r /= 10) e++;
      return e;
    }
    __name(W2, "W");
    function zr(t, e, r) {
      if (e > t.LN10.sd()) throw $3 = true, r && (t.precision = r), Error(le + "LN10 precision limit exceeded");
      return N(new t(t.LN10), e);
    }
    __name(zr, "zr");
    function Ae(t) {
      for (var e = ""; t--; ) e += "0";
      return e;
    }
    __name(Ae, "Ae");
    function Et(t, e) {
      var r, n, i, o, s2, a, f, v, R, A = 1, I2 = 10, C = t, L2 = C.d, D2 = C.constructor, k = D2.precision;
      if (C.s < 1) throw Error(le + (C.s ? "NaN" : "-Infinity"));
      if (C.eq(oe)) return new D2(0);
      if (e == null ? ($3 = false, v = k) : v = e, C.eq(10)) return e == null && ($3 = true), zr(D2, v);
      if (v += I2, D2.precision = v, r = me(L2), n = r.charAt(0), o = W2(C), Math.abs(o) < 15e14) {
        for (; n < 7 && n != 1 || n == 1 && r.charAt(1) > 3; ) C = C.times(t), r = me(C.d), n = r.charAt(0), A++;
        o = W2(C), n > 1 ? (C = new D2("0." + r), o++) : C = new D2(n + "." + r.slice(1));
      } else return f = zr(D2, v + 2, k).times(o + ""), C = Et(new D2(n + "." + r.slice(1)), v - I2).plus(f), D2.precision = k, e == null ? ($3 = true, N(C, k)) : C;
      for (a = s2 = C = we(C.minus(oe), C.plus(oe), v), R = N(C.times(C), v), i = 3; ; ) {
        if (s2 = N(s2.times(R), v), f = a.plus(we(s2, new D2(i), v)), me(f.d).slice(0, v) === me(a.d).slice(0, v)) return a = a.times(2), o !== 0 && (a = a.plus(zr(D2, v + 2, k).times(o + ""))), a = we(a, new D2(A), v), D2.precision = k, e == null ? ($3 = true, N(a, k)) : a;
        a = f, i += 2;
      }
    }
    __name(Et, "Et");
    function Xn(t, e) {
      var r, n, i;
      for ((r = e.indexOf(".")) > -1 && (e = e.replace(".", "")), (n = e.search(/e/i)) > 0 ? (r < 0 && (r = n), r += +e.slice(n + 1), e = e.substring(0, n)) : r < 0 && (r = e.length), n = 0; e.charCodeAt(n) === 48; ) ++n;
      for (i = e.length; e.charCodeAt(i - 1) === 48; ) --i;
      if (e = e.slice(n, i), e) {
        if (i -= n, r = r - n - 1, t.e = Qe(r / B), t.d = [], n = (r + 1) % B, r < 0 && (n += B), n < i) {
          for (n && t.d.push(+e.slice(0, n)), i -= B; n < i; ) t.d.push(+e.slice(n, n += B));
          e = e.slice(n), n = B - e.length;
        } else n -= i;
        for (; n--; ) e += "0";
        if (t.d.push(+e), $3 && (t.e > or || t.e < -or)) throw Error(Yr + r);
      } else t.s = 0, t.e = 0, t.d = [0];
      return t;
    }
    __name(Xn, "Xn");
    function N(t, e, r) {
      var n, i, o, s2, a, f, v, R, A = t.d;
      for (s2 = 1, o = A[0]; o >= 10; o /= 10) s2++;
      if (n = e - s2, n < 0) n += B, i = e, v = A[R = 0];
      else {
        if (R = Math.ceil((n + 1) / B), o = A.length, R >= o) return t;
        for (v = o = A[R], s2 = 1; o >= 10; o /= 10) s2++;
        n %= B, i = n - B + s2;
      }
      if (r !== void 0 && (o = ke(10, s2 - i - 1), a = v / o % 10 | 0, f = e < 0 || A[R + 1] !== void 0 || v % o, f = r < 4 ? (a || f) && (r == 0 || r == (t.s < 0 ? 3 : 2)) : a > 5 || a == 5 && (r == 4 || f || r == 6 && (n > 0 ? i > 0 ? v / ke(10, s2 - i) : 0 : A[R - 1]) % 10 & 1 || r == (t.s < 0 ? 8 : 7))), e < 1 || !A[0]) return f ? (o = W2(t), A.length = 1, e = e - o - 1, A[0] = ke(10, (B - e % B) % B), t.e = Qe(-e / B) || 0) : (A.length = 1, A[0] = t.e = t.s = 0), t;
      if (n == 0 ? (A.length = R, o = 1, R--) : (A.length = R + 1, o = ke(10, B - n), A[R] = i > 0 ? (v / ke(10, s2 - i) % ke(10, i) | 0) * o : 0), f) for (; ; ) if (R == 0) {
        (A[0] += o) == H2 && (A[0] = 1, ++t.e);
        break;
      } else {
        if (A[R] += o, A[R] != H2) break;
        A[R--] = 0, o = 1;
      }
      for (n = A.length; A[--n] === 0; ) A.pop();
      if ($3 && (t.e > or || t.e < -or)) throw Error(Yr + W2(t));
      return t;
    }
    __name(N, "N");
    function ni(t, e) {
      var r, n, i, o, s2, a, f, v, R, A, I2 = t.constructor, C = I2.precision;
      if (!t.s || !e.s) return e.s ? e.s = -e.s : e = new I2(t), $3 ? N(e, C) : e;
      if (f = t.d, A = e.d, n = e.e, v = t.e, f = f.slice(), s2 = v - n, s2) {
        for (R = s2 < 0, R ? (r = f, s2 = -s2, a = A.length) : (r = A, n = v, a = f.length), i = Math.max(Math.ceil(C / B), a) + 2, s2 > i && (s2 = i, r.length = 1), r.reverse(), i = s2; i--; ) r.push(0);
        r.reverse();
      } else {
        for (i = f.length, a = A.length, R = i < a, R && (a = i), i = 0; i < a; i++) if (f[i] != A[i]) {
          R = f[i] < A[i];
          break;
        }
        s2 = 0;
      }
      for (R && (r = f, f = A, A = r, e.s = -e.s), a = f.length, i = A.length - a; i > 0; --i) f[a++] = 0;
      for (i = A.length; i > s2; ) {
        if (f[--i] < A[i]) {
          for (o = i; o && f[--o] === 0; ) f[o] = H2 - 1;
          --f[o], f[i] += H2;
        }
        f[i] -= A[i];
      }
      for (; f[--a] === 0; ) f.pop();
      for (; f[0] === 0; f.shift()) --n;
      return f[0] ? (e.d = f, e.e = n, $3 ? N(e, C) : e) : new I2(0);
    }
    __name(ni, "ni");
    function Me(t, e, r) {
      var n, i = W2(t), o = me(t.d), s2 = o.length;
      return e ? (r && (n = r - s2) > 0 ? o = o.charAt(0) + "." + o.slice(1) + Ae(n) : s2 > 1 && (o = o.charAt(0) + "." + o.slice(1)), o = o + (i < 0 ? "e" : "e+") + i) : i < 0 ? (o = "0." + Ae(-i - 1) + o, r && (n = r - s2) > 0 && (o += Ae(n))) : i >= s2 ? (o += Ae(i + 1 - s2), r && (n = r - i - 1) > 0 && (o = o + "." + Ae(n))) : ((n = i + 1) < s2 && (o = o.slice(0, n) + "." + o.slice(n)), r && (n = r - s2) > 0 && (i + 1 === s2 && (o += "."), o += Ae(n))), t.s < 0 ? "-" + o : o;
    }
    __name(Me, "Me");
    function Zn(t, e) {
      if (t.length > e) return t.length = e, true;
    }
    __name(Zn, "Zn");
    function ii(t) {
      var e, r, n;
      function i(o) {
        var s2 = this;
        if (!(s2 instanceof i)) return new i(o);
        if (s2.constructor = i, o instanceof i) {
          s2.s = o.s, s2.e = o.e, s2.d = (o = o.d) ? o.slice() : o;
          return;
        }
        if (typeof o == "number") {
          if (o * 0 !== 0) throw Error(_e + o);
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
          return Xn(s2, o.toString());
        } else if (typeof o != "string") throw Error(_e + o);
        if (o.charCodeAt(0) === 45 ? (o = o.slice(1), s2.s = -1) : s2.s = 1, ta.test(o)) Xn(s2, o);
        else throw Error(_e + o);
      }
      __name(i, "i");
      if (i.prototype = S, i.ROUND_UP = 0, i.ROUND_DOWN = 1, i.ROUND_CEIL = 2, i.ROUND_FLOOR = 3, i.ROUND_HALF_UP = 4, i.ROUND_HALF_DOWN = 5, i.ROUND_HALF_EVEN = 6, i.ROUND_HALF_CEIL = 7, i.ROUND_HALF_FLOOR = 8, i.clone = ii, i.config = i.set = ra, t === void 0 && (t = {}), t) for (n = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], e = 0; e < n.length; ) t.hasOwnProperty(r = n[e++]) || (t[r] = this[r]);
      return i.config(t), i;
    }
    __name(ii, "ii");
    function ra(t) {
      if (!t || typeof t != "object") throw Error(le + "Object expected");
      var e, r, n, i = ["precision", 1, je, "rounding", 0, 8, "toExpNeg", -1 / 0, 0, "toExpPos", 0, 1 / 0];
      for (e = 0; e < i.length; e += 3) if ((n = t[r = i[e]]) !== void 0) if (Qe(n) === n && n >= i[e + 1] && n <= i[e + 2]) this[r] = n;
      else throw Error(_e + r + ": " + n);
      if ((n = t[r = "LN10"]) !== void 0) if (n == Math.LN10) this[r] = new this(n);
      else throw Error(_e + r + ": " + n);
      return this;
    }
    __name(ra, "ra");
    var je;
    var ea;
    var Xr;
    var $3;
    var le;
    var _e;
    var Yr;
    var Qe;
    var ke;
    var ta;
    var oe;
    var H2;
    var B;
    var ei;
    var or;
    var S;
    var we;
    var Xr;
    var sr;
    var oi = ae(() => {
      "use strict";
      u();
      c();
      p();
      m();
      d();
      l();
      je = 1e9, ea = { precision: 20, rounding: 4, toExpNeg: -7, toExpPos: 21, LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286" }, $3 = true, le = "[DecimalError] ", _e = le + "Invalid argument: ", Yr = le + "Exponent out of range: ", Qe = Math.floor, ke = Math.pow, ta = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, H2 = 1e7, B = 7, ei = 9007199254740991, or = Qe(ei / B), S = {};
      S.absoluteValue = S.abs = function() {
        var t = new this.constructor(this);
        return t.s && (t.s = 1), t;
      };
      S.comparedTo = S.cmp = function(t) {
        var e, r, n, i, o = this;
        if (t = new o.constructor(t), o.s !== t.s) return o.s || -t.s;
        if (o.e !== t.e) return o.e > t.e ^ o.s < 0 ? 1 : -1;
        for (n = o.d.length, i = t.d.length, e = 0, r = n < i ? n : i; e < r; ++e) if (o.d[e] !== t.d[e]) return o.d[e] > t.d[e] ^ o.s < 0 ? 1 : -1;
        return n === i ? 0 : n > i ^ o.s < 0 ? 1 : -1;
      };
      S.decimalPlaces = S.dp = function() {
        var t = this, e = t.d.length - 1, r = (e - t.e) * B;
        if (e = t.d[e], e) for (; e % 10 == 0; e /= 10) r--;
        return r < 0 ? 0 : r;
      };
      S.dividedBy = S.div = function(t) {
        return we(this, new this.constructor(t));
      };
      S.dividedToIntegerBy = S.idiv = function(t) {
        var e = this, r = e.constructor;
        return N(we(e, new r(t), 0, 1), r.precision);
      };
      S.equals = S.eq = function(t) {
        return !this.cmp(t);
      };
      S.exponent = function() {
        return W2(this);
      };
      S.greaterThan = S.gt = function(t) {
        return this.cmp(t) > 0;
      };
      S.greaterThanOrEqualTo = S.gte = function(t) {
        return this.cmp(t) >= 0;
      };
      S.isInteger = S.isint = function() {
        return this.e > this.d.length - 2;
      };
      S.isNegative = S.isneg = function() {
        return this.s < 0;
      };
      S.isPositive = S.ispos = function() {
        return this.s > 0;
      };
      S.isZero = function() {
        return this.s === 0;
      };
      S.lessThan = S.lt = function(t) {
        return this.cmp(t) < 0;
      };
      S.lessThanOrEqualTo = S.lte = function(t) {
        return this.cmp(t) < 1;
      };
      S.logarithm = S.log = function(t) {
        var e, r = this, n = r.constructor, i = n.precision, o = i + 5;
        if (t === void 0) t = new n(10);
        else if (t = new n(t), t.s < 1 || t.eq(oe)) throw Error(le + "NaN");
        if (r.s < 1) throw Error(le + (r.s ? "NaN" : "-Infinity"));
        return r.eq(oe) ? new n(0) : ($3 = false, e = we(Et(r, o), Et(t, o), o), $3 = true, N(e, i));
      };
      S.minus = S.sub = function(t) {
        var e = this;
        return t = new e.constructor(t), e.s == t.s ? ni(e, t) : ti(e, (t.s = -t.s, t));
      };
      S.modulo = S.mod = function(t) {
        var e, r = this, n = r.constructor, i = n.precision;
        if (t = new n(t), !t.s) throw Error(le + "NaN");
        return r.s ? ($3 = false, e = we(r, t, 0, 1).times(t), $3 = true, r.minus(e)) : N(new n(r), i);
      };
      S.naturalExponential = S.exp = function() {
        return ri(this);
      };
      S.naturalLogarithm = S.ln = function() {
        return Et(this);
      };
      S.negated = S.neg = function() {
        var t = new this.constructor(this);
        return t.s = -t.s || 0, t;
      };
      S.plus = S.add = function(t) {
        var e = this;
        return t = new e.constructor(t), e.s == t.s ? ti(e, t) : ni(e, (t.s = -t.s, t));
      };
      S.precision = S.sd = function(t) {
        var e, r, n, i = this;
        if (t !== void 0 && t !== !!t && t !== 1 && t !== 0) throw Error(_e + t);
        if (e = W2(i) + 1, n = i.d.length - 1, r = n * B + 1, n = i.d[n], n) {
          for (; n % 10 == 0; n /= 10) r--;
          for (n = i.d[0]; n >= 10; n /= 10) r++;
        }
        return t && e > r ? e : r;
      };
      S.squareRoot = S.sqrt = function() {
        var t, e, r, n, i, o, s2, a = this, f = a.constructor;
        if (a.s < 1) {
          if (!a.s) return new f(0);
          throw Error(le + "NaN");
        }
        for (t = W2(a), $3 = false, i = Math.sqrt(+a), i == 0 || i == 1 / 0 ? (e = me(a.d), (e.length + t) % 2 == 0 && (e += "0"), i = Math.sqrt(e), t = Qe((t + 1) / 2) - (t < 0 || t % 2), i == 1 / 0 ? e = "5e" + t : (e = i.toExponential(), e = e.slice(0, e.indexOf("e") + 1) + t), n = new f(e)) : n = new f(i.toString()), r = f.precision, i = s2 = r + 3; ; ) if (o = n, n = o.plus(we(a, o, s2 + 2)).times(0.5), me(o.d).slice(0, s2) === (e = me(n.d)).slice(0, s2)) {
          if (e = e.slice(s2 - 3, s2 + 1), i == s2 && e == "4999") {
            if (N(o, r + 1, 0), o.times(o).eq(a)) {
              n = o;
              break;
            }
          } else if (e != "9999") break;
          s2 += 4;
        }
        return $3 = true, N(n, r);
      };
      S.times = S.mul = function(t) {
        var e, r, n, i, o, s2, a, f, v, R = this, A = R.constructor, I2 = R.d, C = (t = new A(t)).d;
        if (!R.s || !t.s) return new A(0);
        for (t.s *= R.s, r = R.e + t.e, f = I2.length, v = C.length, f < v && (o = I2, I2 = C, C = o, s2 = f, f = v, v = s2), o = [], s2 = f + v, n = s2; n--; ) o.push(0);
        for (n = v; --n >= 0; ) {
          for (e = 0, i = f + n; i > n; ) a = o[i] + C[n] * I2[i - n - 1] + e, o[i--] = a % H2 | 0, e = a / H2 | 0;
          o[i] = (o[i] + e) % H2 | 0;
        }
        for (; !o[--s2]; ) o.pop();
        return e ? ++r : o.shift(), t.d = o, t.e = r, $3 ? N(t, A.precision) : t;
      };
      S.toDecimalPlaces = S.todp = function(t, e) {
        var r = this, n = r.constructor;
        return r = new n(r), t === void 0 ? r : (de(t, 0, je), e === void 0 ? e = n.rounding : de(e, 0, 8), N(r, t + W2(r) + 1, e));
      };
      S.toExponential = function(t, e) {
        var r, n = this, i = n.constructor;
        return t === void 0 ? r = Me(n, true) : (de(t, 0, je), e === void 0 ? e = i.rounding : de(e, 0, 8), n = N(new i(n), t + 1, e), r = Me(n, true, t + 1)), r;
      };
      S.toFixed = function(t, e) {
        var r, n, i = this, o = i.constructor;
        return t === void 0 ? Me(i) : (de(t, 0, je), e === void 0 ? e = o.rounding : de(e, 0, 8), n = N(new o(i), t + W2(i) + 1, e), r = Me(n.abs(), false, t + W2(n) + 1), i.isneg() && !i.isZero() ? "-" + r : r);
      };
      S.toInteger = S.toint = function() {
        var t = this, e = t.constructor;
        return N(new e(t), W2(t) + 1, e.rounding);
      };
      S.toNumber = function() {
        return +this;
      };
      S.toPower = S.pow = function(t) {
        var e, r, n, i, o, s2, a = this, f = a.constructor, v = 12, R = +(t = new f(t));
        if (!t.s) return new f(oe);
        if (a = new f(a), !a.s) {
          if (t.s < 1) throw Error(le + "Infinity");
          return a;
        }
        if (a.eq(oe)) return a;
        if (n = f.precision, t.eq(oe)) return N(a, n);
        if (e = t.e, r = t.d.length - 1, s2 = e >= r, o = a.s, s2) {
          if ((r = R < 0 ? -R : R) <= ei) {
            for (i = new f(oe), e = Math.ceil(n / B + 4), $3 = false; r % 2 && (i = i.times(a), Zn(i.d, e)), r = Qe(r / 2), r !== 0; ) a = a.times(a), Zn(a.d, e);
            return $3 = true, t.s < 0 ? new f(oe).div(i) : N(i, n);
          }
        } else if (o < 0) throw Error(le + "NaN");
        return o = o < 0 && t.d[Math.max(e, r)] & 1 ? -1 : 1, a.s = 1, $3 = false, i = t.times(Et(a, n + v)), $3 = true, i = ri(i), i.s = o, i;
      };
      S.toPrecision = function(t, e) {
        var r, n, i = this, o = i.constructor;
        return t === void 0 ? (r = W2(i), n = Me(i, r <= o.toExpNeg || r >= o.toExpPos)) : (de(t, 1, je), e === void 0 ? e = o.rounding : de(e, 0, 8), i = N(new o(i), t, e), r = W2(i), n = Me(i, t <= r || r <= o.toExpNeg, t)), n;
      };
      S.toSignificantDigits = S.tosd = function(t, e) {
        var r = this, n = r.constructor;
        return t === void 0 ? (t = n.precision, e = n.rounding) : (de(t, 1, je), e === void 0 ? e = n.rounding : de(e, 0, 8)), N(new n(r), t, e);
      };
      S.toString = S.valueOf = S.val = S.toJSON = S[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = function() {
        var t = this, e = W2(t), r = t.constructor;
        return Me(t, e <= r.toExpNeg || e >= r.toExpPos);
      };
      we = /* @__PURE__ */ (function() {
        function t(n, i) {
          var o, s2 = 0, a = n.length;
          for (n = n.slice(); a--; ) o = n[a] * i + s2, n[a] = o % H2 | 0, s2 = o / H2 | 0;
          return s2 && n.unshift(s2), n;
        }
        __name(t, "t");
        function e(n, i, o, s2) {
          var a, f;
          if (o != s2) f = o > s2 ? 1 : -1;
          else for (a = f = 0; a < o; a++) if (n[a] != i[a]) {
            f = n[a] > i[a] ? 1 : -1;
            break;
          }
          return f;
        }
        __name(e, "e");
        function r(n, i, o) {
          for (var s2 = 0; o--; ) n[o] -= s2, s2 = n[o] < i[o] ? 1 : 0, n[o] = s2 * H2 + n[o] - i[o];
          for (; !n[0] && n.length > 1; ) n.shift();
        }
        __name(r, "r");
        return function(n, i, o, s2) {
          var a, f, v, R, A, I2, C, L2, D2, k, Ee, ee, U2, te, Oe, Wr, ue, tr, rr = n.constructor, qs = n.s == i.s ? 1 : -1, pe = n.d, G = i.d;
          if (!n.s) return new rr(n);
          if (!i.s) throw Error(le + "Division by zero");
          for (f = n.e - i.e, ue = G.length, Oe = pe.length, C = new rr(qs), L2 = C.d = [], v = 0; G[v] == (pe[v] || 0); ) ++v;
          if (G[v] > (pe[v] || 0) && --f, o == null ? ee = o = rr.precision : s2 ? ee = o + (W2(n) - W2(i)) + 1 : ee = o, ee < 0) return new rr(0);
          if (ee = ee / B + 2 | 0, v = 0, ue == 1) for (R = 0, G = G[0], ee++; (v < Oe || R) && ee--; v++) U2 = R * H2 + (pe[v] || 0), L2[v] = U2 / G | 0, R = U2 % G | 0;
          else {
            for (R = H2 / (G[0] + 1) | 0, R > 1 && (G = t(G, R), pe = t(pe, R), ue = G.length, Oe = pe.length), te = ue, D2 = pe.slice(0, ue), k = D2.length; k < ue; ) D2[k++] = 0;
            tr = G.slice(), tr.unshift(0), Wr = G[0], G[1] >= H2 / 2 && ++Wr;
            do
              R = 0, a = e(G, D2, ue, k), a < 0 ? (Ee = D2[0], ue != k && (Ee = Ee * H2 + (D2[1] || 0)), R = Ee / Wr | 0, R > 1 ? (R >= H2 && (R = H2 - 1), A = t(G, R), I2 = A.length, k = D2.length, a = e(A, D2, I2, k), a == 1 && (R--, r(A, ue < I2 ? tr : G, I2))) : (R == 0 && (a = R = 1), A = G.slice()), I2 = A.length, I2 < k && A.unshift(0), r(D2, A, k), a == -1 && (k = D2.length, a = e(G, D2, ue, k), a < 1 && (R++, r(D2, ue < k ? tr : G, k))), k = D2.length) : a === 0 && (R++, D2 = [0]), L2[v++] = R, a && D2[0] ? D2[k++] = pe[te] || 0 : (D2 = [pe[te]], k = 1);
            while ((te++ < Oe || D2[0] !== void 0) && ee--);
          }
          return L2[0] || L2.shift(), C.e = f, N(C, s2 ? o + W2(C) + 1 : o);
        };
      })();
      Xr = ii(ea);
      oe = new Xr(1);
      sr = Xr;
    });
    var P2;
    var xe;
    var l = ae(() => {
      "use strict";
      oi();
      P2 = class extends sr {
        static {
          __name(this, "P");
        }
        static isDecimal(e) {
          return e instanceof sr;
        }
        static random(e = 20) {
          {
            let n = globalThis.crypto.getRandomValues(new Uint8Array(e)).reduce((i, o) => i + o, "");
            return new sr(`0.${n.slice(0, e)}`);
          }
        }
      }, xe = P2;
    });
    function la() {
      return false;
    }
    __name(la, "la");
    function nn() {
      return { dev: 0, ino: 0, mode: 0, nlink: 0, uid: 0, gid: 0, rdev: 0, size: 0, blksize: 0, blocks: 0, atimeMs: 0, mtimeMs: 0, ctimeMs: 0, birthtimeMs: 0, atime: /* @__PURE__ */ new Date(), mtime: /* @__PURE__ */ new Date(), ctime: /* @__PURE__ */ new Date(), birthtime: /* @__PURE__ */ new Date() };
    }
    __name(nn, "nn");
    function ua() {
      return nn();
    }
    __name(ua, "ua");
    function ca() {
      return [];
    }
    __name(ca, "ca");
    function pa(t) {
      t(null, []);
    }
    __name(pa, "pa");
    function ma() {
      return "";
    }
    __name(ma, "ma");
    function da() {
      return "";
    }
    __name(da, "da");
    function fa() {
    }
    __name(fa, "fa");
    function ga() {
    }
    __name(ga, "ga");
    function ya() {
    }
    __name(ya, "ya");
    function ha() {
    }
    __name(ha, "ha");
    function ba() {
    }
    __name(ba, "ba");
    function Ea() {
    }
    __name(Ea, "Ea");
    function wa() {
    }
    __name(wa, "wa");
    function xa() {
    }
    __name(xa, "xa");
    function Pa() {
      return { close: /* @__PURE__ */ __name(() => {
      }, "close"), on: /* @__PURE__ */ __name(() => {
      }, "on"), removeAllListeners: /* @__PURE__ */ __name(() => {
      }, "removeAllListeners") };
    }
    __name(Pa, "Pa");
    function Ta(t, e) {
      e(null, nn());
    }
    __name(Ta, "Ta");
    var va;
    var Ra;
    var Pi;
    var Ti = ae(() => {
      "use strict";
      u();
      c();
      p();
      m();
      d();
      l();
      va = {}, Ra = { existsSync: la, lstatSync: nn, stat: Ta, statSync: ua, readdirSync: ca, readdir: pa, readlinkSync: ma, realpathSync: da, chmodSync: fa, renameSync: ga, mkdirSync: ya, rmdirSync: ha, rmSync: ba, unlinkSync: Ea, watchFile: wa, unwatchFile: xa, watch: Pa, promises: va }, Pi = Ra;
    });
    var vi = yt((Yp, Aa) => {
      Aa.exports = { name: "@prisma/internals", version: "6.19.3", description: "This package is intended for Prisma's internal use", main: "dist/index.js", types: "dist/index.d.ts", repository: { type: "git", url: "https://github.com/prisma/prisma.git", directory: "packages/internals" }, homepage: "https://www.prisma.io", author: "Tim Suchanek <suchanek@prisma.io>", bugs: "https://github.com/prisma/prisma/issues", license: "Apache-2.0", scripts: { dev: "DEV=true tsx helpers/build.ts", build: "tsx helpers/build.ts", test: "dotenv -e ../../.db.env -- jest --silent", prepublishOnly: "pnpm run build" }, files: ["README.md", "dist", "!**/libquery_engine*", "!dist/get-generators/engines/*", "scripts"], devDependencies: { "@babel/helper-validator-identifier": "7.25.9", "@opentelemetry/api": "1.9.0", "@swc/core": "1.11.5", "@swc/jest": "0.2.37", "@types/babel__helper-validator-identifier": "7.15.2", "@types/jest": "29.5.14", "@types/node": "18.19.76", "@types/resolve": "1.20.6", archiver: "6.0.2", "checkpoint-client": "1.1.33", "cli-truncate": "4.0.0", dotenv: "16.5.0", empathic: "2.0.0", "escape-string-regexp": "5.0.0", execa: "8.0.1", "fast-glob": "3.3.3", "find-up": "7.0.0", "fp-ts": "2.16.9", "fs-extra": "11.3.0", "global-directory": "4.0.0", globby: "11.1.0", "identifier-regex": "1.0.0", "indent-string": "4.0.0", "is-windows": "1.0.2", "is-wsl": "3.1.0", jest: "29.7.0", "jest-junit": "16.0.0", kleur: "4.1.5", "mock-stdin": "1.0.0", "new-github-issue-url": "0.2.1", "node-fetch": "3.3.2", "npm-packlist": "5.1.3", open: "7.4.2", "p-map": "4.0.0", resolve: "1.22.10", "string-width": "7.2.0", "strip-indent": "4.0.0", "temp-dir": "2.0.0", tempy: "1.0.1", "terminal-link": "4.0.0", tmp: "0.2.3", "ts-pattern": "5.6.2", "ts-toolbelt": "9.6.0", typescript: "5.4.5", yarn: "1.22.22" }, dependencies: { "@prisma/config": "workspace:*", "@prisma/debug": "workspace:*", "@prisma/dmmf": "workspace:*", "@prisma/driver-adapter-utils": "workspace:*", "@prisma/engines": "workspace:*", "@prisma/fetch-engine": "workspace:*", "@prisma/generator": "workspace:*", "@prisma/generator-helper": "workspace:*", "@prisma/get-platform": "workspace:*", "@prisma/prisma-schema-wasm": "7.1.1-3.c2990dca591cba766e3b7ef5d9e8a84796e47ab7", "@prisma/schema-engine-wasm": "7.1.1-3.c2990dca591cba766e3b7ef5d9e8a84796e47ab7", "@prisma/schema-files-loader": "workspace:*", arg: "5.0.2", prompts: "2.4.2" }, peerDependencies: { typescript: ">=5.1.0" }, peerDependenciesMeta: { typescript: { optional: true } }, sideEffects: false };
    });
    function Sa(...t) {
      return t.join("/");
    }
    __name(Sa, "Sa");
    function Ia(...t) {
      return t.join("/");
    }
    __name(Ia, "Ia");
    function Da(t) {
      let e = Ri(t), r = Ai(t), [n, i] = e.split(".");
      return { root: "/", dir: r, base: e, ext: i, name: n };
    }
    __name(Da, "Da");
    function Ri(t) {
      let e = t.split("/");
      return e[e.length - 1];
    }
    __name(Ri, "Ri");
    function Ai(t) {
      return t.split("/").slice(0, -1).join("/");
    }
    __name(Ai, "Ai");
    function ka(t) {
      let e = t.split("/").filter((i) => i !== "" && i !== "."), r = [];
      for (let i of e) i === ".." ? r.pop() : r.push(i);
      let n = r.join("/");
      return t.startsWith("/") ? "/" + n : n;
    }
    __name(ka, "ka");
    var Ci;
    var Oa;
    var _a;
    var Ma;
    var cr;
    var Si = ae(() => {
      "use strict";
      u();
      c();
      p();
      m();
      d();
      l();
      Ci = "/", Oa = ":";
      _a = { sep: Ci }, Ma = { basename: Ri, delimiter: Oa, dirname: Ai, join: Ia, normalize: ka, parse: Da, posix: _a, resolve: Sa, sep: Ci }, cr = Ma;
    });
    var un = yt((ud, qa) => {
      qa.exports = { name: "@prisma/engines-version", version: "7.1.1-3.c2990dca591cba766e3b7ef5d9e8a84796e47ab7", main: "index.js", types: "index.d.ts", license: "Apache-2.0", author: "Tim Suchanek <suchanek@prisma.io>", prisma: { enginesVersion: "c2990dca591cba766e3b7ef5d9e8a84796e47ab7" }, repository: { type: "git", url: "https://github.com/prisma/engines-wrapper.git", directory: "packages/engines-version" }, devDependencies: { "@types/node": "18.19.76", typescript: "4.9.5" }, files: ["index.js", "index.d.ts"], scripts: { build: "tsc -d" } };
    });
    var Di = yt((dr) => {
      "use strict";
      u();
      c();
      p();
      m();
      d();
      l();
      Object.defineProperty(dr, "__esModule", { value: true });
      dr.enginesVersion = void 0;
      dr.enginesVersion = un().prisma.enginesVersion;
    });
    var _i = yt((vd, ki) => {
      "use strict";
      u();
      c();
      p();
      m();
      d();
      l();
      ki.exports = (t, e = 1, r) => {
        if (r = { indent: " ", includeEmptyLines: false, ...r }, typeof t != "string") throw new TypeError(`Expected \`input\` to be a \`string\`, got \`${typeof t}\``);
        if (typeof e != "number") throw new TypeError(`Expected \`count\` to be a \`number\`, got \`${typeof e}\``);
        if (typeof r.indent != "string") throw new TypeError(`Expected \`options.indent\` to be a \`string\`, got \`${typeof r.indent}\``);
        if (e === 0) return t;
        let n = r.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
        return t.replace(n, r.indent.repeat(e));
      };
    });
    var hn = yt((eb, qi) => {
      "use strict";
      u();
      c();
      p();
      m();
      d();
      l();
      qi.exports = /* @__PURE__ */ (function() {
        function t(e, r, n, i, o) {
          return e < r || n < r ? e > n ? n + 1 : e + 1 : i === o ? r : r + 1;
        }
        __name(t, "t");
        return function(e, r) {
          if (e === r) return 0;
          if (e.length > r.length) {
            var n = e;
            e = r, r = n;
          }
          for (var i = e.length, o = r.length; i > 0 && e.charCodeAt(i - 1) === r.charCodeAt(o - 1); ) i--, o--;
          for (var s2 = 0; s2 < i && e.charCodeAt(s2) === r.charCodeAt(s2); ) s2++;
          if (i -= s2, o -= s2, i === 0 || o < 3) return o;
          var a = 0, f, v, R, A, I2, C, L2, D2, k, Ee, ee, U2, te = [];
          for (f = 0; f < i; f++) te.push(f + 1), te.push(e.charCodeAt(s2 + f));
          for (var Oe = te.length - 1; a < o - 3; ) for (k = r.charCodeAt(s2 + (v = a)), Ee = r.charCodeAt(s2 + (R = a + 1)), ee = r.charCodeAt(s2 + (A = a + 2)), U2 = r.charCodeAt(s2 + (I2 = a + 3)), C = a += 4, f = 0; f < Oe; f += 2) L2 = te[f], D2 = te[f + 1], v = t(L2, v, R, k, D2), R = t(v, R, A, Ee, D2), A = t(R, A, I2, ee, D2), C = t(A, I2, C, U2, D2), te[f] = C, I2 = A, A = R, R = v, v = L2;
          for (; a < o; ) for (k = r.charCodeAt(s2 + (v = a)), C = ++a, f = 0; f < Oe; f += 2) L2 = te[f], te[f] = C = t(L2, v, C, k, te[f + 1]), v = L2;
          return C;
        };
      })();
    });
    var Qi = ae(() => {
      "use strict";
      u();
      c();
      p();
      m();
      d();
      l();
    });
    var Gi = ae(() => {
      "use strict";
      u();
      c();
      p();
      m();
      d();
      l();
    });
    var Fr;
    var yo = ae(() => {
      "use strict";
      u();
      c();
      p();
      m();
      d();
      l();
      Fr = class {
        static {
          __name(this, "Fr");
        }
        events = {};
        on(e, r) {
          return this.events[e] || (this.events[e] = []), this.events[e].push(r), this;
        }
        emit(e, ...r) {
          return this.events[e] ? (this.events[e].forEach((n) => {
            n(...r);
          }), true) : false;
        }
      };
    });
    var zu = {};
    ht(zu, { DMMF: /* @__PURE__ */ __name(() => At, "DMMF"), Debug: /* @__PURE__ */ __name(() => j, "Debug"), Decimal: /* @__PURE__ */ __name(() => xe, "Decimal"), Extensions: /* @__PURE__ */ __name(() => Zr, "Extensions"), MetricsClient: /* @__PURE__ */ __name(() => nt, "MetricsClient"), PrismaClientInitializationError: /* @__PURE__ */ __name(() => M, "PrismaClientInitializationError"), PrismaClientKnownRequestError: /* @__PURE__ */ __name(() => X, "PrismaClientKnownRequestError"), PrismaClientRustPanicError: /* @__PURE__ */ __name(() => Te, "PrismaClientRustPanicError"), PrismaClientUnknownRequestError: /* @__PURE__ */ __name(() => Q, "PrismaClientUnknownRequestError"), PrismaClientValidationError: /* @__PURE__ */ __name(() => Y, "PrismaClientValidationError"), Public: /* @__PURE__ */ __name(() => en, "Public"), Sql: /* @__PURE__ */ __name(() => ne, "Sql"), createParam: /* @__PURE__ */ __name(() => ao, "createParam"), defineDmmfProperty: /* @__PURE__ */ __name(() => fo, "defineDmmfProperty"), deserializeJsonResponse: /* @__PURE__ */ __name(() => lt, "deserializeJsonResponse"), deserializeRawResult: /* @__PURE__ */ __name(() => Gr, "deserializeRawResult"), dmmfToRuntimeDataModel: /* @__PURE__ */ __name(() => Ui, "dmmfToRuntimeDataModel"), empty: /* @__PURE__ */ __name(() => bo, "empty"), getPrismaClient: /* @__PURE__ */ __name(() => Fs, "getPrismaClient"), getRuntime: /* @__PURE__ */ __name(() => ut, "getRuntime"), join: /* @__PURE__ */ __name(() => ho, "join"), makeStrictEnum: /* @__PURE__ */ __name(() => Ns, "makeStrictEnum"), makeTypedQueryFactory: /* @__PURE__ */ __name(() => go, "makeTypedQueryFactory"), objectEnumValues: /* @__PURE__ */ __name(() => Ar, "objectEnumValues"), raw: /* @__PURE__ */ __name(() => An, "raw"), serializeJsonQuery: /* @__PURE__ */ __name(() => _r, "serializeJsonQuery"), skip: /* @__PURE__ */ __name(() => kr, "skip"), sqltag: /* @__PURE__ */ __name(() => Cn, "sqltag"), warnEnvConflicts: /* @__PURE__ */ __name(() => void 0, "warnEnvConflicts"), warnOnce: /* @__PURE__ */ __name(() => Tt, "warnOnce") });
    module.exports = Gs(zu);
    u();
    c();
    p();
    m();
    d();
    l();
    var Zr = {};
    ht(Zr, { defineExtension: /* @__PURE__ */ __name(() => si, "defineExtension"), getExtensionContext: /* @__PURE__ */ __name(() => ai, "getExtensionContext") });
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    function si(t) {
      return typeof t == "function" ? t : (e) => e.$extends(t);
    }
    __name(si, "si");
    u();
    c();
    p();
    m();
    d();
    l();
    function ai(t) {
      return t;
    }
    __name(ai, "ai");
    var en = {};
    ht(en, { validator: /* @__PURE__ */ __name(() => li, "validator") });
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    function li(...t) {
      return (e) => e;
    }
    __name(li, "li");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    var tn;
    var ui;
    var ci;
    var pi;
    var mi = true;
    typeof g < "u" && ({ FORCE_COLOR: tn, NODE_DISABLE_COLORS: ui, NO_COLOR: ci, TERM: pi } = g.env || {}, mi = g.stdout && g.stdout.isTTY);
    var na = { enabled: !ui && ci == null && pi !== "dumb" && (tn != null && tn !== "0" || mi) };
    function q(t, e) {
      let r = new RegExp(`\\x1b\\[${e}m`, "g"), n = `\x1B[${t}m`, i = `\x1B[${e}m`;
      return function(o) {
        return !na.enabled || o == null ? o : n + (~("" + o).indexOf(i) ? o.replace(r, i + n) : o) + i;
      };
    }
    __name(q, "q");
    var Kc = q(0, 0);
    var ar = q(1, 22);
    var lr = q(2, 22);
    var Hc = q(3, 23);
    var di = q(4, 24);
    var zc = q(7, 27);
    var Yc = q(8, 28);
    var Xc = q(9, 29);
    var Zc = q(30, 39);
    var Ge = q(31, 39);
    var fi = q(32, 39);
    var gi = q(33, 39);
    var yi = q(34, 39);
    var ep = q(35, 39);
    var hi = q(36, 39);
    var tp = q(37, 39);
    var bi = q(90, 39);
    var rp = q(90, 39);
    var np = q(40, 49);
    var ip = q(41, 49);
    var op = q(42, 49);
    var sp = q(43, 49);
    var ap = q(44, 49);
    var lp = q(45, 49);
    var up = q(46, 49);
    var cp = q(47, 49);
    u();
    c();
    p();
    m();
    d();
    l();
    var ia = 100;
    var Ei = ["green", "yellow", "blue", "magenta", "cyan", "red"];
    var ur = [];
    var wi = Date.now();
    var oa = 0;
    var rn = typeof g < "u" ? g.env : {};
    globalThis.DEBUG ??= rn.DEBUG ?? "";
    globalThis.DEBUG_COLORS ??= rn.DEBUG_COLORS ? rn.DEBUG_COLORS === "true" : true;
    var wt = { enable(t) {
      typeof t == "string" && (globalThis.DEBUG = t);
    }, disable() {
      let t = globalThis.DEBUG;
      return globalThis.DEBUG = "", t;
    }, enabled(t) {
      let e = globalThis.DEBUG.split(",").map((i) => i.replace(/[.+?^${}()|[\]\\]/g, "\\$&")), r = e.some((i) => i === "" || i[0] === "-" ? false : t.match(RegExp(i.split("*").join(".*") + "$"))), n = e.some((i) => i === "" || i[0] !== "-" ? false : t.match(RegExp(i.slice(1).split("*").join(".*") + "$")));
      return r && !n;
    }, log: /* @__PURE__ */ __name((...t) => {
      let [e, r, ...n] = t;
      (console.warn ?? console.log)(`${e} ${r}`, ...n);
    }, "log"), formatters: {} };
    function sa(t) {
      let e = { color: Ei[oa++ % Ei.length], enabled: wt.enabled(t), namespace: t, log: wt.log, extend: /* @__PURE__ */ __name(() => {
      }, "extend") }, r = /* @__PURE__ */ __name((...n) => {
        let { enabled: i, namespace: o, color: s2, log: a } = e;
        if (n.length !== 0 && ur.push([o, ...n]), ur.length > ia && ur.shift(), wt.enabled(o) || i) {
          let f = n.map((R) => typeof R == "string" ? R : aa(R)), v = `+${Date.now() - wi}ms`;
          wi = Date.now(), a(o, ...f, v);
        }
      }, "r");
      return new Proxy(r, { get: /* @__PURE__ */ __name((n, i) => e[i], "get"), set: /* @__PURE__ */ __name((n, i, o) => e[i] = o, "set") });
    }
    __name(sa, "sa");
    var j = new Proxy(sa, { get: /* @__PURE__ */ __name((t, e) => wt[e], "get"), set: /* @__PURE__ */ __name((t, e, r) => wt[e] = r, "set") });
    function aa(t, e = 2) {
      let r = /* @__PURE__ */ new Set();
      return JSON.stringify(t, (n, i) => {
        if (typeof i == "object" && i !== null) {
          if (r.has(i)) return "[Circular *]";
          r.add(i);
        } else if (typeof i == "bigint") return i.toString();
        return i;
      }, e);
    }
    __name(aa, "aa");
    function xi() {
      ur.length = 0;
    }
    __name(xi, "xi");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    var on = ["darwin", "darwin-arm64", "debian-openssl-1.0.x", "debian-openssl-1.1.x", "debian-openssl-3.0.x", "rhel-openssl-1.0.x", "rhel-openssl-1.1.x", "rhel-openssl-3.0.x", "linux-arm64-openssl-1.1.x", "linux-arm64-openssl-1.0.x", "linux-arm64-openssl-3.0.x", "linux-arm-openssl-1.1.x", "linux-arm-openssl-1.0.x", "linux-arm-openssl-3.0.x", "linux-musl", "linux-musl-openssl-3.0.x", "linux-musl-arm64-openssl-1.1.x", "linux-musl-arm64-openssl-3.0.x", "linux-nixos", "linux-static-x64", "linux-static-arm64", "windows", "freebsd11", "freebsd12", "freebsd13", "freebsd14", "freebsd15", "openbsd", "netbsd", "arm"];
    u();
    c();
    p();
    m();
    d();
    l();
    var Ca = vi();
    var sn = Ca.version;
    u();
    c();
    p();
    m();
    d();
    l();
    function Je(t) {
      let e = La();
      return e || (t?.config.engineType === "library" ? "library" : t?.config.engineType === "binary" ? "binary" : t?.config.engineType === "client" ? "client" : Fa());
    }
    __name(Je, "Je");
    function La() {
      let t = g.env.PRISMA_CLIENT_ENGINE_TYPE;
      return t === "library" ? "library" : t === "binary" ? "binary" : t === "client" ? "client" : void 0;
    }
    __name(La, "La");
    function Fa() {
      return "library";
    }
    __name(Fa, "Fa");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    function an(t) {
      return t.name === "DriverAdapterError" && typeof t.cause == "object";
    }
    __name(an, "an");
    u();
    c();
    p();
    m();
    d();
    l();
    function pr(t) {
      return { ok: true, value: t, map(e) {
        return pr(e(t));
      }, flatMap(e) {
        return e(t);
      } };
    }
    __name(pr, "pr");
    function Le(t) {
      return { ok: false, error: t, map() {
        return Le(t);
      }, flatMap() {
        return Le(t);
      } };
    }
    __name(Le, "Le");
    var Ii = j("driver-adapter-utils");
    var ln = class {
      static {
        __name(this, "ln");
      }
      registeredErrors = [];
      consumeError(e) {
        return this.registeredErrors[e];
      }
      registerNewError(e) {
        let r = 0;
        for (; this.registeredErrors[r] !== void 0; ) r++;
        return this.registeredErrors[r] = { error: e }, r;
      }
    };
    var mr = /* @__PURE__ */ __name((t, e = new ln()) => {
      let r = { adapterName: t.adapterName, errorRegistry: e, queryRaw: Pe(e, t.queryRaw.bind(t)), executeRaw: Pe(e, t.executeRaw.bind(t)), executeScript: Pe(e, t.executeScript.bind(t)), dispose: Pe(e, t.dispose.bind(t)), provider: t.provider, startTransaction: /* @__PURE__ */ __name(async (...n) => (await Pe(e, t.startTransaction.bind(t))(...n)).map((o) => Na(e, o)), "startTransaction") };
      return t.getConnectionInfo && (r.getConnectionInfo = Ua(e, t.getConnectionInfo.bind(t))), r;
    }, "mr");
    var Na = /* @__PURE__ */ __name((t, e) => ({ adapterName: e.adapterName, provider: e.provider, options: e.options, queryRaw: Pe(t, e.queryRaw.bind(e)), executeRaw: Pe(t, e.executeRaw.bind(e)), commit: Pe(t, e.commit.bind(e)), rollback: Pe(t, e.rollback.bind(e)) }), "Na");
    function Pe(t, e) {
      return async (...r) => {
        try {
          return pr(await e(...r));
        } catch (n) {
          if (Ii("[error@wrapAsync]", n), an(n)) return Le(n.cause);
          let i = t.registerNewError(n);
          return Le({ kind: "GenericJs", id: i });
        }
      };
    }
    __name(Pe, "Pe");
    function Ua(t, e) {
      return (...r) => {
        try {
          return pr(e(...r));
        } catch (n) {
          if (Ii("[error@wrapSync]", n), an(n)) return Le(n.cause);
          let i = t.registerNewError(n);
          return Le({ kind: "GenericJs", id: i });
        }
      };
    }
    __name(Ua, "Ua");
    u();
    c();
    p();
    m();
    d();
    l();
    var Oi = "prisma+postgres";
    var fr = `${Oi}:`;
    function gr(t) {
      return t?.toString().startsWith(`${fr}//`) ?? false;
    }
    __name(gr, "gr");
    function cn(t) {
      if (!gr(t)) return false;
      let { host: e } = new URL(t);
      return e.includes("localhost") || e.includes("127.0.0.1") || e.includes("[::1]");
    }
    __name(cn, "cn");
    var Pt = {};
    ht(Pt, { error: /* @__PURE__ */ __name(() => $a, "error"), info: /* @__PURE__ */ __name(() => Ba, "info"), log: /* @__PURE__ */ __name(() => Va, "log"), query: /* @__PURE__ */ __name(() => ja, "query"), should: /* @__PURE__ */ __name(() => Mi, "should"), tags: /* @__PURE__ */ __name(() => xt, "tags"), warn: /* @__PURE__ */ __name(() => pn, "warn") });
    u();
    c();
    p();
    m();
    d();
    l();
    var xt = { error: Ge("prisma:error"), warn: gi("prisma:warn"), info: hi("prisma:info"), query: yi("prisma:query") };
    var Mi = { warn: /* @__PURE__ */ __name(() => !g.env.PRISMA_DISABLE_WARNINGS, "warn") };
    function Va(...t) {
      console.log(...t);
    }
    __name(Va, "Va");
    function pn(t, ...e) {
      Mi.warn() && console.warn(`${xt.warn} ${t}`, ...e);
    }
    __name(pn, "pn");
    function Ba(t, ...e) {
      console.info(`${xt.info} ${t}`, ...e);
    }
    __name(Ba, "Ba");
    function $a(t, ...e) {
      console.error(`${xt.error} ${t}`, ...e);
    }
    __name($a, "$a");
    function ja(t, ...e) {
      console.log(`${xt.query} ${t}`, ...e);
    }
    __name(ja, "ja");
    u();
    c();
    p();
    m();
    d();
    l();
    function yr(t, e) {
      if (!t) throw new Error(`${e}. This should never happen. If you see this error, please, open an issue at https://pris.ly/prisma-prisma-bug-report`);
    }
    __name(yr, "yr");
    u();
    c();
    p();
    m();
    d();
    l();
    function Fe(t, e) {
      throw new Error(e);
    }
    __name(Fe, "Fe");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    function mn({ onlyFirst: t = false } = {}) {
      let r = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?(?:\\u0007|\\u001B\\u005C|\\u009C))", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"].join("|");
      return new RegExp(r, t ? void 0 : "g");
    }
    __name(mn, "mn");
    var Qa = mn();
    function dn(t) {
      if (typeof t != "string") throw new TypeError(`Expected a \`string\`, got \`${typeof t}\``);
      return t.replace(Qa, "");
    }
    __name(dn, "dn");
    u();
    c();
    p();
    m();
    d();
    l();
    function fn(t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }
    __name(fn, "fn");
    u();
    c();
    p();
    m();
    d();
    l();
    function hr(t, e) {
      let r = {};
      for (let n of Object.keys(t)) r[n] = e(t[n], n);
      return r;
    }
    __name(hr, "hr");
    u();
    c();
    p();
    m();
    d();
    l();
    function gn(t, e) {
      if (t.length === 0) return;
      let r = t[0];
      for (let n = 1; n < t.length; n++) e(r, t[n]) < 0 && (r = t[n]);
      return r;
    }
    __name(gn, "gn");
    u();
    c();
    p();
    m();
    d();
    l();
    function O(t, e) {
      Object.defineProperty(t, "name", { value: e, configurable: true });
    }
    __name(O, "O");
    u();
    c();
    p();
    m();
    d();
    l();
    var Li = /* @__PURE__ */ new Set();
    var Tt = /* @__PURE__ */ __name((t, e, ...r) => {
      Li.has(t) || (Li.add(t), pn(e, ...r));
    }, "Tt");
    var M = class t extends Error {
      static {
        __name(this, "t");
      }
      clientVersion;
      errorCode;
      retryable;
      constructor(e, r, n) {
        super(e), this.name = "PrismaClientInitializationError", this.clientVersion = r, this.errorCode = n, Error.captureStackTrace(t);
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientInitializationError";
      }
    };
    O(M, "PrismaClientInitializationError");
    u();
    c();
    p();
    m();
    d();
    l();
    var X = class extends Error {
      static {
        __name(this, "X");
      }
      code;
      meta;
      clientVersion;
      batchRequestIdx;
      constructor(e, { code: r, clientVersion: n, meta: i, batchRequestIdx: o }) {
        super(e), this.name = "PrismaClientKnownRequestError", this.code = r, this.clientVersion = n, this.meta = i, Object.defineProperty(this, "batchRequestIdx", { value: o, enumerable: false, writable: true });
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientKnownRequestError";
      }
    };
    O(X, "PrismaClientKnownRequestError");
    u();
    c();
    p();
    m();
    d();
    l();
    var Te = class extends Error {
      static {
        __name(this, "Te");
      }
      clientVersion;
      constructor(e, r) {
        super(e), this.name = "PrismaClientRustPanicError", this.clientVersion = r;
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientRustPanicError";
      }
    };
    O(Te, "PrismaClientRustPanicError");
    u();
    c();
    p();
    m();
    d();
    l();
    var Q = class extends Error {
      static {
        __name(this, "Q");
      }
      clientVersion;
      batchRequestIdx;
      constructor(e, { clientVersion: r, batchRequestIdx: n }) {
        super(e), this.name = "PrismaClientUnknownRequestError", this.clientVersion = r, Object.defineProperty(this, "batchRequestIdx", { value: n, writable: true, enumerable: false });
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientUnknownRequestError";
      }
    };
    O(Q, "PrismaClientUnknownRequestError");
    u();
    c();
    p();
    m();
    d();
    l();
    var Y = class extends Error {
      static {
        __name(this, "Y");
      }
      name = "PrismaClientValidationError";
      clientVersion;
      constructor(e, { clientVersion: r }) {
        super(e), this.clientVersion = r;
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientValidationError";
      }
    };
    O(Y, "PrismaClientValidationError");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    var fe = class {
      static {
        __name(this, "fe");
      }
      _map = /* @__PURE__ */ new Map();
      get(e) {
        return this._map.get(e)?.value;
      }
      set(e, r) {
        this._map.set(e, { value: r });
      }
      getOrCreate(e, r) {
        let n = this._map.get(e);
        if (n) return n.value;
        let i = r();
        return this.set(e, i), i;
      }
    };
    u();
    c();
    p();
    m();
    d();
    l();
    function Ce(t) {
      return t.substring(0, 1).toLowerCase() + t.substring(1);
    }
    __name(Ce, "Ce");
    u();
    c();
    p();
    m();
    d();
    l();
    function Ni(t, e) {
      let r = {};
      for (let n of t) {
        let i = n[e];
        r[i] = n;
      }
      return r;
    }
    __name(Ni, "Ni");
    u();
    c();
    p();
    m();
    d();
    l();
    function vt(t) {
      let e;
      return { get() {
        return e || (e = { value: t() }), e.value;
      } };
    }
    __name(vt, "vt");
    u();
    c();
    p();
    m();
    d();
    l();
    function Ui(t) {
      return { models: yn(t.models), enums: yn(t.enums), types: yn(t.types) };
    }
    __name(Ui, "Ui");
    function yn(t) {
      let e = {};
      for (let { name: r, ...n } of t) e[r] = n;
      return e;
    }
    __name(yn, "yn");
    u();
    c();
    p();
    m();
    d();
    l();
    function We(t) {
      return t instanceof Date || Object.prototype.toString.call(t) === "[object Date]";
    }
    __name(We, "We");
    function br(t) {
      return t.toString() !== "Invalid Date";
    }
    __name(br, "br");
    u();
    c();
    p();
    m();
    d();
    l();
    l();
    function Ke(t) {
      return P2.isDecimal(t) ? true : t !== null && typeof t == "object" && typeof t.s == "number" && typeof t.e == "number" && typeof t.toFixed == "function" && Array.isArray(t.d);
    }
    __name(Ke, "Ke");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    var At = {};
    ht(At, { ModelAction: /* @__PURE__ */ __name(() => Rt, "ModelAction"), datamodelEnumToSchemaEnum: /* @__PURE__ */ __name(() => Ga, "datamodelEnumToSchemaEnum") });
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    function Ga(t) {
      return { name: t.name, values: t.values.map((e) => e.name) };
    }
    __name(Ga, "Ga");
    u();
    c();
    p();
    m();
    d();
    l();
    var Rt = ((U2) => (U2.findUnique = "findUnique", U2.findUniqueOrThrow = "findUniqueOrThrow", U2.findFirst = "findFirst", U2.findFirstOrThrow = "findFirstOrThrow", U2.findMany = "findMany", U2.create = "create", U2.createMany = "createMany", U2.createManyAndReturn = "createManyAndReturn", U2.update = "update", U2.updateMany = "updateMany", U2.updateManyAndReturn = "updateManyAndReturn", U2.upsert = "upsert", U2.delete = "delete", U2.deleteMany = "deleteMany", U2.groupBy = "groupBy", U2.count = "count", U2.aggregate = "aggregate", U2.findRaw = "findRaw", U2.aggregateRaw = "aggregateRaw", U2))(Rt || {});
    var Ja = bt(_i());
    var Wa = { red: Ge, gray: bi, dim: lr, bold: ar, underline: di, highlightSource: /* @__PURE__ */ __name((t) => t.highlight(), "highlightSource") };
    var Ka = { red: /* @__PURE__ */ __name((t) => t, "red"), gray: /* @__PURE__ */ __name((t) => t, "gray"), dim: /* @__PURE__ */ __name((t) => t, "dim"), bold: /* @__PURE__ */ __name((t) => t, "bold"), underline: /* @__PURE__ */ __name((t) => t, "underline"), highlightSource: /* @__PURE__ */ __name((t) => t, "highlightSource") };
    function Ha({ message: t, originalMethod: e, isPanic: r, callArguments: n }) {
      return { functionName: `prisma.${e}()`, message: t, isPanic: r ?? false, callArguments: n };
    }
    __name(Ha, "Ha");
    function za({ functionName: t, location: e, message: r, isPanic: n, contextLines: i, callArguments: o }, s2) {
      let a = [""], f = e ? " in" : ":";
      if (n ? (a.push(s2.red(`Oops, an unknown error occurred! This is ${s2.bold("on us")}, you did nothing wrong.`)), a.push(s2.red(`It occurred in the ${s2.bold(`\`${t}\``)} invocation${f}`))) : a.push(s2.red(`Invalid ${s2.bold(`\`${t}\``)} invocation${f}`)), e && a.push(s2.underline(Ya(e))), i) {
        a.push("");
        let v = [i.toString()];
        o && (v.push(o), v.push(s2.dim(")"))), a.push(v.join("")), o && a.push("");
      } else a.push(""), o && a.push(o), a.push("");
      return a.push(r), a.join(`
`);
    }
    __name(za, "za");
    function Ya(t) {
      let e = [t.fileName];
      return t.lineNumber && e.push(String(t.lineNumber)), t.columnNumber && e.push(String(t.columnNumber)), e.join(":");
    }
    __name(Ya, "Ya");
    function Er(t) {
      let e = t.showColors ? Wa : Ka, r;
      return typeof $getTemplateParameters < "u" ? r = $getTemplateParameters(t, e) : r = Ha(t), za(r, e);
    }
    __name(Er, "Er");
    u();
    c();
    p();
    m();
    d();
    l();
    var Wi = bt(hn());
    u();
    c();
    p();
    m();
    d();
    l();
    function $i(t, e, r) {
      let n = ji(t), i = Xa(n), o = el(i);
      o ? wr(o, e, r) : e.addErrorMessage(() => "Unknown error");
    }
    __name($i, "$i");
    function ji(t) {
      return t.errors.flatMap((e) => e.kind === "Union" ? ji(e) : [e]);
    }
    __name(ji, "ji");
    function Xa(t) {
      let e = /* @__PURE__ */ new Map(), r = [];
      for (let n of t) {
        if (n.kind !== "InvalidArgumentType") {
          r.push(n);
          continue;
        }
        let i = `${n.selectionPath.join(".")}:${n.argumentPath.join(".")}`, o = e.get(i);
        o ? e.set(i, { ...n, argument: { ...n.argument, typeNames: Za(o.argument.typeNames, n.argument.typeNames) } }) : e.set(i, n);
      }
      return r.push(...e.values()), r;
    }
    __name(Xa, "Xa");
    function Za(t, e) {
      return [...new Set(t.concat(e))];
    }
    __name(Za, "Za");
    function el(t) {
      return gn(t, (e, r) => {
        let n = Vi(e), i = Vi(r);
        return n !== i ? n - i : Bi(e) - Bi(r);
      });
    }
    __name(el, "el");
    function Vi(t) {
      let e = 0;
      return Array.isArray(t.selectionPath) && (e += t.selectionPath.length), Array.isArray(t.argumentPath) && (e += t.argumentPath.length), e;
    }
    __name(Vi, "Vi");
    function Bi(t) {
      switch (t.kind) {
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
    __name(Bi, "Bi");
    u();
    c();
    p();
    m();
    d();
    l();
    var se = class {
      static {
        __name(this, "se");
      }
      constructor(e, r) {
        this.name = e;
        this.value = r;
      }
      isRequired = false;
      makeRequired() {
        return this.isRequired = true, this;
      }
      write(e) {
        let { colors: { green: r } } = e.context;
        e.addMarginSymbol(r(this.isRequired ? "+" : "?")), e.write(r(this.name)), this.isRequired || e.write(r("?")), e.write(r(": ")), typeof this.value == "string" ? e.write(r(this.value)) : e.write(this.value);
      }
    };
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    Gi();
    u();
    c();
    p();
    m();
    d();
    l();
    var He = class {
      static {
        __name(this, "He");
      }
      constructor(e = 0, r) {
        this.context = r;
        this.currentIndent = e;
      }
      lines = [];
      currentLine = "";
      currentIndent = 0;
      marginSymbol;
      afterNextNewLineCallback;
      write(e) {
        return typeof e == "string" ? this.currentLine += e : e.write(this), this;
      }
      writeJoined(e, r, n = (i, o) => o.write(i)) {
        let i = r.length - 1;
        for (let o = 0; o < r.length; o++) n(r[o], this), o !== i && this.write(e);
        return this;
      }
      writeLine(e) {
        return this.write(e).newLine();
      }
      newLine() {
        this.lines.push(this.indentedCurrentLine()), this.currentLine = "", this.marginSymbol = void 0;
        let e = this.afterNextNewLineCallback;
        return this.afterNextNewLineCallback = void 0, e?.(), this;
      }
      withIndent(e) {
        return this.indent(), e(this), this.unindent(), this;
      }
      afterNextNewline(e) {
        return this.afterNextNewLineCallback = e, this;
      }
      indent() {
        return this.currentIndent++, this;
      }
      unindent() {
        return this.currentIndent > 0 && this.currentIndent--, this;
      }
      addMarginSymbol(e) {
        return this.marginSymbol = e, this;
      }
      toString() {
        return this.lines.concat(this.indentedCurrentLine()).join(`
`);
      }
      getCurrentLineLength() {
        return this.currentLine.length;
      }
      indentedCurrentLine() {
        let e = this.currentLine.padStart(this.currentLine.length + 2 * this.currentIndent);
        return this.marginSymbol ? this.marginSymbol + e.slice(1) : e;
      }
    };
    Qi();
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    var xr = class {
      static {
        __name(this, "xr");
      }
      constructor(e) {
        this.value = e;
      }
      write(e) {
        e.write(this.value);
      }
      markAsError() {
        this.value.markAsError();
      }
    };
    u();
    c();
    p();
    m();
    d();
    l();
    var Pr = /* @__PURE__ */ __name((t) => t, "Pr");
    var Tr = { bold: Pr, red: Pr, green: Pr, dim: Pr, enabled: false };
    var Ji = { bold: ar, red: Ge, green: fi, dim: lr, enabled: true };
    var ze = { write(t) {
      t.writeLine(",");
    } };
    u();
    c();
    p();
    m();
    d();
    l();
    var ge = class {
      static {
        __name(this, "ge");
      }
      constructor(e) {
        this.contents = e;
      }
      isUnderlined = false;
      color = /* @__PURE__ */ __name((e) => e, "color");
      underline() {
        return this.isUnderlined = true, this;
      }
      setColor(e) {
        return this.color = e, this;
      }
      write(e) {
        let r = e.getCurrentLineLength();
        e.write(this.color(this.contents)), this.isUnderlined && e.afterNextNewline(() => {
          e.write(" ".repeat(r)).writeLine(this.color("~".repeat(this.contents.length)));
        });
      }
    };
    u();
    c();
    p();
    m();
    d();
    l();
    var Se = class {
      static {
        __name(this, "Se");
      }
      hasError = false;
      markAsError() {
        return this.hasError = true, this;
      }
    };
    var Ye = class extends Se {
      static {
        __name(this, "Ye");
      }
      items = [];
      addItem(e) {
        return this.items.push(new xr(e)), this;
      }
      getField(e) {
        return this.items[e];
      }
      getPrintWidth() {
        return this.items.length === 0 ? 2 : Math.max(...this.items.map((r) => r.value.getPrintWidth())) + 2;
      }
      write(e) {
        if (this.items.length === 0) {
          this.writeEmpty(e);
          return;
        }
        this.writeWithItems(e);
      }
      writeEmpty(e) {
        let r = new ge("[]");
        this.hasError && r.setColor(e.context.colors.red).underline(), e.write(r);
      }
      writeWithItems(e) {
        let { colors: r } = e.context;
        e.writeLine("[").withIndent(() => e.writeJoined(ze, this.items).newLine()).write("]"), this.hasError && e.afterNextNewline(() => {
          e.writeLine(r.red("~".repeat(this.getPrintWidth())));
        });
      }
      asObject() {
      }
    };
    var Xe = class t extends Se {
      static {
        __name(this, "t");
      }
      fields = {};
      suggestions = [];
      addField(e) {
        this.fields[e.name] = e;
      }
      addSuggestion(e) {
        this.suggestions.push(e);
      }
      getField(e) {
        return this.fields[e];
      }
      getDeepField(e) {
        let [r, ...n] = e, i = this.getField(r);
        if (!i) return;
        let o = i;
        for (let s2 of n) {
          let a;
          if (o.value instanceof t ? a = o.value.getField(s2) : o.value instanceof Ye && (a = o.value.getField(Number(s2))), !a) return;
          o = a;
        }
        return o;
      }
      getDeepFieldValue(e) {
        return e.length === 0 ? this : this.getDeepField(e)?.value;
      }
      hasField(e) {
        return !!this.getField(e);
      }
      removeAllFields() {
        this.fields = {};
      }
      removeField(e) {
        delete this.fields[e];
      }
      getFields() {
        return this.fields;
      }
      isEmpty() {
        return Object.keys(this.fields).length === 0;
      }
      getFieldValue(e) {
        return this.getField(e)?.value;
      }
      getDeepSubSelectionValue(e) {
        let r = this;
        for (let n of e) {
          if (!(r instanceof t)) return;
          let i = r.getSubSelectionValue(n);
          if (!i) return;
          r = i;
        }
        return r;
      }
      getDeepSelectionParent(e) {
        let r = this.getSelectionParent();
        if (!r) return;
        let n = r;
        for (let i of e) {
          let o = n.value.getFieldValue(i);
          if (!o || !(o instanceof t)) return;
          let s2 = o.getSelectionParent();
          if (!s2) return;
          n = s2;
        }
        return n;
      }
      getSelectionParent() {
        let e = this.getField("select")?.value.asObject();
        if (e) return { kind: "select", value: e };
        let r = this.getField("include")?.value.asObject();
        if (r) return { kind: "include", value: r };
      }
      getSubSelectionValue(e) {
        return this.getSelectionParent()?.value.fields[e].value;
      }
      getPrintWidth() {
        let e = Object.values(this.fields);
        return e.length == 0 ? 2 : Math.max(...e.map((n) => n.getPrintWidth())) + 2;
      }
      write(e) {
        let r = Object.values(this.fields);
        if (r.length === 0 && this.suggestions.length === 0) {
          this.writeEmpty(e);
          return;
        }
        this.writeWithContents(e, r);
      }
      asObject() {
        return this;
      }
      writeEmpty(e) {
        let r = new ge("{}");
        this.hasError && r.setColor(e.context.colors.red).underline(), e.write(r);
      }
      writeWithContents(e, r) {
        e.writeLine("{").withIndent(() => {
          e.writeJoined(ze, [...r, ...this.suggestions]).newLine();
        }), e.write("}"), this.hasError && e.afterNextNewline(() => {
          e.writeLine(e.context.colors.red("~".repeat(this.getPrintWidth())));
        });
      }
    };
    u();
    c();
    p();
    m();
    d();
    l();
    var z = class extends Se {
      static {
        __name(this, "z");
      }
      constructor(r) {
        super();
        this.text = r;
      }
      getPrintWidth() {
        return this.text.length;
      }
      write(r) {
        let n = new ge(this.text);
        this.hasError && n.underline().setColor(r.context.colors.red), r.write(n);
      }
      asObject() {
      }
    };
    u();
    c();
    p();
    m();
    d();
    l();
    var Ct = class {
      static {
        __name(this, "Ct");
      }
      fields = [];
      addField(e, r) {
        return this.fields.push({ write(n) {
          let { green: i, dim: o } = n.context.colors;
          n.write(i(o(`${e}: ${r}`))).addMarginSymbol(i(o("+")));
        } }), this;
      }
      write(e) {
        let { colors: { green: r } } = e.context;
        e.writeLine(r("{")).withIndent(() => {
          e.writeJoined(ze, this.fields).newLine();
        }).write(r("}")).addMarginSymbol(r("+"));
      }
    };
    function wr(t, e, r) {
      switch (t.kind) {
        case "MutuallyExclusiveFields":
          tl(t, e);
          break;
        case "IncludeOnScalar":
          rl(t, e);
          break;
        case "EmptySelection":
          nl(t, e, r);
          break;
        case "UnknownSelectionField":
          al(t, e);
          break;
        case "InvalidSelectionValue":
          ll(t, e);
          break;
        case "UnknownArgument":
          ul(t, e);
          break;
        case "UnknownInputField":
          cl(t, e);
          break;
        case "RequiredArgumentMissing":
          pl(t, e);
          break;
        case "InvalidArgumentType":
          ml(t, e);
          break;
        case "InvalidArgumentValue":
          dl(t, e);
          break;
        case "ValueTooLarge":
          fl(t, e);
          break;
        case "SomeFieldsMissing":
          gl(t, e);
          break;
        case "TooManyFieldsGiven":
          yl(t, e);
          break;
        case "Union":
          $i(t, e, r);
          break;
        default:
          throw new Error("not implemented: " + t.kind);
      }
    }
    __name(wr, "wr");
    function tl(t, e) {
      let r = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
      r && (r.getField(t.firstField)?.markAsError(), r.getField(t.secondField)?.markAsError()), e.addErrorMessage((n) => `Please ${n.bold("either")} use ${n.green(`\`${t.firstField}\``)} or ${n.green(`\`${t.secondField}\``)}, but ${n.red("not both")} at the same time.`);
    }
    __name(tl, "tl");
    function rl(t, e) {
      let [r, n] = Ze(t.selectionPath), i = t.outputType, o = e.arguments.getDeepSelectionParent(r)?.value;
      if (o && (o.getField(n)?.markAsError(), i)) for (let s2 of i.fields) s2.isRelation && o.addSuggestion(new se(s2.name, "true"));
      e.addErrorMessage((s2) => {
        let a = `Invalid scalar field ${s2.red(`\`${n}\``)} for ${s2.bold("include")} statement`;
        return i ? a += ` on model ${s2.bold(i.name)}. ${St(s2)}` : a += ".", a += `
Note that ${s2.bold("include")} statements only accept relation fields.`, a;
      });
    }
    __name(rl, "rl");
    function nl(t, e, r) {
      let n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
      if (n) {
        let i = n.getField("omit")?.value.asObject();
        if (i) {
          il(t, e, i);
          return;
        }
        if (n.hasField("select")) {
          ol(t, e);
          return;
        }
      }
      if (r?.[Ce(t.outputType.name)]) {
        sl(t, e);
        return;
      }
      e.addErrorMessage(() => `Unknown field at "${t.selectionPath.join(".")} selection"`);
    }
    __name(nl, "nl");
    function il(t, e, r) {
      r.removeAllFields();
      for (let n of t.outputType.fields) r.addSuggestion(new se(n.name, "false"));
      e.addErrorMessage((n) => `The ${n.red("omit")} statement includes every field of the model ${n.bold(t.outputType.name)}. At least one field must be included in the result`);
    }
    __name(il, "il");
    function ol(t, e) {
      let r = t.outputType, n = e.arguments.getDeepSelectionParent(t.selectionPath)?.value, i = n?.isEmpty() ?? false;
      n && (n.removeAllFields(), zi(n, r)), e.addErrorMessage((o) => i ? `The ${o.red("`select`")} statement for type ${o.bold(r.name)} must not be empty. ${St(o)}` : `The ${o.red("`select`")} statement for type ${o.bold(r.name)} needs ${o.bold("at least one truthy value")}.`);
    }
    __name(ol, "ol");
    function sl(t, e) {
      let r = new Ct();
      for (let i of t.outputType.fields) i.isRelation || r.addField(i.name, "false");
      let n = new se("omit", r).makeRequired();
      if (t.selectionPath.length === 0) e.arguments.addSuggestion(n);
      else {
        let [i, o] = Ze(t.selectionPath), a = e.arguments.getDeepSelectionParent(i)?.value.asObject()?.getField(o);
        if (a) {
          let f = a?.value.asObject() ?? new Xe();
          f.addSuggestion(n), a.value = f;
        }
      }
      e.addErrorMessage((i) => `The global ${i.red("omit")} configuration excludes every field of the model ${i.bold(t.outputType.name)}. At least one field must be included in the result`);
    }
    __name(sl, "sl");
    function al(t, e) {
      let r = Yi(t.selectionPath, e);
      if (r.parentKind !== "unknown") {
        r.field.markAsError();
        let n = r.parent;
        switch (r.parentKind) {
          case "select":
            zi(n, t.outputType);
            break;
          case "include":
            hl(n, t.outputType);
            break;
          case "omit":
            bl(n, t.outputType);
            break;
        }
      }
      e.addErrorMessage((n) => {
        let i = [`Unknown field ${n.red(`\`${r.fieldName}\``)}`];
        return r.parentKind !== "unknown" && i.push(`for ${n.bold(r.parentKind)} statement`), i.push(`on model ${n.bold(`\`${t.outputType.name}\``)}.`), i.push(St(n)), i.join(" ");
      });
    }
    __name(al, "al");
    function ll(t, e) {
      let r = Yi(t.selectionPath, e);
      r.parentKind !== "unknown" && r.field.value.markAsError(), e.addErrorMessage((n) => `Invalid value for selection field \`${n.red(r.fieldName)}\`: ${t.underlyingError}`);
    }
    __name(ll, "ll");
    function ul(t, e) {
      let r = t.argumentPath[0], n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
      n && (n.getField(r)?.markAsError(), El(n, t.arguments)), e.addErrorMessage((i) => Ki(i, r, t.arguments.map((o) => o.name)));
    }
    __name(ul, "ul");
    function cl(t, e) {
      let [r, n] = Ze(t.argumentPath), i = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
      if (i) {
        i.getDeepField(t.argumentPath)?.markAsError();
        let o = i.getDeepFieldValue(r)?.asObject();
        o && Xi(o, t.inputType);
      }
      e.addErrorMessage((o) => Ki(o, n, t.inputType.fields.map((s2) => s2.name)));
    }
    __name(cl, "cl");
    function Ki(t, e, r) {
      let n = [`Unknown argument \`${t.red(e)}\`.`], i = xl(e, r);
      return i && n.push(`Did you mean \`${t.green(i)}\`?`), r.length > 0 && n.push(St(t)), n.join(" ");
    }
    __name(Ki, "Ki");
    function pl(t, e) {
      let r;
      e.addErrorMessage((f) => r?.value instanceof z && r.value.text === "null" ? `Argument \`${f.green(o)}\` must not be ${f.red("null")}.` : `Argument \`${f.green(o)}\` is missing.`);
      let n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
      if (!n) return;
      let [i, o] = Ze(t.argumentPath), s2 = new Ct(), a = n.getDeepFieldValue(i)?.asObject();
      if (a) {
        if (r = a.getField(o), r && a.removeField(o), t.inputTypes.length === 1 && t.inputTypes[0].kind === "object") {
          for (let f of t.inputTypes[0].fields) s2.addField(f.name, f.typeNames.join(" | "));
          a.addSuggestion(new se(o, s2).makeRequired());
        } else {
          let f = t.inputTypes.map(Hi).join(" | ");
          a.addSuggestion(new se(o, f).makeRequired());
        }
        if (t.dependentArgumentPath) {
          n.getDeepField(t.dependentArgumentPath)?.markAsError();
          let [, f] = Ze(t.dependentArgumentPath);
          e.addErrorMessage((v) => `Argument \`${v.green(o)}\` is required because argument \`${v.green(f)}\` was provided.`);
        }
      }
    }
    __name(pl, "pl");
    function Hi(t) {
      return t.kind === "list" ? `${Hi(t.elementType)}[]` : t.name;
    }
    __name(Hi, "Hi");
    function ml(t, e) {
      let r = t.argument.name, n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
      n && n.getDeepFieldValue(t.argumentPath)?.markAsError(), e.addErrorMessage((i) => {
        let o = vr("or", t.argument.typeNames.map((s2) => i.green(s2)));
        return `Argument \`${i.bold(r)}\`: Invalid value provided. Expected ${o}, provided ${i.red(t.inferredType)}.`;
      });
    }
    __name(ml, "ml");
    function dl(t, e) {
      let r = t.argument.name, n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
      n && n.getDeepFieldValue(t.argumentPath)?.markAsError(), e.addErrorMessage((i) => {
        let o = [`Invalid value for argument \`${i.bold(r)}\``];
        if (t.underlyingError && o.push(`: ${t.underlyingError}`), o.push("."), t.argument.typeNames.length > 0) {
          let s2 = vr("or", t.argument.typeNames.map((a) => i.green(a)));
          o.push(` Expected ${s2}.`);
        }
        return o.join("");
      });
    }
    __name(dl, "dl");
    function fl(t, e) {
      let r = t.argument.name, n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject(), i;
      if (n) {
        let s2 = n.getDeepField(t.argumentPath)?.value;
        s2?.markAsError(), s2 instanceof z && (i = s2.text);
      }
      e.addErrorMessage((o) => {
        let s2 = ["Unable to fit value"];
        return i && s2.push(o.red(i)), s2.push(`into a 64-bit signed integer for field \`${o.bold(r)}\``), s2.join(" ");
      });
    }
    __name(fl, "fl");
    function gl(t, e) {
      let r = t.argumentPath[t.argumentPath.length - 1], n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
      if (n) {
        let i = n.getDeepFieldValue(t.argumentPath)?.asObject();
        i && Xi(i, t.inputType);
      }
      e.addErrorMessage((i) => {
        let o = [`Argument \`${i.bold(r)}\` of type ${i.bold(t.inputType.name)} needs`];
        return t.constraints.minFieldCount === 1 ? t.constraints.requiredFields ? o.push(`${i.green("at least one of")} ${vr("or", t.constraints.requiredFields.map((s2) => `\`${i.bold(s2)}\``))} arguments.`) : o.push(`${i.green("at least one")} argument.`) : o.push(`${i.green(`at least ${t.constraints.minFieldCount}`)} arguments.`), o.push(St(i)), o.join(" ");
      });
    }
    __name(gl, "gl");
    function yl(t, e) {
      let r = t.argumentPath[t.argumentPath.length - 1], n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject(), i = [];
      if (n) {
        let o = n.getDeepFieldValue(t.argumentPath)?.asObject();
        o && (o.markAsError(), i = Object.keys(o.getFields()));
      }
      e.addErrorMessage((o) => {
        let s2 = [`Argument \`${o.bold(r)}\` of type ${o.bold(t.inputType.name)} needs`];
        return t.constraints.minFieldCount === 1 && t.constraints.maxFieldCount == 1 ? s2.push(`${o.green("exactly one")} argument,`) : t.constraints.maxFieldCount == 1 ? s2.push(`${o.green("at most one")} argument,`) : s2.push(`${o.green(`at most ${t.constraints.maxFieldCount}`)} arguments,`), s2.push(`but you provided ${vr("and", i.map((a) => o.red(a)))}. Please choose`), t.constraints.maxFieldCount === 1 ? s2.push("one.") : s2.push(`${t.constraints.maxFieldCount}.`), s2.join(" ");
      });
    }
    __name(yl, "yl");
    function zi(t, e) {
      for (let r of e.fields) t.hasField(r.name) || t.addSuggestion(new se(r.name, "true"));
    }
    __name(zi, "zi");
    function hl(t, e) {
      for (let r of e.fields) r.isRelation && !t.hasField(r.name) && t.addSuggestion(new se(r.name, "true"));
    }
    __name(hl, "hl");
    function bl(t, e) {
      for (let r of e.fields) !t.hasField(r.name) && !r.isRelation && t.addSuggestion(new se(r.name, "true"));
    }
    __name(bl, "bl");
    function El(t, e) {
      for (let r of e) t.hasField(r.name) || t.addSuggestion(new se(r.name, r.typeNames.join(" | ")));
    }
    __name(El, "El");
    function Yi(t, e) {
      let [r, n] = Ze(t), i = e.arguments.getDeepSubSelectionValue(r)?.asObject();
      if (!i) return { parentKind: "unknown", fieldName: n };
      let o = i.getFieldValue("select")?.asObject(), s2 = i.getFieldValue("include")?.asObject(), a = i.getFieldValue("omit")?.asObject(), f = o?.getField(n);
      return o && f ? { parentKind: "select", parent: o, field: f, fieldName: n } : (f = s2?.getField(n), s2 && f ? { parentKind: "include", field: f, parent: s2, fieldName: n } : (f = a?.getField(n), a && f ? { parentKind: "omit", field: f, parent: a, fieldName: n } : { parentKind: "unknown", fieldName: n }));
    }
    __name(Yi, "Yi");
    function Xi(t, e) {
      if (e.kind === "object") for (let r of e.fields) t.hasField(r.name) || t.addSuggestion(new se(r.name, r.typeNames.join(" | ")));
    }
    __name(Xi, "Xi");
    function Ze(t) {
      let e = [...t], r = e.pop();
      if (!r) throw new Error("unexpected empty path");
      return [e, r];
    }
    __name(Ze, "Ze");
    function St({ green: t, enabled: e }) {
      return "Available options are " + (e ? `listed in ${t("green")}` : "marked with ?") + ".";
    }
    __name(St, "St");
    function vr(t, e) {
      if (e.length === 1) return e[0];
      let r = [...e], n = r.pop();
      return `${r.join(", ")} ${t} ${n}`;
    }
    __name(vr, "vr");
    var wl = 3;
    function xl(t, e) {
      let r = 1 / 0, n;
      for (let i of e) {
        let o = (0, Wi.default)(t, i);
        o > wl || o < r && (r = o, n = i);
      }
      return n;
    }
    __name(xl, "xl");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    var It = class {
      static {
        __name(this, "It");
      }
      modelName;
      name;
      typeName;
      isList;
      isEnum;
      constructor(e, r, n, i, o) {
        this.modelName = e, this.name = r, this.typeName = n, this.isList = i, this.isEnum = o;
      }
      _toGraphQLInputType() {
        let e = this.isList ? "List" : "", r = this.isEnum ? "Enum" : "";
        return `${e}${r}${this.typeName}FieldRefInput<${this.modelName}>`;
      }
    };
    function et(t) {
      return t instanceof It;
    }
    __name(et, "et");
    u();
    c();
    p();
    m();
    d();
    l();
    var Rr = /* @__PURE__ */ Symbol();
    var En = /* @__PURE__ */ new WeakMap();
    var ve = class {
      static {
        __name(this, "ve");
      }
      constructor(e) {
        e === Rr ? En.set(this, `Prisma.${this._getName()}`) : En.set(this, `new Prisma.${this._getNamespace()}.${this._getName()}()`);
      }
      _getName() {
        return this.constructor.name;
      }
      toString() {
        return En.get(this);
      }
    };
    var Dt = class extends ve {
      static {
        __name(this, "Dt");
      }
      _getNamespace() {
        return "NullTypes";
      }
    };
    var Ot = class extends Dt {
      static {
        __name(this, "Ot");
      }
      #e;
    };
    wn(Ot, "DbNull");
    var kt = class extends Dt {
      static {
        __name(this, "kt");
      }
      #e;
    };
    wn(kt, "JsonNull");
    var _t = class extends Dt {
      static {
        __name(this, "_t");
      }
      #e;
    };
    wn(_t, "AnyNull");
    var Ar = { classes: { DbNull: Ot, JsonNull: kt, AnyNull: _t }, instances: { DbNull: new Ot(Rr), JsonNull: new kt(Rr), AnyNull: new _t(Rr) } };
    function wn(t, e) {
      Object.defineProperty(t, "name", { value: e, configurable: true });
    }
    __name(wn, "wn");
    u();
    c();
    p();
    m();
    d();
    l();
    var Zi = ": ";
    var Cr = class {
      static {
        __name(this, "Cr");
      }
      constructor(e, r) {
        this.name = e;
        this.value = r;
      }
      hasError = false;
      markAsError() {
        this.hasError = true;
      }
      getPrintWidth() {
        return this.name.length + this.value.getPrintWidth() + Zi.length;
      }
      write(e) {
        let r = new ge(this.name);
        this.hasError && r.underline().setColor(e.context.colors.red), e.write(r).write(Zi).write(this.value);
      }
    };
    var xn = class {
      static {
        __name(this, "xn");
      }
      arguments;
      errorMessages = [];
      constructor(e) {
        this.arguments = e;
      }
      write(e) {
        e.write(this.arguments);
      }
      addErrorMessage(e) {
        this.errorMessages.push(e);
      }
      renderAllMessages(e) {
        return this.errorMessages.map((r) => r(e)).join(`
`);
      }
    };
    function tt(t) {
      return new xn(eo(t));
    }
    __name(tt, "tt");
    function eo(t) {
      let e = new Xe();
      for (let [r, n] of Object.entries(t)) {
        let i = new Cr(r, to(n));
        e.addField(i);
      }
      return e;
    }
    __name(eo, "eo");
    function to(t) {
      if (typeof t == "string") return new z(JSON.stringify(t));
      if (typeof t == "number" || typeof t == "boolean") return new z(String(t));
      if (typeof t == "bigint") return new z(`${t}n`);
      if (t === null) return new z("null");
      if (t === void 0) return new z("undefined");
      if (Ke(t)) return new z(`new Prisma.Decimal("${t.toFixed()}")`);
      if (t instanceof Uint8Array) return h.isBuffer(t) ? new z(`Buffer.alloc(${t.byteLength})`) : new z(`new Uint8Array(${t.byteLength})`);
      if (t instanceof Date) {
        let e = br(t) ? t.toISOString() : "Invalid Date";
        return new z(`new Date("${e}")`);
      }
      return t instanceof ve ? new z(`Prisma.${t._getName()}`) : et(t) ? new z(`prisma.${Ce(t.modelName)}.$fields.${t.name}`) : Array.isArray(t) ? Pl(t) : typeof t == "object" ? eo(t) : new z(Object.prototype.toString.call(t));
    }
    __name(to, "to");
    function Pl(t) {
      let e = new Ye();
      for (let r of t) e.addItem(to(r));
      return e;
    }
    __name(Pl, "Pl");
    function Sr(t, e) {
      let r = e === "pretty" ? Ji : Tr, n = t.renderAllMessages(r), i = new He(0, { colors: r }).write(t).toString();
      return { message: n, args: i };
    }
    __name(Sr, "Sr");
    function Ir({ args: t, errors: e, errorFormat: r, callsite: n, originalMethod: i, clientVersion: o, globalOmit: s2 }) {
      let a = tt(t);
      for (let A of e) wr(A, a, s2);
      let { message: f, args: v } = Sr(a, r), R = Er({ message: f, callsite: n, originalMethod: i, showColors: r === "pretty", callArguments: v });
      throw new Y(R, { clientVersion: o });
    }
    __name(Ir, "Ir");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    function ye(t) {
      return t.replace(/^./, (e) => e.toLowerCase());
    }
    __name(ye, "ye");
    u();
    c();
    p();
    m();
    d();
    l();
    function no(t, e, r) {
      let n = ye(r);
      return !e.result || !(e.result.$allModels || e.result[n]) ? t : Tl({ ...t, ...ro(e.name, t, e.result.$allModels), ...ro(e.name, t, e.result[n]) });
    }
    __name(no, "no");
    function Tl(t) {
      let e = new fe(), r = /* @__PURE__ */ __name((n, i) => e.getOrCreate(n, () => i.has(n) ? [n] : (i.add(n), t[n] ? t[n].needs.flatMap((o) => r(o, i)) : [n])), "r");
      return hr(t, (n) => ({ ...n, needs: r(n.name, /* @__PURE__ */ new Set()) }));
    }
    __name(Tl, "Tl");
    function ro(t, e, r) {
      return r ? hr(r, ({ needs: n, compute: i }, o) => ({ name: o, needs: n ? Object.keys(n).filter((s2) => n[s2]) : [], compute: vl(e, o, i) })) : {};
    }
    __name(ro, "ro");
    function vl(t, e, r) {
      let n = t?.[e]?.compute;
      return n ? (i) => r({ ...i, [e]: n(i) }) : r;
    }
    __name(vl, "vl");
    function io(t, e) {
      if (!e) return t;
      let r = { ...t };
      for (let n of Object.values(e)) if (t[n.name]) for (let i of n.needs) r[i] = true;
      return r;
    }
    __name(io, "io");
    function oo(t, e) {
      if (!e) return t;
      let r = { ...t };
      for (let n of Object.values(e)) if (!t[n.name]) for (let i of n.needs) delete r[i];
      return r;
    }
    __name(oo, "oo");
    var Dr = class {
      static {
        __name(this, "Dr");
      }
      constructor(e, r) {
        this.extension = e;
        this.previous = r;
      }
      computedFieldsCache = new fe();
      modelExtensionsCache = new fe();
      queryCallbacksCache = new fe();
      clientExtensions = vt(() => this.extension.client ? { ...this.previous?.getAllClientExtensions(), ...this.extension.client } : this.previous?.getAllClientExtensions());
      batchCallbacks = vt(() => {
        let e = this.previous?.getAllBatchQueryCallbacks() ?? [], r = this.extension.query?.$__internalBatch;
        return r ? e.concat(r) : e;
      });
      getAllComputedFields(e) {
        return this.computedFieldsCache.getOrCreate(e, () => no(this.previous?.getAllComputedFields(e), this.extension, e));
      }
      getAllClientExtensions() {
        return this.clientExtensions.get();
      }
      getAllModelExtensions(e) {
        return this.modelExtensionsCache.getOrCreate(e, () => {
          let r = ye(e);
          return !this.extension.model || !(this.extension.model[r] || this.extension.model.$allModels) ? this.previous?.getAllModelExtensions(e) : { ...this.previous?.getAllModelExtensions(e), ...this.extension.model.$allModels, ...this.extension.model[r] };
        });
      }
      getAllQueryCallbacks(e, r) {
        return this.queryCallbacksCache.getOrCreate(`${e}:${r}`, () => {
          let n = this.previous?.getAllQueryCallbacks(e, r) ?? [], i = [], o = this.extension.query;
          return !o || !(o[e] || o.$allModels || o[r] || o.$allOperations) ? n : (o[e] !== void 0 && (o[e][r] !== void 0 && i.push(o[e][r]), o[e].$allOperations !== void 0 && i.push(o[e].$allOperations)), e !== "$none" && o.$allModels !== void 0 && (o.$allModels[r] !== void 0 && i.push(o.$allModels[r]), o.$allModels.$allOperations !== void 0 && i.push(o.$allModels.$allOperations)), o[r] !== void 0 && i.push(o[r]), o.$allOperations !== void 0 && i.push(o.$allOperations), n.concat(i));
        });
      }
      getAllBatchQueryCallbacks() {
        return this.batchCallbacks.get();
      }
    };
    var rt = class t {
      static {
        __name(this, "t");
      }
      constructor(e) {
        this.head = e;
      }
      static empty() {
        return new t();
      }
      static single(e) {
        return new t(new Dr(e));
      }
      isEmpty() {
        return this.head === void 0;
      }
      append(e) {
        return new t(new Dr(e, this.head));
      }
      getAllComputedFields(e) {
        return this.head?.getAllComputedFields(e);
      }
      getAllClientExtensions() {
        return this.head?.getAllClientExtensions();
      }
      getAllModelExtensions(e) {
        return this.head?.getAllModelExtensions(e);
      }
      getAllQueryCallbacks(e, r) {
        return this.head?.getAllQueryCallbacks(e, r) ?? [];
      }
      getAllBatchQueryCallbacks() {
        return this.head?.getAllBatchQueryCallbacks() ?? [];
      }
    };
    u();
    c();
    p();
    m();
    d();
    l();
    var Or = class {
      static {
        __name(this, "Or");
      }
      constructor(e) {
        this.name = e;
      }
    };
    function so(t) {
      return t instanceof Or;
    }
    __name(so, "so");
    function ao(t) {
      return new Or(t);
    }
    __name(ao, "ao");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    var lo = /* @__PURE__ */ Symbol();
    var Mt = class {
      static {
        __name(this, "Mt");
      }
      constructor(e) {
        if (e !== lo) throw new Error("Skip instance can not be constructed directly");
      }
      ifUndefined(e) {
        return e === void 0 ? kr : e;
      }
    };
    var kr = new Mt(lo);
    function he(t) {
      return t instanceof Mt;
    }
    __name(he, "he");
    var Rl = { findUnique: "findUnique", findUniqueOrThrow: "findUniqueOrThrow", findFirst: "findFirst", findFirstOrThrow: "findFirstOrThrow", findMany: "findMany", count: "aggregate", create: "createOne", createMany: "createMany", createManyAndReturn: "createManyAndReturn", update: "updateOne", updateMany: "updateMany", updateManyAndReturn: "updateManyAndReturn", upsert: "upsertOne", delete: "deleteOne", deleteMany: "deleteMany", executeRaw: "executeRaw", queryRaw: "queryRaw", aggregate: "aggregate", groupBy: "groupBy", runCommandRaw: "runCommandRaw", findRaw: "findRaw", aggregateRaw: "aggregateRaw" };
    var uo = "explicitly `undefined` values are not allowed";
    function _r({ modelName: t, action: e, args: r, runtimeDataModel: n, extensions: i = rt.empty(), callsite: o, clientMethod: s2, errorFormat: a, clientVersion: f, previewFeatures: v, globalOmit: R }) {
      let A = new Pn({ runtimeDataModel: n, modelName: t, action: e, rootArgs: r, callsite: o, extensions: i, selectionPath: [], argumentPath: [], originalMethod: s2, errorFormat: a, clientVersion: f, previewFeatures: v, globalOmit: R });
      return { modelName: t, action: Rl[e], query: Lt(r, A) };
    }
    __name(_r, "_r");
    function Lt({ select: t, include: e, ...r } = {}, n) {
      let i = r.omit;
      return delete r.omit, { arguments: po(r, n), selection: Al(t, e, i, n) };
    }
    __name(Lt, "Lt");
    function Al(t, e, r, n) {
      return t ? (e ? n.throwValidationError({ kind: "MutuallyExclusiveFields", firstField: "include", secondField: "select", selectionPath: n.getSelectionPath() }) : r && n.throwValidationError({ kind: "MutuallyExclusiveFields", firstField: "omit", secondField: "select", selectionPath: n.getSelectionPath() }), Dl(t, n)) : Cl(n, e, r);
    }
    __name(Al, "Al");
    function Cl(t, e, r) {
      let n = {};
      return t.modelOrType && !t.isRawAction() && (n.$composites = true, n.$scalars = true), e && Sl(n, e, t), Il(n, r, t), n;
    }
    __name(Cl, "Cl");
    function Sl(t, e, r) {
      for (let [n, i] of Object.entries(e)) {
        if (he(i)) continue;
        let o = r.nestSelection(n);
        if (Tn(i, o), i === false || i === void 0) {
          t[n] = false;
          continue;
        }
        let s2 = r.findField(n);
        if (s2 && s2.kind !== "object" && r.throwValidationError({ kind: "IncludeOnScalar", selectionPath: r.getSelectionPath().concat(n), outputType: r.getOutputTypeDescription() }), s2) {
          t[n] = Lt(i === true ? {} : i, o);
          continue;
        }
        if (i === true) {
          t[n] = true;
          continue;
        }
        t[n] = Lt(i, o);
      }
    }
    __name(Sl, "Sl");
    function Il(t, e, r) {
      let n = r.getComputedFields(), i = { ...r.getGlobalOmit(), ...e }, o = oo(i, n);
      for (let [s2, a] of Object.entries(o)) {
        if (he(a)) continue;
        Tn(a, r.nestSelection(s2));
        let f = r.findField(s2);
        n?.[s2] && !f || (t[s2] = !a);
      }
    }
    __name(Il, "Il");
    function Dl(t, e) {
      let r = {}, n = e.getComputedFields(), i = io(t, n);
      for (let [o, s2] of Object.entries(i)) {
        if (he(s2)) continue;
        let a = e.nestSelection(o);
        Tn(s2, a);
        let f = e.findField(o);
        if (!(n?.[o] && !f)) {
          if (s2 === false || s2 === void 0 || he(s2)) {
            r[o] = false;
            continue;
          }
          if (s2 === true) {
            f?.kind === "object" ? r[o] = Lt({}, a) : r[o] = true;
            continue;
          }
          r[o] = Lt(s2, a);
        }
      }
      return r;
    }
    __name(Dl, "Dl");
    function co(t, e) {
      if (t === null) return null;
      if (typeof t == "string" || typeof t == "number" || typeof t == "boolean") return t;
      if (typeof t == "bigint") return { $type: "BigInt", value: String(t) };
      if (We(t)) {
        if (br(t)) return { $type: "DateTime", value: t.toISOString() };
        e.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: e.getSelectionPath(), argumentPath: e.getArgumentPath(), argument: { name: e.getArgumentName(), typeNames: ["Date"] }, underlyingError: "Provided Date object is invalid" });
      }
      if (so(t)) return { $type: "Param", value: t.name };
      if (et(t)) return { $type: "FieldRef", value: { _ref: t.name, _container: t.modelName } };
      if (Array.isArray(t)) return Ol(t, e);
      if (ArrayBuffer.isView(t)) {
        let { buffer: r, byteOffset: n, byteLength: i } = t;
        return { $type: "Bytes", value: h.from(r, n, i).toString("base64") };
      }
      if (kl(t)) return t.values;
      if (Ke(t)) return { $type: "Decimal", value: t.toFixed() };
      if (t instanceof ve) {
        if (t !== Ar.instances[t._getName()]) throw new Error("Invalid ObjectEnumValue");
        return { $type: "Enum", value: t._getName() };
      }
      if (_l(t)) return t.toJSON();
      if (typeof t == "object") return po(t, e);
      e.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: e.getSelectionPath(), argumentPath: e.getArgumentPath(), argument: { name: e.getArgumentName(), typeNames: [] }, underlyingError: `We could not serialize ${Object.prototype.toString.call(t)} value. Serialize the object to JSON or implement a ".toJSON()" method on it` });
    }
    __name(co, "co");
    function po(t, e) {
      if (t.$type) return { $type: "Raw", value: t };
      let r = {};
      for (let n in t) {
        let i = t[n], o = e.nestArgument(n);
        he(i) || (i !== void 0 ? r[n] = co(i, o) : e.isPreviewFeatureOn("strictUndefinedChecks") && e.throwValidationError({ kind: "InvalidArgumentValue", argumentPath: o.getArgumentPath(), selectionPath: e.getSelectionPath(), argument: { name: e.getArgumentName(), typeNames: [] }, underlyingError: uo }));
      }
      return r;
    }
    __name(po, "po");
    function Ol(t, e) {
      let r = [];
      for (let n = 0; n < t.length; n++) {
        let i = e.nestArgument(String(n)), o = t[n];
        if (o === void 0 || he(o)) {
          let s2 = o === void 0 ? "undefined" : "Prisma.skip";
          e.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: i.getSelectionPath(), argumentPath: i.getArgumentPath(), argument: { name: `${e.getArgumentName()}[${n}]`, typeNames: [] }, underlyingError: `Can not use \`${s2}\` value within array. Use \`null\` or filter out \`${s2}\` values` });
        }
        r.push(co(o, i));
      }
      return r;
    }
    __name(Ol, "Ol");
    function kl(t) {
      return typeof t == "object" && t !== null && t.__prismaRawParameters__ === true;
    }
    __name(kl, "kl");
    function _l(t) {
      return typeof t == "object" && t !== null && typeof t.toJSON == "function";
    }
    __name(_l, "_l");
    function Tn(t, e) {
      t === void 0 && e.isPreviewFeatureOn("strictUndefinedChecks") && e.throwValidationError({ kind: "InvalidSelectionValue", selectionPath: e.getSelectionPath(), underlyingError: uo });
    }
    __name(Tn, "Tn");
    var Pn = class t {
      static {
        __name(this, "t");
      }
      constructor(e) {
        this.params = e;
        this.params.modelName && (this.modelOrType = this.params.runtimeDataModel.models[this.params.modelName] ?? this.params.runtimeDataModel.types[this.params.modelName]);
      }
      modelOrType;
      throwValidationError(e) {
        Ir({ errors: [e], originalMethod: this.params.originalMethod, args: this.params.rootArgs ?? {}, callsite: this.params.callsite, errorFormat: this.params.errorFormat, clientVersion: this.params.clientVersion, globalOmit: this.params.globalOmit });
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
        if (!(!this.params.modelName || !this.modelOrType)) return { name: this.params.modelName, fields: this.modelOrType.fields.map((e) => ({ name: e.name, typeName: "boolean", isRelation: e.kind === "object" })) };
      }
      isRawAction() {
        return ["executeRaw", "queryRaw", "runCommandRaw", "findRaw", "aggregateRaw"].includes(this.params.action);
      }
      isPreviewFeatureOn(e) {
        return this.params.previewFeatures.includes(e);
      }
      getComputedFields() {
        if (this.params.modelName) return this.params.extensions.getAllComputedFields(this.params.modelName);
      }
      findField(e) {
        return this.modelOrType?.fields.find((r) => r.name === e);
      }
      nestSelection(e) {
        let r = this.findField(e), n = r?.kind === "object" ? r.type : void 0;
        return new t({ ...this.params, modelName: n, selectionPath: this.params.selectionPath.concat(e) });
      }
      getGlobalOmit() {
        return this.params.modelName && this.shouldApplyGlobalOmit() ? this.params.globalOmit?.[Ce(this.params.modelName)] ?? {} : {};
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
            Fe(this.params.action, "Unknown action");
        }
      }
      nestArgument(e) {
        return new t({ ...this.params, argumentPath: this.params.argumentPath.concat(e) });
      }
    };
    u();
    c();
    p();
    m();
    d();
    l();
    function mo(t) {
      if (!t._hasPreviewFlag("metrics")) throw new Y("`metrics` preview feature must be enabled in order to access metrics API", { clientVersion: t._clientVersion });
    }
    __name(mo, "mo");
    var nt = class {
      static {
        __name(this, "nt");
      }
      _client;
      constructor(e) {
        this._client = e;
      }
      prometheus(e) {
        return mo(this._client), this._client._engine.metrics({ format: "prometheus", ...e });
      }
      json(e) {
        return mo(this._client), this._client._engine.metrics({ format: "json", ...e });
      }
    };
    u();
    c();
    p();
    m();
    d();
    l();
    function fo(t, e) {
      let r = vt(() => Ml(e));
      Object.defineProperty(t, "dmmf", { get: /* @__PURE__ */ __name(() => r.get(), "get") });
    }
    __name(fo, "fo");
    function Ml(t) {
      throw new Error("Prisma.dmmf is not available when running in edge runtimes.");
    }
    __name(Ml, "Ml");
    u();
    c();
    p();
    m();
    d();
    l();
    var Rn = /* @__PURE__ */ new WeakMap();
    var Mr = "$$PrismaTypedSql";
    var Ft = class {
      static {
        __name(this, "Ft");
      }
      constructor(e, r) {
        Rn.set(this, { sql: e, values: r }), Object.defineProperty(this, Mr, { value: Mr });
      }
      get sql() {
        return Rn.get(this).sql;
      }
      get values() {
        return Rn.get(this).values;
      }
    };
    function go(t) {
      return (...e) => new Ft(t, e);
    }
    __name(go, "go");
    function Lr(t) {
      return t != null && t[Mr] === Mr;
    }
    __name(Lr, "Lr");
    u();
    c();
    p();
    m();
    d();
    l();
    var Ls = bt(un());
    u();
    c();
    p();
    m();
    d();
    l();
    yo();
    Ti();
    Si();
    u();
    c();
    p();
    m();
    d();
    l();
    var ne = class t {
      static {
        __name(this, "t");
      }
      constructor(e, r) {
        if (e.length - 1 !== r.length) throw e.length === 0 ? new TypeError("Expected at least 1 string") : new TypeError(`Expected ${e.length} strings to have ${e.length - 1} values`);
        let n = r.reduce((s2, a) => s2 + (a instanceof t ? a.values.length : 1), 0);
        this.values = new Array(n), this.strings = new Array(n + 1), this.strings[0] = e[0];
        let i = 0, o = 0;
        for (; i < r.length; ) {
          let s2 = r[i++], a = e[i];
          if (s2 instanceof t) {
            this.strings[o] += s2.strings[0];
            let f = 0;
            for (; f < s2.values.length; ) this.values[o++] = s2.values[f++], this.strings[o] = s2.strings[f];
            this.strings[o] += a;
          } else this.values[o++] = s2, this.strings[o] = a;
        }
      }
      get sql() {
        let e = this.strings.length, r = 1, n = this.strings[0];
        for (; r < e; ) n += `?${this.strings[r++]}`;
        return n;
      }
      get statement() {
        let e = this.strings.length, r = 1, n = this.strings[0];
        for (; r < e; ) n += `:${r}${this.strings[r++]}`;
        return n;
      }
      get text() {
        let e = this.strings.length, r = 1, n = this.strings[0];
        for (; r < e; ) n += `$${r}${this.strings[r++]}`;
        return n;
      }
      inspect() {
        return { sql: this.sql, statement: this.statement, text: this.text, values: this.values };
      }
    };
    function ho(t, e = ",", r = "", n = "") {
      if (t.length === 0) throw new TypeError("Expected `join([])` to be called with an array of multiple elements, but got an empty array");
      return new ne([r, ...Array(t.length - 1).fill(e), n], t);
    }
    __name(ho, "ho");
    function An(t) {
      return new ne([t], []);
    }
    __name(An, "An");
    var bo = An("");
    function Cn(t, ...e) {
      return new ne(t, e);
    }
    __name(Cn, "Cn");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    function Nt(t) {
      return { getKeys() {
        return Object.keys(t);
      }, getPropertyValue(e) {
        return t[e];
      } };
    }
    __name(Nt, "Nt");
    u();
    c();
    p();
    m();
    d();
    l();
    function Z(t, e) {
      return { getKeys() {
        return [t];
      }, getPropertyValue() {
        return e();
      } };
    }
    __name(Z, "Z");
    u();
    c();
    p();
    m();
    d();
    l();
    function Ne(t) {
      let e = new fe();
      return { getKeys() {
        return t.getKeys();
      }, getPropertyValue(r) {
        return e.getOrCreate(r, () => t.getPropertyValue(r));
      }, getPropertyDescriptor(r) {
        return t.getPropertyDescriptor?.(r);
      } };
    }
    __name(Ne, "Ne");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    var Nr = { enumerable: true, configurable: true, writable: true };
    function Ur(t) {
      let e = new Set(t);
      return { getPrototypeOf: /* @__PURE__ */ __name(() => Object.prototype, "getPrototypeOf"), getOwnPropertyDescriptor: /* @__PURE__ */ __name(() => Nr, "getOwnPropertyDescriptor"), has: /* @__PURE__ */ __name((r, n) => e.has(n), "has"), set: /* @__PURE__ */ __name((r, n, i) => e.add(n) && Reflect.set(r, n, i), "set"), ownKeys: /* @__PURE__ */ __name(() => [...e], "ownKeys") };
    }
    __name(Ur, "Ur");
    var Eo = /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom");
    function ce(t, e) {
      let r = Ll(e), n = /* @__PURE__ */ new Set(), i = new Proxy(t, { get(o, s2) {
        if (n.has(s2)) return o[s2];
        let a = r.get(s2);
        return a ? a.getPropertyValue(s2) : o[s2];
      }, has(o, s2) {
        if (n.has(s2)) return true;
        let a = r.get(s2);
        return a ? a.has?.(s2) ?? true : Reflect.has(o, s2);
      }, ownKeys(o) {
        let s2 = wo(Reflect.ownKeys(o), r), a = wo(Array.from(r.keys()), r);
        return [.../* @__PURE__ */ new Set([...s2, ...a, ...n])];
      }, set(o, s2, a) {
        return r.get(s2)?.getPropertyDescriptor?.(s2)?.writable === false ? false : (n.add(s2), Reflect.set(o, s2, a));
      }, getOwnPropertyDescriptor(o, s2) {
        let a = Reflect.getOwnPropertyDescriptor(o, s2);
        if (a && !a.configurable) return a;
        let f = r.get(s2);
        return f ? f.getPropertyDescriptor ? { ...Nr, ...f?.getPropertyDescriptor(s2) } : Nr : a;
      }, defineProperty(o, s2, a) {
        return n.add(s2), Reflect.defineProperty(o, s2, a);
      }, getPrototypeOf: /* @__PURE__ */ __name(() => Object.prototype, "getPrototypeOf") });
      return i[Eo] = function() {
        let o = { ...this };
        return delete o[Eo], o;
      }, i;
    }
    __name(ce, "ce");
    function Ll(t) {
      let e = /* @__PURE__ */ new Map();
      for (let r of t) {
        let n = r.getKeys();
        for (let i of n) e.set(i, r);
      }
      return e;
    }
    __name(Ll, "Ll");
    function wo(t, e) {
      return t.filter((r) => e.get(r)?.has?.(r) ?? true);
    }
    __name(wo, "wo");
    u();
    c();
    p();
    m();
    d();
    l();
    function it(t) {
      return { getKeys() {
        return t;
      }, has() {
        return false;
      }, getPropertyValue() {
      } };
    }
    __name(it, "it");
    u();
    c();
    p();
    m();
    d();
    l();
    function ot(t, e) {
      return { batch: t, transaction: e?.kind === "batch" ? { isolationLevel: e.options.isolationLevel } : void 0 };
    }
    __name(ot, "ot");
    u();
    c();
    p();
    m();
    d();
    l();
    function xo(t) {
      if (t === void 0) return "";
      let e = tt(t);
      return new He(0, { colors: Tr }).write(e).toString();
    }
    __name(xo, "xo");
    u();
    c();
    p();
    m();
    d();
    l();
    var Fl = "P2037";
    function st({ error: t, user_facing_error: e }, r, n) {
      return e.error_code ? new X(Nl(e, n), { code: e.error_code, clientVersion: r, meta: e.meta, batchRequestIdx: e.batch_request_idx }) : new Q(t, { clientVersion: r, batchRequestIdx: e.batch_request_idx });
    }
    __name(st, "st");
    function Nl(t, e) {
      let r = t.message;
      return (e === "postgresql" || e === "postgres" || e === "mysql") && t.error_code === Fl && (r += `
Prisma Accelerate has built-in connection pooling to prevent such errors: https://pris.ly/client/error-accelerate`), r;
    }
    __name(Nl, "Nl");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    var Sn = class {
      static {
        __name(this, "Sn");
      }
      getLocation() {
        return null;
      }
    };
    function Ie(t) {
      return typeof $EnabledCallSite == "function" && t !== "minimal" ? new $EnabledCallSite() : new Sn();
    }
    __name(Ie, "Ie");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    var Po = { _avg: true, _count: true, _sum: true, _min: true, _max: true };
    function at(t = {}) {
      let e = ql(t);
      return Object.entries(e).reduce((n, [i, o]) => (Po[i] !== void 0 ? n.select[i] = { select: o } : n[i] = o, n), { select: {} });
    }
    __name(at, "at");
    function ql(t = {}) {
      return typeof t._count == "boolean" ? { ...t, _count: { _all: t._count } } : t;
    }
    __name(ql, "ql");
    function qr(t = {}) {
      return (e) => (typeof t._count == "boolean" && (e._count = e._count._all), e);
    }
    __name(qr, "qr");
    function To(t, e) {
      let r = qr(t);
      return e({ action: "aggregate", unpacker: r, argsMapper: at })(t);
    }
    __name(To, "To");
    u();
    c();
    p();
    m();
    d();
    l();
    function Vl(t = {}) {
      let { select: e, ...r } = t;
      return typeof e == "object" ? at({ ...r, _count: e }) : at({ ...r, _count: { _all: true } });
    }
    __name(Vl, "Vl");
    function Bl(t = {}) {
      return typeof t.select == "object" ? (e) => qr(t)(e)._count : (e) => qr(t)(e)._count._all;
    }
    __name(Bl, "Bl");
    function vo(t, e) {
      return e({ action: "count", unpacker: Bl(t), argsMapper: Vl })(t);
    }
    __name(vo, "vo");
    u();
    c();
    p();
    m();
    d();
    l();
    function $l(t = {}) {
      let e = at(t);
      if (Array.isArray(e.by)) for (let r of e.by) typeof r == "string" && (e.select[r] = true);
      else typeof e.by == "string" && (e.select[e.by] = true);
      return e;
    }
    __name($l, "$l");
    function jl(t = {}) {
      return (e) => (typeof t?._count == "boolean" && e.forEach((r) => {
        r._count = r._count._all;
      }), e);
    }
    __name(jl, "jl");
    function Ro(t, e) {
      return e({ action: "groupBy", unpacker: jl(t), argsMapper: $l })(t);
    }
    __name(Ro, "Ro");
    function Ao(t, e, r) {
      if (e === "aggregate") return (n) => To(n, r);
      if (e === "count") return (n) => vo(n, r);
      if (e === "groupBy") return (n) => Ro(n, r);
    }
    __name(Ao, "Ao");
    u();
    c();
    p();
    m();
    d();
    l();
    function Co(t, e) {
      let r = e.fields.filter((i) => !i.relationName), n = Ni(r, "name");
      return new Proxy({}, { get(i, o) {
        if (o in i || typeof o == "symbol") return i[o];
        let s2 = n[o];
        if (s2) return new It(t, o, s2.type, s2.isList, s2.kind === "enum");
      }, ...Ur(Object.keys(n)) });
    }
    __name(Co, "Co");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    var So = /* @__PURE__ */ __name((t) => Array.isArray(t) ? t : t.split("."), "So");
    var In = /* @__PURE__ */ __name((t, e) => So(e).reduce((r, n) => r && r[n], t), "In");
    var Io = /* @__PURE__ */ __name((t, e, r) => So(e).reduceRight((n, i, o, s2) => Object.assign({}, In(t, s2.slice(0, o)), { [i]: n }), r), "Io");
    function Ql(t, e) {
      return t === void 0 || e === void 0 ? [] : [...e, "select", t];
    }
    __name(Ql, "Ql");
    function Gl(t, e, r) {
      return e === void 0 ? t ?? {} : Io(e, r, t || true);
    }
    __name(Gl, "Gl");
    function Dn(t, e, r, n, i, o) {
      let a = t._runtimeDataModel.models[e].fields.reduce((f, v) => ({ ...f, [v.name]: v }), {});
      return (f) => {
        let v = Ie(t._errorFormat), R = Ql(n, i), A = Gl(f, o, R), I2 = r({ dataPath: R, callsite: v })(A), C = Jl(t, e);
        return new Proxy(I2, { get(L2, D2) {
          if (!C.includes(D2)) return L2[D2];
          let Ee = [a[D2].type, r, D2], ee = [R, A];
          return Dn(t, ...Ee, ...ee);
        }, ...Ur([...C, ...Object.getOwnPropertyNames(I2)]) });
      };
    }
    __name(Dn, "Dn");
    function Jl(t, e) {
      return t._runtimeDataModel.models[e].fields.filter((r) => r.kind === "object").map((r) => r.name);
    }
    __name(Jl, "Jl");
    var Wl = ["findUnique", "findUniqueOrThrow", "findFirst", "findFirstOrThrow", "create", "update", "upsert", "delete"];
    var Kl = ["aggregate", "count", "groupBy"];
    function On(t, e) {
      let r = t._extensions.getAllModelExtensions(e) ?? {}, n = [Hl(t, e), Yl(t, e), Nt(r), Z("name", () => e), Z("$name", () => e), Z("$parent", () => t._appliedParent)];
      return ce({}, n);
    }
    __name(On, "On");
    function Hl(t, e) {
      let r = ye(e), n = Object.keys(Rt).concat("count");
      return { getKeys() {
        return n;
      }, getPropertyValue(i) {
        let o = i, s2 = /* @__PURE__ */ __name((a) => (f) => {
          let v = Ie(t._errorFormat);
          return t._createPrismaPromise((R) => {
            let A = { args: f, dataPath: [], action: o, model: e, clientMethod: `${r}.${i}`, jsModelName: r, transaction: R, callsite: v };
            return t._request({ ...A, ...a });
          }, { action: o, args: f, model: e });
        }, "s");
        return Wl.includes(o) ? Dn(t, e, s2) : zl(i) ? Ao(t, i, s2) : s2({});
      } };
    }
    __name(Hl, "Hl");
    function zl(t) {
      return Kl.includes(t);
    }
    __name(zl, "zl");
    function Yl(t, e) {
      return Ne(Z("fields", () => {
        let r = t._runtimeDataModel.models[e];
        return Co(e, r);
      }));
    }
    __name(Yl, "Yl");
    u();
    c();
    p();
    m();
    d();
    l();
    function Do(t) {
      return t.replace(/^./, (e) => e.toUpperCase());
    }
    __name(Do, "Do");
    var kn = /* @__PURE__ */ Symbol();
    function Ut(t) {
      let e = [Xl(t), Zl(t), Z(kn, () => t), Z("$parent", () => t._appliedParent)], r = t._extensions.getAllClientExtensions();
      return r && e.push(Nt(r)), ce(t, e);
    }
    __name(Ut, "Ut");
    function Xl(t) {
      let e = Object.getPrototypeOf(t._originalClient), r = [...new Set(Object.getOwnPropertyNames(e))];
      return { getKeys() {
        return r;
      }, getPropertyValue(n) {
        return t[n];
      } };
    }
    __name(Xl, "Xl");
    function Zl(t) {
      let e = Object.keys(t._runtimeDataModel.models), r = e.map(ye), n = [...new Set(e.concat(r))];
      return Ne({ getKeys() {
        return n;
      }, getPropertyValue(i) {
        let o = Do(i);
        if (t._runtimeDataModel.models[o] !== void 0) return On(t, o);
        if (t._runtimeDataModel.models[i] !== void 0) return On(t, i);
      }, getPropertyDescriptor(i) {
        if (!r.includes(i)) return { enumerable: false };
      } });
    }
    __name(Zl, "Zl");
    function Oo(t) {
      return t[kn] ? t[kn] : t;
    }
    __name(Oo, "Oo");
    function ko(t) {
      if (typeof t == "function") return t(this);
      if (t.client?.__AccelerateEngine) {
        let r = t.client.__AccelerateEngine;
        this._originalClient._engine = new r(this._originalClient._accelerateEngineConfig);
      }
      let e = Object.create(this._originalClient, { _extensions: { value: this._extensions.append(t) }, _appliedParent: { value: this, configurable: true }, $on: { value: void 0 } });
      return Ut(e);
    }
    __name(ko, "ko");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    function _o({ result: t, modelName: e, select: r, omit: n, extensions: i }) {
      let o = i.getAllComputedFields(e);
      if (!o) return t;
      let s2 = [], a = [];
      for (let f of Object.values(o)) {
        if (n) {
          if (n[f.name]) continue;
          let v = f.needs.filter((R) => n[R]);
          v.length > 0 && a.push(it(v));
        } else if (r) {
          if (!r[f.name]) continue;
          let v = f.needs.filter((R) => !r[R]);
          v.length > 0 && a.push(it(v));
        }
        eu(t, f.needs) && s2.push(tu(f, ce(t, s2)));
      }
      return s2.length > 0 || a.length > 0 ? ce(t, [...s2, ...a]) : t;
    }
    __name(_o, "_o");
    function eu(t, e) {
      return e.every((r) => fn(t, r));
    }
    __name(eu, "eu");
    function tu(t, e) {
      return Ne(Z(t.name, () => t.compute(e)));
    }
    __name(tu, "tu");
    u();
    c();
    p();
    m();
    d();
    l();
    function Vr({ visitor: t, result: e, args: r, runtimeDataModel: n, modelName: i }) {
      if (Array.isArray(e)) {
        for (let s2 = 0; s2 < e.length; s2++) e[s2] = Vr({ result: e[s2], args: r, modelName: i, runtimeDataModel: n, visitor: t });
        return e;
      }
      let o = t(e, i, r) ?? e;
      return r.include && Mo({ includeOrSelect: r.include, result: o, parentModelName: i, runtimeDataModel: n, visitor: t }), r.select && Mo({ includeOrSelect: r.select, result: o, parentModelName: i, runtimeDataModel: n, visitor: t }), o;
    }
    __name(Vr, "Vr");
    function Mo({ includeOrSelect: t, result: e, parentModelName: r, runtimeDataModel: n, visitor: i }) {
      for (let [o, s2] of Object.entries(t)) {
        if (!s2 || e[o] == null || he(s2)) continue;
        let f = n.models[r].fields.find((R) => R.name === o);
        if (!f || f.kind !== "object" || !f.relationName) continue;
        let v = typeof s2 == "object" ? s2 : {};
        e[o] = Vr({ visitor: i, result: e[o], args: v, modelName: f.type, runtimeDataModel: n });
      }
    }
    __name(Mo, "Mo");
    function Lo({ result: t, modelName: e, args: r, extensions: n, runtimeDataModel: i, globalOmit: o }) {
      return n.isEmpty() || t == null || typeof t != "object" || !i.models[e] ? t : Vr({ result: t, args: r ?? {}, modelName: e, runtimeDataModel: i, visitor: /* @__PURE__ */ __name((a, f, v) => {
        let R = ye(f);
        return _o({ result: a, modelName: R, select: v.select, omit: v.select ? void 0 : { ...o?.[R], ...v.omit }, extensions: n });
      }, "visitor") });
    }
    __name(Lo, "Lo");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    var ru = ["$connect", "$disconnect", "$on", "$transaction", "$extends"];
    var Fo = ru;
    function No(t) {
      if (t instanceof ne) return nu(t);
      if (Lr(t)) return iu(t);
      if (Array.isArray(t)) {
        let r = [t[0]];
        for (let n = 1; n < t.length; n++) r[n] = qt(t[n]);
        return r;
      }
      let e = {};
      for (let r in t) e[r] = qt(t[r]);
      return e;
    }
    __name(No, "No");
    function nu(t) {
      return new ne(t.strings, t.values);
    }
    __name(nu, "nu");
    function iu(t) {
      return new Ft(t.sql, t.values);
    }
    __name(iu, "iu");
    function qt(t) {
      if (typeof t != "object" || t == null || t instanceof ve || et(t)) return t;
      if (Ke(t)) return new xe(t.toFixed());
      if (We(t)) return /* @__PURE__ */ new Date(+t);
      if (ArrayBuffer.isView(t)) return t.slice(0);
      if (Array.isArray(t)) {
        let e = t.length, r;
        for (r = Array(e); e--; ) r[e] = qt(t[e]);
        return r;
      }
      if (typeof t == "object") {
        let e = {};
        for (let r in t) r === "__proto__" ? Object.defineProperty(e, r, { value: qt(t[r]), configurable: true, enumerable: true, writable: true }) : e[r] = qt(t[r]);
        return e;
      }
      Fe(t, "Unknown value");
    }
    __name(qt, "qt");
    function qo(t, e, r, n = 0) {
      return t._createPrismaPromise((i) => {
        let o = e.customDataProxyFetch;
        return "transaction" in e && i !== void 0 && (e.transaction?.kind === "batch" && e.transaction.lock.then(), e.transaction = i), n === r.length ? t._executeRequest(e) : r[n]({ model: e.model, operation: e.model ? e.action : e.clientMethod, args: No(e.args ?? {}), __internalParams: e, query: /* @__PURE__ */ __name((s2, a = e) => {
          let f = a.customDataProxyFetch;
          return a.customDataProxyFetch = jo(o, f), a.args = s2, qo(t, a, r, n + 1);
        }, "query") });
      });
    }
    __name(qo, "qo");
    function Vo(t, e) {
      let { jsModelName: r, action: n, clientMethod: i } = e, o = r ? n : i;
      if (t._extensions.isEmpty()) return t._executeRequest(e);
      let s2 = t._extensions.getAllQueryCallbacks(r ?? "$none", o);
      return qo(t, e, s2);
    }
    __name(Vo, "Vo");
    function Bo(t) {
      return (e) => {
        let r = { requests: e }, n = e[0].extensions.getAllBatchQueryCallbacks();
        return n.length ? $o(r, n, 0, t) : t(r);
      };
    }
    __name(Bo, "Bo");
    function $o(t, e, r, n) {
      if (r === e.length) return n(t);
      let i = t.customDataProxyFetch, o = t.requests[0].transaction;
      return e[r]({ args: { queries: t.requests.map((s2) => ({ model: s2.modelName, operation: s2.action, args: s2.args })), transaction: o ? { isolationLevel: o.kind === "batch" ? o.isolationLevel : void 0 } : void 0 }, __internalParams: t, query(s2, a = t) {
        let f = a.customDataProxyFetch;
        return a.customDataProxyFetch = jo(i, f), $o(a, e, r + 1, n);
      } });
    }
    __name($o, "$o");
    var Uo = /* @__PURE__ */ __name((t) => t, "Uo");
    function jo(t = Uo, e = Uo) {
      return (r) => t(e(r));
    }
    __name(jo, "jo");
    u();
    c();
    p();
    m();
    d();
    l();
    var Qo = j("prisma:client");
    var Go = { Vercel: "vercel", "Netlify CI": "netlify" };
    function Jo({ postinstall: t, ciName: e, clientVersion: r, generator: n }) {
      if (Qo("checkPlatformCaching:postinstall", t), Qo("checkPlatformCaching:ciName", e), t === true && !(n?.output && typeof (n.output.fromEnvVar ?? n.output.value) == "string") && e && e in Go) {
        let i = `Prisma has detected that this project was built on ${e}, which caches dependencies. This leads to an outdated Prisma Client because Prisma's auto-generation isn't triggered. To fix this, make sure to run the \`prisma generate\` command during the build process.

Learn how: https://pris.ly/d/${Go[e]}-build`;
        throw console.error(i), new M(i, r);
      }
    }
    __name(Jo, "Jo");
    u();
    c();
    p();
    m();
    d();
    l();
    function Wo(t, e) {
      return t ? t.datasources ? t.datasources : t.datasourceUrl ? { [e[0]]: { url: t.datasourceUrl } } : {} : {};
    }
    __name(Wo, "Wo");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    l();
    function Ko(t, e) {
      throw new Error(e);
    }
    __name(Ko, "Ko");
    function ou(t) {
      return t !== null && typeof t == "object" && typeof t.$type == "string";
    }
    __name(ou, "ou");
    function su(t, e) {
      let r = {};
      for (let n of Object.keys(t)) r[n] = e(t[n], n);
      return r;
    }
    __name(su, "su");
    function lt(t) {
      return t === null ? t : Array.isArray(t) ? t.map(lt) : typeof t == "object" ? ou(t) ? au(t) : t.constructor !== null && t.constructor.name !== "Object" ? t : su(t, lt) : t;
    }
    __name(lt, "lt");
    function au({ $type: t, value: e }) {
      switch (t) {
        case "BigInt":
          return BigInt(e);
        case "Bytes": {
          let { buffer: r, byteOffset: n, byteLength: i } = h.from(e, "base64");
          return new Uint8Array(r, n, i);
        }
        case "DateTime":
          return new Date(e);
        case "Decimal":
          return new P2(e);
        case "Json":
          return JSON.parse(e);
        default:
          Ko(e, "Unknown tagged value");
      }
    }
    __name(au, "au");
    var Ho = "6.19.3";
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    var uu = /* @__PURE__ */ __name(() => globalThis.process?.release?.name === "node", "uu");
    var cu = /* @__PURE__ */ __name(() => !!globalThis.Bun || !!globalThis.process?.versions?.bun, "cu");
    var pu = /* @__PURE__ */ __name(() => !!globalThis.Deno, "pu");
    var mu = /* @__PURE__ */ __name(() => typeof globalThis.Netlify == "object", "mu");
    var du = /* @__PURE__ */ __name(() => typeof globalThis.EdgeRuntime == "object", "du");
    var fu = /* @__PURE__ */ __name(() => globalThis.navigator?.userAgent === "Cloudflare-Workers", "fu");
    function gu() {
      return [[mu, "netlify"], [du, "edge-light"], [fu, "workerd"], [pu, "deno"], [cu, "bun"], [uu, "node"]].flatMap((r) => r[0]() ? [r[1]] : []).at(0) ?? "";
    }
    __name(gu, "gu");
    var yu = { node: "Node.js", workerd: "Cloudflare Workers", deno: "Deno and Deno Deploy", netlify: "Netlify Edge Functions", "edge-light": "Edge Runtime (Vercel Edge Functions, Vercel Edge Middleware, Next.js (Pages Router) Edge API Routes, Next.js (App Router) Edge Route Handlers or Next.js Middleware)" };
    function ut() {
      let t = gu();
      return { id: t, prettyName: yu[t] || t, isEdge: ["workerd", "deno", "netlify", "edge-light"].includes(t) };
    }
    __name(ut, "ut");
    function ct({ inlineDatasources: t, overrideDatasources: e, env: r, clientVersion: n }) {
      let i, o = Object.keys(t)[0], s2 = t[o]?.url, a = e[o]?.url;
      if (o === void 0 ? i = void 0 : a ? i = a : s2?.value ? i = s2.value : s2?.fromEnvVar && (i = r[s2.fromEnvVar]), s2?.fromEnvVar !== void 0 && i === void 0) throw ut().id === "workerd" ? new M(`error: Environment variable not found: ${s2.fromEnvVar}.

In Cloudflare module Workers, environment variables are available only in the Worker's \`env\` parameter of \`fetch\`.
To solve this, provide the connection string directly: https://pris.ly/d/cloudflare-datasource-url`, n) : new M(`error: Environment variable not found: ${s2.fromEnvVar}.`, n);
      if (i === void 0) throw new M("error: Missing URL environment variable, value, or override.", n);
      return i;
    }
    __name(ct, "ct");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    var Br = class extends Error {
      static {
        __name(this, "Br");
      }
      clientVersion;
      cause;
      constructor(e, r) {
        super(e), this.clientVersion = r.clientVersion, this.cause = r.cause;
      }
      get [Symbol.toStringTag]() {
        return this.name;
      }
    };
    var ie = class extends Br {
      static {
        __name(this, "ie");
      }
      isRetryable;
      constructor(e, r) {
        super(e, r), this.isRetryable = r.isRetryable ?? true;
      }
    };
    u();
    c();
    p();
    m();
    d();
    l();
    function _2(t, e) {
      return { ...t, isRetryable: e };
    }
    __name(_2, "_");
    var Ue = class extends ie {
      static {
        __name(this, "Ue");
      }
      name = "InvalidDatasourceError";
      code = "P6001";
      constructor(e, r) {
        super(e, _2(r, false));
      }
    };
    O(Ue, "InvalidDatasourceError");
    function zo(t) {
      let e = { clientVersion: t.clientVersion }, r = Object.keys(t.inlineDatasources)[0], n = ct({ inlineDatasources: t.inlineDatasources, overrideDatasources: t.overrideDatasources, clientVersion: t.clientVersion, env: { ...t.env, ...typeof g < "u" ? g.env : {} } }), i;
      try {
        i = new URL(n);
      } catch {
        throw new Ue(`Error validating datasource \`${r}\`: the URL must start with the protocol \`prisma://\``, e);
      }
      let { protocol: o, searchParams: s2 } = i;
      if (o !== "prisma:" && o !== fr) throw new Ue(`Error validating datasource \`${r}\`: the URL must start with the protocol \`prisma://\` or \`prisma+postgres://\``, e);
      let a = s2.get("api_key");
      if (a === null || a.length < 1) throw new Ue(`Error validating datasource \`${r}\`: the URL must contain a valid API key`, e);
      let f = cn(i) ? "http:" : "https:";
      g.env.TEST_CLIENT_ENGINE_REMOTE_EXECUTOR && i.searchParams.has("use_http") && (f = "http:");
      let v = new URL(i.href.replace(o, f));
      return { apiKey: a, url: v };
    }
    __name(zo, "zo");
    u();
    c();
    p();
    m();
    d();
    l();
    var Yo = bt(Di());
    var $r = class {
      static {
        __name(this, "$r");
      }
      apiKey;
      tracingHelper;
      logLevel;
      logQueries;
      engineHash;
      constructor({ apiKey: e, tracingHelper: r, logLevel: n, logQueries: i, engineHash: o }) {
        this.apiKey = e, this.tracingHelper = r, this.logLevel = n, this.logQueries = i, this.engineHash = o;
      }
      build({ traceparent: e, transactionId: r } = {}) {
        let n = { Accept: "application/json", Authorization: `Bearer ${this.apiKey}`, "Content-Type": "application/json", "Prisma-Engine-Hash": this.engineHash, "Prisma-Engine-Version": Yo.enginesVersion };
        this.tracingHelper.isEnabled() && (n.traceparent = e ?? this.tracingHelper.getTraceParent()), r && (n["X-Transaction-Id"] = r);
        let i = this.#e();
        return i.length > 0 && (n["X-Capture-Telemetry"] = i.join(", ")), n;
      }
      #e() {
        let e = [];
        return this.tracingHelper.isEnabled() && e.push("tracing"), this.logLevel && e.push(this.logLevel), this.logQueries && e.push("query"), e;
      }
    };
    u();
    c();
    p();
    m();
    d();
    l();
    function hu(t) {
      return t[0] * 1e3 + t[1] / 1e6;
    }
    __name(hu, "hu");
    function _n(t) {
      return new Date(hu(t));
    }
    __name(_n, "_n");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    var pt = class extends ie {
      static {
        __name(this, "pt");
      }
      name = "ForcedRetryError";
      code = "P5001";
      constructor(e) {
        super("This request must be retried", _2(e, true));
      }
    };
    O(pt, "ForcedRetryError");
    u();
    c();
    p();
    m();
    d();
    l();
    var qe = class extends ie {
      static {
        __name(this, "qe");
      }
      name = "NotImplementedYetError";
      code = "P5004";
      constructor(e, r) {
        super(e, _2(r, false));
      }
    };
    O(qe, "NotImplementedYetError");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    var V = class extends ie {
      static {
        __name(this, "V");
      }
      response;
      constructor(e, r) {
        super(e, r), this.response = r.response;
        let n = this.response.headers.get("prisma-request-id");
        if (n) {
          let i = `(The request id was: ${n})`;
          this.message = this.message + " " + i;
        }
      }
    };
    var Ve = class extends V {
      static {
        __name(this, "Ve");
      }
      name = "SchemaMissingError";
      code = "P5005";
      constructor(e) {
        super("Schema needs to be uploaded", _2(e, true));
      }
    };
    O(Ve, "SchemaMissingError");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    var Mn = "This request could not be understood by the server";
    var Vt = class extends V {
      static {
        __name(this, "Vt");
      }
      name = "BadRequestError";
      code = "P5000";
      constructor(e, r, n) {
        super(r || Mn, _2(e, false)), n && (this.code = n);
      }
    };
    O(Vt, "BadRequestError");
    u();
    c();
    p();
    m();
    d();
    l();
    var Bt = class extends V {
      static {
        __name(this, "Bt");
      }
      name = "HealthcheckTimeoutError";
      code = "P5013";
      logs;
      constructor(e, r) {
        super("Engine not started: healthcheck timeout", _2(e, true)), this.logs = r;
      }
    };
    O(Bt, "HealthcheckTimeoutError");
    u();
    c();
    p();
    m();
    d();
    l();
    var $t = class extends V {
      static {
        __name(this, "$t");
      }
      name = "EngineStartupError";
      code = "P5014";
      logs;
      constructor(e, r, n) {
        super(r, _2(e, true)), this.logs = n;
      }
    };
    O($t, "EngineStartupError");
    u();
    c();
    p();
    m();
    d();
    l();
    var jt = class extends V {
      static {
        __name(this, "jt");
      }
      name = "EngineVersionNotSupportedError";
      code = "P5012";
      constructor(e) {
        super("Engine version is not supported", _2(e, false));
      }
    };
    O(jt, "EngineVersionNotSupportedError");
    u();
    c();
    p();
    m();
    d();
    l();
    var Ln = "Request timed out";
    var Qt = class extends V {
      static {
        __name(this, "Qt");
      }
      name = "GatewayTimeoutError";
      code = "P5009";
      constructor(e, r = Ln) {
        super(r, _2(e, false));
      }
    };
    O(Qt, "GatewayTimeoutError");
    u();
    c();
    p();
    m();
    d();
    l();
    var bu = "Interactive transaction error";
    var Gt = class extends V {
      static {
        __name(this, "Gt");
      }
      name = "InteractiveTransactionError";
      code = "P5015";
      constructor(e, r = bu) {
        super(r, _2(e, false));
      }
    };
    O(Gt, "InteractiveTransactionError");
    u();
    c();
    p();
    m();
    d();
    l();
    var Eu = "Request parameters are invalid";
    var Jt = class extends V {
      static {
        __name(this, "Jt");
      }
      name = "InvalidRequestError";
      code = "P5011";
      constructor(e, r = Eu) {
        super(r, _2(e, false));
      }
    };
    O(Jt, "InvalidRequestError");
    u();
    c();
    p();
    m();
    d();
    l();
    var Fn = "Requested resource does not exist";
    var Wt = class extends V {
      static {
        __name(this, "Wt");
      }
      name = "NotFoundError";
      code = "P5003";
      constructor(e, r = Fn) {
        super(r, _2(e, false));
      }
    };
    O(Wt, "NotFoundError");
    u();
    c();
    p();
    m();
    d();
    l();
    var Nn = "Unknown server error";
    var mt = class extends V {
      static {
        __name(this, "mt");
      }
      name = "ServerError";
      code = "P5006";
      logs;
      constructor(e, r, n) {
        super(r || Nn, _2(e, true)), this.logs = n;
      }
    };
    O(mt, "ServerError");
    u();
    c();
    p();
    m();
    d();
    l();
    var Un = "Unauthorized, check your connection string";
    var Kt = class extends V {
      static {
        __name(this, "Kt");
      }
      name = "UnauthorizedError";
      code = "P5007";
      constructor(e, r = Un) {
        super(r, _2(e, false));
      }
    };
    O(Kt, "UnauthorizedError");
    u();
    c();
    p();
    m();
    d();
    l();
    var qn = "Usage exceeded, retry again later";
    var Ht = class extends V {
      static {
        __name(this, "Ht");
      }
      name = "UsageExceededError";
      code = "P5008";
      constructor(e, r = qn) {
        super(r, _2(e, true));
      }
    };
    O(Ht, "UsageExceededError");
    async function wu(t) {
      let e;
      try {
        e = await t.text();
      } catch {
        return { type: "EmptyError" };
      }
      try {
        let r = JSON.parse(e);
        if (typeof r == "string") switch (r) {
          case "InternalDataProxyError":
            return { type: "DataProxyError", body: r };
          default:
            return { type: "UnknownTextError", body: r };
        }
        if (typeof r == "object" && r !== null) {
          if ("is_panic" in r && "message" in r && "error_code" in r) return { type: "QueryEngineError", body: r };
          if ("EngineNotStarted" in r || "InteractiveTransactionMisrouted" in r || "InvalidRequestError" in r) {
            let n = Object.values(r)[0].reason;
            return typeof n == "string" && !["SchemaMissing", "EngineVersionNotSupported"].includes(n) ? { type: "UnknownJsonError", body: r } : { type: "DataProxyError", body: r };
          }
        }
        return { type: "UnknownJsonError", body: r };
      } catch {
        return e === "" ? { type: "EmptyError" } : { type: "UnknownTextError", body: e };
      }
    }
    __name(wu, "wu");
    async function zt(t, e) {
      if (t.ok) return;
      let r = { clientVersion: e, response: t }, n = await wu(t);
      if (n.type === "QueryEngineError") throw new X(n.body.message, { code: n.body.error_code, clientVersion: e });
      if (n.type === "DataProxyError") {
        if (n.body === "InternalDataProxyError") throw new mt(r, "Internal Data Proxy error");
        if ("EngineNotStarted" in n.body) {
          if (n.body.EngineNotStarted.reason === "SchemaMissing") return new Ve(r);
          if (n.body.EngineNotStarted.reason === "EngineVersionNotSupported") throw new jt(r);
          if ("EngineStartupError" in n.body.EngineNotStarted.reason) {
            let { msg: i, logs: o } = n.body.EngineNotStarted.reason.EngineStartupError;
            throw new $t(r, i, o);
          }
          if ("KnownEngineStartupError" in n.body.EngineNotStarted.reason) {
            let { msg: i, error_code: o } = n.body.EngineNotStarted.reason.KnownEngineStartupError;
            throw new M(i, e, o);
          }
          if ("HealthcheckTimeout" in n.body.EngineNotStarted.reason) {
            let { logs: i } = n.body.EngineNotStarted.reason.HealthcheckTimeout;
            throw new Bt(r, i);
          }
        }
        if ("InteractiveTransactionMisrouted" in n.body) {
          let i = { IDParseError: "Could not parse interactive transaction ID", NoQueryEngineFoundError: "Could not find Query Engine for the specified host and transaction ID", TransactionStartError: "Could not start interactive transaction" };
          throw new Gt(r, i[n.body.InteractiveTransactionMisrouted.reason]);
        }
        if ("InvalidRequestError" in n.body) throw new Jt(r, n.body.InvalidRequestError.reason);
      }
      if (t.status === 401 || t.status === 403) throw new Kt(r, dt(Un, n));
      if (t.status === 404) return new Wt(r, dt(Fn, n));
      if (t.status === 429) throw new Ht(r, dt(qn, n));
      if (t.status === 504) throw new Qt(r, dt(Ln, n));
      if (t.status >= 500) throw new mt(r, dt(Nn, n));
      if (t.status >= 400) throw new Vt(r, dt(Mn, n));
    }
    __name(zt, "zt");
    function dt(t, e) {
      return e.type === "EmptyError" ? t : `${t}: ${JSON.stringify(e)}`;
    }
    __name(dt, "dt");
    u();
    c();
    p();
    m();
    d();
    l();
    function Xo(t) {
      let e = Math.pow(2, t) * 50, r = Math.ceil(Math.random() * e) - Math.ceil(e / 2), n = e + r;
      return new Promise((i) => setTimeout(() => i(n), n));
    }
    __name(Xo, "Xo");
    u();
    c();
    p();
    m();
    d();
    l();
    var Re = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    function Zo(t) {
      let e = new TextEncoder().encode(t), r = "", n = e.byteLength, i = n % 3, o = n - i, s2, a, f, v, R;
      for (let A = 0; A < o; A = A + 3) R = e[A] << 16 | e[A + 1] << 8 | e[A + 2], s2 = (R & 16515072) >> 18, a = (R & 258048) >> 12, f = (R & 4032) >> 6, v = R & 63, r += Re[s2] + Re[a] + Re[f] + Re[v];
      return i == 1 ? (R = e[o], s2 = (R & 252) >> 2, a = (R & 3) << 4, r += Re[s2] + Re[a] + "==") : i == 2 && (R = e[o] << 8 | e[o + 1], s2 = (R & 64512) >> 10, a = (R & 1008) >> 4, f = (R & 15) << 2, r += Re[s2] + Re[a] + Re[f] + "="), r;
    }
    __name(Zo, "Zo");
    u();
    c();
    p();
    m();
    d();
    l();
    function es(t) {
      if (!!t.generator?.previewFeatures.some((r) => r.toLowerCase().includes("metrics"))) throw new M("The `metrics` preview feature is not yet available with Accelerate.\nPlease remove `metrics` from the `previewFeatures` in your schema.\n\nMore information about Accelerate: https://pris.ly/d/accelerate", t.clientVersion);
    }
    __name(es, "es");
    u();
    c();
    p();
    m();
    d();
    l();
    var ts = { "@prisma/debug": "workspace:*", "@prisma/engines-version": "7.1.1-3.c2990dca591cba766e3b7ef5d9e8a84796e47ab7", "@prisma/fetch-engine": "workspace:*", "@prisma/get-platform": "workspace:*" };
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    var Yt = class extends ie {
      static {
        __name(this, "Yt");
      }
      name = "RequestError";
      code = "P5010";
      constructor(e, r) {
        super(`Cannot fetch data from service:
${e}`, _2(r, true));
      }
    };
    O(Yt, "RequestError");
    async function Be(t, e, r = (n) => n) {
      let { clientVersion: n, ...i } = e, o = r(fetch);
      try {
        return await o(t, i);
      } catch (s2) {
        let a = s2.message ?? "Unknown error";
        throw new Yt(a, { clientVersion: n, cause: s2 });
      }
    }
    __name(Be, "Be");
    var Pu = /^[1-9][0-9]*\.[0-9]+\.[0-9]+$/;
    var rs = j("prisma:client:dataproxyEngine");
    async function Tu(t, e) {
      let r = ts["@prisma/engines-version"], n = e.clientVersion ?? "unknown";
      if (g.env.PRISMA_CLIENT_DATA_PROXY_CLIENT_VERSION || globalThis.PRISMA_CLIENT_DATA_PROXY_CLIENT_VERSION) return g.env.PRISMA_CLIENT_DATA_PROXY_CLIENT_VERSION || globalThis.PRISMA_CLIENT_DATA_PROXY_CLIENT_VERSION;
      if (t.includes("accelerate") && n !== "0.0.0" && n !== "in-memory") return n;
      let [i, o] = n?.split("-") ?? [];
      if (o === void 0 && Pu.test(i)) return i;
      if (o !== void 0 || n === "0.0.0" || n === "in-memory") {
        let [s2] = r.split("-") ?? [], [a, f, v] = s2.split("."), R = vu(`<=${a}.${f}.${v}`), A = await Be(R, { clientVersion: n });
        if (!A.ok) throw new Error(`Failed to fetch stable Prisma version, unpkg.com status ${A.status} ${A.statusText}, response body: ${await A.text() || "<empty body>"}`);
        let I2 = await A.text();
        rs("length of body fetched from unpkg.com", I2.length);
        let C;
        try {
          C = JSON.parse(I2);
        } catch (L2) {
          throw console.error("JSON.parse error: body fetched from unpkg.com: ", I2), L2;
        }
        return C.version;
      }
      throw new qe("Only `major.minor.patch` versions are supported by Accelerate.", { clientVersion: n });
    }
    __name(Tu, "Tu");
    async function ns(t, e) {
      let r = await Tu(t, e);
      return rs("version", r), r;
    }
    __name(ns, "ns");
    function vu(t) {
      return encodeURI(`https://unpkg.com/prisma@${t}/package.json`);
    }
    __name(vu, "vu");
    var is = 3;
    var Xt = j("prisma:client:dataproxyEngine");
    var Zt = class {
      static {
        __name(this, "Zt");
      }
      name = "DataProxyEngine";
      inlineSchema;
      inlineSchemaHash;
      inlineDatasources;
      config;
      logEmitter;
      env;
      clientVersion;
      engineHash;
      tracingHelper;
      remoteClientVersion;
      host;
      headerBuilder;
      startPromise;
      protocol;
      constructor(e) {
        es(e), this.config = e, this.env = e.env, this.inlineSchema = Zo(e.inlineSchema), this.inlineDatasources = e.inlineDatasources, this.inlineSchemaHash = e.inlineSchemaHash, this.clientVersion = e.clientVersion, this.engineHash = e.engineVersion, this.logEmitter = e.logEmitter, this.tracingHelper = e.tracingHelper;
      }
      apiKey() {
        return this.headerBuilder.apiKey;
      }
      version() {
        return this.engineHash;
      }
      async start() {
        this.startPromise !== void 0 && await this.startPromise, this.startPromise = (async () => {
          let { apiKey: e, url: r } = this.getURLAndAPIKey();
          this.host = r.host, this.protocol = r.protocol, this.headerBuilder = new $r({ apiKey: e, tracingHelper: this.tracingHelper, logLevel: this.config.logLevel ?? "error", logQueries: this.config.logQueries, engineHash: this.engineHash }), this.remoteClientVersion = await ns(this.host, this.config), Xt("host", this.host), Xt("protocol", this.protocol);
        })(), await this.startPromise;
      }
      async stop() {
      }
      propagateResponseExtensions(e) {
        e?.logs?.length && e.logs.forEach((r) => {
          switch (r.level) {
            case "debug":
            case "trace":
              Xt(r);
              break;
            case "error":
            case "warn":
            case "info": {
              this.logEmitter.emit(r.level, { timestamp: _n(r.timestamp), message: r.attributes.message ?? "", target: r.target ?? "BinaryEngine" });
              break;
            }
            case "query": {
              this.logEmitter.emit("query", { query: r.attributes.query ?? "", timestamp: _n(r.timestamp), duration: r.attributes.duration_ms ?? 0, params: r.attributes.params ?? "", target: r.target ?? "BinaryEngine" });
              break;
            }
            default:
              r.level;
          }
        }), e?.traces?.length && this.tracingHelper.dispatchEngineSpans(e.traces);
      }
      onBeforeExit() {
        throw new Error('"beforeExit" hook is not applicable to the remote query engine');
      }
      async url(e) {
        return await this.start(), `${this.protocol}//${this.host}/${this.remoteClientVersion}/${this.inlineSchemaHash}/${e}`;
      }
      async uploadSchema() {
        let e = { name: "schemaUpload", internal: true };
        return this.tracingHelper.runInChildSpan(e, async () => {
          let r = await Be(await this.url("schema"), { method: "PUT", headers: this.headerBuilder.build(), body: this.inlineSchema, clientVersion: this.clientVersion });
          r.ok || Xt("schema response status", r.status);
          let n = await zt(r, this.clientVersion);
          if (n) throw this.logEmitter.emit("warn", { message: `Error while uploading schema: ${n.message}`, timestamp: /* @__PURE__ */ new Date(), target: "" }), n;
          this.logEmitter.emit("info", { message: `Schema (re)uploaded (hash: ${this.inlineSchemaHash})`, timestamp: /* @__PURE__ */ new Date(), target: "" });
        });
      }
      request(e, { traceparent: r, interactiveTransaction: n, customDataProxyFetch: i }) {
        return this.requestInternal({ body: e, traceparent: r, interactiveTransaction: n, customDataProxyFetch: i });
      }
      async requestBatch(e, { traceparent: r, transaction: n, customDataProxyFetch: i }) {
        let o = n?.kind === "itx" ? n.options : void 0, s2 = ot(e, n);
        return (await this.requestInternal({ body: s2, customDataProxyFetch: i, interactiveTransaction: o, traceparent: r })).map((f) => (f.extensions && this.propagateResponseExtensions(f.extensions), "errors" in f ? this.convertProtocolErrorsToClientError(f.errors) : f));
      }
      requestInternal({ body: e, traceparent: r, customDataProxyFetch: n, interactiveTransaction: i }) {
        return this.withRetry({ actionGerund: "querying", callback: /* @__PURE__ */ __name(async ({ logHttpCall: o }) => {
          let s2 = i ? `${i.payload.endpoint}/graphql` : await this.url("graphql");
          o(s2);
          let a = await Be(s2, { method: "POST", headers: this.headerBuilder.build({ traceparent: r, transactionId: i?.id }), body: JSON.stringify(e), clientVersion: this.clientVersion }, n);
          a.ok || Xt("graphql response status", a.status), await this.handleError(await zt(a, this.clientVersion));
          let f = await a.json();
          if (f.extensions && this.propagateResponseExtensions(f.extensions), "errors" in f) throw this.convertProtocolErrorsToClientError(f.errors);
          return "batchResult" in f ? f.batchResult : f;
        }, "callback") });
      }
      async transaction(e, r, n) {
        let i = { start: "starting", commit: "committing", rollback: "rolling back" };
        return this.withRetry({ actionGerund: `${i[e]} transaction`, callback: /* @__PURE__ */ __name(async ({ logHttpCall: o }) => {
          if (e === "start") {
            let s2 = JSON.stringify({ max_wait: n.maxWait, timeout: n.timeout, isolation_level: n.isolationLevel }), a = await this.url("transaction/start");
            o(a);
            let f = await Be(a, { method: "POST", headers: this.headerBuilder.build({ traceparent: r.traceparent }), body: s2, clientVersion: this.clientVersion });
            await this.handleError(await zt(f, this.clientVersion));
            let v = await f.json(), { extensions: R } = v;
            R && this.propagateResponseExtensions(R);
            let A = v.id, I2 = v["data-proxy"].endpoint;
            return { id: A, payload: { endpoint: I2 } };
          } else {
            let s2 = `${n.payload.endpoint}/${e}`;
            o(s2);
            let a = await Be(s2, { method: "POST", headers: this.headerBuilder.build({ traceparent: r.traceparent }), clientVersion: this.clientVersion });
            await this.handleError(await zt(a, this.clientVersion));
            let f = await a.json(), { extensions: v } = f;
            v && this.propagateResponseExtensions(v);
            return;
          }
        }, "callback") });
      }
      getURLAndAPIKey() {
        return zo({ clientVersion: this.clientVersion, env: this.env, inlineDatasources: this.inlineDatasources, overrideDatasources: this.config.overrideDatasources });
      }
      metrics() {
        throw new qe("Metrics are not yet supported for Accelerate", { clientVersion: this.clientVersion });
      }
      async withRetry(e) {
        for (let r = 0; ; r++) {
          let n = /* @__PURE__ */ __name((i) => {
            this.logEmitter.emit("info", { message: `Calling ${i} (n=${r})`, timestamp: /* @__PURE__ */ new Date(), target: "" });
          }, "n");
          try {
            return await e.callback({ logHttpCall: n });
          } catch (i) {
            if (!(i instanceof ie) || !i.isRetryable) throw i;
            if (r >= is) throw i instanceof pt ? i.cause : i;
            this.logEmitter.emit("warn", { message: `Attempt ${r + 1}/${is} failed for ${e.actionGerund}: ${i.message ?? "(unknown)"}`, timestamp: /* @__PURE__ */ new Date(), target: "" });
            let o = await Xo(r);
            this.logEmitter.emit("warn", { message: `Retrying after ${o}ms`, timestamp: /* @__PURE__ */ new Date(), target: "" });
          }
        }
      }
      async handleError(e) {
        if (e instanceof Ve) throw await this.uploadSchema(), new pt({ clientVersion: this.clientVersion, cause: e });
        if (e) throw e;
      }
      convertProtocolErrorsToClientError(e) {
        return e.length === 1 ? st(e[0], this.config.clientVersion, this.config.activeProvider) : new Q(JSON.stringify(e), { clientVersion: this.config.clientVersion });
      }
      applyPendingMigrations() {
        throw new Error("Method not implemented.");
      }
    };
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    function os(t) {
      if (t?.kind === "itx") return t.options.id;
    }
    __name(os, "os");
    u();
    c();
    p();
    m();
    d();
    l();
    var Vn;
    var ss = { async loadLibrary(t) {
      let { clientVersion: e, adapter: r, engineWasm: n } = t;
      if (r === void 0) throw new M(`The \`adapter\` option for \`PrismaClient\` is required in this context (${ut().prettyName})`, e);
      if (n === void 0) throw new M("WASM engine was unexpectedly `undefined`", e);
      Vn === void 0 && (Vn = (async () => {
        let o = await n.getRuntime(), s2 = await n.getQueryEngineWasmModule();
        if (s2 == null) throw new M("The loaded wasm module was unexpectedly `undefined` or `null` once loaded", e);
        let a = { "./query_engine_bg.js": o }, f = new WebAssembly.Instance(s2, a), v = f.exports.__wbindgen_start;
        return o.__wbg_set_wasm(f.exports), v(), o.QueryEngine;
      })());
      let i = await Vn;
      return { debugPanic() {
        return Promise.reject("{}");
      }, dmmf() {
        return Promise.resolve("{}");
      }, version() {
        return { commit: "unknown", version: "unknown" };
      }, QueryEngine: i };
    } };
    var Ru = "P2036";
    var be = j("prisma:client:libraryEngine");
    function Au(t) {
      return t.item_type === "query" && "query" in t;
    }
    __name(Au, "Au");
    function Cu(t) {
      return "level" in t ? t.level === "error" && t.message === "PANIC" : false;
    }
    __name(Cu, "Cu");
    var VL = [...on, "native"];
    var Su = 0xffffffffffffffffn;
    var Bn = 1n;
    function Iu() {
      let t = Bn++;
      return Bn > Su && (Bn = 1n), t;
    }
    __name(Iu, "Iu");
    var er = class {
      static {
        __name(this, "er");
      }
      name = "LibraryEngine";
      engine;
      libraryInstantiationPromise;
      libraryStartingPromise;
      libraryStoppingPromise;
      libraryStarted;
      executingQueryPromise;
      config;
      QueryEngineConstructor;
      libraryLoader;
      library;
      logEmitter;
      libQueryEnginePath;
      binaryTarget;
      datasourceOverrides;
      datamodel;
      logQueries;
      logLevel;
      lastQuery;
      loggerRustPanic;
      tracingHelper;
      adapterPromise;
      versionInfo;
      constructor(e, r) {
        this.libraryLoader = r ?? ss, this.config = e, this.libraryStarted = false, this.logQueries = e.logQueries ?? false, this.logLevel = e.logLevel ?? "error", this.logEmitter = e.logEmitter, this.datamodel = e.inlineSchema, this.tracingHelper = e.tracingHelper, e.enableDebugLogs && (this.logLevel = "debug");
        let n = Object.keys(e.overrideDatasources)[0], i = e.overrideDatasources[n]?.url;
        n !== void 0 && i !== void 0 && (this.datasourceOverrides = { [n]: i }), this.libraryInstantiationPromise = this.instantiateLibrary();
      }
      wrapEngine(e) {
        return { applyPendingMigrations: e.applyPendingMigrations?.bind(e), commitTransaction: this.withRequestId(e.commitTransaction.bind(e)), connect: this.withRequestId(e.connect.bind(e)), disconnect: this.withRequestId(e.disconnect.bind(e)), metrics: e.metrics?.bind(e), query: this.withRequestId(e.query.bind(e)), rollbackTransaction: this.withRequestId(e.rollbackTransaction.bind(e)), sdlSchema: e.sdlSchema?.bind(e), startTransaction: this.withRequestId(e.startTransaction.bind(e)), trace: e.trace.bind(e), free: e.free?.bind(e) };
      }
      withRequestId(e) {
        return async (...r) => {
          let n = Iu().toString();
          try {
            return await e(...r, n);
          } finally {
            if (this.tracingHelper.isEnabled()) {
              let i = await this.engine?.trace(n);
              if (i) {
                let o = JSON.parse(i);
                this.tracingHelper.dispatchEngineSpans(o.spans);
              }
            }
          }
        };
      }
      async applyPendingMigrations() {
        throw new Error("Cannot call this method from this type of engine instance");
      }
      async transaction(e, r, n) {
        await this.start();
        let i = await this.adapterPromise, o = JSON.stringify(r), s2;
        if (e === "start") {
          let f = JSON.stringify({ max_wait: n.maxWait, timeout: n.timeout, isolation_level: n.isolationLevel });
          s2 = await this.engine?.startTransaction(f, o);
        } else e === "commit" ? s2 = await this.engine?.commitTransaction(n.id, o) : e === "rollback" && (s2 = await this.engine?.rollbackTransaction(n.id, o));
        let a = this.parseEngineResponse(s2);
        if (Du(a)) {
          let f = this.getExternalAdapterError(a, i?.errorRegistry);
          throw f ? f.error : new X(a.message, { code: a.error_code, clientVersion: this.config.clientVersion, meta: a.meta });
        } else if (typeof a.message == "string") throw new Q(a.message, { clientVersion: this.config.clientVersion });
        return a;
      }
      async instantiateLibrary() {
        if (be("internalSetup"), this.libraryInstantiationPromise) return this.libraryInstantiationPromise;
        this.binaryTarget = await this.getCurrentBinaryTarget(), await this.tracingHelper.runInChildSpan("load_engine", () => this.loadEngine()), this.version();
      }
      async getCurrentBinaryTarget() {
      }
      parseEngineResponse(e) {
        if (!e) throw new Q("Response from the Engine was empty", { clientVersion: this.config.clientVersion });
        try {
          return JSON.parse(e);
        } catch {
          throw new Q("Unable to JSON.parse response from engine", { clientVersion: this.config.clientVersion });
        }
      }
      async loadEngine() {
        if (!this.engine) {
          this.QueryEngineConstructor || (this.library = await this.libraryLoader.loadLibrary(this.config), this.QueryEngineConstructor = this.library.QueryEngine);
          try {
            let e = new b(this);
            this.adapterPromise || (this.adapterPromise = this.config.adapter?.connect()?.then(mr));
            let r = await this.adapterPromise;
            r && be("Using driver adapter: %O", r), this.engine = this.wrapEngine(new this.QueryEngineConstructor({ datamodel: this.datamodel, env: g.env, logQueries: this.config.logQueries ?? false, ignoreEnvVarErrors: true, datasourceOverrides: this.datasourceOverrides ?? {}, logLevel: this.logLevel, configDir: this.config.cwd, engineProtocol: "json", enableTracing: this.tracingHelper.isEnabled() }, (n) => {
              e.deref()?.logger(n);
            }, r));
          } catch (e) {
            let r = e, n = this.parseInitError(r.message);
            throw typeof n == "string" ? r : new M(n.message, this.config.clientVersion, n.error_code);
          }
        }
      }
      logger(e) {
        let r = this.parseEngineResponse(e);
        r && (r.level = r?.level.toLowerCase() ?? "unknown", Au(r) ? this.logEmitter.emit("query", { timestamp: /* @__PURE__ */ new Date(), query: r.query, params: r.params, duration: Number(r.duration_ms), target: r.module_path }) : (Cu(r), this.logEmitter.emit(r.level, { timestamp: /* @__PURE__ */ new Date(), message: r.message, target: r.module_path })));
      }
      parseInitError(e) {
        try {
          return JSON.parse(e);
        } catch {
        }
        return e;
      }
      parseRequestError(e) {
        try {
          return JSON.parse(e);
        } catch {
        }
        return e;
      }
      onBeforeExit() {
        throw new Error('"beforeExit" hook is not applicable to the library engine since Prisma 5.0.0, it is only relevant and implemented for the binary engine. Please add your event listener to the `process` object directly instead.');
      }
      async start() {
        if (this.libraryInstantiationPromise || (this.libraryInstantiationPromise = this.instantiateLibrary()), await this.libraryInstantiationPromise, await this.libraryStoppingPromise, this.libraryStartingPromise) return be(`library already starting, this.libraryStarted: ${this.libraryStarted}`), this.libraryStartingPromise;
        if (this.libraryStarted) return;
        let e = /* @__PURE__ */ __name(async () => {
          be("library starting");
          try {
            let r = { traceparent: this.tracingHelper.getTraceParent() };
            await this.engine?.connect(JSON.stringify(r)), this.libraryStarted = true, this.adapterPromise || (this.adapterPromise = this.config.adapter?.connect()?.then(mr)), await this.adapterPromise, be("library started");
          } catch (r) {
            let n = this.parseInitError(r.message);
            throw typeof n == "string" ? r : new M(n.message, this.config.clientVersion, n.error_code);
          } finally {
            this.libraryStartingPromise = void 0;
          }
        }, "e");
        return this.libraryStartingPromise = this.tracingHelper.runInChildSpan("connect", e), this.libraryStartingPromise;
      }
      async stop() {
        if (await this.libraryInstantiationPromise, await this.libraryStartingPromise, await this.executingQueryPromise, this.libraryStoppingPromise) return be("library is already stopping"), this.libraryStoppingPromise;
        if (!this.libraryStarted) {
          await (await this.adapterPromise)?.dispose(), this.adapterPromise = void 0;
          return;
        }
        let e = /* @__PURE__ */ __name(async () => {
          await new Promise((n) => setImmediate(n)), be("library stopping");
          let r = { traceparent: this.tracingHelper.getTraceParent() };
          await this.engine?.disconnect(JSON.stringify(r)), this.engine?.free && this.engine.free(), this.engine = void 0, this.libraryStarted = false, this.libraryStoppingPromise = void 0, this.libraryInstantiationPromise = void 0, await (await this.adapterPromise)?.dispose(), this.adapterPromise = void 0, be("library stopped");
        }, "e");
        return this.libraryStoppingPromise = this.tracingHelper.runInChildSpan("disconnect", e), this.libraryStoppingPromise;
      }
      version() {
        return this.versionInfo = this.library?.version(), this.versionInfo?.version ?? "unknown";
      }
      debugPanic(e) {
        return this.library?.debugPanic(e);
      }
      async request(e, { traceparent: r, interactiveTransaction: n }) {
        be(`sending request, this.libraryStarted: ${this.libraryStarted}`);
        let i = JSON.stringify({ traceparent: r }), o = JSON.stringify(e);
        try {
          await this.start();
          let s2 = await this.adapterPromise;
          this.executingQueryPromise = this.engine?.query(o, i, n?.id), this.lastQuery = o;
          let a = this.parseEngineResponse(await this.executingQueryPromise);
          if (a.errors) throw a.errors.length === 1 ? this.buildQueryError(a.errors[0], s2?.errorRegistry) : new Q(JSON.stringify(a.errors), { clientVersion: this.config.clientVersion });
          if (this.loggerRustPanic) throw this.loggerRustPanic;
          return { data: a };
        } catch (s2) {
          if (s2 instanceof M) throw s2;
          s2.code === "GenericFailure" && s2.message?.startsWith("PANIC:");
          let a = this.parseRequestError(s2.message);
          throw typeof a == "string" ? s2 : new Q(`${a.message}
${a.backtrace}`, { clientVersion: this.config.clientVersion });
        }
      }
      async requestBatch(e, { transaction: r, traceparent: n }) {
        be("requestBatch");
        let i = ot(e, r);
        await this.start();
        let o = await this.adapterPromise;
        this.lastQuery = JSON.stringify(i), this.executingQueryPromise = this.engine?.query(this.lastQuery, JSON.stringify({ traceparent: n }), os(r));
        let s2 = await this.executingQueryPromise, a = this.parseEngineResponse(s2);
        if (a.errors) throw a.errors.length === 1 ? this.buildQueryError(a.errors[0], o?.errorRegistry) : new Q(JSON.stringify(a.errors), { clientVersion: this.config.clientVersion });
        let { batchResult: f, errors: v } = a;
        if (Array.isArray(f)) return f.map((R) => R.errors && R.errors.length > 0 ? this.loggerRustPanic ?? this.buildQueryError(R.errors[0], o?.errorRegistry) : { data: R });
        throw v && v.length === 1 ? new Error(v[0].error) : new Error(JSON.stringify(a));
      }
      buildQueryError(e, r) {
        e.user_facing_error.is_panic;
        let n = this.getExternalAdapterError(e.user_facing_error, r);
        return n ? n.error : st(e, this.config.clientVersion, this.config.activeProvider);
      }
      getExternalAdapterError(e, r) {
        if (e.error_code === Ru && r) {
          let n = e.meta?.id;
          yr(typeof n == "number", "Malformed external JS error received from the engine");
          let i = r.consumeError(n);
          return yr(i, "External error with reported id was not registered"), i;
        }
      }
      async metrics(e) {
        await this.start();
        let r = await this.engine.metrics(JSON.stringify(e));
        return e.format === "prometheus" ? r : this.parseEngineResponse(r);
      }
    };
    function Du(t) {
      return typeof t == "object" && t !== null && t.error_code !== void 0;
    }
    __name(Du, "Du");
    u();
    c();
    p();
    m();
    d();
    l();
    function as({ url: t, adapter: e, copyEngine: r, targetBuildType: n }) {
      let i = [], o = [], s2 = /* @__PURE__ */ __name((D2) => {
        i.push({ _tag: "warning", value: D2 });
      }, "s"), a = /* @__PURE__ */ __name((D2) => {
        let k = D2.join(`
`);
        o.push({ _tag: "error", value: k });
      }, "a"), f = !!t?.startsWith("prisma://"), v = gr(t), R = !!e, A = f || v;
      !R && r && A && n !== "client" && n !== "wasm-compiler-edge" && s2(["recommend--no-engine", "In production, we recommend using `prisma generate --no-engine` (See: `prisma generate --help`)"]);
      let I2 = A || !r;
      R && (I2 || n === "edge") && (n === "edge" ? a(["Prisma Client was configured to use the `adapter` option but it was imported via its `/edge` endpoint.", "Please either remove the `/edge` endpoint or remove the `adapter` from the Prisma Client constructor."]) : A ? a(["You've provided both a driver adapter and an Accelerate database URL. Driver adapters currently cannot connect to Accelerate.", "Please provide either a driver adapter with a direct database URL or an Accelerate URL and no driver adapter."]) : r || a(["Prisma Client was configured to use the `adapter` option but `prisma generate` was run with `--no-engine`.", "Please run `prisma generate` without `--no-engine` to be able to use Prisma Client with the adapter."]));
      let C = { accelerate: I2, ppg: v, driverAdapters: R };
      function L2(D2) {
        return D2.length > 0;
      }
      __name(L2, "L");
      return L2(o) ? { ok: false, diagnostics: { warnings: i, errors: o }, isUsing: C } : { ok: true, diagnostics: { warnings: i }, isUsing: C };
    }
    __name(as, "as");
    function ls({ copyEngine: t = true }, e) {
      let r;
      try {
        r = ct({ inlineDatasources: e.inlineDatasources, overrideDatasources: e.overrideDatasources, env: { ...e.env, ...g.env }, clientVersion: e.clientVersion });
      } catch {
      }
      let { ok: n, isUsing: i, diagnostics: o } = as({ url: r, adapter: e.adapter, copyEngine: t, targetBuildType: "wasm-engine-edge" });
      for (let A of o.warnings) Tt(...A.value);
      if (!n) {
        let A = o.errors[0];
        throw new Y(A.value, { clientVersion: e.clientVersion });
      }
      let s2 = Je(e.generator), a = s2 === "library", f = s2 === "binary", v = s2 === "client", R = (i.accelerate || i.ppg) && !i.driverAdapters;
      return i.accelerate ? new Zt(e) : i.driverAdapters ? new er(e) : new $n({ clientVersion: e.clientVersion });
    }
    __name(ls, "ls");
    var $n = class {
      static {
        __name(this, "$n");
      }
      constructor(e) {
        return new Proxy(this, { get(r, n) {
          let i = `In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters`;
          throw new Y(i, e);
        } });
      }
    };
    u();
    c();
    p();
    m();
    d();
    l();
    function us({ generator: t }) {
      return t?.previewFeatures ?? [];
    }
    __name(us, "us");
    u();
    c();
    p();
    m();
    d();
    l();
    var cs = /* @__PURE__ */ __name((t) => ({ command: t }), "cs");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    var ps = /* @__PURE__ */ __name((t) => t.strings.reduce((e, r, n) => `${e}@P${n}${r}`), "ps");
    u();
    c();
    p();
    m();
    d();
    l();
    l();
    function ft(t) {
      try {
        return ms(t, "fast");
      } catch {
        return ms(t, "slow");
      }
    }
    __name(ft, "ft");
    function ms(t, e) {
      return JSON.stringify(t.map((r) => fs(r, e)));
    }
    __name(ms, "ms");
    function fs(t, e) {
      if (Array.isArray(t)) return t.map((r) => fs(r, e));
      if (typeof t == "bigint") return { prisma__type: "bigint", prisma__value: t.toString() };
      if (We(t)) return { prisma__type: "date", prisma__value: t.toJSON() };
      if (xe.isDecimal(t)) return { prisma__type: "decimal", prisma__value: t.toJSON() };
      if (h.isBuffer(t)) return { prisma__type: "bytes", prisma__value: t.toString("base64") };
      if (Ou(t)) return { prisma__type: "bytes", prisma__value: h.from(t).toString("base64") };
      if (ArrayBuffer.isView(t)) {
        let { buffer: r, byteOffset: n, byteLength: i } = t;
        return { prisma__type: "bytes", prisma__value: h.from(r, n, i).toString("base64") };
      }
      return typeof t == "object" && e === "slow" ? gs(t) : t;
    }
    __name(fs, "fs");
    function Ou(t) {
      return t instanceof ArrayBuffer || t instanceof SharedArrayBuffer ? true : typeof t == "object" && t !== null ? t[Symbol.toStringTag] === "ArrayBuffer" || t[Symbol.toStringTag] === "SharedArrayBuffer" : false;
    }
    __name(Ou, "Ou");
    function gs(t) {
      if (typeof t != "object" || t === null) return t;
      if (typeof t.toJSON == "function") return t.toJSON();
      if (Array.isArray(t)) return t.map(ds);
      let e = {};
      for (let r of Object.keys(t)) e[r] = ds(t[r]);
      return e;
    }
    __name(gs, "gs");
    function ds(t) {
      return typeof t == "bigint" ? t.toString() : gs(t);
    }
    __name(ds, "ds");
    var ku = /^(\s*alter\s)/i;
    var ys = j("prisma:client");
    function jn(t, e, r, n) {
      if (!(t !== "postgresql" && t !== "cockroachdb") && r.length > 0 && ku.exec(e)) throw new Error(`Running ALTER using ${n} is not supported
Using the example below you can still execute your query with Prisma, but please note that it is vulnerable to SQL injection attacks and requires you to take care of input sanitization.

Example:
  await prisma.$executeRawUnsafe(\`ALTER USER prisma WITH PASSWORD '\${password}'\`)

More Information: https://pris.ly/d/execute-raw
`);
    }
    __name(jn, "jn");
    var Qn = /* @__PURE__ */ __name(({ clientMethod: t, activeProvider: e }) => (r) => {
      let n = "", i;
      if (Lr(r)) n = r.sql, i = { values: ft(r.values), __prismaRawParameters__: true };
      else if (Array.isArray(r)) {
        let [o, ...s2] = r;
        n = o, i = { values: ft(s2 || []), __prismaRawParameters__: true };
      } else switch (e) {
        case "sqlite":
        case "mysql": {
          n = r.sql, i = { values: ft(r.values), __prismaRawParameters__: true };
          break;
        }
        case "cockroachdb":
        case "postgresql":
        case "postgres": {
          n = r.text, i = { values: ft(r.values), __prismaRawParameters__: true };
          break;
        }
        case "sqlserver": {
          n = ps(r), i = { values: ft(r.values), __prismaRawParameters__: true };
          break;
        }
        default:
          throw new Error(`The ${e} provider does not support ${t}`);
      }
      return i?.values ? ys(`prisma.${t}(${n}, ${i.values})`) : ys(`prisma.${t}(${n})`), { query: n, parameters: i };
    }, "Qn");
    var hs = { requestArgsToMiddlewareArgs(t) {
      return [t.strings, ...t.values];
    }, middlewareArgsToRequestArgs(t) {
      let [e, ...r] = t;
      return new ne(e, r);
    } };
    var bs = { requestArgsToMiddlewareArgs(t) {
      return [t];
    }, middlewareArgsToRequestArgs(t) {
      return t[0];
    } };
    u();
    c();
    p();
    m();
    d();
    l();
    function Gn(t) {
      return function(r, n) {
        let i, o = /* @__PURE__ */ __name((s2 = t) => {
          try {
            return s2 === void 0 || s2?.kind === "itx" ? i ??= Es(r(s2)) : Es(r(s2));
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
    __name(Gn, "Gn");
    function Es(t) {
      return typeof t.then == "function" ? t : Promise.resolve(t);
    }
    __name(Es, "Es");
    u();
    c();
    p();
    m();
    d();
    l();
    var _u = sn.split(".")[0];
    var Mu = { isEnabled() {
      return false;
    }, getTraceParent() {
      return "00-10-10-00";
    }, dispatchEngineSpans() {
    }, getActiveContext() {
    }, runInChildSpan(t, e) {
      return e();
    } };
    var Jn = class {
      static {
        __name(this, "Jn");
      }
      isEnabled() {
        return this.getGlobalTracingHelper().isEnabled();
      }
      getTraceParent(e) {
        return this.getGlobalTracingHelper().getTraceParent(e);
      }
      dispatchEngineSpans(e) {
        return this.getGlobalTracingHelper().dispatchEngineSpans(e);
      }
      getActiveContext() {
        return this.getGlobalTracingHelper().getActiveContext();
      }
      runInChildSpan(e, r) {
        return this.getGlobalTracingHelper().runInChildSpan(e, r);
      }
      getGlobalTracingHelper() {
        let e = globalThis[`V${_u}_PRISMA_INSTRUMENTATION`], r = globalThis.PRISMA_INSTRUMENTATION;
        return e?.helper ?? r?.helper ?? Mu;
      }
    };
    function ws() {
      return new Jn();
    }
    __name(ws, "ws");
    u();
    c();
    p();
    m();
    d();
    l();
    function xs(t, e = () => {
    }) {
      let r, n = new Promise((i) => r = i);
      return { then(i) {
        return --t === 0 && r(e()), i?.(n);
      } };
    }
    __name(xs, "xs");
    u();
    c();
    p();
    m();
    d();
    l();
    function Ps(t) {
      return typeof t == "string" ? t : t.reduce((e, r) => {
        let n = typeof r == "string" ? r : r.level;
        return n === "query" ? e : e && (r === "info" || e === "info") ? "info" : n;
      }, void 0);
    }
    __name(Ps, "Ps");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    function jr(t) {
      return typeof t.batchRequestIdx == "number";
    }
    __name(jr, "jr");
    u();
    c();
    p();
    m();
    d();
    l();
    function Ts(t) {
      if (t.action !== "findUnique" && t.action !== "findUniqueOrThrow") return;
      let e = [];
      return t.modelName && e.push(t.modelName), t.query.arguments && e.push(Wn(t.query.arguments)), e.push(Wn(t.query.selection)), e.join("");
    }
    __name(Ts, "Ts");
    function Wn(t) {
      return `(${Object.keys(t).sort().map((r) => {
        let n = t[r];
        return typeof n == "object" && n !== null ? `(${r} ${Wn(n)})` : r;
      }).join(" ")})`;
    }
    __name(Wn, "Wn");
    u();
    c();
    p();
    m();
    d();
    l();
    var Lu = { aggregate: false, aggregateRaw: false, createMany: true, createManyAndReturn: true, createOne: true, deleteMany: true, deleteOne: true, executeRaw: true, findFirst: false, findFirstOrThrow: false, findMany: false, findRaw: false, findUnique: false, findUniqueOrThrow: false, groupBy: false, queryRaw: false, runCommandRaw: true, updateMany: true, updateManyAndReturn: true, updateOne: true, upsertOne: true };
    function Kn(t) {
      return Lu[t];
    }
    __name(Kn, "Kn");
    u();
    c();
    p();
    m();
    d();
    l();
    var Qr = class {
      static {
        __name(this, "Qr");
      }
      constructor(e) {
        this.options = e;
        this.batches = {};
      }
      batches;
      tickActive = false;
      request(e) {
        let r = this.options.batchBy(e);
        return r ? (this.batches[r] || (this.batches[r] = [], this.tickActive || (this.tickActive = true, g.nextTick(() => {
          this.dispatchBatches(), this.tickActive = false;
        }))), new Promise((n, i) => {
          this.batches[r].push({ request: e, resolve: n, reject: i });
        })) : this.options.singleLoader(e);
      }
      dispatchBatches() {
        for (let e in this.batches) {
          let r = this.batches[e];
          delete this.batches[e], r.length === 1 ? this.options.singleLoader(r[0].request).then((n) => {
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
    c();
    p();
    m();
    d();
    l();
    l();
    function $e(t, e) {
      if (e === null) return e;
      switch (t) {
        case "bigint":
          return BigInt(e);
        case "bytes": {
          let { buffer: r, byteOffset: n, byteLength: i } = h.from(e, "base64");
          return new Uint8Array(r, n, i);
        }
        case "decimal":
          return new xe(e);
        case "datetime":
        case "date":
          return new Date(e);
        case "time":
          return /* @__PURE__ */ new Date(`1970-01-01T${e}Z`);
        case "bigint-array":
          return e.map((r) => $e("bigint", r));
        case "bytes-array":
          return e.map((r) => $e("bytes", r));
        case "decimal-array":
          return e.map((r) => $e("decimal", r));
        case "datetime-array":
          return e.map((r) => $e("datetime", r));
        case "date-array":
          return e.map((r) => $e("date", r));
        case "time-array":
          return e.map((r) => $e("time", r));
        default:
          return e;
      }
    }
    __name($e, "$e");
    function Gr(t) {
      let e = [], r = Fu(t);
      for (let n = 0; n < t.rows.length; n++) {
        let i = t.rows[n], o = { ...r };
        for (let s2 = 0; s2 < i.length; s2++) o[t.columns[s2]] = $e(t.types[s2], i[s2]);
        e.push(o);
      }
      return e;
    }
    __name(Gr, "Gr");
    function Fu(t) {
      let e = {};
      for (let r = 0; r < t.columns.length; r++) e[t.columns[r]] = null;
      return e;
    }
    __name(Fu, "Fu");
    var Nu = j("prisma:client:request_handler");
    var Jr = class {
      static {
        __name(this, "Jr");
      }
      client;
      dataloader;
      logEmitter;
      constructor(e, r) {
        this.logEmitter = r, this.client = e, this.dataloader = new Qr({ batchLoader: Bo(async ({ requests: n, customDataProxyFetch: i }) => {
          let { transaction: o, otelParentCtx: s2 } = n[0], a = n.map((A) => A.protocolQuery), f = this.client._tracingHelper.getTraceParent(s2), v = n.some((A) => Kn(A.protocolQuery.action));
          return (await this.client._engine.requestBatch(a, { traceparent: f, transaction: Uu(o), containsWrite: v, customDataProxyFetch: i })).map((A, I2) => {
            if (A instanceof Error) return A;
            try {
              return this.mapQueryEngineResult(n[I2], A);
            } catch (C) {
              return C;
            }
          });
        }), singleLoader: /* @__PURE__ */ __name(async (n) => {
          let i = n.transaction?.kind === "itx" ? vs(n.transaction) : void 0, o = await this.client._engine.request(n.protocolQuery, { traceparent: this.client._tracingHelper.getTraceParent(), interactiveTransaction: i, isWrite: Kn(n.protocolQuery.action), customDataProxyFetch: n.customDataProxyFetch });
          return this.mapQueryEngineResult(n, o);
        }, "singleLoader"), batchBy: /* @__PURE__ */ __name((n) => n.transaction?.id ? `transaction-${n.transaction.id}` : Ts(n.protocolQuery), "batchBy"), batchOrder(n, i) {
          return n.transaction?.kind === "batch" && i.transaction?.kind === "batch" ? n.transaction.index - i.transaction.index : 0;
        } });
      }
      async request(e) {
        try {
          return await this.dataloader.request(e);
        } catch (r) {
          let { clientMethod: n, callsite: i, transaction: o, args: s2, modelName: a } = e;
          this.handleAndLogRequestError({ error: r, clientMethod: n, callsite: i, transaction: o, args: s2, modelName: a, globalOmit: e.globalOmit });
        }
      }
      mapQueryEngineResult({ dataPath: e, unpacker: r }, n) {
        let i = n?.data, o = this.unpack(i, e, r);
        return g.env.PRISMA_CLIENT_GET_TIME ? { data: o } : o;
      }
      handleAndLogRequestError(e) {
        try {
          this.handleRequestError(e);
        } catch (r) {
          throw this.logEmitter && this.logEmitter.emit("error", { message: r.message, target: e.clientMethod, timestamp: /* @__PURE__ */ new Date() }), r;
        }
      }
      handleRequestError({ error: e, clientMethod: r, callsite: n, transaction: i, args: o, modelName: s2, globalOmit: a }) {
        if (Nu(e), qu(e, i)) throw e;
        if (e instanceof X && Vu(e)) {
          let v = Rs(e.meta);
          Ir({ args: o, errors: [v], callsite: n, errorFormat: this.client._errorFormat, originalMethod: r, clientVersion: this.client._clientVersion, globalOmit: a });
        }
        let f = e.message;
        if (n && (f = Er({ callsite: n, originalMethod: r, isPanic: e.isPanic, showColors: this.client._errorFormat === "pretty", message: f })), f = this.sanitizeMessage(f), e.code) {
          let v = s2 ? { modelName: s2, ...e.meta } : e.meta;
          throw new X(f, { code: e.code, clientVersion: this.client._clientVersion, meta: v, batchRequestIdx: e.batchRequestIdx });
        } else {
          if (e.isPanic) throw new Te(f, this.client._clientVersion);
          if (e instanceof Q) throw new Q(f, { clientVersion: this.client._clientVersion, batchRequestIdx: e.batchRequestIdx });
          if (e instanceof M) throw new M(f, this.client._clientVersion);
          if (e instanceof Te) throw new Te(f, this.client._clientVersion);
        }
        throw e.clientVersion = this.client._clientVersion, e;
      }
      sanitizeMessage(e) {
        return this.client._errorFormat && this.client._errorFormat !== "pretty" ? dn(e) : e;
      }
      unpack(e, r, n) {
        if (!e || (e.data && (e = e.data), !e)) return e;
        let i = Object.keys(e)[0], o = Object.values(e)[0], s2 = r.filter((v) => v !== "select" && v !== "include"), a = In(o, s2), f = i === "queryRaw" ? Gr(a) : lt(a);
        return n ? n(f) : f;
      }
      get [Symbol.toStringTag]() {
        return "RequestHandler";
      }
    };
    function Uu(t) {
      if (t) {
        if (t.kind === "batch") return { kind: "batch", options: { isolationLevel: t.isolationLevel } };
        if (t.kind === "itx") return { kind: "itx", options: vs(t) };
        Fe(t, "Unknown transaction kind");
      }
    }
    __name(Uu, "Uu");
    function vs(t) {
      return { id: t.id, payload: t.payload };
    }
    __name(vs, "vs");
    function qu(t, e) {
      return jr(t) && e?.kind === "batch" && t.batchRequestIdx !== e.index;
    }
    __name(qu, "qu");
    function Vu(t) {
      return t.code === "P2009" || t.code === "P2012";
    }
    __name(Vu, "Vu");
    function Rs(t) {
      if (t.kind === "Union") return { kind: "Union", errors: t.errors.map(Rs) };
      if (Array.isArray(t.selectionPath)) {
        let [, ...e] = t.selectionPath;
        return { ...t, selectionPath: e };
      }
      return t;
    }
    __name(Rs, "Rs");
    u();
    c();
    p();
    m();
    d();
    l();
    var As = Ho;
    u();
    c();
    p();
    m();
    d();
    l();
    var Os = bt(hn());
    u();
    c();
    p();
    m();
    d();
    l();
    var F2 = class extends Error {
      static {
        __name(this, "F");
      }
      constructor(e) {
        super(e + `
Read more at https://pris.ly/d/client-constructor`), this.name = "PrismaClientConstructorValidationError";
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientConstructorValidationError";
      }
    };
    O(F2, "PrismaClientConstructorValidationError");
    var Cs = ["datasources", "datasourceUrl", "errorFormat", "adapter", "log", "transactionOptions", "omit", "__internal"];
    var Ss = ["pretty", "colorless", "minimal"];
    var Is = ["info", "query", "warn", "error"];
    var Bu = { datasources: /* @__PURE__ */ __name((t, { datasourceNames: e }) => {
      if (t) {
        if (typeof t != "object" || Array.isArray(t)) throw new F2(`Invalid value ${JSON.stringify(t)} for "datasources" provided to PrismaClient constructor`);
        for (let [r, n] of Object.entries(t)) {
          if (!e.includes(r)) {
            let i = gt(r, e) || ` Available datasources: ${e.join(", ")}`;
            throw new F2(`Unknown datasource ${r} provided to PrismaClient constructor.${i}`);
          }
          if (typeof n != "object" || Array.isArray(n)) throw new F2(`Invalid value ${JSON.stringify(t)} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
          if (n && typeof n == "object") for (let [i, o] of Object.entries(n)) {
            if (i !== "url") throw new F2(`Invalid value ${JSON.stringify(t)} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
            if (typeof o != "string") throw new F2(`Invalid value ${JSON.stringify(o)} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
          }
        }
      }
    }, "datasources"), adapter: /* @__PURE__ */ __name((t, e) => {
      if (!t && Je(e.generator) === "client") throw new F2('Using engine type "client" requires a driver adapter to be provided to PrismaClient constructor.');
      if (t !== null) {
        if (t === void 0) throw new F2('"adapter" property must not be undefined, use null to conditionally disable driver adapters.');
        if (Je(e.generator) === "binary") throw new F2('Cannot use a driver adapter with the "binary" Query Engine. Please use the "library" Query Engine.');
      }
    }, "adapter"), datasourceUrl: /* @__PURE__ */ __name((t) => {
      if (typeof t < "u" && typeof t != "string") throw new F2(`Invalid value ${JSON.stringify(t)} for "datasourceUrl" provided to PrismaClient constructor.
Expected string or undefined.`);
    }, "datasourceUrl"), errorFormat: /* @__PURE__ */ __name((t) => {
      if (t) {
        if (typeof t != "string") throw new F2(`Invalid value ${JSON.stringify(t)} for "errorFormat" provided to PrismaClient constructor.`);
        if (!Ss.includes(t)) {
          let e = gt(t, Ss);
          throw new F2(`Invalid errorFormat ${t} provided to PrismaClient constructor.${e}`);
        }
      }
    }, "errorFormat"), log: /* @__PURE__ */ __name((t) => {
      if (!t) return;
      if (!Array.isArray(t)) throw new F2(`Invalid value ${JSON.stringify(t)} for "log" provided to PrismaClient constructor.`);
      function e(r) {
        if (typeof r == "string" && !Is.includes(r)) {
          let n = gt(r, Is);
          throw new F2(`Invalid log level "${r}" provided to PrismaClient constructor.${n}`);
        }
      }
      __name(e, "e");
      for (let r of t) {
        e(r);
        let n = { level: e, emit: /* @__PURE__ */ __name((i) => {
          let o = ["stdout", "event"];
          if (!o.includes(i)) {
            let s2 = gt(i, o);
            throw new F2(`Invalid value ${JSON.stringify(i)} for "emit" in logLevel provided to PrismaClient constructor.${s2}`);
          }
        }, "emit") };
        if (r && typeof r == "object") for (let [i, o] of Object.entries(r)) if (n[i]) n[i](o);
        else throw new F2(`Invalid property ${i} for "log" provided to PrismaClient constructor`);
      }
    }, "log"), transactionOptions: /* @__PURE__ */ __name((t) => {
      if (!t) return;
      let e = t.maxWait;
      if (e != null && e <= 0) throw new F2(`Invalid value ${e} for maxWait in "transactionOptions" provided to PrismaClient constructor. maxWait needs to be greater than 0`);
      let r = t.timeout;
      if (r != null && r <= 0) throw new F2(`Invalid value ${r} for timeout in "transactionOptions" provided to PrismaClient constructor. timeout needs to be greater than 0`);
    }, "transactionOptions"), omit: /* @__PURE__ */ __name((t, e) => {
      if (typeof t != "object") throw new F2('"omit" option is expected to be an object.');
      if (t === null) throw new F2('"omit" option can not be `null`');
      let r = [];
      for (let [n, i] of Object.entries(t)) {
        let o = ju(n, e.runtimeDataModel);
        if (!o) {
          r.push({ kind: "UnknownModel", modelKey: n });
          continue;
        }
        for (let [s2, a] of Object.entries(i)) {
          let f = o.fields.find((v) => v.name === s2);
          if (!f) {
            r.push({ kind: "UnknownField", modelKey: n, fieldName: s2 });
            continue;
          }
          if (f.relationName) {
            r.push({ kind: "RelationInOmit", modelKey: n, fieldName: s2 });
            continue;
          }
          typeof a != "boolean" && r.push({ kind: "InvalidFieldValue", modelKey: n, fieldName: s2 });
        }
      }
      if (r.length > 0) throw new F2(Qu(t, r));
    }, "omit"), __internal: /* @__PURE__ */ __name((t) => {
      if (!t) return;
      let e = ["debug", "engine", "configOverride"];
      if (typeof t != "object") throw new F2(`Invalid value ${JSON.stringify(t)} for "__internal" to PrismaClient constructor`);
      for (let [r] of Object.entries(t)) if (!e.includes(r)) {
        let n = gt(r, e);
        throw new F2(`Invalid property ${JSON.stringify(r)} for "__internal" provided to PrismaClient constructor.${n}`);
      }
    }, "__internal") };
    function ks(t, e) {
      for (let [r, n] of Object.entries(t)) {
        if (!Cs.includes(r)) {
          let i = gt(r, Cs);
          throw new F2(`Unknown property ${r} provided to PrismaClient constructor.${i}`);
        }
        Bu[r](n, e);
      }
      if (t.datasourceUrl && t.datasources) throw new F2('Can not use "datasourceUrl" and "datasources" options at the same time. Pick one of them');
    }
    __name(ks, "ks");
    function gt(t, e) {
      if (e.length === 0 || typeof t != "string") return "";
      let r = $u(t, e);
      return r ? ` Did you mean "${r}"?` : "";
    }
    __name(gt, "gt");
    function $u(t, e) {
      if (e.length === 0) return null;
      let r = e.map((i) => ({ value: i, distance: (0, Os.default)(t, i) }));
      r.sort((i, o) => i.distance < o.distance ? -1 : 1);
      let n = r[0];
      return n.distance < 3 ? n.value : null;
    }
    __name($u, "$u");
    function ju(t, e) {
      return Ds(e.models, t) ?? Ds(e.types, t);
    }
    __name(ju, "ju");
    function Ds(t, e) {
      let r = Object.keys(t).find((n) => Ce(n) === e);
      if (r) return t[r];
    }
    __name(Ds, "Ds");
    function Qu(t, e) {
      let r = tt(t);
      for (let o of e) switch (o.kind) {
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
      let { message: n, args: i } = Sr(r, "colorless");
      return `Error validating "omit" option:

${i}

${n}`;
    }
    __name(Qu, "Qu");
    u();
    c();
    p();
    m();
    d();
    l();
    function _s(t) {
      return t.length === 0 ? Promise.resolve([]) : new Promise((e, r) => {
        let n = new Array(t.length), i = null, o = false, s2 = 0, a = /* @__PURE__ */ __name(() => {
          o || (s2++, s2 === t.length && (o = true, i ? r(i) : e(n)));
        }, "a"), f = /* @__PURE__ */ __name((v) => {
          o || (o = true, r(v));
        }, "f");
        for (let v = 0; v < t.length; v++) t[v].then((R) => {
          n[v] = R, a();
        }, (R) => {
          if (!jr(R)) {
            f(R);
            return;
          }
          R.batchRequestIdx === v ? f(R) : (i || (i = R), a());
        });
      });
    }
    __name(_s, "_s");
    var De = j("prisma:client");
    typeof globalThis == "object" && (globalThis.NODE_CLIENT = true);
    var Gu = { requestArgsToMiddlewareArgs: /* @__PURE__ */ __name((t) => t, "requestArgsToMiddlewareArgs"), middlewareArgsToRequestArgs: /* @__PURE__ */ __name((t) => t, "middlewareArgsToRequestArgs") };
    var Ju = /* @__PURE__ */ Symbol.for("prisma.client.transaction.id");
    var Wu = { id: 0, nextId() {
      return ++this.id;
    } };
    function Fs(t) {
      class e {
        static {
          __name(this, "e");
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
        _createPrismaPromise = Gn();
        constructor(n) {
          t = n?.__internal?.configOverride?.(t) ?? t, Jo(t), n && ks(n, t);
          let i = new Fr().on("error", () => {
          });
          this._extensions = rt.empty(), this._previewFeatures = us(t), this._clientVersion = t.clientVersion ?? As, this._activeProvider = t.activeProvider, this._globalOmit = n?.omit, this._tracingHelper = ws();
          let o = t.relativeEnvPaths && { rootEnvPath: t.relativeEnvPaths.rootEnvPath && cr.resolve(t.dirname, t.relativeEnvPaths.rootEnvPath), schemaEnvPath: t.relativeEnvPaths.schemaEnvPath && cr.resolve(t.dirname, t.relativeEnvPaths.schemaEnvPath) }, s2;
          if (n?.adapter) {
            s2 = n.adapter;
            let f = t.activeProvider === "postgresql" || t.activeProvider === "cockroachdb" ? "postgres" : t.activeProvider;
            if (s2.provider !== f) throw new M(`The Driver Adapter \`${s2.adapterName}\`, based on \`${s2.provider}\`, is not compatible with the provider \`${f}\` specified in the Prisma schema.`, this._clientVersion);
            if (n.datasources || n.datasourceUrl !== void 0) throw new M("Custom datasource configuration is not compatible with Prisma Driver Adapters. Please define the database connection string directly in the Driver Adapter configuration.", this._clientVersion);
          }
          let a = t.injectableEdgeEnv?.();
          try {
            let f = n ?? {}, v = f.__internal ?? {}, R = v.debug === true;
            R && j.enable("prisma:client");
            let A = cr.resolve(t.dirname, t.relativePath);
            Pi.existsSync(A) || (A = t.dirname), De("dirname", t.dirname), De("relativePath", t.relativePath), De("cwd", A);
            let I2 = v.engine || {};
            if (f.errorFormat ? this._errorFormat = f.errorFormat : g.env.NODE_ENV === "production" ? this._errorFormat = "minimal" : g.env.NO_COLOR ? this._errorFormat = "colorless" : this._errorFormat = "colorless", this._runtimeDataModel = t.runtimeDataModel, this._engineConfig = { cwd: A, dirname: t.dirname, enableDebugLogs: R, allowTriggerPanic: I2.allowTriggerPanic, prismaPath: I2.binaryPath ?? void 0, engineEndpoint: I2.endpoint, generator: t.generator, showColors: this._errorFormat === "pretty", logLevel: f.log && Ps(f.log), logQueries: f.log && !!(typeof f.log == "string" ? f.log === "query" : f.log.find((C) => typeof C == "string" ? C === "query" : C.level === "query")), env: a?.parsed ?? {}, flags: [], engineWasm: t.engineWasm, compilerWasm: t.compilerWasm, clientVersion: t.clientVersion, engineVersion: t.engineVersion, previewFeatures: this._previewFeatures, activeProvider: t.activeProvider, inlineSchema: t.inlineSchema, overrideDatasources: Wo(f, t.datasourceNames), inlineDatasources: t.inlineDatasources, inlineSchemaHash: t.inlineSchemaHash, tracingHelper: this._tracingHelper, transactionOptions: { maxWait: f.transactionOptions?.maxWait ?? 2e3, timeout: f.transactionOptions?.timeout ?? 5e3, isolationLevel: f.transactionOptions?.isolationLevel }, logEmitter: i, isBundled: t.isBundled, adapter: s2 }, this._accelerateEngineConfig = { ...this._engineConfig, accelerateUtils: { resolveDatasourceUrl: ct, getBatchRequestPayload: ot, prismaGraphQLToJSError: st, PrismaClientUnknownRequestError: Q, PrismaClientInitializationError: M, PrismaClientKnownRequestError: X, debug: j("prisma:client:accelerateEngine"), engineVersion: Ls.version, clientVersion: t.clientVersion } }, De("clientVersion", t.clientVersion), this._engine = ls(t, this._engineConfig), this._requestHandler = new Jr(this, i), f.log) for (let C of f.log) {
              let L2 = typeof C == "string" ? C : C.emit === "stdout" ? C.level : null;
              L2 && this.$on(L2, (D2) => {
                Pt.log(`${Pt.tags[L2] ?? ""}`, D2.message || D2.query);
              });
            }
          } catch (f) {
            throw f.clientVersion = this._clientVersion, f;
          }
          return this._appliedParent = Ut(this);
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
            xi();
          }
        }
        $executeRawInternal(n, i, o, s2) {
          let a = this._activeProvider;
          return this._request({ action: "executeRaw", args: o, transaction: n, clientMethod: i, argsMapper: Qn({ clientMethod: i, activeProvider: a }), callsite: Ie(this._errorFormat), dataPath: [], middlewareArgsMapper: s2 });
        }
        $executeRaw(n, ...i) {
          return this._createPrismaPromise((o) => {
            if (n.raw !== void 0 || n.sql !== void 0) {
              let [s2, a] = Ms(n, i);
              return jn(this._activeProvider, s2.text, s2.values, Array.isArray(n) ? "prisma.$executeRaw`<SQL>`" : "prisma.$executeRaw(sql`<SQL>`)"), this.$executeRawInternal(o, "$executeRaw", s2, a);
            }
            throw new Y("`$executeRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#executeraw\n", { clientVersion: this._clientVersion });
          });
        }
        $executeRawUnsafe(n, ...i) {
          return this._createPrismaPromise((o) => (jn(this._activeProvider, n, i, "prisma.$executeRawUnsafe(<SQL>, [...values])"), this.$executeRawInternal(o, "$executeRawUnsafe", [n, ...i])));
        }
        $runCommandRaw(n) {
          if (t.activeProvider !== "mongodb") throw new Y(`The ${t.activeProvider} provider does not support $runCommandRaw. Use the mongodb provider.`, { clientVersion: this._clientVersion });
          return this._createPrismaPromise((i) => this._request({ args: n, clientMethod: "$runCommandRaw", dataPath: [], action: "runCommandRaw", argsMapper: cs, callsite: Ie(this._errorFormat), transaction: i }));
        }
        async $queryRawInternal(n, i, o, s2) {
          let a = this._activeProvider;
          return this._request({ action: "queryRaw", args: o, transaction: n, clientMethod: i, argsMapper: Qn({ clientMethod: i, activeProvider: a }), callsite: Ie(this._errorFormat), dataPath: [], middlewareArgsMapper: s2 });
        }
        $queryRaw(n, ...i) {
          return this._createPrismaPromise((o) => {
            if (n.raw !== void 0 || n.sql !== void 0) return this.$queryRawInternal(o, "$queryRaw", ...Ms(n, i));
            throw new Y("`$queryRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#queryraw\n", { clientVersion: this._clientVersion });
          });
        }
        $queryRawTyped(n) {
          return this._createPrismaPromise((i) => {
            if (!this._hasPreviewFlag("typedSql")) throw new Y("`typedSql` preview feature must be enabled in order to access $queryRawTyped API", { clientVersion: this._clientVersion });
            return this.$queryRawInternal(i, "$queryRawTyped", n);
          });
        }
        $queryRawUnsafe(n, ...i) {
          return this._createPrismaPromise((o) => this.$queryRawInternal(o, "$queryRawUnsafe", [n, ...i]));
        }
        _transactionWithArray({ promises: n, options: i }) {
          let o = Wu.nextId(), s2 = xs(n.length), a = n.map((f, v) => {
            if (f?.[Symbol.toStringTag] !== "PrismaPromise") throw new Error("All elements of the array need to be Prisma Client promises. Hint: Please make sure you are not awaiting the Prisma client calls you intended to pass in the $transaction function.");
            let R = i?.isolationLevel ?? this._engineConfig.transactionOptions.isolationLevel, A = { kind: "batch", id: o, index: v, isolationLevel: R, lock: s2 };
            return f.requestTransaction?.(A) ?? f;
          });
          return _s(a);
        }
        async _transactionWithCallback({ callback: n, options: i }) {
          let o = { traceparent: this._tracingHelper.getTraceParent() }, s2 = { maxWait: i?.maxWait ?? this._engineConfig.transactionOptions.maxWait, timeout: i?.timeout ?? this._engineConfig.transactionOptions.timeout, isolationLevel: i?.isolationLevel ?? this._engineConfig.transactionOptions.isolationLevel }, a = await this._engine.transaction("start", o, s2), f;
          try {
            let v = { kind: "itx", ...a };
            f = await n(this._createItxClient(v)), await this._engine.transaction("commit", o, a);
          } catch (v) {
            throw await this._engine.transaction("rollback", o, a).catch(() => {
            }), v;
          }
          return f;
        }
        _createItxClient(n) {
          return ce(Ut(ce(Oo(this), [Z("_appliedParent", () => this._appliedParent._createItxClient(n)), Z("_createPrismaPromise", () => Gn(n)), Z(Ju, () => n.id)])), [it(Fo)]);
        }
        $transaction(n, i) {
          let o;
          typeof n == "function" ? this._engineConfig.adapter?.adapterName === "@prisma/adapter-d1" ? o = /* @__PURE__ */ __name(() => {
            throw new Error("Cloudflare D1 does not support interactive transactions. We recommend you to refactor your queries with that limitation in mind, and use batch transactions with `prisma.$transactions([])` where applicable.");
          }, "o") : o = /* @__PURE__ */ __name(() => this._transactionWithCallback({ callback: n, options: i }), "o") : o = /* @__PURE__ */ __name(() => this._transactionWithArray({ promises: n, options: i }), "o");
          let s2 = { name: "transaction", attributes: { method: "$transaction" } };
          return this._tracingHelper.runInChildSpan(s2, o);
        }
        _request(n) {
          n.otelParentCtx = this._tracingHelper.getActiveContext();
          let i = n.middlewareArgsMapper ?? Gu, o = { args: i.requestArgsToMiddlewareArgs(n.args), dataPath: n.dataPath, runInTransaction: !!n.transaction, action: n.action, model: n.model }, s2 = { operation: { name: "operation", attributes: { method: o.action, model: o.model, name: o.model ? `${o.model}.${o.action}` : o.action } } }, a = /* @__PURE__ */ __name(async (f) => {
            let { runInTransaction: v, args: R, ...A } = f, I2 = { ...n, ...A };
            R && (I2.args = i.middlewareArgsToRequestArgs(R)), n.transaction !== void 0 && v === false && delete I2.transaction;
            let C = await Vo(this, I2);
            return I2.model ? Lo({ result: C, modelName: I2.model, args: I2.args, extensions: this._extensions, runtimeDataModel: this._runtimeDataModel, globalOmit: this._globalOmit }) : C;
          }, "a");
          return this._tracingHelper.runInChildSpan(s2.operation, () => a(o));
        }
        async _executeRequest({ args: n, clientMethod: i, dataPath: o, callsite: s2, action: a, model: f, argsMapper: v, transaction: R, unpacker: A, otelParentCtx: I2, customDataProxyFetch: C }) {
          try {
            n = v ? v(n) : n;
            let L2 = { name: "serialize" }, D2 = this._tracingHelper.runInChildSpan(L2, () => _r({ modelName: f, runtimeDataModel: this._runtimeDataModel, action: a, args: n, clientMethod: i, callsite: s2, extensions: this._extensions, errorFormat: this._errorFormat, clientVersion: this._clientVersion, previewFeatures: this._previewFeatures, globalOmit: this._globalOmit }));
            return j.enabled("prisma:client") && (De("Prisma Client call:"), De(`prisma.${i}(${xo(n)})`), De("Generated request:"), De(JSON.stringify(D2, null, 2) + `
`)), R?.kind === "batch" && await R.lock, this._requestHandler.request({ protocolQuery: D2, modelName: f, action: a, clientMethod: i, dataPath: o, callsite: s2, args: n, extensions: this._extensions, transaction: R, unpacker: A, otelParentCtx: I2, otelChildCtx: this._tracingHelper.getActiveContext(), globalOmit: this._globalOmit, customDataProxyFetch: C });
          } catch (L2) {
            throw L2.clientVersion = this._clientVersion, L2;
          }
        }
        $metrics = new nt(this);
        _hasPreviewFlag(n) {
          return !!this._engineConfig.previewFeatures?.includes(n);
        }
        $applyPendingMigrations() {
          return this._engine.applyPendingMigrations();
        }
        $extends = ko;
      }
      return e;
    }
    __name(Fs, "Fs");
    function Ms(t, e) {
      return Ku(t) ? [new ne(t, e), hs] : [t, bs];
    }
    __name(Ms, "Ms");
    function Ku(t) {
      return Array.isArray(t) && Array.isArray(t.raw);
    }
    __name(Ku, "Ku");
    u();
    c();
    p();
    m();
    d();
    l();
    var Hu = /* @__PURE__ */ new Set(["toJSON", "$$typeof", "asymmetricMatch", Symbol.iterator, Symbol.toStringTag, Symbol.isConcatSpreadable, Symbol.toPrimitive]);
    function Ns(t) {
      return new Proxy(t, { get(e, r) {
        if (r in e) return e[r];
        if (!Hu.has(r)) throw new TypeError(`Invalid enum value: ${String(r)}`);
      } });
    }
    __name(Ns, "Ns");
    u();
    c();
    p();
    m();
    d();
    l();
    l();
  }
});

// ../node_modules/.pnpm/@prisma+client@6.19.3_prism_1d040ab5215f59f0e27ddee7f0cf082e/node_modules/.prisma/client/query_engine_bg.js
var require_query_engine_bg = __commonJS({
  "../node_modules/.pnpm/@prisma+client@6.19.3_prism_1d040ab5215f59f0e27ddee7f0cf082e/node_modules/.prisma/client/query_engine_bg.js"(exports, module) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    var F2 = Object.defineProperty;
    var B = Object.getOwnPropertyDescriptor;
    var R = Object.getOwnPropertyNames;
    var U2 = Object.prototype.hasOwnProperty;
    var L2 = /* @__PURE__ */ __name((e, t) => {
      for (var n in t) F2(e, n, { get: t[n], enumerable: true });
    }, "L");
    var N = /* @__PURE__ */ __name((e, t, n, _2) => {
      if (t && typeof t == "object" || typeof t == "function") for (let o of R(t)) !U2.call(e, o) && o !== n && F2(e, o, { get: /* @__PURE__ */ __name(() => t[o], "get"), enumerable: !(_2 = B(t, o)) || _2.enumerable });
      return e;
    }, "N");
    var C = /* @__PURE__ */ __name((e) => N(F2({}, "__esModule", { value: true }), e), "C");
    var qt = {};
    L2(qt, { QueryEngine: /* @__PURE__ */ __name(() => E, "QueryEngine"), __wbg_Error_e83987f665cf5504: /* @__PURE__ */ __name(() => J, "__wbg_Error_e83987f665cf5504"), __wbg_Number_bb48ca12f395cd08: /* @__PURE__ */ __name(() => X, "__wbg_Number_bb48ca12f395cd08"), __wbg_String_8f0eb39a4a4c2f66: /* @__PURE__ */ __name(() => Y, "__wbg_String_8f0eb39a4a4c2f66"), __wbg___wbindgen_bigint_get_as_i64_f3ebc5a755000afd: /* @__PURE__ */ __name(() => K, "__wbg___wbindgen_bigint_get_as_i64_f3ebc5a755000afd"), __wbg___wbindgen_boolean_get_6d5a1ee65bab5f68: /* @__PURE__ */ __name(() => Z, "__wbg___wbindgen_boolean_get_6d5a1ee65bab5f68"), __wbg___wbindgen_debug_string_df47ffb5e35e6763: /* @__PURE__ */ __name(() => ee, "__wbg___wbindgen_debug_string_df47ffb5e35e6763"), __wbg___wbindgen_in_bb933bd9e1b3bc0f: /* @__PURE__ */ __name(() => te, "__wbg___wbindgen_in_bb933bd9e1b3bc0f"), __wbg___wbindgen_is_bigint_cb320707dcd35f0b: /* @__PURE__ */ __name(() => ne, "__wbg___wbindgen_is_bigint_cb320707dcd35f0b"), __wbg___wbindgen_is_function_ee8a6c5833c90377: /* @__PURE__ */ __name(() => re2, "__wbg___wbindgen_is_function_ee8a6c5833c90377"), __wbg___wbindgen_is_object_c818261d21f283a4: /* @__PURE__ */ __name(() => _e, "__wbg___wbindgen_is_object_c818261d21f283a4"), __wbg___wbindgen_is_string_fbb76cb2940daafd: /* @__PURE__ */ __name(() => oe, "__wbg___wbindgen_is_string_fbb76cb2940daafd"), __wbg___wbindgen_is_undefined_2d472862bd29a478: /* @__PURE__ */ __name(() => ce, "__wbg___wbindgen_is_undefined_2d472862bd29a478"), __wbg___wbindgen_jsval_eq_6b13ab83478b1c50: /* @__PURE__ */ __name(() => ie, "__wbg___wbindgen_jsval_eq_6b13ab83478b1c50"), __wbg___wbindgen_jsval_loose_eq_b664b38a2f582147: /* @__PURE__ */ __name(() => se, "__wbg___wbindgen_jsval_loose_eq_b664b38a2f582147"), __wbg___wbindgen_number_get_a20bf9b85341449d: /* @__PURE__ */ __name(() => ue, "__wbg___wbindgen_number_get_a20bf9b85341449d"), __wbg___wbindgen_string_get_e4f06c90489ad01b: /* @__PURE__ */ __name(() => be, "__wbg___wbindgen_string_get_e4f06c90489ad01b"), __wbg___wbindgen_throw_b855445ff6a94295: /* @__PURE__ */ __name(() => fe, "__wbg___wbindgen_throw_b855445ff6a94295"), __wbg__wbg_cb_unref_2454a539ea5790d9: /* @__PURE__ */ __name(() => ae, "__wbg__wbg_cb_unref_2454a539ea5790d9"), __wbg_call_525440f72fbfc0ea: /* @__PURE__ */ __name(() => ge, "__wbg_call_525440f72fbfc0ea"), __wbg_call_e762c39fa8ea36bf: /* @__PURE__ */ __name(() => le, "__wbg_call_e762c39fa8ea36bf"), __wbg_crypto_805be4ce92f1e370: /* @__PURE__ */ __name(() => de, "__wbg_crypto_805be4ce92f1e370"), __wbg_done_2042aa2670fb1db1: /* @__PURE__ */ __name(() => we, "__wbg_done_2042aa2670fb1db1"), __wbg_entries_e171b586f8f6bdbf: /* @__PURE__ */ __name(() => pe, "__wbg_entries_e171b586f8f6bdbf"), __wbg_getRandomValues_f6a868620c8bab49: /* @__PURE__ */ __name(() => xe, "__wbg_getRandomValues_f6a868620c8bab49"), __wbg_getTime_14776bfb48a1bff9: /* @__PURE__ */ __name(() => ye, "__wbg_getTime_14776bfb48a1bff9"), __wbg_get_7bed016f185add81: /* @__PURE__ */ __name(() => me, "__wbg_get_7bed016f185add81"), __wbg_get_ece95cf6585650d9: /* @__PURE__ */ __name(() => he, "__wbg_get_ece95cf6585650d9"), __wbg_get_efcb449f58ec27c2: /* @__PURE__ */ __name(() => Te, "__wbg_get_efcb449f58ec27c2"), __wbg_get_with_ref_key_1dc361bd10053bfe: /* @__PURE__ */ __name(() => Ae, "__wbg_get_with_ref_key_1dc361bd10053bfe"), __wbg_has_787fafc980c3ccdb: /* @__PURE__ */ __name(() => Se, "__wbg_has_787fafc980c3ccdb"), __wbg_instanceof_ArrayBuffer_70beb1189ca63b38: /* @__PURE__ */ __name(() => Fe, "__wbg_instanceof_ArrayBuffer_70beb1189ca63b38"), __wbg_instanceof_Map_8579b5e2ab5437c7: /* @__PURE__ */ __name(() => Ie, "__wbg_instanceof_Map_8579b5e2ab5437c7"), __wbg_instanceof_Promise_001fdd42afa1b7ef: /* @__PURE__ */ __name(() => qe, "__wbg_instanceof_Promise_001fdd42afa1b7ef"), __wbg_instanceof_Uint8Array_20c8e73002f7af98: /* @__PURE__ */ __name(() => ke, "__wbg_instanceof_Uint8Array_20c8e73002f7af98"), __wbg_isArray_96e0af9891d0945d: /* @__PURE__ */ __name(() => Ee, "__wbg_isArray_96e0af9891d0945d"), __wbg_isSafeInteger_d216eda7911dde36: /* @__PURE__ */ __name(() => Oe, "__wbg_isSafeInteger_d216eda7911dde36"), __wbg_iterator_e5822695327a3c39: /* @__PURE__ */ __name(() => Me, "__wbg_iterator_e5822695327a3c39"), __wbg_keys_b4d27b02ad14f4be: /* @__PURE__ */ __name(() => ve, "__wbg_keys_b4d27b02ad14f4be"), __wbg_length_69bca3cb64fc8748: /* @__PURE__ */ __name(() => De, "__wbg_length_69bca3cb64fc8748"), __wbg_length_cdd215e10d9dd507: /* @__PURE__ */ __name(() => je, "__wbg_length_cdd215e10d9dd507"), __wbg_msCrypto_2ac4d17c4748234a: /* @__PURE__ */ __name(() => Be, "__wbg_msCrypto_2ac4d17c4748234a"), __wbg_new_0_f9740686d739025c: /* @__PURE__ */ __name(() => Re, "__wbg_new_0_f9740686d739025c"), __wbg_new_1acc0b6eea89d040: /* @__PURE__ */ __name(() => Ue, "__wbg_new_1acc0b6eea89d040"), __wbg_new_3c3d849046688a66: /* @__PURE__ */ __name(() => Le, "__wbg_new_3c3d849046688a66"), __wbg_new_5a79be3ab53b8aa5: /* @__PURE__ */ __name(() => Ne, "__wbg_new_5a79be3ab53b8aa5"), __wbg_new_68651c719dcda04e: /* @__PURE__ */ __name(() => Ce, "__wbg_new_68651c719dcda04e"), __wbg_new_e17d9f43105b08be: /* @__PURE__ */ __name(() => $e, "__wbg_new_e17d9f43105b08be"), __wbg_new_from_slice_92f4d78ca282a2d2: /* @__PURE__ */ __name(() => Ve, "__wbg_new_from_slice_92f4d78ca282a2d2"), __wbg_new_no_args_ee98eee5275000a4: /* @__PURE__ */ __name(() => We, "__wbg_new_no_args_ee98eee5275000a4"), __wbg_new_with_length_01aa0dc35aa13543: /* @__PURE__ */ __name(() => ze, "__wbg_new_with_length_01aa0dc35aa13543"), __wbg_next_020810e0ae8ebcb0: /* @__PURE__ */ __name(() => Pe, "__wbg_next_020810e0ae8ebcb0"), __wbg_next_2c826fe5dfec6b6a: /* @__PURE__ */ __name(() => Ge, "__wbg_next_2c826fe5dfec6b6a"), __wbg_node_ecc8306b9857f33d: /* @__PURE__ */ __name(() => Qe, "__wbg_node_ecc8306b9857f33d"), __wbg_now_793306c526e2e3b6: /* @__PURE__ */ __name(() => He, "__wbg_now_793306c526e2e3b6"), __wbg_now_7fd00a794a07d388: /* @__PURE__ */ __name(() => Je, "__wbg_now_7fd00a794a07d388"), __wbg_now_b3f7572f6ef3d3a9: /* @__PURE__ */ __name(() => Xe, "__wbg_now_b3f7572f6ef3d3a9"), __wbg_process_5cff2739921be718: /* @__PURE__ */ __name(() => Ye, "__wbg_process_5cff2739921be718"), __wbg_prototypesetcall_2a6620b6922694b2: /* @__PURE__ */ __name(() => Ke, "__wbg_prototypesetcall_2a6620b6922694b2"), __wbg_push_df81a39d04db858c: /* @__PURE__ */ __name(() => Ze, "__wbg_push_df81a39d04db858c"), __wbg_queueMicrotask_5a8a9131f3f0b37b: /* @__PURE__ */ __name(() => et, "__wbg_queueMicrotask_5a8a9131f3f0b37b"), __wbg_queueMicrotask_6d79674585219521: /* @__PURE__ */ __name(() => tt, "__wbg_queueMicrotask_6d79674585219521"), __wbg_randomFillSync_d3c85af7e31cf1f8: /* @__PURE__ */ __name(() => nt, "__wbg_randomFillSync_d3c85af7e31cf1f8"), __wbg_require_0c566c6f2eef6c79: /* @__PURE__ */ __name(() => rt, "__wbg_require_0c566c6f2eef6c79"), __wbg_resolve_caf97c30b83f7053: /* @__PURE__ */ __name(() => _t, "__wbg_resolve_caf97c30b83f7053"), __wbg_setTimeout_5d6a1d4fc51ea450: /* @__PURE__ */ __name(() => ot, "__wbg_setTimeout_5d6a1d4fc51ea450"), __wbg_set_3f1d0b984ed272ed: /* @__PURE__ */ __name(() => ct, "__wbg_set_3f1d0b984ed272ed"), __wbg_set_907fb406c34a251d: /* @__PURE__ */ __name(() => it, "__wbg_set_907fb406c34a251d"), __wbg_set_c213c871859d6500: /* @__PURE__ */ __name(() => st, "__wbg_set_c213c871859d6500"), __wbg_set_c2abbebe8b9ebee1: /* @__PURE__ */ __name(() => ut, "__wbg_set_c2abbebe8b9ebee1"), __wbg_set_wasm: /* @__PURE__ */ __name(() => $3, "__wbg_set_wasm"), __wbg_static_accessor_GLOBAL_89e1d9ac6a1b250e: /* @__PURE__ */ __name(() => bt, "__wbg_static_accessor_GLOBAL_89e1d9ac6a1b250e"), __wbg_static_accessor_GLOBAL_THIS_8b530f326a9e48ac: /* @__PURE__ */ __name(() => ft, "__wbg_static_accessor_GLOBAL_THIS_8b530f326a9e48ac"), __wbg_static_accessor_SELF_6fdf4b64710cc91b: /* @__PURE__ */ __name(() => at, "__wbg_static_accessor_SELF_6fdf4b64710cc91b"), __wbg_static_accessor_WINDOW_b45bfc5a37f6cfa2: /* @__PURE__ */ __name(() => gt, "__wbg_static_accessor_WINDOW_b45bfc5a37f6cfa2"), __wbg_subarray_480600f3d6a9f26c: /* @__PURE__ */ __name(() => lt, "__wbg_subarray_480600f3d6a9f26c"), __wbg_then_4f46f6544e6b4a28: /* @__PURE__ */ __name(() => dt, "__wbg_then_4f46f6544e6b4a28"), __wbg_then_70d05cf780a18d77: /* @__PURE__ */ __name(() => wt, "__wbg_then_70d05cf780a18d77"), __wbg_valueOf_9eee4828c11458ca: /* @__PURE__ */ __name(() => pt, "__wbg_valueOf_9eee4828c11458ca"), __wbg_value_692627309814bb8c: /* @__PURE__ */ __name(() => xt, "__wbg_value_692627309814bb8c"), __wbg_versions_a8e5a362e1f16442: /* @__PURE__ */ __name(() => yt, "__wbg_versions_a8e5a362e1f16442"), __wbindgen_cast_022f8b2bf9dce4aa: /* @__PURE__ */ __name(() => mt, "__wbindgen_cast_022f8b2bf9dce4aa"), __wbindgen_cast_2241b6af4c4b2941: /* @__PURE__ */ __name(() => ht, "__wbindgen_cast_2241b6af4c4b2941"), __wbindgen_cast_4625c577ab2ec9ee: /* @__PURE__ */ __name(() => Tt, "__wbindgen_cast_4625c577ab2ec9ee"), __wbindgen_cast_9ae0607507abb057: /* @__PURE__ */ __name(() => At, "__wbindgen_cast_9ae0607507abb057"), __wbindgen_cast_cb9088102bce6b30: /* @__PURE__ */ __name(() => St, "__wbindgen_cast_cb9088102bce6b30"), __wbindgen_cast_d6cd19b81560fd6e: /* @__PURE__ */ __name(() => Ft, "__wbindgen_cast_d6cd19b81560fd6e"), __wbindgen_init_externref_table: /* @__PURE__ */ __name(() => It, "__wbindgen_init_externref_table"), debug_panic: /* @__PURE__ */ __name(() => P2, "debug_panic"), getBuildTimeInfo: /* @__PURE__ */ __name(() => G, "getBuildTimeInfo") });
    module.exports = C(qt);
    var h = /* @__PURE__ */ __name(() => {
    }, "h");
    h.prototype = h;
    var r;
    function $3(e) {
      r = e;
    }
    __name($3, "$");
    var T = null;
    function p() {
      return (T === null || T.byteLength === 0) && (T = new Uint8Array(r.memory.buffer)), T;
    }
    __name(p, "p");
    var A = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
    A.decode();
    var V = 2146435072;
    var I2 = 0;
    function W2(e, t) {
      return I2 += t, I2 >= V && (A = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true }), A.decode(), I2 = t), A.decode(p().subarray(e, e + t));
    }
    __name(W2, "W");
    function S(e, t) {
      return e = e >>> 0, W2(e, t);
    }
    __name(S, "S");
    var u = 0;
    var x = new TextEncoder();
    "encodeInto" in x || (x.encodeInto = function(e, t) {
      const n = x.encode(e);
      return t.set(n), { read: e.length, written: n.length };
    });
    function b(e, t, n) {
      if (n === void 0) {
        const s2 = x.encode(e), f = t(s2.length, 1) >>> 0;
        return p().subarray(f, f + s2.length).set(s2), u = s2.length, f;
      }
      let _2 = e.length, o = t(_2, 1) >>> 0;
      const i = p();
      let c = 0;
      for (; c < _2; c++) {
        const s2 = e.charCodeAt(c);
        if (s2 > 127) break;
        i[o + c] = s2;
      }
      if (c !== _2) {
        c !== 0 && (e = e.slice(c)), o = n(o, _2, _2 = c + e.length * 3, 1) >>> 0;
        const s2 = p().subarray(o + c, o + _2), f = x.encodeInto(e, s2);
        c += f.written, o = n(o, _2, c, 1) >>> 0;
      }
      return u = c, o;
    }
    __name(b, "b");
    var w = null;
    function l() {
      return (w === null || w.buffer.detached === true || w.buffer.detached === void 0 && w.buffer !== r.memory.buffer) && (w = new DataView(r.memory.buffer)), w;
    }
    __name(l, "l");
    function a(e) {
      return e == null;
    }
    __name(a, "a");
    function q(e) {
      const t = typeof e;
      if (t == "number" || t == "boolean" || e == null) return `${e}`;
      if (t == "string") return `"${e}"`;
      if (t == "symbol") {
        const o = e.description;
        return o == null ? "Symbol" : `Symbol(${o})`;
      }
      if (t == "function") {
        const o = e.name;
        return typeof o == "string" && o.length > 0 ? `Function(${o})` : "Function";
      }
      if (Array.isArray(e)) {
        const o = e.length;
        let i = "[";
        o > 0 && (i += q(e[0]));
        for (let c = 1; c < o; c++) i += ", " + q(e[c]);
        return i += "]", i;
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
    __name(q, "q");
    function y(e) {
      const t = r.__externref_table_alloc();
      return r.__wbindgen_externrefs.set(t, e), t;
    }
    __name(y, "y");
    function g(e, t) {
      try {
        return e.apply(this, t);
      } catch (n) {
        const _2 = y(n);
        r.__wbindgen_exn_store(_2);
      }
    }
    __name(g, "g");
    function k(e, t) {
      return e = e >>> 0, p().subarray(e / 1, e / 1 + t);
    }
    __name(k, "k");
    var O = typeof FinalizationRegistry > "u" ? { register: /* @__PURE__ */ __name(() => {
    }, "register"), unregister: /* @__PURE__ */ __name(() => {
    }, "unregister") } : new FinalizationRegistry((e) => e.dtor(e.a, e.b));
    function z(e, t, n, _2) {
      const o = { a: e, b: t, cnt: 1, dtor: n }, i = /* @__PURE__ */ __name((...c) => {
        o.cnt++;
        const s2 = o.a;
        o.a = 0;
        try {
          return _2(s2, o.b, ...c);
        } finally {
          o.a = s2, i._wbg_cb_unref();
        }
      }, "i");
      return i._wbg_cb_unref = () => {
        --o.cnt === 0 && (o.dtor(o.a, o.b), o.a = 0, O.unregister(o));
      }, O.register(i, o, o), i;
    }
    __name(z, "z");
    function M(e) {
      const t = r.__wbindgen_externrefs.get(e);
      return r.__externref_table_dealloc(e), t;
    }
    __name(M, "M");
    function P2(e) {
      var t = a(e) ? 0 : b(e, r.__wbindgen_malloc, r.__wbindgen_realloc), n = u;
      const _2 = r.debug_panic(t, n);
      if (_2[1]) throw M(_2[0]);
    }
    __name(P2, "P");
    function G() {
      return r.getBuildTimeInfo();
    }
    __name(G, "G");
    function Q(e, t, n) {
      r.wasm_bindgen__convert__closures_____invoke__ha235f3ea55a06a09(e, t, n);
    }
    __name(Q, "Q");
    function H2(e, t, n, _2) {
      r.wasm_bindgen__convert__closures_____invoke__h1a2f20be69ab8911(e, t, n, _2);
    }
    __name(H2, "H");
    var v = typeof FinalizationRegistry > "u" ? { register: /* @__PURE__ */ __name(() => {
    }, "register"), unregister: /* @__PURE__ */ __name(() => {
    }, "unregister") } : new FinalizationRegistry((e) => r.__wbg_queryengine_free(e >>> 0, 1));
    var E = class {
      static {
        __name(this, "E");
      }
      __destroy_into_raw() {
        const t = this.__wbg_ptr;
        return this.__wbg_ptr = 0, v.unregister(this), t;
      }
      free() {
        const t = this.__destroy_into_raw();
        r.__wbg_queryengine_free(t, 0);
      }
      disconnect(t, n) {
        const _2 = b(t, r.__wbindgen_malloc, r.__wbindgen_realloc), o = u, i = b(n, r.__wbindgen_malloc, r.__wbindgen_realloc), c = u;
        return r.queryengine_disconnect(this.__wbg_ptr, _2, o, i, c);
      }
      startTransaction(t, n, _2) {
        const o = b(t, r.__wbindgen_malloc, r.__wbindgen_realloc), i = u, c = b(n, r.__wbindgen_malloc, r.__wbindgen_realloc), s2 = u, f = b(_2, r.__wbindgen_malloc, r.__wbindgen_realloc), d = u;
        return r.queryengine_startTransaction(this.__wbg_ptr, o, i, c, s2, f, d);
      }
      commitTransaction(t, n, _2) {
        const o = b(t, r.__wbindgen_malloc, r.__wbindgen_realloc), i = u, c = b(n, r.__wbindgen_malloc, r.__wbindgen_realloc), s2 = u, f = b(_2, r.__wbindgen_malloc, r.__wbindgen_realloc), d = u;
        return r.queryengine_commitTransaction(this.__wbg_ptr, o, i, c, s2, f, d);
      }
      rollbackTransaction(t, n, _2) {
        const o = b(t, r.__wbindgen_malloc, r.__wbindgen_realloc), i = u, c = b(n, r.__wbindgen_malloc, r.__wbindgen_realloc), s2 = u, f = b(_2, r.__wbindgen_malloc, r.__wbindgen_realloc), d = u;
        return r.queryengine_rollbackTransaction(this.__wbg_ptr, o, i, c, s2, f, d);
      }
      constructor(t, n, _2) {
        const o = r.queryengine_new(t, n, _2);
        if (o[2]) throw M(o[1]);
        return this.__wbg_ptr = o[0] >>> 0, v.register(this, this.__wbg_ptr, this), this;
      }
      query(t, n, _2, o) {
        const i = b(t, r.__wbindgen_malloc, r.__wbindgen_realloc), c = u, s2 = b(n, r.__wbindgen_malloc, r.__wbindgen_realloc), f = u;
        var d = a(_2) ? 0 : b(_2, r.__wbindgen_malloc, r.__wbindgen_realloc), m = u;
        const D2 = b(o, r.__wbindgen_malloc, r.__wbindgen_realloc), j = u;
        return r.queryengine_query(this.__wbg_ptr, i, c, s2, f, d, m, D2, j);
      }
      trace(t) {
        const n = b(t, r.__wbindgen_malloc, r.__wbindgen_realloc), _2 = u;
        return r.queryengine_trace(this.__wbg_ptr, n, _2);
      }
      connect(t, n) {
        const _2 = b(t, r.__wbindgen_malloc, r.__wbindgen_realloc), o = u, i = b(n, r.__wbindgen_malloc, r.__wbindgen_realloc), c = u;
        return r.queryengine_connect(this.__wbg_ptr, _2, o, i, c);
      }
      metrics(t) {
        const n = b(t, r.__wbindgen_malloc, r.__wbindgen_realloc), _2 = u;
        return r.queryengine_metrics(this.__wbg_ptr, n, _2);
      }
    };
    Symbol.dispose && (E.prototype[Symbol.dispose] = E.prototype.free);
    function J(e, t) {
      return Error(S(e, t));
    }
    __name(J, "J");
    function X(e) {
      return Number(e);
    }
    __name(X, "X");
    function Y(e, t) {
      const n = String(t), _2 = b(n, r.__wbindgen_malloc, r.__wbindgen_realloc), o = u;
      l().setInt32(e + 4 * 1, o, true), l().setInt32(e + 4 * 0, _2, true);
    }
    __name(Y, "Y");
    function K(e, t) {
      const n = t, _2 = typeof n == "bigint" ? n : void 0;
      l().setBigInt64(e + 8 * 1, a(_2) ? BigInt(0) : _2, true), l().setInt32(e + 4 * 0, !a(_2), true);
    }
    __name(K, "K");
    function Z(e) {
      const t = e, n = typeof t == "boolean" ? t : void 0;
      return a(n) ? 16777215 : n ? 1 : 0;
    }
    __name(Z, "Z");
    function ee(e, t) {
      const n = q(t), _2 = b(n, r.__wbindgen_malloc, r.__wbindgen_realloc), o = u;
      l().setInt32(e + 4 * 1, o, true), l().setInt32(e + 4 * 0, _2, true);
    }
    __name(ee, "ee");
    function te(e, t) {
      return e in t;
    }
    __name(te, "te");
    function ne(e) {
      return typeof e == "bigint";
    }
    __name(ne, "ne");
    function re2(e) {
      return typeof e == "function";
    }
    __name(re2, "re");
    function _e(e) {
      const t = e;
      return typeof t == "object" && t !== null;
    }
    __name(_e, "_e");
    function oe(e) {
      return typeof e == "string";
    }
    __name(oe, "oe");
    function ce(e) {
      return e === void 0;
    }
    __name(ce, "ce");
    function ie(e, t) {
      return e === t;
    }
    __name(ie, "ie");
    function se(e, t) {
      return e == t;
    }
    __name(se, "se");
    function ue(e, t) {
      const n = t, _2 = typeof n == "number" ? n : void 0;
      l().setFloat64(e + 8 * 1, a(_2) ? 0 : _2, true), l().setInt32(e + 4 * 0, !a(_2), true);
    }
    __name(ue, "ue");
    function be(e, t) {
      const n = t, _2 = typeof n == "string" ? n : void 0;
      var o = a(_2) ? 0 : b(_2, r.__wbindgen_malloc, r.__wbindgen_realloc), i = u;
      l().setInt32(e + 4 * 1, i, true), l().setInt32(e + 4 * 0, o, true);
    }
    __name(be, "be");
    function fe(e, t) {
      throw new Error(S(e, t));
    }
    __name(fe, "fe");
    function ae(e) {
      e._wbg_cb_unref();
    }
    __name(ae, "ae");
    function ge() {
      return g(function(e, t, n) {
        return e.call(t, n);
      }, arguments);
    }
    __name(ge, "ge");
    function le() {
      return g(function(e, t) {
        return e.call(t);
      }, arguments);
    }
    __name(le, "le");
    function de(e) {
      return e.crypto;
    }
    __name(de, "de");
    function we(e) {
      return e.done;
    }
    __name(we, "we");
    function pe(e) {
      return Object.entries(e);
    }
    __name(pe, "pe");
    function xe() {
      return g(function(e, t) {
        e.getRandomValues(t);
      }, arguments);
    }
    __name(xe, "xe");
    function ye(e) {
      return e.getTime();
    }
    __name(ye, "ye");
    function me(e, t) {
      return e[t >>> 0];
    }
    __name(me, "me");
    function he() {
      return g(function(e, t) {
        return e[t];
      }, arguments);
    }
    __name(he, "he");
    function Te() {
      return g(function(e, t) {
        return Reflect.get(e, t);
      }, arguments);
    }
    __name(Te, "Te");
    function Ae(e, t) {
      return e[t];
    }
    __name(Ae, "Ae");
    function Se() {
      return g(function(e, t) {
        return Reflect.has(e, t);
      }, arguments);
    }
    __name(Se, "Se");
    function Fe(e) {
      let t;
      try {
        t = e instanceof ArrayBuffer;
      } catch {
        t = false;
      }
      return t;
    }
    __name(Fe, "Fe");
    function Ie(e) {
      let t;
      try {
        t = e instanceof Map;
      } catch {
        t = false;
      }
      return t;
    }
    __name(Ie, "Ie");
    function qe(e) {
      let t;
      try {
        t = e instanceof Promise;
      } catch {
        t = false;
      }
      return t;
    }
    __name(qe, "qe");
    function ke(e) {
      let t;
      try {
        t = e instanceof Uint8Array;
      } catch {
        t = false;
      }
      return t;
    }
    __name(ke, "ke");
    function Ee(e) {
      return Array.isArray(e);
    }
    __name(Ee, "Ee");
    function Oe(e) {
      return Number.isSafeInteger(e);
    }
    __name(Oe, "Oe");
    function Me() {
      return Symbol.iterator;
    }
    __name(Me, "Me");
    function ve(e) {
      return Object.keys(e);
    }
    __name(ve, "ve");
    function De(e) {
      return e.length;
    }
    __name(De, "De");
    function je(e) {
      return e.length;
    }
    __name(je, "je");
    function Be(e) {
      return e.msCrypto;
    }
    __name(Be, "Be");
    function Re() {
      return /* @__PURE__ */ new Date();
    }
    __name(Re, "Re");
    function Ue() {
      return new Object();
    }
    __name(Ue, "Ue");
    function Le(e, t) {
      try {
        var n = { a: e, b: t }, _2 = /* @__PURE__ */ __name((i, c) => {
          const s2 = n.a;
          n.a = 0;
          try {
            return H2(s2, n.b, i, c);
          } finally {
            n.a = s2;
          }
        }, "_");
        return new Promise(_2);
      } finally {
        n.a = n.b = 0;
      }
    }
    __name(Le, "Le");
    function Ne(e) {
      return new Uint8Array(e);
    }
    __name(Ne, "Ne");
    function Ce() {
      return /* @__PURE__ */ new Map();
    }
    __name(Ce, "Ce");
    function $e() {
      return new Array();
    }
    __name($e, "$e");
    function Ve(e, t) {
      return new Uint8Array(k(e, t));
    }
    __name(Ve, "Ve");
    function We(e, t) {
      return new h(S(e, t));
    }
    __name(We, "We");
    function ze(e) {
      return new Uint8Array(e >>> 0);
    }
    __name(ze, "ze");
    function Pe() {
      return g(function(e) {
        return e.next();
      }, arguments);
    }
    __name(Pe, "Pe");
    function Ge(e) {
      return e.next;
    }
    __name(Ge, "Ge");
    function Qe(e) {
      return e.node;
    }
    __name(Qe, "Qe");
    function He() {
      return Date.now();
    }
    __name(He, "He");
    function Je(e) {
      return e.now();
    }
    __name(Je, "Je");
    function Xe() {
      return g(function() {
        return Date.now();
      }, arguments);
    }
    __name(Xe, "Xe");
    function Ye(e) {
      return e.process;
    }
    __name(Ye, "Ye");
    function Ke(e, t, n) {
      Uint8Array.prototype.set.call(k(e, t), n);
    }
    __name(Ke, "Ke");
    function Ze(e, t) {
      return e.push(t);
    }
    __name(Ze, "Ze");
    function et(e) {
      return e.queueMicrotask;
    }
    __name(et, "et");
    function tt(e) {
      queueMicrotask(e);
    }
    __name(tt, "tt");
    function nt() {
      return g(function(e, t) {
        e.randomFillSync(t);
      }, arguments);
    }
    __name(nt, "nt");
    function rt() {
      return g(function() {
        return module.require;
      }, arguments);
    }
    __name(rt, "rt");
    function _t(e) {
      return Promise.resolve(e);
    }
    __name(_t, "_t");
    function ot(e, t) {
      return setTimeout(e, t >>> 0);
    }
    __name(ot, "ot");
    function ct(e, t, n) {
      e[t] = n;
    }
    __name(ct, "ct");
    function it(e, t, n) {
      return e.set(t, n);
    }
    __name(it, "it");
    function st(e, t, n) {
      e[t >>> 0] = n;
    }
    __name(st, "st");
    function ut() {
      return g(function(e, t, n) {
        return Reflect.set(e, t, n);
      }, arguments);
    }
    __name(ut, "ut");
    function bt() {
      const e = typeof global > "u" ? null : global;
      return a(e) ? 0 : y(e);
    }
    __name(bt, "bt");
    function ft() {
      const e = typeof globalThis > "u" ? null : globalThis;
      return a(e) ? 0 : y(e);
    }
    __name(ft, "ft");
    function at() {
      const e = typeof self > "u" ? null : self;
      return a(e) ? 0 : y(e);
    }
    __name(at, "at");
    function gt() {
      const e = typeof window > "u" ? null : window;
      return a(e) ? 0 : y(e);
    }
    __name(gt, "gt");
    function lt(e, t, n) {
      return e.subarray(t >>> 0, n >>> 0);
    }
    __name(lt, "lt");
    function dt(e, t) {
      return e.then(t);
    }
    __name(dt, "dt");
    function wt(e, t, n) {
      return e.then(t, n);
    }
    __name(wt, "wt");
    function pt(e) {
      return e.valueOf();
    }
    __name(pt, "pt");
    function xt(e) {
      return e.value;
    }
    __name(xt, "xt");
    function yt(e) {
      return e.versions;
    }
    __name(yt, "yt");
    function mt(e, t) {
      return z(e, t, r.wasm_bindgen__closure__destroy__hf9ae564cf31e91c2, Q);
    }
    __name(mt, "mt");
    function ht(e, t) {
      return S(e, t);
    }
    __name(ht, "ht");
    function Tt(e) {
      return BigInt.asUintN(64, e);
    }
    __name(Tt, "Tt");
    function At(e) {
      return e;
    }
    __name(At, "At");
    function St(e, t) {
      return k(e, t);
    }
    __name(St, "St");
    function Ft(e) {
      return e;
    }
    __name(Ft, "Ft");
    function It() {
      const e = r.__wbindgen_externrefs, t = e.grow(4);
      e.set(0, void 0), e.set(t + 0, void 0), e.set(t + 1, null), e.set(t + 2, true), e.set(t + 3, false);
    }
    __name(It, "It");
  }
});

// ../node_modules/.pnpm/@prisma+client@6.19.3_prism_1d040ab5215f59f0e27ddee7f0cf082e/node_modules/.prisma/client/wasm-worker-loader.mjs
var wasm_worker_loader_exports = {};
__export(wasm_worker_loader_exports, {
  default: () => wasm_worker_loader_default
});
var wasm_worker_loader_default;
var init_wasm_worker_loader = __esm({
  "../node_modules/.pnpm/@prisma+client@6.19.3_prism_1d040ab5215f59f0e27ddee7f0cf082e/node_modules/.prisma/client/wasm-worker-loader.mjs"() {
    init_checked_fetch();
    init_modules_watch_stub();
    wasm_worker_loader_default = import("./1a1a77aff3a08106cd663060e2fafbc51c6d6516-query_engine_bg.wasm");
  }
});

// ../node_modules/.pnpm/@prisma+client@6.19.3_prism_1d040ab5215f59f0e27ddee7f0cf082e/node_modules/.prisma/client/wasm.js
var require_wasm = __commonJS({
  "../node_modules/.pnpm/@prisma+client@6.19.3_prism_1d040ab5215f59f0e27ddee7f0cf082e/node_modules/.prisma/client/wasm.js"(exports) {
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
      objectEnumValues: objectEnumValues2,
      makeStrictEnum: makeStrictEnum2,
      Extensions: Extensions2,
      warnOnce: warnOnce2,
      defineDmmfProperty: defineDmmfProperty2,
      Public: Public2,
      getRuntime: getRuntime2,
      createParam: createParam2
    } = require_wasm_engine_edge();
    var Prisma = {};
    exports.Prisma = Prisma;
    exports.$Enums = {};
    Prisma.prismaVersion = {
      client: "6.19.3",
      engine: "c2990dca591cba766e3b7ef5d9e8a84796e47ab7"
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
    Prisma.DbNull = objectEnumValues2.instances.DbNull;
    Prisma.JsonNull = objectEnumValues2.instances.JsonNull;
    Prisma.AnyNull = objectEnumValues2.instances.AnyNull;
    Prisma.NullTypes = {
      DbNull: objectEnumValues2.classes.DbNull,
      JsonNull: objectEnumValues2.classes.JsonNull,
      AnyNull: objectEnumValues2.classes.AnyNull
    };
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
      "generator": {
        "name": "client",
        "provider": {
          "fromEnvVar": null,
          "value": "prisma-client-js"
        },
        "output": {
          "value": "C:\\Users\\Admin\\Documents\\AIGen-UI\\node_modules\\.pnpm\\@prisma+client@6.19.3_prism_1d040ab5215f59f0e27ddee7f0cf082e\\node_modules\\@prisma\\client",
          "fromEnvVar": null
        },
        "config": {
          "engineType": "library"
        },
        "binaryTargets": [
          {
            "fromEnvVar": null,
            "value": "windows",
            "native": true
          }
        ],
        "previewFeatures": [
          "driverAdapters"
        ],
        "sourceFilePath": "C:\\Users\\Admin\\Documents\\AIGen-UI\\server\\prisma\\schema.prisma"
      },
      "relativeEnvPaths": {
        "rootEnvPath": null,
        "schemaEnvPath": "../../../../../../server/.env"
      },
      "relativePath": "../../../../../../server/prisma",
      "clientVersion": "6.19.3",
      "engineVersion": "c2990dca591cba766e3b7ef5d9e8a84796e47ab7",
      "datasourceNames": [
        "db"
      ],
      "activeProvider": "mysql",
      "postinstall": false,
      "inlineDatasources": {
        "db": {
          "url": {
            "fromEnvVar": "DATABASE_URL",
            "value": null
          }
        }
      },
      "inlineSchema": 'generator client {\n  provider        = "prisma-client-js"\n  previewFeatures = ["driverAdapters"]\n}\n\ndatasource db {\n  provider = "mysql"\n  url      = env("DATABASE_URL")\n}\n\nmodel TeamConfig {\n  id          String   @id @default(uuid())\n  user_id     String   @unique\n  team_config Json     @default("[{\\"id\\":\\"team-default\\",\\"logo\\":\\"IconMosaic\\",\\"name\\":\\"AIGen-UI\\",\\"role\\":\\"online\\",\\"permissions\\":[\\"read\\"]}]")\n  created_at  DateTime @default(now())\n  updated_at  DateTime @updatedAt\n\n  @@map("team_configs")\n}\n\nmodel MenuConfig {\n  id          String   @id @default(uuid())\n  user_id     String   @unique\n  menu_config Json     @default("{\\"items\\":[{\\"type\\":\\"text-button\\",\\"label\\":\\"\u6743\u9650\u7533\u8BF7\\"},{\\"type\\":\\"dropdown\\",\\"label\\":\\"\u8BED\u8A00\\",\\"options\\":[\\"\u4E2D\u6587\\",\\"English\\"]}]}")\n  created_at  DateTime @default(now())\n  updated_at  DateTime @updatedAt\n\n  @@map("menu_configs")\n}\n\nmodel PageConfig {\n  id          String   @id @default(uuid())\n  user_id     String\n  title       String\n  page_config Json\n  created_at  DateTime @default(now())\n  updated_at  DateTime @updatedAt\n\n  @@map("page_configs")\n}\n\nmodel AiChatSession {\n  id         String          @id @default(uuid())\n  user_id    String\n  title      String          @default("New Chat")\n  created_at DateTime        @default(now())\n  updated_at DateTime        @updatedAt\n  messages   AiChatMessage[]\n\n  @@map("ai_chat_sessions")\n}\n\nmodel AiChatMessage {\n  id          String        @id @default(uuid())\n  session_id  String\n  session     AiChatSession @relation(fields: [session_id], references: [id], onDelete: Cascade)\n  role        String\n  content     String?       @db.Text\n  config_data Json?\n  status      String?       @default("complete")\n  created_at  DateTime      @default(now())\n\n  @@map("ai_chat_messages")\n}\n',
      "inlineSchemaHash": "d7bb1d3b054bde814630e9332f517d294c4c38075b34cf1d991ccc291248cb0b",
      "copyEngine": true
    };
    config.dirname = "/";
    config.runtimeDataModel = JSON.parse('{"models":{"TeamConfig":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"user_id","kind":"scalar","type":"String"},{"name":"team_config","kind":"scalar","type":"Json"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"}],"dbName":"team_configs"},"MenuConfig":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"user_id","kind":"scalar","type":"String"},{"name":"menu_config","kind":"scalar","type":"Json"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"}],"dbName":"menu_configs"},"PageConfig":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"user_id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"page_config","kind":"scalar","type":"Json"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"}],"dbName":"page_configs"},"AiChatSession":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"user_id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"},{"name":"messages","kind":"object","type":"AiChatMessage","relationName":"AiChatMessageToAiChatSession"}],"dbName":"ai_chat_sessions"},"AiChatMessage":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"session_id","kind":"scalar","type":"String"},{"name":"session","kind":"object","type":"AiChatSession","relationName":"AiChatMessageToAiChatSession"},{"name":"role","kind":"scalar","type":"String"},{"name":"content","kind":"scalar","type":"String"},{"name":"config_data","kind":"scalar","type":"Json"},{"name":"status","kind":"scalar","type":"String"},{"name":"created_at","kind":"scalar","type":"DateTime"}],"dbName":"ai_chat_messages"}},"enums":{},"types":{}}');
    defineDmmfProperty2(exports.Prisma, config.runtimeDataModel);
    config.engineWasm = {
      getRuntime: /* @__PURE__ */ __name(async () => require_query_engine_bg(), "getRuntime"),
      getQueryEngineWasmModule: /* @__PURE__ */ __name(async () => {
        const loader = (await Promise.resolve().then(() => (init_wasm_worker_loader(), wasm_worker_loader_exports))).default;
        const engine = (await loader).default;
        return engine;
      }, "getQueryEngineWasmModule")
    };
    config.compilerWasm = void 0;
    config.injectableEdgeEnv = () => ({
      parsed: {
        DATABASE_URL: typeof globalThis !== "undefined" && globalThis["DATABASE_URL"] || typeof process !== "undefined" && process.env && process.env.DATABASE_URL || void 0
      }
    });
    if (typeof globalThis !== "undefined" && globalThis["DEBUG"] || typeof process !== "undefined" && process.env && process.env.DEBUG || void 0) {
      Debug3.enable(typeof globalThis !== "undefined" && globalThis["DEBUG"] || typeof process !== "undefined" && process.env && process.env.DEBUG || void 0);
    }
    var PrismaClient2 = getPrismaClient2(config);
    exports.PrismaClient = PrismaClient2;
    Object.assign(exports, Prisma);
  }
});

// ../node_modules/.pnpm/@prisma+client@6.19.3_prism_1d040ab5215f59f0e27ddee7f0cf082e/node_modules/.prisma/client/default.js
var require_default = __commonJS({
  "../node_modules/.pnpm/@prisma+client@6.19.3_prism_1d040ab5215f59f0e27ddee7f0cf082e/node_modules/.prisma/client/default.js"(exports, module) {
    init_checked_fetch();
    init_modules_watch_stub();
    module.exports = { ...require_wasm() };
  }
});

// ../node_modules/.pnpm/@prisma+client@6.19.3_prism_1d040ab5215f59f0e27ddee7f0cf082e/node_modules/@prisma/client/default.js
var require_default2 = __commonJS({
  "../node_modules/.pnpm/@prisma+client@6.19.3_prism_1d040ab5215f59f0e27ddee7f0cf082e/node_modules/@prisma/client/default.js"(exports, module) {
    init_checked_fetch();
    init_modules_watch_stub();
    module.exports = {
      ...require_default()
    };
  }
});

// .wrangler/tmp/bundle-OENzF1/middleware-loader.entry.ts
init_checked_fetch();
init_modules_watch_stub();

// .wrangler/tmp/bundle-OENzF1/middleware-insertion-facade.js
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
    return c.json({ error: JSON.stringify(err, Object.getOwnPropertyNames(err)) }, 500);
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
    return c.json({ error: JSON.stringify(error, Object.getOwnPropertyNames(error)) }, 500);
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
    return c.json({ error: JSON.stringify(error, Object.getOwnPropertyNames(error)) }, 500);
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
    console.error("API Error POST /pages/sync:", error);
    return c.json({ error: JSON.stringify(error, Object.getOwnPropertyNames(error)) }, 500);
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

// .wrangler/tmp/bundle-OENzF1/middleware-insertion-facade.js
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

// .wrangler/tmp/bundle-OENzF1/middleware-loader.entry.ts
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
//# sourceMappingURL=index.js.map

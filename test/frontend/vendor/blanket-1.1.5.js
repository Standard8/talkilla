typeof QUnit != "undefined" && (QUnit.config.autostart = !1),
function(e) {
  (function(t, n) {
    "use strict";
    typeof e == "function" && e.amd ? e(["exports"], n) : typeof exports != "undefined" ? n(exports) : n(t.esprima = {})
  })(this, function(e) {
    "use strict";

    function m(e, t) {
      if (!e) throw new Error("ASSERT: " + t)
    }

    function g(e, t) {
      return u.slice(e, t)
    }

    function y(e) {
      return "0123456789".indexOf(e) >= 0
    }

    function b(e) {
      return "0123456789abcdefABCDEF".indexOf(e) >= 0
    }

    function w(e) {
      return "01234567".indexOf(e) >= 0
    }

    function E(e) {
      return e === " " || e === " " || e === "" || e === "\f" || e === "\u00a0" || e.charCodeAt(0) >= 5760 && "\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\ufeff".indexOf(e) >= 0
    }

    function S(e) {
      return e === "\n" || e === "\r" || e === "\u2028" || e === "\u2029"
    }

    function x(e) {
      return e === "$" || e === "_" || e === "\\" || e >= "a" && e <= "z" || e >= "A" && e <= "Z" || e.charCodeAt(0) >= 128 && o.NonAsciiIdentifierStart.test(e)
    }

    function T(e) {
      return e === "$" || e === "_" || e === "\\" || e >= "a" && e <= "z" || e >= "A" && e <= "Z" || e >= "0" && e <= "9" || e.charCodeAt(0) >= 128 && o.NonAsciiIdentifierPart.test(e)
    }

    function N(e) {
      switch (e) {
        case "class":
        case "enum":
        case "export":
        case "extends":
        case "import":
        case "super":
          return !0
      }
      return !1
    }

    function C(e) {
      switch (e) {
        case "implements":
        case "interface":
        case "package":
        case "private":
        case "protected":
        case "public":
        case "static":
        case "yield":
        case "let":
          return !0
      }
      return !1
    }

    function k(e) {
      return e === "eval" || e === "arguments"
    }

    function L(e) {
      var t = !1;
      switch (e.length) {
        case 2:
          t = e === "if" || e === "in" || e === "do";
          break;
        case 3:
          t = e === "var" || e === "for" || e === "new" || e === "try";
          break;
        case 4:
          t = e === "this" || e === "else" || e === "case" || e === "void" || e === "with";
          break;
        case 5:
          t = e === "while" || e === "break" || e === "catch" || e === "throw";
          break;
        case 6:
          t = e === "return" || e === "typeof" || e === "delete" || e === "switch";
          break;
        case 7:
          t = e === "default" || e === "finally";
          break;
        case 8:
          t = e === "function" || e === "continue" || e === "debugger";
          break;
        case 10:
          t = e === "instanceof"
      }
      if (t) return !0;
      switch (e) {
        case "const":
          return !0;
        case "yield":
        case "let":
          return !0
      }
      return a && C(e) ? !0 : N(e)
    }

    function A() {
      var e, t, n;
      t = !1, n = !1;
      while (f < h) {
        e = u[f];
        if (n) e = u[f++], S(e) && (n = !1, e === "\r" && u[f] === "\n" && ++f, ++l, c = f);
        else if (t) S(e) ? (e === "\r" && u[f + 1] === "\n" && ++f, ++l, ++f, c = f, f >= h && R({}, s.UnexpectedToken, "ILLEGAL")) : (e = u[f++], f >= h && R({}, s.UnexpectedToken, "ILLEGAL"), e === "*" && (e = u[f], e === "/" && (++f, t = !1)));
        else if (e === "/") {
          e = u[f + 1];
          if (e === "/") f += 2, n = !0;
          else {
            if (e !== "*") break;
            f += 2, t = !0, f >= h && R({}, s.UnexpectedToken, "ILLEGAL")
          }
        } else if (E(e))++f;
        else {
          if (!S(e)) break;
          ++f, e === "\r" && u[f] === "\n" && ++f, ++l, c = f
        }
      }
    }

    function O(e) {
      var t, n, r, i = 0;
      n = e === "u" ? 4 : 2;
      for (t = 0; t < n; ++t) {
        if (!(f < h && b(u[f]))) return "";
        r = u[f++], i = i * 16 + "0123456789abcdef".indexOf(r.toLowerCase())
      }
      return String.fromCharCode(i)
    }

    function M() {
      var e, n, r, i;
      e = u[f];
      if (!x(e)) return;
      n = f;
      if (e === "\\") {
        ++f;
        if (u[f] !== "u") return;
        ++f, i = f, e = O("u");
        if (e) {
          if (e === "\\" || !x(e)) return;
          r = e
        } else f = i, r = "u"
      } else r = u[f++];
      while (f < h) {
        e = u[f];
        if (!T(e)) break;
        if (e === "\\") {
          ++f;
          if (u[f] !== "u") return;
          ++f, i = f, e = O("u");
          if (e) {
            if (e === "\\" || !T(e)) return;
            r += e
          } else f = i, r += "u"
        } else r += u[f++]
      }
      return r.length === 1 ? {
        type: t.Identifier,
        value: r,
        lineNumber: l,
        lineStart: c,
        range: [n, f]
      } : L(r) ? {
        type: t.Keyword,
        value: r,
        lineNumber: l,
        lineStart: c,
        range: [n, f]
      } : r === "null" ? {
        type: t.NullLiteral,
        value: r,
        lineNumber: l,
        lineStart: c,
        range: [n, f]
      } : r === "true" || r === "false" ? {
        type: t.BooleanLiteral,
        value: r,
        lineNumber: l,
        lineStart: c,
        range: [n, f]
      } : {
        type: t.Identifier,
        value: r,
        lineNumber: l,
        lineStart: c,
        range: [n, f]
      }
    }

    function _() {
      var e = f,
        n = u[f],
        r, i, s;
      if (n === ";" || n === "{" || n === "}") return ++f, {
        type: t.Punctuator,
        value: n,
        lineNumber: l,
        lineStart: c,
        range: [e, f]
      };
      if (n === "," || n === "(" || n === ")") return ++f, {
        type: t.Punctuator,
        value: n,
        lineNumber: l,
        lineStart: c,
        range: [e, f]
      };
      r = u[f + 1];
      if (n === "." && !y(r)) return {
        type: t.Punctuator,
        value: u[f++],
        lineNumber: l,
        lineStart: c,
        range: [e, f]
      };
      i = u[f + 2], s = u[f + 3];
      if (n === ">" && r === ">" && i === ">" && s === "=") return f += 4, {
        type: t.Punctuator,
        value: ">>>=",
        lineNumber: l,
        lineStart: c,
        range: [e, f]
      };
      if (n === "=" && r === "=" && i === "=") return f += 3, {
        type: t.Punctuator,
        value: "===",
        lineNumber: l,
        lineStart: c,
        range: [e, f]
      };
      if (n === "!" && r === "=" && i === "=") return f += 3, {
        type: t.Punctuator,
        value: "!==",
        lineNumber: l,
        lineStart: c,
        range: [e, f]
      };
      if (n === ">" && r === ">" && i === ">") return f += 3, {
        type: t.Punctuator,
        value: ">>>",
        lineNumber: l,
        lineStart: c,
        range: [e, f]
      };
      if (n === "<" && r === "<" && i === "=") return f += 3, {
        type: t.Punctuator,
        value: "<<=",
        lineNumber: l,
        lineStart: c,
        range: [e, f]
      };
      if (n === ">" && r === ">" && i === "=") return f += 3, {
        type: t.Punctuator,
        value: ">>=",
        lineNumber: l,
        lineStart: c,
        range: [e, f]
      };
      if (r === "=" && "<>=!+-*%&|^/".indexOf(n) >= 0) return f += 2, {
        type: t.Punctuator,
        value: n + r,
        lineNumber: l,
        lineStart: c,
        range: [e, f]
      };
      if (n === r && "+-<>&|".indexOf(n) >= 0 && "+-<>&|".indexOf(r) >= 0) return f += 2, {
        type: t.Punctuator,
        value: n + r,
        lineNumber: l,
        lineStart: c,
        range: [e, f]
      };
      if ("[]<>+-*%&|^!~?:=/".indexOf(n) >= 0) return {
        type: t.Punctuator,
        value: u[f++],
        lineNumber: l,
        lineStart: c,
        range: [e, f]
      }
    }

    function D() {
      var e, n, r;
      r = u[f], m(y(r) || r === ".", "Numeric literal must start with a decimal digit or a decimal point"), n = f, e = "";
      if (r !== ".") {
        e = u[f++], r = u[f];
        if (e === "0") {
          if (r === "x" || r === "X") {
            e += u[f++];
            while (f < h) {
              r = u[f];
              if (!b(r)) break;
              e += u[f++]
            }
            return e.length <= 2 && R({}, s.UnexpectedToken, "ILLEGAL"), f < h && (r = u[f], x(r) && R({}, s.UnexpectedToken, "ILLEGAL")), {
              type: t.NumericLiteral,
              value: parseInt(e, 16),
              lineNumber: l,
              lineStart: c,
              range: [n, f]
            }
          }
          if (w(r)) {
            e += u[f++];
            while (f < h) {
              r = u[f];
              if (!w(r)) break;
              e += u[f++]
            }
            return f < h && (r = u[f], (x(r) || y(r)) && R({}, s.UnexpectedToken, "ILLEGAL")), {
              type: t.NumericLiteral,
              value: parseInt(e, 8),
              octal: !0,
              lineNumber: l,
              lineStart: c,
              range: [n, f]
            }
          }
          y(r) && R({}, s.UnexpectedToken, "ILLEGAL")
        }
        while (f < h) {
          r = u[f];
          if (!y(r)) break;
          e += u[f++]
        }
      }
      if (r === ".") {
        e += u[f++];
        while (f < h) {
          r = u[f];
          if (!y(r)) break;
          e += u[f++]
        }
      }
      if (r === "e" || r === "E") {
        e += u[f++], r = u[f];
        if (r === "+" || r === "-") e += u[f++];
        r = u[f];
        if (y(r)) {
          e += u[f++];
          while (f < h) {
            r = u[f];
            if (!y(r)) break;
            e += u[f++]
          }
        } else r = "character " + r, f >= h && (r = "<end>"), R({}, s.UnexpectedToken, "ILLEGAL")
      }
      return f < h && (r = u[f], x(r) && R({}, s.UnexpectedToken, "ILLEGAL")), {
        type: t.NumericLiteral,
        value: parseFloat(e),
        lineNumber: l,
        lineStart: c,
        range: [n, f]
      }
    }

    function P() {
      var e = "",
        n, r, i, o, a, p, d = !1;
      n = u[f], m(n === "'" || n === '"', "String literal must starts with a quote"), r = f, ++f;
      while (f < h) {
        i = u[f++];
        if (i === n) {
          n = "";
          break
        }
        if (i === "\\") {
          i = u[f++];
          if (!S(i)) switch (i) {
            case "n":
              e += "\n";
              break;
            case "r":
              e += "\r";
              break;
            case "t":
              e += "  ";
              break;
            case "u":
            case "x":
              p = f, a = O(i), a ? e += a : (f = p, e += i);
              break;
            case "b":
              e += "\b";
              break;
            case "f":
              e += "\f";
              break;
            case "v":
              e += "";
              break;
            default:
              w(i) ? (o = "01234567".indexOf(i), o !== 0 && (d = !0), f < h && w(u[f]) && (d = !0, o = o * 8 + "01234567".indexOf(u[f++]), "0123".indexOf(i) >= 0 && f < h && w(u[f]) && (o = o * 8 + "01234567".indexOf(u[f++]))), e += String.fromCharCode(o)) : e += i
          } else ++l, i === "\r" && u[f] === "\n" && ++f
        } else {
          if (S(i)) break;
          e += i
        }
      }
      return n !== "" && R({}, s.UnexpectedToken, "ILLEGAL"), {
        type: t.StringLiteral,
        value: e,
        octal: d,
        lineNumber: l,
        lineStart: c,
        range: [r, f]
      }
    }

    function H() {
      var e, t, n, r, i, o, a = !1,
        l, c = !1;
      p = null, A(), n = f, t = u[f], m(t === "/", "Regular expression literal must start with a slash"), e = u[f++];
      while (f < h) {
        t = u[f++], e += t;
        if (a) t === "]" && (a = !1);
        else if (t === "\\") t = u[f++], S(t) && R({}, s.UnterminatedRegExp), e += t;
        else {
          if (t === "/") {
            c = !0;
            break
          }
          t === "[" ? a = !0 : S(t) && R({}, s.UnterminatedRegExp)
        }
      }
      c || R({}, s.UnterminatedRegExp), r = e.substr(1, e.length - 2), i = "";
      while (f < h) {
        t = u[f];
        if (!T(t)) break;
        ++f;
        if (t === "\\" && f < h) {
          t = u[f];
          if (t === "u") {
            ++f, l = f, t = O("u");
            if (t) {
              i += t, e += "\\u";
              for (; l < f; ++l) e += u[l]
            } else f = l, i += "u", e += "\\u"
          } else e += "\\"
        } else i += t, e += t
      }
      try {
        o = new RegExp(r, i)
      } catch (d) {
        R({}, s.InvalidRegExp)
      }
      return {
        literal: e,
        value: o,
        range: [n, f]
      }
    }

    function B(e) {
      return e.type === t.Identifier || e.type === t.Keyword || e.type === t.BooleanLiteral || e.type === t.NullLiteral
    }

    function j() {
      var e, n;
      A();
      if (f >= h) return {
        type: t.EOF,
        lineNumber: l,
        lineStart: c,
        range: [f, f]
      };
      n = _();
      if (typeof n != "undefined") return n;
      e = u[f];
      if (e === "'" || e === '"') return P();
      if (e === "." || y(e)) return D();
      n = M();
      if (typeof n != "undefined") return n;
      R({}, s.UnexpectedToken, "ILLEGAL")
    }

    function F() {
      var e;
      return p ? (f = p.range[1], l = p.lineNumber, c = p.lineStart, e = p, p = null, e) : (p = null, j())
    }

    function I() {
      var e, t, n;
      return p !== null ? p : (e = f, t = l, n = c, p = j(), f = e, l = t, c = n, p)
    }

    function q() {
      var e, t, n, r;
      return e = f, t = l, n = c, A(), r = l !== t, f = e, l = t, c = n, r
    }

    function R(e, t) {
      var n, r = Array.prototype.slice.call(arguments, 2),
        i = t.replace(/%(\d)/g, function(e, t) {
          return r[t] || ""
        });
      throw typeof e.lineNumber == "number" ? (n = new Error("Line " + e.lineNumber + ": " + i), n.index = e.range[0], n.lineNumber = e.lineNumber, n.column = e.range[0] - c + 1) : (n = new Error("Line " + l + ": " + i), n.index = f, n.lineNumber = l, n.column = f - c + 1), n
    }

    function U() {
      try {
        R.apply(null, arguments)
      } catch (e) {
        if (!v.errors) throw e;
        v.errors.push(e)
      }
    }

    function z(e) {
      e.type === t.EOF && R(e, s.UnexpectedEOS), e.type === t.NumericLiteral && R(e, s.UnexpectedNumber), e.type === t.StringLiteral && R(e, s.UnexpectedString), e.type === t.Identifier && R(e, s.UnexpectedIdentifier);
      if (e.type === t.Keyword) {
        if (N(e.value)) R(e, s.UnexpectedReserved);
        else if (a && C(e.value)) {
          U(e, s.StrictReservedWord);
          return
        }
        R(e, s.UnexpectedToken, e.value)
      }
      R(e, s.UnexpectedToken, e.value)
    }

    function W(e) {
      var n = F();
      (n.type !== t.Punctuator || n.value !== e) && z(n)
    }

    function X(e) {
      var n = F();
      (n.type !== t.Keyword || n.value !== e) && z(n)
    }

    function V(e) {
      var n = I();
      return n.type === t.Punctuator && n.value === e
    }

    function $(e) {
      var n = I();
      return n.type === t.Keyword && n.value === e
    }

    function J() {
      var e = I(),
        n = e.value;
      return e.type !== t.Punctuator ? !1 : n === "=" || n === "*=" || n === "/=" || n === "%=" || n === "+=" || n === "-=" || n === "<<=" || n === ">>=" || n === ">>>=" || n === "&=" || n === "^=" || n === "|="
    }

    function K() {
      var e, n;
      if (u[f] === ";") {
        F();
        return
      }
      n = l, A();
      if (l !== n) return;
      if (V(";")) {
        F();
        return
      }
      e = I(), e.type !== t.EOF && !V("}") && z(e)
    }

    function Q(e) {
      return e.type === r.Identifier || e.type === r.MemberExpression
    }

    function G() {
      var e = [];
      W("[");
      while (!V("]")) V(",") ? (F(), e.push(null)) : (e.push(Tt()), V("]") || W(","));
      return W("]"), {
        type: r.ArrayExpression,
        elements: e
      }
    }

    function Y(e, t) {
      var n, i;
      return n = a, i = Gt(), t && a && k(e[0].name) && U(t, s.StrictParamName), a = n, {
        type: r.FunctionExpression,
        id: null,
        params: e,
        defaults: [],
        body: i,
        rest: null,
        generator: !1,
        expression: !1
      }
    }

    function Z() {
      var e = F();
      return e.type === t.StringLiteral || e.type === t.NumericLiteral ? (a && e.octal && U(e, s.StrictOctalLiteral), ln(e)) : {
        type: r.Identifier,
        name: e.value
      }
    }

    function et() {
      var e, n, i, s;
      e = I();
      if (e.type === t.Identifier) return i = Z(), e.value === "get" && !V(":") ? (n = Z(), W("("), W(")"), {
        type: r.Property,
        key: n,
        value: Y([]),
        kind: "get"
      }) : e.value === "set" && !V(":") ? (n = Z(), W("("), e = I(), e.type !== t.Identifier && z(F()), s = [Lt()], W(")"), {
        type: r.Property,
        key: n,
        value: Y(s, e),
        kind: "set"
      }) : (W(":"), {
        type: r.Property,
        key: i,
        value: Tt(),
        kind: "init"
      });
      if (e.type !== t.EOF && e.type !== t.Punctuator) return n = Z(), W(":"), {
        type: r.Property,
        key: n,
        value: Tt(),
        kind: "init"
      };
      z(e)
    }

    function tt() {
      var e = [],
        t, n, o, u = {}, f = String;
      W("{");
      while (!V("}")) t = et(), t.key.type === r.Identifier ? n = t.key.name : n = f(t.key.value), o = t.kind === "init" ? i.Data : t.kind === "get" ? i.Get : i.Set, Object.prototype.hasOwnProperty.call(u, n) ? (u[n] === i.Data ? a && o === i.Data ? U({}, s.StrictDuplicateProperty) : o !== i.Data && U({}, s.AccessorDataProperty) : o === i.Data ? U({}, s.AccessorDataProperty) : u[n] & o && U({}, s.AccessorGetSet), u[n] |= o) : u[n] = o, e.push(t), V("}") || W(",");
      return W("}"), {
        type: r.ObjectExpression,
        properties: e
      }
    }

    function nt() {
      var e;
      return W("("), e = Nt(), W(")"), e
    }

    function rt() {
      var e = I(),
        n = e.type;
      if (n === t.Identifier) return {
        type: r.Identifier,
        name: F().value
      };
      if (n === t.StringLiteral || n === t.NumericLiteral) return a && e.octal && U(e, s.StrictOctalLiteral), ln(F());
      if (n === t.Keyword) {
        if ($("this")) return F(), {
          type: r.ThisExpression
        };
        if ($("function")) return Zt()
      }
      return n === t.BooleanLiteral ? (F(), e.value = e.value === "true", ln(e)) : n === t.NullLiteral ? (F(), e.value = null, ln(e)) : V("[") ? G() : V("{") ? tt() : V("(") ? nt() : V("/") || V("/=") ? ln(H()) : z(F())
    }

    function it() {
      var e = [];
      W("(");
      if (!V(")"))
        while (f < h) {
          e.push(Tt());
          if (V(")")) break;
          W(",")
        }
      return W(")"), e
    }

    function st() {
      var e = F();
      return B(e) || z(e), {
        type: r.Identifier,
        name: e.value
      }
    }

    function ot() {
      return W("."), st()
    }

    function ut() {
      var e;
      return W("["), e = Nt(), W("]"), e
    }

    function at() {
      var e;
      return X("new"), e = {
        type: r.NewExpression,
        callee: lt(),
        arguments: []
      }, V("(") && (e.arguments = it()), e
    }

    function ft() {
      var e;
      e = $("new") ? at() : rt();
      while (V(".") || V("[") || V("(")) V("(") ? e = {
        type: r.CallExpression,
        callee: e,
        arguments: it()
      } : V("[") ? e = {
        type: r.MemberExpression,
        computed: !0,
        object: e,
        property: ut()
      } : e = {
        type: r.MemberExpression,
        computed: !1,
        object: e,
        property: ot()
      };
      return e
    }

    function lt() {
      var e;
      e = $("new") ? at() : rt();
      while (V(".") || V("[")) V("[") ? e = {
        type: r.MemberExpression,
        computed: !0,
        object: e,
        property: ut()
      } : e = {
        type: r.MemberExpression,
        computed: !1,
        object: e,
        property: ot()
      };
      return e
    }

    function ct() {
      var e = ft(),
        n;
      return n = I(), n.type !== t.Punctuator ? e : ((V("++") || V("--")) && !q() && (a && e.type === r.Identifier && k(e.name) && U({}, s.StrictLHSPostfix), Q(e) || R({}, s.InvalidLHSInAssignment), e = {
        type: r.UpdateExpression,
        operator: F().value,
        argument: e,
        prefix: !1
      }), e)
    }

    function ht() {
      var e, n;
      return e = I(), e.type !== t.Punctuator && e.type !== t.Keyword ? ct() : V("++") || V("--") ? (e = F(), n = ht(), a && n.type === r.Identifier && k(n.name) && U({}, s.StrictLHSPrefix), Q(n) || R({}, s.InvalidLHSInAssignment), n = {
        type: r.UpdateExpression,
        operator: e.value,
        argument: n,
        prefix: !0
      }, n) : V("+") || V("-") || V("~") || V("!") ? (n = {
        type: r.UnaryExpression,
        operator: F().value,
        argument: ht()
      }, n) : $("delete") || $("void") || $("typeof") ? (n = {
        type: r.UnaryExpression,
        operator: F().value,
        argument: ht()
      }, a && n.operator === "delete" && n.argument.type === r.Identifier && U({}, s.StrictDelete), n) : ct()
    }

    function pt() {
      var e = ht();
      while (V("*") || V("/") || V("%")) e = {
        type: r.BinaryExpression,
        operator: F().value,
        left: e,
        right: ht()
      };
      return e
    }

    function dt() {
      var e = pt();
      while (V("+") || V("-")) e = {
        type: r.BinaryExpression,
        operator: F().value,
        left: e,
        right: pt()
      };
      return e
    }

    function vt() {
      var e = dt();
      while (V("<<") || V(">>") || V(">>>")) e = {
        type: r.BinaryExpression,
        operator: F().value,
        left: e,
        right: dt()
      };
      return e
    }

    function mt() {
      var e, t;
      t = d.allowIn, d.allowIn = !0, e = vt();
      while (V("<") || V(">") || V("<=") || V(">=") || t && $("in") || $("instanceof")) e = {
        type: r.BinaryExpression,
        operator: F().value,
        left: e,
        right: vt()
      };
      return d.allowIn = t, e
    }

    function gt() {
      var e = mt();
      while (V("==") || V("!=") || V("===") || V("!==")) e = {
        type: r.BinaryExpression,
        operator: F().value,
        left: e,
        right: mt()
      };
      return e
    }

    function yt() {
      var e = gt();
      while (V("&")) F(), e = {
        type: r.BinaryExpression,
        operator: "&",
        left: e,
        right: gt()
      };
      return e
    }

    function bt() {
      var e = yt();
      while (V("^")) F(), e = {
        type: r.BinaryExpression,
        operator: "^",
        left: e,
        right: yt()
      };
      return e
    }

    function wt() {
      var e = bt();
      while (V("|")) F(), e = {
        type: r.BinaryExpression,
        operator: "|",
        left: e,
        right: bt()
      };
      return e
    }

    function Et() {
      var e = wt();
      while (V("&&")) F(), e = {
        type: r.LogicalExpression,
        operator: "&&",
        left: e,
        right: wt()
      };
      return e
    }

    function St() {
      var e = Et();
      while (V("||")) F(), e = {
        type: r.LogicalExpression,
        operator: "||",
        left: e,
        right: Et()
      };
      return e
    }

    function xt() {
      var e, t, n;
      return e = St(), V("?") && (F(), t = d.allowIn, d.allowIn = !0, n = Tt(), d.allowIn = t, W(":"), e = {
        type: r.ConditionalExpression,
        test: e,
        consequent: n,
        alternate: Tt()
      }), e
    }

    function Tt() {
      var e, t;
      return e = I(), t = xt(), J() && (Q(t) || R({}, s.InvalidLHSInAssignment), a && t.type === r.Identifier && k(t.name) && U(e, s.StrictLHSAssignment), t = {
        type: r.AssignmentExpression,
        operator: F().value,
        left: t,
        right: Tt()
      }), t
    }

    function Nt() {
      var e = Tt();
      if (V(",")) {
        e = {
          type: r.SequenceExpression,
          expressions: [e]
        };
        while (f < h) {
          if (!V(",")) break;
          F(), e.expressions.push(Tt())
        }
      }
      return e
    }

    function Ct() {
      var e = [],
        t;
      while (f < h) {
        if (V("}")) break;
        t = en();
        if (typeof t == "undefined") break;
        e.push(t)
      }
      return e
    }

    function kt() {
      var e;
      return W("{"), e = Ct(), W("}"), {
        type: r.BlockStatement,
        body: e
      }
    }

    function Lt() {
      var e = F();
      return e.type !== t.Identifier && z(e), {
        type: r.Identifier,
        name: e.value
      }
    }

    function At(e) {
      var t = Lt(),
        n = null;
      return a && k(t.name) && U({}, s.StrictVarName), e === "const" ? (W("="), n = Tt()) : V("=") && (F(), n = Tt()), {
        type: r.VariableDeclarator,
        id: t,
        init: n
      }
    }

    function Ot(e) {
      var t = [];
      while (f < h) {
        t.push(At(e));
        if (!V(",")) break;
        F()
      }
      return t
    }

    function Mt() {
      var e;
      return X("var"), e = Ot(), K(), {
        type: r.VariableDeclaration,
        declarations: e,
        kind: "var"
      }
    }

    function _t(e) {
      var t;
      return X(e), t = Ot(e), K(), {
        type: r.VariableDeclaration,
        declarations: t,
        kind: e
      }
    }

    function Dt() {
      return W(";"), {
        type: r.EmptyStatement
      }
    }

    function Pt() {
      var e = Nt();
      return K(), {
        type: r.ExpressionStatement,
        expression: e
      }
    }

    function Ht() {
      var e, t, n;
      return X("if"), W("("), e = Nt(), W(")"), t = Qt(), $("else") ? (F(), n = Qt()) : n = null, {
        type: r.IfStatement,
        test: e,
        consequent: t,
        alternate: n
      }
    }

    function Bt() {
      var e, t, n;
      return X("do"), n = d.inIteration, d.inIteration = !0, e = Qt(), d.inIteration = n, X("while"), W("("), t = Nt(), W(")"), V(";") && F(), {
        type: r.DoWhileStatement,
        body: e,
        test: t
      }
    }

    function jt() {
      var e, t, n;
      return X("while"), W("("), e = Nt(), W(")"), n = d.inIteration, d.inIteration = !0, t = Qt(), d.inIteration = n, {
        type: r.WhileStatement,
        test: e,
        body: t
      }
    }

    function Ft() {
      var e = F();
      return {
        type: r.VariableDeclaration,
        declarations: Ot(),
        kind: e.value
      }
    }

    function It() {
      var e, t, n, i, o, u, a;
      return e = t = n = null, X("for"), W("("), V(";") ? F() : ($("var") || $("let") ? (d.allowIn = !1, e = Ft(), d.allowIn = !0, e.declarations.length === 1 && $("in") && (F(), i = e, o = Nt(), e = null)) : (d.allowIn = !1, e = Nt(), d.allowIn = !0, $("in") && (Q(e) || R({}, s.InvalidLHSInForIn), F(), i = e, o = Nt(), e = null)), typeof i == "undefined" && W(";")), typeof i == "undefined" && (V(";") || (t = Nt()), W(";"), V(")") || (n = Nt())), W(")"), a = d.inIteration, d.inIteration = !0, u = Qt(), d.inIteration = a, typeof i == "undefined" ? {
        type: r.ForStatement,
        init: e,
        test: t,
        update: n,
        body: u
      } : {
        type: r.ForInStatement,
        left: i,
        right: o,
        body: u,
        each: !1
      }
    }

    function qt() {
      var e, n = null;
      return X("continue"), u[f] === ";" ? (F(), d.inIteration || R({}, s.IllegalContinue), {
        type: r.ContinueStatement,
        label: null
      }) : q() ? (d.inIteration || R({}, s.IllegalContinue), {
        type: r.ContinueStatement,
        label: null
      }) : (e = I(), e.type === t.Identifier && (n = Lt(), Object.prototype.hasOwnProperty.call(d.labelSet, n.name) || R({}, s.UnknownLabel, n.name)), K(), n === null && !d.inIteration && R({}, s.IllegalContinue), {
        type: r.ContinueStatement,
        label: n
      })
    }

    function Rt() {
      var e, n = null;
      return X("break"), u[f] === ";" ? (F(), !d.inIteration && !d.inSwitch && R({}, s.IllegalBreak), {
        type: r.BreakStatement,
        label: null
      }) : q() ? (!d.inIteration && !d.inSwitch && R({}, s.IllegalBreak), {
        type: r.BreakStatement,
        label: null
      }) : (e = I(), e.type === t.Identifier && (n = Lt(), Object.prototype.hasOwnProperty.call(d.labelSet, n.name) || R({}, s.UnknownLabel, n.name)), K(), n === null && !d.inIteration && !d.inSwitch && R({}, s.IllegalBreak), {
        type: r.BreakStatement,
        label: n
      })
    }

    function Ut() {
      var e, n = null;
      return X("return"), d.inFunctionBody || U({}, s.IllegalReturn), u[f] === " " && x(u[f + 1]) ? (n = Nt(), K(), {
        type: r.ReturnStatement,
        argument: n
      }) : q() ? {
        type: r.ReturnStatement,
        argument: null
      } : (V(";") || (e = I(), !V("}") && e.type !== t.EOF && (n = Nt())), K(), {
        type: r.ReturnStatement,
        argument: n
      })
    }

    function zt() {
      var e, t;
      return a && U({}, s.StrictModeWith), X("with"), W("("), e = Nt(), W(")"), t = Qt(), {
        type: r.WithStatement,
        object: e,
        body: t
      }
    }

    function Wt() {
      var e, t = [],
        n;
      $("default") ? (F(), e = null) : (X("case"), e = Nt()), W(":");
      while (f < h) {
        if (V("}") || $("default") || $("case")) break;
        n = Qt();
        if (typeof n == "undefined") break;
        t.push(n)
      }
      return {
        type: r.SwitchCase,
        test: e,
        consequent: t
      }
    }

    function Xt() {
      var e, t, n, i, o;
      X("switch"), W("("), e = Nt(), W(")"), W("{");
      if (V("}")) return F(), {
        type: r.SwitchStatement,
        discriminant: e
      };
      t = [], i = d.inSwitch, d.inSwitch = !0, o = !1;
      while (f < h) {
        if (V("}")) break;
        n = Wt(), n.test === null && (o && R({}, s.MultipleDefaultsInSwitch), o = !0), t.push(n)
      }
      return d.inSwitch = i, W("}"), {
        type: r.SwitchStatement,
        discriminant: e,
        cases: t
      }
    }

    function Vt() {
      var e;
      return X("throw"), q() && R({}, s.NewlineAfterThrow), e = Nt(), K(), {
        type: r.ThrowStatement,
        argument: e
      }
    }

    function $t() {
      var e;
      return X("catch"), W("("), V(")") || (e = Nt(), a && e.type === r.Identifier && k(e.name) && U({}, s.StrictCatchVariable)), W(")"), {
        type: r.CatchClause,
        param: e,
        body: kt()
      }
    }

    function Jt() {
      var e, t = [],
        n = null;
      return X("try"), e = kt(), $("catch") && t.push($t()), $("finally") && (F(), n = kt()), t.length === 0 && !n && R({}, s.NoCatchOrFinally), {
        type: r.TryStatement,
        block: e,
        guardedHandlers: [],
        handlers: t,
        finalizer: n
      }
    }

    function Kt() {
      return X("debugger"), K(), {
        type: r.DebuggerStatement
      }
    }

    function Qt() {
      var e = I(),
        n, i;
      e.type === t.EOF && z(e);
      if (e.type === t.Punctuator) switch (e.value) {
        case ";":
          return Dt();
        case "{":
          return kt();
        case "(":
          return Pt();
        default:
      }
      if (e.type === t.Keyword) switch (e.value) {
        case "break":
          return Rt();
        case "continue":
          return qt();
        case "debugger":
          return Kt();
        case "do":
          return Bt();
        case "for":
          return It();
        case "function":
          return Yt();
        case "if":
          return Ht();
        case "return":
          return Ut();
        case "switch":
          return Xt();
        case "throw":
          return Vt();
        case "try":
          return Jt();
        case "var":
          return Mt();
        case "while":
          return jt();
        case "with":
          return zt();
        default:
      }
      return n = Nt(), n.type === r.Identifier && V(":") ? (F(), Object.prototype.hasOwnProperty.call(d.labelSet, n.name) && R({}, s.Redeclaration, "Label", n.name), d.labelSet[n.name] = !0, i = Qt(), delete d.labelSet[n.name], {
        type: r.LabeledStatement,
        label: n,
        body: i
      }) : (K(), {
        type: r.ExpressionStatement,
        expression: n
      })
    }

    function Gt() {
      var e, n = [],
        i, o, u, l, c, p, v;
      W("{");
      while (f < h) {
        i = I();
        if (i.type !== t.StringLiteral) break;
        e = en(), n.push(e);
        if (e.expression.type !== r.Literal) break;
        o = g(i.range[0] + 1, i.range[1] - 1), o === "use strict" ? (a = !0, u && U(u, s.StrictOctalLiteral)) : !u && i.octal && (u = i)
      }
      l = d.labelSet, c = d.inIteration, p = d.inSwitch, v = d.inFunctionBody, d.labelSet = {}, d.inIteration = !1, d.inSwitch = !1, d.inFunctionBody = !0;
      while (f < h) {
        if (V("}")) break;
        e = en();
        if (typeof e == "undefined") break;
        n.push(e)
      }
      return W("}"), d.labelSet = l, d.inIteration = c, d.inSwitch = p, d.inFunctionBody = v, {
        type: r.BlockStatement,
        body: n
      }
    }

    function Yt() {
      var e, t, n = [],
        i, o, u, l, c, p, d;
      X("function"), o = I(), e = Lt(), a ? k(o.value) && U(o, s.StrictFunctionName) : k(o.value) ? (l = o, c = s.StrictFunctionName) : C(o.value) && (l = o, c = s.StrictReservedWord), W("(");
      if (!V(")")) {
        d = {};
        while (f < h) {
          o = I(), t = Lt(), a ? (k(o.value) && (u = o, c = s.StrictParamName), Object.prototype.hasOwnProperty.call(d, o.value) && (u = o, c = s.StrictParamDupe)) : l || (k(o.value) ? (l = o, c = s.StrictParamName) : C(o.value) ? (l = o, c = s.StrictReservedWord) : Object.prototype.hasOwnProperty.call(d, o.value) && (l = o, c = s.StrictParamDupe)), n.push(t), d[t.name] = !0;
          if (V(")")) break;
          W(",")
        }
      }
      return W(")"), p = a, i = Gt(), a && l && R(l, c), a && u && U(u, c), a = p, {
        type: r.FunctionDeclaration,
        id: e,
        params: n,
        defaults: [],
        body: i,
        rest: null,
        generator: !1,
        expression: !1
      }
    }

    function Zt() {
      var e, t = null,
        n, i, o, u, l = [],
        c, p, d;
      X("function"), V("(") || (e = I(), t = Lt(), a ? k(e.value) && U(e, s.StrictFunctionName) : k(e.value) ? (i = e, o = s.StrictFunctionName) : C(e.value) && (i = e, o = s.StrictReservedWord)), W("(");
      if (!V(")")) {
        d = {};
        while (f < h) {
          e = I(), u = Lt(), a ? (k(e.value) && (n = e, o = s.StrictParamName), Object.prototype.hasOwnProperty.call(d, e.value) && (n = e, o = s.StrictParamDupe)) : i || (k(e.value) ? (i = e, o = s.StrictParamName) : C(e.value) ? (i = e, o = s.StrictReservedWord) : Object.prototype.hasOwnProperty.call(d, e.value) && (i = e, o = s.StrictParamDupe)), l.push(u), d[u.name] = !0;
          if (V(")")) break;
          W(",")
        }
      }
      return W(")"), p = a, c = Gt(), a && i && R(i, o), a && n && U(n, o), a = p, {
        type: r.FunctionExpression,
        id: t,
        params: l,
        defaults: [],
        body: c,
        rest: null,
        generator: !1,
        expression: !1
      }
    }

    function en() {
      var e = I();
      if (e.type === t.Keyword) switch (e.value) {
        case "const":
        case "let":
          return _t(e.value);
        case "function":
          return Yt();
        default:
          return Qt()
      }
      if (e.type !== t.EOF) return Qt()
    }

    function tn() {
      var e, n = [],
        i, o, u;
      while (f < h) {
        i = I();
        if (i.type !== t.StringLiteral) break;
        e = en(), n.push(e);
        if (e.expression.type !== r.Literal) break;
        o = g(i.range[0] + 1, i.range[1] - 1), o === "use strict" ? (a = !0, u && U(u, s.StrictOctalLiteral)) : !u && i.octal && (u = i)
      }
      while (f < h) {
        e = en();
        if (typeof e == "undefined") break;
        n.push(e)
      }
      return n
    }

    function nn() {
      var e;
      return a = !1, e = {
        type: r.Program,
        body: tn()
      }, e
    }

    function rn(e, t, n, r, i) {
      m(typeof n == "number", "Comment must have valid position");
      if (v.comments.length > 0 && v.comments[v.comments.length - 1].range[1] > n) return;
      v.comments.push({
        type: e,
        value: t,
        range: [n, r],
        loc: i
      })
    }

    function sn() {
      var e, t, n, r, i, o;
      e = "", i = !1, o = !1;
      while (f < h) {
        t = u[f];
        if (o) t = u[f++], S(t) ? (n.end = {
          line: l,
          column: f - c - 1
        }, o = !1, rn("Line", e, r, f - 1, n), t === "\r" && u[f] === "\n" && ++f, ++l, c = f, e = "") : f >= h ? (o = !1, e += t, n.end = {
          line: l,
          column: h - c
        }, rn("Line", e, r, h, n)) : e += t;
        else if (i) S(t) ? (t === "\r" && u[f + 1] === "\n" ? (++f, e += "\r\n") : e += t, ++l, ++f, c = f, f >= h && R({}, s.UnexpectedToken, "ILLEGAL")) : (t = u[f++], f >= h && R({}, s.UnexpectedToken, "ILLEGAL"), e += t, t === "*" && (t = u[f], t === "/" && (e = e.substr(0, e.length - 1), i = !1, ++f, n.end = {
          line: l,
          column: f - c
        }, rn("Block", e, r, f, n), e = "")));
        else if (t === "/") {
          t = u[f + 1];
          if (t === "/") n = {
            start: {
              line: l,
              column: f - c
            }
          }, r = f, f += 2, o = !0, f >= h && (n.end = {
            line: l,
            column: f - c
          }, o = !1, rn("Line", e, r, f, n));
          else {
            if (t !== "*") break;
            r = f, f += 2, i = !0, n = {
              start: {
                line: l,
                column: f - c - 2
              }
            }, f >= h && R({}, s.UnexpectedToken, "ILLEGAL")
          }
        } else if (E(t))++f;
        else {
          if (!S(t)) break;
          ++f, t === "\r" && u[f] === "\n" && ++f, ++l, c = f
        }
      }
    }

    function on() {
      var e, t, n, r = [];
      for (e = 0; e < v.comments.length; ++e) t = v.comments[e], n = {
        type: t.type,
        value: t.value
      }, v.range && (n.range = t.range), v.loc && (n.loc = t.loc), r.push(n);
      v.comments = r
    }

    function un() {
      var e, r, i, s, o;
      return A(), e = f, r = {
        start: {
          line: l,
          column: f - c
        }
      }, i = v.advance(), r.end = {
        line: l,
        column: f - c
      }, i.type !== t.EOF && (s = [i.range[0], i.range[1]], o = g(i.range[0], i.range[1]), v.tokens.push({
        type: n[i.type],
        value: o,
        range: s,
        loc: r
      })), i
    }

    function an() {
      var e, t, n, r;
      return A(), e = f, t = {
        start: {
          line: l,
          column: f - c
        }
      }, n = v.scanRegExp(), t.end = {
        line: l,
        column: f - c
      }, v.tokens.length > 0 && (r = v.tokens[v.tokens.length - 1], r.range[0] === e && r.type === "Punctuator" && (r.value === "/" || r.value === "/=") && v.tokens.pop()), v.tokens.push({
        type: "RegularExpression",
        value: n.literal,
        range: [e, f],
        loc: t
      }), n
    }

    function fn() {
      var e, t, n, r = [];
      for (e = 0; e < v.tokens.length; ++e) t = v.tokens[e], n = {
        type: t.type,
        value: t.value
      }, v.range && (n.range = t.range), v.loc && (n.loc = t.loc), r.push(n);
      v.tokens = r
    }

    function ln(e) {
      return {
        type: r.Literal,
        value: e.value
      }
    }

    function cn(e) {
      return {
        type: r.Literal,
        value: e.value,
        raw: g(e.range[0], e.range[1])
      }
    }

    function hn() {
      var e = {};
      return e.range = [f, f], e.loc = {
        start: {
          line: l,
          column: f - c
        },
        end: {
          line: l,
          column: f - c
        }
      }, e.end = function() {
        this.range[1] = f, this.loc.end.line = l, this.loc.end.column = f - c
      }, e.applyGroup = function(e) {
        v.range && (e.groupRange = [this.range[0], this.range[1]]), v.loc && (e.groupLoc = {
          start: {
            line: this.loc.start.line,
            column: this.loc.start.column
          },
          end: {
            line: this.loc.end.line,
            column: this.loc.end.column
          }
        })
      }, e.apply = function(e) {
        v.range && (e.range = [this.range[0], this.range[1]]), v.loc && (e.loc = {
          start: {
            line: this.loc.start.line,
            column: this.loc.start.column
          },
          end: {
            line: this.loc.end.line,
            column: this.loc.end.column
          }
        })
      }, e
    }

    function pn() {
      var e, t;
      return A(), e = hn(), W("("), t = Nt(), W(")"), e.end(), e.applyGroup(t), t
    }

    function dn() {
      var e, t;
      A(), e = hn(), t = $("new") ? at() : rt();
      while (V(".") || V("[")) V("[") ? (t = {
        type: r.MemberExpression,
        computed: !0,
        object: t,
        property: ut()
      }, e.end(), e.apply(t)) : (t = {
        type: r.MemberExpression,
        computed: !1,
        object: t,
        property: ot()
      }, e.end(), e.apply(t));
      return t
    }

    function vn() {
      var e, t;
      A(), e = hn(), t = $("new") ? at() : rt();
      while (V(".") || V("[") || V("(")) V("(") ? (t = {
        type: r.CallExpression,
        callee: t,
        arguments: it()
      }, e.end(), e.apply(t)) : V("[") ? (t = {
        type: r.MemberExpression,
        computed: !0,
        object: t,
        property: ut()
      }, e.end(), e.apply(t)) : (t = {
        type: r.MemberExpression,
        computed: !1,
        object: t,
        property: ot()
      }, e.end(), e.apply(t));
      return t
    }

    function mn(e) {
      var t, n, r;
      t = Object.prototype.toString.apply(e) === "[object Array]" ? [] : {};
      for (n in e) e.hasOwnProperty(n) && n !== "groupRange" && n !== "groupLoc" && (r = e[n], r === null || typeof r != "object" || r instanceof RegExp ? t[n] = r : t[n] = mn(r));
      return t
    }

    function gn(e, t) {
      return function(n) {
        function i(e) {
          return e.type === r.LogicalExpression || e.type === r.BinaryExpression
        }

        function s(n) {
          var r, o;
          i(n.left) && s(n.left), i(n.right) && s(n.right), e && (n.left.groupRange || n.right.groupRange ? (r = n.left.groupRange ? n.left.groupRange[0] : n.left.range[0], o = n.right.groupRange ? n.right.groupRange[1] : n.right.range[1], n.range = [r, o]) : typeof n.range == "undefined" && (r = n.left.range[0], o = n.right.range[1], n.range = [r, o])), t && (n.left.groupLoc || n.right.groupLoc ? (r = n.left.groupLoc ? n.left.groupLoc.start : n.left.loc.start, o = n.right.groupLoc ? n.right.groupLoc.end : n.right.loc.end, n.loc = {
            start: r,
            end: o
          }) : typeof n.loc == "undefined" && (n.loc = {
            start: n.left.loc.start,
            end: n.right.loc.end
          }))
        }
        return function() {
          var r, o;
          return A(), r = hn(), o = n.apply(null, arguments), r.end(), e && typeof o.range == "undefined" && r.apply(o), t && typeof o.loc == "undefined" && r.apply(o), i(o) && s(o), o
        }
      }
    }

    function yn() {
      var e;
      v.comments && (v.skipComment = A, A = sn), v.raw && (v.createLiteral = ln, ln = cn);
      if (v.range || v.loc) v.parseGroupExpression = nt, v.parseLeftHandSideExpression = lt, v.parseLeftHandSideExpressionAllowCall = ft, nt = pn, lt = dn, ft = vn, e = gn(v.range, v.loc), v.parseAdditiveExpression = dt, v.parseAssignmentExpression = Tt, v.parseBitwiseANDExpression = yt, v.parseBitwiseORExpression = wt, v.parseBitwiseXORExpression = bt, v.parseBlock = kt, v.parseFunctionSourceElements = Gt, v.parseCatchClause = $t, v.parseComputedMember = ut, v.parseConditionalExpression = xt, v.parseConstLetDeclaration = _t, v.parseEqualityExpression = gt, v.parseExpression = Nt, v.parseForVariableDeclaration = Ft, v.parseFunctionDeclaration = Yt, v.parseFunctionExpression = Zt, v.parseLogicalANDExpression = Et, v.parseLogicalORExpression = St, v.parseMultiplicativeExpression = pt, v.parseNewExpression = at, v.parseNonComputedProperty = st, v.parseObjectProperty = et, v.parseObjectPropertyKey = Z, v.parsePostfixExpression = ct, v.parsePrimaryExpression = rt, v.parseProgram = nn, v.parsePropertyFunction = Y, v.parseRelationalExpression = mt, v.parseStatement = Qt, v.parseShiftExpression = vt, v.parseSwitchCase = Wt, v.parseUnaryExpression = ht, v.parseVariableDeclaration = At, v.parseVariableIdentifier = Lt, dt = e(v.parseAdditiveExpression), Tt = e(v.parseAssignmentExpression), yt = e(v.parseBitwiseANDExpression), wt = e(v.parseBitwiseORExpression), bt = e(v.parseBitwiseXORExpression), kt = e(v.parseBlock), Gt = e(v.parseFunctionSourceElements), $t = e(v.parseCatchClause), ut = e(v.parseComputedMember), xt = e(v.parseConditionalExpression), _t = e(v.parseConstLetDeclaration), gt = e(v.parseEqualityExpression), Nt = e(v.parseExpression), Ft = e(v.parseForVariableDeclaration), Yt = e(v.parseFunctionDeclaration), Zt = e(v.parseFunctionExpression), lt = e(lt), Et = e(v.parseLogicalANDExpression), St = e(v.parseLogicalORExpression), pt = e(v.parseMultiplicativeExpression), at = e(v.parseNewExpression), st = e(v.parseNonComputedProperty), et = e(v.parseObjectProperty), Z = e(v.parseObjectPropertyKey), ct = e(v.parsePostfixExpression), rt = e(v.parsePrimaryExpression), nn = e(v.parseProgram), Y = e(v.parsePropertyFunction), mt = e(v.parseRelationalExpression), Qt = e(v.parseStatement), vt = e(v.parseShiftExpression), Wt = e(v.parseSwitchCase), ht = e(v.parseUnaryExpression), At = e(v.parseVariableDeclaration), Lt = e(v.parseVariableIdentifier);
      typeof v.tokens != "undefined" && (v.advance = j, v.scanRegExp = H, j = un, H = an)
    }

    function bn() {
      typeof v.skipComment == "function" && (A = v.skipComment), v.raw && (ln = v.createLiteral);
      if (v.range || v.loc) dt = v.parseAdditiveExpression, Tt = v.parseAssignmentExpression, yt = v.parseBitwiseANDExpression, wt = v.parseBitwiseORExpression, bt = v.parseBitwiseXORExpression, kt = v.parseBlock, Gt = v.parseFunctionSourceElements, $t = v.parseCatchClause, ut = v.parseComputedMember, xt = v.parseConditionalExpression, _t = v.parseConstLetDeclaration, gt = v.parseEqualityExpression, Nt = v.parseExpression, Ft = v.parseForVariableDeclaration, Yt = v.parseFunctionDeclaration, Zt = v.parseFunctionExpression, nt = v.parseGroupExpression, lt = v.parseLeftHandSideExpression, ft = v.parseLeftHandSideExpressionAllowCall, Et = v.parseLogicalANDExpression, St = v.parseLogicalORExpression, pt = v.parseMultiplicativeExpression, at = v.parseNewExpression, st = v.parseNonComputedProperty, et = v.parseObjectProperty, Z = v.parseObjectPropertyKey, rt = v.parsePrimaryExpression, ct = v.parsePostfixExpression, nn = v.parseProgram, Y = v.parsePropertyFunction, mt = v.parseRelationalExpression, Qt = v.parseStatement, vt = v.parseShiftExpression, Wt = v.parseSwitchCase, ht = v.parseUnaryExpression, At = v.parseVariableDeclaration, Lt = v.parseVariableIdentifier;
      typeof v.scanRegExp == "function" && (j = v.advance, H = v.scanRegExp)
    }

    function wn(e) {
      var t = e.length,
        n = [],
        r;
      for (r = 0; r < t; ++r) n[r] = e.charAt(r);
      return n
    }

    function En(e, t) {
      var n, r;
      r = String, typeof e != "string" && !(e instanceof String) && (e = r(e)), u = e, f = 0, l = u.length > 0 ? 1 : 0, c = 0, h = u.length, p = null, d = {
        allowIn: !0,
        labelSet: {},
        inFunctionBody: !1,
        inIteration: !1,
        inSwitch: !1
      }, v = {}, typeof t != "undefined" && (v.range = typeof t.range == "boolean" && t.range, v.loc = typeof t.loc == "boolean" && t.loc, v.raw = typeof t.raw == "boolean" && t.raw, typeof t.tokens == "boolean" && t.tokens && (v.tokens = []), typeof t.comment == "boolean" && t.comment && (v.comments = []), typeof t.tolerant == "boolean" && t.tolerant && (v.errors = [])), h > 0 && typeof u[0] == "undefined" && (e instanceof String && (u = e.valueOf()), typeof u[0] == "undefined" && (u = wn(e))), yn();
      try {
        n = nn(), typeof v.comments != "undefined" && (on(), n.comments = v.comments), typeof v.tokens != "undefined" && (fn(), n.tokens = v.tokens), typeof v.errors != "undefined" && (n.errors = v.errors);
        if (v.range || v.loc) n.body = mn(n.body)
      } catch (i) {
        throw i
      } finally {
        bn(), v = {}
      }
      return n
    }
    var t, n, r, i, s, o, u, a, f, l, c, h, p, d, v;
    t = {
      BooleanLiteral: 1,
      EOF: 2,
      Identifier: 3,
      Keyword: 4,
      NullLiteral: 5,
      NumericLiteral: 6,
      Punctuator: 7,
      StringLiteral: 8
    }, n = {}, n[t.BooleanLiteral] = "Boolean", n[t.EOF] = "<end>", n[t.Identifier] = "Identifier", n[t.Keyword] = "Keyword", n[t.NullLiteral] = "Null", n[t.NumericLiteral] = "Numeric", n[t.Punctuator] = "Punctuator", n[t.StringLiteral] = "String", r = {
      AssignmentExpression: "AssignmentExpression",
      ArrayExpression: "ArrayExpression",
      BlockStatement: "BlockStatement",
      BinaryExpression: "BinaryExpression",
      BreakStatement: "BreakStatement",
      CallExpression: "CallExpression",
      CatchClause: "CatchClause",
      ConditionalExpression: "ConditionalExpression",
      ContinueStatement: "ContinueStatement",
      DoWhileStatement: "DoWhileStatement",
      DebuggerStatement: "DebuggerStatement",
      EmptyStatement: "EmptyStatement",
      ExpressionStatement: "ExpressionStatement",
      ForStatement: "ForStatement",
      ForInStatement: "ForInStatement",
      FunctionDeclaration: "FunctionDeclaration",
      FunctionExpression: "FunctionExpression",
      Identifier: "Identifier",
      IfStatement: "IfStatement",
      Literal: "Literal",
      LabeledStatement: "LabeledStatement",
      LogicalExpression: "LogicalExpression",
      MemberExpression: "MemberExpression",
      NewExpression: "NewExpression",
      ObjectExpression: "ObjectExpression",
      Program: "Program",
      Property: "Property",
      ReturnStatement: "ReturnStatement",
      SequenceExpression: "SequenceExpression",
      SwitchStatement: "SwitchStatement",
      SwitchCase: "SwitchCase",
      ThisExpression: "ThisExpression",
      ThrowStatement: "ThrowStatement",
      TryStatement: "TryStatement",
      UnaryExpression: "UnaryExpression",
      UpdateExpression: "UpdateExpression",
      VariableDeclaration: "VariableDeclaration",
      VariableDeclarator: "VariableDeclarator",
      WhileStatement: "WhileStatement",
      WithStatement: "WithStatement"
    }, i = {
      Data: 1,
      Get: 2,
      Set: 4
    }, s = {
      UnexpectedToken: "Unexpected token %0",
      UnexpectedNumber: "Unexpected number",
      UnexpectedString: "Unexpected string",
      UnexpectedIdentifier: "Unexpected identifier",
      UnexpectedReserved: "Unexpected reserved word",
      UnexpectedEOS: "Unexpected end of input",
      NewlineAfterThrow: "Illegal newline after throw",
      InvalidRegExp: "Invalid regular expression",
      UnterminatedRegExp: "Invalid regular expression: missing /",
      InvalidLHSInAssignment: "Invalid left-hand side in assignment",
      InvalidLHSInForIn: "Invalid left-hand side in for-in",
      MultipleDefaultsInSwitch: "More than one default clause in switch statement",
      NoCatchOrFinally: "Missing catch or finally after try",
      UnknownLabel: "Undefined label '%0'",
      Redeclaration: "%0 '%1' has already been declared",
      IllegalContinue: "Illegal continue statement",
      IllegalBreak: "Illegal break statement",
      IllegalReturn: "Illegal return statement",
      StrictModeWith: "Strict mode code may not include a with statement",
      StrictCatchVariable: "Catch variable may not be eval or arguments in strict mode",
      StrictVarName: "Variable name may not be eval or arguments in strict mode",
      StrictParamName: "Parameter name eval or arguments is not allowed in strict mode",
      StrictParamDupe: "Strict mode function may not have duplicate parameter names",
      StrictFunctionName: "Function name may not be eval or arguments in strict mode",
      StrictOctalLiteral: "Octal literals are not allowed in strict mode.",
      StrictDelete: "Delete of an unqualified identifier in strict mode.",
      StrictDuplicateProperty: "Duplicate data property in object literal not allowed in strict mode",
      AccessorDataProperty: "Object literal may not have data and accessor property with the same name",
      AccessorGetSet: "Object literal may not have multiple get/set accessors with the same name",
      StrictLHSAssignment: "Assignment to eval or arguments is not allowed in strict mode",
      StrictLHSPostfix: "Postfix increment/decrement may not have eval or arguments operand in strict mode",
      StrictLHSPrefix: "Prefix increment/decrement may not have eval or arguments operand in strict mode",
      StrictReservedWord: "Use of future reserved word in strict mode"
    }, o = {
      NonAsciiIdentifierStart: new RegExp("[\u00aa\u00b5\u00ba\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]"),
      NonAsciiIdentifierPart: new RegExp("[\u00aa\u00b5\u00ba\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0300-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u0483-\u0487\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u05d0-\u05ea\u05f0-\u05f2\u0610-\u061a\u0620-\u0669\u066e-\u06d3\u06d5-\u06dc\u06df-\u06e8\u06ea-\u06fc\u06ff\u0710-\u074a\u074d-\u07b1\u07c0-\u07f5\u07fa\u0800-\u082d\u0840-\u085b\u08a0\u08a2-\u08ac\u08e4-\u08fe\u0900-\u0963\u0966-\u096f\u0971-\u0977\u0979-\u097f\u0981-\u0983\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bc-\u09c4\u09c7\u09c8\u09cb-\u09ce\u09d7\u09dc\u09dd\u09df-\u09e3\u09e6-\u09f1\u0a01-\u0a03\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a59-\u0a5c\u0a5e\u0a66-\u0a75\u0a81-\u0a83\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abc-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ad0\u0ae0-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3c-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5c\u0b5d\u0b5f-\u0b63\u0b66-\u0b6f\u0b71\u0b82\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd0\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c58\u0c59\u0c60-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbc-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0cde\u0ce0-\u0ce3\u0ce6-\u0cef\u0cf1\u0cf2\u0d02\u0d03\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d-\u0d44\u0d46-\u0d48\u0d4a-\u0d4e\u0d57\u0d60-\u0d63\u0d66-\u0d6f\u0d7a-\u0d7f\u0d82\u0d83\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e01-\u0e3a\u0e40-\u0e4e\u0e50-\u0e59\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb9\u0ebb-\u0ebd\u0ec0-\u0ec4\u0ec6\u0ec8-\u0ecd\u0ed0-\u0ed9\u0edc-\u0edf\u0f00\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e-\u0f47\u0f49-\u0f6c\u0f71-\u0f84\u0f86-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1049\u1050-\u109d\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u135d-\u135f\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176c\u176e-\u1770\u1772\u1773\u1780-\u17d3\u17d7\u17dc\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1820-\u1877\u1880-\u18aa\u18b0-\u18f5\u1900-\u191c\u1920-\u192b\u1930-\u193b\u1946-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u19d0-\u19d9\u1a00-\u1a1b\u1a20-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1aa7\u1b00-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1bf3\u1c00-\u1c37\u1c40-\u1c49\u1c4d-\u1c7d\u1cd0-\u1cd2\u1cd4-\u1cf6\u1d00-\u1de6\u1dfc-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u200c\u200d\u203f\u2040\u2054\u2071\u207f\u2090-\u209c\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d7f-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2de0-\u2dff\u2e2f\u3005-\u3007\u3021-\u302f\u3031-\u3035\u3038-\u303c\u3041-\u3096\u3099\u309a\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua62b\ua640-\ua66f\ua674-\ua67d\ua67f-\ua697\ua69f-\ua6f1\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua827\ua840-\ua873\ua880-\ua8c4\ua8d0-\ua8d9\ua8e0-\ua8f7\ua8fb\ua900-\ua92d\ua930-\ua953\ua960-\ua97c\ua980-\ua9c0\ua9cf-\ua9d9\uaa00-\uaa36\uaa40-\uaa4d\uaa50-\uaa59\uaa60-\uaa76\uaa7a\uaa7b\uaa80-\uaac2\uaadb-\uaadd\uaae0-\uaaef\uaaf2-\uaaf6\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabea\uabec\uabed\uabf0-\uabf9\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\ufe70-\ufe74\ufe76-\ufefc\uff10-\uff19\uff21-\uff3a\uff3f\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]")
    }, typeof "esprima" [0] == "undefined" && (g = function(t, n) {
      return u.slice(t, n).join("")
    }), e.version = "1.0.2", e.parse = En, e.Syntax = function() {
      var e, t = {};
      typeof Object.create == "function" && (t = Object.create(null));
      for (e in r) r.hasOwnProperty(e) && (t[e] = r[e]);
      return typeof Object.freeze == "function" && Object.freeze(t), t
    }()
  })
}(null),
function(e, t) {
  function o(e, t, n) {
    function o(t) {
      n[e.range[0]] = t;
      for (var r = e.range[0] + 1; r < e.range[1]; r++) n[r] = ""
    }
    if (!e.range) return;
    e.parent = t, e.source = function() {
      return n.slice(e.range[0], e.range[1]).join("")
    };
    if (e.update && typeof e.update == "object") {
      var s = e.update;
      i(r(s), function(e) {
        o[e] = s[e]
      }), e.update = o
    } else e.update = o
  }
  var n = e("esprima").parse,
    r = Object.keys || function(e) {
      var t = [];
      for (var n in e) t.push(n);
      return t
    }, i = function(e, t) {
      if (e.forEach) return e.forEach(t);
      for (var n = 0; n < e.length; n++) t.call(e, e[n], n, e)
    }, s = Array.isArray || function(e) {
      return Object.prototype.toString.call(e) === "[object Array]"
    };
  t.exports = function(e, t, u) {
    typeof t == "function" && (u = t, t = {}), typeof e == "object" && (t = e, e = t.source, delete t.source), e = e === undefined ? t.source : e, t.range = !0, typeof e != "string" && (e = String(e));
    var a = n(e, t),
      f = {
        chunks: e.split(""),
        toString: function() {
          return f.chunks.join("")
        },
        inspect: function() {
          return f.toString()
        }
      }, l = 0;
    return function c(e, t) {
      o(e, t, f.chunks), i(r(e), function(t) {
        if (t === "parent") return;
        var n = e[t];
        s(n) ? i(n, function(t) {
          t && typeof t.type == "string" && c(t, e)
        }) : n && typeof n.type == "string" && (o(n, e, f.chunks), c(n, e))
      }), u(e)
    }(a, undefined), f
  }, window.falafel = t.exports
}(function() {
  return {
    parse: esprima.parse
  }
}, {
  exports: {}
});
var inBrowser = typeof window != "undefined" && this === window,
  parseAndModify = inBrowser ? window.falafel : require("falafel");
(inBrowser ? window : exports).blanket = function() {
    var e = ["ExpressionStatement", "BreakStatement", "ContinueStatement", "VariableDeclaration", "ReturnStatement", "ThrowStatement", "TryStatement", "FunctionDeclaration", "IfStatement", "WhileStatement", "DoWhileStatement", "ForStatement", "ForInStatement", "SwitchStatement", "WithStatement"],
      t = ["IfStatement", "WhileStatement", "DoWhileStatement", "ForStatement", "ForInStatement", "WithStatement"],
      n, r = Math.floor(Math.random() * 1e3),
      i = {}, s = {
        reporter: null,
        adapter: null,
        filter: null,
        customVariable: null,
        loader: null,
        ignoreScriptError: !1,
        existingRequireJS: !1,
        autoStart: !1,
        timeout: 180,
        ignoreCors: !1,
        branchTracking: !1,
        sourceURL: !1,
        debug: !1,
        engineOnly: !1,
        testReadyCallback: null,
        commonJS: !1,
        instrumentCache: !1,
        modulePattern: null
      };
    return inBrowser && typeof window.blanket != "undefined" && (n = window.blanket.noConflict()), _blanket = {
      noConflict: function() {
        return n ? n : _blanket
      },
      _getCopyNumber: function() {
        return r
      },
      extend: function(e) {
        _blanket._extend(_blanket, e)
      },
      _extend: function(e, t) {
        if (t)
          for (var n in t) e[n] instanceof Object && typeof e[n] != "function" ? _blanket._extend(e[n], t[n]) : e[n] = t[n]
      },
      getCovVar: function() {
        var e = _blanket.options("customVariable");
        return e ? (_blanket.options("debug") && console.log("BLANKET-Using custom tracking variable:", e), inBrowser ? "window." + e : e) : inBrowser ? "window._$blanket" : "_$jscoverage"
      },
      options: function(e, t) {
        if (typeof e != "string") _blanket._extend(s, e);
        else {
          if (typeof t == "undefined") return s[e];
          s[e] = t
        }
      },
      instrument: function(e, t) {
        var n = e.inputFile,
          r = e.inputFileName;
        if (_blanket.options("instrumentCache") && sessionStorage && sessionStorage.getItem("blanket_instrument_store-" + r)) _blanket.options("debug") && console.log("BLANKET-Reading instrumentation from cache: ", r), t(sessionStorage.getItem("blanket_instrument_store-" + r));
        else {
          var i = _blanket._prepareSource(n);
          _blanket._trackingArraySetup = [];
          var s = parseAndModify(n, {
            loc: !0,
            comment: !0
          }, _blanket._addTracking(r));
          s = _blanket._trackingSetup(r, i) + s, _blanket.options("sourceURL") && (s += "\n//@ sourceURL=" + r.replace("http://", "")), _blanket.options("debug") && console.log("BLANKET-Instrumented file: ", r), _blanket.options("instrumentCache") && sessionStorage && (_blanket.options("debug") && console.log("BLANKET-Saving instrumentation to cache: ", r), sessionStorage.setItem("blanket_instrument_store-" + r, s)), t(s)
        }
      },
      _trackingArraySetup: [],
      _branchingArraySetup: [],
      _prepareSource: function(e) {
        return e.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/(\r\n|\n|\r)/gm, "\n").split("\n")
      },
      _trackingSetup: function(e, t) {
        var n = _blanket.options("branchTracking"),
          r = t.join("',\n'"),
          i = "",
          s = _blanket.getCovVar();
        return i += "if (typeof " + s + " === 'undefined') " + s + " = {};\n", n && (i += "var _$branchFcn=function(f,l,c,r){ ", i += "if (!!r) { ", i += s + "[f].branchData[l][c][0] = " + s + "[f].branchData[l][c][0] || [];", i += s + "[f].branchData[l][c][0].push(r); }", i += "else { ", i += s + "[f].branchData[l][c][1] = " + s + "[f].branchData[l][c][1] || [];", i += s + "[f].branchData[l][c][1].push(r); }", i += "return r;};\n"), i += "if (typeof " + s + "['" + e + "'] === 'undefined'){", i += s + "['" + e + "']=[];\n", n && (i += s + "['" + e + "'].branchData=[];\n"), i += s + "['" + e + "'].source=['" + r + "'];\n", _blanket._trackingArraySetup.sort(function(e, t) {
          return parseInt(e, 10) > parseInt(t, 10)
        }).forEach(function(t) {
          i += s + "['" + e + "'][" + t + "]=0;\n"
        }), n && _blanket._branchingArraySetup.sort(function(e, t) {
          return e.line > t.line
        }).sort(function(e, t) {
          return e.column > t.column
        }).forEach(function(t) {
          t.file === e && (i += "if (typeof " + s + "['" + e + "'].branchData[" + t.line + "] === 'undefined'){\n", i += s + "['" + e + "'].branchData[" + t.line + "]=[];\n", i += "}", i += s + "['" + e + "'].branchData[" + t.line + "][" + t.column + "] = [];\n", i += s + "['" + e + "'].branchData[" + t.line + "][" + t.column + "].consequent = " + JSON.stringify(t.consequent) + ";\n", i += s + "['" + e + "'].branchData[" + t.line + "][" + t.column + "].alternate = " + JSON.stringify(t.alternate) + ";\n")
        }), i += "}", i
      },
      _blockifyIf: function(e) {
        if (t.indexOf(e.type) > -1) {
          var n = e.consequent || e.body,
            r = e.alternate;
          r && r.type !== "BlockStatement" && r.update("{\n" + r.source() + "}\n"), n && n.type !== "BlockStatement" && n.update("{\n" + n.source() + "}\n")
        }
      },
      _trackBranch: function(e, t) {
        var n = e.loc.start.line,
          r = e.loc.start.column;
        _blanket._branchingArraySetup.push({
          line: n,
          column: r,
          file: t,
          consequent: e.consequent.loc,
          alternate: e.alternate.loc
        });
        var i = e.source(),
          s = "_$branchFcn('" + t + "'," + n + "," + r + "," + i.slice(0, i.indexOf("?")) + ")" + i.slice(i.indexOf("?"));
        e.update(s)
      },
      _addTracking: function(t) {
        var n = _blanket.getCovVar();
        return function(r) {
          _blanket._blockifyIf(r);
          if (e.indexOf(r.type) > -1 && r.parent.type !== "LabeledStatement") {
            _blanket._checkDefs(r, t);
            if (r.type === "VariableDeclaration" && (r.parent.type === "ForStatement" || r.parent.type === "ForInStatement")) return;
            if (!r.loc || !r.loc.start) throw new Error("The instrumenter encountered a node with no location: " + Object.keys(r));
            r.update(n + "['" + t + "'][" + r.loc.start.line + "]++;\n" + r.source()), _blanket._trackingArraySetup.push(r.loc.start.line)
          } else _blanket.options("branchTracking") && r.type === "ConditionalExpression" && _blanket._trackBranch(r, t)
        }
      },
      _checkDefs: function(e, t) {
        if (inBrowser) {
          e.type === "VariableDeclaration" && e.declarations && e.declarations.forEach(function(n) {
            if (n.id.name === "window") throw new Error("Instrumentation error, you cannot redefine the 'window' variable in  " + t + ":" + e.loc.start.line)
          }), e.type === "FunctionDeclaration" && e.params && e.params.forEach(function(n) {
            if (n.name === "window") throw new Error("Instrumentation error, you cannot redefine the 'window' variable in  " + t + ":" + e.loc.start.line)
          });
          if (e.type === "ExpressionStatement" && e.expression && e.expression.left && e.expression.left.object && e.expression.left.property && e.expression.left.object.name + "." + e.expression.left.property.name === _blanket.getCovVar()) throw new Error("Instrumentation error, you cannot redefine the coverage variable in  " + t + ":" + e.loc.start.line)
        } else if (e.type === "ExpressionStatement" && e.expression && e.expression.left && !e.expression.left.object && !e.expression.left.property && e.expression.left.name === _blanket.getCovVar()) throw new Error("Instrumentation error, you cannot redefine the coverage variable in  " + t + ":" + e.loc.start.line)
      },
      setupCoverage: function() {
        i.instrumentation = "blanket", i.stats = {
          suites: 0,
          tests: 0,
          passes: 0,
          pending: 0,
          failures: 0,
          start: new Date
        }
      },
      _checkIfSetup: function() {
        if (!i.stats) throw new Error("You must call blanket.setupCoverage() first.")
      },
      onTestStart: function() {
        _blanket.options("debug") && console.log("BLANKET-Test event started"), this._checkIfSetup(), i.stats.tests++, i.stats.pending++
      },
      onTestDone: function(e, t) {
        this._checkIfSetup(), t === e ? i.stats.passes++ : i.stats.failures++, i.stats.pending--
      },
      onModuleStart: function() {
        this._checkIfSetup(), i.stats.suites++
      },
      onTestsDone: function() {
        _blanket.options("debug") && console.log("BLANKET-Test event done"), this._checkIfSetup(), i.stats.end = new Date, inBrowser ? this.report(i) : (_blanket.options("branchTracking") || delete(inBrowser ? window : global)[_blanket.getCovVar()].branchFcn, this.options("reporter").call(this, i))
      }
    }, _blanket
}(),
function(e) {
  var t = e.options;
  e.extend({
    outstandingRequireFiles: [],
    options: function(n, r) {
      var i = {};
      if (typeof n != "string") t(n), i = n;
      else {
        if (typeof r == "undefined") return t(n);
        t(n, r), i[n] = r
      }
      i.adapter && e._loadFile(i.adapter), i.loader && e._loadFile(i.loader)
    },
    requiringFile: function(t, n) {
      typeof t == "undefined" ? e.outstandingRequireFiles = [] : typeof n == "undefined" ? e.outstandingRequireFiles.push(t) : e.outstandingRequireFiles.splice(e.outstandingRequireFiles.indexOf(t), 1)
    },
    requireFilesLoaded: function() {
      return e.outstandingRequireFiles.length === 0
    },
    showManualLoader: function() {
      if (document.getElementById("blanketLoaderDialog")) return;
      var e = "<div class='blanketDialogOverlay'>";
      e += "&nbsp;</div>", e += "<div class='blanketDialogVerticalOffset'>", e += "<div class='blanketDialogBox'>", e += "<b>Error:</b> Blanket.js encountered a cross origin request error while instrumenting the source files.  ", e += "<br><br>This is likely caused by the source files being referenced locally (using the file:// protocol). ", e += "<br><br>Some solutions include <a href='http://askubuntu.com/questions/160245/making-google-chrome-option-allow-file-access-from-files-permanent' target='_blank'>starting Chrome with special flags</a>, <a target='_blank' href='https://github.com/remy/servedir'>running a server locally</a>, or using a browser without these CORS restrictions (Safari).", e += "<br>", typeof FileReader != "undefined" && (e += "<br>Or, try the experimental loader.  When prompted, simply click on the directory containing all the source files you want covered.", e += "<a href='javascript:document.getElementById(\"fileInput\").click();'>Start Loader</a>", e += "<input type='file' type='application/x-javascript' accept='application/x-javascript' webkitdirectory id='fileInput' multiple onchange='window.blanket.manualFileLoader(this.files)' style='visibility:hidden;position:absolute;top:-50;left:-50'/>"), e += "<br><span style='float:right;cursor:pointer;'  onclick=document.getElementById('blanketLoaderDialog').style.display='none';>Close</span>", e += "<div style='clear:both'></div>", e += "</div></div>";
      var t = ".blanketDialogWrapper {";
      t += "display:block;", t += "position:fixed;", t += "z-index:40001; }", t += ".blanketDialogOverlay {", t += "position:fixed;", t += "width:100%;", t += "height:100%;", t += "background-color:black;", t += "opacity:.5; ", t += "-ms-filter:'progid:DXImageTransform.Microsoft.Alpha(Opacity=50)'; ", t += "filter:alpha(opacity=50); ", t += "z-index:40001; }", t += ".blanketDialogVerticalOffset { ", t += "position:fixed;", t += "top:30%;", t += "width:100%;", t += "z-index:40002; }", t += ".blanketDialogBox { ", t += "width:405px; ", t += "position:relative;", t += "margin:0 auto;", t += "background-color:white;", t += "padding:10px;", t += "border:1px solid black; }";
      var n = document.createElement("style");
      n.innerHTML = t, document.head.appendChild(n);
      var r = document.createElement("div");
      r.id = "blanketLoaderDialog", r.className = "blanketDialogWrapper", r.innerHTML = e, document.body.insertBefore(r, document.body.firstChild)
    },
    manualFileLoader: function(e) {
      function o(e) {
        var t = new FileReader;
        t.onload = s, t.readAsText(e)
      }
      var t = Array.prototype.slice;
      e = t.call(e).filter(function(e) {
        return e.type !== ""
      });
      var n = e.length - 1,
        r = 0,
        i = {};
      sessionStorage.blanketSessionLoader && (i = JSON.parse(sessionStorage.blanketSessionLoader));
      var s = function(t) {
        var s = t.currentTarget.result,
          u = e[r],
          a = u.webkitRelativePath && u.webkitRelativePath !== "" ? u.webkitRelativePath : u.name;
        i[a] = s, r++, r === n ? (sessionStorage.setItem("blanketSessionLoader", JSON.stringify(i)), document.location.reload()) : o(e[r])
      };
      o(e[r])
    },
    _loadFile: function(t) {
      if (typeof t != "undefined") {
        var n = new XMLHttpRequest;
        n.open("GET", t, !1), n.send(), e._addScript(n.responseText)
      }
    },
    _addScript: function(e) {
      var t = document.createElement("script");
      t.type = "text/javascript", t.text = e, (document.body || document.getElementsByTagName("head")[0]).appendChild(t)
    },
    hasAdapter: function(t) {
      return e.options("adapter") !== null
    },
    report: function(t) {
      document.getElementById("blanketLoaderDialog") || (e.blanketSession = null), t.files = window._$blanket;
      var n = blanket.options("commonJS") ? blanket._commonjs.require : window.require;
      if (!t.files || !Object.keys(t.files).length) {
        e.options("debug") && console.log("BLANKET-Reporting No files were instrumented.");
        return
      }
      typeof t.files.branchFcn != "undefined" && delete t.files.branchFcn;
      if (typeof e.options("reporter") == "string") e._loadFile(e.options("reporter")), e.customReporter(t, e.options("reporter_options"));
      else if (typeof e.options("reporter") == "function") e.options("reporter")(t);
      else {
        if (typeof e.defaultReporter != "function") throw new Error("no reporter defined.");
        e.defaultReporter(t)
      }
    },
    _bindStartTestRunner: function(e, t) {
      e ? e(t) : window.addEventListener("load", t, !1)
    },
    _loadSourceFiles: function(t) {
      function r(e) {
        var t = Object.create(Object.getPrototypeOf(e)),
          n = Object.getOwnPropertyNames(e);
        return n.forEach(function(n) {
          var r = Object.getOwnPropertyDescriptor(e, n);
          Object.defineProperty(t, n, r)
        }), t
      }
      var n = blanket.options("commonJS") ? blanket._commonjs.require : window.require;
      e.options("debug") && console.log("BLANKET-Collecting page scripts");
      var i = e.utils.collectPageScripts();
      if (i.length === 0) t();
      else {
        sessionStorage.blanketSessionLoader && (e.blanketSession = JSON.parse(sessionStorage.blanketSessionLoader)), i.forEach(function(t, n) {
          e.utils.cache[t + ".js"] = {
            loaded: !1
          }
        });
        var s = -1;
        e.utils.loadAll(function(e) {
          return e ? typeof i[s + 1] != "undefined" : (s++, s >= i.length ? null : i[s] + ".js")
        }, t)
      }
    },
    beforeStartTestRunner: function(t) {
      t = t || {}, t.checkRequirejs = typeof t.checkRequirejs == "undefined" ? !0 : t.checkRequirejs, t.callback = t.callback || function() {}, t.coverage = typeof t.coverage == "undefined" ? !0 : t.coverage, t.coverage ? e._bindStartTestRunner(t.bindEvent, function() {
        e._loadSourceFiles(function() {
          var n = function() {
            return t.condition ? t.condition() : e.requireFilesLoaded()
          }, r = function() {
              if (n()) {
                e.options("debug") && console.log("BLANKET-All files loaded, init start test runner callback.");
                var i = e.options("testReadyCallback");
                i ? typeof i == "function" ? i(t.callback) : typeof i == "string" && (e._addScript(i), t.callback()) : t.callback()
              } else setTimeout(r, 13)
            };
          r()
        })
      }) : t.callback()
    },
    utils: {
      qualifyURL: function(e) {
        var t = document.createElement("a");
        return t.href = e, t.href
      }
    }
  })
}(blanket), blanket.defaultReporter = function(e) {
  function l(e) {
    var t = document.getElementById(e);
    t.style.display === "block" ? t.style.display = "none" : t.style.display = "block"
  }

  function d(e) {
    return e.replace(/\&/g, "&amp;").replace(/</g, "&lt;").replace(/\>/g, "&gt;").replace(/\"/g, "&quot;").replace(/\'/g, "&apos;")
  }

  function v(e, t) {
    var n = t ? 0 : 1;
    return typeof e == "undefined" || typeof e === null || typeof e[n] == "undefined" ? !1 : e[n].length > 0
  }

  function g(e, t, n, r, i) {
    var s = "",
      o = "";
    if (m.length > 0) {
      s += "<span class='" + (v(m[0][1], m[0][1].consequent === m[0][0]) ? "branchOkay" : "branchWarning") + "'>";
      if (m[0][0].end.line === i) {
        s += d(t.slice(0, m[0][0].end.column)) + "</span>", t = t.slice(m[0][0].end.column), m.shift();
        if (m.length > 0) {
          s += "<span class='" + (v(m[0][1], !1) ? "branchOkay" : "branchWarning") + "'>";
          if (m[0][0].end.line === i) {
            s += d(t.slice(0, m[0][0].end.column)) + "</span>", t = t.slice(m[0][0].end.column), m.shift();
            if (!n) return {
              src: s + d(t),
              cols: n
            }
          } else {
            if (!n) return {
              src: s + d(t) + "</span>",
              cols: n
            };
            o = "</span>"
          }
        } else if (!n) return {
          src: s + d(t),
          cols: n
        }
      } else {
        if (!n) return {
          src: s + d(t) + "</span>",
          cols: n
        };
        o = "</span>"
      }
    }
    var u = n[e],
      a = u.consequent;
    if (a.start.line > i) m.unshift([u.alternate, u]), m.unshift([a, u]), t = d(t);
    else {
      var f = "<span class='" + (v(u, !0) ? "branchOkay" : "branchWarning") + "'>";
      s += d(t.slice(0, a.start.column - r)) + f;
      if (n.length > e + 1 && n[e + 1].consequent.start.line === i && n[e + 1].consequent.start.column - r < n[e].consequent.end.column - r) {
        var l = g(e + 1, t.slice(a.start.column - r, a.end.column - r), n, a.start.column - r, i);
        s += l.src, n = l.cols, n[e + 1] = n[e + 2], n.length--
      } else s += d(t.slice(a.start.column - r, a.end.column - r));
      s += "</span>";
      var c = u.alternate;
      if (c.start.line > i) s += d(t.slice(a.end.column - r)), m.unshift([c, u]);
      else {
        s += d(t.slice(a.end.column - r, c.start.column - r)), f = "<span class='" + (v(u, !1) ? "branchOkay" : "branchWarning") + "'>", s += f;
        if (n.length > e + 1 && n[e + 1].consequent.start.line === i && n[e + 1].consequent.start.column - r < n[e].alternate.end.column - r) {
          var h = g(e + 1, t.slice(c.start.column - r, c.end.column - r), n, c.start.column - r, i);
          s += h.src, n = h.cols, n[e + 1] = n[e + 2], n.length--
        } else s += d(t.slice(c.start.column - r, c.end.column - r));
        s += "</span>", s += d(t.slice(c.end.column - r)), t = s
      }
    }
    return {
      src: t + o,
      cols: n
    }
  }
  var t = "#blanket-main {margin:2px;background:#EEE;color:#333;clear:both;font-family:'Helvetica Neue Light', 'HelveticaNeue-Light', 'Helvetica Neue', Calibri, Helvetica, Arial, sans-serif; font-size:17px;} #blanket-main a {color:#333;text-decoration:none;}  #blanket-main a:hover {text-decoration:underline;} .blanket {margin:0;padding:5px;clear:both;border-bottom: 1px solid #FFFFFF;} .bl-error {color:red;}.bl-success {color:#5E7D00;} .bl-file{width:auto;} .bl-cl{float:left;} .blanket div.rs {margin-left:50px; width:150px; float:right} .bl-nb {padding-right:10px;} #blanket-main a.bl-logo {color: #EB1764;cursor: pointer;font-weight: bold;text-decoration: none} .bl-source{ overflow-x:scroll; background-color: #FFFFFF; border: 1px solid #CBCBCB; color: #363636; margin: 25px 20px; width: 80%;} .bl-source div{white-space: pre;font-family: monospace;} .bl-source > div > span:first-child{background-color: #EAEAEA;color: #949494;display: inline-block;padding: 0 10px;text-align: center;width: 30px;} .bl-source .miss{background-color:#e6c3c7} .bl-source span.branchWarning{color:#000;background-color:yellow;} .bl-source span.branchOkay{color:#000;background-color:transparent;}",
    n = 60,
    r = document.head,
    i = 0,
    s = document.body,
    o, u = Object.keys(e.files).some(function(t) {
      return typeof e.files[t].branchData != "undefined"
    }),
    a = "<div id='blanket-main'><div class='blanket bl-title'><div class='bl-cl bl-file'><a href='http://alex-seville.github.com/blanket/' target='_blank' class='bl-logo'>Blanket.js</a> results</div><div class='bl-cl rs'>Coverage (%)</div><div class='bl-cl rs'>Covered/Total Smts.</div>" + (u ? "<div class='bl-cl rs'>Covered/Total Branches</div>" : "") + "<div style='clear:both;'></div></div>",
    f = "<div class='blanket {{statusclass}}'><div class='bl-cl bl-file'><span class='bl-nb'>{{fileNumber}}.</span><a href='javascript:blanket_toggleSource(\"file-{{fileNumber}}\")'>{{file}}</a></div><div class='bl-cl rs'>{{percentage}} %</div><div class='bl-cl rs'>{{numberCovered}}/{{totalSmts}}</div>" + (u ? "<div class='bl-cl rs'>{{passedBranches}}/{{totalBranches}}</div>" : "") + "<div id='file-{{fileNumber}}' class='bl-source' style='display:none;'>{{source}}</div><div style='clear:both;'></div></div>";
  grandTotalTemplate = "<div class='blanket grand-total {{statusclass}}'><div class='bl-cl'>{{rowTitle}}</div><div class='bl-cl rs'>{{percentage}} %</div><div class='bl-cl rs'>{{numberCovered}}/{{totalSmts}}</div>" + (u ? "<div class='bl-cl rs'>{{passedBranches}}/{{totalBranches}}</div>" : "") + "<div style='clear:both;'></div></div>";
  var c = document.createElement("script");
  c.type = "text/javascript", c.text = l.toString().replace("function " + l.name, "function blanket_toggleSource"), s.appendChild(c);
  var h = function(e, t) {
    return Math.round(e / t * 100 * 100) / 100
  }, p = function(e, t, n) {
      var r = document.createElement(e);
      r.innerHTML = n, t.appendChild(r)
    }, m = [],
    y = function(e) {
      return typeof e != "undefined"
    }, b = e.files,
    w = {
      totalSmts: 0,
      numberOfFilesCovered: 0,
      passedBranches: 0,
      totalBranches: 0,
      moduleTotalStatements: {},
      moduleTotalCoveredStatements: {},
      moduleTotalBranches: {},
      moduleTotalCoveredBranches: {}
    }, E = _blanket.options("modulePattern"),
    S = E ? new RegExp(E) : null;
  for (var x in b) {
    i++;
    var T = b[x],
      N = 0,
      C = 0,
      k = [],
      L, A = [];
    for (L = 0; L < T.source.length; L += 1) {
      var O = T.source[L];
      if (m.length > 0 || typeof T.branchData != "undefined")
        if (typeof T.branchData[L + 1] != "undefined") {
          var M = T.branchData[L + 1].filter(y),
            _ = 0;
          O = g(_, O, M, 0, L + 1).src
        } else m.length ? O = g(0, O, null, 0, L + 1).src : O = d(O);
        else O = d(O);
      var D = "";
      T[L + 1] ? (C += 1, N += 1, D = "hit") : T[L + 1] === 0 && (N++, D = "miss"), k[L + 1] = "<div class='" + D + "'><span class=''>" + (L + 1) + "</span>" + O + "</div>"
    }
    w.totalSmts += N, w.numberOfFilesCovered += C;
    var P = 0,
      H = 0;
    if (typeof T.branchData != "undefined")
      for (var B = 0; B < T.branchData.length; B++)
        if (typeof T.branchData[B] != "undefined")
          for (var j = 0; j < T.branchData[B].length; j++) typeof T.branchData[B][j] != "undefined" && (P++, typeof T.branchData[B][j][0] != "undefined" && T.branchData[B][j][0].length > 0 && typeof T.branchData[B][j][1] != "undefined" && T.branchData[B][j][1].length > 0 && H++);
    w.passedBranches += H, w.totalBranches += P;
    if (S) {
      var F = x.match(S)[1];
      w.moduleTotalStatements.hasOwnProperty(F) || (w.moduleTotalStatements[F] = 0, w.moduleTotalCoveredStatements[F] = 0), w.moduleTotalStatements[F] += N, w.moduleTotalCoveredStatements[F] += C, w.moduleTotalBranches.hasOwnProperty(F) || (w.moduleTotalBranches[F] = 0, w.moduleTotalCoveredBranches[F] = 0), w.moduleTotalBranches[F] += P, w.moduleTotalCoveredBranches[F] += H
    }
    var I = h(C, N),
      q = f.replace("{{file}}", x).replace("{{percentage}}", I).replace("{{numberCovered}}", C).replace(/\{\{fileNumber\}\}/g, i).replace("{{totalSmts}}", N).replace("{{totalBranches}}", P).replace("{{passedBranches}}", H).replace("{{source}}", k.join(" "));
    I < n ? q = q.replace("{{statusclass}}", "bl-error") : q = q.replace("{{statusclass}}", "bl-success"), a += q
  }
  var R = function(e, t, r, i, s) {
    var o = h(t, e),
      u = o < n ? "bl-error" : "bl-success",
      f = s ? "Total for module: " + s : "Global total",
      l = grandTotalTemplate.replace("{{rowTitle}}", f).replace("{{percentage}}", o).replace("{{numberCovered}}", t).replace("{{totalSmts}}", e).replace("{{passedBranches}}", i).replace("{{totalBranches}}", r).replace("{{statusclass}}", u);
    a += l
  };
  if (S)
    for (var U in w.moduleTotalStatements)
      if (w.moduleTotalStatements.hasOwnProperty(U)) {
        var z = w.moduleTotalStatements[U],
          W = w.moduleTotalCoveredStatements[U],
          X = w.moduleTotalBranches[U],
          V = w.moduleTotalCoveredBranches[U];
        R(z, W, X, V, U)
      }
  R(w.totalSmts, w.numberOfFilesCovered, w.totalBranches, w.passedBranches, null), a += "</div>", p("style", r, t), document.getElementById("blanket-main") ? document.getElementById("blanket-main").innerHTML = a.slice(23, -6) : p("div", s, a)
},
function() {
  var e = {}, t = Array.prototype.slice,
    n = t.call(document.scripts);
  t.call(n[n.length - 1].attributes).forEach(function(t) {
    t.nodeName === "data-cover-only" && (e.filter = t.nodeValue), t.nodeName === "data-cover-never" && (e.antifilter = t.nodeValue), t.nodeName === "data-cover-reporter" && (e.reporter = t.nodeValue), t.nodeName === "data-cover-adapter" && (e.adapter = t.nodeValue), t.nodeName === "data-cover-loader" && (e.loader = t.nodeValue), t.nodeName === "data-cover-timeout" && (e.timeout = t.nodeValue), t.nodeName === "data-cover-modulepattern" && (e.modulePattern = t.nodeValue);
    if (t.nodeName === "data-cover-reporter-options") try {
      e.reporter_options = JSON.parse(t.nodeValue)
    } catch (n) {
      if (blanket.options("debug")) throw new Error("Invalid reporter options.  Must be a valid stringified JSON object.")
    }
    t.nodeName === "data-cover-testReadyCallback" && (e.testReadyCallback = t.nodeValue), t.nodeName === "data-cover-customVariable" && (e.customVariable = t.nodeValue);
    if (t.nodeName === "data-cover-flags") {
      var r = " " + t.nodeValue + " ";
      r.indexOf(" ignoreError ") > -1 && (e.ignoreScriptError = !0), r.indexOf(" autoStart ") > -1 && (e.autoStart = !0), r.indexOf(" ignoreCors ") > -1 && (e.ignoreCors = !0), r.indexOf(" branchTracking ") > -1 && (e.branchTracking = !0), r.indexOf(" sourceURL ") > -1 && (e.sourceURL = !0), r.indexOf(" debug ") > -1 && (e.debug = !0), r.indexOf(" engineOnly ") > -1 && (e.engineOnly = !0), r.indexOf(" commonJS ") > -1 && (e.commonJS = !0), r.indexOf(" instrumentCache ") > -1 && (e.instrumentCache = !0)
    }
  }), blanket.options(e), typeof requirejs != "undefined" && blanket.options("existingRequireJS", !0), blanket.options("commonJS") && (blanket._commonjs = {})
}(),
function(e) {
  e.extend({
    utils: {
      normalizeBackslashes: function(e) {
        return e.replace(/\\/g, "/")
      },
      matchPatternAttribute: function(t, n) {
        if (typeof n == "string") {
          if (n.indexOf("[") === 0) {
            var r = n.slice(1, n.length - 1).split(",");
            return r.some(function(n) {
              return e.utils.matchPatternAttribute(t, e.utils.normalizeBackslashes(n.slice(1, -1)))
            })
          }
          if (n.indexOf("//") === 0) {
            var i = n.slice(2, n.lastIndexOf("/")),
              s = n.slice(n.lastIndexOf("/") + 1),
              o = new RegExp(i, s);
            return o.test(t)
          }
          return n.indexOf("#") === 0 ? window[n.slice(1)].call(window, t) : t.indexOf(e.utils.normalizeBackslashes(n)) > -1
        }
        if (n instanceof Array) return n.some(function(n) {
          return e.utils.matchPatternAttribute(t, n)
        });
        if (n instanceof RegExp) return n.test(t);
        if (typeof n == "function") return n.call(window, t)
      },
      blanketEval: function(t) {
        e._addScript(t)
      },
      collectPageScripts: function() {
        var t = Array.prototype.slice,
          n = t.call(document.scripts),
          r = [],
          i = [],
          s = e.options("filter");
        if (s != null) {
          var o = e.options("antifilter");
          r = t.call(document.scripts).filter(function(n) {
            return t.call(n.attributes).filter(function(t) {
              return t.nodeName === "src" && e.utils.matchPatternAttribute(t.nodeValue, s) && (typeof o == "undefined" || !e.utils.matchPatternAttribute(t.nodeValue, o))
            }).length === 1
          })
        } else r = t.call(document.querySelectorAll("script[data-cover]"));
        return i = r.map(function(n) {
          return e.utils.qualifyURL(t.call(n.attributes).filter(function(e) {
            return e.nodeName === "src"
          })[0].nodeValue).replace(".js", "")
        }), s || e.options("filter", "['" + i.join("','") + "']"), i
      },
      loadAll: function(t, n, r) {
        var i = t(),
          s = e.utils.scriptIsLoaded(i, e.utils.ifOrdered, t, n);
        if (!e.utils.cache[i] || !e.utils.cache[i].loaded) {
          var o = function() {
            e.options("debug") && console.log("BLANKET-Mark script:" + i + ", as loaded and move to next script."), s()
          }, u = function(t) {
              e.options("debug") && console.log("BLANKET-File loading finished"), typeof t != "undefined" && (e.options("debug") && console.log("BLANKET-Add file to DOM."), e._addScript(t)), o()
            };
          e.utils.attachScript({
            url: i
          }, function(t) {
            e.utils.processFile(t, i, u, u)
          })
        } else s()
      },
      attachScript: function(t, n) {
        var r = e.options("timeout") || 3e3;
        setTimeout(function() {
          if (!e.utils.cache[t.url].loaded) throw new Error("error loading source script")
        }, r), e.utils.getFile(t.url, n, function() {
          throw new Error("error loading source script")
        })
      },
      ifOrdered: function(t, n) {
        var r = t(!0);
        r ? e.utils.loadAll(t, n) : n(new Error("Error in loading chain."))
      },
      scriptIsLoaded: function(t, n, r, i) {
        return e.options("debug") && console.log("BLANKET-Returning function"),
        function() {
          e.options("debug") && console.log("BLANKET-Marking file as loaded: " + t), e.utils.cache[t].loaded = !0, e.utils.allLoaded() ? (e.options("debug") && console.log("BLANKET-All files loaded"), i()) : n && (e.options("debug") && console.log("BLANKET-Load next file."), n(r, i))
        }
      },
      cache: {},
      allLoaded: function() {
        var t = Object.keys(e.utils.cache);
        for (var n = 0; n < t.length; n++)
          if (!e.utils.cache[t[n]].loaded) return !1;
        return !0
      },
      processFile: function(t, n, r, i) {
        var s = e.options("filter"),
          o = e.options("antifilter");
        typeof o != "undefined" && e.utils.matchPatternAttribute(n.replace(/\.js$/, ""), o) ? (i(t), e.options("debug") && console.log("BLANKET-File will never be instrumented:" + n), e.requiringFile(n, !0)) : e.utils.matchPatternAttribute(n.replace(/\.js$/, ""), s) ? (e.options("debug") && console.log("BLANKET-Attempting instrument of:" + n), e.instrument({
          inputFile: t,
          inputFileName: n
        }, function(i) {
          try {
            e.options("debug") && console.log("BLANKET-instrument of:" + n + " was successfull."), e.utils.blanketEval(i), r(), e.requiringFile(n, !0)
          } catch (s) {
            if (!e.options("ignoreScriptError")) throw new Error("Error parsing instrumented code: " + s);
            e.options("debug") && console.log("BLANKET-There was an error loading the file:" + n), r(t), e.requiringFile(n, !0)
          }
        })) : (e.options("debug") && console.log("BLANKET-Loading (without instrumenting) the file:" + n), i(t), e.requiringFile(n, !0))
      },
      createXhr: function() {
        var e, t, n;
        if (typeof XMLHttpRequest != "undefined") return new XMLHttpRequest;
        if (typeof ActiveXObject != "undefined")
          for (t = 0; t < 3; t += 1) {
            n = progIds[t];
            try {
              e = new ActiveXObject(n)
            } catch (r) {}
            if (e) {
              progIds = [n];
              break
            }
          }
        return e
      },
      getFile: function(t, n, r, i) {
        var s = !1;
        if (e.blanketSession) {
          var o = Object.keys(e.blanketSession);
          for (var u = 0; u < o.length; u++) {
            var a = o[u];
            if (t.indexOf(a) > -1) {
              n(e.blanketSession[a]), s = !0;
              return
            }
          }
        }
        if (!s) {
          var f = e.utils.createXhr();
          f.open("GET", t, !0), i && i(f, t), f.onreadystatechange = function(e) {
            var i, s;
            f.readyState === 4 && (i = f.status, i > 399 && i < 600 ? (s = new Error(t + " HTTP status: " + i), s.xhr = f, r(s)) : n(f.responseText))
          };
          try {
            f.send(null)
          } catch (l) {
            if (!l.code || l.code !== 101 && l.code !== 1012 || e.options("ignoreCors") !== !1) throw l;
            e.showManualLoader()
          }
        }
      }
    }
  }),
  function() {
    var t = blanket.options("commonJS") ? blanket._commonjs.require : window.require,
      n = blanket.options("commonJS") ? blanket._commonjs.requirejs : window.requirejs;
    !e.options("engineOnly") && e.options("existingRequireJS") && (e.utils.oldloader = n.load, n.load = function(t, n, r) {
      e.requiringFile(r), e.utils.getFile(r, function(i) {
        e.utils.processFile(i, r, function() {
          t.completeLoad(n)
        }, function() {
          e.utils.oldloader(t, n, r)
        })
      }, function(t) {
        throw e.requiringFile(), t
      })
    })
  }()
}(blanket),
function() {
  if (typeof QUnit != "undefined") {
    var e = function() {
      return window.QUnit.config.queue.length > 0 && blanket.noConflict().requireFilesLoaded()
    };
    QUnit.config.urlConfig[0].tooltip ? (QUnit.config.urlConfig.push({
      id: "coverage",
      label: "Enable coverage",
      tooltip: "Enable code coverage."
    }), QUnit.urlParams.coverage || blanket.options("autoStart") ? (QUnit.begin(function() {
      blanket.noConflict().setupCoverage()
    }), QUnit.done(function(e, t) {
      blanket.noConflict().onTestsDone()
    }), QUnit.moduleStart(function(e) {
      blanket.noConflict().onModuleStart()
    }), QUnit.testStart(function(e) {
      blanket.noConflict().onTestStart()
    }), QUnit.testDone(function(e) {
      blanket.noConflict().onTestDone(e.total, e.passed)
    }), blanket.noConflict().beforeStartTestRunner({
      condition: e,
      callback: function() {
        (!blanket.options("existingRequireJS") || !! blanket.options("autoStart")) && QUnit.start()
      }
    })) : (blanket.options("existingRequireJS") && (requirejs.load = _blanket.utils.oldloader), blanket.noConflict().beforeStartTestRunner({
      condition: e,
      callback: function() {
        (!blanket.options("existingRequireJS") || !! blanket.options("autoStart")) && QUnit.start()
      },
      coverage: !1
    }))) : (QUnit.begin = function() {
      blanket.noConflict().setupCoverage()
    }, QUnit.done = function(e, t) {
      blanket.noConflict().onTestsDone()
    }, QUnit.moduleStart = function(e) {
      blanket.noConflict().onModuleStart()
    }, QUnit.testStart = function(e) {
      blanket.noConflict().onTestStart()
    }, QUnit.testDone = function(e) {
      blanket.noConflict().onTestDone(e.total, e.passed)
    }, blanket.beforeStartTestRunner({
      condition: e,
      callback: QUnit.start
    }))
  }
}();

/*
 * Thinbus Javascript Secure Remote Password (SRP)
 * Version  1.5.2
 * Copyright 2014-2015 Simon Massey
 * http://www.apache.org/licenses/LICENSE-2.0
 * ----------------------------------------------------------------------
 * "jsbn.js"
 * Copyright (c) 2003-2005  Tom Wu
 * All Rights Reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS-IS" AND WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS, IMPLIED OR OTHERWISE, INCLUDING WITHOUT LIMITATION, ANY
 * WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.
 *
 * IN NO EVENT SHALL TOM WU BE LIABLE FOR ANY SPECIAL, INCIDENTAL,
 * INDIRECT OR CONSEQUENTIAL DAMAGES OF ANY KIND, OR ANY DAMAGES WHATSOEVER
 * RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER OR NOT ADVISED OF
 * THE POSSIBILITY OF DAMAGE, AND ON ANY THEORY OF LIABILITY, ARISING OUT
 * OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * In addition, the following condition applies:
 *
 * All redistributions must retain an intact copy of this copyright notice
 * and disclaimer.
 * https://github.com/rubycon/isaac.js/blob/master/isaac.js
 * ----------------------------------------------------------------------
 * "isaac.js"
 * Copyright (c) 2012 Yves-Marie K. Rinquin
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * ----------------------------------------------------------------------
 *  CryptoJS v3.1.2
 *  code.google.com/p/crypto-js
 *  (c) 2009-2013 by Jeff Mott. All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * > Redistributions of source code must retain the above copyright notice,
 * this list of conditions, and the following disclaimer.
 * > Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions, and the following disclaimer in the documentation
 * or other materials provided with the distribution.
 * > Neither the name CryptoJS nor the names of its contributors may be used
 * to endorse or promote products derived from this software without specific
 * prior written permission.
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS,"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE,
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
 * THE POSSIBILITY OF SUCH DAMAGE.
 */

/* biginteger-min.js */
var dbits; var canary = 244837814094590; var j_lm = ((canary & 16777215) == 15715070); function BigInteger(e, d, f) { if (e != null) { if ("number" == typeof e) { this.fromNumber(e, d, f) } else { if (d == null && "string" != typeof e) { this.fromString(e, 256) } else { this.fromString(e, d) } } } } function nbi() { return new BigInteger(null) } function am1(f, a, b, e, h, g) { while (--g >= 0) { var d = a * this[f++] + b[e] + h; h = Math.floor(d / 67108864); b[e++] = d & 67108863 } return h } function am2(f, q, r, e, o, a) { var k = q & 32767, p = q >> 15; while (--a >= 0) { var d = this[f] & 32767; var g = this[f++] >> 15; var b = p * d + g * k; d = k * d + ((b & 32767) << 15) + r[e] + (o & 1073741823); o = (d >>> 30) + (b >>> 15) + p * g + (o >>> 30); r[e++] = d & 1073741823 } return o } function am3(f, q, r, e, o, a) { var k = q & 16383, p = q >> 14; while (--a >= 0) { var d = this[f] & 16383; var g = this[f++] >> 14; var b = p * d + g * k; d = k * d + ((b & 16383) << 14) + r[e] + o; o = (d >> 28) + (b >> 14) + p * g; r[e++] = d & 268435455 } return o } BigInteger.prototype.am = am3; dbits = 28; BigInteger.prototype.DB = dbits; BigInteger.prototype.DM = ((1 << dbits) - 1); BigInteger.prototype.DV = (1 << dbits); var BI_FP = 52; BigInteger.prototype.FV = Math.pow(2, BI_FP); BigInteger.prototype.F1 = BI_FP - dbits; BigInteger.prototype.F2 = 2 * dbits - BI_FP; var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz"; var BI_RC = new Array(); var rr, vv; rr = "0".charCodeAt(0); for (vv = 0; vv <= 9; ++vv) { BI_RC[rr++] = vv } rr = "a".charCodeAt(0); for (vv = 10; vv < 36; ++vv) { BI_RC[rr++] = vv } rr = "A".charCodeAt(0); for (vv = 10; vv < 36; ++vv) { BI_RC[rr++] = vv } function int2char(a) { return BI_RM.charAt(a) } function intAt(b, a) { var d = BI_RC[b.charCodeAt(a)]; return (d == null) ? -1 : d } function bnpCopyTo(b) { for (var a = this.t - 1; a >= 0; --a) { b[a] = this[a] } b.t = this.t; b.s = this.s } function bnpFromInt(a) { this.t = 1; this.s = (a < 0) ? -1 : 0; if (a > 0) { this[0] = a } else { if (a < -1) { this[0] = a + DV } else { this.t = 0 } } } function nbv(a) { var b = nbi(); b.fromInt(a); return b } function bnpFromString(h, c) { var e; if (c == 16) { e = 4 } else { if (c == 8) { e = 3 } else { if (c == 256) { e = 8 } else { if (c == 2) { e = 1 } else { if (c == 32) { e = 5 } else { if (c == 4) { e = 2 } else { this.fromRadix(h, c); return } } } } } } this.t = 0; this.s = 0; var g = h.length, d = false, f = 0; while (--g >= 0) { var a = (e == 8) ? h[g] & 255 : intAt(h, g); if (a < 0) { if (h.charAt(g) == "-") { d = true } continue } d = false; if (f == 0) { this[this.t++] = a } else { if (f + e > this.DB) { this[this.t - 1] |= (a & ((1 << (this.DB - f)) - 1)) << f; this[this.t++] = (a >> (this.DB - f)) } else { this[this.t - 1] |= a << f } } f += e; if (f >= this.DB) { f -= this.DB } } if (e == 8 && (h[0] & 128) != 0) { this.s = -1; if (f > 0) { this[this.t - 1] |= ((1 << (this.DB - f)) - 1) << f } } this.clamp(); if (d) { BigInteger.ZERO.subTo(this, this) } } function bnpClamp() { var a = this.s & this.DM; while (this.t > 0 && this[this.t - 1] == a) { --this.t } } function bnToString(c) { if (this.s < 0) { return "-" + this.negate().toString(c) } var e; if (c == 16) { e = 4 } else { if (c == 8) { e = 3 } else { if (c == 2) { e = 1 } else { if (c == 32) { e = 5 } else { if (c == 4) { e = 2 } else { return this.toRadix(c) } } } } } var g = (1 << e) - 1, l, a = false, h = "", f = this.t; var j = this.DB - (f * this.DB) % e; if (f-- > 0) { if (j < this.DB && (l = this[f] >> j) > 0) { a = true; h = int2char(l) } while (f >= 0) { if (j < e) { l = (this[f] & ((1 << j) - 1)) << (e - j); l |= this[--f] >> (j += this.DB - e) } else { l = (this[f] >> (j -= e)) & g; if (j <= 0) { j += this.DB; --f } } if (l > 0) { a = true } if (a) { h += int2char(l) } } } return a ? h : "0" } function bnNegate() { var a = nbi(); BigInteger.ZERO.subTo(this, a); return a } function bnAbs() { return (this.s < 0) ? this.negate() : this } function bnCompareTo(b) { var d = this.s - b.s; if (d != 0) { return d } var c = this.t; d = c - b.t; if (d != 0) { return d } while (--c >= 0) { if ((d = this[c] - b[c]) != 0) { return d } } return 0 } function nbits(a) { var c = 1, b; if ((b = a >>> 16) != 0) { a = b; c += 16 } if ((b = a >> 8) != 0) { a = b; c += 8 } if ((b = a >> 4) != 0) { a = b; c += 4 } if ((b = a >> 2) != 0) { a = b; c += 2 } if ((b = a >> 1) != 0) { a = b; c += 1 } return c } function bnBitLength() { if (this.t <= 0) { return 0 } return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ (this.s & this.DM)) } function bnpDLShiftTo(c, b) { var a; for (a = this.t - 1; a >= 0; --a) { b[a + c] = this[a] } for (a = c - 1; a >= 0; --a) { b[a] = 0 } b.t = this.t + c; b.s = this.s } function bnpDRShiftTo(c, b) { for (var a = c; a < this.t; ++a) { b[a - c] = this[a] } b.t = Math.max(this.t - c, 0); b.s = this.s } function bnpLShiftTo(j, e) { var b = j % this.DB; var a = this.DB - b; var g = (1 << a) - 1; var f = Math.floor(j / this.DB), h = (this.s << b) & this.DM, d; for (d = this.t - 1; d >= 0; --d) { e[d + f + 1] = (this[d] >> a) | h; h = (this[d] & g) << b } for (d = f - 1; d >= 0; --d) { e[d] = 0 } e[f] = h; e.t = this.t + f + 1; e.s = this.s; e.clamp() } function bnpRShiftTo(g, d) { d.s = this.s; var e = Math.floor(g / this.DB); if (e >= this.t) { d.t = 0; return } var b = g % this.DB; var a = this.DB - b; var f = (1 << b) - 1; d[0] = this[e] >> b; for (var c = e + 1; c < this.t; ++c) { d[c - e - 1] |= (this[c] & f) << a; d[c - e] = this[c] >> b } if (b > 0) { d[this.t - e - 1] |= (this.s & f) << a } d.t = this.t - e; d.clamp() } function bnpSubTo(d, f) { var e = 0, g = 0, b = Math.min(d.t, this.t); while (e < b) { g += this[e] - d[e]; f[e++] = g & this.DM; g >>= this.DB } if (d.t < this.t) { g -= d.s; while (e < this.t) { g += this[e]; f[e++] = g & this.DM; g >>= this.DB } g += this.s } else { g += this.s; while (e < d.t) { g -= d[e]; f[e++] = g & this.DM; g >>= this.DB } g -= d.s } f.s = (g < 0) ? -1 : 0; if (g < -1) { f[e++] = this.DV + g } else { if (g > 0) { f[e++] = g } } f.t = e; f.clamp() } function bnpMultiplyTo(c, e) { var b = this.abs(), f = c.abs(); var d = b.t; e.t = d + f.t; while (--d >= 0) { e[d] = 0 } for (d = 0; d < f.t; ++d) { e[d + b.t] = b.am(0, f[d], e, d, 0, b.t) } e.s = 0; e.clamp(); if (this.s != c.s) { BigInteger.ZERO.subTo(e, e) } } function bnpSquareTo(d) { var a = this.abs(); var b = d.t = 2 * a.t; while (--b >= 0) { d[b] = 0 } for (b = 0; b < a.t - 1; ++b) { var e = a.am(b, a[b], d, 2 * b, 0, 1); if ((d[b + a.t] += a.am(b + 1, 2 * a[b], d, 2 * b + 1, e, a.t - b - 1)) >= a.DV) { d[b + a.t] -= a.DV; d[b + a.t + 1] = 1 } } if (d.t > 0) { d[d.t - 1] += a.am(b, a[b], d, 2 * b, 0, 1) } d.s = 0; d.clamp() } function bnpDivRemTo(n, h, g) { var w = n.abs(); if (w.t <= 0) { return } var k = this.abs(); if (k.t < w.t) { if (h != null) { h.fromInt(0) } if (g != null) { this.copyTo(g) } return } if (g == null) { g = nbi() } var d = nbi(), a = this.s, l = n.s; var v = this.DB - nbits(w[w.t - 1]); if (v > 0) { w.lShiftTo(v, d); k.lShiftTo(v, g) } else { w.copyTo(d); k.copyTo(g) } var p = d.t; var b = d[p - 1]; if (b == 0) { return } var o = b * (1 << this.F1) + ((p > 1) ? d[p - 2] >> this.F2 : 0); var A = this.FV / o, z = (1 << this.F1) / o, x = 1 << this.F2; var u = g.t, s = u - p, f = (h == null) ? nbi() : h; d.dlShiftTo(s, f); if (g.compareTo(f) >= 0) { g[g.t++] = 1; g.subTo(f, g) } BigInteger.ONE.dlShiftTo(p, f); f.subTo(d, d); while (d.t < p) { d[d.t++] = 0 } while (--s >= 0) { var c = (g[--u] == b) ? this.DM : Math.floor(g[u] * A + (g[u - 1] + x) * z); if ((g[u] += d.am(0, c, g, s, 0, p)) < c) { d.dlShiftTo(s, f); g.subTo(f, g); while (g[u] < --c) { g.subTo(f, g) } } } if (h != null) { g.drShiftTo(p, h); if (a != l) { BigInteger.ZERO.subTo(h, h) } } g.t = p; g.clamp(); if (v > 0) { g.rShiftTo(v, g) } if (a < 0) { BigInteger.ZERO.subTo(g, g) } } function bnMod(b) { var c = nbi(); this.abs().divRemTo(b, null, c); if (this.s < 0 && c.compareTo(BigInteger.ZERO) > 0) { b.subTo(c, c) } return c } function Classic(a) { this.m = a } function cConvert(a) { if (a.s < 0 || a.compareTo(this.m) >= 0) { return a.mod(this.m) } else { return a } } function cRevert(a) { return a } function cReduce(a) { a.divRemTo(this.m, null, a) } function cMulTo(a, c, b) { a.multiplyTo(c, b); this.reduce(b) } function cSqrTo(a, b) { a.squareTo(b); this.reduce(b) } Classic.prototype.convert = cConvert; Classic.prototype.revert = cRevert; Classic.prototype.reduce = cReduce; Classic.prototype.mulTo = cMulTo; Classic.prototype.sqrTo = cSqrTo; function bnpInvDigit() { if (this.t < 1) { return 0 } var a = this[0]; if ((a & 1) == 0) { return 0 } var b = a & 3; b = (b * (2 - (a & 15) * b)) & 15; b = (b * (2 - (a & 255) * b)) & 255; b = (b * (2 - (((a & 65535) * b) & 65535))) & 65535; b = (b * (2 - a * b % this.DV)) % this.DV; return (b > 0) ? this.DV - b : -b } function Montgomery(a) { this.m = a; this.mp = a.invDigit(); this.mpl = this.mp & 32767; this.mph = this.mp >> 15; this.um = (1 << (a.DB - 15)) - 1; this.mt2 = 2 * a.t } function montConvert(a) { var b = nbi(); a.abs().dlShiftTo(this.m.t, b); b.divRemTo(this.m, null, b); if (a.s < 0 && b.compareTo(BigInteger.ZERO) > 0) { this.m.subTo(b, b) } return b } function montRevert(a) { var b = nbi(); a.copyTo(b); this.reduce(b); return b } function montReduce(a) { while (a.t <= this.mt2) { a[a.t++] = 0 } for (var c = 0; c < this.m.t; ++c) { var b = a[c] & 32767; var d = (b * this.mpl + (((b * this.mph + (a[c] >> 15) * this.mpl) & this.um) << 15)) & a.DM; b = c + this.m.t; a[b] += this.m.am(0, d, a, c, 0, this.m.t); while (a[b] >= a.DV) { a[b] -= a.DV; a[++b]++ } } a.clamp(); a.drShiftTo(this.m.t, a); if (a.compareTo(this.m) >= 0) { a.subTo(this.m, a) } } function montSqrTo(a, b) { a.squareTo(b); this.reduce(b) } function montMulTo(a, c, b) { a.multiplyTo(c, b); this.reduce(b) } Montgomery.prototype.convert = montConvert; Montgomery.prototype.revert = montRevert; Montgomery.prototype.reduce = montReduce; Montgomery.prototype.mulTo = montMulTo; Montgomery.prototype.sqrTo = montSqrTo; function bnpIsEven() { return ((this.t > 0) ? (this[0] & 1) : this.s) == 0 } function bnpExp(h, j) { if (h > 4294967295 || h < 1) { return BigInteger.ONE } var f = nbi(), a = nbi(), d = j.convert(this), c = nbits(h) - 1; d.copyTo(f); while (--c >= 0) { j.sqrTo(f, a); if ((h & (1 << c)) > 0) { j.mulTo(a, d, f) } else { var b = f; f = a; a = b } } return j.revert(f) } function bnModPowInt(b, a) { var c; if (b < 256 || a.isEven()) { c = new Classic(a) } else { c = new Montgomery(a) } return this.exp(b, c) } BigInteger.prototype.copyTo = bnpCopyTo; BigInteger.prototype.fromInt = bnpFromInt; BigInteger.prototype.fromString = bnpFromString; BigInteger.prototype.clamp = bnpClamp; BigInteger.prototype.dlShiftTo = bnpDLShiftTo; BigInteger.prototype.drShiftTo = bnpDRShiftTo; BigInteger.prototype.lShiftTo = bnpLShiftTo; BigInteger.prototype.rShiftTo = bnpRShiftTo; BigInteger.prototype.subTo = bnpSubTo; BigInteger.prototype.multiplyTo = bnpMultiplyTo; BigInteger.prototype.squareTo = bnpSquareTo; BigInteger.prototype.divRemTo = bnpDivRemTo; BigInteger.prototype.invDigit = bnpInvDigit; BigInteger.prototype.isEven = bnpIsEven; BigInteger.prototype.exp = bnpExp; BigInteger.prototype.toString = bnToString; BigInteger.prototype.negate = bnNegate; BigInteger.prototype.abs = bnAbs; BigInteger.prototype.compareTo = bnCompareTo; BigInteger.prototype.bitLength = bnBitLength; BigInteger.prototype.mod = bnMod; BigInteger.prototype.modPowInt = bnModPowInt; BigInteger.ZERO = nbv(0); BigInteger.ONE = nbv(1); function bnClone() { var a = nbi(); this.copyTo(a); return a } function bnIntValue() { if (this.s < 0) { if (this.t == 1) { return this[0] - this.DV } else { if (this.t == 0) { return -1 } } } else { if (this.t == 1) { return this[0] } else { if (this.t == 0) { return 0 } } } return ((this[1] & ((1 << (32 - this.DB)) - 1)) << this.DB) | this[0] } function bnByteValue() { return (this.t == 0) ? this.s : (this[0] << 24) >> 24 } function bnShortValue() { return (this.t == 0) ? this.s : (this[0] << 16) >> 16 } function bnpChunkSize(a) { return Math.floor(Math.LN2 * this.DB / Math.log(a)) } function bnSigNum() { if (this.s < 0) { return -1 } else { if (this.t <= 0 || (this.t == 1 && this[0] <= 0)) { return 0 } else { return 1 } } } function bnpToRadix(c) { if (c == null) { c = 10 } if (this.signum() == 0 || c < 2 || c > 36) { return "0" } var f = this.chunkSize(c); var e = Math.pow(c, f); var i = nbv(e), j = nbi(), h = nbi(), g = ""; this.divRemTo(i, j, h); while (j.signum() > 0) { g = (e + h.intValue()).toString(c).substr(1) + g; j.divRemTo(i, j, h) } return h.intValue().toString(c) + g } function bnpFromRadix(m, h) { this.fromInt(0); if (h == null) { h = 10 } var f = this.chunkSize(h); var g = Math.pow(h, f), e = false, a = 0, l = 0; for (var c = 0; c < m.length; ++c) { var k = intAt(m, c); if (k < 0) { if (m.charAt(c) == "-" && this.signum() == 0) { e = true } continue } l = h * l + k; if (++a >= f) { this.dMultiply(g); this.dAddOffset(l, 0); a = 0; l = 0 } } if (a > 0) { this.dMultiply(Math.pow(h, a)); this.dAddOffset(l, 0) } if (e) { BigInteger.ZERO.subTo(this, this) } } function bnpFromNumber(f, e, h) { if ("number" == typeof e) { if (f < 2) { this.fromInt(1) } else { this.fromNumber(f, h); if (!this.testBit(f - 1)) { this.bitwiseTo(BigInteger.ONE.shiftLeft(f - 1), op_or, this) } if (this.isEven()) { this.dAddOffset(1, 0) } while (!this.isProbablePrime(e)) { this.dAddOffset(2, 0); if (this.bitLength() > f) { this.subTo(BigInteger.ONE.shiftLeft(f - 1), this) } } } } else { var d = new Array(), g = f & 7; d.length = (f >> 3) + 1; e.nextBytes(d); if (g > 0) { d[0] &= ((1 << g) - 1) } else { d[0] = 0 } this.fromString(d, 256) } } function bnToByteArray() { var b = this.t, c = new Array(); c[0] = this.s; var e = this.DB - (b * this.DB) % 8, f, a = 0; if (b-- > 0) { if (e < this.DB && (f = this[b] >> e) != (this.s & this.DM) >> e) { c[a++] = f | (this.s << (this.DB - e)) } while (b >= 0) { if (e < 8) { f = (this[b] & ((1 << e) - 1)) << (8 - e); f |= this[--b] >> (e += this.DB - 8) } else { f = (this[b] >> (e -= 8)) & 255; if (e <= 0) { e += this.DB; --b } } if ((f & 128) != 0) { f |= -256 } if (a == 0 && (this.s & 128) != (f & 128)) { ++a } if (a > 0 || f != this.s) { c[a++] = f } } } return c } function bnEquals(b) { return (this.compareTo(b) == 0) } function bnMin(b) { return (this.compareTo(b) < 0) ? this : b } function bnMax(b) { return (this.compareTo(b) > 0) ? this : b } function bnpBitwiseTo(c, h, e) { var d, g, b = Math.min(c.t, this.t); for (d = 0; d < b; ++d) { e[d] = h(this[d], c[d]) } if (c.t < this.t) { g = c.s & this.DM; for (d = b; d < this.t; ++d) { e[d] = h(this[d], g) } e.t = this.t } else { g = this.s & this.DM; for (d = b; d < c.t; ++d) { e[d] = h(g, c[d]) } e.t = c.t } e.s = h(this.s, c.s); e.clamp() } function op_and(a, b) { return a & b } function bnAnd(b) { var c = nbi(); this.bitwiseTo(b, op_and, c); return c } function op_or(a, b) { return a | b } function bnOr(b) { var c = nbi(); this.bitwiseTo(b, op_or, c); return c } function op_xor(a, b) { return a ^ b } function bnXor(b) { var c = nbi(); this.bitwiseTo(b, op_xor, c); return c } function op_andnot(a, b) { return a & ~b } function bnAndNot(b) { var c = nbi(); this.bitwiseTo(b, op_andnot, c); return c } function bnNot() { var b = nbi(); for (var a = 0; a < this.t; ++a) { b[a] = this.DM & ~this[a] } b.t = this.t; b.s = ~this.s; return b } function bnShiftLeft(b) { var a = nbi(); if (b < 0) { this.rShiftTo(-b, a) } else { this.lShiftTo(b, a) } return a } function bnShiftRight(b) { var a = nbi(); if (b < 0) { this.lShiftTo(-b, a) } else { this.rShiftTo(b, a) } return a } function lbit(a) { if (a == 0) { return -1 } var b = 0; if ((a & 65535) == 0) { a >>= 16; b += 16 } if ((a & 255) == 0) { a >>= 8; b += 8 } if ((a & 15) == 0) { a >>= 4; b += 4 } if ((a & 3) == 0) { a >>= 2; b += 2 } if ((a & 1) == 0) { ++b } return b } function bnGetLowestSetBit() { for (var a = 0; a < this.t; ++a) { if (this[a] != 0) { return a * this.DB + lbit(this[a]) } } if (this.s < 0) { return this.t * this.DB } return -1 } function cbit(a) { var b = 0; while (a != 0) { a &= a - 1; ++b } return b } function bnBitCount() { var c = 0, a = this.s & this.DM; for (var b = 0; b < this.t; ++b) { c += cbit(this[b] ^ a) } return c } function bnTestBit(b) { var a = Math.floor(b / this.DB); if (a >= this.t) { return (this.s != 0) } return ((this[a] & (1 << (b % this.DB))) != 0) } function bnpChangeBit(c, b) { var a = BigInteger.ONE.shiftLeft(c); this.bitwiseTo(a, b, a); return a } function bnSetBit(a) { return this.changeBit(a, op_or) } function bnClearBit(a) { return this.changeBit(a, op_andnot) } function bnFlipBit(a) { return this.changeBit(a, op_xor) } function bnpAddTo(d, f) { var e = 0, g = 0, b = Math.min(d.t, this.t); while (e < b) { g += this[e] + d[e]; f[e++] = g & this.DM; g >>= this.DB } if (d.t < this.t) { g += d.s; while (e < this.t) { g += this[e]; f[e++] = g & this.DM; g >>= this.DB } g += this.s } else { g += this.s; while (e < d.t) { g += d[e]; f[e++] = g & this.DM; g >>= this.DB } g += d.s } f.s = (g < 0) ? -1 : 0; if (g > 0) { f[e++] = g } else { if (g < -1) { f[e++] = this.DV + g } } f.t = e; f.clamp() } function bnAdd(b) { var c = nbi(); this.addTo(b, c); return c } function bnSubtract(b) { var c = nbi(); this.subTo(b, c); return c } function bnMultiply(b) { var c = nbi(); this.multiplyTo(b, c); return c } function bnDivide(b) { var c = nbi(); this.divRemTo(b, c, null); return c } function bnRemainder(b) { var c = nbi(); this.divRemTo(b, null, c); return c } function bnDivideAndRemainder(b) { var d = nbi(), c = nbi(); this.divRemTo(b, d, c); return new Array(d, c) } function bnpDMultiply(a) { this[this.t] = this.am(0, a - 1, this, 0, 0, this.t); ++this.t; this.clamp() } function bnpDAddOffset(b, a) { while (this.t <= a) { this[this.t++] = 0 } this[a] += b; while (this[a] >= this.DV) { this[a] -= this.DV; if (++a >= this.t) { this[this.t++] = 0 } ++this[a] } } function NullExp() { } function nNop(a) { return a } function nMulTo(a, c, b) { a.multiplyTo(c, b) } function nSqrTo(a, b) { a.squareTo(b) } NullExp.prototype.convert = nNop; NullExp.prototype.revert = nNop; NullExp.prototype.mulTo = nMulTo; NullExp.prototype.sqrTo = nSqrTo; function bnPow(a) { return this.exp(a, new NullExp()) } function bnpMultiplyLowerTo(b, f, e) { var d = Math.min(this.t + b.t, f); e.s = 0; e.t = d; while (d > 0) { e[--d] = 0 } var c; for (c = e.t - this.t; d < c; ++d) { e[d + this.t] = this.am(0, b[d], e, d, 0, this.t) } for (c = Math.min(b.t, f); d < c; ++d) { this.am(0, b[d], e, d, 0, f - d) } e.clamp() } function bnpMultiplyUpperTo(b, e, d) { --e; var c = d.t = this.t + b.t - e; d.s = 0; while (--c >= 0) { d[c] = 0 } for (c = Math.max(e - this.t, 0); c < b.t; ++c) { d[this.t + c - e] = this.am(e - c, b[c], d, 0, 0, this.t + c - e) } d.clamp(); d.drShiftTo(1, d) } function Barrett(a) { this.r2 = nbi(); this.q3 = nbi(); BigInteger.ONE.dlShiftTo(2 * a.t, this.r2); this.mu = this.r2.divide(a); this.m = a } function barrettConvert(a) { if (a.s < 0 || a.t > 2 * this.m.t) { return a.mod(this.m) } else { if (a.compareTo(this.m) < 0) { return a } else { var b = nbi(); a.copyTo(b); this.reduce(b); return b } } } function barrettRevert(a) { return a } function barrettReduce(a) { a.drShiftTo(this.m.t - 1, this.r2); if (a.t > this.m.t + 1) { a.t = this.m.t + 1; a.clamp() } this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3); this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); while (a.compareTo(this.r2) < 0) { a.dAddOffset(1, this.m.t + 1) } a.subTo(this.r2, a); while (a.compareTo(this.m) >= 0) { a.subTo(this.m, a) } } function barrettSqrTo(a, b) { a.squareTo(b); this.reduce(b) } function barrettMulTo(a, c, b) { a.multiplyTo(c, b); this.reduce(b) } Barrett.prototype.convert = barrettConvert; Barrett.prototype.revert = barrettRevert; Barrett.prototype.reduce = barrettReduce; Barrett.prototype.mulTo = barrettMulTo; Barrett.prototype.sqrTo = barrettSqrTo; function bnModPow(q, f) { var o = q.bitLength(), h, b = nbv(1), v; if (o <= 0) { return b } else { if (o < 18) { h = 1 } else { if (o < 48) { h = 3 } else { if (o < 144) { h = 4 } else { if (o < 768) { h = 5 } else { h = 6 } } } } } if (o < 8) { v = new Classic(f) } else { if (f.isEven()) { v = new Barrett(f) } else { v = new Montgomery(f) } } var p = new Array(), d = 3, s = h - 1, a = (1 << h) - 1; p[1] = v.convert(this); if (h > 1) { var A = nbi(); v.sqrTo(p[1], A); while (d <= a) { p[d] = nbi(); v.mulTo(A, p[d - 2], p[d]); d += 2 } } var l = q.t - 1, x, u = true, c = nbi(), y; o = nbits(q[l]) - 1; while (l >= 0) { if (o >= s) { x = (q[l] >> (o - s)) & a } else { x = (q[l] & ((1 << (o + 1)) - 1)) << (s - o); if (l > 0) { x |= q[l - 1] >> (this.DB + o - s) } } d = h; while ((x & 1) == 0) { x >>= 1; --d } if ((o -= d) < 0) { o += this.DB; --l } if (u) { p[x].copyTo(b); u = false } else { while (d > 1) { v.sqrTo(b, c); v.sqrTo(c, b); d -= 2 } if (d > 0) { v.sqrTo(b, c) } else { y = b; b = c; c = y } v.mulTo(c, p[x], b) } while (l >= 0 && (q[l] & (1 << o)) == 0) { v.sqrTo(b, c); y = b; b = c; c = y; if (--o < 0) { o = this.DB - 1; --l } } } return v.revert(b) } function bnGCD(c) { var b = (this.s < 0) ? this.negate() : this.clone(); var h = (c.s < 0) ? c.negate() : c.clone(); if (b.compareTo(h) < 0) { var e = b; b = h; h = e } var d = b.getLowestSetBit(), f = h.getLowestSetBit(); if (f < 0) { return b } if (d < f) { f = d } if (f > 0) { b.rShiftTo(f, b); h.rShiftTo(f, h) } while (b.signum() > 0) { if ((d = b.getLowestSetBit()) > 0) { b.rShiftTo(d, b) } if ((d = h.getLowestSetBit()) > 0) { h.rShiftTo(d, h) } if (b.compareTo(h) >= 0) { b.subTo(h, b); b.rShiftTo(1, b) } else { h.subTo(b, h); h.rShiftTo(1, h) } } if (f > 0) { h.lShiftTo(f, h) } return h } function bnpModInt(e) { if (e <= 0) { return 0 } var c = this.DV % e, b = (this.s < 0) ? e - 1 : 0; if (this.t > 0) { if (c == 0) { b = this[0] % e } else { for (var a = this.t - 1; a >= 0; --a) { b = (c * b + this[a]) % e } } } return b } function bnModInverse(f) { var j = f.isEven(); if ((this.isEven() && j) || f.signum() == 0) { return BigInteger.ZERO } var i = f.clone(), h = this.clone(); var g = nbv(1), e = nbv(0), l = nbv(0), k = nbv(1); while (i.signum() != 0) { while (i.isEven()) { i.rShiftTo(1, i); if (j) { if (!g.isEven() || !e.isEven()) { g.addTo(this, g); e.subTo(f, e) } g.rShiftTo(1, g) } else { if (!e.isEven()) { e.subTo(f, e) } } e.rShiftTo(1, e) } while (h.isEven()) { h.rShiftTo(1, h); if (j) { if (!l.isEven() || !k.isEven()) { l.addTo(this, l); k.subTo(f, k) } l.rShiftTo(1, l) } else { if (!k.isEven()) { k.subTo(f, k) } } k.rShiftTo(1, k) } if (i.compareTo(h) >= 0) { i.subTo(h, i); if (j) { g.subTo(l, g) } e.subTo(k, e) } else { h.subTo(i, h); if (j) { l.subTo(g, l) } k.subTo(e, k) } } if (h.compareTo(BigInteger.ONE) != 0) { return BigInteger.ZERO } if (k.compareTo(f) >= 0) { return k.subtract(f) } if (k.signum() < 0) { k.addTo(f, k) } else { return k } if (k.signum() < 0) { return k.add(f) } else { return k } } var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509]; var lplim = (1 << 26) / lowprimes[lowprimes.length - 1]; function bnIsProbablePrime(e) { var d, b = this.abs(); if (b.t == 1 && b[0] <= lowprimes[lowprimes.length - 1]) { for (d = 0; d < lowprimes.length; ++d) { if (b[0] == lowprimes[d]) { return true } } return false } if (b.isEven()) { return false } d = 1; while (d < lowprimes.length) { var a = lowprimes[d], c = d + 1; while (c < lowprimes.length && a < lplim) { a *= lowprimes[c++] } a = b.modInt(a); while (d < c) { if (a % lowprimes[d++] == 0) { return false } } } return b.millerRabin(e) } function bnpMillerRabin(f) { var g = this.subtract(BigInteger.ONE); var c = g.getLowestSetBit(); if (c <= 0) { return false } var h = g.shiftRight(c); f = (f + 1) >> 1; if (f > lowprimes.length) { f = lowprimes.length } var b = nbi(); for (var e = 0; e < f; ++e) { b.fromInt(lowprimes[e]); var l = b.modPow(h, this); if (l.compareTo(BigInteger.ONE) != 0 && l.compareTo(g) != 0) { var d = 1; while (d++ < c && l.compareTo(g) != 0) { l = l.modPowInt(2, this); if (l.compareTo(BigInteger.ONE) == 0) { return false } } if (l.compareTo(g) != 0) { return false } } } return true } BigInteger.prototype.chunkSize = bnpChunkSize; BigInteger.prototype.toRadix = bnpToRadix; BigInteger.prototype.fromRadix = bnpFromRadix; BigInteger.prototype.fromNumber = bnpFromNumber; BigInteger.prototype.bitwiseTo = bnpBitwiseTo; BigInteger.prototype.changeBit = bnpChangeBit; BigInteger.prototype.addTo = bnpAddTo; BigInteger.prototype.dMultiply = bnpDMultiply; BigInteger.prototype.dAddOffset = bnpDAddOffset; BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo; BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo; BigInteger.prototype.modInt = bnpModInt; BigInteger.prototype.millerRabin = bnpMillerRabin; BigInteger.prototype.clone = bnClone; BigInteger.prototype.intValue = bnIntValue; BigInteger.prototype.byteValue = bnByteValue; BigInteger.prototype.shortValue = bnShortValue; BigInteger.prototype.signum = bnSigNum; BigInteger.prototype.toByteArray = bnToByteArray; BigInteger.prototype.equals = bnEquals; BigInteger.prototype.min = bnMin; BigInteger.prototype.max = bnMax; BigInteger.prototype.and = bnAnd; BigInteger.prototype.or = bnOr; BigInteger.prototype.xor = bnXor; BigInteger.prototype.andNot = bnAndNot; BigInteger.prototype.not = bnNot; BigInteger.prototype.shiftLeft = bnShiftLeft; BigInteger.prototype.shiftRight = bnShiftRight; BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit; BigInteger.prototype.bitCount = bnBitCount; BigInteger.prototype.testBit = bnTestBit; BigInteger.prototype.setBit = bnSetBit; BigInteger.prototype.clearBit = bnClearBit; BigInteger.prototype.flipBit = bnFlipBit; BigInteger.prototype.add = bnAdd; BigInteger.prototype.subtract = bnSubtract; BigInteger.prototype.multiply = bnMultiply; BigInteger.prototype.divide = bnDivide; BigInteger.prototype.remainder = bnRemainder; BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder; BigInteger.prototype.modPow = bnModPow; BigInteger.prototype.modInverse = bnModInverse; BigInteger.prototype.pow = bnPow; BigInteger.prototype.gcd = bnGCD; BigInteger.prototype.isProbablePrime = bnIsProbablePrime;

/* isaac-min.js */
String.prototype.toIntArray = function () { var c, a, d, h = [], g = [], e = 0; var f = this + "\0\0\0"; var b = f.length - 1; while (e < b) { c = f.charCodeAt(e++); a = f.charCodeAt(e + 1); if (c < 128) { h.push(c) } else { if (c < 2048) { h.push(((c >>> 6) & 31) | 192); h.push(((c >>> 0) & 63) | 128) } else { if ((c & 63488) != 55296) { h.push(((c >>> 12) & 15) | 224); h.push(((c >>> 6) & 63) | 128); h.push(((c >>> 0) & 63) | 128) } else { if (((c & 64512) == 55296) && ((a & 64512) == 56320)) { d = ((a & 63) | ((c & 63) << 10)) + 65536; h.push(((d >>> 18) & 7) | 240); h.push(((d >>> 12) & 63) | 128); h.push(((d >>> 6) & 63) | 128); h.push(((d >>> 0) & 63) | 128); e++ } else { } } } } if (h.length > 3) { g.push((h.shift() << 0) | (h.shift() << 8) | (h.shift() << 16) | (h.shift() << 24)) } } return g }; var isaac = (function () { var d = Array(256), e = 0, i = 0, c = 0, a = Array(256), b = 0; f(Math.random() * 4294967295); function l(m, p) { var o = (m & 65535) + (p & 65535); var n = (m >>> 16) + (p >>> 16) + (o >>> 16); return (n << 16) | (o & 65535) } function h() { e = i = c = 0; for (var m = 0; m < 256; ++m) { d[m] = a[m] = 0 } b = 0 } function f(x) { var w, v, u, t, r, p, o, n, m; w = v = u = t = r = p = o = n = 2654435769; if (x && typeof (x) === "string") { x = x.toIntArray() } if (x && typeof (x) === "number") { x = [x] } if (x instanceof Array) { h(); for (m = 0; m < x.length; m++) { a[m & 255] += (typeof (x[m]) === "number") ? x[m] : 0 } } function q() { w ^= v << 11; t = l(t, w); v = l(v, u); v ^= u >>> 2; r = l(r, v); u = l(u, t); u ^= t << 8; p = l(p, u); t = l(t, r); t ^= r >>> 16; o = l(o, t); r = l(r, p); r ^= p << 10; n = l(n, r); p = l(p, o); p ^= o >>> 4; w = l(w, p); o = l(o, n); o ^= n << 8; v = l(v, o); n = l(n, w); n ^= w >>> 9; u = l(u, n); w = l(w, v) } for (m = 0; m < 4; m++) { q() } for (m = 0; m < 256; m += 8) { if (x) { w = l(w, a[m + 0]); v = l(v, a[m + 1]); u = l(u, a[m + 2]); t = l(t, a[m + 3]); r = l(r, a[m + 4]); p = l(p, a[m + 5]); o = l(o, a[m + 6]); n = l(n, a[m + 7]) } q(); d[m + 0] = w; d[m + 1] = v; d[m + 2] = u; d[m + 3] = t; d[m + 4] = r; d[m + 5] = p; d[m + 6] = o; d[m + 7] = n } if (x) { for (m = 0; m < 256; m += 8) { w = l(w, d[m + 0]); v = l(v, d[m + 1]); u = l(u, d[m + 2]); t = l(t, d[m + 3]); r = l(r, d[m + 4]); p = l(p, d[m + 5]); o = l(o, d[m + 6]); n = l(n, d[m + 7]); q(); d[m + 0] = w; d[m + 1] = v; d[m + 2] = u; d[m + 3] = t; d[m + 4] = r; d[m + 5] = p; d[m + 6] = o; d[m + 7] = n } } k(); b = 256 } function k(q) { var o, m, p; q = (q && typeof (q) === "number") ? Math.abs(Math.floor(q)) : 1; while (q--) { c = l(c, 1); i = l(i, c); for (o = 0; o < 256; o++) { switch (o & 3) { case 0: e ^= e << 13; break; case 1: e ^= e >>> 6; break; case 2: e ^= e << 2; break; case 3: e ^= e >>> 16; break }e = l(d[(o + 128) & 255], e); m = d[o]; d[o] = p = l(d[(m >>> 2) & 255], l(e, i)); a[o] = i = l(d[(p >>> 10) & 255], m) } } } function j() { if (!b--) { k(); b = 255 } return a[b] } function g() { return { a: e, b: i, c: c, m: d, r: a } } return { reset: h, seed: f, prng: k, rand: j, internals: g } })(); isaac.random = function () { return 0.5 + this.rand() * 2.3283064365386963e-10 };

/* random-min.js */
var random16byteHex = (function () { function c() { if (typeof (window) != "undefined" && window.crypto && window.crypto.getRandomValues) { return true } else { if (typeof (window) != "undefined" && window.msCrypto && window.msCrypto.getRandomValues) { return true } else { return false } } } var e = c(); function b() { if (e) { return false } var i = +(new Date()) + ":" + Math.random(); if (typeof (window) != "undefined" && window.cookie) { i += document.cookie } var g = CryptoJS.SHA256 || CryptoJS.SHA1; isaac.seed(g(i)); return true } var a = b(); function d() { var j = 4; var n; if (e) { var m = window.crypto || window.msCrypto; n = new Int32Array(j); m.getRandomValues(n) } else { var h = +(new Date()); var l = h % 50; isaac.prng(1 + l); n = new Array(); for (var k = 0; k < j; k++) { n.push(isaac.rand()) } } var g = ""; for (var k = 0; k < j; k++) { var o = n[k]; if (o < 0) { o = -1 * o } g = g + o.toString(16) } return g } function f(i) { if (!e) { var k = +(new Date()); var g = k + i; var h = +(new Date()); while (h < g) { var j = h % 5; isaac.prng(1 + j); h = +(new Date()) } } } return { random: d, isWebCryptoAPI: e, advance: f } })(); var random16byteHexAdvance = 100; if (typeof test_random16byteHexAdvance != "undefined") { random16byteHexAdvance = test_random16byteHexAdvance } random16byteHex.advance(random16byteHexAdvance);

/* thinbus-srp6client-min.js */
function SRP6JavascriptClientSession() { this.INIT = 0; this.STEP_1 = 1; this.STEP_2 = 2; this.STEP_3 = 3; this.state = this.INIT; this.x = null; this.v = null; this.I = null; this.P = null; this.salt = null; this.B = null; this.A = null; this.a = null; this.k = null; this.u = null; this.S = null; this.K = null; this.M1str = null; this.check = function (a, b) { if (typeof a === "undefined" || a === null || a === "" || a === "0") { throw new Error(b + " must not be null, empty or zero") } }; this.generateX = function (c, a, b) { this.check(c, "salt"); this.check(a, "identity"); this.check(b, "password"); this.salt = c; var f = this.H(a + ":" + b); while (f.substring(0, 1) === "0") { f = f.substring(1) } var e = (c + f).toUpperCase(); var d = this.H(e); while (d.substring(0, 1) === "0") { d = d.substring(1) } this.x = this.fromHex(d).mod(this.N()); return this.x }; this.computeSessionKey = function (d, b, e, c, h) { this.check(d, "k"); this.check(b, "x"); this.check(e, "u"); this.check(c, "a"); this.check(h, "B"); var g = e.multiply(b).add(c); var f = this.g().modPow(b, this.N()).multiply(d); return h.subtract(f).modPow(g, this.N()) } } SRP6JavascriptClientSession.prototype.toHex = function (a) { return a.toString(16) }; SRP6JavascriptClientSession.prototype.fromHex = function (a) { return new BigInteger("" + a, 16) }; SRP6JavascriptClientSession.prototype.BigInteger = function (a, b) { return new BigInteger("" + a, b) }; SRP6JavascriptClientSession.prototype.getState = function () { return this.state }; SRP6JavascriptClientSession.prototype.getSessionKey = function (a) { if (this.S === null) { return null } this.SS = this.toHex(this.S); if (typeof a !== "undefined" && a === false) { return this.SS } else { if (this.K === null) { this.K = this.H(this.SS) } return this.K } }; SRP6JavascriptClientSession.prototype.getUserID = function () { return this.I }; SRP6JavascriptClientSession.prototype.generateRandomSalt = function (a) { var c = null; c = random16byteHex.random(); var b = this.H((new Date()) + ":" + a + ":" + c); return b }; SRP6JavascriptClientSession.prototype.generateVerifier = function (d, b, c) { var a = this.generateX(d, b, c); this.v = this.g().modPow(a, this.N()); return this.toHex(this.v) }; SRP6JavascriptClientSession.prototype.step1 = function (a, b) { this.check(a, "identity"); this.check(b, "password"); this.I = a; this.P = b; if (this.state !== this.INIT) { throw new Error("IllegalStateException not in state INIT") } this.state = this.STEP_1 }; SRP6JavascriptClientSession.prototype.computeU = function (a, d) { this.check(a, "Astr"); this.check(d, "Bstr"); var b = this.H(a + d); var c = new BigInteger("" + b, 16); if (BigInteger.ZERO.equals(c)) { throw new Error("SRP6Exception bad shared public value 'u' as u==0") } return c }; SRP6JavascriptClientSession.prototype.random16byteHex = function () { var a = null; a = random16byteHex.random(); return a }; SRP6JavascriptClientSession.prototype.randomA = function (f) { var c = this.toHex(f).length; var a = this.BigInteger("0", 10); var b = this.BigInteger("1", 10); var d = a; while (a.equals(d)) { var e = this.random16byteHex() + this.random16byteHex(); while (e.length < c) { e = e + this.random16byteHex() } var h = this.BigInteger(e, 16); var g = this.BigInteger(this.H(this.I + ":" + this.salt + ":" + (new Date()).getTime()), 16); d = (g.add(h)).modPow(b, f) } return d }; SRP6JavascriptClientSession.prototype.step2 = function (c, e) { this.check(c, "s"); this.check(e, "BB"); if (this.state !== this.STEP_1) { throw new Error("IllegalStateException not in state STEP_1") } this.B = this.fromHex(e); var b = null; b = BigInteger.ZERO; if (this.B.mod(this.N()).equals(b)) { throw new Error("SRP6Exception bad server public value 'B' as B == 0 (mod N)") } var a = this.generateX(c, this.I, this.P); this.P = null; this.a = this.randomA(this.N); this.A = this.g().modPow(this.a, this.N()); this.check(this.A, "A"); this.u = this.computeU(this.A.toString(16), e); this.S = this.computeSessionKey(this.k, a, this.u, this.a, this.B); this.check(this.S, "S"); var d = this.toHex(this.A); this.M1str = this.H(d + e + this.toHex(this.S)); this.check(this.M1str, "M1str"); while (this.M1str.substring(0, 1) === "0") { this.M1str = this.M1str.substring(1) } this.state = this.STEP_2; return { A: d, M1: this.M1str } }; SRP6JavascriptClientSession.prototype.step3 = function (a) { this.check(a); if (this.state !== this.STEP_2) { throw new Error("IllegalStateException State violation: Session must be in STEP_2 state") } var b = this.H(this.toHex(this.A) + this.M1str + this.toHex(this.S)); while (b.substring(0, 1) === "0") { b = b.substring(1) } if ("" + b !== "" + a) { throw new Error("SRP6Exception Bad server credentials") } this.state = this.STEP_3; return true };

/* CryptoJS core */
var CryptoJS = CryptoJS || function (h, r) {
	var k = {}, l = k.lib = {}, n = function () { }, f = l.Base = { extend: function (a) { n.prototype = this; var b = new n; a && b.mixIn(a); b.hasOwnProperty("init") || (b.init = function () { b.$super.init.apply(this, arguments) }); b.init.prototype = b; b.$super = this; return b }, create: function () { var a = this.extend(); a.init.apply(a, arguments); return a }, init: function () { }, mixIn: function (a) { for (var b in a) a.hasOwnProperty(b) && (this[b] = a[b]); a.hasOwnProperty("toString") && (this.toString = a.toString) }, clone: function () { return this.init.prototype.extend(this) } },
	j = l.WordArray = f.extend({
		init: function (a, b) { a = this.words = a || []; this.sigBytes = b != r ? b : 4 * a.length }, toString: function (a) { return (a || s).stringify(this) }, concat: function (a) { var b = this.words, d = a.words, c = this.sigBytes; a = a.sigBytes; this.clamp(); if (c % 4) for (var e = 0; e < a; e++)b[c + e >>> 2] |= (d[e >>> 2] >>> 24 - 8 * (e % 4) & 255) << 24 - 8 * ((c + e) % 4); else if (65535 < d.length) for (e = 0; e < a; e += 4)b[c + e >>> 2] = d[e >>> 2]; else b.push.apply(b, d); this.sigBytes += a; return this }, clamp: function () {
			var a = this.words, b = this.sigBytes; a[b >>> 2] &= 4294967295 <<
				32 - 8 * (b % 4); a.length = h.ceil(b / 4)
		}, clone: function () { var a = f.clone.call(this); a.words = this.words.slice(0); return a }, random: function (a) { for (var b = [], d = 0; d < a; d += 4)b.push(4294967296 * h.random() | 0); return new j.init(b, a) }
	}), m = k.enc = {}, s = m.Hex = {
		stringify: function (a) { var b = a.words; a = a.sigBytes; for (var d = [], c = 0; c < a; c++) { var e = b[c >>> 2] >>> 24 - 8 * (c % 4) & 255; d.push((e >>> 4).toString(16)); d.push((e & 15).toString(16)) } return d.join("") }, parse: function (a) {
			for (var b = a.length, d = [], c = 0; c < b; c += 2)d[c >>> 3] |= parseInt(a.substr(c,
				2), 16) << 24 - 4 * (c % 8); return new j.init(d, b / 2)
		}
	}, p = m.Latin1 = { stringify: function (a) { var b = a.words; a = a.sigBytes; for (var d = [], c = 0; c < a; c++)d.push(String.fromCharCode(b[c >>> 2] >>> 24 - 8 * (c % 4) & 255)); return d.join("") }, parse: function (a) { for (var b = a.length, d = [], c = 0; c < b; c++)d[c >>> 2] |= (a.charCodeAt(c) & 255) << 24 - 8 * (c % 4); return new j.init(d, b) } }, t = m.Utf8 = { stringify: function (a) { try { return decodeURIComponent(escape(p.stringify(a))) } catch (b) { throw Error("Malformed UTF-8 data"); } }, parse: function (a) { return p.parse(unescape(encodeURIComponent(a))) } },
	q = l.BufferedBlockAlgorithm = f.extend({
		reset: function () { this._data = new j.init; this._nDataBytes = 0 }, _append: function (a) { "string" == typeof a && (a = t.parse(a)); this._data.concat(a); this._nDataBytes += a.sigBytes }, _process: function (a) { var b = this._data, d = b.words, c = b.sigBytes, e = this.blockSize, f = c / (4 * e), f = a ? h.ceil(f) : h.max((f | 0) - this._minBufferSize, 0); a = f * e; c = h.min(4 * a, c); if (a) { for (var g = 0; g < a; g += e)this._doProcessBlock(d, g); g = d.splice(0, a); b.sigBytes -= c } return new j.init(g, c) }, clone: function () {
			var a = f.clone.call(this);
			a._data = this._data.clone(); return a
		}, _minBufferSize: 0
	}); l.Hasher = q.extend({
		cfg: f.extend(), init: function (a) { this.cfg = this.cfg.extend(a); this.reset() }, reset: function () { q.reset.call(this); this._doReset() }, update: function (a) { this._append(a); this._process(); return this }, finalize: function (a) { a && this._append(a); return this._doFinalize() }, blockSize: 16, _createHelper: function (a) { return function (b, d) { return (new a.init(d)).finalize(b) } }, _createHmacHelper: function (a) {
			return function (b, d) {
				return (new u.HMAC.init(a,
					d)).finalize(b)
			}
		}
	}); var u = k.algo = {}; return k
}(Math);

/* sha256-min.js */
(function (k) {
	for (var g = CryptoJS, h = g.lib, v = h.WordArray, j = h.Hasher, h = g.algo, s = [], t = [], u = function (q) { return 4294967296 * (q - (q | 0)) | 0 }, l = 2, b = 0; 64 > b;) { var d; a: { d = l; for (var w = k.sqrt(d), r = 2; r <= w; r++)if (!(d % r)) { d = !1; break a } d = !0 } d && (8 > b && (s[b] = u(k.pow(l, 0.5))), t[b] = u(k.pow(l, 1 / 3)), b++); l++ } var n = [], h = h.SHA256 = j.extend({
		_doReset: function () { this._hash = new v.init(s.slice(0)) }, _doProcessBlock: function (q, h) {
			for (var a = this._hash.words, c = a[0], d = a[1], b = a[2], k = a[3], f = a[4], g = a[5], j = a[6], l = a[7], e = 0; 64 > e; e++) {
				if (16 > e) n[e] =
					q[h + e] | 0; else { var m = n[e - 15], p = n[e - 2]; n[e] = ((m << 25 | m >>> 7) ^ (m << 14 | m >>> 18) ^ m >>> 3) + n[e - 7] + ((p << 15 | p >>> 17) ^ (p << 13 | p >>> 19) ^ p >>> 10) + n[e - 16] } m = l + ((f << 26 | f >>> 6) ^ (f << 21 | f >>> 11) ^ (f << 7 | f >>> 25)) + (f & g ^ ~f & j) + t[e] + n[e]; p = ((c << 30 | c >>> 2) ^ (c << 19 | c >>> 13) ^ (c << 10 | c >>> 22)) + (c & d ^ c & b ^ d & b); l = j; j = g; g = f; f = k + m | 0; k = b; b = d; d = c; c = m + p | 0
			} a[0] = a[0] + c | 0; a[1] = a[1] + d | 0; a[2] = a[2] + b | 0; a[3] = a[3] + k | 0; a[4] = a[4] + f | 0; a[5] = a[5] + g | 0; a[6] = a[6] + j | 0; a[7] = a[7] + l | 0
		}, _doFinalize: function () {
			var d = this._data, b = d.words, a = 8 * this._nDataBytes, c = 8 * d.sigBytes;
			b[c >>> 5] |= 128 << 24 - c % 32; b[(c + 64 >>> 9 << 4) + 14] = k.floor(a / 4294967296); b[(c + 64 >>> 9 << 4) + 15] = a; d.sigBytes = 4 * b.length; this._process(); return this._hash
		}, clone: function () { var b = j.clone.call(this); b._hash = this._hash.clone(); return b }
	}); g.SHA256 = j._createHelper(h); g.HmacSHA256 = j._createHmacHelper(h)
})(Math);

/**
This is the recommended class as it uses the strong hash which 
comes with JDK8 by default. 

You must include config which defines your safe prime constant such as SRP6CryptoParams.N_base10 before loading this file e.g.: 

var SRP6CryptoParams= {
    N_base10: "2176617...
    g_base10: "2",
    k_base16: "5b9e8ef...
}

On a Java server use the matching java class: 

	com.nimbusds.srp6.js.SRP6JavascriptServerSessionSHA256 
*/
function SRP6JavascriptClientSessionSHA256() { }

SRP6JavascriptClientSessionSHA256.prototype = new SRP6JavascriptClientSession();

SRP6JavascriptClientSessionSHA256.prototype.N = function () {
	return new BigInteger(SRP6CryptoParams.N_base10, 10);
}

SRP6JavascriptClientSessionSHA256.prototype.g = function () {
	return new BigInteger(SRP6CryptoParams.g_base10, 10);
}

SRP6JavascriptClientSessionSHA256.prototype.k = new BigInteger(SRP6CryptoParams.k_base16, 16);

SRP6JavascriptClientSessionSHA256.prototype.H = function (x) {
	var wordArray = CryptoJS.enc.Hex.parse(x);
	return CryptoJS.SHA256(wordArray).toString().toLowerCase();
}

SRP6JavascriptClientSessionSHA256.prototype.padding = function (hex, len) {
	return "0".repeat(len - hex.length) + hex;
}

/**
 * Records the identity 'I' and password 'P' of the authenticating user.
 * The session is incremented to {@link State#STEP_1}.
 * <p>Argument origin:
 * <ul>
 *     <li>From user: user identity 'I' and password 'P'.
 * </ul>
 * @param userID   The identity 'I' of the authenticating user, UTF-8
 *                 encoded. Must not be {@code null} or empty.
 * @param password The user password 'P', UTF-8 encoded. Must not be
 *                 {@code null}.
 * @throws IllegalStateException If the method is invoked in a state
 *                               other than {@link State#INIT}.
 */
SRP6JavascriptClientSession.prototype.step1 = function (identity, password) {
	"use strict";

	this.check(identity, "identity");
	this.check(password, "password");

	this.I = identity;
	this.P = password;

	if (this.state !== this.INIT) {
		throw new Error("IllegalStateException not in state INIT");
	}
	this.a = this.randomA(this.N);

	this.A = this.g().modPow(this.a, this.N());
	this.check(this.A, "A");

	this.state = this.STEP_1;

	return this.toHex(this.A);
};

/**
 * Receives the password salt 's' and public value 'B' from the server.
 * The SRP-6a crypto parameters are also set. The session is incremented
 * to {@link State#STEP_2}.
 * <p>Argument origin:
 * <ul>
 *     <li>From server: password salt 's', public value 'B'.
 *     <li>Pre-agreed: crypto parameters prime 'N',
 *         generator 'g' and hash function 'H'.
 * </ul>
 * @param s      The password salt 's' as a hex string. Must not be {@code null}.
 * @param B      The public server value 'B' as a hex string. Must not be {@code null}.
 * @param k      k is H(N,g) with padding by the server. Must not be {@code null}.
 * @return The client credentials consisting of the client public key
 *         'A' and the client evidence message 'M1'.
 * @throws IllegalStateException If the method is invoked in a state
 *                               other than {@link State#STEP_1}.
 * @throws SRP6Exception         If the public server value 'B' is invalid.
 */
SRP6JavascriptClientSession.prototype.step2 = function (s, BB) {
	"use strict";

	this.check(s, "s");
	this.check(BB, "BB");

	var padLength = this.toHex(this.N()).length;

	if (this.state !== this.STEP_1) {
		throw new Error("IllegalStateException not in state STEP_1");
	}

	// this is checked when passed to computeSessionKey
	this.B = this.fromHex(BB);

	var ZERO = null;

	/* jshint ignore:start */
	ZERO = BigInteger.ZERO;
	/* jshint ignore:end */

	if (this.B.mod(this.N()).equals(ZERO)) {
		throw new Error("SRP6Exception bad server public value 'B' as B == 0 (mod N)");
	}

	// this is checked when passed to computeSessionKey
	var x = this.generateX(s, this.I, this.P);

	// blank the password as there is no reason to keep it around in memory.
	this.P = null;

	this.u = this.computeU(this.padding(this.A.toString(16), padLength), this.padding(BB, padLength));

	this.S = this.computeSessionKey(this.k, x, this.u, this.a, this.B);
	this.check(this.S, "S");

	this.M1str = this.H(this.padding(this.A.toString(16), padLength) + this.padding(BB, padLength) + this.padding(this.toHex(this.S), padLength));
	this.check(this.M1str, "M1str");

	// server BigInteger math will trim leading zeros so we must do likewise to get a match
	while (this.M1str.substring(0, 1) === '0') {
		this.M1str = this.M1str.substring(1);
	}

	this.state = this.STEP_2;
	return this.M1str;
};

/**
 * Receives the server evidence message 'M1'. The session is incremented
 * to {@link State#STEP_3}.
 *
 * <p>Argument origin:
 * <ul>
 *     <li>From server: evidence message 'M2'.
 * </ul>
 * @param serverM2 The server evidence message 'M2' as string. Must not be {@code null}.
 * @throws IllegalStateException If the method is invoked in a state 
 *                               other than {@link State#STEP_2}.
 * @throws SRP6Exception         If the session has timed out or the 
 *                               server evidence message 'M2' is 
 *                               invalid.
 */
SRP6JavascriptClientSession.prototype.step3 = function (M2) {
	"use strict";
	
	this.check(M2);

	var padLength = this.toHex(this.N()).length;

	// Check current state
	if (this.state !== this.STEP_2)
		throw new Error("IllegalStateException State violation: Session must be in STEP_2 state");

	var computedM2 = this.H(this.padding(this.toHex(this.A), padLength) + this.padding(this.M1str, padLength) + this.padding(this.toHex(this.S), padLength));

	// server BigInteger math will trim leading zeros so we must do likewise to get a match
	while (computedM2.substring(0, 1) === '0') {
		computedM2 = computedM2.substring(1);
	}

	if ("" + computedM2 !== "" + M2) {
		throw new Error("SRP6Exception Bad server credentials");
	}

	this.state = this.STEP_3;

	return ("" + computedM2 === "" + M2);
};
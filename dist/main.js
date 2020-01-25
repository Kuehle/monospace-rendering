!(function(e, t) {
    'object' == typeof exports && 'object' == typeof module
        ? (module.exports = t())
        : 'function' == typeof define && define.amd
        ? define([], t)
        : 'object' == typeof exports
        ? (exports.MonospaceRendering = t())
        : (e.MonospaceRendering = t())
})(this, function() {
    return (function(e) {
        var t = {}
        function r(n) {
            if (t[n]) return t[n].exports
            var o = (t[n] = { i: n, l: !1, exports: {} })
            return e[n].call(o.exports, o, o.exports, r), (o.l = !0), o.exports
        }
        return (
            (r.m = e),
            (r.c = t),
            (r.d = function(e, t, n) {
                r.o(e, t) ||
                    Object.defineProperty(e, t, { enumerable: !0, get: n })
            }),
            (r.r = function(e) {
                'undefined' != typeof Symbol &&
                    Symbol.toStringTag &&
                    Object.defineProperty(e, Symbol.toStringTag, {
                        value: 'Module',
                    }),
                    Object.defineProperty(e, '__esModule', { value: !0 })
            }),
            (r.t = function(e, t) {
                if ((1 & t && (e = r(e)), 8 & t)) return e
                if (4 & t && 'object' == typeof e && e && e.__esModule) return e
                var n = Object.create(null)
                if (
                    (r.r(n),
                    Object.defineProperty(n, 'default', {
                        enumerable: !0,
                        value: e,
                    }),
                    2 & t && 'string' != typeof e)
                )
                    for (var o in e)
                        r.d(
                            n,
                            o,
                            function(t) {
                                return e[t]
                            }.bind(null, o)
                        )
                return n
            }),
            (r.n = function(e) {
                var t =
                    e && e.__esModule
                        ? function() {
                              return e.default
                          }
                        : function() {
                              return e
                          }
                return r.d(t, 'a', t), t
            }),
            (r.o = function(e, t) {
                return Object.prototype.hasOwnProperty.call(e, t)
            }),
            (r.p = ''),
            r((r.s = 1))
        )
    })([
        function(e, t, r) {
            'use strict'
            Object.defineProperty(t, '__esModule', { value: !0 }),
                (t.map = (e, t) => {
                    const r = []
                    for (let n = 0; n < e.length; n++) r[n] = t(e[n], n, e)
                    return r
                }),
                (t.reduce = (e, t, r) => {
                    for (let n = 0; n < e.length; n++) r = t(r, e[n], n, e)
                    return r
                }),
                (t.forI = (e, t) => {
                    const r = []
                    for (let n = 0; n < e; n++) r[n] = t(n)
                    return r
                })
        },
        function(e, t, r) {
            'use strict'
            Object.defineProperty(t, '__esModule', { value: !0 })
            const n = r(0)
            var o = r(0)
            ;(t.map = o.map), (t.reduce = o.reduce), (t.forI = o.forI)
            ;(t.createRect = ({ width: e, height: t, char: r }) =>
                n.forI(t, () => r.repeat(e))),
                (t.toTransparency = (e, t = ' ') =>
                    n.map(e, e => e.split(t).join('ü'))),
                (t.compose = (e, t, r = { x: 0, y: 0 }) => {
                    const o = r.x || 0,
                        u = r.y || 0
                    return n.map(e, (e, r) =>
                        n
                            .map(e.split('').slice(), (e, n) => {
                                const i = t[r - u] && t[r - u][n - o]
                                return i && 'ü' !== i ? i : e
                            })
                            .join('')
                    )
                }),
                (t.crop = (e, r) => {
                    const { height: o, width: u, x: i, y: c } = Object.assign(
                        { x: 0, y: 0 },
                        t.measure(e),
                        r
                    )
                    return n.reduce(
                        e,
                        (e, t, r) =>
                            c > r || c + o - 1 < r
                                ? e
                                : [...e, t.slice(i, i + u)],
                        []
                    )
                }),
                (t.rotate = (e, r = 1) => {
                    if ((r = Math.round(r)) % 4 == 0) return e
                    const { width: o, height: u } = t.measure(e),
                        [i, c] = r % 2 == 0 ? [u, o] : [o, u]
                    let f = n.forI(i, () => [])
                    return (
                        n.forI(i, t => {
                            n.forI(c, n => {
                                switch (r % 4) {
                                    case 1:
                                        return (f[t][n] = e[c - n - 1][t])
                                    case 2:
                                        return (f[t][n] =
                                            e[i - t - 1][c - n - 1])
                                    case 3:
                                        return (f[t][n] = e[n][i - t - 1])
                                    default:
                                        throw new Error(
                                            'Something went wrong while rotating. Check the input values.'
                                        )
                                }
                            })
                        }),
                        n.map(f, e => e.join(''))
                    )
                }),
                (t.isInBounds = (e, t) =>
                    t.x < e[0].length &&
                    t.x >= 0 &&
                    t.x < e.length &&
                    t.y >= 0),
                (t.measure = e => ({
                    height: e.length,
                    width: n.reduce(
                        e,
                        (e, t) => (t.length > e ? t.length : e),
                        0
                    ),
                }))
        },
    ])
})
//# sourceMappingURL=main.js.map

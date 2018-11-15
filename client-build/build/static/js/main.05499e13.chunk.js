"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(window.webpackJsonp = window.webpackJsonp || []).push([[0], { 142: function _(_2, e) {}, 157: function _(_3, e, t) {
    "use strict";
    t.r(e);var a = t(1),
        r = t.n(a),
        s = t(6),
        n = t.n(s),
        o = (t(75), t(58));Boolean("localhost" === window.location.hostname || "[::1]" === window.location.hostname || window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));t(153), t(155);n.a.render(r.a.createElement(o.a, null), document.getElementById("root")), "serviceWorker" in navigator && navigator.serviceWorker.ready.then(function (_) {
      _.unregister();
    });
  }, 58: function _(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var _Users_segalbe_Documents_config_manager_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14),
        _Users_segalbe_Documents_config_manager_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15),
        _Users_segalbe_Documents_config_manager_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(17),
        _Users_segalbe_Documents_config_manager_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(16),
        _Users_segalbe_Documents_config_manager_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(18),
        react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1),
        react__WEBPACK_IMPORTED_MODULE_5___default = __webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__),
        react_codemirror2__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(59),
        react_codemirror2__WEBPACK_IMPORTED_MODULE_6___default = __webpack_require__.n(react_codemirror2__WEBPACK_IMPORTED_MODULE_6__),
        reactstrap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5),
        react_select__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(68),
        _Tree__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(69),
        _Types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(8),
        _App_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(81),
        _App_css__WEBPACK_IMPORTED_MODULE_11___default = __webpack_require__.n(_App_css__WEBPACK_IMPORTED_MODULE_11__),
        codemirror_lib_codemirror_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(83),
        codemirror_lib_codemirror_css__WEBPACK_IMPORTED_MODULE_12___default = __webpack_require__.n(codemirror_lib_codemirror_css__WEBPACK_IMPORTED_MODULE_12__),
        codemirror_theme_material_css__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(85),
        codemirror_theme_material_css__WEBPACK_IMPORTED_MODULE_13___default = __webpack_require__.n(codemirror_theme_material_css__WEBPACK_IMPORTED_MODULE_13__),
        react_split_pane__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(61),
        _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(20),
        _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(7),
        socket_io_client__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(62),
        socket_io_client__WEBPACK_IMPORTED_MODULE_17___default = __webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_17__);window.CodeMirror = __webpack_require__(38);var App = function (_Component) {
      function App(props) {
        var _this;return Object(_Users_segalbe_Documents_config_manager_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__.a)(this, App), _this = Object(_Users_segalbe_Documents_config_manager_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__.a)(this, Object(_Users_segalbe_Documents_config_manager_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__.a)(App).call(this, props)), _this.renderNode = function (_) {
          var e = _ === _this.state.active ? "treeNode selected" : "treeNode";return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("span", { onClick: _this.onClickNode.bind(null, _), className: e, style: { color: "white" } }, _.type === _Types__WEBPACK_IMPORTED_MODULE_10__.b.APPLICATION || _.type === _Types__WEBPACK_IMPORTED_MODULE_10__.b.FOLDER ? react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_15__.a, { icon: _.collapsed ? _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_16__.b : _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_16__.a }) : [], react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_15__.a, { icon: _Types__WEBPACK_IMPORTED_MODULE_10__.a[_.type] }), " " + _.module);
        }, _this.isChanged = function (_) {
          return _ === _this.state.active && _this.state.code !== _this.state.original ? react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", { style: { display: "contents", color: "white" }, onClick: function onClick() {
              return _this.socket.emit("set file", _.path, _this.state.code);
            } }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_15__.a, { icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_16__.g })) : [];
        }, _this.getFile = function (_) {
          _this.socket.emit("get file", _);
        }, _this.onClickNode = function (_) {
          switch (_.type) {case _Types__WEBPACK_IMPORTED_MODULE_10__.b.FILE:
              _this.getFile(_.path), _this.setState({ active: _ });break;case _Types__WEBPACK_IMPORTED_MODULE_10__.b.FOLDER:case _Types__WEBPACK_IMPORTED_MODULE_10__.b.APPLICATION:
              _.collapsed = !_.collapsed, _this.setState({ tree: _this.state.tree });}
        }, _this.handleChange = function (_) {
          _this.setState({ tree: _ });
        }, _this.socket = socket_io_client__WEBPACK_IMPORTED_MODULE_17___default()(), _this.state = { code: "", original: "", adding: !1, newName: "", newFilePath: "", newParent: {}, tree: { module: "Applications", type: _Types__WEBPACK_IMPORTED_MODULE_10__.b.FOLDER, children: [] }, saving: !1, loadedLangs: {}, currLanguage: "", selectLanguageValue: {}, currFileType: "", languages: [], editorKey: Date.now() }, _this.socket.on("get file complete", function (_, e, t) {
          var a = t.split("/")[1];"plain" === a && (a = "properties"), null !== a && _this.state.languages.indexOf(a) > 0 && (_this.state.loadedLangs[a] || _this.socket.emit("get language", a), _this.setState({ currLanguage: a, selectLanguageValue: { value: a, label: a } })), _this.setState({ code: e, original: e, currFileType: t });
        }), _this.socket.on("config", function (_) {
          _this.setState(function (e) {
            var t = e.tree;for (var a in t.children = [], _) {
              if ("object" === _typeof(_[a])) {
                var r = { module: a, type: _Types__WEBPACK_IMPORTED_MODULE_10__.b.APPLICATION, children: [] };for (var s in _[a]) {
                  r.children.push({ module: s, path: _[a][s], type: _Types__WEBPACK_IMPORTED_MODULE_10__.b.FILE });
                }t.children.push(r);
              }
            }return { tree: t };
          });
        }), _this.socket.on("server_error", function (_) {
          console.error(_);
        }), _this.socket.on("languages", function (_) {
          _this.setState({ languages: _ });
        }), _this.socket.on("set file complete", function () {
          _this.setState(function (_) {
            return { saving: !1, original: _.code };
          });
        }), _this.socket.on("get language complete", function (language, content) {
          eval(content), _this.setState(function (_) {
            var e = _.loadedLangs;return e[language] = !0, { loadedLangs: e, editorKey: Date.now() };
          });
        }), _this;
      }return Object(_Users_segalbe_Documents_config_manager_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__.a)(App, _Component), Object(_Users_segalbe_Documents_config_manager_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__.a)(App, [{ key: "render", value: function value() {
          var _ = this;return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_7__.c, { fluid: !0, style: { height: "100%" } }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_7__.i, { style: { height: "100%" } }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_split_pane__WEBPACK_IMPORTED_MODULE_14__.a, { split: "vertical", minSize: 200, defaultSize: "25%" }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", { style: { backgroundColor: "#455a64", height: "100%" } }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_Tree__WEBPACK_IMPORTED_MODULE_9__.a, { node: this.state.tree, renderNode: this.renderNode })), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", { style: { height: "100%", backgroundColor: "#263238" } }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_7__.i, null, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_7__.b, { xs: { size: 9 }, style: { paddingRight: 0 } }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_7__.e, null, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_7__.d, { disabled: !0, value: this.state.active ? this.state.active.path : "" }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_7__.f, { addonType: "append" }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_7__.a, { onClick: function onClick() {
              _.socket.emit("set file", _.state.active.path, _.state.code), _.setState({ saving: !0 });
            } }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_15__.a, { icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_16__.g }))))), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_7__.b, { xs: { size: 3 }, style: { paddingLeft: 0 } }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_select__WEBPACK_IMPORTED_MODULE_8__.a, { options: this.state.languages.map(function (_) {
              return { value: _, label: _ };
            }), onChange: function onChange(e) {
              var t = e.value;null === t || _.state.loadedLangs[t] || _.socket.emit("get language", t), _.setState({ currLanguage: t, selectLanguageValue: e });
            }, value: this.state.selectLanguageValue }))), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_codemirror2__WEBPACK_IMPORTED_MODULE_6__.Controlled, { key: this.state.editorKey, value: this.state.code, options: { lineNumbers: !0, theme: "material", mode: this.state.currLanguage }, onBeforeChange: function onBeforeChange(e, t, a) {
              _.setState({ code: a });
            }, editorDidMount: function editorDidMount(e) {
              _.instance = e;
            }, onChange: function onChange(_, e, t) {} })))), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_7__.g, { isOpen: this.state.saving }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_7__.h, null, "Saving")));
        } }]), App;
    }(react__WEBPACK_IMPORTED_MODULE_5__.Component);__webpack_exports__.a = App;
  }, 69: function _(_4, e, t) {
    "use strict";
    var a = t(14),
        r = t(15),
        s = t(17),
        n = t(16),
        o = t(18),
        c = t(1),
        i = t.n(c),
        E = t(67),
        l = t(5),
        u = function (_) {
      function e() {
        return Object(a.a)(this, e), Object(s.a)(this, Object(n.a)(e).apply(this, arguments));
      }return Object(o.a)(e, _), Object(r.a)(e, [{ key: "render", value: function value() {
          var _ = this;return [i.a.createElement(l.i, { key: this.props.offset + "r" }, i.a.createElement(l.b, { xs: { size: "auto", offset: this.props.offset } }, this.props.renderNode(this.props.node)))].concat(Object(E.a)(void 0 === this.props.node.children || this.props.node.collapsed ? [] : this.props.node.children.map(function (t, a) {
            return i.a.createElement(e, { key: _.props.offset + "" + a, node: t, offset: _.props.offset + 1, renderNode: _.props.renderNode });
          })));
        } }]), e;
    }(c.Component);t(79);t.d(e, "a", function () {
      return O;
    });var O = function (_) {
      function e() {
        return Object(a.a)(this, e), Object(s.a)(this, Object(n.a)(e).apply(this, arguments));
      }return Object(o.a)(e, _), Object(r.a)(e, [{ key: "render", value: function value() {
          return i.a.createElement(u, { key: 0, node: this.props.node, offset: 0, renderNode: this.props.renderNode });
        } }]), e;
    }(c.Component);
  }, 70: function _(_5, e, t) {
    _5.exports = t(157);
  }, 75: function _(_6, e, t) {}, 79: function _(_7, e, t) {}, 8: function _(_8, e, t) {
    "use strict";
    t.d(e, "b", function () {
      return r;
    }), t.d(e, "a", function () {
      return s;
    });var a = t(7),
        r = { APPLICATION: 0, FOLDER: 1, FILE: 2, NEW: 3 },
        s = { 0: a.c, 1: a.e, 2: a.d, 3: a.f };
  }, 81: function _(_9, e, t) {} }, [[70, 2, 1]]]);
//# sourceMappingURL=main.05499e13.chunk.js.map
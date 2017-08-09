webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_css__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__img_6872950_png__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__img_6872950_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__img_6872950_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__img_div_bg_1_jpg__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__img_div_bg_1_jpg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__img_div_bg_1_jpg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tpl_tplFormPage_html__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tpl_tplFormPage_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__tpl_tplFormPage_html__);








new __WEBPACK_IMPORTED_MODULE_1_vue___default.a({
  el: '#header',
  data: {
    items: [{
      name: '关于我',
      view: 'aboutPage'
    }, {
      name: '表单',
      view: 'formPage'
    }, {
      name: '首页',
      view: 'homePage'
    }]
  },
  methods: {
    page: function(event) {
      body.currentView = event.path[1].attributes['data-view'].value;
    }
  }
});

let body = new __WEBPACK_IMPORTED_MODULE_1_vue___default.a({
  el: '#body',
  data: {
    currentView: 'formPage'
  },
  components: {
    homePage: { template: '<img src="./img/div_bg_1.jpg" alt="">' },
    formPage: {
      template: '<form action="">\
        <div class="form-item">\
          <div class="form-label">\
            <label for="username">姓名：</label>\
          </div>\
          <div class="form-input">\
            <input placeholder="2-10位中英文字符" type="text" name="username" v-on:input="validate($event.target)"><i class="ok"></i>\
            <span class="tips"><i class="error"></i>格式有误</span>\
          </div>\
        </div>\
        <div class="form-item">\
          <div class="form-label">\
            <label for="phone">手机：</label>\
          </div>\
          <div class="form-input">\
            <input placeholder="11位数字" type="text" name="phone" v-on:input="validate($event.target)"><i class="ok"></i>\
            <span class="tips"><i class="error"></i>格式有误</span>\
          </div>\
        </div>\
        <div class="form-item">\
          <div class="form-label">\
            <label for="pwd">密码：</label>\
          </div>\
          <div class="form-input">\
            <input placeholder="只包含数字、字母和标点" type="password" name="pwd" v-on:input="validate($event.target)"><i class="ok"></i>\
            <span class="tips"><i class="error"></i>格式有误</span>\
          </div>\
        </div>\
        <div class="form-item code-item">\
          <div class="form-label">\
            <label for="code">验证码：</label>\
          </div>\
          <div class="form-input">\
            <input placeholder="6位数字" type="text" name="code" v-on:input="validate($event.target)"><i class="ok"></i>\
            <span class="tips"><i class="error"></i>格式有误</span>\
            <input placeholder="按格式输入" type="button" value="获取验证码">\
          </div>\
        </div>\
        <div class="form-item submit-item">\
          <div class="form-label">\
            <label></label>\
          </div>\
          <input type="submit" value="提交">\
        </div>\
      </form>',
      methods: {
        validate: function(target) {
          switch (target.name) {
            case 'username':
              !/^[a-zA-Z0-9]{2,10}$/.test(target.value) ? target.parentNode.querySelector('.tips').style.display = 'block' : target.parentNode.querySelector('.tips').style.display = 'none';
              break;
            case 'phone':
              !/^[0-9]{1,11}$/.test(target.value) ? target.parentNode.querySelector('.tips').style.display = 'block' : target.parentNode.querySelector('.tips').style.display = 'none';
              break;
            case 'pwd':
              !/^.+$/.test(target.value) ? target.parentNode.querySelector('.tips').style.display = 'block' : target.parentNode.querySelector('.tips').style.display = 'none';
              break;
            case 'code':
              !/^[0-9]{6}$/.test(target.value) ? target.parentNode.querySelector('.tips').style.display = 'block' : target.parentNode.querySelector('.tips').style.display = 'none';
              break;
            default:
              break;
          }
          if (target.value == '') {
            target.parentNode.querySelector('.tips').style.display = 'none';
          }
        }
      }
    },
    aboutPage: { template: '<img src="./img/6872950.png" alt="">' }
  },
});


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/6872950.png";

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/div_bg_1.jpg";

/***/ }),
/* 7 */
/***/ (function(module, exports) {




/***/ })
],[1]);
import './index.css';

import Vue from 'vue';

Vue.component('my-component', {
  template: '<span>{{ message }}</span>',
  data: function() {
    return {
      message: 'welcome to vue'
    }
  }
});
// 使用 Prop 传递数据
// camelCase vs kebab-case
Vue.component('my-child', {
  props: ['myMessage'],
  template: '<p>{{ myMessage }}</p>'
});
// 动态 Prop
Vue.component('child', {
  props: ['myMessage'],
  template: '<p>{{ myMessage }}</p>'
});
// 字面量语法 vs 动态语法
// 单向数据流
Vue.component('comp', {
  props: {
    someProp: {
      type: Number,
      default: 100
    },
    initialCounter: String
  },
  template: '<p>someProp is {{ someProp }}</p>',
  data: function() {
    return {
      counter: this.initialCounter
    }
  }
});
// 使用 v-on 绑定自定义事件
Vue.component('button-counter', {
  template: '<button v-on:click="increment">{{ counter }}</button>',
  data: function() {
    return {
      counter: 0
    }
  },
  methods: {
    increment: function() {
      this.counter += 1
      this.$emit('increment')
    }
  },
});
Vue.component('currency-input', {
  template: '\
    <span>\
      $\
      <input\
        ref="input"\
        v-bind:value="value"\
        v-on:input="updateValue($event.target.value)"\
      >\
    </span>\
  ',
  props: ['value'],
  methods: {
    // 不是直接更新值，而是使用此方法来对输入值进行格式化和位数限制
    updateValue: function(value) {
      var formattedValue = value
        // 删除两侧的空格符
        .trim()
        // 保留 2 小数位
        .slice(0, value.indexOf('.') + 3)
        // 如果值不统一，手动覆盖以保持一致
      if (formattedValue !== value) {
        this.$refs.input.value = formattedValue
      }
      // 通过 input 事件发出数值
      this.$emit('input', Number(formattedValue))
    }
  }
});
// 单个 slot
Vue.component('my-component-1', {
  template: '\
    <div>\
      <h2>我是子组件的标题</h2>\
      <slot>\
        只有在没有要分发的内容时才会显示。\
      </slot>\
    </div>\
  '
});
// 作用域插槽
Vue.component('my-awesome-list', {
  template: '\
    <ul>\
      <slot name="item"\
        v-for="item in items"\
        :text="item.text">\
        <!-- 这里写入备用内容 -->\
      </slot>\
    </ul>\
  ',
  data: function() {
    return {
      items: [
        { text: '123' },
        { text: '456' },
        { text: '789' }      
      ]
    }
  }
});
new Vue({
  el: '#example-6',
  data: {
    currentView: 'posts'
  },
  components: {
    home: { template: '<p>Welcome home!</p>' },
    posts: { template: '<p>Welcome posts!</p>' },
    archive: { template: '<p>Welcome archive!</p>' }
  }
});
new Vue({
  el: '#example-5',
  methods: {
    items: function(){
      console.log(12);
    }
  }
});
new Vue({
  el: '#example-4'
});
new Vue({
  el: '#example-3'
});
new Vue({
  el: '#counter-event-example',
  data: {
    total: 0
  },
  methods: {
    incrementTotal: function() {
      this.total += 1
    }
  }
});
new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    reversedMessage: function() {
      return this.message.split('').reverse().join('')
    }
  }
});
new Vue({
  el: '#example-2',
  data: {
    parentMsg: '123'
  }
});

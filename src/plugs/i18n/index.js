import Vue from 'vue'
import VueI18n from 'vue-i18n'

//使用vue-i18n国际化
Vue.use(VueI18n);

export default new VueI18n({
    locale: 'zh-CN',    // 语言标识
    //this.$i18n.locale // 通过切换locale的值来实现语言切换
    messages: {
      'zh-CN': require('../../common/lang/zh'),   // 中文语言包
      'en-US': require('../../common/lang/en')    // 英文语言包
    }
})
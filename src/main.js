import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css/normalize.css'


import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

// use zh-TW
import zhTW from '@kangc/v-md-editor/lib/lang/zh-TW';
VMdEditor.lang.use('zh-TW', zhTW);
// Prism
import Prism from 'prismjs';
// highlight code
import 'prismjs/components/prism-json';

VMdEditor.use(vuepressTheme, {
  Prism,
  extend(md) {
    // https://github.com/markdown-it/markdown-it
    md.set({
      breaks: false
    })
  },
});


createApp(App)
  .use(VMdEditor)
  .mount('#app')


<template>
  <div>
    <header>
      <div class="container">
        <div class="title">{{ selectedEvent }} Issue 小精靈</div>
        <p>幫你開 Issue 的小精靈</p>
      </div>
    </header>
    <div class="container">
      <div class="box">
        <div class="title">小提醒</div>
        <p>在 Title 或 Description 輸入 #{group} 會自動帶入組別名稱。</p>
      </div>
      <label>Title</label>
      <input v-model="title" @input="updateLinks" />
      <label>Description</label>
      <v-md-editor
        left-toolbar="undo redo | h bold italic strikethrough quote | ul ol table hr | name pancake"
        right-toolbar="preview"
        v-model="description"
        height="400px"
        @change="updateLinks"
        :toolbar="toolbar"
      ></v-md-editor>
      <label>Options</label>
      <div class="options">
        <div class="option">
          <input type="checkbox" v-model="options.autoAssign" @change="updateLinks" id="autoAssign" />
          <label for="autoAssign">自動 Assign 組長</label>
        </div>
      </div>
      <button @click="createIssue" class="magic-button">🪄 來點魔法！</button>
      <p class="text-center">若魔法施展失敗，請檢查瀏覽器是否封鎖了快顯視窗，或直接點擊下方連結。</p>
      <div class="links">
        <a
          v-for="link in links"
          :href="link.href"
          target="_blank"
          :key="link.title"
          v-text="link.title"
        />
      </div>
    </div>
    <footer>
      Developed by
      <a href="https://gnehs.net" target="_blank">勝勝寶寶</a> | Made with
      <span @click="randomThemeColor">🥞</span> in Taiwan |
      <a href="https://github.com/gnehs/issue-generator" target="_blank">GitHub</a>
    </footer>
  </div>
</template>

<style lang="sass">
\:root
  --theme-color: 244, 169, 64
  --border-color: #ddd
  line-height: 1.5
  accent-color: rgb(var(--theme-color))
body,html,.v-md-textarea-editor pre, .v-md-textarea-editor textarea,.vuepress-markdown-body
  font-family: 'Ubuntu Mono', 'Noto Sans TC', sans-serif !important
*
  box-sizing: border-box
  transition: all 0.2s ease
a
  color: rgb(var(--theme-color))
  &:hover
    opacity: 0.8

header
  padding: 64px 0
  margin-bottom: 16px
  background-color: rgba(var(--theme-color),.05)
  .title
    font-size: 2rem
footer
  font-size: 0.875rem
  margin-top: 32px
  padding: 32px 0
  text-align: center
  color: #999
  background-color: rgba(var(--theme-color),.05)

label
  display: inline-block
  font-size: 1rem
  margin-top: 16px
  margin-bottom: 8px
  color: rgb(var(--theme-color))
  filter: brightness(.75)
input:not([type="checkbox"])
  width: 100%
  padding: 8px 12px
  border: 1px solid var(--border-color)
  border-radius: 4px
  font-size: 1.25rem
  &:focus
    outline: none
    border: 1px solid rgb(var(--theme-color))
input[type="checkbox"]
  accent-color: rgb(var(--theme-color))
  margin-right: 8px
p
  font-size: 1rem
  opacity: 0.5
  margin: 0
.text-center
  text-align: center
.container
  width: min(calc(100vw - 40px),960px)
  margin: 0 auto
  font-size: 16px
.title
  font-size: 1.25rem
  font-weight: bold
  color: rgb(var(--theme-color))
  margin-bottom: 8px
.box
  padding: 16px 24px
  margin-bottom: 16px
  border-left: 4px solid rgb(var(--theme-color))
  background-color: rgba(var(--theme-color),.05)
  border-radius: 0 16px 16px 0
  p
    color: rgb(var(--theme-color))
    filter: brightness(0.2)
.links
  display: flex
  flex-wrap: wrap
  justify-content: center
  align-items: center
  gap: 8px
  margin-top: 4px
  a
    background-color: rgb(var(--theme-color))
    color: #fff
    padding: 4px 8px
    border-radius: 8px
    text-decoration: none
    &:hover
      box-shadow: 0 10px 20px -10px rgba(var(--theme-color),1)
      transform: translateY(-3px)
    &:active
      box-shadow: 0 5px 10px -5px rgba(var(--theme-color),1)
      transform: translateY(-1px)
.magic-button
  background-color: rgb(var(--theme-color))
  color: #fff
  font-size: 2rem
  display: block
  margin: 8px auto
  margin-top: 32px
  border: none
  border-radius: 8px
  padding: .5em .75em
  cursor: pointer
  &:hover
    box-shadow: 0 10px 20px -10px rgba(var(--theme-color),1)
    transform: translateY(-3px)
  &:active
    box-shadow: 0 5px 10px -5px rgba(var(--theme-color),1)
    transform: translateY(-1px)
.v-md-editor
  box-shadow: none !important
  border: 1px solid var(--border-color)
.v-pancake:before
  content: "🥞"
.v-name:before
  content: "📛"
.v-md-editor__toolbar-item
  color: rgb(var(--theme-color)) !important
.vuepress-markdown-body
  color: #000 !important
  padding: 20px 20px 30px !important
  font-size: 14px !important
  p
    font-size: 14px !important
    opacity: 1
  a
    color: rgb(var(--theme-color)) !important
</style>
<script>
import events from './assets/events'
export default {
  data() {
    return {
      title: '[#{group}] 填寫蓬蓬鬆餅預約表單',
      description: '請#{group}組協助填寫蓬蓬鬆餅預約表單。\n\n[傳送門](https://pancake.tw/)',
      selectedEvent: 'SITCON Camp 2023',
      events,
      options: {
        autoAssign: true,
      },
      links: [],
      toolbar: {
        pancake: {
          icon: 'v-pancake',
          title: '插入蓬蓬鬆餅',
          action(editor) {
            editor.insert(function (selected) {
              return {
                text: `🥞`,
              };
            });
          },
        },
        name: {
          icon: 'v-name',
          title: '插入組別名稱',
          action(editor) {
            editor.insert(function (selected) {
              return {
                text: `#{group}`,
                selected: `#{group}`,
              };
            });
          },
        },
      },
    }
  },
  mounted() {
    this.randomThemeColor()
    // get from query string
    this.selectedEvent = new URLSearchParams(window.location.search).get('event') || this.selectedEvent
    this.updateLinks()
  },
  methods: {
    updateLinks() {
      this.links = []
      let event = this.events.find(event => event.title === this.selectedEvent)
      for (let [group, assignUsers] of Object.entries(event.groupList)) {
        let title = this.title.replaceAll('#{group}', group)
        let description = this.description.replaceAll('#{group}', group)

        if (this.options.autoAssign && assignUsers.length) {
          description = `/assign @${assignUsers.join(' @')}\n` + description
        }
        description = `/label "${event.inboxLabel}" "${event.groupLabelPrefix}${group}"\n` + description

        let link = new URL(`https://gitlab.com/${event.repo}/-/issues/new`)
        link.searchParams.append('issue[title]', title)
        link.searchParams.append('issue[description]', description)
        this.links.push({ title: group, href: link.href })
      }
    },
    createIssue() {
      for (let link of this.links) {
        window.open(link.href)
      }
    },
    randomThemeColor() {
      // set :root --theme-color to a random color
      let colors = [
        '244, 169, 64',
        '5, 91, 255',
        '127, 181, 181',
        '153, 153, 80',
        '5, 75, 94',
        '4, 114, 122',
        '216, 119, 49',
        '229, 202, 82',
        '5, 74, 117',
      ]
      let color = colors[Math.floor(Math.random() * colors.length)]
      document.documentElement.style.setProperty('--theme-color', color)
    }
  }
}
</script>

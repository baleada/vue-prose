<template>
  <main
    class="relative z-10 lg:flex transition"
    :class="[
      isDarkTheme ? 'dark bg-gray-900' : 'bg-gray-200',
    ]"
  >
    <section
      :style="{ display: 'none' }"
      class="relative h-screen w-screen lg:w-17 flex-none px-7 py-3 overflow-y-scroll scrolling-touch transition"
      :class="[
        isDarkTheme ? 'bg-gray-900' : 'bg-gray-200'
      ]"
      ref="nav"
    >
      <header
        class="flex items-center pb-3 border-b-2"
        :class="[
          isDarkTheme ? 'border-gray-800' : 'border-gray-300'
        ]"
      >
        <NuxtLink
          to="/"
          aria-label="Link to home page"
          class="flex-none rounded-full h-10 w-10 p-2 -shadow transition btn-grows"
          :class="[
            isDarkTheme ? 'bg-primary-900' : 'bg-primary-600'
          ]"
        >

        </NuxtLink>
      </header>

      <button
        class="lg:hidden absolute top-0 right-0 mt-3 mr-6 h-7 w-7 cursor-pointer transition btn-grows"
        :class="[
          isDarkTheme ? 'text-gray-600 hover:text-gray-400' : 'text-gray-900 hover:text-primary-600'
        ]"
        name="close-menu"
        @click="toggleNav"
      >
        <EvaClose :class="'icon'"/>
      </button>

      <!-- TODO: use toggle component -->
      <!-- Dark theme toggle -->
      <div class="mt-3 w-full py-3">
        <div class="flex items-center">
          <button
            class="flex items-center text-1 rounded-full font-600 tracking-3"
            :class="[
              isDarkTheme ? 'text-gray-500' : 'text-gray-600'
            ]"
            name="Disable dark theme"
            @click="() => disableDarkTheme()"
          >
            <EvaSun :class="'icon h-5 w-5'" />
          </button>
          <div
            @click="() => toggleDarkTheme()"
            class="relative mx-2 inline-flex -shadow rounded-full h-6 w-9 cursor-pointer transition"
            :class="[
              isDarkTheme ? 'bg-primary-900' : 'bg-primary-200'
            ]"
          >
            <button
              name="Toggle dark theme"
              class="absolute rounded-full h-6 w-6 shadow transition focus:shadow-outline"
              :style="isDarkTheme ? { transform: 'translateX(-100%)' } : {}"
              :class="[
                isDarkTheme ? 'left-full bg-primary-gray-700' : 'left-0 bg-white'
              ]"
            />
          </div>
          <button
            class="flex items-center text-1 rounded-full font-600 tracking-3"
            :class="[
              isDarkTheme ? 'text-gray-500' : 'text-gray-600'
            ]"
            name="Enable dark theme"
            @click="() => enableDarkTheme()"
          >
            <EvaMoon :class="'icon h-5 w-5'" />
          </button>
        </div>

        <span class="block mt-3 text-1" :class="[isDarkTheme ? 'text-gray-500' : 'text-gray-600']">
          Hotkey: <code class="py-px px-1 font-400">SHIFT</code> + <code class="py-px px-1 font-400">D</code>
        </span>
      </div>

      <!-- Minimalist theme toggle -->
      <div class="mt-3 w-full py-3">
        <div class="flex items-center">
          <button
            class="flex items-center text-1 rounded-full font-600 tracking-3"
            :class="[
              isDarkTheme ? 'text-gray-500' : 'text-gray-600'
            ]"
            name="Disable minimalist theme"
            @click="() => disableMinimalistTheme()"
          >
            <EvaLayout :class="'icon h-5 w-5'" />
          </button>
          <div
            @click="() => toggleMinimalistTheme()"
            class="relative mx-2 inline-flex -shadow rounded-full h-6 w-9 cursor-pointer transition"
            :class="[
              isDarkTheme ? 'bg-primary-900' : 'bg-primary-200'
            ]"
          >
            <button
              name="Toggle minimalist theme"
              class="absolute rounded-full h-6 w-6 shadow transition focus:shadow-outline"
              :style="isMinimalistTheme ? { transform: 'translateX(-100%)' } : {}"
              :class="[
                isDarkTheme ? 'bg-primary-gray-700' : 'bg-white',
                isMinimalistTheme ? 'left-full' : 'left-0',
              ]"
            />
          </div>
          <button
            class="flex items-center text-1 rounded-full font-600 tracking-3"
            :class="[
              isDarkTheme ? 'text-gray-500' : 'text-gray-600'
            ]"
            name="Enable minimalist theme"
            @click="() => enableMinimalistTheme()"
          >
            <EvaSquare :class="'icon h-5 w-5'" />
          </button>
        </div>

        <span class="block mt-3 text-1" :class="[isDarkTheme ? 'text-gray-500' : 'text-gray-600']">
          Hotkey: <code class="py-px px-1 font-400">SHIFT</code> + <code class="py-px px-1 font-400">M</code>
        </span>
      </div>

      <ProseNav class="mt-5 pb-7" @click.native="handleNavClick" />
    </section>
    <section
      ref="article"
      :style="{
        padding: '10%',
      }"
      class="absolute lg:relative top-0 left-0 z-20 h-screen w-screen lg:w-full flex flex-col overflow-x-hidden overflow-y-scroll scrolling-touch shadow-3 lg:rounded-2 transition"
      :class="[
        navIsOpen ? 'translate-x-full lg:translate-0' : '',
        tableOfContentsIsOpen ? '-translate-x-full lg:translate-0' : '',
        isDarkTheme ? 'bg-gray-800' : 'bg-white'
      ]"
    >
      <header :style="{ display: 'none' }" class="flex items-center z-40 absolute left-0 top-0 pt-6 px-7 sm:px-9 lg:pl-11 w-full">
        <button
          type="button"
          name="Show navigation"
          class="lg:hidden h-7 w-7 p-0 rounded-full transition btn-grows"
          :class="[
            isDarkTheme ? 'text-gray-600 hover:text-gray-400' : 'text-gray-700 hover:text-primary-600'
          ]"
          @click="toggleNav"
        >
          <EvaMenu :class="'icon'" />
        </button>

        <!-- <DocsSearch class="ml-2 lg:ml-0 w-full max-w-6" /> -->

        <button
          type="button"
          name="Show table of contents"
          class="ml-auto lg:hidden h-7 w-7 p-0 rounded-full transition btn-grows"
          :class="[
            isDarkTheme ? 'text-gray-600 hover:text-gray-400' : 'text-gray-700 hover:text-primary-600'
          ]"
          @click="toggleTableOfContents"
        >
          <EvaList :class="'icon'" />
        </button>
      </header>



      <nuxt key="content" />
    </section>
    <section
      :style="{ display: 'none' }"
      class="relative h-screen w-screen lg:w-17 flex-none px-7 py-3 overflow-y-scroll scrolling-touch transition"
      :class="[
        isDarkTheme ? 'bg-gray-900' : 'bg-gray-200'
      ]"
      ref="tableOfContents"
    >
      <!-- <ProseAd class="mt-auto"/> -->
      <ProseTableOfContents class="prose-nav" :headings="headings" />
    </section>
  </main>
</template>

<script>
import { ref, computed, watch, provide } from '@vue/composition-api'

import { useListenable } from '@baleada/composition/vue'

import { useSymbol, useRouter } from '../composition'

import { EvaMenu } from '@baleada/icons/vue'
import { EvaClose } from '@baleada/icons/vue'
import { EvaList } from '@baleada/icons/vue'
import { EvaSun } from '@baleada/icons/vue'
import { EvaMoon } from '@baleada/icons/vue'
import { EvaLayout } from '@baleada/icons/vue'
import { EvaSquare } from '@baleada/icons/vue'

export default {
  name: 'ProseLayoutThreeColumn',
  components: {
    EvaMenu,
    EvaClose,
    EvaList,
    EvaSun,
    EvaMoon,
    EvaLayout,
    EvaSquare,
  },
  props: {
    manifest: {
      type: Array,
      required: true,
    }
  },
  setup(props, context) {
    /* Manage nav state */
    const navIsOpen = ref(false),
          toggleNav = () => (navIsOpen.value = !navIsOpen.value),
          closeNav = () => (navIsOpen.value = false),
          openNav = () => (navIsOpen.value = true),
          handleNavClick = evt => {
            if (evt.target.matches('a')) {
              closeNav()
            }
          }

    /* Manage table of contents state */
    const tableOfContentsIsOpen = ref(false),
          toggleTableOfContents = () => tableOfContentsIsOpen.value = !tableOfContentsIsOpen.value,
          openTableOfContents = () => tableOfContentsIsOpen.value = true,
          closeTableOfContents = () => tableOfContentsIsOpen.value = false,
          handleTableOfContentsClick = evt => {
            if (evt.target.matches('a')) {
              closeTableOfContents()
            }
          }

    const nav = ref(null)
    // let touchableNav
    // useListenable(nav, {
    //   allowsSelect: true,
    //   onSwipeleft: closeNav,
    //   onSwiperight: openNav
    // }, touchableNav)

    const article = ref(null),
          blacklist = [
            '.prose .overflow-y-scroll',
            '.prose .overflow-y-scroll *',

            '.prose .overflow-x-scroll',
            '.prose .overflow-x-scroll *',

            '.prose pre',
            '.prose pre *',

            '.prose .scrollable-wrapper',
            '.prose .scrollable-wrapper *',

            '.swiper-no-swiping',
          ]
    // let touchableArticle
    // useListenable(article, {
    //   allowsSelect: true,
    //   blacklist: swiperNoSwiping,
    //   onSwipeleft: evt => {
    //     let shouldCallback = !swiperNoSwiping.some(selector => evt.target.matches(selector))
    //     if (shouldCallback) {
    //       closeNav()
    //     }
    //   },
    //   onSwiperight: evt => {
    //     let shouldCallback = !swiperNoSwiping.some(selector => evt.target.matches(selector))
    //     if (shouldCallback) {
    //       openNav()
    //     }
    //   }
    // }, touchableArticle)

    const tableOfContents = ref(null)
    // let touchableNav
    // useListenable(tableOfContents, {
    //   allowsSelect: true,
    //   onSwipeleft: closeNav,
    //   onSwiperight: openNav
    // }, touchableTableOfContents)


    /* Dark theme */
    const isDarkTheme = ref(false),
          toggleDarkTheme = () => isDarkTheme.value = !isDarkTheme.value,
          enableDarkTheme = () => isDarkTheme.value = true,
          disableDarkTheme = () => isDarkTheme.value = false,
          darkThemeShortcutListener = ({ key, shiftKey }) => {
            if (shiftKey && key === 'D') {
              toggleDarkTheme()
            }
          }
    // onMounted(() => document.addEventListener('keydown', darkThemeShortcutListener))
    // onBeforeUnmount(() => document.removeEventListener('keydown', darkThemeShortcutListener))
    provide(useSymbol('layout', 'isDarkTheme'), isDarkTheme)

    /* Minimalist theme */
    const isMinimalistTheme = ref(false),
          toggleMinimalistTheme = () => isMinimalistTheme.value = !isMinimalistTheme.value,
          enableMinimalistTheme = () => isMinimalistTheme.value = true,
          disableMinimalistTheme = () => isMinimalistTheme.value = false,
          minimalistThemeShortcutListener = ({ key, shiftKey }) => {
            if (shiftKey && key === 'M') {
              toggleMinimalistTheme()
            }
          }
    // onMounted(() => document.addEventListener('keydown', minimalistThemeShortcutListener))
    // onBeforeUnmount(() => document.removeEventListener('keydown', minimalistThemeShortcutListener))
    provide(useSymbol('layout', 'isMinimalistTheme'), isMinimalistTheme)

    /* Provide stuff for ProseArticle */
    const { route } = useRouter(),
          fullPath = computed(() => route.value.fullPath)
    provide(useSymbol('layout', 'fullPath'), fullPath)

    /* Provide stuff for ProseHeading */
    const headings = ref([]),
          addHeading = heading => headings.value.push(heading)
    provide(useSymbol('layout', 'addHeading'), addHeading)

    /* Provide stuff for ProseNav */
    provide(useSymbol('layout', 'manifest'), props.manifest)

    return {
      toggleNav,
      handleNavClick,
      navIsOpen,

      toggleTableOfContents,
      handleTableOfContentsClick,
      tableOfContentsIsOpen,

      nav,
      article,
      tableOfContents,

      isDarkTheme,
      toggleDarkTheme,
      enableDarkTheme,
      disableDarkTheme,

      isMinimalistTheme,
      toggleMinimalistTheme,
      enableMinimalistTheme,
      disableMinimalistTheme,

      headings,
    }
  },
}
</script>

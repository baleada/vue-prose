import type { Ref } from 'vue'

type Options = {
  scrollIntoView?: ScrollIntoViewOptions
}

const defaultOptions: Options = {
  scrollIntoView: { behavior: 'auto', block: 'start' },
}

export function scrollToHeading (
  { fullPath, scrollableContainer }: {
    fullPath: Ref<string>,
    scrollableContainer: Ref<HTMLElement>
  },
  options: Options = {}
) {
  const { scrollIntoView } = { ...defaultOptions, ...options }

  if (!anchoredRE.test(fullPath.value)) {
    scrollableContainer.value.scrollTop = 0
    return
  }
  
  const slug = fullPath.value.split('#')[1].toLowerCase(),
        anchor = document.getElementById(`${slug}`),
        heading = anchor?.parentNode as HTMLElement

  if (heading) heading.scrollIntoView(scrollIntoView)
}

const anchoredRE = /#.+$/

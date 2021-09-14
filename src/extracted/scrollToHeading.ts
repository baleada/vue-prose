import type { Ref } from 'vue'

export function scrollToHeading (
  { fullPath, scrollableContainer, scrollIntoView }: {
    fullPath: Ref<string>,
    scrollableContainer: Ref<HTMLElement>,
    scrollIntoView: Ref<ScrollIntoViewOptions>
  }
) {
  if (!anchoredRE.test(fullPath.value)) {
    scrollableContainer.value.scrollTop = 0
    return
  }
  
  const slug = fullPath.value.split('#')[1].toLowerCase(),
        anchor = document.getElementById(`${slug}`),
        heading = anchor?.parentNode as HTMLElement

  if (heading) heading.scrollIntoView(scrollIntoView.value)
}

const anchoredRE = /#.+$/

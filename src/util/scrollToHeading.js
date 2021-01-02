import { computed } from 'vue'

function isAnchored (route) {
  return /#.+$/.test(route)
}

export default function scrollToHeading (fullPath, options) {
  options = {
    scrollableContainer: computed(() => document),
    scrollIntoView: { behavior: 'auto', block: 'start' },
    ...options
  }

  const { scrollableContainer, scrollIntoView } = options

  if (!isAnchored(fullPath)) {
    scrollableContainer.value.scrollTop = 0
  } else {
    const slug = fullPath
            .split('#')[1] // Get end of URL
            .split('.')[0] // Remove file extension
            .toLowerCase(),
          anchor = document.getElementById(`${slug}`),
          heading = anchor?.parentNode

    if (!!heading) heading.scrollIntoView(scrollIntoView)
  }
}

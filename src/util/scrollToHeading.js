const defaultOptions = {
  scrollIntoView: { behavior: 'auto', block: 'start' },
}

export default function scrollToHeading ({ fullPath, scrollableContainer }, options = {}) {
  const { scrollIntoView } = { ...defaultOptions, ...options }

  if (!anchoredRE.test(fullPath.value)) {
    scrollableContainer.value.scrollTop = 0
    return
  }
  
  const slug = fullPath.value.split('#')[1].toLowerCase(),
        anchor = document.getElementById(`${slug}`),
        heading = anchor?.parentNode

  if (!!heading) heading.scrollIntoView(scrollIntoView)
}

const anchoredRE = /#.+$/

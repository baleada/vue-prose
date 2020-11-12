function isAnchored (route) {
  return /#[\w-]+$/.test(route)
}

export default function scrollToHeading (fullPath, options) {
  options = {
    getScrollableContainer: () => document,
    scrollIntoView: { behavior: 'auto', block: 'start' },
    ...options
  }

  const { getScrollableContainer, scrollIntoView } = options

  if (!isAnchored(fullPath)) {
    getScrollableContainer().scrollTop = 0
  } else {
    const slug = fullPath
            .split('#')[1] // Get end of URL
            .split('.')[0] // Remove file extension
            .toLowerCase(),
          anchor = getScrollableContainer().querySelector(`[name=${slug}]`),
          heading = anchor ? anchor.parentNode : undefined

    if (heading !== undefined) heading.scrollIntoView(scrollIntoView)
  }
}

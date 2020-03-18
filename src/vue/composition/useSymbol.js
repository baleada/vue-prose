const symbols = {
  layout: {
    messages: Symbol('messages'),
    fullPath: Symbol('fullPath'),
    setHeadings: Symbol('setHeadings'),
    headings: Symbol('headings'),
    defaultProps: Symbol('defaultProps'),
    interfaceProps: Symbol('interfaceProps'),
  },
  article: {
    addHeading: Symbol('addHeading'),
    headings: Symbol('headings'),
    setFrontMatter: Symbol('setFrontMatter'),
    frontMatter: Symbol('frontMatter'),
    setStats: Symbol('setStats'),
    stats: Symbol('stats'),
    setFilePath: Symbol('setFilePath'),
    filePath: Symbol('filePath'),
  },
  grid: {
    canFilterByQuery: Symbol('canFilterByQuery'),
    filterQuery: Symbol('filterQuery'),
    filterIsCaseSensitive: Symbol('filterIsCaseSensitive'),
    setRowIsFiltered: Symbol('setRowIsFiltered'),
    focused: Symbol('focused'),
    setFocused: Symbol('setFocused'),
  },
  list: {
    canFilterByQuery: Symbol('canFilterByQuery'),
    filterQuery: Symbol('filterQuery'),
    filterIsCaseSensitive: Symbol('filterIsCaseSensitive'),
    setListItemIsFiltered: Symbol('setListItemIsFiltered'),
  },
  rowgroup: {
    index: Symbol('index'),
  },
  row: {
    index: Symbol('index'),
  }
}

export default function useSymbol (collection, name) {
  return symbols[collection][name]
}

const symbols = {
  layout: {
    messages: Symbol('messages'),
    fullPath: Symbol('fullPath'),
    setHeadings: Symbol('setHeadings'),
    headings: Symbol('headings'),
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
    addRowgroup: Symbol('addRowgroup'),
    addRow: Symbol('addRow'),
    addGridcell: Symbol('addGridcell'),
    setFocused: Symbol('setFocused'),
  },
  list: {
    addRow: Symbol('addRow'),
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

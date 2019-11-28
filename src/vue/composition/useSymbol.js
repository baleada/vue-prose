const symbols = {
  layout: {
    messages: Symbol('messages'),
    fullPath: Symbol('fullPath'),
    addHeading: Symbol('addHeading'),
  },
  article: {
    setFrontMatter: Symbol('setFrontMatter'),
    setStats: Symbol('setStats'),
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

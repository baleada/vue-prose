import { computed, watch } from '@vue/composition-api'

export default function(getters) {
  const { focused, focusableColumns, focusableRows, grid } = getters

  const handlers = {
    arrowright: evt => {
      // → Moves focus one cell to the right. If focus is on the right-most cell in the row, focus does not move.
      const lastColumnIsFocused = focused().gridcell === columns()[columns().length - 1]
      if (!lastColumnIsFocused) {
        focused().gridcell = columns()[currentColumnIndex + 1]
      }
    },
    arrowleft: evt => {
      // ← Moves focus one cell to the left. If focus is on the left-most cell in the row, focus does not move.
      const firstColumnIsFocused = focused().gridcell === columns()[0]
      if (!firstColumnIsFocused) {
        focused().gridcell = columns()[currentColumnIndex - 1]
      }
    },
    arrowdown: evt => {
      // ↓ Moves focus one cell down. If focus is on the bottom cell in the column, focus does not move.
      const lastRowIsFocused = focused().row + focused().rowgroup === rows()[rows().length - 1]
      if (!lastRowIsFocused) {
        focused().rowgroup = 1
        focused().row = rows()[currentRowIndex + 1] - 1
      }
    },
    arrowup: evt => {
      // ↑ Moves focus one cell up. If focus is on the top cell in the column, focus does not move.
      const headerRowIsFocused = focused().rowgroup === 0,
            firstRowIsFocused = headerRowIsFocused ? false : focused().row + focused().rowgroup === rows()[1]

      if (!headerRowIsFocused) {
        if (firstRowIsFocused) {
          focused().rowgroup = 0
          focused().row = 0
        } else {
          focused().rowgroup = 1
          focused().row = rows()[currentRowIndex - 1] - 1
        }
      }
    },
    home: evt => {
      // Home Moves focus to the first cell in the row that contains focus
      focused().gridcell = columns()[0]
    },
    end: evt => {
      // End Moves focus to the last cell in the row that contains focus.
      focused().gridcell = columns()[columns().length - 1]
    },
    'meta+arrowleft': function(evt) {
      this.home(evt)
    },
    'meta+arrowright': function(evt) {
      this.end(evt)
    },
    'meta+arrowup': function(evt) {
      focused().rowgroup = 0
      focused().row = 0
    },
    'meta+arrowdown': evt => {
      focused().rowgroup = 1
      focused().row = rows()[rows().length - 1] - 1
    },
    'meta+home': evt => {
      // ctrl + Home Moves focus to the first cell in the first row.
      focused().rowgroup = 0
      focused().row = 0
      focused().gridcell = 0
    },
    'meta+end': evt => {
      // ctrl + End Moves focus to the last cell in the last row.
      focused().rowgroup = 1
      focused().row = rows()[rows().length - 1] - 1
      focused().gridcell = columns()[columns().length - 1]
    },
  }
  // Page Down Moves focus down an author-determined number of rows, typically scrolling so the bottom row in the currently visible set of rows becomes one of the first visible rows(). If focus is in the last row of the grid, focus does not move.
  // Page Up Moves focus up an author-determined number of rows, typically scrolling so the top row in the currently visible set of rows becomes one of the last visible rows(). If focus is in the first row of the grid, focus does not move.

  function handler (evt) {
    const key = evt.key.toLowerCase()

    if (grid().isSameNode(document.activeElement)) {
      if (handlers.hasOwnProperty(key)) {
        evt.preventDefault()
        grid().querySelector('[role="columnheader"]').focus()
      }
    } else if (evt.ctrlKey || evt.metaKey) {
      if (handlers.hasOwnProperty(`meta+${key}`)) {
        evt.preventDefault()
        handlers[`meta+${key}`](evt)
      }
    } else if (handlers.hasOwnProperty(key)) {
      evt.preventDefault()
      handlers[key](evt)
    }
  }

  return handler
}

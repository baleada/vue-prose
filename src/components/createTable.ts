import { defineComponent, h } from 'vue'
import { toClassList } from '../extracted'
import { useTable } from '../composition'
import type { Config } from '../config'

export type CreateTable = typeof createTable

export type TableOptional = {
  readerCanSearch?: boolean,
  searchIsCaseSensitive?: boolean,
  minimumSearchScore?: number,
  readerCanChangeSearchCaseSensitivity?: boolean,
  classes?: string,
}

export type TableProps = TableOptional & {
  totalBodyRows: number,
  totalColumns: number,
  ariaLabel: string,
}

export const createTable = (config: Config) => defineComponent({
  name: config.componentNames.table,
  setup (props, { slots }) {
    const messages = config.messages.table,
          table = useTable(
            {
              totalBodyRows: props.totalBodyRows,
              totalColumns: props.totalColumns,
              ariaLabel: props.ariaLabel,
              searchIsCaseSensitive: props.searchIsCaseSensitive,
              minimumSearchScore: props.minimumSearchScore,
              readerCanSearch: props.readerCanSearch,
              readerCanChangeSearchCaseSensitivity: props.readerCanChangeSearchCaseSensitivity,
            }
          )
    
    return () => h(
      'section',
      {
        class: toClassList('baleada-prose-table', props.classes),
      },
      [
        ...(
          props.readerCanSearch
            ? [h(
              'div',
              [
                h(
                  'input',
                  {
                    ref: table.queryInput.ref,
                    placeholder: messages.searchPlaceholder,
                    name: 'Search by query',
                    type: 'text',
                  }
                )
              ]
            )]
            : []
        ),
        ...(
          props.readerCanSearch && props.readerCanChangeSearchCaseSensitivity
            ? [h(
              'div',
              [
                h(
                  'input',
                  {
                    ref: table.searchIsCaseSensitiveCheckbox.ref,
                    placeholder: messages.searchPlaceholder,
                    name: 'Change search case sensitivity',
                    type: 'checkbox',
                  }
                ),
                h(
                  'label',
                  [
                    messages.changeSearchCaseSensitivityLabel
                  ]
                )
              ]
            )]
            : []
        ),
        h(
          'section',
          {
            class: 'baleada-prose-contents',
          },
          [
            h(
              'div',
              {
                ref: table.root.ref
              },
              [
                h(
                  'div',
                  {
                    ref: table.header.rowGroup.ref,
                  },
                  [
                    h(
                      'div',
                      {
                        ref: table.header.row.ref,
                      },
                      table.header.cells.map(({ id, ref }) => slots[`${table.header.rowGroup.id}-${table.header.row.id}-${id}`]({ ref, key: id}))
                    )
                  ]
                ),
                h(
                  'div',
                  {
                    ref: table.body.rowGroup.ref,
                  },
                  table.body.rows.map(({ id: rowId, ref: rowRef }, rowIndex) => h(
                    'div',
                    {
                      ref: rowRef,
                      key: rowId,
                    },
                    table.body.cellsByRow[rowIndex].map(({ id: cellId, ref: cellRef }) => slots[`${table.body.rowGroup.id}-${rowId}-${cellId}`]({ ref: cellRef, key: cellId }))
                  ))
                )
              ]
            )
          ]
        )
      ]
    )
  },
  props: {
    totalBodyRows: {
      type: Number,
      required: true,
    },
    totalColumns: {
      type: Number,
      required: true,
    },
    ariaLabel: {
      type: String,
      required: true,
    },
    readerCanSearch: {
      default: config.propDefaults.table.readerCanSearch,
    },
    searchIsCaseSensitive: {
      default: config.propDefaults.table.searchIsCaseSensitive,
    },
    readerCanChangeSearchCaseSensitivity: {
      default: config.propDefaults.table.readerCanChangeSearchCaseSensitivity,
    },
    minimumSearchScore: {
      default: config.propDefaults.table.minimumSearchScore,
    },
    classes: {
      default: config.propDefaults.table.classes,
    }
  }
})

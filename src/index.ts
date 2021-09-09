import { createAside } from './components/createAside'
import { createBlockquote } from './components/createBlockquote'
import { createCodeblock } from './components/createCodeblock'
import { createDetails } from './components/createDetails'
import { createHeading } from './components/createHeading'
// import { createList } from './components/createList'
import { createMedia } from './components/createMedia'
import { createSection } from './components/createSection'
// import { createTable } from './components/createTable'
import { createProse } from './createProse'
import { useStore, useEffects } from './composition'

export {
  // Setup
  createProse,
  useStore,
  useEffects,

  // Components
  createAside,
  createBlockquote,
  createCodeblock,
  createDetails,
  createHeading,
  // createList,
  createMedia,
  createSection,
  // createTable,
}

// Exported for ease of configuring all
export const components = [
  createAside,
  createBlockquote,
  createCodeblock,
  createDetails,
  createHeading,
  // createList,
  createMedia,
  createSection,
  // createTable,
]

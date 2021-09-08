// This function is a type-unsafe workaround. Waiting for `defineProps` and `withDefaults`
// to support imported and/or non-literal values in `script setup`.
import { config } from "../state";
import type { Config } from "../state";
import type { AsideProps } from '../components/propTypes'
import type { BlockquoteProps } from '../components/propTypes'
import type { CodeblockProps } from '../components/propTypes'
import type { DetailsProps } from '../components/propTypes'
import type { HeadingProps } from '../components/propTypes'
import type { ListProps } from '../components/propTypes'
import type { MediaProps } from '../components/propTypes'
import type { SectionProps } from '../components/propTypes'
import type { TableProps } from '../components/propTypes'

type PropsByComponent<Component> = 
  Component extends 'aside' ? AsideProps :
  Component extends 'blockquote' ? BlockquoteProps :
  Component extends 'codeblock' ? CodeblockProps :
  Component extends 'details' ? DetailsProps :
  Component extends 'heading' ? HeadingProps :
  Component extends 'list' ? ListProps :
  Component extends 'media' ? MediaProps :
  Component extends 'section' ? SectionProps :
  Component extends 'table' ? TableProps :
  never

export function createGetWithConfiguredDefaults<Component extends keyof Config['propDefaults']> (component: Component): (props: PropsByComponent<Component>) => PropsByComponent<Component> {
  return (props: PropsByComponent<Component>) => {
    const withConfiguredDefaults = { ...props }

    // If a prop was not passed, Vue will explicitly set it to `undefined`
    for (const prop in config.propDefaults[component]) {
      if (props[prop] === undefined) {
        // This type unsafety is the primary downside of the current approach.
        // @ts-ignore
        withConfiguredDefaults[prop] = config.propDefaults[component][prop]
      }
    }

    return withConfiguredDefaults as PropsByComponent<Component>
  }
}

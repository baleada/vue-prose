import { defineComponent } from 'vue'

export function toIconComponent (render: Parameters<typeof defineComponent>[0]['render']) {
  return defineComponent({ render })
}

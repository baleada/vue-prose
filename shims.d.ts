declare module '*.svg' {
  import { defineComponent } from 'vue';
  const render: Parameters<typeof defineComponent>[0]['render'];
  export { render };
}

declare module '*.vue' {
  import type { Component } from 'vue';
  const component: Component;
  export default component;
}


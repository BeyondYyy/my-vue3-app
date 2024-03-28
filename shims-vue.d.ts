declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const Component: DefineComponent
  export default Component
}

declare module '@/components/mouse.js'

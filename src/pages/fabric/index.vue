<template>
  <div>
    <canvas id="canvas" width="800" height="600"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'FabricCanvas',
  setup() {
    onMounted(async () => {
      // 动态导入 fabric
      const fabricModule = await import('fabric')
      const fabric = fabricModule.default || fabricModule

      // 不可交互
      // const canvas = new fabric.StaticCanvas('canvas')

      // 可交互
      // const canvas = new fabric.Canvas('canvas', {
      //   backgroundColor: '#eee',
      // });

      const canvas = new fabric.Canvas('canvas')
      const img =
        'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/27d1b4e5f8824198b6d51a2b1c2d0d75~tplv-k3u1fbpfcp-zoom-crop-mark:400:400:400:400.awebp'

      // canvas.setBackgroundImage(img,
      //     canvas.renderAll.bind(canvas)
      // )

      const rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'red',
        width: 100,
        height: 100,
      })
      canvas.add(rect)

      const line = new fabric.Circle({
        left: 300,
        top: 100,
        radius: 50,
        fill: '#99f',
      })
      canvas.add(line)

      const pipeline = new fabric.Line([50, 100, 200, 100], {
        stroke: 'black',
        strokeWidth: 5,
      })
      canvas.add(pipeline)

      const valve = new fabric.Circle({
        radius: 30,
        fill: 'lightblue',
        stroke: 'black',
        left: 150,
        top: 200,
      })
      canvas.add(valve)

      const pumpBody = new fabric.Rect({
        left: 300,
        top: 200,
        width: 100,
        height: 50,
        fill: 'gray',
        stroke: 'black',
      })
      canvas.add(pumpBody)

      const label = new fabric.Text('P-101', {
        left: 150,
        top: 300,
        fontSize: 20,
        fill: 'black',
      })
      canvas.add(label)
    })
  },
})
</script>

<style scoped>
#canvas {
  border: 1px solid #ccc;
}
</style>

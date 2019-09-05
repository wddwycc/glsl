// @ts-ignore
import raw from 'raw.macro'
import React, { useEffect } from 'react'

const getRenderContext = () => {
  const canvas = document.querySelector('canvas')
  if (!canvas) return
  const gl = canvas.getContext('webgl')
  if (!gl) return
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
  gl.clearColor(0, 0, 0, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  return gl
}

const App: React.FC = () => {
  useEffect(() => {
    const gl = getRenderContext()
    if (!gl) return

    const vertShader = gl.createShader(gl.VERTEX_SHADER)
    if (!vertShader) return

    const fragShader = gl.createShader(gl.FRAGMENT_SHADER)
    if (!fragShader) return

    gl.shaderSource(vertShader, raw('./shader.vert'))
    gl.compileShader(vertShader)

    gl.shaderSource(fragShader, raw('./shader.frag'))
    gl.compileShader(fragShader)

    const program = gl.createProgram()
    if (!program) return

    gl.attachShader(program, vertShader)
    gl.attachShader(program, fragShader)
    gl.linkProgram(program)
    gl.detachShader(program, vertShader)
    gl.detachShader(program, fragShader)
    gl.deleteShader(vertShader)
    gl.deleteShader(fragShader)

    gl.useProgram(program)
    gl.drawArrays(gl.POINTS, 0, 1)
  }, [])

  return (
    <div id="container">
      <canvas width={500} height={500} />
    </div>
  )
}

export default App

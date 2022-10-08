import React, { useState, useCallback, useRef } from "react"
import produce from "immer"

const numRows = 100
const numCols = 100

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0]
]

const generateEmptyGrid = () => {
  const rows = []
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0))
  }

  return rows
}

const App = () => {
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid()
  })

  const [running, setRunning] = useState(false)

  const runningRef = useRef(running)
  runningRef.current = running

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return
    }

    setGrid(g => {
      return produce(g, gridCopy => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0
            operations.forEach(([x, y]) => {
              const newI = i + x
              const newK = k + y
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK]
              }
            })

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1
            }
          }
        }
      })
    })

    setTimeout(runSimulation, 20)
  }, [])

  return (
    <div style={container}>
      <div>
        <button
          style={btnStyle}
          onClick={() => {
            setRunning(!running)
            if (!running) {
              runningRef.current = true
              runSimulation()
            }
          }}
        >
          {running ? "stop" : "start"}
        </button>
        <button
          style={btnStyle}
          onClick={() => {
            const rows = []
            for (let i = 0; i < numRows; i++) {
              rows.push(
                Array.from(Array(numCols), () => (Math.random() > 0.75 ? 1 : 0))
              )
            }

            setGrid(rows)
          }}
        >
          random
        </button>
        <button
          style={btnStyle}
          onClick={() => {
            setGrid(generateEmptyGrid())
            if (running) {
              setRunning(!running)
            }
          }}
        >
          clear
        </button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 18px)`,
          gridTemplateRows: `repeat(${numRows}, 18px)`
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              key={`${i}-${k}`}
              onClick={() => {
                const newGrid = produce(grid, gridCopy => {
                  gridCopy[i][k] = grid[i][k] ? 0 : 1
                })
                setGrid(newGrid)
              }}
              style={{
                width: 18,
                height: 18,
                backgroundColor: grid[i][k] ? "#e0f6ff" : undefined,
                border: "1px solid rgba(2, 12, 120, 0.3)"
              }}
            />
          ))
        )}
      </div>
    </div>
  )
}

const container = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "#000"
}

const btnStyle = {
  border: "none",
  background: "#111",
  color: "white",
  fontSize: "16px",
  padding: "0.5rem 1rem",
  margin: "0.75rem 2px"
}

export default App

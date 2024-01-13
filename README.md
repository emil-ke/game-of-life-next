# Conway's Game of Life Implementation

![Preview](public/preview.gif)

*Conway's Game of Life* is a cellular automaton, played on--theoretically--an infinite
two-dimensional grid of cells. Each cell is either
dead or alive. The state of the cell changes based on the game's rules.
Each cell interacts with its eight neighboring cells (think a 3-by-3 matrix:
the middle position has eight adjacent neighbors, including its near-most
horizontal, vertical, and diagonal neighbors). At each time-step, the following
transitions occur:

1. Any live cell with fewer than two live neighbors dies, due to underpopulation.
2. Any live cell with two or three live neighbors survives to the next generation.
3. Any live cell with more than three live neighbors dies, due to overpopulation.
4. Any dead cell with exactly three live neighbors becomes alive, as if by reproduction.

What emerges from these simple rules is surprisingly complex and life-like.

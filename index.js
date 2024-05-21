function knightMoves(start, target) {}

function generateGraph(graph = [], capacity = 8) {
  const length = graph.length;
  if (length >= capacity) return graph;

  graph[length] = [];
  for (let i = 0; i < capacity; ++i) {
    const vertices = getAllVertices(i, graph.length);
    graph[length].push(vertices);
  }
  generateGraph(graph);

  return graph;

  function getAllVertices(xPosition = 0, yPosition = 0) {
    const currentPosition = [xPosition, yPosition];
    let knightDirections = [
      [1, 2],
      [-1, 2],
      [2, 1],
      [2, -1],
      [1, -2],
      [-1, -2],
      [-2, 1],
      [-2, -1],
    ];
    let vertices = [];

    for (let i = 0; i < knightDirections.length; ++i) {
      const [x, y] = currentPosition;
      const [c, d] = knightDirections[i];

      const [newX, newY] = [x + c, y + d];

      //Only push knight movements that stay within bounds.
      if (0 <= newX && 0 <= newY && capacity > newX && capacity > newY) {
        vertices.push([newX, newY]);
      }
    }
  }
}

console.log(generateGraph());

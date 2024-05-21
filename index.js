function knightMoves(start, target) {}

const KNIGHT_MOVESET = [
  [1, 2],
  [-1, 2],
  [2, 1],
  [2, -1],
  [1, -2],
  [-1, -2],
  [-2, 1],
  [-2, -1],
];

function generateGraph(moveset) {
  const capacity = 8;
  let graph = [];

  for (let x = 0; x < capacity; ++x) {
    graph[x] = [];
    // Iterate through Y axis
    for (let y = 0; y < capacity; ++y) {
      const vertices = getAllVertices(x, y);
      graph[x].push(vertices);
    }
  }

  return graph;

  // Gets all valid knight moves from x,y position
  function getAllVertices(xPosition = 0, yPosition = 0) {
    const vertices = moveset.map(([dx, dy]) => [
      xPosition + dx,
      yPosition + dy,
    ]);

    // Only return knight movements that stay within bounds.
    const filteredVertices = vertices.filter(
      ([newX, newY]) =>
        newX >= 0 && newX < capacity && newY >= 0 && newY < capacity
    );
    return filteredVertices;
  }
}

console.log(generateGraph(KNIGHT_MOVESET));

function knightMoves(start, target) {
  const graph = generateGraph(KNIGHT_MOVESET);

  //If start || target is out of bounds
  for (item of start.concat(target)) {
    if (item > graph.length - 1) return null;
  }

  return breadthFirstSearch(graph, start, target);
}

//All possible knight moves
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

  //Iterate through X axis
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

function breadthFirstSearch(graph, startVertex, target) {
  const [startX, startY] = startVertex;
  const [targetX, targetY] = target;
  let queue = [graph[startX][startY]];

  while (queue[0]) {
    const currentVertex = queue.shift();

    for (item of currentVertex) {
      const [x, y] = item;
      queue.push(graph[x][y]);

      if (x === targetX && y === targetY)
        return `Your target was reached within ${'???'} moves. [${[x, y]}]`;
    }
  }
}

console.log(knightMoves([0, 0], [3, 5]));
// console.log(generateGraph(KNIGHT_MOVESET));

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

  // Gets all knight moves from x,y position
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
  let queue = [[startX, startY]];
  let parent = {};
  parent[`${startX},${startY}`] = null;

  while (queue.length > 0) {
    const [currentX, currentY] = queue.shift();
    const currentVertex = graph[currentX][currentY];

    for (const [x, y] of currentVertex) {
      if (!(parent[`${x},${y}`] !== undefined)) {
        queue.push([x, y]);
        parent[`${x},${y}`] = [currentX, currentY];

        if (x === targetX && y === targetY) {
          return constructPath(parent, target);
        }
      }
    }
  }

  return null;

  function constructPath(parent, target) {
    let path = [];
    let currentNode = target;

    while (currentNode) {
      path.push(currentNode);
      currentNode = parent[`${currentNode[0]},${currentNode[1]}`];
    }

    path.reverse();
    return `Your target was reached in ${path.length - 1} moves. Path: ${path
      .map((p) => `[${p}]`)
      .join(' -> ')}`;
  }
}

console.log(knightMoves([0, 0], [3, 5]));
// console.log(generateGraph(KNIGHT_MOVESET));

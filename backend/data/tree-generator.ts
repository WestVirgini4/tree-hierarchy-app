interface Node {
  id: string;
  parentId: string | null;
  name: string;
  hasChildren: boolean;
}

export function generateTree(breadth = 20, depth = 10): Node[] {
  const nodes: Node[] = [];
  let counter = 1;

  // Generate root nodes
  for (let i = 0; i < Math.min(breadth, 5); i++) {
    const id = (counter++).toString();
    nodes.push({
      id,
      parentId: null,
      name: `Root ${i + 1}`,
      hasChildren: depth > 1
    });

    // Generate children recursively
    if (depth > 1) {
      generateChildren(nodes, id, breadth, depth - 1, counter);
    }
  }

  return nodes;
}

function generateChildren(nodes: Node[], parentId: string, breadth: number, remainingDepth: number, counter: number) {
  for (let i = 0; i < Math.min(breadth, 10); i++) {
    const id = (counter++).toString();
    nodes.push({
      id,
      parentId,
      name: `Node ${id}`,
      hasChildren: remainingDepth > 1
    });

    if (remainingDepth > 1) {
      generateChildren(nodes, id, breadth, remainingDepth - 1, counter);
    }
  }
}
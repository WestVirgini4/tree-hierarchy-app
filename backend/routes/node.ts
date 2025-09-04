import { Router, Request, Response } from 'express';
import { generateTree } from '../data/tree-generator';

const router = Router();

interface Node {
  id: string;
  parentId: string | null;
  name: string;
  hasChildren: boolean;
}

let nodes: Node[] = [];

// Auto-generate initial data
nodes = generateTree(5, 3);

// Seed endpoint
router.post('/dev/seed', (req: Request, res: Response) => {
  const breadth = parseInt(req.query.breadth as string) |  20;
  const depth = parseInt(req.query.depth as string) || 10;
  
  nodes = generateTree(breadth, depth);
  
  res.json({
    nodes: nodes.length,
    maxDepth: depth,
    message: 'Tree generated successfully'
  });
});

// Root nodes
router.get('/api/nodes/root', (req: Request, res: Response) => {
  res.json(nodes.filter(n => !n.parentId));
});

// Children nodes
router.get('/api/nodes/:id/children', (req: Request, res: Response) => {
  const children = nodes.filter(n => n.parentId === req.params.id);
  res.json(children);
});

// Search nodes
router.get('/api/search', (req: Request, res: Response) => {
  const q = req.query.q as string;
  const results = nodes
    .filter(n => n.name.toLowerCase().includes(q?.toLowerCase() || ''))
    .map(n => ({
      id: n.id,
      name: n.name,
      path: [{ id: n.id, name: n.name }]
    }));
  res.json(results);
});

export default router;
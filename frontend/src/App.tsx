import { useState, useEffect } from 'react';

interface Node {
  id: string;
  parentId: string | null;
  name: string;
  hasChildren: boolean;
}

const TreeNode = ({ node, expanded, onToggle, children }: any) => (
  <div className="group">
    <div className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">
      {node.hasChildren && (
        <button 
          onClick={() => onToggle(node.id)} 
          className="mr-3 w-5 h-5 flex items-center justify-center text-sm text-blue-500 hover:bg-blue-100 rounded transition-colors"
        >
          {expanded ? '📂' : '📁'}
        </button>
      )}
      <span className="text-gray-700 font-medium">{node.name}</span>
    </div>
    {expanded && children && <div className="ml-6 border-l-2 border-gray-100 pl-4">{children}</div>}
  </div>
);

export default function App() {
  const [nodes, setNodes] = useState<Map<string, Node>>(new Map());
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [children, setChildren] = useState<Map<string, Node[]>>(new Map());
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/nodes/root')
      .then(r => r.json())
      .then(data => {
        const nodeMap = new Map();
        data.forEach((n: Node) => nodeMap.set(n.id, n));
        setNodes(nodeMap);
      });
  }, []);

  useEffect(() => {
    if (search.length > 2) {
      fetch(`http://localhost:3001/api/search?q=${search}`)
        .then(r => r.json())
        .then(data => setSearchResults(data));
    } else {
      setSearchResults([]);
    }
  }, [search]);

  const toggleNode = async (id: string) => {
    if (expanded.has(id)) {
      setExpanded(prev => new Set([...prev].filter(x => x !== id)));
    } else {
      setExpanded(prev => new Set([...prev, id]));
      if (!children.has(id)) {
        const res = await fetch(`http://localhost:3001/api/nodes/${id}/children`);
        const data = await res.json();
        setChildren(prev => new Map(prev).set(id, data));
        data.forEach((n: Node) => setNodes(prev => new Map(prev).set(n.id, n)));
      }
    }
  };

  const renderTree = (nodeId: string): any => {
    const node = nodes.get(nodeId);
    if (!node) return null;
    const isExpanded = expanded.has(nodeId);
    const nodeChildren = children.get(nodeId) || [];
    
    return (
      <TreeNode
        key={nodeId}
        node={node}
        expanded={isExpanded}
        onToggle={toggleNode}
      >
        {nodeChildren.map(child => renderTree(child.id))}
      </TreeNode>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">T</div>
            <h1 className="text-2xl font-bold text-gray-800">Tree Hierarchy</h1>
          </div>
          
          <div className="mb-6">
            <input
              type="text"
              placeholder="🔍 Search nodes..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            {searchResults.length > 0 ? (
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-3">Search Results:</h3>
                {searchResults.map(result => (
                  <div key={result.id} className="p-2 bg-yellow-100 rounded mb-2">
                    <span className="font-medium">{result.name}</span>
                  </div>
                ))}
              </div>
            ) : search.length > 2 ? (
              <div className="text-gray-500 text-center py-8">No results found for "{search}"</div>
            ) : (
              Array.from(nodes.values())
                .filter(n => !n.parentId)
                .map(node => renderTree(node.id))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
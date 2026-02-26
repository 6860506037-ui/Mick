export type StructureType = 'linear' | 'non-linear';

export interface DataStructure {
  id: string;
  name: string;
  type: StructureType;
  description: string;
  properties: string[];
  complexity: {
    access: string;
    search: string;
    insertion: string;
    deletion: string;
  };
}

export const DATA_STRUCTURES: DataStructure[] = [
  {
    id: 'array',
    name: 'Array',
    type: 'linear',
    description: 'A collection of elements identified by index or key. Elements are stored in contiguous memory locations.',
    properties: ['Fixed size (usually)', 'Fast access by index', 'Contiguous memory'],
    complexity: { access: 'O(1)', search: 'O(n)', insertion: 'O(n)', deletion: 'O(n)' }
  },
  {
    id: 'stack',
    name: 'Stack',
    type: 'linear',
    description: 'A collection of elements that follows the LIFO (Last-In-First-Out) principle.',
    properties: ['Push/Pop operations', 'Top element access', 'LIFO'],
    complexity: { access: 'O(n)', search: 'O(n)', insertion: 'O(1)', deletion: 'O(1)' }
  },
  {
    id: 'queue',
    name: 'Queue',
    type: 'linear',
    description: 'A collection of elements that follows the FIFO (First-In-First-Out) principle.',
    properties: ['Enqueue/Dequeue operations', 'Front/Rear access', 'FIFO'],
    complexity: { access: 'O(n)', search: 'O(n)', insertion: 'O(1)', deletion: 'O(1)' }
  },
  {
    id: 'linked-list',
    name: 'Linked List',
    type: 'linear',
    description: 'A linear collection of data elements called nodes, where each node points to the next.',
    properties: ['Dynamic size', 'Efficient insertion/deletion', 'Non-contiguous memory'],
    complexity: { access: 'O(n)', search: 'O(n)', insertion: 'O(1)', deletion: 'O(1)' }
  },
  {
    id: 'tree',
    name: 'Tree',
    type: 'non-linear',
    description: 'A hierarchical structure with a root value and subtrees of children with a parent node.',
    properties: ['Hierarchical', 'Root node', 'Parent-Child relationship'],
    complexity: { access: 'O(log n)', search: 'O(log n)', insertion: 'O(log n)', deletion: 'O(log n)' }
  },
  {
    id: 'graph',
    name: 'Graph',
    type: 'non-linear',
    description: 'A set of vertices (nodes) and edges that connect pairs of vertices.',
    properties: ['Vertices and Edges', 'Directed or Undirected', 'Weighted or Unweighted'],
    complexity: { access: 'N/A', search: 'O(V + E)', insertion: 'O(1)', deletion: 'O(1)' }
  }
];

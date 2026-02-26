import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as d3 from 'd3';
import { 
  Layers, 
  Database, 
  GitCommit, 
  ArrowRightLeft, 
  Network, 
  ChevronRight,
  Info,
  Code2,
  Play,
  RotateCcw,
  Plus,
  Minus
} from 'lucide-react';
import { DATA_STRUCTURES, DataStructure } from './types';

// --- Components ---

interface SidebarItemProps {
  key?: string | number;
  item: DataStructure;
  isActive: boolean;
  onClick: () => void;
}

const SidebarItem = ({ 
  item, 
  isActive, 
  onClick 
}: SidebarItemProps) => {
  const Icon = item.id === 'array' ? Database :
               item.id === 'stack' ? Layers :
               item.id === 'queue' ? ArrowRightLeft :
               item.id === 'linked-list' ? GitCommit :
               item.id === 'tree' ? Network : Network;

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        isActive 
          ? 'bg-black text-white shadow-lg shadow-black/10' 
          : 'hover:bg-black/5 text-gray-600'
      }`}
    >
      <Icon size={18} />
      <span className="font-medium text-sm">{item.name}</span>
      {isActive && <motion.div layoutId="active-pill" className="ml-auto"><ChevronRight size={14} /></motion.div>}
    </button>
  );
};

const ComplexityBadge = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">{label}</span>
    <span className="font-mono text-sm font-semibold text-gray-800">{value}</span>
  </div>
);

// --- Visualizers ---

const ArrayVisualizer = () => {
  const [elements, setElements] = useState([10, 20, 30, 40, 50]);
  
  return (
    <div className="flex flex-col gap-8 items-center py-12">
      <div className="flex gap-2">
        {elements.map((val, i) => (
          <motion.div
            key={i}
            layout
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-16 h-16 flex flex-col items-center justify-center border-2 border-black rounded-lg bg-white relative"
          >
            <span className="text-xl font-bold">{val}</span>
            <span className="absolute -bottom-6 text-xs font-mono text-gray-400">[{i}]</span>
          </motion.div>
        ))}
      </div>
      <div className="flex gap-4">
        <button 
          onClick={() => setElements([...elements, Math.floor(Math.random() * 100)])}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <Plus size={16} /> Push
        </button>
        <button 
          onClick={() => setElements(elements.slice(0, -1))}
          className="flex items-center gap-2 px-4 py-2 border border-black rounded-lg text-sm font-medium hover:bg-black/5 transition-colors"
        >
          <Minus size={16} /> Pop
        </button>
      </div>
    </div>
  );
};

const StackVisualizer = () => {
  const [stack, setStack] = useState([10, 20, 30]);
  
  return (
    <div className="flex flex-col gap-8 items-center py-12">
      <div className="flex flex-col-reverse gap-2 border-b-4 border-x-4 border-black p-2 pt-8 rounded-b-xl min-w-[120px]">
        <AnimatePresence mode="popLayout">
          {stack.map((val, i) => (
            <motion.div
              key={val + '-' + i}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="w-24 h-12 flex items-center justify-center bg-black text-white rounded-md shadow-md"
            >
              <span className="font-bold">{val}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="flex gap-4">
        <button 
          onClick={() => setStack([...stack, Math.floor(Math.random() * 100)])}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <Plus size={16} /> Push
        </button>
        <button 
          onClick={() => setStack(stack.slice(0, -1))}
          className="flex items-center gap-2 px-4 py-2 border border-black rounded-lg text-sm font-medium hover:bg-black/5 transition-colors"
        >
          <Minus size={16} /> Pop
        </button>
      </div>
    </div>
  );
};

const QueueVisualizer = () => {
  const [queue, setQueue] = useState([10, 20, 30]);
  
  return (
    <div className="flex flex-col gap-8 items-center py-12">
      <div className="flex gap-2 items-center">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mr-4">Front</span>
        <div className="flex gap-2 p-4 border-y-2 border-black/10">
          <AnimatePresence mode="popLayout">
            {queue.map((val, i) => (
              <motion.div
                key={val + '-' + i}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                className="w-16 h-16 flex items-center justify-center bg-white border-2 border-black rounded-lg"
              >
                <span className="font-bold">{val}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">Rear</span>
      </div>
      <div className="flex gap-4">
        <button 
          onClick={() => setQueue([...queue, Math.floor(Math.random() * 100)])}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <Plus size={16} /> Enqueue
        </button>
        <button 
          onClick={() => setQueue(queue.slice(1))}
          className="flex items-center gap-2 px-4 py-2 border border-black rounded-lg text-sm font-medium hover:bg-black/5 transition-colors"
        >
          <Minus size={16} /> Dequeue
        </button>
      </div>
    </div>
  );
};

const LinkedListVisualizer = () => {
  const [nodes, setNodes] = useState([10, 20, 30]);
  
  return (
    <div className="flex flex-col gap-8 items-center py-12">
      <div className="flex items-center">
        {nodes.map((val, i) => (
          <React.Fragment key={i}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center"
            >
              <div className="flex flex-col border-2 border-black rounded-lg overflow-hidden bg-white">
                <div className="px-4 py-2 bg-black text-white text-center font-bold">{val}</div>
                <div className="px-4 py-1 text-[10px] text-center font-mono text-gray-500 border-t border-black/10">NEXT</div>
              </div>
              {i < nodes.length - 1 ? (
                <div className="w-12 h-0.5 bg-black relative">
                  <div className="absolute right-0 -top-1 border-t-4 border-l-4 border-transparent border-l-black w-2 h-2 rotate-45" />
                </div>
              ) : (
                <div className="w-12 h-0.5 bg-gray-200 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-gray-300">NULL</span>
                </div>
              )}
            </motion.div>
          </React.Fragment>
        ))}
      </div>
      <div className="flex gap-4">
        <button 
          onClick={() => setNodes([...nodes, Math.floor(Math.random() * 100)])}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <Plus size={16} /> Add Node
        </button>
        <button 
          onClick={() => setNodes(nodes.slice(0, -1))}
          className="flex items-center gap-2 px-4 py-2 border border-black rounded-lg text-sm font-medium hover:bg-black/5 transition-colors"
        >
          <Minus size={16} /> Remove Node
        </button>
      </div>
    </div>
  );
};

const TreeVisualizer = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 600;
    const height = 300;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const data = {
      name: "Root",
      children: [
        {
          name: "L1",
          children: [{ name: "L1.1" }, { name: "L1.2" }]
        },
        {
          name: "R1",
          children: [{ name: "R1.1" }, { name: "R1.2" }]
        }
      ]
    };

    const treeLayout = d3.tree().size([width - 100, height - 100]);
    const root = d3.hierarchy(data);
    treeLayout(root);

    const g = svg.append("g").attr("transform", "translate(50, 50)");

    // Links
    g.selectAll(".link")
      .data(root.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", d3.linkVertical()
        .x((d: any) => d.x)
        .y((d: any) => d.y) as any)
      .attr("fill", "none")
      .attr("stroke", "#000")
      .attr("stroke-width", 2);

    // Nodes
    const node = g.selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d: any) => `translate(${d.x},${d.y})`);

    node.append("circle")
      .attr("r", 20)
      .attr("fill", "#fff")
      .attr("stroke", "#000")
      .attr("stroke-width", 2);

    node.append("text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .style("font-weight", "bold")
      .text((d: any) => d.data.name);

  }, []);

  return (
    <div className="flex flex-col gap-4 items-center py-4">
      <svg ref={svgRef} width="600" height="300" className="overflow-visible" />
      <p className="text-xs text-gray-400 italic">Static representation of a Binary Tree</p>
    </div>
  );
};

const GraphVisualizer = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 600;
    const height = 300;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const nodes = [
      { id: "A" }, { id: "B" }, { id: "C" }, { id: "D" }, { id: "E" }
    ];
    const links = [
      { source: "A", target: "B" },
      { source: "B", target: "C" },
      { source: "C", target: "D" },
      { source: "D", target: "E" },
      { source: "E", target: "A" },
      { source: "A", target: "C" }
    ];

    const simulation = d3.forceSimulation(nodes as any)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .enter().append("line")
      .attr("stroke", "#000")
      .attr("stroke-width", 2);

    const node = svg.append("g")
      .selectAll("circle")
      .data(nodes)
      .enter().append("g");

    node.append("circle")
      .attr("r", 20)
      .attr("fill", "#fff")
      .attr("stroke", "#000")
      .attr("stroke-width", 2);

    node.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .style("font-weight", "bold")
      .text((d: any) => d.id);

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

  }, []);

  return (
    <div className="flex flex-col gap-4 items-center py-4">
      <svg ref={svgRef} width="600" height="300" className="overflow-visible" />
      <p className="text-xs text-gray-400 italic">Interactive Force-Directed Graph</p>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeId, setActiveId] = useState('array');
  const activeStructure = DATA_STRUCTURES.find(s => s.id === activeId)!;

  const renderVisualizer = () => {
    switch (activeId) {
      case 'array': return <ArrayVisualizer />;
      case 'stack': return <StackVisualizer />;
      case 'queue': return <QueueVisualizer />;
      case 'linked-list': return <LinkedListVisualizer />;
      case 'tree': return <TreeVisualizer />;
      case 'graph': return <GraphVisualizer />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F8F9FA]">
      {/* Sidebar */}
      <aside className="w-72 border-r border-black/5 bg-white p-6 flex flex-col gap-8">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white">
            <Database size={20} />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">DataStruct</h1>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Explorer v1.0</p>
          </div>
        </div>

        <nav className="flex flex-col gap-6">
          <div>
            <h2 className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Linear Structures</h2>
            <div className="flex flex-col gap-1">
              {DATA_STRUCTURES.filter(s => s.type === 'linear').map(item => (
                <SidebarItem 
                  key={item.id} 
                  item={item} 
                  isActive={activeId === item.id} 
                  onClick={() => setActiveId(item.id)} 
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Non-Linear Structures</h2>
            <div className="flex flex-col gap-1">
              {DATA_STRUCTURES.filter(s => s.type === 'non-linear').map(item => (
                <SidebarItem 
                  key={item.id} 
                  item={item} 
                  isActive={activeId === item.id} 
                  onClick={() => setActiveId(item.id)} 
                />
              ))}
            </div>
          </div>
        </nav>

        <div className="mt-auto p-4 bg-gray-50 rounded-2xl border border-black/5">
          <div className="flex items-center gap-2 mb-2">
            <Info size={14} className="text-gray-400" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Learning Tip</span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            {activeStructure.type === 'linear' 
              ? "Linear structures store data sequentially. Each element has a unique predecessor and successor."
              : "Non-linear structures represent complex relationships where one element can connect to many others."}
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 border-b border-black/5 bg-white/50 backdrop-blur-md px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
              activeStructure.type === 'linear' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
            }`}>
              {activeStructure.type}
            </span>
            <h2 className="text-2xl font-serif italic font-semibold">{activeStructure.name}</h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
              <RotateCcw size={20} className="text-gray-400" />
            </button>
            <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition-all">
              <Code2 size={16} />
              <span>View Code</span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 structure-grid">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Visualizer Card */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <motion.div 
                key={activeId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl border border-black/5 shadow-sm p-8 min-h-[450px] flex flex-col"
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">Interactive Visualizer</h3>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Live Preview</span>
                  </div>
                </div>
                
                <div className="flex-1 flex items-center justify-center">
                  {renderVisualizer()}
                </div>
              </motion.div>

              {/* Description Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-3xl border border-black/5 shadow-sm p-8"
              >
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Definition</h3>
                <p className="text-lg text-gray-700 leading-relaxed font-light">
                  {activeStructure.description}
                </p>
              </motion.div>
            </div>

            {/* Sidebar Info */}
            <div className="flex flex-col gap-6">
              {/* Complexity Card */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-black text-white rounded-3xl p-8 shadow-xl"
              >
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">Time Complexity</h3>
                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                  <ComplexityBadge label="Access" value={activeStructure.complexity.access} />
                  <ComplexityBadge label="Search" value={activeStructure.complexity.search} />
                  <ComplexityBadge label="Insertion" value={activeStructure.complexity.insertion} />
                  <ComplexityBadge label="Deletion" value={activeStructure.complexity.deletion} />
                </div>
              </motion.div>

              {/* Properties Card */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-3xl border border-black/5 shadow-sm p-8"
              >
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Key Properties</h3>
                <ul className="flex flex-col gap-4">
                  {activeStructure.properties.map((prop, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                      <span>{prop}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Quick Action */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-blue-600 rounded-3xl p-8 text-white relative overflow-hidden group cursor-pointer"
              >
                <div className="relative z-10">
                  <h3 className="text-lg font-bold mb-2">Take a Quiz</h3>
                  <p className="text-sm text-blue-100 mb-4">Test your knowledge on {activeStructure.name}s.</p>
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                    Start Now <ChevronRight size={16} />
                  </div>
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                  <Play size={120} fill="currentColor" />
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

"use client"

import { useCallback } from 'react'
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
  BackgroundVariant,
  ReactFlowProvider,
  Node,
  Edge,
  Connection,
  Handle,
  Position,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { GitGraph, MapPin, Sword, AlertCircle } from "lucide-react"



// Custom node components
const ChapterNode = ({ data }: { data: any }) => (
  <div className="px-4 py-3 rounded-xl bg-card border-2 border-amber-500/50 shadow-lg min-w-[150px]">
    <Handle type="target" position={Position.Top} className="w-3 h-3 bg-amber-500" />
    <div className="text-xs text-muted-foreground mb-1">章节 {data.chapter}</div>
    <div className="font-bold text-sm">{data.name}</div>
    {data.boss && (
      <div className="mt-1 px-2 py-0.5 rounded text-xs bg-red-500/20 text-red-500 inline-block">
        Boss战
      </div>
    )}
    <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-amber-500" />
  </div>
)

const RegionNode = ({ data }: { data: any }) => (
  <div className={`px-4 py-2 rounded-full text-white font-bold text-sm shadow-lg ${data.color}`}>
    <Handle type="target" position={Position.Top} className="w-2 h-2 bg-white" />
    {data.name}
    <Handle type="source" position={Position.Bottom} className="w-2 h-2 bg-white" />
  </div>
)

const StartNode = () => (
  <div className="px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold shadow-lg">
    <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-amber-500" />
    游戏开始
  </div>
)

const EndNode = () => (
  <div className="px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold shadow-lg">
    <Handle type="target" position={Position.Top} className="w-3 h-3 bg-purple-500" />
    游戏通关
  </div>
)

const nodeTypes = {
  chapter: ChapterNode,
  region: RegionNode,
  start: StartNode,
  end: EndNode,
}

const initialNodes: Node[] = [
  // Start
  { id: 'start', type: 'start', position: { x: 400, y: 0 }, data: {} },
  
  // Village Region
  { id: 'region-village', type: 'region', position: { x: 400, y: 80 }, data: { name: '村庄', color: 'bg-gradient-to-r from-emerald-500 to-green-600' } },
  { id: 'ch1', type: 'chapter', position: { x: 200, y: 160 }, data: { name: '猎杀开始', chapter: '1', boss: false } },
  { id: 'ch2', type: 'chapter', position: { x: 400, y: 160 }, data: { name: '村庄探索', chapter: '2', boss: true } },
  { id: 'ch3', type: 'chapter', position: { x: 600, y: 160 }, data: { name: '城堡入口', chapter: '3', boss: false } },
  
  // Castle Region
  { id: 'region-castle', type: 'region', position: { x: 400, y: 260 }, data: { name: '迪米特雷斯库城堡', color: 'bg-gradient-to-r from-purple-500 to-violet-600' } },
  { id: 'ch4', type: 'chapter', position: { x: 250, y: 340 }, data: { name: '城堡大厅', chapter: '4', boss: false } },
  { id: 'ch5', type: 'chapter', position: { x: 450, y: 340 }, data: { name: '三位女儿', chapter: '5', boss: true } },
  { id: 'ch6', type: 'chapter', position: { x: 650, y: 340 }, data: { name: '迪米特雷斯库夫人', chapter: '6', boss: true } },
  
  // Beneviento Region
  { id: 'region-beneviento', type: 'region', position: { x: 400, y: 440 }, data: { name: '贝内文托家', color: 'bg-gradient-to-r from-blue-500 to-cyan-600' } },
  { id: 'ch7', type: 'chapter', position: { x: 300, y: 520 }, data: { name: '人偶屋', chapter: '7', boss: false } },
  { id: 'ch8', type: 'chapter', position: { x: 500, y: 520 }, data: { name: '多娜·贝内文托', chapter: '8', boss: true } },
  
  // Reservoir Region
  { id: 'region-reservoir', type: 'region', position: { x: 400, y: 620 }, data: { name: '莫罗水库', color: 'bg-gradient-to-r from-cyan-500 to-teal-600' } },
  { id: 'ch9', type: 'chapter', position: { x: 300, y: 700 }, data: { name: '洪水区域', chapter: '9', boss: false } },
  { id: 'ch10', type: 'chapter', position: { x: 500, y: 700 }, data: { name: '莫罗', chapter: '10', boss: true } },
  
  // Factory Region
  { id: 'region-factory', type: 'region', position: { x: 400, y: 800 }, data: { name: '海森伯格工厂', color: 'bg-gradient-to-r from-orange-500 to-red-600' } },
  { id: 'ch11', type: 'chapter', position: { x: 300, y: 880 }, data: { name: '地下工厂', chapter: '11', boss: false } },
  { id: 'ch12', type: 'chapter', position: { x: 500, y: 880 }, data: { name: '海森伯格', chapter: '12', boss: true } },
  
  // Final Region
  { id: 'region-final', type: 'region', position: { x: 400, y: 980 }, data: { name: '最终决战', color: 'bg-gradient-to-r from-red-500 to-rose-600' } },
  { id: 'ch13', type: 'chapter', position: { x: 300, y: 1060 }, data: { name: '要塞', chapter: '13', boss: true } },
  { id: 'ch14', type: 'chapter', position: { x: 500, y: 1060 }, data: { name: '米兰达母亲', chapter: '14', boss: true } },
  
  // End
  { id: 'end', type: 'end', position: { x: 400, y: 1180 }, data: {} },
]

const initialEdges: Edge[] = [
  { id: 'e-start-village', source: 'start', target: 'region-village', animated: true, style: { stroke: '#f59e0b', strokeWidth: 3 } },
  
  { id: 'e-village-1', source: 'region-village', target: 'ch1', animated: true, style: { stroke: '#10b981' } },
  { id: 'e-village-2', source: 'region-village', target: 'ch2', animated: true, style: { stroke: '#10b981' } },
  { id: 'e-village-3', source: 'region-village', target: 'ch3', animated: true, style: { stroke: '#10b981' } },
  { id: 'e-ch1-ch2', source: 'ch1', target: 'ch2', style: { stroke: '#10b981' } },
  { id: 'e-ch2-ch3', source: 'ch2', target: 'ch3', style: { stroke: '#10b981' } },
  { id: 'e-ch3-castle', source: 'ch3', target: 'region-castle', animated: true, style: { stroke: '#f59e0b', strokeWidth: 3 } },
  
  { id: 'e-castle-4', source: 'region-castle', target: 'ch4', animated: true, style: { stroke: '#8b5cf6' } },
  { id: 'e-castle-5', source: 'region-castle', target: 'ch5', animated: true, style: { stroke: '#8b5cf6' } },
  { id: 'e-castle-6', source: 'region-castle', target: 'ch6', animated: true, style: { stroke: '#8b5cf6' } },
  { id: 'e-ch4-ch5', source: 'ch4', target: 'ch5', style: { stroke: '#8b5cf6' } },
  { id: 'e-ch5-ch6', source: 'ch5', target: 'ch6', style: { stroke: '#ef4444', strokeWidth: 2 } },
  { id: 'e-ch6-beneviento', source: 'ch6', target: 'region-beneviento', animated: true, style: { stroke: '#f59e0b', strokeWidth: 3 } },
  
  { id: 'e-beneviento-7', source: 'region-beneviento', target: 'ch7', animated: true, style: { stroke: '#3b82f6' } },
  { id: 'e-beneviento-8', source: 'region-beneviento', target: 'ch8', animated: true, style: { stroke: '#3b82f6' } },
  { id: 'e-ch7-ch8', source: 'ch7', target: 'ch8', style: { stroke: '#ef4444', strokeWidth: 2 } },
  { id: 'e-ch8-reservoir', source: 'ch8', target: 'region-reservoir', animated: true, style: { stroke: '#f59e0b', strokeWidth: 3 } },
  
  { id: 'e-reservoir-9', source: 'region-reservoir', target: 'ch9', animated: true, style: { stroke: '#06b6d4' } },
  { id: 'e-reservoir-10', source: 'region-reservoir', target: 'ch10', animated: true, style: { stroke: '#06b6d4' } },
  { id: 'e-ch9-ch10', source: 'ch9', target: 'ch10', style: { stroke: '#ef4444', strokeWidth: 2 } },
  { id: 'e-ch10-factory', source: 'ch10', target: 'region-factory', animated: true, style: { stroke: '#f59e0b', strokeWidth: 3 } },
  
  { id: 'e-factory-11', source: 'region-factory', target: 'ch11', animated: true, style: { stroke: '#f97316' } },
  { id: 'e-factory-12', source: 'region-factory', target: 'ch12', animated: true, style: { stroke: '#f97316' } },
  { id: 'e-ch11-ch12', source: 'ch11', target: 'ch12', style: { stroke: '#ef4444', strokeWidth: 2 } },
  { id: 'e-ch12-final', source: 'ch12', target: 'region-final', animated: true, style: { stroke: '#f59e0b', strokeWidth: 3 } },
  
  { id: 'e-final-13', source: 'region-final', target: 'ch13', animated: true, style: { stroke: '#ef4444' } },
  { id: 'e-final-14', source: 'region-final', target: 'ch14', animated: true, style: { stroke: '#ef4444' } },
  { id: 'e-ch13-ch14', source: 'ch13', target: 'ch14', style: { stroke: '#ef4444', strokeWidth: 3 } },
  { id: 'e-ch14-end', source: 'ch14', target: 'end', animated: true, style: { stroke: '#a855f7', strokeWidth: 4 } },
]

export default function FlowPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-amber-500/10">
            <GitGraph className="h-8 w-8 text-amber-500" />
          </div>
          <h1 className="text-4xl font-bold">流程图</h1>
        </div>
        <p className="text-xl text-muted-foreground">
          可拖拽的流程图，展示游戏章节和区域分布
        </p>
      </div>

      {/* Flow Chart */}
      <div className="bg-card rounded-xl border border-border overflow-hidden" style={{ height: '800px' }}>
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            minZoom={0.3}
            maxZoom={1.5}
            className="bg-background"
          >
            <Controls className="bg-card border-border" />
            <Background 
              variant={BackgroundVariant.Dots} 
              gap={20} 
              size={1}
              className="text-muted-foreground/20"
            />
          </ReactFlow>
        </ReactFlowProvider>
      </div>

      {/* Legend */}
      <div className="max-w-4xl mx-auto mt-8">
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-amber-500" />
            图例说明
          </h2>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500" />
              <span>区域节点</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-card border-2 border-amber-500" />
              <span>章节节点</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-500/20 border border-red-500" />
              <span>Boss战</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-1 bg-amber-500 rounded" />
              <span>主线流程</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-1 bg-green-500 rounded" />
              <span>村庄区域</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-1 bg-red-500 rounded" />
              <span>Boss路径</span>
            </div>
          </div>
          <div className="mt-4 p-3 rounded-lg bg-amber-500/5 border border-amber-500/20 text-sm text-muted-foreground">
            <AlertCircle className="h-4 w-4 inline mr-2 text-amber-500" />
            提示：你可以拖拽节点调整布局，使用鼠标滚轮缩放，点击并拖拽空白区域移动视图
          </div>
        </div>
      </div>
    </div>
  )
}

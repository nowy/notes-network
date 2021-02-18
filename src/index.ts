import { createNetwork } from './network';

interface NotesNetwork {
  nodes: {
    id: number
    label: string
    metaData: Record<string, string[]>
  }[]
  edges: { source: number, target: number }[]
}

const isSystemTag = (tag: string) => ['literature-note', 'index-card'].includes(tag);

(async () => {
  const notes = require('../dist/notes.json') as NotesNetwork
  const container = document.getElementById('network')

  if (!container) return

  const edges = notes.edges.map(({ source, target }) => ({ from: source, to: target }))
  const networkNodes = notes.nodes.map(node => ({
    ...node,
    value: Math.max(1, edges.filter(edge => edge.to === node.id || edge.from === node.id).length),
    group: node.metaData.tags?.filter(tag => !isSystemTag(tag))[0] ?? undefined
  }))

  const network = await createNetwork({
    container,
    edges,
    nodes: networkNodes
  })

  network.on('selectNode', ({ nodes, edges }) => {
    const node = networkNodes.find(({ id }) => id === nodes[0])
    if (!node) return
    console.warn({ node, edges })
  })
})()

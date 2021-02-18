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

export const createNotesNetwork = async (options: {
  notes: NotesNetwork,
  container: HTMLElement
}) => {
  const { notes, container } = options
  const edges = notes.edges.map(({ source, target }) => ({ from: source, to: target }))
  const networkNodes = notes.nodes.map(node => ({
    ...node,
    value: Math.max(1, edges.filter(edge => edge.to === node.id || edge.from === node.id).length),
    group: node.metaData.tags?.filter(tag => !isSystemTag(tag))[0] ?? undefined
  }))

  return createNetwork({
    container,
    edges,
    nodes: networkNodes
  })
}

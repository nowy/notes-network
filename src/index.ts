import { Network } from 'vis-network'

interface NotesNetwork {
  nodes: NotesNode[]
  edges: { source: number, target: number }[]
}

interface NotesNode {
  id: number
  label: string
  metaData: Record<string, string[]>
}

const isSystemTag = (tag: string) => ['literature-note', 'index-card'].includes(tag);

(async () => {
  const container = document.getElementById('network')
  const { nodes, edges } = await require('../dist/zettels.json') as NotesNetwork

  if (!container) return
  
  const networkNodes = nodes.map(node => ({
    ...node,
    group: node.metaData.tags?.filter(tag => !isSystemTag(tag))[0] ?? undefined
  }))

  const network = new Network(container, {
    nodes: networkNodes,
    edges: edges.map(({ source, target }) => ({ from: source, to: target })),
  }, {
    interaction: {
      hover: true,
      hideEdgesOnDrag: true,
      tooltipDelay: 200,
    },
    layout: {
      randomSeed: 2
    },
    nodes: {
      shape: 'dot',
      size: 10,
      labelHighlightBold: false,
      scaling: {
        min: 10,
        max: 30,
      },
      font: {
        face: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        size: 15,
      },
    },
    edges: {
      arrows: 'to',
      color: {
        color: '#29769c',
        hover: '#1d5069',
        highlight: '#111111'
      },
      font: {
        face: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        size: 12,
      },
      width: 0.5,
      hoverWidth: 1,
      smooth: {
        type: "continuous",
      },
    },
    physics: { barnesHut: { gravitationalConstant: -4000 } },
  })

  network.on('selectNode', ({ nodes, edges }) => {
    const node = networkNodes.find(({ id }) => id === nodes[0])
    if (!node) return
    console.warn({ node, edges })
  });
})()
 
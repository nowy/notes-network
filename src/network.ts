import { Edge, Node, Network } from 'vis-network'

export const createNetwork = async (options: {
  container: HTMLElement,
  nodes: Node[]
  edges: Edge[]
}) => new Network(options.container, options, {
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
    scaling: {
      customScalingFunction: (_min, _max, total, value) => (value || 1) / (total || 1),
      min: 5,
      max: 150,
    },
    font: {
      face: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      size: 15,
      background: '#fff',
    },
  },
  edges: {
    arrows: 'to',
    color: {
      color: '#29769c',
      hover: '#1d5069',
      highlight: '#1d5069'
    },
    font: {
      face: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      size: 12,
    },
    width: 0.5,
    hoverWidth: 0.5,
  },
  physics: {
    barnesHut: { gravitationalConstant: -4000 }
  },
})

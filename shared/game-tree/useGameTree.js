import { useState, useCallback, useMemo } from 'react'

function filterChildren(node, ctx) {
  if (!node.children) return []
  return node.children.filter(c => !c.condition || c.condition(ctx))
}

// The path is a stack of siblingIndex values.
// path[0] = index within root's children
// path[1] = index within that child's children
// etc.
// The root node itself is never "current" — we always start inside it.

function resolveFromPath(tree, path, ctx) {
  let parent = tree
  let siblings = filterChildren(tree, ctx)
  let node = siblings[path[0]] || siblings[0]

  for (let i = 1; i < path.length; i++) {
    parent = node
    siblings = filterChildren(node, ctx)
    node = siblings[path[i]] || siblings[0]
    if (!node) break
  }

  return { node: node || siblings[0], siblings, parent }
}

export function useGameTree(tree, gameCtx) {
  // Path is an array of sibling indices, starting from root's children
  const [path, setPath] = useState([0])

  const { node: currentNode, siblings } = useMemo(
    () => resolveFromPath(tree, path, gameCtx),
    [tree, path, gameCtx]
  )

  const siblingIndex = path[path.length - 1]

  const breadcrumbs = useMemo(() => {
    const result = [{ id: tree.id, label: tree.label }]
    let parent = tree
    for (let i = 0; i < path.length; i++) {
      const filtered = filterChildren(parent, gameCtx)
      const node = filtered[path[i]] || filtered[0]
      if (!node) break
      result.push({ id: node.id, label: node.label })
      parent = node
    }
    return result
  }, [path, tree, gameCtx])

  const next = useCallback(() => {
    setPath(p => {
      const newPath = [...p]
      const { siblings: sibs } = resolveFromPath(tree, p, gameCtx)
      const last = p[p.length - 1]
      newPath[newPath.length - 1] = (last + 1) % sibs.length
      return newPath
    })
  }, [tree, gameCtx])

  const prev = useCallback(() => {
    setPath(p => {
      const newPath = [...p]
      const { siblings: sibs } = resolveFromPath(tree, p, gameCtx)
      const last = p[p.length - 1]
      newPath[newPath.length - 1] = (last - 1 + sibs.length) % sibs.length
      return newPath
    })
  }, [tree, gameCtx])

  const drillDown = useCallback((childId) => {
    const filtered = filterChildren(currentNode, gameCtx)
    if (!filtered.length) return
    const idx = childId ? filtered.findIndex(c => c.id === childId) : 0
    setPath(p => [...p, Math.max(0, idx)])
  }, [currentNode, gameCtx])

  const back = useCallback(() => {
    setPath(p => p.length > 1 ? p.slice(0, -1) : p)
  }, [])

  const jumpTo = useCallback((newPath) => {
    setPath(newPath)
  }, [])

  const jumpToSibling = useCallback((idx) => {
    setPath(p => {
      const newPath = [...p]
      newPath[newPath.length - 1] = idx
      return newPath
    })
  }, [])

  const confirmLoop = useCallback(() => {
    if (currentNode.type !== 'loop') return
    if (gameCtx.onLoop) gameCtx.onLoop(currentNode)
    setPath([0])
  }, [currentNode, gameCtx])

  return {
    path,
    currentNode,
    siblings,
    siblingIndex,
    breadcrumbs,
    next,
    prev,
    drillDown,
    back,
    jumpTo,
    jumpToSibling,
    canDrillDown: filterChildren(currentNode, gameCtx).length > 0,
    canGoBack: path.length > 1,
    isLoop: currentNode.type === 'loop',
    confirmLoop,
  }
}

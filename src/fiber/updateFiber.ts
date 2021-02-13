import type {Fiber} from 'react-reconciler';

/**
 * Update the indices of a fiber and its siblings.
 * Return the last sibling index.
 *
 * @param fiber   - The fiber.
 * @param index   - The index of the fiber.
 * @returns       - The last sibling index.
 */
export function updateFibersIndex(fiber: Fiber, index: number): number {
  while (fiber) {
    fiber.index = index;
    (fiber as Fiber | null) = fiber.sibling;
    index += 1;
  }

  return index - 1;
}

/**
 * Update the debug fields.
 * I have not yet inquired about how the _debug fields are chosen.
 * For now only the owner and source are set based on the siblings/parent fields.
 *
 * @param child   - The child fiber.
 * @param parent  - The parent fiber.
 */
export function updateFiberDebugFields(child: Fiber, parent: Fiber): void {
  // The fiber from wich to copy the debug fields.
  let fiberToCopy: Fiber;

  // Try to find a fiber to copy.
  if (parent.child === child) {
    if (child.sibling === null) {
      fiberToCopy = parent;
    } else {
      fiberToCopy = child.sibling;
    }
  } else {
    fiberToCopy = parent.child || parent;
  }

  child._debugOwner = fiberToCopy._debugOwner;
  child._debugSource = fiberToCopy._debugSource;
}

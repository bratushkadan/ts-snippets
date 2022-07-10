interface LivingBeing {
  breathe(): void;
}

interface Fish {
  setSpeed(speed: number): void;
  swim(): void;
}

function isFish(it: unknown): it is Fish {
  return typeof it === 'object' && it != null && it.hasOwnProperty('swim');
}

type RectangleComponents = [number, number];

/* Type Guard 2 */
function isRectangleComponents(components: number[]): components is RectangleComponents {
  return components.some(Number.isFinite) && components.length === 2;
}

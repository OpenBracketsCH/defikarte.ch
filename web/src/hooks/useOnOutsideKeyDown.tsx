import { RefObject, useEffect } from 'react';

type Options = {
  active: boolean;
  keys: string[];
  refsToIgnore?: Array<RefObject<HTMLElement | null>>;
  onOutsidePointerDown: () => void;
};

/**
 * Calls `onOutsidePointerDown` when a pointerdown event happens outside all given refs.
 * - `active`: when false, the listener is not attached.
 * - `refsToIgnore`: elements that should be treated as inside/ignored.
 */
export const useOnOutsidekeyDown = ({
  active,
  keys,
  refsToIgnore = [],
  onOutsidePointerDown,
}: Options) => {
  useEffect(() => {
    if (!active) return;

    const handler = (e: KeyboardEvent) => {
      if (!keys.includes(e.code)) {
        return;
      }
      const target = e.target as Node | null;
      if (!target) return;

      for (const ref of refsToIgnore) {
        if (ref?.current && ref.current.contains(target)) return;
      }

      onOutsidePointerDown();
    };

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [active, keys, onOutsidePointerDown, refsToIgnore]);
};

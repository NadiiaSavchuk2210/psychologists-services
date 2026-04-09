import { useEffect, useState } from 'react';

import LayoutUtilities from './LayoutUtilities';

const DeferredLayoutUtilities = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsReady(true);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  if (!isReady) {
    return null;
  }

  return <LayoutUtilities />;
};

export default DeferredLayoutUtilities;

import React, { CSSProperties } from 'react';

const NoisyBackground = () => {
  return (
    <>
      {/* SVG Filter Definition */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.4"
            numOctaves="5"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>

      {/* Noise Overlay */}
      <div style={styles.noiseOverlay} />
    </>
  );
};

const styles: { noiseOverlay: CSSProperties } = {
  noiseOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    pointerEvents: 'none',
    zIndex: 1, // Ensure this is appropriate for your stacking context
    backgroundColor: 'transparent',
    filter: 'url(#noiseFilter)',
    mixBlendMode: 'multiply',
    overflow: 'hidden',
  },
};

export { NoisyBackground}
import React, { useEffect, useRef } from 'react';

export const HolographicLoader = ({ onComplete }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let progress = 0;

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Pulsierendes Dark Energy
      const gradient = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 0, canvas.width/2, canvas.height/2, canvas.width);
      const pulse = Math.sin(Date.now() / 1000) * 0.3 + 0.7;
      gradient.addColorStop(0, `rgba(139, 92, 246, ${0.2 * pulse})`);
      gradient.addColorStop(1, `rgba(6, 182, 212, ${0.05 * pulse})`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Pulsierendes Quantum Core
      ctx.save();
      ctx.translate(canvas.width/2, canvas.height/2);
      ctx.rotate(Date.now() / 2000);

      const coreGradient = ctx.createRadialGradient(0, 0, 10, 0, 0, 80);
      coreGradient.addColorStop(0, `rgba(34, 211, 238, ${0.8 + pulse * 0.2})`);
      coreGradient.addColorStop(1, `rgba(139, 92, 246, 0)`);
      ctx.fillStyle = coreGradient;
      ctx.fillRect(-100, -100, 200, 200);

      // Zeiger Animation
      ctx.strokeStyle = `rgba(34, 211, 238, ${0.5 + pulse * 0.5})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 40 + progress * 60, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();

      // Text
      ctx.fillStyle = `rgba(34, 211, 238, ${0.8 + pulse * 0.2})`;
      ctx.font = 'bold 24px Orbitron, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('QUANTUM INITIALIZING', canvas.width/2, canvas.height - 40);

      progress += 0.01;
      if (progress >= 1) {
        onComplete();
      } else {
        animationId = requestAnimationFrame(animate);
      }
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    animate();

    return () => cancelAnimationFrame(animationId);
  }, [onComplete]);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999 }} />;
};

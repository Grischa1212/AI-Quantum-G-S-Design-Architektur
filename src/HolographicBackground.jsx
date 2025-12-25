import React, { useEffect, useRef } from 'react';

export const HolographicBackground = ({ emotion, timeOfDay }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const emotionColors = {
      calm: { primary: '#06b6d4', secondary: '#0ea5e9', accent: '#22d3ee' },
      energetic: { primary: '#ef4444', secondary: '#f87171', accent: '#fca5a5' },
      creative: { primary: '#8b5cf6', secondary: '#a78bfa', accent: '#c4b5fd' },
      focused: { primary: '#3b82f6', secondary: '#60a5fa', accent: '#93c5fd' },
      mystical: { primary: '#d946ef', secondary: '#f0abfc', accent: '#f472b6' }
    };

    const colors = emotionColors[emotion] || emotionColors.calm;

    let animationId;
    const particles = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2
    }));

    const animate = () => {
      // Dark nebula background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#0f172a');
      gradient.addColorStop(0.5, '#1e293b');
      gradient.addColorStop(1, '#0f172a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Pulsierendes Grid-Pattern (Holographic Effect)
      const time = Date.now() / 1000;
      const gridSize = 50;
      const pulse = Math.sin(time) * 0.3 + 0.7;

      ctx.strokeStyle = `rgba(${parseInt(colors.primary.slice(1, 3), 16)}, ${parseInt(colors.primary.slice(3, 5), 16)}, ${parseInt(colors.primary.slice(5, 7), 16)}, ${0.1 * pulse})`;
      ctx.lineWidth = 1;

      for (let i = 0; i < canvas.width; i += gridSize) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      // Update and draw particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        gradient.addColorStop(0, `${colors.primary}${Math.floor(p.opacity * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `${colors.secondary}00`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Scanline effect
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.03)';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.height; i += 2) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [emotion]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
      }}
    />
  );
};

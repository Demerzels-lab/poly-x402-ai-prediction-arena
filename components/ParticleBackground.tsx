'use client';

import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // The characters (Katakana, numbers, letters)
    const characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789';
    const charArray = characters.split('');
    
    // Set font size and calculate columns
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    // This array holds the "y" position of the leading character for each column
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    // The draw loop
    function draw() {
      if (!ctx || !canvas) return;

      // 1. Draw a semi-transparent black rectangle over the whole screen
      // This creates the "fading" trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Set the text color to our neon green theme
      ctx.fillStyle = '#39FF14'; // <-- Our Neon Green Palette
      ctx.font = `${fontSize}px monospace`;

      // 3. Loop through each column
      for (let i = 0; i < drops.length; i++) {
        // Pick a random character
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        
        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset the drop to the top randomly to create staggered streams
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Move the drop down for the next frame
        drops[i]++;
      }
    }

    // 4. Set the animation to run at ~30 FPS
    const interval = setInterval(draw, 33);

    // 5. Add a resize listener to reset on window change
    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Reset drops array
      for (let i = 0; i < columns; i++) {
        drops[i] = 1;
      }
    };
    window.addEventListener('resize', handleResize);

    // 6. Clean up
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };

  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-bg"
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        zIndex: -1, 
        pointerEvents: 'none' 
      }}
    />
  );
}
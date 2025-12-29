import { useEffect, useRef, useCallback } from 'react';
import Matter from 'matter-js';
import { motion } from 'framer-motion';

const WHATSAPP_LINK = 'https://wa.me/5535999750672?text=Olá, estou com um problema no caminhão e preciso de um mecânico.';

export const HeroPhysics = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);

  const initPhysics = useCallback(() => {
    if (!sceneRef.current) return;

    const container = sceneRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    if (width === 0 || height === 0) return;

    // Clean up existing
    if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
    if (renderRef.current) {
      Matter.Render.stop(renderRef.current);
      renderRef.current.canvas.remove();
    }
    if (engineRef.current) Matter.Engine.clear(engineRef.current);

    // Create engine
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0.6 },
    });
    engineRef.current = engine;

    // Create renderer
    const render = Matter.Render.create({
      element: container,
      engine: engine,
      options: {
        width: width,
        height: height,
        wireframes: false,
        background: 'transparent',
        pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      },
    });
    renderRef.current = render;

    // Detect mobile
    const isMobile = width < 768;
    const scale = isMobile ? 0.6 : 1;

    // Heavy object properties
    const heavyProps = {
      restitution: 0.25,
      friction: 0.7,
      frictionAir: 0.015,
      density: 0.004,
    };

    // Create walls
    const wallThickness = 80;
    const walls = [
      // Floor
      Matter.Bodies.rectangle(
        width / 2,
        height + wallThickness / 2 - 10,
        width + 200,
        wallThickness,
        { isStatic: true, render: { visible: false } }
      ),
      // Left wall
      Matter.Bodies.rectangle(
        -wallThickness / 2,
        height / 2,
        wallThickness,
        height * 2,
        { isStatic: true, render: { visible: false } }
      ),
      // Right wall
      Matter.Bodies.rectangle(
        width + wallThickness / 2,
        height / 2,
        wallThickness,
        height * 2,
        { isStatic: true, render: { visible: false } }
      ),
    ];

    const objects: Matter.Body[] = [];

    // Tires (dark circles) - position in corners mainly
    const tireCount = isMobile ? 2 : 3;
    for (let i = 0; i < tireCount; i++) {
      const size = (30 + Math.random() * 20) * scale;
      // Position more towards edges
      const xPos = i % 2 === 0 
        ? 50 + Math.random() * (width * 0.25) 
        : width - 50 - Math.random() * (width * 0.25);
      const tire = Matter.Bodies.circle(
        xPos,
        30 + Math.random() * 80,
        size,
        {
          ...heavyProps,
          render: {
            fillStyle: '#1e293b',
            strokeStyle: '#475569',
            lineWidth: 4 * scale,
          },
        }
      );
      objects.push(tire);
    }

    // Pistons (metallic rectangles) - on sides
    const pistonCount = isMobile ? 1 : 2;
    for (let i = 0; i < pistonCount; i++) {
      const w = (20 + Math.random() * 12) * scale;
      const h = (40 + Math.random() * 25) * scale;
      const xPos = i === 0 
        ? 80 + Math.random() * (width * 0.2)
        : width - 80 - Math.random() * (width * 0.2);
      const piston = Matter.Bodies.rectangle(
        xPos,
        60 + Math.random() * 60,
        w,
        h,
        {
          ...heavyProps,
          chamfer: { radius: 3 },
          render: {
            fillStyle: '#94a3b8',
            strokeStyle: '#64748b',
            lineWidth: 2,
          },
        }
      );
      objects.push(piston);
    }

    // Orange wrenches - spread around
    const wrenchCount = isMobile ? 2 : 3;
    for (let i = 0; i < wrenchCount; i++) {
      const wrench = Matter.Bodies.rectangle(
        (width / (wrenchCount + 1)) * (i + 1) + (Math.random() - 0.5) * 100,
        40 + Math.random() * 80,
        55 * scale,
        12 * scale,
        {
          ...heavyProps,
          angle: Math.random() * Math.PI * 2,
          chamfer: { radius: 2 },
          render: {
            fillStyle: '#f97316',
            strokeStyle: '#ea580c',
            lineWidth: 2,
          },
        }
      );
      objects.push(wrench);
    }

    // Hexagonal nuts - scattered
    const nutCount = isMobile ? 3 : 5;
    for (let i = 0; i < nutCount; i++) {
      const nut = Matter.Bodies.polygon(
        Math.random() * width,
        20 + Math.random() * 100,
        6,
        (8 + Math.random() * 6) * scale,
        {
          ...heavyProps,
          render: {
            fillStyle: '#475569',
            strokeStyle: '#334155',
            lineWidth: 1,
          },
        }
      );
      objects.push(nut);
    }

    // Mouse interaction
    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    render.mouse = mouse;

    render.canvas.style.cursor = 'grab';
    Matter.Events.on(mouseConstraint, 'startdrag', () => {
      render.canvas.style.cursor = 'grabbing';
    });
    Matter.Events.on(mouseConstraint, 'enddrag', () => {
      render.canvas.style.cursor = 'grab';
    });

    // Add all to world
    Matter.Composite.add(engine.world, [...walls, ...objects, mouseConstraint]);

    // Run
    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);
  }, []);

  useEffect(() => {
    const timer = setTimeout(initPhysics, 150);
    
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initPhysics, 200);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
      if (renderRef.current) {
        Matter.Render.stop(renderRef.current);
        renderRef.current.canvas.remove();
      }
      if (engineRef.current) Matter.Engine.clear(engineRef.current);
    };
  }, [initPhysics]);

  return (
    <section className="relative bg-gradient-to-b from-slate-100 via-slate-50 to-white overflow-hidden pt-20 md:pt-24">
      {/* Physics Scene - positioned behind */}
      <div 
        ref={sceneRef}
        className="absolute inset-0 z-0"
        style={{ pointerEvents: 'auto' }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-center max-w-4xl mx-auto pointer-events-none"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-blue-950 px-4 py-2 rounded-full text-sm font-semibold mb-5 shadow-sm border border-slate-200"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            +23 Anos de Experiência em Diesel
          </motion.div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-5">
            <span className="block text-orange-600">Caminhão Parado</span>
            <span className="block text-blue-950">é Prejuízo.</span>
            <span className="block text-blue-900/70">Nós Resolvemos.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-7">
            Mecânica especializada em <strong className="text-blue-950">linha diesel</strong> em São Sebastião do Paraíso. 
            Diagnóstico preciso. Seu caminhão de volta à estrada <strong className="text-blue-950">rápido</strong>.
          </p>

          {/* CTA Button */}
          <motion.a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-lg md:text-xl pointer-events-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Falar com o Mecânico Agora
          </motion.a>

          {/* Trust indicators */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:gap-5 text-xs md:text-sm text-slate-600">
            <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Atendimento Imediato
            </div>
            <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Peças Originais
            </div>
            <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Garantia
            </div>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-8 text-xs text-slate-400"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

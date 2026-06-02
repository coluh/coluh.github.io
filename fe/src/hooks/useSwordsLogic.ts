import { useEffect, useRef } from "react";
import {
  Application,
  Graphics,
  Container,
  FederatedPointerEvent,
} from "pixi.js";

type Enemy = {
  body: Graphics;
  vx: number;
  vy: number;
};

export default function useSwordsLogic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<Application | null>(null);
  const spriteRef = useRef<Graphics | null>(null);
  const targetRef = useRef<{ x: number; y: number } | null>(null);
  const speedRef = useRef(0);
  const enemiesRef = useRef<Enemy[]>([]);

  useEffect(() => {
    let isActive = true;

    const init = async () => {
      const container = containerRef.current;
      if (!container || !isActive) return;

      const app = new Application();
      await app.init({
        background: "#111",
        resizeTo: container,
      });
      if (!isActive) {
        app.destroy(true, true);
        return;
      }
      container.appendChild(app.canvas);
      appRef.current = app;

      const sprite = new Graphics()
        .poly([-5, -20, -20, 10, 20, -10])
        .poly([-10, 7, 10, -3, 10, 30, -10, 30])
        .fill("#22c55e")
        .moveTo(2, 2)
        .lineTo(7, 0)
        .stroke({ width: 2, color: "#111" })
        .moveTo(7, 8)
        .lineTo(-15, 30)
        .stroke({ width: 3, color: "white" });
      sprite.x = app.screen.width / 4;
      sprite.y = app.screen.height / 4;
      app.stage.addChild(sprite);
      spriteRef.current = sprite;
      targetRef.current = { x: sprite.x, y: sprite.y };

      const enemiesContainer = new Container();
      app.stage.addChild(enemiesContainer);
      enemiesRef.current = [];

      const spawnEnemy = () => {
        const g = new Graphics()
          .circle(0, 0, 8)
          .poly([10, 10, 5, 40, -5, 40, -10, 10])
          .fill("#3b82f6");
        g.x = 100;
        g.y = 100;
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 1;
        const enemy: Enemy = {
          body: g,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
        };
        enemiesContainer.addChild(g);
        enemiesRef.current.push(enemy);
      };
      for (let i = 0; i < 10; i++) {
        spawnEnemy();
      }

      app.stage.eventMode = "static";
      app.stage.hitArea = { contains: () => true };
      const onStageClick = (ev: FederatedPointerEvent) => {
        targetRef.current = { x: ev.global.x, y: ev.global.y };
      };
      app.stage.on("pointerdown", onStageClick);

      const tickerHandler = () => {
        // Move player towards target
        const currentSprite = spriteRef.current;
        const target = targetRef.current;
        if (!currentSprite || !target) return;
        const dx = target.x - currentSprite.x;
        const dy = target.y - currentSprite.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > 2) {
          const angle = Math.atan2(dy, dx);
          const speed = distance / 10;
          currentSprite.x += Math.cos(angle) * speed;
          currentSprite.y += Math.sin(angle) * speed;
          speedRef.current = speed;
        }

        // Update enemies
        const enemies = enemiesRef.current;
        for (let i = enemies.length - 1; i >= 0; i--) {
          const enemy = enemies[i];
          const g = enemy.body;
          g.x += enemy.vx;
          g.y += enemy.vy;

          // Bounce off walls
          if (g.x < 8) {
            g.x = 8;
            enemy.vx *= -1;
          } else if (g.x > app.screen.width - 8) {
            g.x = app.screen.width - 8;
            enemy.vx *= -1;
          }
          if (g.y < 8) {
            g.y = 8;
            enemy.vy *= -1;
          } else if (g.y > app.screen.height - 40) {
            g.y = app.screen.height - 40;
            enemy.vy *= -1;
          }

          // Check collision with player
          const pdx = g.x - currentSprite.x;
          const pdy = g.y - currentSprite.y;
          const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
          if (pdist < 20) {
            // Collision detected, remove enemy
            enemiesContainer.removeChild(g);
            g.destroy();
            enemies.splice(i, 1);
          }
        }
      };
      app.ticker.add(tickerHandler);

      return () => {
        isActive = false;
        app.stage.off("pointerdown", onStageClick);
        app.ticker.remove(tickerHandler);
        enemiesRef.current.forEach((enemy) =>
          enemiesContainer.removeChild(enemy.body),
        );
        enemiesRef.current = [];
        app.destroy(true, true);
        appRef.current = null;
        spriteRef.current = null;
        targetRef.current = null;
      };
    };

    const cleanup = init().catch(console.error);

    return () => {
      isActive = false;
      cleanup
        .then((cleanupFn) => cleanupFn && cleanupFn())
        .catch(console.error);
    };
  }, []);

  return { containerRef };
}

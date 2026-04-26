            'use client';

            import { useEffect, useRef } from 'react';

            type HexPoint = {
            x: number;
            y: number;
            };

            type MouseState = {
            x: number;
            y: number;
            active: boolean;
            };

            const HEX_SIZE = 38;
            const SQRT3 = Math.sqrt(3);
            const HEX_WIDTH = SQRT3 * HEX_SIZE;
            const HORIZONTAL_STEP = HEX_WIDTH;
            const VERTICAL_STEP = HEX_SIZE * 1.5;

            const MOUSE_RADIUS = 200;
            const INNER_HEX_DISTANCE = 45;
            const BRIGHT_STROKE_THRESHOLD = 0.55;

            const CURSOR_RING_BASE = 60;
            const CURSOR_RING_PULSE = 12;

            function clamp01(value: number): number {
            return Math.max(0, Math.min(1, value));
            }

            function drawHexPath(
            ctx: CanvasRenderingContext2D,
            cx: number,
            cy: number,
            radius: number,
            ) {
            ctx.beginPath();

            for (let i = 0; i < 6; i += 1) {
                const angle = (Math.PI / 180) * (60 * i - 30);
                const px = cx + radius * Math.cos(angle);
                const py = cy + radius * Math.sin(angle);

                if (i === 0) {
                ctx.moveTo(px, py);
                } else {
                ctx.lineTo(px, py);
                }
            }

            ctx.closePath();
            }

            function buildHexCenters(width: number, height: number): HexPoint[] {
            const points: HexPoint[] = [];
            const marginX = HEX_WIDTH;
            const marginY = HEX_SIZE;

            let row = 0;

            for (let y = -marginY; y <= height + marginY; y += VERTICAL_STEP, row += 1) {
                const rowOffset = row % 2 === 0 ? 0 : HEX_WIDTH / 2;

                for (let x = -marginX; x <= width + marginX; x += HORIZONTAL_STEP) {
                points.push({
                    x: x + rowOffset,
                    y,
                });
                }
            }

            return points;
            }

            export default function MorphicCrystalBackground() {
            const canvasRef = useRef<HTMLCanvasElement | null>(null);
            const hexCentersRef = useRef<HexPoint[]>([]);
            const mouseRef = useRef<MouseState>({
                x: 0,
                y: 0,
                active: false,
            });
            const animationFrameRef = useRef<number | null>(null);

            useEffect(() => {
                const canvas = canvasRef.current;
                if (!canvas) return;

                const ctx = canvas.getContext('2d', { alpha: true });
                if (!ctx) return;

                const setCanvasSize = () => {
                const width = window.innerWidth;
                const height = window.innerHeight;
                const dpr = Math.min(window.devicePixelRatio || 1, 2);

                canvas.width = Math.floor(width * dpr);
                canvas.height = Math.floor(height * dpr);
                canvas.style.width = `${width}px`;
                canvas.style.height = `${height}px`;

                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                hexCentersRef.current = buildHexCenters(width, height);
                };

                const handleResize = () => {
                setCanvasSize();
                };

                const handleMouseMove = (event: MouseEvent) => {
                mouseRef.current = {
                    x: event.clientX,
                    y: event.clientY,
                    active: true,
                };
                };

                const handleMouseOut = () => {
                mouseRef.current.active = false;
                };

                setCanvasSize();

                const render = (timestamp: number) => {
                const time = timestamp * 0.001;
                const width = window.innerWidth;
                const height = window.innerHeight;

                const isLight = document.documentElement.classList.contains('light');
                const isDark = !isLight;

                const mouse = mouseRef.current;
                const hexCenters = hexCentersRef.current;

                ctx.clearRect(0, 0, width, height);
                ctx.fillStyle = isDark ? '#000008' : '#f8f6ff';
                ctx.fillRect(0, 0, width, height);

                const fillOpacityMultiplier = isDark ? 1 : 0.5;

                for (let i = 0; i < hexCenters.length; i += 1) {
                    const { x, y } = hexCenters[i];

                    const rawWave =
                    Math.sin(time * 1.1 + x * 0.012 + y * 0.009) *
                    Math.cos(time * 0.7 + x * 0.008 - y * 0.011);

                    const normalizedEnergy = (rawWave + 1) * 0.5;

                    let mouseDistance = Number.POSITIVE_INFINITY;
                    let mouseEffect = 0;

                    if (mouse.active) {
                    const dx = x - mouse.x;
                    const dy = y - mouse.y;
                    mouseDistance = Math.hypot(dx, dy);
                    mouseEffect = Math.max(0, 1 - mouseDistance / MOUSE_RADIUS);
                    }

                    const energy = clamp01(normalizedEnergy + mouseEffect * 0.7);
                    const hue = 258 + normalizedEnergy * 22 + mouseEffect * 10;
                    const alpha = energy * 0.28 + mouseEffect * 0.35;
                    const radius = HEX_SIZE * (0.88 + energy * 0.1 + mouseEffect * 0.12);

                    const fillAlpha = alpha * 0.5 * fillOpacityMultiplier;
                    const strokeAlpha = alpha + 0.04;
                    const lineWidth = 0.7 + mouseEffect * 1.5;

                    if (Math.max(fillAlpha, strokeAlpha) < 0.02) {
                    continue;
                    }

                    drawHexPath(ctx, x, y, radius);
                    ctx.fillStyle = `hsla(${hue}, 92%, 60%, ${fillAlpha})`;
                    ctx.fill();

                    if (isDark) {
                    ctx.strokeStyle = `hsla(${hue}, 96%, 74%, ${strokeAlpha})`;
                    } else {
                    const lightHue = mouseEffect > 0.05 ? hue : 262;
                    const lightSaturation = mouseEffect > 0.05 ? 88 : 72;
                    const lightLightness = mouseEffect > 0.05 ? 46 : 38;
                    ctx.strokeStyle = `hsla(${lightHue}, ${lightSaturation}%, ${lightLightness}%, ${strokeAlpha})`;
                    }

                    ctx.lineWidth = lineWidth;
                    ctx.stroke();

                    if (mouseEffect > BRIGHT_STROKE_THRESHOLD) {
                    drawHexPath(ctx, x, y, radius * 0.55);
                    ctx.strokeStyle = `hsla(${hue}, 100%, 90%, ${mouseEffect * 0.6})`;
                    ctx.lineWidth = 1.2;
                    ctx.stroke();
                    }

                    if (mouseDistance < INNER_HEX_DISTANCE) {
                    drawHexPath(ctx, x, y, radius * 0.28);
                    ctx.fillStyle = `hsla(${hue + 15}, 100%, 82%, ${mouseEffect * 0.85})`;
                    ctx.fill();
                    }
                }

                if (mouse.active) {
                    const ringRadius = CURSOR_RING_BASE + Math.sin(time * 4) * CURSOR_RING_PULSE;

                    ctx.beginPath();
                    ctx.arc(mouse.x, mouse.y, ringRadius, 0, Math.PI * 2);
                    ctx.strokeStyle = `rgba(200, 150, 255, ${0.25 + Math.sin(time * 4) * 0.12})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }

                const vignette = ctx.createRadialGradient(
                    width / 2,
                    height / 2,
                    height * 0.15,
                    width / 2,
                    height / 2,
                    height * 0.85,
                );

                vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
                vignette.addColorStop(
                    1,
                    isDark ? 'rgba(0, 0, 12, 0.65)' : 'rgba(99, 84, 160, 0.12)',
                );

                ctx.fillStyle = vignette;
                ctx.fillRect(0, 0, width, height);

                animationFrameRef.current = window.requestAnimationFrame(render);
                };

                window.addEventListener('resize', handleResize);
                window.addEventListener('mousemove', handleMouseMove, { passive: true });
                window.addEventListener('mouseout', handleMouseOut);

                animationFrameRef.current = window.requestAnimationFrame(render);

                return () => {
                window.removeEventListener('resize', handleResize);
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseout', handleMouseOut);

                if (animationFrameRef.current !== null) {
                    window.cancelAnimationFrame(animationFrameRef.current);
                }
                };
            }, []);

            return (
                <canvas
                ref={canvasRef}
                className="fixed inset-0 z-0 pointer-events-none"
                aria-hidden="true"
                />
            );
            }
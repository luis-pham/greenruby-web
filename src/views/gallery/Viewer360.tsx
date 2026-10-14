'use client';

import { useEffect, useRef, useState } from 'react';
import type { ViewerLabels } from './VirtualTour';
import s from './gallery.module.css';

const VERTEX = `
attribute vec2 position;
varying vec2 vUv;
void main() { vUv = position; gl_Position = vec4(position, 0.0, 1.0); }`;

// Casts a ray per pixel and samples the equirectangular frame: no sphere mesh, no 3D library.
const FRAGMENT = `
precision mediump float;
uniform sampler2D frame;
uniform vec2 resolution;
uniform float yaw;
uniform float pitch;
uniform float fov;
varying vec2 vUv;
const float PI = 3.14159265;
void main() {
  float t = tan(fov * 0.5);
  vec3 d = normalize(vec3(vUv.x * t * resolution.x / resolution.y, vUv.y * t, -1.0));
  float cp = cos(pitch), sp = sin(pitch);
  d = vec3(d.x, d.y * cp - d.z * sp, d.y * sp + d.z * cp);
  float cy = cos(yaw), sy = sin(yaw);
  d = vec3(d.x * cy + d.z * sy, d.y, -d.x * sy + d.z * cy);
  vec2 uv = vec2(atan(d.x, -d.z) / (2.0 * PI) + 0.5, 0.5 - asin(clamp(d.y, -1.0, 1.0)) / PI);
  gl_FragColor = texture2D(frame, uv);
}`;

type View = { yaw: number; pitch: number; fov: number };
const clampPitch = (p: number) => Math.max(-1.4, Math.min(1.4, p));
const clampFov = (f: number) => Math.max(0.6, Math.min(1.9, f));

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
}

/**
 * Starts a WebGL renderer that projects the playing video onto the canvas. Returns a cleanup
 * function, or null when WebGL is unavailable or the video can't be used as a texture (e.g. a
 * cross-origin file without CORS headers); the caller then shows the plain video instead.
 */
function startRenderer(canvas: HTMLCanvasElement, video: HTMLVideoElement, view: { current: View }, onFail: () => void) {
  const gl = canvas.getContext('webgl', { antialias: false, preserveDrawingBuffer: false });
  if (!gl) return null;
  const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
  const program = gl.createProgram();
  if (!vs || !fs || !program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, 'position');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  // Video frames are not power-of-two sized: WebGL 1 needs clamping and no mipmaps.
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  const u = (name: string) => gl.getUniformLocation(program, name);
  const uniforms = { resolution: u('resolution'), yaw: u('yaw'), pitch: u('pitch'), fov: u('fov') };
  let frame = 0;

  const draw = () => {
    frame = requestAnimationFrame(draw);
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.round(canvas.clientWidth * ratio);
    const height = Math.round(canvas.clientHeight * ratio);
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    gl.viewport(0, 0, width, height);
    if (video.readyState >= 2) {
      try {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, video);
      } catch {
        cancelAnimationFrame(frame);
        onFail();
        return;
      }
    }
    gl.uniform2f(uniforms.resolution, width, height);
    gl.uniform1f(uniforms.yaw, view.current.yaw);
    gl.uniform1f(uniforms.pitch, view.current.pitch);
    gl.uniform1f(uniforms.fov, view.current.fov);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  };
  frame = requestAnimationFrame(draw);

  return () => {
    cancelAnimationFrame(frame);
    gl.deleteTexture(texture);
    gl.deleteBuffer(buffer);
    gl.deleteProgram(program);
  };
}

/** Full-screen 360° video viewer: drag/swipe or arrow keys to look around, wheel or +/- to zoom. */
export default function Viewer360({ src, labels, onClose }: { src: string; labels: ViewerLabels; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const view = useRef<View>({ yaw: 0, pitch: 0, fov: 1.35 });
  const drag = useRef<{ x: number; y: number; yaw: number; pitch: number } | null>(null);
  const [flat, setFlat] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = dialog.current;
    if (el && !el.open) el.showModal();
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const c = canvas.current;
    const v = video.current;
    if (!c || !v || flat) return;
    const stop = startRenderer(c, v, view, () => setFlat(true));
    if (!stop) {
      setFlat(true);
      return;
    }
    v.play().catch(() => {});
    return stop;
  }, [flat]);

  const look = (dYaw: number, dPitch: number) => {
    view.current = { ...view.current, yaw: view.current.yaw + dYaw, pitch: clampPitch(view.current.pitch + dPitch) };
  };

  return (
    <dialog
      ref={dialog}
      className={s.viewer}
      aria-label={labels.label}
      onClose={onClose}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onKeyDown={(e) => {
        const step = 0.12;
        if (e.key === 'ArrowLeft') look(-step, 0);
        else if (e.key === 'ArrowRight') look(step, 0);
        else if (e.key === 'ArrowUp') look(0, step);
        else if (e.key === 'ArrowDown') look(0, -step);
        else if (e.key === '+' || e.key === '=') view.current.fov = clampFov(view.current.fov - 0.1);
        else if (e.key === '-') view.current.fov = clampFov(view.current.fov + 0.1);
        else return;
        e.preventDefault();
      }}
    >
      <div className={s.lightboxBar}>
        <span className={s.lightboxCount}>{flat ? labels.unsupported : ready ? labels.hint : labels.loading}</span>
        <button type="button" className={s.lightboxClose} onClick={onClose} autoFocus>
          {labels.close} <span aria-hidden="true">✕</span>
        </button>
      </div>
      <div className={s.viewerStage}>
        <video
          // Remount when falling back so the element can reload without the CORS requirement.
          key={flat ? 'flat' : 'gl'}
          ref={video}
          src={src}
          crossOrigin={flat ? undefined : 'anonymous'}
          className={flat ? s.viewerFlat : s.viewerSource}
          muted
          loop
          playsInline
          autoPlay={flat}
          controls={flat}
          preload="auto"
          onCanPlay={() => setReady(true)}
          onError={() => setFlat(true)}
        />
        {!flat && (
          <canvas
            ref={canvas}
            className={s.viewerCanvas}
            tabIndex={0}
            aria-label={labels.hint}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              drag.current = { x: e.clientX, y: e.clientY, yaw: view.current.yaw, pitch: view.current.pitch };
            }}
            onPointerMove={(e) => {
              const start = drag.current;
              if (!start) return;
              const speed = view.current.fov / e.currentTarget.clientHeight;
              view.current = {
                ...view.current,
                yaw: start.yaw - (e.clientX - start.x) * speed,
                pitch: clampPitch(start.pitch + (e.clientY - start.y) * speed),
              };
            }}
            onPointerUp={() => {
              drag.current = null;
            }}
            onPointerCancel={() => {
              drag.current = null;
            }}
            onWheel={(e) => {
              view.current.fov = clampFov(view.current.fov + e.deltaY * 0.001);
            }}
          />
        )}
      </div>
    </dialog>
  );
}

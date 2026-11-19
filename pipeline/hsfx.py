#!/usr/bin/env python3
"""Synthesized horror sound effects, 48 kHz mono float arrays saved as wav."""
import os, numpy as np, soundfile as sf
SR = 48000
rng = np.random.default_rng(13)
OUT = os.path.expanduser("~/reel/sfx"); os.makedirs(OUT, exist_ok=True)

def t(d): return np.arange(int(SR * d)) / SR
def env(n, a, d):
    x = np.arange(n) / SR
    return np.minimum(x / max(a, 1e-4), 1) * np.exp(-np.maximum(x - a, 0) / d)
def lp(x, a):  # one-pole lowpass, a in (0,1): smaller = darker
    y = np.empty_like(x); s = 0.0
    for i in range(len(x)): s += a * (x[i] - s); y[i] = s
    return y
def bp(noise, f, q=2.0):
    n = len(noise); f = np.broadcast_to(np.asarray(f, float), (n,)); y = np.zeros(n); l = b = 0.0
    for i in range(n):
        F = 2 * np.sin(np.pi * f[i] / SR); h = noise[i] - l - b / q; b += F * h; l += F * b; y[i] = b
    return y
def norm(x, p=0.9): return x / (np.abs(x).max() + 1e-9) * p
def save(name, x): sf.write(f"{OUT}/{name}.wav", norm(x).astype(np.float32), SR)

# Drone bed: 60 s low pad, slowly beating fifths + filtered air
tt = t(60)
dr = (np.sin(2*np.pi*55*tt) + 0.6*np.sin(2*np.pi*55.4*tt) + 0.35*np.sin(2*np.pi*82.6*tt)
      + 0.25*np.sin(2*np.pi*116.3*tt + np.sin(2*np.pi*0.07*tt)*3))
dr *= 0.75 + 0.25*np.sin(2*np.pi*0.05*tt)
air = lp(rng.standard_normal(len(tt)), 0.02) * 3
save("drone", dr + air * 0.5)

# Static burst (cut transition)
n = int(SR*0.35); x = rng.standard_normal(n)
crack = (rng.random(n) < 0.004) * rng.standard_normal(n) * 4
save("static", (x*0.6 + crack) * env(n, 0.005, 0.12))

# Long radio static with breathing (3.5 s)
n = int(SR*3.5); x = rng.standard_normal(n) * 0.35
x += (rng.random(n) < 0.003) * rng.standard_normal(n) * 3
br = np.zeros(n)
for s0, d in [(0.9, 0.9), (2.1, 1.1)]:
    k = int(s0*SR); L = int(d*SR); w = np.sin(np.linspace(0, np.pi, L))**2
    br[k:k+L] += bp(rng.standard_normal(L), np.linspace(700, 1100, L), 1.2) * w * 2.2
save("radio", bp(x, 1800, 0.8) + br)

# Radio click
n = int(SR*0.06); c = rng.standard_normal(n) * env(n, 0.0005, 0.008)
save("rclick", np.diff(c, prepend=0) + 0.5*np.sin(2*np.pi*1200*t(0.06))*env(n, 0.0005, 0.01))

# Stinger: deep boom + dissonant cluster
tt = t(3.0); f = 70*np.exp(-tt*3) + 32
boom = np.sin(2*np.pi*np.cumsum(f)/SR) * env(len(tt), 0.003, 0.9)
cl = sum(np.sin(2*np.pi*fr*tt + rng.uniform(0, 6)) for fr in [311, 329.6, 466, 493.9, 698]) * env(len(tt), 0.01, 0.8) * 0.18
save("stinger", boom + cl + lp(rng.standard_normal(len(tt)), 0.1) * env(len(tt), 0.001, 0.15) * 0.8)

# Soft hit (lighter cut accent)
tt = t(1.2); f = 90*np.exp(-tt*6) + 40
save("hit", np.sin(2*np.pi*np.cumsum(f)/SR) * env(len(tt), 0.002, 0.35))

# Heartbeat (one lub-dub, 0.8 s)
tt = t(0.8); hb = np.zeros(len(tt))
for s0, a in [(0.0, 1.0), (0.22, 0.7)]:
    k = int(s0*SR); L = int(0.18*SR); x = t(0.18)
    hb[k:k+L] += a*np.sin(2*np.pi*(55*np.exp(-x*10)+38)*x) * env(L, 0.004, 0.05)
save("heartbeat", hb)

# Paper rustle
n = int(SR*0.6); x = bp(rng.standard_normal(n), 3500, 0.7)
mod = (rng.random(n) < 0.02).astype(float); mod = lp(mod, 0.01) * 30
save("paper", x * np.clip(mod, 0, 1) * env(n, 0.03, 0.25))

# Escalator hum loop (6 s): motor + step clacks
tt = t(6.0); hum = 0.5*np.sin(2*np.pi*60*tt) + 0.3*np.sin(2*np.pi*120*tt) + 0.15*np.sin(2*np.pi*180*tt)
hum += lp(rng.standard_normal(len(tt)), 0.05) * 0.8
for s0 in np.arange(0.1, 5.9, 0.42):
    k = int(s0*SR); L = int(0.05*SR); hum[k:k+L] += rng.standard_normal(L) * env(L, 0.0005, 0.01) * 0.6
save("escalator", hum)

# Power down (escalator stop)
tt = t(1.6); f = 120*np.exp(-tt*2.2)
save("powerdown", np.sin(2*np.pi*np.cumsum(f)/SR) * np.exp(-tt*1.2) + lp(rng.standard_normal(len(tt)), 0.05)*np.exp(-tt*2)*0.6)

# Door click/latch
n = int(SR*0.4); x = np.zeros(n)
for s0, a in [(0, 1.0), (0.09, 0.6)]:
    k = int(s0*SR); L = int(0.04*SR); x[k:k+L] += np.diff(rng.standard_normal(L)*env(L, 0.0003, 0.006), prepend=0)*a
x += 0.4*np.sin(2*np.pi*180*t(0.4)) * env(n, 0.002, 0.06)
save("door", x)

# Reverse swell (riser into reveal)
tt = t(2.0); sw = lp(rng.standard_normal(len(tt)), 0.08) + 0.4*np.sin(2*np.pi*np.cumsum(np.geomspace(80, 400, len(tt)))/SR)
save("swell", sw * np.linspace(0, 1, len(tt))**3)

# Car pass (3 s)
tt = t(3.0); x = lp(rng.standard_normal(len(tt)), 0.06) + 0.3*np.sin(2*np.pi*np.cumsum(70+20*np.tanh((tt-1.5)*3))/SR)
save("car", x * np.exp(-((tt-1.5)/0.7)**2))

# Glitch tick
n = int(SR*0.12); x = np.sign(np.sin(2*np.pi*rng.uniform(300, 900)*t(0.12))) * env(n, 0.001, 0.03)
save("glitch", x + rng.standard_normal(n)*env(n, 0.001, 0.02))
print("sfx done", sorted(os.listdir(OUT)))

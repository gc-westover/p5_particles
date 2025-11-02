# p5_particles

An optimized particle simulation using p5.js with quadtree spatial partitioning for improved performance.

## Overview

Small particle attractor/repulsor sandbox with advanced spatial optimization and energy management.

## Features

### Quadtree Optimization
- **Spatial Partitioning**: Uses a quadtree data structure to organize attractors spatially
- **Reduced Calculations**: Only checks nearby attractors within a configurable radius (300px default)
- **Performance**: Reduces computational complexity from O(n×m) to approximately O(n × log m)

### Energy Management
- **Velocity Dampening**: Particles gradually lose energy (98% retention per frame)
- **Speed Limits**: Min speed: 0.3, Max speed: 10
- **Distance-based Force Falloff**: Forces decrease with distance to prevent extreme accelerations
- **Edge Wrapping**: Particles wrap around screen edges

### Particle System
- **Maximum Particles**: 500 (prevents performance degradation)
- **Color-coded**: Different particle colors based on spawn location
- **Trail Rendering**: Line trails show particle motion history

## Controls

- **Mouse Click & Drag**: Add new particles at mouse position
- **Q Key**: Toggle quadtree visualization
- **R Key**: Reset to initial 50 particles
- **Any Key**: Disable attractor gravity temporarily

## Performance Metrics

The simulation displays real-time statistics:
- Particle count
- Attractor count
- Current FPS

## Technical Details

### Force Calculation
```
Before: O(n × m) - each particle checks all attractors
After: O(n × log m) - each particle queries quadtree for nearby attractors
```

### Quadtree Parameters
- **Capacity**: 4 attractors per node before subdivision
- **Query Radius**: 300px (configurable via `forceRadius`)
- **Boundary**: Dynamically sized to canvas dimensions

### Energy Dampening
- Velocity dampening: 0.98 multiplier per frame
- Distance-based force scaling: `strength × map(distance, 0, 300, 1, 0.1)`
- Constrained force distances: 100 to 50,000 squared units

## Version History

- **v2.0**: Upgraded from p5.js v0.7.2 to v2.0.5
- **v2.1**: Implemented quadtree optimization and energy management system

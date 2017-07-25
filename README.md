# d3-weighted-voronoi (WIP)
This d3 plugin produces a _weighted Voronoi diagram_. It tesselates the plane given a set of two-dimensional weighted sites.

Available only for __d3 v4__, but still a __Work In Progress__ (currently at it's early stage of development).

## Context
Compared to _the basic_ Voronoï diagram, it add the capability to assign a particular weight to each site. The higher is the weight of a site, the more this site influences its environment, and the larger is its surrounding area.

Weighted Voronoï diagram comes in severall flavours (additive/multiplicative, powered/not-powered, 2D/3D and highier dimensions, ...), but this plugin focuses on the __2D additive weighted power diagram__, which provides a tessellation made of concave polygons/cells with straight borders, as the default Voronoï diagram does.

## Installing
Load ```https://rawgit.com/Kcnarf/d3.beeswarm/master/build/d3-weighted-voronoi.js``` to make it available in AMD, CommonJS, or vanilla environments. In vanilla, a d3 global is exported:
```html
<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="https://raw.githack.com/Kcnarf/d3-weighted-voronoi/master/build/d3-weighted-voronoi.js"></script>
<script>
  cells = d3.weightedVoronoi(formatedSites, boundingSites, clippingPolygon);
</script>
```

Cf. the block [Voronoï playground : interactive Voronoï transitioning thanks to weighted Voronoï](http://bl.ock.org/Kcnarf/7d7f60ef86a77851c38c51904f4c8d39) for usage.


# d3-weighted-voronoi
___Work In Progress___ : aims to produce a D3 (v4) plugin which computes a Weighted Voronoi tesselation

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


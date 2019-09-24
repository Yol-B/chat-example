$('#example').polygonizr({

    // How long to pause in between new node-movements.
    restNodeMovements: 0.5,
  
    // When the cluster up<a href="https://www.jqueryscript.net/time-clock/">date</a>s, this sets speed of nodes.
    duration: 200,
  
    // Define the maximum distance to move nodes.
    nodeMovementDistance: 1000,
  
    // The number of node nodes to print out.
    numberOfNodes: 500,
  
    // The number of dots, unconnected to any other nodes, floating arround.
    numberOfUnconnectedNode: 20,
  
    // Connects passing free nodes if within the distance as specified in ConnectUnconnectedNodesDistance.
    ConnectUnconnectedNodes: true,
  
    // The distance between unconnected nodes to connect to each other.
    ConnectUnconnectedNodesDistance: 150,
  
    // Define the maximume size of each node dot.
    nodeDotSize: 2.5,
  
    // Sets the ease mode of the movement: linear, easeIn, easeOut, easeInOut, accelerateDecelerate.
    nodeEase: "accelerateDecelerate",
  
    // If true, the nodes will descend into place on load.
    nodeFancyEntrance: true,
  
    // Makes the cluster forms an ellipse inspired formation, random if true.
    randomizePolygonMeshNetworkFormation: true,
  
    // Define a formula for how to initialize each node dot's position.
    specifyPolygonMeshNetworkFormation: null,
  
    // Number of relations between nodes.
    nodeRelations: 5,
  
    // The FPS for the whole canvas.
    animationFps: 60,
  
    // Sets the color of the node dots in the network (RGB).
    nodeDotColor: "240, 255, 250",
  
    // Sets the color of the node lines in the network (RGB).
    nodeLineColor: "240, 255, 250",
  
    // Sets the color of the filled triangles in the network (RGB).
    nodeFillColor: "240, 255, 250",
  
    // Sets the alpha level for the colors (1-0).
    nodeFillAlpha: 0.5,
  
    // Sets the alpha level for the lines (1-0).
    nodeLineAlpha: 0.5,
  
    // Sets the alpha level for the dots (1-0).
    nodeDotAlpha: 1.0,
  
    // Defines if the triangles in the network should be shown.
    nodeFillSapce: true,
  
    // A numberic value (0-1) defining the ods of showing the cooridnates for where a new node destination will end.
    nodeDotPrediction: 0,
  
    // If true, the animation is allowed to go outside the definde canvas space.
    nodeOverflow: false,
  
    // Define if the active animation should glow or not (not CPU friendly).
    nodeGlowing: false,
    
    // Define the canvas size and css position.
    canvasWidth: $(this).width(),
    canvasHeight: $(this).height(),
    canvasPosition: "relative",
    canvasTop: "0px",
    canvasBottom: "auto",
    canvasRight: "auto",
    canvasLeft: "auto"
    
  });
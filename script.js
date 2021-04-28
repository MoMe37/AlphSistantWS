var psList = [];
var scene;
var camera;
var psMain;

AFRAME.registerComponent('cross', {

  schema: {
    index: {type: 'number', default: '-1'}
  },

  init: function() {

      var data = this.data;
      var el = this.el;

      el.addEventListener("click", function(event) {
        psMain.setAttribute("src", psList[data.index].src);
        addCrossOnPhotosphere(psList[data.index]);
      });

  }

});

function addCrossOnPhotosphere(origin) {
  //Move photosphere
  psMain.setAttribute("position", origin.x + " 0 " + origin.z);
  camera.setAttribute("position", origin.x + " 0 " + origin.z);

  //Remove ancient cross
  var listCross = document.querySelectorAll("a-box");
  listCross.forEach(currentValue => {
    currentValue.parentNode.removeChild(currentValue);
  });

  console.log("---------------AddCross---------------");
  console.log("---------------Origin---------------");
  console.log("Ox : " + origin.x);
  console.log("Oz : " + origin.z);
  console.log("Osrc : " + origin.src);

  //Add new cross
  origin.neighbourList.forEach(currentValue => {
    var d = Math.sqrt(Math.pow((currentValue.x - origin.x), 2) + Math.pow((currentValue.z - origin.z), 2));
    var x = Math.round(origin.x + (50/d)*(currentValue.x - origin.x));
    var z = Math.round(origin.z + (50/d)*(currentValue.z - origin.z));

    var cross = document.createElement("a-box");
    cross.setAttribute("id", "cross__" + currentValue.id)
    cross.setAttribute("position", x + " 0 " + z);
    cross.setAttribute("scale", "5 5 5");
    cross.setAttribute("rotation", "45 45 0");
    cross.setAttribute("cross", "index: "+ currentValue.id);
    scene.appendChild(cross);

    console.log("---------------Current Value ( " + currentValue.id + " )---------------");
    console.log("x : " + currentValue.x);
    console.log("z : " + currentValue.z);
    console.log("src : " + currentValue.src);

    console.log("---------------Cross---------------");
    console.log("id : cross__" + currentValue.id);
    console.log("distance : " + d);
    console.log("position : " + x + " 0 " + z);
  });
};

function run() {
  camera = document.querySelector("a-camera");
  psMain = document.getElementById("main-ps");
  psMain.setAttribute("src", psList[0].src);
  addCrossOnPhotosphere(psList[0])
};

var getValues = function(){
  scene = document.querySelector("a-scene");
  if (scene.hasLoaded) {
    run();
  } else {
    scene.addEventListener("loaded", run);
  }
}

$.getJSON("data_rework.geojson", function(result){
  var xref, zref, x, z;
  var factor = 2000000;
  var index = 0;
  var data = result.features;
  console.log("---------------Data---------------");
  data.forEach(currentValue => {
    if(currentValue.geometry.type == "Point" && currentValue.properties.image == "yes")
    {
      //Traitement des coordonnées (Decimal degrees -> Useful coordinates)
      if(index == 0)
      {
        xref = currentValue.geometry.coordinates[0];
        zref = currentValue.geometry.coordinates[1];
      }

      x = Math.round((currentValue.geometry.coordinates[0] - xref) * factor);
      z = Math.round((currentValue.geometry.coordinates[1] - zref) * factor);

      console.log("---------------"+ index +"---------------");
      console.log("x : " + x);
      console.log("z : " + z);

      psList.push(new Photosphere(index, x, z, currentValue.properties.src));
      index += 1;
    }
  });

  //Add neighbour
  psList[0].addNeighbour(psList[1]);
  psList[1].addNeighbour(psList[0]);
  psList[1].addNeighbour(psList[2]);
  psList[2].addNeighbour(psList[1]);
  psList[2].addNeighbour(psList[3]);
  psList[3].addNeighbour(psList[2]);

  getValues();
});
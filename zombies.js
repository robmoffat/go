


// setup orange pieces
var rows = 15;
var columns = 15
for (var y = 1; y< rows; y++) {
  for (var x = 1; x < columns; x++) {
    createMan(x, y, "orange")
  }
}

// black piece
createMan(25, 17, "black")

setInterval(function() {
  for (var i = 0; i < men; i++) {
    var r = Math.random();
    var man = getMan(i)
    if (getColour(i) == 'black') {
      if (r < .15) {
        // zombie move rules
        var nearestMan = getNearestMan(i, "orange")
        var nearestManPlace = getManPlace(nearestMan)
        var murdererPlace = getManPlace(i)
        if (nearestManPlace.x < murdererPlace.x) {
          moveMan(i, -1, 0, true)
        } else {
          moveMan(i, 1, 0, true)
        }

        if (nearestManPlace.y < murdererPlace.y) {
          moveMan(i, 0, -1, true)
        } else {
          moveMan(i, 0, 1, true)
        }
      }
    } else {
      if (r < .25) {
        moveMan(i, 0, -1)
      } else if (r < .5) {
        moveMan(i, 1, 0)
      } else if ( r< .75) {
        moveMan(i, 0, 1)
      } else {
        moveMan(i, -1, 0)
      }

      // orange move rules
      var myPlace = getManPlace(i)
      var nearestZombie = getNearestMan(i, "black")
      var murdererPlace = getManPlace(nearestZombie)

      if (myPlace.x < murdererPlace.x) {
        moveMan(i, -1, 0)
      } else {
        moveMan(i, 1, 0)
      }

      if (myPlace.y < murdererPlace.y) {
        moveMan(i, 0, -1)
      } else {
        moveMan(i, 0, 1)
      }
    }
  }
}, 500)

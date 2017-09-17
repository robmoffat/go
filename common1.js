var svgns = "http://www.w3.org/2000/svg";
var board = document.getElementById("board");
var manSize = 10;
var spacing = 20;
var boardX =40;
var boardY =20;
var men = 0;

function createMan(x, y, colour) {
   var man = document.createElementNS(svgns, "circle");
   var manNumber = men;
   man.setAttributeNS(null, "id", "man"+manNumber)
   man.setAttributeNS(null, "cx", x * spacing);
   man.setAttributeNS(null, "cy", y * spacing);
   man.setAttributeNS(null, "r",  manSize);
   man.setAttributeNS(null, "fill", colour);
   board.appendChild(man)
   men++;
   return manNumber;
}

function getColour(number) {
   var man = getMan(number);
   return man.getAttributeNS(null, "fill");
}

function changeColour(number, colour) {
   var man = getMan(number)
   man.setAttributeNS(null, "fill", colour)
}

function infectMan(number) {
  changeColour(number, "black")
}

function killMan(number) {
   document.getElementById("man"+number).remove();
}

function getMan(number) {
  return document.getElementById("man"+number);
}

function getManPlace(number) {
  var man = getMan(number)

  if (man == undefined) {
    return {x: -1000, y: -1000}
  }
  return {
    x: man.getAttributeNS(null, "cx") / spacing,
    y: man.getAttributeNS(null, "cy") / spacing
  }
}

function moveMan(number, xChange, yChange, murderer) {
  // get our man

  var myman = getManPlace(number)

  // where he will be
  myman.x = myman.x + xChange;
  myman.y = myman.y + yChange;

  if ((myman.x < 1) || (myman.y < 1) || (myman.x > boardX) || (myman.y > boardY)) {
    console.log("out of bounds!")
    return;
  }

  // check no one is on this square
  for (var i = 0; i < men; i++) {
    var place = getManPlace(i)
    if ((place.x == myman.x) && (place.y == myman.y)) {
      if (murderer) {
        console.log("infecting "+i)
        infectMan(i)
        return;
      } else {
        console.log("man "+i+" is there already!")
        return i;
      }
    }
  }

  // move the man!
  var man = getMan(number)
  man.setAttributeNS(null, "cx", myman.x * spacing);
  man.setAttributeNS(null, "cy", myman.y * spacing);
}

function getNearestMan(m, colour) {
  var mPlace = getManPlace(m)

  var closest = null;
  var closestScore = 100000;

  for (var i = 0; i < men; i++) {
    if (i !== m) {
      var distance = getDistance(mPlace, getManPlace(i));
      var manColour = getColour(i)
      if (colour == manColour) {
        if (distance < closestScore) {
          closest = i;
          closestScore = distance;
        }
      }
    }
  }

  return closest;
}

function getDistance(place1, place2) {
  var xdistance = Math.abs(place1.x - place2.x)
  var ydistance = Math.abs(place1.y - place2.y)

  return xdistance + ydistance;
}

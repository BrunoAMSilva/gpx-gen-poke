export class Greedy {
  bestValue = 0;
  best = [];
  dis = [];
  public points: {x: number, y: number}[] = [];

  public initialize() {
    this.dis = this.countDistances();
    this.bestValue = 0;
    this.best = [];
    this.best.push(parseInt((Math.random() * (this.points.length - 1)).toString()));
  }

  public setFirstPoint() {
    var maxx = 0;
    var foundIdx = 0;
    for (var i = 0; i < this.points.length; i++) {
      if (this.points[i].x > maxx) {
        maxx = this.points[i].x;
        foundIdx = i;
      }
    }
    return foundIdx;
  }

  public findNextPoint() {
    if (this.best.length === this.points.length) {
      return;
    }
    var currentIdx = this.best[this.best.length - 1];
    var mind = Number.MAX_VALUE;
    var nextPoint = 0;
    for (var i = 0; i < this.points.length; i++) {
      if (this.best.indexOf(i) === -1) {
        if (this.dis[currentIdx][i] < mind) {
          mind = this.dis[currentIdx][i];
          nextPoint = i;
        }
      }
      this.best.push(nextPoint);
    }

  }
  private countDistances() {
    var length = this.points.length;
    var dis = new Array(length);
    for (var i = 0; i < length; i++) {
      dis[i] = new Array(length);
      for (var j = 0; j < length; j++) {
        dis[i][j] = distance(this.points[i], this.points[j]);
      }
    }
    return dis;
  }
}
function distance(p , p1) {
  return getDistanceFromLatLonInKm(p.x, p.y, p1.x, p1.y);
}
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1);  // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180)
}
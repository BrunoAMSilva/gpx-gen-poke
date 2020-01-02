import {
  Component,
  ViewChild,
  ChangeDetectionStrategy,
  ElementRef
} from "@angular/core";
import { data as dataTudoPorto } from "./allPorto";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  dados = dataTudoPorto;
  name = "Angular 6";
  raio = 1;
  velocidade = 9.5;
  perHour = vel => (60 * 60 * 1000) / vel;
  runFast = 1666170;
  local = "allPorto";
  center;
  centerPoint;
  items: { lat: number; lon: number; distance?: number }[];
  currentRoute;
  gyms;
  gymsOnly = false;
  @ViewChild("txt") private _textbox: ElementRef;
  public ginasioAtual: any;
  constructor() {
    this.criaGPX();
    this.procurar("");
  }

  setCenter(point) {
    this.centerPoint = { lat: point.coords.lat, lon: point.coords.lng };
    this.center = this.centerPoint;
  }

  text: string;
  localChanged() {
    switch (this.local) {
      case "allPorto":
        this.dados = dataTudoPorto;
        break;
      default:
        break;
    }
  }
  criaGPX() {
    this.center = this.centerPoint;
    this.ginasioAtual = undefined;
    this.localChanged();
    let mindistance = Number.MAX_VALUE;
    for (let i = 0; i < 10; i++) {
      var it;
      if (this.gymsOnly) {
        it = this.dados.gyms.map(g => {
          return { lat: g.longitude, lon: g.latitude };
        });
      } else {
        it = this.dados.gyms.map(g => {
          return { lat: g.longitude, lon: g.latitude };
        });
      }
      this.items = JSON.parse(JSON.stringify(it));
      let center = this.items.reduce(
        (p, c, i, s) => {
          p.lat = (p.lat + c.lat) / 2;
          p.lon = (p.lon + c.lon) / 2;
          return p;
        },
        { lat: 0, lon: 0 }
      );
      if (this.local == "sjm") {
        center.lat = 40.89799;
        center.lon = -8.4918;
      }
      this.centerPoint
        ? (this.centerPoint = this.centerPoint)
        : (this.centerPoint = center);
      this.center = this.centerPoint;
      this.items = this.items.filter(
        p =>
          getDistanceFromLatLonInKm(
            p.lat,
            p.lon,
            this.center.lat,
            this.center.lon
          ) < this.raio
      );
      //this.currentRoute = this.createGPX(i);
      if (this.currentRoute && this.currentRoute.distance < mindistance) {
        mindistance = this.currentRoute.distance;
        this.text =
          `<?xml version="1.0"?>
<gpx version="1.1" creator="Miguel Duarte - ${this.local} at ${
            this.velocidade
          }km/h (${this.raio}Km) - total ${mindistance.toFixed(2)}Km">\n` +
          this.currentRoute.route
            .map(
              (x, i) =>
                `<wpt lat="${x.lat}" lon="${
                  x.lon
                }"><ele>${i}</ele><time>${x.date
                  .toJSON()
                  .replace(/\.\d+Z/, "Z")}</time></wpt>`
            )
            .join("\n") +
          `\n</gpx>`;
        this.copiarTexto();
      }
    }
    /* console.log(currentRoute.route.reduce((p, c) => ))
     */
    console.log(mindistance);
  }

  procurar(texto) {
    this.localChanged();
    texto = texto.replace(" ", ".*");
    if (texto != "")
      this.gyms = this.dados.gyms
        .filter(g => new RegExp(texto, "gi").test(g.gym_name))
        .sort((a, b) => (a.isEx ? -1 : 1));
    else this.gyms = this.dados.gyms.filter(g => g.isEx);
  }

  public copiarCoordsLista(value) {
    this.center = undefined;
    this.currentRoute = undefined;
    this.ginasioAtual = value;
    this.centerPoint = { lat: value.longitude, lon: value.latitude };
    this.text =
      '<wpt lat="' + value.longitude + '" lon="' + value.latitude + '">';
    this.copiarTexto();
  }

  private copiarTexto() {
    setTimeout(_ => {
      this._textbox.nativeElement.select();
      document.execCommand("copy");
    }, 100);
  }

  createGPX(index) {
    let items: { lat: number; lon: number; distance?: number }[] = JSON.parse(
      JSON.stringify(this.items)
    );
    let aux: {
      lat: number;
      lon: number;
      distance?: number;
      date?: Date;
    }[] = [];

    aux.push(items.slice(index, index + 1).pop());
    console.log(items);
    while (items.length > 0) {
      aux.push(maisProxima(aux[aux.length - 1], items).pop());
    }

    let acumulado = 0;
    let totalDistance = 0;
    aux.push(JSON.parse(JSON.stringify(aux[0])));
    aux.forEach((p, i, s) => {
      p.distance =
        i == 0
          ? 0
          : getDistanceFromLatLonInKm(s[i - 1].lat, s[i - 1].lon, p.lat, p.lon);
      p.date =
        i == 0
          ? new Date()
          : new Date(
              s[i - 1].date.getTime() +
                this.perHour(this.velocidade) * p.distance
            );
      totalDistance += p.distance;
    });
    /*
    aux.push({lat: aux[0].lat,lon: aux[0].lon,
      distance : getDistanceFromLatLonInKm(aux[aux.length - 1].lat, aux[aux.length - 1].lon, aux[0].lat, aux[0].lon),
      date :new Date(aux[aux.length - 1].date.getTime() + (this.perHour(this.velocidade) * getDistanceFromLatLonInKm(aux[aux.length - 1].lat, aux[aux.length - 1].lon, aux[0].lat, aux[0].lon)))
    });*/
    // this.text = aux.map((x, i) => `<wpt lat="${x.lat}" lon="${x.lon}"><ele>${i}</ele><time>${x.date.toJSON().replace(/\.\d+Z/, 'Z')}</time></wpt>`).join('\n');

    return { distance: totalDistance, route: aux };
    /*let tsp = new Tsp();
    let latLong = items.map(p => [p.lat, p.lon]);
    tsp.getShortestRoute(latLong);*/
  }
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function maisProxima(p: { lat: number; lon: number }, lista: any[]) {
  let sorted = lista.sort(
    (p1, p2) =>
      getDistanceFromLatLonInKm(p.lat, p.lon, p2.lat, p2.lon) -
      getDistanceFromLatLonInKm(p.lat, p.lon, p1.lat, p1.lon)
  );

  return sorted;
}

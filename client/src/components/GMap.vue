<template></template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
export default {
  name: "GMap",
  data() {
    return {
      map: null,
      popup: null,
      center: [50.449283, 30.529558],
      //  50°27′00″N 30°31′24″E
    };
  },
  methods: {
    refreshPoints() {
      // this.createPoint(50.27, 30.31);
      this.createPoint(50.449283, 30.529558);
      this.createPoint(50.449402, 30.53004);
    },
    setupLeafletMap: function () {
      this.map = L.map("mapContainer").setView(this.center, 26);
      this.popup = L.popup();

      //   const at =
      //     "pk.eyJ1IjoibG9yZHdvbGY4MSIsImEiOiJja3g1MWt1YTMxYmNlMm51cXM1ODZ0ZjBrIn0.qQ-uHne3y0LQBtbg2gsXEQ";
      //   L.tileLayer(
      //     "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      //     {
      //       attribution:
      //         'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
      //       maxZoom: 28,
      //       tileSize: 512,
      //       zoomOffset: -1,
      //       id: "mapbox/streets-v11",
      //       accessToken:
      //         "pk.eyJ1IjoibG9yZHdvbGY4MSIsImEiOiJja3g1MWt1YTMxYmNlMm51cXM1ODZ0ZjBrIn0.qQ-uHne3y0LQBtbg2gsXEQ",
      //     }
      //   ).addTo(map);

      L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
        minZoom: 1,
      }).addTo(this.map);

      this.refreshPoints();
    },
    createPoint(lat, lng) {
      let myIcon = L.icon({
        iconUrl: require("../assets/images/marker-icon.png"),
        iconSize: [12, 12],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
        shadowUrl: require("../assets/images/marker-shadow.png"),
        shadowSize: [12, 12],
        shadowAnchor: [22, 94],
      });

      //L.marker([lat, lng], { icon: myIcon }).addTo(this.map);
      L.circleMarker([lat, lng], {
        radius: 10,
        color: "red",
        weight: 3,
      }).addTo(this.map);
    },

    resizeMap() {
      console.log("ok");
      // console.log(this.map.getBounds());
    },
    onMapClick(e) {
      this.popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(this.map);
    },
  },
  mounted() {
    this.setupLeafletMap();

    this.map.on("zoom", this.resizeMap);
    this.map.on("click", this.onMapClick);
  },
};
</script>

<style>
</style>
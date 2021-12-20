<template>
  <div class="main container-fluid">
    <div class="mapDiv">
      <div id="mapContainer" class="map"></div>
    </div>

    <div class="cardsDiv">
      <div class="cardsEdit">
        <div class="mb-3">
          <label for="address" class="form-label">address</label>
          <input
            type="text"
            class="form-control"
            id="address"
            placeholder="address"
            :value="selectAdres.display_name || ''"
          />
        </div>

        <button class="btn btn-primary" @click="addPoint">Add</button>
        <!-- <button @click="getAllPoint">All</button> -->
      </div>
      <div class="cardsShow">
        <div v-show="arrPoints.length">
          <div v-for="record of arrPoints" :key="record._id">
            <card-point :record="record"> </card-point>
          </div>
        </div>
      </div>

      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

import L from "leaflet";
import "leaflet.markercluster/dist/leaflet.markercluster-src.js";
import api from "@/api/api.service";
import CardPoint from "./components/CardPoint.vue";

export default {
  name: "App",
  components: { CardPoint },
  data() {
    return {
      map: null,
      zoom: 14,
      maxZoom: 19,
      minZoom: 1,
      popup: null,
      center: [50.449283, 30.529558],
      selectAdres: { display_name: "" },
      selectMarker: null,
      arrPoints: [],
      markers: null,
      bounds: null,
    };
  },
  methods: {
    setupLeafletMap: function () {
      this.map = L.map("mapContainer").setView(this.center, this.zoom);
      L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: this.maxZoom,
        minZoom: this.minZoom,
        dragging: false,
      }).addTo(this.map);

      //this.popup = L.popup();

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
    },
    async loadPoints(bounds) {
      this.arrPoints = (await api.getRecords(bounds)).data;
      this.markers = L.markerClusterGroup({
        showCoverageOnHover: false,
      });

      this.arrPoints.forEach((item) => {
        let marker = this.drawPoint(item);
        marker.on("click", this.selectPoint);
        this.markers.addLayer(marker);
      });
      this.map.addLayer(this.markers);
    },
    drawPoint(record) {
      let myIcon = L.icon({
        iconUrl: require("@/assets/images/pngwing.com.png"),
        iconSize: [24, 24],
        shadowSize: [24, 24],
      });

      return L.marker([record.lat, record.lon], {
        icon: myIcon,
        myCustomId: record._id,
      });
    },
    async onMapClick(e) {
      this.bounds = this.map.getBounds();

      this.selectAdres = (await api.getAdress(e.latlng)).data;
      this.selectMarker.setLatLng(e.latlng);
      this.map.setView(e.latlng);
    },
    async addPoint() {
      //console.log(this.selectAdres);
      // console.log(this.selectMarker);
      let ll = this.selectMarker.getLatLng();
      //console.log(ll);
      let tt = {
        title: this.selectAdres.display_name,
        lat: ll.lat,
        lon: ll.lng,
        adress: {
          house_number: this.selectAdres.address.house_number,
          road: this.selectAdres.address.road,
          neighbourhood: this.selectAdres.address.neighbourhood,
          suburb: this.selectAdres.address.suburb,
          borough: this.selectAdres.address.borough,
          city: this.selectAdres.address.city,
          postcode: this.selectAdres.address.postcode,
          country: this.selectAdres.address.country,
          country_code: this.selectAdres.address.country_code,
        },
      };

      await api.addRecords(tt);
      this.loadPoints(this.bounds);
    },
    selectPoint(e) {
      // this.map.setView(e.latlng, 17);
    },
    setRentacle() {
      // console.log("bounds");
      this.bounds = this.map.getBounds();
      this.loadPoints(this.bounds);
      // console.log(this.bounds);
      // set map
      this.map.fitBounds(this.bounds);
      console.log(this.bounds);
      console.log(this.arrPoints);
    },
  },

  mounted() {
    this.setupLeafletMap();
    this.bounds = this.map.getBounds();
    this.loadPoints(this.bounds);

    let myIcon = L.icon({
      iconUrl: require("@/assets/images/marker-icon.png"),
      iconSize: [24, 24],
      iconAnchor: [22, 24],
      popupAnchor: [-3, -76],
      shadowUrl: require("@/assets/images/marker-shadow.png"),
      shadowSize: [24, 24],
      shadowAnchor: [24, 24],
    });

    this.selectMarker = L.marker([this.center[0], this.center[1]], {
      icon: myIcon,
    }).addTo(this.map);
    // // this.map.on("zoom", this.resizeMap);
    this.map.on("click", this.onMapClick);
    this.map.on("dragend", this.setRentacle);
    this.map.on("zoomend", this.setRentacle);
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 10px;
  height: 95vh;
  min-height: 95vh;
}
.main {
  width: 1200px;
  height: 800px;
  margin: 10px;
  border: 1px solid red;
  display: flex;
  flex-direction: row;
}

.mapDiv {
  width: 100%;
  height: 100%;
  min-height: 100%;
  /* min-height: 100%; */
  /* min-height: 600px; */
  background-color: cadetblue;
  border: 1px solid green;
  padding: 10px;
}

.map {
  height: 100%;
  width: 100%;
  min-height: 100%;
  /* height: 90vh;
  min-height: 100%; */
}
.cardsShow {
  /* height: 80vh;
  min-height: 100%; */
  width: 350px;
  padding: 4px;
  overflow: auto;
  margin: 10px;
  height: 650px;
  display: flex;
  flex-direction: column;
}
.cardsEdit {
  height: 150px;
  margin: 10px;
  padding: 4px;
  display: flex;
  flex-direction: column;
}
</style>

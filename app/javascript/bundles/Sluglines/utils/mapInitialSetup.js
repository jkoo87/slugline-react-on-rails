import ReactMapboxGl from "react-mapbox-gl";

export const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1Ijoiamtvbzg3IiwiYSI6ImNqODR4MjV5ODBmMjgycW82dzZ1MG56MnAifQ.W-XPeSwFh6fJ5B9Dujfw9A",
  scrollZoom: true,
  hash: true,
  minZoom: 7
});

export const styles =  {
  container: {
    height: "100vh",
    width: "50%"
  },
  stationDescription: {
    position: "absolute",
    bottom: 0,
    left: 0,
    padding: "16px 0px",
    textAlign: "center",
    backgroundColor: "white"
  },
  popup: {
    background: "gold",
    padding: "0px",
    borderRadius: "2px"
  },
  clusterMarker: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    backgroundColor: "#51D5A0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    border: "2px solid #56C498",
    cursor: "pointer"
  },
  marker: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    borderRadius: "3em 3em 0.4em 3em",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid rgb(241, 29, 29)",
    backgroundColor: "rgb(241, 29, 29)",
    cursor: "pointer"
  }
};

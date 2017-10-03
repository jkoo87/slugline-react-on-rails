import ReactMapboxGl from "react-mapbox-gl";

export const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1Ijoiamtvbzg3IiwiYSI6ImNqODR4MjV5ODBmMjgycW82dzZ1MG56MnAifQ.W-XPeSwFh6fJ5B9Dujfw9A",
  scrollZoom: true,
  hash: false
});

export const styles = {
  container: {
    height: "50vh",
    width: "100%"
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
  }
};

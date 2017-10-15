import geolib from "geolib"

export function getBoundsArr(arr) {
  const boundingBoxes = []
  arr.forEach((obj)=>{
    return boundingBoxes.push({latitude: obj.latitude, longitude: obj.longitude})
  })
  return geolib.getBounds(boundingBoxes)
}

export function getBoundsArrFromCluster(arr) {
  const boundingBoxes = []
  arr.forEach((obj)=>{
    return boundingBoxes.push({latitude: obj.props.coordinates[1], longitude: obj.props.coordinates[0]})
  })
  return geolib.getBounds(boundingBoxes)
}

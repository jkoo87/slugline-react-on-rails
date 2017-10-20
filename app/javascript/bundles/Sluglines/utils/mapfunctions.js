import geolib from "geolib"

export function getBoundsArr(sluglines) {
  const boundingBoxes = []
  sluglines.features.forEach((obj)=>{
    return boundingBoxes.push({latitude: obj.geometry.coordinates[1], longitude: obj.geometry.coordinates[0]})
  })
  return geolib.getBounds(boundingBoxes)
}

export function getBoundsArrFromCluster(sluglines) {
  const boundingBoxes = []
  sluglines.features.forEach((obj)=>{
    return boundingBoxes.push({latitude: obj.geometry.coordinates[1], longitude: obj.geometry.coordinates[0]})
  })
  return geolib.getBounds(boundingBoxes)
}

import geolib from "geolib"

export function getBoundsArr(arr) {
  const boundingBoxes = []
  arr.forEach((obj)=>{
    return boundingBoxes.push({latitude: obj.latitude, longitude: obj.longitude})
  })
  return geolib.getBounds(boundingBoxes)
}



export function getLineColor(line) {
  switch(line){
    case "Springfield/Lorton Lines":
      return "gold"
      break;
    case "Woodbridge/Dale City":
      return "SteelBlue"
      break;
    case "Stafford Lines":
      return "orange"
      break;
    case "Fredericksburg Lines":
      return "Crimson"
      break;
    case "I-66/Manassas Lines":
      return "DarkCyan "
      break;
    case "Washington DC Lines":
      return "MediumSeaGreen "
      break;
    default:
      return "grey"
  }
}

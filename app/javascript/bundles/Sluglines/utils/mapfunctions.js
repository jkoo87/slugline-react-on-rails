/**
*
*/
export function getLongLat(obj) {
  const longLatArray = []
  longLatArray.push(obj.longitude, obj.latitude)
  return longLatArray
}

export function getLongLatArr(arr) {
  const longLatArray = []
  arr.map((obj)=>{
    const longLat = getLongLat(obj)
    longLatArray.push(longLat)
  })
  return longLatArray
}

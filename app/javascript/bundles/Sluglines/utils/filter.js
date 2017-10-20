/**
*
*/
export function sortOutList(array, string = "") {
  if(string == "" || string == "all"){
    const sortedLines = [...array.morning, ...array.afternoon]
    return sortedLines;
  } else if(string == "morning"){
    const sortedLines = [...array.morning]
    return sortedLines;
  } else if(string == "afternoon"){
    const sortedLines = [...array.afternoon]
    return sortedLines;
  }

}

/**
* Check duplicates in array and return slugline's line string list
*/
export function checkDuplicates(array) {
  const lines = array.features.map(item => item.properties.line);
  const removeDuplicates = lines.filter((elem, i) => {
    return lines.indexOf(elem) == i;
  });
  return removeDuplicates;
}

/**
* Filter Slugline list by lines
*/
export function filterByLines(sluglines, line) {
  const filteredSluglineList = sluglines.features.filter(slugline => {
    return slugline.properties.line === line;
  });
  console.log("filteredSluglineList", filteredSluglineList)
  return filteredSluglineList;
}

/**
* Filter duplicates when scrolled or zoom in/out (mapbox)
*/
export function filterDuplicates(arrArg) {
  const result =  arrArg.reduce((unique, o) => {
      if(!unique.find(obj => obj.id === o.id)) {
      unique.push(o);
      }
      return unique;
  },[]);
  return result
}

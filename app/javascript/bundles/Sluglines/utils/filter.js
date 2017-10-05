/**
* Filter Slugline list by its morning/afternoon key value
*/
export function filterMorningList(sluglines, boolean) {
  console.log("filterMorningList Function")
  const filteredSluglineList = sluglines.filter(line => {
    return line.is_morning === boolean;
  });
  return filteredSluglineList;
}

/**
* Check duplicates in array and return slugline's line string list
*/
export function checkDuplicates(array) {
  console.log("checkDuplicates Function")
  const lines = array.map(item => item.line);
  const removeDuplicates = lines.filter((elem, i) => {
    return lines.indexOf(elem) == i;
  });
  return removeDuplicates;
}

/**
* Filter Slugline list by lines
*/
export function filterByLines(sluglines, line) {
    console.log("filterByLines Function")
  const filteredSluglineList = sluglines.filter(slugline => {
    return slugline.line === line;
  });
  return filteredSluglineList;
}

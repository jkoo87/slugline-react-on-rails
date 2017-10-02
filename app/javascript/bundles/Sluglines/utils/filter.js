/**
* Filter Slugline list by its morning/afternoon key
*/
export function filterMorningList(sluglines, boolean) {
  const filteredSluglineList = sluglines.filter(line => {
    return line.is_morning === boolean;
  });
  return filteredSluglineList;
}

/**
* Check duplicates in array and return slugline's line string list
*/
export function checkDuplicates(array) {
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
  const filteredSluglineList = sluglines.filter(slugline => {
    return slugline.line === line;
  });
  return filteredSluglineList;
}

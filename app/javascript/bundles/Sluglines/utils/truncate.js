/**
* Filter Slugline list by its morning/afternoon key value
*/
export function truncate(string, num){
   if (string.length > num)
      return string.substring(0,num)+'...';
   else
      return string;
};

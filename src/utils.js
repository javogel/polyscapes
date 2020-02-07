//
// UTILITIES 
//

/**
 * Pick random item from array.
 */
export function pickRandom(list){
    return list[Math.floor(Math.random()*list.length)];
  }
  
  /**
   * Randomize array element order in-place.
   * Using Durstenfeld shuffle algorithm.
   */
export function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
  }
  
  /**
   * Waits until document is ready to execute callback
   */
export function onDocumentReady(f) {
    /in/.test(document.readyState) ? setTimeout("onDocumentReady(" + f + ")", 9) : f();
  }
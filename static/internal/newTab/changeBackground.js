export function changeBackground() {
  /*
   Checks if this cookie exist and if not make
   the background the color of "background" if it
   does exists set "background" value to "null"
  */

  // TODO: Before creating this cooking check if it exists 
  // and if so change "background" to "null"
  let color = "#000000"; // Pitch black
  document.cookie = `background=${color}; max-age=60*60*24*365`;
  let y = document.cookie;
  console.log(y)
}

{
  var i = 12; // function scope
}
//console.log(i); // glop

{
  let j = 45; // block scope
}
//console.log(j); // pas glop

function test() {
  let k = 78;
  {
    let l = "Hello"; // block scope
    console.log(k);
  }
  console.log(l);
}
test();
let i = 1;
function a() {
  
  let j = 2;
  console.log(j);
  b();
  function b(){
    {
      let k = 3; 
    }
    let l = 4;
  }
}
a();



// 4 contexte exécution {} : k
// 3 contexte exécution b() : l 
// 2 contexte exécution a() : j et b()
// 1 contexte exécution global : i et a()

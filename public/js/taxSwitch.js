let toggle=document.querySelector('.toggle');
 let toggle_i=document.getElementsByClassName('togle-i');
 let click=true;
  toggle.addEventListener( 'click',async ()=>{
      for (let info of toggle_i) {
          if (info.style.display != 'inline') {
              info.style.display = 'inline';
          }
          else {
              info.style.display = 'none';
          }
      }
  })
   
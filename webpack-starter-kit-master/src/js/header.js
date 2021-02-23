function headerFunc (){
    const headerMenu = document.querySelector('.header__menu');

    const handlelClick = e => {
      e.preventDefault();
      const currentLink = e.target;
      console.log("currentLink", currentLink)
    
      const activeLink = e.currentTarget.querySelector('.active');
      console.log(" activeLink", activeLink)
    
      if (activeLink) {
        activeLink.classList.remove('active');
      }
      currentLink.classList.add('active');
    };
    
    headerMenu.addEventListener('click', handlelClick);
}

function headerFuncCheck(){
  const headerCheckbox = document.querySelector("#header__toogle")
  const menu = document.querySelector(".header__menu")
  
  
   const showMenu = (e) => {
  
    if(headerCheckbox.checked){
      menu.classList.add("show")
    }else{
      menu.classList.remove("show")
    }
  }
  
  headerCheckbox.addEventListener("click", showMenu) 
}


export {headerFunc, headerFuncCheck}
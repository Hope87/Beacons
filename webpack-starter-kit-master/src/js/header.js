export default function headerFunc (){
    const headerMenu = document.querySelector('.header__menu');

    const handlelClick = e => {
      e.preventDefault();
      const currentLink = e.target;
    
      const activeLink = e.currentTarget.querySelector('.active');
    
      if (activeLink) {
        activeLink.classList.remove('active');
      }
      currentLink.classList.add('active');
    };
    
    headerMenu.addEventListener('click', handlelClick);
}


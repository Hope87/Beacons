export default function cardsFunc(){
    const cards = document.querySelector('.cards');
    const spansArray = document.querySelectorAll('.span-value');
    
    const countersValue = {
      1: 1,
      2: 1,
      3: 1,
      4: 1,
    };
    
    
    const decrement = e => {
      const currentButtonId = Number(e.target.dataset.id);
      const currentButtonClass = e.target.className;
    
    
      if (currentButtonClass === 'decrement' && countersValue[currentButtonId] !== 1) {
        countersValue[currentButtonId] -= 1;
        spansArray[currentButtonId - 1].textContent = countersValue[currentButtonId];
      }
    };
    
    const increment = e => {
      const currentButtonId = Number(e.target.dataset.id);
      const currentButtonClass = e.target.classList.value;
    
      if (currentButtonClass === 'increment') {
        countersValue[currentButtonId] += 1;
        spansArray[currentButtonId - 1].textContent = countersValue[currentButtonId];
      }
    };
    
    cards.addEventListener('click', increment);
    cards.addEventListener('click', decrement);

}



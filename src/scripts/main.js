// const Swiper = require('swiper/bundle');
// require('swiper/css/bundle');

// const swiper = new Swiper('.swiper', {
//     slidesPerView: 4,
//     direction: getDirection(),
//     navigation: {
//       nextEl: '.swiper-button-next',
//       prevEl: '.swiper-button-prev',
//     },
//     on: {
//       resize: function () {
//         swiper.changeDirection(getDirection());
//       },
//     },
  
   
//   });

//   function getDirection() {
//     let windowWidth = window.innerWidth;
//     let direction = window.innerWidth <= 760 ? 'vertical' : 'horizontal';

//     return direction;
//   }


/*любой вставленный код js срабатывает, но код для SWiper или любой js после него или до него - нет...WTF?!*/

document.addEventListener("DOMContentLoaded", function () {
    const descriptionHeading = document.querySelector(
      ".card__description-heading"
    );
    const descriptionDropdown = document.querySelector(
      ".card__description-dropdown"
    );
    const descriptionArrow = document.querySelector(
      ".card__description-arrow"
    );

    let isVisible = false;

    descriptionHeading.addEventListener("click", function () {
      isVisible = !isVisible;

      if (isVisible) {
        descriptionDropdown.style.display = "block";
        descriptionArrow.style.width = "0";
        descriptionArrow.style.height = "0";
        descriptionArrow.style.borderLeft = "5px solid transparent";
        descriptionArrow.style.borderRight = "5px solid transparent";
        descriptionArrow.style.borderTop = "5px solid";
        descriptionArrow.style.marginTop = "13px";
      } else {
        descriptionDropdown.style.display = "none";
        descriptionArrow.style.width = "0";
        descriptionArrow.style.height = "0";
        descriptionArrow.style.borderTop = "5px solid transparent";
        descriptionArrow.style.borderBottom = "5px solid transparent";
        descriptionArrow.style.borderLeft = "5px solid";
        descriptionArrow.style.marginLeft = "5px";
        descriptionArrow.style.marginTop = "9px";
      }
    });
  });
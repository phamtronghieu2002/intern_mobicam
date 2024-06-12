//jquery
$(document).ready(function () {
  console.log("hello");

  const menus = $(".menu-item");

  menus.each(function () {
    $(this).click(() => {

        $(this)
        .children(".sub-menu")
        .click(function (event) {
          event.stopPropagation();
        });

      $(this).children(".sub-menu").slideToggle();
      $(this).toggleClass("active");    
    

        console.log($(this).children(".icon_chevon"));
      $(this).children(".icon_chevon").toggleClass("fa-chevron-left");
      $(this).children(".icon_chevon").toggleClass("fa-chevron-down");
    });
  });
  
});

// const renderComponent = ()=>{



// }


window.onload = function () {
  

};

const fetchComponent=(path)=>{
    fetch(path)
    .then(response => response.text())
    .then(headerContent => {
      const wrapper = document.querySelector('#main-content');
      wrapper.innerHTML = headerContent; 
    });
}

const renderComponent = (page) => {
        overlay.classList.remove("d-none");
        switch (page) {
            case "productpage":
                fetchComponent("/admin/dashboard");
                overlay.classList.add("d-none");
                break;
        
            default:
                break;
        }
}
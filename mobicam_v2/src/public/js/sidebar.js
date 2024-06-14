//jquery
$(document).ready(function () {


  const menus = $(".menu-item");
  const currentPath = window.location.pathname.substring(1);

  // Lấy "page"
  const parts = currentPath.split('/'); // Tách chuỗi thành mảng
  const mainPageName = parts[parts.length - 2]; 
  
  // Lấy "product"
  const subPageName = parts[parts.length - 1]; 
  

  menus.each(function () {

    const menu_children = $(this).children(".sub-menu");
   
    const typeMenu= $(this).attr("type");
    console.log("typeMenu", typeMenu);
    if(typeMenu === mainPageName){
      menu_children.slideToggle();

      const sub_menu_item =menu_children.find(".sub-menu-item");


      sub_menu_item.each(function(){
        const type_sub_menu = $(this).attr("type");
        console.log("type_sub_menu", type_sub_menu);
        if(type_sub_menu === subPageName){
          $(this).addClass("active");
        }
      });
  
    }
    if(subPageName !== "dashboard" && typeMenu== mainPageName){
      $(this).toggleClass("active");    
    }
    $(this).click(() => {
        menu_children
        .click(function (event) {
          event.stopPropagation();
        });

        menu_children.slideToggle();
       $(this).toggleClass("active");    
        

      $(this).children(".icon_chevon").toggleClass("fa-chevron-left");
      $(this).children(".icon_chevon").toggleClass("fa-chevron-down");
    });
  });
  
});

// const renderComponent = ()=>{



// }





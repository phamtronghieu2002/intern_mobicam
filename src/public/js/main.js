$(document).ready(function () {
  //carousel certificert
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 0,
    responsiveClass: true,
    dots: true,
    navText: [
      "<i class='fa fa-chevron-left'></i>",
      "<i class='fa fa-chevron-right'></i>",
    ],
    // autoplay: true,
    responsive: {
      0: {
        items: 1,
        nav: true,
      },
      600: {
        items: 2,
        nav: false,
      },
      1000: {
        items: 3,
        nav: true,
        loop: false,
      },
    },
  });

  //customize select language ui
  var selectElement;
  setTimeout(() => {
    $(".goog-te-combo option:first-child").remove();
    selectElement = document.querySelector(".goog-te-combo");
  }, 1000);

  const viLangBtn = $(".change-lang .lang-vi");

  viLangBtn.click(function () {
    var optionToSelect = selectElement.querySelector('option[value="vi"]');
    selectElement.value = optionToSelect.value;
    var event = new Event("change");
    selectElement.dispatchEvent(event);
    enLangBtn.toggleClass("d-none");
    viLangBtn.toggleClass("d-none");
  });

  const enLangBtn = $(".change-lang .lang-en");
  enLangBtn.click(function () {
    var optionToSelect = selectElement.querySelector('option[value="en"]');
    selectElement.value = optionToSelect.value;
    var event = new Event("change");
    selectElement.dispatchEvent(event);
    enLangBtn.toggleClass("d-none");
    viLangBtn.toggleClass("d-none");
  });

  // handle open menu reponsive
  $(".btn_bar").click(function () {
    $(".btn_bar").toggleClass("fa-xmark");
    $(".btn_bar").toggleClass("fa-bars");
    $(".menu-responsive").toggleClass("show-on-mobile");
  });
});

const checkIsMobileAndTabletWidth = () => {
  const screenWidth = window.innerWidth;
  if ((screenWidth < 900 && screenWidth > 739) || screenWidth < 768) {
    return true;
  }
  return false;
};

const handleClickMenu = (event) => {
  const menus = document.querySelectorAll(
    ".wrapper header .header_navigation ul a"
  );
  const curentMenu = event.currentTarget;
  menus.forEach((menu) => {
    menu.classList.remove("active");
  });
  curentMenu.classList.add("active");
};

//handle scroll when click to menu
document
  .querySelectorAll(".wrapper header .header_navigation ul a")
  .forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href").substring(2);
      console.log(targetId);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        e.preventDefault();
        const offset = 100;

        const elementPosition =
          targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

//check with screen and handle when click cat tab

if (checkIsMobileAndTabletWidth()) {
  const tabCats = document.getElementsByClassName("nav-item");
  const content_tab_product = document.getElementById("content_tab_product");
  content_tab_product.style.display = "none";

  for (let i = 0; i < tabCats.length; i++) {
    tabCats[i].setAttribute("data-bs-toggle", "modal");
    tabCats[i].setAttribute("data-bs-target", "#modalProductTab");
  }
}
const handleClickCategoriesTabResponsive = async (event, catid) => {
  if (checkIsMobileAndTabletWidth()) {
    const res = await axios.get(`/category/${catid}`);
    const products = res.data.products;
    const content_modal_product = document.querySelector(".carousel-inner");

    let htmlContent = "";
    // Không cần tạo productItem ở đây nữa
    for (let i = 0; i < products.length; i++) {
      active = i === 0 ? "active" : "";
      htmlContent += `
      <div class="carousel-item ${active}">
      <div class="product-item">
      <img
      style="width: 250px; margin: 0 auto;"
      src="${products[i].productimg}"
      alt=""
      class="product-thumb"
    />
    <h3 class="product-name text-primary text-center">${products[i].productname}</h3>
    <div class="product-desc mt-5 pt-2">
      ${products[i].productdesc}
    </div>
    </div>
    </div>
      `;
    }

    content_modal_product.innerHTML = `${htmlContent}`;
  }
};

let defaultTabCat = document.getElementById("defaultOpenCat");
if (defaultTabCat) {
  if (!checkIsMobileAndTabletWidth()) {
    defaultTabCat.click();
  }
}

let defaultTabProduct = document.getElementsByClassName("defaultOpenProduct");
if (defaultTabProduct.length > 0) {
  for (let i = 0; i < defaultTabProduct.length; i++) {
    defaultTabProduct[i].click();
  }

  const articleProduct = document.getElementsByClassName("article_product");
  for (let i = 0; i < articleProduct.length; i++) {
    let contentMardown = articleProduct[i].innerText;
    const parser = new DOMParser();
    let articleHtml = parser.parseFromString(contentMardown, "text/html");
    articleProduct[i].innerHTML = articleHtml.body.innerHTML;
  }
}

function hanndleOpenTabProduct(evt, productid, catid) {
  let i, tablinks;

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName(`cat_${catid}`);
  tabProduct = document.getElementsByClassName(`name-product_${catid}`);

  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.display = "none";
  }
  for (i = 0; i < tabProduct.length; i++) {
    tabProduct[i].className = tabProduct[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  let contentActive = document.getElementById(productid);

  contentActive.style.display = "block";
  evt.currentTarget.className += " active";
}

function hanndleOpenTabCat(evt, catid) {
  // Declare all variables
  let i, tabcontent, tablinks;
  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("nav-item");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  let contentActive = document.getElementById(`cat_${catid}`);

  contentActive.style.display = "block";
  evt.currentTarget.className += " active";
  handleClickCategoriesTabResponsive(evt, catid);
}

const handleClickDetailCertification = (event) => {
  let clickElement = event.currentTarget;
  const thumb_certification = clickElement
    .querySelector(".thumb-certificert")
    .getAttribute("src");
  const heading_certification =
    clickElement.querySelector("#certificert-name").innerText;

  const thumb_certificert_modal = document.getElementById(
    "thumb_certificert_modal"
  );
  const heading_certificert_modal = document.getElementById(
    "heading_certificert_modal"
  );
  thumb_certificert_modal.setAttribute("src", thumb_certification);
  heading_certificert_modal.innerText = heading_certification;
};

// handle counter up
const year_develop = document.querySelector(".year_develop .sub__number");
const customer = document.querySelector(".customer .sub__number");
const user = document.querySelector(".user .sub__number");
const viehical = document.querySelector(".viehical .sub__number");

function counterUp(el, to) {
  let speed = 200;
  let from = 0;
  let step = to / speed;
  const counter = setInterval(function () {
    from += step;
    if (from > to) {
      clearInterval(counter);
      el.innerText = to;
    } else {
      el.innerText = Math.ceil(from);
    }
  }, 1);
}
if (year_develop) {
  counterUp(year_develop, 5);
  counterUp(customer, 1500);
  counterUp(user, 5000);
  counterUp(viehical, 20000);
}

//                                             RenderItem Benefit
const right_content = document.querySelector(".right-content");
benifitItems.forEach((item) => {
  const benifitItem = document.createElement("div");

  benifitItem.classList.add("benifit-item", "mb-3");
  benifitItem.innerHTML = `
  <img src="${item.thumb}" alt="mobicam-lợi ích của khách hàng" class="d-none">
  <div class="benifit-icon">
    <i class="fas ${item.icon}"></i>
  </div>
  <div class="information">
    <h6 class="fw-bold">${item.title}</h6>
    <p>
      ${item.content}
    </p>
  </div>
  `;
  benifitItem?.addEventListener("mouseover", function () {
    let imgThumbHover = benifitItem.querySelector("img").getAttribute("src");
    let main_img_content_benifit = document.querySelector(
      ".main_img_content_benifit"
    );
    main_img_content_benifit.setAttribute("src", imgThumbHover);
  });
  right_content?.appendChild(benifitItem);
});

//                                              RenderItem  fetures
const feature_content = document.querySelector(".list-best-feture .row");
bestFeaturesItems.forEach((feature) => {
  const featureItem = document.createElement("div");
  featureItem.classList.add(
    "col-lg-3",
    "col-md-6",
    "col-sm-12",
    "mb-3",
    "d-flex",
    "justify-content-center"
  );
  featureItem.innerHTML = `
  <div class="item">
    <div class="feture-item-img">
      ${feature.svg}
    </div>
    <div class="information">
      <p class="item_title fw-bold fs-6">${feature.title}</p>
      <p class="item_desc">
        ${feature.desc}
      </p>
    </div>
  </div>
  `;
  feature_content?.appendChild(featureItem);
});

//                                              Render certificert Items
const certificert_content = document.querySelector(".list-certificate");

certificertItems.forEach((certificert) => {
  const certificertItem = document.createElement("div");
  certificertItem.classList.add("policy_content-img");
  certificertItem.setAttribute("data-bs-toggle", "modal");
  certificertItem.setAttribute("data-bs-target", "#modalDetailCertificert");
  certificertItem.innerHTML = `
  <p id="certificert-name" class="d-none">
    ${certificert.name}
  </p>
  <img
    class="thumb-certificert"
    src="${certificert.thumb}"
    alt=""
  />
  `;
  certificertItem?.addEventListener("click", handleClickDetailCertification);
  certificert_content?.appendChild(certificertItem);
});

//

$(document).ready(function () {
  //carousel certificert
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 0,
    responsiveClass: true,
    dots: true,
    autoplay: true,
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

  //carousel product

  //customize select language ui
  setTimeout(() => {
    $(".goog-te-combo option:first-child").remove();
  }, 800);

  //handle toogle menu
  $(".btn_bar").click(function () {
    $(".btn_bar").toggleClass("fa-xmark");
    $(".btn_bar").toggleClass("fa-bars");
    $(".menu-responsive").toggleClass("show-on-mobile");
  });

  // handle tab -product
});

//handle scroll when click to menu
document
  .querySelectorAll(".wrapper header .header_navigation a")
  .forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      const offset = 100;

      const elementPosition =
        targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    });
  });

//check with screen
const screenWidth = window.innerWidth;
const handleClickCategoriesTabResponsive = async (event, catid) => {
  if (screenWidth < 768) {
    const res = await axios.get(`/category/${catid}`);
    const products = res.data.products;
    const content_modal_product = document.querySelector(".carousel-inner");

    let htmlContent = "";
    // Không cần tạo productItem ở đây nữa
    for (let i = 0; i < products.length; i++) {
      active= i === 0 ? "active" : "";
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
    <div class="product-desc mt-3">
      ${products[i].productdesc}
    </div>
    </div>
    </div>
      `;
    }
    console.log("htmlContent", htmlContent);

    content_modal_product.innerHTML = `${htmlContent}`;
  }
};

let defaultTabCat = document.getElementById("defaultOpenCat");
if (defaultTabCat) {
  defaultTabCat.click();
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
  console.log("contentActive", contentActive);
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

  console.log("thumb_certification", thumb_certification);
  console.log("heading_certification", heading_certification);
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
counterUp(year_develop, 5);
counterUp(customer, 1500);
counterUp(user, 5000);
counterUp(viehical, 20000);

// handle render  benifit item
const benifitItems = [
  {
    title: "HIỆU QUẢ",
    icon: "fa-thumbs-up",
    content:
      "Sản phẩm đáp ứng được mục đích giám sát của doanh nghiệp. Nâng cao chất lượng dịch vụ, tạo ra lợi thế cạnh tranh để thúc đẩy doanh thu và đem lợi nhuận cao.",
    thumb:
      "https://mobicam.vn/public/uploads/files/benefit/1654871523_6fd85dfac7839558a03b.png",
  },
  {
    title: "TIẾT KIỆM",
    icon: "fa-piggy-bank",
    content:
      "Thiết bị được tích hợp nhiều tính năng công nghệ mới, hoạt động ổn định, bền bỉ, tiết kiệm thời gian và chi phí đầu tư nhiều lần. Từ đó, nâng cao năng lực quản lý và tối ưu chi phí vận hành.",
    thumb:
      "https://mobicam.vn/public/uploads/files/benefit/1655959585_3f81e0e54e10b59eedfb.png",
  },
  {
    title: "AN TOÀN",
    icon: "fa-lock",
    content:
      "Thiết bị được tích hợp nhiều tính năng công nghệ mới, hoạt động ổn định, bền bỉ, tiết kiệm thời gian và chi phí đầu tư nhiều lần. Từ đó, nâng cao năng lực quản lý và tối ưu chi phí vận hành.",
    thumb:
      "https://mobicam.vn/public/uploads/files/benefit/1654871509_ed8a2876a28a44c0bf72.png",
  },
  {
    title: "Linh Hoạt",
    icon: "fa-thumbs-up ",
    content:
      "Thiết bị được tích hợp nhiều tính năng công nghệ mới, hoạt động ổn định, bền bỉ, tiết kiệm thời gian và chi phí đầu tư nhiều lần. Từ đó, nâng cao năng lực quản lý và tối ưu chi phí vận hành.",
    thumb:
      "https://mobicam.vn/public/uploads/files/benefit/1655959639_d41bbd149622c6b7a95e.png",
  },
];

const right_content = document.querySelector(".right-content");

benifitItems.forEach((item) => {
  const benifitItem = document.createElement("div");

  benifitItem.classList.add("benifit-item", "mb-3");
  benifitItem.innerHTML = `
  <img src="${item.thumb}" alt="mobicam_lợi ích của khách hàng" class="d-none">
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
  benifitItem.addEventListener("mouseover", function () {
    let imgThumbHover = benifitItem.querySelector("img").getAttribute("src");
    let main_img_content_benifit = document.querySelector(
      ".main_img_content_benifit"
    );
    main_img_content_benifit.setAttribute("src", imgThumbHover);
  });
  right_content.appendChild(benifitItem);
});

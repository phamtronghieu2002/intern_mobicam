let overlay = document.getElementById("overlay");
let imgInp = document.getElementById("image_news");
let blah_news = document.getElementById("preview_news");

const markdownFormNews = document.getElementById("markdownFormNews");
const markdownFormProduct = document.getElementById("markdownFormProduct");

//
const tab_editProduct = document.getElementById("nav-editProduct-tab");
const tab_addProduct = document.getElementById("nav-addProduct-tab");
const parentContentProduct = document.getElementById("nav-addProduct");

//
let imgInpProduct = document.getElementById("image_product");
let blah_product = document.getElementById("preview_product");

let easyMDE = new EasyMDE({
  element: document.getElementById("markdown"),
});

let easyMDE_product = new EasyMDE({
  element: document.getElementById("markdown_product"),
});

const hanldeChangeImage = () => {
  if (imgInp) {
    imgInp.onchange = (evt) => {
      const [file] = imgInp.files;
      if (file) {
        blah_news.src = URL.createObjectURL(file);
      }
    };
  }
  if (imgInpProduct) {
    imgInpProduct.onchange = (evt) => {
      const [file] = imgInpProduct.files;
      if (file) {
        blah_product.src = URL.createObjectURL(file);
      }
    };
  }
};

hanldeChangeImage();

let title = document.getElementById("title");
let fileInputNews = document.getElementById("image_news");
let btnEditNews = document.querySelector(".editNews");
let btnAddNews = document.querySelector(".addNews");
let btnCancelNews = document.querySelector(".cancelNews");
let id_edit_news = document.getElementById("id_edit_news");

let nameProduct = document.getElementById("name");
let fileInputProduct = document.getElementById("image_product");
let btnEditProduct = document.querySelector(".editProduct");
let btnAddProduct = document.querySelector(".addProduct");
// let btnCancelProduct = document.querySelector(".cancelProduct");
let id_edit_product = document.getElementById("id_edit_product");

let categories = document.getElementById("category_product");
let converter = new showdown.Converter();

const handleAddNew = async () => {
  try {
    overlay.classList.remove("d-none");
    let markdownContent = easyMDE.value();

    let content = converter.makeHtml(markdownContent);

    let titleTxt = title.value;
    console.log("titleTxt", titleTxt);
    let formData = new FormData();

    if (fileInputNews.files && fileInputNews.files[0]) {
      formData.append("image", fileInputNews.files[0]);
    }

    const res = await axios.post("/admin/uploadimage", formData);
    const imageUrl = res.data.path;
    const result = await axios.post("/admin/add-new", {
      title: titleTxt,
      content,
      imageUrl,
    });

    if (result.data) {
      overlay.classList.add("d-none");
      window.location.reload();
    }
  } catch (err) {
    console.log(err);
  }
};

const handleClickEditNew = (id) => {
  id_edit_news.innerText = id;
  btnEditNews.classList.remove("d-none");
  btnAddNews.classList.add("d-none");
  btnCancelNews.classList.remove("d-none");
  const titleEdit = document.getElementById(`titleNews${id}`).innerText;
  const contentEdit = document.getElementById(`contentNews${id}`).innerText;
  const imgEdit = document.getElementById(`imgNews${id}`).innerText;
  const turndownService = new TurndownService();
  const markdown = turndownService.turndown(contentEdit);

  title.value = titleEdit;

  easyMDE.value(markdown);

  blah_news.src = imgEdit;
};

const handleCancelEditProduct = () => {

  overlay.classList.remove("d-block");
  overlay.classList.add("d-none");
  btnEditProduct.classList.add("d-none");
  btnAddProduct.classList.remove("d-none");
  // btnCancelProduct.classList.add("d-none");
  nameProduct.value = "";
  easyMDE_product.value("");
  blah_product.src ="https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg";
  parentContentProduct.appendChild(markdownFormProduct);
  markdownFormProduct.classList.remove("d-block");
  markdownFormProduct.classList.add("d-none");
  markdownFormProduct.classList.add("modal_absolute_content");

};

const handleAddProduct = async () => {
  try {
    overlay.classList.remove("d-none");
    let markdownContent = easyMDE_product.value();

    let content = converter.makeHtml(markdownContent);

    let cat_id = categories.value;

    let nameTxt = nameProduct.value;

    let formData = new FormData();

    if (fileInputProduct.files && fileInputProduct.files[0]) {
      formData.append("image", fileInputProduct.files[0]);
    }

    const res = await axios.post("/admin/uploadimage", formData);
    const imageUrl = res.data.path;
    const result = await axios.post("/admin/add-product", {
      name: nameTxt,
      img: imageUrl,
      desc: content,
      catid: cat_id,
    });

    if (result.data) {
      overlay.classList.add("d-none");
      window.location.reload();
    }
  } catch (err) {
    console.log(err);
  }
};

const handleClickEditProduct = (id) => {
  id_edit_product.innerText = id;
  btnEditProduct.classList.remove("d-none");
  btnAddProduct.classList.add("d-none");
  // btnCancelProduct.classList.remove("d-none");
  const nameEdit = document.getElementById(`nameProduct${id}`).innerText;
  const contentEdit = document.getElementById(`contentProduct${id}`).innerText;
  const imgEdit = document.getElementById(`imgProduct${id}`).innerText;

  const turndownService = new TurndownService();
  const markdown = turndownService.turndown(contentEdit);

  nameProduct.value = nameEdit;

  easyMDE_product.value(markdown);

  categories.value = document.getElementById(`catProduct${id}`).innerText;
  blah_product.src = imgEdit;
  overlay.classList.remove("d-none");
  overlay.classList.add("d-block");
  parentContentProduct.parentNode.insertBefore(
    markdownFormProduct,
    parentContentProduct
  );
  markdownFormProduct.classList.remove("d-none");
  markdownFormProduct.classList.add("d-block");
};

const handleEditProduct = async () => {
  try {
    overlay.classList.remove("d-none");
    var id = id_edit_product.innerText;
    var nameEdit = nameProduct.value;
    var markdownContent = easyMDE_product.value();
    var contentEdit = converter.makeHtml(markdownContent);
    var formData = new FormData();
    let imageUrl = "";
    if (fileInputProduct.files && fileInputProduct.files[0]) {
      formData.append("image", fileInputProduct.files[0]);
      const res = await axios.post("/admin/uploadimage", formData);
      console.log("res", res);
      imageUrl = res.data.path;
    }
    const res = await axios.put(`/admin/update-product/${id}`, {
      name: nameEdit,
      img: imageUrl,
      content: contentEdit,
      catid: categories.value,
      id,
    });
    if (res.data) {
      overlay.classList.add("d-none");
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
};


markdownFormProduct?.addEventListener("submit", function (e) {
  e.preventDefault();
  handleAddProduct();
});


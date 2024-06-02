const base64data = document.getElementById("base64-data");
const imagePreview = document.getElementById("image-preview");
const imagePreviewData = document.getElementById("image-preview-data");
const inputFile = document.getElementById("input-file");
const imageResult = document.getElementById("image-result");
const base64result = document.getElementById("base64-result");
const mydata = document.getElementById("my-data");
const btnSave = document.getElementById("btn-save");
const btnCopy = document.getElementById("btn-copy");
const base64dataInput = document.getElementById("input-base64")
const imagebase64Result = document.getElementById("imagebase64-result")
const linkNav = document.getElementsByClassName("link-nav")
const imageToBase64View = document.getElementById('image_to_base64')
const base64ToImageView = document.getElementById('base64_to_image')
const NAMEITEM = "item_data";
var allMyData = [];
var base64image = "";

const getAllMyData = () => {
  let data = 0
  for (var a in localStorage) {
    if (!localStorage.hasOwnProperty(a)) continue;
    data++
    allMyData.push({ a: localStorage[a] });
  }

  if (data > 0 ) {
    mydata.style.display = "flex";
  } else {
    allMyData = []
    mydata.style.display = "none";
  }
  generateHistory();
};

const generateHistory = () => {
  let datastorage = ``;
  for (var data in allMyData) {
    datastorage += `<li class="li-data">
    <img
      src="${allMyData[data].a}"
      alt="placeholder-${data}"
      class="data-image-preview"
    />
    <p class="li-base64 base64-data">${allMyData[data].a}</p>
    <button
      type="button"
      class="btn-default btn-copy-li"
      onClick="copyToClipboardFromData('${allMyData[data].a}')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6 icon"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
        />
      </svg>
    </button>
    <button
      type="button"
      class="btn-default btn-copy-li"
      onClick="deleteData('${data}')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6 icon"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
        />
      </svg>
    </button>
  </li>`;
  }

  document.getElementById("list-data").innerHTML = datastorage;
};
const resetResult = () => {
  inputFile.value = "";
  imageResult.style.display = "none";
  base64result.style.display = "none";
  // mydata.style.display = "none";
};

const setImagePreview = (e) => {
  const files = e.target.files;
  if (files.length > 0) {
    imageResult.style.display = "flex";
    base64result.style.display = "flex";
    var reader = new FileReader();
    reader.onloadend = function () {
      base64image = reader.result;
      base64data.innerHTML = base64image;
      imagePreview.src = base64image;
    };
    reader.readAsDataURL(files[0]);
  }
};

const storeToLocalStorate = () => {
  let name = `${NAMEITEM}_${allMyData.length}`;
  localStorage.setItem(name, base64image);
  getAllMyData();
};

const copyToClipboard = () => {
  // Copy the text inside the text field
  if (base64image == "") {
    alert("Anda belum melakukan convert data untuk disalin");
    return;
  }
  navigator.clipboard.writeText(base64image);
  // Alert the copied text
  alert("Anda berhasil menyalin data");
};

const copyToClipboardFromData = (text) => {
  // Copy the text inside the text field
  if (text == "") {
    alert("Anda belum melakukan convert data untuk disalin");
    return;
  }
  navigator.clipboard.writeText(text);
  // Alert the copied text
  alert("Anda berhasil menyalin data");
};

window.copyToClipboardFromData = copyToClipboardFromData;

const deleteData = (index) => {
  console.log(index);
  for (var a in localStorage) {
    if (!localStorage.hasOwnProperty(a)) continue;
    if (a.split("_")[2] == index) {
      localStorage.removeItem(a)
    }
  }
  getAllMyData()
};
window.deleteData = deleteData;

inputFile.addEventListener("change", function (e) {
  setImagePreview(e);
});

btnCopy.addEventListener("click", function (e) {
  copyToClipboard();
});

btnSave.addEventListener("click", function (e) {
  storeToLocalStorate();
});


base64dataInput.addEventListener("input", function(e) {
  if (e.target.value != "") {
    imagebase64Result.style.display = "flex"
    imagePreviewData.src = e.target.value
  } else {
    imagebase64Result.style.display = "none"
    imagePreviewData.src = ""
  }
})

const setDeactive = () => {
  for(var i = 0; i < linkNav.length; i++) {
    (function(index) {
      linkNav[index].classList.remove("link-nav-active")
    })(i);
  }
}

for(var i = 0; i < linkNav.length; i++) {
  (function(index) {
    linkNav[index].addEventListener("click", function(e) {
      setDeactive()
      e.target.classList.add("link-nav-active");
      if (e.target.getAttribute("href") == "#base64-to-image") {
        imageToBase64View.style.display = "none"
        base64ToImageView.style.display = "flex"
      }

      if (e.target.getAttribute("href") == "#image-to-base64") {
        imageToBase64View.style.display = "flex"
        base64ToImageView.style.display = "none"
      }
     })
  })(i);
}


resetResult();
getAllMyData();


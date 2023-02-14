const DATA_LOCATION = "data/data.json";
const faqData = getFAQData(DATA_LOCATION);

function toggleItem() {
  const content = this.querySelector(".faq-item-content");
  const caret = this.querySelector(".fa-solid");
  const line = this.querySelector(".faq-line");

  const down = caret.classList.contains("fa-flip-vertical");

  if (down) {
    caret.classList.remove("fa-flip-vertical");
    line.classList.remove("hidden");
  }
  if (!down) {
    caret.classList.add("fa-flip-vertical");
    line.classList.add("hidden");
  }

  const isCollapsed = content.classList.contains("collapse");

  if (!isCollapsed) {
    content.classList.add("collapse");
  }

  if (isCollapsed) {
    content.classList.remove("collapse");
  }
}

async function getFAQData(url) {
  const response = await fetch(url);
  const data = await response.json();
  show(data);
}

function show(data) {
  let items = '<div class="faq-top-line"></div>';
  data.rows.forEach((value, index) => {
    items += `<div class="faq-item">
        <div class="faq-title">
            <p>${index + 1}. ${value.title}</p>
            <i class="fa-solid fa-caret-down"></i>
        </div>
        <div class="faq-line"></div>
        <div class="faq-item-content collapse">
        ${value.content}</div>
    </div>`;
  });


  document.getElementById("faq-items").innerHTML = items;
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    item.addEventListener("click", toggleItem, false);
  });
}

const asideButtons = document.querySelectorAll("#aside_links_parent > li");
const mainPanel = document.querySelector("#main-panel");
const settingPanel = document.querySelector("#setting-panel");
const commentsPanel = document.querySelector("#comments-panel");

asideButtons.forEach((i) => {
  i.addEventListener("click", () => {
    console.log(i.textContent.trim());
    changeAdminPanelFromLinks(i.textContent.trim());

    asideButtons.forEach((i) => {
      i.classList.remove("active_link");
    });
    i.classList.add("active_link");
  });
});

function changeAdminPanelFromLinks(link) {
  switch (link) {
    case "پیشخوان": {
      mainPanel.classList.remove("hidden");
      settingPanel.classList.add("hidden");
      commentsPanel.classList.add("hidden");

      break;
    }
    case "تنظیمات": {
      mainPanel.classList.add("hidden");
      settingPanel.classList.remove("hidden");
      commentsPanel.classList.add("hidden");
      break;
    }
    case "مدیریت نظرات": {
      mainPanel.classList.add("hidden");
      settingPanel.classList.add("hidden");
      commentsPanel.classList.remove("hidden");
      break;
    }
  }
}

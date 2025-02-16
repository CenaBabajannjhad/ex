const asideButtons = document.querySelectorAll("#aside_links_parent > li");
const mainPanel = document.querySelector("#main-panel");
const settingPanel = document.querySelector("#setting-panel");
const commentsPanel = document.querySelector("#comments-panel");
const articlesPanel = document.querySelector("#article-panel");
const bannerPanel = document.querySelector("#banner-panel");
const addReqAdvicePanel = document.querySelector("#ad-req-panel");
const usersPanel = document.querySelector("#users-panel");

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
      articlesPanel.classList.add("hidden");
      bannerPanel.classList.add("hidden");
      addReqAdvicePanel.classList.add("hidden");
      usersPanel.classList.add("hidden")
      break;
    }
    case "مدیریت فایل های PDF": {
      mainPanel.classList.add("hidden");
      settingPanel.classList.remove("hidden");
      commentsPanel.classList.add("hidden");
      articlesPanel.classList.add("hidden");
      bannerPanel.classList.add("hidden");
      addReqAdvicePanel.classList.add("hidden");
      usersPanel.classList.add("hidden")
      break;
    }
    case "مدیریت نظرات": {
      mainPanel.classList.add("hidden");
      settingPanel.classList.add("hidden");
      commentsPanel.classList.remove("hidden");
      articlesPanel.classList.add("hidden");
      bannerPanel.classList.add("hidden");
      addReqAdvicePanel.classList.add("hidden");
      usersPanel.classList.add("hidden")
      break;
    }
    case "مدیریت مقالات": {
      mainPanel.classList.add("hidden");
      settingPanel.classList.add("hidden");
      commentsPanel.classList.add("hidden");
      articlesPanel.classList.remove("hidden");
      bannerPanel.classList.add("hidden");
      addReqAdvicePanel.classList.add("hidden");
      usersPanel.classList.add("hidden")
      break;
    }
    case "مدیریت بنر ها": {
      mainPanel.classList.add("hidden");
      settingPanel.classList.add("hidden");
      commentsPanel.classList.add("hidden");
      articlesPanel.classList.add("hidden");
      bannerPanel.classList.remove("hidden");
      addReqAdvicePanel.classList.add("hidden");
      usersPanel.classList.add("hidden")
      break;
    }
    case "درخواست های مشاوره": {
      mainPanel.classList.add("hidden");
      settingPanel.classList.add("hidden");
      commentsPanel.classList.add("hidden");
      articlesPanel.classList.add("hidden");
      bannerPanel.classList.add("hidden");
      addReqAdvicePanel.classList.remove("hidden");
      usersPanel.classList.add("hidden")
      break;
    }
    case "مدیریت کاربران": {
      mainPanel.classList.add("hidden");
      settingPanel.classList.add("hidden");
      commentsPanel.classList.add("hidden");
      articlesPanel.classList.add("hidden");
      bannerPanel.classList.add("hidden");
      addReqAdvicePanel.classList.add("hidden");
      usersPanel.classList.remove("hidden")
      
      break;
    }
  }
}

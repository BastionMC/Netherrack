const { appWindow } = window.__TAURI__.window;

function nthr_ToggleSideBarList() {
    let sideBar = document.getElementById("sidebar");

    if (sideBar.className == "menu-shown") {
        sideBar.className = "menu-hidden";
    } else {
        sideBar.className = "menu-shown";
    }
};

document.getElementById("titlebar-minimize").addEventListener("click", appWindow.minimize);
document.getElementById("titlebar-maximize").addEventListener("click", appWindow.toggleMaximize);
document.getElementById("titlebar-close").addEventListener("click", appWindow.close);

document.getElementById("titlebar-sidebar").addEventListener("click", nthr_ToggleSideBarList);
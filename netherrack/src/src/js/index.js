const { appWindow } = window.__TAURI__.window;
const invoke = window.__TAURI__.invoke;

document.addEventListener("DOMContentLoaded", function () {
    window.setTimeout(function () {
        invoke("close_splashscreen");
    }, 2000);
});

function nthr_ToggleSideBarList() {
    let sideBar = document.getElementById("sidebar");

    if (sideBar.className == "menu-shown") {
        sideBar.className = "menu-hidden";
    } else {
        sideBar.className = "menu-shown";
    };
};

document.getElementById("titlebar-minimize").addEventListener("click", appWindow.minimize);
document.getElementById("titlebar-maximize").addEventListener("click", appWindow.toggleMaximize);
document.getElementById("titlebar-close").addEventListener("click", appWindow.close);

document.getElementById("titlebar-sidebar").addEventListener("click", nthr_ToggleSideBarList);

// document.body.addEventListener("dblclick", (event) => {
//     if (event.target === document.body) {
//         appWindow.toggleMaximize();
//     };
// }); FOR FUTURE USE, BROKEN RN WITH THE TITLEBAR :3
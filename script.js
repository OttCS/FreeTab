const searchers = {
    "Brave": { s: "https://search.brave.com/search?q=%s", icon: "brave.svg" },
    "Duckduckgo": { s: "https://duckduckgo.com/?q=%s", icon: "duck.svg" },
    "Ecosia": { s: "https://www.ecosia.org/search?q=%s", icon: "ecosia.svg" },
    "Bing": { s: "https://www.bing.com/search?q=%s", icon: "bing.svg" },
    "Google": { s: "https://www.google.com/search?q=%s", icon: "google.svg" },
    "Rumble": { s: "https://rumble.com/search/video?q=%s", icon: "rumble.svg" },
    "Youtube": { s: "https://www.youtube.com/results?search_query=%s", icon: "youtube.svg" }
};

const options = document.getElementById("options");
for (let [k, v] of Object.entries(searchers)) {
    let img = document.createElement('img');
    img.src = v.icon;
    img.title = "Search with " + k;
    img.alt = k;
    img.onclick = () => {
        search(v.s)
    }
    options.appendChild(img);
}

refresh = true;

const qBox = document.getElementById("qBox");
const cog = document.getElementById("cog");

const colors = {}
function parseColors() {
    const urlParam = new URLSearchParams(window.location.search);
    if (bg = urlParam.get("bg")) {
        if (bg.indexOf("://") != -1) {
            bg = "url(" + bg + ")";
        } else {
            if (bg.indexOf("0x") == 0) bg = "#" + bg.substring(2);
        }
    } else {
        bg = "#000";
    }
    colors.bg = bg;

    if (ui = urlParam.get("ui")) {
        if (ui.indexOf("0x") == 0) ui = "#" + ui.substring(2);
    } else {
        ui = "#fff";
    }
    colors.ui = ui;
};
parseColors();

function setColors() {
    if (colors.bg) document.documentElement.style.setProperty('--bg', colors.bg);
    if (colors.ui) document.documentElement.style.setProperty('--ui', colors.ui);
};
setColors();

const bgVal = document.getElementById("bgVal");
bgVal.value = colors.bg;
const uiVal = document.getElementById("uiVal");
uiVal.value = colors.ui;

const search = (sAddress) => {
    window.open(sAddress.replace("%s", qBox.value.replace(/[^a-z0-9_]+/gi, '+').replace(/^-|-$/g, '').toLowerCase()), "_self")
}

document.onkeydown = (e) => {
    if (e.code.toLowerCase() == 'enter') {
        search(Object.values(searchers)[0].s);
    }
}

const settings = document.getElementById("settings");
settings.show = false;
cog.onclick = () => {
    if (settings.show) {
        settings.style.opacity = 0;
    } else {
        settings.style.opacity = 1;
    }
    settings.show ^= true;
}

function applyStyles() {
    let bg = bgVal.value.replace("#", "0x");
    let ui = uiVal.value.replace("#", "0x");
    window.open("../index.html?bg=" + bg + "&ui=" + ui, "_self");
}

setColors;
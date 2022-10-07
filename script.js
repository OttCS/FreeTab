const searchers = {
    "Brave": { s: "https://search.brave.com/search?q=%s", icon: "img/brave.svg" },
    "Duckduckgo": { s: "https://duckduckgo.com/?q=%s", icon: "img/duck.svg" },
    "Ecosia": { s: "https://www.ecosia.org/search?q=%s", icon: "img/ecosia.svg" },
    "Bing": { s: "https://www.bing.com/search?q=%s", icon: "img/bing.svg" },
    "Google": { s: "https://www.google.com/search?q=%s", icon: "img/google.svg" },
    "Rumble": { s: "https://rumble.com/search/video?q=%s", icon: "img/rumble.svg" },
    "Youtube": { s: "https://www.youtube.com/results?search_query=%s", icon: "img/youtube.svg" },
    "Github": { s: "https://github.com/search?q=%s", icon: "img/github.svg" }
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

const timeOut = document.getElementById('time');
function startTime() {
    let d = new Date();
    let m = d.getMinutes();
    let h = d.getHours() % 12;
    timeOut.innerText = (h + (h == 0) * 12) + ":" + (m < 10 ? "0": "") +  m;
    s = 60000 - d.getSeconds() * 1000 - d.getMilliseconds();
    setTimeout(startTime, s);
}

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
    window.open(window.location.pathname + "?bg=" + bg + "&ui=" + ui, "_self");
}

startTime();
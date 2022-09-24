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

const urlParam = new URLSearchParams(window.location.search);
if (bg = urlParam.get("bg")) {
    if (bg.indexOf("://") != -1) {
        bg = "url(" + bg + ")";
    } else {
        if (bg.indexOf("0x") == 0) bg = "#" + bg.substring(2);
    }
    document.documentElement.style.setProperty('--bg', bg);
}

if (ui = urlParam.get("ui")) {
    if (ui.indexOf("0x") == 0) ui = "#" + ui.substring(2);
    root.style.setProperty('--ui', ui);
}

const search = (sAddress) => {
    window.open(sAddress.replace("%s", qBox.value.replace(/[^a-z0-9_]+/gi, '+').replace(/^-|-$/g, '').toLowerCase()), "_self")
}

document.onkeydown = (e) => {
    if (e.code.toLowerCase() == 'enter') {
        search(Object.values(searchers)[0].s);
    }
}

cog.onclick = () => {
    alert('Settings:\nAdd a ? to the end of the URL, then add the following optional attributes (separated by &). Example: ?bg=0xgray&ui=0xf24\n\nAssign a web color name, or hex preceded by "0x" instead of "#"\nThis will set the color of the corresponding element(s).')
}
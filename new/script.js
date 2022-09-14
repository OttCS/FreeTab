// const options = document.getElementById("options");
// const bookmarks = document.getElementById("favorites");

refresh = true;

const searchers = [
    {name: "brave", sAddress: "https://search.brave.com/search?q=%s"}
];

const qBox = document.getElementById("qBox");
const cog = document.getElementById("cog");

const urlParam = new URLSearchParams(window.location.search);
if (bg = urlParam.get("bg")) {
    if (bg.indexOf("://") != -1) {
        document.documentElement.style.background = "url(" + bg + ")";
    } else {
        if (bg.indexOf("0x") == 0) bg = "#" + bg.substring(2);
        document.documentElement.style.background = bg;
    }
}

if (ui = urlParam.get("ui")) {
    if (ui.indexOf("0x") == 0) ui = "#" + ui.substring(2);
    cog.style.fill = ui;
    qBox.style.borderColor = ui;
    qBox.style.color = ui;
}

document.onkeydown = (e) => {
    if (e.code.toLowerCase() == 'enter') {
        window.open(searchers[0].sAddress.replace("%s", qBox.value.replace(/[^a-z0-9_]+/gi, '-').replace(/^-|-$/g, '').toLowerCase()), "_self");
    }
}

cog.onclick = () => {
    alert('Settings:\nAdd a ? to the end of the URL, then add the following optional attributes (separated by &). Example: ?bg=0xgray&ui=0xf24\n\nAssign a web color name, or hex preceded by "0x" instead of "#"\nThis will set the color of the corresponding element(s).')
}
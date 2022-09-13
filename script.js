window.oncontextmenu = function (e) {
    e.preventDefault();
}
let qBox;
let stored;
let add = document.createElement('div');
let engines;
add.classList.add("ico");
add.id = "add";
add.style = "background-image:url('add.svg');"
add.onclick = function () { createNewStored() };

function setup() {
    qBox = document.getElementById('qBox');
    qBox.focus();
    addEngines();
    addStored();
}

function addEngines() {
    engines = [
        { name: "Brave", img: "brave.svg", address: "search.brave.com/search?q=" },
        { name: "DuckDuckGo", img: "duckduckgo.svg", address: "duckduckgo.com/?q=" },
        { name: "Ecosia", img: "ecosia.svg", address: "ecosia.org/search?q=" },
        { name: "Bing", img: "bing.svg", address: "bing.com/search?q=" },
        { name: "Google", img: "google.svg", address: "google.com/search?q=" },
        { name: "Rumble", img: "rumble.svg", address: "rumble.com/search/video?q=" },
        { name: "Youtube", img: "youtube.svg", address: "youtube.com/results?search_query=" }
    ];
    let home = document.getElementById("engines");
    for (var i = 0; i < engines.length; i++) {
        let item = engines[i];
        let build = document.createElement('div');
        build.classList.add("ico");
        if (item.img != "") {
            build.style.backgroundImage = "url(" + item.img + ")";
        }
        build.title = "Search with " + item.name;
        build.onload = function (evt) {
            evt.currentTarget.style.display = 'inline-block'
        };
        build.onclick = function (evt) {
            search(item.address);
        }
        build.classList.add('clickable');
        home.appendChild(build);
    }
}

function randColor(str) {
    let seed = parseInt(str.replace(/[^a-zA-Z]+/g, ""), 36) % 1234567;
    let val = [seed * 3 % 160 + 96, seed * 13 % 256, seed * 23 % 160];
    return "rgb(" + val[2] + "," + val[1] + "," + val[0] + ")";
}

function createNewStored() {
    let address = prompt("URL");
    if (address == null) return;
    let name = prompt("Bookmark Name");
    if (name == null) return;
    let img = prompt("Image (Optional, leave blank for random color or type a color in the format ottcs@rgb(r,g,b))");
    if (img == null) return;
    let storedArray = JSON.parse(localStorage.getItem("storedArrayJSON"));
    storedArray.push({ name: name, img: img, address: address });
    localStorage.setItem("storedArrayJSON", JSON.stringify(storedArray));
    addStored();
}

function addStored() {
    let home = document.getElementById("stored");
    home.textContent = '';
    home.appendChild(add);
    if (localStorage.getItem("storedArrayJSON") == null) {
        localStorage.clear();
        localStorage.setItem("storedArrayJSON", JSON.stringify([]));
    }
    let storedArray = JSON.parse(localStorage.getItem("storedArrayJSON"));
    for (var i = 0; i < storedArray.length; i++) {
        let item = storedArray[i];
        let build = document.createElement('div');
        build.classList.add("ico");
        if (item.img.match(/\.(jpeg|jpg|gif|png|svg|ico)$/) != null) {
            build.style.backgroundImage = "url(" + item.img + ")";
            build.style.backgroundColor = "#fff";
        } else {
            build.style.backgroundColor = randColor(item.address);
            build.innerText = item.name[0];
        }
        build.title = item.name;
        build.onmousedown = function (evt) {
            evt = evt || window.event;
            if (evt.button < 2) {
                launch(item.address);
            } else {
                storedClick(item);
            }
        }
        build.classList.add('clickable');
        home.insertBefore(build, add);
    }
}

function storedClick(evt) {

    let r = prompt("Actions: (delete, copy)");
    if (r == null) return;
    switch (r.toLowerCase()) {
        case "delete":
            removeStored(evt);
            break;
        case "copy":
            navigator.clipboard.writeText(evt.address);
            break;
    }

}

function removeStored(ref) {
    let storedArray = JSON.parse(localStorage.getItem("storedArrayJSON"));

    let i = 0;
    let found = false;
    while (i < storedArray.length && !found) {
        let it = storedArray[i];
        found = (ref.name == it.name && ref.address == it.address && ref.img == it.img);
        i++;
    }
    storedArray.splice(i - 1, i);
    localStorage.setItem("storedArrayJSON", JSON.stringify(storedArray));
    addStored();
}

document.onkeydown = function (e) {
    let k = e.key;
    if (k.toLowerCase() == "enter") {
        search(engines[0].address);
    } else if (qBox != document.activeElement) {
        qBox.focus();
    }
}

function search(prefix) {
    let search = "https://" + prefix + qBox.value.replace(" ", "%20").replace("'", "%27");
    launch(search);
}

function launch(url) {
    window.open(url, '_self');
}
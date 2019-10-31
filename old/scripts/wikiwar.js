// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', function () {
//         navigator.serviceWorker.register('/scripts/sw.js').then(function (registration) {
//             console.log('Service worker registered with scope: ', registration.scope);
//         }, function (err) {
//             console.log('ServiceWorker registration failed: ', err);
//         });
//     });
// }

let graphPath = [];

function updateCurrentPageName(currentPage) {
    graphPath.push(currentPage);
    if (currentPage === document.getElementById("endPageName").innerText) {
        stopClock();
    }
    document.getElementById("currentPageName").innerText = currentPage;
}

let initTime;
let currTime;
let interval;
const sseSource = new EventSource('/event-stream');

function initClock() {
    initTime = new Date().getTime();
    interval = setInterval(updateClock, 1);
    sseSource.addEventListener('message', (e) => {
        updateCurrentPageName(e.data);
    });
}

function updateClock() {
    let now = new Date();
    currTime = now.getTime() - initTime;
    let s = Math.floor(currTime / 1000);
    let m = Math.floor(s / 60);
    let h = Math.floor(m / 60);
    document.getElementById('chrono').innerText = `${`0${(h % 60)}`.slice(-2)}:${`0${(m % 60)}`.slice(-2)}:${`0${(s % 60)}`.slice(-2)}:${(currTime % 1000)}`;
}

function stopClock() {
    clearInterval(interval);
    console.log(generateDot());
    setTimeout(sseSource.close(), 3000);
}

function generateDot() {
    res = `digraph res {
        \"${graphPath[0]}\" [shape=cds];
        \"${graphPath[graphPath.length - 1]}\" [shape=rectangle];\n`;

    for (let i = 0, len = graphPath.length; i < len - 1; i++) {
        res += `\"${graphPath[i]}\" -> \"${graphPath[i + 1]}\";\n`;
    }
    res += "}";
    return res;
}
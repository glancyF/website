
document.addEventListener("DOMContentLoaded", () => {


    initThemeToggle();
    initFadeInAnimation();
    initVideoPlayer();
    initFibonacciCounter();
    initReplyHandler();

});

function initThemeToggle() {
    const body = document.body;
    const btn = document.getElementById("toggle-theme");


    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        body.classList.add("light-theme");
    }

    // Клик по кнопке смены темы
    btn?.addEventListener("click", () => {
        body.classList.toggle("light-theme");
        localStorage.setItem("theme", body.classList.contains("light-theme") ? "light" : "dark");
    });
}


function initFadeInAnimation() {
    const elements = document.querySelectorAll('.fade-in');

    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add('visible')
        }
    });
}
function initVideoPlayer() {
    const container = document.getElementById("video-container");
    if (!container) return;

    const wrapper = document.createElement("div");
    wrapper.className = "video-wrapper";

    const video = document.createElement("video");
    video.className = "video-element";
    video.controls = true;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;

    const source = document.createElement("source");
    source.src = "/static/media/FootballDash.mp4";
    source.type = "video/mp4";

    video.appendChild(source);
    wrapper.appendChild(video);
    container.appendChild(wrapper);
}

function initFibonacciCounter() {
    const btn = document.getElementById('fib-btn');
    const result = document.getElementById('fib-result');
    if (!btn || !result) return;  // защита от отсутствия элемента

    let prev = parseInt(localStorage.getItem('fibPrev')) || 0;
    let curr = parseInt(localStorage.getItem('fibCurr')) || 1;
    result.textContent = `${prev}`;

    btn.addEventListener("click", () => {
        const next = prev + curr;
        prev = curr;
        curr = next;

        result.textContent = `${prev}`;
        void result.offsetWidth;

        localStorage.setItem("fibPrev", prev);
        localStorage.setItem("fibCurr", curr);
    });
}


function initReplyHandler() {
    const replyLinks = document.querySelectorAll(".reply-link");
    const parentInput = document.querySelector("input[name='parent']");
    const textInput = document.querySelector("textarea[name='text']");
    const indicator = document.getElementById("reply-indicator");
    const replyingToName = document.getElementById("replying-to-name");
    const cancelBtn = document.getElementById("cancel-reply");

    replyLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const commentId = this.dataset.commentId;
            const commenterName = this.closest('.comment-card')?.querySelector('.comment-author')?.textContent;

            if (parentInput) parentInput.value = commentId;
            if (replyingToName && commenterName) replyingToName.textContent = commenterName;
            if (indicator) indicator.style.display = 'block';
            if (textInput) {
                textInput.focus();
                textInput.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    if (cancelBtn) {
        cancelBtn.addEventListener("click", function () {
            parentInput.value = '';
            indicator.style.display = 'none';
        });
    }
}


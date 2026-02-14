const sceneIntro = document.getElementById("sceneIntro");
const sceneAsk = document.getElementById("sceneAsk");
const sceneYes = document.getElementById("sceneYes");

const startBtn = document.getElementById("startBtn");
const skipBtn  = document.getElementById("skipBtn");

const typewriterEl = document.getElementById("typewriter");

const yesBtn = document.getElementById("yesBtn");
const noBtn  = document.getElementById("noBtn");
const noText = document.getElementById("noText");
const btnRow = document.getElementById("btnRow");

const hearts = document.getElementById("hearts");

const song = document.getElementById("song");
const musicBtn = document.getElementById("musicBtn");

const slideImg = document.getElementById("slideImg");
const slideCaption = document.getElementById("slideCaption");

// ========== INTRO TYPEWRITER ==========
const introLines = [
  "Two hearts. One question.",
  "A moment of truth… and a little bit of drama.",
  "Because I’m asking you something important."
];

function runTypewriter(lines) {
  let line = 0;
  let i = 0;
  typewriterEl.textContent = "";
  const full = lines.join("\n");

  // We'll type it as one block for simplicity
  const interval = setInterval(() => {
    typewriterEl.textContent = full.slice(0, i);
    i++;
    if (i > full.length) clearInterval(interval);
  }, 22);
}

runTypewriter(introLines);

function goToAsk() {
  sceneIntro.classList.add("hidden");
  sceneAsk.classList.remove("hidden");
}

startBtn.addEventListener("click", goToAsk);
skipBtn.addEventListener("click", goToAsk);

// ========== NO BUTTON DRAMA ==========
let noCount = 0;
let yesScale = 1;

const dramaticPrompts = [
  "Are you sure? 🥺",
  "Like… REALLY sure?? 😭",
  "This is breaking the writer’s heart 💔",
  "Last chance… 😔",
  "Ok now you’re just playing hard to get 😤"
];

function moveNoButton() {
  // Make it escape within the button row container
  const rect = btnRow.getBoundingClientRect();
  const b = noBtn.getBoundingClientRect();

  const padding = 6;
  const maxX = rect.width - b.width - padding * 2;
  const maxY = rect.height - b.height - padding * 2;

  const x = padding + Math.random() * Math.max(0, maxX);
  const y = padding + Math.random() * Math.max(0, maxY);

  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

noBtn.addEventListener("click", () => {
  noCount++;

  // grow yes
  yesScale = Math.min(yesScale + 0.28, 4);
  yesBtn.style.transform = `scale(${yesScale})`;

  // escalating message
  const msg = dramaticPrompts[Math.min(noCount - 1, dramaticPrompts.length - 1)];
  noText.textContent = `She clicked “No” (${noCount}). ${msg}`;

  // escape more aggressively after first click
  moveNoButton();
});

noBtn.addEventListener("mouseenter", () => {
  if (noCount >= 1) moveNoButton();
});

// ========== YES SCENE ==========
const photos = [
  { src: "photos/1.jpg", caption: "1 year yahooo." },
  { src: "photos/2.jpg", caption: "Our second Date :)" },
  { src: "photos/3.jpg", caption: "Sushi Vibes" },
  { src: "photos/4.jpg", caption: "Movie Date", rotate: true }
];

let slideIndex = 0;
let slideshowTimer = null;

function startSlideshow() {
  slideshowTimer = setInterval(() => {
    slideIndex = (slideIndex + 1) % photos.length;
    slideImg.style.opacity = "0";
    setTimeout(() => {
        slideImg.src = photos[slideIndex].src;
        slideCaption.textContent = photos[slideIndex].caption;
        
        // Handle rotation
        if (photos[slideIndex].rotate) {
          slideImg.classList.add("rotate-image");
        } else {
          slideImg.classList.remove("rotate-image");
        }
        
      slideImg.style.opacity = "1";
    }, 220);
  }, 3200);
}

yesBtn.addEventListener("click", () => {
  sceneAsk.classList.add("hidden");
  sceneYes.classList.remove("hidden");

  // BIG heart burst + continuous hearts
  burstHearts(220);
  startContinuousHearts();

  // start slideshow
  startSlideshow();
});

// ========== MUSIC BUTTON ==========
musicBtn.addEventListener("click", async () => {
  try {
    if (song.paused) {
      await song.play();
      musicBtn.textContent = "🔇 Pause music";
    } else {
      song.pause();
      musicBtn.textContent = "🔊 Play music";
    }
  } catch (e) {
    musicBtn.textContent = "Tap again to play 🔊";
  }
});

// ========== HEARTS ==========
function burstHearts(count) {
  for (let i = 0; i < count; i++) spawnHeart(true);
}

function startContinuousHearts() {
  setInterval(() => spawnHeart(false), 120);
}

function spawnHeart(burst) {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = ["💖","💘","💝","❤️","💕","💞"][Math.floor(Math.random() * 6)];

  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.fontSize = `${(burst ? 16 : 12) + Math.random() * (burst ? 28 : 18)}px`;

  const duration = (burst ? 2 : 3) + Math.random() * (burst ? 2 : 3);
  heart.style.animationDuration = `${duration}s`;

  hearts.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000);
}

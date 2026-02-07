const card = document.getElementById("card");

/* ---------- SOUND ---------- */
const clickSound = new Audio("assets/audio/click.mp3");
const popSound = new Audio("assets/audio/pop.mp3");

function play(sound) {
  sound.currentTime = 0;
  sound.play().catch(() => {});
}

/* ---------- FLOATING HEARTS ---------- */
const heartContainer = document.querySelector(".hearts");

function createHeart(x = Math.random() * window.innerWidth, y = window.innerHeight) {
  const heart = document.createElement("span");
  heart.innerText = "❤️";
  heart.style.left = x + "px";
  heart.style.top = y + "px";
  heart.style.fontSize = 10 + Math.random() * 20 + "px";
  heart.style.animationDuration = 5 + Math.random() * 5 + "s";
  heartContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 8000);
}

for (let i = 0; i < 30; i++) createHeart();

/* Touch + mouse hearts */
document.addEventListener("mousemove", e => createHeart(e.clientX, e.clientY));
document.addEventListener("touchmove", e => {
  const t = e.touches[0];
  createHeart(t.clientX, t.clientY);
});

/* ---------- SCREENS ---------- */
const screens = [

/* 1 */
() => `
<div class="icon">💜</div>
<h1>Do you like me?</h1>
<p>Be honest with me...</p>
<div class="buttons">
  <button class="primary" onclick="next()">Yes ✨</button>
  <button class="secondary" onclick="next()">No 🥺</button>
</div>`,

/* 2 */
() => `
<div class="icon">🐼</div>
<h1>Something special is coming...</h1>`,

/* 3 */
() => `
<h1>This is what I want to say for so long...</h1>
<p>Watch the hearts carry my message to you.</p>
<div style="font-size:28px;margin:20px 0;">
❤️ I ❤️ Love ❤️ You ❤️
</div>
<button class="primary" onclick="next()">Continue 💖</button>`,

/* 4 — IMAGE GRID */
() => `
<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px;">
  <img src="assets/images/img4.jpg" style="width:100%;border-radius:12px;">
  <img src="assets/images/img3.jpg" style="width:100%;border-radius:12px;">
  <img src="assets/images/img2.jpg" style="width:100%;border-radius:12px;">
  <img src="assets/images/img1.jpg" style="width:100%;border-radius:12px;">
</div
<button class="primary" onclick="next()">Read my message 💌</button>`,

/* 5 — CUSTOM MESSAGE */
() => `
<h1>Every challenge feels easier…</h1>
<p>
I imagine you by my side.  
You make me smile,  
you make my heart race.  
I want a future with you.
</p>
<button class="primary" onclick="next()">Yes, Forever! ✨</button>`,

/* 6 — FINAL */
() => `
<div class="icon">❤️</div>
<h1>Let's make it Forever ✨</h1>`
];

let step = 0;

function next() {
  play(clickSound);

  if (step < screens.length - 1) {
    step++;
    render();
  }
}


function render() {
  card.innerHTML = screens[step]();

  // Auto-advance from "Something special is coming..."
  if (step === 1) {
    setTimeout(() => {
      step++;
      render();
    }, 2000);
  }
}


render();

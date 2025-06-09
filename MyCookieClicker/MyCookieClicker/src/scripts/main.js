import "../styles/style.css";
import { Game } from "./game";
import bgMusicFile from "../assets/bg-music.mp3";

window.isResetting = false;

const bgMusic = new Audio(bgMusicFile);
bgMusic.loop = true;
bgMusic.volume = 0.3;
bgMusic.play();

window.isMuted = false;

document.querySelector("#app").innerHTML = `
  <h1>Welcome to my Cookie Clicker!</h1>
  <button id="reset-button">Reset Game</button>
  <button id="mute-button">🔊</button>
  <main id="game"></main>
`;

document.querySelector("#reset-button").addEventListener("click", () => {
  if (confirm("Voulez-vous vraiment réinitialiser votre partie ?")) {
    window.isResetting = true;
    localStorage.removeItem("cookieClickerSave");
    setTimeout(() => location.reload(), 100);
  }
});

document.querySelector("#mute-button").addEventListener("click", () => {
  window.isMuted = !window.isMuted;
  bgMusic.muted = isMuted;
  document.querySelector("#mute-button").textContent = isMuted ? "🔇" : "🔊";
});

const savedConfig = Game.load();
const game = new Game(savedConfig);
game.start();

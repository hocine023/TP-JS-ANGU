import CookieIMG from "../assets/cookie.png";
import clickSoundFile from "../assets/click.mp3";

export class ClickableArea {
  gameElement = null;
  onClick = null;

  constructor(gameElement, onClick) {
    this.gameElement = gameElement;
    this.onClick = onClick;
  }

  render() {
    this.clickableAreaElement = document.createElement("section");
    this.clickableAreaElement.id = "game-clickable-area";
    this.clickableAreaElement.innerHTML = `
      <img id="cookie" src="${CookieIMG}" width="256px" height="256px" alt="An awesome cookie." />
    `;

    const img = this.clickableAreaElement.querySelector("#cookie");

    img.addEventListener("click", () => {
      img.classList.add("clicked");
      setTimeout(() => img.classList.remove("clicked"), 200);

      
      const particle = document.createElement("div");
      particle.className = "cookie-particle";
      particle.textContent = "+1";
      const offsetX = Math.random() * 40 - 20;
      const offsetY = Math.random() * 40 - 40;
      particle.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      this.clickableAreaElement.appendChild(particle);
      setTimeout(() => particle.remove(), 800);

      if (!window.isMuted) {
        const sound = new Audio(clickSoundFile);
        sound.volume = 0.5;
        sound.play();
      }
      this.onClick();
    });

    this.gameElement.append(this.clickableAreaElement);
  }
}

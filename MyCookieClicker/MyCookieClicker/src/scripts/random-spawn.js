import GoldenCookieIMG from "../assets/golden-cookie.png"; 

export class RandomSpawn {
  constructor(gameElement, onGoldenClick) {
    this.gameElement = gameElement;
    this.onGoldenClick = onGoldenClick;
  }

  spawn() {
    const golden = document.createElement("img");
    golden.src = GoldenCookieIMG;
    golden.alt = "Golden Cookie";
    golden.className = "golden-cookie";

    golden.style.left = `${Math.random() * 80 + 10}%`;
    golden.style.top = `${Math.random() * 70 + 10}%`;

    golden.addEventListener("click", () => {
      this.onGoldenClick();
      golden.remove();
    });

    setTimeout(() => {
      golden.remove();
    }, 5000);

    document.body.appendChild(golden);
  }
}

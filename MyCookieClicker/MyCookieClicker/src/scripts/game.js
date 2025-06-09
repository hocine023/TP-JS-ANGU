import { ClickableArea } from "./clickable-area";
import { Shop } from "./shop";
import "../styles/game.css";
import { RandomSpawn } from "./random-spawn";

export class Game {
  cookies = 0;
  passiveGain = 0;
  randomSpawner = null;
  gameElement = null;
  scoreElement = null;
  clickableArea = null;
  shop = null;

  constructor(config) {
    this.cookies = config.cookies || 0;
    this.passiveGain = config.passiveGain || 0;
    this.shopConfig = config.shop || {};

    this.gameElement = document.querySelector("#game");

    this.shop = new Shop(this.gameElement, this.onShopPurchase, this.shopConfig);
    this.randomSpawner = new RandomSpawn(document.body, this.onGoldenCookieClick);
  }

  start() {
    this.render();
    window.addEventListener("beforeunload", () => {
      if (!window.isResetting) {
        this.save();
      }
    });

    setInterval(() => {
      this.cookies += this.passiveGain;
      this.updateScore();
    }, 1000);

    setInterval(() => {
      if (Math.random() < 0.3) { 
        this.randomSpawner.spawn();
      }
    }, 10000);
    
  }

  render() {
    const leftColumn = document.createElement("section");
    leftColumn.id = "game-left";
    this.gameElement.append(leftColumn);

    this.renderScore(leftColumn);

    this.clickableArea = new ClickableArea(
      leftColumn,
      this.onClickableAreaClick
    );
    this.clickableArea.render();

    this.shop.render();
  }

  renderScore(parent) {
    this.scoreElement = document.createElement("section");
    this.scoreElement.id = "game-score";
    parent.append(this.scoreElement);
    this.updateScore();
  }

  updateScore() {
    this.scoreElement.innerHTML = `
      <span>${this.cookies.toFixed(1)} cookies</span><br />
      <span>${this.passiveGain.toFixed(1)} cookies/sec</span>
    `;
  }

  onClickableAreaClick = () => {
    this.cookies += 1;
    window.requestAnimationFrame(() => {
      this.updateScore();
    });
  };

  onShopPurchase = ({ upgrade, price }) => {
    if (this.cookies < price) return false;

    this.cookies -= price;
    this.passiveGain += upgrade.cps;

    window.requestAnimationFrame(() => {
      this.updateScore();
    });

    return true;
  };
  onGoldenCookieClick = () => {
    const bonus = Math.floor(Math.random() * (this.passiveGain * 1000)) + 1;
    this.cookies += bonus;
    window.requestAnimationFrame(() => {
      this.updateScore();
    });
  };
  save() {
    const config = {
      cookies: this.cookies,
      passiveGain: this.passiveGain,
      shop: this.shop.getSaveData(),
    };
    localStorage.setItem("cookieClickerSave", JSON.stringify(config));
  }
  static load() {
    const data = localStorage.getItem("cookieClickerSave");
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        console.error("Erreur de chargement :", e);
      }
    }
    return {
      cookies: 0,
      passiveGain: 0,
      shop: {},
    };
  }
  
  
}

export class Shop {
    shopElement = null;
    upgrades = [];
    gameElement = null;
    onPurchase = null;
  
    constructor(gameElement, onPurchase, config = {}) {
        this.shopElement = document.createElement("aside");
        this.shopElement.id = "game-shop";
        this.onPurchase = onPurchase;
        this.gameElement = gameElement;
      
        this.upgrades = [
          {
            id: "cursor",
            name: "Cursor",
            basePrice: 10,
            quantity: config.cursor?.quantity || 0,
            cps: 0.1,
          },
        ];
      }
      
  
    render() {
      this.shopElement.innerHTML = `
        <h2>Shop</h2>
        <ul>
          ${this.upgrades
            .map((upgrade) => {
              const price = this.getPrice(upgrade);
              return `
                <li>
                  <button data-id="${upgrade.id}">
                    ${upgrade.name} (x${upgrade.quantity}) - ${price} cookies
                  </button>
                </li>
              `;
            })
            .join("")}
        </ul>
      `;
  
      this.shopElement.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", () => {
          const id = button.dataset.id;
          this.onUpgradeClick(id);
        });
      });
  
      this.gameElement.append(this.shopElement);
    }
  
    getPrice(upgrade) {
      return upgrade.basePrice + upgrade.quantity * 3;
    }
  
    onUpgradeClick(id) {
      const upgrade = this.upgrades.find((u) => u.id === id);
      const price = this.getPrice(upgrade);
  
      if (this.onPurchase && this.onPurchase({ upgrade, price })) {
        upgrade.quantity++;
        this.render();
      }
    }
    getSaveData() {
  const save = {};
  this.upgrades.forEach((upgrade) => {
    save[upgrade.id] = { quantity: upgrade.quantity };
  });
  return save;
}

  }
  
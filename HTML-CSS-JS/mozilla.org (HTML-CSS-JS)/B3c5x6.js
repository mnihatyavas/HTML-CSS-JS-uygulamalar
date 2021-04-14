// B3c5x6.js: Modüllerle tuval'de sınıflar toplamından sabit kare, üçgen ve daire çizimi-6 alt-örneği.

function derecedenRadyana (degrees) {return degrees * Math.PI / 180;};

class Daire {
  constructor(ctx, listId, radius, x, y, renk1, renk2) {
    this.ctx = ctx;
    this.listId = listId;
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.renk1 = renk1;
    this.renk2 = renk2;
    this.name = "daire";
  }

  şekliÇiz() {
    this.ctx.fillStyle = this.renk1;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, derecedenRadyana (0), derecedenRadyana (360), false);
    this.ctx.fill();
  }

  alanıÇevreyiRaporla() {
    let listItem = document.createElement('li');
    listItem.textContent = `${this.renk2} ${this.name}'nin alanı=${Math.round(Math.PI * (this.radius * this.radius))}px kare, çevresi=${Math.round(2 * Math.PI * this.radius)}px'dir.`;
    let list = document.getElementById(this.listId);
    list.appendChild(listItem);
  }
}

export { Daire };
// B3c5x5.js: Modüllerle tuval'de sınıflar toplamından sabit kare, üçgen ve daire çizimi-5 alt-örneği.

function derecedenRadyana (degrees) {return degrees * Math.PI / 180;};

class Üçgen {
  constructor(ctx, listId, length, x, y, renk1, renk2) {
    this.ctx = ctx;
    this.listId = listId;
    this.length = length;
    this.x = x;
    this.y = y;
    this.renk1 = renk1;
    this.renk2 = renk2;
    this.name = "üçgen";
  }

  şekliÇiz() {
    this.ctx.fillStyle = this.renk1;

    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x + this.length, this.y);
    let triHeight = (this.length/2) * Math.tan(derecedenRadyana(60));
    this.ctx.lineTo(this.x + (this.length/2), this.y - triHeight);
    this.ctx.lineTo(this.x, this.y);
    this.ctx.fill();
  }

  alanıÇevreyiRaporla() {
    let listItem = document.createElement('li');
    listItem.textContent = `${this.renk2} ${this.name}'in alanı=${Math.round((Math.sqrt(3)/4)*(this.length * this.length))}px kare, çevresi=${this.length * 3}px'dir.`;
    let list = document.getElementById(this.listId);
    list.appendChild(listItem);
  }
}

export { Üçgen };
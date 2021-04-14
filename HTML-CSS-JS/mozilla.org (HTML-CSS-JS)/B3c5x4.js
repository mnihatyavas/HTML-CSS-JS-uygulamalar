// B3c5x4.js: Modüllerle tuval'de sınıflar toplamından sabit kare, üçgen ve daire çizimi-4 alt-örneği.

class Kare {
  constructor(ctx, listId, length, x, y, renk1, renk2) {
    this.ctx = ctx;
    this.listId = listId;
    this.length = length;
    this.x = x;
    this.y = y;
    this.renk1 = renk1;
    this.renk2 = renk2;
    this.name = "Kare";
  }

  şekliÇiz() {
    this.ctx.fillStyle = this.renk1;
    this.ctx.fillRect(this.x, this.y, this.length, this.length);
  }

  alanıÇevreyiRaporla () {
    let listItem = document.createElement('li');
    listItem.textContent = `${this.renk2} ${this.name}'nin alanı=${this.length * this.length}px kare, çevresi=${this.length * 4}p'dir.`;
    let list = document.getElementById(this.listId);
    list.appendChild(listItem);
  }
}

export { Kare };
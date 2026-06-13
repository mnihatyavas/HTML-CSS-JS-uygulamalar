// Tablo kolonlarýnýn herbiri baþlýklarý týklanýnca artan/azalan sýralanacak
function tabloyuSýrala (n) {
    let tablo;
    tablo = document.getElementById ('tablo');
    let satýrlar, i, x, y, sayaç = 0;
    let yerdeðiþtiMi = true;
    let yön = 'artan';
    while (yerdeðiþtiMi) {//Yerdeðiþimler bitinceye deðin
        yerdeðiþtiMi = false;
        let satýrlar = tablo.rows;
        for (i = 1; i < satýrlar.length - 1; i++) {
            var yerdeðiþsinMi = false;
            x = satýrlar [i].getElementsByTagName ('TD') [n];
            y = satýrlar [i + 1].getElementsByTagName ('TD') [n];
            if (yön == 'artan') {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    yerdeðiþsinMi = true;
                    break;
                }
            }else if (yön == 'azalan') {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    yerdeðiþsinMi = true;
                    break;
                }
            }
        }
        if (yerdeðiþsinMi) {
            satýrlar [i].parentNode.insertBefore (satýrlar [i + 1], satýrlar [i]);
            yerdeðiþtiMi = true;
            sayaç++;
        }else {
            if (sayaç == 0 && yön == 'artan') {
                yön = 'azalan';
                yerdeðiþtiMi = true;
            }
        } //if-else
    } //while
} //func
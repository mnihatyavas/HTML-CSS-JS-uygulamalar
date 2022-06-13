var KEY = {
    D: 68,
    W: 87,
    A: 65,
    S:83,
    RIGHT:39,
    UP:38,
    LEFT:37,
    DOWN:40,
    Q:81
}; // KEY sonu
var input = {
    right: false,
    up: false,
    left: false,
    down: false,
    quit: false
}; // input sonu...
function press (olay) {
    var code = olay.keyCode;
    switch (code) {
        case KEY.RIGHT:
        case KEY.D: input.right = true; break;
        case KEY.UP:
        case KEY.W: input.up = true; break;
        case KEY.LEFT:
        case KEY.A: input.left = true; break;
        case KEY.DOWN:
        case KEY.S: input.down = true; break;
        case KEY.Q: input.quit = true; break;
    } // sw..sonu...
} // func sonu

function release (olay) {
    var code = olay.keyCode;
    switch (code) {
        case KEY.RIGHT:
        case KEY.D: input.right = false; break;
        case KEY.UP:
        case KEY.W: input.up = false; break;
        case KEY.LEFT:
        case KEY.A: input.left = false; break;
        case KEY.DOWN:
        case KEY.S: input.down = false; break;
        case KEY.Q: break;
        default: trace ("tanýnmayan tuþlama kodu: " + code); break;
    } // sw..sonu...
} // func sonu...
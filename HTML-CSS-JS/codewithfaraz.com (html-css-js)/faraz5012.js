function Zamanlayýcý (sözcük) {
    sözcük.lettering();
    this.done = false;
    this.cycleCount = 5;
    this.cycleCurrent = 0;
    this.krkterler = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()-_=+{}|[]\\;\':"<>?,./`~'.split('');
    this.krkterlerCount = this.krkterler.length;
    this.harfler = sözcük.find ('span');
    this.letterCount = this.harfler.length;
    this.letterCurrent = 0;
    this.harfler.each (function() {
        var $this = $(this);
        $this.attr ('data-orig', $this.text());
        $this.text ('-');
    });
}

Zamanlayýcý.prototype.getChar = function() {return this.krkterler [Math.floor (Math.random() * this.krkterlerCount)];};

Zamanlayýcý.prototype.reset = function() {
    this.done = false;
    this.cycleCurrent = 0;
    this.letterCurrent = 0;
    this.harfler.each (function() {
        var $this = $(this);
        $this.text ($this.attr ('data-orig'));
        $this.removeClass ('done');
    });
    this.loop();
};

Zamanlayýcý.prototype.loop = function() {
    var self = this;
    this.harfler.each (function (endeks, sözcük) {
        var $sözcük = $(sözcük);
        if (endeks >= self.letterCurrent) {
            if ($sözcük.text() !== ' ' ) {
                $sözcük.text (self.getChar());
                $sözcük.css ('opacity', Math.random());
            }
        }
    });
    if (this.cycleCurrent < this.cycleCount) {
        this.cycleCurrent++;
    }else if (this.letterCurrent < this.letterCount) {
        var currLetter = this.harfler.eq (this.letterCurrent);
        this.cycleCurrent = 0;
        currLetter.text (currLetter.attr ('data-orig')).css ('opacity', 1 ).addClass ('done');
        this.letterCurrent++;
    }else {this.done = true;}
    if (!this.done) {requestAnimationFrame (function() {self.loop();});
    }else {setTimeout (function() {self.reset();}, 750);}
};

$words = $('.word');
$words.each (function() {
    var $this = $(this), zamanlayýcý = new Zamanlayýcý ($this).reset();
    $this.data ('zamanlayýcý', zamanlayýcý);}
);
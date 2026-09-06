const $gir = $('.dosya-giriþi');
const $býrak = $('.dosya-býrak-alaný');
const $sil = $('.silme-birimi');
$gir.on ('dragenter focus click', function () {$býrak.addClass ('is-active');});
$gir.on ('dragleave blur drop', function () {$býrak.removeClass ('is-active');});
$gir.on ('change', function () {
    let adet = $(this)[0].files.length;
    let $metin = $(this).prev();
    if (adet === 1) {
        let ad = $(this).val().split('\\').pop();
        $metin.text (ad);
        $('.silme-birimi').css ('display', 'inline-block');
    }else if (adet === 0) {
        $metin.text ('veya buraya sürükle');
        $('.silme-birimi').css ('display', 'none');
    }else {
        $metin.text (adet + ' dosya seçildi');
        $('.silme-birimi').css ('display', 'inline-block');
    }
});
$sil.on ('click', function () {
    $('.dosya-giriþi').val (null);
    $('.dosya-mesajý').text ('veya buraya sürükle');
    $('.silme-birimi').css ('display', 'none');
});
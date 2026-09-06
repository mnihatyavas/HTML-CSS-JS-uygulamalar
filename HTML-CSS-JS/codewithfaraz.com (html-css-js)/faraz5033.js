var savur = new Swiper (".mySwiper",
    {navigation: {nextEl: ".swiper-next-button", prevEl: ".swiper-prev-button"},
    effect: "fade",
    loop: "infinite",
    pagination: {el: ".swiper-pagination", type: "fraction"}
});
savur.on ('slideChange', function (slt) {document.body.setAttribute ('data-slt', slt.realIndex);})
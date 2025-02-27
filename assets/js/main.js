

(function($) {

	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)',
		xxsmall: '(max-width: 360px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Items.
			$('.item').each(function() {

				var $this = $(this),
					$header = $this.find('header'),
					$a = $header.find('a'),
					$img = $header.find('img');

				// Set background.
					$a.css('background-image', 'url(' + $img.attr('src') + ')');

				// Remove original image.
					$img.remove();

			});

	});

})(jQuery);



(function(){
    function _0x1e1e() {
        var _0x1788 = document.getElementById("myTopnav");
        if (_0x1788.className === "topnav") {
            _0x1788.className += " responsive";
        } else {
            _0x1788.className = "topnav";
        }
    }
    function _0x2e5b(_0x2644) {
        var _0x1565 = new Date(_0x2644);
        if (isNaN(_0x1565)) return "Tanggal tidak valid";
        var _0x5ef1 = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
        return _0x1565.toLocaleDateString('id-ID', _0x5ef1);
    }
    var _0x1f6d = [];
    var _0x1f90 = 1;
    var _0x47c7 = 4;
    async function _0x26d1() {
        try {
            // Correct URL obfuscation: Proper character codes for the URL "https://karir.sentralmedika.co.id/data.json"
            var _0x06a2 = String.fromCharCode(104, 116, 116, 112, 115, 58, 47, 47, 107, 97, 114, 105, 114, 46, 115, 101, 110, 116, 114, 97, 108, 109, 101, 100, 105, 107, 97, 46, 99, 111, 46, 105, 100, 47, 100, 97, 116, 97, 46, 106, 115, 111, 110); // Correct character codes for "https://karir.sentralmedika.co.id/data.json"
            var _0x10ab = await fetch(`${_0x06a2}?timestamp=${new Date().getTime()}`, {
                method: 'GET',
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                },
                cache: 'no-store'
            });
            _0x1f6d = await _0x10ab.json();
            _0x3910();
        } catch (_0x5e9a) {
            console.error("Gagal mengambil data JSON:", _0x5e9a);
        }
    }
    function _0x3910() {
        var _0x1ab0 = document.getElementById('karir');
        var _0x45e6 = document.getElementById('pagination');
        _0x1ab0.innerHTML = "";
        _0x45e6.innerHTML = "";
        var _0x2f63 = (_0x1f90 - 1) * _0x47c7;
        var _0x5973 = _0x2f63 + _0x47c7;
        var _0x52c5 = _0x1f6d.slice(_0x2f63, _0x5973);
        var _0x5ad9 = new Date();
        _0x5ad9.setHours(0, 0, 0, 0);
        _0x52c5.forEach(function (_0x53e2) {
            var _0x5867 = new Date(_0x53e2.batasLamaran);
            var _0x3df2 = _0x5867 - _0x5ad9;
            var _0x44e2 = Math.ceil(_0x3df2 / (1000 * 60 * 60 * 24));
            var _0x35c7 = _0x44e2 < 0;
            var _0x3c64 = _0x35c7 ? `<span class="badge closed">Lowongan Sudah Ditutup</span>` : "";
            var _0x45db = `
                <article class="item">
                    <header>
                        <a href="${_0x53e2.link}">
                            <img src="${_0x53e2.gambardepan}" alt="${_0x53e2.judul}" style="width: 100%; height: auto; display: block;">
                        </a>
                        <h3>${_0x53e2.judul}</h3>
                    </header> 
                    <p style="font-size: 13px; margin-top: -5px;">${_0x2e5b(_0x53e2.tanggal)}</p>
                    <p>${_0x3c64}</p>
                    <p>${_0x53e2.deskripsi}</p>
                    <ul class="actions">
                        <li><a href="${_0x53e2.link}" class="button">More</a></li>
                    </ul>
                </article>
            `;
            _0x1ab0.innerHTML += _0x45db;
        });
        _0x3b7e();
    }
    function _0x3b7e() {
        var _0x487b = document.getElementById('pagination');
        var _0x3074 = Math.ceil(_0x1f6d.length / _0x47c7);
        for (var _0x27b1 = 1; _0x27b1 <= _0x3074; _0x27b1++) {
            var _0x568f = document.createElement('button');
            _0x568f.innerText = _0x27b1;
            _0x568f.classList.add('pagination-button');
            if (_0x27b1 === _0x1f90) {
                _0x568f.classList.add('active');
            }
            _0x568f.addEventListener('click', function () {
                _0x1f90 = _0x27b1;
                _0x3910();
            });
            _0x487b.appendChild(_0x568f);
        }
    }
    window.onload = _0x26d1;
})();

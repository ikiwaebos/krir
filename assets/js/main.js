

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



 function myFunction() {
            var x = document.getElementById("myTopnav");
            if (x.className === "topnav") {
                x.className += " responsive";
            } else {
                x.className = "topnav";
            }
        }

        function formatTanggal(tanggal) {
    let date = new Date(tanggal);
    if (isNaN(date)) return "Tanggal tidak valid";
    
    let options = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
}

let lowongan = [];
let currentPage = 1;
const itemsPerPage = 4;

async function loadLowongan() {
    try {
        let response = await fetch(`https://karir.sentralmedika.co.id/data.json?timestamp=${new Date().getTime()}`, {
            method: 'GET',
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            },
            cache: 'no-store'
        });

        lowongan = await response.json();
        renderLowongan();
    } catch (error) {
        console.error("Gagal mengambil data JSON:", error);
    }
}

function renderLowongan() {
    let container = document.getElementById('karir');
    let paginationContainer = document.getElementById('pagination');
    container.innerHTML = "";
    paginationContainer.innerHTML = "";

    let start = (currentPage - 1) * itemsPerPage;
    let end = start + itemsPerPage;
    let paginatedItems = lowongan.slice(start, end);

    let today = new Date();
    today.setHours(0, 0, 0, 0);

    paginatedItems.forEach(job => {
        let batasLamaran = new Date(job.batasLamaran);
        let timeDiff = batasLamaran - today;
        let dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        let isClosed = dayDiff < 0;
        let badge = isClosed ? `<span class="badge closed">Lowongan Sudah Ditutup</span>` : "";

        let jobElement = `
            <article class="item">
                <header>
                    <a href="${job.link}">
                        <img src="${job.gambardepan}" alt="${job.judul}" style="width: 100%; height: auto; display: block;">
                    </a>
                    <h3>${job.judul}</h3>
                </header> 
                <p style="font-size: 13px; margin-top: -5px;">${formatTanggal(job.tanggal)}</p>
                <p>${badge}</p>
                <p>${job.deskripsi}</p>
                <ul class="actions">
                    <li><a href="${job.link}" class="button">More</a></li>
                </ul>
            </article>
        `;
        container.innerHTML += jobElement;
    });

    renderPagination();
}

function renderPagination() {
    let paginationContainer = document.getElementById('pagination');
    let totalPages = Math.ceil(lowongan.length / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        let pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.classList.add('pagination-button');
        if (i === currentPage) {
            pageButton.classList.add('active');
        }
        pageButton.addEventListener('click', () => {
            currentPage = i;
            renderLowongan();
        });
        paginationContainer.appendChild(pageButton);
    }
}

window.onload = loadLowongan;

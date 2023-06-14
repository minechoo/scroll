const secs = document.querySelectorAll('section');
const btns = document.querySelectorAll('ul li');
const speed = 1000;

window.addEventListener('scroll', activation);

btns.forEach((btn, idx) => {
	btn.addEventListener('click', () => moveScroll(idx));
});

function activation() {
	const scroll = window.scrollY;
	const baseline = -window.innerHeight / 2;

	secs.forEach((_, idx) => {
		if (scroll >= secs[idx].offsetTop + baseline) {
			for (const el of btns) el.classList.remove('on');
			btns[idx].classList.add('on');

			for (const el of secs) el.classList.remove('on');
			secs[idx].classList.add('on');
		}
	});
}

function moveScroll(idx) {
	new Anime(window, {
		prop: 'scroll',
		value: secs[idx].offsetTop,
		duration: speed,
	});
}

/*
Element(DOM).scrollY :브라우저의 스크롤 거리값(동적)
DOM.offsetTop : 해당요소의
*/

const secs = document.querySelectorAll('section');
const btns = document.querySelectorAll('ul li');
const speed = 1000;
const baseline = -window.innerHeight / 3;

window.addEventListener('scroll', () => {
	const scroll = window.scrollY;

	secs.forEach((_, idx) => {
		if (scroll >= secs[idx].offsetTop + baseline) {
			for (const el of btns) el.classList.remove('on');
			btns[idx].classList.add('on');

			for (const el of secs) el.classList.remove('on');
			secs[idx].classList.add('on');
		}
	});
});

btns.forEach((btn, idx) => {
	let to = secs[idx].offsetTop;

	btn.addEventListener('click', () => {
		window.scrollTo({ top: to, behavior: 'smooth' });
		new Anime(window, {
			prop: 'scroll',
			value: sece[idx].offsetTop,
			duration: speed,
		});
	});
});

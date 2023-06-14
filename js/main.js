/*
Element(DOM).scrollY :브라우저의 스크롤 거리값(동적)
DOM.offsetTop : 해당요소의
*/

const secs = document.querySelectorAll('section');
const btns = document.querySelectorAll('ul li');
const baseline = -window.innerHeight / 3;

window.addEventListener('scroll', () => {
	console.log(window.scrollY);
	console.log(secs[0].offsetTop);
	console.log(secs[1].offsetTop);
	const scroll = window.scrollY;

	if (scroll >= secs[0].offsetTop + baseline) {
		for (const el of btns) el.classList.remove('on');
		btns[0].classList.add('on');
		for (const el of secs) el.classList.remove('on');
		secs[0].classList.add('on');
	}
	if (scroll >= secs[1].offsetTop + baseline) {
		for (const el of btns) el.classList.remove('on');
		btns[1].classList.add('on');
		for (const el of secs) el.classList.remove('on');
		secs[1].classList.add('on');
	}
	if (scroll >= secs[2].offsetTop + baseline) {
		for (const el of btns) el.classList.remove('on');
		btns[2].classList.add('on');
		for (const el of secs) el.classList.remove('on');
		secs[2].classList.add('on');
	}
	if (scroll >= secs[3].offsetTop + baseline) {
		for (const el of btns) el.classList.remove('on');
		btns[3].classList.add('on');
		for (const el of secs) el.classList.remove('on');
		secs[3].classList.add('on');
	}
});

// btns[1].addEventListener('click', () => {
// 	window.scrollTo({ top: 1400, behavior: 'smooth' });
// });

btns.forEach((btn, idx) => {
	let to = secs[idx].offsetTop;

	btn.addEventListener('click', () => {
		window.scrollTo({ top: to, behavior: 'smooth' });
		// for (const el of btns) el.classList.remove('on');
		// // for (i = 0; i < btns.length; i++) {
		// // 	btns[i].classList.remove('on');
		// // }
		// btn.classList.add('on');
	});
});

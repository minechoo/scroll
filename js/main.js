/*
window.scrollY : 브라우저의 스크롤 거리값 반환 (동적)
DOM.offsetTop : 해당돔요소의 세로 위치값 반환 (정적)
window.scrollTo({left: 가로스크롤 위치값, top: 세로스크롤 위치값}) : 해당 위치값으로 스크롤 이동
*/

const secs = document.querySelectorAll('section');
const btns = document.querySelectorAll('ul li');
const baseline = -window.innerHeight / 3;

window.addEventListener('scroll', () => {
	console.log(window.scrollY);
	console.log(secs[0].offsetTop);
	console.log(secs[1].offsetTop);
	const scroll = window.scrollY;

	secs.forEach((_, idx) => {
		if (scroll >= secs[idx].offsetTop + baseline) {
			for (const el of btns) el.classList.remove('on');
			btns[idx].classList.add('on');
			for (const el of secs) el.classList.remove('on');
			secs[idx].classList.add('on');
		}
	});
	/*
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
  */
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

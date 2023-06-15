/*
window.scrollY : 브라우저의 스크롤 거리값 반환 (동적)
DOM.offsetTop : 해당돔요소의 세로 위치값 반환 (정적)
window.scrollTo({left: 가로스크롤 위치값, top: 세로스크롤 위치값}) : 해당 위치값으로 스크롤 이동
*/
const secs = document.querySelectorAll('section');
const list = document.querySelector('ul');
const btns = list.querySelectorAll('li');
const icon = document.querySelector('.svgBox path');
const box = document.querySelector('.box');
const icon_len = 2730;
const speed = 500;
let enableEvent = true;
let autoScroll = true;
let eventBlocker = null;
const baseline = -window.innerHeight / 2;

/*
window.addEventListener('scroll', ()=>{
	console.log('scrolled') 1초동안 총 60번의 이벤트가 발생 (화면의 주사율에 따라 시스템 이벤트가 발생)
})
*/
//스크롤 이벤트가 발생할 때마다 eventBlocker라는 setTimeout이 리턴하는 1씩 증가되는 숫자값이 담길 전역변수 생성
//결국 setTimeout이 실행될때마다 eventBlocker가 true가 되므로 setTime시간동안은 중복 함수 호출이 막아지고
//setTimeout이 끝나면 eventBlocker가 null(false)로 바뀌기 때문에 다시 이벤트 호출가능해줌
//setTimeout의 딜레이값을 200으로 지정하면 1000/200이 되므로 1초에  60번 호출하는 구문을 5번으로 줄임

window.addEventListener('scroll', () => {
	//커스텀 스크롤함수 호출 (throttling구문 밖에 호출하는 이유는 path모션을 부드럽게 실행하기 위함)
	sec3_custom_scroll();
	sec4_custom_scroll();

	//500일 경우 : 31번 호출
	if (eventBlocker) return; //true 이면 끊어버리고
	eventBlocker = setTimeout(() => {
		//false라서 한번 실행됨
		console.log('scrolled'); //3번 호출(500일경우)
		activation(); //실행하자마자 1이 되어서
		eventBlocker = null; //실행후 false
	}, speed); //setTimeout 실행되는 동안 호출방지
});

// window.addEventListener('scroll', () => {
// 	console.log(window.scrollY);
// 	console.log(secs[0].offsetTop);
// 	console.log(secs[2].offsetTop);
// 	activation();
// });
window.addEventListener('resize', () => {
	if (eventBlocker) return;
	eventBlocker = setTimeout(() => {
		console.log('resize');
		modifyPos();
		eventBlocker = null;
	}, speed);
});
autoScroll && window.addEventListener('mousewheel', moveAuto, { passive: false }); //passive: false 기본 이벤트 막기

btns.forEach((btn, idx) => {
	btn.addEventListener('click', () => enableEvent && moveScroll(idx));
});

function activation() {
	const scroll = window.scrollY;

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
	enableEvent = false; //재이벤트 방지
	new Anime(window, {
		prop: 'scroll',
		value: secs[idx].offsetTop,
		duration: speed,
		callback: () => (enableEvent = true),
	});
}
//브라우저 리사이즈시 현재 스크롤값 갱신
function modifyPos() {
	const active = list.querySelector('li.on');
	console.dir(active);
	//전체 li요소들 중에서 on이 붙어있는 li의 순서값을 저장해주는 구문
	//indexOf는 순수배열에서만 호출 가능 (btns는 유사배열)
	//Array.from(유사배열) -> 유사배열을 순수배열로 변환해서 반환
	const active_index = Array.from(btns).indexOf(active);
	console.log(active_index);
	//scroll(x-coord, y-coord)
	// window.scroll({
	// 	top: 100,
	// 	left: 100,
	// 	behavior: 'smooth'
	// });
	window.scrollTo({ top: secs[active_index].offsetTop, behavior: 'smooth' });
}

function moveAuto(e) {
	e.preventDefault();
	const active = list.querySelector('li.on');
	const active_index = Array.from(btns).indexOf(active);

	if (e.deltaY > 0) {
		console.log('다운');
		if (active_index === btns.length - 1) return;
		moveScroll(active_index + 1);
	} else {
		console.log('업');
		if (active_index === 0) return;
		moveScroll(active_index - 1);
	}
}

function sec3_custom_scroll() {
	const scroll = window.scrollY;
	console.log(scroll);
	let scroll2 = (scroll - secs[2].offsetTop - baseline) * 5;

	if (scroll > secs[2].offsetTop + baseline) {
		scroll2 >= icon_len && (scroll2 = icon_len);
		console.log(scroll2);
		//위의 조건식에서 만들어진 scroll2값이 아래코드에서 활용되야 하므로
		//해당 코드의 순서가 변경되면 안됨
		icon.style.strokeDashoffset = icon_len - scroll2;
	} else {
		icon.style.strokeDashoffset = icon_len;
	}
}

function sec4_custom_scroll() {
	const scroll = window.scrollY;
	let scroll2 = (scroll - secs[3].offsetTop - baseline) / 500;

	if (scroll > secs[3].offsetTop + baseline) {
		console.log(scroll2);
		box.style.transform = `scale(${1 + scroll2}) rotate(${0 + scroll2 * 100}deg)`;
		box.style.opacity = 1 - scroll2;
	} else {
		box.style.transform = `scale(1) rotate(0deg)`;
		box.style.opacity = 1;
	}
}

/*
window.scrollY : 브라우저의 스크롤 거리값 반환 (동적)
DOM.offsetTop : 해당돔요소의 세로 위치값 반환 (정적)
window.scrollTo({left: 가로스크롤 위치값, top: 세로스크롤 위치값}) : 해당 위치값으로 스크롤 이동
*/
const secs = document.querySelectorAll('section');
const list = document.querySelector('ul');
const btns = list.querySelectorAll('li');
const icon = document.querySelector('.svgBox path');
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
	const scroll = window.scrollY;
	//해당 섹션 영역에 도달했을때 다시 0으로 보정된 스크롤값
	let scroll2 = (scroll - secs[2].offsetTop - baseline) * 5;

	//해당 섹션에 스크롤이 도달하면
	if (scroll > secs[2].offsetTop + baseline) {
		//아이콘의 strokeDashoffset값을 보정된 scroll2값으로 계속 뺴줌 (선이 그어지기 시작함)
		icon.style.strokeDashoffset = icon_len - scroll2;
		//scroll2값이 만약에 전체 선의 길이를 넘어가는 순간 값을 0으로 강제고정
		//이렇게 하지 않으면 다시 반대방향으로 선이 빠지게됨
		scroll2 >= icon_len && (scroll2 = icon_len);
	} else {
		//해당 섹션에서 스크롤이 벗어나게 되면 다시 strokeDashoffset값을 원래 고정해서 초기화
		icon.style.strokeDashoffset = icon_len;
	}

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

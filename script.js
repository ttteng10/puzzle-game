//클라우딩 어플리케이션 엔지니어링 김승한
const startButton = document.querySelector('button');
const container = document.querySelector('.container');
const changeButton = document.querySelector('#changeImage');
// 사이즈 선택 버튼
const btn3 = document.querySelector('#size3');
const btn4 = document.querySelector('#size4');
const btn5 = document.querySelector('#size5');
//정답 확인하기 위한 이미지 순서 배열
const collect1_3 = [2,3,4,5,6,8,7,9,1];
const collect1_4 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
const collect1_5 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
const collect2_3 = [1,2,3,4,5,6,7,8,9];
const collect2_4 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
const collect2_5 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
const collect3_3 = [1,2,3,4,5,6,7,8,9];
const collect3_4 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
const collect3_5 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
//퍼즐 완성 시 게임 새로 시작하기 위한 버튼
const resetBtn = document.getElementById('resetbtn');

let imageRandomArray = []; //이미지 랜덤으로 섞어 담을 배열
let imageSet = 0; //이미지 3개 중 값 
let previouslySelectedElement = null; //전에 선택된 이미지
let count = 0; //몇번 선택했는지 count

startButton.addEventListener('click',function(){

    imageSet = Math.floor(Math.random()*3)+1;

    //1.안보이던 화면 -> 보이게 (게임화면)
    // const gameScreen = document.querySelector('.game-screen');
    const gameScreen = document.querySelector('.hide');
    gameScreen.classList.remove('hide');
    //2.보이던 화면 -> 안보이게 (메인화면)
    const mainScreen = document.querySelector('.start-screen');
    mainScreen.classList.add('hide');
    
    const originalImage = document.getElementById('originalImage');
    //originalImage.src = './data/image1/originalImage.png';
    originalImage.setAttribute('src',`./data/image${imageSet}/originalImage.png`);
    //둘의 차이점 알아보기

    //1~9 까지의 랜덤 숫자 뽑아 중복 없는 set에 저장
    let randomSet = new Set();
    while(randomSet.size<9){
        randomSet.add(Math.ceil(Math.random()*9));
    }
    //... 문법은 set에 값들을 펼쳐서 []에 담는다.
    imageRandomArray = [...randomSet];
    for(let i = 0;i<9;i++){
        ///div 요소 생성 후 image-container 클래서 추가
        const div = document.createElement('div');
        div.classList.add('image-container');

        const img = document.createElement('img');
        
        // img.src = './data/image1/image'+(i+1)+'.jpg';
        img.setAttribute('src',`./data/image${imageSet}/image${imageRandomArray[i]}.jpg`);
        div.appendChild(img);
        //선택된 이미지에 이벤트 추가
        div.addEventListener('click',(event)=>{
            let currentElement = event.target;
            if(!previouslySelectedElement){
                previouslySelectedElement = currentElement;
                previouslySelectedElement.style.opacity=0.3;
            }else{
                if(previouslySelectedElement == currentElement){
                    previouslySelectedElement.style.opacity=1;
                    previouslySelectedElement = null;
                }else{
                    const parent1 = previouslySelectedElement.parentNode;
                    const parent2 = currentElement.parentNode;

                    parent1.removeChild(previouslySelectedElement);
                    parent2.removeChild(currentElement);

                    parent1.appendChild(currentElement);
                    parent2.appendChild(previouslySelectedElement);

                    previouslySelectedElement.style.opacity = 1;
                    previouslySelectedElement = null;
                    count++;
                    // previouslySelectedElement = currentElement;
                    // previouslySelectedElement.style.opacity = 0.3;

                    //퍼즐 완성 확인
                    //처음엔 3x3 이므로 imageSet에 따라 정답 배열과 비교
                    //이미지가 바뀔 때마다 확인한다.
                    const divs = document.querySelectorAll('.container div img');
                    let check = [];
                    for(let items of divs){
                        check.push(items.src.substr(-5,1)*1);
                    }
                    let answer=0; //정답과 맞는 위치에 있는 이미지 개수 확인 위한 변수
                    if(imageSet==1){
                        for(let i=0;i<check.length;i++){
                            if(check[i]==collect1_3[i])
                                answer++;
                        }
                        if(answer==collect1_3.length){
                            const item = document.getElementById('result');
                            item.style.display = 'inline'; //숨겨져 있던 요소 보여지게 하는 스타일
                            stop(); //돌아가던 타이머 중지
                            let time = document.querySelector(".time");
                            let num = time.innerHTML;
                            item.innerHTML = '성공 - '+(60-num)+'초만에 해결 '+count+'번만에 해결'; //결과 추가
                            const reset = document.getElementById('reset');
                            reset.style.display = 'inline';
                        }
                    }else if(imageSet==2){
                        for(let i=0;i<check.length;i++){
                            if(check[i]==collect2_3[i])
                                answer++;
                        }
                        if(answer==collect2_3.length){
                            const item = document.getElementById('result');
                            item.style.display = 'inline';
                            stop();
                            let time = document.querySelector(".time");
                            let num = time.innerHTML;
                            item.innerHTML = '성공 - '+(60-num)+'초만에 해결 '+count+'번만에 해결';
                            const reset = document.getElementById('reset');
                            reset.style.display = 'inline';
                        }
                    }else{
                        for(let i=0;i<check.length;i++){
                            if(check[i]==collect3_3[i])
                                answer++;
                        }
                        if(answer==collect3_3.length){
                            const item = document.getElementById('result');
                            item.style.display = 'inline';
                            stop();
                            let time = document.querySelector(".time");
                            let num = time.innerHTML;
                            item.innerHTML = '성공 - '+(60-num)+'초만에 해결 '+count+'번만에 해결';
                            const reset = document.getElementById('reset');
                            reset.style.display = 'inline';
                        }
                    }
                    
                }
            }
        });
        container.appendChild(div);
    }
    timer();
});

changeButton.addEventListener('click',() => {
    stop(); //이미지 바꿀때마다 전에 돌아가던 타이머 중지
    // imageSet = Math.floor(Math.random()*3)+1;
    let newImageSet = Math.floor(Math.random()*3)+1;
    // 버튼 클릭 후 전 이미지와 같은 이미지가 나오는 것을 방지하기 위한 반복문 
    while(imageSet == newImageSet){
        newImageSet = Math.floor(Math.random()*3)+1;
    }
    imageSet = newImageSet;
    const originalImage = document.getElementById('originalImage');
    originalImage.setAttribute('src',`./data/image${newImageSet}/originalImage.png`);
    
    const puzzleImages = document.querySelectorAll('.container img');
    
    puzzleImages.forEach((img,i)=>{
        console.log(img);
        img.setAttribute('src',`./data/image${newImageSet}/image${imageRandomArray[i]}.jpg`)
    });
    timer(); //이미지 바뀌는 이벤트 다 실행 후 다시 타이머 시작
});

btn3.addEventListener('click',()=>{
    stop(); // 사이즈 변경 후 전에 돌아가던 타이머 중지
    //원래 안에 있던 이미지들 지우고 새로 넣기위해
    container.replaceChildren();

    //컨테이너 크기변경
    container.style.gridTemplateColumns = 'repeat(3, 1fr)'; 

    let randomSet = new Set();
    while(randomSet.size<9){
        randomSet.add(Math.ceil(Math.random()*9));
    }
    imageRandomArray = [...randomSet];
    for(let i=0;i<9;i++){
        const div = document.createElement('div');
        div.classList.add('image-container');
        const img = document.createElement('img');
        
        img.setAttribute('src',`./data/image${imageSet}/image${imageRandomArray[i]}.jpg`);
        div.appendChild(img);
        div.addEventListener('click',(event)=>{
            let currentElement = event.target;
            if(!previouslySelectedElement){
                previouslySelectedElement = currentElement;
                previouslySelectedElement.style.opacity=0.3;
            }else{
                if(previouslySelectedElement == currentElement){
                    previouslySelectedElement.style.opacity=1;
                    previouslySelectedElement = null;
                }else{
                    const parent1 = previouslySelectedElement.parentNode;
                    const parent2 = currentElement.parentNode;

                    parent1.removeChild(previouslySelectedElement);
                    parent2.removeChild(currentElement);

                    parent1.appendChild(currentElement);
                    parent2.appendChild(previouslySelectedElement);

                    previouslySelectedElement.style.opacity = 1;
                    previouslySelectedElement = null;

                    //퍼즐 완성 확인
                    //3x3 이므로 imageSet에 따라 정답 배열과 비교
                    const divs = document.querySelectorAll('.container div img');
                    let check = [];
                    for(let items of divs){
                        check.push(items.src.substr(-5,1)*1);
                    }
                    let answer=0;
                    if(imageSet==1){
                        for(let i=0;i<check.length;i++){
                            if(check[i]==collect1_3[i])
                                answer++;
                        }
                        if(answer==collect1_3.length){
                            const item = document.getElementById('result');
                            item.style.display = 'inline';
                            stop();
                            let time = document.querySelector(".time");
                            let num = time.innerHTML;
                            item.innerHTML = '성공 - '+(60-num)+'초만에 해결 '+count+'번만에 해결';
                            const reset = document.getElementById('reset');
                            reset.style.display = 'inline';
                        }
                    }else if(imageSet==2){
                        for(let i=0;i<check.length;i++){
                            if(check[i]==collect2_3[i])
                                answer++;
                        }
                        if(answer==collect2_3.length){
                            const item = document.getElementById('result');
                            item.style.display = 'inline';
                            stop();
                            let time = document.querySelector(".time");
                            let num = time.innerHTML;
                            item.innerHTML = '성공 - '+(60-num)+'초만에 해결 '+count+'번만에 해결';
                            const reset = document.getElementById('reset');
                            reset.style.display = 'inline';
                        }
                    }else{
                        for(let i=0;i<check.length;i++){
                            if(check[i]==collect3_3[i])
                                answer++;
                        }
                        if(answer==collect3_3.length){
                            const item = document.getElementById('result');
                            item.style.display = 'inline';
                            stop();
                            let time = document.querySelector(".time");
                            let num = time.innerHTML;
                            item.innerHTML = '성공 - '+(60-num)+'초만에 해결 '+count+'번만에 해결';
                            const reset = document.getElementById('reset');
                            reset.style.display = 'inline';
                        }
                    }
                }
            }
        });
        container.appendChild(div);
    }
    timer();
});

btn4.addEventListener('click',()=>{
    stop();
    //원래 안에 있던 이미지들 지우고 새로 넣기위해
    container.replaceChildren();

    //컨테이너 4x4 로 크기변경
    container.style.gridTemplateColumns = 'repeat(4, 1fr)'; 

    let randomSet = new Set();
    while(randomSet.size<16){
        randomSet.add(Math.ceil(Math.random()*16));
    }
    imageRandomArray = [...randomSet];
    for(let i=0;i<16;i++){
        const div = document.createElement('div');
        div.classList.add('image-container');
        const img = document.createElement('img');
        
        // img.src = './data/image1/image'+(i+1)+'.jpg';
        img.setAttribute('src',`./data/image${imageSet}/image4${imageRandomArray[i]}.jpg`);
        div.appendChild(img);
        div.addEventListener('click',(event)=>{
            let currentElement = event.target;
            if(!previouslySelectedElement){
                previouslySelectedElement = currentElement;
                previouslySelectedElement.style.opacity=0.3;
            }else{
                if(previouslySelectedElement == currentElement){
                    previouslySelectedElement.style.opacity=1;
                    previouslySelectedElement = null;
                }else{
                    const parent1 = previouslySelectedElement.parentNode;
                    const parent2 = currentElement.parentNode;

                    parent1.removeChild(previouslySelectedElement);
                    parent2.removeChild(currentElement);

                    parent1.appendChild(currentElement);
                    parent2.appendChild(previouslySelectedElement);

                    previouslySelectedElement.style.opacity = 1;
                    previouslySelectedElement = null;

                    //퍼즐 완성 확인
                    //4x4 이므로 imageSet에 따라 정답 배열과 비교
                    const divs = document.querySelectorAll('.container div img');
                    let check = [];
                    for(let items of divs){
                        check.push(items.src.substr(-5,1)*1);
                    }
                    let answer=0;
                    if(imageSet==1){
                        for(let i=0;i<check.length;i++){
                            if(check[i]==collect1_4[i])
                                answer++;
                        }
                        if(answer==collect1_3.length){
                            const item = document.getElementById('result');
                            item.style.display = 'inline';
                            stop();
                            let time = document.querySelector(".time");
                            let num = time.innerHTML;
                            item.innerHTML = '성공 - '+(60-num)+'초만에 해결 '+count+'번만에 해결';
                            const reset = document.getElementById('reset');
                            reset.style.display = 'inline';
                        }
                    }else if(imageSet==2){
                        for(let i=0;i<check.length;i++){
                            if(check[i]==collect2_4[i])
                                answer++;
                        }
                        if(answer==collect2_3.length){
                            const item = document.getElementById('result');
                            item.style.display = 'inline';
                            stop();
                            let time = document.querySelector(".time");
                            let num = time.innerHTML;
                            item.innerHTML = '성공 - '+(60-num)+'초만에 해결 '+count+'번만에 해결';
                            const reset = document.getElementById('reset');
                            reset.style.display = 'inline';
                        }
                    }else{
                        for(let i=0;i<check.length;i++){
                            if(check[i]==collect3_4[i])
                                answer++;
                        }
                        if(answer==collect3_3.length){
                            const item = document.getElementById('result');
                            item.style.display = 'inline';
                            stop();
                            let time = document.querySelector(".time");
                            let num = time.innerHTML;
                            item.innerHTML = '성공 - '+(60-num)+'초만에 해결 '+count+'번만에 해결';
                            const reset = document.getElementById('reset');
                            reset.style.display = 'inline';
                        }
                    }
                }
            }
        });
        container.appendChild(div);
    }
    timer();
});

btn5.addEventListener('click',()=>{
    stop();
    //원래 안에 있던 이미지들 지우고 새로 넣기위해
    container.replaceChildren();

    //컨테이너 5x5 로 크기변경
    container.style.gridTemplateColumns = 'repeat(5, 1fr)'; 

    let randomSet = new Set();
    while(randomSet.size<25){
        randomSet.add(Math.ceil(Math.random()*25));
    }
    imageRandomArray = [...randomSet];
    for(let i=0;i<25;i++){
        const div = document.createElement('div');
        div.classList.add('image-container');
        const img = document.createElement('img');
        
        // img.src = './data/image1/image'+(i+1)+'.jpg';
        img.setAttribute('src',`./data/image${imageSet}/image5${imageRandomArray[i]}.jpg`);
        div.appendChild(img);
        div.addEventListener('click',(event)=>{
            let currentElement = event.target;
            if(!previouslySelectedElement){
                previouslySelectedElement = currentElement;
                previouslySelectedElement.style.opacity=0.3;
            }else{
                if(previouslySelectedElement == currentElement){
                    previouslySelectedElement.style.opacity=1;
                    previouslySelectedElement = null;
                }else{
                    const parent1 = previouslySelectedElement.parentNode;
                    const parent2 = currentElement.parentNode;

                    parent1.removeChild(previouslySelectedElement);
                    parent2.removeChild(currentElement);

                    parent1.appendChild(currentElement);
                    parent2.appendChild(previouslySelectedElement);

                    previouslySelectedElement.style.opacity = 1;
                    previouslySelectedElement = null;
                    //퍼즐 완성 확인
                    //5x5 이므로 imageSet에 따라 정답 배열과 비교
                    const divs = document.querySelectorAll('.container div img');
                    let check = [];
                    for(let items of divs){
                        check.push(items.src.substr(-5,1)*1);
                    }
                    let answer=0;
                    if(imageSet==1){
                        for(let i=0;i<check.length;i++){
                            if(check[i]==collect1_3[i])
                                answer++;
                        }
                        if(answer==collect1_5.length){
                            const item = document.getElementById('result');
                            item.style.display = 'inline';
                            stop();
                            let time = document.querySelector(".time");
                            let num = time.innerHTML;
                            item.innerHTML = '성공 - '+(60-num)+'초만에 해결 '+count+'번만에 해결';
                            const reset = document.getElementById('reset');
                            reset.style.display = 'inline';
                        }
                    }else if(imageSet==2){
                        for(let i=0;i<check.length;i++){
                            if(check[i]==collect2_3[i])
                                answer++;
                        }
                        if(answer==collect2_5.length){
                            const item = document.getElementById('result');
                            item.style.display = 'inline';
                            stop();
                            let time = document.querySelector(".time");
                            let num = time.innerHTML;
                            item.innerHTML = '성공 - '+(60-num)+'초만에 해결 '+count+'번만에 해결';
                            const reset = document.getElementById('reset');
                            reset.style.display = 'inline';
                        }
                    }else{
                        for(let i=0;i<check.length;i++){
                            if(check[i]==collect3_3[i])
                                answer++;
                        }
                        if(answer==collect3_5.length){
                            const item = document.getElementById('result');
                            item.style.display = 'inline';
                            stop();
                            let time = document.querySelector(".time");
                            let num = time.innerHTML;
                            item.innerHTML = '성공 - '+(60-num)+'초만에 해결 '+count+'번만에 해결';
                            const reset = document.getElementById('reset');
                            reset.style.display = 'inline';
                        }
                    }
                }
            }
        });
        container.appendChild(div);
    }
    timer();
});
let limit;
function timer(){
    const time = document.querySelector('.time');
    let num = time.innerHTML;
    if(num!=60) num=60;
    limit = setInterval(()=>{
        time.innerHTML = num--;
        if(num==-1){
            clearInterval(limit);
            time.innerHTML = '실패';
            const divs = document.querySelectorAll('.container div');
            for(let items of divs){
                items.style.pointerEvents = 'none';
            }
            console.log(count);
        }
    },1000); 
}
function stop(){
    clearInterval(limit);
}

resetBtn.addEventListener('click',()=>{
    const gameScreen = document.querySelector('.start-screen');
    gameScreen.classList.remove('hide');
    //2.보이던 화면 -> 안보이게 (메인화면)
    const mainScreen = document.querySelector('.game-screen');
    mainScreen.classList.add('hide');
    container.replaceChildren();
    imageRandomArray = [];
    imageSet = 0;
    previouslySelectedElement = null;
    count = 0;
    const item = document.getElementById('result');
    item.style.display = 'none';
    const reset = document.getElementById('reset');
    reset.style.display = 'none';
});

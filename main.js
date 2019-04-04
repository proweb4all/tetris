//'use strict';
window.addEventListener('DOMContentLoaded', function() {
    let overlay = document.querySelector('.overlay'),
        modal = document.querySelector('.modal'),
        speed = 700,
        numStr = 20;

        modal.addEventListener('click', function(e){
            if (e.target.classList.contains('easy')){
                speed = 700;
            } else if (e.target.classList.contains('normal')){
                speed = 500;
            } else if (e.target.classList.contains('hard')){
                speed = 300;
            }
            if (e.target.classList.contains('button')){
                modal.style.display = 'none';
                overlay.style.display = 'none';
                startGame();
            }
        })

    function startGame(){
        let tetris = document.createElement('div');
        tetris.classList.add('tetris');
        let excel;
        let i;
    
        for (i = 1; i <= (numStr * 10); i++){
            excel = document.createElement('div');
            excel.classList.add('excel');
            tetris.appendChild(excel);
        }
        let main = document.querySelector('.main');
        main.appendChild(tetris);
        excel = document.querySelectorAll('.excel');
        //excel = getElementsByClassName('excel');
        i = 0;
        let x, y;
        for (y = numStr; y > 0; y--){
            for (x = 1; x < 11; x++){
                excel[i].setAttribute('posX', x);
                excel[i].setAttribute('posY', y);
                i++;
            }
        }
        // коордиаты начала фируры
        x = 5; y = numStr - 3;
        // шаблон фигур
        let mainArr = [
            //палка
            [
                [0, 1], [0, 2], [0, 3],
                // поворот на 90 градусов
                [ [-1, 1], [0, 0], [1, -1], [2, -2] ],
                // поворот на 180 градусов
                [ [1, -1], [0, 0], [-1, 1], [-2, 2] ],
                // поворот на 270 градусов
                [ [-1, 1], [0, 0], [1, -1], [2, -2] ],
                // поворот на 360 градусов
                [ [1, -1], [0, 0], [-1, 1], [-2, 2] ]
            ],
            //квадрат
            [
                [1, 0], [0, 1], [1, 1],
                // поворот на 90 градусов
                [ [0, 0], [0, 0], [0, 0], [0, 0] ],
                // поворот на 180 градусов
                [ [0, 0], [0, 0], [0, 0], [0, 0] ],
                // поворот на 270 градусов
                [ [0, 0], [0, 0], [0, 0], [0, 0] ],
                // поворот на 360 градусов
                [ [0, 0], [0, 0], [0, 0], [0, 0] ]
            ],
            // L
            [
                [1, 0], [0, 1], [0, 2],
                // поворот на 90 градусов
                [ [0, 0], [-1, 1], [1, 0], [2, -1] ],
                // поворот на 180 градусов
                [ [1, -1], [1, -1], [-1, 0], [-1, 0] ],
                // поворот на 270 градусов
                [ [-1, 0], [0, -1], [2, -2], [1, -1] ],
                // поворот на 360 градусов
                [ [0, -1], [0, -1], [-2, 0], [-2, 0] ]
            ],
            // L влево )
            [
                [1, 0], [1, 1], [1, 2],
                // поворот на 90 градусов
                [ [0, 0], [0, 0], [1, -1], [-1, -1] ],
                // поворот на 180 градусов
                [ [0, -1], [-1, 0], [-2, 1], [1, 0] ],
                // поворот на 270 градусов
                [ [2, 0], [0, 0], [1, -1], [1, -1] ],
                // поворот на 360 градусов
                [ [-2, 0], [1, -1], [0, 0], [-1, 1] ]
            ],
            // s
            [
                [1, 0], [1, 1], [2, 1],
                // поворот на 90 градусов
                [ [2, -1], [0, 0], [1, -1], [-1, 0] ],
                // поворот на 180 градусов
                [ [-2, 0], [0, -1], [-1, 0], [1, -1] ],
                // поворот на 270 градусов
                [ [2, -1], [0, 0], [1, -1], [-1, 0] ],
                // поворот на 360 градусов
                [ [-2, 0], [0, -1], [-1, 0], [1, -1] ]
            ],
            // s влево
            [
                [1, 0], [-1, 1], [0, 1],
                // поворот на 90 градусов
                [ [0, -1], [-1, 0], [2, -1], [1, 0] ],
                // поворот на 180 градусов
                [ [0, 0], [1, -1], [-2, 0], [-1, -1] ],
                // поворот на 270 градусов
                [ [0, -1], [-1, 0], [2, -1], [1, 0] ],
                // поворот на 360 градусов
                [ [0, 0], [1, -1], [-2, 0], [-1, -1] ]
            ],
            // танк
            [
                [1, 0], [2, 0], [1, 1],
                // поворот на 90 градусов
                [ [1, -1], [0, 0], [0, 0], [0, 0] ],
                // поворот на 180 градусов
                [ [0, 0], [-1, 0], [-1, 0], [1, -1] ],
                // поворот на 270 градусов
                [ [1, -1], [1, -1], [1, -1], [0, 0] ],
                // поворот на 360 градусов
                [ [-2, 0], [0, -1], [0, -1], [-1, -1] ]
            ]
        ]
        let currentFigure = 0,
            figureBody = 0,
            rotate = 1;
        function create(){
            function getRandom(){
                return Math.round(Math.random() * (mainArr.length - 1));
            }
            rotate = 1;
            currentFigure = getRandom();
            figureBody = [
                document.querySelector(`[posX = "${x}"][posY = "${y}"]`),
                document.querySelector(`[posX = "${x + mainArr[currentFigure][0][0]}"][posY = "${y + mainArr[currentFigure][0][1]}"]`),
                document.querySelector(`[posX = "${x + mainArr[currentFigure][1][0]}"][posY = "${y + mainArr[currentFigure][1][1]}"]`),
                document.querySelector(`[posX = "${x + mainArr[currentFigure][2][0]}"][posY = "${y + mainArr[currentFigure][2][1]}"]`)
            ]
            for (let i = 0; i < figureBody.length; i++){
                figureBody[i].classList.add('figure');
            }
            // figureBody.forEach(elem => {
            //     elem.classList.add('figure');
            // })
        }
    
        // движение 
        function move(){
            let moveDown = true;
            let coords = [
                [figureBody[0].getAttribute('posX'),figureBody[0].getAttribute('posY')],
                [figureBody[1].getAttribute('posX'),figureBody[1].getAttribute('posY')],
                [figureBody[2].getAttribute('posX'),figureBody[2].getAttribute('posY')],
                [figureBody[3].getAttribute('posX'),figureBody[3].getAttribute('posY')],
            ];
            for (let i = 0; i < coords.length; i++){
                if (coords[i][1] == 1 || document.querySelector(`[posX = "${coords[i][0]}"][posY = "${coords[i][1] - 1}"]`).classList.contains('set')){
                    moveDown = false;
                    break;
                }
            }
            if (moveDown) {
                for (let i = 0; i < figureBody.length; i++){
                    figureBody[i].classList.remove('figure');
                }
                figureBody = [
                    document.querySelector(`[posX = "${coords[0][0]}"][posY = "${coords[0][1] - 1}"]`),
                    document.querySelector(`[posX = "${coords[1][0]}"][posY = "${coords[1][1] - 1}"]`),
                    document.querySelector(`[posX = "${coords[2][0]}"][posY = "${coords[2][1] - 1}"]`),
                    document.querySelector(`[posX = "${coords[3][0]}"][posY = "${coords[3][1] - 1}"]`),
                ];
                for (let i = 0; i < figureBody.length; i++){
                    figureBody[i].classList.add('figure');
                }
            } else{
                for (let i = 0; i < figureBody.length; i++){
                    figureBody[i].classList.remove('figure');
                    figureBody[i].classList.add('set');
                }
                for (let i = 1; i < (numStr - 4); i++) {
                    let count = 0;
                    for (let k = 1; k < 11; k++){
                        if (document.querySelector(`[posX = "${k}"][posY = "${i}"]`).classList.contains('set')){
                            count++;
                            if (count == 10) {
                                score += 10;
                                result.textContent = `ВАШИ ОЧКИ: ${score}`;
                                for (let m = 1; m < 11; m++){
                                    document.querySelector(`[posX = "${m}"][posY = "${i}"]`).classList.remove('set')
                                }
                                let set = document.querySelectorAll('.set');
                                let newSet = [];
                                for (let s = 0; s < set.length; s++) {
                                    let setCoords = [set[s].getAttribute('posX'), set[s].getAttribute('posY')];
                                    if (setCoords[1] > i) {
                                        set[s].classList.remove('set');
                                        newSet.push(document.querySelector(`[posX = "${setCoords[0]}"][posY = "${setCoords[1] - 1}"]`))
                                    }
                                }
                                for (let a = 0; a < newSet.length; a++) {
                                    newSet[a].classList.add('set');
                                }
                                i--;
                            }
                        };
                    }
                }
                for (let i = 1; i < 11; i++) {
                    if (document.querySelector(`[posX = "${i}"][posY = "${numStr - 3}"]`).classList.contains('set')){
                        clearInterval(interval);
                        alert(`Игра окончена!\nВаши очки: ${score}`);
                        break;
                    }
                }
                create();
            }
        }
        create();
        let score = 0;
        let result = document.querySelector('.result');
            result.textContent = `ВАШИ ОЧКИ: ${score}`;
    
        let interval = setInterval(() => {
            move();
        }, speed);
        
        // управление 
        let flagLR = true;
        window.addEventListener('keydown', function(e){
            let coords = [
                [figureBody[0].getAttribute('posX'),figureBody[0].getAttribute('posY')],
                [figureBody[1].getAttribute('posX'),figureBody[1].getAttribute('posY')],
                [figureBody[2].getAttribute('posX'),figureBody[2].getAttribute('posY')],
                [figureBody[3].getAttribute('posX'),figureBody[3].getAttribute('posY')],
            ];
            function getNewState(a){
                flagLR = true;
                let figureNew = [
                    document.querySelector(`[posX = "${+coords[0][0] + a}"][posY = "${coords[0][1]}"]`),
                    document.querySelector(`[posX = "${+coords[1][0] + a}"][posY = "${coords[1][1]}"]`),
                    document.querySelector(`[posX = "${+coords[2][0] + a}"][posY = "${coords[2][1]}"]`),
                    document.querySelector(`[posX = "${+coords[3][0] + a}"][posY = "${coords[3][1]}"]`),
                ];
                for (let i = 0; i < figureNew.length; i++){
                    if (!figureNew[i] || figureNew[i].classList.contains('set')){
                        flagLR = false;
                    }
                }
                if (flagLR) {
                    for (let i = 0; i < figureBody.length; i++){
                        figureBody[i].classList.remove('figure');                
                    }
                    figureBody = figureNew;
                    for (let i = 0; i < figureBody.length; i++){
                        figureBody[i].classList.add('figure');                
                    }
                }
            }
            if (e.keyCode == 37){
                getNewState(-1);
            } else if (e.keyCode == 39){
                getNewState(1);
            } else if (e.keyCode == 40){
                move();
            } else if (e.keyCode == 38){
                flagLR = true;
                console.log(e.keyCode);
                let figureNew = [
                    document.querySelector(`[posX = "${+coords[0][0] + mainArr[currentFigure][rotate + 2][0][0]}"][posY = "${+coords[0][1] + mainArr[currentFigure][rotate + 2][0][1]}"]`),
                    document.querySelector(`[posX = "${+coords[1][0] + mainArr[currentFigure][rotate + 2][1][0]}"][posY = "${+coords[1][1] + mainArr[currentFigure][rotate + 2][1][1]}"]`),
                    document.querySelector(`[posX = "${+coords[2][0] + mainArr[currentFigure][rotate + 2][2][0]}"][posY = "${+coords[2][1] + mainArr[currentFigure][rotate + 2][2][1]}"]`),
                    document.querySelector(`[posX = "${+coords[3][0] + mainArr[currentFigure][rotate + 2][3][0]}"][posY = "${+coords[3][1] + mainArr[currentFigure][rotate + 2][3][1]}"]`),
                ];
    
                for (let i = 0; i < figureNew.length; i++){
                    if (!figureNew[i] || figureNew[i].classList.contains('set')){
                        flagLR = false;
                    }
                }
                if (flagLR) {
                    for (let i = 0; i < figureBody.length; i++){
                        figureBody[i].classList.remove('figure');                
                    }
                    figureBody = figureNew;
                    for (let i = 0; i < figureBody.length; i++){
                        figureBody[i].classList.add('figure');                
                    }
                    if (rotate < 4) {rotate++} else {rotate = 1};
                }
            }
        })
            
    }

});
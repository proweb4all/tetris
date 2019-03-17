//'use strict';
window.addEventListener('DOMContentLoaded', function() {
    let tetris = document.createElement('div');
    tetris.classList.add('tetris');
    let excel;
    let i;

    for (i = 1; i < 181; i++){
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
    for (y = 18; y > 0; y--){
        for (x = 1; x < 11; x++){
            excel[i].setAttribute('posX', x);
            excel[i].setAttribute('posY', y);
            i++;
        }
    }
    // коордиаты начала фируры
    x = 5; y = 15;
    // шаблон фигур
    let mainArr = [
        //палка
        [
            [0, 1], [0, 2], [0, 3]
        ],
        //квадрат
        [
            [1, 0], [0, 1], [1, 1]
        ],
        // L
        [
            [1, 0], [0, 1], [0, 2]
        ],
        // L влево )
        [
            [1, 0], [1, 1], [1, 2]
        ],
        // s
        [
            [1, 0], [1, 1], [2, 1]
        ],
        // s влево
        [
            [1, 0], [-1, 1], [0, 1]
        ],
        // танк
        [
            [1, 0], [2, 0], [1, 1]
        ]
    ]
    let currentFigure = 0,
        figureBody = 0;
    function create(){
        function getRandom(){
            return Math.round(Math.random() * (mainArr.length - 1));
        }
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
            create();
        }
    }
    create();
    let interval = setInterval(() => {
        move();
    }, 500);
    
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
        }
    })

});
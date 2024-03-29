//Modal for Rules of the game
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function () {
  modal.style.display = "block";
};
span.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
//Game code
let cd;
let temp = 99; //temp is index of valid block to play on 
let gameEnd;
let blockList = [];
let superBlockList = new Array(9);
let wonSmallBoardList = new Array(9).fill(0);
let turn = 1; //turn of player X
let legalMove = 0; //for illegal sound effect
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const playerTurn = document.querySelector("#turn");
restart.addEventListener("click", refreshWindow, false);
var gameStart = new Audio("sounds/game-start.mp3");
gameStart.play();
function refreshWindow() {
  window.location.reload(true);
}
let block11List = new Array(9),
  block12List = new Array(9),
  block13List = new Array(9),
  block21List = new Array(9),
  block22List = new Array(9),
  block23List = new Array(9),
  block31List = new Array(9),
  block32List = new Array(9),
  block33List = new Array(9);

(function () {
  window.addEventListener("resize", resizeCanvas, false);

  function resizeCanvas() {
    if (window.innerHeight > window.innerWidth) {
      canvas.width = (window.innerWidth * 9) / 10;
      canvas.height = (window.innerWidth * 9) / 10;
    } else {
      canvas.width = (window.innerHeight * 9) / 10;
      canvas.height = (window.innerHeight * 9) / 10;
    }
    canvas.style.border = "1px solid #000000";
    drawLine();
    drawBoard(drawLine);
    ticTacToe(drawLine, cd / 3, 0, 0, 0, 0);
    ticTacToe(drawLine, cd / 3, cd / 3, 0, 1);
    ticTacToe(drawLine, cd / 3, (cd * 2) / 3, 0, 2);
    ticTacToe(drawLine, cd / 3, 0, cd / 3, 3);
    ticTacToe(drawLine, cd / 3, cd / 3, cd / 3, 4);
    ticTacToe(drawLine, cd / 3, (cd * 2) / 3, cd / 3, 5);
    ticTacToe(drawLine, cd / 3, 0, (cd * 2) / 3, 6);
    ticTacToe(drawLine, cd / 3, cd / 3, (cd * 2) / 3, 7);
    ticTacToe(drawLine, cd / 3, (cd * 2) / 3, (cd * 2) / 3, 8);
    ticTacToe(drawLine, cd / 3, 0, 0, 0, 0);
    ticTacToe(drawLine, cd / 3, cd / 3, 0, 1);
    ticTacToe(drawLine, cd / 3, (cd * 2) / 3, 0, 2);
    ticTacToe(drawLine, cd / 3, 0, cd / 3, 3);
    ticTacToe(drawLine, cd / 3, cd / 3, cd / 3, 4);
    ticTacToe(drawLine, cd / 3, (cd * 2) / 3, cd / 3, 5);
    ticTacToe(drawLine, cd / 3, 0, (cd * 2) / 3, 6);
    ticTacToe(drawLine, cd / 3, cd / 3, (cd * 2) / 3, 7);
    ticTacToe(drawLine, cd / 3, (cd * 2) / 3, (cd * 2) / 3, 8);
    canvas.addEventListener("mousedown", illegalMoveSound, false);
  }

  resizeCanvas();

  function drawLine(
    moveTo_x,
    moveTo_y,
    lineTo_x,
    lineTo_y,
    lineWidth,
    strokeStyle,
    lineCap
  ) {
    ctx.beginPath();
    ctx.moveTo(moveTo_x, moveTo_y);
    ctx.lineTo(lineTo_x, lineTo_y);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.lineCap = lineCap;
    ctx.stroke();
  }

  function drawBoard(drawLine) {
    if (window.innerWidth < window.innerHeight) {
      cd = (window.innerWidth * 9) / 10;
    } else {
      cd = (window.innerHeight * 9) / 10;
    }
    for (let j = 0; j <= 2; j++) {
      for (let i = 0; i <= 7; i++) {
        drawLine(
          (cd / 9) * i + cd / 9,
          cd * 0.02 + (cd / 3) * j,
          (cd / 9) * i + cd / 9,
          cd / 3 - cd * 0.02 + (cd / 3) * j,
          cd * 0.01,
          "blue",
          "round"
        );

        drawLine(
          cd * 0.02 + (cd / 3) * j,
          (cd / 9) * i + cd / 9,
          cd / 3 - cd * 0.02 + (cd / 3) * j,
          (cd / 9) * i + cd / 9,
          cd * 0.01,
          "blue",
          "round"
        );
      }
    }
    for (let i = 1; i <= 2; i++) {
      drawLine(
        (cd / 3) * i,
        cd * 0.02,
        (cd / 3) * i,
        cd - cd * 0.02,
        cd * 0.012,
        "red",
        "round"
      );

      drawLine(
        cd * 0.02,
        (cd / 3) * i,
        cd - cd * 0.02,
        (cd / 3) * i,
        cd * 0.012,
        "red",
        "round"
      );
    }
  }

  function ticTacToe(drawLine, cellSize, topLeftX, topLeftY, blockNum) {
    function drawBigX(x, y) {
      ctx.beginPath();
      ctx.rect(
        x + cd * 0.009,
        y + cd * 0.009,
        cd / 3 - cd * 0.018,
        cd / 3 - cd * 0.018
      );
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.beginPath();
      drawLine(
        x + cd * 0.06,
        y + cd * 0.06,
        x + cd / 3 - cd * 0.06,
        y + cd / 3 - cd * 0.06,
        cd * 0.06,
        "green",
        "round"
      );
      drawLine(
        x + cd / 3 - cd * 0.06,
        y + cd * 0.06,
        x + cd * 0.06,
        y + cd / 3 - cd * 0.06,
        cd * 0.06,
        "green",
        "round"
      );
    }
    function drawBigO(x, y) {
      ctx.beginPath();
      ctx.rect(
        x + cd * 0.009,
        y + cd * 0.009,
        cd / 3 - cd * 0.018,
        cd / 3 - cd * 0.018
      );
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x + cd / 6, y + cd / 6, cd / 6 - cd * 0.03, 0, 2 * Math.PI);
      ctx.fillStyle = "orange";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x + cd / 6, y + cd / 6, cd / 6 - cd * 0.08, 0, 2 * Math.PI);
      ctx.fillStyle = "white";
      ctx.fill();
    }

    function drawX(x, y) {
      ctx.beginPath();
      drawLine(
        x + cellSize * 0.06,
        y + cellSize * 0.06,
        x + cellSize / 3 - cellSize * 0.06,
        y + cellSize / 3 - cellSize * 0.06,
        cellSize * 0.06,
        "green",
        "round"
      );
      drawLine(
        x + cellSize / 3 - cellSize * 0.06,
        y + cellSize * 0.06,
        x + cellSize * 0.06,
        y + cellSize / 3 - cellSize * 0.06,
        cellSize * 0.06,
        "#green",
        "round"
      );
      turn = 0;
    }
    function drawO(x, y) {
      ctx.beginPath();
      ctx.arc(
        x + cellSize / 6,
        y + cellSize / 6,
        cellSize / 6 - cellSize * 0.03,
        0,
        2 * Math.PI
      );
      ctx.fillStyle = "orange";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(
        x + cellSize / 6,
        y + cellSize / 6,
        cellSize / 6 - cellSize * 0.08,
        0,
        2 * Math.PI
      );
      ctx.fillStyle = "white";
      ctx.fill();
      turn = 1;
    }
    if (temp == 99) {
      squareFrame("black", cellSize, topLeftX, topLeftY);
      cellBoardPop("black", cellSize, topLeftX, topLeftY);
    }
    canvas.addEventListener("mousedown", doMouseDown, false);
    function doMouseDown(event){
      const restart = document.querySelector("#restart");
      if (gameEnd) restart.innerHTML = "NEW GAME";
        else {
          restart.innerHTML = "RESTART";
          restart.classList.remove("instruction");
          restart.classList.add("refreshBtn");
        }
      const rect = canvas.getBoundingClientRect();
      const canvs_x = event.clientX - rect.left;
      const canvs_y = event.clientY - rect.top;

      let block11 =
        canvs_x > topLeftX &&
        canvs_x < topLeftX + cellSize / 3 &&
        canvs_y > topLeftY &&
        canvs_y < topLeftY + cellSize / 3 &&
        !blockList[blockNum][0] &&
        !superBlockList[blockNum] &&
        (blockNum == temp ||
          superBlockList[temp] != undefined ||
          temp == 99 ||
          checkAllCells(temp)) &&
        !gameEnd;
      let block12 =
        canvs_x > topLeftX + cellSize / 3 &&
        canvs_x < topLeftX + (cellSize * 2) / 3 &&
        canvs_y > topLeftY &&
        canvs_y < topLeftY + cellSize / 3 &&
        !blockList[blockNum][1] &&
        !superBlockList[blockNum] &&
        (blockNum == temp ||
          superBlockList[temp] != undefined ||
          temp == 99 ||
          checkAllCells(temp)) &&
        !gameEnd;
      let block13 =
        canvs_x >= topLeftX + (cellSize * 2) / 3 &&
        canvs_x <= topLeftX + cellSize &&
        canvs_y >= topLeftY &&
        canvs_y <= topLeftY + cellSize / 3 &&
        !blockList[blockNum][2] &&
        !superBlockList[blockNum] &&
        (blockNum == temp ||
          superBlockList[temp] != undefined ||
          temp == 99 ||
          checkAllCells(temp)) &&
        !gameEnd;
      let block21 =
        canvs_x >= topLeftX &&
        canvs_x <= topLeftX + cellSize / 3 &&
        canvs_y >= topLeftY + cellSize / 3 &&
        canvs_y <= topLeftY + (cellSize * 2) / 3 &&
        !blockList[blockNum][3] &&
        !superBlockList[blockNum] &&
        (blockNum == temp ||
          superBlockList[temp] != undefined ||
          temp == 99 ||
          checkAllCells(temp)) &&
        !gameEnd;
      let block22 =
        canvs_x >= topLeftX + cellSize / 3 &&
        canvs_x <= topLeftX + (cellSize * 2) / 3 &&
        canvs_y >= topLeftY + cellSize / 3 &&
        canvs_y <= topLeftY + (cellSize * 2) / 3 &&
        !blockList[blockNum][4] &&
        !superBlockList[blockNum] &&
        (blockNum == temp ||
          superBlockList[temp] != undefined ||
          temp == 99 ||
          checkAllCells(temp)) &&
        !gameEnd;
      let block23 =
        canvs_x >= topLeftX + (cellSize * 2) / 3 &&
        canvs_x <= topLeftX + cellSize &&
        canvs_y >= topLeftY + cellSize / 3 &&
        canvs_y <= topLeftY + (cellSize * 2) / 3 &&
        !blockList[blockNum][5] &&
        !superBlockList[blockNum] &&
        (blockNum == temp ||
          superBlockList[temp] != undefined ||
          temp == 99 ||
          checkAllCells(temp)) &&
        !gameEnd;
      let block31 =
        canvs_x >= topLeftX &&
        canvs_x <= topLeftX + cellSize / 3 &&
        canvs_y >= topLeftY + (cellSize * 2) / 3 &&
        canvs_y <= topLeftY + cellSize &&
        !blockList[blockNum][6] &&
        !superBlockList[blockNum] &&
        (blockNum == temp ||
          superBlockList[temp] != undefined ||
          temp == 99 ||
          checkAllCells(temp)) &&
        !gameEnd;
      let block32 =
        canvs_x >= topLeftX + cellSize / 3 &&
        canvs_x <= topLeftX + (cellSize * 2) / 3 &&
        canvs_y >= topLeftY + (cellSize * 2) / 3 &&
        canvs_y <= topLeftY + cellSize &&
        !blockList[blockNum][7] &&
        !superBlockList[blockNum] &&
        (blockNum == temp ||
          superBlockList[temp] != undefined ||
          temp == 99 ||
          checkAllCells(temp)) &&
        !gameEnd;
      let block33 =
        canvs_x >= topLeftX + (cellSize * 2) / 3 &&
        canvs_x <= topLeftX + cellSize &&
        canvs_y >= topLeftY + (cellSize * 2) / 3 &&
        canvs_y <= topLeftY + cellSize &&
        !blockList[blockNum][8] &&
        !superBlockList[blockNum] &&
        (blockNum == temp ||
          superBlockList[temp] != undefined ||
          temp == 99 ||
          checkAllCells(temp)) &&
        !gameEnd;

      if (block11) {
        if (turn === 1) {
          drawX(topLeftX, topLeftY);
          blockList[blockNum][0] = 1;
        } else {
          drawO(topLeftX, topLeftY);
          blockList[blockNum][0] = 2;
        }
        temp = 0;
        legalMove = 1;
      } else if (block12) {
        if (turn === 1) {
          drawX(topLeftX + cellSize / 3, topLeftY);
          blockList[blockNum][1] = 1;
        } else {
          drawO(topLeftX + cellSize / 3, topLeftY);
          blockList[blockNum][1] = 2;
        }
        temp = 1;
        legalMove = 1;
      } else if (block13) {
        if (turn === 1) {
          drawX(topLeftX + (cellSize * 2) / 3, topLeftY);
          blockList[blockNum][2] = 1;
        } else {
          drawO(topLeftX + (cellSize * 2) / 3, topLeftY);
          blockList[blockNum][2] = 2;
        }
        temp = 2;
        legalMove = 1;
      } else if (block21) {
        if (turn === 1) {
          drawX(topLeftX, topLeftY + cellSize / 3);
          blockList[blockNum][3] = 1;
        } else {
          drawO(topLeftX, topLeftY + cellSize / 3);
          blockList[blockNum][3] = 2;
        }
        temp = 3;
        legalMove = 1;
      } else if (block22) {
        if (turn === 1) {
          drawX(topLeftX + cellSize / 3, topLeftY + cellSize / 3);
          blockList[blockNum][4] = 1;
        } else {
          drawO(topLeftX + cellSize / 3, topLeftY + cellSize / 3);
          blockList[blockNum][4] = 2;
        }
        temp = 4;
        legalMove = 1;
      } else if (block23) {
        if (turn === 1) {
          drawX(topLeftX + (cellSize * 2) / 3, topLeftY + cellSize / 3);
          blockList[blockNum][5] = 1;
        } else {
          drawO(topLeftX + (cellSize * 2) / 3, topLeftY + cellSize / 3);
          blockList[blockNum][5] = 2;
        }
        temp = 5;
        legalMove = 1;
      } else if (block31) {
        if (turn === 1) {
          drawX(topLeftX, topLeftY + (cellSize * 2) / 3);
          blockList[blockNum][6] = 1;
        } else {
          drawO(topLeftX, topLeftY + (cellSize * 2) / 3);
          blockList[blockNum][6] = 2;
        }
        temp = 6;
        legalMove = 1;
      } else if (block32) {
        if (turn === 1) {
          drawX(topLeftX + cellSize / 3, topLeftY + (cellSize * 2) / 3);
          blockList[blockNum][7] = 1;
        } else {
          drawO(topLeftX + cellSize / 3, topLeftY + (cellSize * 2) / 3);
          blockList[blockNum][7] = 2;
        }
        temp = 7;
        legalMove = 1;
      } else if (block33) {
        if (turn === 1) {
          drawX(topLeftX + (cellSize * 2) / 3, topLeftY + (cellSize * 2) / 3);
          blockList[blockNum][8] = 1;
        } else {
          drawO(topLeftX + (cellSize * 2) / 3, topLeftY + (cellSize * 2) / 3);
          blockList[blockNum][8] = 2;
        }
        temp = 8;
        legalMove = 1;
      }
      if (
        ((temp == blockNum &&
          superBlockList[temp] == undefined &&
          !checkAllCells(temp)) ||
          (superBlockList[temp] != undefined &&
            superBlockList[blockNum] == undefined &&
            !checkAllCells(blockNum)) ||
          (checkAllCells(temp) &&
            temp != blockNum &&
            superBlockList[blockNum] == undefined)) &&
        !gameEnd
      ) {
        squareFrame("black", cellSize, topLeftX, topLeftY);
        cellBoardPop("black", cellSize, topLeftX, topLeftY);
      } else {
        squareFrame("white", cellSize, topLeftX, topLeftY);
        cellBoardPop("blue", cellSize, topLeftX, topLeftY);
      }
      gameLogic(blockNum, topLeftX, topLeftY, drawBigX, drawBigO, drawLine);
      playerTurnFunction(turn);
      whoWonCondition2();
    }
    blockList = [
      block11List, // 0
      block12List, // 1
      block13List, // 2
      block21List, // 3
      block22List, // 4
      block23List, // 5
      block31List, // 6
      block32List, // 7
      block33List, // 8
    ];
    return 0;
  }

  function gameLogic(
    blockNum,
    topLeftX,
    topLeftY,
    drawBigX,
    drawBigO,
    drawLine
  ) {
    let condition1 =
      blockList[blockNum][0] === blockList[blockNum][1] &&
      blockList[blockNum][0] === blockList[blockNum][2] &&
      blockList[blockNum][0] !== undefined;
    let condition2 =
      blockList[blockNum][3] === blockList[blockNum][4] &&
      blockList[blockNum][3] === blockList[blockNum][5] &&
      blockList[blockNum][3] !== undefined;
    let condition3 =
      blockList[blockNum][6] === blockList[blockNum][7] &&
      blockList[blockNum][6] === blockList[blockNum][8] &&
      blockList[blockNum][6] !== undefined;
    let condition4 =
      blockList[blockNum][0] === blockList[blockNum][3] &&
      blockList[blockNum][0] === blockList[blockNum][6] &&
      blockList[blockNum][0] !== undefined;
    let condition5 =
      blockList[blockNum][1] === blockList[blockNum][4] &&
      blockList[blockNum][1] === blockList[blockNum][7] &&
      blockList[blockNum][1] !== undefined;
    let condition6 =
      blockList[blockNum][2] === blockList[blockNum][5] &&
      blockList[blockNum][2] === blockList[blockNum][8] &&
      blockList[blockNum][2] !== undefined;
    let condition7 =
      blockList[blockNum][0] === blockList[blockNum][4] &&
      blockList[blockNum][0] === blockList[blockNum][8] &&
      blockList[blockNum][0] !== undefined;
    let condition8 =
      blockList[blockNum][2] === blockList[blockNum][4] &&
      blockList[blockNum][2] === blockList[blockNum][6] &&
      blockList[blockNum][2] !== undefined;
    if (condition1) {
      if (blockList[blockNum][0] == 1) {
        drawBigX(topLeftX, topLeftY);
        superBlockList[blockNum] = 1;
      } else if (blockList[blockNum][0] == 2) {
        drawBigO(topLeftX, topLeftY);
        superBlockList[blockNum] = 2;
      }
      wonSmallBoardList[blockNum]++;
    } else if (condition2) {
      if (blockList[blockNum][3] == 1) {
        drawBigX(topLeftX, topLeftY);
        superBlockList[blockNum] = 1;
      } else if (blockList[blockNum][3] == 2) {
        drawBigO(topLeftX, topLeftY);
        superBlockList[blockNum] = 2;
      }
      wonSmallBoardList[blockNum]++;
    } else if (condition3) {
      if (blockList[blockNum][6] == 1) {
        drawBigX(topLeftX, topLeftY);
        superBlockList[blockNum] = 1;
      } else if (blockList[blockNum][6] == 2) {
        drawBigO(topLeftX, topLeftY);
        superBlockList[blockNum] = 2;
      }
      wonSmallBoardList[blockNum]++;
    } else if (condition4) {
      if (blockList[blockNum][0] == 1) {
        drawBigX(topLeftX, topLeftY);
        superBlockList[blockNum] = 1;
      } else if (blockList[blockNum][0] == 2) {
        drawBigO(topLeftX, topLeftY);
        superBlockList[blockNum] = 2;
      }
      wonSmallBoardList[blockNum]++;
    } else if (condition5) {
      if (blockList[blockNum][1] == 1) {
        drawBigX(topLeftX, topLeftY);
        superBlockList[blockNum] = 1;
      } else if (blockList[blockNum][1] == 2) {
        drawBigO(topLeftX, topLeftY);
        superBlockList[blockNum] = 2;
      }
      wonSmallBoardList[blockNum]++;
    } else if (condition6) {
      if (blockList[blockNum][2] == 1) {
        drawBigX(topLeftX, topLeftY);
        superBlockList[blockNum] = 1;
      } else if (blockList[blockNum][2] == 2) {
        drawBigO(topLeftX, topLeftY);
        superBlockList[blockNum] = 2;
      }
      wonSmallBoardList[blockNum]++;
    } else if (condition7) {
      if (blockList[blockNum][0] == 1) {
        drawBigX(topLeftX, topLeftY);
        superBlockList[blockNum] = 1;
      } else if (blockList[blockNum][0] == 2) {
        drawBigO(topLeftX, topLeftY);
        superBlockList[blockNum] = 2;
      }
      wonSmallBoardList[blockNum]++;
    } else if (condition8) {
      if (blockList[blockNum][2] == 1) {
        drawBigX(topLeftX, topLeftY);
        superBlockList[blockNum] = 1;
      } else if (blockList[blockNum][2] == 2) {
        drawBigO(topLeftX, topLeftY);
        superBlockList[blockNum] = 2;
      }
      wonSmallBoardList[blockNum]++;
    }
    
    let superCondition1 =
      superBlockList[0] === superBlockList[1] &&
      superBlockList[0] === superBlockList[2] &&
      superBlockList[0] !== undefined;
    let superCondition2 =
      superBlockList[3] === superBlockList[4] &&
      superBlockList[3] === superBlockList[5] &&
      superBlockList[3] !== undefined;
    let superCondition3 =
      superBlockList[6] === superBlockList[7] &&
      superBlockList[6] === superBlockList[8] &&
      superBlockList[6] !== undefined;
    let superCondition4 =
      superBlockList[0] === superBlockList[3] &&
      superBlockList[0] === superBlockList[6] &&
      superBlockList[0] !== undefined;
    let superCondition5 =
      superBlockList[1] === superBlockList[4] &&
      superBlockList[1] === superBlockList[7] &&
      superBlockList[1] !== undefined;
    let superCondition6 =
      superBlockList[2] === superBlockList[5] &&
      superBlockList[2] === superBlockList[8] &&
      superBlockList[2] !== undefined;
    let superCondition7 =
      superBlockList[0] === superBlockList[4] &&
      superBlockList[0] === superBlockList[8] &&
      superBlockList[0] !== undefined;
    let superCondition8 =
      superBlockList[2] === superBlockList[4] &&
      superBlockList[2] === superBlockList[6] &&
      superBlockList[2] !== undefined;
    if (superCondition1) {
      drawLine(
        cd * 0.06,
        cd / 6,
        cd - cd * 0.06,
        cd / 6,
        cd * 0.06,
        "grey",
        "round"
      );
      whoWonCondition1(0);
    } else if (superCondition2) {
      drawLine(
        cd * 0.06,
        cd / 2,
        cd - cd * 0.06,
        cd / 2,
        cd * 0.06,
        "grey",
        "round"
      );
      whoWonCondition1(3);
    } else if (superCondition3) {
      drawLine(
        cd * 0.06,
        (cd * 5) / 6,
        cd - cd * 0.06,
        (cd * 5) / 6,
        cd * 0.06,
        "grey",
        "round"
      );
      whoWonCondition1(6);
    } else if (superCondition4) {
      drawLine(
        cd / 6,
        cd * 0.06,
        cd / 6,
        cd - cd * 0.06,
        cd * 0.06,
        "grey",
        "round"
      );
      whoWonCondition1(0);
    } else if (superCondition5) {
      drawLine(
        cd / 2,
        cd * 0.06,
        cd / 2,
        cd - cd * 0.06,
        cd * 0.06,
        "grey",
        "round"
      );
      whoWonCondition1(1);
    } else if (superCondition6) {
      drawLine(
        (cd * 5) / 6,
        cd * 0.06,
        (cd * 5) / 6,
        cd - cd * 0.06,
        cd * 0.06,
        "grey",
        "round"
      );
      whoWonCondition1(2);
    } else if (superCondition7) {
      drawLine(
        cd * 0.06,
        cd * 0.06,
        cd - cd * 0.06,
        cd - cd * 0.06,
        cd * 0.06,
        "grey",
        "round"
      );
      whoWonCondition1(0);
    } else if (superCondition8) {
      drawLine(
        cd - cd * 0.06,
        cd * 0.06,
        cd * 0.06,
        cd - cd * 0.06,
        cd * 0.06,
        "grey",
        "round"
      );
      whoWonCondition1(2);
    }
    playerTurnFunction();
    wonSmallBoardSound();
  }
  function squareFrame(color, cellSize, topLeftX, topLeftY) {
    ctx.beginPath();
    ctx.moveTo(topLeftX + cellSize * 0.025, topLeftY + cellSize * 0.025);
    ctx.lineTo(
      topLeftX + cellSize - cellSize * 0.025,
      topLeftY + cellSize * 0.025
    );
    ctx.lineTo(
      topLeftX + cellSize - cellSize * 0.025,
      topLeftY + cellSize - cellSize * 0.025
    );
    ctx.lineTo(
      topLeftX + cellSize * 0.025,
      topLeftY + cellSize - cellSize * 0.025
    );
    ctx.lineTo(topLeftX + cellSize * 0.025, topLeftY + cellSize * 0.025);
    ctx.lineWidth = cellSize * 0.01;
    ctx.strokeStyle = color;
    ctx.stroke();
  }
  function cellBoardPop(color, cellSize, topLeftX, topLeftY) {
      for (let i = 1; i <= 2; i++) {
        drawLine(
          topLeftX + (cellSize / 3) * i,
          topLeftY + cellSize * 0.06,
          topLeftX + (cellSize / 3) * i,
          topLeftY + cellSize - cellSize * 0.06,
          cellSize * 0.036,
          color,
          "round"
        );

        drawLine(
          topLeftX + cellSize * 0.06,
          topLeftY + (cellSize / 3) * i,
          topLeftX + cellSize - cellSize * 0.06,
          topLeftY + (cellSize / 3) * i,
          cellSize * 0.036,
          color,
          "round"
        );
      }
    }
  function playerTurnFunction(turn) {
    if (turn == 1 && !gameEnd) {
      playerTurn.innerHTML = "Turn : X";
    } else if (turn == 0 && !gameEnd) {
      playerTurn.innerHTML = "Turn : O";
    }
  }
  function whoWonCondition1(x) {
    if (superBlockList[x] == 1) playerTurn.innerHTML = "Winner : Player X";
    else if (superBlockList[x] == 2) playerTurn.innerHTML = "Winner : Player O";
    gameEnd = true;
  }
  function whoWonCondition2() {
    let totalBigX = 0,
      totalBigO = 0,
      j,
      totalFilledBlocks = 0;
    for (let i = 0; i < 9; i++) {
      if (superBlockList[i] == 1) totalBigX++;
      else if (superBlockList[i] == 2) totalBigO++;
      for (j = 0; j < 9; j++) {
        if (blockList[i][j] == undefined) break;
      }
      if (j == 9 || superBlockList[i] != undefined) totalFilledBlocks++;
    }
    if ((totalBigX == 5 || (totalBigX > totalBigO && totalFilledBlocks == 9)) && !gameEnd){
      playerTurn.innerHTML = "Winner : Player X";
      gameEnd = true;
    } else if ((
      totalBigO == 5 ||
      (totalBigO > totalBigX && totalFilledBlocks == 9)) && !gameEnd
    ) {
      playerTurn.innerHTML = "Winner : Player O";
      gameEnd = true;
    } else if (totalBigX == totalBigO && totalFilledBlocks == 9 && !gameEnd) {
      playerTurn.innerHTML = "Game Draw";
      gameEnd = true;
    }
  }
  function checkAllCells(temp) {
    let i;
    for (i = 0; i < 9; i++) {
      if (blockList[temp][i] == undefined) break;
    }
    if (i == 9) return true; //defined
    else return false;
  }
  function moveSound() {
      if (!gameEnd) {
        var move = new Audio(
          "sounds/move.mp3"
        );
        move.play();
      }
    }
  function illegalMoveSound() {
      if (
        legalMove == 0 &&
        !gameEnd
        // (blockList[blockNum][k] || superBlockList[blockNum])
      ) {
        var illegalMove = new Audio("sounds/illegal-move.mp3");
        illegalMove.play();
      } else if (legalMove == 1) {
        moveSound();
      }
      legalMove = 0;
    }
    function wonSmallBoardSound() {
      for (let li = 0; li < 9; li++) {
        if (
          (superBlockList[li] == 1 || superBlockList[li] == 2) &&
          wonSmallBoardList[li] == 1 &&
          !gameEnd
        ) {
          var wonSmallBoard = new Audio(
            "sounds/capture (online-audio-converter.com).mp3"
          );
          wonSmallBoard.play();
        }
      }
      if (gameEnd && legalMove == 1) {
        var gameEndSound = new Audio(
          "sounds/game-end.mp3"
        );
        gameEndSound.play();
      }
    }
})();

import './index.css';

import $ from 'jquery';

let directionInGrid = (n, m) => {

  const UP = '↑';
  const DOWN = '↓';
  const LEFT = '←';
  const RIGHT = '→';

  const MAXN = n;
  const MAXM = m;

  let oldDirection = UP;
  let finalDirection = RIGHT;
  let newDirection = RIGHT;
  let array = [];
  let nowX = 0;
  let nowY = 0;

  let time = 100;

  let creatTable = (n, m) => {
    $('div').html($('<table class="table"><tbody>'));
    for (let i = 0; i < n; i++) {
      let tr = $('<tr>');
      for (let i = 0; i < m; i++) {
        tr.append($('<td><div>'));
      }
      $('tbody').append(tr);
    }
  }

  // 创建二维数组
  let creatDoubleArr = (n, m) => {

    let array = [];
    for (let i = 0; i < n; i++) {
      array[i] = [];
      for (let j = 0; j < m; j++) {
        array[i].push('');
      }
    }
    return array;

  }

  let getFinalDirection = (direction) => {

    let i;

    switch (direction) {
      case UP:
        i = nowX;
        for (; i >= 0; i--) {
          if (array[i][nowY] === '') {
            array[i][nowY] = UP;
            $('tr:eq(' + i + ') td:eq(' + nowY + ') div').attr('data-time', time).html(UP);
            time += 50;
          } else break;
        }
        nowX = ++i;
        nowY++;
        oldDirection = finalDirection = UP;
        break;
      case RIGHT:
        i = nowY;
        for (; i < array[nowX].length; i++) {
          if (array[nowX][i] === '') {
            array[nowX][i] = RIGHT;
            $('tr:eq(' + nowX + ') td:eq(' + i + ') div').attr('data-time', time).html(RIGHT);
            time += 50;
          } else break;
        }
        nowY = --i;
        nowX++;
        oldDirection = finalDirection = RIGHT;
        break;
      case DOWN:
        i = nowX;
        for (; i < array.length; i++) {
          if (array[i][nowY] === '') {
            array[i][nowY] = DOWN;
            $('tr:eq(' + i + ') td:eq(' + nowY + ') div').attr('data-time', time).html(DOWN);
            time += 50;
          } else break;
        }
        nowX = --i;
        nowY--;
        oldDirection = finalDirection = DOWN;
        break;
      case LEFT:
        i = nowY;
        for (; i >= 0; i--) {
          if (array[nowX][i] === '') {
            array[nowX][i] = LEFT;
            $('tr:eq(' + nowX + ') td:eq(' + i + ') div').attr('data-time', time).html(LEFT);
            time += 50;
          } else break;
        }
        nowY = ++i;
        nowX--;
        oldDirection = finalDirection = LEFT;
        break;
      default:
        break;
    }

  }

  array = creatDoubleArr(MAXN, MAXM);

  creatTable(MAXN, MAXM);

  // 数组赋值
  while (nowX < MAXN && nowX >= 0 && nowY < MAXM && nowY >= 0 && !array[nowX][nowY]) {

    switch (oldDirection) {
      case UP:
        newDirection = RIGHT;
        break;
      case RIGHT:
        newDirection = DOWN;
        break;
      case DOWN:
        newDirection = LEFT;
        break;
      case LEFT:
        newDirection = UP;
        break;
      default:
        break;
    }
    getFinalDirection(newDirection);

  }

  for (let i = 0; i < MAXN * MAXM; i++) {

    let time = parseInt($('td').eq(i).find('div').attr('data-time'));
    let div = $('td').eq(i).find('div');
    setTimeout(function() {
      div.fadeIn(300);
    }, time);

  }

  return finalDirection === UP ? 'U' : finalDirection === DOWN ? 'D' : finalDirection === LEFT ? 'L' : 'R';

}

directionInGrid(10, 5);
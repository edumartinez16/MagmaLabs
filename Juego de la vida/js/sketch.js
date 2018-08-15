let columnas = 50, filas = 50, tablero, nuevaMatriz

function crearMatriz(col, fil) {
  let matriz = new Array(col);
  for(let x = 0; x < matriz.length; x++)
    matriz[x] = new Array(fil)
  return matriz
}

function llenarMatriz() {
  let matriz = crearMatriz(columnas, filas)
  for(let x = 0; x < columnas; x++)
    for(let y = 0; y < filas; y++)
      matriz[x][y] = floor(random(2))
  return matriz
}

function validar(posX, posY) {
  fill(255);
  stroke('rgb(100%,0%,10%)');
  rect((posX * columnas), (posY * filas), (columnas - 1), (filas - 1));
}

function cuadricula(){
  let x, y
  for(x = 0; x < columnas; x++)
    for(y = 0; y < filas; y++)
      if(tablero[x][y] === 1)
        validar(x,y)
}
function vecinos(matriz, x, y) {
  let suma = 0
  for (let a = -1; a < 2; a++) {
    for (let b = -1; b < 2; b++) {
      let col = (x + a + columnas) % columnas
      let fil = (y + b + filas) % filas
      suma += matriz[col][fil]
    }
  }
  suma -= matriz[x][y]
  return suma
}

function setup() {
  createCanvas(500,500)
  tablero = llenarMatriz()
}
function draw() {
  background('green')
  cuadricula()
  nuevaMatriz = llenarMatriz()

  for (let i = 0; i < columnas; i++) {
    for (let j = 0; j < filas; j++) {
      let actual = tablero[i][j]
      let vecino = vecinos(tablero, i, j)
      if (actual == 0 && vecino == 3) {
        nuevaMatriz[i][j] = 1
      } else if (actual == 1 && (vecino < 2 || vecino > 3)) {
        nuevaMatriz[i][j] = 0
      } else {
        nuevaMatriz[i][j] = actual
      }
    }
  }
  tablero = nuevaMatriz
}


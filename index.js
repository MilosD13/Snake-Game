const grid = document.querySelector(".grid");
const start_button = document.querySelector("#start");
let player_score = document.getElementById("score");

const width = 10
let squares = []
let appleindex = 0
let current_snake = [2, 1, 0]
let direction = 1
let delay = 1000    //is ms
let speed = 0.9
let score = 0
let timer_id = 0



function create_grid() {
    //create 100 of these elements with a for loop
    for (let i = 0; i < (width * width); i++) {
        //create element
        const square = document.createElement("div")
        //add styling to the element
        square.classList.add("square")
        //put the element into our grid
        grid.appendChild(square)
        //push it into a new squares array
        squares.push(square)
    }
}

create_grid()

current_snake.forEach(index => squares[index].classList.add("snake"))

function move() {

    if (
        (current_snake[0] + width >= 100 && direction === width) ||
        (current_snake[0] % width === width - 1 && direction === 1) ||
        (current_snake[0] % width === 0 && direction === -1) ||
        (current_snake[0] - width < 0 && direction === -width) ||
        squares[current_snake[0] + direction].classList.contains('snake')
    )
        return clearInterval(timer_id)

    //remove last element from our current_snake array
    const tail = current_snake.pop()
    //remove styling from last element
    squares[tail].classList.remove("snake")
    //add square in direction we are heading
    current_snake.unshift(current_snake[0] + direction)

    //this deals with snake eating the apple
    if (squares[current_snake[0]].classList.contains("apple")) {
        //remove the class of apple
        squares[current_snake[0]].classList.remove("apple")
        //grow our snake by adding class of snake to it
        squares[tail].classList.add("snake")
        //grow our snake array
        current_snake.push(tail)
        //generate new apple
        generate_apples()
        //add one to the score
        score++
        player_score.innerText = score
        //speed up our snake
        clearInterval(timer_id)
        delay = delay * speed
        timer_id = setInterval(move, delay)
    }


    //add styling so we can see it
    squares[current_snake[0]].classList.add("snake")
}

timer_id = setInterval(move, delay)

function generate_apples() {
    do {
        appleindex = Math.floor(Math.random() * squares.length)
    } while (squares[appleindex].classList.contains("snake"))
    squares[appleindex].classList.add("apple")
}
generate_apples()

// 39 is right arrow
// 38 is for the up arrow
// 37 is for the left arrow
// 40 is for the down arrow
function control(e) {
    if (e.keyCode === 39) {
        console.log("right pressed")
        direction = 1
    } else if (e.keyCode === 38) {
        console.log("up pressed")
        direction = - width
    } else if (e.keyCode === 37) {
        console.log("left pressed")
        direction = - 1
    } else if (e.keyCode === 40) {
        console.log("down pressed")
        direction = + width
    }
}

//function that starts a game
function start_game() {
    current_snake.forEach(index => squares[index].classList.remove("snake"))
    squares[appleindex].classList.remove("apple")
    clearInterval(timer_id)
    current_snake = [2, 1, 0]
    score = 0
    player_score.textContent = score
    direction = 1
    delay = 1000
    generate_apples()
    current_snake.forEach(index => squares[index].classList.add("snake"))
    timer_id = setInterval(move, delay)
}

document.addEventListener("keydown", control)

start_button.addEventListener("click", start_game)
let divblock, blockData, blockFrontImages, memoryBlockArr, blocksArray, blockFrontImagesAll, shuffledBlocks;
// Triển khai logic Lật thẻ n

let currentlyFlippedArr, matchedCount, blockToMatch1, blockToMatch2;
// Triển khai thông tin trò chơi

let flipCounter, gameOn = false;
// let musics;

let overlays = Array.from(document.getElementsByClassName('overlay-text'));
overlays.forEach(overlay => {
    // gọi từng phần tử trong mảng
    overlay.addEventListener('click', () => {
        //đính kèm xử lý
        overlay.classList.remove('visible');// trả về mã thông báo
        resetGame();
        init();

    });
});

function resetGame() {
    let elements = document.getElementsByClassName("block");
    //Trả về tập các phần tử thẻ bài
    while (elements.length > 0) {
        // khi số thẻ bài lớn hơn 0
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function init() {
    //Khởi tạo giá trị
    gameOn = true;
    // musics = new Audio("")
    memoryBlockArr = new Array(18);//Tạo mảng thẻ
    blocksArray = [];
    //mảng khối
    blockFrontImagesAll = [];
    //mảng khối hình mặt trc
    shuffledBlocks = [];
    //xáo trộn khối
    currentlyFlippedArr = [];
    // mảng hiện tại
    matchedCount = 0;
    // khối giống nhau
    flipCounter = 0;
    let minutes = 3;
    let display = document.getElementById("Timer");
    blockFrontImages = ["Image/Aatrox.jpg",
        "Image/KogMaw.jpg",
        "Image/LeeSin.jpg",
        "Image/Malphite.jpg",
        "Image/Nidalee.jpg",
        "Image/Talon.jpg",
        "Image/Teemo.jpg",
        "Image/Tristana.jpg",
        "Image/Vayne.jpg"];
    startTimer(minutes, display);
    blockFrontImagesAll = blockFrontImages.concat(blockFrontImages);
    shuffledBlocks = shuffleBlocks(blockFrontImagesAll); //xáo trộn khối
    document.getElementById("Flips").innerText = `Flips: ${flipCounter}`;
    // tạo hộp lật
    createElements();
}

function createElements() {
    let finalCount = shuffledBlocks.length;
    for (let i = 0; i < finalCount; i++) {
        //xáo trộn các thẻ front
        let cardFront = shuffledBlocks.pop();
        blockData = new MemoryBlock(i, cardFront, "Image/BackGround.jpg");
        //1 khối bao gồm phần tử thứ i , mặt trc và mặt sau
        memoryBlockArr[i] = blockData;

        divblock = document.createElement("div");
        let divblockFront = document.createElement("div");
        let divblockBack = document.createElement("div");
        let imgFront = document.createElement("img");
        let imgBack = document.createElement("img");
        //document.createElement : tạo nút cho div và img
        divblock.id = memoryBlockArr[i].id;
        divblock.className = memoryBlockArr[i].blockCSS;
        divblockFront.className = memoryBlockArr[i].frontCSS;
        divblockBack.className = memoryBlockArr[i].backCSS;
        imgFront.src = memoryBlockArr[i].frontImage;
        imgFront.className = memoryBlockArr[i].imgCSS;
        imgBack.src = memoryBlockArr[i].backImage;
        imgBack.className = memoryBlockArr[i].imgCSS;
        divblockFront.append(imgFront);
        //thêm imgfront vào thẻ div blockfront
        divblockBack.append(imgBack);
        //thêm imgback vào thẻ div blockback
        divblock.append(divblockFront);
        //gắn mặt tướng vào block
        divblock.append(divblockBack);
        //gán mặt lol vào block
        divblock.addEventListener('click', flipBlock);
        document.getElementById("gameMainBlock").append(divblock);
        // đưa ra màn hình thẻ div đc gán hình vào.
    }
}

function hideElements() {
    let hideBlocks = Array.from(document.getElementsByClassName('block'));
    for (let i = 0; i < hideBlocks.length; i++) {
        document.getElementById(hideBlocks[i].id).classList.remove('visible');
    }
}

function shuffleBlocks(blocksArray) {
    let currentIndex = blocksArray.length, temporaryValue, randomIndex;
    // Yếu tố xáo thẻ bài
    while (currentIndex !== 0) {
        // Chọn phần tử còn lại trong mảng thẻ
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // Trao đổi với phần tử hiện tại
        temporaryValue = blocksArray[currentIndex];
        blocksArray[currentIndex] = blocksArray[randomIndex];
        blocksArray[randomIndex] = temporaryValue;
    }
    return blocksArray;
}

function flipBlock() {
    if (gameOn === true) {
        this.classList.add('visible');
        flipCounter += 1;
        document.getElementById("Flips").innerText = `Flips: ${flipCounter}`;


        if (blockToMatch1 !== this.id) {
            if (currentlyFlippedArr.length === 0) {
                currentlyFlippedArr.push(this.innerHTML);
                blockToMatch1 = this.id;
            } else if (currentlyFlippedArr.length === 1) {
                currentlyFlippedArr.push(this.innerHTML);
                blockToMatch2 = this.id;
                if (currentlyFlippedArr[0] === currentlyFlippedArr[1]) {
                    blocksMatched();
                } else {
                    gameOn = false;
                    let wait = ms => new Promise(resolve => setTimeout(resolve, ms));
                    Promise.resolve(800).then(() => wait(800)).then(() => {
                        revertFlip();
                    });
                }
            }
        }
    }
}

function blocksMatched() {
    setTimeout(function (){
        document.getElementById(blockToMatch1).style.display='none';
        document.getElementById(blockToMatch2).style.display='none';
    },500);

    currentlyFlippedArr = [];
    matchedCount += 2;
    document.getElementById(blockToMatch1).removeEventListener('click', flipBlock);
    document.getElementById(blockToMatch2).removeEventListener('click', flipBlock);

    if (matchedCount === memoryBlockArr.length) {
            showWin();
    }
}

function revertFlip() {
    document.getElementById(blockToMatch1).classList.remove('visible');
    document.getElementById(blockToMatch2).classList.remove('visible');
    currentlyFlippedArr = [];
    gameOn = true;
}

function showWin() {
    hideElements();
    gameOn = false;
    document.getElementById('winText').classList.add('visible');
    clearInterval(countdown);
    // dừng time
}

function gameOver() {
    hideElements();
    gameOn = false;
    document.getElementById('gameOverText').classList.add('visible');
    clearInterval(countdown);
}
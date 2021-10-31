let  countdown;

 class MemoryBlock {
         constructor(id, frontImage, backImage) {
                 this.id = id;
                 this.blockCSS = "block";
                 this.frontImage = frontImage;
                 this.backImage = backImage;
                 // this.front = false;
                 // this.back = true;
                 this.frontCSS = "block-front block-face";
                 this.backCSS = "block-back block-face";
                 this.imgCSS = "block-value";
             }
     }

 function startTimer(duration, display) {
         let timer = 60 * duration, minutes, seconds;
         countdown = setInterval(() => {
                 // minutes = parseInt(timer / 60, 10);
                 minutes = parseInt(timer/60, 10);
                 seconds = parseInt(timer % 60, 10);
                 minutes = minutes < 10 ? "0" + minutes : minutes;
                 seconds = seconds < 10 ? "0" + seconds : seconds;
                 display.textContent = `Time ${ minutes }:${ seconds }`;
                 if (--timer < 0) {
                         gameOver();
                     }
             }, 1000);
     }
//duration : khoảng thời gian
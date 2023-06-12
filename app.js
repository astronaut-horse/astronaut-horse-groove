// grab container div and style
const container = document.querySelector("#container");
container.style = `
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        height: 100vh;
        overflow: hidden;
    `;
// border: 1px solid red;

   
const moveCloserToZero = (currPos, speed) => {
    if (currPos > 0) {
        return currPos - speed;
    } else {
        return currPos + speed;
    }
}

let count = 0;
const maxCount = 150;

const createNewGifEntity = (filename) => {
    if (count > maxCount) return;
    count ++;

    // declare dimension variables
    let containerHeight = container.offsetHeight;
    let containerWidth = container.offsetWidth;
    
    // create text element
    // const textDiv1 = document.createElement("div");
    // textDiv1.innerHTML = `height:${containerHeight}px / width:${containerWidth}px`;
    // textDiv1.style = "position: fixed; left: 0; bottom: 0;";
    
    // add textDiv to container
    // container.appendChild(textDiv1);
    
    // update dimensions if window changes
    window.addEventListener("resize", () => {
        containerHeight = container.offsetHeight;
        containerWidth = container.offsetWidth;
        textDiv1.innerHTML = `height:${containerHeight}px / width:${containerWidth}px`;
    });
    
    // create test gif element
    let gif1 = document.createElement("img");
    // gif1.id = `img-${count}`;
    gif1.src = `images/${filename}`;
    gif1.style.marginLeft = `${Math.random() > .5 ? "-" : ""}${Math.random() * containerWidth}px`;
    gif1.style.marginTop = `${Math.random() > .5 ? "-" : ""}${Math.random() * containerHeight}px`;
    gif1.style.transition = "1s linear";
    gif1.style.opacity = "0";
    gif1.style.boxShadow = "20px 20px 0px rgb(0,0,0,0.4)";
    gif1.style.width = `${Math.floor((Math.random() * (containerWidth / 5)) + (containerWidth / 5))}px`;
    container.appendChild(gif1);

    // gif1 = document.querySelector(`#img-${count}`);
    // console.log(gif1.id)

    let fadeIn = true;

    
    const gif1Interval = setInterval(() => {
        const xMovement = Math.floor(Math.random() * 50);
        const yMovement = Math.floor(Math.random() * 20);
        const sizeChange = Math.floor(Math.random() * 20);
        const maxOpacity = (Math.random() * 2) + 0.2; // range from 0.2 to 2 to control how long image stays at full opacity
        const currentXPos = Number(gif1.style.marginLeft.slice(0,-2));
        const currentYPos = Number(gif1.style.marginTop.slice(0,-2));
        const currWidth = Number(gif1.style.width.slice(0,-2));
    
        if (!fadeIn && Number(gif1.style.opacity) <= 0) {
            clearInterval(gif1Interval);
            count--;
            container.removeChild(gif1);
        }
        
        if (Number(gif1.style.opacity) > maxOpacity) fadeIn = false;
    
        if (fadeIn) gif1.style.opacity = Number(gif1.style.opacity) + 0.2;
        else gif1.style.opacity = Number(gif1.style.opacity) - 0.2;
    
        const newXPos = moveCloserToZero(currentXPos, xMovement);
        const newYPos = moveCloserToZero(currentYPos, yMovement);
        const newWidth = moveCloserToZero(currWidth, sizeChange);
        gif1.style.marginLeft = `${newXPos}px`
        gif1.style.marginTop = `${newYPos}px`
        gif1.style.width = `${newWidth}px`
    }, 1000)
}

setInterval(() => {
    createNewGifEntity(filenames[Math.floor(Math.random() * filenames.length)]);
    console.log(count);
}, 500)
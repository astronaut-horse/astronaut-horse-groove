// grab container div and style
const container = document.querySelector("#container");
container.style = `
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid red;
    box-sizing: border-box;
    height: 100vh;
`;

// declare dimension variables
let containerHeight = container.offsetHeight;
let containerWidth = container.offsetWidth;

// create text element
const textDiv1 = document.createElement("div");
textDiv1.innerHTML = `height:${containerHeight}px / width:${containerWidth}px`;
textDiv1.style = "position: fixed; left: 0; bottom: 0;";

// add textDiv to container
container.appendChild(textDiv1);

// update dimensions if window changes
window.addEventListener("resize", () => {
    containerHeight = container.offsetHeight;
    containerWidth = container.offsetWidth;
    textDiv1.innerHTML = `height:${containerHeight}px / width:${containerWidth}px`;
});

// create test gif element
const gif1 = document.createElement("img");
gif1.src = "https://media.discordapp.net/attachments/1093540488516214845/1113714055656513536/IMG_5654.gif?width=476&height=476";
gif1.style.marginLeft = `${Math.random() > .5 ? "-" : ""}${Math.random() * containerWidth}px`;
gif1.style.marginTop = `${Math.random() > .5 ? "-" : ""}${Math.random() * containerHeight}px`;
gif1.style.transition = "1s linear";
gif1.style.opacity = "0";
gif1.style.width = `${Math.floor((Math.random() * (containerWidth / 5)) + (containerWidth / 5))}px`;
container.appendChild(gif1);
let fadeIn = true;


const moveCloserToZero = (currPos, speed) => {
    if (currPos > 0) {
        return currPos - speed;
    } else {
        return currPos + speed;
    }
}


const gif1Interval = setInterval(() => {
    const xMovement = Math.floor(Math.random() * 50);
    const yMovement = Math.floor(Math.random() * 20);
    const sizeChange = Math.floor(Math.random() * 20);
    const maxOpacity = (Math.random() * 2) + 0.2; // range from 0.2 to 2 to control how long image stays at full opacity
    const currentXPos = Number(gif1.style.marginLeft.slice(0,-2));
    const currentYPos = Number(gif1.style.marginTop.slice(0,-2));
    
    // if (currentXPos > 0) {
    //     clearInterval(gif1Interval);
    //     container.removeChild(gif1);
    // }
    if (!fadeIn && Number(gif1.style.opacity) <= 0) {
        clearInterval(gif1Interval);
        container.removeChild(gif1);
    }
    
    if (Number(gif1.style.opacity) > maxOpacity) fadeIn = false;

    if (fadeIn) {
        gif1.style.opacity = Number(gif1.style.opacity) + 0.2;
    } else {
        gif1.style.opacity = Number(gif1.style.opacity) - 0.2;
    }

    const newXPos = moveCloserToZero(currentXPos, xMovement);
    gif1.style.marginLeft = `${newXPos}px`
    
    // const newYPos = currentYPos + yMovement;
    const newYPos = moveCloserToZero(currentYPos, yMovement);
    gif1.style.marginTop = `${newYPos}px`
}, 1000)
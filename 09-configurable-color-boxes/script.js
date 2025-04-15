const boxConfig = [
    {color: "red", width: "33.33%"},
    {color: "green", width: "33.33%"},
    {color: "blue", width: "33.33%"},
    {color: "yellow", width: "50%"},
    {color: "orange", width: "50%"},
    {color: "purple", width: "70%"},
    {color: "pink", width: "30%"},
];

document.addEventListener("DOMContentLoaded", function() {
    const colorInput = document.getElementById("colorInput");
    const widthInput = document.getElementById("widthInput");
    const submitButton = document.querySelector(".submit");

    const container = document.createElement("div");
    container.className = "container";

    submitButton.addEventListener("click", function (event) {
        event.preventDefault();
        const color = colorInput.value.trim();
        if(color === "") alert("empty color is not valid");
        if(widthInput.value < 0 || widthInput.value > 100) alert("width should be in range of 0 to 100");
        if(color.length === 4 || color.length === 7) {
            boxConfig.push({color, width: `${widthInput.value}%`});
        }
        container.innerHTML = "";
        console.log(boxConfig);
        renderBoxes();
    });
    function renderBoxes(){
        boxConfig.forEach((config, index) => {
            const box = document.createElement("div");
            box.className = "box";
            box.style.backgroundColor = config.color;
            box.style.width = config.width;

            container.appendChild(box);
        })

        container.addEventListener("click", (event) => {
            const clickedELement = event.target;

            if(clickedELement.classList.contains("box")) {
                const index = Array.from(container.children).indexOf(clickedELement);
                const config = boxConfig[index];
                alert(`Color of box ${index+1} is ${config.color}`);
            }
        })

        document.body.appendChild(container);
    }

    renderBoxes();
})

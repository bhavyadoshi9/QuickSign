
const colorPicker = document.getElementById("ColorPicker")
const canvasColor = document.getElementById("CanvasColor")
const canvas = document.getElementById("MyCanvas")
const clearButton = document.getElementById("ClearButton")
const saveButton = document.getElementById("SaveButton")
const fontPicker = document.getElementById("FontSize")
const retrieveButton = document.getElementById("RetrieveButton")

const ctx = canvas.getContext("2d")

//event to take colorpicker color and fill it
colorPicker.addEventListener('change', (e) => {
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
})

//saving mouse last down position (x,y) in variable
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    lastX = event.offsetX;
    lastY = event.offsetY;
})

//events when mouse in moving
canvas.addEventListener('mousemove', (e) => {
    if(isDrawing){
        ctx.beginPath(); //start drawing
        ctx.moveTo(lastX,lastY); //moving to the mouse last stoped location
        ctx.lineTo(event.offsetX, event.offsetY); //drawing the line to that location
        ctx.stroke(); //final draw started

        lastX = event.offsetX; //updating x & y position to draw line continuesly
        lastY = event.offsetY;
    }
})

//stop drawing on mouse up
canvas.addEventListener('mouseup', (e) => {
    isDrawing = false;
})

//adding back ground color in canvas
canvasColor.addEventListener('change', (e) => {
    ctx.fillStyle = e.target.value; //choose color to fill
    ctx.fillRect(0,0,800,500) // fill the rectangle 
})

//applying font size to the line we are drawing
fontPicker.addEventListener('change', (e) => {
    ctx.lineWidth = e.target.value //change the line width of the value
})

//clear content of canvas by clicking clear button
clearButton.addEventListener('click', ()=>{
    ctx.clearRect(0,0,canvas.width, canvas.height)
})

//store canvas in local storage and download it as PNG in system by clicking save button
saveButton.addEventListener('click', () => {
    localStorage.setItem('CanvasContents',canvas.toDataURL()) // convert canvas contents to base64 URL

    let link = document.createElement('a') // creating link -> hear a means anchor tag
    link.download = 'my-canvas.png' // saving image by this name
    link.href = canvas.toDataURL(); // setting base64 URL in link
    link.click(); // on click button link will be downloaded
})

//retrieving image from local storage if available by clicking retrieve button
retrieveButton.addEventListener('click', () => {
    let savedCanvas = localStorage.getItem('CanvasContents');

    if(savedCanvas){
        let img = new Image();
        img.src = savedCanvas //storing base64 url in image src
        ctx.drawImage(img,0,0) // drawing (loading) image in canvas
    }
})
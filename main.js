window.onload = () => {

    const canvasObj = document.getElementById("canvasObject");
    const context = canvasObj.getContext("2d");
    const button_path = document.getElementById("path");
    let pathSize = document.getElementById("pathSize");
    let inputRange = document.getElementById("range");
    let isMouseDown = false;
    let isButtonPathClick = false;
    let isOn = false;
    let positionX, positionY;
    let lista = document.getElementById("colorList");


    /* >>>>>>>>>>>>>>>>>>>>> funkcja WYBIERANIE KOLORU <<<<<<<<<<<<<<<<<<<*/
    lista.querySelectorAll("li")[0].addEventListener("click", () => {
        context.strokeStyle = "red";
    });
    lista.querySelectorAll("li")[1].addEventListener("click", () => {
        context.strokeStyle = "green";
    });
    lista.querySelectorAll("li")[2].addEventListener("click", () => {
        context.strokeStyle = "blue";
    });
    lista.querySelectorAll("li")[3].addEventListener("click", () => {
        context.strokeStyle = "black";
    });




    /* >>>>>>>>>>>>>>>>>>>>> funkcja RYSOWANIE OŁÓWKIEM <<<<<<<<<<<<<<<<<<<*/
    // zmiana rozmiaru ścieżki + rozpoczęcie rysowania
    function changeSizePath() {
        context.lineWidth = inputRange.value;
        context.beginPath();
    }
    inputRange.addEventListener("mousemove", () => {
        pathSize.textContent = inputRange.value;
    });
    // pobieranie oraz wyświetlanie pozycji myszy względem obiektu canvas
    let posX = document.getElementById("posX");
    let posY = document.getElementById("posY");
    canvasObj.addEventListener("mousemove", (e) => {
        posX.textContent = e.clientX - (canvasObj.parentElement.parentNode.offsetLeft + 50);
        posY.textContent = e.clientY - (canvasObj.parentElement.parentNode.offsetTop + 50);
    });
    // pobranie pozycji myszy względem window.document
    window.document = addEventListener("mousemove", (e) => {
        mousePosX = e.clientX;
        mousePosY = e.clientY;
    });
    // włączanie / wyłączanie rysowania ścieżki 
    button_path.addEventListener("click", () => {
        if (!isOn) {
            isButtonPathClick = true;
            isOn = true;
            button_path.style.boxShadow = "1px 1px 15px #c7c7c7";
            context.beginPath();
            selectImage.classList.remove("visibility");
        } else {
            isButtonPathClick = false;
            isOn = false;
            button_path.style.boxShadow = "none";
        }


    });
    // ustawianie początkowego punktu rysowania ścieżki
    canvasObj.addEventListener("mousedown", () => {
        changeSizePath();
        if (isButtonPathClick) {
            isMouseDown = true;
            canvasObj.style.cursor = "default";
            context.lineTo(positionX, positionY);
            context.stroke();
        }
        context.moveTo(positionX, positionY)
        // alert(window.pageYOffset)

    });
    // tymczasowe przerywanie rysowania ścieżki
    canvasObj.addEventListener("mouseup", () => {
        isMouseDown = false;
        canvasObj.style.cursor = "pointer";
    });
    // rysowanie ścieżki (funkcja odpowiadająca za nanoszenie pędzla na płótno (ustawianie pozycji))
    canvasObj.addEventListener("mousemove", (e) => {
        positionX = e.pageX - (canvasObj.parentNode.parentElement.offsetLeft + 50); // + 50, bo translateX w css
        positionY = e.pageY - (canvasObj.parentNode.parentElement.offsetTop + 50); // + 50, bo translateY w css
        if (isMouseDown) {
            context.lineTo(positionX, positionY);
            context.stroke();
            context.lineCap = "round";
            context.lineJoin = "round";
        }
    });


    /* >>>>>>>>>>>>>>>>>>>>> funkcja WYBIERANIE ZDJĘCIA <<<<<<<<<<<<<<<<<<<*/
    const file = document.getElementById("load");
    let selectImage = document.getElementById("imageGroup");
    const image = new Image();
    image.addEventListener("load", () => {
        context.drawImage(image, 0, 0, canvasObj.width, canvasObj.height);
    });

    file.addEventListener("click", () => {
        selectImage.classList.toggle("visibility");
    })


    let pliki = document.querySelectorAll(".mini");
    for (const obraz in pliki) {
        pliki[obraz].addEventListener("click", () => {
            image.src = pliki[obraz].getAttribute("src");
            selectImage.classList.toggle("visibility");

        })
    }
}
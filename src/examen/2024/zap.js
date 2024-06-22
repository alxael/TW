window.onload = () => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    context.rect(20, 20, 150, 100);
    context.fillStyle = "red";
    context.fill();
}
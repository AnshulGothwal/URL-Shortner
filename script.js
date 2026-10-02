let button = document.getElementById("button");
let copyBtn = document.getElementById("copy");

button.addEventListener("click", async () => {

    let input = document.getElementById("input");
    let display = document.getElementById("display");

    let originalUrl = input.value;

    if (originalUrl.trim() === "") {
        alert("Please enter a URL");
        return;
    }

    try {

        const response = await fetch("http://localhost:5000/urls", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                originalUrl: originalUrl
            })
        });

        const data = await response.json();

        if (response.ok) {

            display.innerText = data.shortUrl;

            input.value = "";

            alert("Short URL Generated Successfully ❤️");

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.log(error);
        alert("Something went wrong");

    }
});


copyBtn.addEventListener("click", async () => {

    let text = document.getElementById("display").innerText;

    if (text === "") {
        alert("Generate a URL first!");
        return;
    }

    await navigator.clipboard.writeText(text);

    alert("Copied ❤️");
});
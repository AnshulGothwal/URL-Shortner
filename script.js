let a = document.getElementById("button");
let copyBtn = document.getElementById("copy");

a.addEventListener("click", async () => {
    let b = document.getElementById("input").value;
    let display = document.getElementById("display")

    // 👇 Yaha short code generate karo
    let shortCode = Math.random().toString(36).slice(2, 8);

    console.log(shortCode);
    if (b.trim() === "") {
    alert("Please enter a URL");
    return;
        }

    try {
        const response = await fetch("http://localhost:3000/urls", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                shortCode: shortCode,
                originalUrl: b
            })
        });

        if (response.ok) {
            alert("Code Generated Successfully ❤️");
            display.innerText = `http://localhost:3000/${shortCode}`;
            document.getElementById("input").value = "";
        }
    } catch (error) {
        console.log(error);
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
const setUpAudioType = (path) => {
    const fileExtension = path.split(".").at(-1);
    switch (fileExtension) {
        case "mp3":
            return "audio/mpeg";
        case "ogg":
            return "audio/ogg";
        case "wav":
            return "audio/wav";
        default:
            console.error(
                `Unknown or missing file extension - only mp3, ogg or wav files are handled`,
            );
            return "";
    }
};

window.addEventListener("load", () => {
    const main = document.getElementById("main");
    let playingElementId;

    const stopAudio = () => {
        const e = document.getElementById(playingElementId);
        e.pause();
        e.currentTime = 0;
    };

    const handleButtonClick = (id) => {
        if (playingElementId !== undefined) {
            document
                .getElementById("buttonElement" + playingElementId)
                .classList.toggle("active");
            stopAudio();
        }
        playingElementId = id;
        document.getElementById(id).play();
        document
            .getElementById("buttonElement" + playingElementId)
            .classList.toggle("active");
    };

    const handleOnEnded = () => {
        document
            .getElementById("buttonElement" + playingElementId)
            .classList.toggle("active");
        playingElementId = undefined;
    };

    const path = "./ressources/sfx/";

    fetch("./items.json")
        .then((res) => res.json())
        .then((json) =>
            json.items.forEach((data) => {
                const element = document.createElement("div");
                element.classList.add("button");
                element.id = "buttonElement" + data.id;
                element.onclick = () => handleButtonClick(data.id);

                const contentElement = document.createElement("div");
                contentElement.textContent = data.name;

                const audioElement = document.createElement("audio");
                audioElement.id = data.id;
                audioElement.onended = handleOnEnded;
                const audioSource = document.createElement("source");
                audioSource.src = path + data.sfxFile;

                audioSource.type = setUpAudioType(data.sfxFile);

                audioElement.appendChild(audioSource);
                element.appendChild(audioElement);
                element.appendChild(contentElement);

                main.appendChild(element);
            }),
        );
});

var saveBlob = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (blob, fileName) {
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);

    };
}())

//Audio Record



//navigator.mediaDevices.getUserMedia({ audio: true })

.then(function(mediaStreamObj) {

    let start = document.getElementById('btnStart');
    let stop = document.getElementById('btnStop');
    let playAudio = document.getElementById('adioPlay');
    let mediaRecorder = new MediaRecorder(mediaStreamObj);
   
   

    start.addEventListener('click', function (ev) {
       
        navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder.start();
    });

    stop.addEventListener('click', function (ev) {
        mediaRecorder.stop();
    });

    mediaRecorder.ondataavailable = function (ev) {
        dataArray.push(ev.data);
    }

    let dataArray = [];

    mediaRecorder.onstop = function (ev) {

        let audioData = new Blob(dataArray, 
                { 'type': 'audio/mp3;' });

        dataArray = [];

        let audioSrc = window.URL
            .createObjectURL(audioData);

        playAudio.src = audioSrc;

        saveBlob(audioData, 'audio.zip');

    }
})

.catch(function (err) {
    console.log(err.name, err.message);
});
class Beat{
    constructor(){
        this.pads = document.querySelectorAll('.pad');
        this.playBtn = document.querySelector('.play-btn');
        this.stopBtn = document.querySelector('.stop-btn');
        this.clearBtn = document.querySelector('.clear-btn');
        this.kickSound = document.querySelector('.kick-sound');
        this.snareSound = document.querySelector('.snare-sound');
        this.hihatSound = document.querySelector('.hihat-sound');
        this.bpm = 110;
        this.isPlaying = false;
        this.selects = document.querySelectorAll('select');
        this.volumeBtns = document.querySelectorAll('.volume-btn');
        this.tempoSlider = document.querySelector('.tempo-slider');
        this.tempoNum = document.querySelector('.tempo-num');
        this.index = 0;
    }
    isActive(){
        this.classList.toggle('active');
    }
    removeActive(){
        this.pads.forEach(pad =>{
            pad.classList.remove('active');
        })
    }
    repeat(){
        let step = this.index % 8;
        const activePads = document.querySelectorAll(`.p${step}`);
        activePads.forEach(activePad =>{
            activePad.style.animation = `activepad 0.3s alternate ease-in-out 2`;
            if(activePad.classList.contains('active')){
                if(activePad.classList.contains('kick-pad')){
                    this.kickSound.currentTime = 0;
                    this.kickSound.play();
                }
                if(activePad.classList.contains('snare-pad')){
                    this.snareSound.currentTime = 0;
                    this.snareSound.play();
                }
                if(activePad.classList.contains('hihat-pad')){
                    this.hihatSound.currentTime = 0;
                    this.hihatSound.play();
                }
            }
        });
        this.index++;
    }
    updatePlayBtn(){
        // const playIcon = document.createElement('i');
        // playIcon.classList.add('fas', 'fa-play');
        // const stopIcon = document.createElement('i');
        // stopIcon.classList.add('fas','fa-stop');
        if(!this.isPlaying){
            this.playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
            // this.playBtn.replaceChild(stopIcon, this.playBtn.childNodes[1]);
        } else {
            this.playBtn.innerHTML = `<i class="fas fa-play"></i>`;
            // this.playBtn.replaceChild(playIcon, this.playBtn.childNodes[1]);
        }
    }
    stopPlaying(){
        if(this.isPlaying){
            this.updatePlayBtn();
        }
        clearInterval(this.isPlaying);
        this.isPlaying = false;
        this.index = 0;
        this.stopBtn.style.display = 'none';
        this.tempoSlider.value = 110;
        this.tempoNum.innerText = `Tempo: 110`;
        this.bpm = 110;
    }
    changeBeat(e){
        const selectName = e.target.name;
        const selectValue =  e.target.value;
        switch(selectName){
            case 'kick-select':
                this.kickSound.src = selectValue;
                break;
            case 'snare-select':
                this.snareSound.src = selectValue;
                break;
            case 'hihat-select':
            this.hihatSound.src = selectValue;
            break;
        }
    }
    updateVolume(e){
        const volumeBtnType = e.target.classList[1];
        switch (volumeBtnType){
            case 'kick-volume':
                e.target.classList.toggle('mute');
                if(e.target.classList.contains('mute')){
                    e.target.innerHTML = `<i class="fas fa-volume-mute"></i>`;
                    this.kickSound.volume = 0;
                } else{
                    e.target.innerHTML = `<i class="fas fa-volume-up"></i>`;
                    this.kickSound.volume = 1;
                }
            break;
            case 'snare-volume':
                e.target.classList.toggle('mute');
                if(e.target.classList.contains('mute')){
                    e.target.innerHTML = `<i class="fas fa-volume-mute"></i>`;
                    this.snareSound.volume = 0;
                } else{
                    e.target.innerHTML = `<i class="fas fa-volume-up"></i>`;
                    this.snareSound.volume = 1;
                }
            break;
            case 'hihat-volume':
                e.target.classList.toggle('mute');
                if(e.target.classList.contains('mute')){
                    e.target.innerHTML = `<i class="fas fa-volume-mute"></i>`;
                    this.hihatSound.volume = 0;
                } else{
                    e.target.innerHTML = `<i class="fas fa-volume-up"></i>`;
                    this.hihatSound.volume = 1;
                }
            break;
        }
    }   
    changeTempo(e){
        this.tempoNum.innerText = `Tempo: ${e.target.value}`;
        this.bpm = e.target.value;
        if(this.isPlaying){
            clearInterval(this.isPlaying);
            this.isPlaying = false;
            this.start();
        }
    }
    start(){
        const interval = (60/this.bpm) * 1000;
        if(!this.isPlaying){
            this.isPlaying = setInterval(()=>{
                this.repeat()
            },interval);
            this.stopBtn.style.display = 'block';
        } else{
            clearInterval(this.isPlaying);
            this.isPlaying = false;
        }
    }
}

const beat = new Beat();

beat.clearBtn.addEventListener('click', ()=>{
    beat.removeActive();
});

beat.pads.forEach((pad) =>{
    pad.addEventListener('click', beat.isActive);
    pad.addEventListener('animationend', function(){
        this.style.animation = '';
    });
})

beat.playBtn.addEventListener('click', ()=>{
    beat.updatePlayBtn();
    beat.start();
});

beat.stopBtn.addEventListener('click', ()=>{
    beat.stopPlaying();
})

beat.selects.forEach(select =>{
    select.addEventListener('change', function(e){
        beat.changeBeat(e);
    });
});

beat.volumeBtns.forEach(volumeBtn =>{
    volumeBtn.addEventListener('click', function(e){
        beat.updateVolume(e);
    })
})

beat.tempoSlider.addEventListener('input', function(e){
    beat.changeTempo(e);
})

// This is just for testing purpose!

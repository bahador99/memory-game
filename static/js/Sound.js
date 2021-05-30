export default class Sound {
  constructor(source) {
    this.audio = document.createElement('audio');
    this.audio.src = source;
    this.audio.setAttribute('preload', 'auto');
    this.audio.setAttribute('controls', 'none');
    this.audio.style.display = 'none';
    document.body.appendChild(this.audio);
  }

  play = () => {
    this.audio.play();
  };
  stop = () => {
    this.audio.pause();
  };
}

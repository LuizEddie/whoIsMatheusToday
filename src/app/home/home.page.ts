import { Component } from '@angular/core';
import { File } from '@awesome-cordova-plugins/file/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  default = "quem_sera.png"
  folder = "../../assets/";
  img = "";
  name = "";
  music = new Audio("../../assets/music/audio.mp3");
  imgs: Array<any> = [];
  disabled = false;

  constructor(private file: File) {
    this.img = this.folder + this.default;
   }

  startSearch() {
    this.file.listDir(this.file.applicationDirectory, "www/assets/char").then(imgs => {
      imgs.forEach(img => {
        this.imgs.push(img.name);
      })
      this.countImg();
    })
  }

  randomizeImageLenght() {
    let min = Math.ceil(-1);
    let max = Math.floor(this.imgs.length);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  countImg(){
    this.reproduceMusic();
    this.disabled = true;
    var duration = Math.round(this.music.duration);
    var count = duration * 1100;//seconds to ms
    let interval = setInterval(()=>{
      if(count > 4000){
        let partName = this.imgs[this.randomizeImageLenght()];
        this.img = this.folder  + "char/"+ partName;
        this.name = partName.split(".",2)[0];
        count = count - 10;
      }
    }, 10);

    setTimeout(()=>{
      clearInterval(interval);
      this.disabled = false;
    }, count);
  }

  reproduceMusic(){
    this.music.play();
  }

}

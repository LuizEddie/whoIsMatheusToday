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
      this.reproduceMusic();
      this.countImg();
    })
  }

  randomizeImageLenght() {
    let min = Math.ceil(-1);
    let max = Math.floor(this.imgs.length);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  countImg(){
    var count = Math.round(this.music.duration);
    let interval = setInterval(()=>{
      this.disabled = true;
      if(count > 4){
        this.img = this.folder  + "char/"+ this.imgs[this.randomizeImageLenght()];
        count--;
      }
    }, 1000);

    setTimeout(()=>{
      clearInterval(interval);
      this.disabled = false;
    }, count * 1000);
  }

  reproduceMusic(){
    this.music.play();
  }

}

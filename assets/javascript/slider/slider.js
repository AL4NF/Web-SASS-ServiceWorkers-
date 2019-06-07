export default class Slider{
  constructor({elements, animationFunc, speed}){
    this.elements = elements;
    this.animationFunc = animationFunc;


    this.index = 0; //lo usamos para saber en que elemento del Slider va
    this.size = elements.length;

    this.speed = speed;
    this.innerNext = this.innerNext.bind(this);// es una manera alternativa en lugar de usar Arrow Functions, en donde indicamos que this.prev, siemre conerve el mismo valor del contexto
    this.stop = this.stop.bind(this);

    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);


  }

  innerNext(){
    this.index++; //aumentamos, y cambia de Slide
    if(this.index >= this.size) this.index = 0; //Si se terminan las Slides, vuelve empezar de 0 de nuevo
    this.animationFunc(this.elements[this.index]);
    // console.log(this.elements[this.index]);
  }
  innerPrev(){
    this.index--; //retrocede, y cambia de Slide
    if(this.index < 0) this.index = this.size - 1 ;
    this.animationFunc(this.elements[this.index]);
    // console.log(this.elements[this.index]);
  }

  next(){
    this.innerNext();
    if(this.interval){
      this.stop();
      this.play();
    }
  }
  prev(){
    this.innerPrev();
    if(this.interval){
      this.stop();
      this.play();
    }
  }

  play(){ //plau automatico
    this.interval = setInterval(this.innerNext, this.speed)
  }

  stop(){//para las slides
    clearInterval(this.interval);
  }
}
//se recomienda usar un Json de configuracion para que quede mas laro que es lo que estamos enviando
// let slider = new Slider({
//   elements: [1,2,3,4,5],
// });
//
// slider.play();
// setTimeout(slider.stop,5000);

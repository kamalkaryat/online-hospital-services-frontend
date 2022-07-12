import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  slideIndex = 1;

  constructor() {  }

  ngOnInit(): void {
    this.showSlides(this.slideIndex);
  }


  // Next/previous controls
  public plusSlides(n: number) {
    this.showSlides(this.slideIndex += n);
  }

  // Thumbnail image controls
  public currentSlide(n: number) {
    this.slideIndex = n;
    this.showSlides(this.slideIndex);
  }

  showSlides(n: any) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {this.slideIndex = 1}
    if (n < 1) {this.slideIndex = slides.length}

    const slide_divs= Array.from(
      document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>
    );

    const dot_divs= Array.from(
      document.getElementsByClassName("dot") as HTMLCollectionOf<HTMLElement>
    );

    slide_divs.forEach(slide=>{
        slide.style.display= "none";
    });

    dot_divs.forEach(dd=>{
      dd.className = dd.className.replace(" active", "");
    });

    slide_divs[this.slideIndex-1].style.setProperty("display", "block");
    dot_divs[this.slideIndex-1].className+= " active";
  }

}



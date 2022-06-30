import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterState } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'online-hospital-services';
  constructor(titleService: Title, router: Router){
      // router.events.subscribe(event=>{
      //     if(event instanceof NavigationEnd){
      //       var title= this.getTitle(router.routerState, router.routerState.root).join('-');
      //       console.log(title);
      //       titleService.setTitle(title);
      //     }
      // });
   } 

  //  getTitle(state: RouterState, parent: ActivatedRoute){
  //     var data= [];
  //     if(parent && parent.snapshot.data && parent.snapshot.data.title){
  //       data.push(parent.snapshot.data.title);
  //     }

  //     if(state && parent){
  //       data.push(... this.getTitle(state, state.firstChild(parent)));
  //     }
  //     return data;
  //  }
}

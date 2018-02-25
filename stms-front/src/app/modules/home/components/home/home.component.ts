import {
  Component,
  OnInit,
  HostListener
} from '@angular/core';
import {
  DomSanitizer,
  SafeStyle
} from '@angular/platform-browser';
import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  IUser,
  ICoord,
  HomeService
} from '../../services/home.service';

import { LoginService } from '../../../login/services/login.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: IUser;
  private coords: object;
  transforms: object;
  private activeElement: string = '';
  private mouseCoords: ICoord = {
    x: 0,
    y: 0
  };
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private homeService: HomeService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    const defaultCoords: ICoord = {
      x: 0,
      y: 0
    };
    
    this.user = this.route.snapshot.data.user;
    this.coords = {
      image: this.user.imageCoords || { ...defaultCoords },
      name: this.user.nameCoords || { ...defaultCoords }
    };
    
    this.transforms = {
      name: this.getTransform(this.coords['name']),
      image: this.getTransform(this.coords['image'])
    };
  }
  
  getTransform(coords: ICoord): SafeStyle {
    const style = `translateX(${coords.x - 20}px) translateY(${coords.y}px)`;
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }
  
  mouseDownHandler( evt: any, target:string ): void {
    this.activeElement = target;
    this.mouseCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
  }
  
  mouseUpHandler( evt: any, target: string ): void {
    this.activeElement = '';
    this.homeService.saveCoords(this.user.username, this.coords);
  } 
  
  @HostListener('document:mousemove', ['$event']) 
  onMouseMove(evt) {
    const ae = this.activeElement;
    if(!!ae) {
      let coords = this.coords[ae];
      let x = this.mouseCoords.x - evt.clientX;
      let y = this.mouseCoords.y - evt.clientY;
      this.mouseCoords.x = evt.clientX;
      this.mouseCoords.y = evt.clientY;
      coords.x -= x;
      coords.y -= y;
      this.transforms[ae] = this.getTransform(coords);
    }
  }
  
  logout():void {
    this.loginService.setCredentials('', '')
    this.router.navigate(['login'])
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  navLinks: any[];

  constructor() {
    this.navLinks = [
      {
        label: 'LiveAction',
        link: '',
        index: 0
      }, {
        label: 'Home',
        link: '',
        index: 1
      }, {
        label: 'Foo',
        link: '',
        index: 1
      }, {
        label: 'Bar',
        link: '',
        index: 1
      }, {
        label: 'Baz',
        link: '',
        index: 1
      }
    ];

  }
  ngOnInit(): void {
  }

}

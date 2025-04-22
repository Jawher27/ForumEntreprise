import { Component, OnInit, Inject, Renderer2, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { filter, Subscription } from 'rxjs';

var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = 0;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor() { }

    ngOnInit(): void {
    }
}

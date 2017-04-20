/**
 * Created by Влад on 17.03.2017.
 */
import {Component, NgZone, ElementRef, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { MapsAPILoader } from 'angular2-google-maps/core';
import {FormControl} from "@angular/forms";
import {ViewChild} from "@angular/core";


@Component({
    moduleId:module.id,
    selector: 'google-map',
    templateUrl: 'google.map.html',
    styleUrls: ['google.map.css']
})
export class GoogleMap implements OnInit{
    lat: number;
    lng: number;
    zoom:number;
    title:string;
    number1:string;
    number2:string;
    number3:string;
    adress:string;
    time1:string;
    timeWeekend:string;
    email:string;
    addr:string;


    public searchControl: FormControl;

    @ViewChild("search")
    public searchElementRef: ElementRef;

    constructor(private router:Router,private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {

        this.title="Автохаус «СмартАвто» ждет вас";
        this.number1="376 60 52";
        this.number2="668 60 57";
        this.number3="686 60 57";
        this.adress="проспект Победителей 1, Минск, Беларусь";
        this.time1="Пн-пт: c 7:00 до 23:00";
        this.timeWeekend="Сб-вс и праздничные дни: c 9:00 до 21:00";
        this.email="smart-avto@mail.ru";
    }
    clickMarker(){
        this.router.navigate(["main"]);
    }
    ngOnInit(){
        this.searchControl = new FormControl();
        // this.setCurrentPosition();
        var addr=document.getElementsByClassName('addr')[0] as HTMLInputElement;
        this.mapsAPILoader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ["geocode"]
            });
            autocomplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    //get the place result
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }

                    //set latitude, longitude and zoom
                    console.log('there');
                    this.lat = place.geometry.location.lat();
                    this.lng = place.geometry.location.lng();
                    this.zoom=12;
                });
            });
        });
        if(this.searchElementRef.nativeElement.value==""){
            this.lat=53.905377;
            this.lng=27.552047;
            this.zoom=17;
        }
    }
    go(){
        this.lat=53.905377;
        this.lng=27.552047;
        this.zoom=17;
    }
    // private setCurrentPosition() {
    //     if ("geolocation" in navigator) {
    //         navigator.geolocation.getCurrentPosition((position) => {
    //             this.lat = position.coords.latitude;
    //             this.lng = position.coords.longitude;
    //         });
    //     }
    // }
}
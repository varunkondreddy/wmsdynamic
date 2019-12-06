import { Component, OnInit } from '@angular/core';
import { Router, Data, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  arrayData: Array<Data>;

  constructor(private http: HttpClient,private router: Router,public navCtrl: NavController, public activeRoute: ActivatedRoute) {};

  ngOnInit(){
    this.arrayData = new Array();
    // var from = "2019-12-01 00:00:00";
    // var to = "2019-12-01 05:00:42";
    let date1 = new Date();
    let date2 = new Date();
    var from = new Date(date1.getTime() - date1.getTimezoneOffset()*60000).toISOString();
    var to = new Date(date2.getTime() - date2.getTimezoneOffset()*60000).toISOString(); //This generates the new date
    to = to.replace("T"," ");
    to = to.substr(0, to.length - 5);
    from = from.replace("T"," ");
    from = from.substr(0, from.length - 13);
    from = from.replace(" "," 00:00:00")
    console.log("From: " + from)
    console.log("To: " + to);
    const data = {
      from,
      to // This adds it to the payload
     }; 
    this.http.post('http://ec2-13-233-95-111.ap-south-1.compute.amazonaws.com:5000/buildpage', data, {responseType: 'text'}).subscribe(
    
      rdata => {
        console.log(rdata);
        let temp = JSON.parse(rdata);
        this.arrayData = temp.Total;        
        }
      );
  }

  openFloors(x){
    this.router.navigate(['/floors',{building:x}]);
  }
}
import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Database, object, ref } from '@angular/fire/database';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  
  cl1: string = "hora";

  constructor(private database: Database) {}

  async ngOnInit() {
    await LocalNotifications.requestPermissions();//solicitar permisos de la app
  }

  async readDatabaseAndNotify() {
    const route = ref(this.database, "/notificaciones/hora");

    object(route).subscribe(attributes => {
      const valores_db = attributes.snapshot.val();
      console.log(valores_db);
      if (valores_db >= 0 && valores_db < 12) {
        this.sendNotification("ES DE DIA");
      } else if (valores_db >= 12 && valores_db < 18) {
        this.sendNotification("tardeee");
      } else if (valores_db >= 18 && valores_db <= 23) {
        this.sendNotification("NOCHEEE");
      } else {
        this.sendNotification("Fuera de Rango, ajuste su zona horaria");
      }
    });
  }

  async sendNotification(message: string) {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: "Notificación",
          body: message,
          id: 1
        }
      ]
    });
  }
}
 
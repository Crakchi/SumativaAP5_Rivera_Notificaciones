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
    await LocalNotifications.schedule({//Elaboracion del objeto notificacion
      notifications: [
        {
          title: "Esta es una notificación emergente",
          body: "Esta notificación debería ejecutarse en segundo plano pero no cuando lapp esté cerrada",
          id: 1
        }
      ]
    });
    
    const route = ref(this.database, "/notificaciones/hora");
    
    object(route).subscribe(attributes => {
      const valores_db = attributes.snapshot.val();
      console.log(valores_db);
      if (valores_db === true) {
        this.cl1 = "warning"; // Actualizar el valor de cl1 a "warning" si se cumple la condición
      } else if (valores_db === false) {
        // Hacer algo si valores_db es igual a false, por ejemplo cambiar el color a "light"
        this.cl1 = "light";
      }
    });
  }
}

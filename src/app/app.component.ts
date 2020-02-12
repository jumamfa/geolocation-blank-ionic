import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import BackgroundGeolocation, {
  State,
  Config,
  Location,
  LocationError,
  Geofence,
  HttpEvent,
  MotionActivityEvent,
  ProviderChangeEvent,
  MotionChangeEvent,
  GeofenceEvent,
  GeofencesChangeEvent,
  HeartbeatEvent,
  ConnectivityChangeEvent,
  DeviceSettings,
  DeviceSettingsRequest,
  SQLQuery,
  Authorization, AuthorizationEvent,
  DeviceInfo,
  TransistorAuthorizationToken
} from 'cordova-background-geolocation';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      BackgroundGeolocation.ready({
        reset: false,
        debug: true,
        logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
        distanceFilter: 10,
        stopTimeout: 1,
        stopOnTerminate: false,
        startOnBoot: true,
        enableHeadless: true,
        maxDaysToPersist: 14,
        notification: {
          title: 'cordova-background-geolocation',
          text: 'Tracking engaged'
        }
      }).then(async (state) => {
        if(!state.enabled) {
          BackgroundGeolocation.start(state => {
            console.log('[js] START SUCCESS :', state);
          }, error => {
            console.error('[js] START FAILURE: ', error);
          });
        }
      }).catch((error) => {
        console.warn('- BackgroundGeolocation configuration error: ', error);
      });

    });
  }
}

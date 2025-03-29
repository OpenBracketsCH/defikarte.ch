export class GeolocationService {
  private watchId: number = 0;

  public getCurrentPosition(): Promise<GeolocationPosition | null> {
    return new Promise<GeolocationPosition | null>(resolve => {
      if (!navigator.geolocation) {
        resolve(null);
        return;
      }

      const successCallback = (position: GeolocationPosition) => {
        if (!this.isPositionValid(position)) {
          resolve(null);
          return;
        }

        resolve(position);
      };

      const errorCallback = () => {
        resolve(null);
      };

      navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
        timeout: 5000,
      });
    });
  }

  public watchPosition(
    successCallback: PositionCallback,
    errorCallback?: PositionErrorCallback,
    options?: PositionOptions
  ): boolean {
    if (navigator.geolocation && this.watchId === 0) {
      this.watchId = navigator.geolocation.watchPosition((p) => {
        if (this.isPositionValid(p)) {
          successCallback(p);
        }

        errorCallback?.();
      }, errorCallback, options);
      return true;
    }

    return false;
  }

  public clearWatch(): void {
    navigator.geolocation.clearWatch(this.watchId);
    this.watchId = 0;
  }

  private isPositionValid(position: GeolocationPosition): boolean {
    const isTooOld = new Date(position.timestamp) < new Date(Date.now() - 5 * 60 * 1000);
    const isInaccurate = position.coords.accuracy > 1000;

    return !isTooOld && !isInaccurate;
  }
}

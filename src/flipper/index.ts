import { getCurrentDateTime } from '../helpers/functions';
import { addPlugin } from '../modules/init';

export default class FlipperConnectionManager {
  private flipperConnection?: any;

  handleConnect = (connection: any) => {
    this.flipperConnection = connection;
  };

  handleDisconnect = () => {
    this.flipperConnection = undefined;
  };

  public flipperConfig: any = {
    runInBackground: () => true,
    getId() {
      return 'flipper-plugin-react-native-logging-tools';
    },
    onConnect: this.handleConnect,
    onDisconnect: this.handleDisconnect,
  };

  constructor() {
    if (addPlugin) {
      addPlugin(this.flipperConfig);
    }
  }

  send(service: string, event: string, params?: any, error?: any) {
    const payload: any = {
      service,
      event,
      params,
      error,
      time: getCurrentDateTime(),
    };

    if (this.flipperConnection) {
      this.flipperConnection.send('action', payload);
    }
  }
}

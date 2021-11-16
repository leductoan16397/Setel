export class ConfigService {
  private _mongoUrl: string =
    process.env.MONGO_URL ||
    'mmongodb+srv://toanle:toan123123@cluster0.g5ye5.mongodb.net/SêtlProject?authSource=admin&replicaSet=atlas-dd4arv-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';

  private _redisDomain: string = process.env.REDIS_DOMAIN || 'redis';

  public get redisDomain(): string {
    return this._redisDomain;
  }

  public get mongoUrl(): string {
    return this._mongoUrl;
  }
}

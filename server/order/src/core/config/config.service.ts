export class ConfigService {
  private _mongoUrl: string =
    process.env.MONGO_URL ||
    'mmongodb+srv://toanle:toan123123@cluster0.g5ye5.mongodb.net/SêtlProject?authSource=admin&replicaSet=atlas-dd4arv-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';

  private _orderPort: number = parseInt(process.env.ORDER_PORT) || 8000;

  private _jwtSecreKey: string =
    process.env.JWT_SECRET ||
    'hWmZq4t7w!z%C*F-JaNdRgUjXn2r5u8x/A?D(G+KbPeShVmYp3s6v9y$B&E)H@McQfTjWnZr4t7w!z%C*F-JaNdRgUkXp2s5v8x/A?D(G+KbPeShVmYq3t6w9z$B&E)H@McQfTjWnZr4u7x!A%D*F-JaNdRgUkXp2s5v8y/B?E(H+KbPeShVmYq3t6w9z$C&F)J@NcQfTjWnZr4u7x!A%D*G-KaPdSgUkXp2s5v8y/B?E(H+MbQeThWmZq3t6w9z';

  private _jwtExpiration: string = process.env.JWT_EXPIRATION || '60m';

  private _redisDomain: string = process.env.REDIS_DOMAIN || 'redis';

  public get redisDomain(): string {
    return this._redisDomain;
  }

  public get mongoUrl(): string {
    return this._mongoUrl;
  }

  public get orderPort(): number {
    return this._orderPort;
  }

  public get jwtSecreKey(): string {
    return this._jwtSecreKey;
  }
  public get jwtExpiration(): string {
    return this._jwtExpiration;
  }
}

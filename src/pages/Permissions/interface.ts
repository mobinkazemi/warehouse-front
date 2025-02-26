export interface ISwitch {
  id: number;
  name: string;
  ip: string;
  username?: string;
  password?: string;
  portCount?: number;
  model?: string;
  series?: string;
  os?: string;
}

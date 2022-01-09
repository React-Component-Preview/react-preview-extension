export interface Prop {
  propName: string;
  propType: string;
  defaultValue: string;
}

export interface PreviewConfig {
  [key: string]: Prop[];
}

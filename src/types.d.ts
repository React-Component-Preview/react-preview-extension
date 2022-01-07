export interface Prop {
  key: string;
  type: string;
  default: string;
}

export interface PreviewConfig {
  name: string;
  props: Prop[];
}

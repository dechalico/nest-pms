export interface GlobalMesage {
  title?: string;
  message?: string;
  show: boolean;
  duration: number;
  type: 'error' | 'success' | 'warning';
}

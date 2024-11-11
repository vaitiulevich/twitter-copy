export declare global {
  interface Window {
    store: any;
    URL: {
      createObjectURL: (obj: Blob) => string;
      revokeObjectURL: (url: string) => void;
    };
  }
}

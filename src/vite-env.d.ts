/// <reference types="vite/client" />
declare module 'react-beautiful-dnd';
// src/global.d.ts 或 src/svg.d.ts
declare module "*.svg" {
    const content: string;
    export default content;
}

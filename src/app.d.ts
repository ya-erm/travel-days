// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

declare namespace App {
  interface Locals {
    uuid: string | null;
  }
  interface PageData {
    uuid?: string | null;
  }
  // interface Error {}
  // interface Platform {}
}

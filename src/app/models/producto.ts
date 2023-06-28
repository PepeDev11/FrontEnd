import { numberAttribute } from "@angular/core";

export class Producto{
  _id?: number;
  modelo: string;
  marca: string;
  procesador: string;
  memoriaRam: string;
  discos: string;
  tarjetaMadre: string;
  tarjetaVideo: string;
  precio: number;

  constructor(modelo: string, marca: string, procesador: string, memoriaRam: string, discos: string, tarjetaMadre: string, tarjetaVideo: string, precio: number){
    this.modelo = modelo;
    this.marca = marca;
    this.procesador = procesador;
    this.memoriaRam = memoriaRam
    this.discos = discos;
    this.tarjetaMadre = tarjetaMadre;
    this.tarjetaVideo = tarjetaVideo;
    this.precio = precio;
  }
}

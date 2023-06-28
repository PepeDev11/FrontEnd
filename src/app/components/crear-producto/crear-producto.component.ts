import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent {
  productoForm: FormGroup;
  titulo = 'Crear laptop';
  id: string | null;

  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private _productoService: ProductoService,
              private aRouter: ActivatedRoute) {

    this.productoForm = this.fb.group({
      modelo: ['', Validators.required],
      marca: ['', Validators.required],
      procesador: ['', Validators.required],
      memoriaRam: ['', Validators.required],
      discos: ['', Validators.required],
      tarjetaMadre: ['', Validators.required],
      tarjetaVideo: ['', Validators.required],
      precio: ['', Validators.required]
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarProducto(){
    console.log(this.productoForm);

    console.log(this.productoForm.get('modelo')?.value);

    const PRODUCTO: Producto = {
      modelo: this.productoForm.get('modelo')?.value,
      marca: this.productoForm.get('marca')?.value,
      procesador: this.productoForm.get('procesador')?.value,
      memoriaRam: this.productoForm.get('memoriaRam')?.value,
      discos: this.productoForm.get('discos')?.value,
      tarjetaMadre: this.productoForm.get('tarjetaMadre')?.value,
      tarjetaVideo: this.productoForm.get('tarjetaVideo')?.value,
      precio: this.productoForm.get('precio')?.value
    }

    if(this.id !== null){
      //editamos producto
      this._productoService.editarProducto(this.id, PRODUCTO).subscribe(data => {
        this.toastr.info('Producto actualizado con exito', PRODUCTO.modelo);
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.toastr.error('Ocurrio un error al momento de guardar el producto', PRODUCTO.modelo);
        this.productoForm.reset();
      })

    } else {
      //Agregamos producto
      console.log(PRODUCTO);
      this._productoService.guardarProducto(PRODUCTO).subscribe(data =>{
        this.toastr.success('Producto registrado con exito', PRODUCTO.modelo);
        this.router.navigate(['/listar']);
      }, error => {
        console.log(error);
        this.toastr.error('Ocurrio un error al momento de guardar el producto', PRODUCTO.modelo);
        this.productoForm.reset();
      })
    }


  }

  esEditar() {
    if(this.id !== null){
      this.titulo = 'Editar laptop';
      this._productoService.obtenerProducto(this.id).subscribe(data => {
        this.productoForm.setValue({
          modelo: data.modelo,
          marca: data.marca,
          procesador: data.procesador,
          memoriaRam: data.memoriaRam,
          discos: data.discos,
          tarjetaMadre: data.tarjetaMadre,
          tarjetaVideo: data.tarjetaVideo,
          precio: data.precio
        })
      })
    }
  }
}

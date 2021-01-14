import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateMensajeDto } from './dto/create-mensaje-dto';
import { MensajesService } from './mensajes.service';

@Controller('mensajes')
export class MensajesController {
    constructor(private mensajeService: MensajesService) {
        console.log('Constructor!!');
    }

    @Post()
    create (@Body() createMesajeDto: CreateMensajeDto, @Res() response) {
        this.mensajeService.createMensaje(createMesajeDto).then( mensaje => {
            response.status(HttpStatus.CREATED).json(mensaje);
        }

        ).catch( err => {
            response.status(HttpStatus.FORBIDDEN).json({ mensaje: `Error creando el mensaje: ${err}`});
        })
    }

    @Get()
    getAll (@Res() response) {
        this.mensajeService.getAll().then( mensajesList => {
            response.status(HttpStatus.OK).json(mensajesList);
        }

        ).catch( err => {
            response.status(HttpStatus.FORBIDDEN).json({ mensaje: `Error consultando mensajes: ${err}`})
        })
    }

    @Put(':id') 
    update (@Body() updateMensajeDto: CreateMensajeDto, @Res() response, @Param() idMensaje) {
        this.mensajeService.updateMensaje(idMensaje, updateMensajeDto).then(mensaje => {
            response.status(HttpStatus.OK).json(mensaje); 
        }).catch( err => {
            response.status(HttpStatus.FORBIDDEN).json({ mensaje: `Error actualizando mensaje ${idMensaje} ${err}`})
        })
    }

    @Delete(':id')
    delete (@Res() response, @Param() idMensaje) {
        this.mensajeService.deleteMensaje(idMensaje).then(
            response.status(HttpStatus.OK).json({ mensaje: 'Mensaje eliminado' })
        ).catch( err => {
            response.status(HttpStatus.FORBIDDEN).json({ mensaje: `Error eliminando mensaje ${err}`})
        })
    }

}

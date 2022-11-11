import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './services/usuario.service';
import { TimesService } from './services/times.service';
import { PartidasService } from './services/partidas.service';
import { LigaService } from './services/liga.service';
import { BolaoService } from './services/bolao.service';

import { Usuario } from './models/usuario';
import { Times } from './models/times';
import { Partidas } from './models/partidas';
import { Liga } from './models/liga';
import { Bolao } from './models/bolao';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  usuario = {} as Usuario;
  liga = {} as Liga;

  timesList: Times[];
  partidasList: Partidas[];
  bolaoList: Bolao[];

  constructor(
    private usuarioService: UsuarioService,
    private timesService: TimesService,
    private partidasService: PartidasService,
    private ligaService: LigaService,
    private bolaoService: BolaoService
  ) {
    this.timesList = [];
    this.partidasList = [];
    this.bolaoList = [];
  }


  ngOnInit() {
    this.getUsuarioById(0);
  }

  getUsuarioById(id: number) {
    this.usuarioService.getUsuarioById(id).subscribe((usuario: Usuario) => {
      this.usuario = usuario;
      this.getTimes();
    });
  }

  getTimes() {
    this.timesService.getTimes().subscribe((times: Times[]) => {
      this.timesList = times;
      this.getPartidas()
    });
  }

  getPartidas() {
    this.partidasService.getPartidas().subscribe((partidas: Partidas[]) => {
      this.partidasList = partidas;
      this.getBolao();
    });
  }

  getLigaById(id: number) {
    this.ligaService.getLigaById(id).subscribe((liga: Liga) => {
      this.liga = liga;
    });
  }

  getBolao() {
    this.bolaoService.getBolao().subscribe((bolao: Bolao[]) => {
      this.bolaoList = bolao;
      this.semaphore();
    });
  }

  semaphore() {

  }
}

import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './services/usuario.service';
import { TimesService } from './services/times.service';
import { PartidasService } from './services/partidas.service';
import { LigaService } from './services/liga.service';
import { BolaoService } from './services/bolao.service';
import { PalpiteService } from './services/palpite.service';

import { Usuario } from './models/usuario';
import { Times } from './models/times';
import { Partidas } from './models/partidas';
import { Liga } from './models/liga';
import { Bolao } from './models/bolao';
import { GameModel } from './models/gameModel';
import { Palpite } from './models/palpite';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  usuario = {} as Usuario;
  liga = {} as Liga;

  usuarioList: Usuario[];
  timesList: Times[];
  partidasList: Partidas[];
  palpiteList: Palpite[];
  bolaoList: Bolao[];
  gameList: GameModel[];

  constructor(
    private usuarioService: UsuarioService,
    private timesService: TimesService,
    private partidasService: PartidasService,
    private palpiteService: PalpiteService,
    private ligaService: LigaService,
    private bolaoService: BolaoService

  ) {
    this.usuarioList = [];
    this.timesList = [];
    this.partidasList = [];
    this.palpiteList = [];
    this.bolaoList = [];
    this.gameList = [];
  }

  ngOnInit() {
    this.getUsuario();
  }

  getUsuarioById(id: number) {
    this.usuarioService.getUsuarioById(id).subscribe((usuario: Usuario) => {
      this.usuario = usuario;
      this.getTimes();
    });
  }

    getUsuario() {
    this.usuarioService.getUsuario().subscribe((usuario: Usuario[]) => {
      this.usuarioList = usuario;
      this.getTimes();
    });
  }

  getTimes() {
    this.timesService.getTimes().subscribe((times: Times[]) => {
      this.timesList = times;
      this.getPartidas();
    });
  }

  getPartidas() {
    this.partidasService.getPartidas().subscribe((partidas: Partidas[]) => {
      this.partidasList = partidas;
      this.getPalpite();
    });
  }

    getPalpite() {
    this.palpiteService.getPalpite().subscribe((palpite: Palpite[]) => {
      this.palpiteList = palpite;
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
    for (let i = 0; i < this.partidasList.length; i++) {
      let mandanteNome:string = "";
      let mandanteUrl:string = "";
      let visitanteNome:string = "";
      let visitanteUrl:string = "";

      for (let m = 0; m < this.timesList.length; m++) {
        if (this.partidasList[i].mandantedId == this.timesList[m].id) { 
          mandanteNome = this.timesList[m].nome;
          mandanteUrl = this.timesList[m].urlLogo
        }

        if (this.partidasList[i].visitanteId == this.timesList[m].id) { 
          visitanteNome = this.timesList[m].nome;
          visitanteUrl = this.timesList[m].urlLogo
        }
      }
    
      this.gameList.push ({
        mandanteId: this.partidasList[i].mandantedId,
        mandanteNome: mandanteNome,
        mandanteUrl:  mandanteUrl,
        mandanteGols: this.partidasList[i].resultado.golsMandante,
        mandanteVencedorPenaltis: this.partidasList[i].resultado.mandanteVencedorPenaltis,
        visitanteId: this.partidasList[i].visitanteId,
        visitanteNome: visitanteNome,
        visitanteUrl:  visitanteUrl,
        VisitanteGols: this.partidasList[i].resultado.golsVisitante,
        visitanteVencedorPenaltis: this.partidasList[i].resultado.visitanteVencedorPenaltis,
        tipo: this.partidasList[i].tipo,
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { TimesService } from '../services/times.service';
import { PartidasService } from '../services/partidas.service';
import { LigaService } from '../services/liga.service';
import { BolaoService } from '../services/bolao.service';
import { PalpiteService } from '../services/palpite.service';

import { Usuario } from '../models/usuario';
import { Times } from '../models/times';
import { Partidas } from '../models/partidas';
import { Liga } from '../models/liga';
import { Bolao } from '../models/bolao';
import { GameModel } from '../models/gameModel';
import { Palpite } from '../models/palpite';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-bolao-palpite',
  templateUrl: './bolao-palpite.component.html',
  styleUrls: ['./bolao-palpite.component.css']
})
export class BolaoPalpiteComponent implements OnInit {

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
      this.createModel();
    });
  }

  createModel() {
    for (let i = 0; i < this.partidasList.length; i++) {
      let mandanteNome:string = "";
      let mandanteUrl:string = "";
      let visitanteNome:string = "";
      let visitanteUrl:string = "";

      let mandanteGols:number = -1;
      let mandantePenaltis:boolean = false;
      let visitanteGols:number = -1;
      let visitantePenaltis:boolean = false;

      let isEnabledPenaltis:boolean = false;
      let endGame: boolean = false

      for (let m = 0; m < this.timesList.length; m++) {
        if (this.partidasList[i].mandanteId == this.timesList[m].id) { 
          mandanteNome = this.timesList[m].nome;
          mandanteUrl = this.timesList[m].urlLogo
        }

        if (this.partidasList[i].visitanteId == this.timesList[m].id) { 
          visitanteNome = this.timesList[m].nome;
          visitanteUrl = this.timesList[m].urlLogo
        }
      }

      for (let m = 0; m < this.palpiteList.length; m++) {
        if (this.partidasList[i].id == this.palpiteList[m].partidaId) { 
            mandanteGols = this.palpiteList[m].resultado.golsMandante;
            visitanteGols = this.palpiteList[m].resultado.golsVisitante;
            mandantePenaltis = this.palpiteList[m].resultado.mandanteVencedorPenaltis;
            visitantePenaltis = this.palpiteList[m].resultado.visitanteVencedorPenaltis;
        }
      }

      if (this.partidasList[i].resultado != null) {
        endGame = true;
      }

      if (this.partidasList[i].tipo == "GRUPO") { isEnabledPenaltis  = false }
    
      this.gameList.push ({
        partidaId: this.partidasList[i].id,
        mandanteId: this.partidasList[i].mandanteId,
        mandanteNome: mandanteNome,
        mandanteUrl:  mandanteUrl,
        mandanteGols: mandanteGols,
        mandanteVencedorPenaltis: mandantePenaltis,
        visitanteId: this.partidasList[i].visitanteId,
        visitanteNome: visitanteNome,
        visitanteUrl:  visitanteUrl,
        visitanteGols: visitanteGols,
        visitanteVencedorPenaltis: visitantePenaltis,
        tipo: this.partidasList[i].tipo,
        enabledPenaltis: isEnabledPenaltis,
        endGame: endGame,
      });
    }
  }
}

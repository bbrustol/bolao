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

import * as moment from 'moment';
import { ICONS_BASE_PATH } from '../helper/constants';
import { ActivatedRoute } from '@angular/router';

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
    private bolaoService: BolaoService,
    private route: ActivatedRoute

  ) {
    this.usuarioList = [];
    this.timesList = [];
    this.partidasList = [];
    this.palpiteList = [];
    this.bolaoList = [];
    this.gameList = [];
  }

  ngOnInit() {
    this.getTimes()
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
      this.partidasList = partidas.sort((a, b) => (moment(a.data).unix() - moment(b.data).unix()));
    });
    this.getPalpite()
  }

  getPalpite() {
    this.palpiteService.getPalpitesByBolaoId(Number.parseInt(this.route.snapshot.paramMap.get('bolaoId') || "1"))
      .subscribe((palpite: Palpite[]) => {
        this.palpiteList = palpite;
        this.createModel();
      });
  }

  getLigaById(id: number) {
    this.ligaService.getLigaById(id).subscribe((liga: Liga) => {
      this.liga = liga;
    });
  }

  createModel() {
    for (const partida of this.partidasList) {
      let mandanteNome: string = "";
      let mandanteUrl: string = "";
      let visitanteNome: string = "";
      let visitanteUrl: string = "";

      let mandanteGols: number | undefined;
      let mandantePenaltis: boolean = false;
      let visitanteGols: number | undefined;
      let visitantePenaltis: boolean = false;

      let isEnabledPenaltis: boolean = false;
      let endGame: boolean = false

      for (let m = 0; m < this.timesList.length; m++) {
        if (partida.mandanteId == this.timesList[m].id) {
          mandanteNome = this.timesList[m].nome;
          mandanteUrl = this.timesList[m].urlLogo || ''
        }

        if (partida.visitanteId == this.timesList[m].id) {
          visitanteNome = this.timesList[m].nome;
          visitanteUrl = this.timesList[m].urlLogo || ''
        }
      }

      const palpite = this.palpiteList.find(palpite => palpite.partidaId == partida.id)

      if (palpite) {
        mandanteGols = palpite.resultado.golsMandante
        visitanteGols = palpite.resultado.golsVisitante
        mandantePenaltis = palpite.resultado.mandanteVencedorPenaltis
        visitantePenaltis = palpite.resultado.visitanteVencedorPenaltis
      }

      if (partida.resultado != null) {
        endGame = true;
      }

      if (partida.tipo == "GRUPO") { isEnabledPenaltis = false }

      const data = new Date(partida.data)

      this.gameList.push({
        partidaId: partida.id,
        mandanteId: partida.mandanteId,
        mandanteNome: mandanteNome,
        mandanteUrl: ICONS_BASE_PATH + mandanteUrl,
        mandanteGols: mandanteGols,
        mandanteVencedorPenaltis: mandantePenaltis,
        visitanteId: partida.visitanteId,
        visitanteNome: visitanteNome,
        visitanteUrl: ICONS_BASE_PATH + visitanteUrl,
        visitanteGols: visitanteGols,
        visitanteVencedorPenaltis: visitantePenaltis,
        tipo: partida.tipo,
        enabledPenaltis: isEnabledPenaltis,
        endGame: endGame,
        data: data.toLocaleString()
      });
    }
  }
}

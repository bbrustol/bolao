import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { PartidasService } from '../services/partidas.service';
import { PalpiteService } from '../services/palpite.service';
import { CompararPalpitesDTO } from '../models/palpite';
import { TimesService } from '../services/times.service';
import { UsuarioService } from '../services/usuario.service';

import { ICONS_BASE_PATH } from '../helper/constants';

@Component({
    selector: 'app-comparar-palpites',
    templateUrl: './comparar-palpite.component.html',
    styleUrls: ['./comparar-palpite.component.css']
})
export class CompararPalpitesComponent implements OnInit {

    constructor(private partidasService: PartidasService,
        private palpiteService: PalpiteService,
        private timeService: TimesService,
        private usuarioService: UsuarioService,
        private route: ActivatedRoute) { }

    partidaId: number | undefined

    bolaoId: number | undefined

    compararPalpitesDTO = {} as CompararPalpitesDTO

    ngOnInit(): void {
        const maybePartida = this.route.snapshot.paramMap.get('partidaId')
        this.partidaId = maybePartida ? Number.parseInt(maybePartida) : undefined
        if (this.partidaId) {
            this.partidasService.getPartidasById(this.partidaId).subscribe({
                next: data => {
                    this.loadTimes(data.mandanteId, data.visitanteId)
                    const maybeBolao = this.route.snapshot.paramMap.get('bolaoId')
                    this.bolaoId = maybeBolao ? Number.parseInt(maybeBolao) : undefined
                    if (this.bolaoId && this.partidaId) {
                        this.loadPalpites(this.partidaId, this.bolaoId)
                    }
                }, error: err => {
                    console.error(err)
                }
            })
        }
    }

    loadTimes(mandanteId: number, visitanteId: number) {
        this.timeService.getTimeById(mandanteId).subscribe({
            next: data => {
                this.compararPalpitesDTO.nomeMandante = data.nome
                this.compararPalpitesDTO.urlMandante = ICONS_BASE_PATH + data.urlLogo
            }, error: err => {
                console.log(err)
            }
        })

        this.timeService.getTimeById(visitanteId).subscribe({
            next: data => {
                this.compararPalpitesDTO.nomeVisitante = data.nome
                this.compararPalpitesDTO.urlVisitante = ICONS_BASE_PATH + data.urlLogo
            }, error: err => {
                console.log(err)
            }
        })
    }

    loadPalpites(partidaId: number, bolaoId: number) {
        this.palpiteService.getPalpitesByBolaoIdAndPartidaId(bolaoId, partidaId).subscribe({
            next: data => {
                this.compararPalpitesDTO.palpites = data.map(p => {
                    return {
                        ...p,
                        nomeUsuario: undefined
                    }
                })
            }, error: err => {
                console.log(err)
            }, complete: () => this.enrichPalpitesWithUsuario()            
        })
    }

    enrichPalpitesWithUsuario() : void {
        this.compararPalpitesDTO.palpites.forEach(
            (palpite, i) => this.usuarioService.getUsuarioById(palpite.usuarioId).subscribe({
                next: data => this.compararPalpitesDTO.palpites[i].nomeUsuario = data.nome
            })
        )
    }
}
import { Component, OnInit } from '@angular/core';

import { BolaoService } from '../services/bolao.service';

import { Boloes } from '../models/bolao';

import { Classificacao } from '../models/bolao';

import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-classificacao',
  templateUrl: './classificacao.component.html',
  styleUrls: ['./classificacao.component.css']
})
export class ClassificacaoComponent implements OnInit {


  boloes = {} as Boloes;
  classificacaoList: Classificacao[] = [];
  constructor(
    private bolaoService: BolaoService,
    private route: ActivatedRoute
  ) {}

  bolaoId: number | undefined;

  ngOnInit() {
    const maybeBolao = this.route.snapshot.paramMap.get('bolaoId')
    this.bolaoId = maybeBolao ? Number.parseInt(maybeBolao) : undefined

    if (this.bolaoId) {
      this.bolaoService.getBolaoById(this.bolaoId).subscribe({
        next: data => {
          this.boloes  = data
          this.classificacaoList = data.classificacao
        }, error: err => {
          console.error(err)
        }
      })
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Boloes } from '../models/bolao';
import { BolaoService } from '../services/bolao.service';
import { StorageService } from '../services/storage.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    constructor(private bolaoService: BolaoService, private storageService: StorageService) { }

    boloes: Boloes[] = []
    bolaoAtivo: number = -1
    ngOnInit(): void {
        if(this.storageService.isLoggedIn()) {
            this.bolaoService.getBolao().subscribe({
                next: data => {
                    this.boloes = data
                    if (data && data.length > 0) {
                        this.bolaoAtivo = data[0].id
                    }
                },
                error: err => {
                    console.error(err)
                    this.boloes = [{
                        id: -1,
                        ligaId: -1,
                        classificacao: [],
                        nome: "",
                        administradorId: -1
                    }]
                }
            })
        }
    }
}
import { AbstractControl, ValidatorFn } from "@angular/forms";

export class ValidatePalpite {
    static PalpiteEmAmbos(golsMandanteControlName: string, golsVisitanteControlName: string): ValidatorFn {
        return (controls: AbstractControl) => {
            const golsMandante = controls.get(golsMandanteControlName)?.value
            const golsVisitante = controls.get(golsVisitanteControlName)?.value

        if (!golsMandante) {
                if (golsVisitante) {
                    controls.get(golsMandanteControlName)?.setErrors({
                        PalpiteEmAmbos: true
                    })
                    return { PalpiteEmAmbos: true }
                } else {
                    return null
                }
            } else if (!golsVisitante) {
                controls.get(golsVisitanteControlName)?.setErrors({
                    PalpiteEmAmbos: true
                })
                return { PalpiteEmAmbos: true }
            } else {
                return null
            }
        }
    }

    static EmpateSemPenaltis(tipoPartida: string, golsMandanteControlName: string, golsVisitanteControlName: string,
        vencedorPenaltisControlName: string): ValidatorFn {
        return (controls: AbstractControl) => {
            const golsMandante = controls.get(golsMandanteControlName)?.value
            const golsVisitante = controls.get(golsVisitanteControlName)?.value

            if (golsMandante && golsVisitante && golsMandante === golsVisitante) {
                if (tipoPartida !== 'GRUPOS') {
                    const vencedorPenaltis = controls.get(vencedorPenaltisControlName)?.value
                    if (!vencedorPenaltis) {
                        controls.get(vencedorPenaltisControlName)?.setErrors(
                            {
                                EmpateSemPenaltis: true
                            }
                            )
                            return { EmpateSemPenaltis : true}
                    }
                }
            }
            return null
        }
    }
}
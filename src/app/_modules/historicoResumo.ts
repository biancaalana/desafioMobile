import { Colaborador } from "./colaborador";
import { Equipamento } from "./equipamentos";
import { Informacoes } from "./informacoes";
import { QuantidadeColaborador } from "./quantidadeColaborador";

export interface HistoricoResumo {
    informacoesBasicas: Informacoes;
    equipamentosIndividuais: Equipamento;
    quantColaboradores: QuantidadeColaborador;
    descricaoAtividade: string;
    observacoes?: string;
    colaboradores?: Colaborador[];
}
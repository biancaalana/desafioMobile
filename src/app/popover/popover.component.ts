import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PopoverComponent implements OnInit {

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private router : Router
  ) { }

  ngOnInit() { }

  sair() {
    this.router.navigate(['/login']);
    return true;
  }

  async newUser() {
    const alert = await this.alertController.create({
      header: 'Novo Usuário',
      message: 'Digite seu nome, cpf, e-mail e senha:',
      inputs: [
        {
          name: 'nome',
          type: 'text',
          placeholder: 'Nome completo'
        },
        {
          name: 'cpf',
          type: 'text',
          placeholder: 'Somente números',
          attributes: {
            maxLenght: 11,
            inputMode: 'numeric'
          }
        },
        {
          name: 'email',
          type: 'email',
          placeholder: 'seu@email.com'
        },
        {
          name: 'senha',
          type: 'password',
          placeholder: 'Digite sua senha (mín. 6 caracteres)',
          attributes: {
            minlength: 6
          }
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'alert-button-cancel'
        },
        {
          text: 'Cadastrar',
          handler: async (data) => {
            // Validar se todos os campos foram preenchidos
            if (!data.nome || !data.cpf || !data.email || !data.senha) {
              this.showToast('Preencha todos os campos!', 'danger');
              return false; // Mantém o alert aberto
            }

            // Validar nome
            if (data.nome.trim().length < 2) {
              await this.showToast('Nome deve ter pelo menos 2 caracteres!', 'danger');
              return false;
            }

            // Validar CPF
            if (!this.isValidCPF(data.cpf)) {
              this.showToast('CPF inválido!', 'danger');
              return false; // Mantém o alert aberto
            }

            // Validar email
            if (!this.validateEmail(data.email)) {
              await this.showToast('Email inválido!', 'danger');
              return false;
            }

            // Validar senha
            if (data.senha.length < 6) {
              await this.showToast('Senha deve ter pelo menos 6 caracteres!', 'danger');
              return false;
            }

            // Se chegou até aqui, está tudo OK
            this.showToast('Usuário cadastrado com sucesso!', 'success');
            console.log('Dados do usuário:', data);

            // Aqui você pode chamar sua API para salvar o usuário
            // await this.saveUser(data);

            return true; // Fecha o alert
          }
        }
      ]
    });
    await alert.present();
  }

  // ========== VALIDAÇÃO SIMPLES DE CPF ==========
  private isValidCPF(cpf: string): boolean {
    // Remove tudo que não é número
    cpf = cpf.replace(/[^\d]/g, '');

    // Verifica se tem 11 dígitos
    if (cpf.length !== 11) return false;

    // Verifica se não são todos iguais (111.111.111-11, etc)
    if (/^(\d)\1+$/.test(cpf)) return false;

    // Validação dos dígitos verificadores
    let sum = 0;

    // Primeiro dígito
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf[i]) * (10 - i);
    }
    let digit1 = 11 - (sum % 11);
    if (digit1 > 9) digit1 = 0;

    // Segundo dígito
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf[i]) * (11 - i);
    }
    let digit2 = 11 - (sum % 11);
    if (digit2 > 9) digit2 = 0;

    // Verifica se os dígitos calculados são iguais aos informados
    return digit1 === parseInt(cpf[9]) && digit2 === parseInt(cpf[10]);
  }

  // ========== VALIDAÇÃO DE EMAIL ==========
  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // ========== TOAST SIMPLES ==========
  private async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
      color
    });
    await toast.present();
  }

  // ========== MÉTODO PARA SALVAR USUÁRIO (EXEMPLO) ==========
  private async saveUser(userData: any) {
    try {
      // Exemplo de como você salvaria os dados
      const user = {
        nome: userData.nome,
        cpf: userData.cpf.replace(/[^\d]/g, ''), // Remove formatação
        email: userData.email,
        senha: userData.senha
      };

      console.log('Salvando usuário:', user);

      // Aqui você faria a chamada para sua API
      // const response = await this.http.post('/api/users', user).toPromise();

    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      this.showToast('Erro ao salvar usuário!', 'danger');
    }
  }
}


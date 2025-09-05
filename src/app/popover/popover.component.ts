import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { AlertController, PopoverController, ToastController } from '@ionic/angular';
import { AuthService } from '../_services/auth';
import { Http } from '../_services/http';
import { firstValueFrom } from 'rxjs';

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
    private popoverController: PopoverController,
    private authService: AuthService,
    private httpService: Http
  ) { }

  ngOnInit() { }

  // ========== MENSAGEM CONFIRMAÇÃO ==========
  async sair() {
    const alert = await this.alertController.create({
      header: 'Confirmar Logout',
      message: 'Tem certeza que deseja sair?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'alert-button-cancel'
        },
        {
          text: 'Sair',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.realizarLogout();
          }
        }
      ]
    });

    await alert.present();
  }

  // ========== MÉTODO DE LOGOUT ==========
  private async realizarLogout() {
    try {
      // Fechar o popover primeiro
      await this.fecharPopover();

      // Toast de despedida
      const toast = await this.toastController.create({
        message: 'Logout realizado com sucesso!',
        duration: 2000,
        position: 'top',
        color: 'success'
      });
      await toast.present();

      // Chamar o método logout do AuthService (que limpa tudo e navega)
      this.authService.logout();

    } catch (error) {
      console.error('Erro no logout:', error);

      // Toast de erro
      const toast = await this.toastController.create({
        message: 'Erro ao fazer logout!',
        duration: 2000,
        position: 'top',
        color: 'danger'
      });
      await toast.present();
    }
  }

  async fecharPopover() {
    await this.popoverController.dismiss();
  }

  async newUser() {
    this.fecharPopover();
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
          placeholder: 'CPF (Somente números)',
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
          placeholder: 'Senha (mín. 6 caracteres)',
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
              return false;
            }

            // Validar nome
            if (data.nome.trim().length < 2) {
              await this.showToast('Nome deve ter pelo menos 2 caracteres!', 'danger');
              return false;
            }

            // Validar CPF
            if (!this.isValidCPF(data.cpf)) {
              this.showToast('CPF inválido!', 'danger');
              return false;
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

            // Chamar a API para criar o usuário
            this.criarNovoUsuario(data);
            return true;
          }
        }
      ]
    });
    await alert.present();
  }

  // ========== CRIAR NOVO USUÁRIO VIA API ==========
  private async criarNovoUsuario(userData: any) {
    try {
      const token = this.authService.getToken();

      if (!token) {
        this.showToast('Você precisa estar logado para criar um usuário!', 'danger');
        return;
      }

      console.log('🚀 Enviando dados:', {
        nome: userData.nome,
        email: userData.email,
        senha: userData.senha,
        cpf: userData.cpf.replace(/[^\d]/g, ''),
        token: token.substring(0, 20) + '...' // Log parcial do token por segurança
      });

      // Usar firstValueFrom em vez de toPromise()
      const response = await firstValueFrom(
        this.httpService.createUser(
          userData.nome,
          userData.email,
          userData.senha,
          userData.cpf.replace(/[^\d]/g, ''), // Remove formatação do CPF
          token
        )
      );

      console.log('📝 Response completo:', response);
      console.log('📝 Tipo do response:', typeof response);
      console.log('📝 Response é null?', response === null);
      console.log('📝 Response é undefined?', response === undefined);

      // Verificar se a criação foi bem-sucedida mesmo com response null
      if (response === null || response === undefined) {
        // Pode ser que o backend retorne 204 (No Content) ou similar
        console.log('⚠️ Response vazio, mas pode ter sido criado com sucesso');
        this.showToast('Usuário criado com sucesso!', 'success');
      } else {
        console.log('✅ Usuário criado:', response);
        this.showToast('Usuário criado com sucesso!', 'success');
      }

    } catch (error) {
      console.error('❌ Erro completo:', error);

      if (error && typeof error === 'object' && 'status' in error) {
        const httpError = error as { status: number };

        if (httpError.status === 401) {
          this.showToast('Sessão expirada. Faça login novamente.', 'danger');
          this.authService.logout();
        } else if (httpError.status === 200 || httpError.status === 201 || httpError.status === 204) {
          // Às vezes o status é de sucesso, mas o response vem null
          console.log('✅ Status de sucesso detectado no error handler');
          this.showToast('Usuário criado com sucesso!', 'success');
        } else {
          this.showToast(`Erro ao criar usuário! Status: ${httpError.status}`, 'danger');
        }
      } else {
        this.showToast('Erro de conexão!', 'danger');
      }
    }
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
}
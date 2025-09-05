import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../_services/auth';
import { Http } from '../_services/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private authService: AuthService,
    private httpService: Http,
  ) {
    this.initializeForm();
  }

  ngOnInit() {

  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  initializeForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Alternar visibilidade da senha
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Método de login
  async onLogin() {
    if (this.loginForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Fazendo login...',
        duration: 2000
      });

      await loading.present();

      this.httpService.login(
        this.loginForm.value.email,
        this.loginForm.value.password
      ).subscribe({
        next: async (response) => {
          await loading.dismiss();

          // Usar o AuthService para salvar o token 
          if (response && response.token) {
            this.authService.setToken(response.token);
          }

          // Toast de sucesso
          const toast = await this.toastController.create({
            message: 'Login realizado com sucesso!',
            duration: 2000,
            position: 'top',
            color: 'success'
          });
          await toast.present();

          // Navegar (agora deve funcionar porque usuarioEstaAutenticado() retorna true)
          setTimeout(() => {
            console.log('Usuário autenticado:', this.authService.usuarioEstaAutenticado());
            this.router.navigateByUrl('/home').then((success) => {
              console.log('Navegação sucesso:', success);
            });
          }, 500);
        },
        error: async (error) => {
          await loading.dismiss();
          console.error('Erro no login:', error);
          await this.showErrorAlert('Erro no login', 'Email ou senha incorretos.');
        }
      });
    } else {
      await this.showErrorAlert('Formulário inválido', 'Por favor, verifique os campos e tente novamente.');
    }
  }

  // Processo de login (substituir pela lógica de autenticação)
  private login(credentials: any): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simular validação (substituir pela lógica real)
        if (credentials.email === 'usuario@exemplo.com' && credentials.password === '123456') {
          resolve({ success: true, token: 'fake-jwt-token' });
        } else {
          reject({ error: 'Credenciais inválidas' });
        }
      }, 1500);
    });
  }

  // Mostrar alerta de erro
  private async showErrorAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Esqueci a senha
  async forgotPassword() {
    const alert = await this.alertController.create({
      header: 'Recuperar Senha',
      message: 'Digite seu email para recuperar a senha:',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'seu@email.com'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Enviar',
          handler: async (data) => {
            if (data.email) {
              const toast = await this.toastController.create({
                message: 'Email de recuperação enviado!',
                duration: 3000,
                position: 'top',
                color: 'success'
              });
              await toast.present();
            }
          }
        }
      ]
    });
    await alert.present();
  }

}

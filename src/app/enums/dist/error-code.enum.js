"use strict";
exports.__esModule = true;
exports.ErrorMap = void 0;
exports.ErrorMap = new Map([
    [
        'INVALID_CREDENTIALS', {
            title: 'Credenciais Inválidas',
            description: 'Falha ao realizar login, tente novamente.',
            icon: 'exclamation-circle'
        }
    ],
    [
        'REGISTRATION_FAILED', {
            title: 'Erro ao se Cadastrar',
            description: 'Talvez esse username já esteja em uso, tente um diferente.',
            icon: 'exclamation-circle'
        }
    ],
    [
        'FAILED_TO_GET', {
            title: 'Falha na Listagem',
            description: 'Um possível erro interno aconteceu, por favor, recarregue a página.',
            icon: 'exclamation-circle'
        }
    ],
    [
        'FAILED_TO_POST', {
            title: 'Falha ao Salvar',
            description: 'Um possível erro interno aconteceu, por favor, tente novamente.',
            icon: 'exclamation-circle'
        }
    ],
    [
        'FAILED_TO_DELETE_PROJECT', {
            title: 'Falha ao Excluir Projeto',
            description: 'Não é possível excluir um projeto que esteja associado a uma execução ou pipeline.',
            icon: 'exclamation-circle'
        }
    ],
    [
        'NOT_CONNECTED', {
            title: 'Sem conexão',
            icon: 'wifi-slash',
            description: 'Não foi possível se conectar. Verifique sua conexão e tente novamente.'
        }
    ],
]);

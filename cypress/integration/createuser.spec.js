/// <reference types="cypress" />

describe('Criar Usuário', () => {
  const { url } = Cypress.env()

  beforeEach(() => {
    cy.visit(url)
  })

  const randonNumber = Math.floor(Math.random() * 99);
  const identifier = `0357${randonNumber}273${randonNumber}`;

  it('Validar se o usuário não existe.', () => {
    cy.get('form .identifier').type(identifier, { delay: 150 })
    cy.get('#btn-submit').click()

    cy.wait(4000)

    cy.get('form input[type=password]').should('be.empty')
  })

  it('Preenchimento de formulário com confirmação de senha errada.', () => {
    cy.get('form .identifier').type(identifier, { delay: 150 })
    cy.get('#btn-submit').click()

    cy.wait(4000)

    cy.get('#grid-register input[id=register_identifier]')

    cy.get('#grid-register form input[id=register_name]')
    .type(`Henrique Fake ${randonNumber+randonNumber}`, { delay: 150 })

    cy.get('#grid-register input[id=register_email]')
    .type(`henriquefake.${randonNumber+randonNumber}@email.com`, { delay: 150 })

    cy.get('#grid-register input[id=register_phone]')
    .type(`859996924${randonNumber}`, { delay: 150 })

    cy.get('#grid-register input[id=register_password]')
    .type('123123', { delay: 150 })

    cy.get('#grid-register input[id=register_passwordConfirmation]')
    .type('123134', { delay: 150 })

    cy.get('#grid-register form').contains('As duas senhas que você digitou não correspondem!')
    .should('not.be.empty')

    cy.get('#grid-register form button[type=submit]').click()
    cy.wait(2000)
  })

  it('Criando usuário novo para acesso.', () => {
    cy.get('form .identifier').type(identifier, { delay: 150 })
    cy.get('#btn-submit').click()

    cy.wait(4000)

    cy.get('#grid-register input[id=register_identifier]')

    cy.get('#grid-register form input[id=register_name]')
    .type(`Henrique Fake ${randonNumber+randonNumber}`, { delay: 150 })

    cy.get('#grid-register input[id=register_email]')
    .type(`henriquefake.${randonNumber+randonNumber}@email.com`, { delay: 150 })

    cy.get('#grid-register input[id=register_phone]')
    .type(`859996924${randonNumber}`, { delay: 150 })

    cy.get('#grid-register input[id=register_password]')
    .type('123123', { delay: 150 })

    cy.get('#grid-register input[id=register_passwordConfirmation]')
    .type('123123', { delay: 150 })

    cy.get('#grid-register form button[type=submit]').click()
    cy.wait(5000)
  })
})

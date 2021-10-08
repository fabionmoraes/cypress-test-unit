/// <reference types="cypress" />

describe('Validando Autenticação e Esqueci Senha', () => {
  const { profile: { identifier }, url } = Cypress.env()

  beforeEach(() => {
    cy.visit(url)
  })

  it('Validando formulário e Input', () => {
    cy.get('form').should('not.be.empty')
    cy.get('form input').should('have.class', 'identifier')
  })

  it('Validando formulário com erro', () => {
    cy.get('form .identifier').type('03572727309', { delay: 150 })

    cy.get('#btn-submit').click()
    cy.wait(5000)
  })

  it('Validando formulário com sucesso', () => {
    cy.get('form')

    cy.get('form .identifier').type(identifier, { delay: 150 })

    cy.get('#btn-submit').click()
    cy.wait(5000)

    cy.get('form input[type=password]')
  })

  it('Validando esqueci minha senha', () => {
    let input = cy.get('form .identifier')
    input.type(identifier, { delay: 100 })
    cy.get('#btn-submit').click()

    cy.wait(2000)

    let btn = cy.get('.btn-reset')
    btn.should('have.class', 'btn-reset')

    btn.click()
  })

  it('Validação de envio de Email', () => {
    let input = cy.get('form .identifier')
    input.type(identifier, { delay: 100 })
    cy.get('#btn-submit').click()

    let btn = cy.get('.btn-reset')
    btn.should('have.class', 'btn-reset')

    btn.click({ delay: 400 })
    cy.wait(2000)

    cy.get('.grid-send button').should('have.class', 'btn-send-email')
    cy.get('.grid-send button').contains('Enviar código via email').click()
    cy.wait(2500)

    cy.get('.ant-message-custom-content').should('have.class', 'ant-message-success')
  })

  it('Validação de envio de SMS', () => {
    let input = cy.get('form .identifier')
    input.type(identifier, { delay: 100 })
    cy.get('#btn-submit').click()

    let btn = cy.get('.btn-reset')
    btn.should('have.class', 'btn-reset')

    btn.click()
    cy.wait(2000)

    cy.get('.grid-send button').should('have.class', 'btn-send-sms')
    cy.get('.grid-send button').contains('Enviar código via sms').click()
    cy.wait(2500)

    cy.get('.ant-message-custom-content').should('have.class', 'ant-message-success')
  })
})

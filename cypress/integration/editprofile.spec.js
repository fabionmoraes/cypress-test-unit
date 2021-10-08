/// <reference types="cypress" />

describe('Editando Perfil', () => {
  const { profile: { identifier, name, phone, birthdate, password }, url } = Cypress.env()

  beforeEach(() => {
    cy.visit(url)
  })

  const randonNumber = Math.floor(Math.random() * 99);

  it('Validando a edição de perfil', () => {
    cy.get('form .identifier').type(identifier, { delay: 150 })

    cy.get('#btn-submit').click()

    cy.wait(4000)

    cy.get('form input[type=password]').type(password)
    cy.get('button[type=submit]').click()
    cy.wait(6500)

    cy.get('.menu a[href*="profile"]').click()
    cy.wait(4000)

    const form = cy.get('.container form').should('have.id', 'form-profile')

    form.get('input[placeholder=Nome]').clear()
    form.get('input[placeholder=Nome]').type(name, { delay: 150 })

    form.get('input[placeholder=Telefone]').clear()
    form.get('input[placeholder=Telefone]').type(phone.substr(0, 9)+randonNumber, { delay: 150 })

    form.get('input[type=date]').clear()
    form.get('input[type=date]').type(birthdate)

    cy.wait(1000)

    form.get('button').contains('Atualizar').click()
    cy.wait(4500)
  })
})

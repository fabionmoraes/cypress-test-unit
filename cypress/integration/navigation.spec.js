/// <reference types="cypress" />

describe('Validando Navegação', () => {
  const { profile: { identifier, password }, url } = Cypress.env()

  beforeEach(() => {
    cy.visit(url)
  })

  it('Autenticação', () => {
    cy.get('form .identifier').type(identifier, { delay: 150 })
    cy.get('#btn-submit').click()

    cy.wait(4000)

    cy.get('form input[type=password]').type(password)
    cy.get('button[type=submit]').click()
    cy.wait(4000)
  })

  it('Validando classes de navegação', () => {
    cy.get('form .identifier').type(identifier, { delay: 150 })
    cy.get('#btn-submit').click()

    cy.wait(4000)

    cy.get('form input[type=password]').type(password)
    cy.get('button[type=submit]').click()
    cy.wait(4000)

    cy.get('.menu')
  })

  it('Navegação de Páginas', () => {
    cy.get('form .identifier').type(identifier, { delay: 150 })
    cy.get('#btn-submit').click()

    cy.wait(4000)

    cy.get('form input[type=password]').type(password)
    cy.get('button[type=submit]').click()
    cy.wait(4000)

    cy.get('.menu a[href*="buy"]').click()
    cy.wait(4000)

    cy.get('.menu a[href*="myplan"]').click()
    cy.wait(4000)

    cy.get('.menu a[href*="schedule/create"]').click()
    cy.wait(4000)

    cy.get('#verifyOpeningHours').should('have.class', 'openingHours-true')

    cy.get('.menu a[href*="profile"]').click()
    cy.wait(4000)

    cy.get('.menu a[href*="profile"]').click()
    cy.wait(4000)
  })

  it('Validando o Logout', () => {
    cy.get('form .identifier').type(identifier, { delay: 150 })
    cy.get('#btn-submit').click()

    cy.wait(4000)

    cy.get('form input[type=password]').type(password)
    cy.get('button[type=submit]').click()
    cy.wait(4000)

    cy.get('.logout button').click()
  })
})

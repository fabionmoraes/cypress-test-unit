/// <reference types="cypress" />

describe('Etapa de Primeira Compra', () => {
  const { profile: { identifier, password, address, payment }, url } = Cypress.env()

  beforeEach(() => {
    cy.visit(url)
  })

  it('Validando Etapas de Compra', () => {

    cy.get('form .identifier').type(identifier, { delay: 150 })

    cy.get('#btn-submit').click()

    cy.wait(4000)

    cy.get('form input[type=password]').type(password)
    cy.get('button[type=submit]').click()
    cy.wait(6500)

    cy.get('.card').should('not.be.empty')

    let card = cy.get('.card')

    card.get('.btn-buy button').click()
    cy.wait(3000)

    cy.get('.container form').should('not.be.empty')
    cy.get('.title-step').should('not.be.empty')

    cy.get('.container').then(($div) => {
      let text = $div.find('.title-step').text()

      if (text === 'Seu Endereço') {
        cy.get('#section-unit').should('not.be.empty')
        const form = cy.get('form').should('have.id', 'form-address')

        form.get('input[placeholder=CEP]')
        .type(address.postal_code, { delay: 150 })

        cy.wait(2000)

        form.get('input[placeholder=Endereco]').clear({ delay: 100 })

        form.get('input[placeholder=Endereco]')
        .type(address.address, { delay: 150 })

        form.get('input[placeholder=Bairro]').clear({ delay: 100 })

        form.get('input[placeholder=Bairro]')
        .type(address.neighborhood, { delay: 150 })

        form.get('input[placeholder=Cidade]').clear({ delay: 100 })

        form.get('input[placeholder=Cidade]')
        .type(address.city, { delay: 150 })

        form.get('select[placeholder=País]')
        .select('BR').should('have.value', 'BR')

        form.get('button[type=submit]').click()
        text = 'Plano Selecionado';
        cy.wait(6000)
      }

      if (text === 'Plano Selecionado') {
        cy.wait(2000)
        cy.get('.form-plans button').should('have.id', 'button-removeOrAdd')

        cy.get('.form-plans button[id=button-removeOrAdd]').click()
        cy.wait(1500)

        cy.get('.form-plans button').should('have.class', 'btn-confirmed-plan')

        cy.get('.form-plans').contains('Prosseguir').click()
        text = 'Termo';
        cy.wait(2000)
      }

      if (text === 'Termo') {
        cy.wait(2000)
        text = 'Finalize sua Compra'

        const form = cy.get('.term')

        form.get('[type="checkbox"]').check()
        cy.wait(2000)

        form.contains('Prosseguir').click()
      }

      if (text === 'Finalize sua Compra') {
        const form = cy.get('form').should('have.id', 'form-payment')

        form.get('input[name=cardNumber]').type(payment.cardNumber, { delay: 150 })

        form.get('input[name=cardName]').type(payment.cardName, { delay: 150 })

        form.get('select[name=month]').select(payment.cardMonth, { delay: 150 })

        form.get('select[name=year]').select(payment.cardYear, { delay: 150 })

        form.get('input[name=cardCvc]').type(payment.cardCvc, { delay: 150 })

        form.get('button').contains('Finalizar').click()

        cy.wait(8000)

        cy.get('.ant-message div').should('not.be.empty')
      }
    })

  })

})

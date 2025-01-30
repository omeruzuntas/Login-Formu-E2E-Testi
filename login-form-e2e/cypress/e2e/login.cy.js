describe("Login Form Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Başarılı form doldurulduğunda submit edebiliyorum", () => {
    cy.get("input[type='email']").type("test@example.com");
    cy.get("input[type='password']").type("Test1234!");
    cy.get("input[type='checkbox']").check();
    cy.get("button").should("not.be.disabled").click();
    cy.url().should("include", "/success");
  });

  it("Hatalı form doldurulursa buton disabled kalıyor", () => {
    cy.get("input[type='email']").type("invalidemail");
    cy.get("input[type='password']").type("Test1234!");
    cy.get("input[type='checkbox']").check();
    cy.get("button").should("be.disabled");
    cy.get("p").should("contain", "Invalid email.");

    cy.get("input[type='email']").clear().type("invalidemail");
    cy.get("input[type='password']").clear().type("weak");
    cy.get("button").should("be.disabled");
    cy.get("p").should("contain", "Password must be strong.");

    cy.get("input[type='email']").clear().type("test@example.com");
    cy.get("input[type='password']").clear().type("Test1234!");
    cy.get("input[type='checkbox']").uncheck();
    cy.get("button").should("be.disabled");
  });
});
describe("Login Verify", () => {
  it("Verifies user email address and password", async () => {
    cy.visit("http://localhost:3000/auth/login"); // Navigate to registration page
    cy.get('input[type="email"][name="email"]').type(
      "mivaveg179@vsooc.com"
    ); // Enter user's email address
    cy.get('input[type="password"][name="password"]').type("password"); // Enter user's password
    cy.get('button').click(); // Submit the form to create new user
    cy.wait(5000); // after submit wait for 7 seconds
  });
});
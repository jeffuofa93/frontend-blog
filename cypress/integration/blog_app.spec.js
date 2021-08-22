const { _, $ } = Cypress;

const convertToLikesValue = (el) => {
  let likes = $(el).text();
  likes = parseInt(likes.slice(likes.length - 1));
  return likes;
};

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen",
    };

    const user2 = {
      name: "Jeff Wiederkehr",
      username: "jeffuofa93",
      password: "steelers1",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.request("POST", "http://localhost:3003/api/users/", user2);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Blogs");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("salainen");
      cy.get("#loginButton").click();
      cy.contains("Matti Luukkainen logged-in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("wrong password");
      cy.get("#loginButton").click();
      cy.get("#alertMessage").contains("Wrong Credentials");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("salainen");
      cy.get("#loginButton").click();
      cy.contains("Matti Luukkainen logged-in");
    });

    it("A blog can be created", function () {
      cy.get("#createBlogButton").click();
      cy.get("#title").type("Testing with cypress");
      cy.get("#author").type("John Doe");
      cy.get("#url").type("https://www.cypress.io/");
      cy.get("#addBlogButton").click();
      cy.get("#alertMessage").contains("New Blog");
      cy.contains("Testing with cypress");
    });
  });

  describe("A Blog can be liked", function () {
    beforeEach(function () {
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("salainen");
      cy.get("#loginButton").click();
      cy.contains("Matti Luukkainen logged-in");
      cy.get("#createBlogButton").click();
      cy.get("#title").type("Testing with cypress");
      cy.get("#author").type("John Doe");
      cy.get("#url").type("https://www.cypress.io/");
      cy.get("#addBlogButton").click();
      cy.get("#alertMessage").contains("New Blog");
      cy.contains("Testing with cypress");
    });

    it("testing likes", function () {
      cy.get(".expandOrCollapseBlogButton:first").click();
      cy.get(".numberOfLikes").should("contain", "0");
      cy.get(".likeButton").click();
      cy.get(".numberOfLikes").should("contain", "1");
    });
  });

  describe("A Blog can be deleted", function () {
    beforeEach(function () {
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("salainen");
      cy.get("#loginButton").click();
      cy.contains("Matti Luukkainen logged-in");
      cy.get("#createBlogButton").click();
      cy.get("#title").type("Testing with cypress");
      cy.get("#author").type("John Doe");
      cy.get("#url").type("https://www.cypress.io/");
      cy.get("#addBlogButton").click();
      cy.get("#alertMessage").contains("New Blog");
      cy.contains("Testing with cypress");
    });

    it("A blog can be liked", function () {
      cy.get(".expandOrCollapseBlogButton:first").click();
      cy.get(".numberOfLikes").should("contain", "0");
      cy.get(".likeButton").click();
      cy.get(".numberOfLikes").should("contain", "1");
    });

    it("A blog can be deleted", function () {
      cy.get(".expandOrCollapseBlogButton:first").click();
      cy.get(".outerDeleteButton:first").click();
      cy.get("#confirmDeleteButton").click();
    });

    it("A blog cannot be deleted by a user that did not create the blog", function () {
      cy.get("#logoutButton").click();
      cy.get("#username").type("jeffuofa93");
      cy.get("#password").type("steelers1");
      cy.get("#loginButton").click();
      cy.contains("Jeff Wiederkehr logged-in");
      cy.contains("Testing with cypress");
      cy.get(".expandOrCollapseBlogButton:first").click();
      cy.get(".outerDeleteButton:first").click();
      cy.get("#confirmDeleteButton").click();
      cy.get("#alertMessage").contains("Error deleting blog");
    });
  });

  describe("Blogs are ordered by number of likes", function () {
    beforeEach(function () {
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("salainen");
      cy.get("#loginButton").click();
      cy.contains("Matti Luukkainen logged-in");
      cy.get("#createBlogButton").click();
      cy.get("#title").type("Testing with cypress");
      cy.get("#author").type("John Doe");
      cy.get("#url").type("https://www.cypress.io/");
      cy.get("#addBlogButton").click();
      cy.get("#alertMessage").contains("New Blog");
      cy.contains("Testing with cypress");
      cy.get("#createBlogButton").click();
      cy.get("#title").type("Second Test");
      cy.get("#author").type("Steve Madden");
      cy.get("#url").type("https://www.test.com");
      cy.get("#addBlogButton").click();
      cy.get("#alertMessage").contains("New Blog");
      cy.contains("Second Test");
      // click second entry like button
      cy.get(".expandOrCollapseBlogButton").eq(2).click();
      cy.get(".numberOfLikes").should("contain", "0");
      cy.get(".likeButton").eq(1).click();
      cy.get(".numberOfLikes").should("contain", "1");

      // open the second blog
      cy.get(".expandOrCollapseBlogButton").eq(2).click();
    });

    it("Testing blogs are sorted by likes", function () {
      cy.get(".numberOfLikes").then(($numberOfLikesText) => {
        _.each($numberOfLikesText.get(), (el, i) => {
          if (i === $numberOfLikesText.get().length - 1) {
            return;
          }
          assert(
            convertToLikesValue(el) >=
              convertToLikesValue($numberOfLikesText.get()[i + 1])
          );
        });
      });
    });
  });
});

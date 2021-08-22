import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AddBlog from "../components/AddBlog";
import theme from "../theme";
import { ThemeProvider } from "@emotion/react";
import { StylesProvider } from "@chakra-ui/react";

test("<AddBlog /> updates parent state and calls onSubmit", () => {
  const createBlog = jest.fn();

  const component = render(
    <ThemeProvider theme={theme}>
      <StylesProvider value={theme}>
        <AddBlog createBlog={createBlog} />
      </StylesProvider>
    </ThemeProvider>
  );

  const inputTitle = component.container.querySelector("#title");
  const inputAuthor = component.container.querySelector("#author");
  const inputURL = component.container.querySelector("#url");
  const form = component.container.querySelector("form");

  fireEvent.change(inputTitle, {
    target: { value: "testing the title" },
  });
  fireEvent.change(inputAuthor, {
    target: { value: "testing the author" },
  });
  fireEvent.change(inputURL, {
    target: { value: "testing the url" },
  });

  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("testing the title");
  expect(createBlog.mock.calls[0][0].author).toBe("testing the author");
  expect(createBlog.mock.calls[0][0].url).toBe("testing the url");
});

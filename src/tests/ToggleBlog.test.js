import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import theme from "../theme";
import { StylesProvider } from "@chakra-ui/react";
import ToggleBlog from "../components/ToggleBlog";

// test("renders content", () => {
//   const blog = {
//     title: "Test title for blog",
//     author: "James Stewart",
//     url: "www.steve.com",
//     user: {
//       name: "Jeff Jones",
//       username: "jeffyJones",
//     },
//   };
//
//   const component = render(
//     <ThemeProvider theme={theme}>
//       <StylesProvider value={theme}>
//         <ToggleBlog blog={blog}>{""}</ToggleBlog>
//       </StylesProvider>
//     </ThemeProvider>
//   );
//
//   // component.debug();
//
//   expect(component.container).toHaveTextContent("Test title for blog");
//   // expect(component.container).not.toHaveTextContent("James Stewart");
// });

describe("<TogglableBlog/>", () => {
  let component;

  const blog = {
    title: "Test title for blog",
    author: "James Stewart",
    url: "www.steve.com",
    user: {
      name: "Jeff Jones",
      username: "jeffyJones",
    },
  };

  beforeEach(() => {
    component = render(
      <ThemeProvider theme={theme}>
        <StylesProvider value={theme}>
          <ToggleBlog blog={blog}>{""}</ToggleBlog>
        </StylesProvider>
      </ThemeProvider>
    );
  });

  test("test title is visible", () => {
    expect(component.container).toHaveTextContent("Test title for blog");
  });

  test("at start the children are not displayed", () => {
    const div = component.container.querySelector(".expandedBlog");

    expect(div).toHaveStyle("display: none");
  });
  //
  test("after clicking the button, children are displayed", () => {
    const button = component.getByText("View");
    fireEvent.click(button);

    const div = component.container.querySelector(".expandedBlog");
    expect(div).not.toHaveStyle("display: none");
  });

  test("toggled content can be closed", () => {
    const button = component.getByText("View");
    fireEvent.click(button);

    const closeButton = component.getByText("Hide");
    fireEvent.click(closeButton);

    const div = component.container.querySelector(".expandedBlog");
    expect(div).toHaveStyle("display: none");
  });
});

test("triggering the like button twice registers twice", () => {
  const increaseLikes = jest.fn();
  const blog = {
    title: "Test title for blog",
    author: "James Stewart",
    url: "www.steve.com",
    user: {
      name: "Jeff Jones",
      username: "jeffyJones",
    },
  };

  const component = render(
    <ThemeProvider theme={theme}>
      <StylesProvider value={theme}>
        <ToggleBlog blog={blog} increaseLikes={increaseLikes}>
          {""}
        </ToggleBlog>
      </StylesProvider>
    </ThemeProvider>
  );

  const button = component.getByText("View");
  fireEvent.click(button);

  const likeButton = component.container.querySelector(".likeButton");
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);
  expect(increaseLikes.mock.calls).toHaveLength(2);

  // component.debug();

  // expect(component.container).toHaveTextContent("Test title for blog");
  // expect(component.container).not.toHaveTextContent("James Stewart");
});

import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import Profile from "@/app/components/Profile";

describe("Profile component tests", () => {
  it("renders a heading", () => {
    //ARRANGE
    render(
      <Profile
        pictureUrl="/images/profile.jpg"
        biography="Passionate developer exploring the world of technology."
      />
    );

    //ACT
    const header = screen.getByRole("heading");

    //ASSERT
    expect(header).toBeInTheDocument();
  });

  
});

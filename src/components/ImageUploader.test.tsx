import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ImageUploader from "./ImageUploader";

it("should call onUpload function prop when image is uploaded", async () => {
  // see https://testing-library.com/docs/ecosystem-user-event/#uploadelement-file--clickinit-changeinit-
  const stubFile = new File(["hello"], "hello.png", { type: "image/png" });
  const onUploadMock = jest.fn();
  render(<ImageUploader onUpload={onUploadMock} />);

  const input = screen.getByLabelText(/Upload image/i);
  userEvent.upload(input, stubFile);

  await waitFor(() => expect(onUploadMock).toHaveBeenCalled());
});

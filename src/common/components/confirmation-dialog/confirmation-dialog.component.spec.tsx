import { fireEvent, render, screen } from "@testing-library/react";
import { ConfirmationDialogComponent } from "./confirmation-dialog.component";
import React from "react";

describe('ConfirmationDialogComponent', () => {
  it('should render', () => {
    // Arrange
    const props = {
      isOpen: true,
      onAccept: vi.fn(),
      onClose: vi.fn(),
      title: 'Title',
      labels: {
        closeButton: 'Close',
        acceptButton: 'Accept',
      },
      children: 'Children',
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    // Assert
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toHaveTextContent(props.title);
    expect(screen.getByRole('button', { name: props.labels.closeButton })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: props.labels.acceptButton })).toBeInTheDocument();
  });

  it('should call onAccept and onClose when accept button is clicked', () => {
    // Arrange
    const props = {
      isOpen: true,
      onAccept: vi.fn().mockImplementation(() => {
        props.isOpen = false;
      }),
      onClose: vi.fn().mockImplementation(() => {
        props.isOpen = false;
      }),
      title: 'Title',
      labels: {
        closeButton: 'Close',
        acceptButton: 'Accept',
      },
      children: 'Children',
    };

    render(<ConfirmationDialogComponent {...props} />);

    // Act
    fireEvent.click(screen.getByText(props.labels.acceptButton));

    // Assert
    expect(props.isOpen).toBeFalsy();
    expect(props.onAccept).toHaveBeenCalledOnce();
    expect(props.onClose).toHaveBeenCalledOnce();
  });
  
  it('should call onClose when close button is clicked', () => {
    // Arrange
    const props = {
      isOpen: true,
      onAccept: vi.fn(),
      onClose: vi.fn().mockImplementation(() => {
        props.isOpen = false;
      }),
      title: 'Title',
      labels: {
        closeButton: 'Close',
        acceptButton: 'Accept',
      },
      children: 'Children',
    };

    render(<ConfirmationDialogComponent {...props} />);

    // Act
    fireEvent.click(screen.getByText(props.labels.closeButton));

    // Assert
    expect(props.isOpen).toBeFalsy();
    expect(props.onClose).toHaveBeenCalledOnce();

  });

  it('should not render when isOpen is false', () => {
    // Arrange
    const props = {
      isOpen: false,
      onAccept: vi.fn(),
      onClose: vi.fn(),
      title: 'Title',
      labels: {
        closeButton: 'Close',
        acceptButton: 'Accept',
      },
      children: 'Children',
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    // Assert
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should render children', () => {
    // Arrange
    const props = {
      isOpen: true,
      onAccept: vi.fn(),
      onClose: vi.fn(),
      title: 'Title',
      labels: {
        closeButton: 'Close',
        acceptButton: 'Accept',
      },
      children: <span role="textbox">Children</span>,
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    // Assert
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveTextContent('Children');
  });

  it('Should not render any wiht empty children', () => {
    // Arrange
    const props = {
      isOpen: true,
      onAccept: vi.fn(),
      onClose: vi.fn(),
      title: 'Title',
      labels: {
        closeButton: 'Close',
        acceptButton: 'Accept',
      },
      children: undefined,
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    // Assert
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

});
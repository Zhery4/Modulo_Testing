import { renderHook } from "@testing-library/react";
import { useConfirmationDialog } from "./confirmation-dialog.hook";

describe(('ConfirmationDialogHook'), () => {

    it('Test initial hook state', () => {
        // Arrange
        const props = {
            
            onAccept: vi.fn(),
            onClose: vi.fn(),

        } 

        // Act
        const { result } = renderHook(() => useConfirmationDialog());

        // Assert
        expect(result.current.isOpen).toBeFalsy();
        expect(result.current.itemToDelete).toEqual({ id: '', name: '' });
    });

    it('Test onAccept function', () => {
        // Arrange
        const props = {
            
            onAccept: vi.fn(),
            onClose: vi.fn(),

        } 

        // Act
        const { result } = renderHook(() => useConfirmationDialog());
        result.current.onAccept();

        // Assert
        expect(result.current.itemToDelete).toEqual({ id: '', name: '' } );
        expect(result.current.isOpen).toBeFalsy();
    });

    it('Test onClose function', () => {
        // Arrange
        const props = {
            
            onAccept: vi.fn(),
            onClose: vi.fn(),

        } 

        // Act
        const { result } = renderHook(() => useConfirmationDialog());
        result.current.onClose();

        // Assert
        expect(result.current.isOpen).toBeFalsy();
    })

    it('Test onOpenDialog function', () => {
        // Arrange
        const props = {
            
            onAccept: vi.fn(),
            onClose: vi.fn(),

        } 

        // Act
        const { result, rerender } = renderHook(() => useConfirmationDialog());

        result.current.onOpenDialog({ id: '1', name: 'test' });
        
        // Assert
        rerender();
        expect(result.current.isOpen).toBeTruthy();
        expect(result.current.itemToDelete).toEqual({ id: '1', name: 'test' });
        

    })

});
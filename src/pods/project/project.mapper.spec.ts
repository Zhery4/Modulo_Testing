import { mapProjectFromApiToVm } from './project.mapper';
import * as apiModel from './api/project.api-model';

describe('Mapper tests', () => {
    describe('mapProjectFromApiToVm', () => {
        it('should return vm object', () => {
            //Arrange
            const mockProject: apiModel.Project = {
                id: '1',
                name: 'Project 1',
                externalId: '1',
                comments: 'comments',
                isActive: true,
                employees: [
                    {
                        id: '1',
                        isAssigned: true,
                        employeeName: 'Employee 1'
                    },
                    {
                        id: '2',
                        isAssigned: false,
                        employeeName: 'Employee 2'
                    },
                    {
                        id: '3',
                        isAssigned: true,
                        employeeName: 'Employee 3'
                    }
                ]
            };

            const mockFunction = vi.fn(mapProjectFromApiToVm);

            //Act
            const result = mockFunction(mockProject);

            //Assert
            expect(mockFunction).toHaveBeenCalledWith(mockProject);
            expect(result.id).toEqual(mockProject.id);
            expect(result.employees.length).toEqual(mockProject.employees.length);
            expect(result.employees[0].id).toEqual(mockProject.employees[0].id);

        }),
        it('Empty project - Should return an empty object', () => {
            //Arrange
            const mockProject: apiModel.Project = null;

            const mockFunction = vi.fn(mapProjectFromApiToVm);

            //Act
            const result = mockFunction(mockProject);

            //Assert
            expect(mockFunction).toHaveBeenCalledWith(mockProject);
            expect(result.id).toEqual('');
            expect(result.employees.length).toEqual(0);

        }),
        it('Existing project with no employees - Should return an empty object', () => {
            //Arrange
            const mockProject: apiModel.Project = {
                id: '1',
                name: 'Project 1',
                externalId: '1',
                comments: 'comments',
                isActive: true,
                employees: []
            };

            const mockFunction = vi.fn(mapProjectFromApiToVm);

            //Act
            const result = mockFunction(mockProject);

            //Assert
            expect(mockFunction).toHaveBeenCalledWith(mockProject);
            expect(result.id).toEqual(mockProject.id);
            expect(result.employees.length).toEqual(0);
            })
    })
})
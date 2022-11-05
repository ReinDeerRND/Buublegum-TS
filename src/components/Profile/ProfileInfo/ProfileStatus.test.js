import React from 'react';
import { create } from 'react-test-renderer';
import ProfileStatus from './ProfileStatus';

describe("Profile Status Component", () => {
    test("it should show status from props in component", () => {
        const status = 'status from props';
        const component = create(<ProfileStatus status={status} />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe(status);
    });

    test("it should be span during non-edit mode", () => {
        const component = create(<ProfileStatus status="some status" />);
        const root = component.root;
        let span = root.findByType('span');
        expect(span).toBeTruthy();
    });

    test("it should not be input during non-edit mode", () => {
        const component = create(<ProfileStatus status="some status" />);
        const root = component.root;
        expect(()=>{
            let input = root.findByType('input');
        }).toThrow();
    });

    test("span text must be equal as props status", () => {
        const status = 'status from props';
        const component = create(<ProfileStatus status={status} />);
        const root = component.root;
        let span = root.findByType('span');
        expect(span.children).toContain(status);
    });

    test("it should be input during edit mode and editMode should be true", () => {
        const status = 'status from props';
        const component = create(<ProfileStatus status={status} />);
        const root = component.root;
        const instance = component.getInstance();
        let span = root.findByType('span');
        span.props.onDoubleClick();
        let input = root.findByType('input');
        expect(input).toBeTruthy();
        expect(input.props.value).toBe(status);
        expect(instance.state.editMode).toBeTruthy();
    });

    test("callback 'updateStatus' should be called", () => {
        const updateStatusMock = jest.fn();
        const component = create(<ProfileStatus status= '' updateStatus = {updateStatusMock}/>);
        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(updateStatusMock.mock.calls.length).toBe(1);
    });
})
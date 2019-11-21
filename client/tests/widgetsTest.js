// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert} from '../src/widgets/Alert.js';
import { shallow, mount, ShallowWrapper } from 'enzyme';
import { ConfirmBox } from '../src/widgets/confirmBox';
import {Card} from "../src/widgets/card";

//title: React.Node, image: React.Node, id: React.Node, alt: React.Node
describe('Card test', () => {
    const wrapper: ShallowWrapper = shallow(
        <Card title="Artikkel" image="url" alt="bilde alt" id="2" />
    );
    it('renders correctly', () => {
        expect(wrapper.debug()).toMatchSnapshot();
    });
});

/*
describe('Confirm box tests', () =>{
    const test = jest.fn();

    const wrapper: ShallowWrapper = shallow(<ConfirmBox modalId={1} modalHeader={"test"} modalBody={"test"} onClick={test}/>);
    it('initially', () => {
        expect(typeof wrapper).toEqual('object');
        expect(wrapper.find('button.btn-secondary')).toHaveLength(1);
        expect(wrapper.find('button.close')).toHaveLength(1);
        expect(wrapper.find('button.btn-primary')).toHaveLength(1);
    });

    it('after clicking close button', () => {
        wrapper.find('button.close').simulate('click');

        let instance = ConfirmBox.instance();
        expect(typeof instance).toEqual('object');

        expect(wrapper.find('button.close')).toHaveLength(0);

        //   const computedStyle = window.getComputedStyle(wrapper.element)
      //  return computedStyle.display !== 'none'
    });
});

*/
/*
describe('Confirm box tests', () => {
    const test = () => console.log("test");

    let wrapper = shallow(<ConfirmBox modalId={1} modalHeader={"test"} modalBody={"test"} onClick={test}/>);
    it('initially', () => {
        let instance = ConfirmBox.instance();
        expect(typeof instance).toEqual('object');
  //      if (instance) expect(instance.modalId).toEqual([]);

        expect(wrapper.find('button.btn btn-secondary')).toHaveLength(0);
        expect(wrapper.find('button.close')).toHaveLength(0);
        expect(wrapper.find('button.btn btn-primary')).toHaveLength(0);

    });


    it('after box', done => {
        wrapper = mount(<ConfirmBox modalId={1} modalHeader={"test"} modalBody={"test"} onClick={test}/>);

        // Wait for the Alert component to finish drawing
        setTimeout(() => {
            let instance = ConfirmBox.instance();
            expect(typeof instance).toEqual('object');

            expect(wrapper.find('button.btn btn-secondary')).toHaveLength(1);
            expect(wrapper.find('button.close')).toHaveLength(1);
            expect(wrapper.find('button.btn btn-primary')).toHaveLength(1);


            done();
        });
    });


    it('after clicking close button', () => {
        wrapper.find('button.btn btn-secondary').simulate('click');

        let instance = Alert.instance();
        expect(typeof instance).toEqual('object');


        expect(wrapper.find('button.btn btn-secondary')).toHaveLength(0);
        expect(wrapper.find('button.close')).toHaveLength(0);
        expect(wrapper.find('button.btn btn-primary')).toHaveLength(0);
    });
});

*/

describe('Alert tests', () => {
    const wrapper: ShallowWrapper = shallow(<Alert />);

    it('initially', () => {
        let instance = Alert.instance();
        expect(typeof instance).toEqual('object');
        if (instance) expect(instance.alerts).toEqual([]);

        expect(wrapper.find('button.close')).toHaveLength(0);
    });

    it('after danger', done => {
        Alert.danger('test');

        // Wait for the Alert component to finish drawing
        setTimeout(() => {
            let instance = Alert.instance();
            expect(typeof instance).toEqual('object');
            if (instance)
                expect(instance.alerts).toEqual([
                    { id: 0, text: 'test', type: 'danger' }
                ]);

            expect(wrapper.find('button.close')).toHaveLength(1);

            done();
        });
    });

    it('after clicking close button', () => {
        wrapper.find('button.close').simulate('click');

        let instance = Alert.instance();
        expect(typeof instance).toEqual('object');
        if (instance) expect(instance.alerts).toEqual([]);

        expect(wrapper.find('button.close')).toHaveLength(0);
    });
});

import {Component} from "react-simplified";
import * as React from "react";

/**
 * Renders alert messages using Bootstrap classes.
 */
export class Alert extends Component {
    alerts: { id: number, text: React.Node, type: string }[] = [];
    static nextId = 0;

    render() {
        return (
            <>
                {this.alerts.map((alert, i) => (
                    <div className="alert-pretty" key={alert.id}>
                        <div
                            key={alert.id}
                            className={'alert alert-' + alert.type}
                            role="alert"
                        >
                            {alert.text}
                            <button
                                type="button"
                                className="close"
                                onClick={() => {
                                    this.alerts.splice(i, 1);
                                }}
                            >
                                &times;
                            </button>
                        </div>
                    </div>
                ))}
            </>
        );
    }

    static success(text: React.Node) {
        // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
        setTimeout(() => {
            for (let instance of Alert.instances())
                instance.alerts.push({
                    id: Alert.nextId++,
                    text: text,
                    type: 'success'
                });
        });
    }

    static info(text: React.Node) {
        // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
        setTimeout(() => {
            for (let instance of Alert.instances())
                instance.alerts.push({
                    id: Alert.nextId++,
                    text: text,
                    type: 'info'
                });
        });
    }

    static warning(text: React.Node) {
        // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
        setTimeout(() => {
            for (let instance of Alert.instances())
                instance.alerts.push({
                    id: Alert.nextId++,
                    text: text,
                    type: 'warning'
                });
        });
    }

    static danger(text: React.Node) {
        // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
        setTimeout(() => {
            for (let instance of Alert.instances())
                instance.alerts.push({
                    id: Alert.nextId++,
                    text: text,
                    type: 'danger'
                });
        });
    }
}